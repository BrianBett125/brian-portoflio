export interface CaseStudy {
  slug: string;
  title: string;
  overview: {
    problem: string;
    solution: string;
    impact: string;
  };
  techStack: string[];
  screenshots: string[];
  githubLink?: string;
  liveDemoLink?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "project-one-case-study",
    title: "Project One Case Study",
    overview: {
      problem: "Users struggled with inefficient data management and slow reporting.",
      solution: "Developed a custom web application with a streamlined data entry system and real-time analytics dashboard.",
      impact: "Improved data accuracy by 30% and reduced reporting time by 50%.",
    },
    techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    screenshots: [
      "/images/case-studies/project-one-screenshot-1.png",
      "/images/case-studies/project-one-screenshot-2.png",
    ],
    githubLink: "https://github.com/yourusername/project-one",
    liveDemoLink: "https://project-one-demo.com",
  },
  {
    slug: "project-two-case-study",
    title: "Project Two Case Study",
    overview: {
      problem: "Existing e-commerce platform had poor user engagement and high bounce rates.",
      solution: "Redesigned the entire user interface, optimized product search, and integrated a personalized recommendation engine.",
      impact: "Increased user engagement by 40% and boosted conversion rates by 25%.",
    },
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    screenshots: [
      "/images/case-studies/project-two-screenshot-1.png",
      "/images/case-studies/project-two-screenshot-2.png",
    ],
    githubLink: "https://github.com/yourusername/project-two",
    liveDemoLink: "https://project-two-demo.com",
  },
  {
    slug: "project-three-case-study",
    title: "Project Three Case Study",
    overview: {
      problem: "Lack of a centralized content management system led to inconsistent branding and slow content updates.",
      solution: "Built a headless CMS using GraphQL and integrated it with a modern frontend framework.",
      impact: "Streamlined content publishing, ensuring brand consistency and reducing content update time by 70%.",
    },
    techStack: ["Gatsby", "GraphQL", "Strapi", "AWS S3"],
    screenshots: [
      "/images/case-studies/project-three-screenshot-1.png",
      "/images/case-studies/project-three-screenshot-2.png",
    ],
    githubLink: "https://github.com/yourusername/project-three",
    liveDemoLink: "https://project-three-demo.com",
  },
];