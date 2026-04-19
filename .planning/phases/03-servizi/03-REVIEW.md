---
phase: 03-servizi
reviewed: 2026-04-19T00:00:00Z
depth: standard
files_reviewed: 7
files_reviewed_list:
  - app/servizi/page.tsx
  - components/sections/HowWeWork.tsx
  - components/sections/ServicesEditorialRow.tsx
  - components/sections/ServicesHero.tsx
  - components/sections/TargetIndex.tsx
  - content/services.ts
  - eslint.config.mjs
findings:
  critical: 0
  warning: 3
  info: 4
  total: 7
status: issues_found
---

# Phase 03: Code Review Report

**Reviewed:** 2026-04-19
**Depth:** standard
**Files Reviewed:** 7
**Status:** issues_found

## Summary

Seven files covering the `/servizi` page were reviewed: the page orchestrator, four section components, the content module, and the ESLint config. The implementation is structurally sound — RSC throughout, no `any` usage, clean separation of content from markup, and correct `next/image` usage with `fill` + `sizes`. All three image assets referenced in `content/services.ts` are present in `public/images/design/`.

Three warnings were found. Two relate to the icon-mapping strategy in `HowWeWork`: the index-based lookup silently falls back to a wrong icon when `steps.length > 4`, and the static `STEP_ICONS` array is typed more loosely than necessary, hiding the mismatch risk at compile time. The third warning is a structural accessibility gap: the `TargetIndex` section uses `<h3>` card titles while `ServicesEditorialRow` repeats the same text as `<h2>`, producing a heading hierarchy where `<h3>` comes before the `<h2>` it logically introduces — this can confuse screen-reader navigation.

Four info items cover: a type assertion that could be tightened, a duplicate `Eyebrow` component definition across two files, a redundant `bg-black` on the photo `<Link>` wrapper, and a minor `eslint.config.mjs` maintenance note.

No critical security or data-loss issues were found.

---

## Warnings

### WR-01: Silent wrong-icon fallback in `HowWeWork` when `steps.length > 4`

**File:** `components/sections/HowWeWork.tsx:42`

**Issue:** `STEP_ICONS[i] ?? ClipboardList` silently falls back to `ClipboardList` (the "Analisi" icon) for any step beyond index 3. The current content only has 4 steps, so this is latent — but if a future author adds a 5th step in `content/services.ts`, step 5 will silently render the wrong icon with no build-time or runtime warning. The `STEP_ICONS` array is typed as `ReadonlyArray<ComponentType<SVGProps<SVGSVGElement>>>` which carries no length information, so TypeScript cannot catch the out-of-bounds access.

**Fix:** Assert the exact length at compile time so a length mismatch is a type error rather than a silent runtime fallback:

```ts
// Replace the current array declaration:
const STEP_ICONS = [
  ClipboardList, // 01 — Analisi
  Ruler, // 02 — Progettazione
  HardHat, // 03 — Realizzazione
  CheckCircle2, // 04 — Consegna
] as const satisfies readonly [
  ComponentType<SVGProps<SVGSVGElement>>,
  ComponentType<SVGProps<SVGSVGElement>>,
  ComponentType<SVGProps<SVGSVGElement>>,
  ComponentType<SVGProps<SVGSVGElement>>,
];

// Then replace the lookup at line 42:
const Icon = i < STEP_ICONS.length ? STEP_ICONS[i] : ClipboardList;
```

With `noUncheckedIndexedAccess: true` in `tsconfig.json` (recommended by CLAUDE.md), the index access `STEP_ICONS[i]` will already return `T | undefined`, making the nullish coalesce visible — but the explicit tuple type provides the extra guarantee that content and icon list stay in sync.

---

### WR-02: Heading hierarchy — `<h3>` in `TargetIndex` precedes `<h2>` in `ServicesEditorialRow` for the same conceptual level

**File:** `components/sections/TargetIndex.tsx:44` and `components/sections/ServicesEditorialRow.tsx:34`

**Issue:** The page renders:

1. `<h1>` — `ServicesHero`
2. `<h3>` — three `TargetCard` titles inside `TargetIndex` (line 44)
3. `<h2>` — each `ServicesEditorialRow` title (line 34)

Screen readers and search engines encounter `<h3>` before any `<h2>`, which breaks the document outline. The `TargetIndex` cards are navigational anchors, not sub-sections of an `<h2>`, so their heading level should be `<h2>`, not `<h3>`. The editorial rows that follow are content sections at the same conceptual level and are correctly `<h2>`.

**Fix:** In `TargetCard` change `<h3>` to `<h2>`:

