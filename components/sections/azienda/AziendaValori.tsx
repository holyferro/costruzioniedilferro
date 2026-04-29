"use client";

import { useState } from "react";

export function AziendaValori() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-ink text-panna relative overflow-hidden py-24 md:py-[120px]">
      {/* Dot texture */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots-valori"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1" fill="rgba(255,255,255,0.05)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-valori)" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 grid items-end gap-8 md:mb-20 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <div>
            <p className="text-panna/55 text-xs font-semibold tracking-[0.38em] uppercase">
              <span
                aria-hidden="true"
                className="bg-panna/40 mr-3 inline-block h-px w-8 align-middle"
              />
              I nostri valori
            </p>
            <h2 className="mt-5 max-w-[18ch] font-serif text-[clamp(2rem,0.8rem+2.4vw,3.125rem)] leading-[1.1] font-medium tracking-[-0.02em] text-white">
              Quattro pilastri.
              <br />
              Un&apos;unica identità.
            </h2>
          </div>
          <p className="text-panna/72 max-w-[52ch] pb-1 text-[17px] leading-[1.7]">
            Tradizione, qualità, aggiornamento continuo e formazione delle maestranze: sono le
            fondamenta su cui Impresa Edile è cresciuta e che garantiscono oggi una presenza solida
            e riconosciuta sul mercato.
          </p>
        </div>

        {/* 4 pillar cards */}
        <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
          {PILLARS.map((card, i) => (
            <ValueCard
              key={card.n}
              {...card}
              isActive={active === i}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  {
    n: "01",
    pillar: "Primo pilastro",
    title: "Tradizione",
    body: "Fondata nel 1978, l'impresa porta con sé il sapere artigianale di tre generazioni. Ogni cantiere è eseguito con tecniche consolidate, materiali conosciuti e una cultura del lavoro tramandata dall'interno.",
  },
  {
    n: "02",
    pillar: "Secondo pilastro",
    title: "Qualità",
    body: "Certificazione ISO 9001, qualificazione SOA classifica IV, audit annuali indipendenti. La qualità non è uno slogan: è un sistema verificabile da chiunque, in ogni fase del cantiere.",
  },
  {
    n: "03",
    pillar: "Terzo pilastro",
    title: "Aggiornamento continuo",
    body: "Normative, materiali, tecnologie costruttive: il settore evolve e l'impresa si aggiorna. Dall'efficienza energetica NZEB alle nuove categorie SOA, investiamo ogni anno in conoscenza tecnica applicata.",
  },
  {
    n: "04",
    pillar: "Quarto pilastro",
    title: "Formazione delle maestranze",
    body: "Quarantadue operai in organico diretto, contratti Cassa Edile, percorsi formativi interni. Chi lavora con noi cresce con noi: la competenza è un patrimonio collettivo, non individuale.",
  },
];

type ValueCardProps = {
  n: string;
  pillar: string;
  title: string;
  body: string;
  isActive: boolean;
  onClick: () => void;
};

function ValueCard({ n, pillar, title, body, isActive, onClick }: ValueCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex w-full cursor-pointer flex-col gap-7 px-10 py-[52px] pb-14 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none ${
        isActive ? "bg-brand" : "bg-ink hover:bg-white/5"
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-9 right-8 font-serif text-[72px] leading-none font-medium tracking-[-0.04em] italic ${
          isActive ? "text-panna/15" : "text-brand/35"
        }`}
      >
        {n}
      </span>
      <div>
        <p
          className={`mb-4 text-[10px] font-semibold tracking-[0.28em] uppercase ${
            isActive ? "text-panna/55" : "text-panna/40"
          }`}
        >
          {pillar}
        </p>
        <h3 className="font-serif text-[28px] leading-[1.2] font-medium tracking-[-0.015em] text-white">
          {title}
        </h3>
      </div>
      <p className={`text-sm leading-[1.75] ${isActive ? "text-panna/82" : "text-panna/65"}`}>
        {body}
      </p>
      <div className={`mt-auto h-px w-8 ${isActive ? "bg-panna/50" : "bg-brand"}`} />
    </button>
  );
}
