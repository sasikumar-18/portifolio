import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
  "Python",
  "Java",
  "C++",
  "JavaScript",
  "React.js",
  "Node.js",
  "Express",
  "REST APIs",
  "MySQL",
  "MongoDB",
  "Scikit-learn",
  "OpenCV",
  "AWS",
  "Git",
  "Agile",
  "Data Analysis",
  "Flask",
  "HTML5",
  "CSS3",
];

interface TagProps {
  text: string;
  index: number;
  position: [number, number, number];
  onHover: (text: string | null) => void;
  isHovered: boolean;
}

function SkillTag({ text, index, position, onHover, isHovered }: TagProps) {
  const [localHover, setLocalHover] = useState(false);

  // Palette: alternate electric blue, fiery red, metallic silver
  const defaultColor = index % 3 === 0 ? "#00d2ff" : index % 3 === 1 ? "#ff003c" : "#cbd5e1";
  const activeColor = localHover || isHovered ? "#ffffff" : defaultColor;

  return (
    <Billboard position={position}>
      <Text
        fontSize={0.28}
        letterSpacing={0.02}
        color={activeColor}
        outlineWidth={localHover ? 0.025 : 0.01}
        outlineColor={localHover ? (index % 2 === 0 ? "#00d2ff" : "#ff003c") : "#040408"}
        onPointerOver={(e) => {
          e.stopPropagation();
          setLocalHover(true);
          onHover(text);
          if (document.body) document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setLocalHover(false);
          onHover(null);
          if (document.body) document.body.style.cursor = "auto";
        }}
      >
        {text}
      </Text>
    </Billboard>
  );
}

function SphereCloud({
  isDragging,
  dragVelocity,
  hoveredSkill,
  setHoveredSkill,
}: {
  isDragging: boolean;
  dragVelocity: { x: number; y: number };
  hoveredSkill: string | null;
  setHoveredSkill: (s: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 2.4;

  const words = useMemo(() => {
    const list: { text: string; pos: [number, number, number]; index: number }[] = [];
    const count = SKILLS.length;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      list.push({ text: SKILLS[i], pos: [x, y, z], index: i });
    }
    return list;
  }, [radius]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (isDragging) {
      groupRef.current.rotation.y += dragVelocity.x * 0.05;
      groupRef.current.rotation.x += dragVelocity.y * 0.05;
    } else {
      const speed = hoveredSkill ? 0.05 : 0.22;
      groupRef.current.rotation.y += delta * speed;
      groupRef.current.rotation.x += delta * (speed * 0.4);
    }
  });

  return (
    <group ref={groupRef}>
      {words.map(({ text, pos, index }) => (
        <SkillTag
          key={text}
          text={text}
          index={index}
          position={pos}
          onHover={setHoveredSkill}
          isHovered={hoveredSkill === text}
        />
      ))}
    </group>
  );
}

export default function SkillsSphere3D() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragVelocity, setDragVelocity] = useState({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    setDragVelocity({ x: deltaX * 0.1, y: deltaY * 0.1 });
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div
      className="relative h-[380px] sm:h-[460px] w-full cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <div className="absolute top-2 inset-x-0 flex items-center justify-center pointer-events-none z-10">
        <span className="chip-silver !text-[11px] font-mono tracking-wider border-blue/40 text-blue">
          {hoveredSkill ? `TECH: ${hoveredSkill.toUpperCase()}` : "DRAG TO ROTATE 3D SPHERE"}
        </span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <pointLight position={[5, 5, 5]} intensity={1.8} color="#00d2ff" />
          <pointLight position={[-5, -5, -5]} intensity={1.8} color="#ff003c" />
          <SphereCloud
            isDragging={isDragging}
            dragVelocity={dragVelocity}
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
