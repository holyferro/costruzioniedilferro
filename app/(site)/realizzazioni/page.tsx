import { buildMetadata } from "@/lib/seo/metadata";
import { ScrollToHash } from "@/components/ui/ScrollToHash";
import { LavoriHero } from "@/components/sections/lavori/LavoriHero";
import { LavoriManifesto } from "@/components/sections/lavori/LavoriManifesto";
import { ProgettiGrid } from "@/components/sections/lavori/ProgettiGrid";
import { HomepageCta } from "@/components/sections/HomepageCta";
import { defaultFinalCta } from "@/content/finalCta";
import { getRealizzazioni } from "@/lib/realizzazioni";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Realizzazioni",
  description:
    "Oltre 520 cantieri completati dal 1978 tra Polesine e Veneto. Residenziale, restauro, opere pubbliche, industriale, efficientamento energetico. Ogni progetto con scheda tecnica verificabile.",
  alternates: { canonical: "/realizzazioni" },
});

export default async function RealizzazioniPage() {
  const realizzazioni = await getRealizzazioni();

  return (
    <>
      <ScrollToHash />
      <LavoriHero />
      <LavoriManifesto />
      <ProgettiGrid realizzazioni={realizzazioni} />
      <HomepageCta
        {...defaultFinalCta}
        headline="Il prossimo cantiere può essere il vostro."
        body="Portiamo lo stesso metodo, la stessa squadra e la stessa attenzione al dettaglio che vedete in ogni progetto di questo archivio."
        secondaryCta={{ label: "Scopri i servizi", href: "/servizi" }}
      />
    </>
  );
}
