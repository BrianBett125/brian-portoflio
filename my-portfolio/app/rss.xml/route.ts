import { getAllPosts } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site-url";
import { escapeXml } from "@/lib/xml";

export const revalidate = 3600; // Regenerate RSS every hour

export async function GET() {
  const siteUrl = getSiteUrl();
  const posts = await getAllPosts();

  const items = posts
    .map((post) => {
      const url = escapeXml(`${siteUrl}/blog/${post.slug}`);
      const categories = (post.tags || [])
        .map((t) => `<category>${escapeXml(t)}</category>`) 
        .join("");
      const pubDate = post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : "";
      const description = post.description ? escapeXml(post.description) : "";
      const enclosure = post.thumbnail
        ? `<enclosure url="${escapeXml(post.thumbnail.startsWith("http") ? post.thumbnail : `${siteUrl}${post.thumbnail}`)}" type="image/png" />`
        : "";

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <description>${description}</description>
          ${pubDate}
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
