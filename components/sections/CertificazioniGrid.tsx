// components/sections/CertificazioniGrid.tsx
// RSC. Griglia certificazioni e affiliazioni su bg-panna.
// Prima riga: certificazioni di qualità (card grandi con logo + testo).
// Seconda riga: affiliazioni (card logo + nome, più compatte).

import Image from "next/image";
import type { Certification } from "@/content/certifications";

type CertificazioniGridProps = {
  certifications: readonly Certification[];
};

export function CertificazioniGrid({ certifications }: CertificazioniGridProps) {
  const qualita = certifications.filter((c) => c.category === "qualita");
  const affiliazioni = certifications.filter((c) => c.category !== "qualita");

  return (
    <section className="bg-panna text-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Certificazioni di qualità — card editoriali */}
        <div className="mb-16 md:mb-20">
          <SectionLabel>Certificazioni di qualità</SectionLabel>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {qualita.map((cert) => (
              <QualitaCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>

        {/* Affiliazioni e riconoscimenti — logo grid */}
        <div>
          <SectionLabel>Affiliazioni e riconoscimenti</SectionLabel>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {affiliazioni.map((cert) => (
              <AffiliationCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-ink/50 text-[11px] font-semibold tracking-[0.28em] uppercase">
      <span aria-hidden="true" className="bg-ink/30 mr-3 inline-block h-px w-6 align-middle" />
      {children}
    </p>
  );
}

function QualitaCard({ cert }: { cert: Certification }) {
  return (
    <article className="border-border hover:border-ink/30 flex flex-col gap-6 rounded-xl border bg-white p-7 transition-colors duration-200 md:flex-row md:items-start md:gap-8 md:p-8">
      {/* Logo */}
      <div className="flex h-16 w-32 shrink-0 items-center">
        <div className="relative h-14 w-28">
          <Image
            src={cert.logoSrc}
            alt={cert.logoAlt}
            fill
            className="object-contain object-left"
            sizes="112px"
          />
        </div>
      </div>

      {/* Testo */}
      <div className="flex-1">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h3 className="text-ink font-serif text-xl leading-snug font-medium">{cert.name}</h3>
          {cert.badgeLabel && (
            <span className="bg-brand/10 text-brand rounded-full px-2.5 py-0.5 font-[family-name:var(--font-neue-montreal)] text-[10px] font-semibold tracking-[0.16em] uppercase">
              {cert.badgeLabel}
            </span>
          )}
        </div>
        <p className="text-ink/55 mb-3 text-[11px] font-semibold tracking-[0.2em] uppercase">
          {cert.issuer}
        </p>
        <p className="text-ink/75 text-sm leading-[1.65]">{cert.description}</p>
      </div>
    </article>
  );
}

function AffiliationCard({ cert }: { cert: Certification }) {
  return (
    <article className="border-border hover:border-ink/30 flex flex-col items-center gap-5 rounded-xl border bg-white p-6 text-center transition-colors duration-200">
      <div className="relative h-16 w-full">
        <Image
          src={cert.logoSrc}
          alt={cert.logoAlt}
          fill
          className="object-contain"
          sizes="(min-width: 768px) 25vw, 50vw"
        />
      </div>
      <div>
        <p className="text-ink font-serif text-sm leading-snug font-medium">{cert.name}</p>
        <p className="text-ink/50 mt-1 text-[10px] font-semibold tracking-[0.16em] uppercase">
          {cert.issuer}
        </p>
      </div>
    </article>
  );
}
