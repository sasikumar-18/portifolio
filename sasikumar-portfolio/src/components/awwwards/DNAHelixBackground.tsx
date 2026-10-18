import { useEffect, useRef } from "react";

/**
 * 4D SCI-FI TECH BACKGROUND COMPONENT
 * Pure black background (#05060a), glowing red (#ff3b2f), white, and dark greys.
 * Features:
 * - Diagonal 3D/4D DNA Double Helix with glowing red & white nodes, rungs, and struts
 * - Top-Left drifting neural graph network
 * - Perspective grid floor with fine measurement tick marks and telemetry data
 * - Bottom-Left out-of-focus red bokeh circles & anamorphic light streaks
 * - Twinkling cosmic data particles
 * - Mouse & touch parallax with 3D tilt
 * - Shallow depth of field (DoF blur & size falloff based on camera distance)
 * - 60 FPS performance, respects prefers-reduced-motion, auto-pauses when tab hidden
 */

export default function DNAHelixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    // Configuration tunables
    const CONFIG = {
      BG_COLOR: "#05060a",
      ACCENT_RED: "#ff3b2f",
      WHITE: "#ffffff",
      HELIX_PAIRS: 46,
      HELIX_RADIUS: 115,
      HELIX_PITCH: 38,
      HELIX_ROT_SPEED: 0.011,
      FLOAT_SPEED: 0.0016,
      FLOAT_AMPLITUDE: 24,
      PARALLAX_STRENGTH: 0.035,
      MAX_DPR: 2,
      FOCAL_DISTANCE: 450,
      FOCAL_RANGE: 160,
      NETWORK_NODES: 20,
      NETWORK_CONN_DIST: 130,
      BOKEH_COUNT: 14,
      STARS_COUNT: 85,
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

    // Entities
    const networkNodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    }> = [];

    const bokehDiscs: Array<{
      baseX: number;
      baseY: number;
      radius: number;
      opacity: number;
      speed: number;
      driftOffset: number;
    }> = [];

    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      isRed: boolean;
      twinkleSpeed: number;
      phase: number;
    }> = [];

    function initNetworkNodes() {
      networkNodes.length = 0;
      for (let i = 0; i < CONFIG.NETWORK_NODES; i++) {
        networkNodes.push({
          x: Math.random() * (width * 0.45) - 30,
          y: Math.random() * (height * 0.45) - 30,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2 + 1.5,
          color: Math.random() > 0.4 ? CONFIG.ACCENT_RED : CONFIG.WHITE,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function initBokehDiscs() {
      bokehDiscs.length = 0;
      for (let i = 0; i < CONFIG.BOKEH_COUNT; i++) {
        bokehDiscs.push({
          baseX: Math.random() * (width * 0.45),
          baseY: height - Math.random() * (height * 0.45),
          radius: Math.random() * 55 + 25,
          opacity: Math.random() * 0.12 + 0.04,
          speed: Math.random() * 0.001 + 0.0005,
          driftOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < CONFIG.STARS_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.6 + 0.2,
          isRed: Math.random() > 0.75,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, CONFIG.MAX_DPR);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initNetworkNodes();
      initBokehDiscs();
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

    // 3D Projection & Depth of field
    const CAMERA_DISTANCE = 850;

    function project3D(x: number, y: number, z: number, originX: number, originY: number) {
      const zOffset = z + CAMERA_DISTANCE;
      if (zOffset <= 1) return { x: 0, y: 0, scale: 0, depth: zOffset, inView: false };
      const scale = CAMERA_DISTANCE / zOffset;
      const screenX = originX + x * scale;
      const screenY = originY + y * scale;
      return {
        x: screenX,
        y: screenY,
        scale,
        depth: zOffset,
        inView: screenX >= -100 && screenX <= width + 100 && screenY >= -100 && screenY <= height + 100,
      };
    }

    function getDepthOfField(depth: number) {
      const distFromFocal = Math.abs(depth - CONFIG.FOCAL_DISTANCE);
      if (distFromFocal <= CONFIG.FOCAL_RANGE) {
        return { blur: 0, opacity: 1.0, sharp: true };
      }
      const blurFactor = Math.min((distFromFocal - CONFIG.FOCAL_RANGE) / 300, 1.0);
      return {
        blur: blurFactor * 4.5,
        opacity: Math.max(0.35, 1.0 - blurFactor * 0.55),
        sharp: false,
      };
    }

    function drawBackground() {
      ctx.fillStyle = CONFIG.BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      // Warm subtle gradient bleed from left edge
      const leftGlow = ctx.createRadialGradient(0, height * 0.45, 0, 0, height * 0.45, width * 0.65);
      leftGlow.addColorStop(0, "rgba(255, 80, 50, 0.08)");
      leftGlow.addColorStop(0.5, "rgba(255, 59, 47, 0.02)");
      leftGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = leftGlow;
      ctx.fillRect(0, 0, width, height);

      // Vignette
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        width * 0.2,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      vignette.addColorStop(0, "rgba(10, 12, 18, 0)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.88)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    }

    function drawPerspectiveGrid() {
      const horizonY = height * 0.62;
      const floorBottom = height;
      const gridCenterX = width * 0.5 + mouseX * 0.04;
      const linesCount = 16;

      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;

      for (let i = -linesCount / 2; i <= linesCount / 2; i++) {
        const xBottom = gridCenterX + i * width * 0.12;
        ctx.beginPath();
        ctx.moveTo(gridCenterX, horizonY);
        ctx.lineTo(xBottom, floorBottom);
        ctx.stroke();
      }

      const numHoriz = 10;
      for (let j = 1; j <= numHoriz; j++) {
        const factor = Math.pow(j / numHoriz, 2.2);
        const y = horizonY + (floorBottom - horizonY) * factor;
        const alpha = factor * 0.07;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        if (j % 2 === 0) {
          ctx.fillStyle = "rgba(255, 59, 47, 0.35)";
          ctx.font = "8px monospace";
          const textX = gridCenterX - 70 + j * 15;
          ctx.fillText(`SEQ_IDX: 0x${(j * 43).toString(16).toUpperCase()} // +${(j * 12.4).toFixed(1)}m`, textX, y - 4);
        }
      }
      ctx.restore();
    }

    function drawNetworkGraph(time: number) {
      ctx.save();
      const pX = mouseX * 0.02;
      const pY = mouseY * 0.02;

      for (let i = 0; i < networkNodes.length; i++) {
        const n = networkNodes[i];
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -40 || n.x > width * 0.45) n.vx *= -1;
          if (n.y < -40 || n.y > height * 0.45) n.vy *= -1;
        }

        for (let j = i + 1; j < networkNodes.length; j++) {
          const n2 = networkNodes[j];
          const dx = n.x + pX - (n2.x + pX);
          const dy = n.y + pY - (n2.y + pY);
          const dist = Math.hypot(dx, dy);

          if (dist < CONFIG.NETWORK_CONN_DIST) {
            const alpha = (1 - dist / CONFIG.NETWORK_CONN_DIST) * 0.15;
            ctx.strokeStyle = `rgba(90, 98, 122, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n.x + pX, n.y + pY);
            ctx.lineTo(n2.x + pX, n2.y + pY);
            ctx.stroke();
          }
        }

        const pulseAlpha = Math.sin(time * 0.002 + n.pulse) * 0.2 + 0.6;
        ctx.fillStyle =
          n.color === CONFIG.ACCENT_RED
            ? `rgba(255, 59, 47, ${pulseAlpha})`
            : `rgba(255, 255, 255, ${pulseAlpha * 0.8})`;

        ctx.beginPath();
        ctx.arc(n.x + pX, n.y + pY, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawBokehAndStreaks(time: number) {
      ctx.save();
      const pX = -mouseX * 0.04;
      const pY = -mouseY * 0.04;

      for (let i = 0; i < bokehDiscs.length; i++) {
        const b = bokehDiscs[i];
        const osc = Math.sin(time * b.speed + b.driftOffset) * 15;
        const x = b.baseX + pX + osc;
        const y = b.baseY + pY - osc;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, b.radius);
        grad.addColorStop(0, `rgba(255, 59, 47, ${b.opacity * 1.5})`);
        grad.addColorStop(0.5, `rgba(255, 59, 47, ${b.opacity * 0.6})`);
        grad.addColorStop(1, "rgba(255, 59, 47, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Horizontal red light streak
      const streakY = height * 0.72 + pY * 0.5;
      const streakLength = width * 0.65;
      const streakX = width * 0.12;

      const streakGrad = ctx.createLinearGradient(streakX, streakY, streakX + streakLength, streakY);
      streakGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      streakGrad.addColorStop(0.1, "#ff3b2f");
      streakGrad.addColorStop(0.4, "rgba(255, 59, 47, 0.35)");
      streakGrad.addColorStop(1, "rgba(255, 59, 47, 0)");

      ctx.strokeStyle = streakGrad;
      ctx.lineWidth = 3;
      ctx.shadowColor = "#ff3b2f";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.moveTo(streakX, streakY);
      ctx.lineTo(streakX + streakLength, streakY);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(streakX + 6, streakY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function drawStars(time: number) {
      ctx.save();
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = Math.sin(time * s.twinkleSpeed + s.phase) * 0.4 + 0.6;
        const alpha = s.alpha * twinkle;

        ctx.fillStyle = s.isRed
          ? `rgba(255, 59, 47, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawHelixNode(
      proj: { x: number; y: number; scale: number; depth: number; inView: boolean },
      color: string
    ) {
      if (!proj.inView) return;

      const dof = getDepthOfField(proj.depth);
      const baseRadius = color === CONFIG.ACCENT_RED ? 4.8 : 3.8;
      const radius = Math.max(1.5, baseRadius * proj.scale);
      const glowRadius = radius * (color === CONFIG.ACCENT_RED ? 4.2 : 3.2);

      const glow = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, glowRadius);
      if (color === CONFIG.ACCENT_RED) {
        glow.addColorStop(0, `rgba(255, 59, 47, ${0.85 * dof.opacity})`);
        glow.addColorStop(0.4, `rgba(255, 59, 47, ${0.35 * dof.opacity})`);
        glow.addColorStop(1, "rgba(255, 59, 47, 0)");
      } else {
        glow.addColorStop(0, `rgba(255, 255, 255, ${0.9 * dof.opacity})`);
        glow.addColorStop(0.4, `rgba(255, 255, 255, ${0.25 * dof.opacity})`);
        glow.addColorStop(1, "rgba(255, 255, 255, 0)");
      }

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = color === CONFIG.ACCENT_RED ? (dof.sharp ? "#ff6050" : "#ff3b2f") : "#ffffff";
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawDNAHelix(time: number) {
      ctx.save();
      const originX = width * 0.28 + mouseX * CONFIG.PARALLAX_STRENGTH * 12;
      const originY = height * 0.62 + mouseY * CONFIG.PARALLAX_STRENGTH * 12;

      const angle = -0.62 + mouseY * 0.0001;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const rot = time * CONFIG.HELIX_ROT_SPEED;
      const floatY = Math.sin(time * CONFIG.FLOAT_SPEED) * CONFIG.FLOAT_AMPLITUDE;

      const pairs = [];
      const totalPairs = CONFIG.HELIX_PAIRS;

      for (let i = 0; i < totalPairs; i++) {
        const longitudinal = (i - totalPairs / 2) * CONFIG.HELIX_PITCH;
        const currentRot = rot + i * 0.26;

        const x1 = Math.cos(currentRot) * CONFIG.HELIX_RADIUS;
        const z1 = Math.sin(currentRot) * CONFIG.HELIX_RADIUS;
        const y1 = floatY;

        const x2 = Math.cos(currentRot + Math.PI) * CONFIG.HELIX_RADIUS;
        const z2 = Math.sin(currentRot + Math.PI) * CONFIG.HELIX_RADIUS;
        const y2 = floatY;

        const worldX1 = longitudinal * cosA - x1 * sinA;
        const worldY1 = longitudinal * sinA + x1 * cosA + y1;
        const worldZ1 = z1;

        const worldX2 = longitudinal * cosA - x2 * sinA;
        const worldY2 = longitudinal * sinA + x2 * cosA + y2;
        const worldZ2 = z2;

        const p1 = project3D(worldX1, worldY1, worldZ1, originX, originY);
        const p2 = project3D(worldX2, worldY2, worldZ2, originX, originY);

        pairs.push({
          p1,
          p2,
          avgDepth: (p1.depth + p2.depth) / 2,
          colorA: i % 2 === 0 ? CONFIG.ACCENT_RED : CONFIG.WHITE,
          colorB: i % 2 === 0 ? CONFIG.WHITE : CONFIG.ACCENT_RED,
        });
      }

      pairs.sort((a, b) => b.avgDepth - a.avgDepth);

      // Pass 1: Rungs & Struts
      for (let k = 0; k < pairs.length; k++) {
        const item = pairs[k];

        const rungGrad = ctx.createLinearGradient(item.p1.x, item.p1.y, item.p2.x, item.p2.y);
        rungGrad.addColorStop(0, item.colorA === CONFIG.ACCENT_RED ? "rgba(255, 59, 47, 0.7)" : "rgba(255, 255, 255, 0.7)");
        rungGrad.addColorStop(0.5, "rgba(90, 98, 122, 0.35)");
        rungGrad.addColorStop(1, item.colorB === CONFIG.ACCENT_RED ? "rgba(255, 59, 47, 0.7)" : "rgba(255, 255, 255, 0.7)");

        ctx.strokeStyle = rungGrad;
        ctx.lineWidth = Math.max(0.7, 1.6 * item.p1.scale);
        ctx.beginPath();
        ctx.moveTo(item.p1.x, item.p1.y);
        ctx.lineTo(item.p2.x, item.p2.y);
        ctx.stroke();

        if (k > 0) {
          const prev = pairs[k - 1];
          ctx.strokeStyle = "rgba(90, 98, 122, 0.18)";
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(item.p1.x, item.p1.y);
          ctx.lineTo(prev.p2.x, prev.p2.y);
          ctx.stroke();
        }
      }

      // Pass 2: Nodes
      for (let k = 0; k < pairs.length; k++) {
        const item = pairs[k];
        drawHelixNode(item.p1, item.colorA);
        drawHelixNode(item.p2, item.colorB);
      }

      ctx.restore();
    }

    function drawFrame(time: number) {
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      drawBackground();
      drawStars(time);
      drawPerspectiveGrid();
      drawNetworkGraph(time);
      drawBokehAndStreaks(time);
      drawDNAHelix(time);
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
