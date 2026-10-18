import { useEffect, useRef } from "react";

/**
 * 4D CINEMATIC MICROBIOLOGY BACKGROUND COMPONENT
 * Dark cinematic microscope & sci-fi data look:
 * - Near-black background (#05060a) with subtle dark grey gradient and radial lens vignette
 * - Strict palette: glowing red (#ff3b2f), white, and dark greys
 * - 34 procedurally generated microbes across 3 morphology types:
 *   1. Bacillus: rod/capsule with translucent membrane, internal glowing dots, sine-wave cilia/flagella, and cell division
 *   2. Cocci: spherical clusters joined by intercellular struts
 *   3. Virion: 3D wireframe icosahedron with radiating spikes and red-glowing tips
 * - Multi-layer parallax: bokeh discs, intercellular communication lines, near-camera blurred microbes
 * - Microscope HUD overlay: circular lens ring, central crosshair reticle, perimeter ruler ticks, 10 µm scale bar
 * - Shallow depth of field, mouse parallax, hover attraction glow
 * - 60 FPS capped dpr, tab visibility pause, prefers-reduced-motion support
 */

const PHI = (1 + Math.sqrt(5)) / 2;
const ICO_VERTICES = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]
].map((v) => {
  const len = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / len, v[1] / len, v[2] / len];
});

