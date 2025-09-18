import Image from "next/image";

export default function Home() {
  return (
    <section className="py-16">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Hi, I’m Brian Bett</h1>
          <p className="text-foreground/70 max-w-2xl">
            I build modern, accessible web apps with Next.js, TypeScript, and Tailwind CSS.
            Explore my featured projects and writing below.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Featured Projects</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-lg border border-foreground/10 p-4">
              <h3 className="font-medium">Project One</h3>
              <p className="text-sm text-foreground/70">A brief description of a project you’re proud of.</p>
            </article>
            <article className="rounded-lg border border-foreground/10 p-4">
              <h3 className="font-medium">Project Two</h3>
              <p className="text-sm text-foreground/70">Another highlight showcasing your skills.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
