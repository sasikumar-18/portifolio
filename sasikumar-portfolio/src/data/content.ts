export type SkillGroup = {
  title: string;
  icon: "code" | "layout" | "server" | "database" | "wrench";
  items: { name: string; mark: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: "code",
    items: [
      { name: "Python", mark: "Py" },
      { name: "Java", mark: "Jv" },
      { name: "C++", mark: "C+" },
      { name: "JavaScript", mark: "JS" },
    ],
  },
  {
    title: "Web",
    icon: "layout",
    items: [
      { name: "HTML", mark: "H5" },
      { name: "CSS", mark: "C3" },
      { name: "React.js", mark: "Re" },
      { name: "Node.js", mark: "No" },
      { name: "REST APIs", mark: "Ap" },
    ],
  },
  {
    title: "Databases",
    icon: "database",
    items: [
      { name: "MySQL", mark: "My" },
      { name: "MongoDB", mark: "Mg" },
    ],
  },
  {
    title: "AI/ML & Data",
    icon: "server",
    items: [
      { name: "Scikit-learn", mark: "Sk" },
      { name: "OpenCV", mark: "CV" },
      { name: "Data Analysis", mark: "DA" },
      { name: "Data Processing", mark: "DP" },
      { name: "Data Visualization", mark: "DV" },
    ],
  },
  {
    title: "Tools & Practices",
    icon: "wrench",
    items: [
      { name: "Git", mark: "Gt" },
      { name: "GitHub", mark: "Gh" },
      { name: "Agile", mark: "Ag" },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  kind: "shop" | "medicine" | "house" | "api" | "vision";
  status: string;
  summary: string;
  problem: string;
  features: string[];
  stack: string[];
  contribution: string;
  implemented?: string[];
  planned?: string[];
  results?: string;
  note?: string;
  demo: string;
  repo: string;
};

export const projects: Project[] = [
  {
    id: "ecommerce-fullstack",
    title: "Full-Stack E-Commerce Website",
    kind: "shop",
    status: "Full-Stack Web",
    summary:
      "Built a shopping platform with user authentication, cart and payment simulation. Developed REST APIs in Node.js, improving data-handling efficiency.",
    problem:
      "Online shoppers need seamless browsing, persistent cart workflows, instant search, and dependable authentication with fast REST APIs.",
    features: [
      "User authentication and profile management",
      "Dynamic shopping cart and payment simulation",
      "REST APIs developed using Node.js and Express",
      "Optimized MongoDB data schemas for high performance",
    ],
    stack: ["React.js", "Node.js", "Express", "MongoDB"],
    contribution:
      "Designed and developed the frontend using React.js, implemented RESTful API endpoints with Node.js and Express, and managed data persistence with MongoDB.",
    results: "Improved data-handling efficiency and provided an end-to-end shopping experience.",
    demo: "https://github.com/sasikumar-18",
    repo: "https://github.com/sasikumar-18",
  },
  {
    id: "face-recognition-attendance",
    title: "AI-Based Face Recognition Attendance System",
    kind: "medicine",
    status: "90% ML Accuracy",
    summary:
      "Built a real-time face detection and recognition application using Haar cascades and ML models, achieving 90% accuracy with SQL storage.",
    problem:
      "Manual attendance tracking is slow, error-prone, and susceptible to proxy attendance in academic and workplace settings.",
    features: [
      "Real-time video feed face detection & feature extraction",
      "Applied Haar cascades & Machine Learning models for identification",
      "90% face recognition accuracy using OpenCV",
      "Automated attendance records logged into SQL database",
    ],
    stack: ["Python", "SQL", "OpenCV", "Machine Learning"],
    contribution:
      "Engineered the computer vision pipeline using OpenCV, trained classifier models for facial recognition, and connected real-time attendance logging to SQL database.",
    results: "Achieved 90% identification accuracy during real-time testing.",
    demo: "https://github.com/sasikumar-18",
    repo: "https://github.com/sasikumar-18",
  },
  {
    id: "house-price-prediction",
    title: "House Price Prediction Platform",
    kind: "house",
    status: "85% Accuracy | 99% Uptime",
    summary:
      "Built a regression model predicting house prices with 85% accuracy; deployed as a Flask API on AWS with 99% uptime.",
    problem:
      "Estimating accurate real-estate property valuations requires data-driven predictive modeling rather than subjective guesswork.",
    features: [
      "Exploratory data analysis, cleaning and feature processing",
      "Regression model predicting property prices with 85% accuracy",
      "Lightweight Flask REST API serving predictions",
      "Cloud deployment on AWS maintaining 99% uptime",
    ],
    stack: ["Python", "Scikit-learn", "Flask", "AWS"],
    contribution:
      "Conducted data analysis and preprocessing, trained and optimized regression models using Scikit-learn, developed the Flask API, and deployed the solution on AWS.",
    results: "Delivered 85% prediction accuracy and 99% API uptime on AWS.",
    demo: "https://github.com/sasikumar-18",
    repo: "https://github.com/sasikumar-18",
  },
  {
    id: "cloud-rest-api-hub",
    title: "Cloud REST API & Microservices Hub",
    kind: "api",
    status: "Production Ready",
    summary:
      "Architected a scalable RESTful microservice backend with JWT role-based authentication, rate limiting, and automated health checks.",
    problem:
      "Modern web clients require low-latency API contracts with granular authorization, input sanitization, and structured error responses.",
    features: [
      "JWT-based bearer authentication and refresh tokens",
      "Express middleware for request validation and rate limiting",
      "Structured error handling and logging",
      "MongoDB aggregation pipelines for rapid querying",
    ],
    stack: ["Node.js", "Express", "MongoDB", "REST APIs"],
    contribution:
      "Engineered core routing pipelines, implemented encryption middleware, and documented endpoints with clear request/response schemas.",
    results: "Sub-50ms query responses and 100% test coverage on critical endpoints.",
    demo: "https://github.com/sasikumar-18",
    repo: "https://github.com/sasikumar-18",
  },
  {
    id: "vision-analytics-pipeline",
    title: "Computer Vision Analytics Pipeline",
    kind: "vision",
    status: "Real-time AI",
    summary:
      "Engineered an automated video processing pipeline in Python and OpenCV for contour extraction, edge analysis, and tracking metrics.",
    problem:
      "High-frame-rate computer vision systems require optimized image matrix transformations to prevent memory bottlenecks.",
    features: [
      "Multi-frame background subtraction and contour tracking",
      "Haar cascade and morphological filtering pipelines",
      "Automated timestamp and metric aggregation",
      "Modular Python architecture for easy extension",
    ],
    stack: ["Python", "OpenCV", "NumPy", "Data Processing"],
    contribution:
      "Developed image matrix manipulation functions in NumPy and integrated real-time analytics overlay onto video outputs.",
    results: "Sustained 60 FPS real-time processing on standard HD webcam feeds.",
    demo: "https://github.com/sasikumar-18",
    repo: "https://github.com/sasikumar-18",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string[];
};

export const experiences: Experience[] = [
  {
    company: "Technex IIT (BHU) Varanasi & ElSystems Technologies",
    role: "Machine Learning with Python Intern",
    period: "Aug 2025 – Nov 2025",
    description: [
      "Developed machine learning models in Python to analyze data and improve predictive accuracy of project outcomes.",
      "Collaborated with cross-functional teams to implement algorithms, improving system performance and user engagement.",
    ],
  },
  {
    company: "VaultofCodes",
    role: "Web Development Intern",
    period: "Internship",
    description: [
      "Built frontend features and worked on real-world use cases involving CRUD operations and form validations.",
      "Strengthened debugging, logical thinking and coding best practices.",
    ],
  },
];

export const timeline = [
  {
    title: "B.Tech, Information Technology",
    place: "Sri Venkateswara College of Engineering & Technology (JNTUA), Chittoor, AP | 2023 – 2026",
    text: "Building strong foundations in software engineering, full-stack web applications, machine learning, and data structures.",
  },
  {
    title: "Diploma, Electrical and Electronics Engineering",
    place: "Sri Venkateswara Government Polytechnic College, Tirupati, AP | 2020 – 2023",
    text: "Completed diploma education focusing on engineering principles, circuit analysis, and analytical problem-solving.",
  },
  {
    title: "Secondary School Education",
    place: "Holi Angels English Medium High School, Udayagiri, AP | 2019 – 2020",
    text: "Completed high school with strong academic fundamentals in mathematics, science, and foundational computing.",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  details?: string;
};

export const certifications: Certification[] = [
  {
    title: "Python Full Stack Development",
    issuer: "Infosys Foundation",
    date: "Certified",
    details: "Full stack web development covering Python, frontend architectures, backend APIs, and database integration.",
  },
  {
    title: "Basics of Python",
    issuer: "Infosys Springboard",
    date: "Feb 2025",
    details: "Core Python programming fundamentals, data structures, and algorithmic logic.",
  },
  {
    title: "SOAR: AI to Aspire",
    issuer: "HCL Technologies",
    date: "Oct 2025",
    details: "Artificial Intelligence concepts, machine learning workflows, and practical applications.",
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte",
    date: "Aug 2025",
    details: "Data analysis, analytical problem solving, data processing, and dashboard proposals.",
  },
  {
    title: "UI/UX Developer",
    issuer: "L&T EduTech",
    date: "Mar 2024",
    details: "User interface design, responsive layouts, user experience principles, and frontend execution.",
  },
  {
    title: "MongoDB Essentials",
    issuer: "L&T EduTech",
    date: "Aug 2024",
    details: "NoSQL document database design, CRUD operations, indexing, and aggregation pipelines.",
  },
];

export const spokenLanguages = [
  { name: "English", level: "Professional Working Proficiency" },
  { name: "Telugu", level: "Native / Bilingual Proficiency" },
];

export const professionalSummary =
  "Entry-level Software Engineer (B.Tech, Information Technology, JNTUA) with hands-on experience building full-stack web applications and machine learning solutions. Skilled in Python, Java, JavaScript, React.js, Node.js and REST API development, with a strong foundation in object-oriented design, data structures and algorithms. Eager to contribute to production software and keep growing as an engineer.";
