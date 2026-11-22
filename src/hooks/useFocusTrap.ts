import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

/** Keeps Tab inside `ref` while active and restores focus to the previously focused element on deactivate. */
export type FocusTrapOptions = {
  /** Element to focus on deactivate; falls back to whatever was focused on activate. */
  returnTo?: HTMLElement | null;
  /** When it returns true at deactivate time, focus is not restored (caller moved it). */
  skipRestore?: () => boolean;
};

export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, options: FocusTrapOptions = {}) {
  const { returnTo, skipRestore } = options;
  useEffect(() => {
    if (!active) return;
    const root = ref.current;
    if (!root) return;
    const previous = document.activeElement as HTMLElement | null;
    const first = root.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? root).focus();

    function onKey(e: KeyboardEvent) {
      if (e.key !== "Tab" || !root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (skipRestore?.()) return;
      (returnTo ?? previous)?.focus();
    };
  }, [ref, active, returnTo, skipRestore]);
}
