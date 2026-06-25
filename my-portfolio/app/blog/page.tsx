import { getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Blog",
  description:
    "Engineering essays by Brian Bett on AI, systems, backend architecture, and the future of work.",
  openGraph: {
    title: "Brian Bett - Blog",
    description:
      "Engineering essays by Brian Bett on AI, systems, backend architecture, and the future of work.",
    url: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
    siteName: "Brian Bett Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <section className="relative w-full overflow-hidden px-4 py-12 sm:px-6 lg:py-20">
      <div className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-secondary/20 blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
            Field notes
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Essays on AI, systems, and the future of useful work.
          </h1>
          <p className="mt-5 text-base leading-8 text-foreground-secondary sm:text-lg">
            Sharp technical writing on engineering judgment, backend systems,
            automation, and how AI changes the economics of skill.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
