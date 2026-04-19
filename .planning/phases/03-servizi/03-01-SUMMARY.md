---
phase: 03-servizi
plan: 01
subsystem: ui
tags: [typescript, content-module, services, soa, copy]

# Dependency graph
requires:
  - phase: 02-homepage
    provides: content/homepage.ts type conventions, kicker strings, as-const pattern, CTA labels
provides:
  - content/services.ts — fonte unica di tutto il copy della pagina /servizi
  - types: SoaBadge, ServicesTarget, ProcessStep, ServicesContent (all readonly)
  - export servicesContent as const with hero, targetIndex, howWeWork, finalCta
affects: [03-02, 03-03, app/servizi/page.tsx, ServicesHero, TargetIndex, ServicesEditorialRow, HowWeWork]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "content-layer-first: all /servizi copy in content/services.ts, zero strings hardcoded in components"
    - "readonly + as const: deep immutability on content objects, same as homepage.ts"
    - "optional field for target-specific data: soaBadges?: readonly SoaBadge[] on ServicesTarget"

key-files:
  created:
    - content/services.ts
  modified: []

key-decisions:
  - "kicker strings match homepageContent.services.items[N].kicker exactly for cross-page consistency"
  - "SOA badges scoped to target 'pubblico' only via optional field — not reused in card index"
  - "All ctaHref values point to /contatti (no per-service detail pages — deferred)"
  - "hero titleAccent chosen as 'per ogni esigenza' from D-01 options — pairs cleanly with titleStart 'Soluzioni edilizie '"

patterns-established:
  - "content module exports pure TypeScript with no imports, no JSX — replicates content/homepage.ts pattern"
  - "SoaBadge as a dedicated type (not inlined string array) enables typed rendering in ServicesEditorialRow"
  - "ProcessStep type with n/title/description triplet — consistent with Principle type in homepage.ts"

requirements-completed: [SRV-01, SRV-02, SRV-03, SRV-04, SRV-05]

# Metrics
duration: 8min
completed: 2026-04-19
---

# Phase 3 Plan 01: Servizi Content Module Summary

**TypeScript content module `content/services.ts` exporting 4 readonly types + `servicesContent as const` covering 3 target audiences, 3 SOA badges (OG1/OG2/OG3), 4 process steps, and all 4 mandatory services (nuove costruzioni, ristrutturazioni di pregio, opere pubbliche, urbanizzazioni)**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-04-19T13:00:00Z
- **Completed:** 2026-04-19T13:06:18Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Created `content/services.ts` — the single source of truth for all `/servizi` page copy
- Defined 4 exported types (`SoaBadge`, `ServicesTarget`, `ProcessStep`, `ServicesContent`) all fully readonly, no `any`
- Exported `servicesContent` as const covering hero, targetIndex (3 targets), howWeWork (4 steps), and finalCta
- Cross-page kicker consistency enforced: kicker strings match `homepageContent.services.items[N].kicker` exactly
- SOA badges (OG1/OG2/OG3) with Italian names and descriptions scoped to the "pubblico" target only via `soaBadges?: readonly SoaBadge[]`
- `pnpm typecheck` and `pnpm check:compliance` both pass at exit code 0

## Task Commits

1. **Task 1: Create content/services.ts with all types and copy** - `ee9e953` (feat)

## Files Created/Modified

- `content/services.ts` — full content module: 4 type exports, `servicesContent` as const, 185 lines, zero imports

## Decisions Made

- Chose D-01 hero option "Soluzioni edilizie per ogni esigenza" — direct, concrete, covers all three audience types without naming them redundantly in the headline (subtitle covers that)
- `finalCta.headline` set to "Hai un progetto? Parliamone." per user brief (D-specifics), aligned with global CTA primary label "Richiedi un sopralluogo" per CLAUDE.md CTA rules
- `ctaHref` for all 3 targets points to `/contatti` — consistent with decision to defer per-service detail pages

## Deviations from Plan

None — plan executed exactly as written. File matches the template from the plan task action verbatim, all acceptance criteria verified manually and via automated checks.

## Issues Encountered

- `pnpm typecheck` failed on first run because `node_modules` were missing in the worktree. Ran `pnpm install` (7.9s) to restore dependencies — standard worktree initialization, not a code issue.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- `content/services.ts` is fully typed and ready for consumption by Plan 02 components: `ServicesHero`, `TargetIndex`, `ServicesEditorialRow`, `HowWeWork`
- Plan 03 orchestrator (`app/servizi/page.tsx`) can import `servicesContent` directly
- All kicker strings, SOA badge data, process step copy, and CTA labels are locked — no content decisions remain open for Plans 02/03

## Known Stubs

None — `servicesContent` is fully populated with production copy. No placeholder text, no empty arrays, no TODO markers.

## Threat Flags

None — `content/services.ts` is a pure TypeScript data module with no network endpoints, auth paths, file access, or schema changes.

## Self-Check: PASSED

- `content/services.ts` exists: FOUND
- commit `ee9e953` exists: FOUND
- `pnpm typecheck` exit code 0: VERIFIED
- `pnpm check:compliance` exit code 0: VERIFIED

---
*Phase: 03-servizi*
*Completed: 2026-04-19*
