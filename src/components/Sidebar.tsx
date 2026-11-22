import { site } from "../data/site";
import { ExternalLinks } from "./ExternalLinks";
import { LaceDivider } from "./LaceDivider";
import { Lockup } from "./Lockup";
import { Sparkle } from "./Sparkle";

const icons: Record<string, string> = {
  "#work": "M3 4h18v14H3zM3 15l5-5 4 4 3-3 6 6",
  "#services": "M12 3l2.2 5.3L20 9l-4.4 3.9L17 19l-5-3-5 3 1.4-6.1L4 9l5.8-.7z",
  "#devtools": "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  "#about": "M5 4h11a3 3 0 013 3v13H8a3 3 0 00-3 3zM5 4v16M9 9h6M9 13h4",
};

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function Sidebar() {
  return (
    <aside className="side">
      <a href="#top" aria-label="Logic & Lace home">
        <Lockup className="lockup" width={240} />
      </a>
      <Sparkle tone="gold" style={{ right: 18, top: 16 }} />
      <Sparkle tone="peri" style={{ left: 14, top: 64 }} />
      <p className="intro">{site.intro}</p>
      <nav className="nav" aria-label="Sections">
        {site.nav.map((n) => (
          <a key={n.href} href={n.href}>
            <Icon d={icons[n.href] ?? ""} />
            {n.label}
          </a>
        ))}
      </nav>
      <div className="cta">
        <a className="btn btn-primary" href="#quote">
          <Icon d="M4 5h16v11H9l-5 4z" />
          Get a quote
        </a>
        <a className="btn btn-ghost" href="#devtools">
          <Icon d="M5 8h14l-1 12H6zM9 8V6a3 3 0 016 0v2" />
          Shop ready-made
        </a>
      </div>
      <div className="links">
        <ExternalLinks title="Shops" items={site.shops} />
        <ExternalLinks title="Elsewhere" items={site.social} />
        <LaceDivider className="side-lace" />
      </div>
    </aside>
  );
}
