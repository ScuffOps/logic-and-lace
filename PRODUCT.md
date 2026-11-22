# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React 19 + TypeScript, static build (user's choice, 2026-11-21; matches LinkHub). Deploy target: Cloudflare Pages or Vercel, undecided. Quote form: hosted endpoint (Web3Forms or Formspree) first, Resend-backed function later if wanted.

## Users

Primary: Twitch and YouTube streamers and VTubers who need stream graphics and small tools: overlays, scenes, alerts, chatboxes, widgets, panels, and sometimes a website. They arrive from a social link or a referral, usually on a phone, deciding within one scroll whether the work fits their channel and how to ask for a quote.

## Product Purpose

Logic & Lace is the studio portfolio and commission front door for Veri's client work. It shows past and current work, states what can be commissioned, and gives two paths to pay: a "get a quote" form for custom commissions and links to external shops (Etsy, VGen, Ko-fi or similar) for evergreen fixed-price items. Success: a visitor trusts the work within a scroll and submits a quote request or opens the shop.

## Positioning

Code and craft from one maker: the same studio draws the overlay and builds the widget or site behind it. Hexecutable is the dev-tools line of Logic & Lace ("dev tools by Logic & Lace"); it appears as a section and shop link, not a separate site.

## Brand commitments

- Logos are final (logos-final-v1, 2026-11-21): Lace Grimoire icon (chubby spellbook, white `</>` cover, lace trim, ribbon bookmark), LOGIC & LACE wordmark in ivory with only the `&` in pastel indigo, tagline CRAFTED WITH CARE. Hexecutable: Hex Potion icon, HEX in indigo. Files in `brand/`; only the 3000w dark lockups, the light/dark lockups and the v0.2 contact sheets are on this machine. The 2048/112/56/28 icons and the SVG masters still live in the cloud session sandbox.
- Lockup type is Fredoka (OFL). Earlier concept round used Cormorant Garamond, Cinzel and JetBrains Mono (all OFL).
- Sampled palette from the lockups: night `#2a2456`, ivory `#fff8ef`, periwinkle `#8ea3ff`, indigo `#6479e0`, lilac `#f3eeff`, gold accent on the bookmark.
- Style: kawaii sticker direction: thick coloured outlines, flat pastel fills, one cel shade, top-left shine, rounded small-caps lettering.
- Site is dark mode only (user decision 2026-11-21).
- No foxes and nothing from the Veri VTuber palette; Logic & Lace is its own brand.
- Site voice is the studio, not the person: "Logic & Lace", never "Veri", in copy and footer.

## Content inventory

- Portfolio entries to seed from the Artsuu catalog (`brand/artsuu-catalog.json`): Neon Shoreline OBS theme, scenes, cam and chat overlays, alert set, Twitch panels, animated scenes (planned), plus the two logo suites. Thumbnails for these are not on this machine yet.
- User will supply links to current and past projects, shop links, socials, and the quote form's destination email. Open as of 2026-11-21.

## Open decisions

- Deploy host (Cloudflare Pages vs Vercel).
- Starting prices per service, if any are shown.
- Which shops are live (Etsy, VGen, Ko-fi).
