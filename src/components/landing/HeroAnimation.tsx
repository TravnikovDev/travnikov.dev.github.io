import React, { useRef, useMemo, useState, useLayoutEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  Float,
  Text3D,
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Environment,
  ContactShadows,
  PointMaterial,
  Points,
  Cloud,
  RoundedBox,
} from "@react-three/drei";
import { Box } from "@mantine/core";
import { keyframes } from "@emotion/react";
import * as THREE from "three";

// Interactive particles with trails effect
function Particles({ count = 300, mouse }) {
  const points = useRef();
  const [positions, setPositions] = useState(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Create a sphere of particles
      const radius = 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Gradient colors: blue to purple
      const t = i / count;
      colors[i3] = 0.1 + 0.5 * t; // R: more red as t increases
      colors[i3 + 1] = 0.2; // G: constant low green
      colors[i3 + 2] = 0.8 - 0.3 * t; // B: more blue as t decreases
    }

    return { positions, colors };
  });

  // Animation ref
  const animationRef = useRef({ time: 0 });

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    animationRef.current.time = elapsed;

    const positions = points.current.geometry.attributes.position.array;

    // Animate each particle
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Get original position
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Add wave motion effects
      const factor = 0.1;
      const speed = 0.4;

      // Wave effect
      positions[i3] +=
        Math.sin(elapsed * speed + i) *
        factor *
        (0.5 + Math.sin(elapsed * 0.1) * 0.5);
      positions[i3 + 1] +=
        Math.cos(elapsed * speed + i) *
        factor *
        (0.5 + Math.sin(elapsed * 0.1) * 0.5);

      // Add mouse interaction
      const mouseX = mouse.current[0];
      const mouseY = mouse.current[1];
      const distanceToMouse = Math.sqrt(
        Math.pow(x - mouseX * 5, 2) + Math.pow(y - mouseY * 5, 2)
      );

      // If close to mouse, add attraction
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

// Enhanced animated blob with interactive distortion
function AnimatedBlob({
  position,
  color,
  scale = 1,
  speed = 1,
  complexity = 1.5,
}) {
  const blobRef = useRef();
  const [hover, setHover] = useState(false);

  useFrame(({ clock, mouse }) => {
    if (blobRef.current) {
      const t = clock.getElapsedTime() * speed;

      // Rotation animation
      blobRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
      blobRef.current.rotation.y = t * 0.3;
      blobRef.current.rotation.z = Math.sin(t * 0.4) * 0.1;

      // Breathing scale effect
      const breathingScale = scale * (1 + Math.sin(t * 0.4) * 0.05);
      blobRef.current.scale.set(breathingScale, breathingScale, breathingScale);

      // If hovered, make it more distorted
      if (blobRef.current.material) {
        blobRef.current.material.distort = hover
          ? 0.8 + Math.sin(t * 2) * 0.2
          : 0.4 + Math.sin(t) * 0.1;

        blobRef.current.material.speed = hover ? 2.5 : 1.5;
      }
    }
  });

  return (
    <Sphere
      ref={blobRef}
      position={position}
      args={[1 * scale, 64, 64]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={1.5 * speed}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.4}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        complexity={complexity}
      />
    </Sphere>
  );
}

