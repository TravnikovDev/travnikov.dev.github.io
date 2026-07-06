import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Raw sRGB values on purpose: ShaderMaterial output skips tone mapping and
// color-space conversion, so the palette renders exactly as authored.
const hexToVec3 = (hex: string) =>
  new THREE.Vector3(
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255
  );

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Domain-warped fbm mapped through the aura palette, masked to a diagonal
// band so the ribbons flow bottom-left -> top-right and corners stay pearl.
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform vec2 uPointer;
  uniform vec3 uCanvas;
  uniform vec2 uDrop; // uv anchor of the signature dark droplet

  // stream palette (design-fixed)
  #define GREY_TEAL  vec3(0.765, 0.827, 0.824)  /* #c3d3d2 */
  #define TEAL_PALE  vec3(0.722, 0.824, 0.827)  /* #b8d2d3 */
  #define SAGE       vec3(0.525, 0.675, 0.631)  /* #86aca1 */
  #define SAGE_PALE  vec3(0.733, 0.780, 0.702)  /* #bbc7b3 */
  #define CHAMPAGNE  vec3(0.898, 0.792, 0.678)  /* #e5caad */
  #define TAN        vec3(0.878, 0.788, 0.663)  /* #e0c9a9 */
  #define TAUPE      vec3(0.710, 0.655, 0.553)  /* #b5a78d */
  #define IVORY      vec3(0.906, 0.851, 0.808)  /* #e7d9ce */
  #define SLATE_BLUE vec3(0.282, 0.353, 0.392)  /* #485a64 */
  #define STEEL_BLUE vec3(0.314, 0.435, 0.514)  /* #506f83 */
  #define NAVY       vec3(0.145, 0.176, 0.251)  /* #252d40 */
  #define CHARCOAL   vec3(0.239, 0.251, 0.278)  /* #3d4047 */

  // sin-free hash: fract(sin(...)*43758.) collapses on Apple GPUs (Metal fast-sin)
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  // silk height field — same fold construction the colors use, so the
  // shading relief lines up with the ribbon boundaries. An isotropic
  // low-frequency blob term adds rounded 3D volume (not just flat streaks).
  float silkHeight(vec2 rp, vec2 drift) {
    vec2 sp = vec2(rp.x * 0.32, rp.y * 1.1);
    vec2 q = vec2(fbm(sp + drift), fbm(sp + vec2(3.1, 7.7) - drift * 0.5));
    float phase = rp.y * 4.1 + fbm(sp + 1.1 * q) * 3.6 - q.x * 1.8;
    float strands = sin(phase) * 0.6 + sin(phase * 0.62 + 2.3) * 0.3
      + sin(phase * 1.35 + 4.4) * 0.18;
    // two blob scales — big rolling masses + medium lobes = thick 3D volume
    float blobBig = fbm(rp * 0.28 + drift * 0.4) * 2.0 - 1.0;
    float blobMed = fbm(rp * 0.55 + drift * 0.6) * 2.0 - 1.0;
    return strands * 0.42 + blobBig * 0.85 + blobMed * 0.7;
  }

  void main() {
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * 2.6;

    // positive angle: band flows top-right -> bottom-left like the reference
    float ang = 0.62;
    mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
    vec2 rp = rot * p;

    float t = uTime * 0.03;
    // anisotropic domain: long silky strands along the band, detail across it
    vec2 sp = vec2(rp.x * 0.32, rp.y * 1.1);
    vec2 drift = vec2(t, -t * 0.22) + uPointer * 0.1;

    // gentle warp so the folds meander instead of turbulence
    vec2 q = vec2(
      fbm(sp + drift),
      fbm(sp + vec2(3.1, 7.7) - drift * 0.5)
    );
    vec2 warped = sp + 1.1 * q;

    // ribbon folds: stripes across the band, bent by the warp field
    // (lower frequency = fewer, fatter, more voluminous folds)
    float phase = rp.y * 4.1 + fbm(warped) * 3.6 - q.x * 1.8;
    float fold = sin(phase);
    float foldB = sin(phase * 0.62 + 2.3);
    float foldC = sin(phase * 0.85 + 4.4);
    float f = fbm(warped + vec2(0.0, 0.3) * fold);

    vec3 col = uCanvas;
    // warm body first: ivory underlay, tan wash, champagne + taupe strands
    col = mix(col, IVORY, smoothstep(0.2, 0.9, foldB) * 0.5);
    col = mix(col, TAN, smoothstep(0.5, 0.92, foldB) * 0.3);
    col = mix(col, CHAMPAGNE, smoothstep(0.6, 0.97, sin(phase * 0.45 + 1.1)) * 0.5);
    col = mix(col, TAUPE, smoothstep(0.68, 0.99, sin(phase * 0.38 + 2.6)) * 0.2);
    // depth-of-field: fold edges go from crisp to defocused across the canvas
    float focus = fbm(sp * 0.35 + vec2(4.7, 8.1));
    float w = mix(0.1, 0.42, focus);
    // greens paint last so they win their regions
    col = mix(col, TEAL_PALE, smoothstep(0.68 - w, 0.68 + w, foldC) * 0.8);
    col = mix(
      col,
      SAGE_PALE,
      smoothstep(0.68 - w, 0.68 + w, sin(phase * 0.52 + 5.2)) * 0.5
    );
    col = mix(
      col,
      SAGE,
      smoothstep(0.6 - w, 0.6 + w, fold) * mix(0.6, 1.0, smoothstep(0.2, 0.6, f)) * 0.8
    );
    // grey-teal light strands between the ribbons
    col = mix(col, GREY_TEAL, smoothstep(0.45, 0.95, -fold) * 0.5);
    // steel-blue shading in the troughs
    col = mix(col, STEEL_BLUE, smoothstep(0.55, 0.98, -foldB) * 0.18);
    // dark pockets: slate-blue folds with a navy core, charcoal creases
    float darkMask = smoothstep(0.36, 0.6, fbm(sp * 0.45 + vec2(9.3, 2.4)));
    col = mix(col, SLATE_BLUE, darkMask * smoothstep(0.2, 0.8, fold) * 0.6);
    col = mix(col, NAVY, darkMask * smoothstep(0.55, 0.95, fold) * 0.55);
    col = mix(col, CHARCOAL, darkMask * smoothstep(0.6, 0.98, -foldC) * 0.2);

    // ---- large rounded colour masses: distinct mint / champagne / aqua lobes
    // (isotropic low-freq blobs so colours read as separated bodies) ----
    float massMint = smoothstep(0.5, 0.76, fbm(rp * 0.5 + vec2(1.0, 4.0) + drift * 0.4));
    col = mix(col, SAGE, massMint * 0.55);
    float massWarm = smoothstep(0.52, 0.78, fbm(rp * 0.46 + vec2(7.0, 2.0) - drift * 0.3));
    col = mix(col, CHAMPAGNE, massWarm * 0.52);
    float massAqua = smoothstep(0.54, 0.8, fbm(rp * 0.54 + vec2(3.5, 9.0) + drift * 0.5));
    col = mix(col, TEAL_PALE, massAqua * 0.5);

    // ---- big sculptural dark folds woven through the band ----
    float darkA = smoothstep(0.52, 0.74, fbm(rp * 0.4 + vec2(5.0, 8.0) - drift * 0.3));
    col = mix(col, SLATE_BLUE, darkA * 0.5);
    float darkB = smoothstep(0.58, 0.8, fbm(rp * 0.34 + vec2(9.0, 1.0) + drift * 0.2));
    col = mix(col, NAVY, darkB * 0.42);

    // richer, more separated colour
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(lum), col, 1.22);

    // confine ribbons to the diagonal band; corners stay near-white
    float band = 1.0 - smoothstep(0.12, 0.95, abs(rp.y + 0.1));
    band *= band;
    col = mix(uCanvas, col, band);

    // signature dark droplet anchored in the band (sits behind the crystal)
    vec2 dropDelta = (vUv - uDrop) * vec2(uAspect, 1.0);
    dropDelta = rot * dropDelta;
    dropDelta.x *= 0.6; // elongate along the flow
    float dropR = length(dropDelta)
      + fbm(dropDelta * 4.0 + drift * 0.4) * 0.04 - 0.02;
    float drop = 1.0 - smoothstep(0.025, 0.085, dropR);
    col = mix(col, NAVY, drop * 0.7);
    col = mix(col, SLATE_BLUE, (1.0 - smoothstep(0.06, 0.14, dropR)) * (1.0 - drop) * 0.28);

    // ---- sculptural relief: light the fold field like thick 3D liquid ----
    float e = 0.02;
    float hC = silkHeight(rp, drift);
    float hX = silkHeight(rp + vec2(e, 0.0), drift);
    float hY = silkHeight(rp + vec2(0.0, e), drift);
    vec3 N = normalize(vec3((hC - hX) / e * 0.28, (hC - hY) / e * 0.28, 1.0));
    vec3 L = normalize(vec3(0.45, 0.6, 0.66)); // warm key, upper right
    float diff = clamp(dot(N, L), 0.0, 1.0);
    float spec = pow(clamp(dot(N, normalize(L + vec3(0.0, 0.0, 1.0))), 0.0, 1.0), 24.0);
    // stronger diffuse falloff = rounder, more voluminous lobes
    col *= mix(1.0, 0.62 + 0.5 * diff, band);
    // champagne specular highlights along the crests
    col += spec * vec3(0.98, 0.92, 0.76) * 0.3 * band;
    // faint warm glow hugging the band core
    col += vec3(0.038, 0.032, 0.02) * band * smoothstep(0.2, 0.9, fold);

    // gentle luminosity toward the top
    col += (vUv.y - 0.5) * 0.02;

    // paper grain
    float grain = hash(vUv * vec2(1440.0, 900.0));
    col += (grain - 0.5) * 0.028;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function FluidBackground() {
  const pointerTarget = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  // Imperative material: avoids R3F prop-diffing skipping shader recompiles
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uAspect: { value: 1.6 },
          uPointer: { value: new THREE.Vector2(0, 0) },
          // shader-local canvas: cool ice-white — the reference canvas is
          // blue-grey-green, with the warmth living inside the stream
          uCanvas: { value: hexToVec3("#EDF1EF") },
          // sits just below-left of the crystal glyph on desktop
          uDrop: { value: new THREE.Vector2(0.63, 0.56) },
        },
        vertexShader,
        fragmentShader,
        depthWrite: false,
        depthTest: false,
      }),
    []
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerTarget.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        1 - (e.clientY / window.innerHeight) * 2
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // anchor the dark droplet just below-left of the crystal glyph, measured
  // at page-top coordinates (the canvas is viewport-fixed)
  useEffect(() => {
    const update = () => {
      const el = document.getElementById("crystal-glyph-anchor");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (rect.left + rect.width * 0.35) / window.innerWidth;
      const y =
        1 - (rect.top + window.scrollY + rect.height * 0.78) / window.innerHeight;
      (material.uniforms.uDrop.value as THREE.Vector2).set(
        Math.min(0.95, Math.max(0.05, x)),
        Math.min(0.95, Math.max(0.05, y))
      );
    };
    update();
    const settle = setTimeout(update, 1200);
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(settle);
      window.removeEventListener("resize", update);
    };
  }, [material]);

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.getElapsedTime();
    material.uniforms.uAspect.value = viewport.aspect;
    (material.uniforms.uPointer.value as THREE.Vector2).lerp(
      pointerTarget.current,
      0.04
    );
  });

  // Oversized so the plane covers the frustum at its depth
  return (
    <mesh position={[0, 0, -2]} renderOrder={0} material={material}>
      <planeGeometry args={[viewport.width * 1.8, viewport.height * 1.8]} />
    </mesh>
  );
}
