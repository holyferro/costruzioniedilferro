---
status: complete
---

## Modifiche effettuate

- `content/certifications.ts`: card `iso9001` aggiornata con nuovo tag, titolo, corpo unificato ISO 9001 + ISO 14001, array `registrations`, `pdfHref` verso il PDF esistente, `pdfLabel` e `pdfNote`.
- `components/sections/CertificazioniGrid.tsx`: tipo `CertCard` esteso con campi opzionali `registrations`, `pdfHref`, `pdfLabel`, `pdfNote`; componente `CertCard` aggiornato per renderizzare separatore + righe di registrazione e CTA PDF con nota.

Lint: pass. Typecheck: pass.
