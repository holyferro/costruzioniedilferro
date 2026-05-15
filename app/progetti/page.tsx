// app/progetti/page.tsx
import { buildMetadata } from "@/lib/seo/metadata";
import { LavoriHero } from "@/components/sections/lavori/LavoriHero";
import { LavoriManifesto } from "@/components/sections/lavori/LavoriManifesto";
import { ProgettiGrid } from "@/components/sections/lavori/ProgettiGrid";
import { HomepageCta } from "@/components/sections/HomepageCta";

export const metadata = buildMetadata({
  title: "Realizzazioni",
  description:
    "Oltre 520 cantieri completati dal 1978 tra Polesine e Veneto. Residenziale, restauro, opere pubbliche, industriale, efficientamento energetico. Ogni progetto con scheda tecnica verificabile.",
  alternates: { canonical: "/progetti" },
});

export default function ProgettiPage() {
  return (
    <>
      <LavoriHero />
      <LavoriManifesto />
      <ProgettiGrid />
      <HomepageCta
        eyebrow="Iniziamo a parlarne"
        headline="Il prossimo cantiere può essere il vostro."
        body="Portiamo lo stesso metodo, la stessa squadra e la stessa attenzione al dettaglio che vedete in ogni progetto di questo archivio."
        primaryCta={{ label: "Richiedi un sopralluogo", href: "/contatti" }}
        secondaryCta={{ label: "Richiedi un preventivo", href: "/contatti" }}
      />
    </>
  );
}
