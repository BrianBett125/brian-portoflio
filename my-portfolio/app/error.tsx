"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-start justify-center px-4 py-16"><p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-secondary">Something went wrong</p><h1 className="mt-4 text-4xl font-black text-foreground">This page could not load.</h1><button type="button" onClick={reset} className="mt-6 min-h-11 rounded-full bg-accent-primary px-5 py-3 font-bold text-white">Try again</button></section>;
}
