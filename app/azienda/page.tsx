import { buildMetadata } from "@/lib/seo/metadata";
import { AziendaHero } from "@/components/sections/azienda/AziendaHero";
import { AziendaStoria } from "@/components/sections/azienda/AziendaStoria";
import { AziendaValori } from "@/components/sections/azienda/AziendaValori";
import { AziendaCertificazioni } from "@/components/sections/azienda/AziendaCertificazioni";
import { HomepageCta } from "@/components/sections/HomepageCta";

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
      <HomepageCta
        eyebrow="Iniziamo a parlarne"
        headline="Un'impresa con cui vale la pena lavorare."
        body="Portiamo la stessa solidità che leggete in questa pagina su ogni cantiere che accettiamo. Scriveteci, chiamateci o venite a trovarci in sede."
        primaryCta={{ label: "Richiedi un sopralluogo", href: "/contatti" }}
        secondaryCta={{ label: "Richiedi un preventivo", href: "/contatti" }}
      />
    </>
  );
}
