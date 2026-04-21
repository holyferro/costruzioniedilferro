---
slug: servizi-faq-section
date: 2026-04-20
status: complete
---

# FAQ Section — Pagina Servizi

Added FAQ accordion section between HowWeWork and HomepageCta on /servizi.

## Files modified

- `content/services.ts` — FaqItem type + faq block (6 domande)
- `components/sections/ServicesFaqItems.tsx` — client accordion (multi-open, grid-rows expand, +/× toggle, blue active state)
- `components/sections/ServicesFaq.tsx` — RSC layout, mirrors Values section
- `app/servizi/page.tsx` — wired ServicesFaq between HowWeWork and HomepageCta

## Commit

d62b82c feat(servizi): add FAQ accordion section before final CTA
