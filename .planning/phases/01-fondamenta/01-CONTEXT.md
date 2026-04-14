# Phase 1: Fondamenta - Context

**Gathered:** 2026-04-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffoldare il progetto Next.js 16, definire il design system (token colori + tipografia), costruire il layout globale (header single-row sticky + footer 4 colonne), stabilire il modello di contenuto in moduli TypeScript sotto `content/`, e lockare la compliance strutturale (zero GA4, zero tracking terzo, footer legale D.Lgs. 70/2003 su ogni route, Vercel Analytics cookieless).

Al termine della fase:
- `pnpm dev` e `pnpm build` funzionano su Next.js 16 / React 19 / TS strict / Tailwind v4
- Ogni route visitata mostra header con CTA "Richiedi un sopralluogo" e footer istituzionale
- I token colore brand sono definiti in `globals.css` via `@theme` Tailwind v4 e superano WCAG AA 4.5:1
- Pagina 404 personalizzata raggiungibile
- Nessuna pagina successiva può introdurre GA4, Google Maps iframe, cookie banner o NAP incoerente — la compliance è impedita strutturalmente, non per convenzione

**Fuori scope per Phase 1** (appartengono a fasi successive):
- Contenuto Homepage, Servizi, Progetti, Chi siamo, Contatti (Phase 2–6)
- Form "Richiedi un sopralluogo" completo (Phase 6)
- JSON-LD `GeneralContractor` finale, sitemap, robots (Phase 7)
- Mappa statica e pagina contatti reale (Phase 6)
- Dati progetti reali e foto cantiere (Phase 4, bloccato da cliente)

</domain>

<decisions>
## Implementation Decisions

### Token colore brand

- **D-01:** Grigio scuro (titoli, testi, UI strutturale) = **`#1A1A1A`** ("Nero morbido"). Usato come `color.ink` o `brand.ink`. Nessun sottotono — pure dark non-blu.
- **D-02:** Panna (background dominante) = **`#F8F5EE`** o valore molto vicino (target warm off-white, NON bianco puro, NON avorio clinico). Usato come `color.panna` / default `bg-background`. Trasmette identità "45 anni di storia".
- **D-03:** Blu brand (CTA, accent, dettagli) = **`#291572`** — preso direttamente dal logo. Indaco profondo. Token `brand.primary`. È un lock-in del cliente, non una scelta arbitraria.
- **D-04:** Sistema di token **minimal**: solo 3 colori brand + neutri base (border grigi, bianco card, success/error per form). Nessuna scala di grigio 50→900. Nessun accent color secondario. Ogni nuova esigenza di colore durante le fasi successive richiede giustificazione.
- **D-05:** **Contrasto WCAG verificato**:
  - `#1A1A1A` su `#F8F5EE` ≈ 17:1 (AAA)
  - `#291572` su `#F8F5EE` ≈ 12:1 (AAA)
  - `#F8F5EE` su `#291572` ≈ 12:1 (AAA, testo chiaro su CTA fill)
  - Tutti superano FND-02 requirement (4.5:1 AA).
- **D-06 (CRITICO):** `#291572` e `#1A1A1A` hanno luminanza troppo simile per essere usati entrambi come *text color* sullo stesso sfondo (si confonderebbero). **Regola sistemica**: il blu brand va usato come **fill** (bottoni pieni con testo panna), NON come text color adiacente a titoli neri. Se serve evidenziare un link inline usare underline o peso, non il colore blu. Questa regola è vincolante per tutte le fasi 2–7.

### Tipografia

