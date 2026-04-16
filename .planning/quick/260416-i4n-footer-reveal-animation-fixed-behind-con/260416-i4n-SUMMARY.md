---
phase: quick
plan: 260416-i4n
type: quick-task
tags: [footer, animation, layout, css, performance]
completed: "2026-04-16"
duration: ~10min
tasks_completed: 2
files_modified: 3
files_created: 1
key_decisions:
  - "Used ResizeObserver + CSS var --footer-height to sync spacer height dynamically, with immediate offsetHeight measurement on mount to prevent spacer flash before first observer callback"
  - "Removed scroll-driven CSS animation (animation-timeline: view()) which conflicted with the new fixed-position layering approach"
  - "SSR fallback of 340px for --footer-height covers the typical desktop footer height before JS hydrates"
---

# Quick Task 260416-i4n: Footer Fixed-Behind-Content Reveal

**One-liner:** Pure CSS z-index layering with a ResizeObserver-driven spacer to reveal the footer as page content scrolls away — no animation library, zero JS animation.

## What Was Built

The footer now uses the classic "fixed behind content" reveal pattern:

- `FooterReveal` Client Component positions the footer `fixed bottom-0 z-0`
- Page content sits in a `relative z-10 bg-panna` wrapper that visually covers the footer
- A spacer `div` at the bottom of the content wrapper, with `height: var(--footer-height, 340px)`, gives the page enough scroll depth to fully expose the footer
- A `ResizeObserver` in `FooterReveal` keeps `--footer-height` accurate as the footer resizes (e.g., on window resize or font load)
- An upward `box-shadow: 0 -8px 32px rgba(0,0,0,0.25)` on `footer` creates visual depth

## Commits

| Hash      | Description                                                                  |
| --------- | ---------------------------------------------------------------------------- |
| `2b0b48a` | feat(quick-260416-i4n): add FooterReveal client component                    |
| `9487647` | feat(quick-260416-i4n): rewire layout for fixed-behind-content footer reveal |

## Files

**Created:**

- `components/layout/FooterReveal.tsx` — Client Component, ResizeObserver, CSS var write

**Modified:**

- `app/layout.tsx` — content wrapper z-10, spacer div, FooterReveal import
- `app/globals.css` — removed conflicting scroll-driven animation, added footer box-shadow

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- [x] `components/layout/FooterReveal.tsx` exists and exports `FooterReveal`
- [x] `app/layout.tsx` imports and uses `FooterReveal`
- [x] `app/globals.css` has no `animation-timeline` or `@keyframes footer-reveal`
- [x] `pnpm build` exits 0, TypeScript clean, all 7 routes statically generated
- [x] Commits `2b0b48a` and `9487647` verified in git log

## Self-Check: PASSED
