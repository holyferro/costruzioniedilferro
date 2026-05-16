export type SanityAsset = {
  _ref: string;
  _type: "reference";
};

export type SanityImage = {
  _type: "image";
  asset: SanityAsset;
  alt: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type RealizzazioneCategory =
  | "residenziale"
  | "restauro"
  | "pubblico"
  | "industriale"
  | "efficientamento";

export type RealizzazioneRiga = {
  label: string;
  valore: string;
};

export type RealizzazioneLink = {
  label: string;
  url: string;
  esterno: boolean;
};

export type Realizzazione = {
  _id: string;
  _type: "realizzazione";
  _createdAt: string;
  title: string;
  slug: { current: string };
  category: RealizzazioneCategory;
  anno: number;
  luogo: string;
  descrizione?: string;
  righe?: RealizzazioneRiga[];
  immagini: SanityImage[];
  link?: RealizzazioneLink[];
  wide?: boolean;
  featured?: boolean;
  order?: number;
};

export type FeaturedRealizzazione = Pick<
  Realizzazione,
  | "_id"
  | "title"
  | "slug"
  | "category"
  | "anno"
  | "luogo"
  | "descrizione"
  | "immagini"
  | "righe"
  | "link"
  | "featured"
  | "order"
>;

export type NewsArticleCategory =
  | "Progetto"
  | "Cantieri"
  | "Opere pubbliche"
  | "Certificazioni"
  | "Restauro"
  | "Azienda"
  | "Eventi";

export type NewsHeroMeta = {
  label: string;
  valore: string;
};

export type SanityNewsArticle = {
  _id: string;
  title: string;
  titleItalic?: string;
  slug: string;
  coverImage: SanityImage;
  category: NewsArticleCategory;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readTime?: string;
  excerpt: string;
  heroSubtitle: string;
  heroMeta: NewsHeroMeta[];
  body: unknown[];
  featured?: boolean;
};

export type SanityNewsPreview = Pick<
  SanityNewsArticle,
  | "_id"
  | "title"
  | "slug"
  | "coverImage"
  | "category"
  | "publishedAt"
  | "excerpt"
  | "readTime"
  | "featured"
>;
