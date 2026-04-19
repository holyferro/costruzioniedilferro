# Phase 3: Servizi - Context

**Gathered:** 2026-04-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Costruire la pagina `/servizi` — punto di atterraggio per i tre target (Privati, Enti Pubblici, Professionisti/Aziende) con segmentazione chiara, menzione esplicita delle categorie SOA per gli enti pubblici, sezione "Come lavoriamo" e CTA finale. La pagina deve essere un'estensione visiva coerente con la homepage, non un design separato.

**In scope:**

- Route `app/servizi/page.tsx` (RSC)
- Hero introduttivo con titolo e sottotitolo
- Sezione indice: 3 card target cliccabili (Privati / Enti Pubblici / Professionisti)
- 3 sezioni editoriali ancorabili (`#privati`, `#pubblico`, `#professionisti`) con foto + testo + bullet list servizi
- SOA esplicito (OG1/OG2/OG3) nella sezione Enti Pubblici
- Sezione "Come lavoriamo" — 4 step orizzontali (Analisi, Progettazione, Realizzazione, Consegna)
- CTA finale "Richiedi un sopralluogo" (riutilizzando `HomepageCta` o componente equivalente)
- Content module `content/services.ts` con tutto il testo della pagina

**Fuori scope per Phase 3:**

- Modifica del componente Header (dropdown nav su "Servizi" rimandato — richiede modifica header, tracciato come idea deferred)
- Pagine di dettaglio per-servizio (eventuale Phase futura)
- Form contatto (Phase 6)
- JSON-LD aggiuntivo (Phase 7)

</domain>

<decisions>
## Implementation Decisions

### Struttura e navigazione pagina

- **D-01:** La pagina inizia con un **hero introduttivo** centrato (titolo H1 serif + sottotitolo Inter) — non ricicla l'HeroSection della homepage. Tono: "Soluzioni edilizie per ogni esigenza" oppure "Costruiamo valore, per privati, imprese e istituzioni" (il planner sceglie quello più efficace nel contesto).
- **D-02:** Immediatamente sotto l'hero: **3 card target cliccabili** (Privati / Enti Pubblici / Professionisti) in layout 3 colonne desktop, stack verticale mobile. Le card fungono da indice visivo e portano alle rispettive sezioni via anchor. Ogni card: titolo target, sottotitolo descrittivo, bullet brevissimi, CTA freccia.
- **D-03:** Le 3 card devono essere la versione evoluta del pattern homepage — stesso visual language (bordi, radius, hover), non un nuovo stile. Hover coerente con ServiceOverview: stesso timing, stesso feedback visivo.
- **D-04:** Sotto le card: 3 **sezioni editoriali ancorabili** (`id="privati"`, `id="pubblico"`, `id="professionisti"`) in layout 2 colonne testo+foto alternato — pattern ServiceOverview homepage. Sfondo alternato panna/bianco tra sezioni.
- **D-05:** Nessuna sub-nav sticky tra le sezioni — la navigazione è affidata alle 3 card in alto + anchor in URL.

### Contenuto delle sezioni target

- **D-06:** Ogni sezione target ha: titolo H2, kicker categoria, body copy (3-5 righe), **bullet list** dei servizi specifici (non card dettaglio). Stesso pattern dei tag/bullet già usati in ServiceOverview homepage.
- **D-07:** Servizi per target (base di partenza per il content module — il cliente può affinare):
  - **Privati:** Nuove costruzioni antisismica, Ristrutturazioni chiavi in mano, Case passive NZEB, Direzione lavori interna
  - **Enti Pubblici:** Appalti pubblici SOA, Restauro conservativo, Scuole e strutture sanitarie, Urbanizzazioni
  - **Professionisti / Aziende:** General contractor, Capannoni e strutture industriali, Sedi direzionali, Manutenzione programmata
