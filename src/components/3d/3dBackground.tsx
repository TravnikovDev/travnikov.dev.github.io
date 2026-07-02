import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import * as styles from "./3dBackground.module.css";
import { auraColors } from "../../theme";
import FluidBackground from "./FluidBackground";

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Approximate gaussian in [-1, 1] for clustering particles around the band axis
const gauss = () =>
  (Math.random() + Math.random() + Math.random() + Math.random()) / 2 - 1;

const BokehParticles = ({
  count = 60,
  spread = 16,
  size = 0.6,
  opacity = 0.55,
  shimmer = 0.25,
  drift = 0.04,
  rise = 0.02,
  frontDepth = -1.2,
  color = auraColors.warmSand,
  bandAngle = 0.62,
  bandSigma = 2.2,
}: {
  count?: number;
  spread?: number;
  size?: number;
  opacity?: number;
  shimmer?: number;
  drift?: number;
  rise?: number;
  frontDepth?: number;
  color?: string;
  bandAngle?: number;
  bandSigma?: number;
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.45, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(0.65, hexToRgba(color, 0.75));
    gradient.addColorStop(0.8, hexToRgba(color, 0.15));
    gradient.addColorStop(1, hexToRgba(color, 0));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }, [color]);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const offsets = new Float32Array(count * 3);
    const colorBuffer = new Float32Array(count * 3);
    const baseColor = new THREE.Color(color);
    const cosA = Math.cos(bandAngle);
    const sinA = Math.sin(bandAngle);
    for (let i = 0; i < count; i++) {
      // Sample along the diagonal ribbon axis, gaussian falloff across it
      const u = (Math.random() - 0.5) * spread;
      const v = gauss() * bandSigma;
      positions[i * 3] = cosA * u - sinA * v;
      positions[i * 3 + 1] = sinA * u + cosA * v;
      positions[i * 3 + 2] = frontDepth - Math.random() * 1.2;
      phases[i] = Math.random() * Math.PI * 2;
      offsets[i * 3] = Math.random() * Math.PI * 2;
      offsets[i * 3 + 1] = Math.random() * Math.PI * 2;
      offsets[i * 3 + 2] = Math.random() * Math.PI * 2;
      const tint = baseColor.clone().lerp(new THREE.Color("#FFFFFF"), 0.05);
      colorBuffer[i * 3] = tint.r;
      colorBuffer[i * 3 + 1] = tint.g;
      colorBuffer[i * 3 + 2] = tint.b;
    }
    return {
      positions,
      basePositions: positions.slice(),
      phases,
      offsets,
      colors: colorBuffer,
    };
  }, [count, spread, frontDepth, color, bandAngle, bandSigma]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const geometry = pointsRef.current?.geometry;
    const material = pointsRef.current?.material as
      | THREE.PointsMaterial
      | undefined;
    if (!geometry) return;
    const positions = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const index = i * 3;
      const baseX = particles.basePositions[index];
      const baseY = particles.basePositions[index + 1];
      const baseZ = particles.basePositions[index + 2];
      positions[index] =
        baseX + Math.sin(time * 0.14 + particles.offsets[index]) * drift;
      positions[index + 1] =
        baseY +
        Math.cos(time * 0.12 + particles.offsets[index + 1]) * rise * 2.2;
      positions[index + 2] =
        baseZ + Math.sin(time * 0.1 + particles.offsets[index + 2]) * 0.22;
    }
    geometry.attributes.position.needsUpdate = true;
    if (material) {
      material.opacity =
        opacity + Math.sin(time * 0.6 + particles.phases[0]) * shimmer;
    }
  });

  return (
    // key remounts the geometry when count changes: buffer attributes can't resize
    <points key={count} ref={pointsRef} renderOrder={20}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        map={texture ?? undefined}
        alphaMap={texture ?? undefined}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
};

// Fluid shader canvas + bokeh clustered along the same diagonal band
function Scene() {
  const { viewport } = useThree();
  const diagonal = Math.hypot(viewport.width, viewport.height);
  // Portrait screens get roughly half the particles
  const density = viewport.aspect < 1 ? 0.5 : 1;

  return (
    <>
      <FluidBackground />
      {/* tiny warm sparks hugging the ribbon */}
      <BokehParticles
        count={Math.round(34 * density)}
        spread={diagonal * 1.3}
        size={0.14}
        opacity={0.6}
        shimmer={0.15}
        drift={0.12}
        rise={0.06}
        frontDepth={-0.6}
        color={auraColors.cream}
        bandSigma={viewport.height * 0.22}
      />
      {/* mid glow dots */}
      <BokehParticles
        count={Math.round(18 * density)}
        spread={diagonal * 1.2}
        size={0.45}
        opacity={0.55}
        shimmer={0.18}
        drift={0.1}
        rise={0.05}
        frontDepth={-0.8}
        color={auraColors.warmSand}
        bandSigma={viewport.height * 0.26}
      />
      {/* a few large soft discs, far layer */}
      <BokehParticles
        count={Math.round(7 * density)}
        spread={diagonal * 1.1}
        size={1.15}
        opacity={0.3}
        shimmer={0.14}
        drift={0.08}
        rise={0.04}
        frontDepth={-1.2}
        color={auraColors.cream}
        bandSigma={viewport.height * 0.3}
      />
    </>
  );
}

// Main component with proper fullscreen fixed positioning
export default function ThreeDBackground() {
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  return (
    <div className={styles.backgroundContainer}>
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 60,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        frameloop={prefersReducedMotion ? "demand" : "always"}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(auraColors.canvas), 1);
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          backgroundColor: auraColors.canvas,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
