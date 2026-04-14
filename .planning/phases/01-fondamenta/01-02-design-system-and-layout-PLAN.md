---
phase: 01-fondamenta
plan: 02
type: execute
wave: 1
depends_on:
  - 01-01
files_modified:
  - app/globals.css
  - app/layout.tsx
  - app/page.tsx
  - content/site.ts
  - content/legal.ts
  - content/navigation.ts
  - components/layout/Header.tsx
  - components/layout/Footer.tsx
  - lib/utils/cn.ts
autonomous: true
requirements:
  - FND-02
  - FND-03
  - FND-04
  - FND-05
  - FND-06
  - FND-07
  - FND-08
must_haves:
  truths:
    - "Brand tokens `#1A1A1A` (ink), `#F8F5EE` (panna), `#291572` (brand) are defined in `app/globals.css` via Tailwind v4 `@theme inline`"
    - "`font-sans` maps to Inter and `font-serif` maps to IBM Plex Serif via CSS variables injected by next/font"
    - "Body base size is 17px and uses Inter; H1/H2 use `clamp()` fluid sizing"
    - "`app/layout.tsx` wraps every route with `<Header />` + `<main>` + `<Footer />` + `<Analytics />` + `<SpeedInsights />` and declares `lang='it'`"
    - "Header renders sticky on desktop with logo + nav + CTA 'Richiedi un sopralluogo' from content/navigation.ts"
    - "Header renders click-to-call icon + hamburger placeholder on mobile only (HOM-05 / D-14)"
    - "Footer renders 4 columns on desktop (Identity / Sections / Contacts / Legal+certifications) reading from content/site.ts + content/legal.ts + content/navigation.ts"
    - "Footer displays P.IVA, REA, capitale sociale, sede legale per FND-06 (D.Lgs. 70/2003 art. 7)"
    - "`content/site.ts`, `content/legal.ts`, `content/navigation.ts` ship with realistic placeholders marked `// TODO cliente: valore reale`"
    - "Every `pnpm check:*` command from Wave 0 still passes; `pnpm build` still green"
  artifacts:
    - path: "app/globals.css"
      provides: "Tailwind v4 @theme inline with ink/panna/brand/border/surface color tokens, font-sans/font-serif variables, clamp() H1/H2, body base 17px"
      contains: "--color-ink: #1a1a1a"
    - path: "app/layout.tsx"
      provides: "Final Phase 1 root layout with next/font Inter + IBM_Plex_Serif, defaultMetadata import (commented until Plan 01-03), Analytics, SpeedInsights, Header, Footer"
      contains: "IBM_Plex_Serif"
    - path: "content/site.ts"
      provides: "Named export siteContent with brand, contact (phone/email/pec/hours), address, serviceArea; plus notFoundContent, errorContent"
      exports:
        - siteContent
        - notFoundContent
        - errorContent
        - SiteContent
        - SiteBrand
        - SiteContact
        - SiteAddress
        - SiteServiceArea
    - path: "content/legal.ts"
      provides: "Named export legalContent with ragioneSociale, piva, codiceFiscale, rea, capitaleSociale, sedeLegale, certifications (SOA + ISO)"
      exports:
        - legalContent
        - LegalContent
    - path: "content/navigation.ts"
      provides: "Named exports primaryNav, primaryCta, footerNav for header/footer wiring"
      exports:
        - primaryNav
        - primaryCta
        - footerNav
        - NavLink
        - NavGroup
    - path: "components/layout/Header.tsx"
      provides: "Server Component sticky desktop single-row header with logo + nav + CTA + mobile click-to-call"
      min_lines: 40
    - path: "components/layout/Footer.tsx"
      provides: "Server Component 4-column footer reading from content modules"
      min_lines: 60
    - path: "lib/utils/cn.ts"
      provides: "cn() helper combining clsx + tailwind-merge"
  key_links:
    - from: "app/layout.tsx"
      to: "next/font/google"
      via: "import { Inter, IBM_Plex_Serif } from 'next/font/google' + className on <html>"
      pattern: "IBM_Plex_Serif|next/font/google"
    - from: "app/layout.tsx"
      to: "components/layout/Header + Footer"
      via: "named imports + JSX mount"
      pattern: "import \\{ Header \\} from \"@/components/layout/Header\""
    - from: "components/layout/Footer.tsx"
      to: "content/legal.ts + content/site.ts + content/navigation.ts"
      via: "named imports"
      pattern: "from \"@/content/(site|legal|navigation)\""
    - from: "app/globals.css @theme inline"
      to: "next/font CSS variables --font-inter, --font-ibm-plex-serif"
      via: "var() reference in --font-sans / --font-serif"
      pattern: "var\\(--font-inter\\)"
---

<objective>
Wave 1 — the design system and global layout. Define brand tokens in `app/globals.css` via Tailwind v4 `@theme inline`, wire Inter + IBM Plex Serif via `next/font/google`, replace the Wave 0 stubs with the real `<Header />` (sticky desktop single-row with CTA + mobile click-to-call) and 4-column `<Footer />` reading from new `content/site.ts`, `content/legal.ts`, `content/navigation.ts` modules. Mount `<Analytics />` + `<SpeedInsights />` on every route (already from Wave 0, preserved here). All Italian copy lives in content modules — zero hardcoded strings in components (CLAUDE.md rule).

