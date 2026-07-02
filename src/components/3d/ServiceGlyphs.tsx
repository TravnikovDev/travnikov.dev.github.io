import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

export type GlyphKind = "crystal" | "lattice" | "balance";

// Soft studio lighting matching the pastel canvas
const GlyphLights = () => (
  <>
    <ambientLight intensity={1.1} color="#f3efe4" />
    <directionalLight position={[3, 5, 6]} intensity={1.3} color="#fff6e0" />
    <directionalLight position={[-4, -2, 4]} intensity={0.8} color="#cfe4da" />
    <directionalLight position={[0, 4, -6]} intensity={0.7} color="#bcd2e8" />
  </>
);

// Stellated crystal: icosahedron core with cone spikes on each vertex
const Crystal = () => {
  const spikes = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.5, 0);
    const positions = geo.attributes.position;
    const seen = new Set<string>();
    const result: { position: THREE.Vector3; quaternion: THREE.Quaternion }[] =
      [];
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < positions.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(positions, i);
      const key = v
        .toArray()
        .map((n) => n.toFixed(2))
        .join(",");
      if (seen.has(key)) continue;
      seen.add(key);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        up,
        v.clone().normalize()
      );
      result.push({ position: v.clone().multiplyScalar(1.28), quaternion });
    }
    geo.dispose();
    return result;
  }, []);

  return (
    <group scale={0.9}>
      <mesh>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#e8eef2"
          metalness={0.3}
          roughness={0.16}
          flatShading
        />
      </mesh>
      {spikes.map((spike, i) => (
        <mesh
          key={i}
          position={spike.position}
          quaternion={spike.quaternion}
        >
          <coneGeometry args={[0.42, 1.1, 4]} />
          <meshStandardMaterial
            color="#dfe9f0"
            metalness={0.35}
            roughness={0.2}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
};

// Wireframe lattice: box edges, hyperbolic fan curves, inner octahedron
const Lattice = ({ innerRef }: { innerRef: React.RefObject<THREE.Group> }) => {
  // THREE.Line built imperatively: R3F's <line> collides with the SVG type
  const fan = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: "#51605a",
      transparent: true,
      opacity: 0.65,
    });
    const lines: THREE.Line[] = [];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 24; j++) {
        const t = j / 24;
        const r = 1.3 * Math.sin(t * Math.PI);
        pts.push(
          new THREE.Vector3(
            Math.cos(a) * r * (1 - t * 0.4),
            (t - 0.5) * 2.4,
            Math.sin(a) * r * (1 - t * 0.4)
          )
        );
      }
      lines.push(
        new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), material)
      );
    }
    return lines;
  }, []);
  const boxEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.6, 2.6, 2.6)),
    []
  );
  const innerEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.8)),
    []
  );

  return (
    <group>
      <lineSegments geometry={boxEdges}>
        <lineBasicMaterial color="#39423f" transparent opacity={0.85} />
      </lineSegments>
      {fan.map((lineObject, i) => (
        <primitive key={i} object={lineObject} />
      ))}
      <group ref={innerRef}>
        <lineSegments geometry={innerEdges}>
          <lineBasicMaterial color="#39423f" transparent opacity={0.85} />
        </lineSegments>
      </group>
    </group>
  );
};

// Balance sculpture: cone base, dark pivot, rocking beam with spheres
const Balance = ({ beamRef }: { beamRef: React.RefObject<THREE.Group> }) => (
  <group scale={0.92}>
    <mesh position={[0, -1.55, 0]} rotation={[Math.PI, 0, 0]}>
      <coneGeometry args={[1.05, 1.15, 40]} />
      <meshStandardMaterial color="#ece7db" roughness={0.6} metalness={0.08} />
    </mesh>
    <mesh position={[0, -0.55, 0]}>
      <sphereGeometry args={[0.42, 32, 32]} />
      <meshStandardMaterial color="#23282a" roughness={0.35} metalness={0.08} />
    </mesh>
    <group ref={beamRef} position={[0, -0.1, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.055, 0.055, 4.4, 16]} />
        <meshStandardMaterial
          color="#8f9a94"
          roughness={0.3}
          metalness={0.08}
        />
      </mesh>
      <mesh position={[-2.1, 0.35, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#f4efe2"
          roughness={0.45}
          metalness={0.08}
        />
      </mesh>
      <mesh position={[2.1, 0.28, 0]}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial
          color="#2b3133"
          roughness={0.35}
          metalness={0.08}
        />
      </mesh>
      <mesh position={[0.7, 0.28, 0]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#b9c6bf"
          roughness={0.4}
          metalness={0.08}
        />
      </mesh>
    </group>
  </group>
);

export function GlyphScene({
  kind,
  phase = 0,
}: {
  kind: GlyphKind;
  phase?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null!);
  const beamRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + phase;
    const group = groupRef.current;
    if (!group) return;
    group.position.y = Math.sin(t * 0.8) * 0.18;
    if (kind === "crystal") {
      group.rotation.y = t * 0.4;
      group.rotation.x = Math.sin(t * 0.5) * 0.25;
    } else if (kind === "lattice") {
      group.rotation.y = t * 0.3;
      group.rotation.z = Math.sin(t * 0.35) * 0.12;
      if (innerRef.current) innerRef.current.rotation.y = -t * 0.8;
    } else {
      group.rotation.y = Math.sin(t * 0.3) * 0.5;
      if (beamRef.current)
        beamRef.current.rotation.z = Math.sin(t * 0.9) * 0.12;
    }
  });

  return (
    <>
      <GlyphLights />
      <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={38} />
      <group ref={groupRef}>
        {kind === "crystal" && <Crystal />}
        {kind === "lattice" && <Lattice innerRef={innerRef} />}
        {kind === "balance" && <Balance beamRef={beamRef} />}
      </group>
    </>
  );
}
