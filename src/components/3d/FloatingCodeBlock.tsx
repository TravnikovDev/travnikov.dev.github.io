import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { Group } from "three";
import * as THREE from "three";

interface FloatingCodeBlockProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

function FloatingCodeBlock({ 
  position, 
  rotation = [0, 0, 0],
  scale = 1 
}: FloatingCodeBlockProps) {
  const blockRef = useRef<Group>(null);
  const glowRef = useRef<THREE.ShaderMaterial>(null);
  const initialY = useRef(position[1]);
  const matrixGreen = "#00FF41";
  
  // Custom shader material for the glow effect
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(matrixGreen) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      
      void main() {
        float glow = sin(time * 2.0) * 0.5 + 0.5;
        float edgeGlow = 1.0 - smoothstep(0.4, 0.5, length(vUv - 0.5));
        vec3 finalColor = color * (1.0 + glow * 0.5);
        float alpha = edgeGlow * 0.3 * (0.8 + glow * 0.2);
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  useFrame(({ clock }) => {
    if (!blockRef.current) return;
    
    const time = clock.getElapsedTime();

    // Update glow effect
    if (glowRef.current) {
      glowRef.current.uniforms.time.value = time;
    }

    // Floating animation with scroll compensation
    const scrollY = window.scrollY || window.pageYOffset;
    blockRef.current.position.y = initialY.current + Math.sin(time * 0.4 + 2) * 0.15 + scrollY * 0.001;
    
    // Gentle rotation
    blockRef.current.rotation.z = rotation[2] + Math.sin(time * 0.3) * 0.05;
    blockRef.current.rotation.x = rotation[0] + Math.cos(time * 0.4) * 0.03;
  });

  return (
    <group ref={blockRef} position={position} rotation={rotation} scale={scale}>
      {/* Main code block */}
      <RoundedBox
        args={[1.2, 0.7, 0.05]}
        radius={0.05}
        smoothness={8}
      >
        <meshPhysicalMaterial
          color="#121420"
          roughness={0.3}
          metalness={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
      </RoundedBox>

      {/* Code lines with Matrix color scheme */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 0.25 - i * 0.11, 0.03]}>
          <planeGeometry
            args={[i % 3 === 0 ? 0.8 : i % 2 === 0 ? 0.7 : 0.5, 0.03]}
          />
          <meshBasicMaterial
            color={matrixGreen}
            transparent
            opacity={0.8 - i * 0.1}
          />
        </mesh>
      ))}

      {/* Glow effect around the block */}
      <mesh position={[0, 0, -0.01]} scale={[1.3, 0.8, 1]}>
        <planeGeometry />
        <primitive object={glowMaterial} ref={glowRef} />
      </mesh>

      {/* Edge highlight */}
      <RoundedBox
        args={[1.22, 0.72, 0.05]}
        radius={0.05}
        smoothness={8}
        position={[0, 0, -0.001]}
      >
        <meshBasicMaterial
          color={matrixGreen}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </RoundedBox>
    </group>
  );
}

export default FloatingCodeBlock;
