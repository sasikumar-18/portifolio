import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Fixed backdrop: neon cyan and magenta drifting particles with laser connections. */
export default function Background() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const small = window.innerWidth < 768;
    const count = small ? 32 : 75;
    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Alternate between electric blue (#00d2ff), fiery laser red (#ff003c), and metallic silver (#cbd5e1)
    const pts = Array.from({ length: count }, (_, idx) => {
      const type = idx % 3 === 0 ? "blue" : idx % 3 === 1 ? "red" : "silver";
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r: Math.random() * 1.6 + 0.8,
        type,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (p.type === "blue") {
          ctx.fillStyle = "rgba(0, 210, 255, 0.9)";
          ctx.shadowColor = "rgba(0, 210, 255, 0.95)";
          ctx.shadowBlur = 10;
        } else if (p.type === "red") {
          ctx.fillStyle = "rgba(255, 0, 60, 0.9)";
          ctx.shadowColor = "rgba(255, 0, 60, 0.95)";
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = "rgba(203, 213, 225, 0.85)";
          ctx.shadowColor = "rgba(203, 213, 225, 0.85)";
          ctx.shadowBlur = 8;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0; // reset

      if (!small) {
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const d = dx * dx + dy * dy;
            if (d < 135 * 135) {
              const alpha = 0.25 * (1 - d / 18225);
              const grad = ctx.createLinearGradient(pts[i].x, pts[i].y, pts[j].x, pts[j].y);
              const colorA = pts[i].type === "blue" ? `rgba(0, 210, 255, ${alpha})` : pts[i].type === "red" ? `rgba(255, 0, 60, ${alpha})` : `rgba(203, 213, 225, ${alpha * 0.7})`;
              const colorB = pts[j].type === "blue" ? `rgba(0, 210, 255, ${alpha})` : pts[j].type === "red" ? `rgba(255, 0, 60, ${alpha})` : `rgba(203, 213, 225, ${alpha * 0.7})`;
              grad.addColorStop(0, colorA);
              grad.addColorStop(1, colorB);
              ctx.strokeStyle = grad;
              ctx.lineWidth = 0.85;
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#040408]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#040408] via-[#070712] to-[#040408]" />
      <div className="grid-bg absolute inset-0 opacity-75" />
      <motion.div
        className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[#00d2ff]/12 blur-[140px]"
        animate={reduce ? undefined : { x: [0, 80, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 top-1/3 h-[36rem] w-[36rem] rounded-full bg-[#ff003c]/12 blur-[160px]"
        animate={reduce ? undefined : { x: [0, -70, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-1/3 h-[28rem] w-[28rem] rounded-full bg-[#00d2ff]/8 blur-[130px]"
        animate={reduce ? undefined : { x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}


