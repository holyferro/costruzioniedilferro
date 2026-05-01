// app/servizi/page.tsx
// Pagina /servizi — orchestratore RSC. Importa sezioni e passa dati dal content module.
// Nessun hardcoding: tutto il copy viene da content/services.ts.
// HomepageCta riutilizzato as-is da Phase 2 per consistency cross-page (D-14).
import { buildMetadata } from "@/lib/seo/metadata";
import { servicesContent } from "@/content/services";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { TargetIndex } from "@/components/sections/TargetIndex";
import { ServicesEditorialRow } from "@/components/sections/ServicesEditorialRow";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { ServicesFaq } from "@/components/sections/ServicesFaq";
import { HomepageCta } from "@/components/sections/HomepageCta";

export const metadata = buildMetadata({
  title: "Servizi",
  description:
    "Soluzioni edilizie per privati, enti pubblici e aziende. Attestazione SOA OG1-OG2-OG3-OG11. Porto Viro, Rovigo, Veneto.",
  alternates: { canonical: "/servizi" },
});

export default function ServiziPage() {
  const { hero, targetIndex, howWeWork, faq, finalCta } = servicesContent;
  return (
    <>
      <ServicesHero {...hero} />
      <TargetIndex targets={targetIndex.targets} />
      {targetIndex.targets.map((target, i) => (
        <ServicesEditorialRow
          key={target.id}
          id={target.id}
          item={target}
          variant={i % 2 === 0 ? "panna" : "white"}
          reverse={i % 2 === 1}
        />
      ))}
      <HowWeWork {...howWeWork} />
      <ServicesFaq {...faq} />
      <HomepageCta {...finalCta} />
    </>
  );
}
