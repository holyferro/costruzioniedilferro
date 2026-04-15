// app/page.tsx — Wave 0 version (Plan 01-02 brings back font-serif + text-h1 once tokens land)
export default function Home() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">Fondamenta</p>
      <h1 className="text-4xl font-semibold">Impresa Edile — sito in costruzione</h1>
      <p className="mt-6 max-w-prose text-lg text-neutral-700">
        Stiamo lavorando al sito istituzionale. Scaffold completo, design system in arrivo.
      </p>
    </section>
  );
}
