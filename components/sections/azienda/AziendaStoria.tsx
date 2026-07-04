import Image from "next/image";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils/cn";

type TimelineEntry = {
  id: string;
  year: string;
  title: string;
  eyebrow?: string;
  body: ReactNode;
  images?: { src: string; alt: string }[];
  featured?: "generational" | "anniversary";
};

const entries: TimelineEntry[] = [
  {
    id: "origini-1952",
    year: "1952",
    title: "Le origini",
    body: (
      <>
        Mario Ferro avvia l&apos;attività all&apos;indomani dell&apos;alluvione del Polesine,
        partecipando alla ricostruzione del territorio. È il lavoro di un uomo a porre le prime
        fondamenta — e già a fine anni &apos;50 la commessa Eridania per gli stabilimenti
        saccariferi segna <em className="text-brand italic">il primo salto industriale</em>.
      </>
    ),
    images: [
      {
        src: "/images/azienda/storia-1978.jpg",
        alt: "Cantiere storico delle origini di Costruzioni Edilferro nel Polesine",
      },
    ],
  },
  {
    id: "fondazione-1981",
    year: "1981",
    title: "L'esperienza diventa impresa",
    body: (
      <>
        Il 26 febbraio 1981 nasce ufficialmente Costruzioni Edilferro S.r.l.: quasi trent&apos;anni
        di mestiere sul campo diventano{" "}
        <em className="text-brand italic">una struttura d&apos;impresa organizzata</em>.
      </>
    ),
  },
  {
    id: "sede-2015",
    year: "2015",
    title: "Ampliamento e rinnovo della sede",
    body: "La sede storica viene ampliata: rifacimento completo della facciata e modernizzazione degli spazi interni, senza cambiare radici.",
    images: [
      {
        src: "/images/azienda/hero-azienda.webp",
        alt: "Sede di Costruzioni Edilferro dopo il rinnovo e ampliamento del 2015",
      },
    ],
  },
  {
    id: "oggi",
    year: "Oggi",
    eyebrow: "Dalla fondazione della S.r.l., oltre 70 anni di esperienza reale.",
    title: "La stessa impresa familiare.",
    body: (
      <>
        Nel 2026 celebriamo l&apos;anniversario dalla fondazione della S.r.l.: oltre
        settant&apos;anni di mestiere passati di generazione in generazione, oggi con le qualifiche
        per opere <em className="text-brand italic">pubbliche, industriali e residenziali</em>.
      </>
    ),
    featured: "anniversary",
  },
];

export function AziendaStoria() {
  return (
    <section className="bg-panna py-24 md:py-[120px]">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid items-start gap-16 md:grid-cols-[1fr_1.5fr] md:gap-20">
          {/* Sticky intro */}
          <div className="md:sticky md:top-[calc(var(--header-height)+2rem)]">
            <Eyebrow>La nostra storia</Eyebrow>
            <h2 className="text-ink mt-5 max-w-[14ch] font-serif text-[clamp(1.875rem,0.8rem+2.2vw,2.875rem)] leading-[1.15] font-medium tracking-[-0.018em]">
              Dal 1952, una storia costruita sul campo.
            </h2>
            <p className="text-ink/60 mt-6 max-w-[34ch] text-[15px] leading-[1.7]">
              Dalle ricostruzioni del Polesine alla nuova sede, Costruzioni Edilferro ha trasformato
              esperienza familiare, metodo e continuità in una struttura d&apos;impresa solida.
            </p>
          </div>

          {/* Timeline */}
          <div className="flex flex-col">
            {entries.map((entry, i) => (
              <div
                key={entry.id}
                className={cn(
                  "grid grid-cols-[72px_16px_1fr] gap-x-5 md:grid-cols-[136px_22px_1fr] md:gap-x-10",
                  i < entries.length - 1 && "pb-14 md:pb-16",
                )}
              >
                {/* Year */}
                <div
                  className={cn(
                    "text-ink pt-1 text-right font-serif text-[clamp(1.55rem,1rem+2vw,3.25rem)] leading-[0.95] font-medium tracking-[-0.01em]",
                    entry.featured && "text-brand",
                  )}
                >
                  {entry.year}
                </div>

                {/* Line + dot */}
                <div className="relative">
                  {i < entries.length - 1 && (
                    <div className="from-brand via-brand/55 to-border absolute top-4 left-1/2 h-full w-[3px] -translate-x-1/2 bg-gradient-to-b" />
                  )}
                  <div
                    className={cn(
                      "border-panna bg-brand absolute top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-[3px] shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-brand)_18%,transparent)]",
                      entry.featured &&
                        "h-5 w-5 shadow-[0_0_0_5px_color-mix(in_oklab,var(--color-brand)_22%,transparent)]",
                    )}
                  />
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "pt-1",
                    entry.featured === "generational" &&
                      "border-brand/25 bg-white/45 px-5 py-5 shadow-[inset_4px_0_0_var(--color-brand)] md:px-7",
                    entry.featured === "anniversary" &&
                      "border-brand/20 bg-white px-5 py-6 shadow-[inset_4px_0_0_var(--color-brand),0_20px_60px_color-mix(in_oklab,var(--color-ink)_10%,transparent)] md:px-7",
                  )}
                >
                  {entry.featured === "anniversary" && (
                    <>
                      <Image
                        src="/images/logo45anni.webp"
                        alt="Logo 45 anni Costruzioni Edilferro"
                        width={180}
                        height={180}
                        className="mb-4 h-auto w-28 md:w-36"
                      />
                      <div className="border-brand/25 text-brand mb-4 inline-flex items-center border px-3 py-1.5 text-[11px] leading-none font-semibold tracking-[0.16em] uppercase">
                        Oggi
                      </div>
                    </>
                  )}
                  {entry.eyebrow && (
                    <p className="text-brand mb-2 max-w-[38ch] text-[12px] leading-[1.45] font-semibold tracking-[0.14em] uppercase">
                      {entry.eyebrow}
                    </p>
                  )}
                  <h3 className="text-ink font-serif text-[22px] leading-[1.25] font-medium tracking-[-0.01em]">
                    {entry.title}
                  </h3>
                  <p className="text-ink/70 mt-3 max-w-[52ch] text-[15px] leading-[1.7]">
                    {entry.body}
                  </p>
                  {entry.images && entry.images.length > 0 && (
                    <div
                      className={cn(
                        "mt-6 grid max-w-[420px] gap-3",
                        entry.images.length > 1 && "grid-cols-1 sm:grid-cols-2",
                        entry.featured === "anniversary" && "max-w-[520px]",
                      )}
                    >
                      {(() => {
                        const isAnniversary = entry.featured === "anniversary";
                        const isMulti = entry.images!.length > 1;
                        const width = isAnniversary ? 520 : isMulti ? 260 : 420;
                        const height = isAnniversary ? 293 : isMulti ? 146 : 236;
                        const sizes = isAnniversary
                          ? "(max-width: 768px) 100vw, 520px"
                          : isMulti
                            ? "(max-width: 640px) 100vw, 260px"
                            : "(max-width: 640px) 100vw, 420px";

                        return entry.images!.map((img) => (
                          <div key={img.src} className="aspect-[16/9] overflow-hidden">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              width={width}
                              height={height}
                              sizes={sizes}
                              className={cn(
                                "h-full w-full object-cover saturate-[0.65] sepia-[0.12]",
                                entry.featured === "generational" &&
                                  "object-top saturate-[0.8] sepia-0",
                                isAnniversary && "saturate-[0.85] sepia-0",
                              )}
                            />
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
