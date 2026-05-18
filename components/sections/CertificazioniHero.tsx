import { InternalHero } from "@/components/sections/InternalHero";

type CertificazioniHeroProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
};

export function CertificazioniHero({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  subtitle,
}: CertificazioniHeroProps) {
  return (
    <InternalHero
      eyebrow={eyebrow}
      titleStart={titleStart}
      titleAccent={titleAccent}
      titleEnd={titleEnd}
      subtitle={subtitle}
      breadcrumbPage="Certificazioni"
      imageSrc="/images/hero2.webp"
      imageAlt="Cantiere edilferro — dettaglio lavorazioni certificate"
    />
  );
}
