// app/servizi/pubblico/page.tsx
// Pagina /servizi/pubblico — espansione segmento enti pubblici.
// Struttura: SegmentHero → SoaSection → PubbliciWorks → ServiceCards → Process → FAQ → CTA

import { buildMetadata } from "@/lib/seo/metadata";
import { pubblicoPageContent } from "@/content/segment-pages";
import { servicesContent } from "@/content/services";
import { certificazioniContent } from "@/content/certifications";
import { SegmentHero } from "@/components/sections/SegmentHero";
import { SoaSection } from "@/components/sections/SoaSection";
import { PubbliciWorks } from "@/components/sections/pubblico/PubbliciWorks";
import { SegmentServiceCards } from "@/components/sections/SegmentServiceCards";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { ServicesFaq } from "@/components/sections/ServicesFaq";
import { HomepageCta } from "@/components/sections/HomepageCta";

export const metadata = buildMetadata({
  title: "Opere Pubbliche e Appalti",
  description:
    "Qualificazione SOA OG1-OG2-OG3-OG11 fino alla Classe VI. Lavori pubblici, restauro conservativo, scuole e strutture sanitarie nel Veneto.",
  alternates: { canonical: "/servizi/pubblico" },
});

const pubblicoTarget = servicesContent.targetIndex.targets.find((t) => t.id === "pubblico");

export default function ServiziPubblicoPage() {
  const { hero, serviceCards, worksHighlight, process, faq, finalCta } = pubblicoPageContent;
  const { soa } = certificazioniContent;
  return (
    <>
      <SegmentHero {...hero} />
      <SoaSection {...soa} />
      <PubbliciWorks {...worksHighlight} />
      {pubblicoTarget?.serviceCards && (
        <SegmentServiceCards
          {...serviceCards}
          cards={pubblicoTarget.serviceCards}
          surface="panna"
        />
      )}
      <HowWeWork {...process} />
      <ServicesFaq {...faq} />
      <HomepageCta {...finalCta} />
    </>
  );
}
