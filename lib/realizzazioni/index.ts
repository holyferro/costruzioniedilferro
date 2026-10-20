// Realizzazioni module: the only way pages read realizzazioni from Sanity.
import { serverClient, urlFor } from "@/sanity/lib/client";
import { allRealizzazioniQuery, featuredRealizzazioniQuery } from "@/sanity/lib/queries";
import type { RealizzazioneDoc, SanityImage } from "@/sanity/lib/types";
import { toRealizzazioni } from "./model";

export { CATEGORIE } from "./model";
export type { Categoria, Realizzazione } from "./model";

// One size for every use: next/image resizes it to each `sizes`.
const imageUrl = (image: SanityImage) => urlFor(image).width(1600).url();

/** Every realizzazione, in the archive order set in the Studio. */
export async function getRealizzazioni() {
  const docs = await serverClient.fetch<RealizzazioneDoc[]>(
    allRealizzazioniQuery,
    {},
    { next: { tags: ["realizzazioni"] } },
  );
  return toRealizzazioni(docs, imageUrl);
}

/** Up to four realizzazioni marked "in evidenza", for the Home; the first is the large card. */
export async function getRealizzazioniInEvidenza() {
  const docs = await serverClient.fetch<RealizzazioneDoc[]>(
    featuredRealizzazioniQuery,
    {},
    { next: { tags: ["homepage-realizzazioni"] } },
  );
  return toRealizzazioni(docs, imageUrl);
}
