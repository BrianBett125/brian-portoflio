import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/projects";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/projects/${slug}`,
      siteName: "Brian Bett Portfolio",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: project.title,
    description: project.description,
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/projects/${project.slug}`,
    creator: {
      "@type": "Person",
      name: "Brian Bett",
    },
    keywords: project.techStack.join(", "),
  };

  return (
    <article className="relative w-full overflow-hidden px-4 py-12 sm:px-6 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-accent-secondary/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-80 w-80 rounded-full bg-accent-tertiary/10 blur-3xl" />

      <div className="mx-auto max-w-5xl">
        <Link
          href="/projects"
          className="mb-8 inline-flex text-sm font-semibold text-accent-secondary transition hover:text-accent-tertiary"
        >
          Back to projects
        </Link>

        <header className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-accent-primary/10 backdrop-blur-xl sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
            Project case study
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
            {project.description}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl sm:p-8">
            <h2 className="text-2xl font-bold text-foreground">
              Problem → Solution
            </h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-tertiary">
                  Problem
                </h3>
                <p className="mt-2 text-base leading-8 text-foreground-secondary">
                  {project.whyItMatters}.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-secondary">
                  Solution
                </h3>
                <p className="mt-2 text-base leading-8 text-foreground-secondary">
                  {project.solution}
                </p>
              </div>
            </div>
          </section>

          <aside className="rounded-3xl border border-white/10 bg-gradient-to-br from-accent-primary/20 via-white/[0.05] to-accent-secondary/20 p-6 backdrop-blur-xl sm:p-8">
            <h2 className="text-2xl font-bold text-foreground">
              Tech Stack
            </h2>
            <div className="mt-6 space-y-3">
              {project.techStack.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-background/40 px-4 py-3"
                >
                  <span className="font-medium text-foreground">{tech}</span>
                  <span className="h-2 w-2 rounded-full bg-accent-secondary" aria-hidden="true" />
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-2 text-sm font-semibold text-white"
                >
                  View Code
                </Link>
              )}
              {project.liveDemoLink && (
                <Link
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-foreground"
                >
                  Live Demo
                </Link>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
