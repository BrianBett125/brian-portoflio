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
  const filePathMdx = path.join(BLOG_DIR, `${params.slug}.mdx`);
  const filePathMd = path.join(BLOG_DIR, `${params.slug}.md`);
  try {
    const filePath = await fs.stat(filePathMdx).then(() => filePathMdx).catch(async () => (await fs.stat(filePathMd).then(() => filePathMd)));
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
  try {
    const MDXContent = (await import(`@/content/blog/${params.slug}.mdx`).catch(() => import(`@/content/blog/${params.slug}.md`)) ).default;
    return (
      <article className="py-16 prose prose-invert max-w-none">
        <MDXContent />
      </article>
    );
  } catch (e) {
    notFound();
  }
}