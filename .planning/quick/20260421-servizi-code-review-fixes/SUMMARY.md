---
slug: servizi-code-review-fixes
date: 2026-04-21
status: complete
---

# Fix code review — /servizi

Applied all 6 issues from 03-REVIEW.md.

## Changes

- `components/ui/Eyebrow.tsx` — new shared component (IN-01)
- `components/sections/ServicesHero.tsx` — use shared Eyebrow, removed local duplicate (IN-01)
- `components/sections/HowWeWork.tsx` — use shared Eyebrow; STEP_ICONS typed as `as const satisfies` tuple; index cast `i as 0|1|2|3` for safe access (WR-01, IN-01)
- `components/sections/TargetIndex.tsx` — h3 → h2 in TargetCard (WR-02)
- `components/sections/ServicesEditorialRow.tsx` — removed Route import and `as Route<string>` casts; removed redundant `bg-black` (WR-03, IN-02)
- `content/services.ts` — `ctaHref: Route<"/contatti" | "/servizi">` (WR-03); ctaLabel differenziati per i 3 target (IN-03)

## Commit

75aa175 refactor(servizi): apply code review fixes from 03-REVIEW.md
