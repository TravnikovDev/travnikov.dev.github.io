import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  Cloud,
  Box,
  OrbitControls,
  Sphere,
  Torus,
} from '@react-three/drei';
import * as THREE from 'three';
import { Group, Vector3, MathUtils } from 'three';
import * as styles from './3dBackground.module.css';

// Type for position that accepts both THREE.Vector3 and position tuples
type Position = [number, number, number];

// A simple floating cube element
const FloatingElement = ({ 
  position = [0, 0, 0] as Position, 
  color = "#3D7FFF", 
  scale = 1, 
  speed = 1 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = useRef(position[1]);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * speed;
      // Simple floating animation
      meshRef.current.position.y = initialY.current + Math.sin(time * 0.5) * 0.5;
      // Gentle rotation
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      meshRef.current.rotation.y = time * 0.2;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position as any} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </mesh>
  );
};

// A simple blob-like sphere with animation
const AnimatedBlob = ({ 
  position = [0, 0, 0] as Position, 
  color = "#3D7FFF", 
  scale = 1, 
  speed = 1 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = useRef(position[1]);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * speed;
      // Floating animation
      meshRef.current.position.y = initialY.current + Math.sin(time * 0.4) * 0.3;
      // Gentle rotation
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.3;
      meshRef.current.rotation.y = time * 0.1;
      // Pulse scale
      const pulse = 1 + Math.sin(time * 0.5) * 0.1;
      meshRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse);
    }
  });
  
  return (
    <mesh ref={meshRef} position={position as any}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
    </mesh>
  );
};

// A simple flowing ribbon (box with animation)
const FlowingRibbon = ({ 
  position = [0, 0, 0] as Position, 
  color = "#3D7FFF", 
  width = 0.2, 
  length = 5 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(position);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      // Floating and waving animation
      meshRef.current.position.y = initialPosition.current[1] + Math.sin(time * 0.3) * 0.4;
      meshRef.current.rotation.z = Math.sin(time * 0.2) * 0.2;
      meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position as any} scale={[length, width, 0.1]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />
    </mesh>
  );
};

// Create a simple React logo representation
const ReactLogo = ({ 
  position = [0, 0, 0] as Position, 
  scale = 1 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Rotate the React logo
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });
  
  return (
    <group ref={groupRef} position={position as any} scale={scale}>
      {/* Center sphere */}
      <Sphere args={[0.5, 16, 16]}>
        <meshStandardMaterial color="#61DAFB" metalness={0.8} roughness={0.2} />
      </Sphere>
      
      {/* Electron orbits */}
      <Torus args={[1.25, 0.06, 16, 100]} rotation={[Math.PI/2, 0, 0]}>
        <meshStandardMaterial color="#61DAFB" metalness={0.7} roughness={0.3} />
      </Torus>
      
      <Torus args={[1.25, 0.06, 16, 100]} rotation={[Math.PI/6, Math.PI/3, 0]}>
        <meshStandardMaterial color="#61DAFB" metalness={0.7} roughness={0.3} />
      </Torus>
      
      <Torus args={[1.25, 0.06, 16, 100]} rotation={[-Math.PI/6, -Math.PI/3, 0]}>
        <meshStandardMaterial color="#61DAFB" metalness={0.7} roughness={0.3} />
      </Torus>
    </group>
  );
};

// Simple particles system
const SimpleParticles = ({ count = 500, size = 0.03, color = "#3D7FFF", spread = 10 }) => {
  // Generate particles positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread;
      temp.push({ position: [x, y, z] });
    }
    return temp;
  }, [count, spread]);
  
  // Create geometry for all particles
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = particles[i].position[0];
      positions[i * 3 + 1] = particles[i].position[1];
      positions[i * 3 + 2] = particles[i].position[2];
    }
    return positions;
  });
  
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
};

