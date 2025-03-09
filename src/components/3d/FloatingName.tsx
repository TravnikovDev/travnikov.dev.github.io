import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text3D } from "@react-three/drei";
import * as THREE from "three";
import { Group, MeshStandardMaterial } from "three";

function FloatingName() {
  const textRef = useRef<Group>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);
  const initialY = useRef<number>(0);

  useFrame(({ clock }) => {
    if (!textRef.current || !materialRef.current) return;

    const t = clock.getElapsedTime();

    // Smooth floating animation
    textRef.current.position.y = (initialY.current || 0) + Math.sin(t * 0.5) * 0.15;

    // Update position based on scroll with smooth lerping
    const targetY = (window.scrollY || window.pageYOffset) * 0.001;
    initialY.current = THREE.MathUtils.lerp(initialY.current || 0, targetY, 0.1);

    // Smooth material animation
    materialRef.current.emissiveIntensity = 0.8 + Math.sin(t * 2) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={textRef}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.8}
          height={0.2}
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.04}
          bevelOffset={0}
          bevelSegments={10}
          position={[-3.2, 0, 0]}
        >
          TRAVNIKOV
          <meshStandardMaterial
            ref={materialRef}
            color="#E3E7F1"
            roughness={0.05}
            metalness={0.9}
            emissive="#E3E7F1"
            emissiveIntensity={0.8}
            envMapIntensity={1.5}
          />
        </Text3D>
      </group>
    </Float>
  );
}

export default FloatingName;
