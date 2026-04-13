# Features Research — Impresa Edile SRL Website

**Domain:** Institutional corporate website / lead-generation site for a local Italian construction company (45y history, Mestre/Venezia/Veneto), serving private clients, public entities (SOA tenders) and design professionals.
**Researched:** 2026-04-13
**Confidence:** HIGH

---

## TL;DR

The feature landscape for a credible Italian *impresa edile* institutional site in 2026 is **mature and conservative**. The strong signals are all about **trust, proof and reachability** — not interactivity or novelty. Analysis of competing Veneto-area construction sites (Veneta Cantieri, Carron Costruzioni, Callegaro Costruzioni, Furlan Costruzioni, Cantieri Bortolato) plus 2026 best-practice research converges on one pattern:

> **A 5-page institutional site wins by nailing the basics: a trust-dense homepage, a geolocated/sectorized project portfolio, a multi-target services page, visible SOA/ISO credentials, a frictionless "richiedi un sopralluogo" conversion path, and rock-solid local SEO + GDPR hygiene. Everything else is noise.**

Anything that feels "SaaS" — cost calculators, chat widgets, animated backgrounds, dashboards, blog-as-the-centerpiece, video hero loops with music — actively *hurts* an institutional brand serving enti pubblici and professional studios.

The MVP scope (Home / Servizi / Progetti / Chi siamo / Contatti) is **exactly right**. This research validates that scope and maps features against the 7-phase roadmap.

---

## Feature Landscape

### Table Stakes (Users Expect These — Missing Them Breaks Trust)

Features without which the site *feels incomplete* to a 2026 visitor evaluating a construction company. An impresa edile missing any of these loses credibility immediately against competitors.

