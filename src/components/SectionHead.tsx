import { LaceDivider } from "./LaceDivider";

export function SectionHead({ id, title }: { id: string; title: string }) {
  return (
    <div className="sec-head">
      <h2 id={`${id}-title`}>{title}</h2>
      <LaceDivider />
    </div>
  );
}
