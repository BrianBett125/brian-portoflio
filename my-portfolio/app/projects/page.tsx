'use client';

import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { useState, useEffect } from "react";

export const metadata = {
  title: "Projects",
  description: "A selection of projects and work highlights by Brian Bett.",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
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
    <section className="py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-foreground/70">A selection of work I’ve built and shipped.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {techStacks.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedTech === tech
                  ? "bg-accent text-accent-foreground"
                  : "bg-foreground/10 text-foreground/70 hover:bg-foreground/20"
                } transition-colors`}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}