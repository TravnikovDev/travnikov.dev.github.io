import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Group, MathUtils } from "three";
import * as styles from "./3dBackground.module.css";
import { auraColors } from "../../theme";

type Position = [number, number, number];
type Rotation = [number, number, number];

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const HazePlane = ({
  width,
  height,
  color,
  opacity,
  position = [0, 0, -6] as Position,
  rotation = [-0.2, 0, 0] as Rotation,
}: {
  width: number;
  height: number;
  color: string;
  opacity: number;
  position?: Position;
  rotation?: Rotation;
}) => (
  <mesh position={position} rotation={rotation}>
    <planeGeometry args={[width, height, 1, 1]} />
    <meshBasicMaterial color={color} transparent opacity={opacity} />
  </mesh>
);

const BokehParticles = ({
  count = 80,
  spread = 16,
  size = 0.6,
  opacity = 0.55,
  shimmer = 0.25,
  drift = 0.04,
  rise = 0.02,
  frontDepth = -1.2,
  color = auraColors.warmSand,
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
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
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
  }, [count, spread, frontDepth, color]);

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
    <points ref={pointsRef} renderOrder={20}>
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

const StreamBand = ({
  width,
  height,
  color,
  opacity,
  position,
  rotation = [-0.32, 0, -0.4] as Rotation,
  speed = 0.08,
  amplitude = 0.6,
  phase = 0,
}: {
  width: number;
  height: number;
  color: string;
  opacity: number;
  position: Position;
  rotation?: Rotation;
  speed?: number;
  amplitude?: number;
  phase?: number;
}) => {
  const bandRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (!bandRef.current) return;
    bandRef.current.position.x =
      position[0] + Math.sin(time * speed + phase) * amplitude * 0.2;
    bandRef.current.position.y =
      position[1] + Math.cos(time * speed * 0.8 + phase) * amplitude * 0.08;
  });

  return (
    <mesh ref={bandRef} position={position} rotation={rotation}>
      <planeGeometry args={[width, height, 1, 1]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={opacity}
        roughness={0.3}
        metalness={0.05}
        clearcoat={0.2}
        clearcoatRoughness={0.4}
        depthWrite={false}
      />
    </mesh>
  );
};

