// components/sections/TargetIndex.tsx
// RSC. Indice visivo a 3 card cliccabili (Privati / Enti Pubblici / Professionisti).
// Ogni card è un <Link> intero — la card è il click target (D-02).
// Link punta all'ancora #privati / #pubblico / #professionisti.

import Link from "next/link";
import type { Route } from "next";
import type { ServicesTarget } from "@/content/services";

type TargetIndexProps = {
  targets: readonly ServicesTarget[];
};

export function TargetIndex({ targets }: TargetIndexProps) {
  return (
    <section className="bg-panna text-ink border-border border-b py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-12">
          {targets.map((t) => (
            <TargetCard key={t.id} target={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TargetCard({ target }: { target: ServicesTarget }) {
  const href = `/servizi#${target.id}` as Route<string>;
  return (
    <Link
      href={href}
      className="group bg-surface border-border hover:border-ink/40 focus-visible:outline-brand flex h-full flex-col rounded-xl border p-8 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 md:p-10"
    >
      {/* Numbered eyebrow row */}
      <div className="mb-4 flex items-baseline gap-4">
        <span className="text-brand font-serif text-sm font-medium italic">— {target.n}</span>
        <span className="text-ink/60 text-[11px] font-semibold tracking-[0.22em] uppercase">
          {target.kicker}
        </span>
      </div>

      {/* H3 serif card title */}
      <h2 className="text-ink font-serif text-[clamp(1.3rem,0.6rem+1vw,1.65rem)] leading-[1.25] font-medium tracking-tight">
        {target.title}
      </h2>

      {/* Inter subtitle */}
      <p className="text-ink/70 mt-4 text-base leading-[1.6]">{target.body}</p>

      {/* Arrow CTA — pushed to bottom, always on one line */}
      <span className="text-ink mt-auto inline-flex items-center gap-2.5 pt-9 font-[family-name:var(--font-neue-montreal)] text-xs tracking-[0.08em] whitespace-nowrap uppercase">
        <span className="border-ink/35 group-hover:border-ink border-b pb-1.5 transition-colors">
          {target.ctaLabel}
        </span>
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
        >
          →
        </span>
      </span>
    </Link>
  );
}
