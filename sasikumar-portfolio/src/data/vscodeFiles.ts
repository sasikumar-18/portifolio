export type VSCodeFileId =
  | "about"
  | "projects"
  | "skills"
  | "contributions"
  | "contact"
  | "experience"
  | "certifications";

export interface VSCodeFile {
  id: VSCodeFileId;
  name: string;
  extension: "tsx" | "ts" | "json" | "env" | "yml";
  path: string;
  title: string;
  description: string;
}

export const vscodeFiles: VSCodeFile[] = [
  {
    id: "about",
    name: "about.tsx",
    extension: "tsx",
    path: "src/components/about.tsx",
    title: "About Me & Bio",
    description: "Code typing animation and developer profile",
  },
  {
    id: "projects",
    name: "projects.tsx",
    extension: "tsx",
    path: "src/components/projects.tsx",
    title: "Projects & Live Demos",
    description: "Case studies with tech stack, live demos, and repos",
  },
  {
    id: "skills",
    name: "skills.ts",
    extension: "ts",
    path: "src/data/skills.ts",
    title: "Technical Skills Matrix",
    description: "Languages, Web, Databases, AI/ML, and Tools",
  },
  {
    id: "contributions",
    name: "contributions.tsx",
    extension: "tsx",
    path: "src/components/contributions.tsx",
    title: "GitHub Contributions Heatmap",
    description: "52-week activity heatmap, commit streaks, and repos",
  },
  {
    id: "contact",
    name: "contact.env",
    extension: "env",
    path: ".env.production",
    title: "Contact & Communication",
    description: "Email, phone, socials, and message dispatcher",
  },
  {
    id: "experience",
    name: "experience.json",
    extension: "json",
    path: "src/data/experience.json",
    title: "Experience & Education",
    description: "Internships at IIT BHU/ElSystems, VaultofCodes, and JNTUA",
  },
];
