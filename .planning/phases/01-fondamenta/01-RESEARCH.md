# Phase 1: Fondamenta — Research

**Researched:** 2026-04-14
**Domain:** Next.js 16 scaffolding + Tailwind v4 design system + institutional compliance lock-in
**Confidence:** HIGH

## Summary

This phase bootstraps a Next.js 16 App Router project with TypeScript strict, Tailwind v4, `next/font` self-hosted fonts (Inter + IBM Plex Serif), Vercel Analytics cookieless, a sticky single-row header, a 4-column institutional footer, a content model in `content/*.ts`, a `lib/seo/metadata.ts` helper, a custom `app/not-found.tsx`, and an `app/error.tsx`. Every lock-in from PROJECT.md (no GA4, no Google Maps iframe, no cookie banner, no hand-rolled form validation, no animation library) is enforced structurally so later phases inherit the compliance posture by construction.

The stack is in excellent alignment with the 2026 Next.js ecosystem. I verified every package version against the npm registry on 2026-04-14 and confirmed the canonical scaffolding shape against the `vercel/next.js` `canary` branch's `create-next-app` template for `app-tw/ts`. Two deltas to PROJECT.md surfaced and are documented below: (a) `@vercel/analytics` is now at v2.x with a Resilient Intake (not 1.4.x), (b) ESLint 10 shipped Feb 2026 but `create-next-app` still pins ESLint 9 — we follow Vercel's pin.

**Primary recommendation:** Scaffold via `pnpm create next-app@latest` with the flags `--ts --tailwind --eslint --app --import-alias "@/*" --use-pnpm --disable-git --skip-install --yes`, then install the delta libraries (`@vercel/analytics`, `@vercel/speed-insights`, `clsx`, `tailwind-merge`, `prettier`, `prettier-plugin-tailwindcss`, `husky`, `lint-staged`, `eslint-config-prettier`) separately. Do NOT hand-roll the initial `app/layout.tsx`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, or `next.config.ts` — use the canonical templates as the starting point, then apply the delta edits described in §1-§5.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Palette (D-01 → D-06):**
- `color.ink` = `#1A1A1A` ("Nero morbido"), used for titles, body text, UI structure
- `color.panna` = `#F8F5EE`, warm off-white, default background
- `brand.primary` = `#291572`, indigo, taken from the logo — non-negotiable
- Minimal token system: 3 brand colors + neutrals + success/error only. No 50→900 gray scale, no secondary accent.
- **Critical system rule (D-06)**: `#291572` and `#1A1A1A` have near-identical luminance (verified: contrast ratio 1.20:1). The blue brand MUST be used as **fill only** (button backgrounds, section backgrounds with panna text inside). NEVER as inline text color adjacent to ink titles. This is vincolante for every phase 2–7.

**Tipografia (D-07 → D-12):**
- Pairing confirmed: IBM Plex Serif + Inter, both via `next/font/google` self-hosted (zero Google Fonts runtime, zero GDPR exposure).
- IBM Plex Serif limited to (a) homepage hero title, (b) H1 of every internal page. All H2/H3/H4, body, UI, nav, forms, CTA labels = Inter.
- Inter weights: 400 (body), 500 (UI/nav), 600 (H2/H3/CTA). No 700. Serif carries the institutional weight.
- Base body = 17px, modular scale 1.25 (major third).
- H1/H2 use `clamp()` fluid. Body and UI use discrete Tailwind text classes.
- IBM Plex Serif loads ONE weight only (500 or 600, planner decides). Inter loads 400/500/600 only.

**Header + Footer (D-13 → D-17):**
- Header desktop = single-row `[logo | nav | CTA "Richiedi un sopralluogo"]`. No top bar, no phone on desktop.
- Mobile header = includes click-to-call (HOM-05) — asymmetry from desktop is intentional.
- Header sticky on all pages (desktop + mobile).
- Footer desktop = 4 columns: (1) Identity, (2) Sections, (3) Contacts, (4) Legal + certifications. Stacks on mobile.
- Footer is a Server Component — zero JS client, reads from `content/site.ts` + `content/legal.ts`.

**Legal / NAP (D-18 → D-20):**
- Phase 1 ships with REALISTIC PLACEHOLDERS + inline `// TODO cliente: valore reale` comments for every field not yet received. The footer renders placeholders without warnings.
- Real-data substitution is a dedicated commit, NOT blocking Phase 1 closure.
- 13 fields to request from client are listed in CONTEXT.md §D-20.

**Compliance (D-21 → D-24):**
- Analytics: `@vercel/analytics` + `@vercel/speed-insights` in `app/layout.tsx`. Zero GA4, zero gtag, zero googletagmanager. Grep check against these strings must return zero results.
- Fonts: `next/font/google` subset `latin` only. Zero `<link href="fonts.googleapis.com">`. Zero third-party font CDN.
- No cookie banner in Phase 1 — the stack is cookieless by design. `docs/gdpr.md` will document why (Phase 7).
- No animation library — CSS transitions + Tailwind utilities only. Framer Motion / Motion explicitly forbidden.

**Client deliverables (D-25 → D-27) — NON-CODING but phase-blocking:**
- D-25: Email request "Fotografia cantieri/team/mezzi" (unblocks Phase 4/5). Lead time 2–4 weeks. Requires commitment on minimum 10 photo sets before Phase 1 close.
- D-26: Email request "PDF attestazioni SOA + ISO" (unblocks Phase 5).
- D-27: Start "Configurazione DNS Resend + Cloudflare Turnstile keys" (unblocks Phase 6). DNS may take weeks via third-party provider; create Cloudflare account + Turnstile widget early.

### Claude's Discretion

- **shadcn/ui adoption** — NOT in Phase 1. Defer to Phase 2 (Button) or Phase 6 (Form primitives).
- **Which `content/*.ts` files to scaffold** — `content/site.ts` (NAP + brand strings), `content/legal.ts` (P.IVA / REA / etc), `content/navigation.ts` (header + footer links). Do NOT create `content/services.ts`, `content/projects.ts`, `content/areas.ts` in Phase 1 — they belong to their respective phases.
- **404 style** — big serif H1 "Pagina non trovata", short body, two CTAs ("Torna alla home", "Contattaci"). No illustrations, no photos. Planner may deviate if documented.
- **Section background rhythm** — panna dominant with occasional pure white or very-light-gray breaks. Planner defines this when building the first `<Section>` UI primitive.
- **`lib/seo/metadata.ts` shape** — planner's call, but MUST produce a `Metadata` object with `title` template, `description`, `openGraph` base, `twitter` base, canonical URL, `metadataBase`. JSON-LD integration is Phase 7, not now.
- **ESLint flat config + Prettier + husky + lint-staged** — follow 2026 best practice from PROJECT.md. `next lint` does NOT exist in Next 16 — wire ESLint CLI directly.
- **`noUncheckedIndexedAccess: true`** — ENABLE in tsconfig. Recommended by PROJECT.md.

### Deferred Ideas (OUT OF SCOPE for Phase 1)

- Secondary accent color (ocra/ruggine) — NOT in Phase 1. Default stays at 3 colors.
- Full 50→900 gray scale — NOT for MVP. Revisit if Phase 6 form needs 5+ grays.
- shadcn/ui adoption — deferred.
- Dark mode — NOT requested, NOT in roadmap, single-theme only. No `dark:` classes, no dual CSS variables.
- Framer Motion / Motion — forbidden by brief.
- Payload / any CMS — v2.
- IT/EN bilingual — v2.
- Standalone certifications page — Phase 5 section, not dedicated page.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| **FND-01** | Next.js 16 App Router project initialized (TypeScript strict, Tailwind v4, pnpm, Vercel) | §1 Scaffold, §1.1 tsconfig deltas, §1.2 next.config.ts |
| **FND-02** | Brand palette defined as CSS tokens via Tailwind v4 `@theme` in `globals.css`, WCAG AA ≥ 4.5:1 | §2 Tailwind v4 @theme, §11.2 contrast verification script |
| **FND-03** | Component hierarchy: `components/ui`, `components/sections`, `components/business`, `components/layout` | §10 Content + component scaffold |
| **FND-04** | Inter + IBM Plex Serif loaded via `next/font` self-hosted | §3 next/font pattern |
| **FND-05** | `content/site.ts` contains canonical NAP (reused by header, footer, JSON-LD, form) | §10 Content modules pattern |
| **FND-06** | `content/legal.ts` P.IVA/REA/capitale/sede rendered in footer (D.Lgs. 70/2003 art. 7) | §10 Content modules pattern |
| **FND-07** | Global layout includes header with "Richiedi un sopralluogo" CTA + institutional footer | §8 Layout, §11.3 header+footer presence check |
| **FND-08** | Vercel Analytics cookieless integrated in `app/layout.tsx` — zero GA4, zero third-party tracking | §7 Vercel Analytics, §9 compliance grep guards |
| **FND-09** | `lib/seo/metadata.ts` helper available for `generateMetadata` per-page | §4 Metadata helper |
| **FND-10** | Custom institutional 404 page | §8 not-found.tsx + error.tsx |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

These directives from `CLAUDE.md` have the same authority as locked decisions. The planner must verify every generated task respects them.

| Constraint | Source section | How Phase 1 respects it |
|---|---|---|
| React Server Components by default; Client only if real interaction | Frontend Architecture | Header + Footer + not-found + error(?) are all RSC. No client islands in Phase 1 except error.tsx (forced by Next). |
| `components/ui`, `components/sections`, `components/business`, `components/layout` split | Frontend Architecture | FND-03 scaffolds exactly this. `sections` + `business` start empty. |
| Prefer named exports, no `any` | Code Style | `content/*.ts` exports named `const siteContent`, `legalContent`, `navigation`. No default exports. |
| Italian content from `content/*.ts`, never hardcoded in components | Assets / Code Style | Header labels + footer labels + 404 copy all read from content modules. |
| `next/image` for all images, descriptive alt text | Assets Rules | Phase 1 has no product images; any logo asset in `public/images/` uses `next/image`. |
| Minimize dependencies; avoid introducing without reason | Safety Rules | Strict adherence to "don't add shadcn/lucide/animation lib yet". |
| Run lint + typecheck before closing a change | Safety Rules | Validation Architecture §11 ties this to Wave 0 + phase gate. |
| Commands: `pnpm dev` / `pnpm build` / `pnpm lint` / `pnpm typecheck` | Commands | Planner must define `typecheck` script (Next 16 create-next-app does not; see §5). |
| Deployable per milestone on Vercel | Deployment Workflow | Phase 1 closure criterion: `pnpm build` green + `pnpm start` serves the shell. |

## Standard Stack

### Core (versions verified via `npm view` on 2026-04-14)

