import React, { useRef, useMemo, useState, useLayoutEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
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
  Cloud,
  RoundedBox,
} from "@react-three/drei";
import { Box } from "@mantine/core";
import { keyframes } from "@emotion/react";
import * as THREE from "three";
import Particles from "./Particles";
import AnimatedBlob from "./AnimatedBlob";
import FloatingName from "./FloatingName";
import FlowingRibbon from "./FlowingRibbon";
import FloatingUICard from "./FloatingUICard";
import FloatingCodeBlock from "./FloatingCodeBlock";
import TerminalBlock from "./TerminalBlock";
import ReactLogo from "./ReactLogo";

function Scene() {
  const mouse = useRef([0, 0]);
  const sceneRef = useRef();

  useFrame(({ clock, mouse: sceneMouse }) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRef.current.rotation.y || 0,
        sceneMouse.x * 0.2 || 0,
        0.05
      );
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x || 0,
        -sceneMouse.y * 0.1 || 0,
        0.05
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#FFFFFF"
      />
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1.2}
        castShadow
        color="#FFFFFF"
      />
      <pointLight position={[5, -2, 3]} color="#2050FF" intensity={1} />
      <pointLight position={[-3, 2, -3]} color="#0077FF" intensity={1} />
      <pointLight position={[2, -5, 2]} color="#FFAC00" intensity={0.6} />
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
        <Particles count={1000} mouse={mouse} />
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
      <Cloud
        position={[0, 0, -10]}
        opacity={0.4}
        speed={0.08}
        width={20}
        depth={2.5}
        segments={25}
      />
      <Environment preset="night" background={false} blur={0.8} />
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.8}
        width={18}
        height={18}
        blur={2.5}
        far={3.5}
        color="#000000"
      />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 1.8}
        dampingFactor={0.08}
        rotateSpeed={0.03}
        autoRotate
        autoRotateSpeed={0.3}
      />
      <mesh
        visible={false}
        onPointerMove={(e) => {
          mouse.current = [e.point.x / 5, e.point.y / 5];
        }}
      >
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <group position={[0, 2, -5]}>
        {[...Array(3)].map((_, i) => {
          const angle = (i / 3) * Math.PI * 2;
          const rad = 3;
          return (
            <spotLight
              key={i}
              position={[Math.cos(angle) * rad, Math.sin(angle) * rad, 5]}
              angle={0.15}
              distance={15}
              penumbra={1}
              intensity={0.4}
              color={i === 0 ? "#0077FF" : i === 1 ? "#2050FF" : "#FFAC00"}
              castShadow={false}
            />
          );
        })}
      </group>
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
      style={{
        width: "100vw",
        height: "100vh",
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
