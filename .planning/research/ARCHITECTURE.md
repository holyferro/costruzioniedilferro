# Architecture Research — Impresa Edile SRL Website

**Domain:** Institutional corporate website / lead-generation site for a local Italian construction company (45y history, Mestre/Venezia/Veneto). Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, Vercel.
**Researched:** 2026-04-13
**Confidence:** HIGH

---

## TL;DR

A **single-Next.js-app, RSC-by-default, static-first** architecture with **three clearly separated component tiers** (`ui/`, `sections/`, `business/`), **typed TS content loaders** (no MDX for MVP — plain TS data objects), **one Server Action** for the contact form, and **zero client-side state libraries**. The whole site is five static routes plus one dynamic `[slug]` route, all generated at build time and served from Vercel's edge cache. The only Client Component islands are: (1) the contact form on `/contatti`, (2) the mobile sticky CTA bar, (3) the mobile nav drawer, and (4) the Sonner toast container. Everything else is a Server Component that emits plain HTML.

The directory layout, content model and component boundaries below are deliberately opinionated: for a 5-page institutional site there is one right answer, and trying to keep options open is how you end up with MDX plus a CMS plus a loader abstraction plus a CI job to sync them. **Pick the boring path.**

---

## System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                       BROWSER (client)                           │
│                                                                  │
│  RSC-rendered HTML  +  tiny JS islands (form, sticky CTA, nav)   │
│          ↑                         ↑                             │
└──────────┼─────────────────────────┼─────────────────────────────┘
           │ static HTML + RSC payload          │ fetch("/_next/action/...")
           │                                    │
┌──────────┴────────────────────────────────────┴──────────────────┐
│              VERCEL EDGE  (Next.js 16 runtime)                   │
│                                                                  │
│   ┌────────────────────┐         ┌────────────────────────────┐  │
│   │  Static Routes     │         │   Server Action            │  │
│   │  (SSG at build)    │         │   app/contatti/actions.ts  │  │
│   │                    │         │                            │  │
│   │  /                 │         │   1. Zod validation        │  │
│   │  /servizi          │         │   2. Turnstile verify      │  │
│   │  /progetti         │         │   3. Honeypot + rate check │  │
│   │  /progetti/[slug]  │         │   4. Resend send           │  │
│   │  /chi-siamo        │         │   5. Return { ok, error }  │  │
│   │  /contatti         │         └─────────────┬──────────────┘  │
│   │  /privacy          │                       │                 │
│   │  /cookie-policy    │                       │                 │
│   └─────────┬──────────┘                       │                 │
│             │                                  │                 │
│             │ reads                            │ POST            │
└─────────────┼──────────────────────────────────┼─────────────────┘
              │                                  │
