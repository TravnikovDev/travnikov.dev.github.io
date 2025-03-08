import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

function FloatingUICard({ position, rotation, scale = 1, color = "#0078F0" }) {
  const cardRef = useRef();
  const contentRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Gentle floating animation
    if (cardRef.current) {
      cardRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
      cardRef.current.rotation.x = rotation[0] + Math.sin(t * 0.3) * 0.03;
      cardRef.current.rotation.y = rotation[1] + Math.sin(t * 0.4) * 0.03;

      // Update position based on scroll
      const scrollY = window.scrollY || window.pageYOffset;
      cardRef.current.position.y += scrollY * 0.001;
    }

    // Pulse content
    if (contentRef.current) {
      contentRef.current.scale.x = 1 + Math.sin(t * 0.5) * 0.02;
      contentRef.current.scale.y = 1 + Math.sin(t * 0.5) * 0.02;
    }
  });

  return (
    <group ref={cardRef} position={position} rotation={rotation} scale={scale}>
      {/* Card body */}
      <RoundedBox
        args={[1.6, 0.9, 0.05]}
        radius={0.1}
        smoothness={10}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#1A1E2A"
          roughness={0.3}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.2}
          envMapIntensity={2}
        />
      </RoundedBox>

      {/* UI content */}
      <group ref={contentRef} position={[0, 0, 0.03]}>
        {/* Header bar */}
        <mesh position={[0, 0.35, 0]}>
          <planeGeometry args={[1.4, 0.15]} />
          <meshBasicMaterial color={color} transparent opacity={0.9} />
        </mesh>

        {/* Content blocks */}
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[0, 0.15 - i * 0.2, 0]}>
            <planeGeometry args={[1.4, 0.1]} />
            <meshBasicMaterial
              color="white"
              transparent
              opacity={0.1 + 0.05 * Math.abs(1 - i)}
            />
          </mesh>
        ))}

        {/* Button */}
        <mesh position={[0.45, -0.3, 0]}>
          <planeGeometry args={[0.3, 0.12]} />
          <meshBasicMaterial color={color} transparent opacity={0.9} />
        </mesh>
      </group>
    </group>
  );
}

export default FloatingUICard;
