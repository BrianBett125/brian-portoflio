import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getSiteUrl } from "@/lib/site-url";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const files = await fs.readdir(BLOG_DIR);
  return files
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx?$/, "") }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filePathMdx = path.join(BLOG_DIR, `${slug}.mdx`);
  const filePathMd = path.join(BLOG_DIR, `${slug}.md`);
  try {
    const filePath = await fs
      .stat(filePathMdx)
      .then(() => filePathMdx)
      .catch(async () => await fs.stat(filePathMd).then(() => filePathMd));
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);

    const title = data.title ?? slug;
    const description = data.description ?? data.summary ?? "";
    const date: string | undefined = data.date;
    const tags: string[] | undefined = Array.isArray(data.tags)
      ? data.tags.map((t: unknown) => String(t))
      : undefined;
    const thumbnail: string | undefined = data.thumbnail;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: date,
        images: thumbnail ? [thumbnail] : undefined,
      },
      twitter: {
        card: thumbnail ? "summary_large_image" : "summary",
        title,
        description,
        images: thumbnail ? [thumbnail] : undefined,
      },
      other: tags && tags.length ? { "article:tag": tags } : undefined,
    };
  } catch {
    return { title: slug };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  try {
    const filePathMdx = path.join(BLOG_DIR, `${slug}.mdx`);
    const filePathMd = path.join(BLOG_DIR, `${slug}.md`);
    const filePath = await fs
      .stat(filePathMdx)
      .then(() => filePathMdx)
      .catch(async () => await fs.stat(filePathMd).then(() => filePathMd));
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);

    const MDXContent = (
      await import(`@/content/blog/${slug}.mdx`).catch(() =>
        import(`@/content/blog/${slug}.md`)
      )
    ).default;

    const date = data.date
      ? new Date(data.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : undefined;
    const tags: string[] = Array.isArray(data.tags)
      ? data.tags.map((t: unknown) => String(t))
      : [];
    const thumbnail: string | undefined = data.thumbnail;

    return (
      <article className="relative mx-auto max-w-4xl overflow-hidden px-4 py-12 sm:px-6 lg:py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: data.title ?? slug,
              description: data.description ?? data.summary ?? "",
              image: thumbnail ? `${getSiteUrl()}${thumbnail}` : undefined,
              datePublished: data.date,
              author: {
                "@type": "Person",
                name: "Brian Bett",
              },
              publisher: {
                "@type": "Organization",
                name: "Brian Bett Portfolio",
                logo: {
                  "@type": "ImageObject",
                  url: `${getSiteUrl()}/next.svg`,
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${getSiteUrl()}/blog/${slug}`,
              },
            }),
          }}
        />
        <div className="absolute right-0 top-0 -z-10 h-80 w-80 rounded-full bg-accent-secondary/20 blur-3xl" />
        <header className="mb-10 rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
            Engineering essay
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-6xl">{data.title ?? slug}</h1>
          {(date || tags.length) && (
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-foreground-secondary">
              {date && <span>{date}</span>}
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs font-semibold text-foreground-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {data.description && (
            <p className="mt-5 text-base leading-8 text-foreground-secondary sm:text-lg">{data.description}</p>
          )}
        </header>

        {thumbnail && (
          <div className="mb-8 overflow-hidden rounded-lg border border-foreground/10">
            <Image
              src={thumbnail}
              alt={data.title ?? slug}
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="max-w-none rounded-2xl border border-white/10 bg-white/[0.045] p-6 text-foreground-secondary backdrop-blur-xl sm:p-8 [&_h1]:hidden [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-foreground [&_p]:mt-5 [&_p]:text-base [&_p]:leading-8 [&_strong]:text-foreground [&_ul]:mt-5 [&_ul]:space-y-2 [&_li]:leading-7">
          <MDXContent />
        </div>
      </article>
    );
  } catch (e) {
    notFound();
  }
}
