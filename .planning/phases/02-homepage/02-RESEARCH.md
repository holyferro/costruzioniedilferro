# Phase 2: Homepage — Research

**Researched:** 2026-04-15
**Domain:** Next.js 16 App Router homepage — hero section, trust strip, mobile sticky CTA, content module extension
**Confidence:** HIGH

---

## Summary

La homepage di Phase 2 sostituisce il placeholder `app/page.tsx` con 5 sezioni RSC in sequenza: Hero, Trust Strip, Overview Servizi, Area di Servizio, CTA finale. Tutto il contenuto viene estratto da un nuovo modulo `content/homepage.ts` che segue esattamente il pattern già stabilito in Phase 1 (oggetti TypeScript puri, `as const`, nessun hardcoding nei componenti). Le sezioni vengono composte direttamente in `app/page.tsx` come imports Server Components — nessun `"use client"` è necessario tranne un componente isolato per la sticky bottom bar mobile.

L'infrastruttura di Phase 1 è già pronta: design token (`bg-panna`, `text-ink`, `bg-brand`, `font-serif`, `text-h1`, `text-h2`), `cn()` helper, `buildMetadata()`, `siteContent`, `legalContent`. Phase 2 deve solo costruire sopra di essa senza modificare i file esistenti (tranne `app/page.tsx` che è un placeholder esplicito).

**Raccomandazione primaria:** Costruire ogni sezione come file separato in `components/sections/`, passare i dati dal content module via props (non import diretto nei componenti), lasciare `app/page.tsx` come orchestratore pulito.

---

## Project Constraints (from CLAUDE.md)

- TypeScript strict — nessun `any`, `unknown` con type guard se necessario
- Next.js App Router — RSC di default, `"use client"` solo per interazione reale
- Tailwind v4 CSS-first — utility classes da `@theme inline` già definite in `globals.css`
- design professionale, sobrio, istituzionale — no animazioni, no effetti startup
- mobile-first sempre, Lighthouse mobile priorità
- immagini: sempre `next/image`, alt text descrittivi, foto reali di cantieri
- CTA primaria globale: "Richiedi un preventivo" (nota: `navigation.ts` usa "Richiedi un preventivo" per `primaryCta.label`)
- CTA sempre above the fold in Home
- su mobile CTA facilmente raggiungibili
- evitare dipendenze senza reale necessità
- prima di chiudere modifiche importanti: `pnpm lint && pnpm typecheck`
- non rompere check:compliance, check:contrast, check:layout
- Google Maps iframe: VIETATO (usa mappa statica AVIF + link — rilevante per Phase 6, non per homepage)
- GA4/gtag/Google Tag Manager: VIETATI (check:compliance lo blocca)
- contenuto in content modules TypeScript, non hardcoded nei componenti
- font-serif (IBM Plex Serif) per H1 hero — D-08
- brand fill-only rule: `bg-brand text-panna` (mai `text-brand` su sfondo chiaro) — D-06

---

## Codebase Inventory (Phase 1 Outputs)

### File già pronti — da usare, non toccare

| File                           | Cosa fornisce a Phase 2                                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `app/globals.css`              | `bg-panna`, `text-ink`, `bg-brand`, `text-panna`, `bg-surface`, `border-border`, `font-serif`, `font-sans`, `text-h1`, `text-h2`  |
| `app/layout.tsx`               | Header, Footer, Analytics, SpeedInsights già montati — Phase 2 NON li tocca                                                       |
| `content/site.ts`              | `siteContent.brand.claim`, `siteContent.brand.tagline`, `siteContent.serviceArea`, `siteContent.contact.phone`                    |
| `content/navigation.ts`        | `primaryCta` (`{ href: "/contatti", label: "Richiedi un preventivo" }`)                                                           |
| `lib/seo/metadata.ts`          | `buildMetadata()` — per `export const metadata` in `app/page.tsx`                                                                 |
| `lib/utils/cn.ts`              | `cn()` — per classi condizionali                                                                                                  |
| `scripts/check-layout.mjs`     | Verifica Header/Footer/Analytics/SpeedInsights/lang="it" in `app/layout.tsx` — Phase 2 non tocca `layout.tsx` quindi non si rompe |
| `scripts/check-compliance.mjs` | Scansiona iframe, gtag, googletagmanager, fonts.googleapis.com, google.com/maps — Phase 2 non introduce nessuno di questi         |

### File da sostituire / estendere

| File             | Azione                                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `app/page.tsx`   | Sostituire il placeholder con la composizione delle sezioni homepage                                                   |
| `next.config.ts` | Re-abilitare `typedRoutes: true` (tutte le rotte nav ora esistono: `/servizi`, `/progetti`, `/chi-siamo`, `/contatti`) |

### File da creare

