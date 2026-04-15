---
phase: 01-fondamenta
plan: 03
subsystem: seo-metadata-and-error-pages
tags: [nextjs-metadata, seo, openGraph, 404, error-boundary, rsc, client-component]
dependency_graph:
  requires:
    - 01-01-scaffold-and-toolchain
    - 01-02-design-system-and-layout
  provides:
    - lib-seo-metadata-ts
    - default-metadata-helper
    - build-metadata-helper
    - app-not-found-tsx
    - app-error-tsx
    - layout-metadata-rewire
  affects:
    - 02-homepage
    - 03-servizi
    - 04-progetti
    - 05-chi-siamo
    - 06-contatti
    - 07-seo-polish
tech_stack:
  added: []
  patterns:
    - Next.js Metadata API with metadataBase from env var
    - buildMetadata() explicit nested merge (openGraph/twitter/alternates) — shallow merge gotcha fix
    - openGraph.locale = "it_IT" (underscore — OG protocol + Next.js schema requirement)
    - app/not-found.tsx as Server Component inside root layout (Header/Footer inherited)
    - app/error.tsx as the only Phase 1 Client Component (Next.js forced — CONTEXT.md D-17)
    - Next 16.2 unstable_retry prop (NOT deprecated reset)
key_files:
  created:
    - lib/seo/metadata.ts
    - app/not-found.tsx
    - app/error.tsx
  modified:
    - app/layout.tsx
decisions:
  - "openGraph.locale uses underscore it_IT (not hyphen it-IT) — Next.js throws schema warning for hyphen form per RESEARCH §4"
  - "buildMetadata() manually merges nested openGraph/twitter/alternates to prevent shallow merge losing defaults"
  - "app/error.tsx uses Next 16.2 unstable_retry prop; reset prop excluded per acceptance criteria"
  - "No app/global-error.tsx in Phase 1 — RESEARCH §8 explicit: it replaces root layout losing fonts/Analytics"
  - ".env.local not committed (gitignored by design); metadataBase fallback to localhost works without it"
metrics:
  duration: "~7 minutes"
  completed_date: "2026-04-15"
  tasks_completed: 5
  tasks_total: 5
  files_created: 3
  files_modified: 1
---

# Phase 1 Plan 03: SEO Metadata and Error Pages Summary

**One-liner:** Shared Next.js Metadata helper (defaultMetadata + buildMetadata with explicit nested openGraph/twitter/alternates merge) plus institutional 404 Server Component and route-level error boundary Client Component using Next 16.2 unstable_retry, with app/layout.tsx rewired to single-source-of-truth metadata.

## What Was Built

### Metadata Helper (lib/seo/metadata.ts)

New file — `lib/seo/` directory created:

- `defaultMetadata: Metadata` — shared defaults for the entire app:
  - `metadataBase` derived from `process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"` (never hard-coded)
  - `title.template = "%s — Edilferro"` (child segments compose per-page titles)
  - `openGraph.locale = "it_IT"` (underscore — NOT hyphen; avoids Next.js schema warning per RESEARCH §4)
  - `referrer = "origin-when-cross-origin"`, `robots.index = true`
  - OG images commented out (Phase 7 concern)
- `buildMetadata(overrides?: Metadata): Metadata` — per-page builder with **explicit nested merge** for `openGraph`, `twitter`, `alternates` to avoid the shallow-merge gotcha (documented in RESEARCH §4)
- No forbidden strings (scanned by `pnpm check:compliance` — `lib/` is in `SCAN_DIRS`)

### Custom 404 (app/not-found.tsx)

