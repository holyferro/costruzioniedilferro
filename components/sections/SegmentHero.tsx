// components/sections/SegmentHero.tsx
// RSC. Hero per le pagine di espansione segmento (/servizi/privati, /pubblico, /aziende).
// Layout 2-col su desktop (testo + foto), stack su mobile. Include breadcrumb ← Servizi.

import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

type SegmentHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
};

export function SegmentHero({ eyebrow, title, subtitle, imageSrc, imageAlt }: SegmentHeroProps) {
  return (
    <section className="bg-panna text-ink py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Breadcrumb */}
        <Link
          href="/servizi"
          className="text-ink/50 hover:text-brand mb-10 inline-flex items-center gap-2 font-[family-name:var(--font-neue-montreal)] text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 md:mb-14"
        >
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:-translate-x-1"
          >
            ←
          </span>
          Tutti i servizi
        </Link>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="text-ink mt-5 font-serif text-[clamp(2rem,0.8rem+3.5vw,3.6rem)] leading-[1.1] font-medium tracking-tight">
              {title}
            </h1>
            <p className="text-ink/70 mt-6 max-w-[52ch] text-base leading-[1.7] md:text-lg">
              {subtitle}
            </p>
          </div>

          {/* Photo */}
          <div
            className="relative overflow-hidden rounded-xl"
            style={{ height: "clamp(280px, 44vh, 520px)" }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
