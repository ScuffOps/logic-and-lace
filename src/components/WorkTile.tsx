import { CATEGORY_LABELS, type WorkItem } from "../data/types";
import { PlaceholderArt } from "./PlaceholderArt";
import { Sparkle } from "./Sparkle";

export function WorkTile({ item, onOpen }: { item: WorkItem; onOpen(item: WorkItem, trigger: HTMLElement): void }) {
  const label = CATEGORY_LABELS[item.category];
  return (
    <button
      type="button"
      className={item.featured ? "tile wide tile-in" : "tile tile-in"}
      aria-label={`${item.title}, ${label}`}
      onClick={(e) => onOpen(item, e.currentTarget)}
    >
      {item.image ? <img className="art" src={item.image.src} alt="" /> : item.placeholder && <PlaceholderArt kind={item.placeholder} />}
      <span className={item.featured ? "tag gold" : "tag"}>{item.featured ? "FEATURED" : label}</span>
      <span className="cap">
        <b>{item.title}</b>
        <span>{item.specs}</span>
      </span>
      {item.featured && <Sparkle tone="gold" style={{ right: 18, top: 16 }} />}
    </button>
  );
}
