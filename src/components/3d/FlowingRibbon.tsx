import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FlowingRibbon({ color = "#3D7FFF", width = 0.1, points = 100, length = 10 }) {
  const ribbon = useRef();

  const [positions, setPositions] = useState(() => {
    const positions = new Float32Array(points * 3);
    for (let i = 0; i < points; i++) {
      const i3 = i * 3;
      const t = i / points;

      positions[i3] = (t - 0.5) * length; // x
      positions[i3 + 1] = 0; // y
      positions[i3 + 2] = 0; // z
    }
    return positions;
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (ribbon.current) {
      const positions = ribbon.current.geometry.attributes.position.array;

      for (let i = 0; i < points; i++) {
        const i3 = i * 3;
        const idx = i / points;

        // Wave motion effect
        positions[i3 + 1] = Math.sin(idx * 8 + t * 1.5) * 0.4; // y
        positions[i3 + 2] = Math.cos(idx * 6 + t) * 0.3; // z
      }

      ribbon.current.geometry.attributes.position.needsUpdate = true;

      // Update position based on scroll
      const scrollY = window.scrollY || window.pageYOffset;
      ribbon.current.position.y = scrollY * 0.001;
    }
  });

  return (
    <mesh ref={ribbon}>
      <tubeGeometry
        args={[
          new THREE.CatmullRomCurve3(
            Array.from({ length: points }, (_, i) => {
              const t = i / points;
              return new THREE.Vector3((t - 0.5) * length, 0, 0);
            })
          ),
          points,
          width,
          8,
          false,
        ]}
      />
      <meshPhysicalMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default FlowingRibbon;
