import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Group, MathUtils } from 'three';
import * as styles from './3dBackground.module.css';
import FloatingName from './FloatingName';
import MatrixRain from './MatrixRain';
import MatrixFruit from './MatrixFruit';

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

  // Updated configuration for component spacing
  const config = {
    spacing: 6, // Reduced spacing between elements
    sideOffset: viewport.width / 2.2, // Dynamically calculate side offset based on viewport
    scrollSpeed: 1,
    totalHeight: 50, // Increased total height for more content
    startOffset: 4, // Offset for initial elements
  };

  // Vaporwave color palette
  const vaporwaveColors = {
    hotPink: "#FF00FF",
    neonCyan: "#00FFFF",
    electricPurple: "#9D00FF",
    neonBlue: "#00F1FF",
    synthPink: "#FF0080",
    neonGreen: "#39FF14"
  };

  // Define components with more elements and better side distribution
  const components: ComponentConfig[] = [
    // Initial elements (visible at start)
    {
      Component: MatrixFruit,
      props: { 
        position: [-config.sideOffset, config.startOffset, -2] as Position,
        rotation: [0.1, 0, 0.1] as Rotation,
        fruitType: 'dragonfruit',
        color: vaporwaveColors.hotPink,
        scale: 1.2,
        speed: 0.8
      },
      side: 'left'
    },
    {
      Component: MatrixFruit,
      props: { 
        position: [config.sideOffset, config.startOffset, -2] as Position,
        rotation: [-0.1, 0, -0.1] as Rotation,
        fruitType: 'watermelon',
        color: vaporwaveColors.neonCyan,
        scale: 1.1,
        speed: 0.7
      },
      side: 'right'
    },
    // Content elements
    {
      Component: FloatingName,
      props: { 
        position: [config.sideOffset, -config.spacing + config.startOffset, -2] as Position, 
        scale: 1.5,
        color: vaporwaveColors.neonCyan
      },
      side: 'right'
    },
    {
      Component: MatrixFruit,
      props: { 
        position: [-config.sideOffset, -config.spacing * 2 + config.startOffset, -2] as Position, 
        color: vaporwaveColors.electricPurple,
        rotation: [0.1, -0.1, 0] as Rotation,
        fruitType: 'banana',
        scale: 1.3,
        speed: 0.7
      },
      side: 'left'
    },
    {
      Component: FlowingRibbon,
      props: { 
        position: [config.sideOffset, -config.spacing * 3 + config.startOffset, -2] as Position,
        color: vaporwaveColors.neonGreen,
        width: 0.1,
        length: 3
      },
      side: 'right'
    },
    {
      Component: MatrixFruit,
      props: { 
        position: [-config.sideOffset, -config.spacing * 4 + config.startOffset, -2] as Position,
        rotation: [0, 0, 0.1] as Rotation,
        fruitType: 'apple',
        color: vaporwaveColors.synthPink,
        scale: 1.2,
        speed: 0.9
      },
      side: 'left'
    },
    {
      Component: FlowingRibbon,
      props: { 
        position: [-config.sideOffset, -config.spacing * 5 + config.startOffset, -2] as Position,
        color: vaporwaveColors.neonBlue,
        width: 0.1,
        length: 4
      },
      side: 'left'
    },
    {
      Component: MatrixFruit,
      props: { 
        position: [config.sideOffset, -config.spacing * 6 + config.startOffset, -2] as Position,
        rotation: [0.1, -0.1, 0] as Rotation,
        fruitType: 'orange',
        color: vaporwaveColors.hotPink,
        scale: 1.2,
        speed: 0.9
      },
      side: 'right'
    }
  ];

  // Additional decorative elements
  const decorativeElements = [
    // Left side floating elements
    {
      Component: MatrixParticles,
      props: {
        position: [-config.sideOffset * 0.8, -config.spacing * 2 + config.startOffset, -3],
        count: 100,
        color: vaporwaveColors.neonCyan,
        spread: 5,
        size: 0.02
      }
    },
    // Right side floating elements
    {
      Component: MatrixParticles,
      props: {
        position: [config.sideOffset * 0.8, -config.spacing * 4 + config.startOffset, -3],
        count: 100,
        color: vaporwaveColors.hotPink,
        spread: 5,
        size: 0.02
      }
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
      // Move camera from top to bottom, starting from initial offset
      state.camera.position.y = MathUtils.lerp(
        state.camera.position.y,
        config.startOffset - (scrollProgress * config.totalHeight),
        0.1
      );
      
      // Keep camera at fixed distance but add slight z-movement based on scroll
      state.camera.position.z = 8 + Math.sin(scrollProgress * Math.PI) * 0.5;
      
      // Dynamic camera tilt based on scroll
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
      <ambientLight intensity={0.2} />
      <directionalLight color={vaporwaveColors.hotPink} position={[5, 5, 5] as Position} intensity={0.4} />
      <pointLight color={vaporwaveColors.neonCyan} position={[0, 5, 0] as Position} intensity={0.3} />
      <pointLight color={vaporwaveColors.electricPurple} position={[-2, -5, -2] as Position} intensity={0.5} />
      
      {/* Background effects */}
      <MatrixRain 
        count={2000}
        opacity={0.4}
        speed={0.6}
        spread={35}
        position={[0, 0, -20]}
        color={vaporwaveColors.neonCyan}
      />
      
      {/* Main content group */}
      <group ref={sceneRef}>
        {/* Main components */}
        {components.map(({ Component, props }, index) => (
          <Component key={index} {...props} />
        ))}
        
        {/* Decorative elements */}
        {decorativeElements.map(({ Component, props }, index) => (
          <Component key={`decor-${index}`} {...props} />
        ))}
      </group>

      
      
      {/* Environment */}
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
          toneMappingExposure: 0.7, // Slightly darker exposure for more contrast with Matrix effect
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
