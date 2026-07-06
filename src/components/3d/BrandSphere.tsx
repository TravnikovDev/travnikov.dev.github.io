import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";

// glossy turquoise sphere with a slow organic distortion wobble
function Sphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.35;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.22;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.08, 96, 96]} />
      <MeshDistortMaterial
        color="#4fc3b0"
        roughness={0.12}
        metalness={0.35}
        clearcoat={0.7}
        clearcoatRoughness={0.25}
        envMapIntensity={1.3}
        distort={0.34}
        speed={2.2}
      />
    </mesh>
  );
}

export default function BrandSphere({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    if (reducedMotion) return;
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => setOnScreen(e.isIntersecting),
      { rootMargin: "150px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  const frameloop = reducedMotion ? "demand" : onScreen ? "always" : "never";

  return (
    <div
      ref={wrapRef}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <Canvas
        dpr={[1, 2]}
        frameloop={frameloop}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3.1]} fov={42} />
        <ambientLight intensity={0.7} color="#eaf5ef" />
        <directionalLight position={[3, 4, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight
          position={[-3, -2, 2]}
          intensity={0.6}
          color="#bfe8dd"
        />
        {/* studio softbox → glossy reflections on the sphere */}
        <Environment resolution={64}>
          <mesh position={[0, 0, -6]} scale={[14, 14, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#eef7f3" />
          </mesh>
          <mesh position={[5, 4, 3]} rotation={[0, -1.0, 0]} scale={[7, 7, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-5, -2, 3]} rotation={[0, 1.0, 0]} scale={[6, 6, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#8fe0cf" />
          </mesh>
          <mesh position={[0, -5, 2]} rotation={[1.1, 0, 0]} scale={[8, 8, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#2a6f66" />
          </mesh>
        </Environment>
        <Sphere />
      </Canvas>
    </div>
  );
}
