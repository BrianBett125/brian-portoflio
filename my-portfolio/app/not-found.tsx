import Link from "next/link";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page could not be found.",
  alternates: { canonical: getCanonicalUrl("/") },
  openGraph: { title: "Page not found | Brian Bett", images: ["/opengraph-image"] },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[55vh] w-full max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-secondary">404 · Page not found</p>
      <h1 className="mt-4 text-4xl font-black text-foreground sm:text-6xl">That route isn’t here.</h1>
      <p className="mt-4 text-foreground-secondary">Use the home page or browse the project case studies.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="rounded-full bg-accent-primary px-5 py-3 font-bold text-white" href="/">Home</Link>
        <Link className="rounded-full border border-foreground/20 px-5 py-3 font-bold text-foreground" href="/projects">Projects</Link>
      </div>
    </section>
  );
}
