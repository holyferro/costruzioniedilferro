// components/sections/HeroSection.tsx
// RSC — nessun "use client". Il "use client" per la sticky bar è in MobileStickyBar.tsx.
import Image from "next/image";
import Link from "next/link";

type HeroSectionProps = {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
};

export function HeroSection({
  headline,
  subheadline,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: HeroSectionProps) {
  return (
    <section className="relative h-[100svh] max-h-[900px] min-h-[600px]">
      {/* Immagine hero full-bleed — fill richiede position: relative + altezza esplicita */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={85}
      />
      {/* Overlay scuro per leggibilità testo su foto (D-06: no text-brand su sfondo chiaro) */}
      <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />
      {/* Contenuto — testo posizionato in basso per permettere alla foto di respirare */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-end px-6 pb-16 md:pb-20">
        <h1 className="max-w-2xl font-serif text-h1 leading-[1.1] text-panna">{headline}</h1>
        <p className="mt-4 max-w-xl text-lg text-panna/85">{subheadline}</p>
        <Link
          href={ctaHref}
          className="mt-8 inline-flex rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-panna transition-colors hover:bg-brand/90"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
