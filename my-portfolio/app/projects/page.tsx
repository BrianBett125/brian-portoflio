import { getProjects } from "@/lib/projects";
import ProjectFilters from "./ProjectFilters";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="relative w-full overflow-hidden px-4 py-12 sm:px-6 lg:py-20">
      <div className="absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-accent-primary/20 blur-3xl" />
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
              Selected systems
            </p>
            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Case studies for practical software systems.
            </h1>
            <p className="text-base leading-8 text-foreground-secondary sm:text-lg">
              Each project is framed by the problem, solution, impact, tech
              stack, and architecture choices visible from the codebase. The
              page reads like a set of engineering field notes rather than a
              simple gallery.
            </p>
          </div>

          <div className="rounded-2xl border border-ui-border/10 bg-ui-surface/[0.055] p-5 backdrop-blur-xl sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-secondary">
              Editorial lens
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground-secondary">
              Read the cards for the decisions underneath the interface: what
              the system protects, where complexity is intentionally held back,
              and why each stack fits the work it carries.
            </p>
          </div>
        </div>

        <ProjectFilters projects={projects} />
      </div>
    </section>
  );
}
