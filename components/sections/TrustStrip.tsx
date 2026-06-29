// components/sections/TrustStrip.tsx
// RSC. Sezione editoriale tabellare su panna.
// Layout breakpoint:
//   mobile (0–767px)   : stack singolo, stats una sotto l'altra
//   tablet md (768–1023px): stack, stats in griglia 2 colonne
//   iPad lg (1024–1279px): 2 colonne [2fr_3fr] (≈40/60); stats [120px_1fr_auto] max-w-[140px]
//   desktop xl (1280px+) : 2 colonne [1fr_2fr]; stats [180px_1fr_auto] max-w-[200px]

import Image from "next/image";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
import { Reveal } from "@/components/ui/Reveal";
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
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[2fr_3fr] lg:gap-x-6 lg:px-12 xl:grid-cols-[1fr_2fr] xl:gap-x-12">
        {/* Intro — sticky solo su lg+ */}
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

        {/* Stats */}
        <dl className="md:grid md:grid-cols-2 md:gap-x-8 lg:block">
          {rows.map((r, i) => {
            const isLast = i === rows.length - 1;
            const isSecondToLast = i === rows.length - 2;
            const isText = isNaN(parseFloat(String(r.value)));

            return (
              <Reveal
                key={r.label}
                delay={i * 60}
                className={[
                  "border-border grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 border-t py-7",
                  // tablet: mantiene [auto_1fr], sub sotto span-2
                  "md:items-start md:gap-x-5 md:py-6",
                  // iPad landscape: numero fisso + label flex + sub a destra
                  "lg:grid-cols-[120px_1fr_auto] lg:items-baseline lg:gap-x-6 lg:py-7",
                  // desktop
                  "xl:grid-cols-[180px_1fr_auto] xl:gap-x-8 xl:py-8",
                  // bordi separatori verticali
                  isLast ? "border-b" : isSecondToLast ? "md:border-b lg:border-b-0" : "",
                ].join(" ")}
              >
                {/* Numero grande */}
                <dt
                  className={[
                    "text-ink font-serif leading-none font-medium",
                    isText
                      ? "text-4xl tracking-[0.18em] lg:text-5xl lg:tracking-tight xl:text-6xl"
                      : "text-5xl tracking-tight lg:text-6xl",
                  ].join(" ")}
                >
                  <CountUpNumber value={r.value} />
                </dt>

                {/* Descrizione in italic */}
                <dd
                  className={[
                    "text-ink font-serif leading-snug font-medium italic",
                    isText ? "text-sm lg:text-xl xl:text-2xl" : "text-lg lg:text-2xl",
                  ].join(" ")}
                >
                  {r.label}
                </dd>

                {/* Label secondaria — sotto su mobile/tablet, a destra su lg+ */}
                <dd className="text-ink/60 col-span-2 text-xs tracking-[0.12em] uppercase md:col-span-2 md:mt-1 lg:col-span-1 lg:mt-0 lg:max-w-[140px] lg:text-right lg:text-[10px] lg:leading-[1.45] lg:break-words xl:max-w-[200px] xl:text-[11px]">
                  {r.sub}
                </dd>
              </Reveal>
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
