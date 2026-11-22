import type { CSSProperties } from "react";

export function Sparkle({ tone, style }: { tone: "peri" | "gold"; style?: CSSProperties }) {
  return (
    <svg className={tone === "peri" ? "spark peri" : "spark"} style={style} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
    </svg>
  );
}