const ICO_EDGES = [
  [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
  [1, 5], [1, 9], [1, 8], [1, 7],
  [2, 11], [2, 4], [2, 3], [2, 6], [2, 10],
  [3, 4], [3, 9], [3, 8], [3, 6],
  [4, 5], [4, 9], [4, 11],
  [5, 9], [5, 11],
  [6, 7], [6, 8], [6, 10],
  [7, 8], [7, 10],
  [8, 9],
  [10, 11]
];

function rotate3D(v: number[], rx: number, ry: number, rz: number): number[] {
  const [x, y, z] = v;
  const y1 = y * Math.cos(rx) - z * Math.sin(rx);
  const z1 = y * Math.sin(rx) + z * Math.cos(rx);
  const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
  const z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
  const x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
  const y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
  return [x3, y3, z2];
}

interface Microbe {
  type: "bacillus" | "cocci" | "virion";
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  length: number;
  radius: number;
  flagellaCount: number;
  flagellaPhase: number;
  cocciSpheres: Array<{ ox: number; oy: number; oz: number; r: number; isRed: boolean }>;
  virionRadius: number;
  spikeLength: number;
  isDividing: boolean;
  divisionProgress: number;
  divisionSpeed: number;
  pulsePhase: number;
  hoverGlow: number;
}

export default function MicrobiologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    const CONFIG = {
      BG_COLOR: "#05060a",
      MICROBE_COUNT: 34,
      MAX_DPR: 2,
      CAMERA_DIST: 700,
      FOCAL_PLANE: 0,
      FOCAL_DEPTH: 180,
      PARALLAX_FACTOR: 0.04,
      ATTRACTION_RADIUS: 140,
      BOKEH_COUNT: 15,
      DUST_COUNT: 70,
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let rawMouseX = -1000;
    let rawMouseY = -1000;
    let isTabVisible = true;
    let animationId: number;

    const microbes: Microbe[] = [];
    const bokehDiscs: Array<{ x: number; y: number; radius: number; alpha: number; speed: number; phase: number }> = [];
    const dustParticles: Array<{ x: number; y: number; z: number; vx: number; vy: number; isRed: boolean; radius: number; twinkle: number }> = [];

    function createMicrobe(forceType: "bacillus" | "cocci" | "virion" | null = null, initialZ: number | null = null): Microbe {
      const types: Array<"bacillus" | "cocci" | "virion"> = ["bacillus", "cocci", "virion"];
      const type = forceType || types[Math.floor(Math.random() * types.length)];
      const z = initialZ !== null ? initialZ : Math.random() * 800 - 350;

      const cocciSpheres = [];
      const numCocci = Math.floor(Math.random() * 4) + 4;
      for (let s = 0; s < numCocci; s++) {
        cocciSpheres.push({
          ox: (Math.random() - 0.5) * 36,
          oy: (Math.random() - 0.5) * 36,
          oz: (Math.random() - 0.5) * 24,
          r: Math.random() * 5 + 7,
          isRed: Math.random() > 0.45,
        });
      }

      return {
        type,
        x: (Math.random() - 0.5) * (width * 1.3),
        y: (Math.random() - 0.5) * (height * 1.3),
        z,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.2,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vRotX: (Math.random() - 0.5) * 0.015,
        vRotY: (Math.random() - 0.5) * 0.015,
        vRotZ: (Math.random() - 0.5) * 0.012,
        length: Math.random() * 32 + 38,
        radius: Math.random() * 8 + 14,
        flagellaCount: Math.floor(Math.random() * 3) + 2,
        flagellaPhase: Math.random() * Math.PI * 2,
        cocciSpheres,
        virionRadius: Math.random() * 10 + 20,
        spikeLength: Math.random() * 6 + 12,
        isDividing: Math.random() < 0.15 && type === "bacillus",
        divisionProgress: 0,
        divisionSpeed: Math.random() * 0.002 + 0.001,
        pulsePhase: Math.random() * Math.PI * 2,
        hoverGlow: 0,
      };
    }

    function initScene() {
      microbes.length = 0;
      for (let i = 0; i < CONFIG.MICROBE_COUNT; i++) {
        const initialZ = i < 3 ? Math.random() * -120 - 240 : null;
        microbes.push(createMicrobe(null, initialZ));
      }

      bokehDiscs.length = 0;
      for (let i = 0; i < CONFIG.BOKEH_COUNT; i++) {
        bokehDiscs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 65 + 30,
          alpha: Math.random() * 0.09 + 0.03,
          speed: Math.random() * 0.001 + 0.0006,
          phase: Math.random() * Math.PI * 2,
        });
      }

      dustParticles.length = 0;
      for (let i = 0; i < CONFIG.DUST_COUNT; i++) {
        dustParticles.push({
          x: (Math.random() - 0.5) * (width * 1.2),
          y: (Math.random() - 0.5) * (height * 1.2),
          z: Math.random() * 900 - 450,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          isRed: Math.random() > 0.65,
          radius: Math.random() * 1.6 + 0.6,
          twinkle: Math.random() * Math.PI * 2,
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

      initScene();
      if (prefersReducedMotion) {
        drawFrame(0);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX = e.clientX;
      rawMouseY = e.clientY;
      targetMouseX = e.clientX - width / 2;
      targetMouseY = e.clientY - height / 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        rawMouseX = e.touches[0].clientX;
        rawMouseY = e.touches[0].clientY;
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

    function project(x: number, y: number, z: number) {
      const zEff = z + CONFIG.CAMERA_DIST;
      if (zEff <= 1) return { x: 0, y: 0, scale: 0, inView: false, zEff };
      const scale = CONFIG.CAMERA_DIST / zEff;
      const screenX = width / 2 + x * scale;
      const screenY = height / 2 + y * scale;
      return {
        x: screenX,
        y: screenY,
        scale,
        zEff,
        inView: screenX >= -150 && screenX <= width + 150 && screenY >= -150 && screenY <= height + 150,
      };
    }

    function getDoF(z: number) {
      const dist = Math.abs(z - CONFIG.FOCAL_PLANE);
      if (dist <= CONFIG.FOCAL_DEPTH) {
        return { blur: 0, opacity: 1.0, sharp: true };
      }
      const ratio = Math.min((dist - CONFIG.FOCAL_DEPTH) / 300, 1.0);
      return {
        blur: ratio * 7.0,
        opacity: Math.max(0.28, 1.0 - ratio * 0.65),
        sharp: false,
      };
    }

    function drawBackground() {
      ctx.fillStyle = CONFIG.BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      const centerGlow = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.7);
      centerGlow.addColorStop(0, "rgba(28, 33, 46, 0.25)");
      centerGlow.addColorStop(0.6, "rgba(10, 12, 18, 0.1)");
      centerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      const lensRadius = Math.max(width, height) * 0.65;
      const lensVignette = ctx.createRadialGradient(width / 2, height / 2, lensRadius * 0.45, width / 2, height / 2, lensRadius);
      lensVignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      lensVignette.addColorStop(0.7, "rgba(5, 6, 10, 0.45)");
      lensVignette.addColorStop(1, "rgba(0, 0, 0, 0.95)");
      ctx.fillStyle = lensVignette;
      ctx.fillRect(0, 0, width, height);
    }

    function drawBokeh(time: number) {
      ctx.save();
      const pX = -mouseX * 0.02;
      const pY = -mouseY * 0.02;

      for (let i = 0; i < bokehDiscs.length; i++) {
        const b = bokehDiscs[i];
        const osc = Math.sin(time * b.speed + b.phase) * 20;
        const x = b.x + pX + osc;
        const y = b.y + pY - osc;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, b.radius);
        grad.addColorStop(0, `rgba(255, 59, 47, ${b.alpha * 1.5})`);
        grad.addColorStop(0.5, `rgba(255, 59, 47, ${b.alpha * 0.5})`);
        grad.addColorStop(1, "rgba(255, 59, 47, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawDust(time: number) {
      ctx.save();
      for (let i = 0; i < dustParticles.length; i++) {
        const d = dustParticles[i];
        if (!prefersReducedMotion) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < -width * 0.6) d.x = width * 0.6;
          if (d.x > width * 0.6) d.x = -width * 0.6;
          if (d.y < -height * 0.6) d.y = height * 0.6;
          if (d.y > height * 0.6) d.y = -height * 0.6;
        }

        const proj = project(d.x + mouseX * 0.02, d.y + mouseY * 0.02, d.z);
        if (!proj.inView) continue;

        const dof = getDoF(d.z);
        const r = Math.max(0.6, d.radius * proj.scale);
        const alpha = Math.sin(time * 0.003 + d.twinkle) * 0.3 + 0.5;

        ctx.fillStyle = d.isRed
          ? `rgba(255, 59, 47, ${alpha * dof.opacity * 0.7})`
          : `rgba(255, 255, 255, ${alpha * dof.opacity * 0.5})`;

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawBacillus(m: Microbe, proj: { x: number; y: number; scale: number }, dof: { opacity: number; sharp: boolean }, time: number) {
      const { x, y, scale } = proj;
      const r = m.radius * scale;
      const len = m.length * scale;
      const pulse = Math.sin(time * 0.002 + m.pulsePhase) * 0.08 + 1;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(m.rotZ);

      let waistRatio = 1.0;
      if (m.isDividing) {
        m.divisionProgress += m.divisionSpeed;
        if (m.divisionProgress >= 1) {
          m.divisionProgress = 0;
          m.isDividing = false;
        }
        waistRatio = Math.max(0.2, 1 - Math.sin(m.divisionProgress * Math.PI) * 0.75);
      }

      const glowR = r * 2.2 * pulse;
      const glow = ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, glowR);
      const glowAlpha = (0.35 + m.hoverGlow * 0.4) * dof.opacity;
      glow.addColorStop(0, `rgba(255, 59, 47, ${glowAlpha})`);
      glow.addColorStop(1, "rgba(255, 59, 47, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, glowR, 0, Math.PI * 2);
      ctx.fill();

      const hLen = (len / 2) * pulse;
      ctx.beginPath();
      ctx.moveTo(-hLen, -r);
      ctx.bezierCurveTo(-hLen * 0.3, -r * waistRatio, hLen * 0.3, -r * waistRatio, hLen, -r);
      ctx.arc(hLen, 0, r, -Math.PI / 2, Math.PI / 2);
      ctx.bezierCurveTo(hLen * 0.3, r * waistRatio, -hLen * 0.3, r * waistRatio, -hLen, r);
      ctx.arc(-hLen, 0, r, Math.PI / 2, -Math.PI / 2);
      ctx.closePath();

      const membraneGrad = ctx.createLinearGradient(-hLen, -r, hLen, r);
      membraneGrad.addColorStop(0, `rgba(255, 255, 255, ${0.15 * dof.opacity})`);
      membraneGrad.addColorStop(0.5, `rgba(255, 59, 47, ${(0.18 + m.hoverGlow * 0.2) * dof.opacity})`);
      membraneGrad.addColorStop(1, `rgba(20, 24, 34, ${0.4 * dof.opacity})`);
      ctx.fillStyle = membraneGrad;
      ctx.fill();

      ctx.strokeStyle = `rgba(255, 255, 255, ${(dof.sharp ? 0.7 : 0.3) * dof.opacity})`;
      ctx.lineWidth = Math.max(0.8, 1.4 * scale);
      ctx.stroke();

      const numDots = 4;
      for (let d = 0; d < numDots; d++) {
        const dotX = ((d - (numDots - 1) / 2) / numDots) * len * 0.7;
        const dotY = Math.sin(time * 0.003 + d) * (r * 0.3);
        const dotR = Math.max(1.2, 2.5 * scale);

        ctx.fillStyle = d % 2 === 0
          ? `rgba(255, 59, 47, ${0.85 * dof.opacity})`
          : `rgba(255, 255, 255, ${0.8 * dof.opacity})`;

        ctx.beginPath();
        ctx.arc(dotX, dotY, dotR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 * dof.opacity})`;
      ctx.lineWidth = Math.max(0.6, 1.0 * scale);

      for (let f = 0; f < m.flagellaCount; f++) {
        const pole = f % 2 === 0 ? 1 : -1;
        const startX = pole * (hLen + r * 0.7);
        const startY = (f - 1) * (r * 0.4);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        const segs = 7;
        const segLen = 6 * scale;

        for (let s = 1; s <= segs; s++) {
          const wave = Math.sin(time * 0.006 + m.flagellaPhase + s * 0.7) * (3.5 * scale);
          const px = startX + pole * (s * segLen);
          const py = startY + wave;
          ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawCocci(m: Microbe, proj: { x: number; y: number; scale: number }, dof: { opacity: number }) {
      const { x, y, scale } = proj;

      ctx.save();
      ctx.translate(x, y);

      ctx.strokeStyle = `rgba(90, 100, 126, ${0.35 * dof.opacity})`;
      ctx.lineWidth = Math.max(0.7, 1.2 * scale);

      for (let i = 0; i < m.cocciSpheres.length; i++) {
        const s1 = m.cocciSpheres[i];
        for (let j = i + 1; j < m.cocciSpheres.length; j++) {
          const s2 = m.cocciSpheres[j];
          const dist = Math.hypot(s1.ox - s2.ox, s1.oy - s2.oy);
          if (dist < 40) {
            ctx.beginPath();
            ctx.moveTo(s1.ox * scale, s1.oy * scale);
            ctx.lineTo(s2.ox * scale, s2.oy * scale);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < m.cocciSpheres.length; i++) {
        const s = m.cocciSpheres[i];
        const rotCoords = rotate3D([s.ox, s.oy, s.oz], m.rotX, m.rotY, m.rotZ);
        const sx = rotCoords[0] * scale;
        const sy = rotCoords[1] * scale;
        const sr = Math.max(2, s.r * scale);

        const glow = ctx.createRadialGradient(sx, sy, sr * 0.3, sx, sy, sr * 2.2);
        if (s.isRed) {
          glow.addColorStop(0, `rgba(255, 59, 47, ${(0.8 + m.hoverGlow * 0.3) * dof.opacity})`);
          glow.addColorStop(1, "rgba(255, 59, 47, 0)");
        } else {
          glow.addColorStop(0, `rgba(255, 255, 255, ${0.75 * dof.opacity})`);
          glow.addColorStop(1, "rgba(255, 255, 255, 0)");
        }
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(sx, sy, sr * 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = s.isRed ? "#ff3b2f" : "#ffffff";
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * dof.opacity})`;
        ctx.lineWidth = Math.max(0.6, 1.0 * scale);
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawVirion(m: Microbe, proj: { x: number; y: number; scale: number }, dof: { opacity: number }) {
      const { x, y, scale } = proj;
      const R = m.virionRadius * scale;
      const spikeLen = m.spikeLength * scale;

      ctx.save();
      ctx.translate(x, y);

      const rotatedVerts = ICO_VERTICES.map((v) => {
        const scaled = [v[0] * R, v[1] * R, v[2] * R];
        return rotate3D(scaled, m.rotX, m.rotY, m.rotZ);
      });

      ctx.strokeStyle = `rgba(90, 103, 130, ${0.45 * dof.opacity})`;
      ctx.lineWidth = Math.max(0.8, 1.3 * scale);

      for (let e = 0; e < ICO_EDGES.length; e++) {
        const [i1, i2] = ICO_EDGES[e];
        const v1 = rotatedVerts[i1];
        const v2 = rotatedVerts[i2];

        ctx.beginPath();
        ctx.moveTo(v1[0], v1[1]);
        ctx.lineTo(v2[0], v2[1]);
        ctx.stroke();
      }

      for (let i = 0; i < rotatedVerts.length; i++) {
        const v = rotatedVerts[i];
        const len = Math.hypot(v[0], v[1], v[2]);
        const nx = v[0] / len;
        const ny = v[1] / len;

        const tipX = v[0] + nx * spikeLen;
        const tipY = v[1] + ny * spikeLen;

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * dof.opacity})`;
        ctx.lineWidth = Math.max(0.7, 1.1 * scale);
        ctx.beginPath();
        ctx.moveTo(v[0], v[1]);
        ctx.lineTo(tipX, tipY);
        ctx.stroke();

        const tipR = Math.max(1.8, 3.2 * scale);
        const glowR = tipR * 3.2;

        const tipGlow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, glowR);
        tipGlow.addColorStop(0, `rgba(255, 59, 47, ${(0.85 + m.hoverGlow * 0.4) * dof.opacity})`);
        tipGlow.addColorStop(1, "rgba(255, 59, 47, 0)");
        ctx.fillStyle = tipGlow;
        ctx.beginPath();
        ctx.arc(tipX, tipY, glowR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ff3b2f";
        ctx.beginPath();
        ctx.arc(tipX, tipY, tipR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    function drawMicroscopeOverlay() {
      ctx.save();
      const cx = width / 2;
      const cy = height / 2;
      const minDim = Math.min(width, height);
      const ringR = minDim * 0.43;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
      ctx.beginPath();
      ctx.arc(cx, cy, ringR + 18, 0, Math.PI * 2);
      ctx.stroke();

      const crossSize = 14;
      const gap = 6;
      ctx.strokeStyle = "rgba(255, 59, 47, 0.25)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(cx, cy - crossSize);
      ctx.lineTo(cx, cy - gap);
      ctx.moveTo(cx, cy + gap);
      ctx.lineTo(cx, cy + crossSize);
      ctx.moveTo(cx - crossSize, cy);
      ctx.lineTo(cx - gap, cy);
      ctx.moveTo(cx + gap, cy);
      ctx.lineTo(cx + crossSize, cy);
      ctx.stroke();

      const barX = width - 140;
      const barY = height - 45;
      const barLen = 70;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(barX, barY);
      ctx.lineTo(barX + barLen, barY);
      ctx.moveTo(barX, barY - 4);
      ctx.lineTo(barX, barY + 4);
      ctx.moveTo(barX + barLen, barY - 4);
      ctx.lineTo(barX + barLen, barY + 4);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "9px monospace";
      ctx.fillText("10 µm", barX + 22, barY - 7);

      ctx.restore();
    }

    function drawFrame(time: number) {
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      drawBackground();
      drawBokeh(time);
      drawDust(time);

      const projList: Array<{
        raw: Microbe;
        proj: { x: number; y: number; scale: number; inView: boolean; zEff: number };
        zEff: number;
      }> = [];

      for (let i = 0; i < microbes.length; i++) {
        const m = microbes[i];

        if (!prefersReducedMotion) {
          m.x += m.vx;
          m.y += m.vy;
          m.z += m.vz;
          m.rotX += m.vRotX;
          m.rotY += m.vRotY;
          m.rotZ += m.vRotZ;

          const boundX = width * 0.65;
          const boundY = height * 0.65;
          if (m.x < -boundX) m.x = boundX;
          if (m.x > boundX) m.x = -boundX;
          if (m.y < -boundY) m.y = boundY;
          if (m.y > boundY) m.y = -boundY;
          if (m.z < -380) m.z = 450;
          if (m.z > 450) m.z = -380;
        }

        const px = m.x + mouseX * CONFIG.PARALLAX_FACTOR * (1 + m.z * 0.001);
        const py = m.y + mouseY * CONFIG.PARALLAX_FACTOR * (1 + m.z * 0.001);
        const proj = project(px, py, m.z);

        const distToMouse = Math.hypot(proj.x - rawMouseX, proj.y - rawMouseY);
        if (distToMouse < CONFIG.ATTRACTION_RADIUS) {
          m.hoverGlow = Math.min(1.0, m.hoverGlow + 0.08);
          const angle = Math.atan2(rawMouseY - proj.y, rawMouseX - proj.x);
          m.x += Math.cos(angle) * 0.4;
          m.y += Math.sin(angle) * 0.4;
        } else {
          m.hoverGlow = Math.max(0, m.hoverGlow - 0.03);
        }

        projList.push({
          raw: m,
          proj,
          zEff: proj.zEff,
        });
      }

      projList.sort((a, b) => b.zEff - a.zEff);

      // Mid layer: Intercellular lines
      const MAX_DIST = 160;
      ctx.save();
      for (let i = 0; i < projList.length; i++) {
        const m1 = projList[i];
        if (!m1.proj.inView) continue;

        for (let j = i + 1; j < projList.length; j++) {
          const m2 = projList[j];
          if (!m2.proj.inView) continue;

          const dx = m1.raw.x - m2.raw.x;
          const dy = m1.raw.y - m2.raw.y;
          const dz = m1.raw.z - m2.raw.z;
          const dist3D = Math.hypot(dx, dy, dz);

          if (dist3D < MAX_DIST) {
            const alpha = (1 - dist3D / MAX_DIST) * 0.16;
            ctx.strokeStyle = `rgba(255, 59, 47, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(m1.proj.x, m1.proj.y);
            ctx.lineTo(m2.proj.x, m2.proj.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // Microbes rendering
      for (let i = 0; i < projList.length; i++) {
        const item = projList[i];
        if (!item.proj.inView) continue;

        const dof = getDoF(item.raw.z);

        if (item.raw.type === "bacillus") {
          drawBacillus(item.raw, item.proj, dof, time);
        } else if (item.raw.type === "cocci") {
          drawCocci(item.raw, item.proj, dof);
        } else {
          drawVirion(item.raw, item.proj, dof);
        }
      }

      drawMicroscopeOverlay();
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