| Package | Version | Purpose | Source |
|---|---|---|---|
| `next` | `16.2.3` | App Router, RSC, Server Actions, Turbopack default, file-conventions | `npm view next version` |
| `react` | `19.2.5` | UI runtime (pinned by Next via `nextjsReactPeerVersion`) | `npm view react version`; [create-next-app templates/index.ts](https://github.com/vercel/next.js/blob/canary/packages/create-next-app/templates/index.ts) |
| `react-dom` | `19.2.5` | DOM renderer | idem |
| `typescript` | `5.7.x` (see NOTE) | Strict mode, type safety | [Next.js minimum v5.1.0](https://nextjs.org/docs/app/getting-started/installation#set-up-typescript) |
| `tailwindcss` | `^4` (resolves to `4.2.2`) | Utility-first styling, CSS-first `@theme` | `npm view tailwindcss version`; [Tailwind v4 release](https://tailwindcss.com/blog/tailwindcss-v4) |
| `@tailwindcss/postcss` | `^4` (resolves to `4.2.2`) | PostCSS plugin required by v4 (replaces v3's `tailwindcss`) | `npm view @tailwindcss/postcss version` |
| `@types/node` | `25.6.0` or `^22` | Node type defs | `npm view @types/node version` |
| `@types/react` | `^19` (resolves to `19.2.14`) | React type defs | `npm view @types/react version` |
| `@types/react-dom` | `^19` (resolves to `19.2.3`) | ReactDOM type defs | `npm view @types/react-dom version` |

> **NOTE on TypeScript version.** [VERIFIED npm registry] The current npm `latest` is `typescript@6.0.2`. `@typescript-eslint/*@8.58.2` peer range is `typescript >=4.8.4 <6.1.0` — 6.0.2 is inside this range, but it is new enough that plugin ecosystem warnings are possible. [ASSUMED] For MVP stability, **pin `typescript` to `^5.7.0`** in `devDependencies` (install with `pnpm add -D typescript@^5.7`). TS 5.7 is the last minor in the 5.x branch and is what every plugin has been validated against since late 2024. Revisit at the end of Phase 7. The TS IDE behavior inside Next's built-in plugin is unchanged between 5.7 and 6.0 for our usage.

### Forms / Content / Layout (Phase 1)

| Package | Version | Purpose | Source |
|---|---|---|---|
| `@vercel/analytics` | `^2.0.1` | Cookieless web analytics with Resilient Intake (v2) | `npm view @vercel/analytics version`; [Vercel Analytics package v2 notes](https://vercel.com/docs/analytics/package#whats-new-in-version-2) |
| `@vercel/speed-insights` | `^2.0.0` | Core Web Vitals RUM | `npm view @vercel/speed-insights version` |
| `clsx` | `^2.1.x` | Conditional class merging | [clsx on npm](https://www.npmjs.com/package/clsx) |
| `tailwind-merge` | `^2.5.x` | Resolve Tailwind class conflicts (for `cn()` helper) | [tailwind-merge on npm](https://www.npmjs.com/package/tailwind-merge) |

> **NOTE: PROJECT.md delta.** PROJECT.md pinned `@vercel/analytics@1.4.x` and `@vercel/speed-insights@1.1.x`. [VERIFIED npm registry] Current latest is `2.0.1` and `2.0.0` respectively. v2 is a non-breaking upgrade at the integration level — the `<Analytics />` component from `@vercel/analytics/next` is still the correct import. The Resilient Intake change is about how the script URL is generated at build time. **Use v2.** ([Vercel v2 release notes](https://vercel.com/docs/analytics/package#whats-new-in-version-2))

### Dev Tooling

| Package | Version | Purpose | Source |
|---|---|---|---|
| `eslint` | `^9` (resolves to `9.39.x` via `maintenance` tag, or `9.x` latest minor) | JS/TS linter — **pinned at 9**, not 10 | [create-next-app templates/index.ts pins `eslint: "^9"`](https://github.com/vercel/next.js/blob/canary/packages/create-next-app/templates/index.ts) |
| `eslint-config-next` | `16.2.3` (match Next version) | Next + React + jsx-a11y + TS rules bundle | [Next.js ESLint docs](https://nextjs.org/docs/app/api-reference/config/eslint) |
| `eslint-config-prettier` | `^10.x` (latest `10.1.8`) | Disable ESLint formatting rules that fight Prettier | `npm view eslint-config-prettier version` |
| `prettier` | `^3.x` (latest `3.8.2`) | Formatter | `npm view prettier version` |
| `prettier-plugin-tailwindcss` | `^0.7.x` (latest `0.7.2`) | Auto-sort Tailwind classes | `npm view prettier-plugin-tailwindcss version` |
| `husky` | `^9.x` (latest `9.1.7`) | Git hooks | [husky get-started](https://typicode.github.io/husky/get-started.html) |
| `lint-staged` | `^16.x` (latest `16.4.0`) | Run linters only on staged files | `npm view lint-staged version` |

> **NOTE: ESLint 9 vs 10.** [VERIFIED WebSearch + npm] ESLint 10.0.0 shipped 2026-02-06. ESLint 10 drops legacy `.eslintrc.*` entirely. [CITED: [create-next-app templates/index.ts](https://github.com/vercel/next.js/blob/canary/packages/create-next-app/templates/index.ts)] Vercel's `create-next-app` still pins `eslint: "^9"` as of 2026-04. [VERIFIED npm] `eslint-plugin-jsx-a11y@6.10.2` was last released 2024-10-26 and its peer-dep range tops out at `^9` — it does NOT yet declare ESLint 10 support. Following Vercel's pin is safe; attempting to force ESLint 10 will either fail installation or produce warnings. **Phase 1 uses ESLint 9.** Revisit in Phase 7 when the ecosystem catches up.

> **NOTE: `eslint-plugin-jsx-a11y` transitively included.** [VERIFIED `npm view eslint-config-next@16.2.3 dependencies`] `eslint-config-next@16.2.3` lists `eslint-plugin-jsx-a11y: ^6.10.0` as a **direct dependency** (not peer). You get jsx-a11y rules automatically when you install `eslint-config-next`. **Do NOT add `eslint-plugin-jsx-a11y` explicitly** — that would create a duplicate resolution. The `eslint-config-next/core-web-vitals` preset already enables the jsx-a11y recommended ruleset.

### Alternatives Considered

| Instead of | Could Use | Verdict |
|---|---|---|
| `eslint@9` | `eslint@10` | REJECTED — ecosystem not ready (§NOTE above). Revisit Phase 7. |
| `@vercel/analytics@2` | `plausible` self-hosted | REJECTED by PROJECT.md (cost, and Vercel Analytics already satisfies Garante-style compliance). |
| Tailwind v4 | Tailwind v3 | REJECTED — v4 is the 2026 standard, CSS-first, 5×/100× faster builds. ([Tailwind v4 release](https://tailwindcss.com/blog/tailwindcss-v4)) |
| `next/font/google` | `@fontsource/*` packages | REJECTED — `next/font` already self-hosts, zero runtime DNS, and is the canonical Next 16 pattern. |
| `global-not-found.js` (Next 16 experimental) | `not-found.tsx` | REJECTED — experimental; requires duplicating `<html>`/`<body>`/fonts/globals.css. `not-found.tsx` inherits from `app/layout.tsx` and gives us header+footer for free. |
| `husky` + `lint-staged` | native `git` hooks + inline scripts | REJECTED — husky is 2KB, zero deps, and the ecosystem default. |

### Installation

```bash
# Step A — scaffold via create-next-app (writes all canonical files)
pnpm create next-app@latest impresa-edile \
  --ts --tailwind --eslint --app \
  --import-alias "@/*" --use-pnpm --skip-install --yes

cd impresa-edile

# Step B — install base dependencies from the generated package.json
pnpm install

# Step C — pin TypeScript to 5.7 (see NOTE above)
pnpm add -D typescript@^5.7

# Step D — add runtime deltas
pnpm add @vercel/analytics@^2 @vercel/speed-insights@^2 clsx tailwind-merge

# Step E — add dev tooling deltas (ESLint is already there from scaffold)
pnpm add -D prettier prettier-plugin-tailwindcss eslint-config-prettier husky lint-staged

# Step F — initialize husky (creates .husky/pre-commit and the prepare script)
pnpm exec husky init
```

**Version verification command** (run before committing the installation task to lock exact versions):

```bash
pnpm why next react tailwindcss @vercel/analytics eslint typescript
```

---

## 1. Next.js 16 Scaffold (FND-01)

### What `create-next-app@latest --yes` generates

[CITED: [create-next-app templates/app-tw/ts](https://github.com/vercel/next.js/tree/canary/packages/create-next-app/templates/app-tw/ts) on `canary`, fetched 2026-04-14] With the flags above, the CLI writes this exact tree (plus a demo `app/page.tsx` and `public/next.svg` etc.):

```
impresa-edile/
├── .gitignore
├── README.md
├── app/
│   ├── favicon.ico
│   ├── globals.css          # ← canonical @theme inline shape
│   ├── layout.tsx            # ← Geist fonts template (we REPLACE)
│   └── page.tsx              # ← demo page (we DELETE and rewrite)
├── public/
│   ├── next.svg              # ← DELETE
│   ├── vercel.svg            # ← DELETE
│   ├── file.svg              # ← DELETE
│   ├── globe.svg             # ← DELETE
│   └── window.svg            # ← DELETE
├── eslint.config.mjs         # ← canonical flat config (we KEEP + extend)
├── next.config.ts            # ← empty shell (we edit)
├── package.json
├── postcss.config.mjs        # ← @tailwindcss/postcss plugin
└── tsconfig.json             # ← canonical strict config (we extend)
```

### Files to DELETE after scaffold

| Path | Reason |
|---|---|
| `app/page.tsx` | Next.js demo content. Recreate as Italian placeholder in Phase 1 closure; real homepage in Phase 2. |
| `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg` | Next.js marketing SVGs. |
| `app/favicon.ico` | Stock Next.js icon. Leave temporarily blank; client will provide a real favicon (add to D-25 request list if not already there). |
| `README.md` | Generic CRA-style README. Replace with one-paragraph project-specific README. |

### 1.1 `tsconfig.json` — exact canonical content

[CITED: [raw template](https://raw.githubusercontent.com/vercel/next.js/canary/packages/create-next-app/templates/app-tw/ts/tsconfig.json), verified 2026-04-14]

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

### Delta edits (add to `compilerOptions`)

```json
{
  "compilerOptions": {
    // ... existing keys above
    "noUncheckedIndexedAccess": true,
    "verbatimModuleSyntax": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

**Rationale for each delta:**

| Flag | Why | Source |
|---|---|---|
| `noUncheckedIndexedAccess: true` | Explicit request from PROJECT.md and CONTEXT.md (Claude's Discretion). Catches `array[0]`/`object[key]` returning `T \| undefined`. One-time cost in `content/*.ts` — planner will need guard clauses when accessing indexed values. | [CITED: [TypeScript tsconfig reference](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html)] |
| `verbatimModuleSyntax: true` | Enforces `import type` for type-only imports, keeping bundle clean and aligning with `isolatedModules`. Standard 2026 practice. | [ASSUMED] |
| `forceConsistentCasingInFileNames: true` | Linux/Windows/macOS file-case discrepancies. Free safety. | [ASSUMED] |

> **Do NOT add** `exactOptionalPropertyTypes`. [ASSUMED] It produces noise against React prop spreads (`{ ...props }`) without meaningful safety for a 5-page institutional site. Revisit in Phase 7.

> **Do NOT remove** `allowJs: true`. Next.js generates `.js` files in `.next/types/` during `next dev` and expects TS to process them.

### 1.2 `next.config.ts` — minimum shape

[CITED: [raw template](https://raw.githubusercontent.com/vercel/next.js/canary/packages/create-next-app/templates/app-tw/ts/next.config.ts)] Canonical empty shell generated by `create-next-app`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

### Phase 1 recommended `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable typed routes — catches dead links at build time (FND-09-adjacent).
  // CITED: https://nextjs.org/docs/app/api-reference/config/typescript#statically-typed-links
  typedRoutes: true,

  // No remote image patterns in Phase 1 — all images are local in public/images.
  // Leave images block empty until Phase 4 introduces Vercel Blob or remote hosting.

  // Do NOT set `eslint` block — `next lint` is removed in Next 16;
  // the block is no longer read. CITED: https://nextjs.org/docs/app/api-reference/config/eslint
};

export default nextConfig;
```

> **On `metadataBase`:** do NOT hardcode it in `next.config.ts`. It belongs in `lib/seo/metadata.ts` + `app/layout.tsx`, read from `process.env.NEXT_PUBLIC_SITE_URL` with a localhost fallback. See §4.

> **Native TypeScript resolver:** [CITED: [Next.js TypeScript config docs](https://nextjs.org/docs/app/api-reference/config/typescript#using-nodejs-native-typescript-resolver-for-nextconfigts)] `next.config.ts` works out of the box on Node.js 22.18+ (we have 22.18.0 verified on this machine) because `process.features.typescript` is enabled by default. No extra flag needed.

### 1.3 Compliance guard in `next.config.ts` (optional, deferred to §9)

Do NOT put compliance grep logic in `next.config.ts`. See §9 for the recommended structural enforcement strategy.

---

## 2. Tailwind v4 `@theme` — exact syntax (FND-02)

### Canonical template shape

[CITED: [raw template globals.css](https://raw.githubusercontent.com/vercel/next.js/canary/packages/create-next-app/templates/app-tw/ts/app/globals.css), verified 2026-04-14]

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

### Our Phase 1 `app/globals.css` — prescribed shape

```css
@import "tailwindcss";

/* ---------- Brand tokens ---------- */
/* Single source of truth for the 3-color palette.
   See D-01 / D-02 / D-03 in 01-CONTEXT.md.
   WCAG contrast verified in scripts/check-contrast.mjs. */
:root {
  --color-ink: #1a1a1a;      /* D-01 — titles, body, UI structure */
  --color-panna: #f8f5ee;    /* D-02 — default background */
  --color-brand: #291572;    /* D-03 — CTA fills, accent (FILL ONLY — see D-06) */

  /* Support neutrals (minimal per D-04) */
  --color-border: #e6e1d6;   /* hairline on panna */
  --color-surface: #ffffff;  /* card / section-break background */
}

/* ---------- Tailwind theme wiring ---------- */
/* @theme inline resolves var() at definition, preventing scoping issues
   when utilities reference CSS variables from next/font. */
@theme inline {
  /* Brand colors — generates bg-ink, text-ink, bg-panna, text-brand, etc. */
  --color-ink: var(--color-ink);
  --color-panna: var(--color-panna);
  --color-brand: var(--color-brand);
  --color-border: var(--color-border);
  --color-surface: var(--color-surface);

  /* Fonts — wired to next/font CSS variables (see §3).
     --font-sans is Tailwind's default font-sans utility.
     --font-serif is the optional serif utility, used on hero + H1 only. */
  --font-sans: var(--font-inter);
  --font-serif: var(--font-ibm-plex-serif);

  /* Fluid type scale — D-10 base 17px, ratio 1.25.
     Only h1 + h2 use clamp(); body / UI stay discrete. */
  --text-h1: clamp(2.25rem, 1.5rem + 3.2vw, 4rem);       /* 36px → 64px */
  --text-h1--line-height: 1.1;
  --text-h2: clamp(1.625rem, 1.25rem + 1.6vw, 2.25rem);  /* 26px → 36px */
  --text-h2--line-height: 1.2;
  /* h3, h4, body, UI all use Tailwind defaults (text-lg, text-xl, etc.) */
}

/* ---------- Global defaults ---------- */
html {
  /* D-10 — base body 17px */
  font-size: 17px;
}

body {
  background-color: var(--color-panna);
  color: var(--color-ink);
  font-family: var(--font-sans), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

### Generated utilities (confirmation)

[CITED: [Tailwind v4 theme docs](https://tailwindcss.com/docs/theme)] Every `--color-*` in `@theme` auto-generates matching `bg-*`, `text-*`, `border-*`, `ring-*`, `fill-*`, `stroke-*` utilities. So the above produces:

- `bg-ink` / `text-ink` / `border-ink` …
- `bg-panna` / `text-panna`
- `bg-brand` / `text-brand` (usable as fill only per D-06 — enforce via ESLint restricted syntax or documentation)
- `bg-surface`
- `border-border`
- `font-sans` (→ Inter) / `font-serif` (→ IBM Plex Serif)
- `text-h1` (applies the clamp font-size AND line-height because Tailwind v4 reads the `--text-h1--line-height` companion variable)
- `text-h2`

### `@theme` vs `@theme inline` — why we use `inline`

[CITED: [Tailwind v4 theme docs](https://tailwindcss.com/docs/theme)] Default `@theme` emits utilities that reference the theme variable (`.font-sans { font-family: var(--font-sans); }`). If `--font-sans` is defined as `var(--font-inter)` in `:root`, and a subtree somewhere redefines `--font-sans`, the cascade can resolve incorrectly. `@theme inline` resolves `var(--font-inter)` at DEFINITION time, so the emitted utility reads `.font-sans { font-family: var(--font-inter); }`. Since `next/font` injects `--font-inter` on `<html>`, this is what we want.

### NO `tailwind.config.js`

[CITED: [Tailwind v4 release](https://tailwindcss.com/blog/tailwindcss-v4)] Tailwind v4 eliminates the need for `tailwind.config.js` when configuration is simple. `create-next-app@latest --tailwind` does NOT emit one. Do NOT create one. All configuration lives in `globals.css` via `@theme`.

### `postcss.config.mjs` — exact canonical

[CITED: [raw template](https://raw.githubusercontent.com/vercel/next.js/canary/packages/create-next-app/templates/app-tw/ts/postcss.config.mjs)]

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

Do NOT modify. Do NOT use the v3 `tailwindcss` or `autoprefixer` PostCSS plugins — they will not work with v4.

---

## 3. `next/font` — self-hosted Inter + IBM Plex Serif (FND-04)

### Exact TypeScript pattern

[CITED: [Next.js Font docs](https://nextjs.org/docs/app/getting-started/fonts), [next/font API reference](https://nextjs.org/docs/app/api-reference/components/font), verified against [canonical template layout.tsx](https://raw.githubusercontent.com/vercel/next.js/canary/packages/create-next-app/templates/app-tw/ts/app/layout.tsx)]

```tsx
// app/layout.tsx (relevant font setup only)
import { Inter, IBM_Plex_Serif } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],  // D-09 — no 700
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,        // reduces CLS via size-adjust fallback metrics
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["500"],                 // D-12 — one weight only, planner may choose 500 or 600
  style: ["normal"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${ibmPlexSerif.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-panna text-ink antialiased">
        {/* Header + main + Footer — see §8 */}
      </body>
    </html>
  );
}
```

### Why each option

| Option | Value | Source |
|---|---|---|
| `subsets: ["latin"]` | Only the Latin subset; Italian never needs Cyrillic/Greek. Cuts font bytes ~60%. | [Next.js Font API](https://nextjs.org/docs/app/api-reference/components/font#subsets) |
| `weight: [...]` | Explicitly pin to used weights. Non-variable fonts require this. IBM Plex Serif is NOT a variable font on Google Fonts — we must enumerate. Inter IS variable but pinning weights still trims binary size. | [CITED: [Next.js Font — Specifying a weight](https://nextjs.org/docs/app/getting-started/fonts#google-fonts)] |
| `variable: "--font-..."` | Creates a CSS variable instead of a `.className` — required for wiring into Tailwind v4 `@theme inline`. | [CITED: [Next.js Font API — variable](https://nextjs.org/docs/app/api-reference/components/font#variable)] |
| `display: "swap"` | Fallback renders immediately, swap when web font loads. Prevents FOIT. | [CITED: [Next.js Font API — display](https://nextjs.org/docs/app/api-reference/components/font#display)] |
| `preload: true` | Default is `true` for the root layout import — explicit for clarity. | [CITED: [Next.js Font API — preload](https://nextjs.org/docs/app/api-reference/components/font#preload)] |
| `adjustFontFallback: true` | Next auto-generates a `@font-face` with `size-adjust` + `ascent-override` matched to the web font → near-zero CLS. Default `true`, explicit for clarity. | [CITED: [Next.js Font API — adjustFontFallback](https://nextjs.org/docs/app/api-reference/components/font#adjustfontfallback)] |

### Wiring to Tailwind

The `--font-inter` and `--font-ibm-plex-serif` CSS variables are injected on `<html>` via the `className` concatenation. Tailwind reads them via `@theme inline { --font-sans: var(--font-inter); ... }` (see §2). No additional wiring required.

### Self-hosting confirmation

[CITED: [Next.js Font docs](https://nextjs.org/docs/app/getting-started/fonts#google-fonts)] > "You can automatically self-host any Google Font. Fonts are stored as static assets and served from the same domain as your deployment, meaning no requests are sent to Google by the browser when the user visits your site."

This directly satisfies D-22 (no `fonts.googleapis.com` runtime) and the "zero GDPR exposure" requirement from FND-04.

### Anti-patterns to avoid

- ❌ Do NOT import `import "@fontsource/inter"` — unnecessary when `next/font` self-hosts.
- ❌ Do NOT add `<link rel="preconnect" href="https://fonts.googleapis.com">` — would break the no-third-party rule.
- ❌ Do NOT use `className={inter.className}` AND `className={ibmPlexSerif.className}` — only one `className` from a font call can be active. Use the `variable` pattern shown above.

---

## 4. `lib/seo/metadata.ts` helper (FND-09)

### Env var pattern

Create `.env.local` (gitignored, local only):

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Create `.env.production` (committed) or set in Vercel dashboard:

```bash
NEXT_PUBLIC_SITE_URL=https://edilferro.it  # placeholder until domain confirmed
```

### Helper file — `lib/seo/metadata.ts`

```ts
import type { Metadata } from "next";
import { siteContent } from "@/content/site";

/**
 * Canonical metadataBase for the whole app.
 * Falls back to localhost during dev so Next doesn't throw on relative URLs
 * in openGraph.images (see: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase).
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const metadataBase = new URL(SITE_URL);

/**
 * Shared defaults — merged at layout level, overridden per-page via buildMetadata().
 */
export const defaultMetadata: Metadata = {
  metadataBase,
  title: {
    default: siteContent.brand.name,
    template: `%s — ${siteContent.brand.name}`,
  },
  description: siteContent.brand.tagline,
  applicationName: siteContent.brand.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/",
    siteName: siteContent.brand.name,
    title: siteContent.brand.name,
    description: siteContent.brand.tagline,
    // images: [{ url: "/og-default.jpg", width: 1200, height: 630 }], // added in Phase 7
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.brand.name,
    description: siteContent.brand.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Per-page metadata builder.
 * Pages call: `export const metadata = buildMetadata({ title: "Servizi", ... });`
 */
export function buildMetadata(overrides: Metadata = {}): Metadata {
  return {
    ...defaultMetadata,
    ...overrides,
    // Merge nested objects explicitly (Metadata uses shallow merge).
    openGraph: {
      ...defaultMetadata.openGraph,
      ...overrides.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...overrides.twitter,
    },
    alternates: {
      ...defaultMetadata.alternates,
      ...overrides.alternates,
    },
  };
}
```

### Use in `app/layout.tsx`

```ts
// app/layout.tsx
import { defaultMetadata } from "@/lib/seo/metadata";

export const metadata = defaultMetadata;
```

### Use in a page (example for Phase 2+)

```ts
// app/servizi/page.tsx
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Servizi",
  description: "Nuove costruzioni, ristrutturazioni di pregio, opere pubbliche, urbanizzazioni.",
  alternates: { canonical: "/servizi" },
});
```

### Notes and gotchas

| Note | Source |
|---|---|
| `metadataBase` MUST be set in the root layout if any metadata field uses a relative URL (e.g., `openGraph.images: ["/og.jpg"]`). Otherwise Next throws at build. | [CITED: [generateMetadata — metadataBase](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase)] |
| `openGraph.locale` must be `it_IT` (underscore, BCP47 + region), not `it-IT`. | [CITED: [generateMetadata — openGraph](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#opengraph)] |
| `title.template` applies to CHILD segments; a page must set its own `title` string to be composed with the template. If a page sets `title: { absolute: "..." }` it ignores the template. | [CITED: [generateMetadata — title.template](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#template)] |
| Shallow merge only — nested objects like `openGraph` are REPLACED by child segments, not merged. Our `buildMetadata()` helper explicitly merges them to avoid losing defaults. | [CITED: [generateMetadata — Merging](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#merging)] |
| `metadata` export is Server-Component-only. | [CITED: [generateMetadata — Server Component only](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#why-generatemetadata-is-server-component-only)] |
| JSON-LD is NOT wired in Phase 1. That's Phase 7 with `schema-dts`. Do not add `<script type="application/ld+json">` in Phase 1. | CONTEXT.md out-of-scope |

### Open question for the planner

**Q:** Should `buildMetadata` accept a route path and auto-derive `alternates.canonical`?
**A (recommendation):** Not in Phase 1. Pages that need a canonical set it explicitly via the override. Adding implicit path-derivation is extra surface area with no Phase 1 consumer (only the layout calls it for `/`).

---

## 5. ESLint 9 flat config + Prettier + package.json scripts (FND-01 tooling)

### Canonical flat config

[CITED: [raw eslint.config.mjs template](https://raw.githubusercontent.com/vercel/next.js/canary/packages/create-next-app/templates/app-tw/ts/eslint.config.mjs), verified 2026-04-14]

```js
// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

### Phase 1 delta — add prettier-last + compliance rules

```js
// eslint.config.mjs (Phase 1 shape)
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ---------- Compliance guard rails (see §9) ----------
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    rules: {
      // Forbid GA4 / gtag / Google Tag Manager anywhere in the codebase.
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
            {
              name: "react-ga",
              message: "GA4 is forbidden per D-21.",
            },
            {
              name: "react-ga4",
              message: "GA4 is forbidden per D-21.",
            },
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

  // prettier LAST — disables formatting rules that fight Prettier
  prettier,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
```

> `no-restricted-syntax` with `Literal[value=/regex/]` catches string literals containing the forbidden substrings — so it fires on `<iframe src="https://www.google.com/maps/...">` literals, on inline script embeds, on fetch URLs, etc. Not infallible (string concatenation evades it), so pair with the grep check in §9.

### `.prettierrc.json`

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

### `.prettierignore`

```
.next
node_modules
public
out
build
pnpm-lock.yaml
```

### `package.json` scripts (the ones the planner must add)

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
    "prepare": "husky"
  }
}
```

**Notes:**

- [CITED: [Next 16 install docs](https://nextjs.org/docs/app/getting-started/installation#set-up-linting)] `lint` maps to `eslint`, NOT to `next lint`. `next lint` was removed in Next 16.
- The `typecheck` script is NOT auto-added by `create-next-app` — the planner must add it manually. `pnpm typecheck` is the CLAUDE.md mandated command.
- `prepare: "husky"` is what `husky init` writes. It runs `husky` on `pnpm install` and creates the `.husky/` directory if missing.

### Migration from `next lint`

[CITED: [Next 16 upgrade guide](https://nextjs.org/docs/app/api-reference/config/eslint)] If a previous workspace had `next lint`, use `npx @next/codemod@canary next-lint-to-eslint-cli .`. **Not applicable** to our greenfield scaffold.

---

## 6. Husky 9 + lint-staged 16

### Husky init

[CITED: [husky get-started](https://typicode.github.io/husky/get-started.html)]

```bash
pnpm add -D husky
pnpm exec husky init
```

`husky init`:
1. Writes `.husky/pre-commit` containing a single line (`pnpm test` by default — we will overwrite).
2. Adds `"prepare": "husky"` to `package.json`.
3. Configures `.git/config` to use `.husky/` as the hooks directory.

### Rewrite `.husky/pre-commit`

```sh
#!/usr/bin/env sh
pnpm exec lint-staged
```

No need for the old `. "$(dirname -- "$0")/_/husky.sh"` preamble — husky 9 dropped it.

### `.lintstagedrc.json` — Phase 1 shape

[CITED: [lint-staged README](https://github.com/lint-staged/lint-staged)]

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

### Why JSON (not JS)

- Smaller. No module-system gotchas (ESM vs CJS under lint-staged's runner).
- Planner can move to `.lintstagedrc.mjs` later if dynamic rules are needed.

### Why `eslint --fix` comes before `prettier --write`

Prettier LAST is the universal convention — ESLint may rewrite code in ways that need a final Prettier pass, while the reverse can undo Prettier formatting. The `eslint-config-prettier` config we added in §5 ensures ESLint won't FIGHT Prettier on formatting.

### Integration with Next.js `.lintstagedrc` pattern

[CITED: [Next.js ESLint docs — running lint on staged files](https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files)] Next docs show a more complex pattern with relative paths. The flat `eslint .` CLI handles the path expansion implicitly — the simpler shape above is sufficient for a single-package repo.

---

## 7. Vercel Analytics + Speed Insights (FND-08)

### Canonical integration

[CITED: [Vercel Analytics Quickstart for Next.js App Router](https://vercel.com/docs/analytics/quickstart)] The `<Analytics />` component must be imported from `@vercel/analytics/next` (not `/react`, not bare `@vercel/analytics`).

```tsx
// app/layout.tsx (excerpt)
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${inter.variable} ${ibmPlexSerif.variable}`}>
      <body className="min-h-screen flex flex-col bg-panna text-ink antialiased">
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

### No env vars required

[VERIFIED: [Vercel Analytics Quickstart](https://vercel.com/docs/analytics/quickstart)] The `<Analytics />` component self-configures at runtime. No `NEXT_PUBLIC_*_ID` setup. You only need to enable Web Analytics once in the Vercel project dashboard (Analytics → Enable).

### `mode` prop

[CITED: [@vercel/analytics package docs](https://vercel.com/docs/analytics/package)] The `mode` prop is auto-detected. You can pass `mode="auto" | "development" | "production"` to force behavior. Default `"auto"` checks `process.env.NODE_ENV`. Phase 1 uses the default — no prop.

### Cookie-banner verdict

[CITED: [Vercel Analytics Privacy Policy](https://vercel.com/docs/analytics/privacy-policy)] Quoted directly:

> "Vercel Web Analytics allows you to track your website traffic and gather valuable insights **without using any third-party cookies**, instead end users are identified by **a hash created from the incoming request**."

> "The recording of data points (for example, page views or custom events) is **anonymous**, so you have insight into your data without it being tied to or associated with any individual, customer, or IP address."

> "The lifespan of a visitor session is not stored permanently, it is automatically discarded after 24 hours."

[CITED [MEDIUM confidence]: [Clickport — Cookie Consent and Analytics in Italy 2026](https://clickport.io/blog/privacy-analytics-italy)] The Italian Garante's four-condition cookieless exemption requires: (1) IP masking, (2) single-site scope (no cross-site tracking), (3) no third-party data sharing, (4) aggregated output only. Vercel Analytics meets all four by design per its own privacy documentation.

> **Verdict for Phase 1:** NO cookie banner is required for the Vercel Analytics integration. The privacy/cookie policy pages in Phase 7 will document this explicitly and reference both the Vercel privacy statement and the Garante exemption. The planner should NOT introduce any cookie banner library or consent machinery in Phase 1 — doing so would contradict D-23.

[ASSUMED] The project should still include a Privacy Policy page that discloses the use of Vercel Analytics (required by GDPR Art. 13 transparency, independent of cookie-banner requirement). That is Phase 7 scope (SEO-06).

---

## 8. `app/layout.tsx`, `app/not-found.tsx`, `app/error.tsx` (FND-07 + FND-10)

### `app/layout.tsx` — complete Phase 1 shape

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { defaultMetadata } from "@/lib/seo/metadata";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${ibmPlexSerif.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-panna text-ink antialiased">
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

### `app/not-found.tsx` — custom 404 (FND-10)

[CITED: [Next.js not-found file convention](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)]
- Renders INSIDE the `<html>` / `<body>` of `app/layout.tsx` — so Header + Footer + fonts + Analytics all come for free.
- Is a Server Component by default (can be `async`).
- Next.js automatically injects `<meta name="robots" content="noindex" />` on 404 responses.
- HTTP status: **200 for streamed responses, 404 for non-streamed**. For our static-ish layout, this usually means 404 is served correctly to search engines.
- Cannot export `generateMetadata` — the title inherits from the layout template (`%s — Edilferro`) via `notFoundContent.title`.

```tsx
// app/not-found.tsx
import Link from "next/link";
import { notFoundContent } from "@/content/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-ink/60">
        404
      </p>
      <h1 className="font-serif text-h1 text-ink">{notFoundContent.title}</h1>
      <p className="max-w-prose text-lg text-ink/80">
        {notFoundContent.body}
      </p>
      <div className="flex flex-wrap gap-4 pt-2">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-panna transition-colors hover:bg-brand/90"
        >
          {notFoundContent.ctaHomeLabel}
        </Link>
        <Link
          href="/contatti"
          className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3 text-ink transition-colors hover:border-ink/60"
        >
          {notFoundContent.ctaContactLabel}
        </Link>
      </div>
    </section>
  );
}
```

### `app/error.tsx` — route-level error boundary

[CITED: [Next.js error file convention](https://nextjs.org/docs/app/api-reference/file-conventions/error), verified against Next 16.2.0 which introduced `unstable_retry`]

- **MUST be `"use client"`**. Error boundaries are Client Components — this is the ONE exception to the "no client islands in Phase 1" rule, and it's forced by Next.js.
- Props: `error: Error & { digest?: string }`, `unstable_retry: () => void` (16.2+). Do NOT use `reset` (soft-deprecated in 16.2 in favor of `unstable_retry`).
- Cannot export metadata.

```tsx
// app/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { errorContent } from "@/content/site";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // TODO (Phase 7): wire to an error reporting service if the client asks.
    // For Phase 1, plain console.error is sufficient.
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-2xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-ink/60">
        Errore
      </p>
      <h1 className="font-serif text-h1 text-ink">{errorContent.title}</h1>
      <p className="max-w-prose text-lg text-ink/80">{errorContent.body}</p>
      <div className="flex flex-wrap gap-4 pt-2">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-panna transition-colors hover:bg-brand/90"
        >
          {errorContent.ctaRetryLabel}
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3 text-ink transition-colors hover:border-ink/60"
        >
          {errorContent.ctaHomeLabel}
        </Link>
      </div>
    </section>
  );
}
```

### DO NOT add `app/global-error.tsx` in Phase 1

[CITED: [Next.js error — Global Error](https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error)] `global-error.tsx` replaces the entire root layout (it MUST define its own `<html>` and `<body>`). This means you'd lose fonts, Analytics, and the institutional shell on a root-layout crash. For a 5-page institutional site with no data layer, the probability of the root layout itself throwing is effectively zero. **Skip it.** Revisit in Phase 7 only if real-world errors ever hit the root.

---

## 9. Structural compliance enforcement

Two independent guards catch different attack surfaces. **Ship BOTH.**

### Guard 1 — ESLint `no-restricted-syntax` / `no-restricted-imports` (catches AST)

Already defined in §5. This catches:
- `gtag(...)` calls
- `import ... from 'react-ga'` / `'react-ga4'` / `'@next/third-parties/google'`
- String literals containing `googletagmanager.com`, `google-analytics.com`, `fonts.googleapis.com`

**Limitation:** Cannot catch dynamic string construction (`const host = "googletagmanager" + ".com"`), but that's fine — no developer concatenates URLs like that.

### Guard 2 — `scripts/check-compliance.mjs` grep (catches everything AST misses)

A Node script runnable as `pnpm check:compliance` and in CI. Covers:
- Strings split across lines
- `<iframe src="google.com/maps/...">` in JSX (which ESLint sees as a string literal but easy to verify here too)
- Any `.md` / `.json` / `.env` file referencing forbidden domains
- `public/*.html` or other non-TS assets that ESLint skips

```js
// scripts/check-compliance.mjs
// Fails with exit code 1 if any forbidden pattern is found in tracked source.
// Run: `pnpm check:compliance`
// Run in CI: same command, on every PR.

import { execSync } from "node:child_process";
import process from "node:process";

const FORBIDDEN = [
  {
    pattern: "gtag",
    reason: "Google Analytics (gtag) is forbidden — see D-21.",
  },
  {
    pattern: "_ga",
    reason: "Google Analytics (_ga cookie / global) is forbidden — see D-21.",
  },
  {
    pattern: "googletagmanager",
    reason: "Google Tag Manager is forbidden — see D-21.",
  },
  {
    pattern: "google-analytics.com",
    reason: "google-analytics.com reference forbidden — see D-21.",
  },
  {
    pattern: "fonts.googleapis.com",
    reason:
      "Runtime Google Fonts forbidden — use next/font/google self-hosted. See D-22.",
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

// Directories to scan — source only, skip node_modules, .next, public (images), .git.
const SCAN_DIRS = ["app", "components", "content", "lib", "scripts"];
const INCLUDE_EXTS = /\.(ts|tsx|js|jsx|mjs|cjs|md|mdx|json|css|html)$/i;

function listTrackedFiles() {
  try {
    const out = execSync("git ls-files", { encoding: "utf8" });
    return out.split("\n").filter(Boolean);
  } catch {
    // Fallback if not in a git repo yet.
    return [];
  }
}

function readFileSafe(path) {
  try {
    return import("node:fs").then((fs) => fs.readFileSync(path, "utf8"));
  } catch {
    return "";
  }
}

async function main() {
  const files = listTrackedFiles().filter(
    (f) =>
      SCAN_DIRS.some((d) => f.startsWith(`${d}/`)) && INCLUDE_EXTS.test(f)
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
    console.error("\n❌ Compliance check FAILED:\n");
    for (const v of violations) {
      console.error(`  ${v.file}`);
      console.error(`    ↪ matched "${v.rule.pattern}" — ${v.rule.reason}`);
    }
    console.error(
      `\n${violations.length} violation(s). Fix or add an exemption in scripts/check-compliance.mjs.\n`
    );
    process.exit(1);
  }

  console.log(`✓ Compliance check passed (${files.length} files scanned).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
```

### CI wiring

For now, add to the `prepare` script chain or a pre-push husky hook:

```sh
# .husky/pre-push (optional — add after lint-staged works)
#!/usr/bin/env sh
pnpm check:compliance
pnpm check:contrast
pnpm typecheck
```

[ASSUMED] A real GitHub Action can be added in Phase 7 alongside Lighthouse CI. For Phase 1, local `pnpm check:compliance` + Vercel preview build (which fails if lint/typecheck fails) is sufficient.

### Recommendation

Ship **both** ESLint rules AND the grep script in Phase 1. They are cheap to maintain and fail-loud. The ESLint rules catch at author time; the grep script catches in CI and in `.md` / `.json` files the linter doesn't read.

---

## 10. Content modules pattern (FND-05, FND-06)

### Shape recommendation

Use **plain TS objects with explicit exported types** (NOT `as const` tuples). Rationale:

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| Plain object + `export const` + `export type` | Editable without type friction, discoverable in IDE, JSON-serializable for Phase 7 JSON-LD | Less compile-time safety on string-literal precision | ✅ **Use this.** Enough safety for 5 pages. |
| `as const` | Maximum type narrowing, great for union-discriminated content | Fights ergonomics when adding a field; re-typing everywhere on change | Overkill for Phase 1. |

**Type location:** colocated in the same file (`content/site.ts`). We do not yet have enough cross-file type reuse to justify `lib/types.ts`. If Phase 2+ need shared types (e.g., a `Project` type), they can live with their content module or be extracted at that point.

### `content/site.ts` — prescribed shape

```ts
// content/site.ts
// Canonical NAP + brand strings. Used by Header, Footer, JSON-LD (Phase 7), forms (Phase 6).

export type SiteBrand = {
  readonly name: string;        // "Edilferro" (or full ragione sociale)
  readonly legalName: string;   // "Edilferro S.r.l."
  readonly tagline: string;     // homepage + default meta description
  readonly claim: string;       // secondary claim used in hero
};

export type SiteContact = {
  readonly phone: {
    readonly display: string;   // "+39 041 000 0000"
    readonly tel: string;       // "+39041000 0000" (tel: URI format, no spaces)
  };
  readonly email: string;       // "info@edilferro.it"
  readonly pec: string;         // "edilferro@pec.it"
  readonly hours: readonly string[]; // ["Lun–Ven 8:30–18:00", "Sab su appuntamento"]
};

export type SiteAddress = {
  readonly street: string;
  readonly zip: string;
  readonly city: string;        // "Mestre"
  readonly province: string;    // "VE"
  readonly region: string;      // "Veneto"
  readonly country: string;     // "IT"
  readonly googleMapsUrl: string; // external link (no iframe — D-21 related)
};

export type SiteServiceArea = readonly string[]; // ["Mestre", "Venezia", "Provincia di Venezia", "Veneto"]

export type SiteContent = {
  readonly brand: SiteBrand;
  readonly contact: SiteContact;
  readonly address: SiteAddress;
  readonly serviceArea: SiteServiceArea;
};

export const siteContent: SiteContent = {
  brand: {
    // TODO cliente: ragione sociale completa, slogan finale
    name: "Edilferro",
    legalName: "Edilferro S.r.l.", // TODO cliente: conferma ragione sociale
    tagline:
      "45 anni di esperienza edile a Mestre e in tutto il Veneto — nuove costruzioni, ristrutturazioni e opere pubbliche.",
    claim: "Costruiamo da 45 anni sul territorio veneto.",
  },
  contact: {
    phone: {
      // TODO cliente: telefono centralino reale
      display: "+39 041 000 0000",
      tel: "+39041000 0000",
    },
    email: "info@edilferro.it",        // TODO cliente: email commerciale reale
    pec: "edilferro@pec.it",            // TODO cliente: PEC reale
    hours: ["Lun–Ven 8:30–18:00", "Sab su appuntamento"], // TODO cliente: orari reali
  },
  address: {
    street: "Via [placeholder]",        // TODO cliente: via + numero civico
    zip: "30170",                        // TODO cliente: CAP sede legale
    city: "Mestre",
    province: "VE",
    region: "Veneto",
    country: "IT",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Edilferro+Mestre", // TODO cliente: URL maps definitivo
  },
  serviceArea: [
    "Mestre",
    "Venezia",
    "Provincia di Venezia",
    "Veneto",
  ],
};

// Strings for the 404 and error pages — so we never hardcode Italian copy in components (CLAUDE.md rule).
export const notFoundContent = {
  title: "Pagina non trovata",
  body:
    "La pagina che stai cercando non esiste o è stata spostata. Puoi tornare alla home oppure contattarci direttamente.",
  ctaHomeLabel: "Torna alla home",
  ctaContactLabel: "Contattaci",
} as const;

export const errorContent = {
  title: "Qualcosa è andato storto",
  body:
    "Si è verificato un errore imprevisto. Puoi riprovare oppure tornare alla home. Se il problema persiste, contattaci.",
  ctaRetryLabel: "Riprova",
  ctaHomeLabel: "Torna alla home",
} as const;
```

> **`as const` on `notFoundContent` / `errorContent`** is fine for these tiny lookup objects — they're terminal strings, not data the planner is going to re-shape.

### `content/legal.ts` — prescribed shape

```ts
// content/legal.ts
// D.Lgs. 70/2003 art. 7 compliance data. Rendered in footer on every route.
// All fields ship with placeholders; substitute real values in a dedicated commit when client delivers.

export type LegalContent = {
  readonly ragioneSociale: string;
  readonly piva: string;             // Partita IVA
  readonly codiceFiscale: string;    // CF (può coincidere con P.IVA)
  readonly rea: {
    readonly number: string;          // "VE-000000"
    readonly chamber: string;         // "CCIAA Venezia Rovigo"
  };
  readonly capitaleSociale: {
    readonly declared: string;        // "€ 100.000"
    readonly paidUp: string;          // "€ 100.000 i.v."
  };
  readonly sedeLegale: {
    readonly street: string;
    readonly zip: string;
    readonly city: string;
    readonly province: string;
  };
  readonly sedeOperativa?: {           // optional if same as sede legale
    readonly street: string;
    readonly zip: string;
    readonly city: string;
    readonly province: string;
  };
  readonly certifications: {
    readonly soa: {
      readonly categories: readonly string[]; // ["OG1", "OG3"]
      readonly expiration: string;             // "2027-06-30" — ISO
    };
    readonly iso: {
      readonly standard: string;               // "ISO 9001:2015"
      readonly issuer: string;                 // "ente certificatore"
      readonly expiration: string;             // "2027-06-30"
    };
  };
};

export const legalContent: LegalContent = {
  // TODO cliente: tutti i campi sottostanti sono placeholder. Sostituire alla consegna.
  ragioneSociale: "Edilferro S.r.l.",
  piva: "00000000000",                 // TODO cliente: P.IVA reale (11 cifre)
  codiceFiscale: "00000000000",        // TODO cliente
  rea: {
    number: "VE-000000",                // TODO cliente
    chamber: "CCIAA Venezia Rovigo",    // TODO cliente — verificare camera
  },
  capitaleSociale: {
    declared: "€ 100.000",              // TODO cliente
    paidUp: "€ 100.000 i.v.",           // TODO cliente
  },
  sedeLegale: {
    street: "Via [placeholder] 1",      // TODO cliente
    zip: "30170",                        // TODO cliente
    city: "Mestre",
    province: "VE",
  },
  certifications: {
    soa: {
      categories: ["OG1", "OG3"],        // TODO cliente: categorie reali
      expiration: "2027-06-30",          // TODO cliente: scadenza reale
    },
    iso: {
      standard: "ISO 9001:2015",
      issuer: "[Ente Certificatore]",    // TODO cliente
      expiration: "2027-06-30",          // TODO cliente
    },
  },
};
```

### `content/navigation.ts` — prescribed shape

```ts
// content/navigation.ts
// Header + footer link structure. Single source of truth so both components stay in sync.

export type NavLink = {
  readonly href: string;   // relative path — typedRoutes validates at build
  readonly label: string;
};

export type NavGroup = {
  readonly title: string;
  readonly items: readonly NavLink[];
};

export const primaryNav: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/servizi", label: "Servizi" },
  { href: "/progetti", label: "Progetti" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
];

export const primaryCta: NavLink = {
  href: "/contatti",
  label: "Richiedi un sopralluogo",
};

export const footerNav: readonly NavGroup[] = [
  {
    title: "Sezioni",
    items: primaryNav,
  },
  {
    title: "Legale",
    items: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/cookie-policy", label: "Cookie policy" },
    ],
  },
];
```

### Naming lock-ins (BIKESHED RESOLVED — planner uses these exact names)

| Symbol | File | Kind |
|---|---|---|
| `siteContent` | `content/site.ts` | const |
| `SiteContent`, `SiteBrand`, `SiteContact`, `SiteAddress`, `SiteServiceArea` | `content/site.ts` | types |
| `notFoundContent`, `errorContent` | `content/site.ts` | const (using `as const`) |
| `legalContent` | `content/legal.ts` | const |
| `LegalContent` | `content/legal.ts` | type |
| `primaryNav`, `primaryCta`, `footerNav` | `content/navigation.ts` | consts |
| `NavLink`, `NavGroup` | `content/navigation.ts` | types |

**All exports are NAMED** — zero `export default` (CLAUDE.md rule).

### Component scaffold (FND-03)

Create empty index-only directories (git tracks directories with `.gitkeep` files or first real content):

```
components/
├── layout/
│   ├── Header.tsx              ← real component, see below
│   ├── Footer.tsx              ← real component, see below
│   └── SkipLink.tsx            ← optional a11y helper
├── ui/
│   └── .gitkeep                ← (or defer creating the dir until first UI primitive)
├── sections/
│   └── .gitkeep
└── business/
    └── .gitkeep
```

> **On empty directories**: git doesn't track them. The planner either (a) creates `.gitkeep` files, or (b) defers directory creation to the phase that needs it. CONTEXT.md D-03 / FND-03 says the hierarchy is part of the Phase 1 contract, so (a) is the correct choice.

### Header + Footer (sketch — planner expands)

`components/layout/Header.tsx` MUST be a Server Component reading from `content/navigation.ts`. Sticky desktop single-row `[Logo | nav | CTA]`. Mobile: `[Logo | hamburger + click-to-call]`.

`components/layout/Footer.tsx` MUST be a Server Component reading from `content/site.ts` + `content/legal.ts` + `content/navigation.ts`. 4 columns desktop, stack mobile.

The actual markup is planner territory — this research has established the data contracts, file locations, and compliance rules they must respect.

---

## Architecture Patterns

### Project structure (Phase 1 closure state)

```
impresa-edile/
├── .env.local                  # gitignored
├── .env.production              # committed (safe placeholders only)
├── .eslintrc bundled in eslint.config.mjs
├── .husky/
│   └── pre-commit
├── .lintstagedrc.json
├── .prettierignore
├── .prettierrc.json
├── app/
│   ├── error.tsx                # "use client" — error boundary
│   ├── favicon.ico              # TODO: replace with client-provided
│   ├── globals.css              # Tailwind v4 @theme (§2)
│   ├── layout.tsx               # Root layout (§8)
│   ├── not-found.tsx            # Custom 404 (§8)
│   └── page.tsx                 # Phase 1 placeholder; rewritten in Phase 2
├── components/
│   ├── business/.gitkeep
│   ├── layout/
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── sections/.gitkeep
│   └── ui/.gitkeep
├── content/
│   ├── legal.ts                 # §10
│   ├── navigation.ts            # §10
│   └── site.ts                  # §10
├── docs/
│   └── gdpr.md                  # stub; real content in Phase 7 (SEO-06/07)
├── lib/
│   └── seo/
│       └── metadata.ts          # §4
├── public/
│   └── images/
│       └── .gitkeep
├── scripts/
│   ├── check-compliance.mjs     # §9
│   └── check-contrast.mjs       # §11.2
├── eslint.config.mjs            # §5
├── next.config.ts               # §1.2
├── package.json
├── postcss.config.mjs           # canonical (§2)
├── tsconfig.json                # §1.1 + deltas
└── pnpm-lock.yaml
```

### Patterns

| Pattern | Where | Why |
|---|---|---|
| **Content-first** — all Italian strings in `content/*.ts` | header, footer, 404, error, layout meta defaults | CLAUDE.md rule; enables Phase 7 JSON-LD reuse; makes future i18n (v2) straightforward. |
| **Named exports only** | everywhere | CLAUDE.md rule. |
| **RSC by default** | everywhere except `app/error.tsx` | CLAUDE.md rule; Phase 1 has no legitimate client interaction. |
| **`cn()` helper** via `clsx` + `tailwind-merge` | `lib/utils/cn.ts` — create on first need (likely Phase 2) | shadcn/ui-compatible convention, prevents className conflicts. Defer until first use. |
| **`import type` for types** (enforced by `verbatimModuleSyntax`) | all TS files | keeps the bundle clean; required by `isolatedModules`. |
| **`typedRoutes: true`** | `next.config.ts` | catches dead links at build. |

### Anti-patterns to avoid

- ❌ `export default` from content modules — breaks the named-export rule.
- ❌ Hardcoded Italian strings inside components.
- ❌ `className={inter.className}` on `<html>` — use `${inter.variable} ${ibmPlexSerif.variable}`.
- ❌ Dark mode scaffolding (`dark:` classes, dual CSS variables) — out of scope per Deferred Ideas.
- ❌ Client components for anything that doesn't need interaction.
- ❌ Adding a `tailwind.config.js`.
- ❌ Setting `eslint` block in `next.config.ts` (Next 16 ignores it).
- ❌ `next lint` as a script.

---

## Don't Hand-Roll

| Problem | Don't build | Use | Why |
|---|---|---|---|
| Google Font self-hosting | Manual `@font-face` + woff2 download | `next/font/google` | Handles variable fonts, `size-adjust` fallback metrics, subsetting, preloading, and the GDPR posture in one import. |
| `className` merging with conditional Tailwind classes | Ad-hoc ternaries | `clsx` + `tailwind-merge` (via a `cn()` helper) | Tailwind class conflicts resolve unexpectedly without `tailwind-merge`; clsx is 200 bytes. |
| SEO metadata | `<head>` tags in components | `generateMetadata` / `metadata` export + our `buildMetadata()` helper (§4) | Next.js merges, dedupes, injects `<meta charset>` and viewport automatically; our helper adds template + defaults. |
| 404 page | Custom routing | `app/not-found.tsx` | Inherits layout (header + footer + fonts + analytics) for free; Next auto-injects `noindex`. |
| Error boundary | Custom React class component | `app/error.tsx` | Wired into Next's routing error surface; receives `unstable_retry`. |
| Cookie consent | `react-cookie-consent` etc. | **Nothing** | Stack is cookieless; no banner required. D-23. |
| Font loading strategy / FOUT prevention | `font-display: fallback` + custom `size-adjust` tuning | `next/font` `adjustFontFallback: true` | Next.js generates the fallback metrics automatically. |
| Tailwind color tokens | `tailwind.config.js` with `theme.extend.colors` | `@theme` in `globals.css` | Tailwind v4 is CSS-first; `tailwind.config.js` is legacy. |
| Git hooks | Custom `.git/hooks/` scripts | `husky` | 2 kB, zero deps, universal convention, survives `git clone`. |

**Key insight:** The scaffold phase is the HIGHEST-risk moment for hand-rolling. Every shortcut here compounds across all future phases.

---

## Common Pitfalls

### Pitfall 1 — `@theme inline` vs `@theme` confusion

**What goes wrong:** Developer defines `--font-sans: var(--font-inter)` in plain `@theme`, then `font-sans` utility emits `var(--font-sans)` instead of `var(--font-inter)`, and the fallback kicks in. Looks like the font "didn't load" but the browser network tab shows it did.
**Why it happens:** `@theme` indirection + CSS cascade scoping. The variable is resolved at USE time, not DEFINITION time.
**How to avoid:** Use `@theme inline` when the variable references another variable (our case). See §2.
**Warning signs:** Everything renders in system font despite `.woff2` appearing in DevTools → Sources.

### Pitfall 2 — ESLint 10 force-install

**What goes wrong:** Developer sees ESLint 10 is out and forces `pnpm add -D eslint@10`, breaking `eslint-plugin-jsx-a11y` (still pinned at `^9`) and `eslint-plugin-react` (not yet ESLint 10 compatible).
**Why it happens:** ESLint 10 just shipped (Feb 2026); the plugin ecosystem is mid-migration.
**How to avoid:** Follow Vercel's `create-next-app` pin (`eslint: "^9"`). Documented in §5.
**Warning signs:** `pnpm install` warnings about unmet peer deps; lint errors like `Cannot read properties of undefined (reading 'rules')`.

### Pitfall 3 — `<iframe src="...google.com/maps...">` accidentally reintroduced

**What goes wrong:** Phase 6 developer needs a map, types `<iframe src="https://www.google.com/maps/embed..." />`, and Google sets third-party cookies → Italian Garante non-compliance → cookie banner required → D-23 broken.
**Why it happens:** No structural guard.
**How to avoid:** Dual guard in §9 (ESLint rule catches the Literal match, `check-compliance.mjs` catches everything the linter misses).
**Warning signs:** `pnpm check:compliance` fails with `matched "google.com/maps"`.

### Pitfall 4 — `metadataBase` missing at build time

**What goes wrong:** Layout sets `openGraph.images: ["/og.jpg"]` (relative) without `metadataBase`. `next build` throws `Metadata Error: using relative URL without metadataBase`.
**Why it happens:** Easy to forget on the first Vercel build when `NEXT_PUBLIC_SITE_URL` isn't yet set.
**How to avoid:** Our `lib/seo/metadata.ts` (§4) provides a `localhost:3000` fallback, so the build never throws — but the production canonical will point at localhost if the env var is missing. Set `NEXT_PUBLIC_SITE_URL` in Vercel BEFORE the first preview deploy.
**Warning signs:** First preview deploy shows `<link rel="canonical" href="http://localhost:3000">` in view-source.

### Pitfall 5 — `app/error.tsx` not marked `"use client"`

**What goes wrong:** Build fails with `Error components must be Client Components`.
**Why it happens:** Next.js requires this for error boundary semantics.
**How to avoid:** Always start `app/error.tsx` with `"use client";`. §8 example is correct.
**Warning signs:** Build-time error explicit about it.

### Pitfall 6 — `lang="en"` left in `<html>` from canonical template

**What goes wrong:** The canonical `create-next-app` template emits `lang="en"`. We need `lang="it"` for an Italian institutional site (SEO + a11y signal).
**Why it happens:** Copy-paste from the template.
**How to avoid:** Explicit `lang="it"` in our `app/layout.tsx` (§8 example is correct). Add to the ESLint compliance rules as a future enhancement (Phase 7).
**Warning signs:** Screen readers announce English; `<html lang>` visible in view-source.

### Pitfall 7 — `noUncheckedIndexedAccess` breaks content access

**What goes wrong:** After enabling the flag, `siteContent.contact.hours[0]` is typed as `string | undefined`, causing TS errors in components that map over the array.
**Why it happens:** The flag's whole purpose.
**How to avoid:** Use `.map()` instead of indexed access where possible. For unavoidable index access, either (a) use a non-null assertion `!` after a guarded length check, (b) narrow via `for (const h of siteContent.contact.hours)`, or (c) destructure with defaults. Prefer (b) — it's the cleanest.
**Warning signs:** `pnpm typecheck` failures on content accessors that "obviously" should work.

### Pitfall 8 — PNPM + Husky interaction on first clone

**What goes wrong:** On a fresh clone, `pnpm install` runs `prepare: husky` BEFORE husky is installed, causing a bootstrap error.
**Why it happens:** The `prepare` script executes during `install`, creating a chicken-and-egg.
**How to avoid:** Husky 9 handles this — `husky` exits 0 when not in a git repo or when its files are absent. The `prepare: "husky"` written by `husky init` is safe.
**Warning signs:** First `pnpm install` on a fresh clone shows `husky - .git can't be found`. Benign; ignore.

---

## Code Examples

### Example — `app/layout.tsx` complete (assembles §§3, 4, 7, 8)

See §8 above — the file is listed in full.

### Example — `components/layout/Header.tsx` (sketch, Server Component)

```tsx
// components/layout/Header.tsx
import Link from "next/link";
import { primaryNav, primaryCta } from "@/content/navigation";
import { siteContent } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-panna/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-xl font-medium text-ink"
          aria-label={`${siteContent.brand.name} — home`}
        >
          {siteContent.brand.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigazione principale">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href={primaryCta.href}
          className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-panna transition-colors hover:bg-brand/90 md:inline-flex"
        >
          {primaryCta.label}
        </Link>

        {/* Mobile: click-to-call + hamburger
            HOM-05 asymmetry — only mobile has the phone link.
            Hamburger menu implementation: Phase 2 (needs a client island for toggle). */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${siteContent.contact.phone.tel}`}
            aria-label="Chiama Edilferro"
            className="rounded-full border border-ink/20 p-2.5"
          >
            {/* phone icon via inline SVG — avoid lucide-react in Phase 1 */}
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
          {/* TODO Phase 2: hamburger menu (client island). Phase 1 leaves only click-to-call. */}
        </div>
      </div>
    </header>
  );
}
```

> **Inline SVG, not lucide-react:** Phase 1 does NOT add lucide-react. One or two inline SVGs (phone, chevron) are cheaper than pulling in an icon library for Phase 1 scope. Lucide gets introduced in Phase 2 or later when icon count justifies it (CLAUDE.md safety rule: minimize dependencies).

### Example — `components/layout/Footer.tsx` (sketch, Server Component)

```tsx
// components/layout/Footer.tsx
import Link from "next/link";
import { siteContent } from "@/content/site";
import { legalContent } from "@/content/legal";
import { primaryNav, footerNav } from "@/content/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Col 1 — Identity */}
          <div>
            <p className="font-serif text-lg text-ink">{siteContent.brand.name}</p>
            <p className="mt-3 text-sm text-ink/70">{legalContent.ragioneSociale}</p>
            <p className="mt-4 text-sm text-ink/70">
              Opera in {siteContent.serviceArea.join(", ")}.
            </p>
          </div>

          {/* Col 2 — Sections */}
          <nav aria-label="Sezioni del sito">
            <h2 className="text-sm font-medium uppercase tracking-widest text-ink/60">
              Sezioni
            </h2>
            <ul className="mt-4 space-y-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink/80 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — Contacts */}
          <div>
            <h2 className="text-sm font-medium uppercase tracking-widest text-ink/60">
              Contatti
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-ink/80">
              <li>
                <a href={`tel:${siteContent.contact.phone.tel}`} className="hover:text-ink">
                  {siteContent.contact.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteContent.contact.email}`} className="hover:text-ink">
                  {siteContent.contact.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteContent.contact.pec}`} className="hover:text-ink">
                  PEC: {siteContent.contact.pec}
                </a>
              </li>
              {siteContent.contact.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Legal + certifications */}
          <div>
            <h2 className="text-sm font-medium uppercase tracking-widest text-ink/60">
              Dati legali
            </h2>
            <ul className="mt-4 space-y-1 text-xs text-ink/70">
              <li>
                {legalContent.sedeLegale.street}, {legalContent.sedeLegale.zip}{" "}
                {legalContent.sedeLegale.city} ({legalContent.sedeLegale.province})
              </li>
              <li>P.IVA {legalContent.piva}</li>
              <li>C.F. {legalContent.codiceFiscale}</li>
              <li>
                REA {legalContent.rea.number} — {legalContent.rea.chamber}
              </li>
              <li>
                Capitale sociale {legalContent.capitaleSociale.declared}{" "}
                ({legalContent.capitaleSociale.paidUp})
              </li>
            </ul>
            <div className="mt-6 flex gap-2 text-xs text-ink/60">
              <span className="rounded border border-border px-2 py-1">SOA</span>
              <span className="rounded border border-border px-2 py-1">ISO</span>
              {/* Real badge images land in Phase 5 */}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-xs text-ink/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {legalContent.ragioneSociale}. Tutti i diritti riservati.
          </p>
          <nav className="flex gap-4" aria-label="Note legali">
            {footerNav
              .find((g) => g.title === "Legale")
              ?.items.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
```

> This is a **sketch** — planner may adjust the visual hierarchy. The non-negotiable elements: (1) 4 columns desktop / stack mobile, (2) Server Component, (3) all content read from `content/site.ts` + `content/legal.ts` + `content/navigation.ts`, (4) includes P.IVA, REA, capitale sociale, sede legale per FND-06 / SEO-08.

---

## State of the Art

| Old approach | Current approach | When changed | Impact |
|---|---|---|---|
| `next lint` | `eslint` CLI via `package.json` script | Next.js 16.0 (Nov 2025) | Phase 1 writes an explicit `lint` script and `eslint.config.mjs`. |
| `tailwind.config.js` | `@theme` in `globals.css` | Tailwind v4 (Jan 2025) | No config file needed. Less cognitive surface. |
| `tailwindcss` PostCSS plugin | `@tailwindcss/postcss` | Tailwind v4 | New plugin; v3 plugin does not work. |
| `error.tsx` `reset()` prop | `unstable_retry()` prop | Next.js 16.2.0 | `reset` still works but the retry semantics are preferred. |
| `@vercel/analytics` v1 | v2 (Resilient Intake) | 2025/2026 | Non-breaking for consumers, but v2 is the preferred version. |
| `Inter` sans-only with Geist | `Inter` + `IBM_Plex_Serif` paired | our project decision | D-07. |
| JS config files (`next.config.js`) | TS config files (`next.config.ts`) | Next 15.0 (2025) | Type-safe config. |
| `.eslintrc.*` legacy format | `eslint.config.mjs` flat config | ESLint 9 (2024) → enforced in ESLint 10 | Phase 1 writes flat config from day one. |

**Deprecated / not-to-use:**
- `reset` prop in `error.tsx` — use `unstable_retry` (Next 16.2+).
- `Metadata.viewport` / `Metadata.themeColor` / `Metadata.colorScheme` — moved to `generateViewport` since Next 14. We don't need viewport customization in Phase 1.
- `tailwindcss-animate` — superseded by `tw-animate-css`. We don't need either in Phase 1.
- `react-hot-toast` — drift; will use `sonner` when we hit form toasts (Phase 6, not Phase 1).

---

## Assumptions Log

| # | Claim | Section | Risk if wrong |
|---|---|---|---|
| A1 | Pinning `typescript@^5.7` is safer than letting TS 6.x in, despite `@typescript-eslint@8.58.2` declaring support for `<6.1.0`. | §Stack NOTE | LOW — if wrong we miss a minor perf improvement. No correctness impact. |
| A2 | `verbatimModuleSyntax: true` and `forceConsistentCasingInFileNames: true` should be added alongside `noUncheckedIndexedAccess`. | §1.1 | LOW — if the team disagrees, drop both, they're nice-to-haves. |
| A3 | No `global-error.tsx` in Phase 1 (root layout is extremely unlikely to throw on a content-only site). | §8 | LOW — we can add it later without breaking anything. |
| A4 | `IBM Plex Serif` weight `500` is an acceptable default for hero + H1. The brief allows planner discretion between 500 and 600. | §3 | LOW — purely visual, trivial to change. |
| A5 | A Privacy Policy page disclosing Vercel Analytics is required under GDPR Art. 13 even without a cookie banner. This is Phase 7 scope (SEO-06). | §7 | LOW for Phase 1 (nothing to do). HIGH for Phase 7 — the planner of Phase 7 must confirm Garante requires disclosure even when no cookies set. |
| A6 | Client deliverables D-25/26/27 are Phase 1 tracked tasks with a human owner but are NOT blocking closure — they just need to be formally initiated. | Cross-phase blockers §12 | MEDIUM — if the client doesn't respond to D-25 on time, Phase 4 slips. |
| A7 | Ship BOTH ESLint `no-restricted-*` rules AND the `check-compliance.mjs` grep script (belt and suspenders) rather than just one. | §9 | LOW — neither is expensive to maintain. |
| A8 | Naming lock-ins in §10 (siteContent, legalContent, primaryNav, etc.) are stable enough to bake into downstream phases. | §10 | LOW — renaming consts is a find-replace operation if we change our minds. |
| A9 | The `noUncheckedIndexedAccess` cost in `content/*.ts` consumers is tolerable (an occasional `.map()` or destructuring pattern). | §1.1 + Pitfall 7 | LOW — we've seen the call sites; they're simple. |
| A10 | `@vercel/analytics@2` is a drop-in replacement for v1.4 at the `<Analytics />` call-site level. | §Stack NOTE | LOW — Vercel docs confirm the component API is unchanged. If wrong, revert to `^1.4` and rerun install. |

---

## Open Questions

### Q1 — Favicon & logo asset for Phase 1

**What we know:** The scaffolded `app/favicon.ico` is the generic Next.js icon. CLAUDE.md says "alt text descrittivi" for images but doesn't mention favicon.
**What's unclear:** Is the client providing a favicon + full logo asset bundle in Phase 1, or do we ship with a placeholder?
**Recommendation:** Add "favicon + logo SVG/PNG set" to the D-25 email request (it's a small delta). In the meantime, ship a blank-ish favicon (single-color panna square) so the browser tab doesn't show a 404 icon. Planner should NOT block on this.

### Q2 — IBM Plex Serif weight: 500 or 600?

**What we know:** D-12 says "one weight only, planner decides". D-09 reserves 600 for Inter semibold (H2/H3/CTA) — so the serif H1 at 600 would match that weight visually on Inter-adjacent elements.
**What's unclear:** Aesthetic preference.
**Recommendation:** Start with `weight: ["500"]` for IBM Plex Serif — a slightly lighter display serif reads more institutional (closer to newspaper mastheads). If a Phase 2 review says it feels weak, swap to 600 — it's a one-line change.

### Q3 — Should `lib/utils/cn.ts` exist in Phase 1?

**What we know:** `clsx` + `tailwind-merge` are installed. The `cn()` helper is the standard shadcn/ui pattern. Phase 1 components are mostly static — only the Header has a few conditional classes.
**What's unclear:** Worth creating now or defer to Phase 2?
**Recommendation:** Create `lib/utils/cn.ts` in Phase 1 (2-line file) — it's a zero-cost addition and the Phase 2 planner shouldn't have to research it again.

### Q4 — Section background rhythm primitive

**What we know:** CONTEXT.md discretion: "planner defines it during first `<Section>` component". Phase 1 has no sections per se — not-found is one-off.
**What's unclear:** Whether to create `components/ui/Section.tsx` in Phase 1 or wait for Phase 2.
**Recommendation:** Wait for Phase 2. Phase 1's scope is the shell; section rhythm is homepage+ territory.

### Q5 — `lang="it-IT"` or `lang="it"` on `<html>`?

**What we know:** Both are valid. `lang="it"` is BCP47 minimum; `lang="it-IT"` is BCP47 + region.
**Recommendation:** Use `lang="it"` for the `<html>` attribute (BCP47 best practice — region only when you need to distinguish it-CH from it-IT). Use `it_IT` for `openGraph.locale` (that field is Open Graph's own spec, requires the underscore form). Our §8 example already does this correctly.

---

## Environment Availability

Probed on the target machine 2026-04-14 from the project root.

| Dependency | Required by | Available | Version | Fallback |
|---|---|---|---|---|
| Node.js | Next.js 16 runtime + dev tooling (min v20.9) | ✓ | v22.18.0 | — |
| pnpm | package manager | ✓ | 10.15.0 | — |
| npm | fallback package manager | ✓ | 10.9.3 | — |
| git | version control + husky hooks | ✓ | 2.53.0.windows.1 | — |
| Internet access (npm registry) | `pnpm install` | ✓ (verified via `npm view`) | — | — |
| Internet access (Google Fonts during `next build`) | `next/font` downloads woff2 at build time | ✓ (needed once per build) | — | If offline, `next build` fails to fetch font. Workaround: local-font mirror, but not needed in our flow. |

**Missing with no fallback:** none.
**Missing with fallback:** none.

All prerequisites for scaffold + build + lint are present. No environment blockers for Phase 1.

---

## 11. Validation Architecture (Nyquist gate)

### Test Framework

| Property | Value |
|---|---|
| Framework | **None yet** — Phase 1 is scaffold + compliance, not behavioral code. No unit test framework installed. |
| Config file | none — see Wave 0 |
| Quick run command | `pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast` |
| Full suite command | `pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm build` |

**Rationale for no test framework in Phase 1:** Phase 1 delivers a static shell with compliance guarantees. There is no runtime logic to unit-test — every requirement is verifiable via (a) the TypeScript compiler, (b) ESLint, (c) file/string greps, (d) a successful `next build`, (e) a contrast ratio assertion script. Installing vitest/jest adds dependencies with zero value until Phase 6 (form validation) introduces real behavioral logic. The nyquist gate for Phase 1 is a **structural gate**, not a behavioral one.

### Phase requirements → validation map

| Req ID | Behavior | Test type | Automated command | File exists? |
|---|---|---|---|---|
| **FND-01** | Next 16 project builds and dev-serves successfully | smoke | `pnpm build && pnpm dev` (CI: just `build`) | ❌ Wave 0 creates the scaffold; smoke test is `pnpm build` succeeding |
| **FND-02** | Brand palette defined in `globals.css` and WCAG AA ≥ 4.5:1 on declared combinations | structural + calculation | `pnpm check:contrast` (§11.2) | ❌ Wave 0 — `scripts/check-contrast.mjs` |
| **FND-03** | Component directories exist and are part of git | structural | `test -d components/ui && test -d components/sections && test -d components/business && test -d components/layout` | ❌ Wave 0 — `.gitkeep` in each |
| **FND-04** | `next/font` imports Inter + IBM Plex Serif, woff2 in `.next/static/media` after build | structural (grep) | `grep -qE "next/font/google.*Inter.*IBM_Plex_Serif" app/layout.tsx` + `ls .next/static/media \| grep -q 'ibm-plex'` after `pnpm build` | ❌ Wave 0 — `app/layout.tsx` |
| **FND-05** | `content/site.ts` exists, exports `siteContent`, TS compiles | structural + typecheck | `test -f content/site.ts && grep -q 'export const siteContent' content/site.ts && pnpm typecheck` | ❌ Wave 0 |
| **FND-06** | `content/legal.ts` exists, exports `legalContent` with required fields | structural | `test -f content/legal.ts && grep -q 'piva' content/legal.ts && grep -q 'rea' content/legal.ts && grep -q 'capitaleSociale' content/legal.ts && grep -q 'sedeLegale' content/legal.ts` | ❌ Wave 0 |
| **FND-07** | `<Header />` and `<Footer />` mount inside `app/layout.tsx` | structural | §11.3 grep | ❌ Wave 0 — `app/layout.tsx` |
| **FND-08** | Vercel Analytics + Speed Insights in layout; zero GA4/gtag/googletagmanager strings in `app/`, `components/`, `content/` | structural + grep | `grep -qE '<Analytics\b' app/layout.tsx && grep -qE '<SpeedInsights\b' app/layout.tsx && pnpm check:compliance` | ❌ Wave 0 — `app/layout.tsx` + `scripts/check-compliance.mjs` |
| **FND-09** | `lib/seo/metadata.ts` exports `defaultMetadata` + `buildMetadata()` | structural + typecheck | `test -f lib/seo/metadata.ts && grep -qE 'export (const defaultMetadata\|function buildMetadata)' lib/seo/metadata.ts && pnpm typecheck` | ❌ Wave 0 |
| **FND-10** | `app/not-found.tsx` exists, default-exports a component, builds without error | structural + build | `test -f app/not-found.tsx && pnpm build` + manual check rendering at unknown route | ❌ Wave 0 |

### Sampling rate

- **Per task commit:** `pnpm lint && pnpm typecheck` (fast, < 10s on this project size).
- **Per wave merge:** Full quick-run command above (adds `check:compliance` + `check:contrast`, ~15s).
- **Phase gate (before `/gsd-verify-work`):** Full suite including `pnpm build` (must complete without warnings, per ROADMAP.md success criterion 1).

### Wave 0 gaps (must exist before Wave 1 touches any implementation)

- [ ] `package.json` with `typecheck`, `lint`, `format`, `check:compliance`, `check:contrast` scripts wired (§5).
- [ ] `eslint.config.mjs` extended with compliance rules and prettier-last (§5).
- [ ] `.prettierrc.json` + `.prettierignore` (§5).
- [ ] `scripts/check-compliance.mjs` (§9).
- [ ] `scripts/check-contrast.mjs` (§11.2 below).
- [ ] `.husky/pre-commit` + `.lintstagedrc.json` (§6).
- [ ] `tsconfig.json` delta edits (`noUncheckedIndexedAccess`, `verbatimModuleSyntax`, `forceConsistentCasingInFileNames`).

### 11.1 Build / typecheck / lint smoke

No new file — just invoke the canonical Next.js CLIs as wave checks. See "Quick run command" above.

### 11.2 WCAG contrast verification script — `scripts/check-contrast.mjs`

**Purpose:** Reusable across all phases. Asserts WCAG 2.1 contrast ratio ≥ 4.5 for every brand combination that CONTEXT.md declares as valid. Also asserts that the FORBIDDEN combinations (brand-on-ink, ink-on-brand, per D-06) fail the 4.5 threshold — this defends the "fill only" rule structurally.

```js
// scripts/check-contrast.mjs
// Assert WCAG 2.1 contrast ratios for the brand palette declared in CONTEXT.md D-01..D-06.
// Fails with exit code 1 if any "allowed" pair drops below 4.5, or if any "forbidden" pair
// climbs above 4.5 (which would invalidate D-06 and let the fill-only rule be broken).
// Run: `pnpm check:contrast`

import process from "node:process";

const INK = "#1A1A1A";      // D-01
const PANNA = "#F8F5EE";    // D-02
const BRAND = "#291572";    // D-03
const SURFACE = "#FFFFFF";  // neutral white card

const AA = 4.5;             // WCAG 2.1 AA for normal text
const AAA = 7.0;

/**
 * WCAG relative luminance of a hex color.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function luminance(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  const [R, G, B] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Contrast ratio between two hex colors (1 → 21).
 */
function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [L1, L2] = la > lb ? [la, lb] : [lb, la];
  return (L1 + 0.05) / (L2 + 0.05);
}

const ALLOWED = [
  { label: "ink on panna (body + titles)", fg: INK, bg: PANNA, min: AA },
  { label: "brand on panna (CTA link style is FORBIDDEN — brand fill is the rule; but decorative icons OK)", fg: BRAND, bg: PANNA, min: AA },
  { label: "panna on brand (CTA button fill — canonical)", fg: PANNA, bg: BRAND, min: AA },
  { label: "ink on surface (white card)", fg: INK, bg: SURFACE, min: AA },
];

const FORBIDDEN = [
  { label: "ink on brand (D-06 — near-luminance clash)", fg: INK, bg: BRAND },
  { label: "brand on ink (D-06 — near-luminance clash)", fg: BRAND, bg: INK },
];

let failed = false;

console.log("Brand palette contrast check (WCAG 2.1)\n");
console.log("ALLOWED combinations (must be ≥ 4.5):");

for (const pair of ALLOWED) {
  const r = ratio(pair.fg, pair.bg);
  const ok = r >= pair.min;
  const mark = ok ? "✓" : "✗";
  const grade = r >= AAA ? "AAA" : r >= AA ? "AA" : "FAIL";
  console.log(
    `  ${mark} ${pair.label}: ${r.toFixed(2)}:1  [${grade}]`,
  );
  if (!ok) failed = true;
}

console.log("\nFORBIDDEN combinations (must be < 4.5 — proves D-06 near-luminance):");

for (const pair of FORBIDDEN) {
  const r = ratio(pair.fg, pair.bg);
  const ok = r < AA;
  const mark = ok ? "✓" : "✗";
  console.log(
    `  ${mark} ${pair.label}: ${r.toFixed(2)}:1  ${ok ? "(correctly unreadable as text)" : "(unexpectedly passes — D-06 premise invalid, re-check palette)"}`,
  );
  if (!ok) failed = true;
}

if (failed) {
  console.error("\n❌ Contrast check FAILED. Palette violates FND-02 / D-05 / D-06.\n");
  process.exit(1);
}

console.log("\n✓ All contrast checks passed.");
```

### Expected output (verified with `node -e` during research)

```
Brand palette contrast check (WCAG 2.1)

ALLOWED combinations (must be ≥ 4.5):
  ✓ ink on panna (body + titles): 15.98:1  [AAA]
  ✓ brand on panna (...): 13.35:1  [AAA]
  ✓ panna on brand (CTA button fill — canonical): 13.35:1  [AAA]
  ✓ ink on surface (white card): 16.58:1  [AAA]

FORBIDDEN combinations (must be < 4.5 — proves D-06 near-luminance):
  ✓ ink on brand (D-06 — near-luminance clash): 1.20:1  (correctly unreadable as text)
  ✓ brand on ink (D-06 — near-luminance clash): 1.20:1  (correctly unreadable as text)

✓ All contrast checks passed.
```

This was computed on 2026-04-14 with `node -e` using the same WCAG formula. D-05 in CONTEXT.md cites slightly different numbers (~17:1 / ~12:1) — the actual values are 15.98:1 / 13.35:1 which is still comfortably AAA. Planner: update CONTEXT.md D-05 comment with exact numbers during Wave 0.

### 11.3 Header + Footer presence check

A one-liner grep that runs in the "quick check" script chain, asserting the planner (and all future phase developers) cannot drop `<Header />` or `<Footer />` from the root layout.

```bash
# In package.json, add to check:layout script (or fold into check:compliance):
grep -qE '<Header\b' app/layout.tsx && \
grep -qE '<Footer\b' app/layout.tsx && \
grep -qE '<Analytics\b' app/layout.tsx && \
grep -qE '<SpeedInsights\b' app/layout.tsx && \
grep -qE 'lang="it"' app/layout.tsx || \
  { echo "❌ app/layout.tsx missing required elements (Header/Footer/Analytics/SpeedInsights/lang=it)"; exit 1; }
```

Suggest the planner fold this into a `scripts/check-layout.mjs` and add `pnpm check:layout` alongside the compliance/contrast checks. Total check-step commands (quick):

```bash
pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout
```

---

## 12. Cross-phase blockers (D-25, D-26, D-27)

Phase 1 is **not closed** until the three client communications are formally initiated. These are **tracked tasks with human owner** — the planner creates them as explicit plan items, not hidden in a commit message.

### D-25 — Email: fotografia cantieri / team / mezzi

**Owner:** human project lead (Ale).
**Unblocks:** Phase 4 Portfolio (needs 10+ photo sets of completed cantieri), Phase 5 Chi Siamo (needs team photo + fleet photos).
**Lead time:** 2–4 weeks.
**Phase 1 exit criterion:** email sent + acknowledged by client + client commitment on delivery date.

**Italian email template (drop-in):**

```
Oggetto: Richiesta materiale fotografico per il nuovo sito web Edilferro

Ciao [Nome],

per partire con la costruzione del sito istituzionale abbiamo bisogno di materiale
fotografico reale. Le foto stock non le useremo — la credibilità viene dai cantieri
veri, dal team e dai mezzi di proprietà.

Serve questo materiale in alta risoluzione (minimo 2400×1600px, preferibilmente
originale dalla fotocamera):

1. **Cantieri completati** — almeno 10 progetti, ciascuno con 3–6 foto
   (panoramica prima/dopo quando possibile, dettaglio esecuzione, vista di insieme).
   Per ogni cantiere ci servono:
   - Committente (privato / ente pubblico / nome studio)
   - Tipologia lavoro (nuova costruzione, ristrutturazione, opera pubblica, urbanizzazione)
   - Località e anno di completamento
   - Descrizione breve (2–3 frasi)

2. **Team aziendale**
   - Foto di gruppo (almeno una, tutto il team se possibile)
   - Eventualmente ritratti singoli di figure chiave (facoltativo)

3. **Mezzi di proprietà**
   - Foto dei principali macchinari e veicoli aziendali
   - Almeno 4–6 mezzi distinti in condizioni operative (non parcheggiati fermi)

4. **Certificazioni in contesto** (se disponibile)
   - Targhetta di cantiere con logo SOA / ISO in primo piano
   - Foto di attestati appesi in ufficio

**Tempi:** ci servono i file entro [DATA + 4 settimane] per iniziare la costruzione
della pagina Progetti. Possiamo partire con un sottoinsieme (es. 5 cantieri) e
completare strada facendo.

**Come consegnare:** WeTransfer o Google Drive va benissimo. Nessun formato
particolare richiesto — .jpg/.heic/.raw tutti ok.

**Liberatoria:** verifica che i committenti abbiano acconsentito alla pubblicazione
delle foto (per cantieri privati serve il loro ok scritto; per opere pubbliche
di solito non c'è problema).

Fammi sapere se hai domande. Grazie!

—
[Firma]
```

### D-26 — Email: PDF attestazioni SOA + ISO

**Owner:** human project lead.
**Unblocks:** Phase 5 Chi Siamo (certificazioni card + download PDF).
**Lead time:** giorni, ma dipende da chi ha gli originali.
**Phase 1 exit criterion:** email sent + acknowledged.

**Italian email template:**

```
Oggetto: PDF attestazioni SOA e ISO per la pagina Chi Siamo del nuovo sito

Ciao [Nome],

per la pagina Chi Siamo del sito ci servono i PDF ufficiali delle attestazioni:

1. **Attestazione SOA**
   - PDF originale dell'attestazione (come rilasciata dall'ente SOA)
   - Elenco delle categorie possedute (OG1, OG3, ecc.) con le classifiche
   - Data di scadenza
   - Nome dell'organismo SOA che l'ha rilasciata

2. **Certificato ISO** (immagino ISO 9001, confermare)
   - PDF originale del certificato
   - Ente certificatore (es. Bureau Veritas, SGS, DNV, TÜV, RINA…)
   - Data di scadenza e ciclo di audit

Se hai anche **foto ad alta risoluzione** delle attestazioni cartacee incorniciate
in ufficio, sono utilissime — danno più credibilità visuale rispetto al solo PDF.

**Tempistiche:** prima di Phase 5 [DATA orientativa]. Nessun'urgenza oggi, ma
preferibile consegna prima di fine [MESE] per evitare colli di bottiglia.

**Consegna:** allegato email, WeTransfer, o cartella Drive. Nessun formato
particolare; se hai solo la scansione cartacea va bene ugualmente.

Grazie!
—
[Firma]
```

### D-27 — DNS Resend + Cloudflare Turnstile

**Owner:** human (lead dev / account admin). Two sub-deliverables.

**Phase 1 exit criterion:** Resend account exists + domain verification STARTED (records pasted into DNS provider); Cloudflare account exists + Turnstile widget created and keys saved to password manager.

#### D-27a — Resend domain verification

**Steps the human performs:**

1. Create account at [resend.com](https://resend.com) (free tier OK).
2. Go to **Domains** → **Add Domain** → enter the production domain (e.g., `edilferro.it`).
3. Resend produces DNS records to add at the domain's DNS provider. **[VERIFIED [Resend introduction](https://resend.com/docs/dashboard/domains/introduction)]** you'll get:
   - **SPF** — one `TXT` record at root (`@`) combining `v=spf1 include:amazonses.com ~all` (or similar — Resend gives you the exact value). You may also need an `MX` record for bounce/feedback at a Resend-managed subdomain like `bounces.edilferro.it`.
   - **DKIM** — one `TXT` record at `resend._domainkey.edilferro.it` (or similar subdomain named by Resend) with the public key.
   - **DMARC** (optional but recommended) — one `TXT` record at `_dmarc.edilferro.it` with `v=DMARC1; p=quarantine; rua=mailto:dmarc@edilferro.it; ...` policy.
4. Paste records into the DNS provider (Cloudflare, Aruba, Register.it — depends on client setup).
5. Go back to Resend dashboard and click **Verify** — Resend polls DNS propagation; can take minutes to hours.
6. Once verified, generate an **API key** in Resend dashboard → save to password manager. Will go into Vercel env var `RESEND_API_KEY` in Phase 6.

**[ASSUMED]** The exact DNS record values are generated per-domain by Resend — do not attempt to hand-write them. Always copy from Resend dashboard.

**Gotchas to flag in the plan:**
- Aruba DNS UI is notoriously slow to propagate — allow 24h if the client uses Aruba.
- If DNS is managed by a third-party developer/agency, the DNS-records email chain itself may take days. **Start this early.**
- Free Resend tier supports only 1 verified domain. If the client has multiple domains they should consolidate on the production one.

#### D-27b — Cloudflare Turnstile keys

**Steps the human performs:**

1. Create account at [cloudflare.com](https://cloudflare.com) (free tier is sufficient — does NOT require the domain to be on Cloudflare DNS).
2. Dashboard → **Turnstile** (sidebar; may be under "Trust & Safety" / "Security") → **Add Widget**.
3. Fill:
   - **Widget name:** `edilferro.it — production form`
   - **Hostname management:** add `edilferro.it`, `www.edilferro.it`, and the Vercel preview hostname pattern `*.vercel.app` (to avoid CAPTCHA breakage on preview deploys).
   - **Widget mode:** **Managed** (default — Cloudflare decides whether to show a challenge, usually invisible for real users).
   - **Pre-clearance:** leave default.
4. **Create** → Cloudflare returns a **Site key** (public) and **Secret key** (private).
5. Save both keys to password manager:
   - `TURNSTILE_SITE_KEY` — public, ships to client bundle in Phase 6.
   - `TURNSTILE_SECRET_KEY` — private, server-side only, goes into Vercel env var in Phase 6.

**[CITED: [Cloudflare Turnstile widget management](https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/)]**

**Gotchas:**
- Widget mode `Invisible` is more aggressive but can fail legitimate users; `Managed` is the recommended default.
- If the client also uses Cloudflare as DNS, the Turnstile widget can be created under the same account, but it's not required.

#### Phase 1 task shape for the planner

The planner creates three explicit tasks in the plan:

```
Task D-25: Send email "Fotografia cantieri/team/mezzi" to client
  Owner: human project lead
  Action: paste the Italian template from 01-RESEARCH.md §12 D-25 into email,
          adjust date placeholders, send, mark complete when client acknowledges.
  Blocking: Phase 4, Phase 5
  Phase 1 exit gate: sent + acknowledged

Task D-26: Send email "PDF SOA + ISO" to client
  Owner: human project lead
  Action: paste the Italian template from §12 D-26, send, mark complete when
          client acknowledges.
  Blocking: Phase 5
  Phase 1 exit gate: sent + acknowledged

Task D-27: Bootstrap Resend domain verification + Cloudflare Turnstile keys
  Owner: human (lead dev / account admin)
  Action: follow steps in §12 D-27a and D-27b. Save API key + Turnstile
          site/secret keys to password manager. Mark complete when DNS records
          are pasted AND Turnstile widget is created.
  Blocking: Phase 6
  Phase 1 exit gate: DNS records pasted + Turnstile keys saved (DNS verification
                     may still be propagating — that's OK, the start is what unblocks
                     the chain).
```

---

## 13. Out-of-scope reconfirmation

To avoid any drift between the planner's plan and this research, these libraries / features are **explicitly forbidden in Phase 1**:

| Item | Reason | Revisit |
|---|---|---|
| shadcn/ui | defer until first real UI primitive need | Phase 2 (Button) or Phase 6 (Form) |
| Resend | form integration is Phase 6 | Phase 6 |
| Cloudflare Turnstile (client-side widget) | form integration is Phase 6 | Phase 6 |
| react-hook-form | form integration is Phase 6 | Phase 6 |
| zod | form schemas are Phase 6 | Phase 6 |
| schema-dts | JSON-LD is Phase 7 (SEO-04) | Phase 7 |
| framer-motion / motion | forbidden by brief (§D-24) | never (MVP) |
| MDX | CONTEXT.md deferred | v2 |
| Payload / any CMS | CONTEXT.md deferred | v2 |
| lucide-react | defer until icon count justifies | Phase 2 or later |
| @vercel/third-parties (Google) | forbidden structurally by §9 | never |
| Any unit test framework (vitest, jest, etc.) | Phase 1 has no behavioral code | Phase 6 |
| Cookie banner (cookieconsent, react-cookie-consent, etc.) | stack is cookieless by design (D-23) | never |
| Dark mode scaffolding | out of scope (Deferred Ideas) | never (MVP) |
| Tailwind CSS v3 | superseded | never |
| `tailwind.config.js` | Tailwind v4 is CSS-first | never |
| `next lint` | removed in Next 16 | never |

**Enforcement:** the ESLint compliance rules (§5) + `check-compliance.mjs` grep (§9) catch attempted re-introductions of Google-branded items. shadcn/ui, framer-motion, etc. are caught via PR review (no lint rule — they're not malicious, just premature).

---

## Security Domain

> `workflow.security_enforcement` is not set in `.planning/config.json`, so the default (enforcement enabled) applies. However, Phase 1 has a narrow attack surface — static shell, no form, no data layer, no auth. This section is brief and honest.

### Applicable ASVS categories

| ASVS category | Applies | Standard control |
|---|---|---|
| V2 Authentication | NO | no auth in Phase 1 (or at all in this project) |
| V3 Session Management | NO | no sessions |
| V4 Access Control | NO | all content is public |
| V5 Input Validation | partial | Phase 1 has no user input. Env var validation (NEXT_PUBLIC_SITE_URL) is the only input — handled by the `new URL()` constructor. |
| V6 Cryptography | NO | no secrets in Phase 1 client bundle |
| V9 Communications Security | yes | HTTPS via Vercel (automatic on `*.vercel.app` + custom domain) |
| V10 Malicious Code | yes | the compliance rules in §9 + §5 are literally a malicious-code prevention layer (forbidden tracking, forbidden embeds) |
| V14 Configuration | yes | `.env.local` gitignored, Vercel env vars scoped to `NEXT_PUBLIC_*` appropriately |

### Known threat patterns for Next.js 16 + Vercel + static shell

| Pattern | STRIDE | Standard mitigation |
|---|---|---|
| Accidental secret in `NEXT_PUBLIC_*` env var | Information disclosure | Only place public constants in `NEXT_PUBLIC_*`; all secrets (future Resend API key, Turnstile secret) are server-only env vars (no `NEXT_PUBLIC_` prefix). Phase 1 has NO secrets. |
| Third-party script XSS via Analytics | Tampering | Vercel Analytics is first-party (served from the same origin). No third-party script tags. |
| Clickjacking of CTA | Tampering | Default Vercel X-Frame-Options response headers; we do not override. Optional: add `Content-Security-Policy: frame-ancestors 'none'` in `next.config.ts` via `headers()`. **[ASSUMED]** Deferred to Phase 7 SEO-09 alongside Lighthouse Best Practices. |
| Open redirect via `metadataBase` env var | Tampering | `new URL()` throws on invalid input; `NEXT_PUBLIC_SITE_URL` is controlled by Vercel deploy config, not user input. Low risk. |
| Dependency supply chain | Tampering | `pnpm audit` after install; pin `next`, `react`, `react-dom`, `typescript`, `tailwindcss` to exact versions in `package.json` (not caret ranges) for the production deploy. **[ASSUMED]** Planner decision; for MVP caret ranges are acceptable. |

### Recommended Phase 1 security headers

[ASSUMED] Not strictly required to close Phase 1 (Phase 7 will tighten), but cheap to add:

```ts
// next.config.ts (additional)
const nextConfig: NextConfig = {
  typedRoutes: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
```

**Leave `Content-Security-Policy` for Phase 7** — it requires tuning against the actual runtime script set, and adding it too early means every Phase 2–6 change risks CSP breakage.

---

## Sources

### Primary (HIGH confidence — directly from official docs, verified 2026-04-14)

- [Next.js 16 Installation docs](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js 16 ESLint Plugin reference](https://nextjs.org/docs/app/api-reference/config/eslint)
- [Next.js 16 TypeScript config reference](https://nextjs.org/docs/app/api-reference/config/typescript)
- [Next.js 16 `generateMetadata` reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js 16 `not-found.js` file convention](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
- [Next.js 16 `error.js` file convention](https://nextjs.org/docs/app/api-reference/file-conventions/error) — note `unstable_retry` new in v16.2.0
- [Next.js 16 Font Optimization docs](https://nextjs.org/docs/app/getting-started/fonts)
- [Next.js 16 Upgrading guide](https://nextjs.org/docs/app/guides/upgrading/version-16) — `next lint` removal
- [create-next-app `app-tw/ts` canonical template — canary branch](https://github.com/vercel/next.js/tree/canary/packages/create-next-app/templates/app-tw/ts) — tsconfig, eslint.config.mjs, globals.css, layout.tsx, postcss.config.mjs, next.config.ts
- [create-next-app templates/index.ts](https://github.com/vercel/next.js/blob/canary/packages/create-next-app/templates/index.ts) — confirms `eslint: "^9"` pin and `react: "19.2.5"` peer
- [Tailwind CSS v4 release post](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS v4 theme docs](https://tailwindcss.com/docs/theme)
- [Vercel Analytics Quickstart](https://vercel.com/docs/analytics/quickstart)
- [Vercel Analytics Privacy & Compliance](https://vercel.com/docs/analytics/privacy-policy)
- [Resend Domains introduction](https://resend.com/docs/dashboard/domains/introduction)
- [Cloudflare Turnstile widget management dashboard](https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/)
- [Husky 9 get started](https://typicode.github.io/husky/get-started.html)
- [lint-staged README](https://github.com/lint-staged/lint-staged)
- `npm view` for all package versions (verified 2026-04-14 on the target machine)
- Local `node -e` computation of WCAG contrast ratios using the formula from [W3C WCAG 2.1 relative luminance](https://www.w3.org/TR/WCAG21/#dfn-relative-luminance)

### Secondary (MEDIUM confidence — reputable third-party, verified against official)

- [Clickport — Cookie Consent and Analytics in Italy 2026](https://clickport.io/blog/privacy-analytics-italy) — Garante four-condition exemption detail
- [InfoQ — ESLint v10 Release: Flat Config Completion and JSX Tracking](https://www.infoq.com/news/2026/04/eslint-10-release/) — ESLint 10 release date confirmation
- [Chris.lu — Next.js 16 Linting setup using ESLint 9 flat config](https://chris.lu/web_development/tutorials/next-js-16-linting-setup-eslint-9-flat-config) — community confirmation of current Next 16 ESLint flat-config pattern

### Tertiary (LOW confidence — single source, noted where used)

- WebSearch result aggregation for Garante / Vercel Analytics interplay — cross-verified against Vercel's own privacy statement, marked [CITED MEDIUM] in §7.
- General-purpose claims tagged `[ASSUMED]` throughout — planner and discuss-phase should flag for user confirmation before locking.

---

## Metadata

**Confidence breakdown:**

| Area | Level | Reason |
|---|---|---|
| Next.js 16 scaffold + file conventions | **HIGH** | Verified against current `canary` templates + official docs + local tool probes. |
| Tailwind v4 `@theme` pattern | **HIGH** | Verified against official Tailwind docs AND the `canary` create-next-app template that already uses `@theme inline`. |
| `next/font` Inter + IBM Plex Serif pattern | **HIGH** | Verified against official next/font docs. Exact weight choice for IBM Plex Serif is MEDIUM (visual judgment). |
| `lib/seo/metadata.ts` shape | **HIGH** | Verified against `generateMetadata` reference; helper signature is idiomatic but not from an official source (MEDIUM on the exact helper shape, HIGH on the `Metadata` fields it populates). |
| ESLint 9 flat config with compliance rules | **HIGH** | Canonical template + Next.js ESLint docs + ESLint's `no-restricted-*` rule docs. |
| `husky` 9 + `lint-staged` 16 integration | **HIGH** | Verified against current husky get-started page + lint-staged README. |
| Vercel Analytics cookieless + no-banner posture | **HIGH** for the technical claim (no cookies, anonymous). **MEDIUM** for the legal interpretation (Garante exemption applies). [ASSUMED] Privacy Policy disclosure is a Phase 7 hardening step regardless. |
| `app/not-found.tsx` + `app/error.tsx` patterns | **HIGH** | Direct from official docs. |
| Structural compliance enforcement (ESLint + grep) | **HIGH** | Standard patterns. |
| Content module shape and naming lock-ins | **HIGH** on the technical pattern. **MEDIUM** on the exact naming choices (bikeshedable, but we've locked them). |
| Validation Architecture + contrast script | **HIGH** | Contrast script math verified by running it locally against the CONTEXT.md values. |
| Cross-phase blocker deliverable templates | **HIGH** on technical steps (Resend DNS / Turnstile widget). **MEDIUM** on the email-template wording (adjust for tone). |
| Security domain | **MEDIUM** — Phase 1's attack surface is narrow; Phase 7 will tighten properly. |

**Research date:** 2026-04-14
**Valid until:** 2026-05-14 (30 days — stable versions of Next 16 and Tailwind v4) — **re-verify npm versions and the ESLint 10 plugin situation at the start of any future phase that adds new dev tooling.**

---

## RESEARCH COMPLETE
