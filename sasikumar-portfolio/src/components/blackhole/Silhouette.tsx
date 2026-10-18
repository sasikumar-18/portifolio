import { useMemo } from "react";
import * as THREE from "three";

/**
 * Human explorer silhouette standing on the reflective floor gazing up at the black hole.
 * Establishes awe-inspiring scale and mystery.
 */
export default function Silhouette() {
  // Create silhouette shape: head, torso, legs, arms
  const silhouetteTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, 128, 256);
      ctx.fillStyle = "#020408"; // Jet black silhouette

      // Head
      ctx.beginPath();
      ctx.arc(64, 42, 14, 0, Math.PI * 2);
      ctx.fill();

      // Neck
      ctx.fillRect(60, 56, 8, 8);

      // Torso / Jacket (slight explorer stance)
      ctx.beginPath();
      ctx.moveTo(46, 64);
      ctx.lineTo(82, 64);
      ctx.lineTo(76, 140);
      ctx.lineTo(52, 140);
      ctx.closePath();
      ctx.fill();

      // Left Leg
      ctx.beginPath();
      ctx.moveTo(53, 140);
      ctx.lineTo(61, 140);
      ctx.lineTo(58, 240);
      ctx.lineTo(48, 240);
      ctx.closePath();
      ctx.fill();

      // Right Leg (slight stance apart)
      ctx.beginPath();
      ctx.moveTo(67, 140);
      ctx.lineTo(75, 140);
      ctx.lineTo(80, 240);
      ctx.lineTo(70, 240);
      ctx.closePath();
      ctx.fill();

      // Left Arm
      ctx.beginPath();
      ctx.moveTo(46, 68);
      ctx.lineTo(38, 130);
      ctx.lineTo(44, 132);
      ctx.lineTo(51, 74);
      ctx.closePath();
      ctx.fill();

      // Right Arm (hand slightly raised toward horizon)
      ctx.beginPath();
      ctx.moveTo(82, 68);
      ctx.lineTo(92, 122);
      ctx.lineTo(86, 126);
      ctx.lineTo(78, 74);
      ctx.closePath();
      ctx.fill();

      // Subtle rim highlight from the blinding black hole behind
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, []);

  return (
    <group position={[0, -1.15, 2.8]}>
      {/* Billboard plane with the silhouette */}
      <mesh>
        <planeGeometry args={[0.55, 1.1]} />
        <meshBasicMaterial
          map={silhouetteTexture}
          transparent
          alphaTest={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subtle contact shadow on the reflective particle floor */}
      <mesh position={[0, -0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 0.4, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}
