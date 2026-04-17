// components/sections/TrustStrip.tsx
// RSC — nessun "use client", nessuna animazione (CLAUDE.md: "evitare effetti vistosi").
// bg-ink crea contrasto visivo forte dopo l'hero panna/immagine.

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

type TrustMetric = {
  value: string;
  label: string;
};

type TrustStripProps = {
  metrics: readonly TrustMetric[];
};

export function TrustStrip({ metrics }: TrustStripProps) {
  return (
    <section
      id="numeri"
      className="[scroll-margin-top:var(--header-height)] bg-black py-3 md:py-6"
      aria-label="Numeri chiave dell'impresa"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <dl className="grid grid-cols-4 gap-2 md:gap-8">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <dt className="text-panna md:text-h2 font-[family-name:var(--font-neue-montreal)] text-xl font-bold md:font-serif">
                <AnimatedCounter value={m.value} />
              </dt>
              <dd className="text-panna/70 mt-0.5 text-[9px] leading-tight md:mt-1 md:text-sm">
                {m.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
