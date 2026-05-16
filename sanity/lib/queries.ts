import type { Realizzazione, SanityNewsArticle, SanityNewsPreview } from "./types";

const REALIZZAZIONE_FIELDS = /* groq */ `
  _id,
  _type,
  _createdAt,
  title,
  slug,
  category,
  anno,
  luogo,
  descrizione,
  righe[] { label, valore },
  immagini[] {
    _type,
    asset,
    alt,
    caption,
    hotspot,
    crop
  },
  link[] { label, url, esterno },
  wide,
  featured,
  order
`;

export const allRealizzazioniQuery = /* groq */ `
  *[_type == "realizzazione"] | order(order asc, _createdAt desc) {
    ${REALIZZAZIONE_FIELDS}
  }
` as unknown as string & { __type: Realizzazione[] };

export const realizzazioneBySlugQuery = /* groq */ `
  *[_type == "realizzazione" && slug.current == $slug][0] {
    ${REALIZZAZIONE_FIELDS}
  }
` as unknown as string & { __type: Realizzazione };

export const featuredRealizzazioniQuery = /* groq */ `
  *[_type == "realizzazione" && featured == true] | order(order asc) [0...4] {
    ${REALIZZAZIONE_FIELDS}
  }
` as unknown as string & { __type: Realizzazione[] };

// ─── News ─────────────────────────────────────────────────────────────────────

const NEWS_ARTICLE_FIELDS = /* groq */ `
  _id,
  title,
  titleItalic,
  "slug": slug.current,
  coverImage { asset, alt },
  category,
  publishedAt,
  updatedAt,
  author,
  readTime,
  excerpt,
  heroSubtitle,
  heroMeta[] { label, valore },
  body,
  featured
`;

const NEWS_PREVIEW_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  coverImage { asset, alt },
  category,
  publishedAt,
  excerpt,
  readTime,
  featured
`;

export const allNewsQuery = /* groq */ `
  *[_type == "newsArticle"] | order(publishedAt desc) {
    ${NEWS_ARTICLE_FIELDS}
  }
` as unknown as string & { __type: SanityNewsArticle[] };

export const newsBySlugQuery = /* groq */ `
  *[_type == "newsArticle" && slug.current == $slug][0] {
    ${NEWS_ARTICLE_FIELDS}
  }
` as unknown as string & { __type: SanityNewsArticle };

export const homepageNewsQuery = /* groq */ `
  {
    "featured": *[_type == "newsArticle" && featured == true]
                | order(publishedAt desc) [0] {
      ${NEWS_PREVIEW_FIELDS}
    },
    "recent": *[_type == "newsArticle" && !(featured == true)]
              | order(publishedAt desc) [0...3] {
      ${NEWS_PREVIEW_FIELDS}
    }
  }
` as unknown as string & {
  __type: { featured: SanityNewsPreview | null; recent: SanityNewsPreview[] };
};
