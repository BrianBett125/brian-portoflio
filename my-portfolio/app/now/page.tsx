import type { Metadata } from "next";
import { profile } from "@/src/content/profile";
import { getCanonicalUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Now",
  description: "What Brian Bett Kipkoech is focused on right now.",
  alternates: { canonical: getCanonicalUrl("/now") },
  openGraph: { title: "Now | Brian Bett Kipkoech", description: "What Brian Bett Kipkoech is focused on right now.", url: getCanonicalUrl("/now"), images: ["/opengraph-image"] },
};

export default function NowPage() {
  const items = [
    { label: "Current focus", value: profile.now.currentFocus },
    { label: "Learning", value: profile.now.learning },
    { label: "A current note", value: profile.now.note },
  ];
  return <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:py-20">
    <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-secondary">Now</p>
    <h1 className="mt-3 text-4xl font-black text-foreground sm:text-6xl">What I’m focused on</h1>
    <p className="mt-4 text-sm text-foreground-secondary">Last updated: {profile.now.updated}</p>
    <div className="mt-8 grid gap-4">
      {items.map((item) => <article key={item.label} className="rounded-2xl border border-ui-border/10 bg-ui-surface/[0.055] p-5 sm:p-7">
        <h2 className="text-lg font-bold text-foreground">{item.label}</h2>
        <p className="mt-2 text-base leading-8 text-foreground-secondary">{item.value}</p>
      </article>)}
    </div>
  </section>;
}
