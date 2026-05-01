import { Eyebrow } from "@/components/ui/Eyebrow";

type StatCell = {
  n: string;
  suffix?: string;
  label: string;
  sub: string;
  variant?: "default" | "dark" | "brand";
};

const stats: StatCell[] = [
  { n: "46", label: "anni di attività", sub: "Fondata nel 1978" },
  { n: "520", suffix: "+", label: "cantieri completati", sub: "Dal 1978 ad oggi", variant: "dark" },
  { n: "42", label: "persone in organico", sub: "Contratti Cassa Edile · nessuna interinale" },
  {
    n: "IV",
    label: "Classifica SOA",
    sub: "OG1 · OG2 · OG3 · OG11 · fino a €5,1M",
    variant: "brand",
  },
  { n: "2", label: "sedi operative", sub: "Porto Viro e Rovigo" },
  { n: "18", label: "appalti pubblici", sub: "Ultimi 3 anni · fonte ANAC" },
  { n: "96", suffix: "%", label: "consegne puntuali", sub: "Anno 2024", variant: "dark" },
  { n: "0", label: "contenziosi aperti", sub: "Bilancio 2024" },
];

export function AziendaNumeri() {
  return (
    <section className="bg-panna border-border border-t py-24 md:py-[120px]">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-16 grid items-start gap-8 md:grid-cols-[1fr_2fr] md:gap-20">
          <div>
            <Eyebrow>I numeri dell&apos;impresa</Eyebrow>
            <h2 className="text-ink mt-5 max-w-[14ch] font-serif text-[clamp(1.75rem,0.6rem+2.2vw,2.75rem)] leading-[1.15] font-medium tracking-[-0.018em]">
              Dati verificabili. Nessuna stima di comodo.
            </h2>
          </div>
          <p className="text-ink/70 max-w-[58ch] pt-2 text-[17px] leading-[1.7]">
            Tutti i numeri che seguono sono tratti dal bilancio 2024 o da fonti verificabili (ANAC,
            Cassa Edile, Accredia). Non arrotondiamo verso l&apos;alto: preferiamo essere precisi.
          </p>
        </div>

        <div className="border-border grid grid-cols-2 gap-px bg-[var(--color-border)] md:grid-cols-4">
          {stats.map((stat) => (
            <StatCell key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCell({ n, suffix, label, sub, variant = "default" }: StatCell) {
  const bg = variant === "dark" ? "bg-ink" : variant === "brand" ? "bg-brand" : "bg-panna";
  const nColor = variant === "default" ? "text-ink" : "text-white";
  const labelColor = variant === "default" ? "text-ink" : "text-panna/90";
  const subColor = variant === "default" ? "text-ink/50" : "text-panna/50";

  return (
    <div className={`${bg} px-8 py-[52px] md:px-11`}>
      <span
        className={`block font-serif text-[clamp(3rem,1rem+3vw,4.25rem)] leading-none font-medium tracking-[-0.03em] ${nColor}`}
      >
        {n}
        {suffix && <span className="text-[clamp(1.5rem,0.5rem+2vw,2.5rem)]">{suffix}</span>}
      </span>
      <span
        className={`mt-3 block font-serif text-[clamp(1rem,0.5rem+0.5vw,1.25rem)] italic ${labelColor}`}
      >
        {label}
      </span>
      <p className={`mt-2 text-[11px] tracking-[0.14em] uppercase ${subColor}`}>{sub}</p>
    </div>
  );
}
