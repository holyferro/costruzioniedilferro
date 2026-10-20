// app/page.tsx
// Homepage — orchestratore. Importa sezioni e passa dati via props dal content module.
// Nessun hardcoding: tutto il copy viene da content/homepage.ts o content/site.ts.
import { buildMetadata } from "@/lib/seo/metadata";
import { homepageContent } from "@/content/homepage";
import { serverClient } from "@/sanity/lib/client";
import { homepageNewsQuery } from "@/sanity/lib/queries";
import type { SanityNewsPreview } from "@/sanity/lib/types";
import { getRealizzazioniInEvidenza } from "@/lib/realizzazioni";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { DalProgettoAllOpera } from "@/components/sections/DalProgettoAllOpera";
import { PiantaSoluzioni } from "@/components/sections/PiantaSoluzioni";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { NewsUpdatesSection } from "@/components/sections/NewsUpdatesSection";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { HomepageCta } from "@/components/sections/HomepageCta";
import { defaultFinalCta } from "@/content/finalCta";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: { absolute: "Costruzioni Edilferro S.r.l. — Impresa edile a Porto Viro (RO)" },
  description:
    "Costruzioni Edilferro S.r.l., impresa edile con 45 anni di attività a Porto Viro (RO). Edilizia residenziale, opere pubbliche, restauro e capannoni industriali.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Costruzioni Edilferro S.r.l. — Impresa edile a Porto Viro (RO)",
    description:
      "Costruzioni Edilferro S.r.l., impresa edile con 45 anni di attività a Porto Viro (RO). Edilizia residenziale, opere pubbliche, restauro e capannoni industriali.",
  },
});

export default async function Home() {
  const [realizzazioni, newsData] = await Promise.all([
    getRealizzazioniInEvidenza(),
    serverClient.fetch<{ featured: SanityNewsPreview | null; recent: SanityNewsPreview[] }>(
      homepageNewsQuery,
      {},
      { next: { tags: ["homepage-news"] } },
    ),
  ]);

  const newsItems = [newsData.featured, ...newsData.recent]
    .filter((x): x is SanityNewsPreview => x !== null)
    .slice(0, 4);

  return (
    <>
      <HeroSection {...homepageContent.hero} />
      <TrustStrip {...homepageContent.trustStrip} />
      <DalProgettoAllOpera {...homepageContent.fromDrawing} />
      <ServiceOverview {...homepageContent.services} />
      <PiantaSoluzioni {...homepageContent.floorPlan} />
      {realizzazioni.length > 0 && (
        <FeaturedProjects {...homepageContent.featuredProjects} realizzazioni={realizzazioni} />
      )}
      {newsItems.length > 0 && (
        <NewsUpdatesSection {...homepageContent.newsUpdates} items={newsItems} />
      )}
      <ServiceAreaSection {...homepageContent.serviceArea} />
      <HomepageCta {...defaultFinalCta} {...homepageContent.finalCta} />
    </>
  );
}
