import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Brian Bett, a software engineer focused on backend architecture, Java, Spring Boot, API development, developer platforms, automation, and durable product systems.",
  alternates: {
    canonical: getCanonicalUrl("/about"),
  },
  openGraph: {
    title: "Brian Bett - About",
    description:
      "About Brian Bett, a software engineer focused on backend architecture, Java, Spring Boot, API development, developer platforms, automation, and durable product systems.",
    url: getCanonicalUrl("/about"),
    images: ["/opengraph-image"],
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
            Software engineering with backend discipline.
          </h1>
        </div>

        <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.055] p-5 text-base leading-8 text-foreground-secondary backdrop-blur-xl sm:p-8 lg:text-lg">
          <p>
            I am Brian Bett, a software engineer who builds backend systems,
            APIs, developer platforms, automation tools, and product workflows
            with a bias toward durability, clarity, and operational usefulness.
          </p>
          <p>
            I think in systems before I think in screens. Data models,
            boundaries, dependencies, permissions, failure paths, and the cost
            of future change determine whether an application remains coherent
            after the first version ships. My work is shaped by that reality.
          </p>
          <p>
            My project work includes Java fundamentals and object-oriented
            practice, a Django learning log, a structured developer learning
            platform, a construction inventory workflow, a real-time polling
            app, and Python automation projects. Each project is treated as a
            concrete operating problem: define the domain, reduce confusion,
            protect the workflow, and make the system easier to reason about
            over time.
          </p>
          <p>
            The stack represented in this portfolio includes Java, Spring
            Boot, Python, Django, REST APIs, PostgreSQL, MySQL, SQLite,
            Next.js, TypeScript, Supabase, Docker, Bootstrap, HTML, CSS, and
            JavaScript.
          </p>
          <p>
            My strongest work sits where product judgment meets system design:
            translating messy operational needs into software that is precise,
            maintainable, and hard to break.
          </p>
        </div>
      </div>
    </section>
  );
}
