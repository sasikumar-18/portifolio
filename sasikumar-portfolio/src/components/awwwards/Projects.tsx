import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Sparkles, ArrowUpRight, Layers } from "lucide-react";
import { projects } from "../../data/content";

function TiltProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-9deg", "9deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        data-cursor="view"
        className="group relative rounded-3xl bg-[#ffffff] dark:bg-[#121212] border border-black/10 dark:border-white/10 p-7 sm:p-9 shadow-md hover:shadow-2xl hover:border-[#00f0ff] dark:hover:border-[#00f0ff] transition-colors duration-300 flex flex-col justify-between h-full"
      >
        {/* Subtle Specular Glow on Hover */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#00f0ff]/10 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Top Meta: Number & Status Badge */}
        <div className="flex items-center justify-between mb-6 relative z-10" style={{ transform: "translateZ(20px)" }}>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            CASE STUDY // 0{index + 1}
          </span>
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wide uppercase bg-[#00f0ff]/15 text-[#0284c7] dark:text-[#00f0ff] border border-[#00f0ff]/30">
            {project.status}
          </span>
        </div>

        {/* Project Title & Summary */}
        <div className="mb-6 relative z-10" style={{ transform: "translateZ(30px)" }}>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-black dark:text-white uppercase tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors mb-3">
            {project.title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4">
            {project.summary}
          </p>

          {/* Key Engineering Features */}
          <div className="space-y-1.5 mb-6">
            {project.features.slice(0, 3).map((feat, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span className="text-[#00f0ff] font-bold">&bull;</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills & Action Buttons */}
        <div className="mt-auto pt-6 border-t border-black/10 dark:border-white/10 relative z-10" style={{ transform: "translateZ(25px)" }}>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-black/5 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border border-black/5 dark:border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Live Demo or Case Overview */}
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-[#00f0ff] dark:hover:bg-[#00f0ff] hover:text-black dark:hover:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm group/btn"
            >
              <span>Live Preview</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>

            {/* GitHub Repository */}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code on GitHub"
              className="p-2.5 rounded-xl border border-black/15 dark:border-white/15 hover:border-[#00f0ff] text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-[#00f0ff] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 px-6 sm:px-8 relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00f0ff] bg-[#00f0ff]/10 px-3 py-1 rounded-full border border-[#00f0ff]/30">
            03 // SELECTED WORK
          </span>
          <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-black dark:text-white uppercase tracking-tight">
            FEATURED PROJECTS<span className="text-[#00f0ff]">.</span>
          </h2>
          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400">
            Real-world systems spanning full-stack web applications, machine learning architectures,
            and real-time computer vision pipelines.
          </p>
        </div>
      </div>

      {/* Projects Grid with 3D Tilt */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <TiltProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