Purpose: Lock in the visual and structural identity BEFORE any page is built. Pages in Phase 2–6 inherit this shell unchanged. Every Wave 0 check must still pass after this plan — `pnpm check:compliance && pnpm check:contrast && pnpm check:layout && pnpm build` stays green.

Output: Every route shows a sticky header with the primary CTA "Richiedi un sopralluogo" and a 4-column institutional footer displaying P.IVA / REA / capitale sociale / sede legale (placeholders). Brand tokens are queryable via Tailwind classes `bg-ink`, `bg-panna`, `bg-brand`, `text-ink`, `text-panna`, `text-brand`, `border-border`, `bg-surface`. Typography works: `font-serif` = IBM Plex Serif, `font-sans` = Inter, `text-h1` and `text-h2` apply fluid clamp sizes. FND-02 through FND-08 are satisfied.
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
@CLAUDE.md
</context>

<interfaces>
<!-- Contracts this plan DEFINES for downstream (Plan 01-03 + Phases 2-7): -->

**Brand design tokens** (Tailwind utilities generated from @theme inline in app/globals.css):
```
bg-ink, text-ink, border-ink       -- #1A1A1A (D-01)
bg-panna, text-panna               -- #F8F5EE (D-02)
bg-brand, text-brand               -- #291572 (D-03) — FILL ONLY adjacent to ink text (D-06)
bg-surface                         -- #FFFFFF (white card)
border-border                      -- #E6E1D6 (hairline on panna)

font-sans                          -- Inter (400/500/600) via var(--font-inter)
font-serif                         -- IBM Plex Serif (500) via var(--font-ibm-plex-serif)

text-h1                            -- clamp(2.25rem, 1.5rem + 3.2vw, 4rem), line-height 1.1
text-h2                            -- clamp(1.625rem, 1.25rem + 1.6vw, 2.25rem), line-height 1.2
```

**Content module exports** (imported by Header, Footer, 404, error, Phase 2-7 pages, Phase 7 JSON-LD):
```ts
// content/site.ts
export type SiteBrand = { name, legalName, tagline, claim };
export type SiteContact = { phone: { display, tel }, email, pec, hours };
export type SiteAddress = { street, zip, city, province, region, country, googleMapsUrl };
export type SiteServiceArea = readonly string[];
export type SiteContent = { brand, contact, address, serviceArea };
export const siteContent: SiteContent;
export const notFoundContent = { title, body, ctaHomeLabel, ctaContactLabel } as const;
export const errorContent = { title, body, ctaRetryLabel, ctaHomeLabel } as const;

// content/legal.ts
export type LegalContent = { ragioneSociale, piva, codiceFiscale, rea, capitaleSociale, sedeLegale, sedeOperativa?, certifications };
export const legalContent: LegalContent;

// content/navigation.ts
export type NavLink = { href, label };
export type NavGroup = { title, items: readonly NavLink[] };
export const primaryNav: readonly NavLink[];
export const primaryCta: NavLink;   // { href: "/contatti", label: "Richiedi un sopralluogo" }
export const footerNav: readonly NavGroup[];
```

**Component exports** (imported by app/layout.tsx):
```ts
// components/layout/Header.tsx
export function Header(): JSX.Element;  // Server Component

// components/layout/Footer.tsx
export function Footer(): JSX.Element;  // Server Component
```

**Utility helper**:
```ts
// lib/utils/cn.ts
export function cn(...inputs: ClassValue[]): string;  // clsx + tailwind-merge
```
</interfaces>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: Create content modules (content/site.ts, content/legal.ts, content/navigation.ts) with full named exports, realistic placeholders, TODO comments — and the cn() helper</name>
  <behavior>
- `content/site.ts` exports `siteContent` typed as `SiteContent`, `notFoundContent`, `errorContent`, and all the named types. Placeholders marked `// TODO cliente: valore reale`.
- `content/legal.ts` exports `legalContent` with `piva`, `rea.number`, `capitaleSociale.declared`, `sedeLegale.street`, plus `certifications.soa.categories` and `certifications.iso.standard`. All placeholders marked.
- `content/navigation.ts` exports `primaryNav` (5 items Home/Servizi/Progetti/Chi siamo/Contatti), `primaryCta` ({ href: "/contatti", label: "Richiedi un sopralluogo" }), `footerNav` (at least Sezioni + Legale groups).
- All exports are NAMED; zero `export default`.
- `pnpm typecheck` passes under `noUncheckedIndexedAccess: true` — no indexed accesses that would trip the flag (use `.map()` and destructuring).
- `lib/utils/cn.ts` exports `cn(...inputs: ClassValue[]): string` combining `clsx` + `twMerge`.
  </behavior>
  <read_first>
    - .planning/phases/01-fondamenta/01-RESEARCH.md §10 "Content modules pattern (FND-05, FND-06)" — the FULL content/site.ts source, FULL content/legal.ts source, FULL content/navigation.ts source (copy verbatim + preserve type definitions)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §10 "Naming lock-ins (BIKESHED RESOLVED)" (exact symbol names — do NOT rename)
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-18 "Placeholder realistici + TODO esplicito"
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-20 (list of 13 fields to request from client — the placeholder shape matches this list)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §"Pitfall 7" (noUncheckedIndexedAccess — use `.map()` not `array[0]`)
    - CLAUDE.md §"Code Style" ("prefer named exports", "evitare `any`") and §"Assets Rules"
  </read_first>
  <files>
    content/site.ts, content/legal.ts, content/navigation.ts, lib/utils/cn.ts
  </files>
  <action>
