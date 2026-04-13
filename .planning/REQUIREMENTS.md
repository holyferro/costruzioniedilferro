# Requirements: Sito Web Impresa Edile SRL

**Defined:** 2026-04-13
**Core Value:** Trasformare 45 anni di esperienza edile locale in lead qualificati ("Richiedi un sopralluogo") presentando un sito istituzionale sobrio, autorevole e veloce che converta privati, enti pubblici e professionisti.

## v1 Requirements

Requisiti per il rilascio iniziale. Ciascuno sarà mappato a una fase del roadmap.

### Fondamenta (FND)

- [ ] **FND-01**: Il progetto Next.js 16 App Router è inizializzato con TypeScript strict, Tailwind v4, pnpm e Vercel
- [ ] **FND-02**: La palette brand (grigio scuro / panna / blu brand) è definita come CSS token in `globals.css` via `@theme` Tailwind v4, con contrasto WCAG AA 4.5:1 verificato
- [ ] **FND-03**: La gerarchia componenti è stabilita: `components/ui`, `components/sections`, `components/business`, `components/layout`
- [ ] **FND-04**: I font istituzionali (Inter + IBM Plex Serif) sono caricati via `next/font` (self-hosted, zero GDPR exposure)
- [ ] **FND-05**: `content/site.ts` contiene NAP canonico (nome, indirizzo, telefono, email, PEC) usato da header, footer, JSON-LD e form
- [ ] **FND-06**: `content/legal.ts` contiene P.IVA, REA, capitale sociale, sede legale e viene renderizzato nel footer (D.Lgs. 70/2003 art. 7)
- [ ] **FND-07**: Il layout globale include header con CTA "Richiedi un sopralluogo" e footer istituzionale
- [ ] **FND-08**: Vercel Analytics (cookieless) è integrato in `app/layout.tsx` — nessun GA4, nessuno script di tracking terzo
- [ ] **FND-09**: Helper `lib/seo/metadata.ts` è disponibile per generare `generateMetadata` per ogni pagina
- [ ] **FND-10**: Pagina 404 personalizzata istituzionale

### Homepage (HOM)

- [ ] **HOM-01**: Hero above-the-fold con foto reale di cantiere, titolo autorevole, sottotitolo e CTA primaria "Richiedi un sopralluogo"
- [ ] **HOM-02**: Strip numerica trust signal: 45 anni / 30 dipendenti / N cantieri completati
- [ ] **HOM-03**: Sezione overview servizi con tile per i tre target (privati, enti pubblici, professionisti)
- [ ] **HOM-04**: Sezione trust con certificazioni SOA e ISO prominenti
- [ ] **HOM-05**: Link diretto al telefono (click-to-call) nell'header su mobile
- [ ] **HOM-06**: Barra sticky con CTA su mobile (client island minimo)
- [ ] **HOM-07**: Area di servizio territoriale dichiarata (Mestre, Venezia, provincia, Veneto)
- [ ] **HOM-08**: CTA finale "Richiedi un sopralluogo" prima del footer

### Servizi (SRV)

- [ ] **SRV-01**: Pagina `/servizi` con sezioni ancorabili per categoria di servizio
- [ ] **SRV-02**: Pannelli dedicati per i tre target: privati, enti pubblici, professionisti
- [ ] **SRV-03**: Sezione dedicata "Enti Pubblici" con menzione esplicita delle categorie SOA possedute (differenziatore)
- [ ] **SRV-04**: Descrizione servizi: nuove costruzioni, ristrutturazioni di pregio, opere pubbliche, urbanizzazioni
- [ ] **SRV-05**: CTA finale "Richiedi un sopralluogo" sulla pagina

### Portfolio (PRG)

- [ ] **PRG-01**: Pagina `/progetti` con griglia statica di progetti realizzati (10-20 iniziali)
- [ ] **PRG-02**: Pagine dettaglio per ogni progetto via `generateStaticParams` con slug ASCII kebab-case
- [ ] **PRG-03**: Filtri URL-driven (via `searchParams` RSC) per categoria e località
- [ ] **PRG-04**: Filtro per tipo committente (privato / ente pubblico / professionista) — differenziatore
- [ ] **PRG-05**: Ogni progetto mostra: foto, committente, tipologia, località, anno, descrizione
- [ ] **PRG-06**: Immagini progetto ottimizzate via `next/image` con alt text descrittivo obbligatorio (Zod validato)
- [ ] **PRG-07**: Open Graph image per-progetto per condivisione WhatsApp/social

### Chi Siamo (CHI)