const WavePlane = ({
  width,
  height,
  color,
  opacity,
  position = [0, 0, 0] as Position,
  rotation = [-0.35, 0, 0] as Rotation,
  amplitude = 0.35,
  frequency = 0.35,
  speed = 0.2,
  offset = 0,
  segments = 90,
  whirlpools = [],
}: {
  width: number;
  height: number;
  color: string;
  opacity: number;
  position?: Position;
  rotation?: Rotation;
  amplitude?: number;
  frequency?: number;
  speed?: number;
  offset?: number;
  segments?: number;
  whirlpools?: {
    center: [number, number];
    radius: number;
    strength: number;
    speed: number;
  }[];
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(width, height, segments, segments),
    [width, height, segments]
  );
  const basePositions = useMemo(() => {
    const positions = geometry.attributes.position.array as Float32Array;
    return positions.slice();
  }, [geometry]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const positionAttribute = geometry.attributes.position;

    const dir1 = { x: 0.9, y: 0.4 };
    const dir2 = { x: -0.4, y: 0.9 };

    for (let i = 0; i < positionAttribute.count; i++) {
      const index = i * 3;
      const x = basePositions[index];
      const y = basePositions[index + 1];

      const wave1 = Math.sin(
        (x * dir1.x + y * dir1.y) * frequency + time * speed + offset
      );
      const wave2 = Math.cos(
        (x * dir2.x + y * dir2.y) * frequency * 0.8 +
          time * speed * 0.7 +
          offset
      );
      const ripple = Math.sin(x * 0.12 + y * 0.1 + time * speed * 1.2 + offset);
      let whirl = 0;
      for (const whirlpool of whirlpools) {
        const dx = x - whirlpool.center[0];
        const dy = y - whirlpool.center[1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < whirlpool.radius) {
          const falloff = 1 - dist / whirlpool.radius;
          whirl +=
            Math.sin(dist * 2 + time * whirlpool.speed) *
            whirlpool.strength *
            falloff;
        }
      }

      positionAttribute.array[index + 2] =
        (wave1 + wave2) * (amplitude * 0.45) +
        ripple * (amplitude * 0.15) +
        whirl;
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      rotation={rotation}
    >
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={opacity}
        roughness={0.35}
        metalness={0.05}
        clearcoat={0.4}
        clearcoatRoughness={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Main Scene component for the 3D background
function Scene() {
  const sceneRef = useRef<Group>(null);
  const { viewport } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight
        color={auraColors.cream}
        position={[6, 8, 10] as Position}
        intensity={0.85}
      />
      <pointLight
        color={auraColors.mint}
        position={[-3, 2, 5] as Position}
        intensity={0.6}
      />
      <pointLight
        color={auraColors.powderBlue}
        position={[3, -2, 4] as Position}
        intensity={0.5}
      />
      <pointLight
        color={auraColors.warmSand}
        position={[0, -4, 6] as Position}
        intensity={0.45}
      />

      <group ref={sceneRef}>
        <HazePlane
          width={viewport.width * 3.6}
          height={viewport.height * 2.8}
          color={auraColors.ivory}
          opacity={0.25}
          position={[0, 0.4, -6.5]}
        />
        <StreamBand
          width={viewport.width * 2.8}
          height={viewport.height * 0.35}
          color={auraColors.mint}
          opacity={0.18}
          position={[0, 0.6, -2.6]}
          rotation={[-0.28, 0, 0.5]}
          speed={0.06}
          phase={0.4}
        />
        <StreamBand
          width={viewport.width * 3.1}
          height={viewport.height * 0.28}
          color={auraColors.paleAqua}
          opacity={0.16}
          position={[0, -0.1, -3.2]}
          rotation={[-0.26, 0, 0.42]}
          speed={0.05}
          phase={1.2}
        />
        <StreamBand
          width={viewport.width * 3.4}
          height={viewport.height * 0.24}
          color={auraColors.powderBlue}
          opacity={0.16}
          position={[0, -0.7, -4.1]}
          rotation={[-0.24, 0, 0.35]}
          speed={0.04}
          phase={2.1}
        />
        <StreamBand
          width={viewport.width * 3.6}
          height={viewport.height * 0.22}
          color={auraColors.paleAqua}
          opacity={0.14}
          position={[0, -1.1, -4.8]}
          rotation={[-0.22, 0, 0.3]}
          speed={0.035}
          phase={2.8}
        />
        <WavePlane
          width={viewport.width * 3}
          height={viewport.height * 2.4}
          color={auraColors.mint}
          opacity={0.3}
          position={[0, 0.4, -2]}
          amplitude={0.7}
          frequency={0.22}
          speed={0.2}
          whirlpools={[
            { center: [-3, 1], radius: 3.5, strength: 0.25, speed: 0.6 },
            { center: [2.5, -0.5], radius: 3, strength: 0.22, speed: 0.5 },
          ]}
        />
        <WavePlane
          width={viewport.width * 3.2}
          height={viewport.height * 2.6}
          color={auraColors.paleAqua}
          opacity={0.22}
          position={[0, -0.4, -3.8]}
          amplitude={0.55}
          frequency={0.18}
          speed={0.16}
          offset={1.2}
          whirlpools={[
            { center: [-2, -1], radius: 3.2, strength: 0.18, speed: 0.45 },
          ]}
        />
        <WavePlane
          width={viewport.width * 3.4}
          height={viewport.height * 2.8}
          color={auraColors.mutedTeal}
          opacity={0.1}
          position={[0, -0.9, -5.2]}
          amplitude={0.45}
          frequency={0.16}
          speed={0.12}
          offset={2.4}
        />
        <BokehParticles
          count={280}
          spread={viewport.width * 2.4}
          size={0.3}
          opacity={0.6}
          shimmer={0.22}
          drift={0.14}
          rise={0.08}
          frontDepth={-0.6}
          color={auraColors.warmSand}
        />
        <BokehParticles
          count={140}
          spread={viewport.width * 2}
          size={0.6}
          opacity={0.78}
          shimmer={0.3}
          drift={0.12}
          rise={0.07}
          frontDepth={-0.75}
          color={auraColors.cream}
        />
        <BokehParticles
          count={32}
          spread={viewport.width * 1.6}
          size={1}
          opacity={0.5}
          shimmer={0.34}
          drift={0.1}
          rise={0.06}
          frontDepth={-0.9}
          color={auraColors.powderBlue}
        />
      </group>

      {/* Transparent canvas background to let the 3D scene show through */}
    </>
  );
}

// Main component with proper fullscreen fixed positioning
export default function ThreeDBackground() {
  return (
    <div className={styles.backgroundContainer}>
      <Canvas
        camera={{
          position: [0, 1.5, 7],
          fov: 60,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0xf3e9d8, 1);
        }}
        shadows
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          backgroundColor: auraColors.ivory,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
