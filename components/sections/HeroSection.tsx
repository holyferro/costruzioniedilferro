// components/sections/HeroSection.tsx
// RSC — nessun "use client".
import Image from "next/image";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

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
      className={`bg-ink relative overflow-hidden ${className ?? "h-[100svh] max-h-[900px] min-h-[600px]"}`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_27%] md:object-[center_27%]"
        quality={85}
      />
      {/* Gradiente grigio sinistra→destra */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#12142b]/80 via-[#12142b]/35 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6">
        {eyebrow && (
          <p className="text-panna/90 mb-5 text-sm font-semibold tracking-[0.38em] uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="text-panna max-w-none font-[family-name:var(--font-neue-montreal)] text-[2.2rem] leading-[1.05] font-normal md:text-[clamp(3.025rem,1.98rem+4.4vw,5.5rem)] md:leading-[1.1]">
          {headlinePrefix && headlineWords ? (
            <>
              <span className="block">{headlinePrefix}</span>
              {/* Mobile: wrapping allowed, 2-line slot; desktop: nowrap, 1-line slot */}
              <span className="-mt-[0.1em] block min-h-[2.2em] font-bold md:min-h-[1.2em] md:whitespace-nowrap">
                <RotatingWord words={headlineWords} />
              </span>
            </>
          ) : (
            headline
          )}
        </h1>
        <p className="text-panna/80 mt-5 max-w-lg text-lg leading-relaxed whitespace-pre-line">
          {subheadline}
        </p>

        <ScrollIndicator targetId="contenuto" />
      </div>
    </section>
  );
}
