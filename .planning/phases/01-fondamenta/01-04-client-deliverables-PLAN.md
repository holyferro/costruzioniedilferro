---
phase: 01-fondamenta
plan: 04
type: deliverable
wave: 2
depends_on: []
files_modified:
  - .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
autonomous: false
owner: human
requirements: []
must_haves:
  truths:
    - "Email D-25 (Fotografia cantieri/team/mezzi) è stata inviata al cliente e l'acknowledgment è stato ricevuto; data di invio + data di acknowledgment registrate nel tracking file"
    - "Email D-26 (PDF attestazioni SOA + ISO) è stata inviata e l'acknowledgment è stato ricevuto; date registrate nel tracking file"
    - "Account Resend creato, dominio di produzione aggiunto via dashboard, record DNS (SPF/DKIM/DMARC) incollati nel DNS provider, polling di verifica Resend avviato — timestamp registrato nel tracking file"
    - "Account Cloudflare creato, widget Turnstile creato per hostname produzione + `*.vercel.app` in modalità Managed, `TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY` salvati in password manager — conferma registrata nel tracking file"
    - "Il file `.planning/phases/01-fondamenta/01-04-deliverables-tracking.md` esiste e contiene 3 sezioni markdown (## D-25, ## D-26, ## D-27) ciascuna con i campi `sent:`, `acknowledged:`, `expected_delivery:`, `status:`, `notes:`"
    - "Tutti e 3 gli `status:` riportano il valore `sent` o `done` (non più `pending`) al momento della chiusura di Phase 1"
  artifacts:
    - path: ".planning/phases/01-fondamenta/01-04-deliverables-tracking.md"
      provides: "Tracking markdown con 3 sezioni checkbox per D-25/D-26/D-27, timestamps e status correnti"
      contains: "## D-25"
  key_links:
    - from: "01-04-deliverables-tracking.md §D-25"
      to: "Phase 4 Portfolio unblocker"
      via: "human email chain + photo delivery"
      pattern: "D-25"
    - from: "01-04-deliverables-tracking.md §D-26"
      to: "Phase 5 Chi Siamo unblocker"
      via: "human email chain + PDF SOA/ISO delivery"
      pattern: "D-26"
    - from: "01-04-deliverables-tracking.md §D-27"
      to: "Phase 6 Contatti/form unblocker"
      via: "Resend DNS verification + Cloudflare Turnstile widget creation"
      pattern: "D-27"
---

<objective>
Wave 2 (human-owned track) — avviare formalmente le tre catene di comunicazione cliente con lead time lungo che sbloccano le fasi successive. Non c'è codice da scrivere: i task di questo plan creano e aggiornano un singolo file di tracking, e registrano che le 3 azioni reali (inviare email, creare account Resend, creare widget Turnstile) sono state eseguite fuori dal repository.

Purpose: CONTEXT.md §"Client deliverables Phase 1 (non-coding)" è esplicito — "Phase 1 non è 'complete' finché non sono stati avviati formalmente". Questi deliverable sono exit gate di fase, non nice-to-have. Phase 1 può chiudere con i 3 task in stato `sent` + acknowledgment ricevuto (o account creati + keys salvate, per D-27), anche se le consegne reali (foto, PDF, DNS propagation) arrivano successivamente.

**Scope note (coverage dei requirement):** questo plan NON copre nessun FND requirement. La copertura FND-01..FND-10 è interamente garantita da `01-01-scaffold-and-toolchain-PLAN.md` (FND-01, FND-02, FND-08), `01-02-design-system-and-layout-PLAN.md` (FND-02, FND-03, FND-04, FND-05, FND-06, FND-07, FND-08), e `01-03-seo-metadata-and-error-pages-PLAN.md` (FND-09, FND-10). Il `requirements: []` in frontmatter è intenzionale e corretto — questo plan traccia deliverable derivanti dalle decisioni D-25/D-26/D-27, non requirement funzionali. Il plan-checker deve accettare questa asimmetria.

**Autonomous flag:** `autonomous: false`. L'executor agente NON deve provare a inviare email reali, creare account Resend/Cloudflare, o manipolare DNS. Il suo unico compito automatizzabile è creare/aggiornare il file di tracking. Le 3 azioni reali sono umane. Quando l'executor incontra i Task 1/2/3 deve:
1. Stampare il testo email (per D-25/D-26) o i passi operativi (per D-27) al termine dell'output della task
2. Aggiornare il tracking file con stato `pending_human_action` + timestamp
3. Richiedere conferma umana (handoff) prima di marcare il task `completed`

