"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-bold tracking-tight"
        >
          Hi, I’m Brian Bett
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-4 text-foreground/70 max-w-2xl"
        >
          I build modern, accessible web apps with Next.js, TypeScript, and Tailwind CSS. Explore my featured projects and writing below.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a href="/projects" className="inline-flex items-center rounded-md bg-accent/20 text-accent px-4 py-2 text-sm hover:bg-accent/30 transition-colors">View Projects</a>
          <a href="/blog" className="inline-flex items-center rounded-md border border-foreground/15 px-4 py-2 text-sm hover:border-accent/50 hover:text-accent transition-colors">Read Blog</a>
        </motion.div>
      </div>
    </section>
  );
}