Step 1 — Create `content/site.ts` with EXACTLY this content (verbatim from RESEARCH §10, do NOT alter the type definitions or the symbol names):

```ts
// content/site.ts
// Canonical NAP + brand strings. Used by Header, Footer, JSON-LD (Phase 7), forms (Phase 6).

export type SiteBrand = {
  readonly name: string;
  readonly legalName: string;
  readonly tagline: string;
  readonly claim: string;
};

export type SiteContact = {
  readonly phone: {
    readonly display: string;   // "+39 041 000 0000"
    readonly tel: string;       // "+39041000 0000"
  };
  readonly email: string;
  readonly pec: string;
  readonly hours: readonly string[];
};

export type SiteAddress = {
  readonly street: string;
  readonly zip: string;
  readonly city: string;
  readonly province: string;
  readonly region: string;
  readonly country: string;
  readonly googleMapsUrl: string;
};

export type SiteServiceArea = readonly string[];

export type SiteContent = {
  readonly brand: SiteBrand;
  readonly contact: SiteContact;
  readonly address: SiteAddress;
  readonly serviceArea: SiteServiceArea;
};

export const siteContent: SiteContent = {
  brand: {
    name: "Edilferro", // TODO cliente: conferma short name
    legalName: "Edilferro S.r.l.", // TODO cliente: ragione sociale completa
    tagline:
      "45 anni di esperienza edile a Mestre e in tutto il Veneto — nuove costruzioni, ristrutturazioni e opere pubbliche.",
    claim: "Costruiamo da 45 anni sul territorio veneto.",
  },
  contact: {
    phone: {
      display: "+39 041 000 0000", // TODO cliente: telefono centralino reale
      tel: "+390410000000",
    },
    email: "info@edilferro.it", // TODO cliente: email commerciale reale
    pec: "edilferro@pec.it", // TODO cliente: PEC reale
    hours: ["Lun–Ven 8:30–18:00", "Sab su appuntamento"], // TODO cliente: orari reali
  },
  address: {
    street: "Via [placeholder]", // TODO cliente: via + numero civico
    zip: "30170", // TODO cliente: CAP sede legale
    city: "Mestre",
    province: "VE",
    region: "Veneto",
    country: "IT",
    googleMapsUrl:
      "https://maps.app.goo.gl/placeholder", // TODO cliente: URL maps definitivo (deve essere maps.app.goo.gl o simile — NON un embed iframe)
  },
  serviceArea: ["Mestre", "Venezia", "Provincia di Venezia", "Veneto"],
};

// Strings for 404 and error pages (so components never hardcode Italian copy — CLAUDE.md rule).
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

**CRITICAL**: Notice `googleMapsUrl` uses `maps.app.goo.gl` not `google.com/maps` — the latter is blocked by `scripts/check-compliance.mjs`. If a real Google Maps link needs `google.com/maps` later, it will be placed in `public/` assets or `components/business/` (scanned dirs) and will trigger the compliance check — which is correct: any actual Google Maps URL in source needs to be a short link (`maps.app.goo.gl`) to avoid triggering the substring match. Document this in the SUMMARY.

Also notice `phone.tel` uses `+390410000000` (no spaces). `tel:` URIs should have no whitespace.

Step 2 — Create `content/legal.ts` with EXACTLY this content (from RESEARCH §10):

```ts
// content/legal.ts
// D.Lgs. 70/2003 art. 7 compliance. Rendered in footer on every route.
// All fields ship with placeholders; substitute real values in a dedicated commit when client delivers (see D-18/D-19).

export type LegalContent = {
  readonly ragioneSociale: string;
  readonly piva: string;
  readonly codiceFiscale: string;
  readonly rea: {
    readonly number: string;
    readonly chamber: string;
  };
  readonly capitaleSociale: {
    readonly declared: string;
    readonly paidUp: string;
  };
  readonly sedeLegale: {
    readonly street: string;
    readonly zip: string;
    readonly city: string;
    readonly province: string;
  };
  readonly sedeOperativa?: {
    readonly street: string;
    readonly zip: string;
    readonly city: string;
    readonly province: string;
  };
  readonly certifications: {
    readonly soa: {
      readonly categories: readonly string[];
      readonly expiration: string;
    };
    readonly iso: {
      readonly standard: string;
      readonly issuer: string;
      readonly expiration: string;
    };
  };
};

export const legalContent: LegalContent = {
  // TODO cliente: tutti i campi sottostanti sono placeholder. Sostituire alla consegna.
  ragioneSociale: "Edilferro S.r.l.",
  piva: "00000000000", // TODO cliente: P.IVA reale (11 cifre)
  codiceFiscale: "00000000000", // TODO cliente: C.F. reale
  rea: {
    number: "VE-000000", // TODO cliente: numero REA reale
    chamber: "CCIAA Venezia Rovigo", // TODO cliente: conferma camera di commercio
  },
  capitaleSociale: {
    declared: "€ 100.000", // TODO cliente: capitale sociale dichiarato
    paidUp: "€ 100.000 i.v.", // TODO cliente: capitale sociale versato
  },
  sedeLegale: {
    street: "Via [placeholder] 1", // TODO cliente: via + civico
    zip: "30170", // TODO cliente: CAP
    city: "Mestre",
    province: "VE",
  },
  certifications: {
    soa: {
      categories: ["OG1", "OG3"], // TODO cliente: categorie SOA reali
      expiration: "2027-06-30", // TODO cliente: data scadenza attestazione
    },
    iso: {
      standard: "ISO 9001:2015",
      issuer: "[Ente Certificatore]", // TODO cliente: ente certificatore
      expiration: "2027-06-30", // TODO cliente: scadenza certificato
    },
  },
};
```

Step 3 — Create `content/navigation.ts` with EXACTLY this content (from RESEARCH §10):

```ts
// content/navigation.ts
// Header + footer link structure. Single source of truth so both components stay in sync.

