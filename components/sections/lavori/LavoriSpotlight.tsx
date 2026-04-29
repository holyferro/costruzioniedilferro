// RSC — Spotlight progetto di rilievo (Residenze Le Corti)
import Image from "next/image";
import { FadeUp } from "@/components/ui/FadeUp";

export function LavoriSpotlight() {
  return (
    <section className="border-border bg-panna border-t">
      {/* Intro header */}
      <div className="mx-auto max-w-6xl px-6 py-[100px] pb-[60px] md:px-12">
        <p className="text-ink/60 flex items-center gap-3 text-xs font-semibold tracking-[0.38em] uppercase">
          <span aria-hidden="true" className="bg-ink/40 inline-block h-px w-8 flex-shrink-0" />
          Progetto di rilievo
        </p>
        <h2
          className="text-ink mt-5 font-serif leading-[1.15] font-medium tracking-[-0.015em]"
          style={{ fontSize: "clamp(1.75rem, 0.6rem + 2vw, 2.625rem)", maxWidth: "28ch" }}
        >
          Un&apos;opera che racconta il metodo Impresa Edile
        </h2>
      </div>

      {/* Split block */}
      <FadeUp>
        <div className="grid grid-cols-1 bg-black lg:grid-cols-2">
          {/* Foto */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
            <Image
              src="/images/design/proj-corti.webp"
              alt="Residenze Le Corti, Rovigo 2024"
              fill
              className="object-cover"
              style={{ filter: "saturate(0.92)" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Numero decorativo */}
            <div
              className="absolute inset-x-0 bottom-0 p-10"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
            >
              <span
                className="block font-serif leading-none font-medium tracking-[-0.04em]"
                style={{
                  fontSize: "clamp(80px, 10vw, 140px)",
                  color: "rgba(255,255,255,0.12)",
                }}
                aria-hidden="true"
              >
                01
              </span>
            </div>
          </div>

          {/* Testo */}
          <div className="flex flex-col justify-center px-10 py-20 lg:px-[72px]">
            {/* Badge + anno */}
            <div className="mb-8 flex items-center gap-3.5">
              <span
                className="rounded-full border px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: "rgba(142,163,209,0.9)", borderColor: "rgba(142,163,209,0.4)" }}
              >
                Residenziale
              </span>
              <span className="font-serif text-[15px] text-white/60 italic">2024</span>
            </div>

            <h2
              className="mb-6 max-w-[18ch] font-serif leading-[1.12] font-medium tracking-[-0.02em] text-white"
              style={{ fontSize: "clamp(1.875rem, 0.8rem + 2.2vw, 3rem)" }}
            >
              Residenze Le Corti — Rovigo
            </h2>
            <p
              className="mb-10 text-[17px] leading-[1.7] text-white/78"
              style={{ maxWidth: "48ch" }}
            >
              18 unità residenziali in classe energetica A. Progettazione antisismica, struttura in
              calcestruzzo armato, cappotto termico in fibra di legno, domotica di serie in ogni
              unità. Il cantiere è stato consegnato con tre settimane di anticipo rispetto ai tempi
              contrattuali.
            </p>

            {/* Scheda tecnica */}
            <div className="mb-10">
              {[
                ["Committente", "Privato (su autorizzazione)"],
                ["Importo lavori", "€ 3.200.000"],
                ["Durata", "18 mesi · consegna anticipata"],
                ["Classe energetica", "A · NZEB"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between py-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <span
                    className="text-[11px] tracking-[0.2em] uppercase"
                    style={{ color: "rgba(248,245,238,0.55)" }}
                  >
                    {label}
                  </span>
                  <span className="font-serif text-base text-white">{value}</span>
                </div>
              ))}
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }} />
            </div>

            <a
              href="/contatti#form"
              className="self-start text-white no-underline transition-colors hover:text-white/80"
              style={{
                fontFamily: "var(--font-neue-montreal, inherit)",
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderBottom: "1px solid rgba(255,255,255,0.35)",
                paddingBottom: 6,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              Hai un progetto simile? Parliamone <span>→</span>
            </a>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
