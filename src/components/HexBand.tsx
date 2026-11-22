import { site } from "../data/site";

export function HexBand() {
  const { copy, cta } = site.hex;
  return (
    <div className="hex">
      <img src="/brand/hex-lockup-dark-1200.png" width={220} height={65} alt="Hexecutable · dev tools by Logic & Lace" />
      <p>
        <b>Ready-made widgets, chatboxes and OBS tools.</b>
        <br />
        {copy}
      </p>
      {cta.href ? (
        <a className="btn btn-primary" href={cta.href} rel="noopener">
          {cta.label}
        </a>
      ) : (
        <span className="btn btn-ghost btn-soon" aria-disabled="true">
          {cta.label} · coming soon
        </span>
      )}
    </div>
  );
}
