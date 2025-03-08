import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text3D } from "@react-three/drei";

function FloatingName() {
  const textRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock, pointer }) => {
    if (textRef.current) {
      const t = clock.getElapsedTime();

      textRef.current.position.y = Math.sin(t * 0.5) * 0.15;

      textRef.current.rotation.x =
        pointer.y * 0.2 - 0.1 + Math.sin(t * 0.3) * 0.05;
      textRef.current.rotation.y =
        pointer.x * 0.3 - 0.15 + Math.sin(t * 0.4) * 0.05;

      if (materialRef.current) {
        materialRef.current.emissiveIntensity = 0.8 + Math.sin(t * 2) * 0.2;
      }
    }
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
          <meshPhysicalMaterial
            ref={materialRef}
            color="#E3E7F1"
            roughness={0.05}
            metalness={0.9}
            emissive="#E3E7F1"
            emissiveIntensity={0.8}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={1}
          />
        </Text3D>
      </group>
    </Float>
  );
}

export default FloatingName;
