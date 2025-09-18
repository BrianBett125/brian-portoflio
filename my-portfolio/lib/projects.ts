export type Project = {
  slug: string;
  title: string;
  description: string;
  link?: string;
};

export async function getProjects(): Promise<Project[]> {
  // In a real app, fetch from a CMS or database. For now return static items.
  return [
    {
      slug: "project-one",
      title: "Project One",
      description: "A brief description of a project you’re proud of.",
      link: "https://example.com",
    },
    {
      slug: "project-two",
      title: "Project Two",
      description: "Another highlight showcasing your skills.",
    },
  ];
}