"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Center, Text3D } from "@react-three/drei";
import * as THREE from "three";

// Typeface font JSON (Inter / Helvetiker Bold)
const FONT_URL = "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json";

// Letters for CARTCODE
const LETTERS = ["C", "A", "R", "T", "C", "O", "D", "E"];

// Spacing offsets for each letter
const LETTER_SPACING = 1.35;

function Single3DLetter({
  char,
  index,
  total,
}: {
  char: string;
  index: number;
  total: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);

  // Position base on X axis centered
  const baseX = (index - (total - 1) / 2) * LETTER_SPACING;

  // Spring physics state
  const current = useRef({
    z: 0,
    scale: 1,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    glow: 0,
  });

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Target values based on hover state
    const targetZ = hovered ? 1.4 : 0;
    const targetScale = hovered ? 1.15 : 1.0;
    const targetRotX = hovered ? -0.15 : 0;
    const targetRotY = hovered ? (index % 2 === 0 ? 0.2 : -0.2) : 0;
    const targetRotZ = hovered ? (index % 2 === 0 ? 0.08 : -0.08) : 0;
    const targetGlow = hovered ? 1.6 : 0;

    // Smooth spring lerp physics (damping)
    const lerpFactor = 1 - Math.exp(-12 * delta);
    current.current.z += (targetZ - current.current.z) * lerpFactor;
    current.current.scale += (targetScale - current.current.scale) * lerpFactor;
    current.current.rotX += (targetRotX - current.current.rotX) * lerpFactor;
    current.current.rotY += (targetRotY - current.current.rotY) * lerpFactor;
    current.current.rotZ += (targetRotZ - current.current.rotZ) * lerpFactor;
    current.current.glow += (targetGlow - current.current.glow) * lerpFactor;

    // Apply transforms
    meshRef.current.position.z = current.current.z;
    meshRef.current.scale.setScalar(current.current.scale);
    meshRef.current.rotation.x = current.current.rotX;
    meshRef.current.rotation.y = current.current.rotY;
    meshRef.current.rotation.z = current.current.rotZ;

    // Apply dynamic emissive red-orange glow on hover
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = current.current.glow;
    }

    if (lightRef.current) {
      lightRef.current.intensity = current.current.glow * 3;
    }
  });

  return (
    <group
      ref={meshRef}
      position={[baseX, 0, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Individual Local Red-Orange Point Light that ignites on hover */}
      <pointLight
        ref={lightRef}
        color="#E0432B"
        intensity={0}
        distance={4.5}
        position={[0, 0, 1.2]}
      />

      <Center>
        <Text3D
          font={FONT_URL}
          size={1.1}
          height={0.4}
          curveSegments={24}
          bevelEnabled
          bevelThickness={0.06}
          bevelSize={0.035}
          bevelOffset={0}
          bevelSegments={8}
        >
          {char}
          {/* Silver Reflective Metallic Material with Red-Orange Emissive Flare */}
          <meshStandardMaterial
            ref={materialRef}
            color="#EAEAEF"
            metalness={0.92}
            roughness={0.15}
            emissive="#E0432B"
            emissiveIntensity={0}
          />
        </Text3D>
      </Center>
    </group>
  );
}

function FloatingParticles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color("#7A1F17");
    const colorB = new THREE.Color("#E0432B");
    const colorC = new THREE.Color("#FF7048");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      const mix = Math.random();
      const chosenColor = mix > 0.65 ? colorC : mix > 0.35 ? colorB : colorA;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x += delta * 0.006;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Metallic3DText() {
  return (
    <div className="relative w-full h-[550px] sm:h-[650px] md:h-[750px] bg-[#05050A] overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 0, 9.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#05050A"]} />
        <fog attach="fog" args={["#05050A", 7.0, 16.0]} />

        {/* Ambient Fill Light */}
        <ambientLight intensity={0.25} />

        {/* Crisp Silver Top Rim Light for Metallic Highlights */}
        <directionalLight position={[0, 8, 4]} intensity={2.2} color="#FFFFFF" />

        {/* Cool Left Silver Key Light */}
        <directionalLight position={[-8, 2, 3]} intensity={1.8} color="#D8D8E0" />

        {/* Deep Right Warm Ember Rim Spotlight in #E0432B */}
        <spotLight
          position={[7, 3, 5]}
          intensity={4.5}
          angle={0.55}
          penumbra={0.7}
          color="#FF7048"
        />

        <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.15}>
          {/* 3D Extruded Letters Group */}
          <group position={[0, 0, 0]}>
            {LETTERS.map((char, index) => (
              <Single3DLetter
                key={`${char}-${index}`}
                char={char}
                index={index}
                total={LETTERS.length}
              />
            ))}
          </group>
        </Float>

        {/* Background Atmospheric Red-Orange Dust Particles */}
        <FloatingParticles count={180} />
      </Canvas>
    </div>
  );
}