- [ ] **CHI-01**: Pagina `/chi-siamo` con narrativa storica dell'azienda (45 anni, territorio, valori)
- [ ] **CHI-02**: Sezione certificazioni con card SOA e ISO e download PDF delle attestazioni
- [ ] **CHI-03**: Tabella leggibile delle categorie SOA possedute con descrizione umana — differenziatore
- [ ] **CHI-04**: Griglia mezzi di proprietà con immagini — differenziatore
- [ ] **CHI-05**: Sezione team con foto di gruppo e numero dipendenti
- [ ] **CHI-06**: CTA finale sulla pagina

### Contatti (CON)

- [ ] **CON-01**: Pagina `/contatti` con block multi-canale: telefono, email, PEC, indirizzo, orari
- [ ] **CON-02**: Form di contatto "Richiedi un sopralluogo" con React Hook Form + Zod + Turnstile + Resend
- [ ] **CON-03**: Validazione server-side dello schema Zod in Server Action prima dell'invio email
- [ ] **CON-04**: Verifica Turnstile server-side e honeypot field contro spam
- [ ] **CON-05**: Checkbox consenso privacy GDPR (non pre-selezionato) con validazione server-side
- [ ] **CON-06**: Notice inline GDPR Art. 13 visibile accanto al form (titolare, finalità, conservazione)
- [ ] **CON-07**: Stati form: loading, success (conferma), error (retry) con toast Sonner
- [ ] **CON-08**: Link `mailto:` e `tel:` funzionanti nella pagina
- [ ] **CON-09**: Mappa statica (AVIF screenshot) linkata a Google Maps — NO iframe embedded
- [ ] **CON-10**: Resend DNS verificato (SPF, DKIM, DMARC) per il dominio produzione
- [ ] **CON-11**: Orari di apertura e area di servizio dichiarati

### SEO & Launch (SEO)

- [ ] **SEO-01**: `generateMetadata` su ogni route con title, description, OG image dedicate
- [ ] **SEO-02**: `app/sitemap.ts` genera sitemap.xml completa al build time
- [ ] **SEO-03**: `app/robots.ts` con regole standard
- [ ] **SEO-04**: JSON-LD `GeneralContractor` validato via Google Rich Results Test, con NAP, service area, opening hours, certifications
- [ ] **SEO-05**: Canonical URL dichiarati su tutte le pagine (progetti filtrati → canonicalizzano `/progetti`)
- [ ] **SEO-06**: Pagina `/privacy` con Titolare del trattamento completo (nome, sede, contatti, DPO se applicabile), finalità, base giuridica, conservazione, diritti, link reclamo Garante
- [ ] **SEO-07**: Pagina `/cookie-policy` con elenco cookie tecnici (nessun tracking terzo)
- [ ] **SEO-08**: Footer istituzionale con P.IVA, REA, capitale sociale, sede legale su ogni pagina
- [ ] **SEO-09**: Lighthouse mobile ≥95 su Performance, Accessibility, SEO, Best Practices
- [ ] **SEO-10**: NAP allineato con Google Business Profile (audit pre-launch)
- [ ] **SEO-11**: Accessibilità WCAG 2.1 AA verificata (contrasti, alt text, keyboard nav, skip link, semantica)
- [ ] **SEO-12**: Deploy produzione su Vercel con dominio custom e HTTPS

## v2 Requirements

Rilasciati dopo l'MVP. Tracciati ma non nel roadmap corrente.

### Differenziatori avanzati
- **V2-DF-01**: Mappa SVG geolocalizzata dei cantieri sul territorio
- **V2-DF-02**: Download company profile PDF
- **V2-DF-03**: Timeline storica aziendale (evoluzione 45 anni)
- **V2-DF-04**: Sezione "Metodo di lavoro" con step di processo
- **V2-DF-05**: Testimonianze clienti verificate (se raccoglibili)

### Infrastruttura futura
- **V2-INF-01**: Headless CMS (Payload) per gestione autonoma progetti/news da parte del cliente
- **V2-INF-02**: Versione bilingue IT/EN con `next-intl`
- **V2-INF-03**: Area riservata cantieri attivi per committenti (portale clienti)
- **V2-INF-04**: Blog/news con categoria "cantieri pubblici" per SEO long-tail

## Out of Scope

Esclusioni esplicite. Documentate per prevenire scope creep.

