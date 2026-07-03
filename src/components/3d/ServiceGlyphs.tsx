import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
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

// Stellated crystal star: elongated octahedron shards radiating from a core,
// like the reference's translucent diamond bloom
const Crystal = () => {
  const geometry = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#d4e4f0",
        metalness: 0,
        roughness: 0.05,
        transmission: 0.78,
        thickness: 2.0,
        ior: 2.0,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 2.6,
        attenuationColor: new THREE.Color("#8fb8d4"),
        attenuationDistance: 1.6,
        flatShading: true,
      }),
    []
  );
  // one spike along each icosahedron vertex direction = a 12-point star
  const spikes = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 0);
    const positions = geo.attributes.position;
    const seen = new Set<string>();
    const up = new THREE.Vector3(0, 1, 0);
    const result: {
      position: THREE.Vector3;
      quaternion: THREE.Quaternion;
      length: number;
    }[] = [];
    for (let i = 0; i < positions.count; i++) {
      const v = new THREE.Vector3()
        .fromBufferAttribute(positions, i)
        .normalize();
      const key = v
        .toArray()
        .map((n) => n.toFixed(2))
        .join(",");
      if (seen.has(key)) continue;
      seen.add(key);
      result.push({
        position: v.clone().multiplyScalar(0.72),
        quaternion: new THREE.Quaternion().setFromUnitVectors(up, v),
        length: 0.85 + (result.length % 3) * 0.28,
      });
    }
    geo.dispose();
    return result;
  }, []);

  return (
    <group scale={1.12}>
      <mesh geometry={geometry} material={material} scale={[0.75, 1.0, 0.75]} />
      {spikes.map((spike, i) => (
        <mesh
          key={i}
          geometry={geometry}
          material={material}
          position={spike.position}
          quaternion={spike.quaternion}
          scale={[0.3, spike.length, 0.3]}
        />
      ))}
    </group>
  );
};

// Wireframe lattice: box edges, hyperbolic fan curves, inner octahedron
const Lattice = ({ innerRef }: { innerRef: React.RefObject<THREE.Group> }) => {
  // THREE.Line built imperatively: R3F's <line> collides with the SVG type
  const fan = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: "#4c5a63",
      transparent: true,
      opacity: 0.75,
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
    <group scale={1.18}>
      <lineSegments geometry={boxEdges}>
        <lineBasicMaterial color="#333f47" transparent opacity={0.9} />
      </lineSegments>
      {fan.map((lineObject, i) => (
        <primitive key={i} object={lineObject} />
      ))}
      <group ref={innerRef}>
        <lineSegments geometry={innerEdges}>
          <lineBasicMaterial color="#333f47" transparent opacity={0.9} />
        </lineSegments>
      </group>
    </group>
  );
};

// Balance sculpture: dome base, dark pivot, a curved rocker wire resting on
// it with spheres threaded along the wire like beads
const arcRadius = 3.0;
const arcHalf = 0.62;
const arcEndX = arcRadius * Math.sin(arcHalf);
const arcEndY = arcRadius - arcRadius * Math.cos(arcHalf);
// y of the wire at a given x (circle centered at [0, arcRadius])
const arcYAt = (x: number) =>
  arcRadius - Math.sqrt(arcRadius * arcRadius - x * x);

const Balance = ({ beamRef }: { beamRef: React.RefObject<THREE.Group> }) => (
  <group scale={1.08} position={[0, 0.1, 0]}>
    <mesh position={[0, -1.62, 0]} rotation={[Math.PI, 0, 0]}>
      <coneGeometry args={[1.0, 1.1, 40]} />
      <meshStandardMaterial color="#ebe5d8" roughness={0.55} metalness={0.05} />
    </mesh>
    <mesh position={[0, -0.6, 0]}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="#23282a" roughness={0.3} metalness={0.05} />
    </mesh>
    {/* rocker pivots at its contact point on top of the dark sphere */}
    <group ref={beamRef} position={[0, -0.18, 0]}>
      <mesh
        position={[0, arcRadius, 0]}
        rotation={[0, 0, -Math.PI / 2 - arcHalf]}
      >
        <torusGeometry args={[arcRadius, 0.065, 12, 64, arcHalf * 2]} />
        <meshStandardMaterial
          color="#2b3133"
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[-arcEndX, arcEndY, 0]}>
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshStandardMaterial
          color="#f2ede1"
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[arcEndX, arcEndY, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#23282a"
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0.95, arcYAt(0.95), 0]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial
          color="#b9c6bf"
          roughness={0.4}
          metalness={0.05}
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
      {kind === "crystal" && (
        // local pastel softbox so the gem has something to refract
        <Environment resolution={64}>
          <mesh position={[0, 0, -8]} scale={[16, 16, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#f6f2e9" />
          </mesh>
          <mesh position={[6, 4, 4]} rotation={[0, -1.1, 0]} scale={[8, 8, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-6, -2, 4]} rotation={[0, 1.1, 0]} scale={[7, 7, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#c2ebe4" />
          </mesh>
          <mesh position={[0, -6, 2]} rotation={[1.2, 0, 0]} scale={[9, 9, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#e0c4ae" />
          </mesh>
          {/* dark panels give the facets contrast to refract */}
          <mesh position={[5, -3, -3]} rotation={[0, -0.9, 0]} scale={[6, 8, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#2a3438" />
          </mesh>
          <mesh position={[-5, 5, -2]} rotation={[0.4, 0.9, 0]} scale={[5, 6, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#3c4a50" />
          </mesh>
        </Environment>
      )}
      <group ref={groupRef}>
        {kind === "crystal" && <Crystal />}
        {kind === "lattice" && <Lattice innerRef={innerRef} />}
        {kind === "balance" && <Balance beamRef={beamRef} />}
      </group>
    </>
  );
}