**Wave 2 parallelization:** questo plan ha `depends_on: []` ed è assegnato a Wave 2 insieme a `01-03`. Non c'è dipendenza tecnica tra i due — il codice di 01-03 e le email di 01-04 sono canali completamente separati, eseguibili in parallelo. La wave comune è solo per chiarezza di reporting. Phase 1 chiude quando entrambi i plan Wave 2 sono `completed`.
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
@CLAUDE.md
</context>

<interfaces>
<!-- No code interfaces — this plan only produces a markdown tracking file. -->

**Tracking file path contract** (consumed by future `/gsd-progress` runs, Phase 1 closure check, Phase 4/5/6 pre-execution checks):
```
.planning/phases/01-fondamenta/01-04-deliverables-tracking.md
```

**Tracking file section contract** (so downstream automation can grep for status):
```
## D-25 — Fotografia cantieri/team/mezzi
- sent: YYYY-MM-DD
- acknowledged: YYYY-MM-DD | pending
- expected_delivery: YYYY-MM-DD
- status: pending | sent | acknowledged | done
- notes: free-form

## D-26 — PDF attestazioni SOA + ISO
- (same shape as D-25)

## D-27 — Resend DNS + Cloudflare Turnstile keys
- sent_or_started: YYYY-MM-DD
- resend_status: not_started | domain_added | dns_pasted | verified
- turnstile_status: not_started | widget_created | keys_saved
- status: pending | started | done
- notes: free-form
```

Downstream consumers:
- Phase 4 plan-checker grep: `grep -q 'D-25' .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && grep -q 'status: acknowledged\|status: done' .planning/phases/01-fondamenta/01-04-deliverables-tracking.md`
- Phase 5 plan-checker grep: same shape for D-26
- Phase 6 plan-checker grep: `grep -q 'D-27' .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && grep -q 'turnstile_status: keys_saved\|turnstile_status: done' .planning/phases/01-fondamenta/01-04-deliverables-tracking.md`
</interfaces>

<tasks>

<task type="human">
  <name>Task 1: Create the tracking file `.planning/phases/01-fondamenta/01-04-deliverables-tracking.md` with three scaffolded sections (D-25, D-26, D-27) in `pending` status</name>
  <read_first>
    - .planning/phases/01-fondamenta/01-CONTEXT.md §"Client deliverables Phase 1 (non-coding)" (D-25, D-26, D-27) — authoritative definition of each deliverable, owner, unblocker target
    - .planning/phases/01-fondamenta/01-RESEARCH.md §12 "Cross-phase blockers (D-25, D-26, D-27)" (lines 2159-2339) — full context: lead times, email templates, Resend/Turnstile setup steps, "Phase 1 task shape for the planner" pseudocode
  </read_first>
  <files>
    .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
  </files>
  <action>
Create `.planning/phases/01-fondamenta/01-04-deliverables-tracking.md` with EXACTLY this content (Italian section headings, English status keys to keep grep-stable):

