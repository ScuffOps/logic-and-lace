# Logic & Lace site ／ design

Date: 2026-11-21 · Status: awaiting Veri's approval

## Intent
A single-page portfolio and commission front door for Logic & Lace, so streamers and VTubers can see past work and either request a custom quote or buy fixed-price items from external shops. The studio speaks; no personal name appears.

## Goals
- Show the work first: image-led grid with category filters.
- Two buying paths: a "Get a quote" form, and links out to Etsy / VGen / Ko-fi.
- Hexecutable appears as a dev-tools section inside the site, not a separate site.
- Dark mode only. Sticker-style brand (thick outlines, flat fills, hard offset shadows), Fredoka headings + Comfortaa Light body + JetBrains Mono specs (Veri asked for a thin sans body like Meticula / Minima / Comfortaa; Comfortaa is the OFL one).
- Fast static site, easy for Veri to update by editing one data file.

## Non-goals
- No CMS, no auth, no database, no cart or checkout.
- No blog, no light theme, no multi-page routing.
- No server-side code of our own; the form posts to a hosted endpoint.

## Anti-goals
- Foxes, VTuber-model imagery, pink/neon gradients, glassmorphism, a personal name in copy.
- Placeholder content shipped as if real: missing links and prices stay visibly "coming soon", not invented.

## Constraints
- Stack must match LinkHub: Vite + React 19 + TypeScript, pnpm.
- Brand files available locally: dark 3000w lockups for Logic & Lace and Hexecutable, light/dark lace-grimoire lockups. Icon PNGs and SVG masters are still only in the cloud sandbox.
- Portfolio thumbnails do not exist locally yet; the build ships with authored SVG placeholders that are swapped by editing the data file.
- Inputs still owed by Veri: project links, shop URLs, socials, quote-form destination email, starting prices.

## Approaches considered
1. **Vite + React + TS static site, data-driven (chosen).** One `site.ts` data file drives work tiles, services, shops and socials. Form posts to Web3Forms or Formspree. Trade-off: a build step and a small React bundle for what is mostly static content, in exchange for typed data, components that match LinkHub, and an easy later upgrade to a lightbox or Resend-backed form.
2. **Plain HTML + CSS from the draft, no build.** Fastest to ship, zero tooling. Trade-off: updating seven tiles and four cards by hand in HTML gets error-prone, and adding a lightbox or filter logic means untyped script. Rejected because Veri will edit content often.
3. **Astro.** Great static output and image handling. Trade-off: a second framework next to LinkHub for no gain at this size. Rejected to keep one stack.

## Decisions (as decided)
- **Layout:** B "Grimoire shelf": sticky 300px left sidebar (lockup, intro, nav, Get a quote, Shop ready-made, shops, socials), scrolling right column (filter chips, work grid with one wide featured tile, services, Hexecutable band, about, quote form, footer). Collapses to a top bar below 900px; grid goes 3 → 2 → 1 columns.
- **Visual system:** as written in `.superdesign/design-system.md` and rendered in `.superdesign/tmp/grimoire-shelf.html`. That HTML is the visual reference the React build must match.
- **Audience and voice:** streamers and VTubers; studio voice only.
- **Form:** fields name, email or Discord, need chips, budget (optional), deadline (optional), message. Posts to a hosted endpoint whose access key lives in an env var (`VITE_FORM_ENDPOINT`). Success state "Got it. We reply within 2 days." Inline errors per field. Honeypot field for spam.
- **Filters:** client-side, chips with `aria-pressed`, 120ms fade.
- **Lightbox:** in scope. Opens on tile click with image, one sentence, specs, and "Commission something like this" linking to the form. Focus trapped, Escape closes.
- **Content file:** `src/data/site.ts` typed with Zod-free plain TS types (no runtime validation needed for static data). Every tile: id, title, category, blurb, specs, image (or `placeholder: true`), optional link.
- **Images:** `public/brand/` for the two lockups (resized to 1200w WebP plus PNG fallback). Work images under `public/work/`.
- **Deploy:** Cloudflare Pages (my call: static output, free tier, no account change needed beyond connecting the repo). Vercel remains a one-command alternative. Nothing is deployed until Veri says so.
- **Repo:** `git init` in `~/Developer/web/logic-and-lace`, `.superpowers/` and `.superdesign/tmp/` gitignored, `brand/` source files kept.
- **Motion:** 160ms hover, 220ms lightbox, sparkle twinkle only; all off under `prefers-reduced-motion`.

## Left to the builder
- Component split and file names.
- Exact chip-filter animation implementation.
- WebP conversion tooling (sips or sharp).
- Whether to inline the SVG placeholders or load them as files.

## Acceptance
- Renders at 1440×900 and 375×812 matching the draft.
- Keyboard: every control reachable, visible focus, lightbox traps and closes on Escape.
- `pnpm build` passes with strict TypeScript; no console errors.
- Form submits to the endpoint in a local test when the env var is set, and shows the inline error when it is not.
