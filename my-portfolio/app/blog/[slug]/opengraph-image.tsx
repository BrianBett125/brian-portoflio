import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", padding: 72, flexDirection: "column", justifyContent: "space-between", background: "#0d0221", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ color: "#00ffcc", fontSize: 24, letterSpacing: 8 }}>FIELD NOTES</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 66, fontWeight: 700 }}>{post?.title ?? "Engineering essay"}</div>
        <div style={{ fontSize: 27, color: "#b99cff" }}>{post?.description ?? "Brian Bett Kipkoech · Backend-Focused Full-Stack Engineer"}</div>
      </div>
      <div style={{ color: "#00ffcc", fontSize: 24 }}>Brian Bett Kipkoech</div>
    </div>,
    size,
  );
}