┌─────────────▼──────────────┐   ┌───────────────▼─────────────────┐
│  BUILD-TIME CONTENT        │   │      EXTERNAL SERVICES          │
│                            │   │                                 │
│  content/                  │   │  ┌─────────┐    ┌────────────┐  │
│   ├── projects/*.ts        │   │  │ Resend  │    │ Turnstile  │  │
│   ├── services.ts          │   │  │  API    │    │  siteverify│  │
│   ├── certifications.ts    │   │  └─────────┘    └────────────┘  │
│   ├── mezzi.ts             │   │                                 │
│   ├── team.ts              │   │                                 │
│   └── site.ts (NAP, hours) │   │                                 │
└────────────────────────────┘   └─────────────────────────────────┘
```

**Key properties:**
- **All pages are statically generated** at build time (`export const dynamic = 'force-static'` where appropriate, default SSG otherwise). No runtime DB, no runtime CMS fetch.
- **Only `/progetti` and `/progetti/[slug]` read content at build time**, from typed TS modules, producing fully static HTML.
- **Only `/contatti` has a Server Action endpoint.** It runs on the Node runtime (not Edge — Resend SDK safety).
- **`searchParams` on `/progetti`** (for category/location/committente filters) makes that page a dynamic RSC render per filter combination, which is fine — each combination is cheap, cacheable by the CDN, and emits zero client JS.

---

## Directory Layout

```
edilferro-site/
├── app/                          # App Router routes — RSC by default
│   ├── layout.tsx                # <html lang="it"> + fonts + Analytics + SpeedInsights
│   ├── page.tsx                  # Home
│   ├── not-found.tsx             # 404
│   ├── error.tsx                 # Root error boundary
│   ├── loading.tsx               # Root loading (skeleton)
│   ├── sitemap.ts                # Built-in sitemap generator
│   ├── robots.ts                 # Built-in robots.txt generator
│   ├── opengraph-image.tsx       # Default OG image (or static .jpg)
│   ├── icon.tsx                  # Favicon convention
│   ├── globals.css               # Tailwind v4 @theme tokens + base layer
│   │
│   ├── servizi/
│   │   └── page.tsx
│   │
│   ├── progetti/
│   │   ├── page.tsx              # Portfolio grid, reads searchParams for filters
│   │   └── [slug]/
│   │       ├── page.tsx          # Project detail (generateStaticParams)
│   │       └── opengraph-image.tsx  # Per-project OG image
│   │
│   ├── chi-siamo/
│   │   └── page.tsx              # Includes certifications section inline
│   │
│   ├── contatti/
│   │   ├── page.tsx              # Contact page shell (RSC)
│   │   └── actions.ts            # 'use server' Server Action for form submit
│   │
│   ├── privacy/
│   │   └── page.tsx
│   └── cookie-policy/
│       └── page.tsx
│
├── components/
│   ├── ui/                       # Design-system primitives — zero business knowledge
│   │   ├── button.tsx            # <Button variant="primary|secondary|ghost">
│   │   ├── container.tsx         # max-w + responsive padding wrapper
│   │   ├── section.tsx           # semantic <section> + vertical rhythm tokens
│   │   ├── heading.tsx           # H1–H4 with typography tokens
│   │   ├── prose.tsx             # Long-form copy wrapper (Tailwind typography tokens)
│   │   ├── link.tsx              # Next <Link> wrapper with hover styles
│   │   ├── input.tsx             # Form input (used inside form islands)
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── checkbox.tsx
│   │   ├── field.tsx             # Label + input + error wrapper
│   │   ├── badge.tsx             # Small pill (used for committente badges)
│   │   ├── divider.tsx
│   │   ├── icon.tsx              # Thin wrapper around lucide-react with size tokens
│   │   └── image.tsx             # next/image wrapper with default sizes presets
│   │
│   ├── sections/                 # Full-width page sections — composed of ui + business
│   │   ├── hero.tsx              # TS-01: Home hero with CTA
│   │   ├── trust-strip.tsx       # TS-02: 45 anni / 30 dipendenti / N cantieri
│   │   ├── services-overview.tsx # TS-04: 4–6 service tiles on home
│   │   ├── services-detail.tsx   # Per-service anchored section on /servizi
│   │   ├── metodo-section.tsx    # DF-11 (post-launch)
│   │   ├── enti-pubblici-section.tsx # DF-05
│   │   ├── projects-grid.tsx     # TS-07: portfolio grid
│   │   ├── projects-filters.tsx  # TS-09 + DF-02: filter chips (RSC, URL-driven)
│   │   ├── project-gallery.tsx   # TS-08: project detail gallery
│   │   ├── project-meta.tsx      # TS-08: project detail meta table
│   │   ├── company-intro.tsx     # TS-10: chi siamo narrative
│   │   ├── certifications.tsx    # TS-11: SOA + ISO cards with PDF downloads
│   │   ├── soa-table.tsx         # DF-03: SOA categories human-readable
│   │   ├── mezzi-showcase.tsx    # DF-07: fleet image grid
│   │   ├── team-signal.tsx       # DF-09: "30 persone" signal block
│   │   ├── sopralluogo-explainer.tsx # DF-10
│   │   ├── contact-info.tsx      # TS-12: phone/email/PEC/address cards
│   │   ├── contact-form.tsx      # TS-13: 'use client' — RHF + Zod + Turnstile
│   │   ├── opening-hours.tsx     # DF-14
│   │   ├── final-cta.tsx         # Repeated "Richiedi un sopralluogo" band
│   │   └── page-header.tsx       # Inner-page hero (title + kicker, no image)
│   │
│   ├── business/                 # Domain-aware components — know about content types
│   │   ├── project-card.tsx      # Renders one Project with badge + cover + meta
│   │   ├── service-card.tsx      # Renders one Service tile
│   │   ├── certification-card.tsx # Renders one Certification w/ PDF link
│   │   ├── mezzo-card.tsx        # Renders one fleet item
│   │   ├── trust-number.tsx      # Renders one numeric trust signal
│   │   ├── committente-badge.tsx # DF-08: privato/ente-pubblico/professionista pill
│   │   ├── sopralluogo-button.tsx # The global primary CTA — single source of truth
│   │   └── site-footer-legal.tsx # P.IVA / REA / capitale sociale block
│   │
│   └── layout/                   # Global chrome (used by app/layout.tsx)
│       ├── site-header.tsx       # Desktop header (RSC)
│       ├── site-nav.tsx          # Desktop nav links (RSC)
│       ├── mobile-nav.tsx        # 'use client' — drawer toggle
│       ├── mobile-sticky-cta.tsx # 'use client' — bottom-fixed CTA on mobile
│       ├── site-footer.tsx       # Full footer (RSC)
│       └── json-ld.tsx           # TS-22: <script type="application/ld+json"> RSC
│
├── content/                      # Typed TS content — single source of truth
│   ├── site.ts                   # NAP, opening hours, area served, social links
│   ├── services.ts               # Services array
│   ├── certifications.ts         # SOA + ISO entries
│   ├── mezzi.ts                  # Fleet inventory
│   ├── team.ts                   # Team dimension stats (not individuals)
│   ├── timeline.ts               # Heritage milestones (post-launch)
│   ├── legal.ts                  # P.IVA, REA, capitale sociale, sede legale
│   └── projects/
│       ├── index.ts              # Re-exports + getAllProjects() + getProjectBySlug()
│       ├── palazzo-mestre-2024.ts
│       ├── scuola-marghera-2023.ts
│       └── ...                   # One file per project, ~10–20 files
│
├── lib/                          # Pure utilities — no React
│   ├── cn.ts                     # clsx + tailwind-merge helper
│   ├── content/
│   │   ├── projects.ts           # filterProjects(searchParams) pure function
│   │   └── url.ts                # buildFilterHref() — URL helpers for filter links
│   ├── schema/
│   │   ├── contact.ts            # Zod schema for contact form (shared client+server)
│   │   └── project.ts            # Zod schema validating project content shape
│   ├── email/
│   │   ├── resend.ts             # Resend client singleton
│   │   ├── templates/
│   │   │   ├── lead-notification.tsx # React Email template → owner inbox
│   │   │   └── lead-auto-reply.tsx   # React Email template → lead
│   │   └── send-lead.ts          # Composition: lead payload → both emails
│   ├── turnstile.ts              # Server-side token verification
│   ├── seo/
│   │   ├── metadata.ts           # Shared buildMetadata() helper
│   │   └── json-ld.ts            # Builds GeneralContractor JSON-LD from content/site.ts
│   ├── routes.ts                 # Typed route constants (single source)
│   └── analytics.ts              # Tiny wrapper if we ever need custom events
│
├── types/                        # Shared TS types
│   ├── content.ts                # Project, Service, Certification, Mezzo, Site, etc.
│   ├── filters.ts                # ProjectFilters = { categoria?, zona?, committente? }
│   └── forms.ts                  # ContactFormData (inferred from Zod)
│
├── public/
│   ├── images/
│   │   ├── hero/                 # Homepage + page-header background images
│   │   │   ├── home-hero.avif
│   │   │   └── ...
│   │   ├── projects/
│   │   │   ├── palazzo-mestre-2024/
│   │   │   │   ├── cover.avif
│   │   │   │   ├── gallery-01.avif
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── mezzi/                # Fleet photos
│   │   ├── team/                 # Group photo(s)
│   │   ├── cantieri/             # Reusable cantiere shots for sections/backgrounds
│   │   └── og/                   # Open Graph images
│   │       ├── default.jpg
│   │       └── projects/{slug}.jpg
│   ├── docs/                     # Public PDFs
│   │   ├── soa-attestazione.pdf
│   │   ├── iso-9001.pdf
│   │   └── company-profile.pdf   # DF-04 (post-launch)
│   └── favicon.ico               # Generated by app/icon.tsx if using file convention
│
├── .env.local                    # RESEND_API_KEY, TURNSTILE_SECRET, NEXT_PUBLIC_TURNSTILE_SITE_KEY, OWNER_EMAIL
├── .env.example                  # Checked into git
├── eslint.config.mjs             # Flat config — Next 16 removed `next lint`
├── prettier.config.mjs
├── tsconfig.json                 # strict + noUncheckedIndexedAccess
├── next.config.ts                # experimental.optimizePackageImports: ['lucide-react']
├── postcss.config.mjs            # @tailwindcss/postcss
└── package.json
```

### Why this layout (rationale)

- **`components/{ui,sections,business,layout}` four-tier split** directly reflects CLAUDE.md rules and adds one tier (`layout/`) for global chrome — header, footer, mobile nav, sticky CTA, JSON-LD. Putting these in `sections/` would bleed "once-per-site" concerns into "once-per-page" concerns.
- **`content/` as a top-level folder** (not under `lib/` or `app/`) signals that content is a first-class citizen and makes it easy for the client-side edit-by-PR workflow. A non-developer can be pointed at one folder.
- **`lib/` has zero React imports** by convention. All JSX lives under `app/` or `components/`. This makes the JS/TS split obvious to lint rules and prevents accidentally importing a client hook into a pure utility.
- **`types/` is separate from `lib/`** even though it's pure TS, because types are consumed by both `lib/` and `components/` and keeping them neutral avoids circular-import traps.
- **`public/docs/`** is separate from `public/images/` so the client can drop new PDFs (updated SOA attestazioni) without touching image pipelines.

---

## Content Model Decision

**Decision: typed TS modules under `content/`, NOT MDX, NOT a CMS.**

### Why TS data over MDX

Three viable options for static content on this site:

| Option | Setup | Type safety | Rich formatting | Search/filter | Verdict |
|---|---|---|---|---|---|
| **A. Typed TS modules** | Zero — just import | Full (types + optional Zod validation) | Template strings / JSX fragments | Trivial (array operations) | **CHOSEN** |
| **B. MDX collections** (`@next/mdx` or `content-collections`) | MDX loader + frontmatter parser + schema | Frontmatter only; body is opaque | Best for long prose | Works via frontmatter | Overkill |
| **C. Headless CMS** (Sanity / Payload / Contentful) | Auth, hosting, client, DPA | Good | Excellent | Excellent | Already rejected in STACK.md |

**For 10–20 project entries each with 4–8 photos, a short description (~150 words), and structured metadata, option A wins on every axis:**

1. **No rich-text required.** Project descriptions are short and uniform. The real "content" is the photos and the metadata, not flowing prose with pull quotes, headers and footnotes.
2. **Metadata-first.** Every field (location, committente, anno, categoria, durata, ruolo, images) is structured. MDX is optimized for "body + some frontmatter" — this project is "lots of fields + a paragraph".
3. **Filter logic is trivial** on a TS array (`.filter(p => matches(p, searchParams))`). MDX requires a separate indexing layer to do the same.
4. **Zero build complexity.** No MDX loader, no frontmatter schema validator, no content-collections dependency, no CI cache warmup. One `import` statement.
5. **Type safety at write time.** `Project` type in `types/content.ts` is enforced by TS when authoring each project file. MDX frontmatter is validated at build time, after the fact.
6. **Editable by the client via PR** just as easily. If the client wants to add a project, the diff is one new file in `content/projects/` — same ergonomics as adding an MDX file, with better error messages.

### Content shape

```typescript
// types/content.ts
export type Committente = 'privato' | 'ente-pubblico' | 'professionista';
export type ProjectCategory =
  | 'nuova-costruzione'
  | 'ristrutturazione'
  | 'ristrutturazione-di-pregio'
  | 'opere-pubbliche'
  | 'commerciale-industriale'
  | 'manutenzione';
export type Zona = 'mestre' | 'venezia' | 'provincia-venezia' | 'veneto' | 'altro';

export type ProjectImage = {
  src: string;        // e.g. '/images/projects/palazzo-mestre-2024/gallery-01.avif'
  alt: string;        // Italian alt text, descriptive
  width: number;
  height: number;
};

export type Project = {
  slug: string;                    // URL slug, kebab-case
  title: string;
  anno: number;
  committente: Committente;
  committenteName?: string;        // Optional — only if consented
  categoria: ProjectCategory;
  zona: Zona;
  localita: string;                // "Mestre (VE)"
  durata?: string;                 // "8 mesi"
  ruolo: string;                   // "Impresa esecutrice principale"
  summary: string;                 // 1 sentence, shown on card
  description: string;             // ~150 words, shown on detail page
  cover: ProjectImage;
  gallery: ProjectImage[];
  featured?: boolean;              // For homepage "ultimi cantieri"
};

export type Service = {
  slug: string;                    // for anchor on /servizi#slug
  title: string;
  icon: string;                    // lucide icon name
  summary: string;
  bullets: string[];
  image?: ProjectImage;
  targets: Committente[];          // which audiences this service addresses
};

export type Certification = {
  slug: string;
  name: string;                    // "SOA OG1 Classe V"
  authority: string;               // "ESNA"
  validFrom: string;               // ISO date
  validUntil?: string;
  pdfUrl: string;                  // /docs/soa-attestazione.pdf
  description: string;             // Human-readable what-this-means
};

export type Mezzo = {
  slug: string;
  name: string;                    // "Escavatore cingolato 20t"
  category: 'movimento-terra' | 'sollevamento' | 'trasporto' | 'attrezzatura';
  image: ProjectImage;
  caption?: string;
};

export type TeamSignal = {
  headcount: number;               // 30
  avgTenureYears?: number;
  activeCantieri?: number;
  groupPhoto: ProjectImage;
};

export type SiteConfig = {
  companyName: string;
  legalName: string;               // "Edilferro SRL"
  foundedYear: number;             // 1981
  piva: string;
  rea: string;
  capitaleSociale: string;
  sedeLegale: Address;
  phones: { label: string; e164: string; display: string }[];
  emails: { label: string; address: string }[];
  pec: string;
  openingHours: OpeningHours[];
  areaServed: string[];            // ["Mestre", "Venezia", "Veneto"]
  social?: { platform: string; url: string }[];
};
```

### Content loaders (pure functions, RSC-safe)

```typescript
// content/projects/index.ts
import type { Project } from '@/types/content';
import palazzoMestre from './palazzo-mestre-2024';
import scuolaMarghera from './scuola-marghera-2023';
// ... one import per project

const allProjects: readonly Project[] = [
  palazzoMestre,
  scuolaMarghera,
  // ...
] as const;

export function getAllProjects(): readonly Project[] {
  return allProjects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 3): readonly Project[] {
  return allProjects.filter((p) => p.featured).slice(0, limit);
}
```

```typescript
// lib/content/projects.ts — pure filter logic
import type { Project } from '@/types/content';
import type { ProjectFilters } from '@/types/filters';

export function filterProjects(
  projects: readonly Project[],
  filters: ProjectFilters,
): readonly Project[] {
  return projects.filter((p) => {
    if (filters.categoria && p.categoria !== filters.categoria) return false;
    if (filters.zona && p.zona !== filters.zona) return false;
    if (filters.committente && p.committente !== filters.committente) return false;
    return true;
  });
}

export function parseProjectFilters(
  searchParams: Record<string, string | string[] | undefined>,
): ProjectFilters {
  const get = (k: string) =>
    typeof searchParams[k] === 'string' ? (searchParams[k] as string) : undefined;
  return {
    categoria: get('cat') as ProjectFilters['categoria'],
    zona: get('zona') as ProjectFilters['zona'],
    committente: get('committente') as ProjectFilters['committente'],
  };
}
```

**If content growth later demands it**, migrating to MDX or Payload is a mechanical change: replace `content/projects/*.ts` imports with a loader that reads from the new source and emits the same `Project[]`. The rest of the app is insulated behind `getAllProjects()` / `getProjectBySlug()`.

---

## RSC vs Client Boundary — Explicit Per Component

| Component | Tier | RSC / Client | Why |
|---|---|---|---|
| `app/layout.tsx` | root | **RSC** | Static shell, fonts, analytics script tags |
| `app/page.tsx` (Home) | route | **RSC** | Pure content composition |
| `app/servizi/page.tsx` | route | **RSC** | Pure content composition |
| `app/progetti/page.tsx` | route | **RSC** | Reads `searchParams`, filters TS array, renders grid |
| `app/progetti/[slug]/page.tsx` | route | **RSC** | `generateStaticParams()` + static render |
| `app/chi-siamo/page.tsx` | route | **RSC** | Pure content composition |
| `app/contatti/page.tsx` | route | **RSC** | Shell — the form is a nested client island |
| `layout/site-header.tsx` | layout | **RSC** | Renders nav links as RSC |
| `layout/site-nav.tsx` | layout | **RSC** | Static `<a>` elements |
| `layout/mobile-nav.tsx` | layout | **Client** | `useState` for drawer open/close |
| `layout/mobile-sticky-cta.tsx` | layout | **Client** | Scroll listener to hide above hero |
| `layout/site-footer.tsx` | layout | **RSC** | Static content |
| `layout/json-ld.tsx` | layout | **RSC** | Emits `<script>` tag inline |
| `sections/hero.tsx` | section | **RSC** | Static hero composition |
| `sections/trust-strip.tsx` | section | **RSC** | Static numbers, no counters |
| `sections/services-overview.tsx` | section | **RSC** | Static tiles |
| `sections/projects-grid.tsx` | section | **RSC** | Pure map over filtered array |
| `sections/projects-filters.tsx` | section | **RSC** | Renders `<a href="?cat=...">` — NO client state |
| `sections/contact-form.tsx` | section | **Client** | RHF + Zod + Turnstile + `useActionState` |
| `sections/certifications.tsx` | section | **RSC** | Static cards with PDF download links |
| `ui/button.tsx` | ui | **RSC** | Emits a `<button>` or `<a>` — no handlers for the primary CTA path |
| `ui/input.tsx` | ui | **RSC-compatible** | Stateless — used *inside* a client parent form |
| `business/sopralluogo-button.tsx` | business | **RSC** | Wraps `<a href="/contatti">` — the CTA is a navigation, not a JS handler |
| `business/project-card.tsx` | business | **RSC** | Static markup |
| `business/committente-badge.tsx` | business | **RSC** | Static pill |

**Rule of thumb that governs this table:**

> A component is a Client Component **if and only if** it needs one of: `useState`, `useEffect`, an event handler on a DOM element, a third-party library that requires the browser (e.g. Turnstile widget), or `useActionState`/`useFormStatus`. Otherwise it stays RSC.

**Client islands on this site — exhaustive list (4):**
1. `sections/contact-form.tsx` — the whole form including the Turnstile widget and the `useActionState` binding.
2. `layout/mobile-nav.tsx` — mobile drawer toggle.
3. `layout/mobile-sticky-cta.tsx` — scroll listener.
4. `app/contatti/toaster.tsx` — tiny `<Toaster />` mount for sonner, client-only, only on the contact route (NOT in the root layout, to avoid shipping sonner to every page).

Everything else is RSC. JS shipped to `/` and `/chi-siamo` should be effectively zero beyond the mobile nav and sticky CTA.

### "use client" boundary strategy

CLAUDE.md says "componenti UI riutilizzabili in `components/ui`" — these primitives (Input, Label, Field, Button) must be **usable from both RSC and Client parents**. The pattern:

```tsx
// components/ui/input.tsx — NO "use client" directive
// This file is RSC-compatible. It renders plain markup.
// If a parent is a Client Component, it works. If a parent is an RSC, it works.
import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          'block w-full rounded border border-gray-300 bg-white px-4 py-3',
          'text-base text-gray-900 placeholder:text-gray-400',
          'focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20',
          'disabled:bg-gray-50 disabled:text-gray-500',
          className,
        )}
        {...props}
      />
    );
  },
);
```

**Why no `"use client"` on primitives:** a component without `"use client"` becomes a Client Component only when imported from another Client Component. Kept neutral, it works in both worlds. Adding `"use client"` would force the entire primitive layer to ship as JS even when used in pure RSC pages.

---

## Data Flow

### 1. Project detail page — static build

```
pnpm build
    │
    ▼
Next.js collects routes
    │
    ▼
app/progetti/[slug]/page.tsx → generateStaticParams()
    │                              │
    │                              └─▶ getAllProjects() → [{slug:'...'}, ...]
    │
    ▼
For each slug, render page.tsx as RSC
    │
    ├─ getProjectBySlug(slug) → Project object
    ├─ <PageHeader title={project.title} />
    ├─ <ProjectMeta project={project} />
    ├─ <ProjectGallery images={project.gallery} />
    │     └─ maps to <Image> with next/image — AVIF/WebP at build
    ├─ <CommittenteBadge type={project.committente} />
    └─ <FinalCta />
    │
    ▼
Static HTML + tiny RSC payload shipped to CDN
```

**No client JS is shipped for project pages** beyond the global mobile nav / sticky CTA islands.

### 2. Portfolio filter — URL-driven, zero client state

```
User clicks <a href="/progetti?committente=ente-pubblico">Enti Pubblici</a>
    │
    ▼
Browser navigates → Next client router fetches the RSC payload for /progetti
    │                (or full HTML on first visit — both work)
    │
    ▼
app/progetti/page.tsx receives { searchParams } prop
    │
    ├─ parseProjectFilters(searchParams) → { committente: 'ente-pubblico' }
    ├─ getAllProjects() → readonly Project[]
    ├─ filterProjects(projects, filters) → filtered subset
    │
    ▼
<ProjectsFilters active={filters} />   // renders <a> links to other filter URLs
<ProjectsGrid projects={filteredProjects} />
    │
    ▼
RSC payload streamed to browser. No useState, no useSearchParams, no client JS.
```

**Why this approach wins:**
- Zero hydration cost for filters.
- Filter URLs are shareable and indexable (each filter combo is its own crawlable page).
- Back/forward buttons work for free.
- Server-side filter logic is pure and testable.

**Alternative (rejected):** `useState` + `router.push` in a Client Component. Would ship ~30KB of router + hook code to every visitor, break server rendering of filters, and harm SEO on filter pages.

### 3. Contact form — Server Action flow

```
User opens /contatti
    │
    ▼
RSC renders <ContactForm /> island
    │
    ├─ RHF registers fields with Zod resolver
    ├─ Turnstile widget loads and solves invisibly
    └─ User fills form, clicks submit
        │
        ▼
Client-side: RHF validates via Zod → ok
    │
    ▼
<form action={submitContact}> triggers Server Action
    │
    ▼
app/contatti/actions.ts (Server, Node runtime)
    │
    ├─ 1. Parse FormData via same Zod schema (lib/schema/contact.ts)
    │       └─ fail → return { ok: false, error: 'validation', issues }
    │
    ├─ 2. Check honeypot field is empty
    │       └─ fail → return { ok: false, error: 'spam' }  (silently log)
    │
    ├─ 3. Verify Turnstile token (lib/turnstile.ts)
    │       └─ POST to challenges.cloudflare.com/turnstile/v0/siteverify
    │       └─ fail → return { ok: false, error: 'captcha' }
    │
    ├─ 4. Optional: in-memory rate limit by IP (per-instance, best-effort)
    │
    ├─ 5. sendLead(data) from lib/email/send-lead.ts
    │       ├─ Resend.emails.send({ to: OWNER_EMAIL, react: <LeadNotification /> })
    │       └─ Resend.emails.send({ to: data.email, react: <LeadAutoReply /> })
    │
    └─ 6. return { ok: true }
    │
    ▼
Client receives result via useActionState
    │
    ├─ ok:true    → toast.success + reset form + scroll to confirmation
    └─ ok:false   → toast.error with human-readable message + highlight field
```

**Key choices:**
- **Same Zod schema on client and server** — one source of truth, no validation drift.
- **Server Action runs on Node runtime**, not Edge, because the Resend SDK is Node-oriented and React Email rendering is safer there.
- **No API route needed.** Server Actions are the MVP-appropriate replacement for `app/api/contact/route.ts`.
- **Turnstile token is a hidden form field** added automatically by `@marsidev/react-turnstile` — it arrives in the same `FormData` the action handler parses.
- **Rate limiting is best-effort in memory.** Vercel serverless is ephemeral so this isn't cryptographically strong, but combined with Turnstile it is enough for a contact form on a local business site. If abuse emerges, upgrade to Upstash Redis later.

### 4. JSON-LD structured data — build-time composition

```
content/site.ts + content/certifications.ts + content/projects/index.ts
    │
    ▼
lib/seo/json-ld.ts → buildLocalBusinessJsonLd(site, certs)
    │
    ▼
layout/json-ld.tsx (RSC) → <script type="application/ld+json">
    │
    ▼
Embedded in app/layout.tsx on every page
```

Using `schema-dts` types, this is a pure build-time transformation. Zero runtime cost.

---

## Build Order (Phase Dependencies)

```
Phase 1 — Fondamenta
├── next.config.ts, tsconfig.json, eslint.config.mjs, prettier, postcss, globals.css
├── types/content.ts, types/filters.ts, types/forms.ts
├── content/site.ts, content/legal.ts (partial — client fills in values)
├── lib/cn.ts, lib/routes.ts
├── components/ui/* (button, container, section, heading, link, image, icon, badge, divider,
│                    field, input, label, textarea, select, checkbox)
├── components/layout/site-header.tsx, site-nav.tsx, site-footer.tsx, mobile-nav.tsx,
│                    mobile-sticky-cta.tsx, site-footer-legal.tsx
├── app/layout.tsx, app/globals.css, app/not-found.tsx, app/error.tsx, app/loading.tsx
├── app/icon.tsx, app/opengraph-image.tsx (placeholder)
└── public/images/ folder scaffolding
    │
    ▼ blocks everything downstream
    │
Phase 2 — Homepage
├── requires Phase 1
├── content/services.ts (6 services for home overview)
├── components/sections/hero.tsx, trust-strip.tsx, services-overview.tsx, final-cta.tsx
├── components/business/trust-number.tsx, service-card.tsx, sopralluogo-button.tsx
└── app/page.tsx
    │
    ▼ (services.ts also consumed by Phase 3)
    │
Phase 3 — Servizi
├── requires Phase 1 + Phase 2 (for services content and patterns)
├── components/sections/services-detail.tsx, enti-pubblici-section.tsx, page-header.tsx
└── app/servizi/page.tsx
    │
    ▼ (independent of Phase 4; can run in parallel if desired)
    │
Phase 4 — Progetti  (HARD blocked on real cantiere photography)
├── requires Phase 1 + Phase 2
├── types/filters.ts (already in Phase 1)
├── content/projects/*.ts (10–20 entries — authored alongside photography)
├── content/projects/index.ts (loader)
├── lib/content/projects.ts (filterProjects + parseProjectFilters)
├── lib/content/url.ts (filter URL builder)
├── components/sections/projects-grid.tsx, projects-filters.tsx,
│                       project-gallery.tsx, project-meta.tsx
├── components/business/project-card.tsx, committente-badge.tsx
├── app/progetti/page.tsx
├── app/progetti/[slug]/page.tsx
└── app/progetti/[slug]/opengraph-image.tsx
    │
    ▼ (independent of Phase 5)
    │
Phase 5 — Chi siamo  (HARD blocked on SOA/ISO PDFs + mezzi photos + storia copy)
├── requires Phase 1 + Phase 2
├── content/certifications.ts, mezzi.ts, team.ts
├── public/docs/soa-*.pdf, iso-*.pdf
├── components/sections/company-intro.tsx, certifications.tsx, soa-table.tsx,
│                       mezzi-showcase.tsx, team-signal.tsx
├── components/business/certification-card.tsx, mezzo-card.tsx
└── app/chi-siamo/page.tsx
    │
    ▼ (independent of Phase 6)
    │
Phase 6 — Contatti  (HARD blocked on DNS access for Resend domain verification)
├── requires Phase 1 + Phase 2 + Phase 5 (opening hours live in site.ts alongside NAP)
├── lib/schema/contact.ts (Zod schema)
├── lib/turnstile.ts (server-side verify)
├── lib/email/resend.ts, lib/email/send-lead.ts, lib/email/templates/*.tsx
├── components/sections/contact-form.tsx (CLIENT), contact-info.tsx, sopralluogo-explainer.tsx,
│                       opening-hours.tsx
├── app/contatti/page.tsx, app/contatti/actions.ts, app/contatti/toaster.tsx
└── .env.local (RESEND_API_KEY, TURNSTILE_SECRET, NEXT_PUBLIC_TURNSTILE_SITE_KEY, OWNER_EMAIL)
    │
    ▼
    │
Phase 7 — SEO + Launch
├── requires ALL previous phases (JSON-LD needs complete content)
├── app/sitemap.ts (enumerates static routes + getAllProjects() for dynamic)
├── app/robots.ts
├── lib/seo/metadata.ts, lib/seo/json-ld.ts
├── components/layout/json-ld.tsx (mounted in root layout)
├── app/privacy/page.tsx, app/cookie-policy/page.tsx
├── Per-page generateMetadata() exports across all routes
├── Final Lighthouse audit pass
└── Production DNS + Resend domain verification + Search Console submission
```

### Hard-blocker summary (content / access dependencies)

| Blocker | Phase | Who unblocks |
|---|---|---|
| Brand palette values + font choice | 1 | Designer / client sign-off |
| P.IVA, REA, capitale sociale, sede legale | 1 | Client (usually takes 1 email) |
| 6 service descriptions | 2-3 | Client copy |
| 10–20 project photos + metadata | 4 | Client → photographer, **flag in Phase 1** |
| SOA + ISO PDFs + categories/classes list | 5 | Client, **flag in Phase 1** |
| Mezzi photos (6–12) | 5 | Client, **flag in Phase 1** |
| Final phones, PEC, addresses | 6 | Client |
| DNS access for `edilferro.it` | 6 | Client or current vendor, **flag in Phase 1** |
| Privacy/cookie policy legal text | 7 | Legal counsel or iubenda |

---

## Architectural Patterns

### Pattern 1: Content as typed TS modules

**What:** All static content lives as typed TS objects under `content/`, imported directly at build time.

**When to use:** Small–medium content volumes (under ~100 entries per type) where editing cadence is low and there is no non-technical CMS user.

**Trade-offs:**
- **Pro:** Zero config, full type safety at author time, trivial filtering and sorting, zero runtime dependencies, easy to grep and diff.
- **Con:** Editing requires a PR (no "log in and edit"), content and code share the same deploy pipeline.

**Example:**
```typescript
// content/projects/palazzo-mestre-2024.ts
import type { Project } from '@/types/content';

const project: Project = {
  slug: 'palazzo-mestre-2024',
  title: 'Ristrutturazione Palazzo Storico — Mestre',
  anno: 2024,
  committente: 'privato',
  categoria: 'ristrutturazione-di-pregio',
  zona: 'mestre',
  localita: 'Mestre (VE)',
  durata: '10 mesi',
  ruolo: 'Impresa esecutrice principale',
  summary: 'Recupero conservativo di un palazzo di fine Ottocento nel centro di Mestre.',
  description: `Intervento di recupero conservativo su un edificio vincolato ...`,
  cover: {
    src: '/images/projects/palazzo-mestre-2024/cover.avif',
    alt: 'Facciata restaurata di Palazzo Storico a Mestre',
    width: 2400,
    height: 1600,
  },
  gallery: [
    /* 4–8 images */
  ],
  featured: true,
};

