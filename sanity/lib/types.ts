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

export type NewsArticle = {
  _id: string;
  _type: "newsArticle";
  title: string;
  slug: { current: string };
  coverImage?: SanityImage;
  publishedAt?: string;
};
