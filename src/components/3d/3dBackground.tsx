import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  Cloud,
  Torus,
  Sphere,
} from '@react-three/drei';
import * as THREE from 'three';
import { Group, MathUtils } from 'three';
import * as styles from './3dBackground.module.css';
// import FloatingCodeBlock from './FloatingCodeBlock';
// import FloatingName from './FloatingName';
// import { FloatingUICard } from './FloatingUICard';
// import { FlowingRibbon } from './FlowingRibbon';
// import ReactLogo from './ReactLogo';
// import { TerminalBlock } from './TerminalBlock';

// Type for position that accepts both THREE.Vector3 and position tuples
type Position = [number, number, number];
type Rotation = [number, number, number];

// Define types for the component configurations
type ComponentConfig = {
  Component: React.ComponentType<any>;
  props: {
    position: Position;
    rotation?: Rotation;
    scale?: number;
    color?: string;
    width?: number;
    length?: number;
  };
  side: 'left' | 'right';
};

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

  // Configuration for component spacing - adjusted for better visibility
  const config = {
    spacing: 8, // Increased vertical spacing
    sideOffset: 4, // Slightly increased side offset
    scrollSpeed: 1, // Increased scroll speed for more dramatic effect
    totalHeight: 40, // Total height of the scene
  };

  // Define components with adjusted positions
  const components: ComponentConfig[] = [
    {
      // Component: FloatingName,
      Component: FloatingElement,
      props: { 
        position: [-config.sideOffset, 0, -2] as Position
      },
      side: 'left'
    },
    {
      Component: ReactLogo,
      props: { 
        position: [config.sideOffset, -config.spacing, -2] as Position, 
        scale: 1.5
      },
      side: 'right'
    },
    {
      // Component: FloatingUICard,
      Component: AnimatedBlob,
      props: { 
        position: [-config.sideOffset, -config.spacing * 2, -2] as Position, 
        color: "#3D7FFF",
        rotation: [0.1, -0.1, 0] as Rotation
      },
      side: 'left'
    },
    {
      // Component: FloatingCodeBlock,
      Component: FloatingElement,
      props: { 
        position: [config.sideOffset, -config.spacing * 3, -2] as Position, 
        rotation: [-0.1, 0.1, 0] as Rotation
      },
      side: 'right'
    },
    {
      Component: FlowingRibbon,
      props: { 
        position: [-config.sideOffset, -config.spacing * 4, -2] as Position,
        rotation: [0, 0, 0.1] as Rotation,
        color: "#A64DFF", 
        width: 0.05, 
        length: 8 
      },
      side: 'left'
    },
    {
      // Component: TerminalBlock,
      Component: ReactLogo,
      props: { 
        position: [config.sideOffset, -config.spacing * 5, -2] as Position,
        rotation: [0.1, -0.1, 0] as Rotation
      },
      side: 'right'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      scrollPos.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      mousePos.current = { x: mouseX, y: mouseY };
      targetRotation.current = {
        x: mouseY * 0.1, // Subtle rotation effect
        y: mouseX * 0.1,
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!sceneRef.current) return;

    // Calculate scroll progress
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(Math.max(scrollPos.current / maxScroll, 0), 1);
    
    // Update camera position for smooth vertical movement
    if (state.camera) {
      // Move camera from top to bottom
      state.camera.position.y = MathUtils.lerp(
        state.camera.position.y,
        config.spacing * 2 - (scrollProgress * config.totalHeight),
        0.1
      );
      
      // Keep camera at fixed distance
      state.camera.position.z = 8;
      
      // Slight tilt based on scroll
      state.camera.rotation.x = scrollProgress * 0.2;
    }

    // Apply subtle scene rotation based on mouse movement
    sceneRef.current.rotation.y = MathUtils.lerp(
      sceneRef.current.rotation.y,
      targetRotation.current.y * 0.3,
      0.1
    );
  });

  return (
    <>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5] as Position} intensity={0.8} castShadow />
      <pointLight position={[0, 5, 0] as Position} intensity={0.6} />
      <pointLight position={[-2, -5, -2] as Position} color="#3D7FFF" intensity={1.0} />
      <pointLight position={[2, -5, 2] as Position} color="#FF3D00" intensity={0.8} />

      {/* Main scene content */}
      <group ref={sceneRef}>
        {components.map(({ Component, props, side }, index) => (
          <Component key={index} {...props} />
        ))}
      </group>

      {/* Environment and effects */}
      <Cloud 
        scale={4} 
        opacity={0.15} 
        speed={0.4} 
        segments={20} 
        position={[0, 0, -10] as Position}
      />
      <SimpleParticles count={2000} color="#3D7FFF" spread={20} />
      <ContactShadows
        opacity={0.3}
        scale={30}
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
        camera={{ 
          position: [0, 2, 8], // Adjusted initial camera position
          fov: 60, // Narrower field of view for better depth
          near: 0.1,
          far: 100
        }}
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
