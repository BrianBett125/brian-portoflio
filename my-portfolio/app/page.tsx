import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import DeveloperConsole from "@/components/DeveloperConsole";
import HeroSection from "@/components/HeroSection";
import MetricsBand, { type Metric } from "@/components/MetricsBand";
import ProjectBento from "@/components/ProjectBento";
import Reveal from "@/components/Reveal";
import SkillsMatrix from "@/components/SkillsMatrix";
import SystemStatus from "@/components/SystemStatus";
import {
  currentLearning,
  engineeringNotes,
  hardProblem,
} from "@/lib/portfolio-insights";
import { getProjects } from "@/lib/projects";
import {
  AcademicCapIcon,
  BeakerIcon,
  CheckCircleIcon,
  CircleStackIcon,
  CodeBracketSquareIcon,
  CommandLineIcon,
  CpuChipIcon,
  EnvelopeIcon,
  NewspaperIcon,
  ServerStackIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site-url";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Home",
    description:
      "Brian Bett is a software engineer building backend systems, developer platforms, automation tools, and practical real-world solutions.",
    openGraph: {
      title: "Brian Bett - Software Engineer",
      description:
        "Backend systems, developer platforms, automation tools, and practical real-world solutions by Brian Bett.",
      url: getSiteUrl(),
      siteName: "Brian Bett Portfolio",
      locale: "en_US",
      type: "website",
    },
  };
};

const stackGroups = [
  {
    title: "Backend",
    icon: ServerStackIcon,
    items: ["Python", "Django", "Spring Boot", "PostgreSQL", "MySQL", "SQLite"],
  },
  {
    title: "Frontend",
    icon: CodeBracketSquareIcon,
    items: ["Next.js", "TypeScript", "React", "HTML", "CSS", "JavaScript", "Bootstrap"],
  },
  {
    title: "DevOps",
    icon: CommandLineIcon,
    items: ["Docker", "Supabase"],
  },
];

const thinking = [
  "I approach problems as systems, not isolated screens or scripts.",
  "I design for scalability and maintainability before complexity becomes expensive.",
  "I focus on reducing moving parts, clarifying data flow, and making behavior easy to reason about.",
];

const operatorProfile = [
  {
    label: "Backend discipline",
    value: "Data models, APIs, permissions, background work, and failure paths that are designed before the interface starts lying.",
  },
  {
    label: "Product ownership",
    value: "I care about the workflow, the user, the business rule, and the operational consequence, not only the ticket.",
  },
  {
    label: "AI-era leverage",
    value: "I use AI to compress implementation time while keeping human judgment in charge of architecture, tradeoffs, and accountability.",
  },
];

const aiEssays = [
  {
    title: "AI Will Not Kill Work. It Will Expose Weak Work.",
    href: "/blog/ai-will-not-kill-work-it-will-expose-weak-work",
  },
  {
    title: "The AI-Native Engineer Is A Systems Thinker",
    href: "/blog/the-ai-native-engineer-is-a-systems-thinker",
  },
  {
    title: "Building Livelihood When Routine Work Is Automated",
    href: "/blog/building-livelihood-when-routine-work-is-automated",
  },
];

const portfolioThesis = [
  {
    title: "Operate from the data boundary",
    body: "I shape the model, permissions, and workflow around the real risk before the interface ever tries to hide it.",
  },
  {
    title: "Reduce operational drag",
    body: "The goal is fewer unnecessary handoffs, shorter recovery time, and workflows that stay understandable after launch.",
  },
  {
    title: "Ship with conviction",
    body: "The best systems make teams more capable because their behavior is coherent, measurable, and easy to trust.",
  },
];

