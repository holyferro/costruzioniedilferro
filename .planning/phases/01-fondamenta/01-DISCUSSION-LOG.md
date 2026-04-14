# Phase 1: Fondamenta - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-14
**Phase:** 01-fondamenta
**Areas discussed:** Token colore brand (hex), Anatomia header + footer, Tipografia (scale + pairing)

---

## Gray area selection

| Area | Description | Selected |
|------|-------------|----------|
| Token colore brand (hex) | Valori hex esatti per grigio scuro / panna / blu brand, contrasto WCAG AA | ✓ |
| Anatomia header + footer | Header struttura, telefono desktop, footer colonne, sticky behaviour | ✓ |
| Tipografia: scale + pairing | Dove usare IBM Plex Serif, pesi Inter, base size, fluid vs discrete | ✓ |
| Dati legali + NAP reali | Disponibilità dati P.IVA/REA/capitale/NAP per FND-05/FND-06 | (chiarito separatamente dopo le 3 aree) |

---

## Area 1 — Token colore brand

### Question: Grigio scuro (titoli, testi, UI strutturale) — che tono preferisci?

| Option | Description | Selected |
|--------|-------------|----------|
| Carbone istituzionale (Recommended) | #0F172A / #111827 — autorevole, sfuma verso il blu, standard istituzionale | |
| Grigio blu scuro | #1E2A3A / #1C2B3A — dialoga con il blu brand, più elegante | |
| Nero morbido | #1A1A1A — pure dark, vibe artigianale/materico | ✓ |

**User's choice:** Nero morbido `#1A1A1A`
**Notes:** Nero senza sottotoni, sceglie il tono più neutro e non si vincola a un sottotono blu.

### Question: Panna/off-white (background dominante) — quanto caldo?

| Option | Description | Selected |
|--------|-------------|----------|
| Panna caldo leggero (Recommended) | #F8F5EE / #FAF7F1 — trasmette "storia e territorio" | ✓ |
| Avorio quasi-bianco | #FBFAF6 — hint minimo di calore, asciutto | |
| Bianco puro + panna accent | #FFFFFF base + panna solo in sezioni alternate | |

**User's choice:** Panna caldo leggero
**Notes:** Scelta "recommended" — allineata all'identità 45 anni.

### Question: Blu brand (CTA + dettagli) — che carattere?

| Option | Description | Selected |
|--------|-------------|----------|
| Navy profondo (Recommended) | #0E3A6B / #1B3B6B — istituzionale, "cantieri pubblici" | |
| Royal blu saturo | #1E40AF (Tailwind blue-800) — contemporaneo | |
| Blu petrolio | #0B4A5B / #134E5E — engineering vibe | |
| Other (free text) | `#291572` dal logo | ✓ |

**User's choice:** `#291572` — valore esatto preso dal logo aziendale
**Notes:** Override importante — l'utente ha un lock-in visivo dal logo. Il valore non è negoziabile e definisce il tone indaco profondo del brand. Richiederà una regola sistemica perché luminanza vicina al nero titoli.

### Question: Quanto ricco deve essere il sistema di token — solo brand o anche scale?

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal: 3 brand + neutri base (Recommended) | 3 brand + border grigi + success/error | ✓ |
| Brand + scala di grigio completa | 3 brand + scala 50→900 | |
| Brand + accent color secondario | 3 brand + ocra/ruggine | |

**User's choice:** Minimal
**Notes:** Coerente con il brief "minimalista, istituzionale". Disciplina design system.

---

## Area 2 — Anatomia header + footer

### Question: Struttura header desktop — quale formato?

| Option | Description | Selected |
|--------|-------------|----------|
| Two-row: top bar + nav (Recommended) | Top bar con tel/orari/email + nav principale sotto | |
| Single row minimale | Una sola riga logo/nav/CTA | ✓ |
| Single row + tel evidenziato | Compromesso tel accanto a CTA | |

**User's choice:** Single row minimale
**Notes:** Scelta contraria al recommended — preferisce pulizia visiva, accetta che tel stia solo nel footer e /contatti su desktop.

### Question: Telefono su desktop — dove deve essere visibile?

| Option | Description | Selected |
|--------|-------------|----------|
| Top bar + footer (Recommended) | Sempre visibile nella top bar | |
| Solo footer + pagina contatti | Niente tel nell'header desktop | ✓ |
| Header desktop accanto a CTA | Tel affiancato alla CTA | |

**User's choice:** Solo footer + pagina contatti
**Notes:** Coerente con la scelta header single-row minimale. Su mobile resta comunque click-to-call come richiesto da HOM-05.

### Question: Footer istituzionale — quale struttura?

| Option | Description | Selected |
|--------|-------------|----------|
| 4 colonne tematiche (Recommended) | Identità / Nav / Contatti / Legal+certs | ✓ |
| 3 colonne denser | NAP / Nav+contatti / Legal | |
| Footer full-width stratificato | Blocchi orizzontali | |