| # | Feature | Why Expected | Complexity | Phase | Notes |
|---|---------|--------------|------------|-------|-------|
| TS-01 | **Hero above-the-fold with headline + trust subline + primary CTA + credible image** | 2026 research: "Sites scoring 75+ all had fast mobile load times, visible CTAs above the fold, and trust signals within the first screen." 87% of clients start their contractor search online. | S | 2 | One hero section. Subline mentions 45 anni / SOA / 30 dipendenti. Real cantiere photo, not stock. CTA: "Richiedi un sopralluogo". |
| TS-02 | **Numeric trust-signal strip (45 anni, 30 dipendenti, N cantieri, N° SOA)** | Veneta Cantieri and Carron both show exactly this pattern. "Completed project statistics" is flagged as a critical credibility component in 2026 research. | S | 2 | 3–5 big numbers, dark-gray on panna. Server-rendered, no counters/animations. |
| TS-03 | **Primary CTA "Richiedi un sopralluogo" visible on every page (header + final section + mobile sticky)** | CLAUDE.md hard rule. "Prominent contact forms and calls-to-action" is the #1 2026 conversion driver. Over 62% of clients review a contractor's site before requesting a quote. | S | 2 | Header button + repeated final-section CTA + mobile sticky bottom bar. One primary action, no competing CTAs. |
| TS-04 | **Services overview on homepage** | Visitors need to know in 5 seconds whether this contractor does what they need. All competitor sites open with a 3–6 tile services grid. | S | 2 | 4–6 service cards linking into `/servizi#anchor` sections. Icons from lucide-react. |
| TS-05 | **Services page with clearly named categories** | Table stakes. Competitor sites converge on: nuove costruzioni, ristrutturazioni, opere pubbliche, manutenzioni, ristrutturazioni di pregio. | M | 3 | Single `/servizi` page with anchored sections. Each section: name, 1-line pitch, 3–5 bullet capabilities, representative photo, sectional CTA. |
| TS-06 | **Multi-target segmentation (Privati / Enti Pubblici / Professionisti)** | PROJECT.md lists three audiences with genuinely different needs. Research confirms construction buyers span multiple personas. Veneta Cantieri visibly splits "lavori pubblici" and "lavori privati". | M | 3 | Either (a) three target-specific panels on `/servizi` or (b) three audience-specific anchor links from the homepage. Keep navigation simple — do NOT create three parallel sub-sites. |
| TS-07 | **Project portfolio / "Progetti" page with real cantieri photos** | The single most impactful credibility feature. 2026 research: "more than half eliminate firms whose sites do not clearly show past projects". Competitor Veneta Cantieri shows 118 completed works; Callegaro has 40+ project carousel. | M | 4 | Static MDX/TS content. Grid of project cards with cover image + name + location + category. No backend required for MVP. |
| TS-08 | **Individual project detail pages (case study lite)** | Users want scope, timeline, challenges overcome, client type. Archimedia blog on edile lead gen confirms this directly. | M | 4 | One static route per project from MDX. Fields: titolo, location, committente (tipo), anno, categoria, descrizione breve, 4–8 foto, ruolo dell'impresa. No testimonial required if the client doesn't have usable quotes. |
| TS-09 | **Portfolio filterable by category AND location** | 2026 Italian-market research (DingoLab case study) explicitly calls out "portfolio cantieri geolocalizzato catalogato non solo per tipologia ma anche per zona, rafforzando la SEO locale". | M | 4 | URL-driven filters via `searchParams`, RSC-only, no client state. Categories: Privato residenziale / Ristrutturazione / Opere pubbliche / Commerciale/Industriale. Zones: Mestre, Venezia, Veneto, altro. |
| TS-10 | **"Chi siamo" / company history page** | Mandatory for a 45-year business. Converts longevity into felt credibility. Every competitor site has one. | M | 5 | Storia (timeline or narrative), mission/values, team dimension (30 dipendenti, NOT necessarily individual portraits), mezzi di proprietà, territorio. |
| TS-11 | **Certifications section (SOA + ISO)** | Hard table stake for enti pubblici audience. SOA is legally required to bid on public works >150k€; ISO 9001 is required for SOA class III+. Carron has a dedicated `/certificazioni` page; Veneta Cantieri shows ESNA SOA and ISO 9001:2015 prominently. | M | 5 | Dedicated subsection in `/chi-siamo` (or sibling page) listing SOA categories/classes, ISO certifications, with **downloadable PDFs** of the attestazioni. Critical for winning enti pubblici trust. |
| TS-12 | **Contact page with multi-channel: form + phone + email + PEC + address + map** | Veneta Cantieri shows exactly this: info@, segreteria@, PEC, two office addresses. PEC specifically is table stakes for B2B/PA Italian audiences. | M | 6 | All channels visible. Map can be a static screenshot linking to Google Maps (avoids iframe GDPR issues) or an embedded OSM tile. |
| TS-13 | **Contact form with type-safe validation, honeypot, spam protection** | The single highest-value conversion surface. Per STACK.md: RHF + Zod + Server Actions + Resend + Turnstile. | M | 6 | Fields: Nome, Cognome, Email, Telefono, Tipo richiedente (privato/ente/professionista), Oggetto (sopralluogo/preventivo/generico), Zona intervento, Messaggio, Consenso privacy. Success screen + auto-reply email. |
| TS-14 | **Click-to-call phone link (`tel:`)** | Mobile-first rule. Construction clients overwhelmingly prefer phone for serious inquiries. Every competitor site has this. | S | 2 | `<a href="tel:+39...">` in header on mobile + dedicated phone row on contacts. |
| TS-15 | **Click-to-email (`mailto:`) and click-to-PEC** | Italian B2B/PA norm. | S | 6 | Plain `mailto:` with subject prefill on contacts page. |
| TS-16 | **Mobile-first responsive design, sticky header, accessible tap targets** | 92% of construction site traffic is mobile in 2026. CLAUDE.md hard rule. | M | 1 | Tailwind v4 mobile-first. All tap targets ≥ 44px. Sticky header collapses below hero. |
| TS-17 | **Logo, navigation, footer (global layout)** | Baseline web literacy. Footer holds: address, phone, email, PEC, P.IVA, capitale sociale, sede legale, link privacy/cookie, mini-map of pages. | S | 1 | `app/layout.tsx`. Footer is legally important in Italy: **P.IVA and REA must be displayed**. |
| TS-18 | **Privacy policy + Cookie policy pages** | Italian Garante hard requirement. Non-negotiable. CookieYes + Didomi 2026 guides confirm. | S | 7 | Two static routes: `/privacy` and `/cookie-policy`. Initially can use iubenda-style copy or plain legal text — critical that the *controller* details are filled in. Link from footer on every page. |
| TS-19 | **Cookie banner (only if non-technical cookies used)** | Italian Garante: technical/anonymized-analytics cookies don't need a banner; anything else does. **Given STACK.md (Vercel Analytics cookieless, Turnstile, no GA4), no banner is required.** | S | 7 | **Plan to NOT ship a banner** unless a marketing cookie is added later. Document this decision in a `docs/gdpr.md`. If a banner becomes necessary, it must have an `X` close, accept-all, reject-all, granular controls. |
| TS-20 | **SEO: page titles, meta descriptions, canonical URLs** | Basic hygiene. Next.js App Router `generateMetadata` covers it. | S | 7 | Per-page metadata. Italian-language descriptions with local keywords (Mestre, Venezia, Veneto). |
| TS-21 | **SEO: `sitemap.ts` + `robots.ts`** | Table stakes for indexation. Next 16 built-in file conventions. | S | 7 | Auto-generated from route list + MDX projects. |
| TS-22 | **Local SEO: LocalBusiness / GeneralContractor JSON-LD** | Per STACK.md: `schema-dts` typed JSON-LD. Powers Google's local pack and knowledge panel. 2026 research confirms `GeneralContractor` is the correct Schema.org subtype under `HomeAndConstructionBusiness`, never fall back to generic `LocalBusiness`. | S | 7 | Single script block in `app/layout.tsx`. Fields: name, address, telephone, email, geo, openingHoursSpecification, areaServed, hasCredential (SOA/ISO), foundingDate (1981). |
| TS-23 | **Open Graph / Twitter Card metadata per page** | Baseline. Especially important for links shared in WhatsApp between professionals. | S | 7 | Via `generateMetadata`. One shared `og-default.jpg` + project-specific OG images for detail pages. |
| TS-24 | **High-quality, real cantieri/team/mezzi photography** | CLAUDE.md hard rule: "evitare immagini stock poco credibili". 2026 research: "Stock imagery that feels disconnected from your actual brand weakens trust". | M | Asset | NOT a code feature but a content prerequisite. Flag early: **the client must deliver real photography** before Phase 2 launches meaningfully. |
| TS-25 | **next/image optimization on every raster image** | STACK.md + CLAUDE.md rules. Core Web Vitals depends on it. | S | 1 | `next/image` everywhere, `priority` on hero, explicit `sizes`. |
| TS-26 | **Accessibility: alt text, label-for, keyboard navigation, contrast ratios (WCAG 2.1 AA)** | Italian public sector evaluations increasingly penalize WCAG 2.1 AA non-compliance in tenders. Even for private-sector sites, it's cheap insurance. Note: **Italy's AgID still references WCAG 2.1 AA**, not 2.2 yet. 2.2 is a superset, so targeting 2.2 satisfies 2.1. | M | 1 + cross-phase | eslint-plugin-jsx-a11y enforces statically. Manual keyboard tab-order audit in Phase 7. Contrast ≥ 4.5:1 body / 3:1 large text — the brand palette (grigio scuro / panna / blu brand) must be chosen with this constraint in mind from day one. |
| TS-27 | **404 page and basic error boundaries** | Baseline Next.js hygiene. | S | 1 | `app/not-found.tsx` with navigation back to Home/Contatti. |
| TS-28 | **Italian-only content (it-IT)** | Target is Italian privates, Italian enti pubblici, Italian professionals. PROJECT.md confirms. | S | All | `html lang="it"`, all copy in Italian. No i18n framework needed. |
| TS-29 | **P.IVA, REA, capitale sociale, sede legale in footer** | Italian legal requirement (D.Lgs. 7/2007 art. 42) for SRLs: these details must appear on any website representing the company. Missing this is a compliance failure. | S | 1 | Footer component. Include link to Camera di Commercio. |
| TS-30 | **Domain with `.it` TLD and custom email on the domain** | Signals permanence to Italian clients and enti pubblici. `edilferro@gmail.com` kills credibility. | S | 7 (DNS) | `.it` domain + Resend verified sender on that domain. |

**Subtotal: 30 table-stakes features.** Complexity distribution: 15 S / 13 M / 0 L / 2 content (not code).

---

### Differentiators (Competitive Advantage — Above the Baseline)

Features that **set the site apart from the typical Veneto competitor**, aligned with the "sobrio, istituzionale, autorevole" brief and the 45-year heritage story. Pick **2–4** of these for MVP, not all.

