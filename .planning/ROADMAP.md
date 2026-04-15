# Roadmap: Sito Web Impresa Edile SRL

## Overview

Sette fasi consegnano il sito istituzionale completo dell'impresa edile: dalla fondazione tecnica e del design system (Phase 1), attraverso le pagine di contenuto ad alto valore commerciale (Phases 2–6), fino al tuning SEO e al deploy in produzione (Phase 7). Ogni fase chiude una capacità verificabile e deployabile. La sequenza rispecchia le dipendenze di contenuto reali: il design system deve precedere ogni pagina, i servizi definiscono la tassonomia del portfolio, il portfolio è bloccato dalla fotografia reale, il form di contatto dipende da DNS Resend verificato. Non esistono fasi parallele — ogni fase sblocca la successiva.

## Content Blockers — Azioni richieste in Phase 1

Prima di avviare la costruzione, il cliente deve essere ingaggiato su tre dipendenze hard con lead time significativo:

1. **Fotografia cantieri/team/mezzi** — Phase 4 (Portfolio) non può completarsi senza foto reali. Lead time stimato: 2–4 settimane. Richiedere committment prima della fine di Phase 1.
2. **PDF SOA e ISO** — Phase 5 (Chi siamo / certificazioni) richiede i PDF delle attestazioni SOA e del certificato ISO. Richiedere al cliente in Phase 1.
3. **DNS Resend** — Phase 6 (Contatti / form) richiede SPF, DKIM x2, DMARC verificati sul dominio produzione. La configurazione DNS può richiedere settimane se l'accesso è mediato da un fornitore terzo. Avviare in Phase 1.
4. **Cloudflare Turnstile keys** — Phase 6 richiede site key e secret key configurate su Cloudflare. Creare account e keys in Phase 1.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Fondamenta** - Scaffold Next.js 16, design system Tailwind v4, layout globale, content model, compliance lock-in
- [ ] **Phase 2: Homepage** - Homepage authority: hero, trust strip, overview servizi, CTA mobile sticky, area di servizio
- [ ] **Phase 3: Servizi** - Pagina /servizi multi-target con sezione Enti Pubblici dedicata e tassonomia servizi
- [ ] **Phase 4: Portfolio** - Pagina /progetti con griglia statica, filtri URL-driven, dettaglio per progetto, OG images
- [ ] **Phase 5: Chi Siamo** - Pagina /chi-siamo con storia aziendale, certificazioni SOA/ISO, mezzi, team
- [ ] **Phase 6: Contatti** - Pagina /contatti con form completo (RHF + Zod + Turnstile + Resend), GDPR inline, mappa statica
- [ ] **Phase 7: SEO e Launch** - Metadata completi, JSON-LD validato, sitemap, privacy/cookie policy, Lighthouse 95+, deploy produzione

## Phase Details

### Phase 1: Fondamenta

**Goal**: Il progetto è scaffoldato, il design system è definito e validato, il layout globale esiste, tutta la compliance tecnica e legale è strutturale dall'inizio — nessuna pagina può introdurre GA4, Google Maps iframe o NAP incoerente
**Depends on**: Nothing (prima fase)
**Requirements**: FND-01, FND-02, FND-03, FND-04, FND-05, FND-06, FND-07, FND-08, FND-09, FND-10
**Success Criteria** (what must be TRUE):

1. `pnpm dev` parte senza errori e `pnpm build` completa con zero warning TypeScript
2. Il sito mostra header con CTA "Richiedi un sopralluogo" e footer con P.IVA, REA, capitale sociale, sede legale su qualsiasi route visitata
3. I token colore brand (grigio scuro, panna, blu brand) sono definiti in `globals.css` via `@theme` e superano 4.5:1 WCAG AA verificato
4. Vercel Analytics è presente in `app/layout.tsx` e nessun riferimento a `gtag.js`, `_ga` o `googletagmanager.com` esiste nel codebase
5. La pagina 404 personalizzata è raggiungibile e include link a Home e Contatti
   **Plans**: TBD
   **UI hint**: yes

### Phase 2: Homepage

