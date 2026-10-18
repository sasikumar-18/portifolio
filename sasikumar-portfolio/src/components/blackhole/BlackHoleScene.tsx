import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import AccretionDisk from "./AccretionDisk";
import CosmicParticles from "./CosmicParticles";
import ParticleFloor from "./ParticleFloor";
import Silhouette from "./Silhouette";

interface CameraRigProps {
  reducedMotion: boolean;
}

function CameraRig({ reducedMotion }: CameraRigProps) {
  const { camera, pointer } = useThree();

  useFrame((state, delta) => {
    if (reducedMotion) {
      camera.position.set(0, 1.2, 7.8);
      camera.lookAt(0, 1.6, 0);
      return;
    }

    const t = state.clock.getElapsedTime();

    // Subtle breathing float motion
    const floatY = Math.sin(t * 0.4) * 0.12;
    const floatX = Math.cos(t * 0.3) * 0.08;

    // Interactive mouse parallax target
    const targetX = pointer.x * 0.75 + floatX;
    const targetY = 1.1 + pointer.y * 0.45 + floatY;
    const targetZ = 7.6 + Math.sin(t * 0.2) * 0.2;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);

    // Look toward upper-middle area (black hole center)
    camera.lookAt(0, 1.45, 0);
  });

  return null;
}

export default function BlackHoleScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => {
      window.removeEventListener("resize", checkScreen);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-[#000000] pointer-events-none select-none"
    >
      {/* Fallback Static Gradient Backdrop */}
      <div className="absolute inset-0 bg-radial-gradient from-[#111625]/20 via-[#000000] to-[#000000]" />

      <Canvas
        camera={{ position: [0, 1.2, 7.8], fov: 48, near: 0.1, far: 100 }}
        dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1)]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        className="h-full w-full"
      >
        <color attach="background" args={["#000000"]} />

        <Suspense fallback={null}>
          <CameraRig reducedMotion={reducedMotion} />

          {/* Minimal cinematic monochrome lighting */}
          <ambientLight intensity={0.25} />
          <directionalLight position={[0, 8, 4]} intensity={1.8} color="#ffffff" />
          <pointLight position={[0, 1.4, 0]} intensity={3.5} distance={15} color="#e2e8f0" />

          {/* The Accretion Disk & Event Horizon */}
          <AccretionDisk isMobile={isMobile} />

          {/* The Infinite Reflective Perspective Floor */}
          <ParticleFloor isMobile={isMobile} />

          {/* Distant Starfield and Cosmic Dust */}
          <CosmicParticles isMobile={isMobile} />

          {/* The Explorer Silhouette */}
          <Silhouette />
        </Suspense>
      </Canvas>
    </div>
  );
}
