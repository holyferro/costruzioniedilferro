---
phase: 01-fondamenta
plan: 03
type: execute
wave: 2
depends_on:
  - 01-02
files_modified:
  - lib/seo/metadata.ts
  - app/not-found.tsx
  - app/error.tsx
  - app/layout.tsx
autonomous: true
requirements:
  - FND-09
  - FND-10
must_haves:
  truths:
    - "`lib/seo/metadata.ts` exists and exports `defaultMetadata: Metadata` plus `function buildMetadata(overrides?: Metadata): Metadata`"
    - "`defaultMetadata.metadataBase` reads from `process.env.NEXT_PUBLIC_SITE_URL` with `http://localhost:3000` fallback"
    - "`defaultMetadata.title.template` equals `` `%s — ${siteContent.brand.name}` `` (composed per-segment title)"
    - "`defaultMetadata.openGraph.locale` equals `\"it_IT\"` (underscore, NOT hyphen — RESEARCH §4 gotcha)"
    - "`defaultMetadata.referrer` equals `\"origin-when-cross-origin\"` and `robots.index` is `true`"
    - "`buildMetadata()` shallow-merges overrides AND explicitly merges nested `openGraph`, `twitter`, `alternates` to avoid losing defaults"
    - "`app/not-found.tsx` exists, is a Server Component, default-exports `function NotFound()`, and imports `notFoundContent` from `@/content/site`"
    - "`app/not-found.tsx` renders `<h1 className=\"font-serif text-h1 text-ink\">{notFoundContent.title}</h1>` and both Home (`href=\"/\"`) and Contatti (`href=\"/contatti\"`) CTAs reading `notFoundContent.ctaHomeLabel` and `notFoundContent.ctaContactLabel`"
    - "`app/error.tsx` begins with `\"use client\"` on line 1 — the ONE legitimate client island in Phase 1 (forced by Next.js, per CONTEXT.md D-17 exception and RESEARCH §8)"
    - "`app/error.tsx` uses the `unstable_retry` prop (Next 16.2+) — the deprecated `reset` prop is NOT used anywhere"
    - "`app/error.tsx` imports `errorContent` from `@/content/site` and renders `errorContent.title` as a serif H1"
    - "`app/layout.tsx` imports `defaultMetadata` from `@/lib/seo/metadata` and exports `export const metadata: Metadata = defaultMetadata;` — the inline placeholder literal written by Plan 01-02 is REMOVED"
    - "`.env.local` contains `NEXT_PUBLIC_SITE_URL=http://localhost:3000` and `.env.production` contains the production URL placeholder (files already exist from Plan 01-01; 01-03 only verifies them)"
    - "`pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout && pnpm build` all exit 0"
    - "Running `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/xxx-does-not-exist` against `pnpm dev` returns `404` AND the response body contains `Pagina non trovata` + `Torna alla home`"
  artifacts:
    - path: "lib/seo/metadata.ts"
      provides: "Shared Next.js Metadata defaults and a per-page buildMetadata() helper that preserves nested openGraph/twitter/alternates on merge"
      exports:
        - defaultMetadata
        - buildMetadata
      contains: "export const defaultMetadata: Metadata"
    - path: "app/not-found.tsx"
      provides: "Institutional Server Component 404 page rendering inside the global layout (header + footer + fonts inherited). Reads copy from notFoundContent."
      exports:
        - NotFound
      contains: "export default function NotFound"
    - path: "app/error.tsx"
      provides: "Route-level Client Component error boundary with retry button and home link; uses Next 16.2 `unstable_retry` prop. Reads copy from errorContent."
      exports:
        - Error
      contains: "\"use client\""
    - path: "app/layout.tsx"
      provides: "Final Phase 1 root layout, now importing defaultMetadata from lib/seo/metadata (replacing the Plan 01-02 inline placeholder)"
      contains: "import { defaultMetadata } from \"@/lib/seo/metadata\""
  key_links:
    - from: "app/layout.tsx"
      to: "@/lib/seo/metadata"
      via: "import { defaultMetadata } + export const metadata = defaultMetadata"
      pattern: "from \"@/lib/seo/metadata\""
    - from: "lib/seo/metadata.ts"
      to: "@/content/site"
      via: "import { siteContent } reading brand.name and brand.tagline for title template + description"
      pattern: "siteContent\\.brand"
    - from: "app/not-found.tsx"
      to: "@/content/site"
      via: "import { notFoundContent } — title, body, ctaHomeLabel, ctaContactLabel"
      pattern: "notFoundContent\\.(title|body|ctaHomeLabel|ctaContactLabel)"
    - from: "app/error.tsx"
      to: "@/content/site"
      via: "import { errorContent } — title, body, ctaRetryLabel, ctaHomeLabel"
      pattern: "errorContent\\.(title|body|ctaRetryLabel|ctaHomeLabel)"
    - from: "lib/seo/metadata.ts"
      to: "process.env.NEXT_PUBLIC_SITE_URL"
      via: "const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? \"http://localhost:3000\""
      pattern: "NEXT_PUBLIC_SITE_URL"
---

<objective>
Wave 2 (code track) — close the remaining Phase 1 FND coverage gap: FND-09 (the shared `lib/seo/metadata.ts` helper consumed by every future `generateMetadata` call) and FND-10 (the institutional custom 404). While we're in `app/`, also ship `app/error.tsx` — the route-level error boundary — because a real 404/error UX needs both and 01-02 already primed `errorContent` in `content/site.ts`. Finally, execute the handoff written at line 1099 of `01-02-design-system-and-layout-PLAN.md`: replace the inline `metadata: Metadata` placeholder in `app/layout.tsx` with `import { defaultMetadata } from "@/lib/seo/metadata"` so there is one single source of truth for metadata across the whole app.

Purpose: FND-09 unblocks every future page's metadata (Phase 2–6 will call `buildMetadata({ title, description, alternates: { canonical } })`). FND-10 closes ROADMAP Phase 1 Success Criterion 5 ("La pagina 404 personalizzata è raggiungibile e include link a Home e Contatti"). `app/error.tsx` hardens the runtime shell so a child-component throw does not take down the whole app. The layout rewire consolidates metadata definition to one file.

Output: Four files written (one new helper, two new `app/` route files, one rewired existing layout). The full Wave 0 + Wave 1 + Wave 2 rail stays green: `pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout && pnpm build`. On `pnpm dev`, an unknown route returns HTTP 404 with Italian institutional copy; an intentionally thrown error renders the retry UI. No new dependencies added. No JSON-LD (Phase 7). No `app/global-error.tsx` (RESEARCH §8 explicitly: skip).
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
@.planning/phases/01-fondamenta/01-01-SUMMARY.md
@.planning/phases/01-fondamenta/01-02-SUMMARY.md
@CLAUDE.md
</context>

<interfaces>
<!-- Contracts this plan consumes (from Plan 01-01 and 01-02). Executor should rely on these directly — no codebase spelunking needed. -->

