---
phase: 02-homepage
plan: 02
subsystem: homepage-sections
tags: [homepage, hero, trust-strip, service-overview, service-area, cta, mobile-sticky-bar, lucide-react, rsc, client-component]
dependency_graph:
  requires:
    - 02-01-content-module-and-route-stubs
    - 01-02-design-system-and-layout
    - 01-03-seo-metadata-and-error-pages
  provides:
    - hero-section
    - trust-strip
    - service-overview
    - service-area-section
    - homepage-cta
    - mobile-sticky-bar
    - homepage-orchestrator
  affects:
    - 03-servizi
    - 06-contatti
tech_stack:
  added:
    - lucide-react@1.8.0 (icone Building2, Factory, Landmark per ServiceOverview)
  patterns:
    - iconMap pattern: Record<string, LucideIcon> in RSC per risolvere iconName string → componente Lucide
    - Spread props pattern: {...homepageContent.hero} in page.tsx — type-safe perché HeroSectionProps corrisponde ai campi
    - RSC-first: 5 componenti su 6 sono Server Components puri (zero "use client")
    - Client island minimo: MobileStickyBar unico "use client" per position:fixed post-hydration
    - D-06 fill-only enforcement: bg-brand text-panna per CTA, text-brand solo su bg-surface (bianco, contrasto 9.7:1)
key_files:
  created:
    - components/sections/HeroSection.tsx
    - components/sections/TrustStrip.tsx
    - components/sections/ServiceOverview.tsx
    - components/sections/ServiceAreaSection.tsx
    - components/sections/HomepageCta.tsx
    - components/ui/MobileStickyBar.tsx
  modified:
    - app/page.tsx
    - package.json
    - pnpm-lock.yaml
decisions:
  - "lucide-react@1.8.0 installato come dipendenza di produzione — tree-shakeable, ~1KB/icona"
  - "iconMap con fallback su Building2 per iconName non trovato — evita crash runtime se content module usa chiave errata"
  - "text-brand su bg-surface (bianco) in ServiceOverview è conforme WCAG AAA (9.7:1) — D-06 fill-only si applica ai pulsanti CTA, non alle icone e link testuali su sfondo bianco"
  - "overlay bg-ink/55 sull'hero — testo bianco su overlay scuro >> 4.5:1 WCAG AA"
  - "MobileStickyBar: z-50 > Header z-40 per garantire visibilità durante scroll"
  - "pb-24 md:pb-20 in HomepageCta per clearance sticky bar mobile (~72px altezza)"
  - "buildMetadata usato in page.tsx per sovrascrivere il titolo specifico SEO della homepage"
metrics:
  duration: "~15 minutes"
  completed_date: "2026-04-15"
  tasks_completed: 2
  tasks_total: 3
  files_created: 6
  files_modified: 3
---

# Phase 2 Plan 02: Homepage Sections Summary

**One-liner:** 6 componenti homepage (HeroSection RSC full-bleed, TrustStrip bg-ink, ServiceOverview con iconMap Lucide, ServiceAreaSection testo-puro, HomepageCta, MobileStickyBar client) + orchestratore app/page.tsx — typecheck, lint, compliance tutti verdi, checkpoint visuale in attesa.

## What Was Built

### HeroSection (components/sections/HeroSection.tsx)

RSC full-bleed con:

- `next/image` con `fill` + `priority` + `sizes="100vw"` + `quality={85}` — LCP ottimizzato
- `h-[100svh] max-h-[900px] min-h-[600px]` — viewport coverage garantito a 375px
- Overlay `bg-ink/55` per leggibilità testo (WCAG AA)
- Headline `font-serif text-h1 text-panna leading-[1.1]` — IBM Plex Serif, max-w-2xl
- CTA pill `bg-brand text-panna` (D-06 fill-only) con hover `bg-brand/90`
- Contenuto posizionato `justify-end` in basso per valorizzare la foto

### TrustStrip (components/sections/TrustStrip.tsx)

RSC strip su `bg-ink`:

