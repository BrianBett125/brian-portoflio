import { filterPublishedPosts, parsePost } from "../lib/posts";

describe("MDX post metadata", () => {
  test("parses tags, draft, canonical URL, headings, and reading time", () => {
    const post = parsePost("sample.mdx", `---
title: Sample post
date: 2026-05-01
tags: [TypeScript, Backend]
draft: true
canonicalUrl: https://example.com/original
---

## A useful heading

${"word ".repeat(450)}

### Details
`);

    expect(post).toMatchObject({
      slug: "sample",
      title: "Sample post",
      tags: ["TypeScript", "Backend"],
      draft: true,
      canonicalUrl: "https://example.com/original",
      readingTime: 3,
      toc: [
        { depth: 2, title: "A useful heading", id: "a-useful-heading" },
        { depth: 3, title: "Details", id: "details" },
      ],
    });
  });

  test("hides drafts only in production", () => {
    const draft = parsePost("draft.mdx", "---\ntitle: Draft\ndraft: true\n---\nText");
    const published = parsePost("published.mdx", "---\ntitle: Published\n---\nText");
    expect(filterPublishedPosts([draft, published], "production").map((post) => post.title)).toEqual(["Published"]);
    expect(filterPublishedPosts([draft, published], "development")).toHaveLength(2);
  });
});
