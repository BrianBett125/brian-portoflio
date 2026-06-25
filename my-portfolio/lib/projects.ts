export type Project = {
  slug: string;
  title: string;
  description: string;
  problem: string;
  techStack: string[];
  whyThisStack: {
    tech: string;
    reason: string;
  }[];
  solution: string;
  impact: string;
  architecture: string[];
  category: string;
  accent: string;
  githubLink?: string;
  liveDemoLink?: string;
};

export const projects: Project[] = [
  {
    slug: "learning-log",
    title: "Learning Log",
    description: "Personal knowledge management app",
    problem: "Most knowledge is lost because it is never written down in a structure that is easy to return to.",
    techStack: ["Python", "Django", "SQLite", "Bootstrap"],
    whyThisStack: [
      {
        tech: "Django",
        reason: "Fits a data-heavy CRUD workflow with routing, models, templates, and form handling in one coherent backend framework.",
      },
      {
        tech: "SQLite",
        reason: "Enough relational structure for a focused learning record without adding database operations overhead too early.",
      },
      {
        tech: "Bootstrap",
        reason: "Provides quick responsive structure so the project can focus on the learning workflow and data model.",
      },
    ],
    solution:
      "Learning Log gives users a dedicated place to capture what they are studying, organize entries, and return to their own notes when they need them.",
    impact:
      "Turns fragmented study notes into a searchable learning record that supports review and continued progress.",
    architecture: [
      "Django application organized around topics and learning entries.",
      "SQLite persistence for local relational data storage.",
      "Bootstrap interface for structured, responsive views.",
    ],
    category: "Learning system",
    accent: "from-violet-500 via-blue-500 to-cyan-400",
  },
  {
    slug: "skillup",
    title: "SkillUp",
    description: "Structured learning platform for developers",
    problem: "Developers can plateau when learning is scattered across tutorials, exercises, and disconnected practice.",
    techStack: ["Python", "PostgreSQL"],
    whyThisStack: [
      {
        tech: "Python",
        reason: "Keeps platform logic readable while supporting fast iteration on learning workflows and progression rules.",
      },
      {
        tech: "PostgreSQL",
        reason: "A better fit for durable structured learning data where relationships, querying, and consistency matter.",
      },
    ],
    solution:
      "SkillUp focuses developer learning into a structured platform so growth can continue beyond one-off tutorials and fragmented practice.",
    impact:
      "Creates a clearer path for continued developer growth by organizing learning around a persistent platform.",
    architecture: [
      "Python backend for learning workflow and platform logic.",
      "PostgreSQL relational database for durable structured learning data.",
      "Platform model focused on organizing developer progression.",
    ],
    category: "Developer platform",
    accent: "from-blue-500 via-cyan-400 to-emerald-400",
  },
  {
    slug: "nail-it",
    title: "Nail It",
    description: "Construction inventory management system",
    problem: "Construction materials can be difficult to track once they move through active site operations.",
    techStack: ["HTML", "CSS", "JavaScript"],
    whyThisStack: [
      {
        tech: "HTML",
        reason: "Keeps the inventory workflow accessible in a browser without forcing a heavier application layer.",
      },
      {
        tech: "CSS",
        reason: "Supports a focused operational interface where scanning and clarity matter more than decorative complexity.",
      },
      {
        tech: "JavaScript",
        reason: "Handles client-side inventory interactions close to the user workflow.",
      },
    ],
    solution:
      "Nail It brings inventory tracking closer to construction site operations, helping teams keep better visibility into materials before losses become expensive.",
    impact:
      "Improves operational visibility for construction inventory so teams can reason about materials before losses compound.",
    architecture: [
      "Browser-based interface built with HTML, CSS, and JavaScript.",
      "Client-side interaction layer for inventory workflows.",
      "Focused UI surface for tracking construction-site materials.",
    ],
    category: "Operations tool",
    accent: "from-cyan-400 via-blue-500 to-violet-500",
  },
  {
    slug: "polling-app",
    title: "Polling App",
    description: "Real-time AI-native polling platform",
    problem: "Collecting feedback is often slower than the moment when the feedback is most useful.",
    techStack: ["Next.js", "TypeScript", "Supabase"],
    whyThisStack: [
      {
        tech: "Next.js",
        reason: "Combines fast product routing with a modern React interface for a feedback workflow that needs low friction.",
      },
      {
        tech: "TypeScript",
        reason: "Protects polling state and payload shapes as the real-time flow changes.",
      },
      {
        tech: "Supabase",
        reason: "Provides real-time data behavior without building the entire event pipeline from scratch.",
      },
    ],
    solution:
      "Polling App reduces the distance between asking a question and collecting useful feedback through a fast, real-time polling flow.",
    impact:
      "Supports faster feedback loops by combining a web experience with real-time data handling.",
    architecture: [
      "Next.js application for the polling user experience.",
      "TypeScript for typed application logic.",
      "Supabase backend for real-time data workflows.",
    ],
    category: "Real-time platform",
    accent: "from-fuchsia-500 via-violet-500 to-blue-500",
  },
  {
    slug: "python-projects",
    title: "Python Projects",
    description: "Collection of automation tools and scripts",
    problem: "Repeated operational tasks cost time and attention when they are handled manually.",
    techStack: ["Python", "Docker"],
    whyThisStack: [
      {
        tech: "Python",
        reason: "Strong fit for automation scripts where readability, standard libraries, and quick iteration matter.",
      },
      {
        tech: "Docker",
        reason: "Makes repeated automation more dependable by reducing environment drift.",
      },
    ],
    solution:
      "Python Projects groups practical automation work into a focused collection of scripts and tools built around real operational problems.",
    impact:
      "Captures reusable automation patterns that reduce manual effort across practical workflows.",
    architecture: [
      "Python scripts and tools for task automation.",
      "Docker-based packaging where repeatable runtime environments are useful.",
      "Collection structure centered on practical operational problems.",
    ],
    category: "Automation",
    accent: "from-emerald-400 via-cyan-400 to-blue-500",
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
