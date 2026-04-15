---
phase: 02-homepage
plan: 01
subsystem: content-module-and-route-stubs
tags: [content-module, typedRoutes, route-stubs, typescript, next-config]
dependency_graph:
  requires:
    - 01-02-design-system-and-layout
    - 01-03-seo-metadata-and-error-pages
  provides:
    - content-homepage-ts
    - route-stub-servizi
    - route-stub-progetti
    - route-stub-chi-siamo
    - route-stub-contatti
    - typedRoutes-enabled
  affects:
    - 02-02-homepage-sections
    - 03-servizi
    - 04-progetti
    - 05-chi-siamo
    - 06-contatti
tech_stack:
  added: []
  patterns:
    - Content module pattern (content/homepage.ts — pure TS, as const, no imports)
    - typedRoutes: true sotto experimental in next.config.ts
    - Route stub RSC pattern (default export, no "use client", placeholder copy)
key_files:
  created:
    - content/homepage.ts
    - app/servizi/page.tsx
    - app/progetti/page.tsx
    - app/chi-siamo/page.tsx
    - app/contatti/page.tsx
  modified:
    - next.config.ts
decisions:
  - "typedRoutes posizionato sotto experimental in next.config.ts — Next.js 16 lo richiede ancora sotto experimental"
  - "ctaLabel nel content module usa Richiedi un preventivo (copy homepage) distinto da primaryCta.label Richiedi un sopralluogo (locked navigation CTA)"
  - "iconName come string nel ServiceCard — la risoluzione icona Lucide avviene nei componenti RSC (Piano 02-02), non nel content module"
  - "Route /privacy e /cookie-policy in footerNav non causano errori typedRoutes perché href è typed come string (non literal) in NavLink"
metrics:
  duration: "~10 minutes"
  completed_date: "2026-04-15"
  tasks_completed: 2
  tasks_total: 2
  files_created: 5
  files_modified: 1
---

# Phase 2 Plan 01: Content Module e Route Stubs Summary

**One-liner:** Content module `content/homepage.ts` con tipi TypeScript strict e `as const`, 4 route stub RSC per `/servizi /progetti /chi-siamo /contatti`, e `typedRoutes: true` riabilitato in `next.config.ts` — typecheck, lint e compliance tutti verdi.

## What Was Built

### Content Module (content/homepage.ts)

Single source of truth per tutti i testi e dati della homepage:

- **Tipi esportati:** `TrustMetric`, `ServiceCard`, `HomepageContent` — tutti `readonly`, nessun import esterno
- **Costante `homepageContent as const`** con 5 sezioni:
  - `hero`: headline "Dal 1952 costruiamo valore...", subheadline con menzione SOA + ISO 9001, ctaLabel/ctaHref, imageSrc + imageAlt
  - `trustStrip.metrics`: 4 metriche (70+ anni, 450+ cantieri, 35 professionisti, 3 province)
  - `services`: titolo sezione + 3 card (Residenziale/Building2, Industriale/Factory, Restauri/Landmark) con iconName come stringa
  - `serviceArea`: titolo + corpo + 6 zone (Porto Viro, Rovigo, Polesine, Veneto, Ferrara, Padova)
  - `finalCta`: headline, body, ctaLabel/ctaHref verso /contatti
- Pattern identico a `content/site.ts` — puro TypeScript, zero JSX, zero React

### Route Stub RSC (4 file)

| File | Route | Titolo placeholder |
|------|-------|--------------------|
| `app/servizi/page.tsx` | `/servizi` | Servizi |
| `app/progetti/page.tsx` | `/progetti` | Progetti |
| `app/chi-siamo/page.tsx` | `/chi-siamo` | Chi siamo |
| `app/contatti/page.tsx` | `/contatti` | Contatti |

Tutti i stub: default export, nessun `"use client"`, markup con `text-h1 font-serif text-ink` per coerenza visiva, corpo placeholder "in lavorazione".

### next.config.ts — typedRoutes riabilitato

`typedRoutes: true` rimosso dai commenti e posizionato sotto `experimental`:

```typescript
experimental: {
  typedRoutes: true,
},
```

Il typecheck con `tsc --noEmit` completa senza errori anche con i Link in Header e Footer che puntano alle route ora esistenti.

## Verification Results

```
pnpm typecheck        → OK (0 errori)
pnpm lint             → OK (0 errori)
pnpm check:compliance → OK (15 file scansionati, 0 violazioni)
```

## Deviations from Plan

Nessuna — piano eseguito esattamente come scritto.

Note: il piano ipotizzava che `/privacy` e `/cookie-policy` in `footerNav` potessero causare errori TypeScript con `typedRoutes`. Non è accaduto perché in `NavLink` il campo `href` è tipato come `string` (non literal), quindi `RouteImpl` non viene verificato per quei valori a runtime.

## Known Stubs

| Campo | File | Motivo |
|-------|------|--------|
| `hero.imageSrc` = "/images/cantieri/residenze-universitarie-rovigo/01.jpg" | content/homepage.ts | Immagine reale da fornire dal cliente (placeholder path) |
| `hero.ctaLabel` = "Richiedi un preventivo" | content/homepage.ts | Copy homepage distinto da primaryCta — da allineare con cliente in Phase 2/6 |
| Tutte e 4 le pagine stub | app/*/page.tsx | Contenuto reale arriva in Phase 3/4/5/6 rispettivamente |

Gli stub delle route non impediscono il goal del piano (abilitare typedRoutes + fornire content module). Le pagine reali arriveranno nelle fasi dedicate.

## Commits

| Hash | Messaggio |
|------|-----------|
| `d6ba20f` | feat(02-01): create content/homepage.ts — homepage content module |
| `b860fac` | feat(02-01): add 4 route stubs + re-enable typedRoutes |

## Self-Check: PASSED

- `content/homepage.ts` — FOUND
- `app/servizi/page.tsx` — FOUND
- `app/progetti/page.tsx` — FOUND
- `app/chi-siamo/page.tsx` — FOUND
- `app/contatti/page.tsx` — FOUND
- `next.config.ts` aggiornato con `typedRoutes: true` — FOUND
- Commit `d6ba20f` — VERIFIED in git log
- Commit `b860fac` — VERIFIED in git log
