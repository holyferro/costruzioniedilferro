// components/sections/ServiceAreaSection.tsx
// RSC. Testo puro su bg-surface. Nessuna mappa, nessun iframe, nessun link maps.google.com.
// check:compliance non si rompe perché non ci sono URL Google Maps.

type ServiceAreaSectionProps = {
  sectionTitle: string;
  body: string;
  zones: readonly string[];
};

export function ServiceAreaSection({ sectionTitle, body, zones }: ServiceAreaSectionProps) {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="font-serif text-h2 text-ink">{sectionTitle}</h2>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-ink/80">{body}</p>
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-ink/60">
              Zone principali
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {zones.map((zone) => (
                <li key={zone} className="flex items-center gap-2 text-base text-ink">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {zone}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
