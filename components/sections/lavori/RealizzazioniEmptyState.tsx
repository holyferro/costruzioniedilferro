export function RealizzazioniEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-ink/40 mb-4 text-xs font-semibold tracking-[0.3em] uppercase">
        Archivio lavori
      </p>
      <h3
        className="text-ink mb-4 font-serif leading-snug font-medium"
        style={{ fontSize: "clamp(1.375rem, 0.8rem + 1.2vw, 1.875rem)" }}
      >
        Stiamo aggiornando i nostri progetti
      </h3>
      <p className="text-ink/55 mb-10 text-[15px] leading-relaxed" style={{ maxWidth: "38ch" }}>
        Torna a trovarci a breve per scoprire i nuovi cantieri.
      </p>
      <a
        href="/contatti"
        className="bg-brand text-panna inline-flex items-center gap-3 rounded-full px-6 py-[15px] font-[family-name:var(--font-neue-montreal)] text-[13px] font-medium tracking-[0.06em] uppercase transition-colors hover:bg-[#1a1a6b]"
      >
        Contattaci →
      </a>
    </div>
  );
}
