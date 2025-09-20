export type Project = {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  githubLink?: string;
  liveDemoLink?: string;
};

export async function getProjects(): Promise<Project[]> {
  // In a real app, fetch from a CMS or database. For now return static items.
  return [
    {
      slug: "project-one",
      title: "Project One",
      description: "A brief description of a project you’re proud of.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
      image: "/images/project-one.png",
      githubLink: "https://github.com/your-username/project-one",
      liveDemoLink: "https://project-one.vercel.app",
    },
    {
      slug: "project-two",
      title: "Project Two",
      description: "Another highlight showcasing your skills.",
      techStack: ["React", "JavaScript", "CSS Modules"],
      image: "/images/project-two.png",
      githubLink: "https://github.com/your-username/project-two",
      liveDemoLink: "https://project-two.vercel.app",
    },
    {
      slug: "project-three",
      title: "Project Three",
      description: "A mobile app project.",
      techStack: ["Flutter", "Dart"],
      image: "/images/project-three.png",
      githubLink: "https://github.com/your-username/project-three",
    },
  ];
}