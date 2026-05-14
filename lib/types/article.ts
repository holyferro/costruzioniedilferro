export type ArticleBlock =
  | { type: "lead"; text: string }
  | { type: "paragraph"; text: string; html?: true }
  | { type: "section"; eyebrow: string; title: string; blocks: ArticleBlock[] }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "univ-badge"; title: string; text: string; logo?: string }
  | {
      type: "advantages";
      eyebrow: string;
      title: string;
      titleItalic: string;
      items: { title: string; description: string }[];
    }
  | {
      type: "partners";
      items: { name: string; role: string; description: string; logo?: string }[];
    }
  | { type: "specs"; rows: [string, string][] }
  | {
      type: "cta";
      kicker: string;
      title: string;
      titleItalic: string;
      text: string;
      ctaLabel: string;
      ctaHref: string;
    };

export type Article = {
  slug: string;
  title: string;
  titleItalic?: string;
  excerpt: string;
  category:
    | "Progetto"
    | "Cantieri"
    | "Opere pubbliche"
    | "Certificazioni"
    | "Restauro"
    | "Azienda"
    | "Eventi";
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  author: string;
  cover: string;
  coverAlt: string;
  featured?: boolean;
  heroMeta: { label: string; value: string }[];
  heroSubtitle: string;
  body: ArticleBlock[];
};