**Goal**: La homepage converte al primo colpo — il visitatore vede sopra la piega una foto reale di cantiere, i numeri chiave dell'impresa, la CTA primaria e capisce immediatamente se l'impresa opera nella sua zona
**Depends on**: Phase 1
**Requirements**: HOM-01, HOM-02, HOM-03, HOM-04, HOM-05, HOM-06, HOM-07, HOM-08
**Success Criteria** (what must be TRUE):

1. Sopra la piega (mobile 375px) è visibile: foto reale di cantiere, titolo autorevole, e il pulsante "Richiedi un preventivo" senza scroll
2. La strip numerica mostra 4 trust signal (70+ anni, 450+ cantieri, 35 professionisti, 3 province) renderizzati lato server senza animazioni
3. Su mobile, la barra sticky bottom con CTA rimane visibile mentre l'utente scrolla tutta la homepage
4. Toccando il numero di telefono nell'header da mobile si avvia direttamente una chiamata
5. L'area di servizio (Porto Viro, Rovigo, Polesine, Veneto) è dichiarata esplicitamente nella pagina
   **Plans**: 2 piani
   Plans:

- [ ] 02-01-PLAN.md — Fondamenta content: content/homepage.ts + route stub (/servizi, /progetti, /chi-siamo, /contatti) + typedRoutes riabilitato
- [ ] 02-02-PLAN.md — Sezioni homepage: HeroSection, TrustStrip, ServiceOverview, ServiceAreaSection, HomepageCta, MobileStickyBar + app/page.tsx
      **UI hint**: yes

### Phase 3: Servizi

**Goal**: Ogni tipologia di cliente (privato, ente pubblico, professionista) trova in /servizi la sezione dedicata ai propri bisogni specifici; la sezione Enti Pubblici menziona esplicitamente le categorie SOA, differenziando l'impresa dai concorrenti che non lo fanno
**Depends on**: Phase 2
**Requirements**: SRV-01, SRV-02, SRV-03, SRV-04, SRV-05
**Success Criteria** (what must be TRUE):

1. La pagina /servizi è navigabile via anchor link diretti alle sezioni Privati, Enti Pubblici, Professionisti
2. La sezione Enti Pubblici nomina esplicitamente le categorie SOA possedute dall'impresa
3. Tutti e quattro i servizi principali (nuove costruzioni, ristrutturazioni di pregio, opere pubbliche, urbanizzazioni) hanno una sezione dedicata con descrizione
4. La pagina termina con la CTA "Richiedi un sopralluogo" visibile senza doversi ricordare di tornare all'header
   **Plans**: TBD
   **UI hint**: yes

### Phase 4: Portfolio

**Goal**: Un potenziale cliente vede i progetti realizzati dall'impresa, può filtrare per categoria e committente, visita il dettaglio di ogni progetto con foto reali — la credibilità è visibile, non solo dichiarata
**Depends on**: Phase 3
**Requirements**: PRG-01, PRG-02, PRG-03, PRG-04, PRG-05, PRG-06, PRG-07
**Success Criteria** (what must be TRUE):

1. La pagina /progetti mostra una griglia di 10–20 progetti con foto, badge committente, categoria e località
2. I filtri per categoria e per tipo committente funzionano via URL (cambiando searchParams, non JavaScript client-side) e la URL filtrata può essere condivisa
3. Ogni progetto ha una pagina dettaglio raggiungibile via slug ASCII kebab-case con foto, committente, tipologia, località, anno e descrizione
4. Condividendo su WhatsApp un link a un progetto specifico, appare un'anteprima OG con immagine del progetto
5. Tutti i filtri applicati canonicalizzano verso /progetti nell'OG e nei meta tag
   **Plans**: TBD
   **UI hint**: yes

**Blocker**: Fase bloccata da fotografia reale. Il cliente deve consegnare almeno 10 set fotografici di cantieri completati prima che questa fase possa chiudersi. Dipendenza comunicata in Phase 1.

### Phase 5: Chi Siamo

**Goal**: Un ente pubblico o un professionista tecnico che visita /chi-siamo trova tutto ciò che serve per fidarsi dell'impresa: storia, certificazioni SOA con spiegazione leggibile, ISO, mezzi di proprietà fotografati, dimensione del team — tutto senza dover cercare altrove
**Depends on**: Phase 4
**Requirements**: CHI-01, CHI-02, CHI-03, CHI-04, CHI-05, CHI-06
**Success Criteria** (what must be TRUE):

