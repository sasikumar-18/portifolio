import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Database, Cpu, Layout, Wrench, CheckCircle2 } from "lucide-react";
import { skillGroups } from "../../data/content";

export default function SkillsMarquee() {
  const [activeTab, setActiveTab] = useState(0);

  const marqueeItems = [
    "PYTHON",
    "REACT.JS",
    "NODE.JS",
    "JAVASCRIPT",
    "TYPESCRIPT",
    "JAVA",
    "C++",
    "SCIKIT-LEARN",
    "OPENCV",
    "MONGODB",
    "MYSQL",
    "REST APIS",
    "EXPRESS.JS",
    "TAILWIND CSS",
    "AWS",
    "GIT & GITHUB",
    "DATA STRUCTURES",
    "MACHINE LEARNING",
  ];

  const categoryIcons = [Code, Layout, Database, Cpu, Wrench];

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden bg-black/[0.02] dark:bg-white/[0.02]">
      {/* Infinite Horizontal Marquee Ribbon */}
      <div className="py-4 border-y border-black/10 dark:border-white/10 overflow-hidden select-none bg-black/[0.03] dark:bg-white/[0.02]">
        <div className="marquee-track flex gap-8 items-center whitespace-nowrap">
          {/* Double items for seamless infinite scroll */}
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 group">
              <span className="font-display font-black text-2xl sm:text-4xl tracking-tighter uppercase text-neutral-400 dark:text-neutral-600 group-hover:text-[#00f0ff] transition-colors duration-200">
                {item}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] inline-block" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Interactive Skills Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-20">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00f0ff] bg-[#00f0ff]/10 px-3 py-1 rounded-full border border-[#00f0ff]/30">
                02 // TECHNICAL ARSENAL
              </span>
            </motion.div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-black dark:text-white uppercase tracking-tight">
              SKILLS &amp; PROFICIENCIES<span className="text-[#00f0ff]">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400">
            A comprehensive overview of programming languages, web frameworks, machine learning tooling,
            and software practices I use to engineer modern digital platforms.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-2 border-b border-black/10 dark:border-white/10">
          {skillGroups.map((group, index) => {
            const Icon = categoryIcons[index % categoryIcons.length];
            const isActive = activeTab === index;
            return (
              <button
                key={group.title}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105"
                    : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{group.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skillGroups[activeTab].items.map((skill) => (
            <div
              key={skill.name}
              className="group p-5 rounded-2xl bg-[#ffffff] dark:bg-[#121212] border border-black/10 dark:border-white/10 hover:border-[#00f0ff] shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center font-mono font-black text-sm text-[#0284c7] dark:text-[#00f0ff] group-hover:scale-110 transition-transform">
                  {skill.mark}
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-black dark:text-white group-hover:text-black dark:group-hover:text-white">
                    {skill.name}
                  </h4>
                  <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                    Production Verified
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#0284c7] dark:text-[#00f0ff] opacity-80 group-hover:opacity-100 font-mono">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