```tsx
// components/sections/TargetIndex.tsx line 44 — change:
<h3 className="text-ink font-serif text-[clamp(1.3rem,0.6rem+1vw,1.65rem)] leading-[1.25] font-medium tracking-tight">
// to:
<h2 className="text-ink font-serif text-[clamp(1.3rem,0.6rem+1vw,1.65rem)] leading-[1.25] font-medium tracking-tight">
```

The `ServicesEditorialRow` headings remain `<h2>`. Both sets of `<h2>` are siblings under the page `<h1>`, which is the correct outline structure.

---

### WR-03: Unsafe type assertion `as Route<string>` applied to unvalidated content strings

**File:** `components/sections/ServicesEditorialRow.tsx:60,75` and `components/sections/TargetIndex.tsx:29`

**Issue:** `item.ctaHref as Route<string>` and `/servizi#${target.id}` as `Route<string>` are both type assertions that bypass Next.js's typed routing check. If `ctaHref` in `content/services.ts` is changed to a non-existent path (e.g. a typo), the cast silences the compiler error that would otherwise catch it. This is low risk today because all hrefs point to `/contatti` (an existing page), but the pattern is fragile.

**Fix:** Narrow the `ctaHref` field in the content type to a union of known app routes:

```ts
// content/services.ts — tighten the type:
import type { Route } from "next";

export type ServicesTarget = {
  // ...
  readonly ctaHref: Route<"/contatti" | "/servizi">;
  // ...
};
```

This makes the type assertion unnecessary; components can use `item.ctaHref` directly without casting. The anchor href in `TargetIndex` (`/servizi#${target.id}`) can similarly be typed as `Route<string>` without the cast if the template literal produces a valid path — but since hash fragments are valid, the existing cast is acceptable there; the content field is the higher-priority fix.

---

## Info

### IN-01: `Eyebrow` component duplicated across `ServicesHero` and `HowWeWork`

**File:** `components/sections/ServicesHero.tsx:39-46` and `components/sections/HowWeWork.tsx:65-72`

**Issue:** The two `Eyebrow` sub-components are byte-for-byte identical (same className, same structure). This is dead duplication — if the design changes the eyebrow style it must be updated in two places.

**Fix:** Extract to `components/ui/Eyebrow.tsx` and import it in both section files. This is consistent with the CLAUDE.md rule "massimo riuso dei componenti" and the existing `components/ui/` convention.

---

### IN-02: Redundant `bg-black` on the photo `<Link>` wrapper

**File:** `components/sections/ServicesEditorialRow.tsx:77`

**Issue:** The `<Link>` that wraps the photo column carries `bg-black`. This is intended as a letterbox fallback while the image loads, but since `next/image` with `fill` renders inside this container and `object-cover` fully covers it at all breakpoints, the `bg-black` is never visible in practice. The gradient overlay (`to-black/40`) already provides the desired dark bleed at the bottom edge.

**Fix:** Remove `bg-black` from the className string. It has zero visual effect and marginally inflates the rendered DOM class list.

---

### IN-03: All three `ctaLabel` values in `content/services.ts` are identical

**File:** `content/services.ts:92,132,169`

**Issue:** Every `ServicesTarget` has `ctaLabel: "Scopri i servizi"`. This is not a bug, but it means screen readers and crawlers see three links with identical accessible names pointing to the same URL (`/contatti`). WCAG 2.4.6 (AAA) and good practice recommend distinguishing link labels. `eslint-plugin-jsx-a11y` will not catch this because the duplication is in content, not markup.

**Fix:** Differentiate the labels, for example:

- Privati: `"Scopri i servizi per privati"`
- Settore Pubblico: `"Scopri i servizi per enti pubblici"`
- Aziende & Professionisti: `"Scopri i servizi per aziende"`

Alternatively, use the existing `aria-label` pattern already applied to the photo `<Link>` (`aria-label={item.title}`) and keep the visible label short — but since the text CTA and the photo link both point to `/contatti`, some differentiation at the content level is the cleanest fix.

---

### IN-04: `eslint.config.mjs` — `eslint-config-next/typescript` may conflict with `@typescript-eslint` if versions drift

**File:** `eslint.config.mjs:4`

**Issue:** `eslint-config-next/typescript` re-exports `@typescript-eslint` rules. If `@typescript-eslint` is also installed directly as a dev dependency, rule version drift can cause duplicate-rule warnings or subtle behaviour differences. This is not a current bug but a maintenance risk.

**Fix:** Confirm that `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` in `package.json` exactly match the versions pinned by `eslint-config-next`. If they diverge, remove the direct `@typescript-eslint` dev dependencies and rely entirely on what `eslint-config-next` bundles — or pin them to the same versions via `pnpm overrides`.

---

_Reviewed: 2026-04-19_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
