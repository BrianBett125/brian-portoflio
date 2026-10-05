import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "node:path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "github-dark" }]],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingRoot: path.resolve(__dirname),
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
};

export default withMDX(nextConfig);
