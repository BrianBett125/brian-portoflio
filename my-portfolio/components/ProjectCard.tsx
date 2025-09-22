"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { usePlausible } from "next-plausible";

export default function ProjectCard({ project }: { project: Project }) {
  const plausible = usePlausible();

  const trackProjectClick = (eventName: string) => {
    plausible(eventName, { props: { project: project.title } });
  };

  return (
    <article className="card group p-6 flex flex-col h-full animate-fade-in">
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-5">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
          className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>
      <h3 className="font-bold tracking-tight text-xl mb-3 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent group-hover:from-accent-secondary group-hover:to-accent-tertiary transition-all duration-300">
        {project.title}
      </h3>
      <p className="mt-1 text-foreground-secondary flex-grow">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1.5 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-full text-foreground-secondary font-medium hover:from-accent-primary/20 hover:to-accent-secondary/20 transition-all duration-300"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-foreground/10 flex gap-5">
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm font-medium flex items-center gap-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-accent-primary after:to-accent-secondary hover:after:w-full after:transition-all after:duration-300"
          onClick={() => trackProjectClick("Project Case Study Click")}
        >
          Case Study <span className="transform transition-transform group-hover:translate-x-1">↗</span>
        </Link>
        {project.githubLink && (
          <Link
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium flex items-center gap-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-accent-primary after:to-accent-secondary hover:after:w-full after:transition-all after:duration-300"
            onClick={() => trackProjectClick("Project GitHub Click")}
          >
            GitHub <span className="transform transition-transform group-hover:translate-x-1">↗</span>
          </Link>
        )}
        {project.liveDemoLink && (
          <Link
            href={project.liveDemoLink}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium flex items-center gap-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-accent-primary after:to-accent-secondary hover:after:w-full after:transition-all after:duration-300"
            onClick={() => trackProjectClick("Project Live Demo Click")}
          >
            Live Demo <span className="transform transition-transform group-hover:translate-x-1">↗</span>
          </Link>
        )}
      </div>
    </article>
  );
}