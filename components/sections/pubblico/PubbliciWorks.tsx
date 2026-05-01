// components/sections/pubblico/PubbliciWorks.tsx
// RSC. Strip opere pubbliche recenti per la pagina /servizi/pubblico.
// 3 card in griglia orizzontale — dati verificabili, tono documentale.

import { Eyebrow } from "@/components/ui/Eyebrow";
import type { PubbliciWork } from "@/content/segment-pages";

type PubbliciWorksProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  items: readonly PubbliciWork[];
};

export function PubbliciWorks({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  items,
}: PubbliciWorksProps) {
  return (
    <section className="text-ink bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-12 md:mb-16">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-ink mt-5 max-w-[24ch] font-serif text-[clamp(1.75rem,0.8rem+2.5vw,2.8rem)] leading-[1.15] font-medium tracking-tight">
            {titleStart}
            <em className="text-brand font-serif italic">{titleAccent}</em>
            {titleEnd}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="border-border hover:border-ink/30 bg-panna rounded-xl border p-8 transition-colors duration-200"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-brand font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold tracking-[0.22em] uppercase">
                  {item.tag}
                </span>
                <span className="text-ink/40 font-serif text-sm italic">{item.year}</span>
              </div>

              <span className="text-ink/25 font-serif text-[clamp(3rem,2rem+2vw,4rem)] leading-none font-medium">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="text-ink mt-3 font-serif text-[clamp(1.1rem,0.7rem+0.8vw,1.4rem)] leading-snug font-medium">
                {item.title}
              </h3>

              <p className="text-ink/50 mt-1 font-[family-name:var(--font-neue-montreal)] text-[11px] tracking-[0.14em] uppercase">
                {item.place}
              </p>

              <p className="text-ink/65 mt-4 text-sm leading-[1.65]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