- **D-07:** **Pairing serif+sans confermato**: IBM Plex Serif + Inter, entrambi via `next/font` self-hosted (zero Google Fonts runtime, zero GDPR exposure).
- **D-08:** **Uso del serif limitato**: IBM Plex Serif solo su (a) titolo hero della homepage e (b) H1 di ogni pagina interna. Tutti gli altri heading (H2, H3, H4) sono Inter. Body, UI, navigation, form, CTA labels: Inter.
- **D-09:** **Inter pesi**: 400 (regular, body), 500 (medium, UI e nav), 600 (semibold, H2/H3/CTA). Niente 700 bold. Serif si prende il compito di peso istituzionale.
- **D-10:** **Scala tipografica**: base body 17px (più generoso del default, coerente con siti istituzionali 2026, migliore leggibilità mobile), scale modulare 1.25 (major third).
- **D-11:** **Fluid typography**: H1 e H2 usano `clamp()` per transizione fluida mobile→desktop (no breakpoint visibili al resize). Body, UI, form labels usano classi Tailwind discrete (`text-base`, `text-lg`). Il planner dovrà definire i valori `clamp()` esatti (minimo mobile, preferito viewport-based, massimo desktop).
- **D-12:** IBM Plex Serif carica solo il peso necessario — probabilmente 500 o 600 per hero. Inter carica 400/500/600. Zero weights caricati non usati.

### Layout globale (header + footer)

- **D-13:** **Header desktop single-row** `[logo | nav | CTA "Richiedi un sopralluogo"]`. Niente top bar con tel/email. Massima pulizia visiva.
- **D-14:** **Telefono non visibile su desktop header**. Sta solo nel footer e nella pagina `/contatti`. Su **mobile** l'header include click-to-call come richiesto da HOM-05 — probabilmente come icona accanto all'hamburger.
- **D-15:** **Header sticky**: il header single-row resta fisso durante lo scroll su tutte le pagine. Garantisce accesso costante a CTA primaria + nav. Su mobile stesso comportamento (con attenzione a spazio verticale).
- **D-16:** **Footer 4 colonne tematiche** (desktop), stack verticale su mobile:
  1. **Identità**: logo, ragione sociale completa, area di servizio (Mestre, Venezia, provincia, Veneto)
  2. **Sezioni**: link Home / Servizi / Progetti / Chi siamo / Contatti / Privacy / Cookie policy
  3. **Contatti**: telefono, email, PEC, orari di apertura
  4. **Legal + certificazioni**: P.IVA, REA, capitale sociale, sede legale; badge SOA e ISO (placeholder grafici in Phase 1, immagini reali in Phase 5)
- **D-17:** Il footer è un **Server Component** — zero JS client, reso identico su ogni route. Contenuto letto da `content/site.ts` + `content/legal.ts`.

### Dati legali / NAP strategy

- **D-18:** **Placeholder realistici + TODO esplicito** per tutti i campi legali e NAP in `content/site.ts` e `content/legal.ts`. Ogni campo non ancora ricevuto dal cliente è marcato con commento TS inline `// TODO cliente: valore reale` E un valore plausibile (es. "00000000000" per P.IVA, "Via [indirizzo] — Mestre (VE)" per sede). Il footer renderizza il valore placeholder senza warning. Phase 1 si chiude completamente senza bloccare.
- **D-19:** Quando il cliente consegna i dati reali: sostituzione in un **commit dedicato** separato dalle fasi di sviluppo. Non è lavoro di Phase 1 — è un micro-task ricorrente che può avvenire in qualsiasi momento tra Phase 1 e Phase 7.
- **D-20:** Lista campi da richiedere al cliente (lock-in — il planner deve includerla come deliverable di Phase 1 tracciato):
  - Ragione sociale completa
  - P.IVA
  - Codice fiscale (se diverso)
  - REA + camera di commercio
  - Capitale sociale (dichiarato / versato)
  - Sede legale (via, CAP, comune, provincia)
  - Sede operativa (se diversa)
  - Telefono centralino
  - Email commerciale
  - PEC
  - Orari apertura uffici
  - Categorie SOA possedute + scadenza attestazione
  - Estremi certificato ISO + ente certificatore

### Compliance strutturale (già decisa da PROJECT.md, riaffermata qui)

- **D-21:** **Analytics**: `@vercel/analytics` + `@vercel/speed-insights` in `app/layout.tsx`. Zero script Google, zero gtag, zero googletagmanager. Grep contro `gtag|_ga|googletagmanager` deve dare zero risultati (il planner può aggiungere un check lint o CI).
- **D-22:** **Font loading**: esclusivamente `next/font/google` con subset `latin`. Zero `<link href="fonts.googleapis.com">`. Zero font CDN terzi.
- **D-23:** **Nessun cookie banner in Phase 1**: lo stack è cookieless per design. `docs/gdpr.md` documenterà perché (per Phase 7 quando scriveremo privacy/cookie policy complete).
- **D-24:** **Nessuna dipendenza di animazione**: solo CSS transitions + utility Tailwind `transition-*` / `animate-*`. Niente framer-motion, niente motion. Se Phase 2 o successive chiedono animazione più ricca, serve giustificazione esplicita nel PLAN.md di quella fase.