- **D-08 (CRITICO):** La sezione **Enti Pubblici** nomina esplicitamente le categorie SOA possedute: OG1 (Edifici civili e industriali), OG2 (Restauro e manutenzione), OG3 (Strade, autostrade, ponti). Devono essere visibili come elementi distinti (badge, lista evidenziata o tabella minimale) — non solo nel corpo testo. Questo è il differenziatore chiave di Phase 3.

### Sezione "Come lavoriamo"

- **D-09:** Sezione orizzontale con **4 step processuali**: Analisi → Progettazione → Realizzazione → Consegna. Ogni step: icona (Lucide, coerente con iconografia homepage), titolo breve, descrizione 1-2 righe.
- **D-10:** Stile: pulito, minimalista, spaziatura generosa. Nessuna animazione oltre CSS transitions. Mobile: stack verticale o scorrimento orizzontale discreto.

### Tone of voice e contenuto

- **D-11:** Tone of voice coerente con PROJECT.md: serio ma non freddo, concreto, istituzionale. Il testo delle card target usa titoli come quelli homepage ("Case che invecchiano bene", "Opere in cui la comunità investe", "Spazi che lavorano con te") — il content module stabilisce le stringhe definitive.
- **D-12:** Tutto il testo in `content/services.ts` — zero stringhe italiane hardcoded nei componenti.

### Componenti e architettura

- **D-13:** RSC di default per tutta la pagina — nessun client island necessario (le card sono link `<a>`, non richiedono JS).
- **D-14:** Il componente `HomepageCta` esistente in `components/sections/HomepageCta.tsx` viene riutilizzato per la CTA finale.
- **D-15:** Le foto delle sezioni editoriali attingono da `public/images/design/` (già in WebP). Il planner assegna le immagini più appropriate per target.
- **D-16:** `next/image` obbligatorio per tutte le immagini, con `sizes` responsive e `alt` descrittivo.

### Colori e design system