export type NavLink = {
  readonly href: string;
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

Note: `typedRoutes: true` in next.config.ts means `/servizi`, `/progetti`, `/chi-siamo`, `/contatti`, `/privacy`, `/cookie-policy` will error at build time until those routes exist. Plan 01-03 creates `/not-found` + `/error`. To avoid blocking this plan, we accept typedRoutes warnings as non-blocking for now, OR we mark `href` as `string` in the type. **Decision**: keep `href: string` (not `Route`) — we're not using the `<Link href>` typed-routes feature strictness here. The `Link` component accepts `string` as a fallback. If typedRoutes blocks, the fallback is to disable it temporarily by removing `typedRoutes: true` from `next.config.ts` and re-enabling in Phase 2 when routes exist. Try with typedRoutes first; if build fails, disable it and note in SUMMARY.

Step 4 — Create `lib/utils/cn.ts`:

```ts
// lib/utils/cn.ts
// Conditional className helper — clsx for conditional join, tailwind-merge for conflict resolution.
// Standard shadcn/ui pattern, reused throughout the app.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

Step 5 — Run `pnpm typecheck` and `pnpm lint`. Both MUST pass. If `noUncheckedIndexedAccess` trips on something, fix by using `.map()` or destructuring. Do NOT disable the flag.

Step 6 — Run `pnpm check:compliance`. MUST pass — `maps.app.goo.gl` is not in the forbidden list. If it fails, re-read Step 1's note about `googleMapsUrl`.
  </action>
  <verify>
    <automated>
test -f content/site.ts && \
grep -q 'export const siteContent' content/site.ts && \
grep -q 'export type SiteContent' content/site.ts && \
grep -q 'export const notFoundContent' content/site.ts && \
grep -q 'export const errorContent' content/site.ts && \
grep -q 'TODO cliente' content/site.ts && \
test -f content/legal.ts && \
grep -q 'export const legalContent' content/legal.ts && \
grep -q 'piva' content/legal.ts && \
grep -q 'rea' content/legal.ts && \
grep -q 'capitaleSociale' content/legal.ts && \
grep -q 'sedeLegale' content/legal.ts && \
grep -q 'TODO cliente' content/legal.ts && \
test -f content/navigation.ts && \
grep -q 'export const primaryNav' content/navigation.ts && \
grep -q 'export const primaryCta' content/navigation.ts && \
grep -q 'Richiedi un sopralluogo' content/navigation.ts && \
test -f lib/utils/cn.ts && \
grep -q 'twMerge' lib/utils/cn.ts && \
grep -q 'clsx' lib/utils/cn.ts && \
pnpm typecheck && \
pnpm lint && \
pnpm check:compliance
    </automated>
  </verify>
  <done>
Three content modules exist with the exact type+data shapes from RESEARCH §10. All named exports, zero default exports, placeholders marked `// TODO cliente:`. `cn()` helper exists. `pnpm typecheck`, `pnpm lint`, `pnpm check:compliance` all pass.
  </done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Replace app/globals.css with Phase 1 @theme inline tokens (ink/panna/brand) + next/font wiring, and replace app/layout.tsx with the final Phase 1 shape mounting Inter + IBM Plex Serif via next/font</name>
  <behavior>
- `app/globals.css` contains `--color-ink: #1a1a1a`, `--color-panna: #f8f5ee`, `--color-brand: #291572`, `--color-border: #e6e1d6`, `--color-surface: #ffffff`.
- `@theme inline { --color-ink: var(--color-ink); ... --font-sans: var(--font-inter); --font-serif: var(--font-ibm-plex-serif); --text-h1: clamp(...); ... }`.
- `html { font-size: 17px }`, `body { background-color: var(--color-panna); color: var(--color-ink); font-family: var(--font-sans), system-ui, sans-serif; }`.
- `app/layout.tsx` imports `{ Inter, IBM_Plex_Serif } from "next/font/google"`, configures Inter weights 400/500/600 + variable `--font-inter`, IBM Plex Serif weight 500 + variable `--font-ibm-plex-serif`, sets `<html lang="it" className={`${inter.variable} ${ibmPlexSerif.variable}`}>`.
- `app/layout.tsx` imports and mounts `<Header />`, `<main>{children}</main>`, `<Footer />`, `<Analytics />`, `<SpeedInsights />`.
- `pnpm check:compliance` still passes (no `fonts.googleapis.com` literal — next/font handles it).
- `pnpm check:contrast` passes (palette values haven't moved).
- `pnpm check:layout` passes (all required elements present).
- `pnpm build` compiles. After build, `.next/static/media/` contains IBM Plex Serif woff2 files.
  </behavior>
  <read_first>
    - .planning/phases/01-fondamenta/01-RESEARCH.md §2 "Tailwind v4 @theme — exact syntax (FND-02)" — FULL globals.css prescribed shape (copy verbatim)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §2 "@theme vs @theme inline — why we use inline" (the cascade scoping explanation — use @theme inline)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §3 "next/font — self-hosted Inter + IBM Plex Serif (FND-04)" — FULL layout.tsx font setup (subsets, weights, variable names, display, adjustFontFallback)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §8 "app/layout.tsx — complete Phase 1 shape" (verbatim source)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §"Common Pitfalls" (Pitfall 1 @theme inline, Pitfall 6 lang="it")
    - app/globals.css (current state — Wave 0 scaffold default; we replace wholesale)
    - app/layout.tsx (current state — Wave 0 stub from Plan 01-01; we replace wholesale while keeping all required elements)
    - content/site.ts (just created in Task 1 — we import from it)
    - content/navigation.ts (just created — we import from it indirectly via Header)
  </read_first>
  <files>
    app/globals.css, app/layout.tsx, app/page.tsx
  </files>
  <action>
Step 1 — REPLACE `app/globals.css` WHOLESALE with this exact content:

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
/* @theme inline resolves var() at definition time, preventing scoping issues
   when utilities reference CSS variables from next/font. See RESEARCH §2 Pitfall 1. */
@theme inline {
  /* Brand colors — generates bg-ink, text-ink, bg-panna, text-brand, etc. */
  --color-ink: var(--color-ink);
  --color-panna: var(--color-panna);
  --color-brand: var(--color-brand);
  --color-border: var(--color-border);
  --color-surface: var(--color-surface);

  /* Fonts — wired to next/font CSS variables.
     --font-sans is Tailwind's default font-sans utility.
     --font-serif is the serif utility, used on hero + H1 only (D-08). */
  --font-sans: var(--font-inter);
  --font-serif: var(--font-ibm-plex-serif);

  /* Fluid type scale — D-10 base 17px, ratio 1.25.
     Only h1 + h2 use clamp(); body / UI stay discrete. */
  --text-h1: clamp(2.25rem, 1.5rem + 3.2vw, 4rem);
  --text-h1--line-height: 1.1;
  --text-h2: clamp(1.625rem, 1.25rem + 1.6vw, 2.25rem);
  --text-h2--line-height: 1.2;
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

Step 2 — REPLACE `app/layout.tsx` WHOLESALE with this exact content (from RESEARCH §8, slightly adapted — `defaultMetadata` import is commented out because Plan 01-03 creates it; a `metadata: Metadata` placeholder is used instead):

```tsx
// app/layout.tsx
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

**CRITICAL checklist for this file** (enforced by check:layout and grep):
- `lang="it"` on `<html>` (not `en`, not `it-IT`)
- `className={`${inter.variable} ${ibmPlexSerif.variable}`}` — variables concatenated, NOT `.className`
- `<Header />`, `<Footer />`, `<Analytics />`, `<SpeedInsights />` all present
- Imports from `@vercel/analytics/next` and `@vercel/speed-insights/next` (NOT `/react`, NOT bare)

Step 3 — UPDATE `app/page.tsx` to use the Phase 1 design tokens now that they exist:

```tsx
// app/page.tsx
// Placeholder di Phase 1. La homepage reale arriva in Phase 2.
import { siteContent } from "@/content/site";

export default function Home() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-ink/60">
        Fondamenta
      </p>
      <h1 className="font-serif text-[length:var(--text-h1)] leading-[var(--text-h1--line-height)] text-ink">
        {siteContent.brand.name} — sito in costruzione
      </h1>
      <p className="mt-6 max-w-prose text-lg text-ink/80">
        {siteContent.brand.tagline}
      </p>
    </section>
  );
}
```

Note on `text-[length:var(--text-h1)]`: Tailwind v4's arbitrary value syntax for typed CSS values. Alternative: if Tailwind v4 auto-generates a `text-h1` utility from `@theme` (it should per RESEARCH §2 "Generated utilities"), you can just use `text-h1`. Try `text-h1` first — it should work. If it doesn't compile, fall back to `text-[length:var(--text-h1)] leading-[var(--text-h1--line-height)]`.

Step 4 — Run the full rail:

```bash
pnpm lint
pnpm typecheck
pnpm check:compliance
pnpm check:contrast
pnpm check:layout
pnpm build
```

All MUST pass. Common failures:
- Build fails on `text-h1` → fall back to the arbitrary value syntax shown above, or use `text-5xl` temporarily.
- check:layout fails → recheck required elements are spelled exactly `<Header`, `<Footer`, `<Analytics`, `<SpeedInsights`, `lang="it"` (no fancy formatting that splits the attribute across lines).
- check:compliance fails → you accidentally introduced a forbidden string. Remove it.

Step 5 — After build, inspect `.next/static/media/` for IBM Plex Serif woff2:

```bash
ls .next/static/media/ 2>/dev/null | head -20
```

Should list `.woff2` files. Next.js renames them with content hashes; look for files containing `ibm` or similar. (This verifies FND-04 — fonts actually landed as static assets.)
  </action>
  <verify>
    <automated>
test -f app/globals.css && \
grep -q '#1a1a1a' app/globals.css && \
grep -q '#f8f5ee' app/globals.css && \
grep -q '#291572' app/globals.css && \
grep -q '@theme inline' app/globals.css && \
grep -q -- '--font-sans' app/globals.css && \
grep -q -- '--font-serif' app/globals.css && \
grep -q -- '--text-h1' app/globals.css && \
grep -q 'font-size: 17px' app/globals.css && \
test -f app/layout.tsx && \
grep -q 'next/font/google' app/layout.tsx && \
grep -q 'Inter' app/layout.tsx && \
grep -q 'IBM_Plex_Serif' app/layout.tsx && \
grep -q '"--font-inter"' app/layout.tsx && \
grep -q '"--font-ibm-plex-serif"' app/layout.tsx && \
grep -q 'lang="it"' app/layout.tsx && \
grep -q '<Header' app/layout.tsx && \
grep -q '<Footer' app/layout.tsx && \
grep -q '<Analytics' app/layout.tsx && \
grep -q '<SpeedInsights' app/layout.tsx && \
grep -q '@vercel/analytics/next' app/layout.tsx && \
grep -q '@vercel/speed-insights/next' app/layout.tsx && \
! grep -q 'fonts.googleapis.com' app/layout.tsx && \
pnpm lint && \
pnpm typecheck && \
pnpm check:compliance && \
pnpm check:contrast && \
pnpm check:layout && \
pnpm build
    </automated>
  </verify>
  <done>
`app/globals.css` is the Phase 1 `@theme inline` shape with ink/panna/brand/border/surface tokens, font variable wiring, clamp H1/H2, body base 17px. `app/layout.tsx` wires Inter + IBM Plex Serif via `next/font/google`, sets `lang="it"`, mounts Header/Footer/Analytics/SpeedInsights. All Wave 0 checks still pass. `pnpm build` completes without warnings.
  </done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Replace stub Header.tsx and Footer.tsx with real Server Components — sticky desktop single-row header with CTA, 4-column desktop footer reading from content modules</name>
  <behavior>
- `components/layout/Header.tsx` is a Server Component (no `"use client"` at top).
- Header renders `<header class="sticky top-0 z-40 ...">` with border-bottom and panna/95 backdrop.
- Header has three zones: `[logo | desktop nav | desktop CTA "Richiedi un sopralluogo"]`.
- Desktop nav maps `primaryNav` from `content/navigation.ts` — 5 links.
- Desktop CTA uses `primaryCta` — href="/contatti", label="Richiedi un sopralluogo", styled `bg-brand text-panna` (panna-on-brand, per D-06 fill rule).
- Desktop nav + CTA hidden below `md:` breakpoint; mobile zone visible only below `md:`.
- Mobile zone (hidden `md:`+) renders a click-to-call anchor using `siteContent.contact.phone.tel` with inline SVG phone icon and `aria-label` in Italian.
- No hardcoded Italian strings — everything from content modules.
- No icons from `lucide-react` (not installed); use inline SVG.
- `components/layout/Footer.tsx` is a Server Component with `<footer>` containing a `<div>` grid of 4 columns on desktop (`md:grid-cols-4`), stacking on mobile.
- Column 1 (Identity): `siteContent.brand.name` in `font-serif`, `legalContent.ragioneSociale`, service area text.
- Column 2 (Sections): `<nav aria-label>` with `primaryNav` links.
- Column 3 (Contacts): phone (tel: link), email (mailto: link), pec (mailto: link), hours (map over hours array).
- Column 4 (Legal + certifications): P.IVA, REA, codice fiscale, capitale sociale, sede legale, SOA + ISO badges (text placeholders for Phase 1 per D-16).
- Bottom bar: copyright + legale nav (Privacy / Cookie policy) from `footerNav`.
- Footer uses `bg-surface` (white break from panna dominant — see D-04 minimal neutrals).
  </behavior>
  <read_first>
    - .planning/phases/01-fondamenta/01-RESEARCH.md §"Example — components/layout/Header.tsx (sketch, Server Component)" — the FULL sketch source (starting point; planner may refine)
    - .planning/phases/01-fondamenta/01-RESEARCH.md §"Example — components/layout/Footer.tsx (sketch, Server Component)" — the FULL sketch source
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-13, D-14, D-15 (desktop single-row, mobile click-to-call, sticky)
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-16 (4-column footer), §D-17 (Server Component footer)
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-06 CRITICAL (fill-only rule: brand as background with panna text inside; NEVER brand text adjacent to ink)
    - .planning/phases/01-fondamenta/01-CONTEXT.md §"Specifics" "Pura pulizia desktop, pragmatismo mobile"
    - content/site.ts (imported — verify the shape of siteContent.contact.phone.tel, .hours array, etc.)
    - content/legal.ts (imported — verify legalContent shape)
    - content/navigation.ts (imported — verify primaryNav, primaryCta, footerNav)
    - components/layout/Header.tsx (current Wave 0 stub — replacing wholesale)
    - components/layout/Footer.tsx (current Wave 0 stub — replacing wholesale)
    - CLAUDE.md §"Frontend Architecture" ("RSC di default", "Client solo per interazioni reali") and §"Design System Rules"
  </read_first>
  <files>
    components/layout/Header.tsx, components/layout/Footer.tsx
  </files>
  <action>
Step 1 — REPLACE `components/layout/Header.tsx` WHOLESALE with this Server Component (derived from RESEARCH §"Example — Header.tsx" with minor cleanups; no `"use client"`):

```tsx
// components/layout/Header.tsx
// Server Component. No client interaction in Phase 1.
// Hamburger menu is a Phase 2 concern (needs a client island).

import Link from "next/link";
import { primaryNav, primaryCta } from "@/content/navigation";
import { siteContent } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-panna/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo / brand wordmark */}
        <Link
          href="/"
          className="font-serif text-xl font-medium text-ink"
          aria-label={`${siteContent.brand.name} — home`}
        >
          {siteContent.brand.name}
        </Link>

        {/* Desktop nav (D-13 single-row) */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navigazione principale"
        >
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

        {/* Desktop CTA (D-06 fill-only: panna text on brand background) */}
        <Link
          href={primaryCta.href}
          className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-panna transition-colors hover:bg-brand/90 md:inline-flex"
        >
          {primaryCta.label}
        </Link>

        {/* Mobile zone — click-to-call (HOM-05 / D-14) + hamburger placeholder.
            Hamburger interactivity lands in Phase 2. */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${siteContent.contact.phone.tel}`}
            aria-label={`Chiama ${siteContent.brand.name}`}
            className="rounded-full border border-ink/20 p-2.5 text-ink transition-colors hover:border-ink/60"
          >
            {/* Inline phone SVG — Phase 1 avoids lucide-react per CLAUDE.md safety rules */}
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
          {/* TODO Phase 2: hamburger menu (client island). */}
        </div>
      </div>
    </header>
  );
}
```

Step 2 — REPLACE `components/layout/Footer.tsx` WHOLESALE with this Server Component (derived from RESEARCH §"Example — Footer.tsx"):

```tsx
// components/layout/Footer.tsx
// Server Component. Reads from content/site.ts + content/legal.ts + content/navigation.ts.
// D-16 — 4 columns desktop, stack mobile. D-17 — zero client JS.

import Link from "next/link";
import { siteContent } from "@/content/site";
import { legalContent } from "@/content/legal";
import { primaryNav, footerNav } from "@/content/navigation";

export function Footer() {
  const legaleGroup = footerNav.find((g) => g.title === "Legale");

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
                  <Link href={item.href} className="text-sm text-ink/80 hover:text-ink">
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

          {/* Col 4 — Legal + certifications (FND-06, D.Lgs. 70/2003 art. 7) */}
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
          {legaleGroup ? (
            <nav className="flex gap-4" aria-label="Note legali">
              {legaleGroup.items.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
```

Note on `legaleGroup`: `footerNav.find(...)` returns `NavGroup | undefined`, which under `noUncheckedIndexedAccess` requires the `? :` guard. Do NOT use `!` (non-null assertion) — that's a code-smell. The pattern above is clean.

Step 3 — Run the full rail:

```bash
pnpm lint
pnpm typecheck
pnpm check:compliance
pnpm check:contrast
pnpm check:layout
pnpm build
```

All MUST pass. Specifically:
- `pnpm typecheck` under strict + `noUncheckedIndexedAccess` should pass because we use `.map()` and the `find(...) ? :` guard.
- `pnpm check:layout` passes because `<Header />`, `<Footer />`, `<Analytics />`, `<SpeedInsights />`, `lang="it"` are all still in `app/layout.tsx`.
- `pnpm build` generates `.next/static/media/` with IBM Plex Serif woff2.

Step 4 — Manual sanity check (no command):
- `pnpm dev`
- Visit http://localhost:3000
- Confirm: sticky header at top with "Edilferro" wordmark, 5 nav links, "Richiedi un sopralluogo" pill button.
- Confirm: 4-column footer at bottom with legal data, SOA/ISO badges, copyright.
- Resize to 375px (DevTools): nav + CTA collapse, mobile zone shows phone icon; footer stacks vertically.
- Ctrl+C to stop dev server.

(Manual check is not enforceable by the `<automated>` verify, but Plan 01-02 must NOT ship if it looks broken.)
  </action>
  <verify>
    <automated>
test -f components/layout/Header.tsx && \
! grep -q '"use client"' components/layout/Header.tsx && \
grep -q 'from "@/content/navigation"' components/layout/Header.tsx && \
grep -q 'from "@/content/site"' components/layout/Header.tsx && \
grep -q 'primaryCta' components/layout/Header.tsx && \
grep -q 'sticky top-0' components/layout/Header.tsx && \
grep -q 'md:flex' components/layout/Header.tsx && \
grep -q 'md:hidden' components/layout/Header.tsx && \
grep -q 'tel:' components/layout/Header.tsx && \
grep -q 'bg-brand' components/layout/Header.tsx && \
grep -q 'text-panna' components/layout/Header.tsx && \
test -f components/layout/Footer.tsx && \
! grep -q '"use client"' components/layout/Footer.tsx && \
grep -q 'from "@/content/site"' components/layout/Footer.tsx && \
grep -q 'from "@/content/legal"' components/layout/Footer.tsx && \
grep -q 'from "@/content/navigation"' components/layout/Footer.tsx && \
grep -q 'md:grid-cols-4' components/layout/Footer.tsx && \
grep -q 'legalContent.piva' components/layout/Footer.tsx && \
grep -q 'legalContent.rea' components/layout/Footer.tsx && \
grep -q 'capitaleSociale' components/layout/Footer.tsx && \
grep -q 'sedeLegale' components/layout/Footer.tsx && \
pnpm lint && \
pnpm typecheck && \
pnpm check:compliance && \
pnpm check:contrast && \
pnpm check:layout && \
pnpm build
    </automated>
  </verify>
  <done>
Header is a Server Component with sticky desktop single-row layout (logo + nav + CTA), mobile-only click-to-call icon, reads from content/navigation + content/site. Footer is a Server Component with 4-column desktop grid (Identity/Sections/Contacts/Legal), displays P.IVA/REA/capitale sociale/sede legale from legalContent, reads from all three content modules. Both are zero-client-JS. Full Wave 0 rail still passes. `pnpm build` still green.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| `app/layout.tsx` → every page render | Global shell wraps all route content; a bug here breaks every page |
| `content/*.ts` → UI | Content modules feed both UI strings AND legally-required disclosures (P.IVA, REA); wrong values have regulatory consequences |
| `next/font` build → `.next/static/media` | Fonts are downloaded from Google at BUILD time, not runtime; a build-time supply-chain tamper is theoretically possible |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-02-01 | Information Disclosure | Google Fonts CDN leaking IPs | mitigate | `next/font/google` self-hosts — zero runtime hits to fonts.googleapis.com; verified by `check:compliance` grep on built output |
| T-01-02-02 | Tampering | Footer legal copy (wrong P.IVA tarnishing credibility / legal exposure) | mitigate | All legal fields colocated in `content/legal.ts` with `// TODO cliente:` comments; single source of truth; review-gated by PR; substitution is a dedicated commit (D-19) |
| T-01-02-03 | Repudiation | Decision provenance for brand palette | accept | `app/globals.css` comments tie each token to `D-01/02/03`; `scripts/check-contrast.mjs` asserts WCAG structurally; any future change shows in PR diff |
| T-01-02-04 | Tampering | Content modules hardcoded in another component (breaks single-source) | accept | CLAUDE.md rule + code review catches hardcoded Italian strings; no static analyzer in Phase 1 (could add a custom lint rule in Phase 7) |
| T-01-02-05 | Information Disclosure | CSS variables leaking through Tailwind classes (low-risk) | accept | Tailwind v4 @theme is a compile-time token system — no runtime info leak. Listed for completeness |
</threat_model>

<verification>
Overall plan verification:

```bash
# Full Wave 0 + Wave 1 rail
pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout && pnpm build

# Content module presence
test -f content/site.ts && grep -q 'export const siteContent' content/site.ts && \
test -f content/legal.ts && grep -q 'export const legalContent' content/legal.ts && \
test -f content/navigation.ts && grep -q 'export const primaryNav' content/navigation.ts && \
test -f lib/utils/cn.ts && \
echo "content modules OK"

# Design tokens
grep -q '#1a1a1a' app/globals.css && \
grep -q '#f8f5ee' app/globals.css && \
grep -q '#291572' app/globals.css && \
grep -q '@theme inline' app/globals.css && \
echo "design tokens OK"

# next/font
grep -q 'Inter' app/layout.tsx && \
grep -q 'IBM_Plex_Serif' app/layout.tsx && \
grep -q 'next/font/google' app/layout.tsx && \
echo "fonts OK"

# Server Components (no 'use client' in Header/Footer)
! grep -q '"use client"' components/layout/Header.tsx && \
! grep -q '"use client"' components/layout/Footer.tsx && \
echo "RSC OK"

# Woff2 landed in build output (proves next/font materialized)
ls .next/static/media/ 2>/dev/null | grep -iE 'woff2|ibm' | head -5
```

Manual check (human):
1. `pnpm dev` — site loads at :3000 with panna background, ink titles, brand CTA pill.
2. Desktop (1440px): sticky header single-row, 4-column footer with legal data.
3. Mobile (375px via DevTools): nav collapses, phone icon visible, footer stacks vertically.
4. DevTools → Elements → `<html>`: confirms `lang="it"` and `className` contains both font variables.
5. DevTools → Network: NO requests to `fonts.googleapis.com` or `fonts.gstatic.com`.
</verification>

<success_criteria>
- FND-02: brand tokens defined in `globals.css` via `@theme inline`, WCAG AA verified via `check:contrast`
- FND-03: `components/{ui,sections,business,layout}` all exist in git; `layout/Header.tsx` + `layout/Footer.tsx` are real files
- FND-04: Inter + IBM Plex Serif loaded via `next/font/google`; `.next/static/media/` contains woff2 after build
- FND-05: `content/site.ts` contains canonical NAP with `siteContent` named export
- FND-06: `content/legal.ts` contains `legalContent` with piva/rea/capitaleSociale/sedeLegale, rendered in footer
- FND-07: `<Header />` + `<Footer />` mount in `app/layout.tsx` — check:layout confirms
- FND-08: `<Analytics />` + `<SpeedInsights />` mount; `check:compliance` confirms zero GA4/gtag/etc strings
- All D-01 to D-24 decisions honored (not D-25/26/27 — those live in Plan 01-04)
- Wave 0 rail still green: `pnpm lint && pnpm typecheck && pnpm check:compliance && pnpm check:contrast && pnpm check:layout && pnpm build`
</success_criteria>

<output>
After completion, create `.planning/phases/01-fondamenta/01-02-SUMMARY.md` recording:
- Wave 1 closed: design system + global layout + content modules
- Brand tokens finalized (ink/panna/brand) with WCAG values
- Fonts: Inter 400/500/600, IBM Plex Serif 500 chosen (RESEARCH Q2 recommendation)
- Any deviation on `text-h1` Tailwind utility generation (if fallback to `text-[length:var(--text-h1)]` was needed)
- Status of `typedRoutes: true` (kept or disabled — if disabled, note the reason and Phase 2 follow-up)
- Handoff to Plan 01-03: `app/layout.tsx` currently uses an inline `metadata` object; 01-03 replaces it with `import { defaultMetadata } from "@/lib/seo/metadata"`
</output>
