import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-lg border border-foreground/10 p-5 hover:border-accent/50 transition-colors">
      <h3 className="font-semibold tracking-tight group-hover:text-accent transition-colors">
        {project.link ? (
          <Link href={project.link} target="_blank" rel="noreferrer">
            {project.title}
          </Link>
        ) : (
          project.title
        )}
      </h3>
      <p className="mt-1 text-sm text-foreground/70">{project.description}</p>
      {project.link && (
        <p className="mt-3 text-xs text-accent/80">Visit ↗</p>
      )}
    </article>
  );
}