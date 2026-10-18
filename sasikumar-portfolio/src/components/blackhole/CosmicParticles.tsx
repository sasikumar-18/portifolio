import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CosmicParticlesProps {
  isMobile?: boolean;
}

export default function CosmicParticles({ isMobile = false }: CosmicParticlesProps) {
  const starsRef = useRef<THREE.Points>(null);
  const dustRef = useRef<THREE.Points>(null);

  const starCount = isMobile ? 1800 : 4200;
  const dustCount = isMobile ? 400 : 900;

  // Starfield data
  const [starPositions, starColors, starSizes] = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);
    const sz = new Float32Array(starCount);

    const white = new THREE.Color("#ffffff");
    const chrome = new THREE.Color("#cbd5e1");
    const darkGray = new THREE.Color("#64748b");

    for (let i = 0; i < starCount; i++) {
      // Dome of distant stars
      const radius = 22.0 + Math.random() * 45.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = Math.max(-8.0, radius * Math.sin(phi) * Math.sin(theta) + 2.0);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const tone = Math.random();
      const chosenColor = tone > 0.65 ? white : tone > 0.3 ? chrome : darkGray;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      sz[i] = Math.random() * 1.5 + 0.6;
    }

    return [pos, col, sz];
  }, [starCount]);

  // Cosmic Dust data (closer, drifting slowly)
  const [dustPositions] = useMemo(() => {
    const pos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24.0;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16.0 + 1.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20.0 - 5.0;
    }
    return [pos];
  }, [dustCount]);

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.008;
    }
    if (dustRef.current) {
      dustRef.current.rotation.y -= delta * 0.015;
      dustRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <group>
      {/* 1. Distant Starfield */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starCount}
            array={starPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starCount}
            array={starColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 2. Drifting Metallic Dust */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustCount}
            array={dustPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#94a3b8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
