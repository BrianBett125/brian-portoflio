export type TechnologyGroup = {
  id: string;
  label: string;
  items: string[];
};

export const skillCategories: TechnologyGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["Java", "Python", "JavaScript", "TypeScript", "Dart"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Spring Boot", "Django", "REST APIs"],
  },
  {
    id: "frontend-mobile",
    label: "Frontend & Mobile",
    items: ["Next.js", "React", "HTML", "CSS", "Bootstrap", "Tailwind CSS", "Flutter"],
  },
  {
    id: "data",
    label: "Data",
    items: ["PostgreSQL", "MySQL", "SQLite", "Supabase"],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    items: ["Docker", "Git", "Linux", "Networking", "MikroTik", "RADIUS", "SNMP"],
  },
];

export const homepageStackGroups: TechnologyGroup[] = [
  {
    id: "backend",
    label: "Backend",
    items: ["Java", "Spring Boot", "Python", "Django", "REST APIs"],
  },
  {
    id: "frontend-mobile",
    label: "Frontend & Mobile",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Dart", "Flutter"],
  },
  {
    id: "data-infra",
    label: "Data & Infrastructure",
    items: ["PostgreSQL", "MySQL", "SQLite", "Supabase", "Docker", "Linux", "Git"],
  },
];
