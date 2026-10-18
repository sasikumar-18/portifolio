import { useEffect, useRef } from "react";

/**
 * 4D AI CYBERNETIC ROBOT TOUCHING HUMAN BRAIN COMPONENT
 * Palette:
 * - Pure dark background (#03050a)
 * - Electric Cyan (#00e5ff) & Neon Cobalt Blue (#0088ff)
 * - Crisp White (#ffffff) highlights
 * - Dark metallic chassis greys
 * 
 * Features:
 * - 3D Human Brain: Dual hemispheres with 150+ neural nodes, synaptic axonal filaments, travelling action potentials
 * - Articulated Cybernetic Robot Hand & Arm with metallic plates, wrist gimbal, and illuminated blue servos
 * - Synaptic Touchpoint: Dynamic branching electric lightning arcs jumping between robot finger & brain cortex
 * - Perspective holographic floor grid & floating cyber dust
 * - Mouse & touch parallax with 3D tilt
 * - 60 FPS capped dpr, tab visibility pause, prefers-reduced-motion support
 */

interface BrainNode {
  x: number;
  y: number;
  z: number;
  basePulse: number;
  pulseSpeed: number;
  size: number;
  isActionPotential: boolean;
}

interface BrainEdge {
  from: number;
  to: number;
  pulseOffset: number;
}

function rotate3D(x: number, y: number, z: number, rx: number, ry: number, rz: number): [number, number, number] {
  const y1 = y * Math.cos(rx) - z * Math.sin(rx);
  const z1 = y * Math.sin(rx) + z * Math.cos(rx);
  const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
  const z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
  const x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
  const y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
  return [x3, y3, z2];
}