1. La pagina /chi-siamo racconta la storia dell'impresa (45 anni, territorio, valori) in forma narrativa
2. Le certificazioni SOA e ISO sono mostrate con card visive e il visitatore può scaricare i PDF delle attestazioni
3. Una tabella leggibile spiega le categorie SOA possedute con descrizione in italiano comprensibile (non solo il codice tecnico)
4. La sezione mezzi di proprietà mostra foto dei principali macchinari/veicoli aziendali
5. Il numero di dipendenti (30) è dichiarato con una foto di gruppo o segnale visivo della dimensione del team
   **Plans**: TBD
   **UI hint**: yes

**Blocker**: Richiede PDF SOA e ISO dal cliente + foto dei mezzi di proprietà. Dipendenza comunicata in Phase 1.

### Phase 6: Contatti

**Goal**: Un visitatore che vuole richiedere un sopralluogo trova un form che funziona, è protetto da spam, rispetta il GDPR in modo visibile, e dopo l'invio riceve conferma — e l'impresa riceve una email formattata nell'inbox
**Depends on**: Phase 5
**Requirements**: CON-01, CON-02, CON-03, CON-04, CON-05, CON-06, CON-07, CON-08, CON-09, CON-10, CON-11
**Success Criteria** (what must be TRUE):

1. Il form "Richiedi un sopralluogo" invia correttamente e l'impresa riceve l'email nell'inbox (testato su dominio produzione con Resend DNS verificato)
2. Compilare il form senza spuntare il consenso privacy blocca l'invio con messaggio di errore visibile
3. Un bot che compila il campo honeypot o manda un token Turnstile non valido non riceve conferma di successo
4. La pagina /contatti mostra telefono, email, PEC, indirizzo e orari di apertura in modo leggibile su mobile
5. Una mappa statica (immagine AVIF) indica la sede, ed è cliccabile per aprire Google Maps in una nuova scheda — nessun iframe embedded
   **Plans**: TBD
   **UI hint**: yes

**Blocker**: Richiede Resend DNS verificato (SPF, DKIM x2, DMARC) e Cloudflare Turnstile keys configurate. Dipendenze avviate in Phase 1.

### Phase 7: SEO e Launch

**Goal**: Il sito è pronto per il traffico organico reale: ogni pagina ha metadata completi, il JSON-LD GeneralContractor passa Google Rich Results Test, sitemap e robots.txt sono corretti, le pagine privacy e cookie policy sono conformi al Garante, Lighthouse mobile segna 95+ su tutte le metriche, e il dominio custom è in produzione su Vercel
**Depends on**: Phase 6
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08, SEO-09, SEO-10, SEO-11, SEO-12
**Success Criteria** (what must be TRUE):

1. Google Rich Results Test non segnala errori sul JSON-LD GeneralContractor di ogni pagina principale
2. Lighthouse mobile su PageSpeed Insights segna 95+ su Performance, Accessibility, SEO e Best Practices per Home, Servizi, Progetti e Contatti
3. Le pagine /privacy e /cookie-policy mostrano Titolare del trattamento completo (nome, sede, contatti, DPO se applicabile), finalità, base giuridica, conservazione, diritti GDPR e link reclamo Garante
4. Il sito è raggiungibile su dominio custom con HTTPS su Vercel produzione e il NAP è allineato con il Google Business Profile
5. Tutte le immagini hanno alt text non vuoto e la navigazione da tastiera raggiunge ogni link e form senza trappole di focus
   **Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase           | Plans Complete | Status      | Completed |
| --------------- | -------------- | ----------- | --------- |
| 1. Fondamenta   | 0/TBD          | Not started | -         |
| 2. Homepage     | 0/2            | Planned     | -         |
| 3. Servizi      | 0/TBD          | Not started | -         |
| 4. Portfolio    | 0/TBD          | Not started | -         |
| 5. Chi Siamo    | 0/TBD          | Not started | -         |
| 6. Contatti     | 0/TBD          | Not started | -         |
| 7. SEO e Launch | 0/TBD          | Not started | -         |
