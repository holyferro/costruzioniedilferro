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

export const FEATURED_ARTICLE: NewsArticle = {
  slug: "habita",
  img: "/images/design/proj-passiva.webp",
  imageAlt: "Casa passiva Habita a Porto Viro nel Delta del Po",
  tag: "Progetto",
  date: "Aggiornato 2025",
  title: "Habita — La prima casa passiva in legno nel Delta del Po",
  excerpt:
    "Realizzata nel 2016 in collaborazione con Zennaro Giuseppe Legnami, monitorata per tre anni dall'Università di Padova. Un progetto che dimostra come comfort, sostenibilità e bellezza possano convivere anche nelle condizioni climatiche più impegnative.",
  author: "Redazione Edilferro",
  readMin: 9,
  featured: true,
};

export const NEWS_ARTICLES: NewsArticle[] = [];

export const NEWS_CATEGORIES: NewsCategory[] = [
  { id: "all", label: "Tutti gli articoli", count: 124 },
  { id: "Cantieri", label: "Cantieri", count: 42 },
  { id: "Opere pubbliche", label: "Opere pubbliche", count: 22 },
  { id: "Certificazioni", label: "Certificazioni", count: 18 },
  { id: "Restauro", label: "Restauro", count: 15 },
  { id: "Azienda", label: "Azienda", count: 16 },
  { id: "Eventi", label: "Eventi", count: 11 },
];