export default function AiNeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    const CONFIG = {
      BG_COLOR: "#03050a",
      BRAIN_NODES: 150,
      MAX_DPR: 2,
      CAMERA_DIST: 750,
      PARALLAX_FACTOR: 0.045,
      SPARK_ARCS: 8,
      DUST_COUNT: 75,
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

    const brainNodes: BrainNode[] = [];
    const brainEdges: BrainEdge[] = [];
    const dust: Array<{ x: number; y: number; z: number; vx: number; vy: number; r: number; alpha: number; isCyan: boolean }> = [];

    function initBrainGeometry() {
      brainNodes.length = 0;
      brainEdges.length = 0;

      for (let i = 0; i < CONFIG.BRAIN_NODES; i++) {
        const hemi = i % 2 === 0 ? 1 : -1;
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);

        const rx = 100 * Math.sin(phi) * Math.cos(theta);
        const ry = 75 * Math.sin(phi) * Math.sin(theta);
        const rz = 90 * Math.cos(phi);

        let bx = rx * 0.9 + hemi * 48;
        let by = ry * 0.95;
        let bz = rz * 1.05;

        if (bz > 0) by *= 1.1;
        if (by > 30) bx *= 0.85;

        const ripple = Math.sin(bx * 0.1) * Math.cos(by * 0.1) * Math.sin(bz * 0.1) * 8;
        bx += ripple;
        by += ripple;
        bz += ripple;

        brainNodes.push({
          x: bx,
          y: by,
          z: bz,
          basePulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          size: Math.random() * 2.2 + 1.8,
          isActionPotential: Math.random() > 0.65,
        });
      }

      for (let i = 0; i < brainNodes.length; i++) {
        for (let j = i + 1; j < brainNodes.length; j++) {
          const dx = brainNodes[i].x - brainNodes[j].x;
          const dy = brainNodes[i].y - brainNodes[j].y;
          const dz = brainNodes[i].z - brainNodes[j].z;
          const dist = Math.hypot(dx, dy, dz);

          if (dist < 42) {
            brainEdges.push({
              from: i,
              to: j,
              pulseOffset: Math.random() * Math.PI * 2,
            });
          }
        }
      }
    }

    function initDust() {
      dust.length = 0;
      for (let i = 0; i < CONFIG.DUST_COUNT; i++) {
        dust.push({
          x: (Math.random() - 0.5) * (width * 1.4),
          y: (Math.random() - 0.5) * (height * 1.4),
          z: Math.random() * 800 - 400,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.8 + 0.5,
          alpha: Math.random() * 0.6 + 0.2,
          isCyan: Math.random() > 0.4,
        });
      }
    }

    function project3D(x: number, y: number, z: number, originX: number, originY: number) {
      const zOffset = z + CONFIG.CAMERA_DIST;
      if (zOffset <= 1) return { x: 0, y: 0, scale: 0, depth: zOffset, inView: false };
      const scale = CONFIG.CAMERA_DIST / zOffset;
      const screenX = originX + x * scale;
      const screenY = originY + y * scale;
      return {
        x: screenX,
        y: screenY,
        scale,
        depth: zOffset,
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

      initBrainGeometry();
      initDust();

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

    function drawBackground() {
      ctx.fillStyle = CONFIG.BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      const centerGlow = ctx.createRadialGradient(width * 0.42, height * 0.5, 0, width * 0.42, height * 0.5, width * 0.65);
      centerGlow.addColorStop(0, "rgba(0, 229, 255, 0.08)");
      centerGlow.addColorStop(0.4, "rgba(0, 136, 255, 0.03)");
      centerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      const vignette = ctx.createRadialGradient(width / 2, height / 2, width * 0.25, width / 2, height / 2, width * 0.85);
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(0.7, "rgba(3, 5, 10, 0.55)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.95)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    }

    function drawGridFloor() {
      const horizonY = height * 0.72;
      const floorBottom = height;
      const gridCenterX = width * 0.5 + mouseX * 0.03;
      const linesCount = 16;

      ctx.save();
      ctx.strokeStyle = "rgba(0, 229, 255, 0.04)";
      ctx.lineWidth = 1;

      for (let i = -linesCount / 2; i <= linesCount / 2; i++) {
        const xBottom = gridCenterX + i * width * 0.13;
        ctx.beginPath();
        ctx.moveTo(gridCenterX, horizonY);
        ctx.lineTo(xBottom, floorBottom);
        ctx.stroke();
      }

      const numHoriz = 8;
      for (let j = 1; j <= numHoriz; j++) {
        const factor = Math.pow(j / numHoriz, 2.2);
        const y = horizonY + (floorBottom - horizonY) * factor;
        const alpha = factor * 0.09;
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawDust(time: number) {
      ctx.save();
      for (let i = 0; i < dust.length; i++) {
        const p = dust[i];
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -width * 0.7) p.x = width * 0.7;
          if (p.x > width * 0.7) p.x = -width * 0.7;
          if (p.y < -height * 0.7) p.y = height * 0.7;
          if (p.y > height * 0.7) p.y = -height * 0.7;
        }

        const proj = project3D(p.x, p.y, p.z, width / 2, height / 2);
        if (!proj.inView) continue;

        const alpha = Math.sin(time * 0.002 + p.x) * 0.25 + 0.6;
        ctx.fillStyle = p.isCyan
          ? `rgba(0, 229, 255, ${alpha * p.alpha})`
          : `rgba(255, 255, 255, ${alpha * p.alpha * 0.8})`;

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, Math.max(0.6, p.r * proj.scale), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawHumanBrain(time: number, originX: number, originY: number) {
      ctx.save();

      const floatY = Math.sin(time * 0.0015) * 12;
      const rotY = time * 0.003 + mouseX * 0.0004;
      const rotX = mouseY * 0.0004 - 0.08;
      const rotZ = 0.05;

      const projectedNodes = brainNodes.map((node) => {
        const rotCoords = rotate3D(node.x, node.y + floatY, node.z, rotX, rotY, rotZ);
        const proj = project3D(rotCoords[0], rotCoords[1], rotCoords[2], originX, originY);
        return {
          ...node,
          proj,
          zEff: rotCoords[2],
        };
      });

      const brainGlow = ctx.createRadialGradient(originX, originY + floatY, 20, originX, originY + floatY, 190);
      brainGlow.addColorStop(0, "rgba(0, 229, 255, 0.22)");
      brainGlow.addColorStop(0.5, "rgba(0, 136, 255, 0.08)");
      brainGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = brainGlow;
      ctx.beginPath();
      ctx.arc(originX, originY + floatY, 190, 0, Math.PI * 2);
      ctx.fill();

      // Synaptic Filaments
      for (let k = 0; k < brainEdges.length; k++) {
        const edge = brainEdges[k];
        const n1 = projectedNodes[edge.from];
        const n2 = projectedNodes[edge.to];

        if (!n1.proj.inView || !n2.proj.inView) continue;

        ctx.strokeStyle = "rgba(0, 180, 255, 0.16)";
        ctx.lineWidth = Math.max(0.6, 1.2 * n1.proj.scale);
        ctx.beginPath();
        ctx.moveTo(n1.proj.x, n1.proj.y);
        ctx.lineTo(n2.proj.x, n2.proj.y);
        ctx.stroke();

        const signalPos = (time * 0.002 + edge.pulseOffset) % 1.0;
        const sigX = n1.proj.x + (n2.proj.x - n1.proj.x) * signalPos;
        const sigY = n1.proj.y + (n2.proj.y - n1.proj.y) * signalPos;

        if (k % 4 === 0) {
          ctx.fillStyle = "#00e5ff";
          ctx.beginPath();
          ctx.arc(sigX, sigY, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Synaptic Nodes
      for (let i = 0; i < projectedNodes.length; i++) {
        const n = projectedNodes[i];
        if (!n.proj.inView) continue;

        const pulse = Math.sin(time * n.pulseSpeed + n.basePulse) * 0.3 + 0.7;
        const r = Math.max(1.2, n.size * n.proj.scale);

        const glowR = r * 3.5;
        const glow = ctx.createRadialGradient(n.proj.x, n.proj.y, 0, n.proj.x, n.proj.y, glowR);
        glow.addColorStop(0, `rgba(0, 229, 255, ${0.75 * pulse})`);
        glow.addColorStop(0.4, `rgba(0, 136, 255, ${0.3 * pulse})`);
        glow.addColorStop(1, "rgba(0, 229, 255, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.proj.x, n.proj.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = n.isActionPotential ? "#ffffff" : "#00e5ff";
        ctx.beginPath();
        ctx.arc(n.proj.x, n.proj.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      const touchLobe = projectedNodes[Math.min(projectedNodes.length - 1, 14)];
      return {
        touchX: touchLobe ? touchLobe.proj.x : originX + 70,
        touchY: touchLobe ? touchLobe.proj.y - 30 : originY - 30,
      };
    }

    function drawRobotHand(targetX: number, targetY: number) {
      ctx.save();

      const armStartX = width * 0.88 + mouseX * 0.03;
      const armStartY = height * 0.12 + mouseY * 0.03;

      const wristX = targetX + 170;
      const wristY = targetY - 110;

      const knuckleX = targetX + 85;
      const knuckleY = targetY - 45;

      const joint1X = targetX + 50;
      const joint1Y = targetY - 24;
      const joint2X = targetX + 24;
      const joint2Y = targetY - 10;
      const tipX = targetX;
      const tipY = targetY;

      // Forearm
      const armGrad = ctx.createLinearGradient(armStartX, armStartY, wristX, wristY);
      armGrad.addColorStop(0, "rgba(16, 21, 36, 0.95)");
      armGrad.addColorStop(0.5, "rgba(32, 43, 68, 0.9)");
      armGrad.addColorStop(1, "rgba(54, 71, 102, 0.95)");

      ctx.strokeStyle = armGrad;
      ctx.lineWidth = 26;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(armStartX, armStartY);
      ctx.lineTo(wristX, wristY);
      ctx.stroke();

      // Illuminated blue line
      ctx.strokeStyle = "#00e5ff";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#00e5ff";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(armStartX - 4, armStartY - 4);
      ctx.lineTo(wristX - 4, wristY - 4);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Wrist
      ctx.fillStyle = "#1c263c";
      ctx.strokeStyle = "#00e5ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(wristX, wristY, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(wristX, wristY, 5, 0, Math.PI * 2);
      ctx.fill();

      // Palm
      ctx.strokeStyle = "#283652";
      ctx.lineWidth = 18;
      ctx.beginPath();
      ctx.moveTo(wristX, wristY);
      ctx.lineTo(knuckleX, knuckleY);
      ctx.stroke();

      ctx.fillStyle = "#0f1726";
      ctx.strokeStyle = "#6a84b5";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(knuckleX, knuckleY, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Index finger phalanges
      ctx.strokeStyle = "#324363";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(knuckleX, knuckleY);
      ctx.lineTo(joint1X, joint1Y);
      ctx.stroke();

      ctx.fillStyle = "#00e5ff";
      ctx.beginPath();
      ctx.arc(joint1X, joint1Y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#42587f";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(joint1X, joint1Y);
      ctx.lineTo(joint2X, joint2Y);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(joint2X, joint2Y, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#6a84b5";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(joint2X, joint2Y);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();

      // Silicone sensor tip
      ctx.fillStyle = "#00e5ff";
      ctx.shadowColor = "#00e5ff";
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(tipX, tipY, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();
    }

    function drawSynapticSpark(cx: number, cy: number, time: number) {
      ctx.save();
      const sparkPulse = Math.sin(time * 0.008) * 0.35 + 0.85;

      // Concentric Shockwave Rings
      const ringCount = 3;
      for (let r = 0; r < ringCount; r++) {
        const ringProgress = (time * 0.0012 + r / ringCount) % 1;
        const ringRadius = ringProgress * 75;
        const ringAlpha = (1 - ringProgress) * 0.45;

        ctx.strokeStyle = `rgba(0, 229, 255, ${ringAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Plasma Glow
      const glowR = 60 * sparkPulse;
      const plasmaGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      plasmaGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      plasmaGlow.addColorStop(0.2, "rgba(0, 229, 255, 0.85)");
      plasmaGlow.addColorStop(0.55, "rgba(0, 136, 255, 0.35)");
      plasmaGlow.addColorStop(1, "rgba(0, 229, 255, 0)");

      ctx.fillStyle = plasmaGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Electric Lightning Bolts
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.6;
      ctx.shadowColor = "#00e5ff";
      ctx.shadowBlur = 14;

      for (let a = 0; a < CONFIG.SPARK_ARCS; a++) {
        const arcAngle = (a / CONFIG.SPARK_ARCS) * Math.PI * 2 + Math.sin(time * 0.01 + a) * 0.5;
        const arcDist = Math.random() * 32 + 18;
        const midX = cx + Math.cos(arcAngle) * (arcDist * 0.5) + (Math.random() - 0.5) * 8;
        const midY = cy + Math.sin(arcAngle) * (arcDist * 0.5) + (Math.random() - 0.5) * 8;
        const endX = cx + Math.cos(arcAngle) * arcDist;
        const endY = cy + Math.sin(arcAngle) * arcDist;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(midX, midY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function drawFrame(time: number) {
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      drawBackground();
      drawGridFloor();
      drawDust(time);

      const brainCenterX = width * 0.38 + mouseX * CONFIG.PARALLAX_FACTOR * 10;
      const brainCenterY = height * 0.52 + mouseY * CONFIG.PARALLAX_FACTOR * 10;

      const { touchX, touchY } = drawHumanBrain(time, brainCenterX, brainCenterY);
      drawRobotHand(touchX, touchY);
      drawSynapticSpark(touchX, touchY, time);
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