- **Server Component** (no `"use client"`) — renders inside `app/layout.tsx`, Header + Footer + fonts + Analytics inherited automatically
- Default-exports `function NotFound()` (not arrow, not async)
- All copy from `notFoundContent` in `@/content/site` — no hardcoded Italian strings except "404" digit eyebrow
- D-08 serif H1: `font-serif text-h1 text-ink`
- D-06 fill-only brand: Home CTA uses `bg-brand text-panna` (fill pill), Contatti CTA uses `border-ink/20 text-ink` (ghost pill)
- Both CTAs present: `href="/"` (Home) + `href="/contatti"` (Contatti) — satisfies ROADMAP Phase 1 Success Criterion 5

### Error Boundary (app/error.tsx)

- **Client Component** — the ONLY legitimate `"use client"` island in Phase 1 (Next.js forced — CONTEXT.md D-17 exception)
- Default-exports `function Error({ error, unstable_retry })` — uses **Next 16.2 `unstable_retry`** prop (NOT deprecated `reset`)
- `useEffect` + `console.error(error)` for Phase 1 logging (Phase 7 will wire to error reporting service)
- All copy from `errorContent` in `@/content/site`
- Same D-06/D-08 design rules: serif H1, brand fill retry button, ink/20 border home link
- No `export const metadata` (Next.js error files cannot have metadata)
- No `app/global-error.tsx` (RESEARCH §8 explicit: skipped in Phase 1)

### Layout Rewire (app/layout.tsx)

- Replaced Plan 01-02 inline placeholder `metadata: Metadata = { title: ..., description: ... }` with:
  ```ts
  import { defaultMetadata } from "@/lib/seo/metadata";
  export const metadata: Metadata = defaultMetadata;
  ```
- Removed `import { siteContent } from "@/content/site"` (no longer referenced)
- All 5 required layout elements preserved: `<Header />`, `<Footer />`, `<Analytics />`, `<SpeedInsights />`, `lang="it"`
- Next/font declarations and `<html className={...}>` font-variable injection untouched

## Verification Results

All Wave 0 + Wave 1 + Wave 2 checks passed:

```
pnpm lint              → OK (0 errors)
pnpm typecheck         → OK (0 errors)
pnpm check:compliance  → OK (14 files scanned, 0 violations)
pnpm check:contrast    → OK (all pairs AAA, D-06 forbidden pairs 1.20:1)
pnpm check:layout      → OK (5 required elements present)
pnpm build             → OK (Next.js 16 Turbopack, static / + /_not-found)
```

Runtime verification (Task 5 automated):

```
pnpm dev + curl http://localhost:3000/xxx-does-not-exist
→ HTTP 404
→ body contains "Pagina non trovata" ✓
→ body contains "Torna alla home" ✓
→ body contains "Contattaci" ✓
```

## Deviations from Plan

None — plan executed exactly as written.

The plan's "optional cleanup" for `siteContent` import was applied as documented: after removing the inline metadata object, `siteContent` was no longer referenced in `app/layout.tsx`, so the import was removed to prevent an ESLint `no-unused-vars` violation.

## Known Stubs

None — all copy references `notFoundContent.*` and `errorContent.*` from `content/site.ts`, which already contains placeholder values tracked in Plan 01-02's Known Stubs section (client-supplied real data tracked in Plan 01-04).

## Threat Flags

None — no new network endpoints, auth paths, or schema changes introduced. The `NEXT_PUBLIC_SITE_URL` env var feeds only build-time `metadataBase`; the `?? "http://localhost:3000"` fallback prevents build crashes on missing env (T-01-03-01 mitigation satisfied).

## Commits

| Hash | Message |
|------|---------|
| `ace9221` | feat(01-03): create lib/seo/metadata.ts — defaultMetadata + buildMetadata() helper (FND-09) |
| `a2bd97b` | feat(01-03): create app/not-found.tsx — institutional custom 404 Server Component (FND-10) |
| `3586b01` | feat(01-03): create app/error.tsx — route-level error boundary with Next 16.2 unstable_retry |
| `3e4d5a3` | feat(01-03): rewire app/layout.tsx — import defaultMetadata from @/lib/seo/metadata |

## Self-Check: PASSED
