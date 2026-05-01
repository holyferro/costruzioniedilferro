// components/sections/SegmentServiceCards.tsx
// RSC wrapper. Intro copy + ServiceCardInteractive per le pagine di espansione segmento.
// Riceve le card dal content del segmento, le visualizza in griglia interattiva.

import { ServiceCardInteractive } from "@/components/sections/ServiceCardInteractive";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ServiceCard } from "@/content/services";

type SegmentServiceCardsProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  body: string;
  cards: readonly ServiceCard[];
  surface?: "panna" | "white";
};

export function SegmentServiceCards({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  body,
  cards,
  surface = "white",
}: SegmentServiceCardsProps) {
  const bg = surface === "panna" ? "bg-panna" : "bg-white";
  return (
    <section className={`${bg} text-ink py-20 md:py-28`}>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="lg:pt-1">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="text-ink mt-5 font-serif text-[clamp(1.75rem,0.8rem+2.5vw,2.8rem)] leading-[1.15] font-medium tracking-tight">
              {titleStart}
              <em className="text-brand font-serif italic">{titleAccent}</em>
              {titleEnd}
            </h2>
            <p className="text-ink/70 mt-5 max-w-[44ch] text-base leading-[1.65]">{body}</p>
          </div>

          <ServiceCardInteractive cards={cards} surface={surface} />
        </div>
      </div>
    </section>
  );
}
