// components/sections/privati/BonusFiscali.tsx
// RSC. Griglia incentivi fiscali per la pagina /servizi/privati.
// 4 card (Ecobonus, Sismabonus, 50%, Bonus Barriere) su bg-panna.

import { Eyebrow } from "@/components/ui/Eyebrow";
import type { BonusCard } from "@/content/segment-pages";

type BonusFiscaliProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  body: string;
  cards: readonly BonusCard[];
};

export function BonusFiscali({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  body,
  cards,
}: BonusFiscaliProps) {
  return (
    <section className="bg-panna text-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="text-ink mt-5 font-serif text-[clamp(1.75rem,0.8rem+2.5vw,2.8rem)] leading-[1.15] font-medium tracking-tight">
              {titleStart}
              <em className="text-brand font-serif italic">{titleAccent}</em>
              {titleEnd}
            </h2>
          </div>
          <div className="lg:flex lg:items-end">
            <p className="text-ink/70 max-w-[52ch] text-base leading-[1.7]">{body}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {cards.map((card) => (
            <div
              key={card.title}
              className="border-border hover:border-ink/30 group flex flex-col rounded-xl border bg-white p-7 transition-colors duration-200"
            >
              <span className="text-brand font-serif text-[clamp(2rem,1.4rem+1.2vw,2.8rem)] leading-none font-medium italic">
                {card.pct}
              </span>
              <h3 className="text-ink mt-4 font-serif text-lg leading-snug font-medium">
                {card.title}
              </h3>
              <p className="text-ink/65 mt-3 flex-1 text-sm leading-[1.65]">{card.description}</p>
              <p className="border-border text-brand/80 mt-5 border-t pt-4 font-[family-name:var(--font-neue-montreal)] text-[11px] tracking-[0.14em] uppercase">
                {card.note}
              </p>
            </div>
          ))}
        </div>

        <p className="text-ink/45 mt-8 text-xs leading-relaxed md:mt-10">
          Le percentuali e le condizioni di accesso agli incentivi fiscali sono soggette a
          variazioni normative. Le informazioni riportate sono aggiornate al 2025. Verifica la
          normativa vigente con il tuo commercialista o con il nostro ufficio tecnico.
        </p>
      </div>
    </section>
  );
}
