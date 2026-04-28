// components/sections/ServicesEditorialRow.tsx
// RSC. Riga editoriale 2-col testo+foto per ogni target (Privati / Enti Pubblici / Professionisti).
// Pattern derivato da ServiceOverview ServiceRow (Phase 2) ma su superficie panna/bianca.
// Aggiunge slot SOA badges per la sezione Enti Pubblici (D-08 — differenziatore critico SRV-03).
// L'attributo `id` sul <section> è il target degli ancori da TargetIndex (`/servizi#privati` etc.).

import Link from "next/link";
import type { ServicesTarget, SoaBadge } from "@/content/services";
import { ServiceCardInteractive } from "@/components/sections/ServiceCardInteractive";
import { ServicePhotoInteractive } from "@/components/sections/ServicePhotoInteractive";

type ServicesEditorialRowProps = {
  id: string; // "privati" | "pubblico" | "professionisti" — anchor target
  variant: "panna" | "white";
  item: ServicesTarget;
  reverse: boolean;
};

export function ServicesEditorialRow({ id, variant, item, reverse }: ServicesEditorialRowProps) {
  const surfaceClass = variant === "panna" ? "bg-panna" : "bg-white";
  return (
    <section id={id} className={`${surfaceClass} text-ink py-20 md:py-28`}>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text column — first on mobile, position driven by reverse on lg */}
          <div className={`order-1 ${reverse ? "lg:order-2" : "lg:order-1"}`}>
            <div className="mb-4 flex items-baseline gap-4">
              <span className="text-brand font-serif text-sm font-medium italic">— {item.n}</span>
              <span className="text-ink/60 text-[11px] font-semibold tracking-[0.22em] uppercase">
                {item.kicker}
              </span>
            </div>

            <h2 className="text-ink font-serif text-[clamp(1.75rem,0.8rem+2vw,2.6rem)] leading-[1.15] font-medium tracking-tight">
              {item.title}
            </h2>

            <p className="text-ink/80 mt-5 max-w-[52ch] text-base leading-[1.65]">{item.body}</p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <li
                  key={t}
                  className="text-ink/85 border-ink/20 hover:border-brand/50 rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-300"
                >
                  {t}
                </li>
              ))}
            </ul>

            {item.soaBadges && item.soaBadges.length > 0 ? (
              <SoaBadgeGrid badges={item.soaBadges} surface={variant} />
            ) : null}

            {item.serviceCards && item.serviceCards.length > 0 ? (
              <ServiceCardInteractive cards={item.serviceCards} surface={variant} />
            ) : null}

            <Link
              href={item.ctaHref}
              className="text-ink group/cta mt-9 inline-flex items-center gap-2.5 font-[family-name:var(--font-neue-montreal)] text-xs tracking-[0.08em] uppercase"
            >
              <span className="border-ink/35 group-hover/cta:border-ink border-b pb-1.5 transition-colors">
                {item.ctaLabel}
              </span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </div>

          {/* Photo column — last on mobile, position driven by reverse on lg */}
          <ServicePhotoInteractive
            src={item.imageSrc}
            alt={item.imageAlt}
            caption={item.imageCaption}
            number={item.n}
            className={`order-2 aspect-[25/16] cursor-pointer lg:aspect-[5/4] ${
              reverse ? "lg:order-1" : "lg:order-2"
            }`}
          />
        </div>
      </div>
    </section>
  );
}

function SoaBadgeGrid({
  badges,
  surface,
}: {
  badges: readonly SoaBadge[];
  surface: "panna" | "white";
}) {
  const cardSurface = surface === "panna" ? "bg-white" : "bg-panna";
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
      {badges.map((badge) => (
        <div
          key={badge.code}
          className={`${cardSurface} border-border hover:border-ink/40 rounded-lg border p-5 transition-colors duration-200 md:p-6`}
        >
          <p className="text-brand font-[family-name:var(--font-neue-montreal)] text-xs font-semibold tracking-[0.22em] uppercase">
            {badge.code}
          </p>
          <p className="text-ink mt-2 font-serif text-[clamp(0.9rem,0.6rem+0.6vw,1.1rem)] leading-snug font-medium">
            {badge.name}
          </p>
          <p className="text-ink/60 mt-2 line-clamp-2 text-sm leading-[1.5]">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}
