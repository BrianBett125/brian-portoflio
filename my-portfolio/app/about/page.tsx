import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Brian Bett, a backend developer building modern web apps.",
  openGraph: {
    title: "Brian Bett – About",
    description: "About Brian Bett, a backend developer building modern web apps.",
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
            👋 Greetings — I am <strong>Brian Bett</strong>, an{" "}
            <strong>ICT Specialist</strong> and{" "}
            <strong>Full-Stack Software Engineer</strong> forged by curiosity
            and fueled by an uncompromising pursuit of innovation. I do not
            merely write code; I engineer digital realms where design and logic
            converge, crafting technology that resonates with elegance,
            precision, and human meaning.
          </p>

          <p>
            At the heart of my mission lies a conviction: that every abstract
            idea carries the seed of transformation. My craft is the art of
            turning these seeds into living systems — interfaces that breathe
            with clarity, backends that endure with strength, and experiences
            that move seamlessly between vision and reality.
          </p>

          <p>
            I walk a path of unyielding exploration — of tools that redefine
            possibility, of ideas bold enough to challenge convention, and of
            collaborations where creativity and discipline ignite together. For
            me, great technology is never accidental. It is imagined with
            courage, refined with insight, and delivered with intention.
          </p>

          <p>
            When I’m not coding, I’m usually writing, learning about design, or
            contributing to open-source.
          </p>
        </div>
      </div>
    </section>
  );
}
