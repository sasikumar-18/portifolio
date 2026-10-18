import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FloorParticleShader } from "./shaders";

interface ParticleFloorProps {
  isMobile?: boolean;
}

export default function ParticleFloor({ isMobile = false }: ParticleFloorProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const count = isMobile ? 3200 : 7500;

  const [positions, sizes, offsets] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const offs = new Float32Array(count);

    // Floor parameters
    const width = 28.0;
    const yFloor = -1.65; // Base ground height

    for (let i = 0; i < count; i++) {
      // Perspective distribution: higher density toward center line
      const xNorm = (Math.random() - 0.5) * 2.0;
      const x = Math.sign(xNorm) * Math.pow(Math.abs(xNorm), 1.3) * (width * 0.5);

      pos[i * 3] = x;
      pos[i * 3 + 1] = yFloor;
      pos[i * 3 + 2] = 0; // z is calculated in shader based on time + aOffset

      sz[i] = Math.random() * 2.5 + 1.2;
      offs[i] = Math.random() * 47.0; // Random offset across the forward travel range
    }

    return [pos, sz, offs];
  }, [count]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aInitialPos"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={count}
            array={sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aOffset"
            count={count}
            array={offsets}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={FloorParticleShader.vertexShader}
          fragmentShader={FloorParticleShader.fragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uSpeed: { value: 2.2 },
            uPixelRatio: {
              value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
            },
          }}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
