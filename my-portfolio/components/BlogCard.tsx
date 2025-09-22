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
    <article className="card group animate-fade-in hover:border-l-4 hover:border-l-accent-primary transition-all duration-300">
      <div className="p-6">
        <div className="mb-3">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-foreground-secondary">
            {new Date(post.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
          </span>
        </div>
        
        <h3 className="font-bold text-xl tracking-tight mb-3">
          <Link
            href={`/blog/${post.slug}`}
            className="bg-gradient-to-r from-foreground to-foreground bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-accent-primary group-hover:to-accent-secondary group-hover:bg-[length:100%_2px]"
            onClick={trackBlogPostClick}
          >
            {post.title}
          </Link>
        </h3>
        
        {post.description && (
          <p className="text-foreground-secondary leading-relaxed">{post.description}</p>
        )}
        
        <div className="mt-4 pt-3 flex justify-end">
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-medium flex items-center gap-1 text-accent-primary hover:text-accent-secondary transition-colors"
            onClick={trackBlogPostClick}
          >
            Read more
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transform transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}