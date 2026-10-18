import { useEffect, useRef } from "react";

/**
 * AI & ROBOTICS SCI-FI 4D BACKGROUND
 * 
 * Features:
 * - Central Silicon AI Microchip on circuit board with copper traces, via rings, SMD parts,
 *   outward data pulses, conductive pins, glowing compute die cells, and "AI" core.
 * - Procedural Neural Network with glowing soma, curved dendrites, dynamic synaptic connections,
 *   signal pulse packets, and cursor-reactive firing.
 * - DNA Double Helix with rungs, struts, dual backbone strands, and travelling photon signals.
 * - Interactive 3D Camera with pointer tracking, drag-to-orbit, wheel-to-zoom, and smooth inertia.
 * - Perspective grid floor, circuit traces, tick-mark rulers, and real-time monospace telemetry readouts.
 * - Sci-fi radar HUD, system status, activity bars, rotating mechanical gears.
 * - Cosmic comets, particle bokeh, dust, energy expansion rings, and interactive click ripple surges.
 * - 60 FPS Canvas 2D math, devicePixelRatio capped at 2, prefers-reduced-motion support.
 */

export default function AiRoboticsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const rawCtx = cv.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    // ===================== TUNABLES =====================
    const C = {
      RED: [60, 150, 255] as [number, number, number],
      WHITE: [255, 255, 255] as [number, number, number],
      SPEED: 1,
      NET_NODES: 70,
      DUST: 110,
      BOKEH: 22,
      CYCLE: 30,
      DOF: 0.45,
      DPR_MAX: 2,
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const MONO = 'ui-monospace, Menlo, Consolas, monospace';
    const AC = C.RED.join(",");
    const SHOW_ROBOT = false; // Set to true to display robot head & torso wireframe

    let W = 0;
    let H = 0;
    let dpr = 1;
    let F = 0;
    let cx = 0;
    let cy = 0;
    let small = false;
    let bgGrad: CanvasGradient;
    let vigGrad: CanvasGradient;

    let D = 9;
    let Dt = 9;
    const ptr = { x: 0, y: 0, tx: 0, ty: 0, active: false };
    let cY = 1;
    let sY = 0;
    let cP = 1;
    let sP = 0;
    let t = 0;
    let I = 0;
    let scanY = 0;
    let animationId: number;

    // ===================== GLOW SPRITES (depth-of-field levels) =====================
    const LV = 6;
    const SP: { r: HTMLCanvasElement[]; w: HTMLCanvasElement[] } = { r: [], w: [] };

    function mkSprite(col: [number, number, number], lv: number): HTMLCanvasElement {
      const s = 64;
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const g = c.getContext("2d");
      if (!g) return c;
      const r = s / 2;
      const k = col.join(",");
      const core = 0.14 + lv * 0.11;
      const A = 1 / (1 + lv * 0.5);
      const gr = g.createRadialGradient(r, r, 0, r, r, r);
      gr.addColorStop(0, `rgba(${k},${A})`);
      gr.addColorStop(core, `rgba(${k},${A * 0.85})`);
      gr.addColorStop(Math.min(core + 0.25, 0.99), `rgba(${k},${A * 0.12})`);
      gr.addColorStop(1, `rgba(${k},0)`);
      g.fillStyle = gr;
      g.fillRect(0, 0, s, s);
      return c;
    }

    for (let i = 0; i < LV; i++) {
      SP.r.push(mkSprite(C.RED, i));
      SP.w.push(mkSprite(C.WHITE, i));
    }

    const lvOf = (z: number) => Math.min(LV - 1, Math.floor(Math.abs(z - D) * C.DOF));

    function dot(x: number, y: number, rad: number, lv: number, col: "r" | "w", a: number) {
      if (a <= 0.003 || rad < 0.3) return;
      ctx.globalAlpha = Math.min(a, 1);
      ctx.drawImage(SP[col][lv], x - rad, y - rad, rad * 2, rad * 2);
    }

    // ===================== CAMERA 3D PROJECTION =====================
    interface ProjectedPoint {
      x: number;
      y: number;
      z: number;
      k: number;
    }

    function pr(w: number[], o: ProjectedPoint) {
      const x = w[0];
      const y = w[1];
      const z = w[2];
      const x1 = x * cY + z * sY;
      const z1 = -x * sY + z * cY;
      const y1 = y * cP - z1 * sP;
      const z2 = y * sP + z1 * cP;
      const zc = Math.max(0.6, D - z2);
      const k = F / zc;
      o.x = cx + x1 * k;
      o.y = cy - y1 * k;
      o.z = zc;
      o.k = k;
    }

    // ===================== MESHES =====================
    interface MeshData {
      v: number[][];
      e: number[][];
      w: number[][];
      q: ProjectedPoint[];
      p: number[];
      r: number[];
      rs: number[];
      s: number;
      ns: number;
      eyeL?: number;
      scan?: boolean;
      base?: number[];
      k?: number;
    }

    function mesh(v: number[][], e: number[][], o?: Partial<MeshData>): MeshData {
      return Object.assign(
        {
          v,
          e,
          w: v.map(() => [0, 0, 0]),
          q: v.map(() => ({ x: 0, y: 0, z: 0, k: 0 })),
          p: [0, 0, 0],
          r: [0, 0, 0],
          rs: [0, 0, 0],
          s: 1,
          ns: 0.045,
        },
        o
      );
    }

    function xf(m: MeshData) {
      const [a, b, c] = m.r;
      const sa = Math.sin(a);
      const ca = Math.cos(a);
      const sb = Math.sin(b);
      const cb = Math.cos(b);
      const sc = Math.sin(c);
      const cc = Math.cos(c);
      for (let i = 0; i < m.v.length; i++) {
        let [x, y, z] = m.v[i];
        x *= m.s;
        y *= m.s;
        z *= m.s;
        const x1 = x * cb + z * sb;
        const z1 = -x * sb + z * cb;
        const y1 = y * ca - z1 * sa;
        const z2 = y * sa + z1 * ca;
        const w = m.w[i];
        w[0] = x1 * cc - y1 * sc + m.p[0];
        w[1] = x1 * sc + y1 * cc + m.p[1];
        w[2] = z2 + m.p[2];
      }
    }

    const spow = (c: number, e: number) => (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e);

    const head: MeshData = (() => {
      const v: number[][] = [];
      const e: number[][] = [];
      const R = 9;
      const Q = 16;
      const E = 0.55;
      for (let i = 0; i < R; i++) {
        const u = -1.35 + i * (2.7 / (R - 1));
        for (let j = 0; j < Q; j++) {
          const a = (j / Q) * 6.2832;
          const n = i * Q + j;
          v.push([
            spow(Math.cos(u), E) * spow(Math.cos(a), E),
            1.25 * spow(Math.sin(u), E),
            0.95 * spow(Math.cos(u), E) * spow(Math.sin(a), E),
          ]);
          e.push([n, i * Q + ((j + 1) % Q)]);
          if (i < R - 1) e.push([n, n + Q]);
        }
      }
      const eyeL = v.length;
      v.push([-0.4, 0.15, 0.97]);
      v.push([0.4, 0.15, 0.97]);
      const m0 = v.length;
      for (let k = 0; k < 5; k++) {
        v.push([-0.4 + k * 0.2, -0.5, 0.93]);
        if (k) e.push([m0 + k - 1, m0 + k]);
      }
      return mesh(v, e, { eyeL, ns: 0.042, scan: true });
    })();

    const torso: MeshData = (() => {
      const v: number[][] = [];
      const e: number[][] = [];
      const S = 9;
      for (const y of [-1.5, -2.0]) {
        for (let k = 0; k < 8; k++) {
          const a = (k / 8) * 6.2832;
          v.push([0.5 * Math.cos(a), y, 0.5 * Math.sin(a)]);
        }
      }
      for (let k = 0; k < 8; k++) {
        e.push([k, (k + 1) % 8]);
        e.push([8 + k, 8 + ((k + 1) % 8)]);
        e.push([k, 8 + k]);
      }
      const s0 = v.length;
      for (let k = 0; k < S; k++) {
        const x = -2.4 + k * 0.6;
        v.push([x, -2.7 - x * x * 0.06, 0]);
        if (k) e.push([s0 + k - 1, s0 + k]);
      }
      for (let k = 0; k < 8; k++) {
        e.push([8 + k, s0 + Math.round(((v[8 + k][0] / 0.5 + 1) / 2) * (S - 1))]);
      }
      return mesh(v, e, { ns: 0.04 });
    })();

    function limb(n: number, s: number): MeshData {
      const v: number[][] = [];
      const e: number[][] = [];
      const ctr: number[] = [];
      for (let i = 0; i < n; i++) {
        const cxp = i * 0.55;
        const cyp = Math.sin(i * 0.9) * 0.25;
        const b = v.length;
        v.push(
          [cxp + s, cyp, 0],
          [cxp - s, cyp, 0],
          [cxp, cyp + s, 0],
          [cxp, cyp - s, 0],
          [cxp, cyp, s],
          [cxp, cyp, -s]
        );
        [
          [0, 2], [0, 3], [0, 4], [0, 5],
          [1, 2], [1, 3], [1, 4], [1, 5],
          [2, 4], [4, 3], [3, 5], [5, 2],
        ].forEach((p) => e.push([b + p[0], b + p[1]]));
        ctr.push(b);
        if (i) e.push([ctr[i - 1], ctr[i]]);
      }
      return mesh(v, e, { ns: 0.05 });
    }

    const limbs: MeshData[] = [
      [-4.2, 0.8, 1.5],
      [4.5, -0.6, 2.4],
      [-3.2, -1.8, -2.5],
      [3.8, 1.8, -3.2],
    ].map((b, i) => {
      const m = limb(5, 0.17);
      m.base = b;
      m.k = i;
      m.rs = [rnd(-0.3, 0.3), rnd(0.15, 0.35) * (i % 2 ? 1 : -1), rnd(-0.2, 0.2)];
      return m;
    });

    // ===================== NEURAL NETWORK =====================
    interface NetNode {
      p: number[];
      w: number[];
      q: ProjectedPoint;
      b: number;
      f: number;
    }

    interface NetEdge {
      a: number;
      b: number;
      h?: number;
    }

    interface NetPulse {
      e: NetEdge;
      t: number;
      s: number;
    }

    let nodes: NetNode[] = [];
    let edges: NetEdge[] = [];
    let pulses: NetPulse[] = [];
    let rewireT = 0;
    let netA = 0;

    function nearest(i: number, k: number): number[] {
      const a = nodes[i].p;
      return nodes
        .map((n, j) => ({
          j,
          d: j === i ? 1e9 : (n.p[0] - a[0]) ** 2 + (n.p[1] - a[1]) ** 2 + (n.p[2] - a[2]) ** 2,
        }))
        .sort((x, y) => x.d - y.d)
        .slice(0, k)
        .map((o) => o.j);
    }

    function initNet(n: number) {
      nodes = [];
      edges = [];
      pulses = [];
      for (let i = 0; i < n; i++) {
        const r = rnd(3.2, 7.5);
        const a = rnd(0, 6.283);
        const y = rnd(-4.5, 4.5);
        nodes.push({
          p: [Math.cos(a) * r, y, Math.sin(a) * r * 0.8],
          w: [0, 0, 0],
          q: { x: 0, y: 0, z: 0, k: 0 },
          b: 0,
          f: rnd(0, 6.28),
        });
      }
      nodes.forEach((_, i) => nearest(i, 2).forEach((j) => edges.push({ a: i, b: j })));
      if (SHOW_ROBOT) {
        for (let k = 0; k < 7; k++) {
          edges.push({ a: (Math.random() * n) | 0, b: (Math.random() * 144) | 0, h: 1 });
        }
      }
    }

    // ===================== BACKGROUND DATA =====================
    interface BokehItem {
      x: number;
      y: number;
      r: number;
      a: number;
      f: number;
      v: number;
    }

    interface DustItem {
      x: number;
      y: number;
      r: number;
      a: number;
      f: number;
      v: number;
      ph: number;
    }

    interface GearItem {
      x: number;
      y: number;
      img: HTMLCanvasElement;
      rot: number;
      sp: number;
    }

    let bokeh: BokehItem[] = [];
    let dust: DustItem[] = [];
    let gears: GearItem[] = [];
    let traces: number[][][] = [];

    const LINES = [
      "model.train()",
      "loss: 0.0231",
      "tokens: 4096",
      "epoch 42/100",
      "grad_norm: 0.87",
      "lr: 3e-4",
      "actuator[7]: ok",
      "servo.sync()",
      "attention: 12 heads",
      "infer: 18 ms",
    ];

    const texts = LINES.map((s) => ({
      s,
      x: rnd(0.04, 0.9),
      y: rnd(0.1, 0.9),
      v: rnd(0.002, 0.006),
      z: rnd(0.4, 1),
    }));

    function mkGear(r: number, teeth: number, blur: number): HTMLCanvasElement {
      const pad = r * 0.6 + blur * 3;
      const s = Math.ceil(2 * (r + pad));
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const g = c.getContext("2d");
      if (!g) return c;
      try {
        g.filter = `blur(${blur}px)`;
      } catch {
        // filter fallback
      }
      g.translate(s / 2, s / 2);
      g.strokeStyle = "rgb(60,150,255)";
      g.lineWidth = r * 0.1;
      g.beginPath();
      for (let i = 0; i <= teeth * 4; i++) {
        const a = (i / (teeth * 4)) * 6.2832;
        const rr = i % 4 < 2 ? r : r * 0.84;
        g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
      }
      g.stroke();
      g.beginPath();
      g.arc(0, 0, r * 0.35, 0, 6.2832);
      g.stroke();
      return c;
    }

    function initBg() {
      bokeh = Array.from({ length: small ? 12 : C.BOKEH }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: rnd(0.03, 0.12),
        a: rnd(0.05, 0.17),
        f: rnd(0.2, 1),
        v: rnd(0.0004, 0.0015),
      }));
      dust = Array.from({ length: small ? C.DUST / 2 : C.DUST }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: rnd(0.4, 1.6),
        a: rnd(0.2, 0.7),
        f: rnd(0.1, 1),
        v: rnd(0.0006, 0.003),
        ph: rnd(0, 6.28),
      }));
      traces = Array.from({ length: 7 }, () => {
        let x = rnd(0.05, 0.95);
        let y = rnd(0.1, 0.9);
        const pts: number[][] = [[x, y]];
        for (let i = 0; i < 4; i++) {
          if (i % 2) y += rnd(-0.12, 0.12);
          else x += rnd(-0.14, 0.14);
          pts.push([x, y]);
        }
        return pts;
      });
    }

    // ===================== LAYOUT =====================
    function layout() {
      if (!cv) return;
      dpr = Math.min(window.devicePixelRatio || 1, C.DPR_MAX);
      W = cv.width = Math.round(window.innerWidth * dpr);
      H = cv.height = Math.round(window.innerHeight * dpr);
      small = window.innerWidth < 768;
      F = Math.min(W, H * 0.6) * 1.6;
      cx = W / 2;
      cy = H * 0.46;

      bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(W, H) * 0.6);
      bgGrad.addColorStop(0, "#0f1a2b");
      bgGrad.addColorStop(0.55, "#070b14");
      bgGrad.addColorStop(1, "#05060a");

      vigGrad = ctx.createRadialGradient(cx, cy, Math.min(W, H) * 0.35, cx, cy, Math.hypot(W, H) * 0.62);
      vigGrad.addColorStop(0, "rgba(0,0,0,0)");
      vigGrad.addColorStop(1, "rgba(0,0,0,0.78)");

      const m = Math.min(W, H);
      gears = [
        [0.04, 0.9, 0.17, 11, 9],
        [0.97, 0.1, 0.12, 9, 12],
        [0.93, 0.74, 0.08, 8, 7],
      ].map((g) => ({
        x: g[0],
        y: g[1],
        img: mkGear(m * g[2], g[3], g[4] * dpr),
        rot: rnd(0, 6),
        sp: rnd(0.04, 0.09) * (g[0] > 0.5 ? -1 : 1),
      }));
    }

    // ===================== NEURON PATH =====================
    function neuronPath(x: number, y: number, rad: number, seed: number, full: boolean) {
      const nb = full ? 4 : 3;
      const L = rad * (full ? 1.4 : 1.15);
      for (let b = 0; b < nb; b++) {
        const ang = seed * 6.283 + (b * 6.283) / nb + Math.sin(t * 0.8 + seed * 9 + b) * 0.25;
        const len = L * (0.65 + 0.35 * ((seed * 13.7 + b * 0.37) % 1));
        const c = Math.cos(ang);
        const s = Math.sin(ang);
        const bend = Math.sin(seed * 20 + b * 2) * 0.3 * len;
        const ex = x + c * len;
        const ey = y + s * len;
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + c * len * 0.5 - s * bend, y + s * len * 0.5 + c * bend, ex, ey);
        if (full && b % 2 === 0) {
          const f = len * 0.35;
          ctx.moveTo(ex, ey);
          ctx.lineTo(ex + Math.cos(ang + 0.5) * f, ey + Math.sin(ang + 0.5) * f);
        }
      }
    }

    function drawMesh(m: MeshData, aMul: number) {
      xf(m);
      let zs = 0;
      const n = m.v.length;
      for (let i = 0; i < n; i++) {
        pr(m.w[i], m.q[i]);
        zs += m.q[i].z;
      }
      const lvm = lvOf(zs / n);
      ctx.globalAlpha = 1;
      ctx.lineWidth = dpr * (0.8 + lvm * 0.5);
      ctx.strokeStyle = `rgba(235,235,240,${(0.3 * aMul / (1 + lvm * 0.5)).toFixed(3)})`;
      ctx.beginPath();
      for (const [a, b] of m.e) {
        ctx.moveTo(m.q[a].x, m.q[a].y);
        ctx.lineTo(m.q[b].x, m.q[b].y);
      }
      ctx.stroke();

      if (m.scan || aMul > 0.9) {
        ctx.strokeStyle = `rgba(${AC},${(0.6 * aMul / (1 + lvm * 0.4)).toFixed(3)})`;
        ctx.lineWidth = dpr * (0.8 + lvm * 0.35);
        ctx.beginPath();
        for (let i = 0; i < n; i += 2) {
          const q = m.q[i];
          neuronPath(q.x, q.y, m.ns * q.k * 3.2, (i * 0.137) % 1, false);
        }
        ctx.stroke();
      }

      for (let i = 0; i < n; i++) {
        const q = m.q[i];
        const lv = lvOf(q.z);
        const rad = m.ns * q.k * 3.2;
        const a = (0.7 + 0.3 * Math.sin(t * 3 + i)) * aMul / (1 + lv * 0.3);
        dot(q.x, q.y, rad * 0.55, lv, i % 3 === 0 ? "w" : "r", a * (0.8 + 0.4 * I));
        if (m.scan && Math.abs(m.w[i][1] - scanY) < 0.22) dot(q.x, q.y, rad, lv, "w", 0.9);
      }
    }

    interface RippleItem {
      x: number;
      y: number;
      t: number;
    }
    let ripples: RippleItem[] = [];

    const mouse = { x: -1e4, y: -1e4, down: false, lx: 0, ly: 0 };
    const trail: { x: number; y: number; a: number }[] = [];
    let orbX = 0;
    let orbY = 0;
    let surge = 0;

    function drawNet(dt: number, now: number) {
      netA += dt * 0.05;
      const ca = Math.cos(netA);
      const sa = Math.sin(netA);
      const maxDist = 200 * dpr;
      const maxDistSq = maxDist * maxDist;
      nodes.forEach((n) => {
        n.w[0] = n.p[0] * ca + n.p[2] * sa;
        n.w[1] = n.p[1] + Math.sin(t * 0.4 + n.f) * 0.15;
        n.w[2] = -n.p[0] * sa + n.p[2] * ca;
        pr(n.w, n.q);
        n.b *= 0.94;
        const dx = mouse.x - n.q.x;
        const dy = mouse.y - n.q.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < maxDistSq) {
          const d = Math.sqrt(distSq) / maxDist;
          n.q.x += dx * (1 - d) * 0.12;
          n.q.y += dy * (1 - d) * 0.12;
        }
      });

      rewireT -= dt;
      if (rewireT < 0) {
        rewireT = 0.5 - 0.3 * I;
        const e = edges[(Math.random() * (edges.length - (SHOW_ROBOT ? 7 : 0))) | 0];
        const a = (Math.random() * nodes.length) | 0;
        e.a = a;
        e.b = nearest(a, 4)[(Math.random() * 4) | 0];
      }

      if (pulses.length < 70 && Math.random() < dt * (3 + 14 * I)) {
        pulses.push({ e: edges[(Math.random() * edges.length) | 0], t: 0, s: rnd(0.4, 0.9) });
      }

      ctx.lineWidth = dpr;
      for (const e of edges) {
        const A = nodes[e.a].q;
        const B = e.h ? head.q[e.b] : nodes[e.b].q;
        const lv = lvOf((A.z + B.z) / 2);
        ctx.strokeStyle = e.h
          ? `rgba(60,150,255,${(0.32 + 0.2 * I).toFixed(2)})`
          : `rgba(190,190,200,${((0.14 + 0.1 * I) / (1 + lv * 0.4)).toFixed(3)})`;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const e = p.e;
        const A = nodes[e.a].q;
        const B = e.h ? head.q[e.b] : nodes[e.b].q;
        p.t += dt * p.s * (0.6 + 1.6 * I);
        if (p.t >= 1) {
          nodes[e.a].b = 1;
          pulses.splice(i, 1);
          continue;
        }
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        const z = A.z + (B.z - A.z) * p.t;
        const lv = lvOf(z);
        dot(x, y, (0.08 * F / z) * 3, lv, "w", 0.9);
      }

      const pMax = 160 * dpr;
      const pMaxSq = pMax * pMax;

      for (const n of nodes) {
        const q = n.q;
        const lv = lvOf(q.z);
        let b = n.b;
        const pdx = q.x - mouse.x;
        const pdy = q.y - mouse.y;
        const pdSq = pdx * pdx + pdy * pdy;
        if (pdSq < pMaxSq) {
          const pd = Math.sqrt(pdSq) / pMax;
          b += (1 - pd) * 0.9;
          if (Math.random() < 0.03) n.b = 1;
        }
        for (const r of ripples) {
          const d = Math.hypot(q.x - r.x, q.y - r.y);
          const rr = (now - r.t) * 0.9 * dpr;
          b += Math.max(0, 1 - Math.abs(d - rr) / (70 * dpr)) * Math.max(0, 1 - (now - r.t) / 2200);
        }
        const fl = 0.55 + 0.45 * Math.sin(t * 2 + n.f);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = `rgba(${AC},${(fl * (0.65 + 0.35 * I) / (1 + lv * 0.4)).toFixed(3)})`;
        ctx.lineWidth = dpr * (0.8 + lv * 0.5);
        ctx.beginPath();
        neuronPath(q.x, q.y, 0.1 * q.k * 3.2, n.f % 1, true);
        ctx.stroke();
        dot(q.x, q.y, 0.06 * q.k * 3.2, lv, "r", fl * (0.8 + 0.5 * I) / (1 + lv * 0.3));
        dot(q.x, q.y, 0.025 * q.k * 3.2, lv, "w", 0.6 * fl);
        if (b > 0.05) dot(q.x, q.y, (0.1 + b * 0.1) * q.k * 3.2, lv, "w", Math.min(b, 1));
      }
    }

    // ===================== BACKGROUND LAYERS =====================
    function drawFar(px: number, py: number) {
      for (const b of bokeh) {
        b.y -= b.v;
        if (b.y < -0.15) b.y = 1.15;
        dot(b.x * W + px * b.f * 40 * dpr, b.y * H + py * b.f * 30 * dpr, b.r * Math.min(W, H), 5, "r", b.a * (0.7 + 0.6 * I));
      }
      for (const d of dust) {
        d.y -= d.v;
        if (d.y < 0) d.y = 1;
        dot(d.x * W + px * d.f * 30 * dpr, d.y * H, d.r * dpr * 3, 0, "w", d.a * (0.6 + 0.4 * Math.sin(t * 2 + d.ph)));
      }
    }

    function drawMid(px: number, py: number) {
      ctx.globalAlpha = 1;
      ctx.lineWidth = dpr;
      // Perspective grid floor
      const hy = cy + H * 0.2 + py * 10 * dpr;
      const vx = W / 2 - px * W * 0.04;
      for (let k = -12; k <= 12; k++) {
        ctx.strokeStyle = "rgba(255,255,255,0.07)";
        ctx.beginPath();
        ctx.moveTo(vx, hy);
        ctx.lineTo(vx + k * W * 0.16, H);
        ctx.stroke();
      }
      for (let j = 0; j < 15; j++) {
        const f = (j + ((t * 0.35) % 1)) / 15;
        const y = hy + (H - hy) * Math.pow(f, 2.2);
        ctx.strokeStyle = `rgba(255,255,255,${(0.04 + 0.12 * f).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Circuit traces with travelling pulse
      traces.forEach((tr, i) => {
        ctx.strokeStyle = "rgba(255,255,255,0.09)";
        ctx.beginPath();
        tr.forEach((p, k) => {
          const x = p[0] * W + px * 18 * dpr;
          const y = p[1] * H;
          if (k) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        });
        ctx.stroke();
        const e = tr[tr.length - 1];
        dot(e[0] * W + px * 18 * dpr, e[1] * H, 7 * dpr, 1, "r", 0.5 + 0.3 * Math.sin(t * 2 + i));
        const u = ((t * 0.25 + i * 0.31) % 1) * (tr.length - 1);
        const s = Math.floor(u);
        const f = u - s;
        const a = tr[s];
        const b = tr[s + 1];
        dot((a[0] + (b[0] - a[0]) * f) * W + px * 18 * dpr, (a[1] + (b[1] - a[1]) * f) * H, 6 * dpr, 1, "w", 0.7);
      });

      // Ruler ticks along left and bottom edges
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.beginPath();
      const off = (t * 8 * dpr) % (12 * dpr);
      for (let y = -off; y < H; y += 12 * dpr) {
        const long = Math.round((y + off) / (12 * dpr)) % 5 === 0;
        ctx.moveTo(0, y);
        ctx.lineTo((long ? 14 : 7) * dpr, y);
      }
      for (let x = 0; x < W; x += 12 * dpr) {
        const long = Math.round(x / (12 * dpr)) % 5 === 0;
        ctx.moveTo(x, H);
        ctx.lineTo(x, H - (long ? 14 : 7) * dpr);
      }
      ctx.stroke();

      // Tiny monospace telemetry readouts
      ctx.save();
      ctx.font = `${Math.round(10 * dpr)}px ${MONO}`;
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      const loss = (0.0231 + 0.01 * Math.sin(t * 0.7) * (1 - I * 0.6)).toFixed(4);
      const tok = Math.floor(4096 * (0.5 + 0.5 * I));
      texts.forEach((o) => {
        o.y -= o.v * 0.1;
        if (o.y < 0.05) o.y = 0.95;
        const s = o.s.startsWith("loss") ? "loss: " + loss : o.s.startsWith("tokens") ? "tokens: " + tok : o.s;
        ctx.globalAlpha = 0.5 * o.z + 0.3 * I;
        ctx.fillText(s, o.x * W + px * 25 * o.z * dpr, o.y * H);
      });
      ctx.restore();
    }

    function drawGears(px: number, py: number) {
      gears.forEach((g) => {
        g.rot += g.sp * 0.016 * C.SPEED;
        ctx.save();
        ctx.translate(g.x * W + px * 50 * dpr, g.y * H + py * 40 * dpr);
        ctx.rotate(g.rot);
        ctx.globalAlpha = 0.38 + 0.25 * I;
        ctx.drawImage(g.img, -g.img.width / 2, -g.img.height / 2);
        ctx.restore();
      });
    }

    function drawHud() {
      const m = Math.max(14 * dpr, W * 0.03);
      const L = 22 * dpr;
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "rgba(60,150,255,0.75)";
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      [
        [m, m, 1, 1],
        [W - m, m, -1, 1],
        [m, H - m, 1, -1],
        [W - m, H - m, -1, -1],
      ].forEach(([x, y, sx, sy]) => {
        ctx.moveTo(x + L * sx, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + L * sy);
      });
      ctx.stroke();

      const rx = W - m - 56 * dpr;
      const ry = m + 70 * dpr;
      const rr = 40 * dpr;
      ctx.lineWidth = dpr;
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.beginPath();
      ctx.arc(rx, ry, rr, 0, 6.283);
      ctx.stroke();
      ctx.setLineDash([3 * dpr, 5 * dpr]);
      ctx.beginPath();
      ctx.arc(rx, ry, rr * 0.7, t * 0.8, t * 0.8 + 5);
      ctx.stroke();
      ctx.setLineDash([]);

      const sw = t * (1.2 + I);
      ctx.strokeStyle = "rgba(60,150,255,0.9)";
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + Math.cos(sw) * rr, ry + Math.sin(sw) * rr);
      ctx.stroke();

      for (let k = 1; k < 8; k++) {
        ctx.strokeStyle = `rgba(60,150,255,${(0.1 * (8 - k)) / 8})`;
        ctx.beginPath();
        ctx.arc(rx, ry, rr, sw - k * 0.08, sw - (k - 1) * 0.08);
        ctx.stroke();
      }

      ctx.font = `${Math.round(10 * dpr)}px ${MONO}`;
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fillText(I > 0.5 ? "state: processing" : "state: idle", rx - rr, ry + rr + 16 * dpr);

      const bars: [string, number][] = [
        ["vision", 0.3 + 0.65 * I],
        ["language", 0.5 + 0.4 * Math.pow(Math.sin(t * 0.6), 2)],
        ["motor", (t * 0.08) % 1],
      ];
      bars.forEach((b, i) => {
        const y = H - m - 14 * dpr - (2 - i) * 20 * dpr;
        const w = 90 * dpr;
        const x = m + 8 * dpr;
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        ctx.fillText(b[0], x, y - 5 * dpr);
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.fillRect(x, y, w, 3 * dpr);
        ctx.fillStyle = "rgba(60,150,255,0.95)";
        ctx.fillRect(x, y, w * b[1], 3 * dpr);
      });
    }

    // ===================== AI CHIP (Circuit board) =====================
    interface ChipTrace {
      pts: number[][];
      ph: number;
      side: number;
      u: number;
    }
    interface ChipPart {
      x: number;
      y: number;
      w: number;
      h: number;
      rot: number;
    }
    interface ChipBokeh {
      u: number;
      v: number;
      z: number;
      r: number;
      a: number;
      s: number;
    }

    let chipT: ChipTrace[] = [];
    let chipP: ChipPart[] = [];
    let chipBokeh: ChipBokeh[] = [];

    function initChip() {
      chipT = [];
      chipP = [];
      const N = 18;
      let seed = 7;
      const R = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      for (let side = 0; side < 4; side++) {
        for (let i = 0; i < N; i++) {
          const u = ((i + 0.5) / N) * 2 - 1;
          const a = (side * Math.PI) / 2;
          const nx = Math.cos(a);
          const ny = Math.sin(a);
          const tx = -ny;
          const ty = nx;
          const p0 = [nx + tx * u * 0.9, ny + ty * u * 0.9];
          const l1 = 0.25 + R() * 0.9;
          const dg = R() * 0.7 * (R() < 0.5 ? -1 : 1);
          const l2 = 0.3 + R() * 1.2;
          const p1 = [p0[0] + nx * l1, p0[1] + ny * l1];
          const p2 = [p1[0] + nx * Math.abs(dg) + tx * dg, p1[1] + ny * Math.abs(dg) + ty * dg];
          chipT.push({ pts: [p0, p1, p2, [p2[0] + nx * l2, p2[1] + ny * l2]], ph: R(), side, u });
        }
      }
      for (let i = 0; i < 40; i++) {
        const a = R() * 6.283;
        const r = 1.5 + R() * 2.2;
        chipP.push({
          x: Math.cos(a) * r,
          y: Math.sin(a) * r,
          w: 0.06 + R() * 0.1,
          h: 0.03 + R() * 0.05,
          rot: R() < 0.5 ? 0 : 1.5708,
        });
      }
      chipBokeh = Array.from({ length: 14 }, () => ({
        u: rnd(0.05, 0.95),
        v: Math.random(),
        z: rnd(-0.4, 0.6),
        r: rnd(0.1, 0.35),
        a: rnd(0.1, 0.35),
        s: rnd(0.003, 0.01),
      }));
    }

    function rr(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
      else ctx.rect(x, y, w, h);
    }

    function drawChip(px: number, py: number) {
      const s = Math.min(W, H) * (small ? 0.15 : 0.17);
      const rot = Math.sin(t * 0.05) * 0.05;
      ctx.save();
      ctx.translate(cx + px * 22 * dpr, cy + H * 0.05 + py * 16 * dpr);
      ctx.rotate(rot);
      ctx.globalAlpha = 1;
      ctx.lineWidth = dpr;

      for (let k = 1; k <= 3; k++) {
        ctx.strokeStyle = `rgba(${AC},${(0.1 / k).toFixed(3)})`;
        const o = s * (1 + k * 0.95);
        rr(-o, -o, o * 2, o * 2, s * 0.2 * k);
        ctx.stroke();
      }

      ctx.strokeStyle = `rgba(${AC},${(0.22 + 0.15 * I).toFixed(2)})`;
      ctx.lineWidth = 1.2 * dpr;
      ctx.beginPath();
      for (const tr of chipT) {
        tr.pts.forEach((p, k) => (k ? ctx.lineTo(p[0] * s, p[1] * s) : ctx.moveTo(p[0] * s, p[1] * s)));
      }
      ctx.stroke();

      ctx.lineWidth = dpr;
      ctx.beginPath();
      for (const tr of chipT) {
        const e = tr.pts[3];
        ctx.moveTo(e[0] * s + 0.05 * s, e[1] * s);
        ctx.arc(e[0] * s, e[1] * s, 0.05 * s, 0, 6.283);
      }
      ctx.stroke();

      ctx.strokeStyle = `rgba(${AC},0.2)`;
      for (const c of chipP) {
        ctx.save();
        ctx.translate(c.x * s, c.y * s);
        ctx.rotate(c.rot);
        ctx.strokeRect(-c.w * s, -c.h * s, c.w * s * 2, c.h * s * 2);
        ctx.restore();
      }

      for (const tr of chipT) {
        const u = ((t * 0.3 * (0.7 + I) + tr.ph) % 1) * 3;
        const sg = Math.floor(u);
        const f = u - sg;
        const a = tr.pts[sg];
        const b = tr.pts[sg + 1];
        dot((a[0] + (b[0] - a[0]) * f) * s, (a[1] + (b[1] - a[1]) * f) * s, 0.09 * s, 1, "w", 0.75);
      }

      ctx.fillStyle = "rgba(200,225,255,0.55)";
      for (const tr of chipT) {
        const a = (tr.side * Math.PI) / 2;
        ctx.save();
        ctx.translate(tr.pts[0][0] * s, tr.pts[0][1] * s);
        ctx.rotate(a);
        ctx.fillRect(0, -0.02 * s, 0.14 * s, 0.04 * s);
        ctx.restore();
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(5,9,17,0.94)";
      rr(-s, -s, s * 2, s * 2, s * 0.08);
      ctx.fill();
      ctx.strokeStyle = "rgba(170,210,255,0.45)";
      ctx.lineWidth = 1.5 * dpr;
      ctx.stroke();

      ctx.strokeStyle = `rgba(${AC},0.5)`;
      ctx.lineWidth = dpr;
      rr(-s * 0.78, -s * 0.78, s * 1.56, s * 1.56, s * 0.05);
      ctx.stroke();

      const n = 8;
      const cs = (s * 1.1) / n;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const a = (0.1 + 0.5 * (0.5 + 0.5 * Math.sin(t * (1.5 + 2 * I) + i * 1.7 + j * 2.3))) * (0.6 + 0.6 * I);
          ctx.fillStyle = `rgba(${AC},${a.toFixed(3)})`;
          ctx.fillRect(-s * 0.55 + i * cs + cs * 0.08, -s * 0.55 + j * cs + cs * 0.08, cs * 0.84, cs * 0.84);
        }
      }

      ctx.beginPath();
      ctx.arc(-s * 0.88, -s * 0.88, s * 0.035, 0, 6.283);
      ctx.fillStyle = "rgba(220,240,255,0.8)";
      ctx.fill();

      ctx.globalCompositeOperation = "lighter";
      dot(0, 0, s * 1.9, 5, "r", 0.3 + 0.22 * I);

      ctx.globalAlpha = 1;
      ctx.font = `bold ${Math.round(s * 0.5)}px ${MONO}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(225,242,255,0.95)";
      ctx.fillText("AI", 0, 0);
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";
      ctx.restore();
    }

    // ===================== DNA HELIX + DATA SCALES =====================
    const dnaA: ProjectedPoint[] = [];
    const dnaB: ProjectedPoint[] = [];

    function drawDNA() {
      const N = small ? 46 : 64;
      for (let i = 0; i <= N; i++) {
        if (!dnaA[i]) {
          dnaA[i] = { x: 0, y: 0, z: 0, k: 0 };
          dnaB[i] = { x: 0, y: 0, z: 0, k: 0 };
        }
        const s = (i / N) * 2 - 1;
        const ax = (small ? 2.9 : 5.9) + Math.sin(s * 2.4) * 0.9;
        const ay = -s * 4.6 + Math.sin(t * 0.5) * 0.15;
        const az = Math.cos(s * 1.4) * -1.2;
        const dx = Math.cos(s * 2.4) * 2.16;
        const dy = -4.6;
        const l = Math.hypot(dx, dy);
        const nx = -dy / l;
        const ny = dx / l;
        const th = s * 13 + t * 0.7;
        const R = 0.8;
        const c = Math.cos(th) * R;
        const sn = Math.sin(th) * R;
        pr([ax + nx * c, ay + ny * c, az + sn], dnaA[i]);
        pr([ax - nx * c, ay - ny * c, az - sn], dnaB[i]);
      }

      let zs = 0;
      for (let i = 0; i <= N; i++) zs += dnaA[i].z;
      const lvm = lvOf(zs / (N + 1));
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 1;
      ctx.lineWidth = dpr * (0.8 + lvm * 0.4);
      ctx.strokeStyle = `rgba(${AC},${((0.5 + 0.2 * I) / (1 + lvm * 0.3)).toFixed(2)})`;
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        ctx.moveTo(dnaA[i].x, dnaA[i].y);
        ctx.lineTo(dnaB[i].x, dnaB[i].y);
        if (i < N) {
          ctx.moveTo(dnaA[i].x, dnaA[i].y);
          ctx.lineTo(dnaB[i + 1].x, dnaB[i + 1].y);
          ctx.moveTo(dnaB[i].x, dnaB[i].y);
          ctx.lineTo(dnaA[i + 1].x, dnaA[i + 1].y);
        }
      }
      ctx.stroke();

      ctx.strokeStyle = `rgba(235,240,250,${(0.4 / (1 + lvm * 0.3)).toFixed(2)})`;
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        ctx.moveTo(dnaA[i].x, dnaA[i].y);
        ctx.lineTo(dnaA[i + 1].x, dnaA[i + 1].y);
        ctx.moveTo(dnaB[i].x, dnaB[i].y);
        ctx.lineTo(dnaB[i + 1].x, dnaB[i + 1].y);
      }
      ctx.stroke();

      const fl = Math.floor((t * 9 * (0.7 + I)) % N);
      for (let i = 0; i <= N; i++) {
        for (const q of [dnaA[i], dnaB[i]]) {
          const lv = lvOf(q.z);
          const rad = 0.055 * q.k * 3.2;
          dot(q.x, q.y, rad, lv, (i + (q === dnaB[i] ? 1 : 0)) % 2 ? "w" : "r", 0.9 / (1 + lv * 0.3));
          if (Math.abs(i - fl) < 2) dot(q.x, q.y, rad * 1.8, lv, "w", 0.8);
        }
      }
    }

    function drawScales(px: number, py: number) {
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 1;
      ctx.font = `${Math.round(8 * dpr)}px ${MONO}`;
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      [
        [0.0, 0.66, -0.5, 1.0],
        [0.1, 0.8, -0.5, 0.85],
        [0.5, 0.22, -0.62, 0.8],
        [0.6, 0.1, -0.62, 0.7],
      ].forEach((sc, n) => {
        ctx.save();
        ctx.translate(sc[0] * W + px * (14 + n * 5) * dpr, sc[1] * H + py * 10 * dpr);
        ctx.rotate(sc[2]);
        const sp = 6 * dpr;
        const off = (t * 12 * dpr) % (sp * 10);
        ctx.strokeStyle = `rgba(235,240,250,${n % 2 ? 0.22 : 0.34})`;
        ctx.lineWidth = dpr;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(sc[3] * W, 0);
        for (let k = 0; k * sp < sc[3] * W; k++) {
          const x = k * sp - off + sp * 10;
          if (x < 0 || x > sc[3] * W) continue;
          const kk = Math.round(x / sp);
          ctx.moveTo(x, 0);
          ctx.lineTo(x, (kk % 10 === 0 ? 18 : kk % 5 === 0 ? 11 : 6) * dpr);
        }
        ctx.stroke();
        for (let k = 0; k < 6; k++) {
          const x = (k * sp * 10 - off + sp * 100) % (sc[3] * W);
          ctx.fillText(String(100 + Math.round(x / sp) * 5), x, 28 * dpr);
        }
        ctx.restore();
      });

      ctx.save();
      ctx.lineCap = "round";
      for (let k = 0; k < 5; k++) {
        const y1 = H * (0.87 + k * 0.022);
        const x2 = W * (0.22 + k * 0.03);
        const wBase = (8 + k * 2.5) * dpr;
        // Outer soft glow stroke
        ctx.strokeStyle = `rgba(${AC},${(0.06 + 0.04 * I).toFixed(3)})`;
        ctx.lineWidth = wBase * 2.2;
        ctx.beginPath();
        ctx.moveTo(-W * 0.02, y1);
        ctx.lineTo(x2, y1 - H * 0.1);
        ctx.stroke();
        // Core laser beam
        ctx.strokeStyle = `rgba(${AC},${(0.22 + 0.12 * I).toFixed(2)})`;
        ctx.lineWidth = wBase;
        ctx.beginPath();
        ctx.moveTo(-W * 0.02, y1);
        ctx.lineTo(x2, y1 - H * 0.1);
        ctx.stroke();
      }
      ctx.restore();

      [
        [0.64, 0.56],
        [0.08, 0.36],
        [0.78, 0.86],
      ].forEach((p, n) => {
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 3; j++) {
            const a = 0.1 + 0.35 * (0.5 + 0.5 * Math.sin(t * 2 + i * 1.3 + j * 2.1 + n));
            ctx.fillStyle = `rgba(235,240,250,${a.toFixed(2)})`;
            ctx.fillRect(p[0] * W + i * 9 * dpr, p[1] * H + j * 9 * dpr, 4 * dpr, 4 * dpr);
          }
        }
      });
    }

    // ===================== EXTRA ANIMATION & CURSOR EFFECTS =====================
    interface CometItem {
      x: number;
      y: number;
      a: number;
      l: number;
      v: number;
    }
    const comets: CometItem[] = [];

    function drawFX() {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 1;
      const rx = cx + ptr.x * 22 * dpr;
      const ry = cy + H * 0.05;
      for (let k = 0; k < 3; k++) {
        const ph = (t * (0.12 + 0.1 * I) + k / 3) % 1;
        ctx.strokeStyle = `rgba(${AC},${((1 - ph) * (0.14 + 0.12 * I)).toFixed(3)})`;
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.arc(rx, ry, ph * Math.max(W, H) * 0.7, 0, 6.283);
        ctx.stroke();
      }

      if (Math.random() < 0.012 + 0.02 * I) {
        comets.push({ x: rnd(0, W), y: rnd(0, H * 0.5), a: rnd(0.3, 0.7), l: 0, v: rnd(900, 1500) * dpr });
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.l += c.v * 0.016;
        const ca = Math.cos(c.a);
        const sa = Math.sin(c.a);
        const hx = c.x + ca * c.l;
        const hy2 = c.y + sa * c.l;
        const tl = 130 * dpr;
        const g = ctx.createLinearGradient(hx - ca * tl, hy2 - sa * tl, hx, hy2);
        g.addColorStop(0, "rgba(255,255,255,0)");
        g.addColorStop(1, `rgba(${AC},0.9)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.moveTo(hx - ca * tl, hy2 - sa * tl);
        ctx.lineTo(hx, hy2);
        ctx.stroke();
        dot(hx, hy2, 9 * dpr, 1, "w", 0.9);
        if (c.l > Math.hypot(W, H)) comets.splice(i, 1);
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.a *= mouse.down ? 0.95 : 0.9;
        if (p.a < 0.05) {
          trail.splice(i, 1);
          continue;
        }
        dot(p.x, p.y, (3 + p.a * 12) * dpr, 1, "r", p.a * 0.7);
      }

      if (mouse.x > -1e3) {
        dot(mouse.x, mouse.y, (mouse.down ? 70 : 46) * dpr, 4, "r", 0.3 + 0.25 * I);
        dot(mouse.x, mouse.y, 5 * dpr, 0, "w", 0.9);
      }

      ctx.restore();
    }

    // ===================== MAIN RENDER =====================
    function render(dt: number, now: number) {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      ptr.x += (ptr.tx - ptr.x) * Math.min(1, dt * 3);
      ptr.y += (ptr.ty - ptr.y) * Math.min(1, dt * 3);
      const ex = ptr.x + (ptr.active ? 0 : Math.sin(t * 0.13) * 0.25);
      const ey = ptr.y + (ptr.active ? 0 : Math.cos(t * 0.1) * 0.12);

      const raw = 0.5 - 0.5 * Math.cos((t * 6.2832) / C.CYCLE);
      I = Math.min(1, raw * raw * (3 - 2 * raw) + surge + (mouse.down ? 0.5 : 0));

      D += (Dt - D) * Math.min(1, dt * 4);
      surge *= 0.985;
      if (!mouse.down) {
        orbX *= 0.993;
        orbY *= 0.993;
      }

      const yaw = ex * 0.3 + Math.sin(t * 0.1) * 0.08 + orbX;
      const pit = -ey * 0.12 + orbY;
      cY = Math.cos(yaw);
      sY = Math.sin(yaw);
      cP = Math.cos(pit);
      sP = Math.sin(pit);
      scanY = Math.sin(t * 0.9) * 1.6 + 0.3;

      ctx.globalCompositeOperation = "lighter";
      drawFar(ex, ey);
      drawMid(ex, ey);
      drawScales(ex, ey);
      drawChip(ex, ey);
      drawDNA();

      head.r = [ey * 0.2 + Math.sin(t * 0.7) * 0.03, ex * 0.5 + Math.sin(t * 0.4) * 0.06, Math.sin(t * 0.5) * 0.04];
      head.p = [0, 0.45 + Math.sin(t * 0.9) * 0.04, 0];
      head.s = 1 + Math.sin(t * 1.1) * 0.012;
      if (head.eyeL !== undefined) {
        head.v[head.eyeL][0] = -0.4 + ex * 0.05;
        head.v[head.eyeL + 1][0] = 0.4 + ex * 0.05;
        head.v[head.eyeL][1] = 0.15 - ey * 0.05;
        head.v[head.eyeL + 1][1] = 0.15 - ey * 0.05;
      }
      torso.r = [0, ex * 0.15, 0];
      torso.s = head.s;
      xf(head);
      head.w.forEach((w, i) => pr(w, head.q[i]));

      drawNet(dt, now);

      if (SHOW_ROBOT) {
        const hc: ProjectedPoint = { x: 0, y: 0, z: 0, k: 0 };
        pr([0, 0.45, 0], hc);
        dot(hc.x, hc.y, F * 0.075, 5, "r", 0.2 + 0.15 * I);
        drawMesh(torso, 0.8);
        drawMesh(head, 1);
        const s1: ProjectedPoint = { x: 0, y: 0, z: 0, k: 0 };
        const s2: ProjectedPoint = { x: 0, y: 0, z: 0, k: 0 };
        pr([-1.4, scanY, 0.9], s1);
        pr([1.4, scanY, 0.9], s2);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = `rgba(60,150,255,${(0.35 + 0.3 * I).toFixed(2)})`;
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.moveTo(s1.x, s1.y);
        ctx.lineTo(s2.x, s2.y);
        ctx.stroke();

        const blink = t % 5.5 > 5.4 ? 0.15 : 1;
        if (head.eyeL !== undefined) {
          for (const k of [head.eyeL, head.eyeL + 1]) {
            const q = head.q[k];
            dot(q.x, q.y, 0.34 * q.k * blink + 1, 0, "r", 0.95 * (0.8 + 0.4 * I));
            dot(q.x, q.y, 0.11 * q.k * blink + 1, 0, "w", 0.95);
          }
        }
      }

      limbs.forEach((m) => {
        const b = m.base || [0, 0, 0];
        const k = m.k || 0;
        m.p = [b[0] + Math.sin(t * 0.3 + k) * 0.3, b[1] + Math.cos(t * 0.4 + k) * 0.3, b[2]];
        m.r = [m.r[0] + m.rs[0] * dt, m.r[1] + m.rs[1] * dt, m.r[2] + m.rs[2] * dt];
        drawMesh(m, 0.85);
      });

      drawGears(ex, ey);
      drawHud();
      drawFX();

      ripples = ripples.filter((r) => now - r.t < 2200);
      ripples.forEach((r) => {
        const a = 1 - (now - r.t) / 2200;
        ctx.globalAlpha = a;
        ctx.strokeStyle = "rgba(60,150,255,0.8)";
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.arc(r.x, r.y, (now - r.t) * 0.9 * dpr, 0, 6.283);
        ctx.stroke();
      });

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, W, H);
    }

    // ===================== EVENT LISTENERS & LOOP =====================
    let last = performance.now();
    let rawPointerX = -1e4;
    let rawPointerY = -1e4;
    let rawPointerMoved = false;

    function frame(now: number) {
      if (!reduce) {
        animationId = requestAnimationFrame(frame);
      }
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      t += dt * C.SPEED;

      if (rawPointerMoved) {
        ptr.active = true;
        ptr.tx = (rawPointerX / window.innerWidth - 0.5) * 2;
        ptr.ty = (rawPointerY / window.innerHeight - 0.5) * 2;
        mouse.x = rawPointerX * dpr;
        mouse.y = rawPointerY * dpr;
        trail.push({ x: mouse.x, y: mouse.y, a: 1 });
        if (trail.length > 25) trail.shift();
        rawPointerMoved = false;
      }

      render(dt, now);
    }

    const onPointerMove = (e: PointerEvent) => {
      rawPointerX = e.clientX;
      rawPointerY = e.clientY;
      rawPointerMoved = true;
      if (mouse.down) {
        orbX += (e.clientX - mouse.lx) * 0.004;
        orbY = Math.max(-0.5, Math.min(0.5, orbY + (e.clientY - mouse.ly) * 0.003));
        mouse.lx = e.clientX;
        mouse.ly = e.clientY;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      mouse.down = true;
      mouse.lx = e.clientX;
      mouse.ly = e.clientY;
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
      surge = 1;
      ripples.push({ x: e.clientX * dpr, y: e.clientY * dpr, t: performance.now() });
    };

    const onPointerUp = (e: PointerEvent) => {
      mouse.down = false;
      if (e.pointerType === "touch") {
        mouse.x = mouse.y = -1e4;
      }
    };

    const onPointerCancel = () => {
      mouse.down = false;
      mouse.x = mouse.y = -1e4;
    };

    const onWheel = (e: WheelEvent) => {
      Dt = Math.max(5.5, Math.min(13, Dt + e.deltaY * 0.004));
    };

    const onResize = () => {
      layout();
      initBg();
      if (reduce) render(0.016, performance.now());
    };

    const onVisibilityChange = () => {
      last = performance.now();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerCancel, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    layout();
    initBg();
    initChip();
    initNet(Math.round(window.innerWidth < 768 ? C.NET_NODES * 0.6 : C.NET_NODES));

    if (reduce) {
      t = 4;
      render(0.016, performance.now());
    } else {
      animationId = requestAnimationFrame(frame);
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
