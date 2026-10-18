import { useState, useEffect } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail, Phone, Sparkles, Terminal, Code2, CheckCircle2 } from "lucide-react";
import { profile } from "../../data/profile";
import { professionalSummary } from "../../data/content";

export default function CyanHero() {
  const stats = [
    { value: "3+", label: "Years Experience", desc: "Full-Stack & Systems" },
    { value: "15+", label: "Projects Completed", desc: "Production & Academic" },
    { value: "10+", label: "Global Clients", desc: "Collaborations & Teams" },
    { value: "100%", label: "Job Success Rate", desc: "Quality & On-Time" },
  ];

  const socialLinks = [
    { href: profile.github, label: "GitHub", icon: Github },
    { href: profile.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
    { href: `tel:${profile.phone}`, label: "Call", icon: Phone },
  ];

  return (
    <section id="top" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Background Ambient Glows & Cyber Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-48 h-[36rem] w-[36rem] rounded-full bg-cyan/15 blur-[160px]" />
        <div className="absolute top-1/3 -right-48 h-[40rem] w-[40rem] rounded-full bg-[#0099ff]/15 blur-[180px]" />
        <div className="absolute bottom-10 left-1/3 h-[30rem] w-[30rem] rounded-full bg-cyan/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Intro & Actions */}
          <div className="space-y-6 text-left">
            {/* Split Headline */}
            <div>
              <p className="font-mono text-sm tracking-widest text-cyan font-bold uppercase">
                &gt; Hello, World! I am
              </p>
              <h1 className="mt-2 font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                SINGANABOYINA <br />
                <span className="grad-cyan">SASIKUMAR</span>
              </h1>
              <h2 className="mt-3 font-display text-xl sm:text-2xl font-bold text-slate-200">
                Full Stack Web Developer &amp; Software Engineer
              </h2>
            </div>

            {/* Personal Intro Text */}
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">
              Passionate full stack developer crafting high-performance, modern web applications with cutting-edge frontends and dependable backend architectures. Specializing in <span className="text-white font-semibold">React, Next.js, TypeScript, Node.js, and Cloud Databases</span> with a strong foundation from JNTUA.
            </p>

            {/* CTA Buttons: View My Work / Download CV */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#projects" className="btn-cyan group">
                <span>View My Work</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={profile.resume}
                download
                className="btn glass-cyan-card !py-3 !px-6 text-white border-white/20 hover:border-cyan hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
              >
                <Download size={16} className="text-cyan" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4 text-slate-400">
              <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">Connect:</span>
              <div className="flex items-center gap-2.5">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-cyan hover:bg-cyan/15 hover:text-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                    title={label}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphism Visual Card with Stats */}
          <div className="relative mx-auto w-full max-w-lg">
            {/* Glowing Accent Ring */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan/30 via-transparent to-[#0099ff]/30 blur-2xl pointer-events-none" />

            <div className="glass-cyan-card relative overflow-hidden rounded-3xl border border-cyan/30 p-6 sm:p-8 shadow-2xl">
              {/* Card Header Status */}
              <div className="flex items-center justify-between border-b border-cyan/20 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-cyan shadow-[0_0_8px_#00f0ff]" />
                  <span className="h-3 w-3 rounded-full bg-slate-400 opacity-60" />
                  <span className="h-3 w-3 rounded-full bg-slate-600 opacity-40" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  FULL STACK READY
                </div>
              </div>

              {/* Developer Avatar Box */}
              <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row text-center sm:text-left">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-cyan/60 shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                  <img
                    src="/workstation.jpg"
                    alt="Singanaboyina Sasikumar"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Singanaboyina Sasikumar
                  </h3>
                  <p className="font-mono text-xs font-semibold text-cyan">
                    B.Tech in Information Technology · JNTUA
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    Engineered 15+ full-stack and AI applications with focus on performance.
                  </p>
                </div>
              </div>

              {/* Stats Panel (Grid inside Glassmorphism Card) */}
              <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-cyan/20">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-cyan/15 bg-black/40 p-4 transition-all hover:border-cyan/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                  >
                    <div className="font-display text-3xl font-extrabold text-cyan drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]">
                      {item.value}
                    </div>
                    <div className="mt-1 font-semibold text-xs text-white">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Tech Snapshot Banner */}
              <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-xs text-slate-300">
                <span className="flex items-center gap-2 text-cyan">
                  <Code2 size={15} /> React · Next.js · Node · TS
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={13} /> Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
