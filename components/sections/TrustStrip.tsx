// components/sections/TrustStrip.tsx
// RSC — nessun "use client", nessuna animazione (CLAUDE.md: "evitare effetti vistosi").
// bg-ink crea contrasto visivo forte dopo l'hero panna/immagine.

type TrustMetric = {
  value: string;
  label: string;
};

type TrustStripProps = {
  metrics: readonly TrustMetric[];
};

export function TrustStrip({ metrics }: TrustStripProps) {
  return (
    <section className="bg-black py-6" aria-label="Numeri chiave dell'impresa">
      <div className="mx-auto max-w-6xl px-6">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <dt className="text-h2 text-panna font-serif">{m.value}</dt>
              <dd className="text-panna/70 mt-1 text-sm">{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
