// components/sections/HeroSection.tsx
// RSC — nessun "use client".
import Image from "next/image";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Reveal } from "@/components/ui/Reveal";

type HeroSectionProps = {
  eyebrow?: string;
  headline: string;
  headlinePrefix?: string;
  headlineWords?: readonly string[];
  subheadline: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
};

export function HeroSection({
  eyebrow,
  headline,
  headlinePrefix,
  headlineWords,
  subheadline,
  imageSrc,
  imageAlt,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={`bg-ink relative overflow-hidden ${className ?? "min-h-[600px]"}`}
      style={{ height: "calc(100svh - var(--header-height, 72px))" }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[90%_27%] md:object-[center_27%]"
        quality={85}
      />
      {/* Gradiente grigio sinistra→destra */}
      <div
        className="from-night/80 via-night/35 absolute inset-0 bg-gradient-to-r to-transparent"
        aria-hidden="true"
      />
      {/* Scrim scuro in basso — garantisce contrasto WCAG AA alla CTA "Scopri di più" indipendentemente dalla luminosità del punto dell'immagine sottostante */}
      <div
        className="from-night/70 absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6">
        {eyebrow && (
          <Reveal
            as="p"
            className="text-panna/90 tracking-eyebrow mb-5 text-sm font-semibold uppercase"
          >
            <span
              aria-hidden="true"
              className="bg-panna/60 mr-3 inline-block h-px w-8 align-middle"
            />
            {eyebrow}
          </Reveal>
        )}
        <h1 className="text-panna max-w-none font-[family-name:var(--font-neue-montreal)] text-[clamp(3.025rem,1.98rem+4.4vw,5.5rem)] leading-[1.1] font-normal">
          {headlinePrefix && headlineWords ? (
            <>
              <span className="block">{headlinePrefix}</span>
              {/* Mobile: wrapping allowed, 2-line slot; desktop: nowrap, 1-line slot */}
              <span className="-mt-[0.1em] block min-h-[2.4em] font-bold md:min-h-[1.2em] md:whitespace-nowrap">
                <RotatingWord words={headlineWords} />
              </span>
            </>
          ) : (
            headline
          )}
        </h1>
        <Reveal
          as="p"
          delay={120}
          className="text-panna/80 mt-3 max-w-lg text-lg leading-relaxed whitespace-pre-line"
        >
          {subheadline}
        </Reveal>

        <Reveal delay={220}>
          <ScrollIndicator targetId="contenuto" />
        </Reveal>
      </div>
    </section>
  );
}
