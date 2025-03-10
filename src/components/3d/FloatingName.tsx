import React, { useRef, useState, useEffect, forwardRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Text3D, useGLTF, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const FloatingName = forwardRef<THREE.Group>((props: { position?: [number, number, number]; scale?: number; color?: string }, ref) => {
  const textRef = useRef<THREE.Mesh>();
  const frontTextRef = useRef<THREE.Mesh>(null);
  const glowTextRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>();
  const glowMaterialRef = useRef<THREE.MeshStandardMaterial>();
  const distortMaterialRef = useRef<any>();
  const initialY = useRef<number>(0);
  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isAnimatingIn, setIsAnimatingIn] = useState(true);
  const animationProgress = useRef(0);
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));
  const matrixColor = props.color || "#00FF41"; // Use the provided color or default to Matrix green

  // Initial position
  useEffect(() => {
    if (textRef.current) {
      textRef.current.position.set(0, -2, -2);
      textRef.current.rotation.set(0.2, 0, 0);
      textRef.current.scale.set(0.5, 0.5, 0.5);
    }
  }, []);

  useFrame((state, delta) => {
    if (!textRef.current) return;

    // Entrance animation
    if (isAnimatingIn) {
      animationProgress.current += delta * 0.5; // Adjust speed
      const progress = Math.min(1, animationProgress.current);
      
      textRef.current.position.lerp(targetPosition.current, progress);
      textRef.current.scale.lerp(targetScale.current, progress);
      textRef.current.rotation.x = THREE.MathUtils.lerp(0.2, 0, progress);

      if (progress === 1) {
        setIsAnimatingIn(false);
      }
    }

    // Hover animations
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        hovered ? 1.2 : 0.8,
        0.1
      );
    }

    if (glowMaterialRef.current) {
      glowMaterialRef.current.opacity = THREE.MathUtils.lerp(
        glowMaterialRef.current.opacity,
        hovered ? 0.7 : 0.3,
        0.1
      );
    }

    if (distortMaterialRef.current) {
      distortMaterialRef.current.distort = THREE.MathUtils.lerp(
        distortMaterialRef.current.distort,
        hovered ? 0.5 : 0.2,
        0.1
      );
      distortMaterialRef.current.speed = THREE.MathUtils.lerp(
        distortMaterialRef.current.speed,
        hovered ? 4 : 2,
        0.1
      );
    }

    if (textRef.current) {
      const targetScale = hovered ? 1.05 : 1;
      textRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }

    // Floating animation
    const time = state.clock.getElapsedTime();
    if (textRef.current) {
      textRef.current.position.y += Math.sin(time) * 0.0005;
      textRef.current.rotation.x += Math.sin(time * 0.5) * 0.0001;
      textRef.current.rotation.y += Math.cos(time * 0.5) * 0.0001;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group 
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={[1, 1, 1]}
        position={props.position || [0, 0, 0]}
      >
        {/* Main text */}
        <Text3D
          ref={textRef}
          font="/fonts/Inter_Bold.json"
          size={0.8}
          height={0.25}
          curveSegments={64}  // Higher resolution for sharper text
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.03}
          bevelOffset={0}
          bevelSegments={16}  // More segments for smoother edges
          position={[-3.2, 0, 0]}
        >
          TRAVNIKOV
          <meshStandardMaterial
            ref={materialRef}
            color="#FFFFFF"  // Pure white base for the text
            roughness={0.15}  // Less roughness for sharper appearance
            metalness={0.95}  // Higher metalness for more reflection
            emissive={matrixColor}  // Matrix green glow
            emissiveIntensity={0.8}  // Enhanced emission for Matrix feel
            envMapIntensity={2.0}  // More environment reflection
          />
        </Text3D>
        
        {/* Glow text behind */}
        <Text3D
          ref={glowTextRef}
          font="/fonts/Inter_Bold.json"
          size={0.82}
          height={0.2}
          curveSegments={16}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.04}
          bevelOffset={0}
          bevelSegments={6}
          position={[-3.2, 0, -0.1]}
        >
          TRAVNIKOV
          <meshStandardMaterial
            ref={glowMaterialRef}
            color={matrixColor}
            roughness={1}
            metalness={0}
            emissive={matrixColor}
            emissiveIntensity={1}
            transparent
            opacity={0.3}
          />
        </Text3D>
        
        {/* Distortion sphere behind to add energy */}
        <mesh position={[-1, 0, -0.5]} scale={[5, 1.5, 0.2]}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            ref={distortMaterialRef}
            color={matrixColor}
            speed={2}
            distort={0.2}
            transparent
            opacity={0.05}
          />
        </mesh>
        
        {/* Small glowy accent lights */}
        <pointLight position={[-3, 0, 2]} color={matrixColor} intensity={5} distance={4} />
        <pointLight position={[0, 0, 2]} color={matrixColor} intensity={3} distance={4} />
      </group>
    </Float>
  );
});

FloatingName.displayName = 'FloatingName';

export default FloatingName;
