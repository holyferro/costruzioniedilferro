// app/page.tsx
// Homepage — orchestratore. Importa sezioni e passa dati via props dal content module.
// Nessun hardcoding: tutto il copy viene da content/homepage.ts o content/site.ts.
import { buildMetadata } from "@/lib/seo/metadata";
import { homepageContent } from "@/content/homepage";
import { siteContent } from "@/content/site";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { HomepageCta } from "@/components/sections/HomepageCta";

export const metadata = buildMetadata({
  title: "Impresa Edile — Porto Viro, Rovigo, Veneto",
  description: siteContent.brand.tagline,
  alternates: { canonical: "/" },
});

export default function Home() {
  return (
    <>
      {/* Hero + TrustStrip occupano esattamente lo spazio visibile sotto l'header */}
      <div
        className="flex flex-col"
        style={{ height: "calc(100svh - var(--header-height, 116px))" }}
      >
        <HeroSection {...homepageContent.hero} className="min-h-0 flex-1" />
        <TrustStrip {...homepageContent.trustStrip} />
      </div>
      <ServiceOverview {...homepageContent.services} />
      <ServiceAreaSection {...homepageContent.serviceArea} />
      <HomepageCta {...homepageContent.finalCta} />
    </>
  );
}
