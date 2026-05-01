// components/sections/aziende/AziendeValueSplit.tsx
// RSC. Sezione split 2-col per la pagina /servizi/aziende.
// Sinistra: value prop per aziende. Destra: value prop per studi A+I.

import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ValueColumn } from "@/content/segment-pages";

type AziendeValueSplitProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  body: string;
  columns: readonly [ValueColumn, ValueColumn];
};

export function AziendeValueSplit({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  body,
  columns,
}: AziendeValueSplitProps) {
  return (
    <section className="text-ink bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-14 max-w-[52ch] md:mb-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-ink mt-5 font-serif text-[clamp(1.75rem,0.8rem+2.5vw,2.8rem)] leading-[1.15] font-medium tracking-tight">
            {titleStart}
            <em className="text-brand font-serif italic">{titleAccent}</em>
            {titleEnd}
          </h2>
          <p className="text-ink/70 mt-5 text-base leading-[1.7]">{body}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {columns.map((col, colIdx) => (
            <div
              key={col.kicker}
              className={`rounded-xl p-8 md:p-10 ${colIdx === 0 ? "bg-panna" : "bg-brand"}`}
            >
              <p
                className={`font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold tracking-[0.22em] uppercase ${colIdx === 0 ? "text-brand" : "text-panna/70"}`}
              >
                {col.kicker}
              </p>
              <h3
                className={`mt-4 font-serif text-[clamp(1.2rem,0.7rem+1.2vw,1.7rem)] leading-[1.25] font-medium ${colIdx === 0 ? "text-ink" : "text-white"}`}
              >
                {col.title}
              </h3>

              <ul className="mt-8 space-y-4">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 shrink-0 font-serif text-sm italic ${colIdx === 0 ? "text-brand" : "text-panna/60"}`}
                    >
                      —
                    </span>
                    <span
                      className={`text-sm leading-[1.6] ${colIdx === 0 ? "text-ink/80" : "text-white/80"}`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
