import { getProjectBySlug, projects } from "../lib/projects";

// Authoritative project -> GitHub repository mappings. The exact strings matter:
// capitalization, underscores, and hyphens differ per repo and must be preserved.
const GITHUB_REPO_MAPPINGS: { slug: string; title: string; githubLink: string }[] = [
  { slug: "polling-app", title: "Polling App", githubLink: "https://github.com/BrianBett125/Polling-App" },
  { slug: "learning-log", title: "Learning Log", githubLink: "https://github.com/BrianBett125/Learning_Log" },
  { slug: "skillup", title: "SkillUp", githubLink: "https://github.com/BrianBett125/skillup" },
  { slug: "nail-it", title: "Nail It", githubLink: "https://github.com/BrianBett125/Nail_It" },
  { slug: "python-projects", title: "Python Projects", githubLink: "https://github.com/BrianBett125/python-projects" },
];

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

  test.each(GITHUB_REPO_MAPPINGS)(
    "maps $title to its authoritative repository",
    ({ slug, title, githubLink }) => {
      const project = getProjectBySlug(slug);

      expect(project).toBeDefined();
      expect(project?.title).toBe(title);
      // Exact-string check: guards capitalization, underscores, and hyphens.
      expect(project?.githubLink).toBe(githubLink);
      // No accidental surrounding whitespace on the URL.
      expect(project?.githubLink).toBe(project?.githubLink?.trim());
    }
  );

  test("every repository link points at BrianBett125 over https", () => {
    const linked = projects.filter((project) => project.githubLink);

    expect(linked.length).toBeGreaterThan(0);
    for (const project of linked) {
      expect(project.githubLink).toMatch(
        /^https:\/\/github\.com\/BrianBett125\/[\w.-]+$/
      );
    }
  });

  test("does not duplicate project slugs", () => {
    const slugs = projects.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("does not duplicate repository links", () => {
    const links = projects
      .map((project) => project.githubLink)
      .filter((link): link is string => Boolean(link));

    expect(new Set(links).size).toBe(links.length);
  });
});
