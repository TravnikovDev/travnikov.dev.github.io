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
  const glitchTimeRef = useRef(0);
  const matrixColor = props.color || "#00FF41";

  useEffect(() => {
    if (textRef.current) {
      textRef.current.position.set(0, -2, -2);
      textRef.current.rotation.set(0.2, 0, 0);
      textRef.current.scale.set(0.5, 0.5, 0.5);
    }
  }, []);

  useFrame((state, delta) => {
    if (!textRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Glitch effect timing
    glitchTimeRef.current += delta;
    const shouldGlitch = Math.sin(time * 10) > 0.95 || hovered;
    const glitchIntensity = shouldGlitch ? 0.02 : 0;
    
    if (isAnimatingIn) {
      animationProgress.current += delta * 0.5;
      const progress = Math.min(1, animationProgress.current);
      
      textRef.current.position.lerp(targetPosition.current, progress);
      textRef.current.scale.lerp(targetScale.current, progress);
      textRef.current.rotation.x = THREE.MathUtils.lerp(0.2, 0, progress);

      if (progress === 1) {
        setIsAnimatingIn(false);
      }
    }

    // Enhanced hover animations with glitch effect
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        hovered ? 2 : 0.8,
        0.1
      );
      
      // Random glitch displacement
      if (shouldGlitch) {
        textRef.current.position.x += (Math.random() - 0.5) * glitchIntensity;
        textRef.current.position.y += (Math.random() - 0.5) * glitchIntensity;
      }
    }

    if (glowMaterialRef.current) {
      glowMaterialRef.current.opacity = THREE.MathUtils.lerp(
        glowMaterialRef.current.opacity,
        hovered ? 0.9 : 0.3,
        0.1
      );
      
      // Pulse effect for the glow
      const pulse = (Math.sin(time * 2) * 0.5 + 0.5) * (hovered ? 0.4 : 0.2);
      glowMaterialRef.current.emissiveIntensity = 1 + pulse;
    }

    if (distortMaterialRef.current) {
      distortMaterialRef.current.distort = THREE.MathUtils.lerp(
        distortMaterialRef.current.distort,
        hovered ? 0.8 : 0.2,
        0.1
      );
      distortMaterialRef.current.speed = THREE.MathUtils.lerp(
        distortMaterialRef.current.speed,
        hovered ? 6 : 2,
        0.1
      );
    }

    // More dynamic floating animation
    const floatOffset = Math.sin(time * 0.5) * 0.05;
    const rotationOffset = Math.sin(time * 0.3) * 0.02;
    
    if (textRef.current) {
      textRef.current.position.y += floatOffset * 0.01;
      textRef.current.rotation.x += rotationOffset * 0.01;
      textRef.current.rotation.z += rotationOffset * 0.005;
      
      // Slight tilt based on mouse position
      if (hovered) {
        textRef.current.rotation.y = (mousePos.current.x * 0.2) + Math.sin(time) * 0.02;
        textRef.current.rotation.x = (-mousePos.current.y * 0.2) + Math.cos(time) * 0.02;
      }
    }
  });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
          curveSegments={64}
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.03}
          bevelOffset={0}
          bevelSegments={16}
          position={[-3.2, 0, 0]}
        >
          TRAVNIKOV
          <meshStandardMaterial
            ref={materialRef}
            color="#FFFFFF"
            roughness={0.15}
            metalness={0.95}
            emissive={matrixColor}
            emissiveIntensity={0.8}
            envMapIntensity={2.0}
          />
        </Text3D>
        
        {/* Enhanced glow text */}
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
        
        {/* Enhanced distortion effect */}
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
        
        {/* Enhanced glow lights */}
        <pointLight position={[-3, 0, 2]} color={matrixColor} intensity={5} distance={4} />
        <pointLight position={[3, 0, 2]} color={matrixColor} intensity={5} distance={4} />
        <pointLight position={[0, 0, 2]} color={matrixColor} intensity={3} distance={4} />
        
        {/* Additional glitch effect lights */}
        <pointLight
          position={[0, 1, 1]}
          color={matrixColor}
          intensity={hovered ? 8 : 2}
          distance={6}
        />
      </group>
    </Float>
  );
});

FloatingName.displayName = 'FloatingName';

export default FloatingName;