// Floating 3D text with glowing effect
function FloatingName() {
  const textRef = useRef();
  const materialRef = useRef();

  // Create more dynamic animation
  useFrame(({ clock, pointer }) => {
    if (textRef.current) {
      const t = clock.getElapsedTime();

      // Smooth floating animation
      textRef.current.position.y = Math.sin(t * 0.5) * 0.15;

      // Subtle rotate based on mouse position
      textRef.current.rotation.x =
        pointer.y * 0.2 - 0.1 + Math.sin(t * 0.3) * 0.05;
      textRef.current.rotation.y =
        pointer.x * 0.3 - 0.15 + Math.sin(t * 0.4) * 0.05;

      // Pulse emissive effect for glowing
      if (materialRef.current) {
        materialRef.current.emissiveIntensity = 0.8 + Math.sin(t * 2) * 0.2;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={textRef}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.8}
          height={0.2}
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.04}
          bevelOffset={0}
          bevelSegments={10}
          position={[-3.2, 0, 0]}
        >
          TRAVNIKOV
          <meshPhysicalMaterial
            ref={materialRef}
            color="#E3E7F1"
            roughness={0.05}
            metalness={0.9}
            emissive="#E3E7F1"
            emissiveIntensity={0.8}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={1}
          />
        </Text3D>
      </group>
    </Float>
  );
}

// Create a flowing ribbon effect
function FlowingRibbon({
  color = "#3D7FFF",
  width = 0.1,
  points = 100,
  length = 10,
}) {
  const ribbon = useRef();

  // Create ribbon geometry
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

// Theme-related 3D components
// Floating UI Card component to represent a web interface
function FloatingUICard({ position, rotation, scale = 1, color = "#0078F0" }) {
  const cardRef = useRef();
  const contentRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Gentle floating animation
    if (cardRef.current) {
      cardRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
      cardRef.current.rotation.x = rotation[0] + Math.sin(t * 0.3) * 0.03;
      cardRef.current.rotation.y = rotation[1] + Math.sin(t * 0.4) * 0.03;
    }

    // Pulse content
    if (contentRef.current) {
      contentRef.current.scale.x = 1 + Math.sin(t * 0.5) * 0.02;
      contentRef.current.scale.y = 1 + Math.sin(t * 0.5) * 0.02;
    }
  });

  return (
    <group ref={cardRef} position={position} rotation={rotation} scale={scale}>
      {/* Card body */}
      <RoundedBox
        args={[1.6, 0.9, 0.05]}
        radius={0.1}
        smoothness={10}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#1A1E2A"
          roughness={0.3}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.2}
          envMapIntensity={2}
        />
      </RoundedBox>

      {/* UI content */}
      <group ref={contentRef} position={[0, 0, 0.03]}>
        {/* Header bar */}
        <mesh position={[0, 0.35, 0]}>
          <planeGeometry args={[1.4, 0.15]} />
          <meshBasicMaterial color={color} transparent opacity={0.9} />
        </mesh>

        {/* Content blocks */}
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[0, 0.15 - i * 0.2, 0]}>
            <planeGeometry args={[1.4, 0.1]} />
            <meshBasicMaterial
              color="white"
              transparent
              opacity={0.1 + 0.05 * Math.abs(1 - i)}
            />
          </mesh>
        ))}

        {/* Button */}
        <mesh position={[0.45, -0.3, 0]}>
          <planeGeometry args={[0.3, 0.12]} />
          <meshBasicMaterial color={color} transparent opacity={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// Floating Code Snippet - representing development
function FloatingCodeBlock({ position, rotation, scale = 1 }) {
  const blockRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Gentle floating animation
    if (blockRef.current) {
      blockRef.current.position.y = position[1] + Math.sin(t * 0.4 + 2) * 0.15;
      blockRef.current.rotation.z = rotation[2] + Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <group ref={blockRef} position={position} rotation={rotation} scale={scale}>
      {/* Code block background */}
      <RoundedBox
        args={[1.2, 0.7, 0.05]}
        radius={0.05}
        smoothness={8}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#121420"
          roughness={0.3}
          metalness={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
      </RoundedBox>

      {/* Code lines */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 0.25 - i * 0.11, 0.03]}>
          <planeGeometry
            args={[i % 3 === 0 ? 0.8 : i % 2 === 0 ? 0.7 : 0.5, 0.03]}
          />
          <meshBasicMaterial
            color={
              i === 0
                ? "#E0000E"
                : i === 1
                ? "#0078F0"
                : i === 2
                ? "#7000E0"
                : i === 3
                ? "#0078F0"
                : "#FFFFFF"
            }
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// Terminal Block
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

// Floating React Logo
function ReactLogo({ position, scale = 1 }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.2;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Center dot */}
      <mesh castShadow>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshPhysicalMaterial
          color="#0077FF" // Light theme blue
          roughness={0.1}
          metalness={0.8}
          emissive="#0077FF"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Orbits */}
      {[...Array(3)].map((_, i) => {
        const angle = (i / 3) * Math.PI;
        return (
          <group key={i} rotation={[angle, angle * 2, angle / 2]}>
            <mesh>
              <torusGeometry args={[0.4, 0.02, 16, 30]} />
              <meshPhysicalMaterial
                color="#0077FF" // Light theme blue
                roughness={0.3}
                metalness={0.7}
                emissive="#0077FF"
                emissiveIntensity={0.4} // Slightly more intense for light theme
                transparent
                opacity={0.7}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Main scene with enhanced environment and thematic elements
function Scene() {
  // Mouse tracking for interactive effects
  const mouse = useRef([0, 0]);
  const sceneRef = useRef();

  useFrame(({ clock, mouse: sceneMouse }) => {
    if (sceneRef.current) {
      // Gentle tilt based on mouse position
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRef.current.rotation.y || 0,
        sceneMouse.x * 0.2 || 0,
        0.05
      );
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x || 0,
        -sceneMouse.y * 0.1 || 0,
        0.05
      );
    }
  });

  return (
    <>
      {/* Light theme optimized lighting */}
      <ambientLight intensity={0.6} /> {/* Brighter ambient light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#FFFFFF"
      />
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1.2}
        castShadow
        color="#FFFFFF"
      />
      <pointLight position={[5, -2, 3]} color="#2050FF" intensity={1} />{" "}
      {/* Royal blue */}
      <pointLight position={[-3, 2, -3]} color="#0077FF" intensity={1} />{" "}
      {/* Bright blue */}
      <pointLight position={[2, -5, 2]} color="#FFAC00" intensity={0.6} />{" "}
      {/* Gold */}
      {/* Scene group for global control */}
      <group ref={sceneRef} position={[0, 0, 0]}>
        {/* Frontend themes: UI components for light theme */}
        <FloatingUICard
          position={[1.8, 0, -1]}
          rotation={[-0.1, -0.3, 0.1]}
          scale={1.2}
          color="#0077FF" // Bright blue for light theme
        />
        <FloatingUICard
          position={[-2, 0.6, -2]}
          rotation={[0.15, 0.4, -0.05]}
          scale={0.9}
          color="#2050FF" // Royal blue for light theme
        />
        <FloatingCodeBlock
          position={[-1.5, -0.8, -1]}
          rotation={[0.2, 0.3, -0.1]}
          scale={1}
        />
        <TerminalBlock
          position={[0.8, -1.2, -0.5]}
          rotation={[-0.1, -0.2, 0.05]}
          scale={0.8}
        />
        <ReactLogo position={[0, 1.3, -1.5]} scale={1.2} />
        {/* Enhanced main floating name */}
        <group position={[0, 0, 0]}>
          <FloatingName />
        </group>
        {/* Advanced particles system - more dense */}
        <Particles count={1000} mouse={mouse} />
        {/* Enhanced animated blobs with light theme colors */}
        <AnimatedBlob
          position={[2.2, -0.8, -1]}
          color="#3D7FFF"
          scale={1.2}
          speed={0.8}
        />{" "}
        {/* Bright blue */}
        <AnimatedBlob
          position={[-2.3, 0.9, -2]}
          color="#A64DFF"
          scale={1}
          speed={1.2}
        />{" "}
        {/* Royal blue */}
        <AnimatedBlob
          position={[0.3, -1.8, -3]}
          color="#00F0FF"
          scale={0.7}
          speed={1.5}
          complexity={2}
        />{" "}
        {/* Gold */}
        {/* Flowing ribbons for dynamic movement - with light theme colors */}
        <group position={[0, 1.5, -2]} rotation={[0.2, 0.5, 0.1]}>
          <FlowingRibbon color="#3D7FFF" width={0.06} length={12} />{" "}
          {/* Bright blue */}
        </group>
        <group position={[-1, -1, -1.5]} rotation={[-0.3, -0.2, 0.3]}>
          <FlowingRibbon color="#A64DFF" width={0.04} length={10} />{" "}
          {/* Royal blue */}
        </group>
        <group position={[1.5, 0.5, -2.5]} rotation={[0.1, -0.4, 0.2]}>
          <FlowingRibbon color="#00F0FF" width={0.03} length={8} /> {/* Gold */}
        </group>
      </group>
      {/* Atmospheric elements */}
      <Cloud
        position={[0, 0, -10]}
        opacity={0.4}
        speed={0.08}
        width={20}
        depth={2.5}
        segments={25}
      />
      {/* Enhanced environment lighting */}
      <Environment preset="night" background={false} blur={0.8} />
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.8}
        width={18}
        height={18}
        blur={2.5}
        far={3.5}
        color="#000000"
      />
      {/* Enhanced camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 1.8}
        dampingFactor={0.08}
        rotateSpeed={0.03}
        autoRotate
        autoRotateSpeed={0.3}
      />
      {/* Track mouse for interactive particles */}
      <mesh
        visible={false}
        onPointerMove={(e) => {
          mouse.current = [e.point.x / 5, e.point.y / 5];
        }}
      >
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {/* Light rays - light theme version */}
      <group position={[0, 2, -5]}>
        {[...Array(3)].map((_, i) => {
          const angle = (i / 3) * Math.PI * 2;
          const rad = 3;
          return (
            <spotLight
              key={i}
              position={[Math.cos(angle) * rad, Math.sin(angle) * rad, 5]}
              angle={0.15}
              distance={15}
              penumbra={1}
              intensity={0.4} // Lower intensity for light theme
              color={i === 0 ? "#0077FF" : i === 1 ? "#2050FF" : "#FFAC00"} // Light theme colors
              castShadow={false}
            />
          );
        })}
      </group>
    </>
  );
}

// Glowing effect for the container
const glowPulse = keyframes({
  "0%": { boxShadow: "0 0 20px rgba(34, 144, 224, 0.3)" },
  "50%": { boxShadow: "0 0 30px rgba(122, 82, 197, 0.5)" },
  "100%": { boxShadow: "0 0 20px rgba(34, 144, 224, 0.3)" },
});

export default function HeroAnimation() {
  return (
    <Box
      style={{
        width: "100vw", // Full viewport width
        height: "100vh", // Full viewport height
        position: "fixed", // Fixed position to cover entire screen
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        transform: "translateZ(0)", // Hardware acceleration
        zIndex: 1, // Place behind content but above body

        // Light blue tint for the entire scene
        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at center, rgba(220,240,255,0.2) 0%, rgba(200,230,255,0.5) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        },

        // Top gradient for depth with blue tint
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "70%",
          background:
            "linear-gradient(to bottom, rgba(210,235,255,0.5) 0%, rgba(210,235,255,0) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        },
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]} // Optimized pixel ratio
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5, // Increased exposure
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        shadows
        style={{
          touchAction: "none", // Improve touch handling
          willChange: "transform", // Hint for better performance
          height: "100%", // Full height
          width: "100%", // Full width
        }}
      >
        <Scene />
      </Canvas>
      {/* No decorative corner accents needed for full-screen background */}
    </Box>
  );
}
