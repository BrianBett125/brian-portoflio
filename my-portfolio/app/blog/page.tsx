import { getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Blog",
  description: "Notes and articles by Brian Bett.",
  openGraph: {
    title: "Brian Bett – Blog",
    description: "Notes, tutorials, and thoughts on building for the web by Brian Bett.",
    url: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
    siteName: "Brian Bett Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <section className="py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-foreground/70">Notes, tutorials, and thoughts on building for the web.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}