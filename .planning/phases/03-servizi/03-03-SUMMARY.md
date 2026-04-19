---
plan: 03-03
phase: 03-servizi
status: complete
completed: 2026-04-19
requirements_covered:
  - SRV-01
  - SRV-02
  - SRV-03
  - SRV-04
  - SRV-05
---

## Summary

Replaced `app/servizi/page.tsx` stub with full RSC orchestrator. Added service detail cards to Privati and Professionisti sections for visual parity with SOA badge cards.

## What Was Built

- `app/servizi/page.tsx` — RSC orchestrator: ServicesHero → TargetIndex → 3x ServicesEditorialRow → HowWeWork → HomepageCta
- `content/services.ts` — extended with `ServiceCard` type + 4 service detail cards for `privati` and `professionisti` targets
- `components/sections/ServicesEditorialRow.tsx` — added `ServiceCardGrid` rendering optional serviceCards below bullet pills

## Key Decisions

- `md:grid-cols-2` for serviceCards (4 items) vs `md:grid-cols-3` for soaBadges (3 items) — adapts grid to item count
- ServiceCard has no `code` field (unlike SoaBadge) — purely editorial, no regulatory codes involved
- Same surface-contrast logic as SoaBadgeGrid: cards on panna use bg-white, cards on white use bg-panna

## Verification

- `pnpm check` (lint + typecheck + compliance + contrast + layout): PASSED
- `pnpm build`: PASSED — /servizi Static (○)
- Human checkpoint: approved with feedback to add service detail cards to privati + professionisti
- SRV-01: anchor navigation (#privati, #pubblico, #professionisti) functional
- SRV-02: page layout complete, all sections rendered
- SRV-03: SOA badges OG1/OG2/OG3 visible in Enti Pubblici section
- SRV-04: all 4 mandatory services covered (nuove costruzioni, ristrutturazioni, opere pubbliche, urbanizzazioni)
- SRV-05: CTA "Richiedi un sopralluogo" present in HomepageCta

## Self-Check: PASSED
