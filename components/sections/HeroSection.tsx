// components/sections/HeroSection.tsx
// RSC — nessun "use client". Il "use client" per la sticky bar è in MobileStickyBar.tsx.
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { RotatingWord } from "@/components/ui/RotatingWord";

type HeroSectionProps = {
  headline: string;
  headlinePrefix?: string;
  headlineWords?: readonly string[];
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
};

export function HeroSection({
  headline,
  headlinePrefix,
  headlineWords,
  subheadline,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={`bg-ink relative overflow-hidden ${className ?? "h-[100svh] max-h-[900px] min-h-[600px]"}`}
    >
      {/* Immagine hero full-bleed — fill richiede position: relative + altezza esplicita */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_27%]"
        quality={85}
      />
      {/* Overlay scuro per leggibilità testo su foto (D-06: no text-brand su sfondo chiaro) */}
      <div className="bg-ink/47 absolute inset-0" aria-hidden="true" />
      {/* Contenuto — centrato verticalmente */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6">
        <h1 className="text-h1 text-panna max-w-2xl font-serif leading-[1.1]">
          {headlinePrefix && headlineWords ? (
            <>
              <span className="block">{headlinePrefix}</span>
              <RotatingWord words={headlineWords} />
            </>
          ) : (
            headline
          )}
        </h1>
        <p className="text-panna/85 mt-4 max-w-xl text-lg">{subheadline}</p>
        <Link
          href={ctaHref as Route<string>}
          className="bg-brand text-panna hover:bg-brand/90 mt-8 inline-flex rounded-full px-7 py-3.5 text-sm font-medium transition-colors"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
