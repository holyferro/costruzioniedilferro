---
phase: 01
slug: fondamenta
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-14
---

# Phase 01 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Source: `.planning/phases/01-fondamenta/01-RESEARCH.md` §11 "Validation Architecture".

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | **None yet** — Phase 1 is scaffold + compliance, no runtime/behavioral logic to unit-test. |
| **Config file** | none — Wave 0 installs ESLint/Prettier/husky + validation scripts |
| **Quick run command** | `pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout` |
| **Full suite command** | `pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout && pnpm build` |
| **Estimated runtime** | ~15s quick, ~60–90s full (first build, Turbopack warm subsequent) |

**Rationale for no unit-test framework in Phase 1:** every FND requirement is verifiable via (a) `tsc --noEmit`, (b) ESLint, (c) file/string greps, (d) `next build` success, (e) a WCAG contrast script. Installing vitest/jest adds dependencies with zero value until Phase 6 (form validation) introduces real behavioral logic. The Nyquist gate for Phase 1 is a **structural gate**, not a behavioral one.

---

## Sampling Rate

- **After every task commit:** `pnpm lint && pnpm typecheck` (< 10s)
- **After every plan wave:** Full quick-run command (adds `check:compliance` + `check:contrast` + `check:layout`, ~15s)
- **Before `/gsd-verify-work`:** Full suite including `pnpm build` — must complete without warnings (ROADMAP success criterion 1)
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

> This map is derived from the research. The planner will refine task IDs (`{N}-{plan}-{task}`) when generating PLAN.md files in the next step. The **Test Type**, **Automated Command**, and **File Exists** columns are locked by research.

| Req ID | Behavior | Test Type | Automated Command | File Exists | Status |
|--------|----------|-----------|-------------------|-------------|--------|
| **FND-01** | Next 16 project builds and dev-serves | smoke + build | `pnpm build` exits 0 | ❌ W0 — scaffold | ⬜ |
| **FND-02** | Brand palette in `globals.css`, WCAG AA ≥ 4.5:1 verified | structural + calculation | `pnpm check:contrast` | ❌ W0 — `scripts/check-contrast.mjs` | ⬜ |
| **FND-03** | `components/{ui,sections,business,layout}` directories exist in git | structural | `test -d components/ui && test -d components/sections && test -d components/business && test -d components/layout` | ❌ W0 — `.gitkeep` in each | ⬜ |
| **FND-04** | `next/font` imports Inter + IBM Plex Serif, woff2 emitted under `.next/static/media` after build | structural (grep) | `grep -qE 'next/font/google' app/layout.tsx && grep -qE 'Inter' app/layout.tsx && grep -qE 'IBM_Plex_Serif' app/layout.tsx` + `ls .next/static/media \| grep -qi 'ibm-plex'` after `pnpm build` | ❌ W0 — `app/layout.tsx` | ⬜ |
| **FND-05** | `content/site.ts` exists, exports `siteContent`, TS compiles | structural + typecheck | `test -f content/site.ts && grep -q 'export const siteContent' content/site.ts && pnpm typecheck` | ❌ W0 | ⬜ |
| **FND-06** | `content/legal.ts` exports `legalContent` with required fields (piva, rea, capitaleSociale, sedeLegale) | structural | `test -f content/legal.ts && grep -q 'piva' content/legal.ts && grep -q 'rea' content/legal.ts && grep -q 'capitaleSociale' content/legal.ts && grep -q 'sedeLegale' content/legal.ts` | ❌ W0 | ⬜ |
| **FND-07** | `<Header />` and `<Footer />` mount in `app/layout.tsx` on every route | structural | `pnpm check:layout` (grep `<Header\b`, `<Footer\b` in `app/layout.tsx`) | ❌ W0 — `app/layout.tsx` + `scripts/check-layout.mjs` (or folded into `check:compliance`) | ⬜ |
| **FND-08** | `<Analytics />` + `<SpeedInsights />` in layout, zero `gtag\|_ga\|googletagmanager` strings in `app/`, `components/`, `content/`, `lib/` | structural + grep | `grep -qE '<Analytics\b' app/layout.tsx && grep -qE '<SpeedInsights\b' app/layout.tsx && pnpm check:compliance` | ❌ W0 — `app/layout.tsx` + `scripts/check-compliance.mjs` | ⬜ |
| **FND-09** | `lib/seo/metadata.ts` exports `defaultMetadata` + `buildMetadata()` | structural + typecheck | `test -f lib/seo/metadata.ts && grep -qE 'export (const defaultMetadata\|function buildMetadata)' lib/seo/metadata.ts && pnpm typecheck` | ❌ W0 | ⬜ |
| **FND-10** | `app/not-found.tsx` exists, default-exports a component, builds without error | structural + build | `test -f app/not-found.tsx && pnpm build` + manual check at unknown route | ❌ W0 | ⬜ |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Wave 0 must land before Wave 1 touches any implementation — it installs the validation rail that every later task commits against.

