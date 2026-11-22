# Logic & Lace Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the dark-only, single-page Logic & Lace portfolio and commission site as a Vite + React 19 + TypeScript static site that matches the approved Grimoire-shelf draft.

**Architecture:** One `App` composes a sticky `Sidebar` (desktop) / `Topbar` (mobile) with a scrolling main column of sections. All content comes from one typed data module, `src/data/site.ts`. The quote form posts JSON to a hosted endpoint read from `VITE_FORM_ENDPOINT`. Styling is plain CSS with custom properties in `src/styles.css`, ported from the draft HTML; no CSS framework.

**Tech Stack:** Vite 6.4.2, React 19.2.0, TypeScript 5.9 strict, pnpm, Vitest + @testing-library/react + jsdom for tests (LinkHub uses node:test for its worker; component tests need a DOM, hence Vitest). Fonts via Google Fonts: Fredoka 500/600/700, Comfortaa 300/400/700, JetBrains Mono 400.

**Spec:** `docs/superpowers/specs/2026-11-21-logic-and-lace-site-design.md`. Visual reference: `.superdesign/tmp/grimoire-shelf.html` (the React output must match it; copy its CSS and copy text verbatim unless a task says otherwise). Tokens: `.superdesign/design-system.md`.

## Global Constraints

- Dark mode only. Page `#1c1a33`, raised `#232046`, deep outline `#14122a`, ink `#2a2456`, ivory `#fff8ef`, muted `#b9b4d6`, periwinkle `#8ea3ff`, indigo `#6479e0`, lilac `#f3eeff`, gold `#f5c76a`. No other colours.
- Body font Comfortaa weight 300 at 16px/1.6; weight 400 for anything under 14px and for inputs, chips, tags, captions; Fredoka for headings and buttons; JetBrains Mono 13px for specs.
- Sticker rule: interactive elements have a 2.5px outline, radius 14px (pills 999px), hard shadow `3px 3px 0 #14122a`; pressed state shadow `1px 1px 0` and translate 2px.
- Copy is in the studio voice ("we", "the studio"); never a personal name. Tagline "CRAFTED WITH CARE".
- Missing links, prices, images show as visible placeholders ("from $—", "coming soon", drawn SVG art), never invented values.
- Breakpoints: sidebar hidden and topbar shown at ≤900px; grid 3 columns, 2 at ≤900px, 1 at ≤560px.
- Motion: 160ms hover, 220ms lightbox, 120ms chip fade, sparkle twinkle; all disabled under `prefers-reduced-motion: reduce`.
- Accessibility: AA contrast, visible focus ring `#8ea3ff` 3px offset 2px, touch targets ≥44px, chips are `<button aria-pressed>`, form labels visible, errors linked with `aria-describedby`.
- No secrets in the repo; the form endpoint comes from `VITE_FORM_ENDPOINT` with a committed `.env.example`.
- Commit after every task with the attribution line `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

## Review Focus

1. Form submitted with the honeypot filled: must silently show the success state and never call the endpoint (Task 7 test).
2. `VITE_FORM_ENDPOINT` unset in production build: submit shows an inline message "Quote form isn't connected yet. Email us instead." and no network call (Task 7 test).
3. Filter chip selected then Lightbox opened and closed: the chip's `aria-pressed` and the filtered list must be unchanged, and focus must return to the tile that opened it (Task 5 test).
4. A tile with `placeholder: true` and no `link`: the lightbox still opens and shows no broken `<img>` or empty anchor (Task 5 test).
5. Keyboard-only user on mobile width: the Topbar "Get a quote" must be the first focusable control and `#quote` must be reachable without the hidden sidebar trapping focus (Task 3 test: sidebar gets `aria-hidden`/`display:none` via CSS at ≤900px; test asserts the topbar link precedes the nav in DOM order).

---

