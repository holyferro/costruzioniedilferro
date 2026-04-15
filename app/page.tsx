// app/page.tsx
// Homepage — orchestratore. Importa sezioni e passa dati via props dal content module.
// Nessun hardcoding: tutto il copy viene da content/homepage.ts o content/site.ts.
import { buildMetadata } from "@/lib/seo/metadata";
import { homepageContent } from "@/content/homepage";
import { siteContent } from "@/content/site";
import { primaryCta } from "@/content/navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { HomepageCta } from "@/components/sections/HomepageCta";
import { MobileStickyBar } from "@/components/ui/MobileStickyBar";

export const metadata = buildMetadata({
  title: "Impresa Edile — Porto Viro, Rovigo, Veneto",
  description: siteContent.brand.tagline,
  alternates: { canonical: "/" },
});

export default function Home() {
  return (
    <>
      <HeroSection {...homepageContent.hero} />
      <TrustStrip {...homepageContent.trustStrip} />
      <ServiceOverview {...homepageContent.services} />
      <ServiceAreaSection {...homepageContent.serviceArea} />
      <HomepageCta {...homepageContent.finalCta} />
      <MobileStickyBar
        ctaLabel={primaryCta.label}
        ctaHref={primaryCta.href}
        phoneDisplay={siteContent.contact.phone.display}
        phoneTel={siteContent.contact.phone.tel}
      />
    </>
  );
}
