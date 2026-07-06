import { buildMetadata } from "@/lib/seo/metadata";
import { AziendaHero } from "@/components/sections/azienda/AziendaHero";
import { AziendaStoria } from "@/components/sections/azienda/AziendaStoria";
import { AziendaValori } from "@/components/sections/azienda/AziendaValori";
import { AziendaCertificazioni } from "@/components/sections/azienda/AziendaCertificazioni";
import { AziendaTestimonianze } from "@/components/sections/azienda/AziendaTestimonianze";
import { HomepageCta } from "@/components/sections/HomepageCta";
import { defaultFinalCta } from "@/content/finalCta";

export const metadata = buildMetadata({
  title: "L'Azienda",
  description:
    "Dal 1978 a Porto Viro. Tre generazioni, 42 persone in organico, SOA classifica IV, ISO 9001. Impresa Edile S.r.l. — un'impresa familiare con struttura professionale.",
  alternates: { canonical: "/azienda" },
});

export default function AziendaPage() {
  return (
    <>
      <AziendaHero />
      <AziendaStoria />
      <AziendaValori />
      <AziendaCertificazioni />
      <AziendaTestimonianze />
      <HomepageCta
        {...defaultFinalCta}
        headline="Un'impresa con cui vale la pena lavorare."
        body="Portiamo la stessa solidità che leggete in questa pagina su ogni cantiere che accettiamo. Scriveteci, chiamateci o venite a trovarci in sede."
      />
    </>
  );
}
