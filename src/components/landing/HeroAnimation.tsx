import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  Text3D, 
  OrbitControls, 
  Sphere, 
  MeshDistortMaterial, 
  Environment, 
  ContactShadows,
  PointMaterial,
  Points,
  Cloud
} from '@react-three/drei';
import { Box } from '@mantine/core';
import { keyframes } from '@emotion/react';
import * as THREE from 'three';

// Interactive particles with trails effect
function Particles({ count = 300, mouse }) {
  const points = useRef();
  const [positions, setPositions] = useState(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Create a sphere of particles
      const radius = 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Gradient colors: blue to purple
      const t = i / count;
      colors[i3] = 0.1 + 0.5 * t;  // R: more red as t increases
      colors[i3 + 1] = 0.2;         // G: constant low green
      colors[i3 + 2] = 0.8 - 0.3 * t; // B: more blue as t decreases
    }
    
    return { positions, colors };
  });
  
  // Animation ref
  const animationRef = useRef({ time: 0 });
  
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    animationRef.current.time = elapsed;
    
    const positions = points.current.geometry.attributes.position.array;
    
    // Animate each particle
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Get original position
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      // Add wave motion effects
      const factor = 0.1;
      const speed = 0.4;
      
      // Wave effect
      positions[i3] += Math.sin(elapsed * speed + i) * factor * (0.5 + Math.sin(elapsed * 0.1) * 0.5);
      positions[i3 + 1] += Math.cos(elapsed * speed + i) * factor * (0.5 + Math.sin(elapsed * 0.1) * 0.5);
      
      // Add mouse interaction
      const mouseX = mouse.current[0];
      const mouseY = mouse.current[1];
      const distanceToMouse = Math.sqrt(
        Math.pow(x - mouseX * 5, 2) + 
        Math.pow(y - mouseY * 5, 2)
      );
      
      // If close to mouse, add attraction
      if (distanceToMouse < 1.5) {
        const repulsionStrength = 0.02 / (distanceToMouse + 0.1);
        const repulsionX = (x - mouseX * 5) * repulsionStrength;
        const repulsionY = (y - mouseY * 5) * repulsionStrength;
        
        positions[i3] += repulsionX;
        positions[i3 + 1] += repulsionY;
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <Points ref={points} positions={positions.positions} colors={positions.colors} stride={3}>
      <PointMaterial 
        transparent 
        vertexColors 
        size={6} 
        sizeAttenuation={true} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Enhanced animated blob with interactive distortion
function AnimatedBlob({ position, color, scale = 1, speed = 1, complexity = 1.5 }) {
  const blobRef = useRef();
  const [hover, setHover] = useState(false);
  
  useFrame(({ clock, mouse }) => {
    if (blobRef.current) {
      const t = clock.getElapsedTime() * speed;
      
      // Rotation animation
      blobRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
      blobRef.current.rotation.y = t * 0.3;
      blobRef.current.rotation.z = Math.sin(t * 0.4) * 0.1;
      
      // Breathing scale effect
      const breathingScale = scale * (1 + Math.sin(t * 0.4) * 0.05);
      blobRef.current.scale.set(breathingScale, breathingScale, breathingScale);
      
      // If hovered, make it more distorted
      if (blobRef.current.material) {
        blobRef.current.material.distort = hover ? 
          0.8 + Math.sin(t * 2) * 0.2 : 
          0.4 + Math.sin(t) * 0.1;
          
        blobRef.current.material.speed = hover ? 2.5 : 1.5;
      }
    }
  });

  return (
    <Sphere 
      ref={blobRef} 
      position={position} 
      args={[1 * scale, 64, 64]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
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

// Floating 3D text with glowing effect
function FloatingName() {
  const textRef = useRef();
  const materialRef = useRef();
  
  // Create more dynamic animation
  useFrame(({ clock, pointer }) => {
    if (textRef.current) {
      const t = clock.getElapsedTime();
      
      // Smooth floating animation
      textRef.current.position.y = Math.sin(t * 0.5) * 0.15;
      
      // Subtle rotate based on mouse position
      textRef.current.rotation.x = (pointer.y * 0.2 - 0.1) + Math.sin(t * 0.3) * 0.05;
      textRef.current.rotation.y = (pointer.x * 0.3 - 0.15) + Math.sin(t * 0.4) * 0.05;
      
      // Pulse emissive effect for glowing
      if (materialRef.current) {
        materialRef.current.emissiveIntensity = 0.8 + Math.sin(t * 2) * 0.2;
      }
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.6}
    >
      <group ref={textRef}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.8}
          height={0.2}
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.04}
          bevelOffset={0}
          bevelSegments={10}
          position={[-3.2, 0, 0]}
        >
          TRAVNIKOV
          <meshPhysicalMaterial 
            ref={materialRef}
            color="#FFD700"
            roughness={0.05} 
            metalness={0.9}
            emissive="#ff9500"
            emissiveIntensity={0.8}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={1}
          />
        </Text3D>
      </group>
    </Float>
  );
}

// Create a flowing ribbon effect
function FlowingRibbon({ color = "#2290E0", width = 0.1, points = 100, length = 10 }) {
  const ribbon = useRef();
  
  // Create ribbon geometry
  const [positions, setPositions] = useState(() => {
    const positions = new Float32Array(points * 3);
    for (let i = 0; i < points; i++) {
      const i3 = i * 3;
      const t = i / points;
      
      positions[i3] = (t - 0.5) * length; // x
      positions[i3 + 1] = 0; // y
      positions[i3 + 2] = 0; // z
    }
    return positions;
  });
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (ribbon.current) {
      const positions = ribbon.current.geometry.attributes.position.array;
      
      for (let i = 0; i < points; i++) {
        const i3 = i * 3;
        const idx = i / points;
        
        // Wave motion effect
        positions[i3 + 1] = Math.sin(idx * 8 + t * 1.5) * 0.4; // y
        positions[i3 + 2] = Math.cos(idx * 6 + t) * 0.3; // z
      }
      
      ribbon.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <mesh ref={ribbon}>
      <tubeGeometry args={[
        new THREE.CatmullRomCurve3(
          Array.from({ length: points }, (_, i) => {
            const t = i / points;
            return new THREE.Vector3((t - 0.5) * length, 0, 0);
          })
        ),
        points,
        width,
        8,
        false
      ]} />
      <meshPhysicalMaterial 
        color={color}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Main scene with enhanced environment and effects
function Scene() {
  // Mouse tracking for interactive effects
  const mouse = useRef([0, 0]);
  
  return (
    <>
      {/* Improved lighting */}
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
      <pointLight position={[5, -2, 3]} color="#7A52C5" intensity={0.8} />
      <pointLight position={[-3, 2, -3]} color="#2290E0" intensity={0.8} />
      
      {/* Main floating name */}
      <FloatingName />
      
      {/* Advanced particles system */}
      <Particles count={800} mouse={mouse} />
      
      {/* Enhanced animated blobs */}
      <AnimatedBlob position={[2.2, -0.8, -1]} color="#2290E0" scale={1.2} speed={0.8} />
      <AnimatedBlob position={[-2.3, 0.9, -2]} color="#8422E0" scale={1} speed={1.2} />
      <AnimatedBlob position={[0, -1.8, -3]} color="#FF2D32" scale={0.7} speed={1.5} complexity={2} />
      
      {/* Flowing ribbons for dynamic movement */}
      <group position={[0, 1.5, -2]} rotation={[0.2, 0.5, 0.1]}>
        <FlowingRibbon color="#2290E0" width={0.06} length={12} />
      </group>
      <group position={[-1, -1, -1.5]} rotation={[-0.3, -0.2, 0.3]}>
        <FlowingRibbon color="#8422E0" width={0.04} length={10} />
      </group>
      
      {/* Cloud particles for depth */}
      <Cloud 
        position={[0, 0, -6]} 
        opacity={0.3} 
        speed={0.1} 
        width={15} 
        depth={1.5} 
        segments={20}
      />
      
      {/* Enhanced environment */}
      <Environment preset="night" background={false} />
      <ContactShadows 
        position={[0, -1.8, 0]} 
        opacity={0.7} 
        width={15} 
        height={15} 
        blur={2} 
        far={3}
        color="#000"
      />
      
      {/* Camera controls - improved smooth interaction */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
        dampingFactor={0.07}
        rotateSpeed={0.05}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      {/* Track mouse movement for interactive effects */}
      <mesh visible={false} onPointerMove={(e) => {
        mouse.current = [
          (e.point.x / 5),
          (e.point.y / 5)
        ];
      }}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial />
      </mesh>
      
      {/* Post-processing effects removed to fix compatibility issues */}
    </>
  );
}

// Glowing effect for the container
const glowPulse = keyframes({
  '0%': { boxShadow: '0 0 20px rgba(34, 144, 224, 0.3)' },
  '50%': { boxShadow: '0 0 30px rgba(122, 82, 197, 0.5)' },
  '100%': { boxShadow: '0 0 20px rgba(34, 144, 224, 0.3)' }
});

export default function HeroAnimation() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '70vh', // Increased height for more impact
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)',
        animation: `${glowPulse} 6s infinite ease-in-out`,
        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0) 70%, rgba(0,0,0,0.8) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]} // Optimized pixel ratio
        gl={{ 
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace
        }}
        shadows
      >
        <Scene />
      </Canvas>
    </Box>
  );
}