// Main Scene component for the 3D background
function Scene() {
  const sceneRef = useRef<Group>(null);
  const { viewport } = useThree();
  const mousePos = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const scrollPos = useRef(0);
  
  // Create references for each object to animate
  const blob1Ref = useRef<THREE.Group>(null);
  const blob2Ref = useRef<THREE.Group>(null);
  const blob3Ref = useRef<THREE.Group>(null);
  const ribbon1Ref = useRef<THREE.Group>(null);
  const ribbon2Ref = useRef<THREE.Group>(null);
  const ribbon3Ref = useRef<THREE.Group>(null);
  const reactLogoRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  // Store initial positions for parallax effect
  const initialPositions = useRef<{[key: string]: Vector3}>({});
  
  // Setup initial positions and scroll handler
  useEffect(() => {
    const refs = {
      blob1: blob1Ref,
      blob2: blob2Ref,
      blob3: blob3Ref,
      ribbon1: ribbon1Ref,
      ribbon2: ribbon2Ref,
      ribbon3: ribbon3Ref,
      reactLogo: reactLogoRef
    };
    
    // Store initial positions
    Object.entries(refs).forEach(([key, ref]) => {
      if (ref.current) {
        initialPositions.current[key] = ref.current.position.clone();
      }
    });

    // Handle scroll
    const handleScroll = () => {
      scrollPos.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      mousePos.current = { x: mouseX, y: mouseY };
      targetRotation.current = {
        x: mouseY * 0.05,
        y: mouseX * 0.05
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame((state, delta) => {
    if (!sceneRef.current) return;
    
    // Calculate scroll progress (normalized between 0 and 1)
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(Math.max(scrollPos.current / maxScroll, 0), 1);
    
    // Update camera position based on scroll
    if (state.camera) {
      state.camera.position.z = 5 + scrollProgress * 2; // Move camera back as user scrolls
      state.camera.position.y = scrollProgress * -1; // Move camera down slightly
      state.camera.rotation.x = scrollProgress * 0.2; // Tilt camera up/down
    }

    // Parallax effect: move objects based on scroll
    const refs = {
      blob1: { ref: blob1Ref, factor: 1.1 },
      blob2: { ref: blob2Ref, factor: 0.9 },
      blob3: { ref: blob3Ref, factor: 1.3 },
      ribbon1: { ref: ribbon1Ref, factor: 0.7 },
      ribbon2: { ref: ribbon2Ref, factor: 1.4 },
      ribbon3: { ref: ribbon3Ref, factor: 0.5 },
      reactLogo: { ref: reactLogoRef, factor: 0.6 }
    };
    
    // Apply parallax movement
    Object.entries(refs).forEach(([key, { ref, factor }]) => {
      if (ref.current && initialPositions.current[key]) {
        const initial = initialPositions.current[key];
        
        // Move in Y direction based on scroll with controlled effect
        ref.current.position.y = MathUtils.lerp(
          ref.current.position.y,
          initial.y + (scrollProgress * factor * -5),
          0.1
        );
        
        // Add X movement based on scroll
        ref.current.position.x = MathUtils.lerp(
          ref.current.position.x,
          initial.x + (Math.sin(scrollProgress * Math.PI * 2) * factor * 1.0),
          0.1
        );
        
        // Move in Z direction for depth
        ref.current.position.z = MathUtils.lerp(
          ref.current.position.z,
          initial.z + (Math.cos(scrollProgress * Math.PI) * factor * 1.5),
          0.1
        );

        // Add rotation based on scroll
        ref.current.rotation.y = scrollProgress * Math.PI * factor;
      }
    });
    
    // Rotate entire scene based on mouse position with smooth interpolation
    if (sceneRef.current) {
      sceneRef.current.rotation.x = MathUtils.lerp(
        sceneRef.current.rotation.x,
        targetRotation.current.x,
        0.1
      );
      sceneRef.current.rotation.y = MathUtils.lerp(
        sceneRef.current.rotation.y,
        targetRotation.current.y,
        0.1
      );
    }
  });
  
  return (
    <>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5] as Position} intensity={0.6} castShadow />
      <pointLight position={[0, 5, 0] as Position} intensity={0.6} />
      <pointLight position={[-2, -5, -2] as Position} color="#3D7FFF" intensity={1.0} />
      <pointLight position={[2, -5, 2] as Position} color="#FF3D00" intensity={0.8} />
      <pointLight position={[0, 0, 3] as Position} color="#FFFFFF" intensity={0.5} />

      {/* Main scene content with enhanced parallax */}
      <group ref={sceneRef} position={[0, 0, 0] as Position}>
        {/* React Logo */}
        <group ref={reactLogoRef}>
          <ReactLogo position={[0, 1.3, -1.5] as Position} scale={1.2} />
        </group>
        
        {/* Animated blobs */}
        <group ref={blob1Ref}>
          <AnimatedBlob
            position={[2.2, -0.8, -1] as Position}
            color="#3D7FFF"
            scale={1.2}
            speed={0.8}
          />
        </group>
        
        <group ref={blob2Ref}>
          <AnimatedBlob
            position={[-2.3, 0.9, -2] as Position}
            color="#A64DFF"
            scale={1}
            speed={1.2}
          />
        </group>
        
        <group ref={blob3Ref}>
          <AnimatedBlob
            position={[0.3, -1.8, -3] as Position}
            color="#00F0FF"
            scale={0.7}
            speed={1.5}
          />
        </group>
        
        {/* Floating elements */}
        <FloatingElement position={[1.8, 0, -1] as Position} color="#0077FF" scale={0.5} />
        <FloatingElement position={[-1.5, 0.6, -2] as Position} color="#2050FF" scale={0.6} />
        
        {/* Flowing ribbons with refs for parallax */}
        <group ref={ribbon1Ref} position={[0, 1.5, -2] as Position} rotation={[0.2, 0.5, 0.1]}>
          <FlowingRibbon color="#3D7FFF" width={0.06} length={12} />
        </group>
        
        <group ref={ribbon2Ref} position={[-1, -1, -1.5] as Position} rotation={[-0.3, -0.2, 0.3]}>
          <FlowingRibbon color="#A64DFF" width={0.04} length={10} />
        </group>
        
        <group ref={ribbon3Ref} position={[1.5, 0.5, -2.5] as Position} rotation={[0.1, -0.4, 0.2]}>
          <FlowingRibbon color="#00F0FF" width={0.03} length={8} />
        </group>
      </group>

      {/* Enhanced environment elements */}
      <Cloud 
        scale={4} 
        opacity={0.15} 
        speed={0.4} 
        segments={20} 
        position={[0, 0, -5] as Position}
      />
      <SimpleParticles count={1000} color="#3D7FFF" />
      <ContactShadows
        opacity={0.5}
        scale={12}
        blur={2}
        far={10}
        resolution={256}
        color="#000000"
      />
      <Environment preset="city" />
    </>
  );
}

// Main component with proper fullscreen fixed positioning
export default function ThreeDBackground() {
  return (
    <div className={styles.backgroundContainer}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        shadows
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
