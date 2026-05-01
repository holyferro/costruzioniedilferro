// app/servizi/privati/page.tsx
// Pagina /servizi/privati — espansione segmento committenti privati.
// Struttura: SegmentHero → ServiceCards → Process → BonusFiscali → FAQ → CTA

import { buildMetadata } from "@/lib/seo/metadata";
import { privatiPageContent } from "@/content/segment-pages";
import { servicesContent } from "@/content/services";
import { SegmentHero } from "@/components/sections/SegmentHero";
import { SegmentServiceCards } from "@/components/sections/SegmentServiceCards";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { BonusFiscali } from "@/components/sections/privati/BonusFiscali";
import { ServicesFaq } from "@/components/sections/ServicesFaq";
import { HomepageCta } from "@/components/sections/HomepageCta";

export const metadata = buildMetadata({
  title: "Servizi per Privati",
  description:
    "Nuove costruzioni antisismiche, ristrutturazioni di pregio e case passive NZEB. Preventivi chiusi, maestranze dirette, un unico referente. Porto Viro, Rovigo, Veneto.",
  alternates: { canonical: "/servizi/privati" },
});

const privatiTarget = servicesContent.targetIndex.targets.find((t) => t.id === "privati");

export default function ServiziPrivatiPage() {
  const { hero, serviceCards, process, bonusFiscali, faq, finalCta } = privatiPageContent;
  return (
    <>
      <SegmentHero {...hero} />
      {privatiTarget?.serviceCards && (
        <SegmentServiceCards {...serviceCards} cards={privatiTarget.serviceCards} surface="white" />
      )}
      <HowWeWork {...process} />
      <BonusFiscali {...bonusFiscali} />
      <ServicesFaq {...faq} />
      <HomepageCta {...finalCta} />
    </>
  );
}
