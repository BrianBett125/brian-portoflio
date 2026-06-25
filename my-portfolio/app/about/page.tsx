import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Brian Bett, a Java and Python backend engineer with over three years of experience.",
  openGraph: {
    title: "Brian Bett – About",
    description:
      "About Brian Bett, a Java and Python backend engineer with over three years of experience.",
    url: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
    siteName: "Brian Bett Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <section className="py-12">
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">About</h1>
        <div className="space-y-4 text-foreground/80">
          <p>
            I am <strong>Brian Bett</strong>, a{" "}
            <strong>Java and Python backend developer</strong> with over three
            years of experience building dependable software systems.
          </p>

          <p>
            My work focuses on backend engineering: designing APIs, structuring
            services, working with databases, and building integrations that are
            maintainable, secure, and ready to scale.
          </p>

          <p>
            I enjoy turning product requirements into practical server-side
            solutions, whether that means developing REST APIs, improving data
            flows, optimizing application logic, or connecting systems cleanly
            across a larger platform.
          </p>

          <p>
            When I am not coding, I am usually learning better engineering
            practices, exploring new backend tools, or contributing to
            open-source projects.
          </p>
        </div>
      </div>
    </section>
  );
}
