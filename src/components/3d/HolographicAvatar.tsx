import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { vaporwaveColors } from '../../theme';

interface HolographicAvatarProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
}

export default function HolographicAvatar({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = vaporwaveColors.cyan
}: HolographicAvatarProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const wireframeMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  // Create base geometry for the head with smaller radius and more detail
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(0.8, 3); // Smaller radius, more subdivisions
  }, []);

  // Wireframe material with glow effect
  const wireframeMaterial = useMemo(() => {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    wireframeMaterialRef.current = material;
    return material;
  }, [color]);

  // Glow material
  const glowMaterial = useMemo(() => {
    const glowColor = new THREE.Color(color);
    glowColor.multiplyScalar(1.5);
    const material = new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0.2,
    });
    glowMaterialRef.current = material;
    return material;
  }, [color]);

  useFrame(({ clock }) => {
    if (meshRef.current && wireframeMaterialRef.current && glowMaterialRef.current) {
      const t = clock.getElapsedTime();

      // Gentler floating animation
      meshRef.current.position.y = Math.sin(t * 0.3) * 0.05;
      if (wireframeRef.current) wireframeRef.current.position.y = meshRef.current.position.y;
      if (glowRef.current) glowRef.current.position.y = meshRef.current.position.y;

      // Slower rotation
      meshRef.current.rotation.y = t * 0.05;
      if (wireframeRef.current) wireframeRef.current.rotation.y = meshRef.current.rotation.y;
      if (glowRef.current) glowRef.current.rotation.y = meshRef.current.rotation.y;

      // Subtler pulse effect
      wireframeMaterialRef.current.opacity = 0.5 + Math.sin(t * 1.5) * 0.15;
      glowMaterialRef.current.opacity = 0.15 + Math.sin(t * 1.5) * 0.08;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main mesh with holographic distortion */}
      <mesh ref={meshRef} geometry={geometry}>
        <MeshDistortMaterial
          color={color}
          roughness={0.4}
          metalness={1}
          distort={0.2} // Reduced distortion
          speed={1.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Wireframe layer */}
      <mesh ref={wireframeRef} geometry={geometry} material={wireframeMaterial} scale={1.03} />

      {/* Glow layer */}
      <mesh ref={glowRef} geometry={geometry} material={glowMaterial} scale={1.15} />

      {/* Adjusted lighting */}
      <pointLight color={color} intensity={1.5} distance={4} />
      <pointLight 
        color={vaporwaveColors.pink} 
        intensity={0.8} 
        distance={3}
        position={[1, 0, 1]} 
      />
    </group>
  );
}