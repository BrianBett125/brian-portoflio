export type Project = {
  slug: string;
  title: string;
  description: string;
  whyItMatters: string;
  techStack: string[];
  solution: string;
  githubLink?: string;
  liveDemoLink?: string;
};

export const projects: Project[] = [
  {
    slug: "learning-log",
    title: "Learning Log",
    description: "Personal knowledge management app",
    whyItMatters: "Most knowledge is lost because it's never written down",
    techStack: ["Python", "Django", "SQLite", "Bootstrap"],
    solution:
      "Learning Log gives users a dedicated place to capture what they are studying, organize entries, and return to their own notes when they need them.",
  },
  {
    slug: "skillup",
    title: "SkillUp",
    description: "Structured learning platform for developers",
    whyItMatters: "Most devs plateau after bootcamp",
    techStack: ["Python", "PostgreSQL"],
    solution:
      "SkillUp focuses developer learning into a structured platform so growth can continue beyond one-off tutorials and fragmented practice.",
  },
  {
    slug: "nail-it",
    title: "Nail It",
    description: "Construction inventory management system",
    whyItMatters: "On-site material losses are silent budget killers",
    techStack: ["HTML", "CSS", "JavaScript"],
    solution:
      "Nail It brings inventory tracking closer to construction site operations, helping teams keep better visibility into materials before losses become expensive.",
  },
  {
    slug: "polling-app",
    title: "Polling App",
    description: "Real-time AI-native polling platform",
    whyItMatters: "Frictionless feedback at the speed of a QR scan",
    techStack: ["Next.js", "TypeScript", "Supabase"],
    solution:
      "Polling App reduces the distance between asking a question and collecting useful feedback through a fast, real-time polling flow.",
  },
  {
    slug: "python-projects",
    title: "Python Projects",
    description: "Collection of automation tools and scripts",
    whyItMatters: "Real problems deserve real solutions",
    techStack: ["Python", "Docker"],
    solution:
      "Python Projects groups practical automation work into a focused collection of scripts and tools built around real operational problems.",
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
