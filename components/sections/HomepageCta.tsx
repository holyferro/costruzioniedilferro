// components/sections/HomepageCta.tsx
// RSC. CTA finale prima del footer. Split block su brand-blue:
// editoriale a sinistra (headline + sopralluogo), pannello CTA + contatti a destra.
// Contatti pull-from siteContent (single source of truth NAP).
// pb extra mantiene clearance per la mobile sticky bar.

import Link from "next/link";
import type { Route } from "next";
import { siteContent } from "@/content/site";

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
      className="bg-brand text-panna relative overflow-hidden py-24 pb-32 md:py-28 md:pb-28"
    >
      {/* Anelli ornamentali concentrici, top-right */}
      <span
        aria-hidden="true"
        className="border-panna/10 pointer-events-none absolute top-[-120px] right-[-100px] h-[520px] w-[520px] rounded-full border"
      />
      <span
        aria-hidden="true"
        className="border-panna/[0.07] pointer-events-none absolute top-[-220px] right-[-200px] h-[740px] w-[740px] rounded-full border"
      />
      <span
        aria-hidden="true"
        className="border-panna/[0.04] pointer-events-none absolute top-[-320px] right-[-300px] h-[960px] w-[960px] rounded-full border"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr] md:gap-20">
          <div>
            <DarkEyebrow>{eyebrow}</DarkEyebrow>
            <h2 className="mt-5 max-w-[14ch] font-serif text-[clamp(2.4rem,1.4rem+3.2vw,4.5rem)] leading-[1.05] font-medium tracking-tight text-white">
              {headline}
            </h2>
            <p className="text-panna/85 mt-7 max-w-[52ch] text-lg leading-relaxed">{body}</p>

            <div className="border-panna/20 mt-12 grid max-w-xl grid-cols-2 gap-x-12 gap-y-6 border-t pt-8">
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
                <p className="mt-2.5 font-serif text-base leading-snug text-white md:text-lg">
                  {contact.hours.map((h) => (
                    <span key={h} className="block">
                      {h}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <Link
              href={primaryCta.href as Route<string>}
              className="bg-panna text-brand hover:bg-panna/90 inline-flex items-center justify-between rounded-full px-7 py-5 font-[family-name:var(--font-neue-montreal)] text-[15px] font-medium tracking-[0.04em] uppercase transition-colors"
            >
              {primaryCta.label} <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={secondaryCta.href as Route<string>}
              className="border-panna/40 hover:bg-panna/10 inline-flex items-center justify-between rounded-full border bg-transparent px-7 py-5 font-[family-name:var(--font-neue-montreal)] text-[15px] font-medium tracking-[0.04em] text-white uppercase transition-colors"
            >
              {secondaryCta.label} <span aria-hidden="true">→</span>
            </Link>

            <div className="border-panna/20 mt-5 flex flex-col gap-3.5 border-t pt-6">
              <a
                href={`tel:${contact.phone.tel}`}
                className="hover:text-panna flex items-baseline justify-between text-white no-underline transition-colors"
              >
                <span className="text-panna/60 text-[11px] tracking-[0.22em] uppercase">
                  Telefono
                </span>
                <span className="font-serif text-lg tracking-tight">{contact.phone.display}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-panna flex items-baseline justify-between gap-3 text-white no-underline transition-colors"
              >
                <span className="text-panna/60 text-[11px] tracking-[0.22em] uppercase">Email</span>
                <span className="font-serif text-base tracking-tight md:text-[17px]">
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
