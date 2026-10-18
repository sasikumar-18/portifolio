import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";
import MagneticButton from "./MagneticButton";
import SmartLink from "./SmartLink";

export default function Footer() {
  const links = [
    { href: profile.github, label: "GitHub", Icon: Github, external: true },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail, external: false },
  ];

  return (
    <footer className="border-t border-silver/10 bg-[#040408] relative z-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-slate-400 sm:flex-row sm:px-8">
        <p className="flex items-center gap-2">
          <span className="font-extrabold text-white">{profile.name}</span>
          <span className="text-slate-600">·</span>
          <span className="text-blue font-mono text-xs">{profile.role}</span>
        </p>

        <ul className="flex items-center gap-2.5">
          {links.map(({ href, label, Icon, external }) => (
            <li key={label}>
              <MagneticButton strength={15}>
                <SmartLink
                  href={href}
                  external={external}
                  label={label}
                  className="glass grid h-10 w-10 place-items-center rounded-xl border border-silver/20 text-white transition hover:border-blue hover:text-blue hover:shadow-[0_0_20px_rgba(0,210,255,0.4)]"
                >
                  <Icon size={17} />
                </SmartLink>
              </MagneticButton>
            </li>
          ))}
        </ul>

        <p className="font-mono text-xs text-slate-500">
          © {new Date().getFullYear()} {profile.name} · 3D PORTFOLIO
        </p>
      </div>
    </footer>
  );
}
