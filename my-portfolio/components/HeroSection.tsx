"use client";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link for internal navigation

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
          Hi, I’m Brian Bett – Software Engineer & AI/ML Enthusiast
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-4 text-foreground/70 max-w-2xl"
        >
          My mission is to build innovative and impactful web applications that solve real-world problems. I specialize in creating robust, scalable, and user-friendly experiences using modern web technologies.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link href="/projects" className="inline-flex items-center rounded-md bg-accent/20 text-accent px-4 py-2 text-sm hover:bg-accent/30 transition-colors">View Projects</Link>
          <Link href="/contact" className="inline-flex items-center rounded-md border border-foreground/15 px-4 py-2 text-sm hover:border-accent/50 hover:text-accent transition-colors">Contact Me</Link>
        </motion.div>
      </div>
    </section>
  );
}