```markdown
# Phase 1 — Client Deliverables Tracking

**Plan:** 01-04
**Owner:** human (lead project)
**Status:** in progress
**Created:** [DATA ODIERNA — sostituire con `date +%Y-%m-%d`]

Tre deliverable non-coding che sbloccano Phase 4, Phase 5, Phase 6. Vedi
`.planning/phases/01-fondamenta/01-CONTEXT.md` §"Client deliverables Phase 1"
e `.planning/phases/01-fondamenta/01-RESEARCH.md` §12 per contesto completo
e template email verbatim.

---

## D-25 — Fotografia cantieri/team/mezzi

**Unblocks:** Phase 4 (Portfolio), Phase 5 (Chi Siamo — team + fleet photos)
**Lead time:** 2–4 settimane dopo invio
**Owner:** human project lead

- [ ] sent: pending
- [ ] acknowledged: pending
- [ ] expected_delivery: pending
- [ ] status: pending
- notes:

---

## D-26 — PDF attestazioni SOA + ISO

**Unblocks:** Phase 5 (Chi Siamo — certificazioni card + PDF download)
**Lead time:** giorni (dipende da chi ha gli originali)
**Owner:** human project lead

- [ ] sent: pending
- [ ] acknowledged: pending
- [ ] expected_delivery: pending
- [ ] status: pending
- notes:

---

## D-27 — Resend DNS + Cloudflare Turnstile keys

**Unblocks:** Phase 6 (Contatti form — transactional email + spam protection)
**Lead time:** ore per account creation, fino a 24h per DNS propagation
**Owner:** human (lead dev / account admin)

### D-27a — Resend domain verification

- [ ] account_created: pending
- [ ] domain_added: pending
- [ ] dns_records_pasted: pending
- [ ] resend_status: not_started
- notes:

### D-27b — Cloudflare Turnstile keys

- [ ] account_created: pending
- [ ] widget_created: pending
- [ ] keys_saved_to_password_manager: pending
- [ ] turnstile_status: not_started
- notes:

---

## Closure checklist (Phase 1 exit)

- [ ] D-25 status is `sent` or `acknowledged` (NOT `pending`)
- [ ] D-26 status is `sent` or `acknowledged` (NOT `pending`)
- [ ] D-27a resend_status is `dns_pasted` or `verified` (NOT `not_started`)
- [ ] D-27b turnstile_status is `keys_saved` or `done` (NOT `not_started`)

Phase 1 può chiudere quando tutti e 4 i punti sopra sono ✓. Le consegne reali
(foto da cliente, PDF, DNS propagation completa) possono arrivare dopo — ciò
che blocca Phase 1 è l'INIZIO formale dei tre processi, non il loro completamento.
```

Dopo aver scritto il file, esegui un replace per sostituire `[DATA ODIERNA — sostituire con \`date +%Y-%m-%d\`]` con l'output di `date +%Y-%m-%d`. Questo task è l'unico di questo plan che l'executor automatizzato può completare end-to-end senza handoff umano.
  </action>
  <verify>
    <automated>
test -f .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && \
grep -q "^## D-25" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && \
grep -q "^## D-26" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && \
grep -q "^## D-27" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && \
grep -q "### D-27a" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && \
grep -q "### D-27b" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && \
grep -q "status: pending" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && \
grep -q "resend_status: not_started" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && \
grep -q "turnstile_status: not_started" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && \
grep -q "Closure checklist" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && \
! grep -q "\[DATA ODIERNA" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
    </automated>
  </verify>
  <done>
Il file di tracking esiste con le 3 sezioni D-25/D-26/D-27 (più le due sotto-sezioni D-27a/D-27b), tutti gli status in stato iniziale `pending`/`not_started`, e la data di creazione sostituita con una data reale. Il file è pronto per essere aggiornato dai Task 2/3/4 e greppato dai Phase 4/5/6 plan-checker.
  </done>
</task>

<task type="human">
  <name>Task 2: Inviare email D-25 "Fotografia cantieri/team/mezzi" al cliente e aggiornare il tracking file</name>
  <read_first>
    - .planning/phases/01-fondamenta/01-RESEARCH.md §12 "D-25 — Email: fotografia cantieri / team / mezzi" (lines 2163-2219) — template email italiano completo e requirements di consegna (≥10 cantieri, team, mezzi, certificazioni in contesto)
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-25 — definizione del deliverable e exit criterion ("sent + acknowledged by client")
    - .planning/phases/01-fondamenta/01-04-deliverables-tracking.md (creato nel Task 1) — file da aggiornare
  </read_first>
  <files>
    .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
  </files>
  <action>
**Questo task ha owner UMANO. L'executor agent NON deve inviare email reali.** L'executor deve:

1. Stampare in output il template email verbatim (vedi sotto)
2. Aggiornare il tracking file Task-1-creato cambiando la sezione D-25 a `status: pending_human_send` con un timestamp
3. Fermarsi e chiedere conferma umana prima di marcare il task come completato

**Testo email da inviare (copia-incolla integrale, sostituire solo i placeholder `[...]`):**

