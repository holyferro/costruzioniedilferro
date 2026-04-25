// components/sections/CertificazioniHero.tsx
// RSC. Hero testuale pagina /certificazioni — pattern identico a ServicesHero ma senza foto.

import { Eyebrow } from "@/components/ui/Eyebrow";

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
    <section className="bg-panna text-ink border-border border-b pt-20 pb-16 md:pt-28 md:pb-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-ink mt-5 font-serif text-[clamp(2.25rem,1.2rem+3.5vw,4rem)] leading-[1.08] font-medium tracking-tight">
            {titleStart}
            <em className="text-brand font-serif italic">{titleAccent}</em>
            {titleEnd}
          </h1>
          <p className="text-ink/70 mt-6 max-w-[56ch] text-lg leading-relaxed">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
