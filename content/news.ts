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
  slug: "palestra-gramsci",
  img: "/images/prima-pietra-palestra-gramsci.webp",
  imageAlt: "Cerimonia della prima pietra — nuova palestra Liceo Morin e Istituto Gramsci, Mestre",
  tag: "Opere pubbliche",
  date: "14 Maggio 2026",
  title: "Al via i lavori della nuova palestra al polo scolastico della Gazzera, Mestre",
  excerpt:
    "Costruzioni Edilferro Srl è la ditta incaricata di realizzare la nuova palestra del Liceo Morin e dell'Istituto Gramsci/Luzzatti, commissionata dalla Città Metropolitana di Venezia. Consegna prevista entro novembre 2026.",
  author: "Redazione Edilferro",
  readMin: 4,
  featured: true,
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "habita",
    img: "/images/design/proj-passiva.webp",
    imageAlt: "Casa passiva Habita a Porto Viro nel Delta del Po",
    tag: "Progetto",
    date: "Aggiornato 2025",
    title: "Habita — La prima casa passiva in legno nel Delta del Po",
    excerpt:
      "Realizzata nel 2016 in collaborazione con Zennaro Giuseppe Legnami, monitorata per tre anni dall'Università di Padova.",
    author: "Redazione Edilferro",
    readMin: 9,
  },
];

export const NEWS_CATEGORIES: NewsCategory[] = [
  { id: "all", label: "Tutti gli articoli", count: 124 },
  { id: "Cantieri", label: "Cantieri", count: 42 },
  { id: "Opere pubbliche", label: "Opere pubbliche", count: 22 },
  { id: "Certificazioni", label: "Certificazioni", count: 18 },
  { id: "Restauro", label: "Restauro", count: 15 },
  { id: "Azienda", label: "Azienda", count: 16 },
  { id: "Eventi", label: "Eventi", count: 11 },
];
