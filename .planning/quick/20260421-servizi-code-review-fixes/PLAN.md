---
slug: servizi-code-review-fixes
date: 2026-04-21
status: in_progress
---

# Fix code review issues — /servizi

Apply all warnings and info items from 03-REVIEW.md.

## Tasks

1. WR-01 HowWeWork: STEP_ICONS tuple with `satisfies` + remove silent fallback
2. WR-02 TargetIndex: h3 → h2 in TargetCard (heading hierarchy)
3. WR-03 content/services.ts: narrow ctaHref to Route<"/contatti" | "/servizi">, remove casts in components
4. IN-01 Extract shared Eyebrow to components/ui/Eyebrow.tsx, update ServicesHero + HowWeWork
5. IN-02 ServicesEditorialRow: remove redundant bg-black on photo Link
6. IN-03 content/services.ts: differentiate 3 ctaLabel values for accessibility
