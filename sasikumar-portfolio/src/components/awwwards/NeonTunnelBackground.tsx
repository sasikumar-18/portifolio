import { useEffect, useRef } from "react";

/**
 * AI 4K OLED SCREENSAVER || NEON BLUE COLOR TUNNEL BACKGROUND COMPONENT
 * 
 * Visual Aesthetics:
 * - Pure OLED pitch black: #000000
 * - Electric Neon Cyan: #00f0ff, Cobalt Glow: #0066ff, Deep Blue: #0033aa
 * - Pure White: #ffffff highlight filaments
 * 
 * Features:
 * - Infinite Hypnotic 3D Tunnel Flythrough with concentric smooth polygon rings
 * - Seamless depth recycling for infinite warp flight
 * - Harmonic rotation twisting forming a cosmic vortex spiral
 * - Longitudinal neon laser rails running along tunnel walls
 * - Forward hyperspace star streaks with motion blur
 * - Meditative breathing wave pulsating the glow intensity
 * - Interactive camera steering with smooth mouse parallax
 * - 60 FPS performance, respects prefers-reduced-motion, auto-pauses when tab hidden
 */

interface Star {
  x: number;
  y: number;
  z: number;
  speed: number;
  size: number;
  isCyan: boolean;
}

interface ProjectedVertex {
  x: number;
  y: number;
  scale: number;
  inView: boolean;
}

interface TunnelRing {
  z: number;
  vertices: ProjectedVertex[];
  depthRatio: number;
}