### Task 1: Scaffold, tokens, brand assets

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `vitest.config.ts`, `src/test/setup.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`, `src/vite-env.d.ts`, `.gitignore`, `.env.example`, `README.md`, `public/brand/lnl-lockup-dark-1200.png`, `public/brand/hex-lockup-dark-1200.png`, `public/brand/lnl-lockup-dark-1200.webp`, `public/brand/hex-lockup-dark-1200.webp`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: `App(): JSX.Element` rendering `<main id="main">` with heading text "Work". CSS custom properties `--night --raised --deep --ink --ivory --muted --peri --indigo --lilac --gold --font-d --font-b --font-m` on `:root`.

- [ ] **Step 1: Init repo and package**

```bash
cd ~/Developer/web/logic-and-lace && git init -b main
pnpm init
pnpm add react@19.2.0 react-dom@19.2.0
pnpm add -D vite@6.4.2 @vitejs/plugin-react@5.0.4 typescript@^5.9.0 @types/react@^19.2.0 @types/react-dom@^19.2.0 vitest@^3.2.0 jsdom@^26.0.0 @testing-library/react@^16.3.0 @testing-library/jest-dom@^6.6.0 @testing-library/user-event@^14.6.0
```
Scripts: `dev: vite`, `build: tsc --noEmit && vite build`, `preview: vite preview`, `test: vitest run`, `typecheck: tsc --noEmit`. `"type": "module"`, `"private": true`.

- [ ] **Step 2: Config files**

`tsconfig.json`: copy LinkHub's (`target ES2022`, `moduleResolution Bundler`, `jsx react-jsx`, `strict true`, `noEmit`, `include ["src"]`) and add `"types": ["vitest/globals", "@testing-library/jest-dom"]`.
`vite.config.ts`: `react()` plugin only.
`vitest.config.ts`: `environment: "jsdom"`, `globals: true`, `setupFiles: ["src/test/setup.ts"]` (setup imports `@testing-library/jest-dom/vitest`).
`.gitignore`: LinkHub's list plus `.superpowers/` and `.superdesign/tmp/`.
`.env.example`: `VITE_FORM_ENDPOINT=` with a comment naming Web3Forms or Formspree.
`src/vite-env.d.ts`: `/// <reference types="vite/client" />` plus an `ImportMetaEnv` interface declaring `readonly VITE_FORM_ENDPOINT?: string`.

- [ ] **Step 3: Brand images**

Resize with sips from `brand/logic-and-lace-lockup-dark-3000w.png` and `brand/hexecutable-lockup-dark-3000w.png` to 1200px wide PNG; produce WebP with `cwebp` if installed, else `sips -s format webp` (macOS 15+ supports it); if neither works, ship PNG only and note it in README.

- [ ] **Step 4: index.html and styles**

`index.html`: `<html lang="en">`, title "Logic & Lace · stream graphics & little tools", meta description "Stream overlays, alerts, widgets and small websites for streamers and VTubers. Get a quote or shop ready-made.", `<meta name="color-scheme" content="dark">`, `<meta name="theme-color" content="#1c1a33">`, Google Fonts link for the three families and weights in Global Constraints, `<div id="root">`, module script `/src/main.tsx`.
`src/styles.css`: port the draft's `<style>` block verbatim, changing only: the font variables to the three families; body `font: 300 16px/1.6 var(--font-b)`; the weight-400 rule for `input,select,textarea,button,.tag,.chip,.cap,small`; and add `@media (prefers-reduced-motion: reduce){ *,*::before,*::after{animation:none!important;transition:none!important;transform:none!important} }`.

- [ ] **Step 5: Write the failing smoke test**

```tsx
// src/App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "./App";
test("renders the Work heading inside main", () => {
  render(<App />);
  expect(screen.getByRole("main")).toContainElement(screen.getByRole("heading", { name: "Work" }));
});
```

- [ ] **Step 6: Run test, expect failure**

Run: `pnpm test`
Expected: FAIL, cannot resolve `./App`.

- [ ] **Step 7: Implement `App` and `main.tsx`**

`src/App.tsx`: `export default function App()` returning `<main id="main"><h1>Work</h1></main>` for now. `src/main.tsx`: `createRoot(document.getElementById("root")!).render(<StrictMode><App/></StrictMode>)` and `import "./styles.css"`.

