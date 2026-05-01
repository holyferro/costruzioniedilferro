---
id: 20260501-unifica-card-kiwa-accredia
title: Unifica card Kiwa Cermet + Accredia in CertificazioniGrid
status: in-progress
---

## Obiettivo

Sostituire la card ISO 9001 (solo Kiwa) con una card unificata che copra ISO 9001:2015 e ISO 14001:2015, mostrando il logo combinato Kiwa+Accredia, i dati di registrazione e una CTA verso il PDF.

## File coinvolti

- `content/certifications.ts` — aggiornamento card `iso9001`
- `components/sections/CertificazioniGrid.tsx` — estensione tipo + rendering

## Tasks

1. Aggiornare `certCards[iso9001]` con nuovo tag, titolo, corpo, registrazioni e pdfHref
2. Estendere il tipo `CertCard` con campi opzionali: `registrations`, `pdfHref`, `pdfLabel`, `pdfNote`
3. Aggiornare il componente `CertCard` per renderizzare registrazioni e CTA PDF
4. Lint + typecheck