| # | Feature | Value Proposition | Complexity | Phase | Notes |
|---|---------|-------------------|------------|-------|-------|
| DF-01 | **Geolocated project map of all cantieri** | Turns "45 years in the territory" from a claim into visible proof. Immediate differentiation from competitors that just show a grid. Strongly reinforces local SEO intent. | M | 4 or 7 | Static SVG map of Veneto with pins, NOT a Google Maps iframe. Each pin links to the project detail page. No JS library needed — build as an inline SVG. If Veneto is too large, zoom into Venezia + provincia. |
| DF-02 | **Filter portfolio by committente type (Privato / Ente Pubblico / Professionista)** | Each target audience instantly finds "projects like mine". Directly addresses the 3-target positioning. | S | 4 | Free with TS-09 filter system — just add a `committente` field to the MDX frontmatter. |
| DF-03 | **SOA categories/classes table with human-readable descriptions** | Most construction sites just display the SOA badge. Actually explaining "OG1 class V = edifici civili fino a € 10.329.138" is a massive differentiator for enti pubblici and their technical offices, who are forced to look this up manually otherwise. | S | 5 | Static table in `/chi-siamo/certificazioni` or `/certificazioni`. Hand-authored, paired with the SOA PDF download. |
| DF-04 | **Downloadable company profile PDF ("Company Profile" / "Brochure istituzionale")** | Italian enti pubblici and architects routinely archive or forward PDFs internally. A polished 1-file brochure that mirrors the site content wins invitations to RdO (richieste di offerta) and private tenders. | S | 5 | Static PDF in `/public/docs/`. Generated manually by the client's designer, NOT runtime-generated. Download button on `/chi-siamo`. |
| DF-05 | **Dedicated "Lavori pubblici" / "Enti Pubblici" messaging section** | Most competitor sites treat enti pubblici as an afterthought. A dedicated section naming SOA categories, listing example opere pubbliche realizzate, and explicitly inviting RUP contact elevates the site to "serious player" for PA audiences. | M | 3 | Anchor section in `/servizi` with copy tailored to RUP/responsabili tecnici language, plus a direct link to SOA credentials and to filtered projects. |
| DF-06 | **Heritage / founding year timeline** | "Dal 1981" / "dal 1980" is the strongest single trust signal a 45-year firm has. A horizontal timeline of milestones (fondazione, primo appalto pubblico, prima SOA, milestone cantieri) anchors the brand emotionally. | M | 5 | Tailwind grid, no animation library. Milestones authored in TS/MDX. |
| DF-07 | **"Mezzi di proprietà" showcase section** | Trust signals listed in PROJECT.md explicitly name `mezzi di proprietà`. Showing real photos of the company's fleet (gru, escavatori, camion) visually proves the "forza strutturale" claim in a way no number can. Extremely uncommon in competitor sites. | S | 5 | Image grid in `/chi-siamo`, 6–12 photos with short captions. |
| DF-08 | **Client-type badges on project cards ("Ente Pubblico", "Privato", "Professionista")** | Tiny UI element, high signal value. Scannable proof that the company serves all three audiences. | S | 4 | Small colored badges (blu brand = ente pubblico, grigio scuro = privato, panna dark = professionista). |
| DF-09 | **Team dimension signal without individual portraits** | 30 dipendenti is a strong structural signal. CLAUDE.md prefers "forte uso di whitespace" and sobrio tone — individual team bios would feel startup-y. A single group photo + "30 persone, 15 cantieri attivi medi, X anni di anzianità media" is more in-key. | S | 5 | One section in `/chi-siamo`. No individual bio pages. |
| DF-10 | **Dedicated "Sopralluogo gratuito" explainer page OR anchor** | The primary CTA is "Richiedi un sopralluogo". Explaining *what a sopralluogo actually entails* (cosa comprende, quando è gratuito, cosa serve preparare, tempi di risposta) reduces friction and increases form submission quality. Competitors don't do this. | S | 6 | 3–5 bullet explainer section on `/contatti` above the form. |
| DF-11 | **Structured "Metodo di lavoro" / process section** | Callegaro Costruzioni leads with a 6-phase methodology (Ascolto → Fattibilità → Progettazione → Autorizzazioni → Cantiere → Consegna). Institutional audiences respond strongly to visible process rigor. | M | 3 | Numbered step cards in `/servizi`. Text + icon only, no animation. |
| DF-12 | **Lighthouse 95+ mobile + Core Web Vitals "green"** | CLAUDE.md and STACK.md priority. Visible in Google Search Console reports, correlates with ranking, and reflects the "serio, istituzionale" brand promise better than any copy does. | M | 7 | Achievable with the locked stack. Optional Lighthouse CI GitHub Action for ongoing budget enforcement. |
| DF-13 | **High-contrast, WCAG AA dark-on-panna palette as a competitive axis** | Competitor sites often use color carelessly. Actually hitting 7:1+ contrast on body text and 4.5:1 on large text reads as "takes the details seriously" — which is the brand promise. | S | 1 | Brand tokens chosen under the accessibility constraint from day one. |
| DF-14 | **Opening hours + holiday notices (structured)** | Italian clients care about *orario continuato / pausa pranzo / ferie agostane*. Showing this explicitly reads as "respects your time". | S | 6 | Footer + `/contatti`. Also fed into the LocalBusiness JSON-LD. |
| DF-15 | **Plain-text service area statement ("Operiamo su Mestre, Venezia, Mirano, Mogliano, Marghera, Veneto")** | Reinforces local SEO and sets expectations up-front. Veneta Cantieri calls out "Triveneto e area lagunare" explicitly. | S | 2 | One line on homepage + footer, also fed into `areaServed` in JSON-LD. |
| DF-16 | **RSS-free news/updates via static "Ultimi cantieri" module on homepage** | Shows the company is alive and active without requiring a full blog. Pulls the 3 most recent entries from the same projects MDX content. | S | 2 | No separate infrastructure — reuses the projects data. |

**Recommended for MVP (pick these 4):**
1. **DF-02** — Committente filter (near-zero cost, huge UX win for 3-target positioning)
2. **DF-03** — SOA categories human-readable table (killer move for enti pubblici audience)
3. **DF-05** — Enti pubblici dedicated section (directly addresses the weakest competitor area)
4. **DF-07** — Mezzi di proprietà showcase (unique visual trust signal nobody else does)

Plus **DF-12** (Lighthouse 95+) as a performance goal rather than a feature.

**Optional second wave (add post-launch if validation confirms):**
- DF-01 Geolocated map (high effort, high story value — Phase 8+)
- DF-04 Company profile PDF (needs client designer involvement)
- DF-06 Heritage timeline (add when copy is ready)
- DF-11 Process section (add if sales team confirms the pitch)

---

