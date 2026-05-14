// RSC — Sezione "Come presentiamo i lavori"
import { ShieldCheck, Camera, CalendarCheck } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Solo dati verificabili",
    body: "Categoria di intervento, comune, anno e committente. I lavori pubblici sono consultabili direttamente sul portale ANAC.",
  },
  {
    icon: Camera,
    title: "Fotografie reali di cantiere",
    body: "Nessun rendering, nessuna post-produzione. Ogni scheda contiene foto scattate in corso d'opera e alla consegna.",
  },
  {
    icon: CalendarCheck,
    title: "Aggiornato solo a chiusura",
    body: "I progetti entrano in archivio una volta ultimati. Non pubblichiamo lavori in corso né commesse non ancora avviate.",
  },
];

export function LavoriManifesto() {
  return (
    <section className="bg-panna border-border border-b py-[100px]">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Header */}
        <FadeUp>
          <p className="text-ink/60 flex items-center gap-3 text-xs font-semibold tracking-[0.38em] uppercase">
            <span aria-hidden="true" className="bg-ink/40 inline-block h-px w-8 flex-shrink-0" />
            Come presentiamo i lavori
          </p>
          <p className="text-ink mt-6 max-w-2xl font-serif text-[clamp(1.5rem,0.6rem+2vw,2.25rem)] leading-[1.2] font-medium tracking-[-0.015em]">
            Ogni voce dell&apos;archivio risponde a tre criteri di trasparenza.
          </p>
        </FadeUp>

        {/* Pillars */}
        <div className="border-border mt-16 grid grid-cols-1 border-t md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }, i) => {
            const pad = i === 0 ? "md:pr-10 md:pl-0" : i === 1 ? "md:px-10" : "md:pl-10 md:pr-0";
            const divider = i < 2 ? "md:border-r border-border" : "";
            return (
              <FadeUp key={title} delay={i * 80}>
                <div
                  className={`flex flex-col gap-5 border-b py-10 md:border-b-0 md:py-12 ${pad} ${divider}`}
                >
                  <Icon className="text-brand h-6 w-6 flex-shrink-0" strokeWidth={1.5} />
                  <h3 className="text-ink text-base leading-tight font-semibold">{title}</h3>
                  <p className="text-ink/65 text-sm leading-[1.7]">{body}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
