import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { auraColors } from "../../theme";

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
  uniform vec3 uAqua;
  uniform vec3 uMint;
  uniform vec3 uSage;
  uniform vec3 uSand;
  uniform vec3 uSlate;

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
    float phase = rp.y * 5.5 + fbm(warped) * 4.2 - q.x * 1.8;
    float fold = sin(phase);
    float foldB = sin(phase * 0.62 + 2.3);
    float foldC = sin(phase * 0.85 + 4.4);
    float f = fbm(warped + vec2(0.0, 0.3) * fold);

    vec3 col = uCanvas;
    // cream/ivory ribbons woven through the cool base
    col = mix(col, uSand, smoothstep(0.25, 0.9, foldB) * 0.32);
    // mint ribbon — narrower window gives a defined strand
    col = mix(col, uMint, smoothstep(0.35, 0.85, fold) * smoothstep(0.2, 0.6, f) * 0.75);
    // pale aqua ribbon on an offset phase
    col = mix(col, uAqua, smoothstep(0.45, 0.9, foldC) * 0.6);
    // deeper sage mid-tone folds
    col = mix(col, uSage, smoothstep(0.55, 0.98, sin(phase * 0.7 + 3.6)) * 0.28);
    // faint sand strand
    col = mix(col, uSand, smoothstep(0.5, 0.95, sin(phase * 0.45 + 1.1)) * 0.24);
    // cool blue-grey shadow in the fold troughs gives the silk its depth
    col = mix(col, vec3(0.71, 0.77, 0.775), smoothstep(0.35, 0.95, -foldB) * 0.3);
    // near-white strands between the colored ribbons (no glow hotspots)
    col = mix(col, uCanvas * 1.012, smoothstep(0.45, 0.95, -fold) * 0.55);
    // dark folds: one or two large smooth blobs, never wisps
    float darkMask = smoothstep(0.4, 0.66, fbm(sp * 0.45 + vec2(9.3, 2.4)));
    col = mix(col, uSlate, darkMask * smoothstep(0.3, 0.85, fold) * 0.62);
    // broad soft crest lightening
    col += smoothstep(0.5, 1.0, fold) * 0.028;

    // confine ribbons to the diagonal band; corners stay near-white
    float band = 1.0 - smoothstep(0.12, 0.95, abs(rp.y + 0.1));
    band *= band;
    col = mix(uCanvas, col, band);

    // gentle luminosity toward the top
    col += (vUv.y - 0.5) * 0.022;

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
          // blue-grey-green, with the warmth reserved for the sparkles
          uCanvas: { value: hexToVec3("#EDF1EF") },
          uAqua: { value: hexToVec3(auraColors.paleAqua) },
          uMint: { value: hexToVec3(auraColors.mint) },
          uSage: { value: hexToVec3(auraColors.mutedTeal) },
          // cream instead of warmSand: ivory ribbons, not orange
          uSand: { value: hexToVec3(auraColors.cream) },
          uSlate: { value: hexToVec3(auraColors.slate) },
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