| Feature | Motivo |
|---------|--------|
| Google Analytics 4 | Vietato da Garante (enforcement orders); usiamo Vercel Analytics cookieless |
| Google reCAPTCHA (qualsiasi versione) | Garante ruling su trasferimento dati USA; usiamo Cloudflare Turnstile |
| Google Maps iframe embedded | Carica cookie terzi → obbligo banner; usiamo screenshot statico linkato |
| Cookie banner | Non necessario: stack cookieless (no GA4, no embed, no tracking); documentato in `docs/gdpr.md` |
| Live chat widget | Contraddice brief istituzionale sobrio; canale preferito = form/telefono |
| Preventivatore / cost calculator online | Imprecisione dannosa per credibilità B2B edile |
| Video hero | Pesa sui Core Web Vitals mobile; contrasta con brief sobrio |
| Animated number counters / parallax / scroll-jacking | Trope SaaS vietati dal brief istituzionale |
| Testimonial carousel | Auto-rotating carousel è anti-pattern accessibility e credibilità |
| Newsletter signup | Fuori target B2B construction; canale preferito = sopralluogo diretto |
| Blog con un solo post / 3 post | Meglio nessun blog che un blog morto; deferrito a v2 |
| Framer Motion / animation library | Nessun bisogno reale; CSS transitions bastano |
| Headless CMS per MVP | 5 pagine + 10-20 progetti non giustificano overhead CMS; static TS data + redeploy |
| Stock photos generici di cantieri | Distruggono credibilità; richiediamo foto reali al cliente |
| Social login / utente area / portale clienti | Fuori scope istituzionale MVP |
| Multilingua IT/EN | Target territoriale italiano; bilingue solo in v2 |

## Traceability

Quali fasi coprono quali requirements. Aggiornato durante creazione roadmap.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FND-01 | Phase 1 | Pending |
| FND-02 | Phase 1 | Pending |
| FND-03 | Phase 1 | Pending |
| FND-04 | Phase 1 | Pending |
| FND-05 | Phase 1 | Pending |
| FND-06 | Phase 1 | Pending |
| FND-07 | Phase 1 | Pending |
| FND-08 | Phase 1 | Pending |
| FND-09 | Phase 1 | Pending |
| FND-10 | Phase 1 | Pending |
| HOM-01 | Phase 2 | Pending |
| HOM-02 | Phase 2 | Pending |
| HOM-03 | Phase 2 | Pending |
| HOM-04 | Phase 2 | Pending |
| HOM-05 | Phase 2 | Pending |
| HOM-06 | Phase 2 | Pending |
| HOM-07 | Phase 2 | Pending |
| HOM-08 | Phase 2 | Pending |
| SRV-01 | Phase 3 | Pending |
| SRV-02 | Phase 3 | Pending |
| SRV-03 | Phase 3 | Pending |
| SRV-04 | Phase 3 | Pending |
| SRV-05 | Phase 3 | Pending |
| PRG-01 | Phase 4 | Pending |
| PRG-02 | Phase 4 | Pending |
| PRG-03 | Phase 4 | Pending |
| PRG-04 | Phase 4 | Pending |
| PRG-05 | Phase 4 | Pending |
| PRG-06 | Phase 4 | Pending |
| PRG-07 | Phase 4 | Pending |
| CHI-01 | Phase 5 | Pending |
| CHI-02 | Phase 5 | Pending |
| CHI-03 | Phase 5 | Pending |
| CHI-04 | Phase 5 | Pending |
| CHI-05 | Phase 5 | Pending |
| CHI-06 | Phase 5 | Pending |
| CON-01 | Phase 6 | Pending |
| CON-02 | Phase 6 | Pending |
| CON-03 | Phase 6 | Pending |
| CON-04 | Phase 6 | Pending |
| CON-05 | Phase 6 | Pending |
| CON-06 | Phase 6 | Pending |
| CON-07 | Phase 6 | Pending |
| CON-08 | Phase 6 | Pending |
| CON-09 | Phase 6 | Pending |
| CON-10 | Phase 6 | Pending |
| CON-11 | Phase 6 | Pending |
| SEO-01 | Phase 7 | Pending |
| SEO-02 | Phase 7 | Pending |
| SEO-03 | Phase 7 | Pending |
| SEO-04 | Phase 7 | Pending |
| SEO-05 | Phase 7 | Pending |
| SEO-06 | Phase 7 | Pending |
| SEO-07 | Phase 7 | Pending |
| SEO-08 | Phase 7 | Pending |
| SEO-09 | Phase 7 | Pending |
| SEO-10 | Phase 7 | Pending |
| SEO-11 | Phase 7 | Pending |
| SEO-12 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 59 totali
- Mapped to phases: 59
- Unmapped: 0

---
*Requirements defined: 2026-04-13*
*Last updated: 2026-04-13 — traceability expanded a requirement individuale dopo creazione roadmap*
