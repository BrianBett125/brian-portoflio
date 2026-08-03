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
import HeroBackground from "./HeroBackground";
import TypewriterTerminal from "./TypewriterTerminal";

const focusAreas = [
  { label: "Backend systems", icon: ServerStackIcon },
  { label: "Developer platforms", icon: CpuChipIcon },
  { label: "Automation tools", icon: WrenchScrewdriverIcon },
];

// Fluid type: scales continuously from 2.25rem on mobile to 4.5rem on wide
// screens instead of stepping at breakpoints. clamp() keeps it from blowing
// out on ultrawide and from shrinking below a legible floor.
const headlineSize = "clamp(2.25rem, 1.15rem + 4.6vw, 4.5rem)";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-24 w-full">
      {/* Dynamic connected nodes canvas backdrop */}
      <HeroBackground />
      
      <div className="absolute inset-x-0 top-8 -z-10 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />
      <div className="absolute left-0 top-0 -z-10 h-72 w-72 rounded-full bg-accent-primary/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-accent-tertiary/10 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-foreground-secondary backdrop-blur-xl sm:text-[0.7rem]">
            Software Engineer
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
            <span className="glow-dot" aria-hidden="true">
              <span className="relative flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open for Opportunities
          </span>
        </motion.div>

        {/* Terminal Intro above headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 max-w-2xl"
        >
          <TypewriterTerminal />
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent-secondary"
            >
              Brian Bett
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              style={{ fontSize: headlineSize, lineHeight: 1.05 }}
              className="max-w-5xl font-black tracking-tight text-foreground"
            >
              Building <span className="gradient-text-animate glow-word">backend systems</span> that turn messy complexity into <span className="gradient-text-animate glow-word">product motion</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="mt-7 max-w-3xl text-base leading-8 text-foreground-secondary sm:text-xl"
            >
              I design practical software across Python, Django, PostgreSQL, Next.js,
              and TypeScript, with an emphasis on clarity, operational leverage, and systems that stay trustworthy under real pressure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mt-8 grid gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:gap-4"
            >
              <Link
                href="/projects"
                className="shine btn-cyber btn-cyber-primary group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary"
              >
                View Projects
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>

              <Link
                href="/contact"
                className="btn-cyber btn-cyber-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold backdrop-blur-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary"
              >
                <ChatBubbleLeftRightIcon className="h-4 w-4 text-accent-secondary" aria-hidden="true" />
                Contact Me
              </Link>

              <a
                href="https://github.com/BrianBett125"
                target="_blank"
                rel="noreferrer"
                className="btn-cyber btn-cyber-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold backdrop-blur-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary"
              >
                <CodeBracketIcon className="h-4 w-4 text-accent-secondary" aria-hidden="true" />
                GitHub
              </a>
            </motion.div>
          </div>

          {/* Premium signature card with rotating border glow */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="glow-border-container shadow-2xl shadow-accent-primary/10"
          >
            <div className="glow-border-inner p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-accent-secondary">System Snapshot</p>
                  <p className="mt-2 text-sm font-semibold text-foreground-secondary">Engineering instincts, product context, and clean operating decisions.</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-accent-tertiary">Focus</p>
                  <p className="mt-2 text-sm leading-7 text-foreground-secondary">Backend systems, developer platforms, and automation tooling with strong product awareness.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-accent-secondary">Stack</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">Python · Django · Next.js · TypeScript</p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-accent-secondary">Strength</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">Systems thinking with execution discipline</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>

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
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-foreground-secondary backdrop-blur-xl hover:border-accent-primary/40 transition duration-300 hover:text-white"
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
