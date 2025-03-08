import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";

function Particles({ count = 300, mouse }) {
  const points = useRef();
  const [positions, setPositions] = useState(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const t = i / count;
      colors[i3] = 0.1 + 0.5 * t;
      colors[i3 + 1] = 0.2;
      colors[i3 + 2] = 0.8 - 0.3 * t;
    }

    return { positions, colors };
  });

  const animationRef = useRef({ time: 0 });

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    animationRef.current.time = elapsed;

    const positions = points.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      const factor = 0.1;
      const speed = 0.4;

      positions[i3] +=
        Math.sin(elapsed * speed + i) *
        factor *
        (0.5 + Math.sin(elapsed * 0.1) * 0.5);
      positions[i3 + 1] +=
        Math.cos(elapsed * speed + i) *
        factor *
        (0.5 + Math.sin(elapsed * 0.1) * 0.5);

      const mouseX = mouse.current[0];
      const mouseY = mouse.current[1];
      const distanceToMouse = Math.sqrt(
        Math.pow(x - mouseX * 5, 2) + Math.pow(y - mouseY * 5, 2)
      );

      if (distanceToMouse < 1.5) {
        const repulsionStrength = 0.02 / (distanceToMouse + 0.1);
        const repulsionX = (x - mouseX * 5) * repulsionStrength;
        const repulsionY = (y - mouseY * 5) * repulsionStrength;

        positions[i3] += repulsionX;
        positions[i3 + 1] += repulsionY;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points
      ref={points}
      positions={positions.positions}
      colors={positions.colors}
      stride={3}
    >
      <PointMaterial
        transparent
        vertexColors
        size={6}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default Particles;
