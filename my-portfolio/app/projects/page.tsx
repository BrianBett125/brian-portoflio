'use client';

import { getProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedTech, setSelectedTech] = useState("All");
  const [techStacks, setTechStacks] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const allProjects = await getProjects();
      setProjects(allProjects);

      const uniqueTechStacks = Array.from(
        new Set(allProjects.flatMap((p) => p.techStack))
      );
      setTechStacks(["All", ...uniqueTechStacks]);
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedTech === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.techStack.includes(selectedTech))
      );
    }
  }, [selectedTech, projects]);

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

          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl sm:p-6">
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

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0" aria-label="Filter projects by technology">
          {techStacks.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`min-h-10 shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedTech === tech
                  ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg shadow-accent-primary/20"
                  : "border border-white/10 bg-white/[0.06] text-foreground-secondary hover:border-accent-primary/50 hover:text-foreground"
              }`}
              aria-pressed={selectedTech === tech}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
