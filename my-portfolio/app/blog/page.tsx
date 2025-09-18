import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog",
  description: "Writing and notes by Brian Bett",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  return (
    <section className="py-16">
      <h1 className="text-2xl font-bold mb-6">Blog</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-foreground/10 pb-3">
            <Link href={`/blog/${post.slug}`} className="font-medium underline underline-offset-4">
              {post.title}
            </Link>
            <p className="text-sm text-foreground/70">{post.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}