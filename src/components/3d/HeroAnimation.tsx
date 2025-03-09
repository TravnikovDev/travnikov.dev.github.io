import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  Cloud,
  useScroll,
  ScrollControls,
  Scroll,
  Text3D,
  Sphere,
} from "@react-three/drei";
import { Box } from "@mantine/core";
import { keyframes } from "@emotion/react";
import * as THREE from "three";
import { Group, Vector3, MathUtils } from "three";
import AnimatedBlob from "./AnimatedBlob";
import FloatingName from "./FloatingName";
import FlowingRibbon from "./FlowingRibbon";
import FloatingUICard from "./FloatingUICard";
import FloatingCodeBlock from "./FloatingCodeBlock";
import { TerminalBlock } from "./TerminalBlock";
import ReactLogo from "./ReactLogo";
import Particles from "./Particles";

function Scene() {
  const sceneRef = useRef<Group>(null);
  const scrollData = useScroll();
  const { viewport } = useThree();
  const objectsRef = useRef<THREE.Group[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  
  // Create references for each object to animate
  const uiCard1Ref = useRef<THREE.Group>(null);
  const uiCard2Ref = useRef<THREE.Group>(null);
  const codeBlockRef = useRef<THREE.Group>(null);
  const terminalRef = useRef<THREE.Group>(null);
  const reactLogoRef = useRef<THREE.Group>(null);
  const nameRef = useRef<THREE.Group>(null);
  const blob1Ref = useRef<THREE.Group>(null);
  const blob2Ref = useRef<THREE.Group>(null);
  const blob3Ref = useRef<THREE.Group>(null);
  const ribbon1Ref = useRef<THREE.Group>(null);
  const ribbon2Ref = useRef<THREE.Group>(null);
  const ribbon3Ref = useRef<THREE.Group>(null);
  
  // Store initial positions for parallax effect
  const initialPositions = useRef<{[key: string]: Vector3}>({});
  
  // Setup initial positions when component mounts
  useEffect(() => {
    const refs = {
      uiCard1: uiCard1Ref,
      uiCard2: uiCard2Ref,
      codeBlock: codeBlockRef,
      terminal: terminalRef,
      reactLogo: reactLogoRef,
      name: nameRef,
      blob1: blob1Ref,
      blob2: blob2Ref,
      blob3: blob3Ref,
      ribbon1: ribbon1Ref,
      ribbon2: ribbon2Ref,
      ribbon3: ribbon3Ref
    };
    
    // Store initial positions
    Object.entries(refs).forEach(([key, ref]) => {
      if (ref.current) {
        initialPositions.current[key] = ref.current.position.clone();
      }
    });
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
    
    // Get scroll progress (0 to 1)
    const scrollProgress = scrollData.offset;
    
    // Parallax effect: move objects based on scroll
    // Each object will move at different rates for a layered effect
    const refs = {
      uiCard1: { ref: uiCard1Ref, factor: 1.2 },
      uiCard2: { ref: uiCard2Ref, factor: 0.8 },
      codeBlock: { ref: codeBlockRef, factor: 1.5 },
      terminal: { ref: terminalRef, factor: 1.0 },
      reactLogo: { ref: reactLogoRef, factor: 0.6 },
      name: { ref: nameRef, factor: 0.3 },
      blob1: { ref: blob1Ref, factor: 1.1 },
      blob2: { ref: blob2Ref, factor: 0.9 },
      blob3: { ref: blob3Ref, factor: 1.3 },
      ribbon1: { ref: ribbon1Ref, factor: 0.7 },
      ribbon2: { ref: ribbon2Ref, factor: 1.4 },
      ribbon3: { ref: ribbon3Ref, factor: 0.5 }
    };
    
    // Apply more pronounced parallax movement without affecting visibility
    Object.entries(refs).forEach(([key, { ref, factor }]) => {
      if (ref.current && initialPositions.current[key]) {
        const initial = initialPositions.current[key];
        
        // Move in Y direction based on scroll with controlled effect
        ref.current.position.y = MathUtils.lerp(
          ref.current.position.y,
          initial.y + (scrollProgress * factor * -5),
          0.1
        );
        
        // Add more pronounced X movement
        ref.current.position.x = MathUtils.lerp(
          ref.current.position.x,
          initial.x + (Math.sin(scrollProgress * Math.PI * 2) * factor * 1.0),
          0.1
        );
        
        // Move in Z direction for depth but not too extreme
        ref.current.position.z = MathUtils.lerp(
          ref.current.position.z,
          initial.z + (Math.cos(scrollProgress * Math.PI) * factor * 1.5),
          0.1
        );
        
        // Subtle rotation based on scroll
        ref.current.rotation.z = MathUtils.lerp(
          ref.current.rotation.z, 
          scrollProgress * factor * 0.2, 
          0.05
        );
        
        // Add Y-axis rotation for more dynamic movement
        ref.current.rotation.y = MathUtils.lerp(
          ref.current.rotation.y,
          scrollProgress * factor * 0.15 * (key.includes('blob') ? 1 : -1),
          0.05
        );
        
        // Scale elements based on scroll for additional effect but less extreme
        const targetScale = 1 + (Math.sin(scrollProgress * Math.PI) * 0.1 * factor);
        ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
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
      <directionalLight position={[5, 5, 5]} intensity={0.6} castShadow />
      <pointLight position={[0, 5, 0]} intensity={0.6} />
      <pointLight position={[-2, -5, -2]} color="#3D7FFF" intensity={1.0} />
      <pointLight position={[2, -5, 2]} color="#FF3D00" intensity={0.8} />
      <pointLight position={[0, 0, 3]} color="#FFFFFF" intensity={0.5} />

      {/* Main scene content with enhanced parallax */}
      <group ref={sceneRef} position={[0, 0, 0]}>
        <FloatingName ref={nameRef} />
        
        <group ref={uiCard1Ref}>
          <FloatingUICard
            position={[1.8, 0, -1]}
            rotation={[-0.1, -0.3, 0.1]}
            scale={1.2}
            color="#0077FF"
          />
        </group>
        
        <group ref={uiCard2Ref}>
          <FloatingUICard
            position={[-2, 0.6, -2]}
            rotation={[0.15, 0.4, -0.05]}
            scale={0.9}
            color="#2050FF"
          />
        </group>
        
        <group ref={codeBlockRef}>
          <FloatingCodeBlock
            position={[-1.5, -0.8, -1]}
            rotation={[0.2, 0.3, -0.1]}
            scale={1}
          />
        </group>
        
        <group ref={terminalRef}>
          <TerminalBlock
            position={[0.8, -1.2, -0.5]}
            rotation={[-0.1, -0.2, 0.05]}
            scale={0.8}
          />
        </group>
        
        <group ref={reactLogoRef}>
          <ReactLogo position={[0, 1.3, -1.5]} scale={1.2} />
        </group>

        {/* Animated blobs with different properties */}
        <group ref={blob1Ref}>
          <AnimatedBlob
            position={[2.2, -0.8, -1]}
            color="#3D7FFF"
            scale={1.2}
            speed={0.8}
          />
        </group>
        
        <group ref={blob2Ref}>
          <AnimatedBlob
            position={[-2.3, 0.9, -2]}
            color="#A64DFF"
            scale={1}
            speed={1.2}
          />
        </group>
        
        <group ref={blob3Ref}>
          <AnimatedBlob
            position={[0.3, -1.8, -3]}
            color="#00F0FF"
            scale={0.7}
            speed={1.5}
            complexity={2}
          />
        </group>

        {/* Flowing ribbons with refs for parallax */}
        <group ref={ribbon1Ref} position={[0, 1.5, -2]} rotation={[0.2, 0.5, 0.1]}>
          <FlowingRibbon color="#3D7FFF" width={0.06} length={12} />
        </group>
        
        <group ref={ribbon2Ref} position={[-1, -1, -1.5]} rotation={[-0.3, -0.2, 0.3]}>
          <FlowingRibbon color="#A64DFF" width={0.04} length={10} />
        </group>
        
        <group ref={ribbon3Ref} position={[1.5, 0.5, -2.5]} rotation={[0.1, -0.4, 0.2]}>
          <FlowingRibbon color="#00F0FF" width={0.03} length={8} />
        </group>
      </group>

      {/* Enhanced environment elements */}
      <Cloud 
        scale={4} 
        opacity={0.15} 
        speed={0.4} 
        segments={20} 
        position={[0, 0, -5]}
      />
      <Particles count={1500} color="#3D7FFF" />
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

const glowPulse = keyframes({
  "0%": { boxShadow: "0 0 20px rgba(34, 144, 224, 0.3)" },
  "50%": { boxShadow: "0 0 30px rgba(122, 82, 197, 0.5)" },
  "100%": { boxShadow: "0 0 20px rgba(34, 144, 224, 0.3)" },
});

export default function HeroAnimation() {
  return (
    <Box
      w="100vw"
      h="100vh"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        transform: "translateZ(0)",
        zIndex: -1, // Changed from 1 to -1 to ensure it stays behind content
        pointerEvents: "none",
        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at center, rgba(10,15,36,0.3) 0%, rgba(10,15,36,0.5) 100%)", // Adjusted opacity
          pointerEvents: "none",
          zIndex: 1,
        },
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background:
            "linear-gradient(to bottom, rgba(10,15,36,0.5) 0%, rgba(10,15,36,0) 100%)", // Adjusted opacity
          zIndex: 1,
          pointerEvents: "none",
        },
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2, // Slightly reduced exposure
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        shadows
        style={{
          position: "absolute", // Added to ensure proper stacking
          touchAction: "none",
          willChange: "transform",
          height: "100%",
          width: "100%",
        }}
      >
        <ScrollControls pages={3} damping={0.3} distance={1}>
          <Scene />
          <Scroll html style={{ display: 'none' }} />
        </ScrollControls>
      </Canvas>
    </Box>
  );
}
