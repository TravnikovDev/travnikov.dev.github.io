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
  uniform vec3 uPowder;
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
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * 2.6;

    float ang = -0.62;
    mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
    vec2 rp = rot * p;

    float t = uTime * 0.035;
    vec2 drift = vec2(t, -t * 0.3) + uPointer * 0.12;

    vec2 q = vec2(
      fbm(rp * 0.85 + drift),
      fbm(rp * 0.85 + vec2(5.2, 1.3) - drift * 0.6)
    );
    vec2 r = vec2(
      fbm(rp + 2.4 * q + vec2(1.7, 9.2) + drift * 0.4),
      fbm(rp + 2.4 * q + vec2(8.3, 2.8) - drift * 0.3)
    );
    float f = fbm(rp * 1.15 + 2.0 * r);

    vec3 col = uCanvas;
    col = mix(col, uAqua, smoothstep(0.36, 0.78, f) * 0.6);
    col = mix(col, uMint, smoothstep(0.48, 0.9, q.y) * 0.45);
    col = mix(col, uPowder, smoothstep(0.55, 0.98, r.x) * 0.3);
    col = mix(col, uSand, smoothstep(0.46, 0.9, r.y) * 0.55);
    col = mix(col, uSlate, smoothstep(0.66, 1.02, f * r.x * 1.4) * 0.38);

    // silky sheen along ribbon crests
    float sheen = smoothstep(0.45, 0.5, f) * smoothstep(0.55, 0.5, f);
    col += sheen * 0.07;

    // confine ribbons to the diagonal band; corners stay near-white
    float band = 1.0 - smoothstep(0.2, 1.05, abs(rp.y + 0.1));
    col = mix(uCanvas, col, band);

    // gentle luminosity toward the top
    col += (vUv.y - 0.5) * 0.03;

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
          uCanvas: { value: hexToVec3(auraColors.canvas) },
          uAqua: { value: hexToVec3(auraColors.paleAqua) },
          uMint: { value: hexToVec3(auraColors.mint) },
          uPowder: { value: hexToVec3(auraColors.powderBlue) },
          uSand: { value: hexToVec3(auraColors.warmSand) },
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
