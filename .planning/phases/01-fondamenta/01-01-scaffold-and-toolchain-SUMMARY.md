---
phase: 01-fondamenta
plan: 01
subsystem: scaffold-and-toolchain
tags: [next16, typescript, tailwindcss, eslint, prettier, husky, compliance]
dependency_graph:
  requires: []
  provides:
    - next16-scaffold
    - typescript-strict-config
    - eslint-compliance-rules
    - prettier-config
    - husky-pre-commit
    - check-compliance-script
    - check-contrast-script
    - check-layout-script
    - wave0-stub-layout
  affects:
    - 01-02-design-system-and-layout
    - 01-03-seo-metadata-and-error-pages
    - 01-04-client-deliverables
tech_stack:
  added:
    - next@16.2.3
    - react@19.2.4
    - typescript@5.9.3 (pinned ^5.7)
    - tailwindcss@4.2.2
    - "@tailwindcss/postcss@4.2.2"
    - "@vercel/analytics@2.0.1"
    - "@vercel/speed-insights@2.0.0"
    - clsx@2.1.1
    - tailwind-merge@2.6.1
    - eslint@9.39.4 (flat config)
    - eslint-config-next@16.2.3
    - eslint-config-prettier@10.1.8
    - prettier@3.8.3
    - prettier-plugin-tailwindcss@0.7.2
    - husky@9.1.7
    - lint-staged@16.4.0
  patterns:
    - Next.js App Router with no src/ directory (root-level app/)
    - ESLint 9 flat config with compliance no-restricted-syntax/imports
    - Tailwind v4 CSS-first (no tailwind.config.js)
    - pnpm as package manager
    - git ls-files scan in compliance script (tracks only committed files)
key_files:
  created:
    - package.json
    - pnpm-lock.yaml
    - tsconfig.json
    - next.config.ts
    - eslint.config.mjs
    - postcss.config.mjs
    - ".prettierrc.json"
    - ".prettierignore"
    - ".lintstagedrc.json"
    - ".husky/pre-commit"
    - ".env.production"
    - ".gitignore"
    - app/layout.tsx
    - app/page.tsx
    - app/globals.css
    - scripts/check-compliance.mjs
    - scripts/check-contrast.mjs
    - scripts/check-layout.mjs
    - components/layout/Header.tsx
    - components/layout/Footer.tsx
    - components/ui/.gitkeep
    - components/sections/.gitkeep
    - components/business/.gitkeep
  modified:
    - README.md
decisions:
  - "Scaffolded app/ at root (no src/) to match plan file path conventions"
  - "TypeScript resolved to 5.9.3 (within ^5.7 range) — compatible with @typescript-eslint@8.58.2"
  - "ESLint compliance rules scoped to app/components/lib/content only — prevents eslint.config.mjs self-flagging its own regex patterns"
  - ".env.production committed with safe placeholder only; .gitignore updated with !.env.production exception"
  - "Header/Footer are intentional Wave 0 stubs — replaced in Plan 01-02"
metrics:
  duration: "~12 minutes"
  completed_date: "2026-04-15"
  tasks_completed: 4
  tasks_total: 4
  files_created: 23
  files_modified: 2
---

# Phase 1 Plan 01: Scaffold and Toolchain Summary

**One-liner:** Next.js 16 App Router scaffold with TypeScript strict deltas, ESLint 9 flat-config compliance rail (no GA4/gtag/Google Maps), Prettier+husky+lint-staged pre-commit, and three CI-grade check scripts (compliance, WCAG contrast, layout presence).

## What Was Built

A complete Next.js 16 project scaffold at root level (no `src/` directory) with:

- **Next.js 16.2.3** App Router, Turbopack, TypeScript strict
- **Tailwind CSS v4.2.2** with `@tailwindcss/postcss` (CSS-first, no JS config)
- **ESLint 9 flat config** with `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript` + `eslint-config-prettier`, plus compliance `no-restricted-syntax`/`no-restricted-imports` rules guarding against GA4, gtag, Google Tag Manager, Google Fonts CDN, and `@next/third-parties/google`
- **Prettier** with `prettier-plugin-tailwindcss` for class sorting
- **Husky 9** pre-commit hook running `lint-staged` (ESLint fix + Prettier on staged files)
- **Three compliance scripts:**
  - `scripts/check-compliance.mjs` — git ls-files scan for forbidden strings
  - `scripts/check-contrast.mjs` — WCAG 2.1 contrast assertions for brand palette (INK/PANNA/BRAND/SURFACE)
  - `scripts/check-layout.mjs` — presence check for Header/Footer/Analytics/SpeedInsights/lang=it in root layout
