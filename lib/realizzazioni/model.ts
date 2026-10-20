// Pure half of the Realizzazioni module: categories, the view model and the mapping from the Sanity
// document. No runtime imports, so the Studio schema, client components and `node --test` can load it
// without pulling in the Sanity client.
import type { RealizzazioneDoc, SanityImage } from "../../sanity/lib/types";

/** The only list of categories: the Studio schema, labels and the archive filter all read it. */
export const CATEGORIE = [
  { value: "residenziale", label: "Residenziale" },
  { value: "restauro", label: "Restauro" },
  { value: "pubblico", label: "Opere pubbliche" },
  { value: "industriale", label: "Industriale" },
  { value: "efficientamento", label: "Efficientamento" },
] as const;

export type Categoria = (typeof CATEGORIE)[number]["value"];

export type Realizzazione = {
  slug: string;
  title: string;
  place: string;
  year: string;
  description: string;
  category: Categoria;
  categoryLabel: string;
  /** Never empty: realizzazioni without images are dropped. The first one is the cover. */
  images: { src: string; alt: string }[];
  rows: { label: string; value: string }[];
  links: { label: string; href: string; external: boolean }[];
  wide: boolean;
};

/** Maps Sanity documents to Realizzazioni, keeping their order and dropping those without images. */
export function toRealizzazioni(
  docs: readonly RealizzazioneDoc[],
  imageUrl: (image: SanityImage) => string,
): Realizzazione[] {
  return docs
    .filter((doc) => doc.immagini?.length > 0)
    .map((doc) => ({
      slug: doc.slug.current,
      title: doc.title,
      place: doc.luogo,
      year: String(doc.anno),
      description: doc.descrizione ?? "",
      category: doc.category,
      categoryLabel: CATEGORIE.find((c) => c.value === doc.category)?.label ?? doc.category,
      images: doc.immagini.map((image) => ({
        src: imageUrl(image),
        alt: image.alt || `${doc.title} — ${doc.luogo}`,
      })),
      rows: (doc.righe ?? []).map((riga) => ({ label: riga.label, value: riga.valore })),
      links: (doc.link ?? []).map((l) => ({ label: l.label, href: l.url, external: l.esterno })),
      wide: doc.wide ?? false,
    }));
}
