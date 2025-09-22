"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/70 border-b border-foreground/10">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight hover:text-accent transition-colors">Brian Bett</Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/about" className="hover:text-accent transition-colors">About</Link>
          <Link href="/projects" className="hover:text-accent transition-colors">Projects</Link>
          <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}