export default function NeonTunnelBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    const CONFIG = {
      BG_COLOR: "#000000",
      RING_COUNT: 42,
      SIDES: 8,
      MAX_DEPTH: 1600,
      SPEED: 4.8,
      TWIST_SPEED: 0.0006,
      FOV: 680,
      MAX_DPR: 2,
      STAR_COUNT: 140,
      PARALLAX_FACTOR: 0.06,
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let isTabVisible = true;
    let animationId: number;
    let timeOffset = 0;

    const stars: Star[] = [];

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 450 + 50;
        stars.push({
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          z: Math.random() * CONFIG.MAX_DEPTH,
          speed: Math.random() * 3 + CONFIG.SPEED,
          size: Math.random() * 2 + 1,
          isCyan: Math.random() > 0.35,
        });
      }
    }

    function project(x: number, y: number, z: number, cx: number, cy: number): ProjectedVertex {
      if (z <= 1) return { x: 0, y: 0, scale: 0, inView: false };
      const scale = CONFIG.FOV / z;
      const screenX = cx + x * scale;
      const screenY = cy + y * scale;
      return {
        x: screenX,
        y: screenY,
        scale,
        inView: screenX >= -200 && screenX <= width + 200 && screenY >= -200 && screenY <= height + 200,
      };
    }

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, CONFIG.MAX_DPR);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initStars();

      if (prefersReducedMotion) {
        drawFrame(0);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX - width / 2;
      targetMouseY = e.clientY - height / 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX - width / 2;
        targetMouseY = e.touches[0].clientY - height / 2;
      }
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !prefersReducedMotion) {
        animationId = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    function drawBackground(cx: number, cy: number, breath: number) {
      ctx.fillStyle = CONFIG.BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      const vortexGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.55);
      vortexGlow.addColorStop(0, `rgba(0, 240, 255, ${0.16 * breath})`);
      vortexGlow.addColorStop(0.35, `rgba(0, 102, 255, ${0.08 * breath})`);
      vortexGlow.addColorStop(0.7, "rgba(0, 30, 80, 0.03)");
      vortexGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = vortexGlow;
      ctx.fillRect(0, 0, width, height);
    }

    function drawWarpStars(cx: number, cy: number) {
      ctx.save();
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (!prefersReducedMotion) {
          s.z -= s.speed;
          if (s.z <= 10) {
            s.z = CONFIG.MAX_DEPTH;
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 450 + 50;
            s.x = Math.cos(angle) * dist;
            s.y = Math.sin(angle) * dist;
          }
        }

        const p1 = project(s.x, s.y, s.z, cx, cy);
        const pPrev = project(s.x, s.y, s.z + 30, cx, cy);

        if (!p1.inView) continue;

        const alpha = Math.min(1.0, (CONFIG.MAX_DEPTH - s.z) / 400);

        ctx.strokeStyle = s.isCyan
          ? `rgba(0, 240, 255, ${alpha * 0.75})`
          : `rgba(255, 255, 255, ${alpha * 0.9})`;

        ctx.lineWidth = Math.max(1, s.size * p1.scale * 1.5);
        ctx.beginPath();
        ctx.moveTo(pPrev.x, pPrev.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawNeonTunnel(time: number, cx: number, cy: number, breath: number) {
      ctx.save();

      const numRings = CONFIG.RING_COUNT;
      const ringSpacing = CONFIG.MAX_DEPTH / numRings;
      const baseRadius = 380;
      const sides = CONFIG.SIDES;

      const rings: TunnelRing[] = [];

      for (let i = 0; i < numRings; i++) {
        let z = (i * ringSpacing - (timeOffset % ringSpacing) + CONFIG.MAX_DEPTH) % CONFIG.MAX_DEPTH;
        if (z < 30) z = 30;

        const rot = time * 0.0008 + z * CONFIG.TWIST_SPEED;

        const vertices: ProjectedVertex[] = [];
        for (let s = 0; s < sides; s++) {
          const a = (s / sides) * Math.PI * 2 + rot;
          const r = baseRadius * (1 + Math.sin(time * 0.001 + z * 0.003) * 0.06);
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          const proj = project(px, py, z, cx, cy);
          vertices.push(proj);
        }

        rings.push({
          z,
          vertices,
          depthRatio: 1 - z / CONFIG.MAX_DEPTH,
        });
      }

      rings.sort((a, b) => b.z - a.z);

      // Longitudinal Neon Laser Rails
      ctx.strokeStyle = `rgba(0, 102, 255, ${0.28 * breath})`;
      ctx.lineWidth = 1.2;

      for (let s = 0; s < sides; s++) {
        ctx.beginPath();
        for (let k = 0; k < rings.length; k++) {
          const v = rings[k].vertices[s];
          if (!v.inView) continue;
          if (k === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        }
        ctx.stroke();
      }

      // Concentric Neon Polygon Rings
      for (let k = 0; k < rings.length; k++) {
        const ring = rings[k];
        const d = ring.depthRatio;
        const verts = ring.vertices;

        let strokeColor: string;
        let glowColor: string;
        let lineWidth: number;
        let glowBlur: number;

        if (d > 0.75) {
          strokeColor = `rgba(255, 255, 255, ${0.9 * breath})`;
          glowColor = "#00f0ff";
          lineWidth = Math.max(2.2, 5.0 * verts[0].scale);
          glowBlur = 24;
        } else if (d > 0.4) {
          strokeColor = `rgba(0, 240, 255, ${d * 1.1 * breath})`;
          glowColor = "#0066ff";
          lineWidth = Math.max(1.4, 3.2 * verts[0].scale);
          glowBlur = 14;
        } else {
          strokeColor = `rgba(0, 102, 255, ${d * 1.4 * breath})`;
          glowColor = "#0033aa";
          lineWidth = Math.max(0.8, 1.8 * verts[0].scale);
          glowBlur = 6;
        }

        ctx.shadowColor = glowColor;
        ctx.shadowBlur = glowBlur;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        for (let s = 0; s < sides; s++) {
          const v = verts[s];
          if (s === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        }
        ctx.closePath();
        ctx.stroke();

        if (k % 2 === 0) {
          for (let s = 0; s < sides; s++) {
            const v = verts[s];
            if (!v.inView) continue;
            ctx.fillStyle = d > 0.6 ? "#ffffff" : "#00f0ff";
            ctx.beginPath();
            ctx.arc(v.x, v.y, Math.max(1.5, 3.2 * v.scale), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
    }

    function drawVignette(cx: number, cy: number) {
      ctx.save();
      const outerGrad = ctx.createRadialGradient(cx, cy, Math.min(width, height) * 0.4, cx, cy, Math.max(width, height) * 0.75);
      outerGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      outerGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.4)");
      outerGrad.addColorStop(1, "rgba(0, 0, 0, 0.96)");

      ctx.fillStyle = outerGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    function drawFrame(time: number) {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const cx = width / 2 + mouseX * CONFIG.PARALLAX_FACTOR * 8;
      const cy = height / 2 + mouseY * CONFIG.PARALLAX_FACTOR * 8;

      const breath = Math.sin(time * 0.0015) * 0.2 + 0.9;

      if (!prefersReducedMotion) {
        timeOffset += CONFIG.SPEED;
      }

      ctx.clearRect(0, 0, width, height);

      drawBackground(cx, cy, breath);
      drawWarpStars(cx, cy);
      drawNeonTunnel(time, cx, cy, breath);
      drawVignette(cx, cy);
    }

    function loop(currentTime: number) {
      if (!isTabVisible) return;
      drawFrame(currentTime);
      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(loop);
      }
    }

    resize();
    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
