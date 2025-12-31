import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { auraColors } from '../../theme';

interface AuraGridProps {
  count?: number;
  speed?: number;
  opacity?: number;
  spread?: number;
  position?: [number, number, number];
  color?: string;
}

export default function AuraGrid({
  count = 1000,
  speed = 1,
  opacity = 0.8,
  spread = 25,
  position = [0, 0, -15],
  color = auraColors.warmSand
}: AuraGridProps) {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate grid elements with random positions and speeds
  const gridElements = useMemo(() => {
    const temp = [];
    const spread2 = spread * 2; // For a more rectangular distribution (wider than tall)
    
    for (let i = 0; i < count; i++) {
      // Calculate random positions and speeds
      const x = (Math.random() - 0.5) * spread2;
      const y = (Math.random() - 0.5) * spread + spread/2; // Start mostly from above
      const z = (Math.random() - 0.5) * spread;
      
      // Randomize speed and start time
      const elemSpeed = (0.5 + Math.random() * 0.8) * speed;
      const startTime = -Math.random() * 10; // Stagger the start times
      const scale = 0.1 + Math.random() * 0.3; // Varying sizes for visual interest
      
      // Add random shape variation (0: square, 1: rectangle, 2: triangle)
      const shapeType = Math.floor(Math.random() * 3);
      
      temp.push({
        position: [x, y, z],
        speed: elemSpeed,
        startTime,
        scale,
        shapeType
      });
    }
    return temp;
  }, [count, spread, speed]);

  useFrame(({ clock }) => {
    if (!instancedMeshRef.current) return;
    
    // Update each grid element
    gridElements.forEach((elem, i) => {
      const time = clock.getElapsedTime() + elem.startTime;
      
      // Calculate the y position with looping
      const y = ((elem.position[1] - time * elem.speed) % (spread * 1.5)) - spread * 0.5;
      
      // Set the position and scale
      dummy.position.set(elem.position[0], y, elem.position[2]);
      dummy.scale.set(elem.scale, elem.scale, elem.scale);
      
      // Apply a rotation that changes with time for visual interest
      dummy.rotation.set(0, time * 0.2, time * 0.1);
      
      // Update the matrix for this instance
      dummy.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    // Necessary for the instances to update
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Create a custom color gradient for aura aesthetic
  const gradientMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(color) },
        color2: { value: new THREE.Color(auraColors.paleAqua) },
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          float pulse = sin(time * 2.0) * 0.5 + 0.5;
          vec3 color = mix(color1, color2, vUv.y + pulse * 0.2);
          float alpha = 0.7 - abs(vUv.y - 0.5) * 0.8;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, [color]);
  
  useFrame(({ clock }) => {
    if (gradientMaterial) {
      gradientMaterial.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <group position={position}>
      <instancedMesh 
        ref={instancedMeshRef} 
        args={[null, null, count]}
      >
        <planeGeometry args={[0.3, 0.3]} /> {/* Larger elements for visibility */}
        <primitive object={gradientMaterial} />
      </instancedMesh>
    </group>
  );
}
