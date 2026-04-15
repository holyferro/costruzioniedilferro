---
phase: 01-fondamenta
plan: 04
subsystem: client-deliverables
tags: [deliverables, email, resend, turnstile, tracking, human-owned]
dependency_graph:
  requires:
    - 01-01-scaffold-and-toolchain
    - 01-02-design-system-and-layout
  provides:
    - deliverables-tracking-file
    - d25-photography-request-template
    - d26-soa-iso-pdf-request-template
    - d27-resend-turnstile-setup-instructions
  affects:
    - 04-portfolio (bloccato da D-25)
    - 05-chi-siamo (bloccato da D-26)
    - 06-contatti (bloccato da D-27)
tech_stack:
  added: []
  patterns:
    - human-owned deliverable tracking via markdown
key_files:
  created:
    - .planning/phases/01-fondamenta/01-04-deliverables-tracking.md
  modified: []
decisions:
  - "Tracking file come unico artefatto del plan — tutte le azioni reali (email, account creation) sono human-owned e tracciate nel file"
  - "Status pending_human_send/pending_human_action usati per indicare template pronti ma azione umana ancora da eseguire"
  - "D-27a e D-27b trattati come sub-task separati per granularità di tracking"
metrics:
  duration: "5 min (task automatizzabile solo Task 1)"
  completed_date: 2026-04-15
  tasks_completed: 1
  tasks_pending_human: 3
  files_created: 1
  files_modified: 0
---

# Phase 1 Plan 04: Client Deliverables — Summary

**One-liner:** File di tracking creato per le tre catene D-25/D-26/D-27 con template email e istruzioni operative pronti per handoff umano.

## What Was Built

Questo plan produce un unico artefatto: `.planning/phases/01-fondamenta/01-04-deliverables-tracking.md`.

Il file traccia tre deliverable non-coding che sbloccano Phase 4, Phase 5 e Phase 6:

- **D-25** — Fotografia cantieri/team/mezzi (sblocca Phase 4 Portfolio e Phase 5 Chi Siamo)
- **D-26** — PDF attestazioni SOA + ISO (sblocca Phase 5 Chi Siamo)
- **D-27** — Account Resend (DNS verification) + Cloudflare Turnstile widget (sblocca Phase 6 Contatti)

## Tasks Completed

### Task 1 (auto) — Tracking file creato
- File `.planning/phases/01-fondamenta/01-04-deliverables-tracking.md` creato con 3 sezioni + sub-sezioni D-27a/D-27b
- Tutti gli status inizializzati a `pending` / `not_started`
- Closure checklist Phase 1 inclusa in fondo
- **Commit:** `c464178`

## Tasks Awaiting Human Action

### Task 2 — Email D-25 "Fotografia cantieri/team/mezzi"

**Azione richiesta:** inviare l'email al cliente con il template qui sotto, poi aggiornare manualmente il tracking file.

**Template email (copia-incolla, sostituire `[...]`):**

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

**Dopo l'invio**, aggiornare `.planning/phases/01-fondamenta/01-04-deliverables-tracking.md` sezione D-25:
```
- [x] sent: 2026-XX-XX
- [x] status: sent
```

**Dopo l'acknowledgment** del cliente:
```
- [x] acknowledged: 2026-XX-XX
- [x] status: acknowledged
```

---

### Task 3 — Email D-26 "PDF attestazioni SOA + ISO"

**Azione richiesta:** inviare l'email al cliente con il template qui sotto, poi aggiornare il tracking file.

**Template email (copia-incolla, sostituire `[...]`):**

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

**Tempistiche:** prima di Phase 5 [DATA orientativa]. Nessuna urgenza oggi, ma
preferibile consegna prima di fine [MESE] per evitare colli di bottiglia.

**Consegna:** allegato email, WeTransfer, o cartella Drive. Nessun formato
particolare; se hai solo la scansione cartacea va bene ugualmente.

Grazie!
—
[Firma]
```

**Dopo l'invio**, aggiornare sezione D-26 nel tracking file:
```
- [x] sent: 2026-XX-XX
- [x] status: sent
```

---

### Task 4 — D-27a Resend + D-27b Cloudflare Turnstile

**Azione richiesta:** creare gli account e configurare i servizi seguendo le istruzioni operative sotto.

#### D-27a — Resend domain verification

1. Creare account su [resend.com](https://resend.com) (free tier — 3k email/mese)
2. Dashboard Resend → **Domains** → **Add Domain** → inserire il dominio di produzione (es. `edilferro.it`)
3. Resend genera DNS records — copiarli **verbatim** dalla dashboard (NON scrivere a mano):
   - **SPF** — record `TXT` alla root (`@`)
   - **DKIM** — record `TXT` a `resend._domainkey.[dominio]`
   - **DMARC** (raccomandato) — `TXT` a `_dmarc.[dominio]`
   - Eventuale `MX` record per bounce handling
4. Incollare i record nel DNS provider del cliente (Aruba, Register.it, Cloudflare, ecc.)
   - **Gotcha Aruba:** allow fino a 24h per propagation DNS
   - Se il DNS è gestito da agenzia terza: avviare subito la catena email interna
5. Tornare in Resend → **Verify** (polling inizia automaticamente)
6. Generare **API key** Resend → salvare in password manager come `RESEND_API_KEY`
   - **IMPORTANTE:** NON committare la key nel repository

**Dopo l'esecuzione**, aggiornare sezione D-27a nel tracking file:
```
- [x] account_created: 2026-XX-XX
- [x] domain_added: 2026-XX-XX
- [x] dns_records_pasted: 2026-XX-XX
- [x] resend_status: dns_pasted
- notes:
  - DNS provider: [Aruba / Register.it / altro]
  - dominio: [edilferro.it o dominio reale confermato]
