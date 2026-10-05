"use client";

import Link from "next/link";
import type { Post } from "@/lib/posts";
import { usePlausible } from "next-plausible";
import { ArrowRightIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function BlogCard({ post }: { post: Post }) {
  const plausible = usePlausible();

  const trackBlogPostClick = () => {
    plausible("Blog Post Click", { props: { title: post.title } });
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-ui-border/10 bg-ui-surface/[0.055] p-5 shadow-2xl shadow-accent-primary/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-accent-secondary/50 hover:bg-ui-surface/[0.085] sm:min-h-[330px] sm:p-6">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary" />
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-primary/20 blur-3xl transition duration-500 group-hover:bg-accent-tertiary/20" />
      <div className="relative flex h-full flex-col">
        <div className="mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ui-border/10 bg-ui-surface/[0.07] px-3 py-1.5 text-xs font-semibold text-foreground-secondary">
            <CalendarDaysIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {post.date ? new Date(post.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Date to be added"}
            <span aria-hidden="true">·</span>{post.readingTime} min read
          </span>
        </div>
        
        <h3 className="mb-3 text-xl font-black tracking-tight text-foreground sm:text-2xl">
          <Link
            href={`/blog/${post.slug}`}
            className="bg-gradient-to-r from-foreground to-foreground bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-accent-primary group-hover:to-accent-secondary group-hover:bg-[length:100%_2px]"
            onClick={trackBlogPostClick}
          >
            {post.title}
          </Link>
        </h3>
        
        {post.description && (
          <p className="text-sm leading-7 text-foreground-secondary">{post.description}</p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${encodeURIComponent(tag)}`}
                  className="rounded-full border border-ui-border/10 bg-ui-surface/[0.06] px-3 py-1 text-xs font-semibold text-foreground-secondary"
                >
                  {tag}
                </Link>
            ))}
          </div>
        )}
        
        <div className="mt-auto flex justify-end pt-6">
          <Link
            href={`/blog/${post.slug}`}
          className="flex items-center gap-1 text-sm font-bold text-accent-secondary transition-colors hover:text-accent-primary"
            onClick={trackBlogPostClick}
          >
            Read more
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
