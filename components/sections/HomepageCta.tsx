// components/sections/HomepageCta.tsx
// RSC. CTA finale prima del footer. Split block su brand-blue:
// editoriale a sinistra (headline + sopralluogo), pannello CTA + contatti a destra.
// Contatti pull-from siteContent (single source of truth NAP).
// pb extra mantiene clearance per la mobile sticky bar.

import Link from "next/link";
import type { Route } from "next";
import { siteContent } from "@/content/site";
import { DecorativeRings } from "@/components/ui/DecorativeRings";

type HomepageCtaProps = {
  eyebrow: string;
  headline: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export function HomepageCta({
  eyebrow,
  headline,
  body,
  primaryCta,
  secondaryCta,
}: HomepageCtaProps) {
  const { contact, address } = siteContent;
  return (
    <section
      id="contatti"
      className="bg-brand text-panna relative overflow-hidden py-12 pb-24 md:py-24 md:pb-24"
    >
      <DecorativeRings side="right" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr] md:gap-20">
          <div>
            <DarkEyebrow>{eyebrow}</DarkEyebrow>
            <h2 className="mt-4 max-w-[14ch] font-serif text-[clamp(2.4rem,1.4rem+3.2vw,4.5rem)] leading-[1.05] font-medium tracking-tight text-white md:mt-5">
              {headline}
            </h2>
            <p className="text-panna/85 mt-5 max-w-[52ch] text-base leading-relaxed md:mt-7 md:text-lg">
              {body}
            </p>

            <div className="border-panna/20 mt-8 grid max-w-xl grid-cols-2 gap-x-12 gap-y-5 border-t pt-6 md:mt-12 md:gap-y-6 md:pt-8">
              <div>
                <p className="text-panna/60 text-[11px] tracking-[0.22em] uppercase">
                  Sede operativa
                </p>
                <p className="mt-2.5 font-serif text-base leading-snug text-white md:text-lg">
                  {address.street}
                  <br />
                  {address.zip} {address.city} ({address.province})
                </p>
              </div>
              <div>
                <p className="text-panna/60 text-[11px] tracking-[0.22em] uppercase">Orari</p>
                <div className="mt-2.5 font-serif text-white">
                  <p className="text-base leading-snug md:text-lg">{contact.schedule.weekdays}</p>
                  <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-0.5 text-sm leading-snug sm:grid-cols-[auto_1fr] sm:items-baseline md:text-base">
                    <span className="text-panna/60">Mattino</span>
                    <span className="whitespace-nowrap">{contact.schedule.morning}</span>
                    <span className="text-panna/60">Pomeriggio</span>
                    <span className="whitespace-nowrap">{contact.schedule.afternoon}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 md:gap-3.5">
            <Link
              href={primaryCta.href as Route<string>}
              className="bg-panna text-brand hover:bg-panna/90 inline-flex items-center justify-between rounded-full px-7 py-5 font-[family-name:var(--font-neue-montreal)] text-[15px] font-medium tracking-[0.04em] uppercase transition-colors"
            >
              {primaryCta.label} <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={secondaryCta.href as Route<string>}
              className="border-panna/40 bg-brand hover:border-panna inline-flex items-center justify-between rounded-full border px-7 py-5 font-[family-name:var(--font-neue-montreal)] text-[15px] font-medium tracking-[0.04em] text-white uppercase transition-colors"
            >
              {secondaryCta.label} <span aria-hidden="true">→</span>
            </Link>

            <div className="border-panna/20 mt-3 flex flex-col gap-3 border-t pt-4 md:mt-5 md:gap-3.5 md:pt-6">
              <a
                href={`tel:${contact.phone.tel}`}
                className="hover:text-panna flex flex-col text-white no-underline transition-colors"
              >
                <span className="text-panna/60 text-[11px] tracking-[0.22em] uppercase">
                  Telefono
                </span>
                <span className="mt-1 font-serif text-lg tracking-tight">
                  {contact.phone.display}
                </span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-panna flex flex-col text-white no-underline transition-colors"
              >
                <span className="text-panna/60 text-[11px] tracking-[0.22em] uppercase">Email</span>
                <span className="mt-1 font-serif text-base tracking-tight md:text-[17px]">
                  {contact.email}
                </span>
              </a>
              <p className="text-panna/55 mt-1 text-xs leading-relaxed">
                Risposta entro 24 ore lavorative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
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