| File                                         | Contenuto                                                          |
| -------------------------------------------- | ------------------------------------------------------------------ |
| `content/homepage.ts`                        | Nuovo content module — tutto il copy e i dati della homepage       |
| `components/sections/HeroSection.tsx`        | RSC hero con next/image fill + overlay text + CTA                  |
| `components/sections/TrustStrip.tsx`         | RSC strip numerica — 4 metriche aziendali                          |
| `components/sections/ServiceOverview.tsx`    | RSC overview 3 settori operativi                                   |
| `components/sections/ServiceAreaSection.tsx` | RSC area di servizio — testo puro, nessuna mappa                   |
| `components/sections/HomepageCta.tsx`        | RSC CTA sezione finale (above footer)                              |
| `components/ui/MobileStickyBar.tsx`          | Client Component sticky bottom bar (unico "use client" di Phase 2) |

---

## Immagini Disponibili

Audit completo di `public/images/cantieri/`:

| Path                                                     | Dimensioni | Dimensione file | Qualità per hero                                                   |
| -------------------------------------------------------- | ---------- | --------------- | ------------------------------------------------------------------ |
| `cantieri/casa-passiva-porto-viro/01.jpg`                | 2000×1333  | 1169KB          | BUONA — edificio residenziale moderno, orizzontale                 |
| `cantieri/casa-passiva-porto-viro/02.jpg`                | 4602×3068  | 3147KB          | BUONA — molto grande, richiederebbe ottimizzazione                 |
| `cantieri/casa-passiva-porto-viro/03.jpg`                | 4912×3264  | 3616KB          | BUONA — molto grande                                               |
| `cantieri/casa-passiva-porto-viro/04.jpg`                | 2300×1534  | 775KB           | BUONA — orizzontale, proporzioni hero-friendly                     |
| `cantieri/residenze-universitarie-rovigo/01.jpg`         | 4032×3024  | 3181KB          | ECCELLENTE — edificio pubblico, cantiere attivo, territorio Rovigo |
| `cantieri/residenze-universitarie-rovigo/02.jpg`         | 4032×3024  | 2669KB          | ECCELLENTE — stessa serie                                          |
| `cantieri/residenze-universitarie-rovigo/03.jpg`         | 4032×3024  | 3037KB          | ECCELLENTE — stessa serie                                          |
| `cantieri/residenze-universitarie-rovigo/04.jpg`         | 4032×3024  | 2612KB          | ECCELLENTE — stessa serie                                          |
| `cantieri/appalti-pubblici/porto-viro-casa-di-cura.jpg`  | 2150×1401  | 857KB           | BUONA — cantiere pubblico Porto Viro                               |
| `cantieri/appalti-pubblici/adria-restauro-magazzino.jpg` | 2372×1525  | 735KB           | BUONA — cantiere restauro                                          |
| `cantieri/lavori-industriali/01.jpg`                     | 2048×1536  | 760KB           | MEDIA — industriale                                                |

**Immagine consigliata per hero:** `cantieri/residenze-universitarie-rovigo/01.jpg` o `02.jpg`

- Motivi: edificio pubblico grande (rinforza trust per enti pubblici), territorio Rovigo (area di servizio primaria), dimensioni adeguate per fill hero su desktop, scattata da iPhone XR (2021) — qualità moderna
- Fallback: `cantieri/casa-passiva-porto-viro/04.jpg` (2300×1534, file più leggero, residenziale moderno)

**AVVISO:** Le immagini in `residenze-universitarie-rovigo/` sono file da 2.6–3.2MB. Next/image le ottimizzerà automaticamente in WebP/AVIF, ma serve indicare `sizes` corretti per evitare download inutili su mobile.

---

## Standard Stack

### Core (già installato in Phase 1)

| Library          | Version | Purpose                                     |
| ---------------- | ------- | ------------------------------------------- |
| `next`           | 16.2.3  | App Router, next/image, Server Components   |
| `tailwindcss`    | ^4      | Utility classes, `@theme inline` tokens     |
| `clsx`           | ^2.1.1  | Classi condizionali                         |
| `tailwind-merge` | ^2.5.4  | Risoluzione conflitti Tailwind — via `cn()` |

### Non installato — necessario per Phase 2

| Library        | Version  | Purpose                         | Motivo                                                                                                                |
| -------------- | -------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `lucide-react` | `^0.4xx` | Icone per sezione servizi + CTA | Phase 1 ha usato SVG inline per mancanza lucide. Phase 2 introduce abbastanza icone da giustificarne l'installazione. |

**Nessuna altra dipendenza nuova** — Phase 2 è pure RSC content + next/image. Non servono react-hook-form, zod, resend, sonner (arrivano in Phase 6).

**Installazione:**

```bash
pnpm add lucide-react
```

---

## Architecture Patterns

### Struttura file consigliata

