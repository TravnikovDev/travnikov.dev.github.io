import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Text3D, useGLTF, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Group, MeshStandardMaterial, Vector3 } from "three";
import { gsap } from "gsap";

function FloatingName() {
  const textRef = useRef<Group>(null);
  const frontTextRef = useRef<THREE.Mesh>(null);
  const glowTextRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);
  const glowMaterialRef = useRef<MeshStandardMaterial>(null);
  const distortMaterialRef = useRef<any>(null);
  const initialY = useRef<number>(0);
  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  
  // Setup initial animation
  useEffect(() => {
    if (!textRef.current) return;
    
    // Initial position offscreen
    textRef.current.position.set(0, -2, -2);
    textRef.current.rotation.set(0.2, 0, 0);
    textRef.current.scale.set(0.5, 0.5, 0.5);
    
    // Animate entrance
    gsap.to(textRef.current.position, {
      y: 0,
      z: 0,
      duration: 1.8,
      ease: "power3.out",
      delay: 0.4
    });
    
    gsap.to(textRef.current.rotation, {
      x: 0,
      duration: 1.8,
      ease: "power2.out",
      delay: 0.4
    });
    
    gsap.to(textRef.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.5, 
      ease: "power2.out",
      delay: 0.4
    });
    
    // Setup mouse move tracker
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hover effects
  useEffect(() => {
    if (!materialRef.current || !glowMaterialRef.current || !distortMaterialRef.current) return;
    
    if (hovered) {
      // Increase glow and distortion on hover
      gsap.to(materialRef.current, {
        emissiveIntensity: 1.2,
        duration: 0.5
      });
      
      gsap.to(glowMaterialRef.current, {
        opacity: 0.7,
        duration: 0.5
      });
      
      gsap.to(distortMaterialRef.current, {
        distort: 0.5,
        speed: 4,
        duration: 0.5
      });
      
      if (textRef.current) {
        gsap.to(textRef.current.scale, {
          x: 1.05,
          y: 1.05,
          z: 1.05,
          duration: 0.5,
          ease: "back.out(1.5)"
        });
      }
    } else {
      // Reset to default state
      gsap.to(materialRef.current, {
        emissiveIntensity: 0.8,
        duration: 0.8
      });
      
      gsap.to(glowMaterialRef.current, {
        opacity: 0.3,
        duration: 0.8
      });
      
      gsap.to(distortMaterialRef.current, {
        distort: 0.2,
        speed: 2,
        duration: 0.8
      });
      
      if (textRef.current) {
        gsap.to(textRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    }
  }, [hovered]);

  useFrame(({ clock }) => {
    if (!textRef.current || !materialRef.current || !glowMaterialRef.current) return;

    const t = clock.getElapsedTime();

    // Smooth floating animation
    textRef.current.position.y = (initialY.current || 0) + Math.sin(t * 0.5) * 0.12;
    
    // Subtle rotation based on mouse position
    if (!hovered && textRef.current) {
      textRef.current.rotation.y = THREE.MathUtils.lerp(
        textRef.current.rotation.y,
        mousePos.current.x * 0.1,
        0.05
      );
      
      textRef.current.rotation.x = THREE.MathUtils.lerp(
        textRef.current.rotation.x,
        mousePos.current.y * 0.05,
        0.05
      );
    }

    // Update position based on scroll with smooth lerping
    const targetY = (window.scrollY || window.pageYOffset) * 0.001;
    initialY.current = THREE.MathUtils.lerp(initialY.current || 0, targetY, 0.1);

    // Smooth material animation (less intense when not hovered)
    const pulseIntensity = hovered ? 0.3 : 0.15;
    materialRef.current.emissiveIntensity = 0.8 + Math.sin(t * 1.5) * pulseIntensity;
    
    // Animate glow material
    if (glowMaterialRef.current) {
      glowMaterialRef.current.opacity = 0.3 + Math.sin(t * 2) * 0.1;
    }
    
    // Delayed sync of glow text position
    if (frontTextRef.current && glowTextRef.current) {
      glowTextRef.current.position.copy(frontTextRef.current.position);
      glowTextRef.current.rotation.copy(frontTextRef.current.rotation);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group 
        ref={textRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={[1, 1, 1]}
      >
        {/* Main text */}
        <Text3D
          ref={frontTextRef}
          font="/fonts/Inter_Bold.json"
          size={0.8}
          height={0.2}
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.04}
          bevelOffset={0}
          bevelSegments={10}
          position={[-3.2, 0, 0]}
        >
          TRAVNIKOV
          <meshStandardMaterial
            ref={materialRef}
            color="#E3E7F1"
            roughness={0.05}
            metalness={0.9}
            emissive="#3D7FFF"
            emissiveIntensity={0.8}
            envMapIntensity={1.5}
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
            color="#3D7FFF"
            roughness={1}
            metalness={0}
            emissive="#3D7FFF"
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
            color="#3D7FFF"
            speed={2}
            distort={0.2}
            transparent
            opacity={0.05}
          />
        </mesh>
        
        {/* Small glowy accent lights */}
        <pointLight position={[-3, 0, 2]} color="#3D7FFF" intensity={5} distance={4} />
        <pointLight position={[0, 0, 2]} color="#FFFFFF" intensity={3} distance={4} />
      </group>
    </Float>
  );
}

export default FloatingName;
