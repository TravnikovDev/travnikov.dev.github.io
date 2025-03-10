import React, { useRef, useEffect } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Create a custom shader material for the glitch effect
export const MatrixGlitchMaterial = shaderMaterial(
  {
    time: 0,
    intensity: 0.15,
    uColor: new THREE.Color(0x00ff41),
    resolution: new THREE.Vector2(),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader with enhanced glitch effect
  `
    uniform float time;
    uniform float intensity;
    uniform vec3 uColor;
    uniform vec2 resolution;
    varying vec2 vUv;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(a, b, u.x) +
              (c - a)* u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Time-based noise effects
      float slowTime = time * 0.5;
      float fastTime = time * 2.0;
      
      // Base noise layers
      float noise1 = noise(uv * 10.0 + slowTime);
      float noise2 = noise(uv * 20.0 - fastTime);
      
      // Scan lines with variable intensity
      float scanLine = step(0.5, sin(uv.y * 100.0 + time * 5.0));
      
      // Vertical glitch displacement
      float glitchAmount = intensity * 0.1;
      if (random(vec2(time * 0.1, uv.y * 100.0)) > 0.995) {
        uv.x += (noise1 - 0.5) * glitchAmount;
      }
      
      // Horizontal distortion bands
      float bands = step(0.98, sin(uv.y * 100.0 + time));
      uv.x += bands * sin(time * 10.0) * glitchAmount;
      
      // Edge glow effect
      float edgeGlow = 0.0;
      edgeGlow += smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x);
      edgeGlow += smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.8, uv.y);
      
      // Combine all effects
      vec3 color = uColor;
      color = mix(color, color * 1.5, scanLine * intensity);
      color = mix(color, color * 1.3, bands * intensity);
      color = mix(color, color * 1.2, noise2 * intensity);
      color += color * edgeGlow * intensity;
      
      // Dynamic alpha for better blending
      float alpha = 0.3 + scanLine * 0.2 + bands * 0.2 + edgeGlow * 0.3;
      alpha *= smoothstep(1.0, 0.8, abs(uv.x * 2.0 - 1.0));
      
      gl_FragColor = vec4(color, alpha);
    }
  `
);

// Register the material with R3F
extend({ MatrixGlitchMaterial });

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
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.resolution.set(window.innerWidth, window.innerHeight);
    }
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[50, 50]} />
      <matrixGlitchMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        depthTest={true}
        blending={THREE.AdditiveBlending}
        intensity={intensity}
        uColor={new THREE.Color(color)}
      />
    </mesh>
  );
}