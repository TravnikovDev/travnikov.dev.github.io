import React, { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Create a custom shader material for the glitch effect
const MatrixGlitchMaterial = shaderMaterial(
  {
    time: 0,
    intensity: 0.15,
    uColor: new THREE.Color(0x00ff41),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform float intensity;
    uniform vec3 uColor;
    varying vec2 vUv;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Time-based noise
      float noise = random(uv * time * 0.01);
      
      // Horizontal glitch lines
      float lines = step(0.98, sin(uv.y * 100.0 + time * 5.0));
      
      // Random vertical displacements
      if (random(vec2(time * 0.1, uv.y * 100.0)) > 0.992) {
        uv.x += 0.1 * intensity * sin(time * 10.0);
      }
      
      // Calculate edge glow
      float edgeGlow = 0.0;
      edgeGlow += smoothstep(0.0, 0.1, uv.x) * smoothstep(1.0, 0.9, uv.x);
      edgeGlow += smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);
      
      // Combine effects
      vec3 color = uColor;
      color = mix(color, color * 1.5, lines * intensity);
      color = mix(color, color * 1.2, edgeGlow * intensity);
      color = mix(color, color * 1.3, noise * intensity);
      
      gl_FragColor = vec4(color, 0.3 + lines * 0.2 + edgeGlow * 0.3);
    }
  `
);

// Register the material with drei
extend({ MatrixGlitchMaterial });

// Add the extension to the JSX namespace for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      matrixGlitchMaterial: any;
    }
  }
}

interface MatrixGlitchProps {
  intensity?: number;
  color?: string;
}

export default function MatrixGlitch({
  intensity = 0.15,
  color = '#00FF41',
}: MatrixGlitchProps) {
  const materialRef = useRef<any>();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, 9.9]}>
      <planeGeometry args={[50, 50]} />
      <matrixGlitchMaterial 
        ref={materialRef} 
        transparent={true} 
        intensity={intensity}
        uColor={new THREE.Color(color)}
      />
    </mesh>
  );
}