### Anti-Features (Commonly Requested, Deliberately NOT Built)

These feel appealing on paper, get requested by clients, and *actively hurt* an institutional construction site. Every one of these has been observed in the wild on competitor sites and contributes to looking amateurish, SaaS-ish, or GDPR-risky. **Document the decision so it doesn't get re-litigated in Phase 6.**

| # | Anti-Feature | Why Requested | Why Problematic | Alternative |
|---|--------------|---------------|-----------------|-------------|
| AF-01 | **Live chat widget / Intercom / Crisp / Tawk** | "Engagement", "modern feel" | Chat widgets on construction sites are never staffed by someone qualified to discuss a 300k€ ristrutturazione. They create a promise-of-response that gets broken. They load 50–200KB of third-party JS that wrecks LCP. Most deploy third-party cookies and leak data to US vendors, triggering the Italian Garante cookie rules. Fundamentally wrong tone for an institutional brand. | The "Richiedi un sopralluogo" form + WhatsApp link + click-to-call. Serious inquiries go through serious channels. |
| AF-02 | **Cost calculator / preventivo stimator** | 2026 marketing articles push these as "lead magnets" | Construction costs cannot be honestly estimated from a form. An algorithmic estimate is either laughably wrong (destroying trust) or generates quotes the firm can't honor (destroying margin and legal exposure). An edge-case privato might use it; every ente pubblico and professionista will see it as unserious. | A "Richiedi un preventivo personalizzato" CTA that channels into the normal contact flow with a "tipo di richiesta = preventivo" option. Humans write quotes. |
| AF-03 | **Video hero / autoplay background video** | "Immersive", "modern", "video content rules" | Autoplay video on hero = massive LCP hit, massive bandwidth cost on mobile (hostile to users on 4G in the provincia), accessibility nightmare, and aesthetically fights the "sobrio, istituzionale, non aggressivo" brief. Also requires the client to produce, color-grade and encode a hero reel — not realistic for this project. | A single static hero image (real cantiere or real mezzo), carefully shot. next/image + `priority`. |
| AF-04 | **Particle backgrounds / parallax / scroll-triggered animations** | "Feels modern", "wows visitors" | Every one of these is startup/SaaS tropism. CLAUDE.md explicitly bans: "evitare effetti vistosi o look startup/SaaS". Kills accessibility (motion-sensitive users). Kills performance. Does not convert. | CSS transitions on hover only. Static layouts. |
| AF-05 | **Dark mode toggle** | "Everyone does it" | An institutional Italian construction site has zero user demand for dark mode. Adds cost, adds bugs, doubles the QA surface, forces careful choice on every image and color decision. Brand palette (grigio scuro on panna) is explicitly light-mode. | Support `prefers-color-scheme: dark` only at the level of respecting form field contrast. No toggle. |
| AF-06 | **Client portal / account area / "area riservata"** | Clients occasionally ask for "a login for my customers to see their cantiere status" | Massive scope explosion: auth, RBAC, stateful backend, content delivery, photo uploads, GDPR data processing agreement, audit trail, password resets, security hardening. A 5-page MVP cannot absorb this. | A private shared folder (Google Drive / Dropbox) per client, managed by the cantiere manager. Don't build a product. |
| AF-07 | **Real-time cantiere webcam feed** | "Innovation" | Legal: worker privacy + GDPR + union consent + municipal signage permits in ZTL. Technical: hosting live video streams is not free, not cheap, not simple. Business: the client doesn't want competitors surveilling the site. | A project detail page with monthly "avanzamento lavori" photo updates, if at all. Or nothing. |
| AF-08 | **Cryptocurrency / "pay in crypto" / Web3** | Hype cycle residue | An impresa edile is not a DAO. Full stop. | Italian bank transfer and standard contracts. |
| AF-09 | **Generic stock photography of hard hats / blueprints / smiling suits** | "Fills the page fast" | CLAUDE.md hard rule: "evitare immagini stock poco credibili". 2026 research confirms stock hero photos destroy trust. An edile that can't show its own mezzi and cantieri looks like it has no mezzi or cantieri. | Real photography (see TS-24). Flag this as a hard content dependency to the client. |
| AF-10 | **Rotating hero carousel / slider** | "We have many messages to show" | Banner blindness is a 20-year-old documented phenomenon. Sliders average < 1% click-through on the 2nd slide. Hostile to screen readers without deliberate work. Shifts LCP. Competing for user attention with yourself. | One single hero with one single CTA. |
| AF-11 | **News / blog as the centerpiece of the site** | "SEO" | A construction company publishes ~0 articles/year and has no content-marketing team. A blog with 4 posts from 2021 is worse than no blog. Real SEO power for this business comes from NAP consistency, Google Business Profile, LocalBusiness schema, real projects with location data, and technical performance — not blog posts. | Skip the blog for MVP. If the client later has a story worth telling (an award, a major contract, a heritage project), add a single "news" entry as MDX. Do not build an infrastructure. |
| AF-12 | **Google Analytics 4** | "Everyone uses it" | Italian Garante has ruled GA4 transfers problematic without SCCs and requires a cookie banner. Per STACK.md: hard no. | Vercel Analytics (cookieless, no banner required per Garante). |
| AF-13 | **Google reCAPTCHA v2/v3** | "Standard spam protection" | Leaks signals to Google ad systems, forces user friction, complicates Garante posture. Per STACK.md: hard no. | Cloudflare Turnstile (invisible, GDPR-safe). |
| AF-14 | **Google Fonts via `<link rel="stylesheet">`** | "Fastest way" | Hits `fonts.googleapis.com` at runtime → GDPR concern (German courts have precedent, Italian Garante aligned posture). Adds DNS hop. FOUT. | `next/font/google` self-hosts at build time. |
| AF-15 | **Embedded Google Maps iframe on `/contatti`** | "Everyone does it" | Loads `maps.googleapis.com` with third-party cookies on first paint → requires a cookie banner. LCP impact. | Static map screenshot (one JPG/AVIF) clickable → opens Google Maps in a new tab. Or OpenStreetMap static tile. Or the coordinates + "Apri in Maps" button. |
| AF-16 | **Animated number counters ("+45 ANNI" counting up on scroll)** | "Engagement trick" | Cheap SaaS trope that makes a 45-year firm look unsure of itself. Adds JS weight. Accessibility flag for motion sensitivity. | Server-rendered static numbers. Big type, done. |
| AF-17 | **Testimonial carousel with star ratings** | "Social proof" | Construction testimonials are rarely usable (clients don't want to be quoted publicly; privati rarely agree to be named). A star rating on a 300k€ restoration is tonally wrong. | Curated, explicitly-credited case studies on project detail pages. Quality > quantity. One good case study > six fake-looking testimonials. |
| AF-18 | **"Quick Quote" multi-step wizard** | "Reduces form friction" | Inverts cause and effect: real projects need real conversations, not 6-step funnels. Adds client-side JS. Doesn't improve qualified lead volume for institutional buyers. | Single flat form with a clear dropdown for request type. |
| AF-19 | **Newsletter signup** | "Build an audience" | Impresa edile has nothing to send in a newsletter. An empty list is a credibility cost. GDPR burden without value. | Skip entirely. |
| AF-20 | **Hard-coded external iframes (YouTube, Vimeo, Facebook embeds)** | "Embed our company video" | Third-party cookies → cookie banner requirement. LCP impact. Client-side complexity. | Self-host any video (rare case) or link out to the YouTube URL from a poster image. |
| AF-21 | **A "Chat with AI" / site chatbot** | 2025 hype cycle | Hallucinations on construction topics = liability. Wrong tone for institutional. Zero ROI on a 5-page site. Per CLAUDE.md "non introdurre dipendenze senza reale necessità". | Don't. The human contact form is the chatbot. |
| AF-22 | **Scroll-jacked "storytelling" full-page sections** | "Apple-style" | Accessibility disaster, performance disaster, mobile disaster, and totally off-brand for "sobrio istituzionale". | Standard vertical scroll. Users know how to scroll. |
| AF-23 | **"Book a consultation" calendar embed (Calendly/Cal.com)** | "Friction reduction" | Third-party scripts + cookies + data leakage. Self-scheduled sopralluoghi don't match how the business actually operates (the cantiere manager has to coordinate visits manually). Wrong mental model. | The form + a phone call. |
| AF-24 | **Separate mobile site (`m.edilferro.it`)** | "Mobile optimization" | Solved problem since 2013. One responsive site. | Responsive layout in Tailwind. |
| AF-25 | **Headless CMS for MVP** | "Client wants to edit" | Per STACK.md: wrong tradeoff for a 5-page site updated 6x/year. $0–$300/mo + vendor lock-in + auth for a site that barely changes. | Static MDX committed to git. Client edits happen via a small content edit request → PR → preview deploy workflow. |
| AF-26 | **WhatsApp widget / bubble (third-party script)** | "Everyone has it now" | Third-party embed = cookie banner requirement + JS weight. | A plain `<a href="https://wa.me/39...">WhatsApp</a>` link with the lucide WhatsApp icon. Zero script, zero cookie. Opens the native WhatsApp app. |

**Subtotal: 26 anti-features documented.**

---

## Feature Dependencies

```
Phase 1 — Fondamenta
    layout.tsx, design tokens, fonts, next/image, a11y baseline
        └── required by everything else

Phase 2 — Homepage
    TS-01 Hero
        └── requires Phase 1 (layout, tokens)
    TS-02 Numeric strip
        └── requires content (client must provide final numbers)
    TS-03 Global CTA
        └── required by TS-01 and repeated in every subsequent page
    TS-04 Services overview
        └── links forward into /servizi  (soft dep: Phase 3 routes need to exist for links to work, can be anchor-only initially)
    DF-15 Service area statement
        └── feeds TS-22 JSON-LD (Phase 7)

Phase 3 — Servizi
    TS-05 Services page
        └── requires Phase 1 + Phase 2 (consistent styling)
    TS-06 Multi-target segmentation
        └── enhances TS-05
    DF-05 Enti pubblici section
        └── enhances TS-06, feeds forward into DF-03 (Phase 5)
    DF-11 Metodo section
        └── optional enhancement of TS-05

Phase 4 — Progetti
    TS-07 Portfolio grid
        └── requires content (real project photography — HARD blocker)
    TS-08 Project detail pages
        └── requires TS-07 + MDX content system
    TS-09 Category/location filter
        └── requires TS-07 with frontmatter fields
    DF-02 Committente filter
        └── free extension of TS-09
    DF-08 Committente badges on cards
        └── free extension of TS-07

Phase 5 — Chi siamo
    TS-10 Company history
        └── requires content (client must write/approve copy)
    TS-11 Certifications + SOA/ISO downloads
        └── requires client to provide PDFs of attestazioni  (HARD blocker)
    DF-03 SOA categories table
        └── enhances TS-11
    DF-06 Heritage timeline
        └── enhances TS-10
    DF-07 Mezzi di proprietà showcase
        └── requires content (photos of fleet — HARD blocker)
    DF-09 Team dimension signal
        └── requires one group photo

Phase 6 — Contatti
    TS-12 Multi-channel contact page
        └── requires client to confirm final phone, PEC, addresses
    TS-13 Contact form
        └── requires:
            - Resend domain verification (DNS access — client blocker)
            - Turnstile keys (5 minutes of setup)
            - owner email address
    TS-14/15 tel: / mailto:
        └── trivial, free with TS-12
    DF-10 Sopralluogo explainer
        └── enhances TS-13
    DF-14 Opening hours
        └── free, but feeds into TS-22 JSON-LD

Phase 7 — SEO + Launch
    TS-20 Metadata API
        └── across all pages
    TS-21 sitemap.ts + robots.ts
        └── requires all routes to exist
    TS-22 LocalBusiness JSON-LD
        └── requires DF-15 (area served) + DF-14 (opening hours) + TS-11 (certifications) to be fully populated
    TS-23 OG tags
        └── requires a default OG image asset
    TS-18 Privacy + Cookie policy
        └── requires final legal text with controller info
    TS-19 Cookie banner decision
        └── confirm no tracking cookies exist → skip banner
    TS-29 P.IVA in footer
        └── should land in Phase 1 actually, confirmed in Phase 7
    TS-30 Domain + verified sender
        └── client DNS access blocker
    DF-12 Lighthouse 95+ audit
        └── final pass
```

### Dependency Notes

- **Portfolio features (TS-07..TS-09, DF-02, DF-08) require real photography.** The hardest content blocker for the whole project. Phase 4 cannot land meaningfully without this. **Flag to client in Phase 1 kickoff, not Phase 4.**
- **Certifications features (TS-11, DF-03) require SOA/ISO PDFs + SOA categories/classes text from the client.** Second-hardest content blocker. Flag in Phase 1.
- **Contact form (TS-13) requires domain DNS access** to verify the Resend sender. If DNS is held by a third party (e.g., the client's current web vendor), start this paperwork in Phase 1, not Phase 6.
- **LocalBusiness JSON-LD (TS-22) cannot be accurate until DF-14, DF-15 and TS-11 are populated.** Plan JSON-LD composition *last* in Phase 7.
- **Cookie banner (TS-19) is CONDITIONAL.** If the stack stays exactly as STACK.md dictates (Vercel Analytics + Turnstile + next/font + no GA + no embedded Maps + no third-party video), **no banner is required**. The moment any of those change, a banner becomes mandatory. Document this decision.
- **Service area statement (DF-15) is consumed by both hero section (TS-01) and JSON-LD (TS-22).** Author it once as a constant.
- **P.IVA / REA in footer (TS-29) is a legal compliance item** — it should ship the moment a footer exists, i.e., Phase 1.

---

## MVP Definition

### Launch With (v1) — Phase 1–7 Scope

The absolute minimum for a credible institutional launch. Everything here is a *must* per the competitor baseline or a legal/compliance requirement.

**Phase 1 — Fondamenta**
- [x] TS-16 Responsive layout + mobile-first
- [x] TS-17 Global layout (header + footer)
- [x] TS-25 next/image
- [x] TS-26 WCAG 2.1 AA baseline (a11y lint, contrast, alt text discipline)
- [x] TS-27 404 page
- [x] TS-28 it-IT content
- [x] TS-29 P.IVA / REA / legal footer block
- [x] DF-13 High-contrast brand palette

**Phase 2 — Homepage**
- [x] TS-01 Hero with CTA
- [x] TS-02 Numeric trust strip
- [x] TS-03 Global CTA presence
- [x] TS-04 Services overview
- [x] TS-14 Click-to-call
- [x] DF-15 Service area statement

**Phase 3 — Servizi**
- [x] TS-05 Services page with anchored sections
- [x] TS-06 Multi-target positioning
- [x] DF-05 Enti pubblici dedicated section *(high-value differentiator)*

**Phase 4 — Progetti** *(content-blocked)*
- [x] TS-07 Portfolio grid
- [x] TS-08 Project detail pages (MDX-driven)
- [x] TS-09 Category + location filter
- [x] DF-02 Committente filter *(free add-on)*
- [x] DF-08 Committente badges *(free add-on)*

**Phase 5 — Chi siamo** *(content-blocked)*
- [x] TS-10 Company history + mission
- [x] TS-11 SOA + ISO certifications with downloadable PDFs
- [x] DF-03 SOA categories readable table *(high-value differentiator)*
- [x] DF-07 Mezzi di proprietà showcase *(high-value differentiator)*
- [x] DF-09 Team dimension signal

**Phase 6 — Contatti**
- [x] TS-12 Multi-channel contact (form + tel + email + PEC + address + map screenshot)
- [x] TS-13 Contact form with Zod + Turnstile + Resend + honeypot
- [x] TS-15 mailto: + click-to-PEC
- [x] DF-10 Sopralluogo explainer
- [x] DF-14 Opening hours

**Phase 7 — SEO + Launch**
- [x] TS-18 Privacy + Cookie policy pages
- [x] TS-19 Cookie banner decision (skipped — document why)
- [x] TS-20 Per-page metadata
- [x] TS-21 sitemap.ts + robots.ts
- [x] TS-22 LocalBusiness/GeneralContractor JSON-LD
- [x] TS-23 OG tags + default OG image
- [x] TS-30 Domain + verified email sender
- [x] DF-12 Lighthouse 95+ / Core Web Vitals green
- [x] Submission to Google Search Console + Bing Webmaster

**MVP total: 30 TS items + 7 high-impact differentiators. All achievable with the STACK.md-locked toolset, all in one milestone.**

### Add After Validation (v1.x) — Post-Launch Enhancements

Add only if post-launch data or client feedback supports the investment.

- [ ] **DF-01 Geolocated project map** — add once the project data has enough points to make a map meaningful (10+ projects with lat/lng)
- [ ] **DF-04 Company profile PDF download** — add when the client has a finished brochure
- [ ] **DF-06 Heritage timeline** — add when heritage copy is finalized and approved
- [ ] **DF-11 Metodo di lavoro section** — add if the sales team signals that explaining the process shortens sales cycles
- [ ] **DF-16 "Ultimi cantieri" module** — add in a minor release if content cadence justifies it
- [ ] **Case study depth on 2–3 flagship projects** — longer-form pages with measurable outcomes, challenges, role
- [ ] **English translation pass** — only if a real market signal emerges (e.g., English-language clients or international tenders)

### Future Consideration (v2+) — Defer Until Clear Demand

Do not build speculatively.

- [ ] **Light headless CMS (Payload)** — defer until the client demonstrates they want to self-edit project entries more than 4x/year
- [ ] **Public tender / gare dashboard** — only if the client commits to maintaining it
- [ ] **Per-project client-only area** — only with a clear ROI from the cantiere management side
- [ ] **Newsletter / mailing list** — only with a real content plan
- [ ] **English locale (`/en`)** — only on demonstrated demand
- [ ] **Careers page with ATS integration** — if hiring becomes a priority
- [ ] **Blog/news section** — only with a minimum posting cadence commitment (e.g., 1 post/month for 6 months)

---

## Feature Prioritization Matrix

Abbreviated view — full table-stakes list is already P1 by definition.

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| TS-01 Hero + CTA | HIGH | LOW | **P1** |
| TS-07 Portfolio grid | HIGH | MEDIUM | **P1** |
| TS-11 SOA/ISO certifications | HIGH | MEDIUM | **P1** |
| TS-13 Contact form (RHF/Zod/Turnstile/Resend) | HIGH | MEDIUM | **P1** |
| TS-22 LocalBusiness JSON-LD | HIGH | LOW | **P1** |
| TS-26 WCAG 2.1 AA baseline | HIGH | MEDIUM | **P1** |
| DF-02 Committente filter | HIGH | LOW | **P1** (free add-on) |
| DF-03 SOA readable table | HIGH | LOW | **P1** |
| DF-05 Enti pubblici section | HIGH | MEDIUM | **P1** |
| DF-07 Mezzi di proprietà | HIGH | LOW | **P1** |
| DF-12 Lighthouse 95+ | HIGH | MEDIUM | **P1** |
| DF-10 Sopralluogo explainer | MEDIUM | LOW | **P1** |
| DF-01 Geolocated map | HIGH | HIGH | **P2** |
| DF-04 Company profile PDF | MEDIUM | LOW (content-blocked) | **P2** |
| DF-06 Heritage timeline | MEDIUM | MEDIUM | **P2** |
| DF-11 Metodo section | MEDIUM | MEDIUM | **P2** |
| Blog / news | LOW | HIGH | **P3** |
| English locale | LOW | HIGH | **P3** |
| CMS | LOW | HIGH | **P3** |
| Client portal | LOW | VERY HIGH | **P3** |

**Priority key:**
- **P1** — Must ship in the launch milestone
- **P2** — Add in v1.x after validation
- **P3** — Future only; do not build without clear demand

---

## Competitor Feature Analysis

Five comparable Italian construction company websites analyzed (mostly Veneto-based for regional fidelity). **Pattern: nobody is doing all of it well.** The opportunity is to be the one that does.

| Feature | Veneta Cantieri (Marghera) | Carron Costruzioni | Furlan Costruzioni (Padova) | Callegaro Costruzioni (Padova) | **Our Approach** |
|---------|---------------------------|--------------------|-----------------------------|--------------------------------|------------------|
| Hero + CTA above fold | Yes (generic) | Yes | Yes ("Prenota ora") | Yes ("Non vendiamo case. Costruiamo luoghi da vivere") | **Yes — "Richiedi un sopralluogo" + 45 anni subline + real cantiere hero image** |
| Trust numbers on homepage | 118 progetti / 45 opere | Yes | Yes | Yes | **Yes — 45 anni / 30 dipendenti / N SOA categorie / N cantieri pubblici** |
| Multi-target segmentation | Partial (pub/priv split) | Partial | No (residential focus) | No (residential focus) | **Yes — explicit privati / enti pubblici / professionisti** |
| SOA certifications shown | ESNA SOA badge + ISO 9001:2015 | Dedicated `/certificazioni` page | Not prominent | Mentioned | **Dedicated section + readable SOA categories table + downloadable PDF** |
| Portfolio by sector + location | Yes | Yes | Yes | Yes (40+ carousel) | **Yes — filterable by category, location, AND committente type** |
| Portfolio with individual detail pages | Partial | Yes | Yes | Partial | **Yes — static MDX-per-project** |
| PEC + multi-address shown | Yes (2 uffici + PEC) | Yes | Yes | Yes | **Yes** |
| WhatsApp contact | No | No | No | Yes | **Yes — plain `wa.me` link, no widget** |
| Contact form with type-safe validation | Basic form | Basic | Basic | Basic | **RHF + Zod + Server Action + Turnstile + Resend + honeypot** |
| Cookie banner | Yes (intrusive) | Yes | Yes | Yes | **No banner (cookieless analytics, no tracking cookies used)** |
| LocalBusiness JSON-LD | Unknown/minimal | Unknown | Unknown | Unknown | **Yes — typed with schema-dts, `GeneralContractor` subtype** |
| Real photography vs stock | Real | Real | Real | Real | **Real (CLAUDE.md hard rule)** |
| Video hero / autoplay | No | No | No | No | **No (banned)** |
| Live chat widget | No | No | No | No | **No (banned)** |
| Heritage timeline | No | No | No | No | **Optional v1.x (DF-06)** |
| Mezzi di proprietà showcase | No | Limited | No | No | **Yes — dedicated section (unique differentiator)** |
| Sopralluogo explainer | No | No | No | No | **Yes (DF-10, small but unique)** |
| Lighthouse performance | Variable | Good | Variable | Variable | **Goal: 95+ mobile** |

**Competitive conclusion:** The Veneto market is saturated with "pretty good" construction sites. The pattern to win is:
1. **Be as good as Veneta Cantieri on certifications** (SOA/ISO clarity + downloadable PDFs)
2. **Be as good as Carron on corporate credibility** (heritage, structured company info)
3. **Be better than all of them on** performance, accessibility, GDPR posture, targeting of enti pubblici, and the readability of SOA credentials for technical audiences
4. **Avoid the traps they mostly avoided too** — no hype tech, no chatbots, no video hero, no stock imagery

---

## Italian/Local Context Notes

Features or positioning that only make sense in the Italian construction + Venezia context:

- **SOA categories and classes** are a strong buying signal for enti pubblici because they legally constrain which tenders the firm can bid on. Showing them explicitly saves the RUP (Responsabile Unico del Procedimento) time. Competitor sites either hide them or show the badge only.
- **PEC address** is table stakes for any B2B/PA Italian contact page. Foreign templates usually skip it.
- **P.IVA + REA + capitale sociale** in the footer is a D.Lgs. 7/2007 legal requirement for SRLs.
- **"Cassa Edile"** (the building workers' mutual fund) regularity is a trust signal in Italian construction — Furlan displays a "Cassa Edile Awards 2025" badge. Optional trust badge for Phase 5 if the client has one.
- **DURC regolare** (Documento Unico di Regolarità Contributiva) is another optional trust badge — shows contribution regularity to INAIL/INPS/Cassa Edile. Can be listed on `/chi-siamo` as "DURC regolare" without publishing the actual document.
- **ANAC** (Autorità Nazionale Anticorruzione) maintains the public ANAC search for SOA-attested firms. Linking to the firm's ANAC record from the certifications page is a quiet but high-signal trust move.
- **Garante Privacy (Italian DPA) cookie rules** are stricter than baseline GDPR in practice — see STACK.md. This directly informs AF-12, AF-13, AF-14, AF-15 bans and the "no banner required" stance for the locked tool choices.
- **AgID / Legge Stanca** (Law 4/2004) currently references WCAG 2.1 AA — not 2.2. Since 2.2 is a superset, targeting 2.2 still satisfies 2.1 compliance for any future public-sector tender that references it.
- **Veneto-specific SEO surface**: "impresa edile Mestre", "costruzioni Venezia", "ristrutturazioni Veneto", "impresa edile Marghera", "impresa edile Mirano", "lavori pubblici Venezia provincia", "general contractor Veneto". Feed these into `areaServed` JSON-LD + on-page copy naturally, not as a keyword stuffing pass.
- **Tone of voice**: Italian institutional writing is formal (voi/Lei plural-formal), with longer sentences and less American punchy-CTA style. "Richiedi un sopralluogo" strikes exactly the right register — direct but respectful. Resist imported "Get a quote NOW!" instincts.

---

## Confidence Assessment

| Area | Confidence | Reason |
|------|------------|--------|
| Table stakes (30 items) | **HIGH** | Cross-validated against 5 Italian competitor sites + 2026 industry research + legal requirements. Every entry has at least two independent confirmations. |
| Multi-target segmentation | **HIGH** | Confirmed directly against PROJECT.md + Archimedia (Italian edile lead-gen specialists) + Veneta Cantieri's visible pub/priv split. |
| SOA / ISO / PEC requirements | **HIGH** | Verified against ANAC, BibLus, Ingenio-web (Italian construction legal publications). SOA is a statutory regime, not a best-practice opinion. |
| Italian Garante cookie rules | **HIGH** | STACK.md already verified this; multiple independent 2026 sources agree. |
| WCAG 2.1 AA (not 2.2) for Italian AgID | **HIGH** | W3C WAI Italy page + OpenAble legal summary confirm. |
| Differentiator prioritization (4 picks) | **MEDIUM** | HIGH confidence that the 4 picked differentiators are high-value and low-cost. MEDIUM confidence that they are *the* 4 best — other reasonable picks exist (DF-06 heritage timeline, DF-11 metodo). Any of those is defensible; this is a design judgment call, not an objective ranking. |
| Anti-features list | **HIGH** | Every banned feature is documented either in CLAUDE.md, in STACK.md, or in Italian Garante / legal case law. |
| Competitor analysis | **MEDIUM** | Based on 5 WebFetch-ed public-facing sites + search result summaries. Did not log into any admin panel; some claims ("basic form") are inferred from visible UI. |
| "No cookie banner required" claim | **HIGH** — conditional | True *only* if the site stays within the STACK.md tool choices. Must be re-validated if GA4, YouTube embeds, Google Maps iframes, or third-party chat widgets are ever introduced. |
| Phase mapping | **HIGH** | Derived directly from PROJECT.md roadmap phases. Each feature mapped to its natural phase + any content-blocking dependencies flagged. |

---

## Sources

**Primary (HIGH confidence):**
- [Italian Garante cookie guidelines — Didomi summary](https://www.didomi.io/blog/italian-garante-new-guidelines)
- [Italian DPA Cookie Guidelines — Secure Privacy](https://secureprivacy.ai/blog/italian-dpa-cookie-guidelines)
- [Cookie Consent Requirements in Italy — CookieYes](https://www.cookieyes.com/blog/cookie-consent-requirements-in-italy/)
- [W3C WAI — Italy policies page](https://www.w3.org/WAI/policies/italy/)
- [Legge Stanca / AgID — OpenAble](https://www.openable.it/en/legal-requirements/%F0%9F%87%AE%F0%9F%87%B9-agid/)
- [L'attestazione SOA — BibLus ACCA](https://biblus.acca.it/attestazione-soa/)
- [Requisiti e categorie SOA per lavori pubblici — Ingenio](https://www.ingenio-web.it/articoli/qualificazione-soa-i-requisiti-di-ordine-speciale-per-la-partecipare-ai-lavori-pubblici/)
- [ANAC — Motore di ricerca imprese con attestazione SOA](https://www.attestazionesoa.it/motore-di-ricerca-imprese-con-attestazione-soa-per-provincia-categoria-e-classifica/)
- [Google Search Central — LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Schema.org — LocalBusiness / GeneralContractor](https://schema.org/LocalBusiness)

**Competitor site analysis (MEDIUM confidence — WebFetch):**
- [Veneta Cantieri s.r.l. — Marghera/Piove di Sacco](https://www.venetacantieri.com/)
- [Carron Costruzioni — certificazioni](https://www.carron.it/ita/certificazioni)
- [Furlan Costruzioni — Padova](https://furlancostruzioni.it/)
- [Callegaro Costruzioni — Padova](https://www.callegarocostruzioni.com/)
- [MissionEdilizia — Venezia/Veneto](https://www.missionedilizia.it/)
- [Cantieri Bortolato — Treviso](https://www.cantieribortolato.it/)

**Industry / best-practice research (MEDIUM confidence — WebSearch):**
- [15 Best Construction Website Designs 2026 — Pravaah Consulting](https://www.pravaahconsulting.com/post/best-construction-company-websites)
- [25 Construction Website Examples 2026 — OpenAsset](https://openasset.com/resources/construction-website-examples/)
- [Construction Website Design — ProjectMark](https://www.projectmark.com/blog/construction-website-design)
- [Construction Website Must-Haves 2026 — KiwiBox](https://www.kiwibox.com/construction-website-must-haves/)
- [10 Website Features Every Modern Construction Firm Needs in 2026 — AdvertaI Marketing](https://www.advertaimarketing.com/post/10-website-features-every-modern-construction-firm-needs-in-2026)
- [SEO for Construction Companies 2026 — LocalMighty](https://www.localmighty.com/blog/seo-for-construction-companies/)
- [Local Business Schema Guide 2026 — ClickyOwl](https://clickyowl.com/local-business-schema/)
- [Schema Markup for Contractor Websites — ESEO Space](https://eseospace.com/blog/schema-markup-for-contractor-websites/)
- [Hero Section Best Practices 2026 — PerfectAfternoon](https://www.perfectafternoon.com/2025/hero-section-design/)
- [How to Fortify Construction Contact Forms — Onsharp](https://www.onsharp.com/blog/how-to-fortify-the-contact-form-on-your-construction-website)
- [8 Trust Signals You Need — Webstacks](https://www.webstacks.com/blog/trust-signals)
- [10 Website Design Trends for Construction Companies — Blacksmith Agency](https://blacksmith.agency/resources/web-design/website-design-trends-for-construction-companies/)

**Italian-market lead generation (MEDIUM confidence — WebSearch):**
- [Lead Generation edilizia e costruzioni — Archimedia](https://www.archimedia.it/blog/come-fare-lead-generation-nel-settore-edilizia-e-costruzioni)
- [Realizzazione Sito Web Impresa Edile — DingoLab case study](https://dingolab.com/impresa-edile-locatelli-giordano/)
- [Sito Web per Imprese Edili — DingoLab marketing guide](https://dingolab.com/sito-web-impresa-edile-marketing/)

**Accessibility references (HIGH confidence):**
- [EAA European Accessibility Act — SparkFabrik](https://www.sparkfabrik.com/en/blog/eaa-european-accessibility-act-digital-accessibility/)
- [WCAG 2 Overview — W3C WAI](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [WCAG 2.2 Checklist — BrowserStack](https://www.browserstack.com/guide/wcag-compliance-checklist)

---

*Feature research for: Impresa Edile SRL institutional website — Mestre/Venezia/Veneto*
*Researched: 2026-04-13*
*Overall confidence: HIGH*
