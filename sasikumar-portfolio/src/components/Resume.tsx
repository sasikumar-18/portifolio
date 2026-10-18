import { Download, FileText, Mail } from "lucide-react";
import { profile } from "../data/profile";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";

export default function Resume() {
  return (
    <section id="resume" className="section-pad !py-12">
      <Reveal>
        <div className="glass-card relative overflow-hidden rounded-3xl border border-silver/20 bg-[#080916]/95 p-8 sm:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.9)]">
          <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue/15 blur-[100px] pointer-events-none" />
          <div aria-hidden className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-red/15 blur-[100px] pointer-events-none" />

          <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue/20 to-red/20 border border-silver/20 text-blue shadow-[0_0_25px_rgba(0,210,255,0.4)]">
              <FileText size={32} />
            </span>

            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Interested in the complete technical credentials?
              </h2>
              <p className="mt-2 max-w-xl text-silver">
                My resume details B.Tech in IT coursework at JNTUA, verified internship achievements at Technex IIT (BHU) and VaultofCodes, and production repositories.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <MagneticButton href={profile.resume} download strength={18}>
                <span className="btn-primary">
                  <Download size={16} /> Download Resume (PDF)
                </span>
              </MagneticButton>

              <MagneticButton href="#contact" strength={18}>
                <span className="btn-ghost">
                  <Mail size={16} /> Contact Me
                </span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
