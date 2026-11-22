import { CATEGORY_LABELS, type Category } from "../data/types";
import type { Filter } from "../hooks/useFilter";

const order = Object.keys(CATEGORY_LABELS) as Category[];

export function FilterChips({ active, onChange }: { active: Filter; onChange(next: Filter): void }) {
  const chips: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    ...order.map((c) => ({ key: c, label: CATEGORY_LABELS[c] })),
  ];
  return (
    <div className="chips" role="group" aria-label="Filter work">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          className="chip"
          aria-pressed={active === c.key}
          onClick={() => onChange(c.key)}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
