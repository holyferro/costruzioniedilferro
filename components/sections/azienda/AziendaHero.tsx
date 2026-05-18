import { InternalHero } from "@/components/sections/InternalHero";

export function AziendaHero() {
  return (
    <InternalHero
      eyebrow="L'Azienda"
      titleStart="Da una storia familiare, "
      titleAccent="un'impresa che costruisce futuro"
      titleEnd="."
      subtitle="Esperienza sul campo, attenzione ai dettagli e un impegno costante verso qualità, sicurezza e risultati concreti."
      breadcrumbPage="L'Azienda"
      imageSrc="/images/azienda/hero-azienda.webp"
      imageAlt="Cantiere Edilferro — dettaglio lavorazione"
      badges={["Dal 1981", "Porto Viro · Rovigo", "Impresa famigliare"]}
    />
  );
}
