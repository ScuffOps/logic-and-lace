import type { Site } from "./types";

// Every string shown on the page lives here. Shop and social links stay
// undefined until real URLs exist; they render as "coming soon".
export const site: Site = {
  intro: "Stream graphics & little tools for streamers and VTubers. Open for commissions.",
  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Dev tools", href: "#devtools" },
    { label: "About", href: "#about" },
  ],
  work: [
    {
      id: "neon-shoreline-kit",
      title: "Neon Shoreline stream kit",
      category: "overlays",
      blurb: "A full scene set for a cozy night-market stream: starting soon, live, BRB and ending, with matching alerts and panels.",
      specs: "4 scenes · 6 alerts · 3 panels",
      featured: true,
      placeholder: "scenes",
    },
    {
      id: "cam-chat-frames",
      title: "Cam & chat frames",
      category: "overlays",
      blurb: "Sticker-edged cam and chat frames with text and blank versions for OBS.",
      specs: "16:9 · 4:3",
      placeholder: "frames",
    },
    {
      id: "neon-shoreline-alerts",
      title: "Neon Shoreline alert set",
      category: "alerts",
      blurb: "Follow, sub and raid alerts with placeholders, exported as transparent WebM.",
      specs: "follow · sub · raid",
      placeholder: "alerts",
    },
    {
      id: "chatbox-widget",
      title: "Chatbox widget",
      category: "widgets",
      blurb: "A themed chat overlay that runs as an OBS browser source, badges and emotes included.",
      specs: "OBS browser source",
      placeholder: "chatbox",
    },
    {
      id: "twitch-panels",
      title: "Twitch panels",
      category: "panels",
      blurb: "A trio of profile panels in the same sticker style as the overlay.",
      specs: "320×120 · ×3",
      placeholder: "panels",
    },
    {
      id: "linkhub",
      title: "LinkHub",
      category: "websites",
      blurb: "A link hub with a radial menu and a tiny admin, built on React and Supabase.",
      specs: "React · Supabase",
      placeholder: "website",
    },
    {
      id: "sticker-sheet",
      title: "Sticker sheet",
      category: "art",
      blurb: "Twelve transparent stickers for chat, panels and socials.",
      specs: "12 pcs · transparent",
      placeholder: "stickers",
    },
  ],
  services: [
    { id: "overlay-pack", title: "Overlay pack", copy: "Cam and chat frames, countdown plate, a scene or two. Text and blank versions for OBS." },
    { id: "alerts-scenes", title: "Alerts & scenes", copy: "Follow, sub, cheer, raid alerts with placeholders, plus Starting Soon, BRB and Ending." },
    { id: "widget-chatbox", title: "Widget / chatbox", copy: "OBS browser sources, StreamElements and Twitch widgets, themed to your overlay." },
    { id: "website", title: "Website", copy: "Link hubs, commission pages, small shops. Fast, accessible, yours to keep." },
  ],
  shops: [{ label: "Etsy" }, { label: "VGen" }, { label: "Ko-fi" }],
  social: [{ label: "Twitch" }, { label: "YouTube" }, { label: "Bluesky" }],
  hex: {
    copy: "Fixed price, instant download, same sticker love. Hexecutable is the dev-tools line of Logic & Lace.",
    cta: { label: "Browse dev tools" },
  },
  about: {
    paragraphs: [
      "Logic & Lace is a small studio that draws the overlay and builds the widget behind it. We make stream graphics and little tools for streamers and VTubers: overlays, alerts, chatboxes, panels, and the occasional website.",
      "Every piece ships OBS-ready with transparent PNGs, text and blank variants, and a checked alpha channel, so it drops in without fuss.",
    ],
    facts: [
      { label: "Turnaround", value: "5–10 days" },
      { label: "Revisions", value: "2 rounds included" },
      { label: "Delivery", value: "PNG · WebM · SVG" },
      { label: "Replies", value: "within 2 days" },
    ],
  },
  form: {
    needs: ["Overlay pack", "Alerts & scenes", "Chatbox / widget", "Website", "Art", "Something else"],
    budgets: ["Not sure yet", "Under $100", "$100–$250", "$250–$500", "$500+"],
  },
};
