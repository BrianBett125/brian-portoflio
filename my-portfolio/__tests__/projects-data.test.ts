import { getProjectBySlug, projects } from "../lib/projects";

describe("projects data", () => {
  test("includes Java From Scratch with the correct repository link", () => {
    const project = getProjectBySlug("java-from-scratch");

    expect(project).toBeDefined();
    expect(project).toMatchObject({
      title: "Java From Scratch",
      githubLink: "https://github.com/BrianBett125/java-from-scratch",
      techStack: ["Java"],
    });
    expect(project?.description).toContain("progressive Java learning repository");
  });

  test("does not duplicate project slugs", () => {
    const slugs = projects.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
