import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { Group } from "three";

interface FloatingCodeBlockProps {
  position: [number, number, number];
  rotation?: [number, number, number]; // Make rotation optional
  scale?: number;
}

function FloatingCodeBlock({ 
  position, 
  rotation = [0, 0, 0], // Add default value
  scale = 1 
}: FloatingCodeBlockProps) {
  const blockRef = useRef<Group>(null);
  const initialY = useRef(position[1]); // Store initial Y position

  useFrame(({ clock }) => {
    if (!blockRef.current) return;
    
    const t = clock.getElapsedTime();

    // Gentle floating animation
    blockRef.current.position.y = initialY.current + Math.sin(t * 0.4 + 2) * 0.15;
    // Safe access to rotation since we have a default value
    blockRef.current.rotation.z = rotation[2] + Math.sin(t * 0.3) * 0.05;

    // Update position based on scroll
    const scrollY = window.scrollY || window.pageYOffset;
    blockRef.current.position.y += scrollY * 0.001;
  });

  return (
    <group ref={blockRef} position={position} rotation={rotation} scale={scale}>
      {/* Code block background */}
      <RoundedBox
        args={[1.2, 0.7, 0.05]}
        radius={0.05}
        smoothness={8}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#121420"
          roughness={0.3}
          metalness={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
      </RoundedBox>

      {/* Code lines */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 0.25 - i * 0.11, 0.03]}>
          <planeGeometry
            args={[i % 3 === 0 ? 0.8 : i % 2 === 0 ? 0.7 : 0.5, 0.03]}
          />
          <meshBasicMaterial
            color={
              i === 0
                ? "#E0000E"
                : i === 1
                ? "#0078F0"
                : i === 2
                ? "#7000E0"
                : i === 3
                ? "#0078F0"
                : "#FFFFFF"
            }
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export default FloatingCodeBlock;
