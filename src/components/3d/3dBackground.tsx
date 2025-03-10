import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  Torus,
  Sphere,
} from '@react-three/drei';
import * as THREE from 'three';
import { Group, MathUtils } from 'three';
import * as styles from './3dBackground.module.css';
import FloatingCodeBlock from './FloatingCodeBlock';
import FloatingName from './FloatingName';
import MatrixRain from './MatrixRain';
import MatrixFruit from './MatrixFruit';
import MatrixGlitch from './MatrixGlitch';

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
    fruitType?: string;
    width?: number;
    length?: number;
    speed?: number;
  };
  side: 'left' | 'right';
};

// A simple flowing ribbon (box with animation) - Kept but modified for Matrix style
const FlowingRibbon = ({ 
  position = [0, 0, 0] as Position, 
  color = "#00FF41", 
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
      <meshBasicMaterial color={color} wireframe={true} />
    </mesh>
  );
};

// Simple particles system with Matrix colors
const MatrixParticles = ({ count = 500, size = 0.03, color = "#00FF41", spread = 10 }) => {
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

  // Configuration for component spacing - adjusted for Matrix theme
  const config = {
    spacing: 8, // Vertical spacing between components
    sideOffset: 4, // Side offset for components
    scrollSpeed: 1, // Scroll speed for camera movement
    totalHeight: 40, // Total height of the scene
  };

  // The Matrix green color
  const matrixGreen = "#00FF41";
  const matrixDarkGreen = "#0D7A29";

  // Define components with adjusted positions - now using MatrixFruit components
  const components: ComponentConfig[] = [
    {
      Component: MatrixFruit,
      props: { 
        position: [-config.sideOffset, 0, -2] as Position,
        rotation: [0, 0, 0] as Rotation,
        fruitType: 'banana',
        color: matrixGreen,
        scale: 1.2,
        speed: 0.8
      },
      side: 'left'
    },
    {
      Component: FloatingName,
      props: { 
        position: [config.sideOffset, -config.spacing, -2] as Position, 
        scale: 1.5,
        color: matrixGreen
      },
      side: 'right'
    },
    {
      Component: MatrixFruit,
      props: { 
        position: [-config.sideOffset, -config.spacing * 2, -2] as Position, 
        color: matrixGreen,
        rotation: [0.1, -0.1, 0] as Rotation,
        fruitType: 'eggplant',
        scale: 1.3,
        speed: 0.7
      },
      side: 'left'
    },
    {
      Component: FlowingRibbon,
      props: { 
        position: [-config.sideOffset, -config.spacing * 4, -2] as Position,
        rotation: [0, 0, 0.1] as Rotation,
        color: matrixGreen, 
        width: 0.05, 
        length: 8 
      },
      side: 'left'
    },
    {
      Component: MatrixFruit,
      props: { 
        position: [config.sideOffset, -config.spacing * 3, -2] as Position, 
        rotation: [-0.1, 0.1, 0] as Rotation,
        fruitType: 'apple',
        color: matrixGreen,
        scale: 1.1,
        speed: 1
      },
      side: 'right'
    },
    {
      Component: MatrixFruit,
      props: { 
        position: [config.sideOffset, -config.spacing * 5, -2] as Position,
        rotation: [0.1, -0.1, 0] as Rotation,
        fruitType: 'orange',
        color: matrixGreen,
        scale: 1.2,
        speed: 0.9
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
      {/* Matrix-themed lighting setup */}
      <ambientLight intensity={0.2} />
      <directionalLight color={matrixGreen} position={[5, 5, 5] as Position} intensity={0.4} />
      <pointLight color={matrixGreen} position={[0, 5, 0] as Position} intensity={0.3} />
      <pointLight color={matrixGreen} position={[-2, -5, -2] as Position} intensity={0.5} />
      
      {/* Add the Matrix glitch effect */}
      <MatrixGlitch intensity={0.15} color={matrixGreen} />

      {/* Main scene content */}
      <group ref={sceneRef}>
        {components.map(({ Component, props, side }, index) => (
          <Component key={index} {...props} />
        ))}
      </group>

      {/* Matrix rain effect replacing Cloud */}
      <MatrixRain 
        count={1500} 
        opacity={0.6} 
        speed={0.8} 
        spread={30} 
        position={[0, 0, -15]} 
        color={matrixGreen}
      />
      
      {/* Matrix particles */}
      <MatrixParticles count={2000} color={matrixGreen} spread={20} />
      
      {/* Dark environment to match Matrix theme */}
      <color attach="background" args={["#000000"]} />
    </>
  );
}

// Main component with proper fullscreen fixed positioning
export default function ThreeDBackground() {
  return (
    <div className={styles.backgroundContainer}>
      {/* Add matrix scanline effect */}
      <div className={styles.scanline}></div>
      
      {/* Add matrix overlay grid effect */}
      <div className={styles.matrixOverlay}></div>
      
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
          toneMappingExposure: 0.8, // Darker exposure for Matrix feel
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
          backgroundColor: "#000000", // Black background
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
