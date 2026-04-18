// components/sections/TrustStrip.tsx
// RSC. Sezione editoriale tabellare su panna.
// 2 colonne desktop (titolo sticky a sinistra, righe a destra) → stack mobile.

import type { TrustRow } from "@/content/homepage";

type TrustStripProps = {
  eyebrow: string;
  title: string;
  body: string;
  rows: readonly TrustRow[];
};

export function TrustStrip({ eyebrow, title, body, rows }: TrustStripProps) {
  return (
    <section
      id="contenuto"
      aria-label="Numeri chiave dell'impresa"
      className="bg-panna border-border [scroll-margin-top:var(--header-height)] border-b py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_2fr] md:gap-16 md:px-12">
        <div className="md:sticky md:top-[calc(var(--header-height)+24px)] md:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-h2 text-ink mt-5 max-w-[15ch] font-serif font-medium tracking-tight">
            {title}
          </h2>
          <p className="text-ink/70 mt-6 max-w-[34ch] text-[15px] leading-[1.65]">{body}</p>
        </div>
        <dl>
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`border-border grid grid-cols-[88px_1fr] items-baseline gap-x-5 gap-y-2 border-t py-7 sm:grid-cols-[140px_1fr_auto] sm:gap-x-8 md:grid-cols-[180px_1fr_auto] ${
                i === rows.length - 1 ? "border-b" : ""
              }`}
            >
              <dt className="text-ink font-serif text-5xl leading-none font-medium tracking-tight md:text-6xl">
                {r.value}
              </dt>
              <dd className="text-ink font-serif text-lg leading-snug font-medium italic md:text-2xl">
                {r.label}
              </dd>
              <dd className="text-ink/60 col-span-2 text-xs tracking-[0.12em] uppercase sm:col-span-1 sm:max-w-[28ch] sm:text-right">
                {r.sub}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-ink/60 text-xs font-semibold tracking-[0.38em] uppercase">
      <span aria-hidden="true" className="bg-ink/40 mr-3 inline-block h-px w-8 align-middle" />
      {children}
    </p>
  );
}
