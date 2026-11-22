import type { ExternalLink } from "../data/types";

export function ExternalLinks({ title, items }: { title: string; items: ExternalLink[] }) {
  return (
    <div>
      <div className="label" style={{ marginBottom: 6 }}>
        {title}
      </div>
      <div className="row">
        {items.map((item) =>
          item.href ? (
            <a key={item.label} href={item.href} rel="noopener">
              {item.label}
            </a>
          ) : (
            <span key={item.label} className="link-soon" aria-disabled="true">
              {item.label} · coming soon
            </span>
          ),
        )}
      </div>
    </div>
  );
}