```

#### D-27b — Cloudflare Turnstile widget

1. Creare account su [cloudflare.com](https://cloudflare.com) (free tier — NON richiede spostare il DNS su Cloudflare)
2. Dashboard → **Turnstile** → **Add Widget**
3. Compilare:
   - **Widget name:** `edilferro.it — production form`
   - **Hostname management** (aggiungere tutti e tre):
     - `edilferro.it` (o dominio reale)
     - `www.edilferro.it`
     - `*.vercel.app` — **CRITICO**, senza questo i preview deploy Vercel non funzionano
   - **Widget mode:** **Managed** (default — invisibile per la maggior parte degli utenti)
4. Cloudflare fornisce due keys:
   - **Site key** (pubblica) — salvare come `TURNSTILE_SITE_KEY`
   - **Secret key** (privata) — salvare come `TURNSTILE_SECRET_KEY`
5. Salvare **entrambe** in password manager
   - In Phase 6 andranno in Vercel env vars:
     - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (client-side, ok nel bundle)
     - `TURNSTILE_SECRET_KEY` (server-only, mai nel bundle)
   - **IMPORTANTE:** NON committare le keys nel repository

**Dopo l'esecuzione**, aggiornare sezione D-27b nel tracking file:
```
- [x] account_created: 2026-XX-XX
- [x] widget_created: 2026-XX-XX
- [x] keys_saved_to_password_manager: 2026-XX-XX
- [x] turnstile_status: keys_saved
- notes:
  - widget mode: Managed
  - hostname *.vercel.app aggiunto: si
```

---

## Deviations from Plan

Nessuna deviazione tecnica — il plan è interamente non-coding. Il tracking file è stato creato come da spec con tutte le sezioni e il formato grep-stabile per i downstream plan-checker.

**Nota su `autonomous: false`:** il plan dichiara esplicitamente owner umano per i Task 2/3/4. L'executor ha creato il file di tracking (Task 1 unico task auto-completabile), preparato i template e le istruzioni operative, e si ferma per handoff umano. Le azioni reali (invio email, creazione account) non possono essere automatizzate.

## Known Stubs

Nessuno stub nel codice — questo plan non produce file di codice.

Il tracking file ha tutti gli status in `pending`/`not_started` che è il valore iniziale corretto. Non è uno stub: riflette lo stato reale (azioni umane non ancora eseguite).

## Threat Flags

Nessun nuovo endpoint di rete, nessun percorso di autenticazione, nessun accesso a file, nessuna modifica schema introdotti da questo plan.

**Nota sicurezza:** le istruzioni operative esplicitano chiaramente che `RESEND_API_KEY`, `TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY` NON devono essere committate nel repository. Verifica:

```bash
! grep -r "RESEND_API_KEY=" . --include="*.ts" --include="*.tsx" --include="*.js" --include="*.env"
! grep -r "TURNSTILE_SECRET_KEY=" . --include="*.ts" --include="*.tsx" --include="*.js" --include="*.env"
```

Entrambi devono restituire zero risultati.

## Downstream Handoffs

- **Phase 4 plan-checker:** `grep -q 'D-25' .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && grep -q 'status: acknowledged\|status: done' .planning/phases/01-fondamenta/01-04-deliverables-tracking.md`
- **Phase 5 plan-checker:** stesso shape per D-26
- **Phase 6 plan-checker:** `grep -q 'D-27' .planning/phases/01-fondamenta/01-04-deliverables-tracking.md && grep -q 'turnstile_status: keys_saved\|turnstile_status: done' .planning/phases/01-fondamenta/01-04-deliverables-tracking.md`

## Self-Check: PASSED

- [x] `.planning/phases/01-fondamenta/01-04-deliverables-tracking.md` esiste
- [x] Commit `c464178` presente
- [x] Sezioni D-25, D-26, D-27, D-27a, D-27b presenti
- [x] Closure checklist presente
- [x] Nessuna key o credenziale nel repository