```
Oggetto: Richiesta materiale fotografico per il nuovo sito web Edilferro

Ciao [Nome],

per partire con la costruzione del sito istituzionale abbiamo bisogno di materiale
fotografico reale. Le foto stock non le useremo — la credibilità viene dai cantieri
veri, dal team e dai mezzi di proprietà.

Serve questo materiale in alta risoluzione (minimo 2400×1600px, preferibilmente
originale dalla fotocamera):

1. **Cantieri completati** — almeno 10 progetti, ciascuno con 3–6 foto
   (panoramica prima/dopo quando possibile, dettaglio esecuzione, vista di insieme).
   Per ogni cantiere ci servono:
   - Committente (privato / ente pubblico / nome studio)
   - Tipologia lavoro (nuova costruzione, ristrutturazione, opera pubblica, urbanizzazione)
   - Località e anno di completamento
   - Descrizione breve (2–3 frasi)

2. **Team aziendale**
   - Foto di gruppo (almeno una, tutto il team se possibile)
   - Eventualmente ritratti singoli di figure chiave (facoltativo)

3. **Mezzi di proprietà**
   - Foto dei principali macchinari e veicoli aziendali
   - Almeno 4–6 mezzi distinti in condizioni operative (non parcheggiati fermi)

4. **Certificazioni in contesto** (se disponibile)
   - Targhetta di cantiere con logo SOA / ISO in primo piano
   - Foto di attestati appesi in ufficio

**Tempi:** ci servono i file entro [DATA + 4 settimane] per iniziare la costruzione
della pagina Progetti. Possiamo partire con un sottoinsieme (es. 5 cantieri) e
completare strada facendo.

**Come consegnare:** WeTransfer o Google Drive va benissimo. Nessun formato
particolare richiesto — .jpg/.heic/.raw tutti ok.

**Liberatoria:** verifica che i committenti abbiano acconsentito alla pubblicazione
delle foto (per cantieri privati serve il loro ok scritto; per opere pubbliche
di solito non c'è problema).

Fammi sapere se hai domande. Grazie!

—
[Firma]
```

**Aggiornamento del tracking file (automatizzato):** usando Edit tool, sostituire nella sezione `## D-25` del file `.planning/phases/01-fondamenta/01-04-deliverables-tracking.md`:

- `- [ ] sent: pending` → `- [x] sent: YYYY-MM-DD` (data di oggi, output di `date +%Y-%m-%d`)
- `- [ ] status: pending` → `- [x] status: sent`
- Aggiungere sotto `- notes:`: `  - email inviata via [cliente/PEC], template da RESEARCH §12 D-25`

**Stop condition (handoff umano):**
Dopo l'aggiornamento, l'executor stampa:

```
⚠ HUMAN ACTION REQUIRED — Task 2 (D-25)

Copia il template email sopra, sostituisci [Nome], [DATA + 4 settimane], [Firma],
invia al cliente, e attendi acknowledgment.

Quando il cliente risponde, aggiorna manualmente .planning/phases/01-fondamenta/01-04-deliverables-tracking.md:
  - [x] acknowledged: YYYY-MM-DD
  - - [x] status: acknowledged
```

L'executor NON marca questo task come `completed` finché lo human non conferma.
  </action>
  <verify>
    <automated>
grep -qE "^- \[x\] sent: [0-9]{4}-[0-9]{2}-[0-9]{2}" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && \
grep -qE "^- \[x\] status: sent" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && \
awk '/^## D-25/,/^## D-26/' .planning/phases/01-fondamenta/01-04-deliverables-tracking.md | grep -qE "status: (sent|acknowledged|done)"
    </automated>
  </verify>
  <done>
Template email stampato in output, tracking file D-25 aggiornato a `status: sent` con data, handoff umano richiesto per l'acknowledgment. Il task resta in `in_progress` fino a conferma umana che l'email è stata realmente inviata al cliente.
  </done>
</task>

<task type="human">
  <name>Task 3: Inviare email D-26 "PDF attestazioni SOA + ISO" al cliente e aggiornare il tracking file</name>
  <read_first>
    - .planning/phases/01-fondamenta/01-RESEARCH.md §12 "D-26 — Email: PDF attestazioni SOA + ISO" (lines 2221-2260) — template email italiano completo e spec di consegna (PDF ufficiali, ente certificatore, data scadenza)
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-26 — definizione deliverable
    - .planning/phases/01-fondamenta/01-04-deliverables-tracking.md (aggiornato da Task 1/2)
  </read_first>
  <files>
    .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
  </files>
  <action>
