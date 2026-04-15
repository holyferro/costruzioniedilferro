// app/page.tsx
// Placeholder di Phase 1. La homepage reale arriva in Phase 2.
import { siteContent } from "@/content/site";

export default function Home() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-ink/60">
        Fondamenta
      </p>
      <h1 className="font-serif text-h1 leading-[1.1] text-ink">
        {siteContent.brand.name} — sito in costruzione
      </h1>
      <p className="mt-6 max-w-prose text-lg text-ink/80">
        {siteContent.brand.tagline}
      </p>
    </section>
  );
}
