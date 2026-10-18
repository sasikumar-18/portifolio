import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AccretionParticleShader, PhotonRingShader } from "./shaders";

interface AccretionDiskProps {
  isMobile?: boolean;
}

export default function AccretionDisk({ isMobile = false }: AccretionDiskProps) {
  const particleMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const photonRingMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const diskGroupRef = useRef<THREE.Group>(null);
  const vortexGlowRef = useRef<THREE.Mesh>(null);

  const particleCount = isMobile ? 8000 : 18000;

  // Generate particle vortex coordinates
  const [positions, attributes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const radii = new Float32Array(particleCount);
    const angles = new Float32Array(particleCount);
    const elevations = new Float32Array(particleCount);
    const brightnesses = new Float32Array(particleCount);

    const innerRadius = 1.75;
    const outerRadius = 8.5;

    for (let i = 0; i < particleCount; i++) {
      // Exponential distribution: higher density closer to the event horizon
      const t = Math.pow(Math.random(), 2.2);
      const r = innerRadius + t * (outerRadius - innerRadius);

      const angle = Math.random() * Math.PI * 2;
      const elevation = (Math.random() - 0.5) * 0.45;

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = elevation;
      pos[i * 3 + 2] = Math.sin(angle) * r;

      radii[i] = r;
      angles[i] = angle;
      elevations[i] = elevation;

      // Inner particles have higher energy and speed
      speeds[i] = 0.35 + Math.random() * 0.45;
      sizes[i] = Math.random() * 2.8 + 1.2;
      brightnesses[i] = Math.random() * 0.65 + 0.35;
    }

    return [
      pos,
      {
        sizes,
        speeds,
        radii,
        angles,
        elevations,
        brightnesses,
      },
    ];
  }, [particleCount]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (particleMaterialRef.current) {
      particleMaterialRef.current.uniforms.uTime.value = time;
    }
    if (photonRingMaterialRef.current) {
      photonRingMaterialRef.current.uniforms.uTime.value = time;
    }

    // Gentle global precession tilt of the accretion disk
    if (diskGroupRef.current) {
      diskGroupRef.current.rotation.z = Math.sin(time * 0.15) * 0.05;
    }

    // Subtle breathing pulse of the central vortex glow
    if (vortexGlowRef.current) {
      const scale = 1.0 + Math.sin(time * 1.8) * 0.025;
      vortexGlowRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group ref={diskGroupRef} position={[0, 1.4, 0]}>
      {/* 1. Deep Completely Black Event Horizon Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.58, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* 2. Gravitational Lensing / Photon Ring Halo (Face-on aligned) */}
      <mesh ref={vortexGlowRef} position={[0, 0, 0.05]}>
        <planeGeometry args={[4.4, 4.4]} />
        <shaderMaterial
          ref={photonRingMaterialRef}
          vertexShader={PhotonRingShader.vertexShader}
          fragmentShader={PhotonRingShader.fragmentShader}
          uniforms={{
            uTime: { value: 0 },
          }}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Tilted Equatorial Accretion Disk (Interstellar-style Relativistic Tilt ~72deg) */}
      <group rotation={[1.25, 0.18, 0]}>
        {/* Swirling Metallic Particle Vortex */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-aSize"
              count={particleCount}
              array={attributes.sizes}
              itemSize={1}
            />
            <bufferAttribute
              attach="attributes-aSpeed"
              count={particleCount}
              array={attributes.speeds}
              itemSize={1}
            />
            <bufferAttribute
              attach="attributes-aRadius"
              count={particleCount}
              array={attributes.radii}
              itemSize={1}
            />
            <bufferAttribute
              attach="attributes-aAngle"
              count={particleCount}
              array={attributes.angles}
              itemSize={1}
            />
            <bufferAttribute
              attach="attributes-aElevation"
              count={particleCount}
              array={attributes.elevations}
              itemSize={1}
            />
            <bufferAttribute
              attach="attributes-aBrightness"
              count={particleCount}
              array={attributes.brightnesses}
              itemSize={1}
            />
          </bufferGeometry>
          <shaderMaterial
            ref={particleMaterialRef}
            vertexShader={AccretionParticleShader.vertexShader}
            fragmentShader={AccretionParticleShader.fragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
            }}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        {/* Dense Inner Relativistic Ring Streamers */}
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[1.7, 3.4, 128]} />
          <meshBasicMaterial
            color="#cbd5e1"
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 4. Secondary Upper/Lower Gravitational Lensing Arcs (Vertical bent light) */}
      <group rotation={[0, 0, 0]}>
        <mesh position={[0, 0, -0.2]}>
          <ringGeometry args={[1.68, 2.85, 96]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}
