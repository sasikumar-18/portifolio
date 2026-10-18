import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [cursorMode, setCursorMode] = useState<"default" | "hover" | "view">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 450, damping: 28, mass: 0.3 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28, mass: 0.3 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest("[data-cursor='view'], .project-card");
      if (projectCard) {
        setCursorMode("view");
        return;
      }

      const isInteractive = target.closest("a, button, input, textarea, [role='button']");
      if (isInteractive) {
        setCursorMode("hover");
        return;
      }

      setCursorMode("default");
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, mouseX, mouseY]);

  if (!enabled) return null;

  const isView = cursorMode === "view";
  const isHover = cursorMode === "hover";

  return (
    <>
      {/* Outer Follower / View Bubble */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full font-mono text-[11px] font-bold tracking-widest text-blue select-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isView ? 76 : isHover ? 44 : 26,
          height: isView ? 76 : isHover ? 44 : 26,
          backgroundColor: isView
            ? "rgba(4, 4, 8, 0.92)"
            : isHover
            ? "rgba(255, 0, 60, 0.2)"
            : "rgba(0, 210, 255, 0.08)",
          borderColor: isView ? "#00d2ff" : isHover ? "#ff003c" : "rgba(0, 210, 255, 0.6)",
          borderWidth: isView ? "1.5px" : "1px",
          boxShadow: isView
            ? "0 0 30px rgba(0, 210, 255, 0.6), 0 0 15px rgba(255, 0, 60, 0.4)"
            : isHover
            ? "0 0 20px rgba(255, 0, 60, 0.7)"
            : "0 0 12px rgba(0, 210, 255, 0.4)",
          backdropFilter: isView ? "blur(8px)" : "none",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {isView && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="flex items-center gap-1 drop-shadow-[0_0_8px_#00d2ff]"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>

      {/* Tiny Core Dot (hidden in 'view' mode) */}
      {!isView && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[91] h-1.5 w-1.5 rounded-full bg-blue shadow-[0_0_8px_#00d2ff]"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{ scale: isHover ? 0 : 1 }}
        />
      )}
    </>
  );
}
