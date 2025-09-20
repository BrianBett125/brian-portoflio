import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image"; // Import Image component

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
    const filePath = await fs
      .stat(filePathMdx)
      .then(() => filePathMdx)
      .catch(async () => await fs.stat(filePathMd).then(() => filePathMd));
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);

    const title = data.title ?? params.slug;
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
    return { title: params.slug };
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    // Frontmatter for metadata rendering
    const filePathMdx = path.join(BLOG_DIR, `${params.slug}.mdx`);
    const filePathMd = path.join(BLOG_DIR, `${params.slug}.md`);
    const filePath = await fs
      .stat(filePathMdx)
      .then(() => filePathMdx)
      .catch(async () => await fs.stat(filePathMd).then(() => filePathMd));
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);

    const MDXContent = (
      await import(`@/content/blog/${params.slug}.mdx`).catch(() =>
        import(`@/content/blog/${params.slug}.md`)
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
      <article className="py-12 max-w-3xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: data.title ?? params.slug,
              description: data.description ?? data.summary ?? "",
              image: thumbnail ? `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}${thumbnail}` : undefined,
              datePublished: data.date,
              author: {
                "@type": "Person",
                name: "Brian Bett", // Replace with your name
              },
              publisher: {
                "@type": "Organization",
                name: "Brian Bett Portfolio", // Replace with your portfolio name
                logo: {
                  "@type": "ImageObject",
                  url: `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/images/logo.png`, // Replace with your logo URL
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/blog/${params.slug}`,
              },
            }),
          }}
        />
        <header className="space-y-3 mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">{data.title ?? params.slug}</h1>
          {(date || tags.length) && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/60">
              {date && <span>{date}</span>}
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/10 px-2 py-0.5 text-xs text-foreground/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          {data.description && (
            <p className="text-foreground/70">{data.description}</p>
          )}
        </header>

        {thumbnail && (
          <div className="mb-8 overflow-hidden rounded-lg border border-foreground/10">
            <Image
              src={thumbnail}
              alt={data.title ?? params.slug}
              width={1200} // You might need to adjust these values
              height={630} // You might need to adjust these values
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <MDXContent />
        </div>
      </article>
    );
  } catch (e) {
    notFound();
  }
}