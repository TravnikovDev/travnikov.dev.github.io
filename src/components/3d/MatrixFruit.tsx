import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MatrixFruitProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  fruitType?: 'banana' | 'eggplant' | 'apple' | 'orange' | 'dragonfruit' | 'watermelon';
  color?: string;
  speed?: number;
}

export default function MatrixFruit({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  fruitType = 'banana',
  color = '#FF00FF', // Default changed to vaporwave pink
  speed = 1
}: MatrixFruitProps) {
  const meshRef = useRef<THREE.Group>(null);
  const initialY = useRef(position[1]);
  const wireframeMaterialRef = useRef<THREE.Material>();

  // Create the wireframe material with vaporwave glow
  const wireframeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
  }, [color]);

  // Create enhanced glow material with more vibrant effect
  const glowMaterial = useMemo(() => {
    const glowColor = new THREE.Color(color);
    glowColor.multiplyScalar(1.5); // Make the glow more intense
    return new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0.3,
    });
  }, [color]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * speed;
      
      // Floating animation
      meshRef.current.position.y = initialY.current + Math.sin(time * 0.4) * 0.3;
      
      // Rotation animation
      meshRef.current.rotation.x = rotation[0] + Math.sin(time * 0.3) * 0.1;
      meshRef.current.rotation.y = rotation[1] + time * 0.2;
      meshRef.current.rotation.z = rotation[2] + Math.sin(time * 0.2) * 0.05;
      
      // Pulse the wireframe material for a digital effect
      if (wireframeMaterialRef.current) {
        const pulse = 0.7 + Math.sin(time * 2) * 0.3;
        (wireframeMaterialRef.current as THREE.MeshBasicMaterial).opacity = pulse;
      }
    }
  });

  // Render the appropriate fruit shape
  const renderFruitGeometry = () => {
    switch (fruitType) {
      case 'banana':
        return (
          <group>
            {/* Banana is a curved cylinder with tapered ends */}
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <torusGeometry args={[0.5, 0.15, 8, 16, Math.PI]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            {/* Glow effect */}
            <mesh rotation={[0, 0, Math.PI / 4]} scale={1.05}>
              <torusGeometry args={[0.5, 0.15, 8, 16, Math.PI]} />
              <primitive object={glowMaterial} />
            </mesh>
          </group>
        );

      case 'dragonfruit':
        return (
          <group>
            {/* Dragon fruit body */}
            <mesh>
              <sphereGeometry args={[0.4, 16, 16]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            {/* Spiky exterior */}
            {Array.from({ length: 20 }).map((_, i) => (
              <mesh 
                key={i} 
                position={[
                  Math.sin(i * Math.PI * 2 / 20) * 0.4,
                  Math.cos(i * Math.PI * 2 / 20) * 0.4,
                  0
                ]}
              >
                <coneGeometry args={[0.05, 0.1, 4]} />
                <primitive object={wireframeMaterial} />
              </mesh>
            ))}
            {/* Glow effect */}
            <mesh scale={1.15}>
              <sphereGeometry args={[0.4, 16, 16]} />
              <primitive object={glowMaterial} />
            </mesh>
          </group>
        );

      case 'watermelon':
        return (
          <group>
            {/* Watermelon body */}
            <mesh rotation={[0, 0, Math.PI / 6]}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            {/* Decorative stripes */}
            {Array.from({ length: 5 }).map((_, i) => (
              <mesh 
                key={i} 
                position={[0, -0.25 + i * 0.1, 0]}
                rotation={[0, 0, Math.PI / 6]}
              >
                <torusGeometry args={[0.5, 0.02, 8, 16]} />
                <primitive object={glowMaterial} />
              </mesh>
            ))}
            {/* Glow effect */}
            <mesh rotation={[0, 0, Math.PI / 6]} scale={1.05}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <primitive object={glowMaterial} />
            </mesh>
          </group>
        );

      case 'eggplant':
        return (
          <group>
            {/* Eggplant body */}
            <mesh position={[0, -0.1, 0]}>
              <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            {/* Eggplant stem */}
            <mesh position={[0, 0.5, 0]} rotation={[0.2, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
              <primitive object={wireframeMaterial} />
            </mesh>
            {/* Glow effect */}
            <mesh position={[0, -0.1, 0]} scale={1.05}>
              <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
              <primitive object={glowMaterial} />
            </mesh>
          </group>
        );

      case 'apple':
        return (
          <group>
            {/* Apple body */}
            <mesh>
              <sphereGeometry args={[0.4, 16, 16]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            {/* Apple stem */}
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
              <primitive object={wireframeMaterial} />
            </mesh>
            {/* Glow effect */}
            <mesh scale={1.05}>
              <sphereGeometry args={[0.4, 16, 16]} />
              <primitive object={glowMaterial} />
            </mesh>
          </group>
        );

      case 'orange':
      default:
        return (
          <group>
            {/* Orange */}
            <mesh>
              <sphereGeometry args={[0.4, 16, 16]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            {/* Glow effect */}
            <mesh scale={1.05}>
              <sphereGeometry args={[0.4, 16, 16]} />
              <primitive object={glowMaterial} />
            </mesh>
          </group>
        );
    }
  };

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {renderFruitGeometry()}
    </group>
  );
}