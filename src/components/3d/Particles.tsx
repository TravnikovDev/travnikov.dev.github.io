import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import * as THREE from "three";
import { Points as ThreePoints, BufferAttribute, Vector3 } from "three";

interface ParticlesProps {
  count?: number;
  size?: number;
  color?: THREE.ColorRepresentation;
  speed?: number;
  spread?: number;
}

function Particles({
  count = 1000,
  size = 0.015,
  color = "#3D7FFF",
  speed = 0.3,
  spread = 1.5
}: ParticlesProps) {
  const points = useRef<ThreePoints>(null);
  const particleColor = new THREE.Color(color);

  // Generate particles with initial random positions
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * spread * 2;
      pos[i3 + 1] = (Math.random() - 0.5) * spread * 2;
      pos[i3 + 2] = (Math.random() - 0.5) * spread * 2;
      
      vel[i3] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return [pos, vel];
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (!points.current) return;

    const positionArray = points.current.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime() * speed;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Update positions with velocities and time-based motion
      positionArray[i3] += velocities[i3] * Math.cos(time + i);
      positionArray[i3 + 1] += velocities[i3 + 1] * Math.sin(time + i);
      positionArray[i3 + 2] += velocities[i3 + 2] * Math.cos(time + i);

      // Boundary check and reset
      for (let j = 0; j < 3; j++) {
        const idx = i3 + j;
        if (Math.abs(positionArray[idx]) > spread) {
          positionArray[idx] *= -0.9;
        }
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={points} limit={count}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={particleColor}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default Particles;