export default project;
```

### Pattern 2: URL-driven filters via RSC `searchParams`

**What:** Filter state lives in the URL; the RSC page reads `searchParams`, filters the TS array, and renders the result. Filter chips are plain `<a>` tags pointing at other filter URLs.

**When to use:** Any filtering/sorting UI on a static-content site with <100 items per page.

**Trade-offs:**
- **Pro:** Zero client JS, shareable URLs, crawlable by Google (each filter is its own indexable page — great for SEO long tail like `/progetti?zona=mestre`), back/forward work free.
- **Con:** Each filter change is a full navigation (perceptually fine for small RSC payloads); no "instant" client-side filtering.

**Example:**
```tsx
// app/progetti/page.tsx
import { getAllProjects } from '@/content/projects';
import { filterProjects, parseProjectFilters } from '@/lib/content/projects';
import { ProjectsGrid } from '@/components/sections/projects-grid';
import { ProjectsFilters } from '@/components/sections/projects-filters';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProgettiPage({ searchParams }: Props) {
  const params = await searchParams;           // Next 16: searchParams is async
  const filters = parseProjectFilters(params);
  const projects = filterProjects(getAllProjects(), filters);

  return (
    <>
      <PageHeader title="Progetti" kicker="45 anni di cantieri in Veneto" />
      <ProjectsFilters active={filters} />
      <ProjectsGrid projects={projects} />
      <FinalCta />
    </>
  );
}
```

```tsx
// components/sections/projects-filters.tsx (RSC)
import Link from 'next/link';
import type { ProjectFilters } from '@/types/filters';
import { cn } from '@/lib/cn';