### Client deliverables Phase 1 (non-coding)

Phase 1 avvia tre catene di comunicazione cliente con lead time lungo che sbloccano fasi successive. Non sono task di codice ma sono **deliverable della fase** — Phase 1 non è "complete" finché non sono stati avviati formalmente.

- **D-25:** **Email/task "Fotografia cantieri/team/mezzi"** → sblocca Phase 4 (Portfolio) e Phase 5 (mezzi + team photo). Richiedere commitment su tempi e almeno 10 set fotografici prima della chiusura di Phase 1. Il planner tratta questa come task di Phase 1 con owner = umano.
- **D-26:** **Email/task "PDF attestazioni SOA + ISO"** → sblocca Phase 5. Richiedere copie aggiornate.
- **D-27:** **Email/task "Configurazione DNS Resend + Cloudflare Turnstile keys"** → sblocca Phase 6. Richiede accesso al provider DNS del dominio produzione. Avviare early perché può richiedere settimane se gestito da fornitore terzo. Creare account Cloudflare e generare Turnstile site+secret keys.

### Claude's Discretion

Aree non discusse esplicitamente — il planner/executor può decidere seguendo principi di CLAUDE.md e PROJECT.md:

- **Shadcn/ui adoption timing**: partire senza, reach out a `pnpm dlx shadcn@latest add button input label` solo quando la prima UI primitive complessa lo richiede (probabilmente Phase 2 per CTA/Button, Phase 6 per form). Non inserire shadcn in Phase 1 se non serve.
- **Struttura `content/` files**: Phase 1 scaffolda almeno `content/site.ts` (NAP + brand), `content/legal.ts` (P.IVA/REA/etc), `content/navigation.ts` (link header/footer). `content/services.ts`, `content/projects.ts`, `content/areas.ts` vengono creati nelle rispettive fasi quando il planner li ritiene necessari. Non creare file vuoti in Phase 1.
- **404 personalizzata (FND-10)**: stile minimale, composto da titolo grande serif ("Pagina non trovata"), body breve, due CTA ("Torna alla home", "Contattaci"), coerente con layout globale. Niente illustrazioni decorative, niente foto. Se il planner ritiene che un'altra direzione sia migliore, deve documentarla.
- **Section background rhythm**: panna dominante con sezioni occasionali in bianco puro o grigio molto chiaro per spezzare il ritmo. Il planner lo definisce durante la costruzione del primo componente `<Section>` in `components/ui/` o `components/layout/`.
- **Helper `lib/seo/metadata.ts` shape (FND-09)**: signature e tipi sono a discrezione del planner, ma l'helper deve minimum produrre `Metadata` Next.js 16 con `title` template, `description`, `openGraph` base, `twitter` base, `canonical` URL, `metadataBase`. Integrazione JSON-LD è Phase 7, non ora.
- **ESLint flat config + Prettier + husky + lint-staged**: setup seguendo best practice 2026 documentate in PROJECT.md. Niente `next lint` (rimosso in Next 16), usare `eslint` direttamente con `eslint-config-next` + `eslint-plugin-jsx-a11y`.
- **`noUncheckedIndexedAccess: true`** in `tsconfig.json` — raccomandato da PROJECT.md, il planner lo attiva.

### Folded Todos

Nessun todo in backlog al momento di questa discussione. Sezione omessa nelle risorse attive.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner) MUST read these prima di ricerca/pianificazione.**

### Strategia e requisiti progetto

