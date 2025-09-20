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
    <article className="group rounded-lg border border-foreground/10 p-5 hover:border-accent/50 transition-colors flex flex-col h-full">
      <div className="relative w-full h-48 rounded-md overflow-hidden mb-4">
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-semibold tracking-tight text-lg group-hover:text-accent transition-colors mb-2">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-foreground/70 flex-grow">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 bg-accent/10 rounded-full text-accent-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-4">
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm text-foreground/80 hover:text-accent transition-colors flex items-center"
          onClick={() => trackProjectClick("Project Case Study Click")}
        >
          Case Study ↗
        </Link>
        {project.githubLink && (
          <Link
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-foreground/80 hover:text-accent transition-colors flex items-center"
            onClick={() => trackProjectClick("Project GitHub Click")}
          >
            GitHub ↗
          </Link>
        )}
        {project.liveDemoLink && (
          <Link
            href={project.liveDemoLink}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-foreground/80 hover:text-accent transition-colors flex items-center"
            onClick={() => trackProjectClick("Project Live Demo Click")}
          >
            Live Demo ↗
          </Link>
        )}
      </div>
    </article>
  );
}