- [ ] `package.json` with scripts: `dev`, `build`, `start`, `lint`, `lint:fix`, `typecheck`, `format`, `format:check`, `check:compliance`, `check:contrast`, `check:layout` (or folded into `check:compliance`), and an umbrella `check` that runs `lint && typecheck && check:compliance && check:contrast && check:layout`
- [ ] `eslint.config.mjs` — flat config extending `eslint-config-next` via FlatCompat, `@typescript-eslint/recommended-type-checked`, `eslint-plugin-jsx-a11y/recommended`, `eslint-config-prettier` last; includes `no-restricted-syntax` rules catching `gtag`, `window._ga`, `googletagmanager`, and inline `<iframe src="*google.com/maps*">`
- [ ] `.prettierrc.json` + `.prettierignore` with `prettier-plugin-tailwindcss`
- [ ] `scripts/check-compliance.mjs` — greps `app/`, `components/`, `content/`, `lib/` for `gtag|_ga|googletagmanager|fonts\.googleapis\.com|fonts\.gstatic\.com|<iframe[^>]*google\.com/maps`, fails on any match
- [ ] `scripts/check-contrast.mjs` — asserts WCAG 2.1 ratios for the brand palette (see RESEARCH §11.2 for full source). Asserts ALLOWED pairs pass ≥ 4.5 and FORBIDDEN pairs (`#1A1A1A`/`#291572` either order) fail 4.5 — this defends D-06 "fill only" structurally.
- [ ] `scripts/check-layout.mjs` (or folded into `check-compliance.mjs`) — asserts `<Header />`, `<Footer />`, `<Analytics />`, `<SpeedInsights />`, and `lang="it"` all present in `app/layout.tsx`
- [ ] `.husky/pre-commit` — runs `pnpm lint-staged`
- [ ] `lint-staged` config (in `package.json` or `.lintstagedrc.json`) — `eslint --fix` + `prettier --write` on staged `*.{ts,tsx}`; `prettier --write` on staged `*.{md,css,json}`
- [ ] `tsconfig.json` delta — `"strict": true`, `"noUncheckedIndexedAccess": true`, `"verbatimModuleSyntax": true`, `"forceConsistentCasingInFileNames": true`

*Once the above land in Wave 0, flip `wave_0_complete: true` in frontmatter and rerun the Validation Sign-Off checklist below.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 404 page renders correctly at an unknown route in `pnpm dev` | FND-10 | Requires a running server + route navigation; `pnpm build` only asserts it compiles | Run `pnpm dev`, visit `http://localhost:3000/xxx-does-not-exist`, confirm the custom 404 renders with serif H1, "Torna alla home" link, "Contattaci" link, and the global Header+Footer still mount |
| Header sticky behavior on scroll (desktop and mobile) | FND-07 (D-15) | Visual — no automated viewport test infra in Phase 1 | `pnpm dev`, scroll a long dummy page at 1440px wide and 375px wide, confirm header stays fixed to top |
| Footer renders all four columns (Identity / Sections / Contacts / Legal+certifications) on desktop and stacks vertically on mobile | FND-07 (D-16) | Visual | `pnpm dev`, inspect `/` at 1440px and 375px |
| Fonts actually render (IBM Plex Serif for H1, Inter for everything else) | FND-04 (D-07, D-08) | Visual — automated check only asserts imports, not rendering | `pnpm dev`, inspect a dummy page containing H1+H2+body text, confirm H1 is IBM Plex Serif and body is Inter via DevTools computed font |

*Everything else has an automated check.*

---

## Validation Sign-Off

- [ ] All task rows have an automated command or are explicitly listed as Manual-Only
- [ ] Sampling continuity: Wave 0 delivers the full check rail before any Wave 1 task commits
- [ ] Wave 0 covers all ❌ W0 references above
- [ ] No watch-mode flags (`--watch`, `--ui`) in CI commands
- [ ] Feedback latency < 15s for `quick run`
- [ ] `nyquist_compliant: true` set in frontmatter once planner fills in task IDs and the planner review passes

**Approval:** pending (Wave 0 not yet executed)
