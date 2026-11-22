import { site } from "../data/site";
import { SectionHead } from "./SectionHead";

export function About() {
  return (
    <>
      <SectionHead id="about" title="About" />
      <div className="about">
        <div>
          {site.about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <dl className="facts">
          {site.about.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
