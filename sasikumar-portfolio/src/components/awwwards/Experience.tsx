import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { internships } from "../../data/portfolioData";

export default function Experience() {
  const experiences = [
    {
      role: internships[0].role,
      company: internships[0].company,
      period: internships[0].period,
      type: "Machine Learning Internship",
      stack: ["Python", "OpenCV", "Scikit-learn", "Haar Cascades", "Agile"],
      points: [
        "Developed machine learning models in Python to analyze data and improve predictive accuracy of project outcomes.",
        "Collaborated with cross-functional teams to implement computer vision algorithms and classification pipelines, improving system throughput.",
        "Engineered OpenCV face detection routines achieving 90% real-time identification accuracy.",
      ],
    },
    {
      role: internships[1].role,
      company: internships[1].company,
      period: internships[1].period,
      type: "Web Development Internship",
      stack: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs", "CRUD"],
      points: [
        "Built responsive frontend features and worked on real-world use cases involving dynamic CRUD operations and form validations.",
        "Strengthened debugging, logical thinking, and coding best practices while working closely with senior engineers.",
        "Implemented clean UI component libraries and integrated REST API contracts.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 sm:py-32 px-6 sm:px-8 relative overflow-hidden bg-black/[0.02] dark:bg-white/[0.02]">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00f0ff] bg-[#00f0ff]/10 px-3 py-1 rounded-full border border-[#00f0ff]/30">
            04 // PROFESSIONAL EXPERIENCE
          </span>
          <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-black dark:text-white uppercase tracking-tight">
            WORK &amp; INTERNSHIPS<span className="text-[#00f0ff]">.</span>
          </h2>
          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400">
            Hands-on software development experience across machine learning research,
            full-stack web architecture, and agile product sprints.
          </p>
        </div>
      </div>

      {/* Experience Timeline Grid */}
      <div className="max-w-5xl mx-auto space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group rounded-3xl bg-[#ffffff] dark:bg-[#121212] border border-black/10 dark:border-white/10 hover:border-[#00f0ff] p-7 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Top Row: Period & Role Type */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>{exp.period}</span>
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-[#00f0ff]/15 text-[#0284c7] dark:text-[#00f0ff] border border-[#00f0ff]/30">
                {exp.type}
              </span>
            </div>

            {/* Role & Company */}
            <div className="mb-6">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-black dark:text-white uppercase tracking-tight mb-1 group-hover:text-black dark:group-hover:text-white">
                {exp.role}
              </h3>
              <p className="text-base font-semibold text-[#0284c7] dark:text-[#00f0ff]">
                {exp.company}
              </p>
            </div>

            {/* Deliverables & Bullet Points */}
            <div className="space-y-3 mb-6">
              {exp.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{pt}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mr-2">
                Stack:
              </span>
              {exp.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-black/5 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border border-black/5 dark:border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
