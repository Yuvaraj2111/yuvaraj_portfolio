import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#0b0e15", color: "#e7ecf5" }}>
        <div style={{ fontSize: 34, color: "#38d9f5" }}>{profile.monogram}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, maxWidth: 950 }}>{profile.headline}</div>
          <div style={{ fontSize: 30, marginTop: 28, color: "#8d98ad" }}>{`${profile.name} · ${profile.titles.join(" · ")}`}</div>
        </div>
      </div>
    ),
    size
  );
}
