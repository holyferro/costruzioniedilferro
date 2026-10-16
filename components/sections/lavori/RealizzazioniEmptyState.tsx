import { buttonClass } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function RealizzazioniEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <Eyebrow className="mb-4">Archivio lavori</Eyebrow>
      <h3
        className="text-ink mb-4 font-serif leading-snug font-medium"
        style={{ fontSize: "clamp(1.375rem, 0.8rem + 1.2vw, 1.875rem)" }}
      >
        Stiamo aggiornando i nostri progetti
      </h3>
      <p className="text-ink/65 mb-10 text-[15px] leading-relaxed" style={{ maxWidth: "38ch" }}>
        Torna a trovarci a breve per scoprire i nuovi cantieri.
      </p>
      <a href="/contatti" className={buttonClass()}>
        Richiedi un sopralluogo →
      </a>
    </div>
  );
}
