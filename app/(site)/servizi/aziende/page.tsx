// app/servizi/aziende/page.tsx
// Pagina /servizi/aziende — espansione segmento aziende e professionisti.
// Struttura: SegmentHero → AziendeValueSplit → ServiceCards → Process → FAQ → CTA

import { buildMetadata } from "@/lib/seo/metadata";
import { aziendePageContent } from "@/content/segment-pages";
import { servicesContent } from "@/content/services";
import { SegmentHero } from "@/components/sections/SegmentHero";
import { AziendeValueSplit } from "@/components/sections/aziende/AziendeValueSplit";
import { SegmentServiceCards } from "@/components/sections/SegmentServiceCards";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { ServicesFaq } from "@/components/sections/ServicesFaq";
import { HomepageCta } from "@/components/sections/HomepageCta";

export const metadata = buildMetadata({
  title: "Servizi per Aziende e Professionisti",
  description:
    "General contractor per strutture industriali, commerciali e direzionali. Manutenzione programmata, partner realizzativo per studi A+I. Veneto.",
  alternates: { canonical: "/servizi/aziende" },
});

const professionistiTarget = servicesContent.targetIndex.targets.find(
  (t) => t.id === "professionisti",
);

export default function ServiziAziendePage() {
  const { hero, valueSplit, serviceCards, process, faq, finalCta } = aziendePageContent;
  return (
    <>
      <SegmentHero {...hero} />
      <AziendeValueSplit {...valueSplit} />
      {professionistiTarget?.serviceCards && (
        <SegmentServiceCards
          {...serviceCards}
          cards={professionistiTarget.serviceCards}
          surface="panna"
        />
      )}
      <HowWeWork {...process} />
      <ServicesFaq {...faq} />
      <HomepageCta {...finalCta} />
    </>
  );
}
