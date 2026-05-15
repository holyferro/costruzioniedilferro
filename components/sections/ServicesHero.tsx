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
    <section className="bg-panna text-ink pt-8 pb-0 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-ink mt-5 font-serif text-[clamp(2.25rem,1.5rem+3.2vw,4rem)] leading-[1.1] font-medium tracking-tight lg:text-4xl xl:text-[clamp(2.25rem,1.5rem+3.2vw,4rem)]">
            {titleStart}
            <em className="text-brand font-serif italic">{titleAccent}</em>
            {titleEnd}
          </h1>
          <p className="text-ink/70 mx-auto mt-4 max-w-[52ch] text-base leading-relaxed md:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="mt-5 md:mt-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl md:aspect-auto md:h-[clamp(320px,48vh,600px)] lg:mx-auto lg:max-w-3xl xl:max-w-none">
            <Image
              src="/images/heroservizi2.webp"
              alt="Cantiere edilferro — panoramica lavori"
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