```
app/
  page.tsx              ← orchestratore pulito: importa sezioni, export metadata
content/
  homepage.ts           ← nuovo content module (copy + dati homepage)
components/
  sections/
    HeroSection.tsx     ← RSC, next/image fill
    TrustStrip.tsx      ← RSC, 4 numeri aziendali
    ServiceOverview.tsx ← RSC, 3 card settori
    ServiceAreaSection.tsx ← RSC, testo puro
    HomepageCta.tsx     ← RSC, CTA finale
  ui/
    MobileStickyBar.tsx ← "use client", sticky bottom bar
```

### Pattern 1: Hero con next/image fill

Il pattern standard Next.js 16 per hero full-width con immagine di sfondo è un wrapper relativo + `Image fill`.

```tsx
// Source: nextjs.org/docs/app/api-reference/components/image
// components/sections/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type HeroProps = {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
};

export function HeroSection({
  headline,
  subheadline,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: HeroProps) {
  return (
    <section className="relative h-[100svh] max-h-[900px] min-h-[600px]">
      {/* Immagine di sfondo — fill richiede position: relative sul genitore */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={85}
      />
      {/* Overlay scuro per leggibilità testo su foto */}
      <div className="bg-ink/55 absolute inset-0" aria-hidden="true" />
      {/* Contenuto sopra l'overlay */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-end px-6 pb-16">
        <h1 className="text-h1 text-panna max-w-2xl font-serif leading-[1.1]">{headline}</h1>
        <p className="text-panna/85 mt-4 max-w-xl text-lg">{subheadline}</p>
        <Link
          href={ctaHref}
          className="bg-brand text-panna hover:bg-brand/90 mt-8 inline-flex rounded-full px-7 py-3.5 text-sm font-medium transition-colors"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
```

**Note critiche su next/image fill:**

- Il parent container DEVE avere `position: relative` (Tailwind: `relative`) [VERIFIED: nextjs.org docs]
- `fill` richiede anche che il parent abbia dimensioni definite (height) — `h-[100svh]` funziona [VERIFIED: nextjs.org docs]
- `priority` è OBBLIGATORIO per LCP (Largest Contentful Paint) sull'immagine above-the-fold [VERIFIED: Next.js docs]
- `sizes="100vw"` è il valore corretto per immagini full-width [VERIFIED: Next.js docs]
- `object-cover` mantiene le proporzioni riempiendo il contenitore [ASSUMED: Tailwind standard]

### Pattern 2: Trust Strip — RSC puro, senza animazioni

```tsx
// components/sections/TrustStrip.tsx
type TrustMetric = {
  value: string; // "70+"
  label: string; // "anni di esperienza"
};

type TrustStripProps = {
  metrics: readonly TrustMetric[];
};

export function TrustStrip({ metrics }: TrustStripProps) {
  return (
    <section className="bg-ink py-12" aria-label="Numeri chiave dell'impresa">
      <div className="mx-auto max-w-6xl px-6">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <dt className="text-h2 text-panna font-serif">{m.value}</dt>
              <dd className="text-panna/70 mt-1 text-sm">{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

**Nota:** `bg-ink` su sfondo panna crea il visivo di sezione-break — coerente con il Footer che usa `bg-surface`. Non serve animare i numeri (CLAUDE.md: "evitare effetti vistosi"). [VERIFIED: codebase pattern da Footer]

### Pattern 3: Mobile Sticky Bar — unico Client Component

```tsx
// components/ui/MobileStickyBar.tsx
"use client";
// Necessita "use client" solo perché è sticky e deve restare visibile su scroll.
// Non ha stato React — è puro layout fisso. Il "use client" è per il rendering
// lato client che mantiene il position:fixed funzionante su scroll.

import Link from "next/link";

type MobileStickyBarProps = {
  ctaLabel: string;
  ctaHref: string;
  phoneDisplay: string;
  phoneTel: string;
};

