/** @jest-environment node */

import { GET } from "../app/rss.xml/route";
import { escapeXml } from "../lib/xml";

describe("RSS feed", () => {
  test("escapes XML special characters", () => {
    expect(escapeXml(`A & B <tag> "quote" 'single'`)).toBe("A &amp; B &lt;tag&gt; &quot;quote&quot; &apos;single&apos;");
  });

  test("returns published MDX articles in RSS format", async () => {
    const response = await GET();
    const xml = await response.text();
    expect(response.headers.get("Content-Type")).toContain("application/rss+xml");
    expect(xml).toContain("<rss version=\"2.0\">");
    expect(xml).toContain("<title>AI Will Not Kill Work. It Will Expose Weak Work.</title>");
    expect(xml).toContain("<category>AI</category>");
    expect(xml).not.toContain("<TODO");
  });
});
