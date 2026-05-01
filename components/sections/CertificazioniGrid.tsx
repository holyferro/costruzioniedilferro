// components/sections/CertificazioniGrid.tsx
// RSC. Griglia 3-col: 5 cert cards + 1 CTA card brand. Gap 1px su bg-border.

import Image from "next/image";
import Link from "next/link";

type CertCard = {
  id: string;
  year: string | null;
  logoSrc: string;
  logoAlt: string;
  logo2Src?: string;
  logo2Alt?: string;
  logo2ClassName?: string;
  tag: string;
  title: string;
  body: string;
  registrations?: readonly string[];
  pdfHref?: string;
  pdfLabel?: string;
  pdfNote?: string;
};

type CertificazioniGridProps = {
  certCards: readonly CertCard[];
  eyebrow: string;
};

export function CertificazioniGrid({ certCards, eyebrow }: CertificazioniGridProps) {
  return (
    <section className="bg-panna py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <p className="text-ink/60 mb-12 text-xs font-semibold tracking-[0.38em] uppercase">
          <span
            aria-hidden="true"
            className="bg-ink/35 mr-3.5 inline-block h-px w-8 align-middle"
          />
          {eyebrow}
        </p>

        {/* 1px-gap grid trick: background is the border color */}
        <div className="border-border bg-[var(--color-border,theme(colors.border))] grid grid-cols-1 gap-px border md:grid-cols-2 lg:grid-cols-3">
          {certCards.map((card) => (
            <CertCard key={card.id} card={card} />
          ))}

          {/* CTA card — brand blue */}
          <div className="bg-brand flex flex-col justify-between p-10 md:p-12">
            <div>
              <p className="text-panna/60 mb-6 font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold tracking-[0.22em] uppercase">
                Vuoi verificare le nostre qualifiche?
              </p>
              <h3 className="mb-4 max-w-[22ch] font-serif text-[26px] leading-[1.3] font-medium tracking-[-0.01em] text-white">
                Tutte le nostre attestazioni sono pubbliche e consultabili.
              </h3>
              <p className="text-panna/80 text-[15px] leading-[1.65]">
                L&apos;attestazione SOA è verificabile sul portale ANAC. Le certificazioni ISO sono
                registrate sul sito Accredia. Nessuna autocertificazione.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3">
              <a
                href="https://servizi.anticorruzione.it/RicercaAttestazioniWebApp/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-panna text-brand flex items-center justify-between rounded-full px-6 py-4 font-[family-name:var(--font-neue-montreal)] text-[13px] font-medium tracking-[0.04em] uppercase transition-opacity hover:opacity-90"
              >
                Portale ANAC <span aria-hidden="true">↗</span>
              </a>
              <Link
                href="/contatti"
                className="border-panna/35 flex items-center justify-between rounded-full border px-6 py-4 font-[family-name:var(--font-neue-montreal)] text-[13px] font-medium tracking-[0.04em] text-white uppercase transition-colors hover:bg-white/10"
              >
                Richiedi documentazione <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CertCard({ card }: { card: CertCard }) {
  return (
    <article className="group relative flex flex-col bg-white p-10 transition-shadow duration-300 hover:shadow-[0_12px_48px_rgba(10,42,107,0.10)] md:p-12">
      {card.year && (
        <span className="text-ink/40 absolute top-7 right-7 font-serif text-sm italic">
          {card.year}
        </span>
      )}

      {/* Logo(s) */}
      <div className="mb-8 flex h-20 items-center gap-3">
        <Image
          src={card.logoSrc}
          alt={card.logoAlt}
          height={80}
          width={200}
          className="h-full w-auto object-contain object-left"
        />
        {card.logo2Src && (
          <>
            <span className="bg-ink/15 h-10 w-px shrink-0" aria-hidden="true" />
            <Image
              src={card.logo2Src}
              alt={card.logo2Alt ?? ""}
              height={80}
              width={200}
              className={card.logo2ClassName ?? "h-full w-auto object-contain object-left"}
            />
          </>
        )}
      </div>

      {/* Tag */}
      <span className="border-brand/25 text-brand mb-4 self-start rounded-full border px-3 py-1.5 font-[family-name:var(--font-neue-montreal)] text-[10px] font-semibold tracking-[0.22em] uppercase">
        {card.tag}
      </span>

      <h3 className="text-ink mb-3.5 font-serif text-[22px] leading-[1.3] font-medium tracking-[-0.01em]">
        {card.title}
      </h3>
      <p className="text-ink/70 text-[15px] leading-[1.65]" style={{ whiteSpace: "pre-line" }}>
        {card.body}
      </p>

      {card.registrations && card.registrations.length > 0 && (
        <ul className="border-ink/10 mt-5 space-y-1.5 border-t pt-4">
          {card.registrations.map((reg) => (
            <li
              key={reg}
              className="text-ink/50 font-[family-name:var(--font-neue-montreal)] text-[11px] tracking-[0.02em]"
            >
              {reg}
            </li>
          ))}
        </ul>
      )}

      {card.pdfHref && (
        <div className="mt-6">
          <a
            href={card.pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="border-brand/30 text-brand hover:bg-brand/5 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-[family-name:var(--font-neue-montreal)] text-[12px] font-medium tracking-[0.04em] uppercase transition-colors"
          >
            {card.pdfLabel ?? "Consulta il certificato"} <span aria-hidden="true">↗</span>
          </a>
          {card.pdfNote && (
            <p className="text-ink/40 mt-2 font-[family-name:var(--font-neue-montreal)] text-[11px]">
              {card.pdfNote}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
