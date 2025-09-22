"use client";

import Link from "next/link";
import type { Post } from "@/lib/posts";
import { usePlausible } from "next-plausible";

export default function BlogCard({ post }: { post: Post }) {
  const plausible = usePlausible();

  const trackBlogPostClick = () => {
    plausible("Blog Post Click", { props: { title: post.title } });
  };

  return (
    <article className="rounded-lg border border-foreground/10 p-5 hover:border-accent/50 transition-colors">
      <h3 className="font-semibold tracking-tight">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-accent transition-colors"
          onClick={trackBlogPostClick}
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-1 text-xs text-foreground/50">
        {new Date(post.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
      </p>
      {post.description && (
        <p className="mt-2 text-sm text-foreground/70">{post.description}</p>
      )}
    </article>
  );
}