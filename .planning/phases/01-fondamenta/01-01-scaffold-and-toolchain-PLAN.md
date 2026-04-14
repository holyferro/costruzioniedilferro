---
phase: 01-fondamenta
plan: 01
type: execute
wave: 0
depends_on: []
files_modified:
  - package.json
  - pnpm-lock.yaml
  - tsconfig.json
  - next.config.ts
  - postcss.config.mjs
  - eslint.config.mjs
  - .prettierrc.json
  - .prettierignore
  - .gitignore
  - .env.local
  - .env.production
  - .husky/pre-commit
  - .lintstagedrc.json
  - scripts/check-compliance.mjs
  - scripts/check-contrast.mjs
  - scripts/check-layout.mjs
  - app/layout.tsx
  - app/page.tsx
  - app/globals.css
  - README.md
autonomous: true
requirements:
  - FND-01
  - FND-02
  - FND-08
must_haves:
  truths:
    - "`pnpm install` completes without errors on a fresh clone"
    - "`pnpm dev` starts Next.js on port 3000 without errors"
    - "`pnpm build` completes with zero TypeScript warnings"
    - "`pnpm lint` passes with the flat ESLint 9 config including compliance rules"
    - "`pnpm typecheck` passes with `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`, `forceConsistentCasingInFileNames` all enabled"
    - "`pnpm check:compliance` exits 0 on a clean scaffold (no forbidden strings anywhere)"
    - "`pnpm check:contrast` exits 0 and prints ALLOWED ≥ 4.5:1 + FORBIDDEN < 4.5:1 table"
    - "`pnpm check:layout` fails loudly when Header/Footer/Analytics/SpeedInsights/lang='it' are missing from `app/layout.tsx` (inverse test: temporarily strip, rerun, confirm exit 1)"
    - "A pre-commit hook running `pnpm exec lint-staged` is installed via husky 9"
  artifacts:
    - path: "package.json"
      provides: "Scaffolded Next 16 project with pnpm scripts (dev/build/start/lint/typecheck/format/check:compliance/check:contrast/check:layout/prepare)"
      contains: "\"typecheck\": \"tsc --noEmit\""
    - path: "tsconfig.json"
      provides: "TypeScript strict config with Phase 1 deltas"
      contains: "\"noUncheckedIndexedAccess\": true"
    - path: "eslint.config.mjs"
      provides: "ESLint 9 flat config with next/core-web-vitals + next/typescript + prettier-last + compliance no-restricted-syntax/imports"
      contains: "no-restricted-syntax"
    - path: "scripts/check-compliance.mjs"
      provides: "Node grep script for GA4/gtag/googletagmanager/fonts.googleapis.com/google.com_maps/recaptcha/iframe"
    - path: "scripts/check-contrast.mjs"
      provides: "WCAG 2.1 contrast assertion for brand palette (ALLOWED ≥ 4.5:1, FORBIDDEN < 4.5:1)"
    - path: "scripts/check-layout.mjs"
      provides: "Grep asserting Header/Footer/Analytics/SpeedInsights/lang=it present in app/layout.tsx"
    - path: ".husky/pre-commit"
      provides: "Git hook running pnpm exec lint-staged"
  key_links:
    - from: "package.json scripts"
      to: "scripts/check-*.mjs"
      via: "node scripts/check-*.mjs invocations"
      pattern: "node scripts/check-(compliance|contrast|layout)\\.mjs"
    - from: "eslint.config.mjs"
      to: "eslint-config-next + eslint-config-prettier/flat"
      via: "defineConfig import chain"
      pattern: "eslint-config-next/(core-web-vitals|typescript)"
    - from: ".husky/pre-commit"
      to: ".lintstagedrc.json"
      via: "pnpm exec lint-staged"
      pattern: "lint-staged"
---

<objective>
Wave 0 — bootstrap the Next.js 16 project and install the full validation rail (ESLint 9 flat config, Prettier, husky 9 pre-commit, lint-staged 16, compliance/contrast/layout scripts, TypeScript delta). At the end of this plan the `pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout && pnpm build` chain is green against a placeholder-but-conformant Next 16 app. No design system yet, no Header/Footer implementation yet — but the ground truth for every future commit is installed and fail-loud.

Purpose: Establish the structural compliance rail BEFORE any implementation lands. Plans 01-02, 01-03, 01-04 will commit against this rail. FND-01 (scaffold + TS strict), FND-02 (contrast script shipping, tokens come in 01-02), FND-08 (compliance script shipping — Analytics mount comes in 01-02) are partially satisfied here.

Output: A Next 16 App Router project that builds and lints clean with zero demo content. A temporary `app/layout.tsx` containing placeholder `{/* Header */}` and `{/* Footer */}` JSX comments stripped — Wave 0 installs `check:layout` EXPECTING failure, and Wave 1 fixes it. However, to keep Wave 0 green on its own, we ship a minimal `app/layout.tsx` with stub `<header>`/`<footer>` elements named `Header`/`Footer` (stub components under `components/layout/`) and `<Analytics />` / `<SpeedInsights />` already mounted + `lang="it"`. This lets Wave 0 close green.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/REQUIREMENTS.md
@.planning/phases/01-fondamenta/01-CONTEXT.md
@.planning/phases/01-fondamenta/01-RESEARCH.md
@.planning/phases/01-fondamenta/01-VALIDATION.md
@CLAUDE.md
</context>