const COMMITTENTE_OPTIONS = [
  { value: undefined, label: 'Tutti' },
  { value: 'privato', label: 'Privato' },
  { value: 'ente-pubblico', label: 'Enti Pubblici' },
  { value: 'professionista', label: 'Professionisti' },
] as const;

export function ProjectsFilters({ active }: { active: ProjectFilters }) {
  return (
    <nav aria-label="Filtra progetti" className="...">
      {COMMITTENTE_OPTIONS.map((opt) => {
        const href = buildHref({ ...active, committente: opt.value });
        const isActive = active.committente === opt.value;
        return (
          <Link
            key={opt.label}
            href={href}
            className={cn('...', isActive && '...')}
            aria-current={isActive ? 'page' : undefined}
          >
            {opt.label}
          </Link>
        );
      })}
    </nav>
  );
}
```

### Pattern 3: One Server Action, one Zod schema, shared by client and server

**What:** The contact form's validation schema lives in `lib/schema/contact.ts` and is imported by both the client form (as a `zodResolver`) and the Server Action (as a re-validation). One source of truth.

**When to use:** Every form in a Next.js App Router project.

**Trade-offs:**
- **Pro:** Impossible for client and server to disagree on what "valid" means; one file to update when fields change; type inference gives `ContactFormData` for free.
- **Con:** The client ships the Zod runtime for one schema (~12KB gzipped). Acceptable cost for the MVP.

**Example:**
```typescript
// lib/schema/contact.ts
import { z } from 'zod';

