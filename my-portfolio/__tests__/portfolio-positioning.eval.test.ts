import { homepageStackGroups, skillCategories } from "../lib/technologies";
import { projects } from "../lib/projects";

describe("portfolio positioning eval", () => {
  test("software engineering story includes backend, frontend/mobile, and data/infrastructure lanes", () => {
    expect(homepageStackGroups.map((group) => group.label)).toEqual([
      "Backend",
      "Frontend & Mobile",
      "Data & Infrastructure",
    ]);
  });

  test("Java and Spring Boot are represented without claiming Spring Boot on the plain Java project", () => {
    const skillItems = skillCategories.flatMap((category) => category.items);
    const javaProject = projects.find((project) => project.slug === "java-from-scratch");

    expect(skillItems).toEqual(expect.arrayContaining(["Java", "Spring Boot"]));
    expect(javaProject?.techStack).toEqual(["Java"]);
  });
});
