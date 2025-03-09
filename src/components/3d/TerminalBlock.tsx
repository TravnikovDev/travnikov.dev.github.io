import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Group, Mesh } from "three";

interface TerminalBlockProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export function TerminalBlock({ 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1 
}: TerminalBlockProps) {
  const terminalRef = useRef<Group>(null);
  const cursorRef = useRef<Mesh>(null);
  const initialY = useRef(position[1]);

  const scaleVector = useMemo(() => {
    if (typeof scale === 'number') {
      return [scale, scale, scale] as const;
    }
    return scale;
  }, [scale]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (terminalRef.current) {
      const scrollY = window.scrollY || window.pageYOffset;
      terminalRef.current.position.y = initialY.current + Math.sin(t * 0.5) * 0.1 + scrollY * 0.001;
      terminalRef.current.rotation.x = rotation[0] + Math.sin(t * 0.2) * 0.02;
      terminalRef.current.rotation.y = rotation[1] + Math.cos(t * 0.2) * 0.02;
    }

    if (cursorRef.current) {
      cursorRef.current.visible = Math.sin(t * 4) > 0;
    }
  });

  return (
    <group ref={terminalRef} position={position} rotation={rotation} scale={scaleVector}>
      <mesh>
        <planeGeometry args={[2, 1.2]} />
        <meshStandardMaterial color="#0A0F24" />
      </mesh>
      
      <Text
        position={[-0.8, 0.2, 0.01]}
        fontSize={0.12}
        color="#3D7FFF"
        anchorX="left"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Bold.woff"
      >
        $ npm install
      </Text>
      
      <Text
        position={[-0.8, -0.1, 0.01]}
        fontSize={0.12}
        color="#00F0FF"
        anchorX="left"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Bold.woff"
      >
        Installing dependencies...
      </Text>
      
      <mesh
        ref={cursorRef}
        position={[-0.8, -0.3, 0.01]}
      >
        <planeGeometry args={[0.1, 0.12]} />
        <meshBasicMaterial color="#A64DFF" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
