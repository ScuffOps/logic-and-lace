import { site } from "./site";
import { CATEGORY_LABELS } from "./types";

test("work ids are unique", () => {
  const ids = site.work.map((w) => w.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test("exactly one featured work item", () => {
  expect(site.work.filter((w) => w.featured).length).toBe(1);
});

test("every work item has an image or a placeholder", () => {
  for (const w of site.work) expect(Boolean(w.image) || Boolean(w.placeholder)).toBe(true);
});

test("category labels cover six categories", () => {
  expect(Object.keys(CATEGORY_LABELS)).toHaveLength(6);
});
