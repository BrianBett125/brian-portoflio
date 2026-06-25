import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Brian Bett, a software engineer focused on backend systems, developer platforms, automation tools, and real-world solutions.",
  openGraph: {
    title: "Brian Bett - About",
    description:
      "About Brian Bett, a software engineer focused on backend systems, developer platforms, automation tools, and real-world solutions.",
    url: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
    siteName: "Brian Bett Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <section className="relative w-full overflow-hidden px-4 py-12 sm:px-6 lg:py-20">
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-accent-primary/20 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
            About
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Backend-minded engineering for real product work.
          </h1>
        </div>

        <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.055] p-5 text-base leading-8 text-foreground-secondary backdrop-blur-xl sm:p-8 lg:text-lg">
          <p>
            I am <strong className="text-foreground">Brian Bett</strong>, a
            software engineer who builds backend systems, developer platforms,
            automation tools, and practical applications for real workflows.
          </p>
          <p>
            I think in systems: data models, boundaries, dependencies, failure
            paths, and the cost of future change. Before adding complexity, I
            look for the simplest structure that can scale, remain maintainable,
            and keep behavior understandable.
          </p>
          <p>
            My project work includes a Django learning log, a structured
            developer learning platform, a construction inventory workflow, a
            real-time polling app, and Python automation projects. Across those
            projects, the focus is consistent: organize information, make
            operations clearer, and build software that solves a specific
            problem.
          </p>
          <p>
            The stack represented in this portfolio includes Python, Django,
            Spring Boot, PostgreSQL, MySQL, SQLite, Next.js, TypeScript,
            Supabase, Docker, Bootstrap, HTML, CSS, and JavaScript.
          </p>
          <p className="font-semibold text-foreground">
            My strongest work happens where product needs meet system design.
          </p>
          <p className="font-semibold text-foreground">
            I build systems because the best software removes operational drag
            and gives people clearer control over real work.
          </p>
        </div>
      </div>
    </section>
  );
}
