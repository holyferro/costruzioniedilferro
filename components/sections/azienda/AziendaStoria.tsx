import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils/cn";

type TimelineEntry = {
  year: string;
  title: string;
  eyebrow?: string;
  body: string;
  image?: { src: string; alt: string };
  featured?: "generational" | "anniversary";
};

const entries: TimelineEntry[] = [
  {
    year: "1952",
    title: "Le origini",
    body: "Mario Ferro avvia l'attività subito dopo l'alluvione del Polesine del 1951, partecipando alla ricostruzione del territorio e ponendo le basi dell'impresa.",
    image: {
      src: "/images/azienda/storia-1978.jpg",
      alt: "Cantiere storico delle origini di Costruzioni Edilferro nel Polesine",
    },
  },
  {
    year: "Fine anni '50",
    title: "Le prime grandi commesse",
    body: "Nasce la collaborazione con Eridania di Genova per la manutenzione degli stabilimenti saccariferi: il primo grande salto industriale.",
    image: {
      src: "/images/azienda/storia-1991.jpg",
      alt: "Opere industriali e stabilimenti delle prime grandi commesse Edilferro",
    },
  },
  {
    year: "1981",
    title: "La fondazione ufficiale",
    body: "Il 26 febbraio nasce ufficialmente Costruzioni Edilferro: l'esperienza diventa impresa strutturata. Trasformando l'esperienza costruita nei decenni precedenti in una struttura aziendale solida e organizzata.",
    image: {
      src: "/images/azienda/storia-2004.jpg",
      alt: "Prima sede e fondazione ufficiale di Costruzioni Edilferro nel 1981",
    },
  },
  {
    year: "Passaggio di generazione",
    eyebrow: "Tre generazioni, una visione",
    title: "Continuità imprenditoriale",
    body: "Il passaggio generazionale trasforma l'eredità familiare in continuità imprenditoriale, mantenendo intatti valori e metodo.",
    image: {
      src: "/images/azienda/team-luca.jpg",
      alt: "Luca Ferro rappresenta il passaggio generazionale di Costruzioni Edilferro",
    },
    featured: "generational",
  },
  {
    year: "2015",
    title: "Ampliamento e rinnovo della sede",
    body: "La sede storica viene ampliata: rifacimento completo della facciata e modernizzazione degli spazi interni, senza cambiare radici.",
    image: {
      src: "/images/azienda/hero-azienda.webp",
      alt: "Sede di Costruzioni Edilferro dopo il rinnovo e ampliamento del 2015",
    },
  },
  {
    year: "Oggi",
    eyebrow: "45 anni ufficiali. Oltre 70 anni di esperienza reale.",
    title: "45 anni di storia",
    body: "Costruzioni Edilferro celebra il suo 45° anniversario dalla fondazione ufficiale: oltre settant'anni di esperienza costruita sul campo.",
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
                key={entry.year}
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
                        45 Anniversary
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
                  {entry.image && (
                    <div
                      className={cn(
                        "mt-6 aspect-[16/9] max-w-[420px] overflow-hidden",
                        entry.featured === "anniversary" && "max-w-[520px]",
                      )}
                    >
                      <Image
                        src={entry.image.src}
                        alt={entry.image.alt}
                        width={520}
                        height={293}
                        className={cn(
                          "h-full w-full object-cover saturate-[0.65] sepia-[0.12]",
                          entry.featured === "generational" && "object-top saturate-[0.8] sepia-0",
                          entry.featured === "anniversary" && "saturate-[0.85] sepia-0",
                        )}
                      />
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
