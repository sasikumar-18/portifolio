import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface ContactObjectProps {
  isFocused: boolean;
}

function CyberCore({ isFocused }: { isFocused: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const speedMultiplier = isFocused ? 2.6 : 0.8;

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35 * speedMultiplier;
      meshRef.current.rotation.y += delta * 0.45 * speedMultiplier;

      const targetScale = isFocused ? 1.15 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x -= delta * 0.25 * speedMultiplier;
      wireframeRef.current.rotation.y += delta * 0.35 * speedMultiplier;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.6 * speedMultiplier;
      ringRef.current.rotation.y += delta * 0.2 * speedMultiplier;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.5 * speedMultiplier;
      ring2Ref.current.rotation.z += delta * 0.4 * speedMultiplier;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1}>
      <group>
        {/* Inner Solid Icosahedron */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color={isFocused ? "#00d2ff" : "#cbd5e1"}
            roughness={0.15}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>

        {/* Outer Wireframe Cage in Fiery Red */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshBasicMaterial
            color={isFocused ? "#ff003c" : "#ff1744"}
            wireframe
            transparent
            opacity={isFocused ? 0.9 : 0.55}
          />
        </mesh>

        {/* Orbiting Cyber Ring 1 in Electric Blue */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.95, 0.025, 16, 64]} />
          <meshBasicMaterial color="#00d2ff" transparent opacity={0.7} />
        </mesh>

        {/* Orbiting Cyber Ring 2 in Metallic Silver / Fiery Red */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.25, 0.025, 16, 64]} />
          <meshBasicMaterial color="#ff003c" transparent opacity={0.65} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Contact3DObject({ isFocused }: ContactObjectProps) {
  return (
    <div className="relative h-[280px] sm:h-[340px] w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.8} color="#00d2ff" />
          <directionalLight position={[-5, -5, -5]} intensity={1.8} color="#ff003c" />
          <pointLight position={[0, 0, 2]} intensity={isFocused ? 2.5 : 1.2} color="#ffffff" />
          <CyberCore isFocused={isFocused} />
        </Suspense>
      </Canvas>
    </div>
  );
}
