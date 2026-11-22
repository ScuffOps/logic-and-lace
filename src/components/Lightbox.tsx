import { useCallback, useEffect, useRef } from "react";
import type { WorkItem } from "../data/types";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { PlaceholderArt } from "./PlaceholderArt";

type Props = { item: WorkItem | null; trigger?: HTMLElement | null; onClose(): void };

export function Lightbox({ item, trigger, onClose }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const movedFocus = useRef(false);
  const skipRestore = useCallback(() => movedFocus.current, []);
  useFocusTrap(panel, item !== null, { returnTo: trigger, skipRestore });

  useEffect(() => {
    if (item) movedFocus.current = false;
  }, [item]);

  function commission() {
    movedFocus.current = true;
    onClose();
    const field = document.querySelector<HTMLElement>("#quote input[name=name]");
    field?.focus({ preventScroll: true });
  }

  useEffect(() => {
    if (!item) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;
  return (
    <div className="lightbox" onClick={onClose}>
      <div
        ref={panel}
        className="lightbox-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lb-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lightbox-art">
          {item.image ? <img src={item.image.src} alt={item.image.alt} /> : item.placeholder && <PlaceholderArt kind={item.placeholder} />}
        </div>
        <div className="lightbox-body">
          <h3 id="lb-title">{item.title}</h3>
          <p>{item.blurb}</p>
          <p className="specs">{item.specs}</p>
          <div className="lightbox-actions">
            <a className="btn btn-primary" href="#quote" onClick={commission}>
              Commission something like this
            </a>
            {item.link && (
              <a className="btn btn-ghost" href={item.link.href} rel="noopener">
                {item.link.label}
              </a>
            )}
          </div>
        </div>
        <button type="button" className="lightbox-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
