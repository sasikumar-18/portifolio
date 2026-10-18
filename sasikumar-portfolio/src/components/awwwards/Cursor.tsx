import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const hoveredRef = useRef(false);
  const cursorTextRef = useRef("");
  const isVisibleRef = useRef(false);
  const lastTargetRef = useRef<EventTarget | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Responsive spring with high stiffness and balanced damping for zero perceivable lag
  const springConfig = { damping: 28, stiffness: 450, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      mouseX.set(clientX);
      mouseY.set(clientY);

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Fast bailout if target hasn't changed
      if (e.target === lastTargetRef.current) return;
      lastTargetRef.current = e.target;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      let nextHovered = false;
      let nextText = "";

      const projectCard = target.closest("[data-cursor='view']");
      if (projectCard) {
        nextHovered = true;
        nextText = "VIEW";
      } else {
        const interactive = target.closest("a, button, input, textarea, [role='button'], .interactive");
        if (interactive) {
          nextHovered = true;
          nextText = "";
        }
      }

      if (nextHovered !== hoveredRef.current) {
        hoveredRef.current = nextHovered;
        setHovered(nextHovered);
      }
      if (nextText !== cursorTextRef.current) {
        cursorTextRef.current = nextText;
        setCursorText(nextText);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Outer Follower Ring / Expanded Pill */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hovered ? (cursorText ? 2.2 : 1.6) : 1,
          backgroundColor: cursorText
            ? "rgba(0, 240, 255, 0.95)"
            : hovered
            ? "rgba(0, 240, 255, 0.18)"
            : "rgba(0, 240, 255, 0.05)",
          borderColor: cursorText
            ? "rgba(0, 240, 255, 1)"
            : hovered
            ? "rgba(0, 240, 255, 0.85)"
            : "rgba(0, 240, 255, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        className="fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border border-[#00f0ff] flex items-center justify-center pointer-events-none will-change-transform shadow-[0_0_10px_rgba(0,240,255,0.3)]"
      >
        {cursorText && (
          <span className="text-[7px] font-black tracking-widest text-[#0a0a0a] uppercase font-mono select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Tiny Centered Dot (Tracks mouse instantaneously with 0 lag) */}
      {!cursorText && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
          }}
          className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#00f0ff] pointer-events-none shadow-[0_0_8px_#00f0ff] will-change-transform"
        />
      )}
    </div>
  );
}
