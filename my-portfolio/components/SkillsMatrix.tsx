"use client";

import { useState } from "react";
import {
  CodeBracketSquareIcon,
  CommandLineIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline";

type Category = {
  id: string;
  label: string;
  icon: (typeof ServerStackIcon);
  items: string[];
};

const categories: Category[] = [
  {
    id: "core",
    label: "Core Stack",
    icon: ServerStackIcon,
    items: [
      "Python",
      "Django",
      "Spring Boot",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Next.js",
      "TypeScript",
      "React",
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: CodeBracketSquareIcon,
    items: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind CSS"],
  },
  {
    id: "tooling",
    label: "Tools & Ops",
    icon: CommandLineIcon,
    items: ["Docker", "Supabase", "Git", "Linux", "REST APIs", "MikroTik"],
  },
];

export default function SkillsMatrix() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <div className="bento-card rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
        {categories.map((category) => {
          const Icon = category.icon;
          const selected = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              id={`skills-tab-${category.id}`}
              aria-selected={selected}
              aria-controls={`skills-panel-${category.id}`}
              onClick={() => setActiveId(category.id)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary ${
                selected
                  ? "border-accent-primary/60 bg-accent-primary/15 text-foreground"
                  : "border-white/10 bg-white/[0.05] text-foreground-secondary hover:border-accent-primary/50 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0 text-accent-secondary" aria-hidden="true" />
              {category.label}
            </button>
          );
        })}
      </div>

      <div
        key={active.id}
        id={`skills-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`skills-tab-${active.id}`}
        className="mt-5 flex flex-wrap gap-2"
      >
        {active.items.map((item) => (
          <span
            key={item}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm font-semibold text-foreground-secondary transition hover:-translate-y-0.5 hover:border-accent-primary/50 hover:bg-accent-primary/10 hover:text-foreground"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary/70 transition group-hover:bg-accent-tertiary" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
