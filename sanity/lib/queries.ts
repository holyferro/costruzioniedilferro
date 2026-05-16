import type { Realizzazione } from "./types";

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
