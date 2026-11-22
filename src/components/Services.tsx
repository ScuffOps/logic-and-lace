import { site } from "../data/site";
import { SectionHead } from "./SectionHead";

const icons = [
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="14" rx="3"/><path d="M3 15l5-5 4 4 3-3 6 6"/></svg>,
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17V9a6 6 0 0112 0v8l2 2H4zM10 21h4"/></svg>,
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>,
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M8 4v5"/></svg>,
];

export function Services() {
  return (
    <>
      <SectionHead id="services" title="Services" />
      <div className="services">
        {site.services.map((s, i) => (
          <div className="svc" key={s.id}>
            <h3>
              {icons[i]}
              {s.title}
            </h3>
            <p>{s.copy}</p>
            <b className="price">{`from ${s.from ?? "$—"}`}</b>
          </div>
        ))}
      </div>
    </>
  );
}
