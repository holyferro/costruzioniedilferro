export type NewsArticle = {
  slug: string;
  img: string;
  imageAlt: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readMin: number;
  author?: string;
  featured?: boolean;
};

export type NewsCategory = {
  id: string;
  label: string;
  count: number;
};

const PLACEHOLDER_IMG = "/images/azienda/hero-azienda.webp";
const PLACEHOLDER_ALT = "Articolo in preparazione";

export const FEATURED_ARTICLE: NewsArticle = {
  slug: "articolo-evidenza",
  img: PLACEHOLDER_IMG,
  imageAlt: PLACEHOLDER_ALT,
  tag: "Cantieri",
  date: "—",
  title: "Titolo articolo in evidenza",
  excerpt:
    "Il contenuto di questo articolo è in preparazione. Torneremo presto con aggiornamenti dai nostri cantieri, certificazioni e iniziative aziendali.",
  author: "Redazione Edilferro",
  readMin: 0,
  featured: true,
};

export const NEWS_ARTICLES: NewsArticle[] = Array.from({ length: 9 }, (_, i) => ({
  slug: `articolo-${i + 1}`,
  img: PLACEHOLDER_IMG,
  imageAlt: PLACEHOLDER_ALT,
  tag: ["Cantieri", "Certificazioni", "Azienda", "Restauro", "Opere pubbliche", "Eventi"][i % 6]!,
  date: "—",
  title: `Titolo articolo ${i + 1}`,
  excerpt: "Il contenuto di questo articolo è in preparazione.",
  readMin: 0,
}));

export const NEWS_CATEGORIES: NewsCategory[] = [
  { id: "all", label: "Tutti gli articoli", count: 0 },
  { id: "Cantieri", label: "Cantieri", count: 0 },
  { id: "Opere pubbliche", label: "Opere pubbliche", count: 0 },
  { id: "Certificazioni", label: "Certificazioni", count: 0 },
  { id: "Restauro", label: "Restauro", count: 0 },
  { id: "Azienda", label: "Azienda", count: 0 },
  { id: "Eventi", label: "Eventi", count: 0 },
];