export default async function Home() {
  const projects = await getProjects();

  // Honest metrics, derived from real data so the numbers can never drift.
  const distinctTech = new Set(projects.flatMap((p) => p.techStack)).size;
  const metrics: Metric[] = [
    { value: projects.length, label: "systems shipped" },
    { value: distinctTech, label: "technologies in play" },
    { value: stackGroups.length, label: "engineering disciplines" },
    { value: aiEssays.length, label: "long-form essays" },
  ];

  return (
    <div className="w-full space-y-16 overflow-hidden sm:space-y-20 lg:space-y-24">
      <HeroSection />

      <Reveal>
      <section id="about" className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
              About
            </p>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              I design backend systems and product workflows with discipline,
              clarity, and operational force.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-foreground-secondary lg:text-lg">
            <p>
              I am Brian Bett, a software engineer focused on backend
              architecture, developer platforms, automation, and applications
              that demand more than a polished interface. My work begins with
              the structure beneath the surface: data, boundaries, workflows,
              and the decisions that determine whether software remains useful
              under real pressure.
            </p>
            <p>
              I approach engineering as a matter of judgment, not decoration.
              Before adding complexity, I examine the model, the failure paths,
              the maintenance cost, and the operational consequences of every
              choice. The aim is software that is legible, resilient, and
              difficult to misuse.
            </p>
            <p>
              The work in this portfolio spans Python, Django, PostgreSQL,
              MySQL, SQLite, Spring Boot, Next.js, TypeScript, Supabase,
              Docker, and browser-native HTML, CSS, and JavaScript. Across that
              range, the standard is consistent: organize the domain, reduce
              ambiguity, and ship systems that people can depend on.
            </p>
            <p>
              I build software to remove operational drag, sharpen control, and
              make complicated work easier to govern.
            </p>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
              By the numbers
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-4xl">
              A portfolio measured by real, shipped work.
            </h2>
          </div>
          <MetricsBand metrics={metrics} />
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <SystemStatus />
            <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl sm:p-8">
              <CommandLineIcon className="h-8 w-8 text-accent-secondary sm:h-9 sm:w-9" aria-hidden="true" />
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
                Signature Interface
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                Navigate the portfolio like a developer.
              </h2>
              <p className="mt-4 text-base leading-8 text-foreground-secondary">
                A small command surface makes the portfolio feel alive without
                loading a heavy animation or external dependency.
              </p>
            </div>
          </div>
          <DeveloperConsole />
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div>
              <p className="section-eyebrow text-sm font-semibold text-accent-secondary">
                Case studies
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Selected systems with operational weight.
              </h2>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-accent-primary/20 via-white/[0.055] to-accent-tertiary/15 p-5 backdrop-blur-xl sm:p-6">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-accent-tertiary-strong">
                Portfolio proof
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground-secondary sm:text-base">
                I tend to work where the real value sits beneath the interface: data integrity, permission structure, orchestration, and the systems that keep product workflows honest.
              </p>
            </div>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            {[
              { value: "5+", label: "product-leaning systems" },
              { value: "3", label: "core engineering disciplines" },
              { value: "1", label: "clear operating standard" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 text-center backdrop-blur-xl"
              >
                <p className="text-2xl font-black text-foreground sm:text-3xl">{stat.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-foreground-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <ProjectBento projects={projects.slice(0, 3)} featured />

          <div className="mt-6 flex justify-end">
            <Link
              href="/projects"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-bold text-foreground transition hover:border-accent-secondary/70 hover:bg-white/[0.09] sm:w-fit"
            >
              View all projects
            </Link>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-6xl story-panel rounded-[28px] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="section-eyebrow text-sm font-semibold text-accent-secondary">
                Portfolio thesis
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                The systems I build are meant to make work more legible, faster to trust, and harder to break.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-foreground-secondary">
                My value does not live in decoration. It lives in the structure that lets teams move with confidence when the real world starts to get messy.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {portfolioThesis.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl"
                >
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-accent-secondary">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-foreground-secondary">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.75fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl sm:p-8">
            <CpuChipIcon className="h-8 w-8 text-accent-secondary sm:h-9 sm:w-9" aria-hidden="true" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
              How I Think
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Systems first. Complexity last.
            </h2>
          </div>
          <div className="grid gap-4">
            {thinking.map((item, index) => (
              <div
                key={item}
                className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-accent-secondary/50 hover:bg-white/[0.075]"
              >
                <div className="flex gap-3 sm:gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary to-accent-tertiary text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-foreground-secondary sm:text-base">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
                Outcomes
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Systems that reduce drag, clarify ownership, and ship with less ambiguity.
              </h2>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-secondary">
                Editorial note
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground-secondary">
                The best engineering work is not only visible in the interface. It shows up in the data model, permission boundaries, and the confidence the team gains when the system behaves predictably.
              </p>
            </div>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-secondary">Visibility</p>
              <p className="mt-3 text-sm leading-7 text-foreground-secondary">Clearer data flow, well-defined API boundaries, and system behavior that is easy to inspect and reason about.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-secondary">Reliability</p>
              <p className="mt-3 text-sm leading-7 text-foreground-secondary">Failure paths designed early, operational noise reduced, and infrastructure decisions grounded in real use.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-secondary">Leverage</p>
              <p className="mt-3 text-sm leading-7 text-foreground-secondary">Practical automation, better coordination, and product workflows that move with less manual overhead.</p>
            </article>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
                Field Logs
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Short notes from building real systems.
              </h2>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-secondary">
                Editorial note
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground-secondary">
                These notes are not filler. They are the operating principles
                behind the portfolio: model the workflow, respect the database,
                and keep the system legible when the work gets messy.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {engineeringNotes.map((note, index) => (
              <article
                key={note.title}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-accent-secondary/50 hover:bg-white/[0.08] sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <BeakerIcon className="h-7 w-7 shrink-0 text-accent-tertiary" aria-hidden="true" />
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-foreground-secondary">
                    Note {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-black text-foreground">
                  {note.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground-secondary">
                  {note.explanation}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl sm:p-8">
            <SparklesIcon className="h-8 w-8 text-accent-secondary sm:h-9 sm:w-9" aria-hidden="true" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
              Operator Profile
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Built for the hard middle between idea and production.
            </h2>
            <div className="mt-8 grid gap-4">
              {operatorProfile.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-black/[0.16] p-5"
                >
                  <h3 className="text-base font-black text-foreground">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-foreground-secondary">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-accent-tertiary/15 via-white/[0.055] to-accent-primary/20 p-6 backdrop-blur-xl sm:p-8">
            <NewspaperIcon className="h-8 w-8 text-accent-tertiary sm:h-9 sm:w-9" aria-hidden="true" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent-tertiary-strong">
              AI And Livelihood
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Clear writing for a brutal shift in useful work.
            </h2>
            <p className="mt-4 text-base leading-8 text-foreground-secondary">
              The blog includes three senior-engineer essays on AI, judgment,
              automation, and the pressure it puts on careers built around
              routine execution.
            </p>
            <div className="mt-6 space-y-3">
              {aiEssays.map((essay) => (
                <a
                  key={essay.href}
                  href={essay.href}
                  className="block rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-foreground transition hover:border-accent-tertiary/60 hover:bg-white/[0.1]"
                >
                  {essay.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-accent-primary/20 via-white/[0.055] to-accent-tertiary/15 p-6 backdrop-blur-xl sm:p-8">
            <WrenchScrewdriverIcon className="h-8 w-8 text-accent-tertiary sm:h-9 sm:w-9" aria-hidden="true" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent-tertiary-strong">
              Currently Building
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Internet billing system with MikroTik integration.
            </h2>
            <p className="mt-4 text-base leading-8 text-foreground-secondary">
              Ongoing work focused on a real network-operations workflow:
              billing logic, infrastructure integration, and maintainable
              system behavior.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl sm:p-8">
            <CircleStackIcon className="h-8 w-8 text-accent-secondary sm:h-9 sm:w-9" aria-hidden="true" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
              Technical Strength
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Data-backed applications with clear operational boundaries.
            </h2>
            <p className="mt-4 text-base leading-8 text-foreground-secondary">
              The stack in this codebase points to backend-heavy product work:
              Python and Django, Spring Boot, relational databases including
              PostgreSQL, MySQL, and SQLite, typed Next.js interfaces,
              real-time Supabase flows, JavaScript, and Docker-backed
              automation.
            </p>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-accent-primary/20 via-white/[0.055] to-accent-tertiary/15 p-6 backdrop-blur-xl sm:p-8">
            <ExclamationTriangleIcon className="h-8 w-8 text-accent-tertiary sm:h-9 sm:w-9" aria-hidden="true" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent-tertiary-strong">
              A Hard Problem I Solved
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-4xl">
              {hardProblem.title}
            </h2>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-foreground-secondary">
              Project: {hardProblem.project}
            </p>
          </div>
          <div className="grid gap-4">
            {[
              ["Problem", hardProblem.problem],
              ["Why it is difficult", hardProblem.difficulty],
              ["My approach", hardProblem.approach],
              ["Outcome", hardProblem.outcome],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl sm:p-6"
              >
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-accent-secondary">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground-secondary sm:text-base">
                  {body}
                </p>
              </div>
            ))}
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl sm:p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-accent-secondary">
                Common mistakes
              </h3>
              <div className="mt-4 grid gap-3">
                {hardProblem.commonMistakes.map((mistake) => (
                  <div key={mistake} className="flex gap-3">
                    <CheckCircleIcon className="mt-1 h-5 w-5 shrink-0 text-accent-tertiary" aria-hidden="true" />
                    <p className="text-sm leading-7 text-foreground-secondary">
                      {mistake}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
              Skills Matrix
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Tools organized by the work they support.
            </h2>
          </div>
          <SkillsMatrix />
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <AcademicCapIcon className="h-8 w-8 text-accent-secondary sm:h-9 sm:w-9" aria-hidden="true" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
              Currently Learning
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-4xl">
              Expanding the parts of engineering that compound.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {currentLearning.map((item) => (
              <div
                key={item}
                className="flex min-h-14 items-center gap-3 rounded-xl border border-white/10 bg-background/40 px-4 text-sm font-bold text-foreground"
              >
                <SparklesIcon className="h-5 w-5 shrink-0 text-accent-tertiary" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section id="contact" className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
              <EnvelopeIcon className="mr-2 inline h-4 w-4" aria-hidden="true" />
              Contact
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Have a system worth building?
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground-secondary">
              Send your email and notes to brianbett756@gmail.com. When the
              email provider is configured, the message is delivered directly;
              otherwise the form opens a prepared email so the note still
              reaches me from your mail app.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <CopyEmail email="brianbett756@gmail.com" />
              <a
                href="tel:+254728085834"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-black/[0.14] px-4 py-3 text-sm font-semibold text-foreground transition hover:border-accent-secondary/50 hover:bg-white/[0.07]"
              >
                +254 728 085 834
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      </Reveal>
    </div>
  );
}
