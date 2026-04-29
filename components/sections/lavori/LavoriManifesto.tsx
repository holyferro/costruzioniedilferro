// RSC — Sezione manifesto "Il nostro approccio"
import { FadeUp } from "@/components/ui/FadeUp";

export function LavoriManifesto() {
  return (
    <section className="bg-panna border-border border-b py-[120px]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-6 md:grid-cols-[1fr_1.5fr] md:gap-20 md:px-12">
        {/* Sticky sidebar */}
        <div className="md:sticky md:top-[140px]">
          <p className="text-ink/60 flex items-center gap-3 text-xs font-semibold tracking-[0.38em] uppercase">
            <span aria-hidden="true" className="bg-ink/40 inline-block h-px w-8 flex-shrink-0" />
            Il nostro approccio
          </p>
          <p className="text-ink/40 mt-8 text-[11px] font-medium tracking-[0.14em] uppercase">
            — Metodologia di cantiere
          </p>
        </div>

        {/* Main content */}
        <FadeUp>
          <h2 className="text-ink font-serif text-[clamp(1.875rem,0.8rem+2.2vw,2.875rem)] leading-[1.15] font-medium tracking-[-0.018em]">
            Non documentiamo i progetti per mostrare quanto siamo bravi.{" "}
            <em className="text-brand font-serif italic">
              Li mostriamo perché ogni committente merita di vedere chi ha costruito prima di lui.
            </em>
          </h2>
          <div className="border-border mt-14 grid grid-cols-1 gap-10 border-t pt-12 md:grid-cols-2">
            <p className="text-ink/70 text-base leading-[1.7]">
              Ogni scheda progetto riporta dati verificabili: categoria di intervento, comune, anno
              di consegna e committente (dove autorizzato). Non usiamo rendering post-produzione —
              solo fotografie di cantiere e di consegna.
            </p>
            <p className="text-ink/70 text-base leading-[1.7]">
              I lavori pubblici sono consultabili sul portale ANAC. Le ristrutturazioni private sono
              presentate con il consenso esplicito dei committenti. I nuovi cantieri vengono
              aggiunti alla chiusura, non durante.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
