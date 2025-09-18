import { getProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects",
  description: "A selection of projects by Brian Bett",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <section className="py-16">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article key={project.slug} className="rounded-lg border border-foreground/10 p-4">
            <h2 className="font-medium">{project.title}</h2>
            <p className="text-sm text-foreground/70">{project.description}</p>
            {project.link && (
              <a className="text-sm underline mt-2 inline-block" href={project.link} target="_blank" rel="noreferrer">
                View project
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}