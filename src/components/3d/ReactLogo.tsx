import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";

interface ReactLogoProps {
  position: [number, number, number];
  scale?: number;
}

function ReactLogo({ position = [0, 0, 0], scale = 1 }: ReactLogoProps) {
  const groupRef = useRef<Group>(null);
  const initialPosition = useRef<Vector3>(new Vector3(...position));

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();

      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.2;
      groupRef.current.position.y = initialPosition.current.y + Math.sin(t * 0.5) * 0.1;

      // Hover effect with proper scale handling
      const hoverScale = scale * (1 + Math.sin(t * 2) * 0.1);
      groupRef.current.scale.setScalar(hoverScale);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Outer ellipse */}
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial color="#61DAFB" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Middle ellipse */}
      <mesh rotation={[0, 0, -Math.PI / 3]}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial color="#61DAFB" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Inner ellipse */}
      <mesh>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial color="#61DAFB" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Center dot */}
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#61DAFB" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default ReactLogo;