**From Plan 01-02 — `content/site.ts`:**
```ts
// Already shipped by 01-02. Executor confirms via `grep -q 'export const notFoundContent' content/site.ts`.
export const siteContent: SiteContent; // contains siteContent.brand.name + siteContent.brand.tagline
export const notFoundContent: {
  readonly title: string;            // "Pagina non trovata"
  readonly body: string;             // Italian paragraph
  readonly ctaHomeLabel: string;     // "Torna alla home"
  readonly ctaContactLabel: string;  // "Contattaci"
} = /* as const */;
export const errorContent: {
  readonly title: string;            // "Qualcosa è andato storto"
  readonly body: string;             // Italian paragraph
  readonly ctaRetryLabel: string;    // "Riprova"
  readonly ctaHomeLabel: string;     // "Torna alla home"
} = /* as const */;
```

**From Plan 01-02 — `app/layout.tsx` (current state after 01-02, the part this plan edits):**
```tsx
// app/layout.tsx (state AFTER 01-02, BEFORE 01-03 edits)
import "./globals.css";
import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteContent } from "@/content/site";

// Plan 01-03 replaces the inline metadata object with a
// `defaultMetadata` import from `@/lib/seo/metadata`. For now we ship a
// minimal inline `Metadata` object so the build is green without lib/seo/metadata.ts.
export const metadata: Metadata = {
  title: {
    default: siteContent.brand.name,
    template: `%s — ${siteContent.brand.name}`,
  },
  description: siteContent.brand.tagline,
};
// ... (next/font declarations + RootLayout() unchanged)
```

**From Plan 01-02 — `app/globals.css`:**
- Tailwind v4 `@theme inline` defines `--color-ink`, `--color-panna`, `--color-brand` and `--text-h1` (clamp fluid), so classes `font-serif`, `text-h1`, `text-ink`, `bg-brand`, `text-panna` all resolve at build time.

**From Plan 01-01 — `.env.local` and `.env.production`:**
```
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# .env.production
NEXT_PUBLIC_SITE_URL=https://edilferro.it
```

**From Plan 01-01 — compliance rail:**
- `pnpm check:compliance` scans `app/`, `components/`, `content/`, `lib/`, `scripts/` for forbidden strings (`gtag`, `_ga`, `googletagmanager`, `fonts.googleapis.com`, `google.com/maps`, `recaptcha`, `<iframe`). `lib/seo/metadata.ts` lives under `lib/` so it IS scanned — do not introduce any forbidden strings.
- `pnpm check:layout` asserts `<Header`, `<Footer`, `<Analytics`, `<SpeedInsights`, `lang="it"` all present in `app/layout.tsx`. The layout rewire in Task 4 must preserve every one of these.

**Next.js 16 — `error.tsx` convention (RESEARCH §8):**
- File MUST begin with `"use client"` on line 1. This is the ONE exception to the "no client islands in Phase 1" rule and is forced by Next.js — documented in CONTEXT.md §D-17 and RESEARCH §8.
- Props signature: `{ error: Error & { digest?: string }, unstable_retry: () => void }`. Next 16.2 soft-deprecated `reset` in favor of `unstable_retry` — use `unstable_retry`, never `reset`.
- Cannot export `metadata` (title inherits from layout template).
- Do NOT create `app/global-error.tsx` in Phase 1 (RESEARCH §8: it replaces the root layout and loses fonts/Analytics — revisit in Phase 7 only).

**Next.js 16 — `not-found.tsx` convention (RESEARCH §8):**
- Renders INSIDE `app/layout.tsx`, so Header, Footer, fonts, Analytics all inherit automatically.
- Server Component by default (can be `async`) — DO NOT add `"use client"`.
- Next.js automatically injects `<meta name="robots" content="noindex" />` on 404 responses.
- Cannot export `generateMetadata`; title is composed from the layout `title.template`.
</interfaces>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: Create lib/seo/metadata.ts — defaultMetadata + buildMetadata() helper (FND-09)</name>
  <behavior>
