import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
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
            {/* Banana with curved shape and more distinctive banana form */}
            <mesh rotation={[0, 0, Math.PI / 3]}>
              <torusGeometry args={[0.5, 0.15, 8, 16, Math.PI * 0.8]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            {/* Banana tip */}
            <mesh position={[0.3, 0.4, 0]} rotation={[0, 0, Math.PI / 6]}>
              <coneGeometry args={[0.1, 0.2, 6]} />
              <primitive object={wireframeMaterial} />
            </mesh>
            {/* Banana stem */}
            <mesh position={[-0.35, 0.25, 0]} rotation={[0, 0, Math.PI / 4]}>
              <cylinderGeometry args={[0.03, 0.03, 0.15, 6]} />
              <primitive object={wireframeMaterial} />
            </mesh>
            {/* Glow effect */}
            <mesh rotation={[0, 0, Math.PI / 3]} scale={1.05}>
              <torusGeometry args={[0.5, 0.15, 8, 16, Math.PI * 0.8]} />
              <primitive object={glowMaterial} />
            </mesh>
          </group>
        );

      case 'eggplant':
        return (
          <group>
            {/* Eggplant body - more bulbous at bottom */}
            <mesh position={[0, -0.1, 0]}>
              <latheGeometry args={[
                [
                  new THREE.Vector2(0, -0.5),
                  new THREE.Vector2(0.1, -0.45),
                  new THREE.Vector2(0.25, -0.3),
                  new THREE.Vector2(0.3, 0),
                  new THREE.Vector2(0.2, 0.3),
                  new THREE.Vector2(0, 0.5),
                ],
                12
              ]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            {/* Eggplant stem and leaf */}
            <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.1, 0.2, 8]} />
              <primitive object={wireframeMaterial} />
            </mesh>
            <mesh position={[0.1, 0.55, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.2, 0.05, 0.05]} />
              <primitive object={wireframeMaterial} />
            </mesh>
            {/* Glow effect */}
            <mesh position={[0, -0.1, 0]} scale={1.05}>
              <latheGeometry args={[
                [
                  new THREE.Vector2(0, -0.5),
                  new THREE.Vector2(0.1, -0.45),
                  new THREE.Vector2(0.25, -0.3),
                  new THREE.Vector2(0.3, 0),
                  new THREE.Vector2(0.2, 0.3),
                  new THREE.Vector2(0, 0.5),
                ],
                12
              ]} />
              <primitive object={glowMaterial} />
            </mesh>
          </group>
        );

      case 'strawberry':
        return (
          <group>
            {/* Strawberry body - heart-like shape */}
            <mesh position={[0, -0.1, 0]}>
              <latheGeometry args={[
                [
                  new THREE.Vector2(0, -0.4),
                  new THREE.Vector2(0.3, -0.2),
                  new THREE.Vector2(0.4, 0),
                  new THREE.Vector2(0.3, 0.2),
                  new THREE.Vector2(0, 0.4),
                ],
                12
              ]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            {/* Strawberry stem and leaves */}
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.1, 6]} />
              <primitive object={wireframeMaterial} />
            </mesh>
            {/* Leaves like a star shape */}
            <mesh position={[0, 0.45, 0]}>
              <dodecahedronGeometry args={[0.15, 0]} />
              <primitive object={wireframeMaterial} />
            </mesh>
            {/* Glow effect */}
            <mesh position={[0, -0.1, 0]} scale={1.05}>
              <latheGeometry args={[
                [
                  new THREE.Vector2(0, -0.4),
                  new THREE.Vector2(0.3, -0.2),
                  new THREE.Vector2(0.4, 0),
                  new THREE.Vector2(0.3, 0.2),
                  new THREE.Vector2(0, 0.4),
                ],
                12
              ]} />
              <primitive object={glowMaterial} />
            </mesh>
          </group>
        );

      case 'lemon':
        return (
          <group>
            {/* Lemon with pointed ends */}
            <mesh>
              <latheGeometry args={[
                [
                  new THREE.Vector2(0, -0.5),
                  new THREE.Vector2(0.25, -0.3),
                  new THREE.Vector2(0.4, 0),
                  new THREE.Vector2(0.25, 0.3),
                  new THREE.Vector2(0, 0.5),
                ],
                10
              ]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            {/* Small stem */}
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
              <primitive object={wireframeMaterial} />
            </mesh>
            {/* Glow effect */}
            <mesh scale={1.05}>
              <latheGeometry args={[
                [
                  new THREE.Vector2(0, -0.5),
                  new THREE.Vector2(0.25, -0.3),
                  new THREE.Vector2(0.4, 0),
                  new THREE.Vector2(0.25, 0.3),
                  new THREE.Vector2(0, 0.5),
                ],
                10
              ]} />
              <primitive object={glowMaterial} />
            </mesh>
          </group>
        );

      case 'mango':
        return (
          <group>
            {/* Mango with kidney shape */}
            <mesh>
              <latheGeometry args={[
                [
                  new THREE.Vector2(0, -0.5),
                  new THREE.Vector2(0.2, -0.4),
                  new THREE.Vector2(0.35, -0.1),
                  new THREE.Vector2(0.25, 0.3),
                  new THREE.Vector2(0, 0.5),
                ],
                10
              ]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            {/* Small stem */}
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
              <primitive object={wireframeMaterial} />
            </mesh>
            {/* Glow effect */}
            <mesh scale={1.05}>
              <latheGeometry args={[
                [
                  new THREE.Vector2(0, -0.5),
                  new THREE.Vector2(0.2, -0.4),
                  new THREE.Vector2(0.35, -0.1),
                  new THREE.Vector2(0.25, 0.3),
                  new THREE.Vector2(0, 0.5),
                ],
                10
              ]} />
              <primitive object={glowMaterial} />
            </mesh>
          </group>
        );
        
      case 'cherry':
        return (
          <group>
            {/* Cherry body - two connected spheres */}
            <mesh position={[0.15, -0.1, 0]}>
              <sphereGeometry args={[0.25, 10, 10]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            <mesh position={[-0.15, -0.15, 0]}>
              <sphereGeometry args={[0.22, 10, 10]} />
              <primitive object={wireframeMaterial} />
            </mesh>
            {/* Cherry stem - curved line */}
            <mesh>
              <tubeGeometry args={[
                new THREE.CatmullRomCurve3([
                  new THREE.Vector3(0, 0.1, 0),
                  new THREE.Vector3(0.05, 0.25, 0),
                  new THREE.Vector3(0.15, 0.3, 0),
                  new THREE.Vector3(0.15, 0.15, 0),
                  new THREE.Vector3(0.15, 0, 0),
                ]),
                8,
                0.03,
                8,
                false
              ]} />
              <primitive object={wireframeMaterial} />
            </mesh>
            {/* Glow effect */}
            <mesh position={[0.15, -0.1, 0]} scale={1.05}>
              <sphereGeometry args={[0.25, 10, 10]} />
              <primitive object={glowMaterial} />
            </mesh>
            <mesh position={[-0.15, -0.15, 0]} scale={1.05}>
              <sphereGeometry args={[0.22, 10, 10]} />
              <primitive object={glowMaterial} />
            </mesh>
          </group>
        );
        
      case 'pineapple':
        return (
          <group>
            {/* Pineapple body */}
            <mesh position={[0, -0.1, 0]}>
              <latheGeometry args={[
                [
                  new THREE.Vector2(0, -0.5),
                  new THREE.Vector2(0.2, -0.4),
                  new THREE.Vector2(0.25, 0),
                  new THREE.Vector2(0.2, 0.4),
                  new THREE.Vector2(0, 0.5),
                ],
                10
              ]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            
            {/* Pineapple "cross-hatch" texture using rings */}
            {[...Array(5)].map((_, i) => (
              <mesh key={i} position={[0, -0.3 + i * 0.15, 0]} rotation={[Math.PI/2, 0, 0]}>
                <torusGeometry args={[0.25, 0.01, 6, 12]} />
                <primitive object={wireframeMaterial} />
              </mesh>
            ))}
            
            {/* Pineapple crown */}
            {[...Array(5)].map((_, i) => (
              <mesh key={`leaf-${i}`} position={[0, 0.5, 0]} rotation={[0.3, i * Math.PI/2.5, 0]}>
                <coneGeometry args={[0.08, 0.25, 5]} />
                <primitive object={wireframeMaterial} />
              </mesh>
            ))}
            
            {/* Glow effect */}
            <mesh position={[0, -0.1, 0]} scale={1.05}>
              <latheGeometry args={[
                [
                  new THREE.Vector2(0, -0.5),
                  new THREE.Vector2(0.2, -0.4),
                  new THREE.Vector2(0.25, 0),
                  new THREE.Vector2(0.2, 0.4),
                  new THREE.Vector2(0, 0.5),
                ],
                10
              ]} />
              <primitive object={glowMaterial} />
            </mesh>
          </group>
        );
        
      case 'avocado':
      default:
        return (
          <group>
            {/* Avocado - pear shape with seed */}
            <mesh position={[0, -0.1, 0]}>
              <latheGeometry args={[
                [
                  new THREE.Vector2(0, -0.5),
                  new THREE.Vector2(0.25, -0.3),
                  new THREE.Vector2(0.35, 0),
                  new THREE.Vector2(0.25, 0.3),
                  new THREE.Vector2(0, 0.5),
                ],
                10
              ]} />
              <primitive object={wireframeMaterial} ref={wireframeMaterialRef} />
            </mesh>
            {/* Avocado seed */}
            <mesh position={[0, -0.1, 0.05]}>
              <sphereGeometry args={[0.2, 8, 8]} />
              <meshBasicMaterial color="#553311" wireframe={true} transparent={true} opacity={0.8} />
            </mesh>
            {/* Glow effect */}
            <mesh position={[0, -0.1, 0]} scale={1.05}>
              <latheGeometry args={[
                [
                  new THREE.Vector2(0, -0.5),
                  new THREE.Vector2(0.25, -0.3),
                  new THREE.Vector2(0.35, 0),
                  new THREE.Vector2(0.25, 0.3),
                  new THREE.Vector2(0, 0.5),
                ],
                10
              ]} />
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