import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Braces, Database, Download, GitBranch, Mail, Server } from "lucide-react";
import { profile, typedRoles } from "../data/profile";
import { useTyping } from "../hooks/useTyping";
import MagneticButton from "./MagneticButton";

const floaters = [
  { Icon: Braces, label: "React & JS", pos: "-left-4 top-8 sm:-left-8", delay: 0, color: "text-blue" },
  { Icon: Server, label: "Node & Python", pos: "-right-4 top-20 sm:-right-8", delay: 0.6, color: "text-red" },
  { Icon: Database, label: "MongoDB & SQL", pos: "-left-3 bottom-20 sm:-left-10", delay: 1.2, color: "text-blue" },
  { Icon: GitBranch, label: "AWS & Git", pos: "-right-3 bottom-6 sm:-right-6", delay: 1.8, color: "text-silver" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const role = useTyping(typedRoles, !reduce);

  const nameWords = ["SINGANABOYINA", "SASIKUMAR"];

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 pb-20 pt-32 sm:px-8"
    >
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2.5 rounded-full border border-blue/40 bg-black/70 px-4 py-1.5 font-mono text-xs font-bold tracking-wider text-blue uppercase shadow-[0_0_20px_rgba(0,210,255,0.3)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue shadow-[0_0_8px_#00d2ff]" />
            </span>
            <span>SYSTEM: ONLINE · WORKSTATION ACTIVE</span>
          </motion.div>

          {/* Split-Text Headline Reveal */}
          <div className="mt-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-sm tracking-widest text-silver-metallic uppercase"
            >
              &gt; Full-Stack Software Engineer
            </motion.p>

            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.05]">
              {nameWords.map((word, wi) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + wi * 0.15, duration: 0.6, ease: "easeOut" }}
                  className={`block ${wi === 1 ? "grad-text" : "text-white"}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Rotating Role Text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-silver/20 bg-black/80 px-4 py-2 font-mono text-base font-semibold text-blue shadow-[0_0_20px_rgba(0,210,255,0.2)] sm:text-lg"
          >
            <span className="text-red font-bold">root@core:~$</span>
            <span aria-hidden className="caret text-white">{role}</span>
          </motion.div>

          {/* High-Impact Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-silver sm:text-lg font-normal"
          >
            Architecting high-performance web systems and intelligent machine learning solutions. Proficient in Python, Java, JavaScript, React.js, Node.js, and Cloud API services.
          </motion.p>

          {/* Magnetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects" strength={20}>
              <span className="btn-primary">
                View Work <ArrowRight size={16} />
              </span>
            </MagneticButton>

            <MagneticButton href="#contact" strength={20}>
              <span className="btn-red">
                Let's Talk <Mail size={16} />
              </span>
            </MagneticButton>

            <MagneticButton href={profile.resume} download strength={15}>
              <span className="btn-ghost !py-2.5 !px-4 !text-xs font-mono">
                <Download size={14} className="text-blue" /> Resume (PDF)
              </span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* 3D Developer HUD Card Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* Card Ambient Aura in Blue and Red */}
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-blue/25 via-red/25 to-black/70 blur-3xl animate-pulse-glow"
          />

          <div className="glass-card relative overflow-hidden rounded-3xl border border-silver/20 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between border-b border-silver/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red shadow-[0_0_8px_#ff003c]" />
                <span className="h-3 w-3 rounded-full bg-silver shadow-[0_0_8px_#ffffff]" />
                <span className="h-3 w-3 rounded-full bg-blue shadow-[0_0_8px_#00d2ff]" />
              </div>
              <span className="font-mono text-xs text-blue flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> BUILD SUCCESSFUL
              </span>
            </div>

            <pre className="mt-4 overflow-x-auto font-mono text-xs sm:text-[13px] leading-6 text-slate-300">
              <code>
                <span className="text-red font-bold">class</span>{" "}
                <span className="text-blue font-bold">SoftwareEngineer</span>:{"\n"}
                {"  "}developer = <span className="text-emerald-300">"Singanaboyina Sasikumar"</span>{"\n"}
                {"  "}education = <span className="text-silver-light">"B.Tech in IT (JNTUA)"</span>{"\n"}
                {"  "}stack = [
                <span className="text-blue">"Python"</span>,{" "}
                <span className="text-blue">"React"</span>,{" "}
                <span className="text-blue">"Node"</span>]{"\n"}
                {"  "}ai_models = [<span className="text-red">"OpenCV"</span>, <span className="text-red">"Scikit-learn"</span>]{"\n"}
                {"  "}status = <span className="text-emerald-300">"Production Ready"</span>{"\n"}
                {"\n"}
                <span className="text-slate-500"># Compiling next-gen solutions</span>{"\n"}
                me = <span className="text-blue">SoftwareEngineer</span>(){"\n"}
                <span className="text-red">print</span>(me.status)
              </code>
            </pre>
          </div>

          {/* Floating Technology Orbs */}
          {floaters.map(({ Icon, label, pos, delay, color }) => (
            <motion.div
              key={label}
              aria-hidden
              className={`glass absolute ${pos} flex items-center gap-2 rounded-xl border border-silver/20 bg-black/90 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_4px_25px_rgba(0,0,0,0.9)] hover:border-blue transition-all`}
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon size={14} className={color} /> {label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