- [ ] **Step 8: Run test and build**

Run: `pnpm test && pnpm build`
Expected: test PASS; `dist/index.html` exists.

- [ ] **Step 9: README**

README sections: what the site is (two sentences), `pnpm dev / build / test`, "Editing content" pointing at `src/data/site.ts` and `public/work/`, "Quote form" explaining `VITE_FORM_ENDPOINT`, "Deploy" with Cloudflare Pages settings (build `pnpm build`, output `dist`) and the Vercel alternative.

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "chore: scaffold Vite + React + TS site with brand tokens and assets

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 2: Content data module

**Files:**
- Create: `src/data/types.ts`, `src/data/site.ts`
- Test: `src/data/site.test.ts`

**Interfaces:**
- Produces, in `types.ts`:
```ts
export type Category = "overlays" | "alerts" | "widgets" | "panels" | "websites" | "art";
export const CATEGORY_LABELS: Record<Category, string>; // overlays:"Overlays", alerts:"Alerts", widgets:"Widgets & chatboxes", panels:"Panels", websites:"Websites", art:"Art"
export type WorkItem = { id: string; title: string; category: Category; blurb: string; specs: string; featured?: boolean; image?: { src: string; alt: string }; placeholder?: "scenes" | "frames" | "alerts" | "chatbox" | "panels" | "website" | "stickers"; link?: { href: string; label: string } };
export type Service = { id: string; title: string; copy: string; from?: string }; // from undefined renders "from $—"
export type ExternalLink = { label: string; href?: string }; // href undefined renders as disabled "coming soon"
export type Site = { intro: string; nav: { label: string; href: string }[]; work: WorkItem[]; services: Service[]; shops: ExternalLink[]; social: ExternalLink[]; hex: { copy: string; cta: ExternalLink }; about: { paragraphs: string[]; facts: { label: string; value: string }[] }; form: { needs: string[]; budgets: string[] } };
```
- `site.ts` exports `export const site: Site` with every string copied verbatim from the draft HTML (seven work items, four services, three shops, three socials, Hexecutable copy, two about paragraphs, four facts, six need chips, the budget options). Work item `placeholder` values map to the draft's seven SVG drawings in order.

- [ ] **Step 1: Write the failing tests**

```ts
// src/data/site.test.ts
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
```

- [ ] **Step 2: Run, expect failure**  Run: `pnpm test src/data` Expected: FAIL, module not found.

- [ ] **Step 3: Implement `types.ts` and `site.ts`** per the Interfaces block. Shop and social `href` left `undefined` (Veri has not supplied them). Service `from` left `undefined`.

- [ ] **Step 4: Run, expect pass**  Run: `pnpm test src/data` Expected: 4 PASS.

- [ ] **Step 5: Commit**  `git add src/data && git commit -m "feat: typed site content module"` (+ attribution line).

### Task 3: Shell: Sidebar, Topbar, Footer, section heading

**Files:**
- Create: `src/components/Sidebar.tsx`, `src/components/Topbar.tsx`, `src/components/Footer.tsx`, `src/components/SectionHead.tsx`, `src/components/LaceDivider.tsx`, `src/components/ExternalLinks.tsx`, `src/components/Sparkle.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/Shell.test.tsx`

