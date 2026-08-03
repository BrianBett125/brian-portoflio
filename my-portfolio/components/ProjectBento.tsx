"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { usePlausible } from "next-plausible";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CodeBracketIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

type ProjectBentoProps = {
  projects: Project[];
  /** When true, the first card spans two columns / two rows as the hero tile. */
  featured?: boolean;
};

function initials(title: string) {
  return title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}

/**
 * Asymmetric bento grid for projects. The first tile can be promoted to a
 * feature slot (wider + taller on large screens); the rest fill in around it.
 * Reuses the same accent gradients, category chips, tech pills, and Plausible
 * tracking as ProjectCard, so the two stay visually consistent.
 */
export default function ProjectBento({ projects, featured = false }: ProjectBentoProps) {
  const plausible = usePlausible();

  const track = (project: Project) =>
    plausible("Project Case Study Click", { props: { project: project.title } });

  return (
    <div className="grid auto-rows-[1fr] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => {
        const isFeature = featured && index === 0;

        return (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            onClick={() => track(project)}
            aria-label={`${project.title} case study`}
            className={`bento-card group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary sm:p-6 ${
              isFeature
                ? "sm:col-span-2 lg:row-span-2 lg:min-h-[460px]"
                : ""
            }`}
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent-primary/20 blur-3xl transition duration-500 group-hover:bg-accent-tertiary/25" />

            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <div
                  className={`flex items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${project.accent} font-black text-white shadow-lg shadow-accent-primary/20 ${
                    isFeature ? "h-16 w-16 text-2xl" : "h-12 w-12 text-lg"
                  }`}
                  aria-hidden="true"
                >
                  {initials(project.title)}
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-foreground-secondary">
                  <Squares2X2Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {project.category}
                </span>
              </div>

              <h3
                className={`mt-5 font-black tracking-tight text-foreground ${
                  isFeature ? "text-2xl sm:text-3xl" : "text-xl"
                }`}
              >
                {project.title}
              </h3>
              <p
                className={`mt-3 leading-7 text-foreground-secondary ${
                  isFeature ? "text-base" : "text-sm"
                }`}
              >
                {isFeature ? project.problem : `${project.description}.`}
              </p>

              {isFeature && (
                <p className="mt-4 border-l-2 border-accent-secondary/40 pl-4 text-sm italic leading-7 text-foreground-secondary">
                  {project.editorialTakeaway ?? project.architecture[0] ?? ""}
                </p>
              )}
            </div>

            <div className="relative mt-5">
              <div className="flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
                {project.techStack.slice(0, isFeature ? 6 : 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs font-medium text-foreground-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4 text-sm font-bold">
                <span className="inline-flex items-center gap-1.5 text-accent-secondary transition group-hover:text-accent-tertiary">
                  Case study
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
                {project.githubLink && (
                  <span className="inline-flex items-center gap-1.5 text-foreground-secondary">
                    <CodeBracketIcon className="h-4 w-4" aria-hidden="true" />
                    Code
                  </span>
                )}
                {project.liveDemoLink && (
                  <span className="inline-flex items-center gap-1.5 text-foreground-secondary">
                    <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
                    Live
                  </span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
