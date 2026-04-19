---
phase: 03-servizi
plan: 02
subsystem: components/sections
tags: [rsc, tailwind, lucide-react, soa-badges, anchor-navigation]
dependency_graph:
  requires:
    - 03-01 (content/services.ts — ServicesTarget, ProcessStep, SoaBadge types)
  provides:
    - components/sections/ServicesHero.tsx
    - components/sections/TargetIndex.tsx
    - components/sections/ServicesEditorialRow.tsx
    - components/sections/HowWeWork.tsx
  affects:
    - app/servizi/page.tsx (consumed in Plan 03)
tech_stack:
  added: []
  patterns:
    - RSC section components consuming content module types
    - Full-card Link wrapper (D-02 fully clickable cards)
    - Color token swap dark→light surface (Phase 2→Phase 3 pattern)
    - SOA badge slot rendered conditionally on prop presence
    - Lucide icon fixed mapping by array index with noUncheckedIndexedAccess fallback
    - Alternating panna/white background via variant prop
key_files:
  created:
    - components/sections/ServicesHero.tsx
    - components/sections/TargetIndex.tsx
    - components/sections/ServicesEditorialRow.tsx
    - components/sections/HowWeWork.tsx
  modified: []
decisions:
  - "Eyebrow function duplicated inline in ServicesHero and HowWeWork (per UI-SPEC §Component Inventory — no partial abstraction to components/ui)"
  - "TargetIndex uses group (not group/cta) since the Link is the card wrapper itself"
  - "SoaBadgeGrid rendered only when soaBadges prop is present and non-empty (null render for Privati and Professionisti)"
  - "STEP_ICONS mapped by array index with ?? ClipboardList fallback for noUncheckedIndexedAccess"
metrics:
  duration_minutes: 3
  completed_date: "2026-04-19"
  tasks_completed: 3
  files_created: 4
---

# Phase 3 Plan 02: Section Components (ServicesHero, TargetIndex, ServicesEditorialRow, HowWeWork) Summary

**One-liner:** Four RSC section components for /servizi with anchor navigation, SOA badge slot, Lucide icons, and dark-to-light color token swap from Phase 2 patterns.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create ServicesHero.tsx + TargetIndex.tsx | 4839f94 | components/sections/ServicesHero.tsx, components/sections/TargetIndex.tsx |
| 2 | Create ServicesEditorialRow.tsx | 06dc41b | components/sections/ServicesEditorialRow.tsx |
| 3 | Create HowWeWork.tsx | bf566ab | components/sections/HowWeWork.tsx |

## Files Created

| File | Lines | Purpose |
|------|-------|---------|
| `components/sections/ServicesHero.tsx` | 46 | Centered text hero on bg-panna, H1 serif clamp + brand italic accent |
| `components/sections/TargetIndex.tsx` | 63 | 3-card-link grid pointing to section anchors #privati/#pubblico/#professionisti |
| `components/sections/ServicesEditorialRow.tsx` | 126 | 2-col text+photo row with id anchor, alternating panna/white, SOA badge slot |
| `components/sections/HowWeWork.tsx` | 72 | 4-step horizontal grid with Lucide icons on bg-white |

## Verification

**pnpm typecheck:** PASSED (exit code 0)

**pnpm lint:** Pre-existing 20 lint errors in `_design/` directory (design draft files). Zero errors in any production file. Zero errors in the 4 new components. This condition pre-existed at commit 460a967 and is out of scope per deviation rules.

**RSC compliance:** Zero `"use client"` directives in any of the 4 new files.

**New dependencies:** None. `lucide-react ^1.8.0` was already in package.json from Phase 2.

## Design Decisions

**D-02 Fully clickable cards:** TargetIndex cards wrap entire content in `<Link>` (not just a CTA label), using `group` hover scope on the wrapper.

**D-06 Brand fill-only rule:** `text-brand` used only for: (1) `<em>` accent in H1/H2 titles, (2) italic serif `— NN` numbered kicker, (3) SOA badge code uppercase (explicitly allowed by UI-SPEC §SOA Badge Specification as micro-copy on neutral surface). No brand on icon strokes.

**D-08 SOA critical differentiator:** `SoaBadgeGrid` is a private function inside ServicesEditorialRow — rendered only when `item.soaBadges` is present and non-empty. For Privati and Professionisti the slot produces no DOM output.

**D-18 Alternating panna/white:** `ServicesEditorialRow` accepts a `variant` prop (`"panna" | "white"`) — the orchestrator page (Plan 03) alternates by index.

**noUncheckedIndexedAccess:** `STEP_ICONS[i] ?? ClipboardList` fallback required by tsconfig strict mode.

## Deviations from Plan

None — plan executed exactly as written.

Pre-existing lint issues in `_design/` are logged to deferred-items below.

## Deferred Items

Pre-existing lint errors (20 problems, 11 errors, 9 warnings) in `_design/components/sections-01.jsx`, `_design/components/sections-02.jsx`, `_design/components/sections-03.jsx`, `_design/components/stubs.jsx`. These are design prototype files that predate Phase 2 and are outside the production build. Filed for cleanup in a future quick task.

## Known Stubs

None. All 4 components are purely presentational — they receive typed props and render static HTML. No hardcoded empty values, no placeholder text, no unwired data sources.

## Threat Flags

No new trust boundaries introduced. All components are RSC with compile-time content from `content/services.ts`. No network requests, no user input, no dynamic routing segments.

## Self-Check: PASSED

- `components/sections/ServicesHero.tsx` — FOUND
- `components/sections/TargetIndex.tsx` — FOUND
- `components/sections/ServicesEditorialRow.tsx` — FOUND
- `components/sections/HowWeWork.tsx` — FOUND
- Commit 4839f94 — FOUND (ServicesHero + TargetIndex)
- Commit 06dc41b — FOUND (ServicesEditorialRow)
- Commit bf566ab — FOUND (HowWeWork)
- `pnpm typecheck` — PASSED
- RSC compliance — CONFIRMED (zero "use client")
