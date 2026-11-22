import { useMemo, useState } from "react";
import type { Category, WorkItem } from "../data/types";

export type Filter = Category | "all";

export function useFilter(items: WorkItem[]) {
  const [active, setActive] = useState<Filter>("all");
  const visible = useMemo(
    () => (active === "all" ? items : items.filter((w) => w.category === active)),
    [items, active],
  );
  return { active, setActive, visible };
}
