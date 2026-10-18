import { motion } from "framer-motion";
import { Award, Calendar, GraduationCap, MapPin, School, BookOpen } from "lucide-react";
import { education, certifications } from "../../data/portfolioData";

export default function Education() {
  const degrees = [
    {
      degree: education[0].degree,
      institution: education[0].institution,
      period: education[0].period,
      level: "Undergraduate Degree",
      highlights: [
        "Specialization in Information Technology with coursework in Data Structures & Algorithms, Object-Oriented Design, and Full-Stack Engineering.",
        "Built technical capstone applications including an AI Face Recognition Attendance System and Full-Stack E-Commerce platforms.",
        "Active member of departmental coding symposiums and technical workshops.",
      ],
      icon: GraduationCap,
    },
    {
      degree: education[1].degree,
      institution: education[1].institution,
      period: education[1].period,
      level: "Polytechnic Diploma",
      highlights: [
        "Comprehensive foundations in circuit theory, digital logic, microprocessors, and applied mathematics.",
        "Strengthened analytical problem-solving and structured engineering fundamentals.",
      ],
      icon: School,
    },
    {
      degree: education[2].degree,
      institution: education[2].institution,
      period: education[2].period,
      level: "Secondary School Certificate",
      highlights: [
        "Core focus on Science, Mathematics, and Computer Fundamentals with excellent academic standing.",
      ],
      icon: BookOpen,
    },
  ];

  return (
    <section id="education" className="py-24 sm:py-32 px-6 sm:px-8 relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00f0ff] bg-[#00f0ff]/10 px-3 py-1 rounded-full border border-[#00f0ff]/30">
            05 // ACADEMIC BACKGROUND
          </span>
          <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-black dark:text-white uppercase tracking-tight">
            EDUCATION &amp; DEGREES<span className="text-[#00f0ff]">.</span>
          </h2>
          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400">
            Formal technical education in Information Technology &amp; Engineering, backed by
            continuous certifications from leading industry organizations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Degrees Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {degrees.map((deg, index) => {
            const Icon = deg.icon;
            return (
              <motion.div
                key={deg.degree}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group rounded-3xl bg-[#ffffff] dark:bg-[#121212] border border-black/10 dark:border-white/10 hover:border-[#00f0ff] p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-[#0284c7] dark:text-[#00f0ff] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400">
                      {deg.level}
                    </span>
                  </div>

                  {/* Degree Name & Period */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#0284c7] dark:text-[#00f0ff] font-semibold mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{deg.period}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-black dark:text-white uppercase tracking-tight mb-2 group-hover:text-black dark:group-hover:text-white">
                    {deg.degree}
                  </h3>

                  <p className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-6">
                    {deg.institution}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                    {deg.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#00f0ff] font-bold mt-0.5">&bull;</span>
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Industry Certifications Box */}
        <div className="rounded-3xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 p-8 sm:p-10">
          <div className="flex items-center gap-2.5 mb-8">
            <Award className="w-5 h-5 text-[#00f0ff]" />
            <h3 className="font-display font-bold text-xl text-black dark:text-white uppercase tracking-wide">
              Industry Certifications &amp; Accreditations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="p-4 rounded-2xl bg-[#ffffff] dark:bg-[#121212] border border-black/10 dark:border-white/10 hover:border-[#00f0ff] transition-all flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/15 text-[#0284c7] dark:text-[#00f0ff] flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-black dark:text-white leading-snug">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {cert.issuer} &bull; <span className="font-mono text-[#0284c7] dark:text-[#00f0ff]">{cert.date}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
