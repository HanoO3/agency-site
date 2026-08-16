"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Deterministic PRNG for particle generation
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function AtmosphericParticles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color("#5A1610");
    const colorB = new THREE.Color("#E0432B");
    const colorC = new THREE.Color("#FF7048");

    for (let i = 0; i < count; i++) {
      const seed = i * 4;
      const radius = 2.5 + seededRandom(seed) * 6.5;
      const theta = seededRandom(seed + 1) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(seed + 2) - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const mix = seededRandom(seed + 3);
      const chosenColor = mix > 0.65 ? colorC : mix > 0.3 ? colorB : colorA;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingSculpture({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);
  const targetPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetPointer.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Slow organic rotation
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.15;
      meshRef.current.rotation.y = t * 0.08;

      // Mouse parallax smooth dampening
      meshRef.current.position.x +=
        (targetPointer.current.x * 0.35 - meshRef.current.position.x) * 0.03;
      meshRef.current.position.y +=
        (targetPointer.current.y * 0.35 - meshRef.current.position.y) * 0.03;
    }

    if (outerRef.current) {
      outerRef.current.rotation.x = -t * 0.05;
      outerRef.current.rotation.y = Math.cos(t * 0.1) * 0.12;
      outerRef.current.position.x = meshRef.current.position.x * 0.7;
      outerRef.current.position.y = meshRef.current.position.y * 0.7;
    }
  });

  return (
    <group position={[0.4, 0, -0.5]}>
      <Float speed={reducedMotion ? 0 : 0.8} rotationIntensity={0.15} floatIntensity={0.25}>
        {/* Core Abstract Sculptural Mass */}
        <mesh ref={meshRef} scale={2.2}>
          <icosahedronGeometry args={[1.25, 4]} />
          <MeshDistortMaterial
            color="#0D0914"
            emissive="#1A0704"
            emissiveIntensity={0.15}
            roughness={0.4}
            metalness={0.7}
            distort={reducedMotion ? 0 : 0.38}
            speed={reducedMotion ? 0 : 0.6}
            clearcoat={0.3}
            clearcoatRoughness={0.4}
          />
        </mesh>

        {/* Outer Minimalist Wire Sculpture Halo */}
        <mesh ref={outerRef} scale={2.75}>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshStandardMaterial
            color="#E0432B"
            wireframe
            transparent
            opacity={0.035}
            emissive="#E0432B"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = (e: MediaQueryListEvent | MediaQueryList) => {
      setReducedMotion(e.matches);
    };

    updateDimensions();
    updateMotion(motionQuery);

    window.addEventListener("resize", updateDimensions);
    motionQuery.addEventListener("change", updateMotion);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  const particleCount = isMobile ? 140 : 320;
  const dpr: [number, number] = isMobile ? [1, 1.2] : [1, 1.5];

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 42 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <fog attach="fog" args={["#05050A", 4.5, 12.0]} />

        {/* Soft Ambient Shadow Base */}
        <ambientLight intensity={0.15} />

        {/* Deep Left Fill Light */}
        <directionalLight position={[-6, -3, -2]} intensity={0.3} color="#2A0B08" />

        {/* Warm Ember Rim Light Source on the Right */}
        <pointLight position={[5.5, 1.5, 2.5]} intensity={3.8} distance={14} color="#E0432B" />
        <spotLight
          position={[6, 2, 4]}
          angle={0.6}
          penumbra={0.8}
          intensity={4.5}
          color="#FF7048"
        />

        <AtmosphericParticles count={particleCount} />
        <FloatingSculpture reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}



