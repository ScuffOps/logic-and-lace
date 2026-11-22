export type Category = "overlays" | "alerts" | "widgets" | "panels" | "websites" | "art";

export const CATEGORY_LABELS: Record<Category, string> = {
  overlays: "Overlays",
  alerts: "Alerts",
  widgets: "Widgets & chatboxes",
  panels: "Panels",
  websites: "Websites",
  art: "Art",
};

export type PlaceholderKind = "scenes" | "frames" | "alerts" | "chatbox" | "panels" | "website" | "stickers";

export type WorkItem = {
  id: string;
  title: string;
  category: Category;
  blurb: string;
  specs: string;
  featured?: boolean;
  image?: { src: string; alt: string };
  placeholder?: PlaceholderKind;
  link?: { href: string; label: string };
};

export type Service = { id: string; title: string; copy: string; from?: string };

export type ExternalLink = { label: string; href?: string };

export type Site = {
  intro: string;
  nav: { label: string; href: string }[];
  work: WorkItem[];
  services: Service[];
  shops: ExternalLink[];
  social: ExternalLink[];
  hex: { copy: string; cta: ExternalLink };
  about: { paragraphs: string[]; facts: { label: string; value: string }[] };
  form: { needs: string[]; budgets: string[] };
  /** Studio contact shown when the form cannot send. Undefined until Veri supplies it. */
  contact?: { email?: string };
};
