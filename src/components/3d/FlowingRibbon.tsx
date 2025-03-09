import React, { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { 
  Group, Vector3, ColorRepresentation, BufferGeometry, 
  BufferAttribute, LineBasicMaterial 
} from "three";

// No need to extend native Three.js components as they're built into R3F

interface FlowingRibbonProps {
  color?: ColorRepresentation;
  width?: number;
  length?: number;
  segments?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export function FlowingRibbon({
  color = "#3D7FFF",
  width = 0.1,
  length = 10,
  segments = 50,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1
}: FlowingRibbonProps) {
  const groupRef = useRef<Group>(null);
  const geometryRef = useRef<any>(null);
  const phase = useRef(0);
  const initialY = useRef(position[1]);

  // Generate initial curve points with proper typing
  const points = useMemo(() => {
    const pts: Vector3[] = [];
    for (let i = 0; i < segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      pts.push(new Vector3(
        Math.sin(t) * width,
        (i / segments) * length - length / 2,
        Math.cos(t) * width
      ));
    }
    return pts;
  }, [segments, width, length]);

  useFrame(({ clock }) => {
    if (!geometryRef.current) return;

    phase.current += 0.01;
    const positions = geometryRef.current.attributes.position;

    for (let i = 0; i < segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const y = (i / segments) * length - length / 2;
      
      // Update x and z positions with wave motion
      const x = Math.sin(t + phase.current) * width;
      const z = Math.cos(t + phase.current) * width;
      
      positions.setXYZ(i, x, y, z);
    }

    positions.needsUpdate = true;

    // Update position based on scroll
    if (groupRef.current) {
      const scrollY = window.scrollY || window.pageYOffset;
      groupRef.current.position.y = initialY.current + scrollY * 0.001;
    }
  });

  const scaleVector = useMemo(() => {
    if (typeof scale === 'number') {
      return [scale, scale, scale] as const;
    }
    return scale;
  }, [scale]);

  return (
    <group 
      ref={groupRef} 
      position={position}
      rotation={rotation}
      scale={scaleVector}
    >
      <line>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={segments}
            array={new Float32Array(segments * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={new THREE.Color(color)}
          linewidth={2}
          opacity={0.6}
          transparent
          toneMapped={false}
        />
      </line>
    </group>
  );
}

export default FlowingRibbon;
