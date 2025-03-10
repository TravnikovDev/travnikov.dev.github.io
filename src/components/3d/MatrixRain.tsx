import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MatrixRainProps {
  count?: number;
  speed?: number;
  opacity?: number;
  spread?: number;
  position?: [number, number, number];
  color?: string;
}

export default function MatrixRain({
  count = 1000,
  speed = 1,
  opacity = 0.8,
  spread = 25,
  position = [0, 0, -15],
  color = '#00FF41'
}: MatrixRainProps) {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate matrix rain drops with random positions and speeds
  const drops = useMemo(() => {
    const temp = [];
    const spread2 = spread * 2; // For a more rectangular distribution (wider than tall)
    
    for (let i = 0; i < count; i++) {
      // Calculate random positions and speeds
      const x = (Math.random() - 0.5) * spread2;
      const y = (Math.random() - 0.5) * spread + spread/2; // Start mostly from above
      const z = (Math.random() - 0.5) * spread;
      
      // Randomize speed and start time
      const dropSpeed = (0.5 + Math.random() * 0.8) * speed;
      const startTime = -Math.random() * 10; // Stagger the start times
      const scale = 0.1 + Math.random() * 0.3; // Varying sizes for visual interest
      
      temp.push({
        position: [x, y, z],
        speed: dropSpeed,
        startTime,
        scale
      });
    }
    return temp;
  }, [count, spread, speed]);

  useFrame(({ clock }) => {
    if (!instancedMeshRef.current) return;
    
    // Update each raindrop
    drops.forEach((drop, i) => {
      const time = clock.getElapsedTime() + drop.startTime;
      
      // Calculate the y position with looping
      const y = ((drop.position[1] - time * drop.speed) % (spread * 1.5)) - spread * 0.5;
      
      // Set the position and scale
      dummy.position.set(drop.position[0], y, drop.position[2]);
      dummy.scale.set(drop.scale, drop.scale, drop.scale);
      
      // Apply a slight rotation for visual interest
      dummy.rotation.set(0, time * 0.1, 0);
      
      // Update the matrix for this instance
      dummy.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    // Necessary for the instances to update
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={position}>
      <instancedMesh 
        ref={instancedMeshRef} 
        args={[null, null, count]}
      >
        <planeGeometry args={[0.1, 0.3]} />
        <meshBasicMaterial 
          color={color}
          transparent={true}
          opacity={opacity}
          side={THREE.DoubleSide}
        />
      </instancedMesh>
    </group>
  );
}