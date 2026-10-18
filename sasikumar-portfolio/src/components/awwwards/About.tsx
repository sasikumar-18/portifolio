import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, Code2, Cpu, GraduationCap, MapPin, Terminal, Sparkles } from "lucide-react";
import { personalInfo } from "../../data/portfolioData";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1600; // ms
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display font-extrabold text-4xl sm:text-5xl text-black dark:text-white">
      {count}
      <span className="text-[#00f0ff]">{suffix}</span>
    </span>
  );
}

function Profile3DCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);

    if (glareRef.current) {
      const gx = ((mouseX / rect.width) * 100).toFixed(1);
      const gy = ((mouseY / rect.height) * 100).toFixed(1);
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(0, 240, 255, 0.28), transparent 60%)`;
      glareRef.current.style.opacity = "0.3";
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div style={{ perspective: 1200 }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative group rounded-3xl p-1 bg-gradient-to-b from-black/10 to-transparent dark:from-white/10 dark:to-transparent border border-black/10 dark:border-white/10 shadow-2xl transition-all duration-300"
      >
        {/* Dynamic Specular Glare Overlay */}
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-30 opacity-0"
        />

        {/* Visual Box simulating developer profile / badge */}
        <div
          className="relative rounded-[22px] bg-[#f0f0eb] dark:bg-[#121212] p-6 sm:p-8 overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Top HUD Row */}
          <div
            className="flex items-center justify-between mb-6 relative z-10"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-600 dark:text-neutral-400">
                DEV.ID // #8688
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#0284c7] dark:text-[#00f0ff] uppercase font-bold px-2 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/20">
              3D HOLOGRAPHIC
            </span>
          </div>

          {/* 3D Realistic Portrait Showcase */}
          <div
            className="relative mx-auto mb-6 group/img cursor-pointer"
            style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
          >
            {/* Ambient Behind-Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#00f0ff]/40 via-[#0066ff]/20 to-[#00f0ff]/40 blur-md opacity-75 group-hover/img:opacity-100 transition-opacity" />

            {/* Photo Container Frame */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl overflow-hidden border-2 border-[#00f0ff] bg-black shadow-[0_0_35px_rgba(0,240,255,0.4)]">
              <img
                src="/sasikumar.jpg"
                alt="Singanaboyina Sasikumar - Software Engineer"
                className="w-full h-full object-cover object-top filter brightness-105 contrast-105 transition-transform duration-700 group-hover/img:scale-110"
              />

              {/* Holographic Scanline & Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Status Badge */}
              <div
                className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/90 border border-[#00f0ff] flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.6)] backdrop-blur-md"
                style={{ transform: "translateZ(25px)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]" />
                </span>
                <span className="text-[10px] font-mono font-bold text-[#00f0ff] tracking-wider uppercase">
                  ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* Name & Headline with 3D Depth */}
          <div
            className="text-center mb-6"
            style={{ transform: "translateZ(35px)" }}
          >
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-black dark:text-white tracking-wide uppercase">
              {personalInfo.name}
            </h3>
            <p className="text-sm font-mono text-[#0284c7] dark:text-[#00f0ff] font-semibold mt-1">
              Full Stack Developer &amp; ML Engineer
            </p>
            <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Interactive Python Terminal Box with 3D Depth */}
          <div
            className="rounded-xl bg-black/95 p-4 font-mono text-xs text-neutral-300 border border-white/10 shadow-2xl relative overflow-hidden group/term"
            style={{ transform: "translateZ(25px)" }}
          >
            {/* Window Controls */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-neutral-500 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 text-neutral-400">profile.py</span>
              </div>
              <span className="text-[9px] text-[#00f0ff] font-mono">Python 3.11</span>
            </div>

            {/* Code lines */}
            <p className="text-neutral-400">
              <span className="text-[#00f0ff] font-bold">class</span>{" "}
              <span className="text-white font-bold">Developer</span>:
            </p>
            <p className="pl-4 text-neutral-400">
              education = <span className="text-[#00f0ff]">&quot;B.Tech IT (JNTUA)&quot;</span>
            </p>
            <p className="pl-4 text-neutral-400">
              passions = [<span className="text-[#00f0ff]">&quot;Full-Stack&quot;</span>, <span className="text-[#00f0ff]">&quot;AI/ML&quot;</span>]
            </p>
            <p className="pl-4 text-neutral-400">
              ready_for_hire = <span className="text-[#00f0ff] font-bold">True</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const stats = [
    { label: "Years Engineering Experience", value: 3, suffix: "+" },
    { label: "Full-Stack & ML Projects", value: 15, suffix: "+" },
    { label: "Code Accuracy & Uptime", value: 99, suffix: "%" },
    { label: "Industry Certifications", value: 6, suffix: "" },
  ];

  const highlights = [
    {
      icon: Terminal,
      title: "Core Engineering",
      desc: "Robust understanding of Object-Oriented Design, Data Structures, and Algorithms in Python and Java.",
    },
    {
      icon: Code2,
      title: "Full-Stack Web",
      desc: "Architecting end-to-end responsive web applications using React.js, Node.js, Express, and MongoDB.",
    },
    {
      icon: Cpu,
      title: "Machine Learning & Vision",
      desc: "Real-time OpenCV computer vision pipelines, scikit-learn predictive models, and cloud API deployment.",
    },
    {
      icon: GraduationCap,
      title: "Academic Background",
      desc: "B.Tech in Information Technology from Sri Venkateswara College of Engineering & Technology (JNTUA).",
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-6 sm:px-8 relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00f0ff] bg-[#00f0ff]/10 px-3 py-1 rounded-full border border-[#00f0ff]/30">
            01 // ABOUT ME
          </span>
          <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
        </motion.div>

        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-black dark:text-white uppercase tracking-tight">
          ARCHITECTING SOFTWARE <br />
          <span className="text-neutral-400 dark:text-neutral-500">WITH PURPOSE &amp; PRECISION.</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: 3D Interactive Developer Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <Profile3DCard />
        </motion.div>

        {/* Right Column: Bio Narrative & Stat Counters */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed mb-12"
          >
            <p className="font-medium text-black dark:text-white text-lg sm:text-xl">
              Hello! I'm <strong className="text-black dark:text-white font-bold">Sasikumar</strong>, an engineer
              driven by the ambition to bridge raw computing logic with clean, scalable user experiences.
            </p>
            <p>
              Holding a B.Tech in Information Technology from JNTUA, I specialize in crafting full-stack web applications
              with <strong className="text-black dark:text-white">React.js</strong> and <strong className="text-black dark:text-white">Node.js</strong>,
              while implementing high-precision machine learning models with <strong className="text-black dark:text-white">Python, Scikit-learn, and OpenCV</strong>.
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              From architecting REST microservices and automated database pipelines to training computer vision
              classification models with 90% real-time accuracy, my focus is delivering software that is robust,
              maintainable, and delightful to interact with.
            </p>
          </motion.div>

          {/* Animated Stat Counters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-black/10 dark:border-white/10">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col"
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-2">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Core Strengths 2x2 Mini Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:border-[#00f0ff]/50 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h.icon className="w-4 h-4 text-[#00f0ff]" />
                  <span className="font-display font-bold text-sm text-black dark:text-white uppercase tracking-wide">
                    {h.title}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-normal">
                  {h.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
