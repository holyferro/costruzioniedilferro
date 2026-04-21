// components/sections/ServicesHero.tsx
// RSC. Hero introduttivo pagina /servizi: testuale, centrato, su bg-panna.
// Distinto dall'HeroSection homepage (che ha sfondo dark + foto fill).

import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";

type ServicesHeroProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
};

export function ServicesHero({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  subtitle,
}: ServicesHeroProps) {
  return (
    <section className="bg-panna text-ink flex h-[calc(100dvh-var(--header-height))] flex-col py-12 md:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 md:px-12">
        {/* Image first — 90% of available flex space */}
        <div className="min-h-0 flex-1">
          <div className="relative h-[90%] overflow-hidden rounded-xl">
            <Image
              src="/images/heroservizi.webp"
              alt="Cantiere edilferro — panoramica lavori"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Headline below */}
        <div className="mx-auto mt-8 max-w-3xl flex-none text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-ink mt-5 font-serif text-[clamp(2.25rem,1.5rem+3.2vw,4rem)] leading-[1.1] font-medium tracking-tight">
            {titleStart}
            <em className="text-brand font-serif italic">{titleAccent}</em>
            {titleEnd}
          </h1>
          <p className="text-ink/70 mx-auto mt-7 max-w-[52ch] text-base leading-relaxed md:text-lg">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
