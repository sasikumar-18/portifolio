import { useEffect, useRef } from "react";

/**
 * AI CHIP & ANN NEURON SYNAPSE TUNNEL BACKGROUND
 * 
 * Visual Aesthetics:
 * - Pure OLED pitch black: #000000
 * - Electric Neon Cyan: #00f0ff, Cobalt Deep Blue: #0066ff, Cyber Blue: #002b66
 * - Pure White: #ffffff action potential highlights & core illumination
 * 
 * Architectural Elements:
 * 1. AI Silicon Microchip / NPU Core:
 *    - Central processor die at the tunnel's focal vortex with etched circuit wafer grid
 *    - Radiating conductive bus pins (gold/cyan contacts) bridging to neural axon pathways
 *    - High-energy pulsing tensor core die with "AI NPU" holographic telemetry
 * 2. Artificial Neural Network (ANN) Synaptic Tunnel:
 *    - Concentric 3D neural layers (Input, Hidden, Output) with glowing soma (neuron bodies)
 *    - Feedforward synaptic connections linking adjacent neural layers with active weights
 *    - Dynamic action potential pulses (high-velocity photon packets) traveling along axons
 *    - Lateral dendritic lattice interconnecting nodes within each layer
 * 3. Hypnotic Depth & Parallax:
 *    - Smooth mouse steering & breathing meditative pulse
 *    - Forward warp flythrough with 60 FPS Canvas 2D math
 *    - Auto-pause on tab hidden & prefers-reduced-motion compliance
 */

interface SynapticPulse {
  fromLayer: number;
  fromNode: number;
  toLayer: number;
  toNode: number;
  progress: number;
  speed: number;
  brightness: number;
}

interface NeuralParticle {
  x: number;
  y: number;
  z: number;
  speed: number;
  size: number;
  isCyan: boolean;
}

interface ProjectedNode {
  x: number;
  y: number;
  scale: number;
  inView: boolean;
  activation: number;
}

interface NeuralLayer {
  z: number;
  nodes: ProjectedNode[];
  depthRatio: number;
  layerIdx: number;
  radius: number;
}

