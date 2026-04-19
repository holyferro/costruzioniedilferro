# Phase 3: Servizi - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-19
**Phase:** 03-servizi
**Areas discussed:** Navigazione interna, Layout sezioni target, Dettaglio servizi

---

## Navigazione interna

| Option                 | Description                                                                   | Selected |
| ---------------------- | ----------------------------------------------------------------------------- | -------- |
| Sub-nav sticky         | Barra orizzontale con 3 target sticky sotto header, aggiornata durante scroll |          |
| Scroll lineare         | Nessuna nav interna, solo anchor in URL                                       |          |
| Hero con 3 card target | Card cliccabili nella parte alta come indice visivo                           | ✓        |

**User's choice:** Hero con 3 card target
**Notes:** Le card fungono da indice visivo e portano alle sezioni via anchor. Visivamente più d'impatto e orientativo per il visitatore.

---

## Layout sezioni target

| Option               | Description                                                             | Selected |
| -------------------- | ----------------------------------------------------------------------- | -------- |
| Editoriale con foto  | 2 colonne testo+foto alternato, stesso pattern ServiceOverview homepage | ✓        |
| Full-width testuale  | Sezioni ampie su panna, nessuna immagine, stile documento               |          |
| Accordion per target | Pannelli espandibili, richiede client island                            |          |

**User's choice:** Editoriale con foto (Raccomandato)
**Notes:** Coerenza con la homepage prioritaria. Il componente ServiceOverview esiste già e il pattern è consolidato.

---

## Dettaglio servizi

| Option            | Description                                             | Selected |
| ----------------- | ------------------------------------------------------- | -------- |
| Tag / bullet list | Lista breve di voci, stesso pattern homepage            | ✓        |
| Card servizio     | Ogni servizio con titolo + corpo breve in card separata |          |

**User's choice:** Tag / bullet list (come homepage)
**Notes:** Chiarimento importante emerso: ogni target ha servizi diversi, non esiste una lista comune delle "4 tipologie" da distribuire — i servizi vivono naturalmente dentro ogni sezione target.

---

## Input aggiuntivo (PRD utente)

L'utente ha fornito un brief dettagliato come input "Other" che ha integrato le decisioni di discussione:

- **Hero** centrato con titolo e sottotitolo
- **3 card fully clickable** con hover coerente con homepage
- **Sezione "Come lavoriamo"** con 4 step (Analisi, Progettazione, Realizzazione, Consegna) + icone Lucide
- **CTA finale** "Hai un progetto? Parliamone." + "Richiedi preventivo"
- **SOA esplicito** (OG1/OG2/OG3) nella sezione Enti Pubblici
- Menzione dropdown header → differita (conflitto con vincolo "DO NOT modify header")

---

## Claude's Discretion

- Layout mobile delle 3 card (stack vs 2+1)
- Posizione sezione "Come lavoriamo" nel flow della pagina
- Icone Lucide specifiche per i 4 step
- Valutazione sovrapposizione tra "preview section" e sezioni editoriali

## Deferred Ideas

- Dropdown nav "Servizi" nell'header (conflitto con vincolo di non modificare l'header)
- Pagine di dettaglio per-servizio (/servizi/ristrutturazioni, ecc.)
- Testimonianze per target (v2)