**User's choice:** 4 colonne tematiche
**Notes:** Standard istituzionale. Maximum scannability.

### Question: Header sticky — comportamento su scroll?

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky solo nav principale (Recommended) | Top bar sparisce, nav resta sticky | ✓ |
| Tutto sticky | Top bar + nav fissi | |
| Statico non sticky | Header solo in cima | |

**User's choice:** Sticky solo nav principale
**Notes:** Essendo un header single-row, "sticky solo nav" significa l'intero header resta fisso (non c'è top bar da nascondere). Coerente.

---

## Area 3 — Tipografia: scale + pairing

### Question: Dove usare IBM Plex Serif rispetto a Inter?

| Option | Description | Selected |
|--------|-------------|----------|
| Hero + H1 di pagina (Recommended) | Serif su hero e H1, Inter per il resto | ✓ |
| Solo hero homepage | Serif solo hero, Inter su tutti gli H | |
| Tutti i titoli (H1+H2+H3) | Serif su tutti i titoli | |

**User's choice:** Hero + H1 di pagina
**Notes:** Pairing bilanciato. Serif dà peso istituzionale dove serve, Inter mantiene UI pulita.

### Question: Quali pesi di Inter caricare?

| Option | Description | Selected |
|--------|-------------|----------|
| 400 / 500 / 600 (Recommended) | Regular + medium + semibold | ✓ |
| 400 / 600 / 700 | Regular + semibold + bold | |
| 400 / 500 / 600 / 700 | Tutti e quattro | |

**User's choice:** 400 / 500 / 600
**Notes:** Nessun 700 — coerente con minimalismo. Il serif fa il "peso" dove serve.

### Question: Dimensione base del body e scala tipografica?

| Option | Description | Selected |
|--------|-------------|----------|
| 17px base, scale 1.25 (Recommended) | Generoso, leggibile mobile, istituzionale | ✓ |
| 16px base, scale 1.25 | Standard rigido | |
| 18px base, scale 1.2 | Editorial, body molto generoso | |

**User's choice:** 17px base, scale 1.25
**Notes:** Allineato al recommended. Coerente con target istituzionale 2026.

### Question: Tipografia fluida (clamp) o step discreti?

| Option | Description | Selected |
|--------|-------------|----------|
| Fluid titoli, discrete body (Recommended) | clamp() per titoli, classi Tailwind per body | ✓ |
| Tutto fluid | Ogni elemento con clamp() | |
| Tutto discrete (Tailwind classi) | text-sm/base/lg/xl su breakpoint | |

**User's choice:** Fluid titoli, discrete body
**Notes:** Elimina salti sui titoli durante resize, mantiene prevedibilità e cache sul body.

---

## Wrap-up — Dati legali / NAP

### Question: Dati legali/NAP — come li gestiamo in Phase 1?

| Option | Description | Selected |
|--------|-------------|----------|
| Ho i dati reali, li passo ora | Dati veri inseriti durante execution | |
| Placeholder realistici + TODO (Recommended) | Placeholder marcati, sostituzione in commit dedicato | ✓ |
| Blocco Phase 1 finché non ho i dati | Attendere dati prima di scrivere footer | |

**User's choice:** Placeholder realistici + TODO
**Notes:** Phase 1 non si blocca. I dati veri entrano quando il cliente li fornisce, in commit separato.

### Question: Pronto a scrivere CONTEXT.md o esplorare altre gray area?

| Option | Description | Selected |
|--------|-------------|----------|
| Scrivi CONTEXT.md (Recommended) | 3 aree prioritarie coperte, resto a discretion | ✓ |
| Esplora più gray area | Rivedi struttura content/, shadcn, 404, section rhythm | |

**User's choice:** Scrivi CONTEXT.md
**Notes:** Delega al planner/Claude le decisioni residue, documentate in CONTEXT.md → Claude's Discretion.

---

## Claude's Discretion

Capturate in CONTEXT.md § Claude's Discretion. Riassunto:
- Timing adozione shadcn/ui (non in Phase 1, reach quando serve)
- Struttura file `content/` (scaffoldare solo site.ts, legal.ts, navigation.ts in Phase 1)
- Stile 404 (serif titolo + 2 CTA, no illustrazioni)
- Section background rhythm
- Signature di `lib/seo/metadata.ts`
- ESLint flat config details, `noUncheckedIndexedAccess`

## Deferred Ideas

Capturate in CONTEXT.md § Deferred Ideas. Riassunto:
- Accent color secondario (scartato per MVP)
- Scala grigio 50→900 (scartata, rivalutare a Phase 6)
- shadcn/ui adoption in Phase 1 (rimandata)
- Dark mode (fuori scope, mai in v1)
- Animazioni ricche / framer-motion (escluse, vedi REQUIREMENTS Out of Scope)
- CMS Payload (v2)
- Bilingue IT/EN (v2)
- Pagina dedicata certificazioni standalone (possibile insert decimale dopo Phase 5)
