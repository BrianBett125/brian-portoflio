"use client";

import { useState } from "react";
import ProjectBento from "@/components/ProjectBento";
import type { Project } from "@/lib/projects";

export default function ProjectFilters({ projects }: { projects: Project[] }) {
  const [selectedTech, setSelectedTech] = useState("All");
  const techStacks = ["All", ...Array.from(new Set(projects.flatMap((p) => p.techStack)))];

  const filteredProjects =
    selectedTech === "All"
      ? projects
      : projects.filter((project) => project.techStack.includes(selectedTech));

  return (
    <>
      <div
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
        aria-label="Filter projects by technology"
      >
        {techStacks.map((tech) => (
          <button
            key={tech}
            type="button"
            onClick={() => setSelectedTech(tech)}
            className={`min-h-10 shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary ${
              selectedTech === tech
                ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg shadow-accent-primary/20"
                : "border border-ui-border/10 bg-ui-surface/[0.06] text-foreground-secondary hover:border-accent-primary/50 hover:text-foreground"
            }`}
            aria-pressed={selectedTech === tech}
          >
            {tech}
          </button>
        ))}
      </div>

      <ProjectBento projects={filteredProjects} featured={selectedTech === "All"} />
    </>
  );
}
