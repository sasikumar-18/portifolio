export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  relation: string;
  tags: string[];
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. K. Ramanathan",
    role: "Senior Project Advisor",
    organization: "JNTUA Affiliated Engineering Institution",
    quote:
      "Sasikumar demonstrates exceptional rigor in object-oriented design and computer science fundamentals. His ability to architect end-to-end full-stack applications with solid data structure choices made his technical capstones stand out.",
    relation: "Academic Mentor & Department Lead",
    tags: ["Full-Stack", "DSA", "System Design"],
  },
  {
    id: "2",
    name: "A. Verma",
    role: "ML Research Lead",
    organization: "Technex IIT (BHU) & ElSystems Technologies",
    quote:
      "During his internship, Sasikumar developed machine learning models with impressive predictive accuracy. He quickly mastered OpenCV pipelines for real-time face recognition and worked seamlessly within our agile team sprints.",
    relation: "Industry Internship Mentor",
    tags: ["Machine Learning", "OpenCV", "Python"],
  },
  {
    id: "3",
    name: "P. R. Sharma",
    role: "Technical Lead",
    organization: "VaultofCodes Web Development Lab",
    quote:
      "Sasikumar's dedication to clean frontend design and resilient REST APIs in Node.js and React was evident in every sprint. He consistently met milestones ahead of schedule with thoroughly tested code.",
    relation: "Web Engineering Supervisor",
    tags: ["React.js", "Node.js", "REST APIs"],
  },
  {
    id: "4",
    name: "Infosys Foundation Evaluator",
    role: "Technical Assessor",
    organization: "Infosys Springboard Certification Program",
    quote:
      "Completed Python Full-Stack Development with distinction. Strong mastery of relational schemas, API design patterns, and responsive UI principles.",
    relation: "Certification Review",
    tags: ["Python Full-Stack", "Databases", "Agile"],
  },
];
