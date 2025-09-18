export const metadata = {
  title: "About",
  description: "Learn more about Brian Bett",
};

export default function AboutPage() {
  return (
    <section className="py-16">
      <h1 className="text-2xl font-bold mb-4">About Me</h1>
      <div className="space-y-4 text-foreground/80 max-w-2xl">
        <p>
          I’m a software developer specializing in building modern, performant, and accessible web
          applications. I enjoy working with TypeScript, React/Next.js, and Tailwind CSS, and I’m
          passionate about crafting delightful user experiences.
        </p>
        <p>
          Outside of coding, I explore UI/UX trends, write about development, and contribute to
          open-source projects.
        </p>
      </div>
    </section>
  );
}