- `.planning/PROJECT.md` — Visione, missione, target, trust signals, CTA primaria, tone of voice, palette e identità visiva, stack lock-in validato, decisioni architetturali, alternative scartate, cost profile. **È la fonte canonica** per qualsiasi scelta di stack o compliance — questa fase eredita tutte le sue decisioni.
- `.planning/REQUIREMENTS.md` — Lista completa FND-01→FND-10 (Phase 1) + requirements out-of-scope per Phase 1 ma necessari per il Traceability check. Include sezione "Out of Scope" vincolante: GA4/reCAPTCHA/iframe Maps/cookie banner vietati.
- `.planning/ROADMAP.md` §"Phase 1: Fondamenta" — Goal, success criteria, blocker per Phase 4/5/6 che devono essere avviati qui.
- `.planning/STATE.md` — Decisioni recenti registrate + blocker tracciati (foto Phase 4, SOA/ISO Phase 5, Resend DNS Phase 6).

### Convenzioni di codebase e regole di stile

- `CLAUDE.md` (root del progetto) — Project context, stack, frontend architecture (RSC default, client solo se interagisce), design system rules, brand palette direzionale, typography rules, CTA rules, assets rules, performance rules, code style, deployment workflow, commands, safety rules. Deve essere letto da planner ed executor prima di generare codice.

### Sorgenti esterne canoniche (da PROJECT.md, da consultare in ricerca/planning)

