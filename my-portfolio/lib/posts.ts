import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  description?: string;
  date: string; // ISO string
  tags?: string[];
  thumbnail?: string; // absolute URL or public path e.g. /images/...
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function getAllPosts(): Promise<Post[]> {
  const files = await fs.readdir(BLOG_DIR);
  const posts: Post[] = [];
  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
    const filePath = path.join(BLOG_DIR, file);
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    const tags: string[] = Array.isArray(data.tags)
      ? data.tags.map((t: unknown) => String(t))
      : [];
    posts.push({
      slug: data.slug ?? file.replace(/\.mdx?$/, ""),
      title: data.title ?? "Untitled",
      description: data.description ?? data.summary ?? "",
      date: data.date ?? new Date().toISOString(),
      tags,
      thumbnail: data.thumbnail ?? undefined,
    });
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}