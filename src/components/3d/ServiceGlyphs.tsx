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
    <group scale={1.24}>
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

// Web-architecture glyph: a clean geodesic wireframe sphere (a network of
// nodes + connections) suspended inside a light cube frame, with a metal core.
const Lattice = ({ innerRef }: { innerRef: React.RefObject<THREE.Group> }) => {
  const boxEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.7, 2.7, 2.7)),
    []
  );
  // full triangle mesh of a subdivided icosahedron = geodesic "system" look
  const sphereWire = useMemo(
    () => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.02, 1)),
    []
  );
  // nodes at the sphere vertices
  const nodePositions = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.02, 1);
    const pos = g.attributes.position;
    const seen = new Set<string>();
    const out: [number, number, number][] = [];
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      const k = v
        .toArray()
        .map((n) => n.toFixed(2))
        .join(",");
      if (seen.has(k)) continue;
      seen.add(k);
      out.push([v.x, v.y, v.z]);
    }
    g.dispose();
    return out;
  }, []);

  return (
    <group scale={1.02}>
      <lineSegments geometry={boxEdges}>
        <lineBasicMaterial color="#5a6771" transparent opacity={0.35} />
      </lineSegments>
      <group ref={innerRef}>
        <lineSegments geometry={sphereWire}>
          <lineBasicMaterial color="#3c4a53" transparent opacity={0.7} />
        </lineSegments>
        {nodePositions.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial
              color="#4a5964"
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
        ))}
        <mesh>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color="#c6cdd2"
            roughness={0.3}
            metalness={0.6}
            flatShading
          />
        </mesh>
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
  <group scale={1.0} position={[0, 0.3, 0]}>
    <mesh position={[0, -1.62, 0]} rotation={[Math.PI, 0, 0]}>
      <coneGeometry args={[1.0, 1.1, 40]} />
      <meshStandardMaterial color="#ebe5d8" roughness={0.55} metalness={0.05} />
    </mesh>
    {/* chrome/mercury pivot bead */}
    <mesh position={[0, -0.6, 0]}>
      <sphereGeometry args={[0.4, 48, 48]} />
      <meshStandardMaterial
        color="#cfd6da"
        roughness={0.16}
        metalness={1}
        envMapIntensity={1.3}
      />
    </mesh>
    {/* rocker pivots at its contact point on top of the pivot bead */}
    <group ref={beamRef} position={[0, -0.18, 0]}>
      {/* gunmetal wire (not flat black) */}
      <mesh
        position={[0, arcRadius, 0]}
        rotation={[0, 0, -Math.PI / 2 - arcHalf]}
      >
        <torusGeometry args={[arcRadius, 0.065, 12, 64, arcHalf * 2]} />
        <meshStandardMaterial
          color="#3a4248"
          roughness={0.32}
          metalness={0.85}
          envMapIntensity={1}
        />
      </mesh>
      {/* mercury beads — bright silvery, subtle warm/cool variation */}
      <mesh position={[-arcEndX, arcEndY, 0]}>
        <sphereGeometry args={[0.48, 48, 48]} />
        <meshStandardMaterial
          color="#dbe0e3"
          roughness={0.14}
          metalness={1}
          envMapIntensity={1.35}
        />
      </mesh>
      <mesh position={[arcEndX, arcEndY, 0]}>
        <sphereGeometry args={[0.3, 48, 48]} />
        <meshStandardMaterial
          color="#c9d1d7"
          roughness={0.17}
          metalness={1}
          envMapIntensity={1.3}
        />
      </mesh>
      <mesh position={[0.95, arcYAt(0.95), 0]}>
        <sphereGeometry args={[0.18, 48, 48]} />
        <meshStandardMaterial
          color="#c2d0d2"
          roughness={0.2}
          metalness={1}
          envMapIntensity={1.25}
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
    group.position.y = Math.sin(t * 0.8) * 0.1;
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
      {/* pulled back for padding so tall/wide objects never clip the canvas */}
      <PerspectiveCamera makeDefault position={[0, 0, 8.4]} fov={38} />
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
      {kind === "balance" && (
        // studio softbox: bright sky, dark ground, warm/cool sides — the
        // gradient across this is what reads as chrome/mercury on the beads
        <Environment resolution={128}>
          <mesh position={[0, 0, -12]} scale={[26, 26, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#dfe4e6" />
          </mesh>
          <mesh position={[0, 9, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[26, 26, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, -9, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[26, 26, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#39424a" />
          </mesh>
          <mesh position={[8, 2, 4]} rotation={[0, -1.1, 0]} scale={[9, 11, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#f1e6d3" />
          </mesh>
          <mesh position={[-8, 0, 4]} rotation={[0, 1.1, 0]} scale={[9, 11, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#c2ebe4" />
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
