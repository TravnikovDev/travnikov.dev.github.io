import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

function TerminalBlock({ position, rotation, scale = 1 }) {
  const terminalRef = useRef();
  const cursorRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Gentle floating animation
    if (terminalRef.current) {
      terminalRef.current.position.y =
        position[1] + Math.sin(t * 0.3 + 1) * 0.1;
      terminalRef.current.rotation.x = rotation[0] + Math.sin(t * 0.2) * 0.02;
    }

    // Blinking cursor
    if (cursorRef.current) {
      cursorRef.current.visible = Math.sin(t * 4) > 0;
    }
  });

  return (
    <group
      ref={terminalRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* Terminal background */}
      <RoundedBox
        args={[1.4, 0.8, 0.05]}
        radius={0.05}
        smoothness={10}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#000000"
          roughness={0.3}
          metalness={0.5}
          clearcoat={0.8}
        />
      </RoundedBox>

      {/* Terminal header */}
      <mesh position={[0, 0.32, 0.03]}>
        <planeGeometry args={[1.38, 0.15]} />
        <meshBasicMaterial color="#111111" />
      </mesh>

      {/* Control dots */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[-0.6 + i * 0.1, 0.32, 0.04]}>
          <circleGeometry args={[0.02, 16]} />
          <meshBasicMaterial
            color={i === 0 ? "#E0000E" : i === 1 ? "#FFA500" : "#00AA00"}
          />
        </mesh>
      ))}

      {/* Command lines */}
      {[...Array(3)].map((_, i) => (
        <group
          key={i}
          position={[-0.55, 0.15 - i * 0.12, 0.03]}
          scale={[1, 1, 1]}
        >
          <mesh position={[0.22, 0, 0]}>
            <planeGeometry args={[0.44 + i * 0.15, 0.03]} />
            <meshBasicMaterial color="#7000E0" transparent opacity={0.9} />
          </mesh>

          <mesh position={[0.7 - i * 0.1, 0, 0]}>
            <planeGeometry args={[0.3 - i * 0.05, 0.03]} />
            <meshBasicMaterial color="#0078F0" transparent opacity={0.7} />
          </mesh>
        </group>
      ))}

      {/* Cursor */}
      <mesh ref={cursorRef} position={[-0.35, -0.15, 0.04]}>
        <planeGeometry args={[0.03, 0.03]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
}

export default TerminalBlock;
