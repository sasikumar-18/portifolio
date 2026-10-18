import { useState } from "react";
import { ArrowRight, Mail, ExternalLink, Github, Phone, Linkedin, Download, Sparkles, X, CheckCircle2, Send, Code2, Database, ShieldCheck } from "lucide-react";
import { personalInfo, projects, technicalSkills, internships, education } from "../../data/portfolioData";

interface HeroSectionProps {
  initialModal?: "about" | "skills" | "projects" | "contact" | null;
  onCloseModal?: () => void;
}

export default function HeroSection({ initialModal, onCloseModal }: HeroSectionProps) {
  const [activeModal, setActiveModal] = useState<"about" | "skills" | "projects" | "contact" | null>(
    initialModal || null
  );

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  // Sync with prop if provided
  const modalToShow = initialModal !== undefined ? initialModal : activeModal;

  const handleClose = () => {
    setActiveModal(null);
    if (onCloseModal) onCloseModal();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setSentSuccess(true);
    setTimeout(() => {
      window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${contactName}`
      )}&body=${encodeURIComponent(`From: ${contactName} (${contactEmail})\n\n${contactMessage}`)}`;
    }, 700);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 z-10 pointer-events-none select-none">
      {/* Upper Space: lets the colossal black hole command the upper-middle canvas */}
      <div className="flex-1 min-h-[30vh] sm:min-h-[36vh]" />

      {/* Main Hero Content: Positioned gracefully below the black hole event horizon */}
      <div className="mx-auto max-w-4xl w-full text-center pointer-events-auto space-y-6">
        {/* Subtle Cosmic Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 font-mono text-xs font-semibold text-slate-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse" />
          <span className="tracking-widest uppercase">SINGANABOYINA SASIKUMAR · B.TECH IT JNTUA</span>
        </div>

        {/* Headline Name */}
        <div className="space-y-2">
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            SASIKUMAR
          </h1>

          {/* Subtitle */}
          <h2 className="font-mono text-base sm:text-xl font-bold tracking-widest text-slate-300 uppercase drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
            Full Stack Developer <span className="text-white/40">|</span> Python Engineer
          </h2>
        </div>

        {/* Tagline */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-normal drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)]">
          Building digital experiences beyond boundaries.
        </p>

        {/* CTA Buttons: Explore Projects and Contact Me */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setActiveModal("projects")}
            className="group flex items-center gap-2 rounded-xl border border-white bg-white px-7 py-3.5 font-mono text-xs sm:text-sm font-bold text-black shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all hover:scale-105 hover:bg-slate-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.7)]"
          >
            <span>Explore Projects</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => setActiveModal("contact")}
            className="flex items-center gap-2 rounded-xl border border-white/30 bg-black/75 px-7 py-3.5 font-mono text-xs sm:text-sm font-bold text-white shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all hover:border-white hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            <Mail size={16} />
            <span>Contact Me</span>
          </button>
        </div>

        {/* Quick Social Icons */}
        <div className="flex items-center justify-center gap-3 pt-4 text-slate-400">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/15 bg-black/60 p-2.5 text-slate-300 transition hover:border-white hover:text-white"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/15 bg-black/60 p-2.5 text-slate-300 transition hover:border-white hover:text-white"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="rounded-lg border border-white/15 bg-black/60 p-2.5 text-slate-300 transition hover:border-white hover:text-white"
            title="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href={`tel:${personalInfo.phone}`}
            className="rounded-lg border border-white/15 bg-black/60 p-2.5 text-slate-300 transition hover:border-white hover:text-white"
            title="Phone"
          >
            <Phone size={16} />
          </a>
        </div>
      </div>

      {/* Footer Info line */}
      <div className="mx-auto max-w-6xl w-full flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 pt-8 pointer-events-auto">
        <span>© {new Date().getFullYear()} SINGANABOYINA SASIKUMAR</span>
        <span>ACCRETION HORIZON · MONOCHROME REALTIME 3D</span>
      </div>

      {/* Modals for Projects, Contact, Skills, About */}
      {modalToShow && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md pointer-events-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/20 bg-[#07090e]/95 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(255,255,255,0.15)] text-slate-200"
          >
            {/* Modal Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 grid h-9 w-9 place-items-center rounded-xl border border-white/20 bg-white/5 text-white transition hover:border-white hover:bg-white/15"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Content: Projects */}
            {modalToShow === "projects" && (
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    SELECTED CASE STUDIES
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Featured Projects
                  </h3>
                </div>

                <div className="grid gap-5">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="rounded-2xl border border-white/10 bg-black/60 p-5 space-y-3 transition hover:border-white/30"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h4 className="font-display text-lg font-bold text-white">
                          {proj.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs text-white hover:bg-white hover:text-black transition"
                          >
                            <Github size={12} /> Code
                          </a>
                          <a
                            href={proj.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded-lg bg-white px-3 py-1 font-mono text-xs font-bold text-black hover:bg-slate-200 transition"
                          >
                            <ExternalLink size={12} /> Demo
                          </a>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Content: Contact */}
            {modalToShow === "contact" && (
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    DIRECT COMMUNICATION
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Get in Touch
                  </h3>
                  <p className="text-sm text-slate-300 mt-1">
                    Have an opportunity or project in mind? Reach out directly.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 p-4 transition hover:border-white/30"
                  >
                    <Mail size={18} className="text-white" />
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">Email Address</div>
                      <div className="text-xs font-bold text-white truncate max-w-[200px]">
                        {personalInfo.email}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 p-4 transition hover:border-white/30"
                  >
                    <Phone size={18} className="text-white" />
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">Direct Phone</div>
                      <div className="text-xs font-bold text-white">
                        {personalInfo.phone}
                      </div>
                    </div>
                  </a>
                </div>

                {sentSuccess ? (
                  <div className="rounded-2xl border border-white/20 bg-white/5 p-6 text-center space-y-2">
                    <CheckCircle2 size={32} className="mx-auto text-white" />
                    <h4 className="font-bold text-white text-base">Message Initialized</h4>
                    <p className="text-xs text-slate-400">
                      Your default mail client has opened. Thank you!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-3.5 pt-2">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white placeholder-slate-500 focus:border-white focus:outline-none"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white placeholder-slate-500 focus:border-white focus:outline-none"
                      />
                    </div>
                    <textarea
                      rows={3}
                      required
                      placeholder="Your Message..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white placeholder-slate-500 focus:border-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-white py-3 font-mono text-xs font-bold text-black transition hover:bg-slate-200"
                    >
                      <Send size={14} /> Send Message
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Modal Content: Skills */}
            {modalToShow === "skills" && (
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    TECHNICAL STACK
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Skills &amp; Technologies
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {Object.entries(technicalSkills).map(([cat, list]) => (
                    <div key={cat} className="rounded-2xl border border-white/10 bg-black/60 p-4 space-y-2">
                      <h4 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">
                        {cat.replace(/([A-Z])/g, " $1")}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {list.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Content: About */}
            {modalToShow === "about" && (
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    BACKGROUND &amp; SUMMARY
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    About Singanaboyina Sasikumar
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {personalInfo.summary}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    Education &amp; Qualifications
                  </h4>
                  <div className="space-y-2 text-xs">
                    {education.map((edu) => (
                      <div key={edu.degree} className="flex justify-between border-b border-white/10 pb-2">
                        <div>
                          <div className="font-bold text-white">{edu.degree}</div>
                          <div className="text-slate-400">{edu.institution}</div>
                        </div>
                        <span className="font-mono text-slate-500">{edu.period}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
