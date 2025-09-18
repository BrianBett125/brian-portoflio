import { getAllPosts } from "@/lib/posts";

export const revalidate = 3600; // Regenerate RSS every hour

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const posts = await getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      const categories = (post.tags || [])
        .map((t) => `<category>${escapeXml(t)}</category>`) 
        .join("");
      const pubDate = new Date(post.date).toUTCString();
      const description = post.description ? escapeXml(post.description) : "";
      const enclosure = post.thumbnail
        ? `<enclosure url="${escapeXml(post.thumbnail)}" type="image/svg+xml" />`
        : "";

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <description>${description}</description>
          <pubDate>${pubDate}</pubDate>
          ${categories}
          ${enclosure}
        </item>
      `;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Brian Bett – Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Notes and articles by Brian Bett</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}