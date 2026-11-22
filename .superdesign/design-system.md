# Logic & Lace — design system (v1, 2026-11-21)

## Product context
Logic & Lace is a studio portfolio and commission front door. It shows stream graphics and small tools (overlays, scenes, alerts, chatboxes, widgets, Twitch panels, websites, art) made for streamers and VTubers, and gives two ways to buy: a "Get a quote" form for custom commissions and links to external shops (Etsy, VGen, Ko-fi) for fixed-price items. Hexecutable is the dev-tools line of Logic & Lace ("dev tools by Logic & Lace"): a section and shop link, not a separate site.

Voice: the studio speaks, never a person. "Logic & Lace", "we", "the studio". Warm, candid, a little playful, never corporate. Tagline: CRAFTED WITH CARE.

Mode: Experience (portfolio) with a Persuade job (commission). The work leads; the interface recedes; the quote button is always reachable.

## Site structure (single page, dark only)
Layout: "Grimoire shelf". A sticky left sidebar (about 300 px on desktop) holds the Lace Grimoire lockup, a one-line studio intro, section nav (Work, Services, Dev tools, About), a primary "Get a quote" button, a secondary "Shop ready-made" button, and shop/social links at the bottom. The right column scrolls: filter chips (All, Overlays, Alerts, Widgets & chatboxes, Panels, Websites, Art), a work grid with one featured tile spanning two columns, a Services block with starting-price cards, a Hexecutable band, a short About, then the Get-a-quote form and a footer. On phones the sidebar collapses to a top bar with the small lockup and the quote button; sections stack.

Work tiles: image-first cards with a small category tag sticker in the corner and a caption bar on hover/tap. Clicking opens a lightbox with the piece, a sentence, specs, and "Commission something like this".

Quote form fields: name, email or Discord, what do you need (chips: overlay pack, alerts, chatbox/widget, website, art, other), budget range (optional), deadline (optional), tell us about your channel (textarea), submit "Send quote request". Success state: "Got it. We reply within 2 days." Error state inline per field.

## Colour (dark mode only)
- Page background: night `#1c1a33`
- Raised surface (sidebar, cards): `#232046`
- Outline / ink: `#2a2456` on light fills; `#14122a` as the deep outline on dark surfaces
- Ivory text and lettering: `#fff8ef`
- Muted text: `#b9b4d6`
- Periwinkle accent (primary buttons, chips on, the `&`): `#8ea3ff`
- Indigo (hover, links, Hex potion): `#6479e0`
- Lilac (sticker borders, light fills): `#f3eeff`
- Gold (small highlights only: featured tag, bookmark): `#f5c76a`
- Focus ring: `#8ea3ff` 3 px outside, 2 px offset.
Use only these. No pink, no neon gradients, no pure black, no pure white backgrounds.

## Type
- Display and headings: Fredoka (Google Fonts, OFL), weight 600–700, small caps feel via uppercase + letter-spacing 0.06em for labels. Headings sentence case otherwise.
- Body and UI: Comfortaa (OFL, Google Fonts), thin geometric sans. Weight 300 for body at 16–17 px, line-height 1.6; 400 for small UI labels and form fields (never 300 below 14 px, for legibility on the night background); 700 only for button text. Veri asked for a thin sans like Meticula/Minima/Comfortaa; Comfortaa is the freely licensed one.
- Code / specs: JetBrains Mono (OFL), 13 px, for dimensions and file specs only.
Scale: 44/32/24/18/16/14/12 px. Headline max 2 lines.

## Shape, borders, shadow (the sticker look)
- Everything interactive is a "sticker": 2.5 px solid outline in the ink colour, radius 14 px (buttons 999 px pill), and a hard offset shadow `3px 3px 0 #14122a`. On press the shadow collapses to `1px 1px 0` and the element shifts 2 px.
- Cards: 2.5 px outline, radius 16 px, surface fill, hard shadow. A subtle lilac 1 px inner ring on hover.
- One cel shade: a slightly darker band at the bottom 12 % of filled shapes is allowed; no soft gradients, no blur, no glass.
- Lace divider: a repeating scallop made of 8 px circles in ivory at 40 % opacity, used once between the hero/sidebar and the work grid on mobile, and under section headings.
- Sparkles: four-point star glyph in periwinkle or gold, tiny, used at most three per viewport.

## Spacing and grid
Base 8 px. Section padding 64 px desktop / 40 px mobile. Grid gap 16 px. Work grid: 3 columns ≥ 1200 px, 2 columns ≥ 720 px, 1 column below. Sidebar 300 px, content max-width 1120 px.

## Motion
Short and springy: 160 ms ease-out for hover, 220 ms for lightbox open, chips filter with a 120 ms fade. Sparkles may twinkle (opacity 0.6→1, 2 s, alternate). Respect prefers-reduced-motion: no twinkle, no transforms.

## Logos (Brand Assets; use the exact files)
- Logic & Lace lockup, dark background version, 3000 w: use in the sidebar at 240 px wide. Never recreate with text.
- Hexecutable lockup, dark background version, 3000 w: use in the Hexecutable band at 220 px wide.
- No other logo positions. Do not invent icons for the brand.

## Accessibility
Contrast AA on all text (ivory on night passes). Visible focus rings. Filter chips are buttons with aria-pressed. Lightbox traps focus and closes on Escape. Form labels visible, errors tied with aria-describedby. Touch targets ≥ 44 px.

## Don'ts
No foxes, no VTuber-model imagery, no pink/purple neon gradients, no glassmorphism, no serif display type, no light mode, no personal name in copy.