**Interfaces:**
- Consumes: `site` from Task 2.
- Produces: `Sidebar()`, `Topbar()`, `Footer()`, `SectionHead({ id, title }: { id: string; title: string })` rendering `<h2 id={id}-title>` plus `LaceDivider`; `ExternalLinks({ title, items }: { title: string; items: ExternalLink[] })` rendering an `<a>` per item with href, or `<span aria-disabled="true" class="link-soon">Label · coming soon</span>` when href is undefined; `Sparkle({ tone }: { tone: "peri" | "gold" })`.
- `App` layout: `<Topbar/>` first in DOM, then `<div class="shell"><Sidebar/><main id="main">…sections…</main></div>`, `<Footer/>`. Sections in order: `#work`, `#services`, `#devtools`, `#about`, `#quote` (later tasks fill them; this task leaves `SectionHead` placeholders).

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/Shell.test.tsx
import { render, screen, within } from "@testing-library/react";
import App from "../App";
test("topbar quote link precedes the sidebar nav in DOM order", () => {
  render(<App />);
  const [first] = screen.getAllByRole("link", { name: "Get a quote" });
  const nav = screen.getByRole("navigation", { name: "Sections" });
  expect(first.compareDocumentPosition(nav) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});
test("sidebar nav has the four section links", () => {
  render(<App />);
  const nav = screen.getByRole("navigation", { name: "Sections" });
  expect(within(nav).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(["#work", "#services", "#devtools", "#about"]);
});
test("shop links without an href render as coming soon, not anchors", () => {
  render(<App />);
  expect(screen.getByText(/Etsy · coming soon/)).not.toHaveAttribute("href");
});
test("lockup image uses the brand file with alt text", () => {
  render(<App />);
  expect(screen.getAllByRole("img", { name: "Logic & Lace" })[0]).toHaveAttribute("src", expect.stringContaining("/brand/lnl-lockup-dark-1200"));
});
```

- [ ] **Step 2: Run, expect failure.**  Run: `pnpm test src/components/Shell` Expected: FAIL.

- [ ] **Step 3: Implement the components**, porting markup from the draft's `<header class="topbar">`, `<aside>` and footer. Lockup uses `<picture>` with WebP source and PNG fallback, width 240 in sidebar, 168 in topbar, `alt="Logic & Lace"`. Nav `<nav aria-label="Sections">`. Buttons: `.btn-primary` "Get a quote" → `#quote`, `.btn-ghost` "Shop ready-made" → `#devtools`. At most three `Sparkle`s in the sidebar. Footer text "© Logic & Lace · crafted with care".

- [ ] **Step 4: Run, expect pass.**  Run: `pnpm test` Expected: all PASS.

- [ ] **Step 5: Commit**  `git commit -am "feat: sidebar, topbar, footer shell"` (+ attribution).

### Task 4: Work grid with filters and placeholder art

**Files:**
- Create: `src/components/FilterChips.tsx`, `src/components/WorkGrid.tsx`, `src/components/WorkTile.tsx`, `src/components/PlaceholderArt.tsx`, `src/hooks/useFilter.ts`
- Modify: `src/App.tsx`
- Test: `src/components/WorkGrid.test.tsx`

**Interfaces:**
- Consumes: `site.work`, `CATEGORY_LABELS`, `SectionHead`.
- Produces: `useFilter(items: WorkItem[]): { active: Category | "all"; setActive(c: Category | "all"): void; visible: WorkItem[] }`; `FilterChips({ active, onChange })` rendering `<button aria-pressed>` for "All" plus the six labels; `WorkGrid({ items, onOpen }: { items: WorkItem[]; onOpen(item: WorkItem, trigger: HTMLElement): void })`; `WorkTile({ item, onOpen })` rendering `<button class="tile" aria-label={`${title}, ${label}`}>` containing the art, `.tag` sticker (gold "FEATURED" if featured, else category label) and `.cap` caption with title and specs; `PlaceholderArt({ kind }: { kind: NonNullable<WorkItem["placeholder"]> })` returning the matching inline SVG from the draft with `aria-hidden="true"`.
- Filter fade: visible tiles get class `tile-in` (120ms opacity keyframe).

- [ ] **Step 1: Write the failing tests**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
test("All chip is pressed by default and shows seven tiles", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getAllByRole("button", { name: /, (Overlays|Alerts|Widgets & chatboxes|Panels|Websites|Art)$/ })).toHaveLength(7);
});
test("choosing Websites shows only website tiles and moves aria-pressed", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: "Websites" }));
  expect(screen.getByRole("button", { name: "Websites" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
  expect(screen.getAllByRole("button", { name: /, Websites$/ })).toHaveLength(1);
});
test("featured tile carries the FEATURED tag and wide class", () => {
  render(<App />);
  const tile = screen.getByRole("button", { name: /^Neon Shoreline stream kit,/ });
  expect(tile).toHaveClass("wide");
  expect(tile).toHaveTextContent("FEATURED");
});
```

- [ ] **Step 2: Run, expect failure.**  Run: `pnpm test src/components/WorkGrid` Expected: FAIL.

- [ ] **Step 3: Implement** the hook and components; `App` wires `useFilter(site.work)` and passes `onOpen` as a no-op for now (Task 5 replaces it).

- [ ] **Step 4: Run, expect pass.**  Run: `pnpm test` Expected: PASS.

- [ ] **Step 5: Commit**  `git commit -am "feat: work grid with category filters"` (+ attribution).

### Task 5: Lightbox

**Files:**
- Create: `src/components/Lightbox.tsx`, `src/hooks/useFocusTrap.ts`
- Modify: `src/App.tsx`, `src/styles.css` (append `.lightbox` styles: overlay `rgba(20,18,42,.85)`, panel `.card` style max-width 880px, 220ms open transition)
- Test: `src/components/Lightbox.test.tsx`

**Interfaces:**
- Consumes: `WorkItem`, `PlaceholderArt`.
- Produces: `Lightbox({ item, onClose }: { item: WorkItem | null; onClose(): void })` rendering nothing when `item` is null; otherwise `<div role="dialog" aria-modal="true" aria-labelledby="lb-title">` with the image or placeholder art, `<h3 id="lb-title">`, blurb, specs in mono, an `<a class="btn-primary" href="#quote">Commission something like this</a>`, and `item.link` as a secondary anchor only when present; a close `<button aria-label="Close">`. `useFocusTrap(ref, active)` keeps Tab inside and restores focus to the previously focused element on deactivate. Escape and overlay click call `onClose`.
- `App` holds `const [open, setOpen] = useState<{ item: WorkItem; trigger: HTMLElement } | null>(null)`; `onOpen` from Task 4 sets it; on close, focus returns to `trigger`.

- [ ] **Step 1: Write the failing tests**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
test("clicking a tile opens a dialog and Escape closes it, returning focus", async () => {
  render(<App />);
  const tile = screen.getByRole("button", { name: /^LinkHub,/ });
  await userEvent.click(tile);
  expect(screen.getByRole("dialog", { name: "LinkHub" })).toBeInTheDocument();
  await userEvent.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(tile).toHaveFocus();
});
test("placeholder tile without a link shows no img and no empty external anchor", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: /^Sticker sheet,/ }));
  const dialog = screen.getByRole("dialog");
  expect(dialog.querySelector("img")).toBeNull();
  expect(dialog.querySelectorAll("a")).toHaveLength(1); // only the commission CTA
});
test("filter state survives opening and closing the lightbox", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: "Panels" }));
  await userEvent.click(screen.getByRole("button", { name: /^Twitch panels,/ }));
  await userEvent.keyboard("{Escape}");
  expect(screen.getByRole("button", { name: "Panels" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getAllByRole("button", { name: /, Panels$/ })).toHaveLength(1);
});
```

- [ ] **Step 2: Run, expect failure.**  Run: `pnpm test src/components/Lightbox` Expected: FAIL.

- [ ] **Step 3: Implement** per Interfaces. Body gets `overflow:hidden` while open.

- [ ] **Step 4: Run, expect pass.**  Run: `pnpm test` Expected: PASS.

- [ ] **Step 5: Commit**  `git commit -am "feat: work lightbox with focus trap"` (+ attribution).

### Task 6: Services, Hexecutable band, About

**Files:**
- Create: `src/components/Services.tsx`, `src/components/HexBand.tsx`, `src/components/About.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/Sections.test.tsx`

**Interfaces:**
- Consumes: `site.services`, `site.hex`, `site.about`, `SectionHead`, `ExternalLinks` behaviour for the Hex CTA.
- Produces: `Services()` rendering four `.svc` cards, each with title, copy and `<b class="from">from {from ?? "$—"}</b>`; `HexBand()` rendering the Hexecutable lockup `<picture>` (220px, alt "Hexecutable · dev tools by Logic & Lace"), copy, and the CTA as an anchor when `site.hex.cta.href` exists, else a disabled `.btn-ghost` span "Browse dev tools · coming soon"; `About()` rendering the paragraphs and a `<dl>` of facts.

- [ ] **Step 1: Write the failing tests**

```tsx
import { render, screen } from "@testing-library/react";
import App from "../App";
test("services show the placeholder price when none is set", () => {
  render(<App />);
  expect(screen.getAllByText("from $—")).toHaveLength(4);
});
test("hex CTA is disabled until a link exists", () => {
  render(<App />);
  expect(screen.getByText(/Browse dev tools · coming soon/)).toHaveAttribute("aria-disabled", "true");
});
test("about facts render as a definition list", () => {
  render(<App />);
  expect(screen.getByRole("term", { name: "Turnaround" })).toBeInTheDocument();
  expect(screen.getByRole("definition")).toBeDefined();
});
```
(If `getByRole("term", {name})` is unsupported by the Testing Library version, assert `screen.getByText("Turnaround").tagName === "DT"`.)

- [ ] **Step 2: Run, expect failure.**  Run: `pnpm test src/components/Sections` Expected: FAIL.

- [ ] **Step 3: Implement** the three components and mount them in `App` under `#services`, `#devtools`, `#about`.

- [ ] **Step 4: Run, expect pass.**  Run: `pnpm test` Expected: PASS.

- [ ] **Step 5: Commit**  `git commit -am "feat: services, Hexecutable band, about"` (+ attribution).

### Task 7: Quote form

**Files:**
- Create: `src/components/QuoteForm.tsx`, `src/lib/submitQuote.ts`
- Modify: `src/App.tsx`
- Test: `src/lib/submitQuote.test.ts`, `src/components/QuoteForm.test.tsx`

**Interfaces:**
- Produces in `submitQuote.ts`:
```ts
export type QuotePayload = { name: string; contact: string; needs: string[]; budget: string; deadline: string; message: string; website: string /* honeypot */ };
export type SubmitResult = { ok: true } | { ok: false; reason: "not-configured" | "network" | "rejected" };
export async function submitQuote(payload: QuotePayload, endpoint: string | undefined, fetchImpl: typeof fetch = fetch): Promise<SubmitResult>;
```
Rules: if `payload.website` is non-empty, resolve `{ ok: true }` without calling `fetchImpl`. If `endpoint` is undefined or empty, resolve `{ ok: false, reason: "not-configured" }` without calling fetch. Otherwise POST JSON with `Accept: application/json`; non-2xx → `rejected`; thrown error → `network`.
- `QuoteForm()` fields with visible `<label>`s: Name (required), "Email or Discord" (required), "What do you need?" as checkbox chips from `site.form.needs` (at least one required), Budget `<select>` from `site.form.budgets` (optional), Deadline `<input type="date">` (optional), "Tell us about your channel" textarea (required), hidden honeypot `<input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true">` positioned off-screen. Submit button "Send quote request". Per-field error `<p id="{field}-err" class="err">` linked by `aria-describedby`; error copy: "Please add your name.", "How should we reach you?", "Pick at least one.", "Tell us a little about the stream.". Status region `<p role="status" class="ok">` with success "Got it. We reply within 2 days.", not-configured "Quote form isn't connected yet. Email us instead.", network/rejected "Couldn't send. Try again in a minute or email us." Endpoint read from `import.meta.env.VITE_FORM_ENDPOINT`.

- [ ] **Step 1: Write the failing unit tests for `submitQuote`**

```ts
import { submitQuote } from "./submitQuote";
const base = { name: "A", contact: "a@b.c", needs: ["alerts"], budget: "", deadline: "", message: "hi", website: "" };
test("honeypot filled resolves ok without fetching", async () => {
  const f = vi.fn();
  expect(await submitQuote({ ...base, website: "spam" }, "https://x", f as any)).toEqual({ ok: true });
  expect(f).not.toHaveBeenCalled();
});
test("missing endpoint returns not-configured without fetching", async () => {
  const f = vi.fn();
  expect(await submitQuote(base, undefined, f as any)).toEqual({ ok: false, reason: "not-configured" });
  expect(f).not.toHaveBeenCalled();
});
test("2xx resolves ok, 4xx rejected, throw network", async () => {
  expect(await submitQuote(base, "https://x", (async () => new Response("", { status: 200 })) as any)).toEqual({ ok: true });
  expect(await submitQuote(base, "https://x", (async () => new Response("", { status: 422 })) as any)).toEqual({ ok: false, reason: "rejected" });
  expect(await submitQuote(base, "https://x", (async () => { throw new Error("down"); }) as any)).toEqual({ ok: false, reason: "network" });
});
```

- [ ] **Step 2: Write the failing component tests**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuoteForm } from "./QuoteForm";
test("empty submit shows the four required errors and links them", async () => {
  render(<QuoteForm />);
  await userEvent.click(screen.getByRole("button", { name: "Send quote request" }));
  expect(screen.getByText("Please add your name.")).toBeInTheDocument();
  expect(screen.getByLabelText("Name")).toHaveAttribute("aria-describedby", "name-err");
  expect(screen.getByText("Pick at least one.")).toBeInTheDocument();
});
test("with no endpoint configured a valid submit shows the not-connected message", async () => {
  vi.stubEnv("VITE_FORM_ENDPOINT", "");
  render(<QuoteForm />);
  await userEvent.type(screen.getByLabelText("Name"), "Fox");
  await userEvent.type(screen.getByLabelText("Email or Discord"), "fox@example.test");
  await userEvent.click(screen.getByRole("checkbox", { name: "alerts" }));
  await userEvent.type(screen.getByLabelText("Tell us about your channel"), "cozy art stream");
  await userEvent.click(screen.getByRole("button", { name: "Send quote request" }));
  expect(screen.getByRole("status")).toHaveTextContent("Quote form isn't connected yet. Email us instead.");
  vi.unstubAllEnvs();
});
```

- [ ] **Step 3: Run, expect failure.**  Run: `pnpm test src/lib src/components/QuoteForm` Expected: FAIL.

- [ ] **Step 4: Implement `submitQuote` and `QuoteForm`**; mount `QuoteForm` under `#quote` in `App` with `SectionHead` title "Get a quote".

