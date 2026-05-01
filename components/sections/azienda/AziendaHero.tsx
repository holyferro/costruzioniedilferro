import Image from "next/image";

export function AziendaHero() {
  return (
    <section className="bg-ink text-panna relative overflow-hidden py-[110px]">
      {/* Dot texture */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots-hero" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="rgba(255,255,255,0.07)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-hero)" />
      </svg>

      {/* Photo panel right */}
      <div className="absolute top-0 right-0 bottom-0 z-[1] w-[42%] overflow-hidden">
        <Image
          src="/images/azienda/hero-azienda.webp"
          alt="Cantiere Edilferro — dettaglio lavorazione"
          fill
          className="object-cover object-center brightness-[0.6] saturate-[0.8]"
          priority
        />
        <div className="from-ink absolute inset-0 bg-gradient-to-r to-transparent" />
      </div>

      <div className="relative z-[2] mx-auto grid max-w-6xl grid-cols-1 items-end gap-10 px-6 md:grid-cols-[1.1fr_1fr] md:gap-20 md:px-12">
        <div>
          <p className="text-panna/60 text-xs font-semibold tracking-[0.38em] uppercase">
            <span
              aria-hidden="true"
              className="bg-panna/40 mr-3 inline-block h-px w-8 align-middle"
            />
            L&apos;Azienda
          </p>
          <h1 className="mt-5 max-w-[16ch] font-serif text-[clamp(2.6rem,1.4rem+3.2vw,4.375rem)] leading-[1.06] font-medium tracking-[-0.025em] text-white">
            Da una storia familiare, un&apos;impresa che costruisce futuro.
          </h1>
        </div>

        <div>
          <p className="text-panna/82 max-w-[44ch] text-[17px] leading-[1.7]">
            Esperienza sul campo, attenzione ai dettagli e un impegno costante verso qualità,
            sicurezza e risultati concreti.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <span className="bg-brand rounded-[4px] px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
              Dal 1981
            </span>
            <span className="text-panna/70 border-panna/30 rounded-[4px] border bg-transparent px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
              Porto Viro · Rovigo
            </span>
            <span className="text-panna/70 border-panna/30 rounded-[4px] border bg-transparent px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
              Impresa famigliare
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
