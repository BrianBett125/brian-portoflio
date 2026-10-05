import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getCanonicalUrl, getSiteUrl } from "@/lib/site-url";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const canonical = post.canonicalUrl ?? getCanonicalUrl(`/blog/${slug}`);
  const image = post.thumbnail ?? `/blog/${slug}/opengraph-image`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: canonical,
      publishedTime: post.date,
      tags: post.tags,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [image] },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const postIndex = posts.findIndex((post) => post.slug === slug);
  const post = posts[postIndex];
  if (!post) notFound();

  let MDXContent;
  try {
    MDXContent = (await import(`@/content/blog/${slug}.mdx`).catch(() => import(`@/content/blog/${slug}.md`))).default;
  } catch {
    notFound();
  }

  const previous = posts[postIndex + 1];
  const next = posts[postIndex - 1];
  const canonical = post.canonicalUrl ?? getCanonicalUrl(`/blog/${slug}`);
  const image = post.thumbnail ? (post.thumbnail.startsWith("http") ? post.thumbnail : `${getSiteUrl()}${post.thumbnail}`) : undefined;
  const date = post.date ? new Date(post.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : undefined;

  return (
    <article className="relative mx-auto w-full max-w-4xl overflow-hidden px-4 py-12 sm:px-6 lg:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        image: image ?? `${getSiteUrl()}/blog/${slug}/opengraph-image`,
        datePublished: post.date,
        author: { "@type": "Person", name: "Brian Bett Kipkoech", url: getSiteUrl() },
        publisher: { "@type": "Person", name: "Brian Bett Kipkoech", url: getSiteUrl() },
        keywords: post.tags,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      }) }} />
      <header className="mb-10 rounded-2xl border border-ui-border/10 bg-ui-surface/[0.055] p-6 backdrop-blur-xl sm:p-8">
        <Link href="/blog" className="text-sm font-semibold text-accent-secondary underline">Back to blog</Link>
        {post.draft && <p className="mt-5 inline-flex rounded-full bg-status-warning/15 px-3 py-1 text-xs font-bold text-status-warning dark:text-status-warning">Draft preview</p>}
        <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-6xl">{post.title}</h1>
        <p className="mt-4 text-base leading-8 text-foreground-secondary sm:text-lg">{post.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-foreground-secondary">
          {date && post.date && <time dateTime={post.date}>{date}</time>}{date && <span aria-hidden="true">·</span>}<span>{post.readingTime} min read</span>
          {post.tags.map((tag) => <Link key={tag} href={`/blog/tags/${encodeURIComponent(tag)}`} className="rounded-full border border-ui-border/10 bg-ui-surface/[0.07] px-3 py-1 text-xs font-semibold text-foreground-secondary hover:text-foreground">{tag}</Link>)}
        </div>
      </header>

      {post.thumbnail && <div className="mb-8 overflow-hidden rounded-xl border border-foreground/10"><Image src={post.thumbnail} alt={post.title} width={1200} height={630} className="h-auto w-full object-cover" priority /></div>}

      {post.toc.length > 0 && <nav aria-label="Table of contents" className="mb-8 rounded-2xl border border-ui-border/10 bg-ui-surface/[0.045] p-5 sm:p-7">
        <h2 className="text-lg font-bold text-foreground">On this page</h2>
        <ol className="mt-3 space-y-2 text-sm">
          {post.toc.map((entry) => <li key={`${entry.id}-${entry.title}`} className={entry.depth === 3 ? "ml-4" : ""}><a className="text-accent-secondary underline underline-offset-4" href={`#${entry.id}`}>{entry.title}</a></li>)}
        </ol>
      </nav>}

      <div className="max-w-none rounded-2xl border border-ui-border/10 bg-ui-surface/[0.045] p-6 text-foreground-secondary backdrop-blur-xl sm:p-8 [&_h1]:hidden [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_p]:mt-5 [&_p]:text-base [&_p]:leading-8 [&_strong]:text-foreground [&_ul]:mt-5 [&_ul]:space-y-2 [&_li]:leading-7 [&_a]:text-accent-secondary [&_a]:underline">
        <MDXContent />
      </div>

      <nav aria-label="Post navigation" className="mt-8 grid gap-4 sm:grid-cols-2">
        {previous ? <Link href={`/blog/${previous.slug}`} className="rounded-2xl border border-ui-border/10 bg-ui-surface/[0.05] p-5"><span className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">Previous post</span><span className="mt-2 block font-bold text-foreground">{previous.title}</span></Link> : <span />}
        {next ? <Link href={`/blog/${next.slug}`} className="rounded-2xl border border-ui-border/10 bg-ui-surface/[0.05] p-5 text-right"><span className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">Next post</span><span className="mt-2 block font-bold text-foreground">{next.title}</span></Link> : <span />}
      </nav>
    </article>
  );
}
