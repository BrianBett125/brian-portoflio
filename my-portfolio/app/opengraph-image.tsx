import { ImageResponse } from "next/og";
import { profile } from "@/src/content/profile";

export const alt = `${profile.name} | ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", padding: 72, flexDirection: "column", justifyContent: "space-between", background: "#0d0221", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ color: "#00ffcc", fontSize: 24, letterSpacing: 8 }}>BRIAN BETT KIPKOECH</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 68, fontWeight: 700 }}>{profile.headline}</div>
        <div style={{ fontSize: 28, color: "#d9c9ff" }}>Backend systems · Product engineering · UTC+3</div>
      </div>
      <div style={{ color: "#00ffcc", fontSize: 24 }}>{profile.email}</div>
    </div>,
    size,
  );
}
