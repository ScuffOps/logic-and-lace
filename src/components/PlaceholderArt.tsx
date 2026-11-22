import type { PlaceholderKind } from "../data/types";

const ink = "#14122a";
const common = { stroke: ink, strokeWidth: 6 };

export function PlaceholderArt({ kind }: { kind: PlaceholderKind }) {
  if (kind === "scenes") {
    return (
      <svg className="art" viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="800" height="420" fill="#232046" />
        <circle cx="640" cy="120" r="70" fill="#f5c76a" {...common} />
        <path d="M0 300 Q200 250 400 300 T800 300 V420 H0z" fill="#6479e0" {...common} />
        <path d="M0 340 Q200 300 400 340 T800 340 V420 H0z" fill="#8ea3ff" {...common} />
        <rect x="60" y="60" width="300" height="180" rx="18" fill="#1c1a33" stroke="#f3eeff" strokeWidth="6" />
        <rect x="400" y="200" width="190" height="60" rx="14" fill="#f3eeff" {...common} />
        <text x="495" y="240" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="700" fontSize="26" fill={ink}>
          STARTING SOON
        </text>
      </svg>
    );
  }
  const body: Record<Exclude<PlaceholderKind, "scenes">, React.ReactNode> = {
    frames: (
      <>
        <rect x="40" y="40" width="320" height="220" rx="22" fill="none" stroke="#8ea3ff" strokeWidth="10" />
        <rect x="60" y="60" width="280" height="180" rx="14" fill="#1c1a33" />
        <circle cx="330" cy="60" r="16" fill="#f5c76a" stroke={ink} strokeWidth="5" />
      </>
    ),
    alerts: (
      <>
        <rect x="50" y="110" width="300" height="80" rx="40" fill="#8ea3ff" {...common} />
        <circle cx="95" cy="150" r="26" fill="#f3eeff" {...common} />
        <rect x="140" y="135" width="150" height="12" rx="6" fill={ink} />
        <rect x="140" y="157" width="90" height="10" rx="5" fill="#2a2456" />
      </>
    ),
    chatbox: (
      <>
        <rect x="60" y="50" width="280" height="200" rx="18" fill="#1c1a33" {...common} />
        <rect x="80" y="80" width="170" height="26" rx="13" fill="#f3eeff" />
        <rect x="80" y="120" width="220" height="26" rx="13" fill="#8ea3ff" />
        <rect x="80" y="160" width="130" height="26" rx="13" fill="#f3eeff" />
        <rect x="80" y="200" width="200" height="26" rx="13" fill="#6479e0" />
      </>
    ),
    panels: (
      <>
        <rect x="60" y="60" width="280" height="60" rx="14" fill="#8ea3ff" {...common} />
        <rect x="60" y="130" width="280" height="60" rx="14" fill="#f3eeff" {...common} />
        <rect x="60" y="200" width="280" height="60" rx="14" fill="#6479e0" {...common} />
      </>
    ),
    website: (
      <>
        <rect x="50" y="40" width="300" height="220" rx="16" fill="#1c1a33" {...common} />
        <rect x="50" y="40" width="300" height="34" rx="16" fill="#2a2456" />
        <circle cx="200" cy="150" r="40" fill="#8ea3ff" {...common} />
        <rect x="110" y="205" width="180" height="16" rx="8" fill="#f3eeff" />
      </>
    ),
    stickers: (
      <>
        <circle cx="130" cy="120" r="50" fill="#f3eeff" {...common} />
        <circle cx="270" cy="120" r="50" fill="#8ea3ff" {...common} />
        <circle cx="200" cy="210" r="50" fill="#f5c76a" {...common} />
      </>
    ),
  };
  return (
    <svg className="art" viewBox="0 0 400 300" aria-hidden="true">
      <rect width="400" height="300" fill="#232046" />
      {body[kind]}
    </svg>
  );
}
