# Logic & Lace

The studio's portfolio and commission front door: stream overlays, alerts, widgets, panels and small websites for streamers and VTubers. One page, dark only. Visitors can browse past work, request a quote, or follow links to the shops.

## Run

```bash
pnpm install
pnpm dev        # local dev server
pnpm build      # typecheck + production build into dist/
pnpm preview    # serve dist/
pnpm test       # vitest
```

`pnpm` is not on the PATH here; `npx pnpm@10 <command>` works the same.

## Editing content

Everything shown on the page lives in `src/data/site.ts`: work tiles, services and starting prices, shop and social links, the Hexecutable copy, the About facts, and the quote form's chips. Put work images in `public/work/` and reference them from a tile's `image` field; a tile with `placeholder` instead shows drawn art until a real image exists. A shop or social entry with no `href` renders as "coming soon" rather than a dead link.

## Quote form

The form posts JSON to the URL in `VITE_FORM_ENDPOINT` (Web3Forms or Formspree). Copy `.env.example` to `.env` and fill it in. With no endpoint set, the form tells the visitor it isn't connected yet instead of failing silently.

## Brand assets

`public/brand/` holds the 1200px lockups used on the page (PNG only; this Mac's `sips` cannot write WebP). The 3000px sources are in `brand/`.

## Deploy

Not deployed yet. Cloudflare Pages: build command `pnpm build`, output directory `dist`, add `VITE_FORM_ENDPOINT` as a build variable. Vercel works the same with its Vite preset.