export const contactSchema = z.object({
  nome: z.string().min(2, 'Inserisci il tuo nome'),
  cognome: z.string().min(2, 'Inserisci il tuo cognome'),
  email: z.string().email('Email non valida'),
  telefono: z
    .string()
    .min(8, 'Telefono troppo corto')
    .regex(/^[\d\s+\-().]+$/, 'Telefono non valido'),
  tipo: z.enum(['privato', 'ente-pubblico', 'professionista']),
  oggetto: z.enum(['sopralluogo', 'preventivo', 'generico']),
  zona: z.string().max(100).optional(),
  messaggio: z.string().min(20, 'Descrivi brevemente la richiesta').max(2000),
  consenso: z.literal(true, {
    errorMap: () => ({ message: 'Devi accettare la privacy policy' }),
  }),
  // Honeypot — must be empty
  website: z.string().max(0).optional().default(''),
  // Turnstile token injected by widget
  'cf-turnstile-response': z.string().min(1, 'Verifica di sicurezza mancante'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

```typescript
// app/contatti/actions.ts
'use server';

import { contactSchema } from '@/lib/schema/contact';
import { verifyTurnstile } from '@/lib/turnstile';
import { sendLead } from '@/lib/email/send-lead';

export type ContactActionResult =
  | { ok: true }
  | { ok: false; error: 'validation' | 'captcha' | 'spam' | 'email'; fieldErrors?: Record<string, string> };

export async function submitContact(
  _prev: ContactActionResult | undefined,
  formData: FormData,
): Promise<ContactActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = contactSchema.safeParse({ ...raw, consenso: raw.consenso === 'on' });

  if (!parsed.success) {
    return { ok: false, error: 'validation', fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string> };
  }
  if (parsed.data.website) {
    return { ok: false, error: 'spam' }; // honeypot hit
  }

  const captchaOk = await verifyTurnstile(parsed.data['cf-turnstile-response']);
  if (!captchaOk) return { ok: false, error: 'captcha' };

  try {
    await sendLead(parsed.data);
    return { ok: true };
  } catch {
    return { ok: false, error: 'email' };
  }
}
```

```tsx
// components/sections/contact-form.tsx
'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile } from '@marsidev/react-turnstile';
import { toast } from 'sonner';
import { contactSchema, type ContactFormData } from '@/lib/schema/contact';
import { submitContact } from '@/app/contatti/actions';
// ... field imports

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, undefined);
  const { register, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  // Effect to toast on state change is a client-only concern
  // ...

  return (
    <form action={action} className="...">
      {/* fields */}
      <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <Button type="submit" disabled={pending}>
        {pending ? 'Invio...' : 'Invia richiesta'}
      </Button>
    </form>
  );
}
```

### Pattern 4: Single source of truth for the primary CTA

**What:** The "Richiedi un sopralluogo" CTA is a single `business/sopralluogo-button.tsx` component that encapsulates copy, icon, variants (primary / secondary / ghost / sticky), and the target route. Every section that needs a CTA imports this one component.

**When to use:** Any site with a single dominant conversion action repeated on many pages.

**Trade-offs:**
- **Pro:** Change the label, the link target, or the tracking id in one file. Zero risk of drift between pages.
- **Con:** Slight over-abstraction for a button — acceptable because the CTA carries business meaning, not UI meaning.

**Example:**
```tsx
// components/business/sopralluogo-button.tsx
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ROUTES } from '@/lib/routes';

type Variant = 'primary' | 'secondary' | 'sticky';

export function SopralluogoButton({ variant = 'primary' }: { variant?: Variant }) {
  return (
    <Button
      as="a"
      href={ROUTES.contatti}
      variant={variant === 'sticky' ? 'primary' : variant}
      className={variant === 'sticky' ? 'fixed bottom-4 right-4 md:hidden' : undefined}
    >
      <Icon name="calendar-check" />
      Richiedi un sopralluogo
    </Button>
  );
}
```

### Pattern 5: Typed route constants

**What:** `lib/routes.ts` exports a frozen object of all route strings. Nothing in the codebase hard-codes paths.

**When to use:** Always.

**Trade-offs:**
- **Pro:** One place to rename routes, grep-friendly, sitemap generator can iterate over them, refactoring is safe.
- **Con:** Trivial extra indirection.

**Example:**
```typescript
// lib/routes.ts
export const ROUTES = {
  home: '/',
  servizi: '/servizi',
  progetti: '/progetti',
  projectBySlug: (slug: string) => `/progetti/${slug}`,
  chiSiamo: '/chi-siamo',
  contatti: '/contatti',
  privacy: '/privacy',
  cookiePolicy: '/cookie-policy',
} as const;

export const STATIC_ROUTES = [
  ROUTES.home,
  ROUTES.servizi,
  ROUTES.progetti,
  ROUTES.chiSiamo,
  ROUTES.contatti,
  ROUTES.privacy,
  ROUTES.cookiePolicy,
] as const;
```

Consumed by `app/sitemap.ts`:

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/content/projects';
import { STATIC_ROUTES, ROUTES } from '@/lib/routes';

const BASE_URL = 'https://www.edilferro.it';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === ROUTES.home ? 1.0 : 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
    url: `${BASE_URL}${ROUTES.projectBySlug(p.slug)}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticEntries, ...projectEntries];
}
```

---

## Route Conventions — Italian slugs

**Decision: Italian slugs for all routes.**

| Route | Italian slug (chosen) | English alternative | Why Italian |
|---|---|---|---|
| Home | `/` | `/` | Same |
| Services | `/servizi` | `/services` | Italian users, Italian SEO intent ("impresa edile servizi Mestre"), Italian Google will rank this higher than `/services`. Aligns with PROJECT.md Phase 3 naming. |
| Portfolio | `/progetti` | `/projects` / `/portfolio` | Italian search volume: "progetti impresa edile Venezia" >> "projects". Matches PROJECT.md. |
| Project detail | `/progetti/[slug]` | — | Follows parent; slugs themselves are kebab-case Italian (`palazzo-mestre-2024`, `scuola-marghera-2023`). |
| About | `/chi-siamo` | `/about` | Hard Italian idiom. Any Italian visitor expects "chi siamo". |
| Contact | `/contatti` | `/contact` | Hard Italian idiom. |
| Privacy | `/privacy` | `/privacy` | Italian norm; both languages use "privacy". |
| Cookie policy | `/cookie-policy` | `/cookie-policy` | Italian norm. |

Keeping Italian slugs now makes the **future bilingual migration cleaner**: when English is added, the standard Next.js `[locale]` pattern becomes `/it/progetti` + `/en/projects`, and the routing library (next-intl) handles the slug translation per locale. Forcing English slugs now would force Italian users to visit `/projects` (SEO hostile) AND still require a slug mapping later — worst of both worlds.

---

## Internationalization Posture — Single-language with bilingual escape hatch

**Current: `it-IT` only. No i18n framework.**

**Forward-compatible decisions taken now, so that adding English later is an evolution not a rewrite:**

1. **All user-facing strings are concentrated in two places:**
   - **Content modules** (`content/services.ts`, `content/site.ts`, `content/projects/*.ts`) — domain copy.
   - **A `lib/copy.ts` module** — UI strings that are not "content" but not hard-coded in JSX either (CTA labels, form field labels, error messages, section titles that aren't data-driven).

   Do NOT sprinkle Italian strings directly in JSX. Use `copy.cta.sopralluogo` instead of `"Richiedi un sopralluogo"` in a dozen components. This is the single most impactful i18n-readiness step.

2. **Key naming already uses neutral English identifiers** (`copy.cta.sopralluogo`, `copy.form.nome.label`), so future translation files can drop in without renaming.

3. **`<html lang="it">`** in `app/layout.tsx`. When bilingual lands, this becomes `lang={locale}` from the route.

4. **Content modules can be promoted to locale-aware loaders** later (`getAllProjects(locale)` returning locale-specific titles/descriptions) without changing call sites that destructure through a loader interface.

5. **Route structure is Italian-slug-first** — see above. When bilingual lands, the standard is `app/[locale]/layout.tsx` with `it` and `en` locales, each with its own slug map.

6. **SEO metadata is built via a single `lib/seo/metadata.ts` helper** that already accepts a `path` argument. Adding `locale` is a one-argument extension.

7. **`schema-dts` JSON-LD supports `@language` tags** — we don't emit them in MVP, but the helper is structured to add them when needed.

**Explicitly NOT doing now (deferred):**
- Installing `next-intl` or `next-i18next`. Adds dependencies and route layers for zero current user value.
- Creating a `[locale]` segment. Adds URL complexity for a zero-locale site.
- Authoring English copy. Would immediately drift from Italian.

**Trigger to actually go bilingual:** a concrete market signal — e.g., the client wins an English-language tender, or Google Search Console shows >5% English-language queries. Not before.

---

## Image & Asset Strategy

### Folder layout

```
public/images/
├── hero/              # Homepage hero + inner-page hero backgrounds
│   ├── home-hero.avif              2400×1600, AVIF
│   └── chi-siamo-hero.avif
├── projects/
│   └── [slug]/                      One folder per project
│       ├── cover.avif              1600×1200, landscape
│       ├── gallery-01.avif
│       ├── gallery-02.avif
│       └── ...
├── mezzi/
│   ├── escavatore-cingolato.avif
│   ├── gru-torre.avif
│   └── ...
├── team/
│   └── group.avif
├── cantieri/          # Reusable ambient cantiere photos for section backgrounds
│   └── ...
└── og/                # Open Graph fallback images
    ├── default.jpg                 1200×630, JPG (OG spec-compatible)
    └── projects/
        └── [slug].jpg
```

### `next/image` conventions

1. **Always use `next/image`.** Never a raw `<img>`. Enforced by `eslint-plugin-jsx-a11y` + Next's built-in rule.

2. **Always supply `alt`.** Italian descriptive alt text. For decorative-only images (background cantieri), `alt=""` with `role="presentation"`.

3. **Hero images use `priority`.** One priority image per route. This is the LCP candidate.
   ```tsx
   <Image src="/images/hero/home-hero.avif" alt="..." fill priority sizes="100vw" />
   ```

4. **Grid images use `sizes` that match the CSS grid breakpoints:**
   ```tsx
   // 1 col mobile, 2 cols md, 3 cols lg
   <Image
     src={project.cover.src}
     alt={project.cover.alt}
     width={project.cover.width}
     height={project.cover.height}
     sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
   />
   ```

5. **Format preference:** AVIF for photographic content, SVG for icons/logos. JPG only for OG images (spec requires broad compatibility). Next 16's image optimizer auto-serves AVIF/WebP based on Accept headers, so **the source format can stay AVIF and Next will downgrade for older browsers**.

6. **One `components/ui/image.tsx` wrapper** pre-configures common sizes presets:
   ```tsx
   <ProjectImage variant="card" ... />   // sizes="(min-width: 1024px) 33vw..."
   <ProjectImage variant="hero" ... />   // fill + priority + sizes="100vw"
   <ProjectImage variant="gallery" ... /> // sizes="(min-width: 768px) 50vw, 100vw"
   ```

7. **All dimensions committed as metadata in `content/projects/*.ts`** so `<Image>` always has explicit `width`/`height`, preventing CLS.

8. **Strip EXIF from uploaded photos** (privacy + size). One-time build-script note in `docs/media-pipeline.md` or client delivery brief.

### Document assets

```
public/docs/
├── soa-attestazione.pdf     # Required for enti pubblici trust
├── iso-9001-certificato.pdf
├── company-profile.pdf      # DF-04 (post-launch)
└── privacy-policy.pdf       # Optional: downloadable legal
```

Referenced from `content/certifications.ts`:

```typescript
// content/certifications.ts
export const certifications: Certification[] = [
  {
    slug: 'soa-og1-v',
    name: 'SOA OG1 Classe V',
    authority: 'ESNA S.p.A.',
    validFrom: '2024-01-15',
    validUntil: '2029-01-15',
    pdfUrl: '/docs/soa-attestazione.pdf',
    description:
      'Edifici civili e industriali fino a € 10.329.138. Abilita la partecipazione ad appalti pubblici in OG1 fino a Classe V.',
  },
  // ...
];
```

---

## Scaling Considerations

This is a static site for a local business. "Scale" mostly means "stays fast".

| Scale | What to do |
|---|---|
| **0–10k visits/month** (realistic MVP year 1) | Vercel Hobby tier. No changes. |
| **10k–100k visits/month** (unlikely but possible if local SEO works) | Still Vercel Hobby. Monitor Speed Insights for regressions. Ensure hero AVIF is optimized (target < 150KB). |
| **100k+ visits/month** | Upgrade to Vercel Pro if bandwidth hits free-tier cap. Consider Cloudflare in front (it already caches). Audit analytics budget. |
| **First bottleneck** | Image weight. Single oversized hero AVIF can ruin LCP. Budget: each hero ≤ 200KB AVIF. |
| **Second bottleneck** | Server Action latency on `/contatti`. If Resend is slow, the submit perceptible-latency rises. Mitigation: show pending state immediately, let user navigate away. |
| **Third bottleneck** | The Turnstile script. Load only on `/contatti`, not in the root layout. |

**When to revisit this architecture:**
- Project count crosses ~100 — consider MDX + content-collections or Payload.
- Client starts editing copy weekly — consider Payload.
- Bilingual/trilingual demand is confirmed — add `[locale]` and `next-intl`.
- Analytics show < 75 Lighthouse mobile — audit images and Turnstile loading strategy before touching architecture.

---

## Anti-Patterns

### Anti-Pattern 1: Sprinkling `"use client"` liberally

**What people do:** Add `"use client"` to any component that "might need state later", making large chunks of the tree client-rendered.

**Why it's wrong:** Each client-tree root ships its children's source to the browser as JS. On a content-heavy institutional site this destroys the entire RSC advantage. A 5KB section becomes a 50KB hydrated island for no real benefit.

**Do this instead:** Start every component as RSC. Convert to `"use client"` **only** when you actually write a hook or an event handler. When you do, push the boundary as deep as possible — ideally the smallest leaf that actually needs interactivity.

### Anti-Pattern 2: Fetching content in page components instead of using typed imports

**What people do:** Inside `app/progetti/[slug]/page.tsx`, write `const project = await fetch('/api/projects/' + slug).then(r => r.json())`.

**Why it's wrong:** Creates an unnecessary HTTP hop (even to localhost during build), loses type safety, prevents `generateStaticParams` from working cleanly, and couples build-time rendering to an API server that doesn't need to exist.

**Do this instead:** Import directly from `content/projects` — it's just TS. Next 16 fully supports this for static generation. No API layer needed for static content.

### Anti-Pattern 3: Using `useState` + `router.push` for filters

**What people do:** Build portfolio filters as a Client Component with `useState` for selected filters and `router.push('/progetti?cat=' + cat)` on click.

**Why it's wrong:** Ships the router + hooks to clients, makes filters non-indexable by search engines, breaks shareable filter URLs, and forces hydration of a page that could have been pure RSC.

**Do this instead:** Render filters as plain `<Link>` tags from an RSC. The server re-renders the page with new `searchParams`. Zero client JS, fully crawlable.

### Anti-Pattern 4: A "smart Section wrapper" that knows about business data

**What people do:** Create `<Section>` that accepts a `data` prop and internally decides what to render — mixing `ui/` tier with `business/` tier.

**Why it's wrong:** Collapses the three-tier hierarchy, prevents `ui/` primitives from being reusable, and hides business logic from type checking at the composition site.

**Do this instead:** `ui/section.tsx` is a dumb wrapper that provides vertical rhythm and semantic markup. `sections/*.tsx` compose `ui/section` with `business/*` to build page sections. `business/*` take domain objects as props. Keep the three tiers independent.

### Anti-Pattern 5: Building a REST or tRPC API for the contact form

**What people do:** Create `app/api/contact/route.ts`, call `fetch('/api/contact')` from the client form.

**Why it's wrong:** It's exactly what Server Actions replace. Adds a network abstraction, a second validation surface, and an API contract with no consumer other than the form itself.

**Do this instead:** One Server Action in `app/contatti/actions.ts`. `<form action={serverAction}>`. Done.

### Anti-Pattern 6: Loading the Turnstile script in the root layout

**What people do:** Add `<Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" />` to `app/layout.tsx`.

**Why it's wrong:** Turnstile is used on exactly one page (`/contatti`). Loading it globally wastes 20KB+ of JS on every visitor and delays interactivity on content pages.

**Do this instead:** The `@marsidev/react-turnstile` package handles script injection automatically when the `<Turnstile>` component mounts — and that component only mounts inside the contact form. No global `<Script>` needed.

### Anti-Pattern 7: Embedding Google Maps iframe on `/contatti`

**What people do:** `<iframe src="https://www.google.com/maps/embed?...">`.

**Why it's wrong:** Third-party cookies from `maps.googleapis.com` on first paint → triggers Italian Garante cookie banner requirement, kills the "no-banner" posture, LCP impact, cross-origin script surface.

**Do this instead:** One static map screenshot (AVIF, 800×400) wrapped in an `<a>` that opens Google Maps in a new tab. Zero third-party fetch on page load.

### Anti-Pattern 8: Rotating hero carousel

**What people do:** Put a Swiper or Keen-Slider carousel in the homepage hero.

**Why it's wrong:** 20-year-old documented UX failure (< 1% CTR on slide 2+), ships JS, shifts LCP, banner-blindness, off-brand for institutional tone. CLAUDE.md explicitly bans SaaS-ish effects.

**Do this instead:** One hero image, one headline, one subline, one CTA. Done.

---

## Integration Points

### External Services

| Service | Integration | Runtime | Notes |
|---|---|---|---|
| **Resend** | `resend@4` SDK, called from Server Action | Node runtime (NOT edge) | Edge runtime compatibility is incomplete for React Email rendering; Node is safer for MVP. Requires DNS verification of sending domain (`edilferro.it` → TXT records for SPF/DKIM). |
| **Cloudflare Turnstile** | `@marsidev/react-turnstile` client widget + server-side siteverify in `lib/turnstile.ts` | Client widget + Node Server Action | Site key is public (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`), secret key is server-only (`TURNSTILE_SECRET`). Script is loaded only when the widget mounts on `/contatti`. |
| **Vercel Analytics** | `@vercel/analytics/next` `<Analytics />` in root layout | Client beacon, cookieless | GDPR-safe without banner per Vercel's privacy docs. |
| **Vercel Speed Insights** | `@vercel/speed-insights/next` `<SpeedInsights />` in root layout | Client beacon, cookieless | Same posture. |
| **Google Search Console** | Manual sitemap submission after launch | Manual | One-time step in Phase 7. |

### Environment variables

```bash
# .env.local  (NEVER committed)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
OWNER_EMAIL=info@edilferro.it                # Where leads are sent
TURNSTILE_SECRET=0x000000000000000000000000000000000000
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x000000000000000000000000
NEXT_PUBLIC_SITE_URL=https://www.edilferro.it
```

```bash
# .env.example  (committed, placeholders only)
RESEND_API_KEY=
OWNER_EMAIL=
TURNSTILE_SECRET=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Internal Boundaries

| Boundary | Communication | Notes |
|---|---|---|
| `app/` ↔ `components/` | Direct imports (RSC or client) | App Router routes import from `components/{layout,sections,business,ui}` |
| `components/sections/*` ↔ `components/business/*` | Props-based composition | Sections pass domain objects to business components |
| `components/business/*` ↔ `components/ui/*` | Props-based composition | Business components style themselves using UI primitives |
| `components/*` ↔ `content/*` | Sections read directly via loaders (`getAllProjects`) | Content is imported, not fetched |
| `components/*` ↔ `lib/*` | Pure function imports | `lib/cn`, `lib/routes`, `lib/content/projects` (pure filter), `lib/seo/*` |
| `app/contatti/actions.ts` ↔ `lib/schema`, `lib/email`, `lib/turnstile` | Server-only imports | Only the Server Action file reaches these side-effect modules |
| `content/*` → `types/content.ts` | Type imports only | Content modules conform to shared type definitions |

---

## Compatibility with CLAUDE.md Rules — Checklist

| CLAUDE.md Rule | Architectural Mapping |
|---|---|
| RSC di default | Every component is RSC unless it explicitly needs state/effects/events. 4 client islands total. |
| Client solo per interazioni reali | Enumerated: contact form, mobile nav, mobile sticky CTA, sonner toaster. |
| Layout condivisi in `app/layout.tsx` | `app/layout.tsx` renders `SiteHeader`, `SiteFooter`, `MobileStickyCta`, `JsonLd`, `Analytics`, `SpeedInsights`. |
| Sezioni pagina in `components/sections` | Every page section lives there. |
| UI riutilizzabili in `components/ui` | Primitives (Button, Container, Section, Heading, Input, etc.) live there, zero business knowledge. |
| Dominio business in `components/business` | Project cards, service cards, CTAs, trust numbers, committente badges live there. |
| `public/images` per immagini statiche | Structured by domain (hero / projects / mezzi / team / og). |
| `next/image` sempre | `ui/image.tsx` wrapper enforces this; ESLint blocks raw `<img>`. |
| Mobile-first | Tailwind v4 mobile-first defaults + mobile-nav + mobile-sticky-cta islands. |
| Alt text descrittivi | Enforced by `eslint-plugin-jsx-a11y` + schema validation on `Project.cover.alt`. |
| CTA primaria globale "Richiedi un sopralluogo" | `business/sopralluogo-button.tsx` is the single source of truth. |
| Prefer named exports | Default exports only in `app/**/page.tsx` (required by Next) and `content/projects/*.ts` (convention). Everything else named. |
| Evitare `any` | TS strict + `noUncheckedIndexedAccess`. `unknown` + type guards where needed. |
| Componenti piccoli e leggibili | Four-tier split enforces small composable pieces. |
| Massimo riuso | Primitive `ui/*` components used by all sections; `business/*` components used across pages. |
| Separare UI, contenuti e business logic | `ui/` (UI) ↔ `content/` + `types/` (content) ↔ `business/` + `lib/` (logic). Three separate trees. |
| Evitare hardcoded ripetuti | `lib/routes.ts`, `lib/copy.ts`, `content/site.ts` as single sources of truth. |
| Ogni milestone deve essere deployabile | Phase structure ensures each phase leaves the site in a buildable, deployable state. Phase 1 ships a blank-but-working layout; each subsequent phase adds one more route or section without breaking the others. |
| Non introdurre dipendenze senza reale necessità | Architecture uses only the STACK.md-sanctioned libraries, no extras. |

---

## Sources

**Primary (HIGH confidence):**
- [Next.js 16 release notes](https://nextjs.org/blog/next-16) — async `searchParams`/`params`, RSC defaults, Server Actions, file conventions
- [Next.js — Routing fundamentals (App Router)](https://nextjs.org/docs/app/getting-started/project-structure) — recommended project structure, co-location conventions
- [Next.js — Server Components & Client Components boundary](https://nextjs.org/docs/app/getting-started/server-and-client-components) — when to use `"use client"`
- [Next.js — Forms guide (RHF + Zod + Server Actions)](https://nextjs.org/docs/app/guides/forms) — the exact pattern used for the contact form
- [Next.js — Metadata API + sitemap.ts + robots.ts file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata) — built-in SEO primitives
- [Next.js — next/image component](https://nextjs.org/docs/app/api-reference/components/image) — `sizes`, `priority`, formats
- [Next.js — Internationalization](https://nextjs.org/docs/app/guides/internationalization) — `[locale]` segment pattern for future bilingual migration
- [Next.js — `generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — dynamic segment prerendering
- [React 19 — `useActionState`](https://react.dev/reference/react/useActionState) — form pending/result state
- [Tailwind CSS v4 — theme configuration](https://tailwindcss.com/docs/theme) — CSS-first `@theme` tokens
- [Cloudflare Turnstile — Server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) — siteverify endpoint contract
- [Resend — Next.js Server Actions guide](https://resend.com/docs/send-with-nextjs) — Server Action integration

**Secondary (MEDIUM confidence — tradeoff analysis):**
- [Content Collections vs typed imports — community discussion threads](https://github.com/content-collections/content-collections)
- [Payload CMS — Next.js integration](https://payloadcms.com/docs/getting-started/installation) (reference for the "if we later need a CMS" escape hatch)

**Project-specific (already validated in STACK.md):**
- `.planning/research/STACK.md` — all library choices are inherited, not re-derived
- `.planning/research/FEATURES.md` — feature scope that drives the section list

---

*Architecture research for: Impresa Edile SRL institutional website — 5-page Next.js 16 App Router + RSC + static TS content*
*Researched: 2026-04-13*
*Overall confidence: HIGH*
