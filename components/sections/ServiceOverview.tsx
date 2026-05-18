// components/sections/ServiceOverview.tsx
// RSC. Tre committenze (Privati / Pubblico / Aziende) in righe full-bleed alternate
// con fotografia. Su bg-ink, pattern editoriale (no card grid stile SaaS).

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { ServiceItem } from "@/content/homepage";

type ServiceOverviewProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  body: string;
  indexLinkLabel: string;
  indexLinkHref: string;
  items: readonly ServiceItem[];
};

export function ServiceOverview({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  body,
  indexLinkLabel,
  indexLinkHref,
  items,
}: ServiceOverviewProps) {
  return (
    <section className="bg-ink text-panna py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
          <div className="max-w-3xl">
            <DarkEyebrow>{eyebrow}</DarkEyebrow>
            <h2 className="text-panna mt-5 max-w-[18ch] font-serif text-[clamp(2rem,1rem+2.6vw,3.4rem)] leading-[1.12] font-medium tracking-tight">
              {titleStart}
              <em className="text-panna/65 font-serif italic">{titleAccent}</em>
              {titleEnd}
            </h2>
            <p className="text-panna/70 mt-6 max-w-[56ch] text-lg leading-relaxed">{body}</p>
          </div>
          <Link
            href={indexLinkHref as Route<string>}
            className="text-panna border-panna/30 hover:border-panna inline-flex items-center gap-2 self-end border-b pb-1.5 font-[family-name:var(--font-neue-montreal)] text-xs tracking-[0.08em] uppercase transition-colors"
          >
            {indexLinkLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div>
          {items.map((it, i) => (
            <ServiceRow key={it.n} item={it} reverse={i % 2 === 1} first={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  item,
  reverse,
  first,
}: {
  item: ServiceItem;
  reverse: boolean;
  first: boolean;
}) {
  return (
    <div
      className={`border-panna/15 grid items-center gap-10 border-b py-12 md:grid-cols-2 md:gap-16 md:py-14 ${
        first ? "border-t" : ""
      }`}
    >
      <div className={reverse ? "md:order-2" : "md:order-1"}>
        <div className="mb-4 flex items-baseline gap-4">
          <span className="text-panna/65 font-serif text-sm font-medium italic">— {item.n}</span>
          <span className="text-panna/60 text-[11px] font-semibold tracking-[0.22em] uppercase">
            {item.kicker}
          </span>
        </div>
        <h3 className="text-panna font-serif text-[clamp(1.75rem,0.8rem+2vw,2.6rem)] leading-[1.15] font-medium tracking-tight">
          {item.title}
        </h3>
        <p className="text-panna/75 mt-5 max-w-[52ch] text-base leading-[1.65]">{item.body}</p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <li
              key={t}
              className="text-panna/85 border-panna/20 rounded-full border px-3.5 py-1.5 text-xs"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`group/img relative aspect-[5/4] overflow-hidden bg-black ${
          reverse ? "md:order-1" : "md:order-2"
        }`}
      >
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"
        />
        <span
          aria-hidden="true"
          className="absolute top-4 left-5 font-serif text-6xl leading-none font-medium tracking-tight text-white/85 [text-shadow:0_2px_20px_rgba(0,0,0,0.4)] md:text-7xl"
        >
          {item.n}
        </span>
        <p
          aria-hidden="true"
          className="absolute right-5 bottom-4 font-serif text-[11px] tracking-wide text-white/70 italic opacity-0 transition-opacity duration-500 group-hover/img:opacity-100"
        >
          {item.title}
        </p>
      </div>
    </div>
  );
}

function DarkEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-panna/55 text-xs font-semibold tracking-[0.38em] uppercase">
      <span aria-hidden="true" className="bg-panna/40 mr-3 inline-block h-px w-8 align-middle" />
      {children}
    </p>
  );
}