- [ ] **Step 5: Run, expect pass.**  Run: `pnpm test` Expected: PASS.

- [ ] **Step 6: Commit**  `git commit -am "feat: quote form with validation, honeypot and hosted endpoint"` (+ attribution).

### Task 8: Visual verification, build, handoff

**Files:**
- Modify: `src/styles.css` only as needed to match the draft; `README.md` if anything in Task 1's README is now wrong.

- [ ] **Step 1: Build and typecheck**  Run: `pnpm build` Expected: exit 0, no TS errors.

- [ ] **Step 2: Preview in the browser pane** at 1440×900 and 375×812 (`pnpm preview`, or the app's preview tool). Compare against `.superdesign/tmp/grimoire-shelf.html` served alongside. Check: sidebar sticky; topbar only ≤900px; grid 3/2/1 columns; Comfortaa 300 body; sticker shadows; focus rings on Tab; lightbox opens/closes; chips filter; form errors; no console errors. Fix CSS drift here, batching fixes before re-checking.

- [ ] **Step 3: Reduced motion check**  Toggle `prefers-reduced-motion` in the pane (or DevTools emulation) and confirm no twinkle or transforms.

- [ ] **Step 4: Commit**  `git commit -am "fix: visual parity with draft"` (+ attribution) if anything changed.

- [ ] **Step 5: Brain checkpoint**  Save a unique handoff in `05-Handoffs` and reconcile `03-Projects/Logic-and-Lace.md` (implemented/tested/deployed state, remaining inputs owed by Veri, deploy not done).