**Owner UMANO — stessa meccanica del Task 2.** L'executor stampa il template, aggiorna il tracking file, ferma per handoff.

**Testo email da inviare (verbatim):**

```
Oggetto: PDF attestazioni SOA e ISO per la pagina Chi Siamo del nuovo sito

Ciao [Nome],

per la pagina Chi Siamo del sito ci servono i PDF ufficiali delle attestazioni:

1. **Attestazione SOA**
   - PDF originale dell'attestazione (come rilasciata dall'ente SOA)
   - Elenco delle categorie possedute (OG1, OG3, ecc.) con le classifiche
   - Data di scadenza
   - Nome dell'organismo SOA che l'ha rilasciata

2. **Certificato ISO** (immagino ISO 9001, confermare)
   - PDF originale del certificato
   - Ente certificatore (es. Bureau Veritas, SGS, DNV, TÜV, RINA…)
   - Data di scadenza e ciclo di audit

Se hai anche **foto ad alta risoluzione** delle attestazioni cartacee incorniciate
in ufficio, sono utilissime — danno più credibilità visuale rispetto al solo PDF.

**Tempistiche:** prima di Phase 5 [DATA orientativa]. Nessun'urgenza oggi, ma
preferibile consegna prima di fine [MESE] per evitare colli di bottiglia.

**Consegna:** allegato email, WeTransfer, o cartella Drive. Nessun formato
particolare; se hai solo la scansione cartacea va bene ugualmente.

Grazie!
—
[Firma]
```

**Aggiornamento tracking file** — nella sezione `## D-26`:
- `- [ ] sent: pending` → `- [x] sent: YYYY-MM-DD`
- `- [ ] status: pending` → `- [x] status: sent`
- Sotto `- notes:`: `  - email inviata, template da RESEARCH §12 D-26`

**Stop condition:** handoff umano per l'acknowledgment, identico a Task 2.
  </action>
  <verify>
    <automated>
awk '/^## D-26/,/^## D-27/' .planning/phases/01-fondamenta/01-04-deliverables-tracking.md | grep -qE "^- \[x\] sent: [0-9]{4}-[0-9]{2}-[0-9]{2}" && \
awk '/^## D-26/,/^## D-27/' .planning/phases/01-fondamenta/01-04-deliverables-tracking.md | grep -qE "status: (sent|acknowledged|done)"
    </automated>
  </verify>
  <done>
Template D-26 stampato, tracking file aggiornato a `status: sent`, handoff umano richiesto per acknowledgment.
  </done>
</task>

<task type="human">
  <name>Task 4: Bootstrap D-27a (Resend domain verification) e D-27b (Cloudflare Turnstile widget) e aggiornare il tracking file</name>
  <read_first>
    - .planning/phases/01-fondamenta/01-RESEARCH.md §12 "D-27 — DNS Resend + Cloudflare Turnstile" (lines 2262-2339) — steps verbatim per Resend (account → domain add → DNS records → API key) e Turnstile (account → widget → site+secret keys)
    - .planning/phases/01-fondamenta/01-CONTEXT.md §D-27 — definizione deliverable + gotcha Aruba DNS propagation
    - .planning/phases/01-fondamenta/01-04-deliverables-tracking.md (aggiornato da Task 1/2/3)
  </read_first>
  <files>
    .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
  </files>
  <action>
**Owner UMANO — questo task NON può essere eseguito da un agente.** L'executor stampa le istruzioni operative, aggiorna il tracking con stato `pending_human_action`, ferma per handoff.

**Sub-step D-27a — Resend domain verification (istruzioni per lo human):**

