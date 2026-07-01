// app/certificazioni/page.tsx
// Pagina /certificazioni — orchestratore RSC.
import { buildMetadata } from "@/lib/seo/metadata";
import { certificazioniContent } from "@/content/certifications";
import { CertificazioniHero } from "@/components/sections/CertificazioniHero";
import { SoaSection } from "@/components/sections/SoaSection";
import { CertificazioniGrid } from "@/components/sections/CertificazioniGrid";
import { RinnoviSection } from "@/components/sections/RinnoviSection";
import { HomepageCta } from "@/components/sections/HomepageCta";
import { defaultFinalCta } from "@/content/finalCta";

export const metadata = buildMetadata({
  title: "Certificazioni",
  description:
    "Certificazioni ISO 9001, attestazione SOA OG1-OG2-OG3-OG11, affiliazioni ANCE e partner di qualità. Edilferro — qualità documentata su ogni cantiere.",
  alternates: { canonical: "/certificazioni" },
});

export default function CertificazioniPage() {
  const { hero, soa, certCards, rinnovi, finalCta } = certificazioniContent;
  return (
    <>
      <CertificazioniHero {...hero} />
      <SoaSection {...soa} />
      <CertificazioniGrid certCards={certCards} eyebrow="Altre qualifiche e affiliazioni" />
      <RinnoviSection {...rinnovi} />
      <HomepageCta {...defaultFinalCta} {...finalCta} />
    </>
  );
}
