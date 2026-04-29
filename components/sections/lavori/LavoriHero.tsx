// RSC — Hero sezione Lavori e Progetti
export function LavoriHero() {
  return (
    <section className="bg-ink text-panna relative overflow-hidden py-[110px] pb-[100px]">
      {/* Dot texture */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dots-lavori"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1" fill="rgba(255,255,255,0.07)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-lavori)" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-end gap-12 px-6 md:grid-cols-[1.2fr_1fr] md:gap-20 md:px-12">
        <div>
          <p className="text-panna/60 flex items-center gap-3 text-xs font-semibold tracking-[0.38em] uppercase">
            <span aria-hidden="true" className="bg-panna/35 inline-block h-px w-8 flex-shrink-0" />
            Lavori e Progetti
          </p>
          <h1 className="mt-6 max-w-[16ch] font-serif text-[clamp(2.625rem,1.4rem+3.2vw,4.375rem)] leading-[1.06] font-medium tracking-[-0.025em] text-white">
            Quattro decenni di cantieri. Ogni opera è una firma.
          </h1>
        </div>

        <div>
          <p className="text-panna/82 text-[17px] leading-[1.7]" style={{ maxWidth: "44ch" }}>
            Dall&apos;edificio residenziale chiavi in mano al restauro conservativo su bene
            vincolato, dall&apos;appalto pubblico al capannone industriale: ogni lavoro porta la
            stessa attenzione alla tecnica e alla continuità del rapporto con il committente.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <span className="bg-brand rounded px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
              520+ cantieri
            </span>
            <span className="border-panna/30 rounded border px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
              Dal 1978
            </span>
            <span className="border-panna/30 rounded border px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
              Polesine · Veneto
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
