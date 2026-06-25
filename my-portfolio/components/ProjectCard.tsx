"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { usePlausible } from "next-plausible";
import {
  ArrowRightIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export default function ProjectCard({ project }: { project: Project }) {
  const plausible = usePlausible();
  const stackRationale = (project.whyThisStack ?? []).slice(0, 2);
  const editorialTakeaway =
    project.editorialTakeaway ?? project.architecture[0] ?? "";

  const trackProjectClick = (eventName: string) => {
    plausible(eventName, { props: { project: project.title } });
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-accent-primary/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-accent-secondary/50 hover:bg-white/[0.085] hover:shadow-accent-secondary/15 sm:min-h-[390px] sm:p-6">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent-primary/20 blur-3xl transition duration-500 group-hover:bg-cyan-400/20" />
      <div className="absolute -bottom-20 left-6 h-36 w-36 rounded-full bg-accent-secondary/10 blur-3xl transition duration-500 group-hover:bg-accent-primary/20" />

      <div className="relative mb-6 flex items-center justify-between gap-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${project.accent} text-2xl font-black text-white shadow-lg shadow-accent-primary/20`}>
          {project.title
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-foreground-secondary">
          <Squares2X2Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {project.category}
        </span>
      </div>

      <h3 className="relative text-xl font-bold tracking-tight text-foreground">
        {project.title}
      </h3>
      <p className="relative mt-3 text-sm leading-6 text-foreground-secondary">
        {project.description}.
      </p>
      <div className="relative mt-4 border-l-2 border-accent-secondary/40 pl-4">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent-secondary">
          Editorial takeaway
        </p>
        <p className="mt-2 text-sm leading-7 text-foreground-secondary italic">
          {editorialTakeaway}
        </p>
      </div>
      <p className="relative mt-4 flex-grow rounded-xl border border-accent-primary/20 bg-accent-primary/10 p-3 text-sm leading-6 text-foreground">
        {project.problem}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-foreground-secondary"
          >
            {tech}
          </span>
        ))}
      </div>

      {stackRationale.length > 0 && (
        <div className="relative mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent-secondary">
            Why this stack
          </p>
          <div className="mt-3 space-y-3">
            {stackRationale.map((choice) => (
              <div key={choice.tech}>
                <p className="text-sm font-semibold text-foreground">{choice.tech}</p>
                <p className="mt-1 text-sm leading-6 text-foreground-secondary">
                  {choice.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
        <Link
          href={`/projects/${project.slug}`}
          className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r ${project.accent} px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-primary/20 transition hover:scale-[1.02] hover:shadow-accent-secondary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary sm:flex-none`}
          onClick={() => trackProjectClick("Project Case Study Click")}
        >
          Learn More
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
        {project.githubLink && (
          <Link
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent-primary/60 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary sm:flex-none"
            onClick={() => trackProjectClick("Project GitHub Click")}
          >
            <CodeBracketIcon className="h-4 w-4" aria-hidden="true" />
            View Code
          </Link>
        )}
        {project.liveDemoLink && (
          <Link
            href={project.liveDemoLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent-secondary/60 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary sm:flex-none"
            onClick={() => trackProjectClick("Project Live Demo Click")}
          >
            <RocketLaunchIcon className="h-4 w-4" aria-hidden="true" />
            Live Demo
          </Link>
        )}
      </div>
    </article>
  );
}
