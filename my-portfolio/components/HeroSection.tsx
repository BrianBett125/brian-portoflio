"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  CpuChipIcon,
  ServerStackIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

const focusAreas = [
  { label: "Backend systems", icon: ServerStackIcon },
  { label: "Developer platforms", icon: CpuChipIcon },
  { label: "Automation tools", icon: WrenchScrewdriverIcon },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-24">
      <div className="absolute inset-x-0 top-8 -z-10 h-px bg-gradient-to-r from-transparent via-accent-secondary/60 to-transparent" />
      <div className="absolute left-0 top-0 -z-10 h-72 w-72 rounded-full bg-accent-primary/20 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute right-8 top-8 hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground-secondary backdrop-blur-xl sm:block"
        >
          Software Engineer
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-accent-secondary"
        >
          Brian Bett
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-5xl text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-8xl"
        >
          Software Engineer building backend systems that turn messy problems
          into reliable products.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="mt-7 max-w-3xl text-base leading-8 text-foreground-secondary sm:text-xl"
        >
          I work across Python, Django, PostgreSQL, Next.js, and TypeScript to
          design practical systems, automation tools, and developer platforms
          with clear data flow, maintainable structure, and real operational
          value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-8 grid gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:gap-4"
        >
          <Link
            href="/projects"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-primary via-accent-secondary to-cyan-400 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-accent-primary/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-accent-secondary/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary"
          >
            View Projects
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 text-sm font-bold text-foreground shadow-xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-accent-secondary/70 hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary"
          >
            <ChatBubbleLeftRightIcon className="h-4 w-4" aria-hidden="true" />
            Contact Me
          </Link>

          <a
            href="https://github.com/BrianBett125"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 text-sm font-bold text-foreground shadow-xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-accent-primary/70 hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary"
          >
            <CodeBracketIcon className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-3"
          aria-label="Engineering focus areas"
        >
          {focusAreas.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-foreground-secondary backdrop-blur-xl"
              >
                <Icon className="h-5 w-5 shrink-0 text-accent-secondary" aria-hidden="true" />
                {label}
              </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
