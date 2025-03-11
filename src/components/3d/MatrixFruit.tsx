import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

interface MatrixFruitProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  fruitType?: 'banana' | 'eggplant' | 'strawberry' | 'lemon' | 'mango' | 'cherry' | 'pineapple' | 'avocado';
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
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const initialY = useRef(position[1]);

  // Load the OBJ model based on the fruit type
  const obj = useLoader(OBJLoader, `/models/${fruitType}.obj`);

  // Clone the model to avoid modifying the cached original
  const clonedModel = useMemo(() => obj.clone(), [obj]);

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

  // Apply wireframe material to all meshes in the model
  useEffect(() => {
    if (clonedModel) {
      clonedModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = wireframeMaterial;
        }
      });
    }
  }, [clonedModel, wireframeMaterial]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime() * speed;

      // Floating animation
      groupRef.current.position.y = initialY.current + Math.sin(time * 0.4) * 0.3;

      // Rotation animation
      groupRef.current.rotation.x = rotation[0] + Math.sin(time * 0.3) * 0.1;
      groupRef.current.rotation.y = rotation[1] + time * 0.2;
      groupRef.current.rotation.z = rotation[2] + Math.sin(time * 0.2) * 0.05;

      // Pulse the wireframe material for a digital effect
      if (wireframeMaterial) {
        const pulse = 0.7 + Math.sin(time * 2) * 0.3;
        wireframeMaterial.opacity = pulse;
      }
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={clonedModel} ref={modelRef} />
      <mesh scale={1.05}>
        <primitive object={glowMaterial} />
      </mesh>
    </group>
  );
}
