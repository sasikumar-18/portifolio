import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

/** Check WebGL capability */
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

/** 3D Metallic Distorted Sphere with Electric Blue and Fiery Red Dual Glow */
function DistortedSphere({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Organic continuous rotation
    meshRef.current.rotation.x += delta * 0.22;
    meshRef.current.rotation.y += delta * 0.28;

    // Smooth mouse tilt & parallax
    const targetX = state.pointer.x * 1.1 + (scrollProgress > 0.05 ? 1.2 : 0);
    const targetY = state.pointer.y * 0.8 - scrollProgress * 1.8;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);

    // Scroll-driven camera parallax
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5 + scrollProgress * 2.5, 0.05);

    // Dynamic morphing distortion
    if (materialRef.current) {
      materialRef.current.distort = THREE.MathUtils.lerp(
        materialRef.current.distort,
        0.38 + scrollProgress * 0.25,
        0.05
      );
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1.35, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#cbd5e1"
          roughness={0.12}
          metalness={0.92}
          distort={0.4}
          speed={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

/** Animated 3D Floating Particle Cloud (Electric Blue, Fiery Red, Metallic Silver) */
function ParticleCloud({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const blue = new THREE.Color("#00d2ff");
    const red = new THREE.Color("#ff003c");
    const silver = new THREE.Color("#f1f5f9");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const choice = i % 3;
      const c = choice === 0 ? blue : choice === 1 ? red : silver;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/** 2D Fallback for mobile / reduced motion */
function Fallback2D() {
  return (
    <div className="absolute inset-0 bg-[#040408] overflow-hidden">
      <div className="absolute -left-40 top-1/4 h-[35rem] w-[35rem] rounded-full bg-blue/20 blur-[150px] animate-pulse-glow" />
      <div className="absolute -right-40 top-1/3 h-[35rem] w-[35rem] rounded-full bg-red/20 blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-10 left-1/3 h-[30rem] w-[30rem] rounded-full bg-silver/10 blur-[140px]" />
    </div>
  );
}

export default function Hero3DScene() {
  const reduce = useReducedMotion();
  const [hasWebGL, setHasWebGL] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!hasWebGL || reduce) {
    return <Fallback2D />;
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div aria-hidden className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-[#040408] pointer-events-none">
      {/* Deep Black & Dual Blue/Red Glow Orbs */}
      <div className="absolute -left-36 top-10 h-[38rem] w-[38rem] rounded-full bg-[#00d2ff]/15 blur-[160px]" />
      <div className="absolute -right-36 top-1/3 h-[40rem] w-[40rem] rounded-full bg-[#ff003c]/15 blur-[160px]" />
      <div className="absolute bottom-10 left-1/3 h-[30rem] w-[30rem] rounded-full bg-white/5 blur-[140px]" />

      <Canvas
        dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1)]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="h-full w-full"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          {/* Intense Electric Blue Key Light */}
          <directionalLight position={[10, 10, 5]} intensity={2.2} color="#00d2ff" />
          {/* Vibrant Laser Red Rim Light */}
          <directionalLight position={[-10, -10, -5]} intensity={2.0} color="#ff003c" />
          {/* Metallic Silver Highlight from top */}
          <pointLight position={[0, 4, 3]} intensity={1.5} color="#ffffff" />

          <DistortedSphere scrollProgress={scrollProgress} />
          <ParticleCloud count={isMobile ? 90 : 220} />
        </Suspense>
      </Canvas>
    </div>
  );
}