1. Creare account su [resend.com](https://resend.com) (free tier va bene — 3k email/mese).
2. Dashboard Resend → **Domains** → **Add Domain** → inserire il dominio di produzione (es. `edilferro.it`; confermare con cliente se è il dominio finale o se ne useranno un altro).
3. Resend produce DNS records da aggiungere nel DNS provider del dominio:
   - **SPF** — un record `TXT` alla root (`@`) con valore generato da Resend (tipicamente include `include:amazonses.com ~all` o simile)
   - **DKIM** — un record `TXT` al subdomain `resend._domainkey.[dominio]` con la public key
   - **DMARC** (raccomandato) — `TXT` a `_dmarc.[dominio]` con policy `v=DMARC1; p=quarantine; rua=mailto:...`
   - Eventuale `MX` record per bounce handling a un subdomain gestito Resend (es. `bounces.[dominio]`)
4. **NON scrivere a mano i valori** — copiare sempre verbatim dalla dashboard Resend (Resend genera i record per-dominio).
5. Incollare i record nel DNS provider del cliente (Aruba, Register.it, Cloudflare, Namecheap, GoDaddy…). Se il DNS è gestito da fornitore terzo, avviare subito la catena email — può richiedere giorni.
6. Tornare in Resend dashboard → click **Verify** → Resend inizia il polling DNS. Può richiedere da minuti a ore (Aruba fino a 24h).
7. **Generare un'API key** Resend → salvare in password manager come `RESEND_API_KEY`. Andrà in Vercel env var in Phase 6.

**Gotcha da tracciare nelle notes del tracking file:**
- Se il DNS è gestito da Aruba, allow 24h per propagation
- Se il DNS è gestito da un'agenzia terza, la catena email interna può essere il collo di bottiglia
- Free tier Resend supporta 1 dominio verificato — se il cliente ne ha più di uno, consolidare

**Sub-step D-27b — Cloudflare Turnstile widget (istruzioni per lo human):**

1. Creare account su [cloudflare.com](https://cloudflare.com) (free tier — NON richiede che il dominio sia su Cloudflare DNS).
2. Dashboard → **Turnstile** (potrebbe essere sotto "Trust & Safety" / "Security") → **Add Widget**.
3. Compilare:
   - **Widget name:** `edilferro.it — production form` (o il nome del dominio reale)
   - **Hostname management:** aggiungere:
     - `edilferro.it` (o dominio reale)
     - `www.edilferro.it`
     - `*.vercel.app` (CRITICO — senza questo il widget non funziona sui preview deploy Vercel)
   - **Widget mode:** **Managed** (default — Cloudflare decide se mostrare challenge, di solito invisibile)
   - **Pre-clearance:** lascia default
4. **Create** → Cloudflare restituisce:
   - **Site key** (pubblica) — `TURNSTILE_SITE_KEY`
   - **Secret key** (privata) — `TURNSTILE_SECRET_KEY`
5. **Salvare entrambe in password manager.** In Phase 6:
   - `TURNSTILE_SITE_KEY` → variabile `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in Vercel (ships nel bundle client)
   - `TURNSTILE_SECRET_KEY` → variabile `TURNSTILE_SECRET_KEY` in Vercel (server-side only, usata nell'Action di verifica)

**Gotcha:** mode `Invisible` è più aggressivo ma può bloccare utenti legittimi — `Managed` è il default consigliato.

**Aggiornamento tracking file** — nella sezione `## D-27`:
- `- [ ] account_created: pending` → `- [x] account_created: YYYY-MM-DD` (D-27a)
- `- [ ] domain_added: pending` → `- [x] domain_added: YYYY-MM-DD` (D-27a)
- `- [ ] dns_records_pasted: pending` → `- [x] dns_records_pasted: YYYY-MM-DD` (D-27a)
- `- [ ] resend_status: not_started` → `- [x] resend_status: dns_pasted` (D-27a, polling in corso)
- `- [ ] account_created: pending` (D-27b) → `- [x] account_created: YYYY-MM-DD`
- `- [ ] widget_created: pending` → `- [x] widget_created: YYYY-MM-DD`
- `- [ ] keys_saved_to_password_manager: pending` → `- [x] keys_saved_to_password_manager: YYYY-MM-DD`
- `- [ ] turnstile_status: not_started` → `- [x] turnstile_status: keys_saved`
- Aggiungere nelle notes eventuali gotcha (DNS provider, propagation delay, dominio reale confermato, ecc.)

**Stop condition:** L'executor stampa:

```
⚠ HUMAN ACTION REQUIRED — Task 4 (D-27)

Segui le istruzioni sopra per creare l'account Resend, aggiungere il dominio,
incollare i DNS records, e generare la Turnstile widget. Salva le 3 keys
(RESEND_API_KEY, TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY) in password manager.

Quando completato, aggiorna manualmente .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
con i timestamp reali e conferma il completamento del task.
```

L'executor NON marca `completed` senza conferma umana.
  </action>
  <verify>
    <automated>
awk '/^### D-27a/,/^### D-27b/' .planning/phases/01-fondamenta/01-04-deliverables-tracking.md | grep -qE "resend_status: (dns_pasted|verified)" && \
awk '/^### D-27b/,/^## |^---/' .planning/phases/01-fondamenta/01-04-deliverables-tracking.md | grep -qE "turnstile_status: (keys_saved|done)"
    </automated>
  </verify>
  <done>
Istruzioni operative D-27a (Resend) e D-27b (Turnstile) stampate, tracking file aggiornato con `resend_status: dns_pasted` e `turnstile_status: keys_saved`, handoff umano richiesto per conferma che account, DNS records, e keys sono realmente creati/salvati.
  </done>
</task>

</tasks>

<verification>
End-of-plan verification (automated):

```bash
# File exists
test -f .planning/phases/01-fondamenta/01-04-deliverables-tracking.md

# 3 sections + 2 sub-sections present
grep -q "^## D-25" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
grep -q "^## D-26" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
grep -q "^## D-27" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
grep -q "^### D-27a" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
grep -q "^### D-27b" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md

# No section still in `pending` status at plan close
! grep -q "^- \[ \] status: pending" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
! grep -q "^- \[ \] resend_status: not_started" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
! grep -q "^- \[ \] turnstile_status: not_started" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md

# Closure checklist present
grep -q "Closure checklist" .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
```

Manual verification (human confirms via chat):
- D-25 email sent and client acknowledgment received (date recorded)
- D-26 email sent and client acknowledgment received (date recorded)
- D-27a Resend account + domain verification started (DNS records pasted, polling in progress)
- D-27b Cloudflare Turnstile widget created, site+secret keys in password manager
</verification>

<success_criteria>
- **D-25 avviato:** email inviata al cliente, tracking file registra `sent: YYYY-MM-DD` e `status: sent` (o `acknowledged` se già confermato)
- **D-26 avviato:** email inviata, tracking file registra `status: sent` (o `acknowledged`)
- **D-27a avviato:** account Resend esistente, dominio aggiunto, DNS records incollati nel provider, polling di verifica avviato; tracking file `resend_status: dns_pasted` (o `verified`)
- **D-27b avviato:** account Cloudflare esistente, widget Turnstile creato con hostname production + `*.vercel.app` in modalità Managed, `TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY` salvati in password manager; tracking file `turnstile_status: keys_saved`
- **Tracking file integro:** `.planning/phases/01-fondamenta/01-04-deliverables-tracking.md` esiste, contiene tutte e 3 le sezioni con sub-sezioni D-27a/D-27b, tutti gli status finali ≠ `pending`/`not_started`, closure checklist in fondo presente e consultabile
- **Nessun credential committato:** `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` NON compaiono in nessun file del repository. Vanno solo in password manager (Phase 1) e in Vercel env vars (Phase 6). Il tracking file può solo dire `keys_saved: YYYY-MM-DD`, mai il valore reale delle keys.
- **Phase 1 closure sbloccata:** al termine di questo plan, Phase 1 può essere formalmente chiusa — Phase 4, 5, 6 hanno le loro catene di blocker avviate
</success_criteria>

<output>
After completion, create `.planning/phases/01-fondamenta/01-04-SUMMARY.md` recording:
- Which deliverables were actually completed vs. still pending human action at plan close
- Exact send dates for D-25 and D-26 emails
- Whether client acknowledgment was received during Phase 1 or deferred to asynchronous follow-up
- For D-27: which DNS provider the client uses (Aruba / Register.it / Cloudflare / other — affects propagation time tracking)
- Confirmation that no secrets were committed anywhere in the repo (grep check: `! grep -r "RESEND_API_KEY=" .` and `! grep -r "TURNSTILE_SECRET_KEY=" .` — both must return nothing)
- Handoff to Phase 4: Phase 4 plan-checker will grep `.planning/phases/01-fondamenta/01-04-deliverables-tracking.md` for `D-25` acknowledgment before proceeding
- Handoff to Phase 5: same shape for `D-26`
- Handoff to Phase 6: same shape for `D-27` `turnstile_status: keys_saved` and `resend_status: verified`
</output>
