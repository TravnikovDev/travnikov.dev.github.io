import React from "react";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  Cloud,
} from "@react-three/drei";
import { Box } from "@mantine/core";
import { keyframes } from "@emotion/react";
import * as THREE from "three";
import { Group } from "three";
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
  const lastScrollY = useRef(0);

  useFrame(() => {
    if (!sceneRef.current) return;

    const currentScrollY = window.scrollY || window.pageYOffset;
    const scrollDelta = currentScrollY - lastScrollY.current;
    lastScrollY.current = currentScrollY;

    // Apply scroll-based rotation to entire scene
    sceneRef.current.rotation.y += scrollDelta * 0.0005;
  });

  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
      <pointLight position={[0, 5, 0]} intensity={0.5} />
      <pointLight position={[-2, -5, -2]} color="#3D7FFF" intensity={0.8} />
      <pointLight position={[2, -5, 2]} color="#FFAC00" intensity={0.6} />

      {/* Main scene content */}
      <group ref={sceneRef} position={[0, 0, 0]}>
        <FloatingUICard
          position={[1.8, 0, -1]}
          rotation={[-0.1, -0.3, 0.1]}
          scale={1.2}
          color="#0077FF"
        />
        <FloatingUICard
          position={[-2, 0.6, -2]}
          rotation={[0.15, 0.4, -0.05]}
          scale={0.9}
          color="#2050FF"
        />
        <FloatingCodeBlock
          position={[-1.5, -0.8, -1]}
          rotation={[0.2, 0.3, -0.1]}
          scale={1}
        />
        <TerminalBlock
          position={[0.8, -1.2, -0.5]}
          rotation={[-0.1, -0.2, 0.05]}
          scale={0.8}
        />
        <ReactLogo position={[0, 1.3, -1.5]} scale={1.2} />
        
        <group position={[0, 0, 0]}>
          <FloatingName />
        </group>

        {/* Animated blobs with different properties */}
        <AnimatedBlob
          position={[2.2, -0.8, -1]}
          color="#3D7FFF"
          scale={1.2}
          speed={0.8}
        />
        <AnimatedBlob
          position={[-2.3, 0.9, -2]}
          color="#A64DFF"
          scale={1}
          speed={1.2}
        />
        <AnimatedBlob
          position={[0.3, -1.8, -3]}
          color="#00F0FF"
          scale={0.7}
          speed={1.5}
          complexity={2}
        />

        {/* Flowing ribbons */}
        <group position={[0, 1.5, -2]} rotation={[0.2, 0.5, 0.1]}>
          <FlowingRibbon color="#3D7FFF" width={0.06} length={12} />
        </group>
        <group position={[-1, -1, -1.5]} rotation={[-0.3, -0.2, 0.3]}>
          <FlowingRibbon color="#A64DFF" width={0.04} length={10} />
        </group>
        <group position={[1.5, 0.5, -2.5]} rotation={[0.1, -0.4, 0.2]}>
          <FlowingRibbon color="#00F0FF" width={0.03} length={8} />
        </group>
      </group>

      {/* Environment elements */}
      <Cloud 
        scale={4} 
        opacity={0.1} 
        speed={0.4} 
        segments={20} 
        position={[0, 0, -5]}
      />
      <Particles count={1000} color="#3D7FFF" />
      <ContactShadows
        opacity={0.4}
        scale={10}
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
        zIndex: 1,
        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at center, rgba(220,240,255,0.2) 0%, rgba(200,230,255,0.5) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        },
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "70%",
          background:
            "linear-gradient(to bottom, rgba(210,235,255,0.5) 0%, rgba(210,235,255,0) 100%)",
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
          toneMappingExposure: 1.5,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        shadows
        style={{
          touchAction: "none",
          willChange: "transform",
          height: "100%",
          width: "100%",
        }}
      >
        <Scene />
      </Canvas>
    </Box>
  );
}
