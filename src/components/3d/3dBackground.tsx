import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Group, MathUtils } from 'three';
import * as styles from './3dBackground.module.css';
import FloatingName from './FloatingName';
import MatrixRain from './MatrixRain';
import MatrixFruit from './MatrixFruit';
import { vaporwaveColors } from '../../theme';

// Type for position that accepts both THREE.Vector3 and position tuples
// Coordinates are represented as [x, y, z]
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
};

// Simple particles system with Matrix colors
const MatrixParticles = ({ count = 500, size = 0.03, color = "#00FF41", spread = 10, position = [0, 0, 0] as Position }) => {
  // Generate particles positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = position[0] + (Math.random() - 0.5) * spread;
      const y = position[1] + (Math.random() - 0.5) * spread;
      const z = position[2] + (Math.random() - 0.5) * spread;
      temp.push({ position: [x, y, z] });
    }
    return temp;
  }, [count, spread, position]);

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
    sideOffset: viewport.width / 2, // Dynamically calculate side offset based on viewport
    scrollSpeed: 1,
    totalHeight: 50, // Increased total height for more content
    startOffset: 4, // Offset for initial elements
  };

  // Define components with more elements and better side distribution
  const components: ComponentConfig[] = [
    // Initial elements (visible at start)
    {
      Component: MatrixFruit,
      props: {
        position: [-config.sideOffset, +config.spacing * 0.5 + config.startOffset, -2] as Position,
        rotation: [0.1, 0, 0.1] as Rotation,
        fruitType: 'banana',
        color: vaporwaveColors.neonCyan,
        scale: 1.1,
        speed: 0.7
      },
    },
    {
      Component: MatrixFruit,
      props: {
        position: [config.sideOffset, -config.spacing * 0.5 + config.startOffset, -2] as Position,
        rotation: [-0.1, 0, -0.1] as Rotation,
        fruitType: 'grapes',
        color: vaporwaveColors.electricPurple,
        scale: 1.1,
        speed: 0.7
      },
    },
    {
      Component: MatrixFruit,
      props: {
        position: [-config.sideOffset, -config.spacing * 1.5 + config.startOffset, -2] as Position,
        rotation: [0.1, 0, 0.1] as Rotation,
        fruitType: 'pomegranate',
        color: vaporwaveColors.hotPink,
        scale: 1.2,
        speed: 0.8
      },
    },
    {
      Component: MatrixFruit,
      props: {
        position: [config.sideOffset, -config.spacing * 2.5 + config.startOffset, -2] as Position,
        rotation: [0, 0, 0.1] as Rotation,
        fruitType: 'avocado',
        color: vaporwaveColors.neonGreen,
        scale: 1.3,
        speed: 0.7
      },
    },
    {
      Component: MatrixFruit,
      props: {
        position: [-config.sideOffset, -config.spacing * 3.5 + config.startOffset, -2] as Position,
        rotation: [0, 0.2, 0.1] as Rotation,
        fruitType: 'pineapple',
        color: vaporwaveColors.neonBlue,
        scale: 1.1,
        speed: 0.8
      },
    },
    {
      Component: MatrixFruit,
      props: {
        position: [config.sideOffset, -config.spacing * 4.5 + config.startOffset, -2] as Position,
        rotation: [0.1, 0.1, 0.1] as Rotation,
        fruitType: 'cherry',
        color: vaporwaveColors.hotPink,
        scale: 1.2,
        speed: 0.8
      },
    },
    {
      Component: MatrixFruit,
      props: {
        position: [-config.sideOffset, -config.spacing * 5.5 + config.startOffset, -2] as Position,
        rotation: [0, 0, 0.1] as Rotation,
        fruitType: 'lemon',
        color: vaporwaveColors.neonYellow,
        scale: 1.2,
        speed: 0.9
      },
    },
    {
      Component: MatrixFruit,
      props: {
        position: [config.sideOffset, -config.spacing * 6.5 + config.startOffset, -2] as Position,
        rotation: [0.1, 0.1, 0.1] as Rotation,
        fruitType: 'strawberry',
        color: vaporwaveColors.hotPink,
        scale: 1.3,
        speed: 1.2
      },
    },
    {
      Component: MatrixFruit,
      props: {
        position: [-config.sideOffset, -config.spacing * 7.5 + config.startOffset, -2] as Position,
        rotation: [0.1, -0.1, 0] as Rotation,
        fruitType: 'mango',
        color: vaporwaveColors.neonOrange,
        scale: 1.2,
        speed: 0.9
      },
    },
    {
      Component: MatrixFruit,
      props: {
        position: [config.sideOffset, -config.spacing * 8.5 + config.startOffset, -2] as Position,
        rotation: [0.1, -0.1, 0] as Rotation,
        fruitType: 'eggplant',
        color: vaporwaveColors.electricPurple,
        scale: 1.2,
        speed: 0.9
      },
    },
  ];

  // Additional decorative elements
  const decorativeElements = [
    // Left side floating elements
    {
      Component: MatrixParticles,
      props: {
        position: [0, -config.spacing * 1 + config.startOffset, -2] as Position,
        count: 500,
        color: vaporwaveColors.neonCyan,
        spread: 12,
        size: 0.04
      }
    },
    // Right side floating elements
    {
      Component: MatrixParticles,
      props: {
        position: [0, -config.spacing * 5 + config.startOffset, -2] as Position,
        count: 500,
        color: vaporwaveColors.hotPink,
        spread: 12,
        size: 0.04
      }
    },
    {
      Component: MatrixParticles,
      props: {
        position: [0, -config.spacing * 7.5 + config.startOffset, -2] as Position,
        count: 300,
        color: vaporwaveColors.neonBlue,
        spread: 12,
        size: 0.05
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
      <directionalLight color={vaporwaveColors.pink} position={[5, 5, 5] as Position} intensity={0.4} />
      <pointLight color={vaporwaveColors.cyan} position={[0, 5, 0] as Position} intensity={0.3} />
      <pointLight color={vaporwaveColors.purple} position={[-2, -5, -2] as Position} intensity={0.5} />

      {/* Background effects */}
      <MatrixRain
        count={1000}
        opacity={0.4}
        speed={0.6}
        spread={35}
        position={[0, 0, -20]}
        color={vaporwaveColors.cyan}
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
