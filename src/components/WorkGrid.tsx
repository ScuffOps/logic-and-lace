import type { WorkItem } from "../data/types";
import { WorkTile } from "./WorkTile";

export function WorkGrid({ items, onOpen }: { items: WorkItem[]; onOpen(item: WorkItem, trigger: HTMLElement): void }) {
  return (
    <div className="grid">
      {items.map((item) => (
        <WorkTile key={item.id} item={item} onOpen={onOpen} />
      ))}
    </div>
  );
}
