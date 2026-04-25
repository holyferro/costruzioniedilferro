// components/sections/SoaSection.tsx
// RSC. Sezione attestazione SOA — la certificazione più rilevante per lavori pubblici.
// Layout editoriale: testo a sinistra, categorie SOA a destra su bg-ink.

import type { SoaCategory } from "@/content/certifications";

type SoaSectionProps = {
  eyebrow: string;
  title: string;
  body: string;
  categories: readonly SoaCategory[];
};

export function SoaSection({ eyebrow, title, body, categories }: SoaSectionProps) {
  return (
    <section className="bg-ink text-panna py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Colonna testo */}
          <div>
            <p className="text-panna/55 text-xs font-semibold tracking-[0.38em] uppercase">
              <span
                aria-hidden="true"
                className="bg-panna/40 mr-3 inline-block h-px w-8 align-middle"
              />
              {eyebrow}
            </p>
            <h2 className="text-panna mt-5 font-serif text-[clamp(1.75rem,0.8rem+2.2vw,2.8rem)] leading-[1.12] font-medium tracking-tight">
              {title}
            </h2>
            <p className="text-panna/70 mt-6 max-w-[52ch] text-base leading-[1.7]">{body}</p>

            <div className="border-panna/15 mt-10 border-t pt-8">
              <p className="text-panna/50 text-[11px] font-semibold tracking-[0.22em] uppercase">
                Rilasciata da SOA — Organismo di attestazione autorizzato ANAC
              </p>
            </div>
          </div>

          {/* Colonna categorie */}
          <div className="flex flex-col gap-4">
            {categories.map((cat) => (
              <div
                key={cat.code}
                className="border-panna/15 bg-panna/[0.04] hover:bg-panna/[0.07] flex items-center gap-6 rounded-xl border p-6 transition-colors duration-200 md:p-7"
              >
                <div className="shrink-0 text-center">
                  <span className="text-brand font-serif text-2xl leading-none font-medium">
                    {cat.code}
                  </span>
                  <p className="text-panna/50 mt-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
                    Class. {cat.classifica}
                  </p>
                </div>
                <div className="border-panna/15 h-10 w-px shrink-0 border-l" aria-hidden="true" />
                <p className="text-panna/85 text-sm leading-[1.55]">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
