import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import { getAllPosts, getPostsByTag } from "@/lib/posts";
import { getCanonicalUrl } from "@/lib/site-url";

type TagPageProps = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return [...tags].map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const canonical = getCanonicalUrl(`/blog/tags/${encodeURIComponent(decodedTag)}`);
  return {
    title: `Posts tagged ${decodedTag}`,
    description: `Engineering posts tagged ${decodedTag}.`,
    alternates: { canonical },
    openGraph: { title: `Posts tagged ${decodedTag}`, description: `Engineering posts tagged ${decodedTag}.`, url: canonical, images: ["/opengraph-image"] },
  };
}

export default async function BlogTagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);
  if (posts.length === 0) notFound();
  return <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-20">
    <Link href="/blog" className="text-sm font-semibold text-accent-secondary underline">Back to blog</Link>
    <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-accent-secondary">Topic</p>
    <h1 className="mt-3 text-4xl font-black text-foreground sm:text-6xl">{decodeURIComponent(tag)}</h1>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
  </section>;
}
