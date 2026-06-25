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
    "@type": "CreativeWork",
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
      <div className="absolute bottom-0 left-0 -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <Link
          href="/projects"
          className="mb-8 inline-flex text-sm font-semibold text-accent-secondary transition hover:text-cyan-300"
        >
          Back to projects
        </Link>

        <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-accent-primary/10 backdrop-blur-xl sm:p-10">
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
            {project.category} case study
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-foreground sm:text-6xl">
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
          <section className="grid gap-5">
            {[
              ["Problem", project.problem],
              ["Solution", project.solution],
              ["Impact", project.impact],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl sm:p-8"
              >
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-secondary">
                  {title}
                </h2>
                <p className="mt-3 text-base leading-8 text-foreground-secondary">
                  {body}
                </p>
              </div>
            ))}
          </section>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-accent-primary/20 via-white/[0.05] to-cyan-400/15 p-6 backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-bold text-foreground">
                Architecture Overview
              </h2>
              <div className="mt-6 space-y-4">
                {project.architecture.map((item, index) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-black text-foreground">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-7 text-foreground-secondary">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-bold text-foreground">Tech Stack</h2>
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

              <div className="mt-8 border-t border-white/10 pt-6">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-accent-secondary">
                  Why this stack
                </h3>
                <div className="mt-4 space-y-4">
                  {project.whyThisStack.map((choice) => (
                    <div key={choice.tech}>
                      <p className="font-bold text-foreground">{choice.tech}</p>
                      <p className="mt-1 text-sm leading-7 text-foreground-secondary">
                        {choice.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.githubLink && (
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex rounded-full bg-gradient-to-r ${project.accent} px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-primary/20 transition hover:scale-[1.02]`}
                  >
                    View Code
                  </Link>
                )}
                {project.liveDemoLink && (
                  <Link
                    href={project.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent-secondary/60 hover:bg-white/[0.08]"
                  >
                    Live Demo
                  </Link>
                )}
              </div>
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
