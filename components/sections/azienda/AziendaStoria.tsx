import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";

type TimelineEntry = {
  year: string;
  title: string;
  body: string;
  image?: { src: string; alt: string };
};

const entries: TimelineEntry[] = [
  {
    year: "1978",
    title: "Fondazione dell'impresa",
    body: "Giovanni Moretti fonda l'impresa edile a Porto Viro con quattro operai e un camion. I primi cantieri sono residenziali privati nel basso Polesine. La sede è un piccolo ufficio in Via dell'Industria, dove si trova ancora oggi.",
    image: { src: "/images/azienda/storia-1978.jpg", alt: "Fondazione 1978" },
  },
  {
    year: "1991",
    title: "Il primo appalto pubblico",
    body: "L'impresa ottiene la prima qualificazione SOA e vince il primo appalto pubblico per il Comune di Adria: restauro di un edificio scolastico vincolato. È l'inizio di un filone che oggi rappresenta il 30% del fatturato.",
    image: { src: "/images/azienda/storia-1991.jpg", alt: "Appalto pubblico 1991" },
  },
  {
    year: "2004",
    title: "Il passaggio generazionale",
    body: "Marco e Luca Moretti entrano in azienda con formazioni tecniche: uno da ingegnere strutturista, l'altro da geometra con specializzazione in efficienza energetica. L'azienda amplia l'organico a venti persone e apre la seconda sede a Rovigo.",
    image: { src: "/images/azienda/storia-2004.jpg", alt: "Passaggio generazionale 2004" },
  },
  {
    year: "2015",
    title: "Certificazione ISO 9001",
    body: "L'impresa ottiene la certificazione ISO 9001 da Kiwa Cermet, formalizzando i processi di controllo qualità già in uso da anni. L'organico raggiunge le trenta persone. Vengono avviati i primi cantieri di housing in classe A.",
  },
  {
    year: "Oggi",
    title: "Quarantadue persone, zero subappalti opachi",
    body: "Impresa Edile S.r.l. conta quarantadue persone in organico diretto, qualificazione SOA OG1–OG3 classifica IV, certificazione ISO 9001 e Cassa Edile Awards 2023. Il bilancio chiude ogni anno senza contenziosi aperti con i committenti.",
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
              Tre generazioni, un unico metodo.
            </h2>
            <p className="text-ink/60 mt-6 max-w-[34ch] text-[15px] leading-[1.7]">
              La storia di Impresa Edile è la storia di un territorio. Ogni cantiere è radicato nel
              Polesine, costruito con materiali locali e consegnato con la firma di chi lo ha
              iniziato.
            </p>
          </div>

          {/* Timeline */}
          <div className="flex flex-col">
            {entries.map((entry, i) => (
              <div
                key={entry.year}
                className={`grid grid-cols-[100px_1px_1fr] gap-x-10 ${
                  i < entries.length - 1 ? "pb-16" : ""
                }`}
              >
                {/* Year */}
                <div className="text-ink pt-1 text-right font-serif text-[clamp(2.4rem,1rem+2vw,3.25rem)] leading-none font-medium tracking-[-0.025em]">
                  {entry.year}
                </div>

                {/* Line + dot */}
                <div className="relative">
                  {i < entries.length - 1 && (
                    <div className="bg-border absolute top-3 left-1/2 h-full w-px -translate-x-1/2" />
                  )}
                  <div className="bg-brand border-panna absolute top-2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 shadow-[0_0_0_1px_var(--color-brand)]" />
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="text-ink font-serif text-[22px] leading-[1.25] font-medium tracking-[-0.01em]">
                    {entry.title}
                  </h3>
                  <p className="text-ink/70 mt-3 max-w-[52ch] text-[15px] leading-[1.7]">
                    {entry.body}
                  </p>
                  {entry.image && (
                    <div className="mt-6 aspect-[16/9] max-w-[420px] overflow-hidden">
                      <Image
                        src={entry.image.src}
                        alt={entry.image.alt}
                        width={420}
                        height={236}
                        className="h-full w-full object-cover saturate-[0.6] sepia-[0.15]"
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