- `<dl>` semantico con `<dt>` (valore numerico) e `<dd>` (etichetta)
- `grid-cols-2 md:grid-cols-4` — 2 colonne mobile, 4 desktop
- `font-serif text-h2 text-panna` per i valori — IBM Plex Serif
- Zero animazioni, zero `useEffect` — valori statici renderizzati lato server

### ServiceOverview (components/sections/ServiceOverview.tsx)

RSC 3 card servizi su `bg-panna`:

- `iconMap: Record<string, LucideIcon>` con Building2 / Factory / Landmark — risolve `iconName` string → componente
- Fallback `Building2` se `iconName` non trovato
- Card come `<Link>` con `border-border bg-surface` e hover `border-ink/30`
- `text-brand` su `bg-surface` (bianco) — contrasto 9.7:1, WCAG AAA

### ServiceAreaSection (components/sections/ServiceAreaSection.tsx)

RSC testo su `bg-surface`:

- Body con menzione esplicita Porto Viro, Rovigo, Polesine, Veneto, Ferrara, Padova
- Lista zone con pallini `bg-brand h-1.5 w-1.5 rounded-full`
- Layout 2 colonne su desktop, stacked su mobile
- Zero iframe, zero link Google Maps — compliance OK

### HomepageCta (components/sections/HomepageCta.tsx)

RSC CTA finale centrata su `bg-panna`:

- `pb-24 md:pb-20` — clearance per la sticky bar mobile (~72px)
- CTA pill `bg-brand text-panna` (D-06 fill-only)

### MobileStickyBar (components/ui/MobileStickyBar.tsx)

Client Component sticky bottom bar:

- `"use client"` in prima riga (necessario per `position:fixed` post-hydration)
- `fixed bottom-0 left-0 right-0 z-50 md:hidden`
- `bg-panna/95 backdrop-blur` — coerente con Header
- `tel:${phoneTel}` per il click-to-call
- Dati ricevuti come props da `app/page.tsx` (non hardcoded)

### app/page.tsx — Orchestratore Homepage

- `export const metadata = buildMetadata(...)` — sovrascrive il layout con titolo SEO specifico
- Spread `{...homepageContent.hero}` — type-safe con `HeroSectionProps`
- `MobileStickyBar` riceve dati da `primaryCta` e `siteContent` (non da `homepageContent`)
- Nessun `"use client"` — RSC orchestratore puro

## Verification Results

```
pnpm typecheck      → OK (0 errori)
pnpm lint           → OK (0 errori)
pnpm check:compliance → OK (21 file scansionati, 0 violazioni)
```

**Verifica visuale:** In attesa di checkpoint umano (Task 3).

## Deviations from Plan

Nessuna — piano eseguito esattamente come scritto.

## Known Stubs

| Campo | File | Motivo |
|-------|------|--------|
| `hero.imageSrc` = "/images/cantieri/residenze-universitarie-rovigo/01.jpg" | content/homepage.ts | Immagine reale da fornire dal cliente — path placeholder |
| `siteContent.contact.phone.display` = "+39 0426 000 000" | content/site.ts | Numero placeholder — da sostituire con dato reale cliente |

Gli stub non impediscono il goal del piano (homepage completa e deployabile strutturalmente). Le immagini e i dati reali arriveranno su richiesta al cliente.

## Commits

| Hash | Messaggio |
|------|-----------|
| `7fddadf` | feat(02-02): install lucide-react + create HeroSection and TrustStrip |
| `721423e` | feat(02-02): create all homepage sections and update page.tsx orchestrator |

## Self-Check: PASSED

- `components/sections/HeroSection.tsx` — FOUND
- `components/sections/TrustStrip.tsx` — FOUND
- `components/sections/ServiceOverview.tsx` — FOUND
- `components/sections/ServiceAreaSection.tsx` — FOUND
- `components/sections/HomepageCta.tsx` — FOUND
- `components/ui/MobileStickyBar.tsx` — FOUND
- `app/page.tsx` (orchestratore) — FOUND
- Commit `7fddadf` — VERIFIED in git log
- Commit `721423e` — VERIFIED in git log
