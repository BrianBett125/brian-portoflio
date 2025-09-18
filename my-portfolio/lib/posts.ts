import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO string
  summary?: string;
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
    posts.push({
      slug: data.slug ?? file.replace(/\.mdx?$/, ""),
      title: data.title ?? "Untitled",
      date: data.date ?? new Date().toISOString(),
      summary: data.summary ?? "",
    });
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}