export const metadata = {
  title: "About",
  description: "Learn more about Brian Bett",
};

export default function AboutPage() {
  return (
    <section className="py-16 prose prose-invert max-w-none">
      <h1>About Me</h1>
      <p>
        I’m a software developer specializing in building modern, performant, and accessible web
        applications. I enjoy working with TypeScript, React/Next.js, and Tailwind CSS, and I’m
        passionate about crafting delightful user experiences.
      </p>
      <p>
        Outside of coding, I explore UI/UX trends, write about development, and contribute to
        open-source projects.
      </p>
    </section>
  );
}