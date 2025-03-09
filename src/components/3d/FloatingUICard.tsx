import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Group, ColorRepresentation, Vector3 } from "three";

interface FloatingUICardProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  color?: ColorRepresentation;
}

export function FloatingUICard({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = "#3D7FFF"
}: FloatingUICardProps) {
  const groupRef = useRef<Group>(null);
  const initialY = useRef(position[1]);
  const materialColor = new THREE.Color(color);

  const scaleVector = useMemo(() => {
    if (typeof scale === 'number') {
      return [scale, scale, scale] as const;
    }
    return scale;
  }, [scale]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      
      // Floating animation with initial position preservation
      const scrollY = window.scrollY || window.pageYOffset;
      groupRef.current.position.y = initialY.current + Math.sin(t) * 0.1 + scrollY * 0.001;
      
      // Slight rotation
      groupRef.current.rotation.x = rotation[0] + Math.sin(t * 0.5) * 0.02;
      groupRef.current.rotation.y = rotation[1] + Math.cos(t * 0.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scaleVector}>
      {/* Main card */}
      <mesh>
        <planeGeometry args={[2, 1.2]} />
        <meshPhysicalMaterial
          color="#0A0F24"
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Header */}
      <mesh position={[0, 0.4, 0.01]}>
        <planeGeometry args={[1.8, 0.3]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.3}
          metalness={0.7}
          clearcoat={1}
          clearcoatRoughness={0.2}
          opacity={0.1}
          transparent
        />
      </mesh>

      {/* Content blocks */}
      {[-0.1, -0.3].map((y, i) => (
        <mesh key={i} position={[0, y, 0.01]}>
          <planeGeometry args={[1.8, 0.15]} />
          <meshPhysicalMaterial
            color={materialColor}
            roughness={0.3}
            metalness={0.7}
            clearcoat={1}
            clearcoatRoughness={0.2}
            opacity={0.05}
            transparent
          />
        </mesh>
      ))}

      {/* Text */}
      <Text
        position={[-0.8, 0.4, 0.02]}
        fontSize={0.12}
        color={color}
        anchorX="left"
        anchorY="middle"
        font="/fonts/Inter_Bold.json"
      >
        UI Component
      </Text>

      {/* Small decorative elements */}
      {[0.6, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.4, 0.02]}>
          <circleGeometry args={[0.04]} />
          <meshBasicMaterial color={materialColor} opacity={0.5} transparent />
        </mesh>
      ))}
    </group>
  );
}

export default FloatingUICard;