- **Wave 0 stub layout** with `@vercel/analytics` + `@vercel/speed-insights` mounted and `lang="it"` on `<html>`
- **Component directory scaffold:** `components/layout/`, `components/ui/`, `components/sections/`, `components/business/`

## Verification Results

All Wave 0 checks passed:

```
pnpm lint          → OK (0 errors)
pnpm typecheck     → OK (0 errors)
pnpm check:compliance → OK (7 files scanned, 0 violations)
pnpm check:contrast   → OK (all pairs AAA, D-06 forbidden pairs 1.20:1)
pnpm check:layout     → OK (5 required elements present)
pnpm build            → OK (Next.js 16 Turbopack, static /, no TS errors)
```

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] ESLint compliance rules self-flagged eslint.config.mjs**
- **Found during:** Task 2 (first `pnpm lint` run)
- **Issue:** The `no-restricted-syntax` rule with `selector: "Literal[value=/google-analytics\\.com/]"` matched the selector string itself as a Literal node in the ESLint config's own AST — the selector string contains `google-analytics.com` as a substring
- **Fix:** Narrowed the `files` pattern from `**/*.{ts,tsx,js,jsx,mjs,cjs}` to `app/**/*.{ts,tsx,js,jsx}`, `components/**/*.{ts,tsx,js,jsx}`, `lib/**/*.{ts,tsx,js,jsx}`, `content/**/*.{ts,tsx,js,jsx}` — scoping the compliance rules to application source only, excluding config and script files that legitimately reference the forbidden patterns as data
- **Files modified:** `eslint.config.mjs`
- **Commit:** e16a9ca

**2. [Rule 3 - Blocking] .env.production gitignored by .env* pattern**
- **Found during:** Task 2 (git add attempt)
- **Issue:** The default `create-next-app` `.gitignore` uses `.env*` which catches `.env.production`, but the plan requires `.env.production` to be committed (safe placeholder)
- **Fix:** Added `!.env.production` exception to `.gitignore`
- **Files modified:** `.gitignore`
- **Commit:** e16a9ca

**3. [Rule 3 - Blocking] create-next-app scaffolded into src/ directory**
- **Found during:** Task 1 (scaffold)
- **Issue:** `pnpm create next-app@latest` with current template places app files under `src/app/` and sets `"@/*": ["./src/*"]` in tsconfig — but all plan files reference `app/` at root
- **Fix:** Manually restructured: moved `src/app/` contents to `app/` at root, updated `tsconfig.json` paths from `./src/*` to `./*`
- **Files modified:** `tsconfig.json`, all `app/` files moved to root
- **Commit:** 1da6d7f

## Known Stubs

| Component | File | Reason |
|-----------|------|--------|
| `<Header />` | `components/layout/Header.tsx` | Intentional Wave 0 stub — renders an empty `<header>` element. Replaced by full implementation in Plan 01-02 |
| `<Footer />` | `components/layout/Footer.tsx` | Intentional Wave 0 stub — renders an empty `<footer>` element. Replaced by full implementation in Plan 01-02 |

These stubs do NOT prevent the plan's goal from being achieved. The plan's objective is to establish the compliance rail (check:layout passes), which requires the stubs to exist. Plan 01-02 provides the real implementations.

## Commits

| Hash | Message |
|------|---------|
| `1da6d7f` | chore(01-01): scaffold Next.js 16 project, install dependencies |
| `e16a9ca` | chore(01-01): configure toolchain — tsconfig deltas, ESLint compliance, Prettier, husky |
| `7363576` | feat(01-01): add compliance scripts, stub layout components, Wave 0 app/layout.tsx |
| `7780960` | feat(01-01): green-light Wave 0 rail — all checks + build pass |

## Self-Check: PASSED

All 23 created files verified present. All 4 task commits verified in git history.