export function MobileStickyBar({
  ctaLabel,
  ctaHref,
  phoneDisplay,
  phoneTel,
}: MobileStickyBarProps) {
  return (
    <div
      className="border-border bg-panna/95 fixed right-0 bottom-0 left-0 z-50 flex border-t p-3 backdrop-blur md:hidden"
      role="complementary"
      aria-label="Azioni rapide mobile"
    >
      <a
        href={`tel:${phoneTel}`}
        className="border-ink/20 text-ink flex-1 rounded-full border py-3 text-center text-sm font-medium"
        aria-label={`Chiama ${phoneDisplay}`}
      >
        {phoneDisplay}
      </a>
      <Link
        href={ctaHref}
        className="bg-brand text-panna ml-2 flex-1 rounded-full py-3 text-center text-sm font-medium"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
```

**Nota critica:** `"use client"` è giustificato qui perché `position: fixed` in SSR si comporta correttamente solo dopo hydration lato client. Senza "use client" il componente può apparire in posizione sbagliata su first paint o non rispondere allo scroll. [ASSUMED — pattern comune per sticky bars in Next.js RSC]

**Problema di padding:** La sticky bar occupa spazio in fondo allo schermo. L'ultimo contenuto visibile rischia di finire dietro di essa. La soluzione è aggiungere `pb-20 md:pb-0` al `<main>` in `layout.tsx` — MA ATTENZIONE: `layout.tsx` è già finalizzato da Phase 1 e modificarlo richiede di ri-verificare `check:layout`. Alternativa: aggiungere `mb-20 md:mb-0` a `HomepageCta.tsx` (l'ultima sezione).

### Pattern 4: Content Module per Homepage

Seguendo esattamente il pattern di `content/site.ts`:

```typescript
// content/homepage.ts
// Tutto il copy e i dati della homepage. Importato da app/page.tsx,
// poi passato come props alle sezioni.

export type TrustMetric = {
  readonly value: string;
  readonly label: string;
};

export type ServiceCard = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly iconName: string; // nome dell'icona Lucide — stringa, non componente
};

export type HomepageContent = {
  readonly hero: {
    readonly headline: string;
    readonly subheadline: string;
    readonly ctaLabel: string;
    readonly ctaHref: string;
    readonly imageSrc: string;
    readonly imageAlt: string;
  };
  readonly trustStrip: {
    readonly metrics: readonly TrustMetric[];
  };
  readonly services: {
    readonly sectionTitle: string;
    readonly sectionSubtitle: string;
    readonly cards: readonly ServiceCard[];
  };
  readonly serviceArea: {
    readonly sectionTitle: string;
    readonly body: string;
    readonly zones: readonly string[];
  };
  readonly finalCta: {
    readonly headline: string;
    readonly body: string;
    readonly ctaLabel: string;
    readonly ctaHref: string;
  };
};

export const homepageContent: HomepageContent = {
  hero: {
    headline: "Dal 1952 costruiamo valore, qualità e fiducia nel territorio.",
    subheadline:
      "General contractor per opere residenziali, industriali e di restauro nel Polesine e in tutto il Veneto. Certificati SOA e ISO 9001.",
    ctaLabel: "Richiedi un preventivo",
    ctaHref: "/contatti",
    imageSrc: "/images/cantieri/residenze-universitarie-rovigo/01.jpg",
    imageAlt: "Cantiere residenze universitarie Rovigo — Costruzioni Edilferro",
  },
  trustStrip: {
    metrics: [
      { value: "70+", label: "anni di esperienza" },
      { value: "450+", label: "cantieri completati" },
      { value: "35", label: "professionisti e maestranze" },
      { value: "3", label: "province servite" },
    ],
  },
  services: {
    sectionTitle: "Cosa realizziamo",
    sectionSubtitle:
      "Dal progetto alla consegna, un unico interlocutore per opere residenziali, industriali e di restauro.",
    cards: [
      {
        title: "Residenziale",
        description:
          "Nuove costruzioni, ristrutturazioni di pregio e soluzioni chiavi in mano per privati.",
        href: "/servizi#residenziale",
        iconName: "Building2",
      },
      {
        title: "Industriale e Commerciale",
        description: "Capannoni, strutture commerciali e manutenzioni programmate per aziende.",
        href: "/servizi#industriale",
        iconName: "Factory",
      },
      {
        title: "Restauri e Opere Pubbliche",
        description:
          "Recupero edilizio, restauro conservativo e appalti pubblici con attestazione SOA.",
        href: "/servizi#restauri",
        iconName: "Landmark",
      },
    ],
  },
  serviceArea: {
    sectionTitle: "Dove operiamo",
    body: "Costruzioni Edilferro opera principalmente nel Polesine e in tutto il Veneto, con cantieri attivi a Porto Viro, Rovigo e nei comuni limitrofi. Serviamo privati, enti pubblici e professionisti in un raggio esteso alle province di Ferrara e Padova per commesse di particolare dimensione.",
    zones: ["Porto Viro", "Rovigo", "Polesine", "Veneto", "Ferrara", "Padova"],
  },
  finalCta: {
    headline: "Affida il tuo progetto a un partner solido e qualificato.",
    body: "Dalla nuova costruzione al recupero di immobili complessi, Costruzioni Edilferro affianca privati, aziende ed enti con un approccio strutturato, trasparente e orientato al risultato.",
    ctaLabel: "Richiedi un preventivo",
    ctaHref: "/contatti",
  },
} as const;
```

**Nota su `iconName: string`:** Le icone Lucide non devono essere importate nel content module (che è un file TS puro, non TSX). La risoluzione dell'icona avviene nel componente RSC tramite un map `{ [key: string]: LucideIcon }`. [VERIFIED: lucide-react documentazione pattern di uso dinamico]

### Pattern 5: app/page.tsx come orchestratore

```tsx
// app/page.tsx — dopo Phase 2
import { buildMetadata } from "@/lib/seo/metadata";
import { homepageContent } from "@/content/homepage";
import { siteContent } from "@/content/site";
import { primaryCta } from "@/content/navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { HomepageCta } from "@/components/sections/HomepageCta";
import { MobileStickyBar } from "@/components/ui/MobileStickyBar";

export const metadata = buildMetadata({
  title: "Impresa Edile — Porto Viro, Rovigo, Veneto",
  description: siteContent.brand.tagline,
  alternates: { canonical: "/" },
});

export default function Home() {
  return (
    <>
      <HeroSection {...homepageContent.hero} />
      <TrustStrip {...homepageContent.trustStrip} />
      <ServiceOverview {...homepageContent.services} />
      <ServiceAreaSection {...homepageContent.serviceArea} />
      <HomepageCta {...homepageContent.finalCta} />
      <MobileStickyBar
        ctaLabel={primaryCta.label}
        ctaHref={primaryCta.href}
        phoneDisplay={siteContent.contact.phone.display}
        phoneTel={siteContent.contact.phone.tel}
      />
    </>
  );
}
```

---

## Don't Hand-Roll

| Problema                  | Non costruire                       | Usare invece                                   | Perché                                                                               |
| ------------------------- | ----------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| Ottimizzazione immagini   | Logica resize/compress custom       | `next/image` con `fill` + `priority` + `sizes` | Next.js genera srcset AVIF/WebP automaticamente, gestisce CLS, lazy loading built-in |
| Icone servizi             | SVG inline hardcoded per ogni icona | `lucide-react`                                 | Tree-shakeable, coerenza visiva, mantenibilità                                       |
| Classi condizionali       | Template literals manuali           | `cn()` da `lib/utils/cn.ts`                    | Già installato, risolve conflitti Tailwind                                           |
| Overlay scuro su immagine | `filter: brightness()` CSS          | `absolute inset-0 bg-ink/XX`                   | Più controllabile, non altera l'immagine originale, compatibile con next/image       |
| Metadata homepage         | `<head>` manuale                    | `buildMetadata()` da `lib/seo/metadata.ts`     | Già costruito in Phase 1, merging corretto di openGraph/twitter                      |
| Numeri animati (count-up) | `useEffect` + `useState` counter    | Nessuna animazione — testo statico             | CLAUDE.md: "limitare animazioni inutili", "evitare effetti startup/SaaS"             |

---

## Common Pitfalls

### Pitfall 1: next/image fill senza altezza definita sul parent

**Cosa va storto:** `Image fill` non funziona se il parent container non ha un'altezza CSS esplicita. Il risultato è altezza 0, immagine invisibile.
**Perché accade:** `fill` usa `position: absolute` — l'elemento si espande al contenitore padre, ma se il padre ha `height: auto` (default), la sua altezza collassa a 0.
**Come evitare:** Impostare sempre `h-[altezza]` o `min-h-[altezza]` sul parent relativo. Per hero full-screen: `h-[100svh]` (con `min-h-[600px]` come fallback per viewport piccoli).
**Segnali d'allarme:** L'hero appare come uno spazio bianco, o Next.js lancia warning "Image with src ... has fill but is missing sizes".

### Pitfall 2: `priority` mancante sull'immagine LCP

**Cosa va storto:** Senza `priority`, Next.js aggiunge `loading="lazy"` all'immagine hero. Il browser non la scarica finché non è visible — ma è già visible above the fold. Risultato: LCP degradato, Lighthouse performance < 90.
**Come evitare:** Ogni immagine above the fold nell'hero DEVE avere `priority`. Una sola immagine per pagina dovrebbe avere `priority` (quella LCP).

### Pitfall 3: `sizes` errato su immagini fill

**Cosa va storto:** Se `sizes` è omesso o impostato a "100vw" per un'immagine che su desktop è in un container più stretto, il browser scarica un'immagine inutilmente grande.
**Come evitare:** Per il hero full-width: `sizes="100vw"` è corretto. Per card in griglia: `sizes="(min-width: 768px) 33vw, 100vw"`.

### Pitfall 4: MobileStickyBar nasconde contenuto sotto il fold

**Cosa va storto:** La barra sticky a 56–64px dal fondo copre l'ultimo paragrafo o l'ultima CTA della pagina su mobile.
**Come evitare:** Aggiungere `pb-20 md:pb-0` al contenuto, oppure includere il padding come margin sul contenitore dell'ultima sezione (`HomepageCta.tsx`).

### Pitfall 5: `typedRoutes` ancora disabilitato

**Cosa va storto:** Se si dimentica di riabilitare `typedRoutes: true` in `next.config.ts`, i link tipizzati non funzionano per tutta la durata del progetto, perdendo la protezione da routing typo.
**Quando farlo:** Phase 2 crea le pagine placeholder `/servizi`, `/progetti`, `/chi-siamo`, `/contatti` (anche come stub vuoti). Solo quando tutte le route in `primaryNav` esistono, si può riabilitare senza errori TypeScript.
**Come evitare:** Piano di Phase 2 deve includere la creazione delle route stub + riattivazione typedRoutes come task esplicito.

### Pitfall 6: check:compliance si rompe per Google Maps URL in content

**Cosa va storto:** `siteContent.address.googleMapsUrl` usa `maps.app.goo.gl` (short link) proprio per evitare di triggerare la regola `google.com/maps` in `check-compliance.mjs`. Se qualcuno scrive un link canonico con `google.com/maps` nel content module, il check fallisce.
**Come evitare:** Nel nuovo `content/homepage.ts`, non includere link Google Maps. Per l'area di servizio usare solo testo, non mappe o link esterni.

### Pitfall 7: Overlay troppo scuro o troppo chiaro

**Cosa va storto:** Un overlay `bg-ink/40` può non dare abbastanza contrasto per il testo bianco su alcune foto. Un overlay `bg-ink/70` può nascondere troppo la foto.
**Come evitare:** Testare visivamente con l'immagine reale. Valore raccomandato iniziale: `/55`. Verificare WCAG AA (4.5:1) per il testo — con `text-panna` su `bg-ink/55` su una foto scura il contrasto è tipicamente >7:1. Per foto chiare, aumentare a `/65`.

### Pitfall 8: H1 sulla homepage duplica l'H1 di layout

**Cosa va storto:** Se Header o Layout contiene un `<h1>`, aggiungerlo anche nell'hero crea struttura heading errata (più H1 per pagina).
**Come evitare:** Verificare in `Header.tsx` — il logo usa `<Link>` non un heading. L'H1 appartiene all'hero. Corretto. [VERIFIED: `Header.tsx` usa `<Link>` per il logo, nessun `<h1>`]

### Pitfall 9: `font-serif` e `text-h1` richiedono classi separate

**Cosa va storto:** In Tailwind v4, `text-h1` e `font-serif` sono classi indipendenti. Dimenticare `font-serif` e usare solo `text-h1` lascia il titolo in Inter (sans-serif).
**Come evitare:** Usare sempre la coppia `font-serif text-h1 leading-[1.1]` per i titoli hero. Pattern stabilito in `app/not-found.tsx` e `app/page.tsx` (Phase 1).

---

## check:layout — Cosa verifica e come non romperlo

`scripts/check-layout.mjs` verifica che `app/layout.tsx` contenga:

1. `<Header` — presenza del componente Header
2. `<Footer` — presenza del componente Footer
3. `<Analytics` — @vercel/analytics
4. `<SpeedInsights` — @vercel/speed-insights
5. `lang="it"` — attributo sulla tag `<html>`

**Phase 2 NON modifica `app/layout.tsx`** — quindi `check:layout` non si rompe. Tutte le sezioni homepage vengono aggiunte a `app/page.tsx`, non al layout.

**Unico rischio:** Se si aggiunge `MobileStickyBar` a `layout.tsx` invece di `page.tsx`. Non farlo — la sticky bar è specifica della homepage, non globale.

---

## Struttura Sezioni — Dettaglio

### HeroSection

- **Tipo:** RSC
- **Requisito soddisfatto:** HOM-01 (foto + titolo + CTA above fold a 375px)
- **Layout:** `h-[100svh] min-h-[600px] max-h-[900px]` — garantisce che su mobile 375×667 l'hero occupi l'intero viewport senza scroll, e su desktop non diventi eccessivamente alto
- **Testo:** posizionato in basso (justify-end) per permettere alla foto di "respirare" in alto — pattern editoriale standard per editorial hero
- **CTA:** `bg-brand text-panna rounded-full` (D-06 fill-only)

### TrustStrip

- **Tipo:** RSC
- **Requisito soddisfatto:** HOM-02 (4 metriche aziendali senza animazioni)
- **Sfondo:** `bg-ink` — crea contrasto visivo forte, separa hero da servizi
- **Grid:** `grid-cols-2 md:grid-cols-4` — 2 colonne mobile, 4 colonne desktop
- **Semantica:** `<dl>` con `<dt>` per il valore numerico e `<dd>` per l'etichetta — HTML semanticamente corretto per liste di definizioni/metriche

### ServiceOverview

- **Tipo:** RSC
- **Requisito soddisfatto:** HOM-06 (overview servizi con link a /servizi)
- **Layout:** 3 card in griglia `md:grid-cols-3`, sfondo `bg-panna` (sfondo di default)
- **Link:** Ogni card linka a `/servizi#sezione` — ancora esistente in Phase 3
- **Icone:** Lucide-react (Building2, Factory, Landmark)

### ServiceAreaSection

- **Tipo:** RSC
- **Requisito soddisfatto:** HOM-05 (area di servizio dichiarata esplicitamente)
- **Layout:** Testo puro su `bg-surface` (bianco) — break visivo da panna
- **Contenuto:** Paragrafo narrativo + lista zone, nessuna mappa, nessun iframe
- **Compliance:** Nessun link `google.com/maps` — usa solo testo
- **SEO value:** Menziona "Porto Viro", "Rovigo", "Polesine", "Veneto" nel body — local SEO signal

### HomepageCta

- **Tipo:** RSC
- **Requisito soddisfatto:** HOM-07 (CTA finale prima del footer)
- **Layout:** Sezione centrata con headline serif, body copy, e CTA pill brand
- **Padding bottom:** `pb-24 md:pb-16` — lascia spazio alla sticky bar su mobile

### MobileStickyBar

- **Tipo:** Client Component (`"use client"`)
- **Requisito soddisfatto:** HOM-03 (barra sticky mobile durante lo scroll)
- **Visibilità:** Solo su mobile (`md:hidden`)
- **Layout:** Due pulsanti affiancati — tel (ghost) + CTA (brand fill)
- **z-index:** `z-50` — sopra tutti i contenuti della pagina (Header usa `z-40`)

---

## Route Stub Per typedRoutes

Phase 2 deve creare stub minimi per le route nav che ancora non esistono, prima di riabilitare `typedRoutes`:

| Route        | File                     | Contenuto stub                                   |
| ------------ | ------------------------ | ------------------------------------------------ |
| `/servizi`   | `app/servizi/page.tsx`   | Placeholder RSC con titolo "Servizi — in arrivo" |
| `/progetti`  | `app/progetti/page.tsx`  | Placeholder RSC                                  |
| `/chi-siamo` | `app/chi-siamo/page.tsx` | Placeholder RSC                                  |
| `/contatti`  | `app/contatti/page.tsx`  | Placeholder RSC                                  |

Questo sblocca `typedRoutes: true` in `next.config.ts` come da nota nel SUMMARY di Phase 1.

---

## Validation Architecture

### Test Framework

| Property           | Value                                             |
| ------------------ | ------------------------------------------------- |
| Framework          | Nessun framework di test installato in Phase 1    |
| Config file        | Nessuno                                           |
| Quick run command  | `pnpm check` (lint + typecheck + 3 check scripts) |
| Full suite command | `pnpm build`                                      |

### Phase Requirements → Test Map

| Req ID | Comportamento                     | Tipo               | Comando automatizzato                                            |
| ------ | --------------------------------- | ------------------ | ---------------------------------------------------------------- |
| HOM-01 | Hero visibile above fold 375px    | Visual/manual      | Ispezione visiva in browser + Lighthouse mobile                  |
| HOM-02 | Trust strip con almeno 3 metriche | TypeScript compile | `pnpm typecheck` — il tipo `TrustMetric[]` con almeno 4 elementi |
| HOM-03 | Sticky bar mobile durante scroll  | Visual/manual      | Ispezione su 375px viewport                                      |
| HOM-04 | `typedRoutes` riabilitato         | TypeScript compile | `pnpm typecheck`                                                 |
| HOM-05 | Area di servizio dichiarata       | Grep codebase      | `pnpm check:compliance` + review content                         |
| HOM-06 | Link ai servizi presenti          | TypeScript compile | `pnpm typecheck` (typedRoutes)                                   |
| HOM-07 | CTA finale presente               | Manual review      | Ispezione visiva                                                 |
| HOM-08 | check:compliance passa            | Automated          | `pnpm check:compliance`                                          |

### Sampling Rate

- **Per ogni task commit:** `pnpm lint && pnpm typecheck`
- **Per wave merge:** `pnpm check` (tutti e 5 gli script)
- **Phase gate:** `pnpm build` verde prima di chiudere Phase 2

### Wave 0 Gaps

- [ ] `content/homepage.ts` — mancante, va creato
- [ ] `components/sections/*.tsx` — directory esiste ma vuota (`.gitkeep`)
- [ ] `components/ui/MobileStickyBar.tsx` — mancante
- [ ] Route stub per `/servizi`, `/progetti`, `/chi-siamo`, `/contatti`

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category         | Applies | Note                                             |
| --------------------- | ------- | ------------------------------------------------ |
| V2 Authentication     | No      | Nessun auth in Phase 2                           |
| V3 Session Management | No      | Nessuna sessione                                 |
| V4 Access Control     | No      | Pagina pubblica                                  |
| V5 Input Validation   | No      | Nessun input utente in Phase 2 (form in Phase 6) |
| V6 Cryptography       | No      | Nessuna crittografia                             |

### Threat Patterns Specifici Phase 2

| Pattern                                              | STRIDE    | Mitigazione standard                                                                 |
| ---------------------------------------------------- | --------- | ------------------------------------------------------------------------------------ |
| Immagine src manipulation (path traversal via props) | Tampering | Tutti i path immagine sono string literals nel content module — nessun input esterno |
| Open redirect via `ctaHref`                          | Tampering | Tutti gli href sono string literals nel content module — nessun input utente         |
| `<iframe>` injection                                 | Tampering | `check-compliance.mjs` blocca qualsiasi `<iframe>` nel sorgente                      |

**Nessun rischio di sicurezza significativo in Phase 2** — pagina statica pura, RSC, nessun input, nessuna API call.

---

## Environment Availability

| Dipendenza        | Richiesta da          | Disponibile | Versione        | Fallback                  |
| ----------------- | --------------------- | ----------- | --------------- | ------------------------- |
| Node.js           | pnpm dev/build        | SI          | 22.18.0         | —                         |
| pnpm              | package manager       | SI          | (da Phase 1)    | —                         |
| lucide-react      | ServiceOverview icone | NO          | —               | SVG inline (come Phase 1) |
| Immagini cantieri | Hero + future sezioni | SI          | — file presenti | —                         |

**Dipendenze mancanti con fallback:**

- `lucide-react`: non installato. Se il planner preferisce non aggiungere dipendenze, sostituire con SVG inline (pattern già stabilito in `Header.tsx`). Raccomandazione: installare `lucide-react` ora — Phase 3, 4, 5 ne avranno comunque bisogno.

---

## Assumptions Log

| #   | Claim                                                                                                                           | Sezione              | Rischio se sbagliato                                                                                                                        |
| --- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | `"use client"` è necessario per MobileStickyBar anche senza stato React, perché `position:fixed` richiede rendering lato client | Pattern 3            | Se sbagliato: la sticky bar potrebbe funzionare come RSC — ma il rischio di hydration mismatch è reale. Basso costo mantenere "use client". |
| A2  | I numeri del master context (`70+`, `450+`, `35`, `3`) sono placeholder validati dal cliente                                    | content/homepage.ts  | Se sbagliato: i numeri errati danneggiano credibilità. Richiedere conferma al cliente prima del deploy.                                     |
| A3  | `residenze-universitarie-rovigo/01.jpg` è la migliore immagine hero disponibile                                                 | Immagini Disponibili | Se sbagliato: usare altra immagine della stessa serie (02/03/04) o casa-passiva-porto-viro                                                  |
| A4  | `text-h2` genera `font-size: clamp(1.625rem, ...)` anche sui `<dt>` nel TrustStrip                                              | TrustStrip pattern   | Se sbagliato: `text-h2` non è definito per elementi non-heading — testare con typecheck                                                     |

---

## Open Questions

1. **Numero di telefono reale**
   - Cosa sappiamo: `siteContent.contact.phone.display = "+39 0426 000 000"` è placeholder
   - Gap: La MobileStickyBar mostra questo numero — se il cliente non lo ha ancora fornito, la barra mostra un numero falso
   - Raccomandazione: Completare `content/site.ts` con dati reali prima del deploy in produzione (non blocca lo sviluppo)

2. **CTA label: "Richiedi un sopralluogo" vs "Richiedi un preventivo"**
   - `navigation.ts` usa `"Richiedi un preventivo"` per `primaryCta.label`
   - `ROADMAP.md` Phase 2 success criteria usa "Richiedi un sopralluogo"
   - `edilferro_website_master_context_claude.md` usa "Richiedi un preventivo"
   - **Raccomandazione:** Usare `primaryCta.label` da `navigation.ts` (fonte di verità) = "Richiedi un preventivo". Se si vuole "sopralluogo", cambiare in `navigation.ts` in modo centralizzato.

3. **typedRoutes e route placeholder**
   - Riabilitare `typedRoutes: true` richiede che tutte le route in `primaryNav` esistano come file `page.tsx`
   - Phase 2 deve creare stub per `/servizi`, `/progetti`, `/chi-siamo`, `/contatti`
   - I placeholder devono essere compilabili e non rompere `pnpm typecheck`

---

## Sources

### Primary (HIGH confidence)

- Codebase Phase 1 (tutti i file letti sopra) — design tokens, content pattern, Header/Footer structure, check scripts
- `public/edilferro_website_master_context_claude.md` — brand positioning, numeri aziendali, hero copy
- `content/site.ts` — siteContent (NAP, serviceArea, phone)
- `content/navigation.ts` — primaryCta label

### Secondary (MEDIUM confidence)

- [CITED: nextjs.org/docs/app/api-reference/components/image] — next/image fill, priority, sizes behavior
- [CITED: nextjs.org/docs/app/building-your-application/rendering/server-components] — RSC default, "use client" boundary

### Tertiary (LOW confidence)

- [ASSUMED] — MobileStickyBar `"use client"` necessario per position:fixed hydration stability

---

## Metadata

**Confidence breakdown:**

- Content module pattern: HIGH — codificato in Phase 1, replicato esattamente
- Hero next/image fill: HIGH — pattern ufficiale Next.js docs
- Trust strip: HIGH — RSC puro, zero dipendenze nuove
- Mobile sticky bar: MEDIUM — pattern comune, ma l'ipotesi su "use client" necessario non verificata via docs ufficiali
- Immagini disponibili: HIGH — audit diretto del filesystem

**Research date:** 2026-04-15
**Valid until:** 2026-07-15 (stack stabile, nessuna dipendenza nuova critica)
