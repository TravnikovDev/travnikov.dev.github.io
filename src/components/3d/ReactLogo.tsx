import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function ReactLogo({ position, scale = 1 }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.2;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Center dot */}
      <mesh castShadow>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshPhysicalMaterial
          color="#0077FF" // Light theme blue
          roughness={0.1}
          metalness={0.8}
          emissive="#0077FF"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Orbits */}
      {[...Array(3)].map((_, i) => {
        const angle = (i / 3) * Math.PI;
        return (
          <group key={i} rotation={[angle, angle * 2, angle / 2]}>
            <mesh>
              <torusGeometry args={[0.4, 0.02, 16, 30]} />
              <meshPhysicalMaterial
                color="#0077FF" // Light theme blue
                roughness={0.3}
                metalness={0.7}
                emissive="#0077FF"
                emissiveIntensity={0.4} // Slightly more intense for light theme
                transparent
                opacity={0.7}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default ReactLogo;
