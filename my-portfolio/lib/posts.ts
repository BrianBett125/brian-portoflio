import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type TocEntry = { depth: 2 | 3; title: string; id: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  tags: string[];
  thumbnail?: string;
  draft: boolean;
  canonicalUrl?: string;
  readingTime: number;
  toc: TocEntry[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function asString(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  return undefined;
}

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function parsePost(file: string, raw: string): Post {
  const { data, content } = matter(raw);
  const tags = Array.isArray(data.tags) ? data.tags.filter((tag: unknown): tag is string => typeof tag === "string") : [];
  const markdown = content.replace(/```[\s\S]*?```/g, " ");
  const headings = [...markdown.matchAll(/^(#{2,3})\s+(.+?)\s*#*\s*$/gm)];
  const idCounts = new Map<string, number>();
  const toc: TocEntry[] = headings.map((match) => {
    const title = match[2].replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[`*_~]/g, "").trim();
    const baseId = slugifyHeading(title);
    const count = idCounts.get(baseId) ?? 0;
    idCounts.set(baseId, count + 1);
    return { depth: match[1].length as 2 | 3, title, id: count === 0 ? baseId : `${baseId}-${count}` };
  });
  const words = content.replace(/```[\s\S]*?```/g, " ").match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  const date = asString(data.date);

  return {
    slug: typeof data.slug === "string" ? data.slug : file.replace(/\.mdx?$/, ""),
    title: typeof data.title === "string" ? data.title : "Untitled",
    description: typeof data.description === "string" ? data.description : typeof data.summary === "string" ? data.summary : "",
    date,
    tags,
    thumbnail: typeof data.thumbnail === "string" ? data.thumbnail : undefined,
    draft: data.draft === true,
    canonicalUrl: typeof data.canonicalUrl === "string" ? data.canonicalUrl : undefined,
    readingTime: Math.max(1, Math.ceil(words / 220)),
    toc,
  };
}

export function filterPublishedPosts(posts: Post[], nodeEnv = process.env.NODE_ENV): Post[] {
  return nodeEnv === "production" ? posts.filter((post) => !post.draft) : posts;
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await fs.readdir(BLOG_DIR);
  const posts: Post[] = [];
  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
    const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
    const post = parsePost(file, raw);
    posts.push(post);
  }
  return filterPublishedPosts(posts).sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const normalizedTag = decodeURIComponent(tag).toLowerCase();
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.some((postTag) => postTag.toLowerCase() === normalizedTag));
}