<interfaces>
<!-- This plan scaffolds — no pre-existing interfaces. It DEFINES these contracts for downstream plans: -->

**package.json scripts contract** (Plans 01-02 / 01-03 / 01-04 invoke these):
```
dev, build, start, lint, lint:fix, typecheck, format, format:check,
check:compliance, check:contrast, check:layout, check, prepare
```

**Forbidden strings contract** (enforced by `scripts/check-compliance.mjs`):
```
gtag, _ga, googletagmanager, google-analytics.com,
fonts.googleapis.com, google.com/maps, recaptcha, <iframe
```

**Layout presence contract** (enforced by `scripts/check-layout.mjs` against `app/layout.tsx`):
```
<Header\b
<Footer\b
<Analytics\b
<SpeedInsights\b
lang="it"
```

**Contrast contract** (enforced by `scripts/check-contrast.mjs` — values hardcoded to D-01/02/03):
```
INK=#1A1A1A, PANNA=#F8F5EE, BRAND=#291572, SURFACE=#FFFFFF
ALLOWED: ink/panna, panna/brand, ink/surface, brand/panna — all ≥ 4.5:1
FORBIDDEN: ink/brand, brand/ink — must be < 4.5:1 (proves D-06 clash)
```
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Scaffold Next.js 16 via create-next-app, clean demo assets, pin TypeScript 5.7, add runtime + dev delta dependencies</name>
  <read_first>
    - CLAUDE.md §"Stack" and §"Commands" (confirm pnpm + commands to honor)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §1 "Next.js 16 Scaffold (FND-01)" (files created by create-next-app, files to delete, installation steps A-F)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §Stack "Core", "Forms / Content / Layout (Phase 1)", "Dev Tooling" (exact version pins + NOTEs on TS 5.7 pin, @vercel/analytics v2, ESLint 9 not 10)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §"Installation" code block
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-24 (no animation library — do NOT add framer-motion)
  </read_first>
  <files>
    package.json, pnpm-lock.yaml, .gitignore, app/page.tsx, app/layout.tsx, app/globals.css, app/favicon.ico, next.config.ts, postcss.config.mjs, tsconfig.json, eslint.config.mjs, README.md, public/*
  </files>
  <action>
Step 1 — Scaffold. From project root (`C:\Users\Ale\Documents\CostruzioniEdilferro`), run EXACTLY:

```bash
pnpm create next-app@latest . \
  --ts --tailwind --eslint --app \
  --import-alias "@/*" --use-pnpm --skip-install --yes
```

Notes:
- The `.` arg scaffolds into the CURRENT directory. The existing empty `app/`, `components/`, `public/` folders from the git checkout are compatible — create-next-app will fill them.
- `--skip-install` is used so we can add deltas before one big install at the end.
- If create-next-app refuses because the directory is non-empty, temporarily move `CLAUDE.md`, `README.md`, `.planning/`, `.claude/`, `.git/` aside, scaffold into `.`, then move them back. DO NOT delete any of those files. Alternatively: scaffold into a tmp subdir and copy the generated files back.

Step 2 — DELETE the demo assets create-next-app writes:

```bash
rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
rm -f app/favicon.ico
```

Step 3 — REPLACE demo `README.md` with a one-paragraph project README. Content:

```
# Impresa Edile — sito istituzionale

Next.js 16 App Router + Tailwind v4 + TypeScript strict. Sito web istituzionale per un'impresa edile locale con sede a Mestre.

Comandi:
- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint 9 flat config
- `pnpm typecheck` — TypeScript strict check
- `pnpm check:compliance` — grep guard contro GA4/gtag/Google Maps iframe/reCAPTCHA
- `pnpm check:contrast` — WCAG 2.1 brand palette check
- `pnpm check:layout` — asserzione presenza Header/Footer/Analytics nel root layout

Vedi `.planning/` per roadmap, requirements, e stato del progetto.
```

Step 4 — REPLACE the demo `app/page.tsx` with a minimal Italian placeholder (real homepage is Phase 2):

```tsx
// app/page.tsx
// Placeholder di Phase 1. La homepage reale arriva in Phase 2.
export default function Home() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-ink/60">Fondamenta</p>
      <h1 className="font-serif text-h1 text-ink">Impresa Edile — sito in costruzione</h1>
      <p className="mt-6 max-w-prose text-lg text-ink/80">
        Stiamo lavorando al sito istituzionale. Scaffold completo, design system attivo. La
        homepage reale sarà disponibile nella prossima fase.
      </p>
    </section>
  );
}
```

Step 5 — Install dependencies via pnpm (base deps + deltas, exact versions per RESEARCH §Stack):

```bash
# Base deps from the scaffolded package.json
pnpm install

# Pin TypeScript to 5.7 (RESEARCH NOTE — avoid TS 6.x)
pnpm add -D typescript@^5.7

# Runtime deltas
pnpm add @vercel/analytics@^2 @vercel/speed-insights@^2 clsx tailwind-merge

# Dev tooling deltas (ESLint + eslint-config-next already present from scaffold)
pnpm add -D prettier prettier-plugin-tailwindcss eslint-config-prettier husky lint-staged
```

Do NOT install: `framer-motion`, `motion`, `lucide-react`, `shadcn-ui`, `zod`, `react-hook-form`, `@hookform/resolvers`, `resend`, `@marsidev/react-turnstile`, `schema-dts`, `vitest`, `jest`. These are Phase 2+ or forbidden by brief.

Step 6 — Verify versions landed:

```bash
pnpm why next react tailwindcss @vercel/analytics eslint typescript
```

All resolved versions must match the RESEARCH §Stack table (next 16.x, react 19.x, tailwindcss ^4, @vercel/analytics ^2, eslint ^9, typescript 5.7.x).
  </action>
  <verify>
    <automated>
test -f package.json && \
test -f pnpm-lock.yaml && \
test -f app/layout.tsx && \
test -f app/page.tsx && \
test -f app/globals.css && \
test -f tsconfig.json && \
test -f eslint.config.mjs && \
test -f postcss.config.mjs && \
test -f next.config.ts && \
! test -f public/next.svg && \
! test -f public/vercel.svg && \
! test -f app/favicon.ico && \
grep -q '"next":' package.json && \
grep -q '"typescript": "\^5.7' package.json && \
grep -q '"@vercel/analytics": "\^2' package.json && \
grep -q '"@vercel/speed-insights": "\^2' package.json && \
grep -q '"clsx":' package.json && \
grep -q '"tailwind-merge":' package.json && \
grep -q '"prettier":' package.json && \
grep -q '"prettier-plugin-tailwindcss":' package.json && \
grep -q '"eslint-config-prettier":' package.json && \
grep -q '"husky":' package.json && \
grep -q '"lint-staged":' package.json && \
! grep -q '"framer-motion"' package.json && \
! grep -q '"lucide-react"' package.json && \
! grep -q '"zod"' package.json && \
! grep -q '"react-hook-form"' package.json && \
pnpm why next | grep -qE 'next 16\.' && \
pnpm why react | grep -qE 'react 19\.'
    </automated>
  </verify>
  <done>
Next 16 project scaffolded into the current directory. All demo SVGs and favicon deleted. `package.json` contains the delta dependencies with pinned versions matching RESEARCH §Stack. `pnpm why next react` resolves Next 16.x and React 19.x. No forbidden deps (framer-motion, lucide-react, zod, rhf, etc.) present.
  </done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Write tsconfig deltas, next.config.ts, eslint.config.mjs with compliance rules, Prettier config, husky pre-commit, lint-staged, package.json scripts, .env files</name>
  <behavior>
- tsconfig.json compiles with `strict: true`, `noUncheckedIndexedAccess: true`, `verbatimModuleSyntax: true`, `forceConsistentCasingInFileNames: true` — a test file using `array[0]` without a guard MUST be caught by tsc as `T | undefined`.
- eslint.config.mjs MUST flag `gtag(...)`, string literals containing `googletagmanager.com`, `google-analytics.com`, `fonts.googleapis.com` as errors.
- eslint.config.mjs MUST flag imports of `react-ga`, `react-ga4`, `@next/third-parties/google` as errors.
- `pnpm lint` MUST exit 0 on a clean scaffold (no violations).
- `.husky/pre-commit` runs `pnpm exec lint-staged` on commit.
- `package.json` scripts: dev/build/start/lint/lint:fix/typecheck/format/format:check/check:compliance/check:contrast/check:layout/check/prepare all defined.
  </behavior>
  <read_first>
    - .planning/phases/01-fondamenta/01-RESEARCH.md §1.1 "tsconfig.json — exact canonical content" AND §1.1 "Delta edits" (the three delta flags with rationale)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §1.2 "next.config.ts — minimum shape" AND "Phase 1 recommended next.config.ts" (typedRoutes, no images block, no eslint block)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §5 "ESLint 9 flat config + Prettier + package.json scripts" (canonical flat config + Phase 1 delta with no-restricted-syntax + no-restricted-imports + prettier last + globalIgnores)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §5 ".prettierrc.json", ".prettierignore", "package.json scripts" full content
    - .planning/phases/01-fondamenta/01-RESEARCH.md §6 "Husky 9 + lint-staged 16" (husky init, .husky/pre-commit rewrite, .lintstagedrc.json content)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §4 "Env var pattern" for .env.local / .env.production shape
    - tsconfig.json (current state after scaffold — to know what keys to add)
    - eslint.config.mjs (current state after scaffold — the canonical flat config to extend)
    - package.json (current state after scaffold — to know which scripts already exist)
    - next.config.ts (current state after scaffold — empty shell to replace)
  </read_first>
  <files>
    tsconfig.json, next.config.ts, eslint.config.mjs, .prettierrc.json, .prettierignore, .husky/pre-commit, .lintstagedrc.json, package.json, .env.local, .env.production, .gitignore
  </files>
  <action>
Step 1 — Edit `tsconfig.json`. Start from whatever create-next-app wrote (which matches RESEARCH §1.1 canonical). Add these three keys to `compilerOptions`:

```json
"noUncheckedIndexedAccess": true,
"verbatimModuleSyntax": true,
"forceConsistentCasingInFileNames": true
```

Do NOT remove `allowJs: true`. Do NOT add `exactOptionalPropertyTypes`. Keep `paths: { "@/*": ["./*"] }`.

Step 2 — Replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Typed routes — catches dead links at build time.
  typedRoutes: true,

  // No remote image patterns in Phase 1. Phase 4 may revisit.

  // No `eslint` block — `next lint` is removed in Next 16.
};

export default nextConfig;
```

Do NOT add `headers()` (security headers deferred to Phase 7 per RESEARCH §Security).

Step 3 — Replace `eslint.config.mjs` with the Phase 1 shape from RESEARCH §5 (copy verbatim):

```js
// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ---------- Compliance guard rails ----------
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Identifier[name='gtag']",
          message:
            "Google Analytics (gtag) is forbidden — see PROJECT.md compliance lock-in and D-21. Use @vercel/analytics.",
        },
        {
          selector: "Literal[value=/googletagmanager\\.com/]",
          message: "Google Tag Manager is forbidden — see PROJECT.md D-21.",
        },
        {
          selector: "Literal[value=/google-analytics\\.com/]",
          message: "google-analytics.com is forbidden — see PROJECT.md D-21.",
        },
        {
          selector: "Literal[value=/fonts\\.googleapis\\.com/]",
          message:
            "Runtime Google Fonts is forbidden — use next/font/google (self-hosted). See D-22.",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "react-ga", message: "GA4 is forbidden per D-21." },
            { name: "react-ga4", message: "GA4 is forbidden per D-21." },
          ],
          patterns: [
            {
              group: ["@next/third-parties/google"],
              message:
                "Google third-party embeds (Analytics, Maps, reCAPTCHA) are forbidden in this project. See PROJECT.md D-21 and the 'Out of Scope' section of REQUIREMENTS.md.",
            },
          ],
        },
      ],
    },
  },

  // prettier LAST
  prettier,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
```

Step 4 — Create `.prettierrc.json`:

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Step 5 — Create `.prettierignore`:

```
.next
node_modules
public
out
build
pnpm-lock.yaml
```

Step 6 — Update `package.json` scripts. Merge these into the existing `scripts` block (keep `dev`/`build`/`start` that create-next-app wrote, replace `lint` if it points to `next lint`):

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "check:compliance": "node scripts/check-compliance.mjs",
    "check:contrast": "node scripts/check-contrast.mjs",
    "check:layout": "node scripts/check-layout.mjs",
    "check": "pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout",
    "prepare": "husky"
  }
}
```

Also add the lint-staged config inline in `package.json` (alternative to a separate file; we use the separate file form — see Step 8):

Step 7 — Initialize husky:

```bash
pnpm exec husky init
```

This writes `.husky/pre-commit` with a default command and adds `"prepare": "husky"` to package.json (already present from Step 6). REPLACE the contents of `.husky/pre-commit` with:

```sh
#!/usr/bin/env sh
pnpm exec lint-staged
```

Make sure the file has a newline at EOF. Do NOT add the old `. "$(dirname -- "$0")/_/husky.sh"` preamble (husky 9 dropped it).

Step 8 — Create `.lintstagedrc.json`:

```json
{
  "*.{ts,tsx,mjs,cjs,js,jsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{md,mdx,css,json,yml,yaml}": [
    "prettier --write"
  ]
}
```

Step 9 — Create `.env.local` (add to `.gitignore` if not already — `.gitignore` from create-next-app already excludes `.env*.local`):

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Create `.env.production` (committed — safe placeholders only):

```
NEXT_PUBLIC_SITE_URL=https://edilferro.it
```

Both files live at project root. Do NOT put secrets in either — Resend API keys and Turnstile secret are Phase 6 and go into Vercel env vars, NEVER into committed `.env*` files.

Step 10 — Sanity: run `pnpm lint` on the scaffold. It MUST pass (the scaffold has no forbidden strings, so no-restricted-syntax and no-restricted-imports do nothing). If it fails, read the error and fix. Do NOT disable the rules.
  </action>
  <verify>
    <automated>
test -f tsconfig.json && \
grep -q '"noUncheckedIndexedAccess": true' tsconfig.json && \
grep -q '"verbatimModuleSyntax": true' tsconfig.json && \
grep -q '"forceConsistentCasingInFileNames": true' tsconfig.json && \
test -f next.config.ts && \
grep -q 'typedRoutes: true' next.config.ts && \
test -f eslint.config.mjs && \
grep -q 'no-restricted-syntax' eslint.config.mjs && \
grep -q 'no-restricted-imports' eslint.config.mjs && \
grep -q 'eslint-config-prettier/flat' eslint.config.mjs && \
grep -q 'globalIgnores' eslint.config.mjs && \
test -f .prettierrc.json && \
grep -q 'prettier-plugin-tailwindcss' .prettierrc.json && \
test -f .prettierignore && \
test -f .husky/pre-commit && \
grep -q 'lint-staged' .husky/pre-commit && \
test -f .lintstagedrc.json && \
grep -q '"eslint --fix"' .lintstagedrc.json && \
test -f .env.local && \
grep -q 'NEXT_PUBLIC_SITE_URL' .env.local && \
test -f .env.production && \
grep -q '"typecheck": "tsc --noEmit"' package.json && \
grep -q '"check:compliance":' package.json && \
grep -q '"check:contrast":' package.json && \
grep -q '"check:layout":' package.json && \
grep -q '"prepare": "husky"' package.json && \
pnpm lint && \
pnpm typecheck
    </automated>
  </verify>
  <done>
All toolchain config files exist with the exact content described. `pnpm lint` exits 0 on the scaffold. `pnpm typecheck` exits 0 on the scaffold. tsconfig has the three delta flags. eslint.config.mjs has compliance rules. husky pre-commit is wired to lint-staged.
  </done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Write scripts/check-compliance.mjs, scripts/check-contrast.mjs, scripts/check-layout.mjs AND a temporary stub layout that makes all three scripts pass</name>
  <behavior>
- `pnpm check:compliance` exits 0 on a clean codebase; exits 1 with explicit output if ANY file under `app/`, `components/`, `content/`, `lib/`, `scripts/` contains `gtag`, `_ga`, `googletagmanager`, `google-analytics.com`, `fonts.googleapis.com`, `google.com/maps`, `recaptcha`, or `<iframe`.
- `pnpm check:contrast` exits 0 and prints the expected ALLOWED (≥4.5:1 AAA) + FORBIDDEN (<4.5:1) table. If either an ALLOWED pair drops below 4.5 OR a FORBIDDEN pair climbs above 4.5, exits 1.
- `pnpm check:layout` exits 0 when `app/layout.tsx` contains `<Header`, `<Footer`, `<Analytics`, `<SpeedInsights`, and `lang="it"`. Exits 1 with explicit output listing missing elements if any are absent.
- Inverse test: temporarily remove `<Header />` from `app/layout.tsx`, rerun `pnpm check:layout`, confirm exit 1 + error message names "Header". Restore file.
  </behavior>
  <read_first>
    - .planning/phases/01-fondamenta/01-RESEARCH.md §9 "Structural compliance enforcement" — especially the FULL scripts/check-compliance.mjs source block (copy verbatim)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §11.2 "WCAG contrast verification script — scripts/check-contrast.mjs" (FULL source block + expected output table)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §11.3 "Header + Footer presence check" (the grep snippet — fold into a Node script)
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-01 through §D-06 (palette values and D-06 fill-only rule that check-contrast enforces structurally)
    - .planning/phases/01-fondamenta/01-VALIDATION.md §"Wave 0 Requirements" (checklist of files to land)
    - app/layout.tsx (current state after scaffold — to know what to stub)
  </read_first>
  <files>
    scripts/check-compliance.mjs, scripts/check-contrast.mjs, scripts/check-layout.mjs, app/layout.tsx, components/layout/Header.tsx, components/layout/Footer.tsx, components/ui/.gitkeep, components/sections/.gitkeep, components/business/.gitkeep
  </files>
  <action>
Step 1 — Create `scripts/check-compliance.mjs` with EXACTLY this content (copied from RESEARCH §9):

```js
// scripts/check-compliance.mjs
// Fails with exit code 1 if any forbidden pattern is found in tracked source.
// Run: `pnpm check:compliance`

import { execSync } from "node:child_process";
import process from "node:process";

const FORBIDDEN = [
  { pattern: "gtag", reason: "Google Analytics (gtag) is forbidden — see D-21." },
  { pattern: "_ga", reason: "Google Analytics (_ga cookie / global) is forbidden — see D-21." },
  { pattern: "googletagmanager", reason: "Google Tag Manager is forbidden — see D-21." },
  { pattern: "google-analytics.com", reason: "google-analytics.com reference forbidden — see D-21." },
  {
    pattern: "fonts.googleapis.com",
    reason: "Runtime Google Fonts forbidden — use next/font/google self-hosted. See D-22.",
  },
  {
    pattern: "google.com/maps",
    reason:
      "Google Maps iframe embed is forbidden — use a static AVIF screenshot + link. See REQUIREMENTS.md Out of Scope + Phase 6 CON-09.",
  },
  {
    pattern: "recaptcha",
    reason:
      "Google reCAPTCHA is forbidden — use Cloudflare Turnstile. See REQUIREMENTS.md Out of Scope.",
  },
  {
    pattern: "<iframe",
    reason:
      "Third-party iframes are generally forbidden (privacy + cookie banner risk). Remove or add an explicit exemption to scripts/check-compliance.mjs.",
  },
];

const SCAN_DIRS = ["app", "components", "content", "lib", "scripts"];
const INCLUDE_EXTS = /\.(ts|tsx|js|jsx|mjs|cjs|md|mdx|json|css|html)$/i;

// Files to skip even inside SCAN_DIRS (self-reference safety).
// scripts/check-compliance.mjs contains the forbidden patterns as data — it must not
// flag itself.
const EXEMPT_FILES = new Set([
  "scripts/check-compliance.mjs",
]);

function listTrackedFiles() {
  try {
    const out = execSync("git ls-files", { encoding: "utf8" });
    return out.split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

async function main() {
  const files = listTrackedFiles().filter(
    (f) =>
      SCAN_DIRS.some((d) => f.startsWith(`${d}/`) || f === d) &&
      INCLUDE_EXTS.test(f) &&
      !EXEMPT_FILES.has(f),
  );

  const fs = await import("node:fs");
  const violations = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    for (const rule of FORBIDDEN) {
      if (content.includes(rule.pattern)) {
        violations.push({ file, rule });
      }
    }
  }

  if (violations.length > 0) {
    console.error("\nCompliance check FAILED:\n");
    for (const v of violations) {
      console.error(`  ${v.file}`);
      console.error(`    matched "${v.rule.pattern}" — ${v.rule.reason}`);
    }
    console.error(
      `\n${violations.length} violation(s). Fix or add an exemption in scripts/check-compliance.mjs.\n`,
    );
    process.exit(1);
  }

  console.log(`Compliance check passed (${files.length} files scanned).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
```

Note: I added an `EXEMPT_FILES` set containing `scripts/check-compliance.mjs` itself (because this script contains the forbidden patterns as DATA and would otherwise flag itself). The research didn't include this exemption but it is necessary.

Step 2 — Create `scripts/check-contrast.mjs` with EXACTLY the source from RESEARCH §11.2 (palette INK=#1A1A1A, PANNA=#F8F5EE, BRAND=#291572, SURFACE=#FFFFFF, ALLOWED pairs and FORBIDDEN pairs). Copy the full source verbatim from RESEARCH §11.2. The script MUST:
- Use the WCAG 2.1 luminance formula
- Assert each ALLOWED pair has contrast ≥ 4.5
- Assert each FORBIDDEN pair has contrast < 4.5 (proves D-06)
- Print a summary table
- Exit 1 on any failure, 0 on success

Step 3 — Create `scripts/check-layout.mjs`:

```js
// scripts/check-layout.mjs
// Asserts that app/layout.tsx mounts the required global elements.
// Run: `pnpm check:layout`

import fs from "node:fs";
import process from "node:process";

const LAYOUT = "app/layout.tsx";

if (!fs.existsSync(LAYOUT)) {
  console.error(`check:layout FAILED — ${LAYOUT} does not exist`);
  process.exit(1);
}

const source = fs.readFileSync(LAYOUT, "utf8");

const REQUIRED = [
  { pattern: /<Header\b/, name: "<Header />" },
  { pattern: /<Footer\b/, name: "<Footer />" },
  { pattern: /<Analytics\b/, name: "<Analytics />" },
  { pattern: /<SpeedInsights\b/, name: "<SpeedInsights />" },
  { pattern: /lang="it"/, name: 'lang="it" attribute on <html>' },
];

const missing = REQUIRED.filter((req) => !req.pattern.test(source));

if (missing.length > 0) {
  console.error(`check:layout FAILED — ${LAYOUT} is missing:`);
  for (const m of missing) {
    console.error(`  - ${m.name}`);
  }
  console.error(
    "\nThese elements are required on every route per FND-07 / FND-08. See 01-CONTEXT.md D-13..D-17, D-21.",
  );
  process.exit(1);
}

console.log(`check:layout passed — ${REQUIRED.length} required elements present in ${LAYOUT}.`);
```

Step 4 — Create STUB `components/layout/Header.tsx` (Plan 01-02 replaces with the real Header):

```tsx
// components/layout/Header.tsx
// WAVE 0 STUB — real Header with nav, CTA, and content module wiring lands in Plan 01-02.
// This stub exists only so `pnpm check:layout` passes at Wave 0 close.
export function Header() {
  return <header className="border-b border-border" aria-label="Intestazione — stub Wave 0" />;
}
```

Step 5 — Create STUB `components/layout/Footer.tsx`:

```tsx
// components/layout/Footer.tsx
// WAVE 0 STUB — real Footer with 4 columns, legal data, content modules lands in Plan 01-02.
export function Footer() {
  return <footer className="border-t border-border" aria-label="Footer — stub Wave 0" />;
}
```

Step 6 — REPLACE `app/layout.tsx` with a Wave 0 shape that check:layout passes. This is NOT the final layout — Plan 01-02 replaces it with the full version (fonts, metadata import, real Header/Footer). Wave 0 shape:

```tsx
// app/layout.tsx
// WAVE 0 — minimal layout so check:layout passes. Plan 01-02 replaces this with
// the full version (next/font, defaultMetadata import, real Header/Footer content).
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

Step 7 — Create `.gitkeep` files so the directory scaffold lands in git. FND-03 requires all four component directories exist even if empty. For Wave 0, `components/layout/` already has Header+Footer stubs, so no `.gitkeep` needed there. For the others:

```
components/ui/.gitkeep        (empty file)
components/sections/.gitkeep  (empty file)
components/business/.gitkeep  (empty file)
```

(Plan 01-02 will NOT replace these — they simply remain as directory markers.)

Step 8 — Run the full check chain. All three MUST pass:

```bash
pnpm check:compliance
pnpm check:contrast
pnpm check:layout
```

Step 9 — INVERSE TEST for check:layout (to prove it fails loud):

```bash
# Temporarily strip Header from app/layout.tsx
cp app/layout.tsx /tmp/layout-backup.tsx
sed -i 's|<Header />||' app/layout.tsx
pnpm check:layout; EXIT=$?
cp /tmp/layout-backup.tsx app/layout.tsx
test $EXIT -eq 1 || { echo "inverse test FAILED — check:layout should have exited 1"; exit 1; }
echo "inverse test OK — check:layout exits 1 when <Header /> is missing"
```

(On Windows bash the sed/cp flow may need adjustment — if so, do the equivalent edit/restore manually and confirm `pnpm check:layout` exits 1 when Header is absent.)
  </action>
  <verify>
    <automated>
test -f scripts/check-compliance.mjs && \
test -f scripts/check-contrast.mjs && \
test -f scripts/check-layout.mjs && \
test -f components/layout/Header.tsx && \
test -f components/layout/Footer.tsx && \
test -f components/ui/.gitkeep && \
test -f components/sections/.gitkeep && \
test -f components/business/.gitkeep && \
test -f app/layout.tsx && \
grep -q 'lang="it"' app/layout.tsx && \
grep -q '<Header' app/layout.tsx && \
grep -q '<Footer' app/layout.tsx && \
grep -q '<Analytics' app/layout.tsx && \
grep -q '<SpeedInsights' app/layout.tsx && \
pnpm check:compliance && \
pnpm check:contrast && \
pnpm check:layout
    </automated>
  </verify>
  <done>
All three scripts exist and pass on the Wave 0 shape. `app/layout.tsx` contains Header, Footer, Analytics, SpeedInsights, and lang="it". The four component directories all exist in git (layout via real files, the other three via .gitkeep). The inverse test proved check:layout exits 1 when Header is removed.
  </done>
</task>

<task type="auto">
  <name>Task 4: Green-light the full Wave 0 rail — pnpm check + pnpm build must both pass on the scaffold</name>
  <read_first>
    - .planning/phases/01-fondamenta/01-VALIDATION.md §"Test Infrastructure" (quick run + full suite commands)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §"Common Pitfalls" (Pitfall 1 @theme inline, Pitfall 4 metadataBase, Pitfall 5 error.tsx use client, Pitfall 6 lang en→it, Pitfall 7 noUncheckedIndexedAccess)
    - app/globals.css (current state — scaffold default that we will REPLACE in Plan 01-02; this task leaves it as-is)
    - app/layout.tsx (Wave 0 shape written in Task 3)
  </read_first>
  <files>
    (verification only — no new files except potentially app/globals.css minimal edit if the scaffold default references Geist fonts that are no longer loaded)
  </files>
  <action>
Step 1 — Sanity: ensure `app/globals.css` still compiles. The create-next-app scaffold writes:

```css
@import "tailwindcss";

:root { --background: #ffffff; --foreground: #171717; }

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

Since Wave 0 does NOT yet wire `next/font`, the `--font-geist-sans` and `--font-geist-mono` variables are undefined at runtime → they'd fall back to the browser default. That's fine for Wave 0 — the layout renders with system fonts. Plan 01-02 replaces this file wholesale.

The only thing that could break Wave 0 is if `app/page.tsx` uses classes that don't resolve. The Task 1 page uses `font-serif` and `text-h1` which are NOT defined in the Wave 0 globals.css. FIX: for Wave 0, temporarily use default Tailwind classes in `app/page.tsx`:

```tsx
// app/page.tsx — Wave 0 version (Plan 01-02 brings back font-serif + text-h1 once tokens land)
export default function Home() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">Fondamenta</p>
      <h1 className="text-4xl font-semibold">Impresa Edile — sito in costruzione</h1>
      <p className="mt-6 max-w-prose text-lg text-neutral-700">
        Stiamo lavorando al sito istituzionale. Scaffold completo, design system in arrivo.
      </p>
    </section>
  );
}
```

Step 2 — Run the FULL Wave 0 check rail:

```bash
pnpm lint
pnpm typecheck
pnpm check:compliance
pnpm check:contrast
pnpm check:layout
pnpm build
```

All MUST pass. If any fail:
- Lint failure → read the error, fix. Do NOT disable rules.
- Typecheck failure → most likely `noUncheckedIndexedAccess` biting a content accessor; there shouldn't be any in Wave 0 since content modules don't exist yet. If you hit one, it's a real bug.
- check:compliance failure → you accidentally committed a forbidden string. Search and remove.
- check:contrast failure → the palette values drifted. Re-verify against D-01/02/03.
- check:layout failure → an element was stripped. Restore.
- Build failure → likely a TS error or missing module. Fix.

Step 3 — Run `pnpm build` a SECOND time and confirm it's still green (caching sanity). Also run `pnpm dev` briefly — Next should start on :3000 without errors. Kill with Ctrl+C after confirmation.

Step 4 — Git commit: this is the end of Wave 0. Commit message:

```
feat(01-01): scaffold Next 16 + toolchain + compliance rail

- pnpm create next-app with TS strict + Tailwind v4 + ESLint 9 flat config
- Pin TypeScript 5.7, install @vercel/analytics v2, clsx, tailwind-merge
- tsconfig deltas: noUncheckedIndexedAccess, verbatimModuleSyntax, forceConsistentCasingInFileNames
- ESLint compliance rules (no GA4/gtag/googletagmanager/fonts.googleapis.com/@next/third-parties/google)
- Prettier + husky 9 + lint-staged 16 pre-commit wired
- scripts/check-compliance.mjs, check-contrast.mjs, check-layout.mjs
- Stub Header/Footer + Wave 0 app/layout.tsx mounting Analytics+SpeedInsights
- components/{ui,sections,business}/.gitkeep
- pnpm lint && typecheck && check:compliance && check:contrast && check:layout && build all green

Requirements: FND-01 (scaffold + TS strict), FND-02 (contrast script), FND-08 (compliance script + Analytics mounted — tokens come in 01-02)
```

(Commit only if user explicitly runs a commit step — executors typically let the `/gsd-execute-phase` workflow do that.)
  </action>
  <verify>
    <automated>
pnpm lint && \
pnpm typecheck && \
pnpm check:compliance && \
pnpm check:contrast && \
pnpm check:layout && \
pnpm build
    </automated>
  </verify>
  <done>
The full Wave 0 rail — `pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout && pnpm build` — exits 0. The scaffold is deployable to Vercel as-is (unstyled but conformant). Wave 1 (Plan 01-02) can commit against this rail.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| npm registry → local dev | Packages pulled during `pnpm install` could contain malicious code |
| Git working tree → `pnpm lint` / `pnpm check:*` | Author could add forbidden patterns bypassing review |
| Developer laptop → Vercel deploy | Compromised lockfile could ship into production |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-01-01 | Tampering | `pnpm-lock.yaml` supply chain | mitigate | Commit `pnpm-lock.yaml`; rely on pnpm strict dep graph; run `pnpm audit` at phase gates (Phase 7 adds CI audit) |
| T-01-01-02 | Information Disclosure | `.env*` files | mitigate | `.gitignore` excludes `.env*.local`; `.env.production` contains ONLY `NEXT_PUBLIC_SITE_URL` (public by nature); secrets forbidden anywhere in committed files; Phase 1 has no secrets at all |
| T-01-01-03 | Tampering | Compliance bypass via string concat | accept | ESLint catches literals; check-compliance.mjs catches substrings; dynamic concat (`const u = "google" + "tagmanager" + ".com"`) is theoretically possible but no developer would write that. Cost of perfect defense exceeds value |
| T-01-01-04 | Elevation of Privilege | husky pre-commit script | mitigate | `.husky/pre-commit` is a versioned plain-text file; any modification shows in PR diff; contains only `pnpm exec lint-staged` (no curl, no eval) |
| T-01-01-05 | Tampering | `scripts/check-*.mjs` self-bypass | mitigate | Scripts are versioned plain-text; `scripts/` is itself scanned by check-compliance.mjs (minus the self-reference exemption); modifications show in PR diff |
</threat_model>

<verification>
Overall plan verification (all commands run from project root):

```bash
# Wave 0 quick rail (< 15s)
pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout

# Full Wave 0 gate (includes build)
pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout && pnpm build

# Confirm the toolchain sanity
test -f package.json && \
test -f tsconfig.json && grep -q '"noUncheckedIndexedAccess": true' tsconfig.json && \
test -f eslint.config.mjs && grep -q 'no-restricted-syntax' eslint.config.mjs && \
test -f .husky/pre-commit && grep -q 'lint-staged' .husky/pre-commit && \
test -f scripts/check-compliance.mjs && \
test -f scripts/check-contrast.mjs && \
test -f scripts/check-layout.mjs && \
test -d components/ui && \
test -d components/sections && \
test -d components/business && \
test -d components/layout && \
echo "Wave 0 verification OK"
```

Manual check (human, one-off after commit):
- `pnpm dev` starts on :3000 and the placeholder page renders.
- `http://localhost:3000/xxx-not-real` renders Next's default not-found (Plan 01-03 replaces with custom).
</verification>

<success_criteria>
- Wave 0 rail green: `pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout && pnpm build` exits 0
- TypeScript strict flags active: `noUncheckedIndexedAccess`, `verbatimModuleSyntax`, `forceConsistentCasingInFileNames`
- ESLint 9 flat config with compliance rules in place; `next lint` NOT present in `package.json`
- Prettier + husky 9 + lint-staged 16 wired; `.husky/pre-commit` runs `pnpm exec lint-staged`
- `scripts/check-compliance.mjs`, `scripts/check-contrast.mjs`, `scripts/check-layout.mjs` all committed and green
- Four `components/{ui,sections,business,layout}` directories exist in git (via `.gitkeep` or real stub files)
- `app/layout.tsx` is a Wave 0 shape with `lang="it"`, `<Header />`, `<Footer />`, `<Analytics />`, `<SpeedInsights />` — fonts and metadata come in Plan 01-02/01-03
- No forbidden deps: framer-motion, lucide-react, zod, react-hook-form, @hookform/resolvers, resend, @marsidev/react-turnstile, schema-dts, vitest, jest
- `pnpm build` completes with zero TypeScript warnings (ROADMAP success criterion 1, partial)
</success_criteria>

<output>
After completion, create `.planning/phases/01-fondamenta/01-01-SUMMARY.md` recording:
- Wave 0 closed: toolchain + compliance rail installed
- Exact package versions captured from `pnpm why`
- Any deviations from RESEARCH §Stack (there shouldn't be any)
- Handoff note for Plan 01-02: Wave 0 layout is a STUB; Plan 01-02 replaces `app/layout.tsx`, `app/globals.css`, `components/layout/Header.tsx`, `components/layout/Footer.tsx` with the real versions while keeping all Wave 0 checks green
</output>
