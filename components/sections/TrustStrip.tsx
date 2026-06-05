// components/sections/TrustStrip.tsx
// RSC. Sezione editoriale tabellare su panna.
// Layout per breakpoint:
//   mobile (0–767px)  : stack, stats in 1 colonna
//   tablet (768–1023px): stack, stats in griglia 2 colonne
//   desktop (1024px+) : 2 colonne affiancate (intro sticky sx, stats dx)

import Image from "next/image";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
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
      className="bg-panna border-border [scroll-margin-top:var(--header-height)] overflow-x-clip border-b py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_2fr] lg:gap-x-6 lg:px-12 xl:gap-x-12">
        {/* Intro — sticky solo su desktop lg+ */}
        <div className="lg:sticky lg:top-[calc(var(--header-height)+24px)] lg:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-ink mt-5 max-w-[15ch] font-serif text-[clamp(2rem,1rem+2.6vw,3.4rem)] leading-[1.12] font-medium tracking-tight">
            {title.split("quarantacinque").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <em className="text-brand italic">quarantacinque</em>
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </h2>
          <p className="text-ink/70 mt-6 max-w-[34ch] text-[15px] leading-[1.65]">{body}</p>
          <Image
            src="/images/logo45anni.webp"
            alt="45 anni di attività — Costruzioni Edilferro"
            width={160}
            height={160}
            className="mt-8 h-24 w-auto mix-blend-multiply md:h-28"
          />
        </div>

        {/* Stats — griglia 2 col su tablet, lista su desktop */}
        <dl className="md:grid md:grid-cols-2 md:gap-x-8 lg:block">
          {rows.map((r, i) => {
            const isLast = i === rows.length - 1;
            const isSecondToLast = i === rows.length - 2;
            const isText = isNaN(parseFloat(String(r.value)));
            return (
              <div
                key={r.label}
                className={`border-border grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-t py-7 sm:grid-cols-[140px_1fr_auto] sm:gap-x-8 md:grid-cols-[auto_1fr] md:items-start md:gap-x-5 md:py-6 lg:grid-cols-[180px_1fr_auto] lg:items-baseline lg:gap-x-8 lg:py-7 ${
                  isLast ? "border-b" : isSecondToLast ? "md:border-b lg:border-b-0" : ""
                }`}
              >
                <dt
                  className={`text-ink font-serif leading-none font-medium lg:text-6xl ${
                    isText
                      ? "text-4xl tracking-[0.18em] sm:text-5xl sm:tracking-tight"
                      : "text-5xl tracking-tight"
                  }`}
                >
                  <CountUpNumber value={r.value} />
                </dt>
                <dd
                  className={`text-ink font-serif leading-snug font-medium italic md:text-xl lg:text-2xl ${
                    isText ? "text-sm whitespace-nowrap sm:text-lg" : "text-lg"
                  }`}
                >
                  {r.label}
                </dd>
                <dd className="text-ink/60 col-span-2 text-xs tracking-[0.12em] uppercase sm:col-span-1 sm:max-w-[28ch] sm:text-right md:col-span-2 md:mt-1 md:text-left lg:col-span-1 lg:mt-0 lg:max-w-[18ch] lg:overflow-hidden lg:text-right lg:text-ellipsis lg:whitespace-nowrap xl:max-w-[28ch] xl:overflow-visible xl:whitespace-normal">
                  {r.sub}
                </dd>
              </div>
            );
          })}
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