- [Next.js 16 release notes](https://nextjs.org/blog/next-16) — riferimento per Turbopack default, rimozione `next lint`, React 19.2 channel.
- [Next.js Upgrading to v16 guide](https://nextjs.org/docs/app/guides/upgrading/version-16) — check che il nostro scaffold sia conforme.
- [Next.js Forms guide](https://nextjs.org/docs/app/guides/forms) — per Phase 6, ma il planner di Phase 1 deve sapere che l'architettura lo prevede (Server Actions non bloccate da middleware globali).
- [Tailwind CSS v4 release](https://tailwindcss.com/blog/tailwindcss-v4) — per il pattern `@theme` in `globals.css` invece di `tailwind.config.js`.
- [shadcn/ui Tailwind v4 guide](https://ui.shadcn.com/docs/tailwind-v4) — se/quando si adotta shadcn (non in Phase 1 ma il planner deve sapere che la strategia è compatibile).
- [Next.js `next/font` docs](https://nextjs.org/docs/app/getting-started/fonts) — pattern corretto per Inter + IBM Plex Serif self-hosted.
- [Vercel Analytics — Privacy & Compliance](https://vercel.com/docs/analytics/privacy-policy) — conferma no cookie banner richiesto per questo stack.

Nessun ADR locale esistente da referenziare. Tutti i documenti di decisione sono consolidati in PROJECT.md / REQUIREMENTS.md / ROADMAP.md.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

**Nessuno.** Questa è una fase greenfield. Le directory `app/`, `components/`, `public/` esistono ma sono **vuote**. Phase 1 crea tutto da zero.

### Established Patterns

Nessun pattern pre-esistente nel codebase. Le convenzioni saranno stabilite dalla fine di questa fase e diventeranno vincolanti per le fasi 2–7. Il planner deve prestare particolare attenzione a:

- **Component hierarchy** (FND-03): `components/ui`, `components/sections`, `components/business`, `components/layout` devono essere create come directory, anche se alcune restano quasi vuote a fine Phase 1. La gerarchia è parte del contratto di questa fase.
- **Content-layer-first**: tutto il testo hardcoded dev'essere consultato da `content/*.ts` files, anche per l'header/footer/404 di Phase 1. Mai stringhe italiane hardcoded nei componenti.
- **RSC by default**: ogni componente è Server Component a meno che non ci sia un'interazione client reale (sticky CTA mobile in Phase 2 sarà il primo client island legittimo — in Phase 1 non ci sono client islands necessarie).

### Integration Points

Quando le fasi successive costruiscono le loro pagine, troveranno:

- `app/layout.tsx` — include `<Header />`, `<Footer />`, fonts via `next/font`, `<Analytics />`, `<SpeedInsights />`, metadata base. Le pagine successive (Home, Servizi, Progetti, Chi siamo, Contatti) si appoggiano tutte a questo layout senza modificarlo.
- `app/globals.css` — contiene `@theme` Tailwind v4 con token `--color-ink`, `--color-panna`, `--color-brand`, etc. Le fasi successive usano classi Tailwind (`bg-panna`, `text-ink`, `bg-brand`) senza ridefinire i valori.
- `content/site.ts` e `content/legal.ts` — importati dal footer (Phase 1), dai componenti contatti (Phase 6), dal JSON-LD (Phase 7).
- `lib/seo/metadata.ts` — helper riusato da ogni `generateMetadata` nelle fasi successive.
- `components/layout/Header.tsx` + `components/layout/Footer.tsx` — invariati dopo Phase 1 a meno di ridisegno esplicito.
- `components/ui/Button.tsx` (o equivalente) — usato da tutte le CTA a partire da Phase 2. Questo va creato in Phase 1 come parte del design system (il planner decide quando — probabilmente incluso nel wave "design system").

</code_context>

<specifics>
## Specific Ideas

### Blu brand — lock-in preciso dal logo
Il cliente ha fornito `#291572` come valore esatto preso dal logo. Questo NON è negoziabile né "da confermare". È il valore che entra nel token. L'indaco profondo definisce l'identità — cambia il tono rispetto al "navy blu" generico: è più caldo, più distintivo, più personale del brand.

### Regola sistemica critica: fill-only per il blu brand
Poiché `#291572` ha luminanza simile a `#1A1A1A`, il blu NON va mai usato come text color su panna vicino a titoli neri. Usare solo come:
- Background di bottoni pieni (testo panna dentro)
- Background di sezioni evidenziate (testo panna dentro)
- Bordo spesso decorativo (mai linea sottile, si perde)
- Icone decorative grandi

Questa regola è vincolante per tutte le fasi successive. Il planner la aggiunge a eventuali CLAUDE.md o design-system doc.

### Identità "45 anni di storia"
Il pairing serif (IBM Plex Serif su hero/H1) + panna calda (`#F8F5EE`) è stato scelto specificamente per trasmettere storia e territorio, distinguendo l'impresa dai concorrenti che usano template startup freddi. Durante il planning, evitare ogni pattern visuale che suggerisca "tech startup" o "SaaS" — niente gradient ampi, niente blur, niente glassmorphism, niente "big number animate", niente pill badges colorati decorativi.

### Pura pulizia desktop, pragmatismo mobile
La scelta del header single-row senza tel su desktop è una dichiarazione: su desktop il sito è minimal e sobrio. Su mobile invece pragmatismo vince — click-to-call visibile è un requirement commerciale non negoziabile (HOM-05). Il planner deve riconoscere questa asimmetria e NON propagarla: su mobile il header può avere elementi diversi dal desktop, va benissimo.

</specifics>

<deferred>
## Deferred Ideas

Idee emerse o considerate che non fanno parte di Phase 1 e vengono tracciate per il roadmap backlog futuro.

- **Accent color secondario** (es. ocra/ruggine per dettagli) — scartato per Phase 1. Se durante Phase 2–5 emerge che 3 colori sono restrittivi, rivalutare con un mini-decision prima di aggiungerlo. Default: resta a 3.
- **Scala di grigio 50→900 completa** — scartata per MVP. Se un componente in Phase 6 (form) richiede 5+ toni di grigio, si riapre la discussione allora.
- **Adozione shadcn/ui** — non in Phase 1. Rimandata alla prima esigenza reale (probabilmente Phase 2 per Button o Phase 6 per form primitives).
- **Dark mode** — non richiesto, non nel roadmap, non in scope. Il design system è single-theme (light). Nessun preparativo CSS per dark mode in Phase 1 (niente `dark:` class predisposte, niente variabili CSS duplicate).
- **Animazioni ricche** (framer-motion / motion) — escluse per MVP. Vedi Out of Scope in REQUIREMENTS.md.
- **CMS (Payload)** — v2 futuro, vedi REQUIREMENTS.md §v2.
- **Versione bilingue IT/EN** — v2 futuro.
- **Pagina dedicata certificazioni SOA standalone** — Phase 5 avrà una sezione, non una pagina dedicata. Se il cliente la richiederà, sarà un insert decimale tra Phase 5 e Phase 6.

### Reviewed Todos (not folded)
Nessun todo recuperato — il todo-match ha restituito 0 risultati.

</deferred>

---

*Phase: 01-fondamenta*
*Context gathered: 2026-04-14*