export default function AiChipAnnBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    const CONFIG = {
      BG_COLOR: "#000000",
      LAYER_COUNT: 28,
      NODES_PER_LAYER: 12,
      MAX_DEPTH: 1600,
      CHIP_DEPTH: 550,
      SPEED: 4.6,
      TWIST_SPEED: 0.00055,
      FOV: 680,
      MAX_DPR: 2,
      PARTICLE_COUNT: 110,
      PULSE_COUNT: 50,
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

    const particles: NeuralParticle[] = [];
    const pulses: SynapticPulse[] = [];

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 480 + 40;
        particles.push({
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          z: Math.random() * CONFIG.MAX_DEPTH,
          speed: Math.random() * 3 + CONFIG.SPEED,
          size: Math.random() * 1.8 + 0.8,
          isCyan: Math.random() > 0.3,
        });
      }
    }

    function initPulses() {
      pulses.length = 0;
      for (let i = 0; i < CONFIG.PULSE_COUNT; i++) {
        const layer = Math.floor(Math.random() * (CONFIG.LAYER_COUNT - 1));
        const node = Math.floor(Math.random() * CONFIG.NODES_PER_LAYER);
        const nextNode = (node + Math.floor(Math.random() * 3) - 1 + CONFIG.NODES_PER_LAYER) % CONFIG.NODES_PER_LAYER;
        pulses.push({
          fromLayer: layer,
          fromNode: node,
          toLayer: layer + 1,
          toNode: nextNode,
          progress: Math.random(),
          speed: Math.random() * 0.02 + 0.015,
          brightness: Math.random() * 0.5 + 0.5,
        });
      }
    }

    function project(x: number, y: number, z: number, cx: number, cy: number) {
      if (z <= 1) return { x: 0, y: 0, scale: 0, inView: false };
      const scale = CONFIG.FOV / z;
      const screenX = cx + x * scale;
      const screenY = cy + y * scale;
      return {
        x: screenX,
        y: screenY,
        scale,
        inView: screenX >= -250 && screenX <= width + 250 && screenY >= -250 && screenY <= height + 250,
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

      initParticles();
      initPulses();

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

    function drawDeepSpaceBackground(cx: number, cy: number, breath: number) {
      ctx.fillStyle = CONFIG.BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      // Deep Neural Energy Core Radial Glow
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.65);
      coreGlow.addColorStop(0, `rgba(0, 240, 255, ${0.18 * breath})`);
      coreGlow.addColorStop(0.28, `rgba(0, 102, 255, ${0.09 * breath})`);
      coreGlow.addColorStop(0.65, "rgba(0, 30, 80, 0.025)");
      coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = coreGlow;
      ctx.fillRect(0, 0, width, height);
    }

    function drawNeuralParticles(cx: number, cy: number) {
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.z -= p.speed;
          if (p.z <= 15) {
            p.z = CONFIG.MAX_DEPTH;
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 480 + 40;
            p.x = Math.cos(angle) * dist;
            p.y = Math.sin(angle) * dist;
          }
        }

        const p1 = project(p.x, p.y, p.z, cx, cy);
        const pPrev = project(p.x, p.y, p.z + 28, cx, cy);

        if (!p1.inView) continue;

        const alpha = Math.min(1.0, (CONFIG.MAX_DEPTH - p.z) / 450);

        ctx.strokeStyle = p.isCyan
          ? `rgba(0, 240, 255, ${alpha * 0.8})`
          : `rgba(255, 255, 255, ${alpha * 0.95})`;

        ctx.lineWidth = Math.max(0.9, p.size * p1.scale * 1.4);
        ctx.beginPath();
        ctx.moveTo(pPrev.x, pPrev.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
      ctx.restore();
    }

    /**
     * DRAW PROCEDURAL AI SILICON NPU CHIP
     * Positioned at the focal core where the neural tunnel converges.
     * Features: Ceramic package, gold/cyan contact pins, circuit traces,
     * Silicon die with wafer grid, glowing core tensor unit, and holographic telemetry.
     */
    function drawAiChip(time: number, cx: number, cy: number, breath: number) {
      ctx.save();

      const chipZ = CONFIG.CHIP_DEPTH;
      const proj = project(0, 0, chipZ, cx, cy);
      if (!proj.inView) {
        ctx.restore();
        return;
      }

      // Responsive chip size based on 3D perspective projection
      const baseChipSize = 220;
      const chipSize = baseChipSize * proj.scale;
      const chipX = proj.x;
      const chipY = proj.y;

      // Subtle dynamic 3D micro-tilt responsive to mouse motion
      const tiltX = (mouseX / width) * 12;
      const tiltY = (mouseY / height) * 12;

      ctx.translate(chipX + tiltX, chipY + tiltY);

      // Slow majestic rotation of the processor package
      const chipAngle = Math.sin(time * 0.0004) * 0.04;
      ctx.rotate(chipAngle);

      const halfSize = chipSize / 2;

      // 1. CHIP PINS / RADIATING BUS CONTACTS (Conductive Copper & Gold/Cyan Pins)
      const pinCountPerSide = 14;
      const pinLen = chipSize * 0.16;
      const pinWidth = Math.max(1, chipSize * 0.024);

      ctx.fillStyle = "#00f0ff";
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 8;

      // Draw pins on all 4 sides: Top, Bottom, Left, Right
      for (let side = 0; side < 4; side++) {
        ctx.save();
        ctx.rotate((side * Math.PI) / 2);

        for (let p = 0; p < pinCountPerSide; p++) {
          const offset = -halfSize + (p + 1) * (chipSize / (pinCountPerSide + 1));
          
          // Conductive pin bar
          const pinPulse = Math.sin(time * 0.006 + p * 0.5 + side) * 0.3 + 0.7;
          ctx.fillStyle = p % 3 === 0 ? `rgba(255, 255, 255, ${pinPulse})` : `rgba(0, 240, 255, ${0.8 * pinPulse})`;
          ctx.fillRect(offset - pinWidth / 2, -halfSize - pinLen, pinWidth, pinLen);

          // Circuit trace trailing out from pin into neural tunnel
          if (p % 2 === 0) {
            ctx.strokeStyle = `rgba(0, 102, 255, ${0.4 * breath})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(offset, -halfSize - pinLen);
            ctx.lineTo(offset * 1.5, -halfSize - pinLen * 2.2);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // 2. SILICON PACKAGE SUBSTRATE (Dark obsidian ceramic with cyan beveled border)
      const cornerRadius = Math.max(4, chipSize * 0.06);
      ctx.shadowColor = "#0066ff";
      ctx.shadowBlur = 24 * breath;
      ctx.fillStyle = "#020712";
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.85 * breath})`;
      ctx.lineWidth = Math.max(2, chipSize * 0.02);

      // Draw rounded substrate package
      ctx.beginPath();
      ctx.roundRect(-halfSize, -halfSize, chipSize, chipSize, cornerRadius);
      ctx.fill();
      ctx.stroke();

      // 3. INNER PROCESSOR DIE (Beveled Central Silicon Wafer)
      const dieSize = chipSize * 0.62;
      const halfDie = dieSize / 2;

      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 18;
      ctx.fillStyle = "#000f24";
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.95 * breath})`;
      ctx.lineWidth = Math.max(1.5, dieSize * 0.025);

      ctx.beginPath();
      ctx.roundRect(-halfDie, -halfDie, dieSize, dieSize, cornerRadius * 0.7);
      ctx.fill();
      ctx.stroke();

      // 4. SILICON WAFER CIRCUIT GRID & TENSOR ARCHITECTURE
      const gridCells = 6;
      const cellSize = dieSize / gridCells;
      ctx.strokeStyle = `rgba(0, 102, 255, ${0.35 * breath})`;
      ctx.lineWidth = 0.8;

      ctx.beginPath();
      for (let g = 1; g < gridCells; g++) {
        const pos = -halfDie + g * cellSize;
        // Horizontal wafer bus
        ctx.moveTo(-halfDie + 4, pos);
        ctx.lineTo(halfDie - 4, pos);
        // Vertical wafer bus
        ctx.moveTo(pos, -halfDie + 4);
        ctx.lineTo(pos, halfDie - 4);
      }
      ctx.stroke();

      // 5. HIGH-INTENSITY CENTRAL TENSOR CORE (Glowing NPU Core)
      const coreSize = dieSize * 0.38;
      const halfCore = coreSize / 2;
      const corePulse = Math.sin(time * 0.003) * 0.25 + 0.75;

      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, halfCore * 1.5);
      coreGrad.addColorStop(0, `rgba(255, 255, 255, ${0.98 * corePulse})`);
      coreGrad.addColorStop(0.35, `rgba(0, 240, 255, ${0.85 * corePulse})`);
      coreGrad.addColorStop(0.7, `rgba(0, 102, 255, ${0.4 * corePulse})`);
      coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, halfCore * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Octagonal Central Core Frame
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 * breath})`;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 12;

      ctx.beginPath();
      for (let a = 0; a < 8; a++) {
        const ang = (a / 8) * Math.PI * 2;
        const ox = Math.cos(ang) * halfCore;
        const oy = Math.sin(ang) * halfCore;
        if (a === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
      }
      ctx.closePath();
      ctx.stroke();

      // 6. CHIP TYPOGRAPHY & TELEMETRY
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#00f0ff";
      ctx.font = `bold ${Math.max(10, Math.round(dieSize * 0.17))}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("AI", 0, -coreSize * 0.05);

      ctx.font = `${Math.max(7, Math.round(dieSize * 0.08))}px monospace`;
      ctx.fillStyle = "#00f0ff";
      ctx.fillText("NPU CORE", 0, halfCore + dieSize * 0.12);

      // Top corner telemetry: "B.Tech IT" / "TENSOR"
      ctx.font = `${Math.max(6, Math.round(dieSize * 0.065))}px monospace`;
      ctx.fillStyle = "rgba(0, 240, 255, 0.7)";
      ctx.fillText("128 TFLOPS", 0, -halfDie + dieSize * 0.1);

      ctx.shadowBlur = 0;
      ctx.restore();
    }

    /**
     * DRAW ARTIFICIAL NEURAL NETWORK (ANN) SYNAPSE TUNNEL
     * Features:
     * - Concentric layers along depth axis acting as ANN Dense layers (Input -> Hidden -> Output)
     * - Neurons (Soma) arranged on each ring, pulsating with activation energy
     * - Inter-layer Synaptic Axons connecting adjacent layer nodes
     * - Action Potential Pulses (high-speed glowing signal packets traveling through synapses)
     * - Lateral dendritic interconnects within layers
     */
    function drawAnnTunnel(time: number, cx: number, cy: number, breath: number) {
      ctx.save();

      const numLayers = CONFIG.LAYER_COUNT;
      const layerSpacing = CONFIG.MAX_DEPTH / numLayers;
      const baseRadius = 390;
      const nodesCount = CONFIG.NODES_PER_LAYER;

      const layers: NeuralLayer[] = [];

      // Generate 3D layers and project nodes
      for (let l = 0; l < numLayers; l++) {
        let z = (l * layerSpacing - (timeOffset % layerSpacing) + CONFIG.MAX_DEPTH) % CONFIG.MAX_DEPTH;
        if (z < 35) z = 35;

        const rot = time * 0.0006 + z * CONFIG.TWIST_SPEED;
        const layerRadius = baseRadius * (1 + Math.sin(time * 0.0012 + z * 0.0035) * 0.07);

        const nodes: ProjectedNode[] = [];
        for (let n = 0; n < nodesCount; n++) {
          const angle = (n / nodesCount) * Math.PI * 2 + rot;
          const px = Math.cos(angle) * layerRadius;
          const py = Math.sin(angle) * layerRadius;
          const proj = project(px, py, z, cx, cy);

          // Activation wave traveling through the network
          const activation = Math.sin(time * 0.004 + l * 0.4 + n * 0.8) * 0.4 + 0.6;

          nodes.push({
            x: proj.x,
            y: proj.y,
            scale: proj.scale,
            inView: proj.inView,
            activation,
          });
        }

        layers.push({
          z,
          nodes,
          depthRatio: 1 - z / CONFIG.MAX_DEPTH,
          layerIdx: l,
          radius: layerRadius,
        });
      }

      // Sort layers from back to front for proper depth rendering
      layers.sort((a, b) => b.z - a.z);

      // 1. SYNAPTIC AXON CONNECTIONS BETWEEN ADJACENT LAYERS (Feedforward Network)
      for (let i = 0; i < layers.length - 1; i++) {
        const curLayer = layers[i];
        const nextLayer = layers[i + 1];
        const avgDepth = (curLayer.depthRatio + nextLayer.depthRatio) / 2;

        for (let n = 0; n < nodesCount; n++) {
          const v1 = curLayer.nodes[n];
          if (!v1.inView) continue;

          // Connect to corresponding node and adjacent neighbors in next layer
          const targetIndices = [
            n,
            (n + 1) % nodesCount,
            (n - 1 + nodesCount) % nodesCount,
          ];

          for (let t = 0; t < targetIndices.length; t++) {
            const v2 = nextLayer.nodes[targetIndices[t]];
            if (!v2.inView) continue;

            const isDirectAxon = t === 0;
            const axonAlpha = isDirectAxon ? avgDepth * 0.42 * breath : avgDepth * 0.18 * breath;

            ctx.strokeStyle = isDirectAxon
              ? `rgba(0, 240, 255, ${axonAlpha})`
              : `rgba(0, 102, 255, ${axonAlpha})`;
            ctx.lineWidth = isDirectAxon ? Math.max(1, 2.2 * v1.scale) : Math.max(0.6, 1.2 * v1.scale);

            ctx.beginPath();
            ctx.moveTo(v1.x, v1.y);
            ctx.lineTo(v2.x, v2.y);
            ctx.stroke();
          }
        }
      }

      // 2. ACTION POTENTIAL FIRING SIGNALS (Pulses traveling forward through synapses)
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 10;
      for (let p = 0; p < pulses.length; p++) {
        const pulse = pulses[p];
        if (!prefersReducedMotion) {
          pulse.progress += pulse.speed;
          if (pulse.progress >= 1) {
            pulse.progress = 0;
            pulse.fromLayer = Math.floor(Math.random() * (layers.length - 1));
            pulse.fromNode = Math.floor(Math.random() * nodesCount);
            pulse.toLayer = pulse.fromLayer + 1;
            pulse.toNode = (pulse.fromNode + Math.floor(Math.random() * 3) - 1 + nodesCount) % nodesCount;
          }
        }

        if (pulse.fromLayer < layers.length && pulse.toLayer < layers.length) {
          const layer1 = layers[pulse.fromLayer];
          const layer2 = layers[pulse.toLayer];
          const n1 = layer1.nodes[pulse.fromNode];
          const n2 = layer2.nodes[pulse.toNode];

          if (n1.inView && n2.inView) {
            const px = n1.x + (n2.x - n1.x) * pulse.progress;
            const py = n1.y + (n2.y - n1.y) * pulse.progress;
            const pScale = n1.scale + (n2.scale - n1.scale) * pulse.progress;

            const pulseAlpha = Math.min(1.0, layer1.depthRatio * 1.5 * pulse.brightness);
            ctx.fillStyle = `rgba(255, 255, 255, ${pulseAlpha})`;
            ctx.beginPath();
            ctx.arc(px, py, Math.max(2, 5 * pScale), 0, Math.PI * 2);
            ctx.fill();

            // Cyan halo
            ctx.fillStyle = `rgba(0, 240, 255, ${pulseAlpha * 0.8})`;
            ctx.beginPath();
            ctx.arc(px, py, Math.max(4, 9 * pScale), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.shadowBlur = 0;

      // 3. CONCENTRIC NEURAL RINGS & SOMA (Neuron Cell Bodies)
      for (let k = 0; k < layers.length; k++) {
        const layer = layers[k];
        const d = layer.depthRatio;
        const nodes = layer.nodes;

        // Draw lateral dendritic ring connecting neurons in the same layer
        let strokeColor: string;
        let glowColor: string;
        let lineWidth: number;
        let glowBlur: number;

        if (d > 0.75) {
          strokeColor = `rgba(255, 255, 255, ${0.85 * breath})`;
          glowColor = "#00f0ff";
          lineWidth = Math.max(2, 4.2 * nodes[0].scale);
          glowBlur = 20;
        } else if (d > 0.4) {
          strokeColor = `rgba(0, 240, 255, ${d * 1.05 * breath})`;
          glowColor = "#0066ff";
          lineWidth = Math.max(1.3, 2.8 * nodes[0].scale);
          glowBlur = 12;
        } else {
          strokeColor = `rgba(0, 102, 255, ${d * 1.3 * breath})`;
          glowColor = "#0033aa";
          lineWidth = Math.max(0.7, 1.6 * nodes[0].scale);
          glowBlur = 5;
        }

        ctx.shadowColor = glowColor;
        ctx.shadowBlur = glowBlur;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;

        // Closed polygon connecting neurons in this layer
        ctx.beginPath();
        for (let n = 0; n < nodesCount; n++) {
          const v = nodes[n];
          if (n === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        }
        ctx.closePath();
        ctx.stroke();

        // 4. DRAW SOMA (Individual Glowing Neuron Nodes)
        for (let n = 0; n < nodesCount; n++) {
          const v = nodes[n];
          if (!v.inView) continue;

          const somaRadius = Math.max(2.2, 5.5 * v.scale * v.activation);

          // Outer halo
          ctx.fillStyle = d > 0.6 ? `rgba(0, 240, 255, ${0.7 * v.activation})` : `rgba(0, 102, 255, ${0.5 * v.activation})`;
          ctx.beginPath();
          ctx.arc(v.x, v.y, somaRadius * 1.8, 0, Math.PI * 2);
          ctx.fill();

          // Bright neuron core
          ctx.fillStyle = d > 0.6 && v.activation > 0.75 ? "#ffffff" : "#00f0ff";
          ctx.beginPath();
          ctx.arc(v.x, v.y, somaRadius, 0, Math.PI * 2);
          ctx.fill();

          // Dendrite crosshair on close neurons
          if (d > 0.7) {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(v.x - somaRadius * 2, v.y);
            ctx.lineTo(v.x + somaRadius * 2, v.y);
            ctx.moveTo(v.x, v.y - somaRadius * 2);
            ctx.lineTo(v.x, v.y + somaRadius * 2);
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
    }

    /**
     * DRAW CORNER HUD TELEMETRY & NEURAL MATRIX STATUS
     */
    function drawHudTelemetry(cx: number, cy: number, breath: number) {
      ctx.save();
      ctx.font = "9px monospace";
      ctx.fillStyle = `rgba(0, 240, 255, ${0.45 * breath})`;
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 4;

      // Bottom-Left Telemetry
      ctx.textAlign = "left";
      ctx.fillText("NPU ARCH: TENSOR_CORE_X86 // SYNAPSE_LATENCY: 0.12ms", 24, height - 36);
      ctx.fillText("FEEDFORWARD: ACTIVE // ACTIVATION: GELU // WEIGHTS: 175B", 24, height - 22);

      // Top-Right Telemetry
      ctx.textAlign = "right";
      ctx.fillText("NETWORK LAYER: DEEP_ANN_V4 // LOSS: 0.0018", width - 24, 32);
      ctx.fillText("QUANTUM CORE: STABLE // PARALLAX 3D", width - 24, 46);

      ctx.shadowBlur = 0;
      ctx.restore();
    }

    function drawVignette(cx: number, cy: number) {
      ctx.save();
      const outerGrad = ctx.createRadialGradient(cx, cy, Math.min(width, height) * 0.42, cx, cy, Math.max(width, height) * 0.8);
      outerGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      outerGrad.addColorStop(0.65, "rgba(0, 0, 0, 0.45)");
      outerGrad.addColorStop(1, "rgba(0, 0, 0, 0.96)");

      ctx.fillStyle = outerGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    function drawFrame(time: number) {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const cx = width / 2 + mouseX * CONFIG.PARALLAX_FACTOR * 7;
      const cy = height / 2 + mouseY * CONFIG.PARALLAX_FACTOR * 7;

      const breath = Math.sin(time * 0.0015) * 0.18 + 0.88;

      if (!prefersReducedMotion) {
        timeOffset += CONFIG.SPEED;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Deep OLED Space Background & Center Glow
      drawDeepSpaceBackground(cx, cy, breath);

      // 2. High-speed Ion / Axon Warp Sparks
      drawNeuralParticles(cx, cy);

      // 3. Central Silicon AI Chip / NPU Core (Positioned at depth vortex)
      drawAiChip(time, cx, cy, breath);

      // 4. Artificial Neural Network Synapse Tunnel (Concentric neuron layers & firing synapses)
      drawAnnTunnel(time, cx, cy, breath);

      // 5. Corner HUD Data & Telemetry
      drawHudTelemetry(cx, cy, breath);

      // 6. OLED Vignette Edge Masking
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