- `lib/seo/metadata.ts` exists, compiles under `tsc --noEmit --strict --noUncheckedIndexedAccess`, and exports both `defaultMetadata: Metadata` (const) and `buildMetadata(overrides?: Metadata): Metadata` (function).
- `defaultMetadata.metadataBase` is a `URL` instance constructed from `process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"`. No hard-coded production URL in the source.
- `defaultMetadata.title` is `{ default, template }` using `siteContent.brand.name` — NOT `{ absolute }`, so child segments can compose their own titles.
- `defaultMetadata.openGraph.locale === "it_IT"` (BCP47 + region with UNDERSCORE, per [OG protocol](https://ogp.me/) and the RESEARCH §4 gotcha — Next.js throws a schema warning if you write `it-IT`).
- `buildMetadata()` called with no arguments returns something deep-equal to `defaultMetadata`.
- `buildMetadata({ title: "Servizi", openGraph: { url: "/servizi" } })` returns a shape where `title === "Servizi"`, `openGraph.url === "/servizi"`, AND `openGraph.locale === "it_IT"` is preserved (i.e. the nested merge in `buildMetadata` actually runs — this is the critical anti-regression check for RESEARCH §4 "shallow merge" gotcha).
- The file contains NO forbidden strings (`gtag`, `_ga`, `googletagmanager`, `fonts.googleapis.com`, `google.com/maps`, `recaptcha`, `<iframe`).
  </behavior>
  <read_first>
    - .planning/phases/01-fondamenta/01-RESEARCH.md §4 "lib/seo/metadata.ts helper (FND-09)" — lines 545-676. The FULL canonical source for the helper lives there; copy it verbatim (including the JSDoc comments, the `SITE_URL` fallback pattern, the `buildMetadata` explicit nested merge). Pay special attention to:
      - The `metadataBase` derivation (lines 572-575)
      - The `title.template` value (line 584)
      - The `openGraph.locale = "it_IT"` rule (line 595) — underscore, NOT hyphen
      - The shallow-merge gotcha table (line 668) — this is why `buildMetadata` manually merges `openGraph`, `twitter`, `alternates`
    - .planning/phases/01-fondamenta/01-CONTEXT.md §"Claude's Discretion" bullet "Helper `lib/seo/metadata.ts` shape (FND-09)" — minimum surface: `title` template + `description` + `openGraph` base + `twitter` base + `canonical` + `metadataBase`. JSON-LD integration is Phase 7.
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-21 "Analytics" — confirms no gtag/GA4 strings anywhere; the metadata helper must not reference any Google product.
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-22 "Font loading" — irrelevant to this helper but confirms we never route-reference Google Fonts CDN (the compliance rail would flag it).
    - content/site.ts (current state, written by Plan 01-02) — confirm that `siteContent.brand.name` and `siteContent.brand.tagline` exist with the expected shape. Grep: `grep -n 'brand' content/site.ts`.
    - CLAUDE.md §"Code Style" — prefer named exports, no `any`.
    - .planning/phases/01-fondamenta/01-VALIDATION.md row "FND-09" — locked automated command is `test -f lib/seo/metadata.ts && grep -qE 'export (const defaultMetadata|function buildMetadata)' lib/seo/metadata.ts && pnpm typecheck`.
  </read_first>
  <files>
    lib/seo/metadata.ts
  </files>
  <action>
Step 1 — Confirm the directory path. `lib/seo/` does NOT yet exist (Plan 01-02 only created `lib/utils/cn.ts`). Create `lib/seo/` implicitly by writing the file.

Step 2 — Create `lib/seo/metadata.ts` with EXACTLY this content (copied verbatim from RESEARCH §4 lines 563-637 — do NOT paraphrase, do NOT omit imports, do NOT drop the JSDoc comments):

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

Step 3 — CRITICAL gotcha self-check BEFORE saving:
- `openGraph.locale` MUST be `"it_IT"` with an underscore. Next.js throws a schema warning at build for `"it-IT"`.
- `process.env.NEXT_PUBLIC_SITE_URL` MUST use the nullish coalescing fallback `?? "http://localhost:3000"`. Do NOT use `||` (empty string would fall through unexpectedly).
- `metadataBase` MUST be a `URL` instance (not a plain string). The `Metadata` type wants `URL | null`.
- `referrer` MUST be `"origin-when-cross-origin"` (string literal, Next.js ReferrerEnum).
- NO JSON-LD here (Phase 7). NO `schema-dts` imports.
- NO Google Analytics references — this file lives under `lib/` so `scripts/check-compliance.mjs` scans it.
- Use `import type { Metadata }` — the 01-01 tsconfig has `verbatimModuleSyntax: true`, so type imports MUST be prefixed with `type`.

Step 4 — Run the validation chain for this task:

```bash
pnpm typecheck
pnpm lint
pnpm check:compliance
```

All three must exit 0. If `pnpm check:compliance` flags anything in `lib/seo/metadata.ts`, something was copied wrong — re-read RESEARCH §4. If `pnpm typecheck` fails with `Cannot find module '@/content/site'` it means Plan 01-02's `content/site.ts` is missing (unexpected — rerun Plan 01-02 verification first).
  </action>
  <verify>
    <automated>
test -f lib/seo/metadata.ts && \
grep -q 'export const defaultMetadata' lib/seo/metadata.ts && \
grep -q 'export function buildMetadata' lib/seo/metadata.ts && \
grep -q '"it_IT"' lib/seo/metadata.ts && \
grep -q 'NEXT_PUBLIC_SITE_URL' lib/seo/metadata.ts && \
grep -q 'new URL(SITE_URL)' lib/seo/metadata.ts && \
grep -q 'metadataBase' lib/seo/metadata.ts && \
grep -q 'origin-when-cross-origin' lib/seo/metadata.ts && \
grep -q 'import type { Metadata }' lib/seo/metadata.ts && \
grep -q 'from "@/content/site"' lib/seo/metadata.ts && \
! grep -q '"it-IT"' lib/seo/metadata.ts && \
! grep -q 'gtag' lib/seo/metadata.ts && \
! grep -q 'googletagmanager' lib/seo/metadata.ts && \
pnpm typecheck && \
pnpm lint && \
pnpm check:compliance
    </automated>
  </verify>
  <done>
`lib/seo/metadata.ts` exists with verbatim RESEARCH §4 content. `defaultMetadata` const and `buildMetadata` function both exported. `openGraph.locale` is `"it_IT"` (underscore). `metadataBase` derives from `NEXT_PUBLIC_SITE_URL` with localhost fallback. `pnpm typecheck`, `pnpm lint`, `pnpm check:compliance` all pass. FND-09 satisfied.
  </done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Create app/not-found.tsx — institutional custom 404 (FND-10)</name>
  <behavior>
- `app/not-found.tsx` exists and is a Server Component (no `"use client"` directive on line 1 or anywhere else).
- Default-exports `function NotFound()` (not an arrow, not async, matching RESEARCH §8 form).
- Imports `notFoundContent` from `@/content/site` and uses FOUR keys from it: `title`, `body`, `ctaHomeLabel`, `ctaContactLabel`.
- Renders `<h1 className="font-serif text-h1 text-ink">{notFoundContent.title}</h1>` (D-08 rule: serif for every page H1).
- Contains `<Link href="/">` with label `{notFoundContent.ctaHomeLabel}` AND `<Link href="/contatti">` with label `{notFoundContent.ctaContactLabel}` (ROADMAP Phase 1 Success Criterion 5: "include link a Home e Contatti").
- Contains no hardcoded Italian strings outside of an obvious "404" eyebrow label — all copy flows from `content/site.ts`.
- Contains no references to forbidden patterns (`gtag`, `googletagmanager`, `google.com/maps`, `recaptcha`, `<iframe`).
- `pnpm build` completes without error (which exercises the 404 compilation path).
- On `pnpm dev`, visiting `http://localhost:3000/xxx-does-not-exist` returns HTTP 404 with a response body containing both `Pagina non trovata` and `Torna alla home` (verified in Task 5 end-to-end).
  </behavior>
  <read_first>
    - .planning/phases/01-fondamenta/01-RESEARCH.md §8 "app/not-found.tsx — custom 404 (FND-10)" — lines 997-1038. Copy the JSX shell verbatim.
    - .planning/phases/01-fondamenta/01-CONTEXT.md §"Claude's Discretion" bullet "404 personalizzata (FND-10)" — style minimale, titolo grande serif "Pagina non trovata", body breve, due CTA "Torna alla home" + "Contattaci", niente illustrazioni o foto.
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-08 "Uso del serif limitato" — IBM Plex Serif only on H1 of every internal page. The 404 H1 qualifies.
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-06 "CRITICO" — the blu brand `#291572` as `bg-brand` with `text-panna` INSIDE the pill IS the correct usage (fill-only rule). Do not use `text-brand` next to `text-ink`.
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-17 — the 404 is a Server Component (no client island). Only `app/error.tsx` is a legit client island in Phase 1.
    - content/site.ts (current state after Plan 01-02) — confirm `notFoundContent` export exists. Grep: `grep -A 6 'export const notFoundContent' content/site.ts` should show `title: "Pagina non trovata"`, `body: ...`, `ctaHomeLabel: "Torna alla home"`, `ctaContactLabel: "Contattaci"`.
    - components/layout/Header.tsx + components/layout/Footer.tsx (current state after Plan 01-02) — understand that the 404 renders INSIDE the layout shell, so Header + Footer come automatically. Do NOT re-import them.
    - .planning/phases/01-fondamenta/01-VALIDATION.md row "FND-10" — locked automated command is `test -f app/not-found.tsx && pnpm build` + manual check at an unknown route.
    - .planning/phases/01-fondamenta/01-VALIDATION.md §"Manual-Only Verifications" first row — the dev-server 404 check (now scripted in Task 5).
  </read_first>
  <files>
    app/not-found.tsx
  </files>
  <action>
Step 1 — Create `app/not-found.tsx` with EXACTLY this content (from RESEARCH §8 lines 1006-1037, verbatim — the only modification is the 404 eyebrow label, which is permitted as a structural digit):

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

Step 2 — Self-check BEFORE saving:
- NO `"use client"` anywhere. This is a Server Component (D-17).
- `<h1>` uses `font-serif text-h1 text-ink` (D-08 serif rule + D-01 ink token).
- Home pill uses `bg-brand text-panna` (D-06 fill-only rule — brand as fill, panna text inside).
- Contatti pill uses `border border-ink/20 text-ink` (secondary ghost button, no brand conflict).
- No hardcoded Italian strings inside JSX children — only `notFoundContent.*` references plus the literal `"404"` (which is a universally understood status code, not copy).
- `href="/contatti"` is a literal — the `/contatti` route does NOT yet exist (Phase 6 creates it). This will cause a typedRoutes warning IF `typedRoutes: true` in `next.config.ts` is active. If that breaks `pnpm build`, fall back to using an object literal cast: change `href="/contatti"` to `href={"/contatti" as Route}` and add `import type { Route } from "next"` — but try the literal first because `typedRoutes` can be permissive during dev. Per 01-02 handoff, `typedRoutes` may have been disabled; check 01-02 SUMMARY first. If disabled, the literal string works unchanged.
- No iframe, no script tag, no google anything.

Step 3 — Do NOT add `app/global-error.tsx` alongside this. RESEARCH §8 explicitly says: skip it in Phase 1. It is not part of this plan's `files_modified`.

Step 4 — Run validation for this task:

```bash
pnpm typecheck
pnpm lint
pnpm check:compliance
pnpm check:layout   # must still pass — app/layout.tsx is untouched by this task
pnpm build
```

`pnpm build` exercises the 404 compilation (Next.js 16 builds `app/not-found.tsx` as part of the standard output). If build fails on `text-h1`, it means Plan 01-02 did NOT ship `text-h1` as a Tailwind utility — verify `app/globals.css` has `--text-h1: clamp(...)` inside `@theme inline`, and if the utility generation didn't resolve, fall back to `text-[length:var(--text-h1)] leading-[var(--text-h1--line-height)]` (as 01-02 Task 3 Step 3 documents).
  </action>
  <verify>
    <automated>
test -f app/not-found.tsx && \
! grep -q '"use client"' app/not-found.tsx && \
grep -q 'export default function NotFound' app/not-found.tsx && \
grep -q 'from "@/content/site"' app/not-found.tsx && \
grep -q 'notFoundContent.title' app/not-found.tsx && \
grep -q 'notFoundContent.body' app/not-found.tsx && \
grep -q 'notFoundContent.ctaHomeLabel' app/not-found.tsx && \
grep -q 'notFoundContent.ctaContactLabel' app/not-found.tsx && \
grep -q 'font-serif text-h1' app/not-found.tsx && \
grep -q 'href="/"' app/not-found.tsx && \
grep -q 'href="/contatti"' app/not-found.tsx && \
grep -q 'bg-brand' app/not-found.tsx && \
grep -q 'text-panna' app/not-found.tsx && \
! grep -q 'gtag' app/not-found.tsx && \
! grep -q '<iframe' app/not-found.tsx && \
pnpm typecheck && \
pnpm lint && \
pnpm check:compliance && \
pnpm check:layout && \
pnpm build
    </automated>
  </verify>
  <done>
`app/not-found.tsx` exists as a Server Component, default-exports `NotFound`, imports `notFoundContent`, renders serif H1 + body + two CTA links (Home + Contatti), uses D-06 fill-only brand pill for Home CTA, uses ink/20 border pill for Contatti CTA. `pnpm build` green. FND-10 satisfied structurally; runtime 404 check happens in Task 5.
  </done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Create app/error.tsx — route-level error boundary with Next 16.2 unstable_retry</name>
  <behavior>
- `app/error.tsx` exists.
- Line 1 is EXACTLY `"use client";` (the directive, with the semicolon — this is the ONE client island in Phase 1, forced by Next.js per D-17 exception and RESEARCH §8).
- Default-exports `function Error({ error, unstable_retry }: { error: Error & { digest?: string }; unstable_retry: () => void })`.
- Uses `unstable_retry()` on the retry button's `onClick`. The deprecated `reset` / `reset()` prop MUST NOT appear anywhere in the file.
- Imports `errorContent` from `@/content/site` and uses four keys: `title`, `body`, `ctaRetryLabel`, `ctaHomeLabel`.
- Imports `useEffect` from `react` and logs the error via `console.error(error)` (sufficient for Phase 1 — real error reporting is a Phase 7 concern).
- Does NOT export `metadata` (Next.js error files cannot have metadata).
- Contains no forbidden strings.
- `pnpm lint` and `pnpm build` both pass.
  </behavior>
  <read_first>
    - .planning/phases/01-fondamenta/01-RESEARCH.md §8 "app/error.tsx — route-level error boundary" — lines 1040-1094. The FULL canonical source. Copy verbatim, including the `useEffect` + `console.error` and the exact prop destructuring. Pay attention to the "DO NOT add app/global-error.tsx in Phase 1" note at line 1096.
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-17 — footer is RSC, only `app/error.tsx` is the legitimate Phase 1 client island. Mention this in the file comment header.
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-06 + §D-08 — same palette/typography rules as the 404.
    - content/site.ts (current state) — confirm `errorContent` export exists with keys `title`, `body`, `ctaRetryLabel`, `ctaHomeLabel`. Grep: `grep -A 6 'export const errorContent' content/site.ts` should show `title: "Qualcosa è andato storto"`, `ctaRetryLabel: "Riprova"`, `ctaHomeLabel: "Torna alla home"`.
    - Next.js 16.2 release notes paragraph on `unstable_retry` (if internet is available; otherwise rely on RESEARCH §8 line 1045 which pins the API signature). RESEARCH notes: "Props: `error: Error & { digest?: string }`, `unstable_retry: () => void` (16.2+). Do NOT use `reset` (soft-deprecated in 16.2 in favor of `unstable_retry`)."
  </read_first>
  <files>
    app/error.tsx
  </files>
  <action>
Step 1 — Create `app/error.tsx` with EXACTLY this content (from RESEARCH §8 lines 1048-1094, verbatim):

```tsx
// app/error.tsx
// NOTE: this is the ONLY legitimate Client Component in Phase 1 — Next.js requires
// error boundaries to be Client Components. See CONTEXT.md §D-17 exception and
// RESEARCH.md §8 "app/error.tsx — route-level error boundary".
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

Step 2 — Self-check BEFORE saving:
- Line 1: the leading comment block is fine. The FIRST non-comment line MUST be `"use client";` — the directive with the semicolon. (The acceptance check uses `head -20 | grep -q '"use client"'` to allow for the comment block above it.) If you prefer to put `"use client"` on the literal first line of the file, that also works and is equally valid.
- The button's `onClick={() => unstable_retry()}` is the NEW Next 16.2 API. The deprecated `reset` prop is absent. The acceptance criteria includes `! grep -q 'reset()' app/error.tsx` — do not introduce it.
- The button is a `<button type="button">`, not a `<Link>`. `unstable_retry` is an imperative callback.
- NO `export const metadata` — Next.js error files cannot have metadata (compile error).
- Same D-06 fill-only brand rule: `bg-brand text-panna` inside the pill is the approved pattern.
- `useEffect` from `react` — do not import from `"react/effect"` or similar. The import path is exactly `"react"`.
- No Italian hardcoded strings apart from `"Errore"` eyebrow — content strings flow from `errorContent`.

Step 3 — CRITICAL `"use client"` placement note (Windows bash gotcha):
- The FIRST directive in the file must be the `"use client"` string. If your file starts with a comment block, Next.js accepts `"use client"` immediately after the comments as long as there is no executable code in between. The acceptance check `head -20 app/error.tsx | grep -q '"use client"'` tolerates the comment-first style used above.
- ALTERNATIVE: if you want to be strict and place `"use client"` on the absolute first line, that also works — move the comment block below it. Both forms are acceptable.

Step 4 — Run validation:

```bash
pnpm typecheck
pnpm lint
pnpm check:compliance
pnpm check:layout
pnpm build
```

Build will exercise the error boundary compilation. If build fails with "Type 'unstable_retry' is not assignable", that means the installed Next.js version is older than 16.2 — verify `pnpm why next` shows `next 16.2.x`. If it's an older 16.0/16.1, STOP and open a blocker: Task 3 requires 16.2+. Do NOT fall back to `reset` — the acceptance check explicitly forbids it.
  </action>
  <verify>
    <automated>
test -f app/error.tsx && \
head -20 app/error.tsx | grep -q '"use client"' && \
grep -q 'unstable_retry' app/error.tsx && \
! grep -q 'reset()' app/error.tsx && \
! grep -q 'reset:' app/error.tsx && \
grep -q 'export default function Error' app/error.tsx && \
grep -q 'from "@/content/site"' app/error.tsx && \
grep -q 'errorContent.title' app/error.tsx && \
grep -q 'errorContent.body' app/error.tsx && \
grep -q 'errorContent.ctaRetryLabel' app/error.tsx && \
grep -q 'errorContent.ctaHomeLabel' app/error.tsx && \
grep -q 'useEffect' app/error.tsx && \
grep -q 'console.error' app/error.tsx && \
grep -q 'font-serif text-h1' app/error.tsx && \
grep -q 'bg-brand' app/error.tsx && \
grep -q 'text-panna' app/error.tsx && \
! grep -q 'export const metadata' app/error.tsx && \
! grep -q 'gtag' app/error.tsx && \
! test -f app/global-error.tsx && \
pnpm typecheck && \
pnpm lint && \
pnpm check:compliance && \
pnpm check:layout && \
pnpm build
    </automated>
  </verify>
  <done>
`app/error.tsx` exists, begins with `"use client"` directive, default-exports `Error` using the Next 16.2 `unstable_retry` prop (NOT the deprecated `reset`), imports `errorContent` from content module, renders serif H1 + retry button (bg-brand fill) + home link (ink/20 border). No `app/global-error.tsx` created (RESEARCH §8 explicit). `pnpm build` green.
  </done>
</task>

<task type="auto" tdd="true">
  <name>Task 4: Rewire app/layout.tsx to import defaultMetadata from @/lib/seo/metadata (execute the 01-02 handoff)</name>
  <behavior>
- After the edit, `app/layout.tsx`:
  - Contains `import { defaultMetadata } from "@/lib/seo/metadata";` among the import statements.
  - Contains `export const metadata: Metadata = defaultMetadata;` (exactly that one-line form).
  - Does NOT contain the inline `metadata: Metadata = { title: { default: ..., template: ... }, description: ... }` object literal that Plan 01-02 shipped as a placeholder. The check `! grep -q 'const metadata: Metadata = {' app/layout.tsx` enforces this (the `{` after the `=` is the signal of the object literal form).
  - STILL contains `<Header />`, `<Footer />`, `<Analytics />`, `<SpeedInsights />`, `lang="it"` — so `pnpm check:layout` stays green.
  - STILL imports `Inter` and `IBM_Plex_Serif` from `next/font/google` — so `pnpm lint` + font variable injection still work.
- `pnpm lint`, `pnpm typecheck`, `pnpm check:compliance`, `pnpm check:contrast`, `pnpm check:layout`, `pnpm build` all exit 0.
  </behavior>
  <read_first>
    - .planning/phases/01-fondamenta/01-02-design-system-and-layout-PLAN.md line 1099 — explicit handoff note: "Handoff to Plan 01-03: `app/layout.tsx` currently uses an inline `metadata` object; 01-03 replaces it with `import { defaultMetadata } from \"@/lib/seo/metadata\"`". This is the single-source-of-truth instruction for this task.
    - .planning/phases/01-fondamenta/01-02-design-system-and-layout-PLAN.md lines 559-618 — the `app/layout.tsx` source that 01-02 Task Step 2 wrote. Especially lines 573-582 which define the inline placeholder:
      ```tsx
      // Plan 01-03 replaces the inline metadata object with a
      // `defaultMetadata` import from `@/lib/seo/metadata`. For now we ship a
      // minimal inline `Metadata` object so the build is green without lib/seo/metadata.ts.
      export const metadata: Metadata = {
        title: {
          default: siteContent.brand.name,
          template: `%s — ${siteContent.brand.name}`,
        },
        description: siteContent.brand.tagline,
      };
      ```
      These are the EXACT lines to remove (plus the three comment lines above them).
    - app/layout.tsx (ACTUAL current file on disk) — read it with `Read` before editing. Sanity-check that what's on disk matches what 01-02 Task 2 Step 2 specified. If 01-02 shipped something different (e.g. because `typedRoutes` breakage forced a tweak), adapt the edit accordingly but preserve the new `defaultMetadata` wiring.
    - .planning/phases/01-fondamenta/01-RESEARCH.md §4 "Use in app/layout.tsx" (lines 639-646) — shows the target shape:
      ```ts
      // app/layout.tsx
      import { defaultMetadata } from "@/lib/seo/metadata";
      export const metadata = defaultMetadata;
      ```
      We use the typed form `export const metadata: Metadata = defaultMetadata;` for clarity.
    - .planning/phases/01-fondamenta/01-VALIDATION.md — confirm that `check:layout` only asserts the presence of `<Header`, `<Footer`, `<Analytics`, `<SpeedInsights`, `lang="it"`, none of which this edit touches.
  </read_first>
  <files>
    app/layout.tsx
  </files>
  <action>
Step 1 — Read the current `app/layout.tsx` file from disk. Confirm it contains the inline `metadata: Metadata = { ... }` placeholder block from lines 573-582 of Plan 01-02. If it does NOT contain that block (e.g. someone already rewired it manually), STOP and escalate — do not double-edit.

Step 2 — Perform TWO edits against `app/layout.tsx`:

**Edit A — Add the import.** In the existing import block (which already has `import type { Metadata } from "next";`, `import { Inter, IBM_Plex_Serif } from "next/font/google";`, `import { Analytics } from "@vercel/analytics/next";`, `import { SpeedInsights } from "@vercel/speed-insights/next";`, `import { Header } from "@/components/layout/Header";`, `import { Footer } from "@/components/layout/Footer";`, `import { siteContent } from "@/content/site";`), add exactly ONE new line AFTER the `@/components/layout/Footer` import:

```ts
import { defaultMetadata } from "@/lib/seo/metadata";
```

Optional cleanup: if `siteContent` is no longer referenced anywhere in `app/layout.tsx` after the inline metadata object is removed (likely — it was only used in `default: siteContent.brand.name` / `template: ...` / `description: siteContent.brand.tagline`), REMOVE the `import { siteContent } from "@/content/site";` line. The linter (`@typescript-eslint/no-unused-vars` via `next/typescript`) will flag it otherwise and fail `pnpm lint`.

**Edit B — Replace the inline metadata block.** Find and DELETE these three comment lines + the inline object literal + its trailing blank line:

```tsx
// Plan 01-03 replaces the inline metadata object with a
// `defaultMetadata` import from `@/lib/seo/metadata`. For now we ship a
// minimal inline `Metadata` object so the build is green without lib/seo/metadata.ts.
export const metadata: Metadata = {
  title: {
    default: siteContent.brand.name,
    template: `%s — ${siteContent.brand.name}`,
  },
  description: siteContent.brand.tagline,
};
```

Replace that entire block with EXACTLY these two lines:

```tsx
// Shared metadata defaults live in lib/seo/metadata. Per-page metadata uses buildMetadata().
export const metadata: Metadata = defaultMetadata;
```

Step 3 — Expected final shape of `app/layout.tsx` (for reference; compare your edit output against this):

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

// Shared metadata defaults live in lib/seo/metadata. Per-page metadata uses buildMetadata().
export const metadata: Metadata = defaultMetadata;

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["500"],
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

Step 4 — CRITICAL self-check BEFORE saving:
- `<Header />`, `<Footer />`, `<Analytics />`, `<SpeedInsights />` and `lang="it"` are ALL still present — check:layout will fail otherwise.
- The `import type { Metadata } from "next";` line is STILL present (we use the `: Metadata` type annotation on the re-export).
- The `inter` / `ibmPlexSerif` next/font declarations are untouched.
- The `<html className={`${inter.variable} ${ibmPlexSerif.variable}`}>` font-variable injection is untouched.
- If `siteContent` was removed from imports, search the file for any remaining reference: `grep -c 'siteContent' app/layout.tsx` should be 0. If > 0, either restore the import or remove the remaining usage.
- No compliance regressions — no gtag, no Google Fonts CDN.

Step 5 — Run the full Wave 2 rail:

```bash
pnpm lint
pnpm typecheck
pnpm check:compliance
pnpm check:contrast
pnpm check:layout
pnpm build
```

All must exit 0. If `pnpm lint` flags `siteContent` as unused, go back to Edit A cleanup and remove the import. If `pnpm typecheck` flags `Cannot find module '@/lib/seo/metadata'`, Task 1 was not yet run — execute Task 1 first. If `pnpm check:layout` fails, one of the five required elements was accidentally stripped — restore from the reference shape above.
  </action>
  <verify>
    <automated>
test -f app/layout.tsx && \
grep -q 'from "@/lib/seo/metadata"' app/layout.tsx && \
grep -q 'import { defaultMetadata } from "@/lib/seo/metadata"' app/layout.tsx && \
grep -q 'export const metadata: Metadata = defaultMetadata' app/layout.tsx && \
! grep -q 'const metadata: Metadata = {' app/layout.tsx && \
grep -q 'lang="it"' app/layout.tsx && \
grep -q '<Header' app/layout.tsx && \
grep -q '<Footer' app/layout.tsx && \
grep -q '<Analytics' app/layout.tsx && \
grep -q '<SpeedInsights' app/layout.tsx && \
grep -q 'IBM_Plex_Serif' app/layout.tsx && \
grep -q 'next/font/google' app/layout.tsx && \
pnpm lint && \
pnpm typecheck && \
pnpm check:compliance && \
pnpm check:contrast && \
pnpm check:layout && \
pnpm build
    </automated>
  </verify>
  <done>
`app/layout.tsx` now imports `defaultMetadata` from `@/lib/seo/metadata` and re-exports it as `export const metadata: Metadata = defaultMetadata;`. The Plan 01-02 inline placeholder literal is removed. All five required layout elements (`<Header>`, `<Footer>`, `<Analytics>`, `<SpeedInsights>`, `lang="it"`) are preserved. The next/font wiring and `<html className={...}>` font-variable injection are untouched. Full Wave 2 rail green.
  </done>
</task>

<task type="auto">
  <name>Task 5: End-to-end runtime verification of FND-10 — pnpm dev + curl unknown route returns 404 with Italian institutional copy</name>
  <read_first>
    - .planning/phases/01-fondamenta/01-VALIDATION.md §"Manual-Only Verifications" row "404 page renders correctly at an unknown route in `pnpm dev`" — this task scripts the previously manual check so it becomes automated.
    - .planning/phases/01-fondamenta/01-CONTEXT.md §"Claude's Discretion" bullet "404 personalizzata (FND-10)" — confirms expected copy "Pagina non trovata" + "Torna alla home".
    - content/site.ts (current state) — confirm `notFoundContent.title === "Pagina non trovata"` and `notFoundContent.ctaHomeLabel === "Torna alla home"`. If these strings are different in the actual file (unlikely — 01-02 shipped them verbatim from RESEARCH §10), update the grep patterns in this task's verify block accordingly.
    - README.md / CLAUDE.md §"Commands" — confirm `pnpm dev` is the dev-server command (it is).
    - Windows bash notes: `start` is a Windows-cmd builtin, not a bash command. Under `bash` on Windows, the cross-platform way to background a process is `pnpm dev > /tmp/dev.log 2>&1 &` and to kill it `kill %1` (or capture the PID: `pnpm dev > /tmp/dev.log 2>&1 & echo $! > /tmp/dev.pid; ... ; kill "$(cat /tmp/dev.pid)"`). On Windows MINGW bash, `taskkill //F //PID $(cat /tmp/dev.pid)` is the nuclear fallback if `kill` does not forward SIGTERM to node correctly.
  </read_first>
  <files>
    (verification only — no files created or modified)
  </files>
  <action>
Step 1 — Make sure nothing is already listening on :3000 (prior Task 4 build did not `next start`, so this should be clean).

Step 2 — Start `pnpm dev` in the background, capture PID and log:

```bash
pnpm dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
echo "$DEV_PID" > /tmp/dev.pid
```

Step 3 — Wait for the server to become ready. Poll `/` until it returns 200 or until 30 seconds elapse:

```bash
for i in $(seq 1 30); do
  if curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/ 2>/dev/null | grep -q '^200$'; then
    echo "dev server ready after ${i}s"
    break
  fi
  sleep 1
done
```

(Note: `sleep 1` inside a loop is acceptable — not a rate-limit loop on a failing command, it is a readiness wait.)

Step 4 — Check the 404 status code:

```bash
STATUS=$(curl -s -o /tmp/404.body -w '%{http_code}' http://localhost:3000/xxx-does-not-exist)
test "$STATUS" = "404" || { echo "expected 404, got $STATUS"; cat /tmp/dev.log | tail -30; kill "$(cat /tmp/dev.pid)" 2>/dev/null; exit 1; }
```

Step 5 — Check the 404 response body contains the expected Italian copy from `notFoundContent`:

```bash
grep -q 'Pagina non trovata' /tmp/404.body || { echo "404 body missing 'Pagina non trovata'"; cat /tmp/404.body; kill "$(cat /tmp/dev.pid)" 2>/dev/null; exit 1; }
grep -q 'Torna alla home' /tmp/404.body || { echo "404 body missing 'Torna alla home'"; cat /tmp/404.body; kill "$(cat /tmp/dev.pid)" 2>/dev/null; exit 1; }
grep -q 'Contattaci' /tmp/404.body || { echo "404 body missing 'Contattaci'"; cat /tmp/404.body; kill "$(cat /tmp/dev.pid)" 2>/dev/null; exit 1; }
```

Step 6 — Kill the dev server:

```bash
kill "$(cat /tmp/dev.pid)" 2>/dev/null || true
# Windows MINGW fallback if kill does not propagate to node:
# taskkill //F //PID "$(cat /tmp/dev.pid)" 2>/dev/null || true
sleep 1  # give OS time to release port 3000
rm -f /tmp/dev.pid /tmp/dev.log /tmp/404.body
```

Step 7 — If ANY step 2-5 fails, restart diagnosis:
- `cat /tmp/dev.log` — look for build errors, port conflicts, missing module errors.
- If dev server failed to start because port 3000 is taken by another process, kill the offender: `lsof -t -i :3000 | xargs -r kill -9` (Linux/Mac) or `netstat -ano | grep :3000` + `taskkill //F //PID <pid>` (Windows).
- If dev server started but `/` returns 500, inspect `/tmp/dev.log` for TS errors — likely Task 1/2/3/4 verification was passed prematurely.

**Windows bash gotcha — backup plan:** if the dev-server background management proves unreliable in a given executor environment (specifically: if `kill %1` or `kill $PID` does NOT actually terminate `next dev` on Windows MINGW bash, leaving the port occupied and the next CI run failing), the executor MAY instead:
1. Mark this task as `checkpoint:human-verify` temporarily for this one run,
2. Ask the human to run `pnpm dev`, `curl http://localhost:3000/xxx-does-not-exist`, confirm HTTP 404 + presence of "Pagina non trovata" + "Torna alla home" in the response body, then Ctrl+C the dev server,
3. Resume execution with "approved".
The DEFAULT, however, is fully autonomous — only fall back if two consecutive autonomous attempts fail to clean up the dev server.
  </action>
  <verify>
    <automated>
# Start dev server, wait ready, hit unknown route, check status + body, kill server.
pnpm dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
echo "$DEV_PID" > /tmp/dev.pid
READY=0
for i in $(seq 1 30); do
  if curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/ 2>/dev/null | grep -q '^200$'; then
    READY=1
    break
  fi
  sleep 1
done
if [ "$READY" != "1" ]; then
  echo "dev server never became ready"
  tail -30 /tmp/dev.log
  kill "$(cat /tmp/dev.pid)" 2>/dev/null || true
  exit 1
fi
STATUS=$(curl -s -o /tmp/404.body -w '%{http_code}' http://localhost:3000/xxx-does-not-exist)
RESULT=0
test "$STATUS" = "404" || { echo "expected 404 got $STATUS"; RESULT=1; }
grep -q 'Pagina non trovata' /tmp/404.body || { echo "body missing 'Pagina non trovata'"; RESULT=1; }
grep -q 'Torna alla home' /tmp/404.body || { echo "body missing 'Torna alla home'"; RESULT=1; }
grep -q 'Contattaci' /tmp/404.body || { echo "body missing 'Contattaci'"; RESULT=1; }
kill "$(cat /tmp/dev.pid)" 2>/dev/null || true
rm -f /tmp/dev.pid /tmp/dev.log /tmp/404.body
exit $RESULT
    </automated>
  </verify>
  <done>
`pnpm dev` starts, an unknown route returns HTTP 404, and the rendered body contains the three expected Italian strings (`Pagina non trovata`, `Torna alla home`, `Contattaci`) sourced from `content/site.ts`. Dev server cleanly shut down. FND-10 verified end-to-end, not just structurally.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| `process.env.NEXT_PUBLIC_SITE_URL` → `lib/seo/metadata.ts` | Build-time env var feeds `metadataBase`; a wrong value ships incorrect OG URLs to the world |
| `content/site.ts` → `app/not-found.tsx` / `app/error.tsx` | Italian copy modules feed the 404 and error UX; a typo in `notFoundContent.title` shows in production |
| `app/layout.tsx` → every route | Global metadata and shell wiring; a regression here breaks every page's SEO simultaneously |
| `app/error.tsx` (Client Component) → every route | The ONE Phase 1 client island; an imported module that accidentally calls a Node API breaks SSR |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-03-01 | Tampering | `NEXT_PUBLIC_SITE_URL` mismatch between `.env.production` and Vercel dashboard | mitigate | Use the `?? "http://localhost:3000"` fallback in `lib/seo/metadata.ts` so the build never crashes on missing env; Phase 7 deploy plan will audit `vercel env ls` against `.env.production` before production cutover |
| T-01-03-02 | Information Disclosure | OG URL leakage via wrong `metadataBase` | accept | Phase 1 has no OG images yet (commented out in RESEARCH §4). The only leakage vector is a wrong hostname, which is visually obvious in preview deploys. Revisit when Phase 7 adds real OG images |
| T-01-03-03 | Denial of Service | `app/error.tsx` itself throws during render | accept | Next.js falls back to the built-in error UI if `app/error.tsx` crashes. `app/global-error.tsx` would be the next layer, but RESEARCH §8 says skip it in Phase 1. Acceptable for a static institutional site with no data layer |
| T-01-03-04 | Tampering | `app/not-found.tsx` hardcoded Italian string instead of `notFoundContent.*` | mitigate | Acceptance criteria grep for `notFoundContent.title` / `notFoundContent.body` / both CTA labels; a regression that hardcodes "Pagina non trovata" would still pass the string grep but fail the `notFoundContent.*` grep |
| T-01-03-05 | Repudiation | Deprecated `reset` prop sneaking into `app/error.tsx` via copy-paste from an older Next tutorial | mitigate | Acceptance criteria explicitly include `! grep -q 'reset()' app/error.tsx` and `! grep -q 'reset:' app/error.tsx`. This is a hard structural gate, not a code review concern |
| T-01-03-06 | Elevation of Privilege | `lib/seo/metadata.ts` introducing a forbidden Google reference | mitigate | `lib/` is inside `SCAN_DIRS` for `scripts/check-compliance.mjs`; any `gtag`, `fonts.googleapis.com`, `googletagmanager`, etc. string would fail the compliance check. Task 1's verify block runs `pnpm check:compliance` explicitly |
</threat_model>

<verification>
Overall plan verification (all commands run from project root):

```bash
# Full Wave 0 + Wave 1 + Wave 2 code-track rail (must stay green)
pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout && pnpm build

# FND-09 structural
test -f lib/seo/metadata.ts && \
grep -q 'export const defaultMetadata' lib/seo/metadata.ts && \
grep -q 'export function buildMetadata' lib/seo/metadata.ts && \
grep -q '"it_IT"' lib/seo/metadata.ts && \
grep -q 'NEXT_PUBLIC_SITE_URL' lib/seo/metadata.ts && \
echo "FND-09 OK"

# FND-10 structural
test -f app/not-found.tsx && \
! grep -q '"use client"' app/not-found.tsx && \
grep -q 'export default function NotFound' app/not-found.tsx && \
grep -q 'notFoundContent.title' app/not-found.tsx && \
grep -q 'href="/"' app/not-found.tsx && \
grep -q 'href="/contatti"' app/not-found.tsx && \
echo "FND-10 structural OK"

# app/error.tsx structural
test -f app/error.tsx && \
head -20 app/error.tsx | grep -q '"use client"' && \
grep -q 'unstable_retry' app/error.tsx && \
! grep -q 'reset()' app/error.tsx && \
! test -f app/global-error.tsx && \
echo "error boundary OK"

# Layout rewire
grep -q 'from "@/lib/seo/metadata"' app/layout.tsx && \
grep -q 'export const metadata: Metadata = defaultMetadata' app/layout.tsx && \
! grep -q 'const metadata: Metadata = {' app/layout.tsx && \
echo "layout rewire OK"

# .env files from Plan 01-01 still present
test -f .env.local && grep -q 'NEXT_PUBLIC_SITE_URL' .env.local && \
test -f .env.production && grep -q 'NEXT_PUBLIC_SITE_URL' .env.production && \
echo "env files OK"
```

Runtime verification (scripted in Task 5, NOT manual):
- `pnpm dev` starts cleanly.
- `curl http://localhost:3000/xxx-does-not-exist` returns HTTP 404.
- Response body contains `Pagina non trovata`, `Torna alla home`, `Contattaci`.
- Dev server killed cleanly; port 3000 released.

Manual check (human, one-off after commit — NOT required for Wave 2 close):
- Visually confirm at 1440px and 375px that the 404 page renders with serif H1, ink body, brand-filled Home CTA, ink-outline Contatti CTA, and the global Header + Footer wrap it.
- Visually confirm that triggering an intentional error (temporarily add `throw new Error("test");` to `app/page.tsx`, visit `/`, see the error UI, then revert) renders the error boundary with the retry button.
</verification>

<success_criteria>
- **FND-09 satisfied**: `lib/seo/metadata.ts` exists with `defaultMetadata` + `buildMetadata()`, passes typecheck and compliance rail, every field in CONTEXT.md §"Helper `lib/seo/metadata.ts` shape" minimum surface present (`title.template`, `description`, `openGraph`, `twitter`, `alternates.canonical`, `metadataBase`).
- **FND-10 satisfied**: `app/not-found.tsx` exists as a Server Component, renders serif H1 from `notFoundContent.title`, includes both Home and Contatti CTA links, passes `pnpm build`, and (end-to-end) responds HTTP 404 with the correct Italian copy when fetched against `pnpm dev`.
- **Error boundary shipped**: `app/error.tsx` exists as the single Phase 1 client island, uses Next 16.2 `unstable_retry` (NOT deprecated `reset`), no `app/global-error.tsx` created.
- **Layout rewire complete**: `app/layout.tsx` imports `defaultMetadata` from `@/lib/seo/metadata` and the Plan 01-02 inline placeholder literal is gone. All five required layout elements preserved (`<Header>`, `<Footer>`, `<Analytics>`, `<SpeedInsights>`, `lang="it"`).
- **Full rail green**: `pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout && pnpm build` exits 0 — no regression of any Wave 0 or Wave 1 artifact.
- **CONTEXT.md decision fidelity**: D-06 fill-only (brand as bg, panna inside) respected in both 404 and error CTAs. D-08 serif H1 applied. D-17 client island exception respected (only `app/error.tsx`). D-21 compliance: no gtag/GA4/googletagmanager anywhere. D-22 font loading: untouched (still self-hosted via next/font). D-24 no animation libs: no `framer-motion`, `motion`, or equivalent imported.
- **No JSON-LD, no sitemap, no robots** — those are Phase 7 (SEO-02/03/04) and strictly out of Phase 1 scope per CONTEXT.md §"Fuori scope per Phase 1".
- **No forbidden deps added** — this plan adds zero new `package.json` dependencies; everything uses Next.js built-ins and modules from existing packages.
</success_criteria>

<output>
After completion, create `.planning/phases/01-fondamenta/01-03-SUMMARY.md` recording:
- Wave 2 code track closed: FND-09 + FND-10 + error boundary + layout rewire
- Final shape of `lib/seo/metadata.ts` (note any deviation from RESEARCH §4 — there should be none)
- Final shape of `app/not-found.tsx` and `app/error.tsx` (note any Tailwind utility fallbacks used, e.g. `text-[length:var(--text-h1)]` instead of `text-h1`, and why)
- Outcome of the Task 5 dev-server runtime check (scripted autonomous vs. human-verify fallback, if the latter was invoked)
- Confirmation that `app/layout.tsx` no longer contains the inline `metadata: Metadata = { ... }` placeholder block and now delegates to `@/lib/seo/metadata`
- Handoff to Plan 01-04 (client deliverables): Plan 01-04 runs in the SAME wave (Wave 2) in parallel with this plan and has no technical dependency on any file this plan touches; it is a human-owned tracking plan
- Handoff to Phase 2: every future page can now call `buildMetadata({ title: "Homepage", description: "...", alternates: { canonical: "/" } })` to generate metadata without re-importing `siteContent` or reasoning about `openGraph` shallow-merge gotchas
</output>
