import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Cpu, Globe2, GraduationCap, ShieldCheck } from "lucide-react";
import { professionalSummary } from "../data/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  { value: 3, suffix: "+", label: "Years of Engineering Focus", color: "text-blue" },
  { value: 15, suffix: "+", label: "Full-Stack & ML Projects", color: "text-red" },
  { value: 90, suffix: "%", label: "Face Recognition Accuracy", color: "text-blue" },
  { value: 99, suffix: "%", label: "Cloud API Service Uptime", color: "text-red" },
];

function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1400;
          const steps = 30;
          const stepTime = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(eased * value));

            if (currentStep >= steps) {
              clearInterval(timer);
              setDisplayValue(value);
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={elementRef} className="font-display text-3xl sm:text-4xl font-extrabold text-white">
      {displayValue}
      <span className={color}>{suffix}</span>
    </span>
  );
}

const pillars = [
  {
    icon: GraduationCap,
    title: "B.Tech in IT (JNTUA)",
    desc: "Rigorous core education in Data Structures, Algorithms, Object-Oriented Design, and Database Systems.",
    tagColor: "border-blue/30 text-blue bg-blue/10",
  },
  {
    icon: Code2,
    title: "Full-Stack & APIs",
    desc: "Hands-on engineering with React.js, Node.js, Express, MongoDB, and RESTful web architectures.",
    tagColor: "border-red/30 text-red bg-red/10",
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    desc: "Applied computer vision with OpenCV, predictive models via Scikit-learn, and AWS cloud deployment.",
    tagColor: "border-blue/30 text-blue bg-blue/10",
  },
  {
    icon: Globe2,
    title: "Agile & Teamwork",
    desc: "Bilingual technical communicator (English & Telugu) accustomed to agile sprints, code reviews, and Git best practices.",
    tagColor: "border-red/30 text-red bg-red/10",
  },
];

export default function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 220, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section id="about" className="section-pad">
      <SectionHeading
        title="About Me // Workstation & Foundation"
        intro="Passionate about designing dependable software systems, bridging full-stack web platforms and intelligent AI capabilities."
      />

      <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
        {/* Parallax Photo / Workstation Card */}
        <Reveal>
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="glass-card relative overflow-hidden rounded-3xl border border-silver/25 bg-[#080916]/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            >
              {/* Dual Ambient Glow: Electric Blue & Fiery Red */}
              <div className="absolute -top-12 -left-12 h-36 w-36 rounded-full bg-blue/25 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-red/25 blur-2xl pointer-events-none" />

              {/* Avatar Artwork Box with 3D Depth */}
              <div
                style={{ transform: "translateZ(30px)" }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-silver/20 group"
              >
                <img
                  src="/workstation.jpg"
                  alt="Singanaboyina Sasikumar at futuristic 3D developer workstation"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080916] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                  <span className="chip !text-[10px] font-mono !py-0.5">
                    WORKSTATION // LIVE
                  </span>
                  <span className="font-mono text-[10px] text-blue font-bold bg-black/80 px-2 py-0.5 rounded border border-blue/40 shadow-[0_0_8px_#00d2ff]">
                    60 FPS
                  </span>
                </div>
              </div>

              <div style={{ transform: "translateZ(35px)" }} className="mt-4 text-center">
                <h3 className="font-display text-xl font-extrabold text-white">
                  Singanaboyina Sasikumar
                </h3>
                <p className="mt-0.5 font-mono text-xs font-semibold text-blue">
                  Software Engineer · JNTUA (2023–2026)
                </p>
              </div>

              {/* Parallax Floating Tech Card */}
              <motion.div
                style={{ transform: "translateZ(45px)" }}
                className="mt-4 flex items-center justify-between rounded-xl border border-silver/15 bg-black/70 px-4 py-2.5 font-mono text-xs text-silver-light"
              >
                <span className="flex items-center gap-1.5 text-blue">
                  <ShieldCheck size={14} /> Full-Stack &amp; AI
                </span>
                <span className="text-red font-bold">VERIFIED</span>
              </motion.div>
            </motion.div>
          </div>
        </Reveal>

        {/* Bio Content & Animated Stat Counters */}
        <div>
          <Reveal>
            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-silver">
              <p className="border-l-2 border-blue pl-4 text-white font-medium">
                {professionalSummary}
              </p>
              <p>
                I thrive at the intersection of modern frontend elegance and robust backend logic. Whether building persistent e-commerce architectures or real-time computer vision recognition pipelines, my commitment is to deliver maintainable, performant, and secure solutions.
              </p>
            </div>
          </Reveal>

          {/* Animated Stat Counters Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map(({ value, suffix, label, color }) => (
              <Reveal key={label}>
                <div className="glass-card rounded-2xl border border-silver/15 bg-[#080a18]/85 p-4 text-center hover:border-blue/50">
                  <AnimatedCounter value={value} suffix={suffix} color={color} />
                  <p className="mt-1.5 text-xs font-medium text-silver-dark">
                    {label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Engineering Pillars */}
          <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
            {pillars.map(({ icon: Icon, title, desc, tagColor }) => (
              <Reveal key={title}>
                <div className="glass-card flex items-start gap-3 rounded-xl border border-silver/15 bg-[#070914]/85 p-3.5 hover:border-blue/40">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${tagColor}`}>
                    <Icon size={18} />
                  </span>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white">
                      {title}
                    </h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-silver-dark">
                      {desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
