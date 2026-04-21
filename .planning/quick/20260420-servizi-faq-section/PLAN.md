---
slug: servizi-faq-section
date: 2026-04-20
status: in_progress
---

# FAQ Section — Pagina Servizi

Add FAQ accordion section to the services page, before the final CTA.
Layout mirrors "Valori" / "Perché sceglierci" from homepage: sticky headline left, accordion items right.
Active question turns brand-blue. Answer expands inline via grid-rows animation.

## Files

- `content/services.ts` — add FaqItem type + faq content block
- `components/sections/ServicesFaqItems.tsx` — "use client" accordion
- `components/sections/ServicesFaq.tsx` — RSC layout section
- `app/servizi/page.tsx` — wire between HowWeWork and HomepageCta
