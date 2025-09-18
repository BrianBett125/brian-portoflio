import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function generateStaticParams() {
  const files = await fs.readdir(BLOG_DIR);
  return files
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx?$/, "") }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const filePath = path.join(BLOG_DIR, `${params.slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    return {
      title: data.title ?? params.slug,
      description: data.summary ?? "",
    };
  } catch {
    return { title: params.slug };
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const mdxPath = path.join(BLOG_DIR, `${params.slug}.mdx`);
  try {
    const MDXContent = (await import(`@/content/blog/${params.slug}.mdx`)).default;
    return (
      <article className="prose prose-invert max-w-none py-16">
        <MDXContent />
      </article>
    );
  } catch (e) {
    notFound();
  }
}