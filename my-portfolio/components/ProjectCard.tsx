"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { usePlausible } from "next-plausible";

export default function ProjectCard({ project }: { project: Project }) {
  const plausible = usePlausible();

  const trackProjectClick = (eventName: string) => {
    plausible(eventName, { props: { project: project.title } });
  };

  return (
    <article className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-accent-primary/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-accent-primary/40 hover:bg-white/[0.09]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary" />
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-primary/20 blur-3xl transition duration-500 group-hover:bg-accent-tertiary/20" />

      <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-accent-primary/30 to-accent-secondary/20 text-2xl font-black text-white shadow-lg shadow-accent-primary/20">
        {project.title
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)}
      </div>

      <h3 className="text-xl font-bold tracking-tight text-foreground">
        {project.title}
      </h3>
      <p className="mt-3 flex-grow text-sm leading-6 text-foreground-secondary">
        {project.description}.
      </p>
      <p className="mt-4 rounded-xl border border-accent-primary/20 bg-accent-primary/10 p-3 text-sm leading-6 text-foreground">
        {project.whyItMatters}.
      </p>

      <div className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-foreground-secondary"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-primary/20 transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary"
          onClick={() => trackProjectClick("Project Case Study Click")}
        >
          Learn More
        </Link>
        {project.githubLink && (
          <Link
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent-primary/60 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary"
            onClick={() => trackProjectClick("Project GitHub Click")}
          >
            View Code
          </Link>
        )}
        {project.liveDemoLink && (
          <Link
            href={project.liveDemoLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent-secondary/60 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary"
            onClick={() => trackProjectClick("Project Live Demo Click")}
          >
            Live Demo
          </Link>
        )}
      </div>
    </article>
  );
}
