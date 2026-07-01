// app/page.tsx
// Homepage — orchestratore. Importa sezioni e passa dati via props dal content module.
// Nessun hardcoding: tutto il copy viene da content/homepage.ts o content/site.ts.
import { buildMetadata } from "@/lib/seo/metadata";
import { homepageContent } from "@/content/homepage";
import { siteContent } from "@/content/site";
import { serverClient } from "@/sanity/lib/client";
import { featuredRealizzazioniQuery, homepageNewsQuery } from "@/sanity/lib/queries";
import { buildFeaturedData } from "@/sanity/lib/realizzazione-helpers";
import type { Realizzazione, SanityNewsPreview } from "@/sanity/lib/types";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
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
    serverClient.fetch<Realizzazione[]>(
      featuredRealizzazioniQuery,
      {},
      { next: { tags: ["homepage-realizzazioni"] } },
    ),
    serverClient.fetch<{ featured: SanityNewsPreview | null; recent: SanityNewsPreview[] }>(
      homepageNewsQuery,
      {},
      { next: { tags: ["homepage-news"] } },
    ),
  ]);

  const featuredData = buildFeaturedData(realizzazioni);
  const newsItems = [newsData.featured, ...newsData.recent]
    .filter((x): x is SanityNewsPreview => x !== null)
    .slice(0, 4);

  return (
    <>
      <HeroSection {...homepageContent.hero} />
      <TrustStrip {...homepageContent.trustStrip} />
      <ServiceOverview {...homepageContent.services} />
      {featuredData && (
        <FeaturedProjects
          {...homepageContent.featuredProjects}
          feature={featuredData.feature}
          tiles={featuredData.tiles}
          projectsData={featuredData.projectsData}
        />
      )}
      {newsItems.length > 0 && (
        <NewsUpdatesSection {...homepageContent.newsUpdates} items={newsItems} />
      )}
      <ServiceAreaSection {...homepageContent.serviceArea} />
      <HomepageCta {...defaultFinalCta} {...homepageContent.finalCta} />
    </>
  );
}
