import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

function AnimatedBlob({ position, color, scale = 1, speed = 1, complexity = 1.5 }) {
  const blobRef = useRef();

  useFrame(({ clock }) => {
    if (blobRef.current) {
      const t = clock.getElapsedTime() * speed;

      // Rotation animation
      blobRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
      blobRef.current.rotation.y = t * 0.3;
      blobRef.current.rotation.z = Math.sin(t * 0.4) * 0.1;

      // Breathing scale effect
      const breathingScale = scale * (1 + Math.sin(t * 0.4) * 0.05);
      blobRef.current.scale.set(breathingScale, breathingScale, breathingScale);

      // Update position based on scroll
      const scrollY = window.scrollY || window.pageYOffset;
      blobRef.current.position.y = position[1] + scrollY * 0.001;

      if (blobRef.current.material) {
        blobRef.current.material.distort = 0.4 + Math.sin(t) * 0.1;
        blobRef.current.material.speed = 1.5 * speed;
      }
    }
  });

  return (
    <Sphere
      ref={blobRef}
      position={position}
      args={[1 * scale, 64, 64]}
    >
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={1.5 * speed}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.4}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        complexity={complexity}
      />
    </Sphere>
  );
}

export default AnimatedBlob;
