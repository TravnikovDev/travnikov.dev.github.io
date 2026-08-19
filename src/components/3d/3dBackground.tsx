import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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

// All viewport-dependent sizing happens inside useFrame (which rewrites every
// position each frame anyway), so props stay literal/stable and a window
// resize never re-renders this component or regenerates the random buffers.
const BokehParticlesImpl = ({
  count = 60,
  spreadScale = 1.2,
  size = 0.6,
  opacity = 0.55,
  shimmer = 0.25,
  drift = 0.04,
  rise = 0.02,
  frontDepth = -1.2,
  color = auraColors.warmSand,
  bandAngle = 0.62,
  sigmaScale = 0.22,
}: {
  count?: number;
  /** band length as a multiple of the viewport diagonal */
  spreadScale?: number;
  size?: number;
  opacity?: number;
  shimmer?: number;
  drift?: number;
  rise?: number;
  frontDepth?: number;
  color?: string;
  bandAngle?: number;
  /** gaussian band thickness as a multiple of the viewport height */
  sigmaScale?: number;
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
    // Normalized band-space samples: u along the ribbon axis in [-0.5, 0.5],
    // v across it (unit gaussian). World scale is applied per-frame from the
    // live viewport so a resize just restretches — it never resamples.
    const positions = new Float32Array(count * 3);
    const bandU = new Float32Array(count);
    const bandV = new Float32Array(count);
    const depth = new Float32Array(count);
    const phases = new Float32Array(count);
    const offsets = new Float32Array(count * 3);
    const colorBuffer = new Float32Array(count * 3);
    const baseColor = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      bandU[i] = Math.random() - 0.5;
      bandV[i] = gauss();
      depth[i] = frontDepth - Math.random() * 1.2;
      phases[i] = Math.random() * Math.PI * 2;
      offsets[i * 3] = Math.random() * Math.PI * 2;
      offsets[i * 3 + 1] = Math.random() * Math.PI * 2;
      offsets[i * 3 + 2] = Math.random() * Math.PI * 2;
      const tint = baseColor.clone().lerp(new THREE.Color("#FFFFFF"), 0.05);
      colorBuffer[i * 3] = tint.r;
      colorBuffer[i * 3 + 1] = tint.g;
      colorBuffer[i * 3 + 2] = tint.b;
    }
    return { positions, bandU, bandV, depth, phases, offsets, colors: colorBuffer };
  }, [count, frontDepth, color]);

  useFrame(({ clock, viewport }) => {
    const time = clock.getElapsedTime();
    const geometry = pointsRef.current?.geometry;
    const material = pointsRef.current?.material as
      | THREE.PointsMaterial
      | undefined;
    if (!geometry) return;
    const positions = geometry.attributes.position.array as Float32Array;
    const spread = Math.hypot(viewport.width, viewport.height) * spreadScale;
    const sigma = viewport.height * sigmaScale;
    // Portrait screens draw roughly half the particles
    const visible = Math.round(count * (viewport.aspect < 1 ? 0.5 : 1));
    const cosA = Math.cos(bandAngle);
    const sinA = Math.sin(bandAngle);
    for (let i = 0; i < count; i++) {
      const index = i * 3;
      const u = particles.bandU[i] * spread;
      const v = particles.bandV[i] * sigma;
      positions[index] =
        cosA * u - sinA * v +
        Math.sin(time * 0.14 + particles.offsets[index]) * drift;
      positions[index + 1] =
        sinA * u + cosA * v +
        Math.cos(time * 0.12 + particles.offsets[index + 1]) * rise * 2.2;
      positions[index + 2] =
        particles.depth[i] +
        Math.sin(time * 0.1 + particles.offsets[index + 2]) * 0.22;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.setDrawRange(0, visible);
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

// props are primitive and stable per layer → memo keeps particles from
// re-rendering when the parent Scene re-renders for any reason
const BokehParticles = React.memo(BokehParticlesImpl);

// Fluid shader canvas + bokeh clustered along the same diagonal band.
// Deliberately viewport-free: every prop below is a literal, so this tree
// renders exactly once — resizes are absorbed inside each layer's useFrame.
function Scene() {
  return (
    <>
      <FluidBackground />
      {/* tiny golden sparks hugging the ribbon — warm lights on a cool canvas */}
      <BokehParticles
        count={55}
        spreadScale={1.3}
        size={0.14}
        opacity={0.68}
        shimmer={0.16}
        drift={0.12}
        rise={0.06}
        frontDepth={-0.6}
        color="#F2D9AE"
        sigmaScale={0.2}
      />
      {/* mid golden glow dots */}
      <BokehParticles
        count={26}
        spreadScale={1.2}
        size={0.4}
        opacity={0.55}
        shimmer={0.18}
        drift={0.1}
        rise={0.05}
        frontDepth={-0.8}
        color="#F0D3A4"
        sigmaScale={0.22}
      />
      {/* a few large soft discs, far layer */}
      <BokehParticles
        count={5}
        spreadScale={1.1}
        size={0.8}
        opacity={0.2}
        shimmer={0.08}
        drift={0.08}
        rise={0.04}
        frontDepth={-1.2}
        color="#F2DCB6"
        sigmaScale={0.26}
      />
      {/* foreground out-of-focus discs — depth-of-field layer */}
      <BokehParticles
        count={6}
        spreadScale={1.2}
        size={1.7}
        opacity={0.1}
        shimmer={0.05}
        drift={0.16}
        rise={0.06}
        frontDepth={-0.12}
        color="#F5E6C8"
        sigmaScale={0.4}
      />
    </>
  );
}

// Main component with proper fullscreen fixed positioning
function ThreeDBackground() {
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

// no props — memo makes it render once and stay stable through any parent
// re-render (e.g. scroll-driven state elsewhere on the page)
export default React.memo(ThreeDBackground);
