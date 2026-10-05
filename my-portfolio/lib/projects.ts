export type Project = {
  slug: string;
  title: string;
  description: string;
  editorialTakeaway?: string;
  problem: string;
  myRole?: string;
  keyDecisions?: string[];
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
    description: "Turns scattered study notes into a structured, returnable knowledge base",
    editorialTakeaway:
      "The architecture treats recall as a product feature, not a side effect.",
    problem: "Most knowledge is lost because it is never written down in a structure that is easy to return to.",
    myRole: "[TODO: Describe your verified contribution and ownership.]",
    keyDecisions: ["[TODO: Add a real architecture or product decision.]"],
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
    accent: "from-accent-primary via-accent-secondary to-accent-tertiary",
    githubLink: "https://github.com/BrianBett125/Learning_Log",
  },
  {
    slug: "skillup",
    title: "SkillUp",
    description: "Focuses fragmented developer learning into one durable progression platform",
    editorialTakeaway:
      "Progress only compounds when the learning model is durable enough to guide the next step.",
    problem: "Developers can plateau when learning is scattered across tutorials, exercises, and disconnected practice.",
    myRole: "[TODO: Describe your verified contribution and ownership.]",
    keyDecisions: ["[TODO: Add a real architecture or product decision.]"],
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
    accent: "from-accent-primary via-accent-secondary to-accent-tertiary",
    githubLink: "https://github.com/BrianBett125/skillup",
  },
  {
    slug: "nail-it",
    title: "Nail It",
    description: "Keeps construction materials visible before losses turn expensive",
    editorialTakeaway:
      "Operational software has to stay legible in the middle of a noisy workflow.",
    problem: "Construction materials can be difficult to track once they move through active site operations.",
    myRole: "[TODO: Describe your verified contribution and ownership.]",
    keyDecisions: ["[TODO: Add a real architecture or product decision.]"],
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
    accent: "from-accent-primary via-accent-secondary to-accent-tertiary",
    githubLink: "https://github.com/BrianBett125/Nail_It",
  },
  {
    slug: "polling-app",
    title: "Polling App",
    description: "Collapses the gap between asking a question and acting on real-time feedback",
    editorialTakeaway:
      "Real-time feedback only matters when the state model stays clean under pressure.",
    problem: "Collecting feedback is often slower than the moment when the feedback is most useful.",
    myRole: "[TODO: Describe your verified contribution and ownership.]",
    keyDecisions: ["[TODO: Add a real architecture or product decision.]"],
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
    accent: "from-accent-primary via-accent-secondary to-accent-tertiary",
    githubLink: "https://github.com/BrianBett125/Polling-App",
  },
  {
    slug: "java-from-scratch",
    title: "Java From Scratch",
    description:
      "A progressive Java learning repository covering fundamentals, object-oriented programming, and practical coding exercises",
    editorialTakeaway:
      "Strong backend work starts with language fundamentals that make larger systems easier to reason about.",
    problem:
      "Java knowledge becomes fragile when fundamentals, object-oriented design, and practice exercises are learned in disconnected fragments.",
    techStack: ["Java"],
    whyThisStack: [
      {
        tech: "Java",
        reason:
          "Provides a strongly typed foundation for object-oriented programming, backend development, and Spring Boot application work.",
      },
    ],
    solution:
      "Java From Scratch organizes Java fundamentals, object-oriented programming, and practical exercises into a progressive learning repository.",
    impact:
      "Makes Java development practice visible and reviewable while building the foundation for production-oriented backend systems.",
    architecture: [
      "Progressive Java exercises organized around fundamentals and object-oriented programming.",
      "Repository-first structure for reviewing examples, practicing syntax, and strengthening backend language fluency.",
      "Practical coding exercises that support continued Spring Boot and API development growth.",
    ],
    category: "Learning system",
    accent: "from-accent-primary via-accent-secondary to-accent-tertiary",
    githubLink: "https://github.com/BrianBett125/java-from-scratch",
  },
  {
    slug: "simple-shell",
    title: "Simple Shell",
    description: "A shell implementation project focused on command execution and process behavior",
    problem: "[TODO: Describe the actual constraints this shell was built to address.]",
    myRole: "[TODO: Describe your contribution and ownership.]",
    keyDecisions: ["[TODO: Add a verified implementation decision.]"],
    techStack: ["[TODO: Confirm languages and tools]"],
    whyThisStack: [{ tech: "[TODO: Confirm technology]", reason: "[TODO: Explain the project's actual language and systems constraints.]" }],
    solution: "[TODO: Describe implemented shell behavior.]",
    impact: "[TODO: Add a verifiable outcome; remove unsupported metrics.]",
    architecture: ["[TODO: Add the actual command parsing and execution flow.]"],
    category: "Systems programming",
    accent: "from-accent-primary via-accent-secondary to-accent-tertiary",
  },
  {
    slug: "internet-billing-system",
    title: "Internet Billing System",
    description: "Private client work involving a billing workflow and MikroTik integration",
    problem: "[TODO: Describe the client-approved problem statement without disclosing confidential details.]",
    myRole: "[TODO: Describe your verified contribution and ownership.]",
    keyDecisions: ["[TODO: Add client-approved technical decisions.]"],
    techStack: ["[TODO: Add confirmed technologies]"],
    whyThisStack: [{ tech: "[TODO: Confirmed technology]", reason: "[TODO: Add client-approved rationale.]" }],
    solution: "[TODO: Describe the delivered or ongoing work at a client-approved level.]",
    impact: "[TODO: Add a verifiable outcome approved for public sharing.]",
    architecture: ["[TODO: Add a sanitized architecture summary; omit confidential details.]"],
    category: "Private client work",
    accent: "from-accent-primary via-accent-secondary to-accent-tertiary",
  },
  {
    slug: "python-projects",
    title: "Python Projects",
    description: "Packages repeatable operational work into dependable automation tools",
    editorialTakeaway:
      "Automation is mostly a packaging problem: repeatable inputs, predictable runtime, and trustworthy output.",
    problem: "Repeated operational tasks cost time and attention when they are handled manually.",
    myRole: "[TODO: Describe your verified contribution and ownership.]",
    keyDecisions: ["[TODO: Add a real architecture or product decision.]"],
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
    accent: "from-accent-primary via-accent-secondary to-accent-tertiary",
    githubLink: "https://github.com/BrianBett125/python-projects",
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
