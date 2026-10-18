import React, { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, ExternalLink, Github, Layers } from "lucide-react";
import { projects, type Project } from "../data/content";
import { profile } from "../data/profile";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SmartLink from "./SmartLink";
import Thumb from "./Thumb";

function Detail({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="font-display text-sm font-bold text-blue">{title}</h4>
      <div className="mt-1.5 text-sm leading-relaxed text-silver">{children}</div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((f) => (
        <li key={f} className="flex gap-2 text-silver">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue shadow-[0_0_8px_#00d2ff]" />
          {f}
        </li>
      ))}
    </ul>
  );
}

/** 3D Interactive Tilt Card with Specular Glare */
function TiltCard({ p, index }: { p: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const panelId = `case-${p.id}`;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 260, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 260, damping: 20 });

  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;

    mouseX.set(xPct);
    mouseY.set(yPct);
    setGlarePos({ x: xPct * 100, y: yPct * 100, opacity: 0.16 });
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setGlarePos((g) => ({ ...g, opacity: 0 }));
  };

  const isRed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.article
        ref={cardRef}
        data-cursor="view"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl border border-silver/20 bg-[#080916]/90 transition-all duration-300 hover:border-blue/50 hover:shadow-[0_15px_45px_-10px_rgba(0,0,0,0.9),0_0_35px_rgba(0,210,255,0.3),0_0_20px_rgba(255,0,60,0.25)]"
      >
        {/* Dynamic Specular Glare in Electric Blue and Fiery Red */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(0, 210, 255, 0.4) 0%, transparent 60%)`,
          }}
        />

        {/* Thumbnail Preview with 3D Depth */}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="aspect-[20/11] overflow-hidden relative border-b border-silver/15"
        >
          <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
            <Thumb kind={p.kind} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080916] via-transparent to-transparent opacity-85" />
        </div>

        {/* Card Body with 3D Depth */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="flex flex-1 flex-col p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-extrabold leading-snug text-white group-hover:text-blue transition-colors">
              {p.title}
            </h3>
            <span className={`${isRed ? "chip-red" : "chip"} shrink-0 text-[11px] font-mono`}>
              {p.status}
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-silver">
            {p.summary}
          </p>

          {/* Tech Stack Chips */}
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
            {p.stack.map((t, idx) => (
              <li
                key={t}
                className={idx % 3 === 0 ? "chip" : idx % 3 === 1 ? "chip-red" : "chip-silver"}
              >
                {t}
              </li>
            ))}
          </ul>

          {/* Actions: Live Demo & GitHub */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <SmartLink
              href={p.demo}
              className="btn-primary !py-2 !px-4 !text-xs"
              label={`${p.title} live demo`}
            >
              <ExternalLink size={14} /> Live Demo
            </SmartLink>
            <SmartLink
              href={p.repo}
              className="btn-ghost !py-2 !px-4 !text-xs"
              label={`${p.title} source code`}
            >
              <Github size={14} /> Source Code
            </SmartLink>
          </div>

          {/* Case study expandable toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-5 flex items-center gap-1.5 self-start font-mono text-xs font-bold text-blue transition hover:text-white"
          >
            <Layers size={13} className="text-red" />
            {open ? "[-] Collapse case study" : "[+] Expand case study"}
            <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>

          {/* Case Study Details */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-5 space-y-4 border-t border-silver/15 pt-5">
                  <Detail title="The Problem">{p.problem}</Detail>
                  <Detail title="Key Features"><List items={p.features} /></Detail>
                  {!!p.implemented?.length && <Detail title="Implemented"><List items={p.implemented} /></Detail>}
                  {!!p.planned?.length && <Detail title="Planned"><List items={p.planned} /></Detail>}
                  <Detail title="My Contribution">{p.contribution}</Detail>
                  {p.results && <Detail title="Results">{p.results}</Detail>}
                  {p.note && <p className="text-xs italic text-silver-dark">{p.note}</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <SectionHeading
        title="Featured 3D Case Studies"
        intro="Interactive 3D tilt cards showcasing production-grade web systems, machine learning pipelines, and cloud APIs."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <TiltCard key={p.id} p={p} index={i} />
        ))}
      </div>

      <Reveal className="mt-12 text-center text-sm font-mono text-silver-dark">
        Want to explore more repositories? Discover full source archives on{" "}
        <SmartLink
          href={profile.github}
          className="text-blue font-bold underline decoration-blue/50 underline-offset-4 hover:text-white"
        >
          github.com/sasikumar-18
        </SmartLink>.
      </Reveal>
    </section>
  );
}