- **D-17:** Blu brand (#291572) usato come fill per CTA e highlight hover — mai come text color su panna adiacente a titoli scuri (regola D-06 da Phase 1).
- **D-18:** Sfondo sezioni: panna (`bg-panna`) e bianco (`bg-white`) alternati tra le 3 sezioni target, coerente con il ritmo visivo della homepage.

### Claude's Discretion

- Layout mobile delle 3 card target: il planner decide tra stack verticale puro o 2+1 su tablet.
- Animazione hover delle card: il planner mantiene coerenza con ServiceOverview (scale sull'immagine, transizione bordo) — nessuna animazione nuova.
- Posizione della sezione "Come lavoriamo": tra le sezioni target e la CTA finale, oppure subito dopo le card — il planner valuta il flow migliore.
- Icone Lucide per i 4 step: il planner seleziona quelle più appropriate (es. `ClipboardList`, `Ruler`, `HardHat`, `CheckCircle2`).

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Strategia e requisiti

- `.planning/PROJECT.md` — Visione, target, tone of voice, palette, compliance stack. Fonte canonica per qualsiasi scelta stilistica.
- `.planning/REQUIREMENTS.md` §SRV-01→SRV-05 — Requisiti vincolanti per Phase 3.
- `.planning/ROADMAP.md` §"Phase 3: Servizi" — Goal, success criteria, dipendenza da Phase 2.

### Design system e convenzioni

- `CLAUDE.md` — Design system rules, brand palette, CTA rules, code style, RSC-first pattern.
- `.planning/phases/01-fondamenta/01-CONTEXT.md` — Decisioni D-01→D-27 (token colore, tipografia, regola fill-only blu, RSC, content-layer-first). Tutte vincolanti per Phase 3.

### Componenti esistenti da analizzare prima di pianificare

- `components/sections/ServiceOverview.tsx` — Pattern editoriale di riferimento (2 colonne testo+foto alternato, dark bg, tag list). Phase 3 riusa o estende questa logica su sfondo panna.
- `components/sections/HomepageCta.tsx` — CTA finale da riutilizzare.
- `components/sections/FeaturedProjects.tsx` — Pattern layout alternato utile come riferimento.
- `content/homepage.ts` — Struttura content module di riferimento per `content/services.ts`.

### Immagini disponibili (già WebP)

- `public/images/design/img-residenziale.webp` — per sezione Privati
- `public/images/design/img-pubblico.webp` — per sezione Enti Pubblici
- `public/images/design/img-industriale.webp` — per sezione Professionisti/Aziende

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- `ServiceOverview` (`components/sections/ServiceOverview.tsx`) — Layout editoriale 2 colonne testo+foto alternato, già funzionante. Phase 3 può creare un componente simile per sfondo panna (anziché `bg-ink`) o parametrizzare il colore di sfondo.
- `HomepageCta` (`components/sections/HomepageCta.tsx`) — CTA finale riusabile direttamente.
- Pattern `Eyebrow` / `DarkEyebrow` — già estratto come funzione interna in ServiceOverview, replicabile.
- Immagini design in WebP già disponibili e dimensionate correttamente.

### Established Patterns

- **RSC-first:** tutta la pagina è Server Component — nessun `"use client"`.
- **Content-layer:** tutto il testo viene da `content/services.ts`, stessa struttura di `content/homepage.ts`.
- **`next/image` con `fill` + `sizes`:** pattern già consolidato in ServiceOverview e FeaturedProjects.
- **Tailwind per spaziatura e ritmo:** `py-20 md:py-28`, `gap-10 md:gap-16`, `max-w-6xl px-6 md:px-12`.
- **Tipografia:** `font-serif` solo per H1 pagina e titoli sezione editoriale; Inter per body, tag, CTA label.

### Integration Points

- `app/servizi/page.tsx` — già esiste come stub vuoto (creato in Phase 2). Da popolare.
- `app/layout.tsx` — header e footer già presenti, non da modificare.
- `components/layout/Header.tsx` — NON modificare in questa fase.

</code_context>

<specifics>
## Specific Ideas

### Brief utente (input diretto — priorità alta)

L'utente ha fornito un PRD dettagliato durante la discussione. Decisioni chiave estratte:

- Le 3 card target devono essere **fully clickable** (tutta la card è un link anchor).
- Le interazioni hover devono replicare esattamente quelle dell'homepage — stessa animazione, stesso timing.
- La sezione "Come lavoriamo" vuole **icone** coerenti con lo stile homepage (Lucide).
- CTA finale: titolo "Hai un progetto? Parliamone." + bottone "Richiedi preventivo" (variante testuale rispetto alla CTA globale "Richiedi un sopralluogo" — il planner può uniformare al testo globale se preferisce, ma deve documentarlo).
- Tono generale: "premium construction brand", non generic stock.

### Sezione preview servizi (dal brief)

Sotto le 3 card principali, prima delle sezioni editoriali dettagliate, il brief suggeriva una **sezione preview leggera** (visivamente secondaria) con bullet per categoria. Il planner valuta se questo livello di dettaglio si sovrappone alle sezioni editoriali sotto — se sì, può incorporarlo nelle card stesse o eliminare la ridondanza.

</specifics>

<deferred>
## Deferred Ideas

- **Dropdown nav "Servizi" nell'header** — l'utente lo ha menzionato nel brief ma ha esplicitamente scritto "DO NOT modify header". Richiede modifica di `Header.tsx`. Rimandato a una phase futura o micro-task dedicato. Il link "Servizi" nell'header punta a `/servizi` senza dropdown per ora.
- **Pagine di dettaglio per-servizio** (es. `/servizi/ristrutturazioni`) — non in scope Phase 3. Eventuale aggiunta futura.
- **Testimonianze per target** — v2 requirement (V2-DF-05 in REQUIREMENTS.md).

</deferred>

---

_Phase: 03-servizi_
_Context gathered: 2026-04-19_
