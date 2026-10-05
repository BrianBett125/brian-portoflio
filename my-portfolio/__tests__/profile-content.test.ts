import { profile } from "../src/content/profile";
import { getProjectBySlug } from "../lib/projects";

describe("recruiter profile content", () => {
  test("contains the supplied identity, availability, and stack", () => {
    expect(profile).toMatchObject({
      name: "Brian Bett Kipkoech",
      headline: "Backend-Focused Full-Stack Engineer",
      availability: "Open to work · Remote-ready · UTC+3",
      email: "brianbett756@gmail.com",
    });
    expect(profile.stack).toEqual(expect.arrayContaining(["Java", "Spring Boot", "Python", "Django", "TypeScript", "React", "Next.js", "PostgreSQL", "Docker"]));
  });

  test("does not publish invented testimonials", () => {
    expect(profile.testimonials).toEqual([]);
  });

  test.each([
    ["skillup", "SkillUp"],
    ["polling-app", "Polling App"],
    ["learning-log", "Learning Log"],
    ["nail-it", "Nail It"],
    ["simple-shell", "Simple Shell"],
    ["internet-billing-system", "Internet Billing System"],
  ])("provides a case study for %s", (slug, title) => {
    expect(getProjectBySlug(slug)).toMatchObject({ title });
    const project = getProjectBySlug(slug);
    expect(project?.myRole).toBeTruthy();
    expect(project?.keyDecisions?.length).toBeGreaterThan(0);
    expect(project?.architecture.length).toBeGreaterThan(0);
  });

  test("keeps private client billing work free of a source link", () => {
    expect(getProjectBySlug("internet-billing-system")?.githubLink).toBeUndefined();
  });
});
