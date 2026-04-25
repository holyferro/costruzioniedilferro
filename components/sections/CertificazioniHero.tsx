// components/sections/CertificazioniHero.tsx
// RSC. Hero pagina /certificazioni — layout identico a ServicesHero, immagine e testi diversi.

import Image from "next/image";
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
    <section className="bg-panna text-ink flex h-[calc(100dvh-var(--header-height))] flex-col py-10 md:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 md:px-12">
        <div className="mx-auto max-w-3xl flex-none text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-ink mt-5 font-serif text-[clamp(2.25rem,1.5rem+3.2vw,4rem)] leading-[1.1] font-medium tracking-tight lg:text-4xl xl:text-[clamp(2.25rem,1.5rem+3.2vw,4rem)]">
            {titleStart}
            <em className="text-brand font-serif italic">{titleAccent}</em>
            {titleEnd}
          </h1>
          <p className="text-ink/70 mx-auto mt-7 max-w-[52ch] text-base leading-relaxed md:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="mt-8 min-h-0 flex-1 md:mt-10">
          <div className="relative h-full overflow-hidden rounded-xl md:h-[90%] lg:mx-auto lg:max-w-3xl xl:max-w-none">
            <Image
              src="/images/hero2.webp"
              alt="Cantiere edilferro — dettaglio lavorazioni certificate"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
