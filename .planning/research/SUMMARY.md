# Project Research Summary

**Project:** Sito Web Impresa Edile SRL
**Domain:** Institutional corporate website + lead-generation -- local Italian construction company (45 years, Mestre/Venezia/Veneto)
**Researched:** 2026-04-13
**Confidence:** HIGH

## Executive Summary

This is a 5-page institutional corporate website for a 45-year-old Italian construction company. The strategic goal is authority and lead generation -- converting trust into "Richiedi un sopralluogo" form submissions from three distinct audiences: private clients, enti pubblici (SOA tender buyers), and design professionals. The research consensus is unambiguous: this category of site wins by getting the basics exactly right, not by innovating. Competitors that rank and convert have fast mobile performance, visible trust signals above the fold, geolocated project portfolios, and SOA/ISO credentials displayed prominently. Everything that deviates from that pattern -- chat widgets, cost calculators, animated heroes, a blog with no content -- actively damages credibility with institutional audiences.

The recommended technical approach is a single Next.js 16 App Router application, statically generated at build time, with typed TypeScript content objects (no CMS), one Server Action for the contact form, and a strict RSC-by-default component architecture. The only client-side JavaScript islands are: the contact form, the mobile nav drawer, the mobile sticky CTA bar, and the Sonner toast. This architecture delivers sub-2.5s mobile LCP with near-zero configuration overhead and a total MVP infrastructure cost of approximately 15 EUR/year. The stack is already validated by CLAUDE.md -- research confirmed every choice and added the supporting libraries needed to complete it.

The three highest-severity risks are all Italian-specific compliance failures: installing GA4 (the Garante has issued enforcement orders on this), embedding a Google Maps iframe (triggers mandatory cookie banner, breaking the no-banner posture), and submitting a contact form that collects personal data without a GDPR Art. 13 privacy notice inline. All three pitfalls are easy to avoid if addressed in Phase 1 and Phase 6 -- they become costly rework if discovered post-launch. A secondary risk tier is photography: the portfolio is the single most credibility-generating page on the site, and it cannot be built without real cantiere photography. This dependency must be raised with the client before a line of code is written.

---

## Key Findings

### Recommended Stack

The CLAUDE.md lock-ins are fully validated for 2026. Next.js 16 with React 19 and Tailwind v4 (CSS-first @theme config, 100x faster incremental builds) is the current standard for this type of project. The only addition required to the base scaffold is a minimal set of supporting libraries with no bundle overhead for server-rendered sections. All infrastructure runs at effectively zero cost on the Vercel Hobby tier plus Resend free tier (3k emails/month far exceeds a local impresa volume).

**Core technologies:**
- **Next.js 16.2 + React 19.2:** App Router, RSC-by-default, Server Actions, built-in sitemap.ts/robots.ts/generateMetadata -- eliminates the need for a separate API layer or sitemap package
- **TypeScript 5.7 strict + noUncheckedIndexedAccess:** Non-negotiable; type-safe content model prevents silent content errors
- **Tailwind CSS v4.2:** CSS-first brand token definition in globals.css via @theme; use v4, not v3
- **pnpm 10 + Vercel:** Zero-config deployment, preview deploys per commit, built-in privacy-first analytics
- **react-hook-form 7.72 + Zod 3.25 + Server Actions:** The de-facto 2026 form stack; same Zod schema runs on client and server
- **Resend 4:** Developer-first email API; requires verified domain DNS before Phase 6 goes live
- **Cloudflare Turnstile:** Invisible CAPTCHA, GDPR-safe -- required instead of reCAPTCHA which is a Garante liability
- **schema-dts 1.1 + GeneralContractor JSON-LD:** Type-safe structured data for local pack ranking; GeneralContractor is the correct Schema.org type (not LocalBusiness)
- **Vercel Analytics + Speed Insights:** Cookieless, GDPR-compliant without a cookie banner -- no GA4 under any circumstances
- **next/font/google (Inter + IBM Plex Serif):** Self-hosted at build time, zero GDPR exposure, zero FOUT

**Critical do-not-use items:** GA4, Google reCAPTCHA (any version), Google Maps iframe embed, Google Fonts via link tag, any headless CMS for MVP, Framer Motion, client-side state libraries.

### Expected Features

Research identified 30 table-stakes features (baseline expectations), 16 differentiators (competitive above-baseline options), and 26 documented anti-features (commonly requested items that actively hurt institutional credibility).

**Must have (table stakes -- all 30):**
- Hero with real cantiere photo + CTA above the fold (TS-01)
- Numeric trust strip: 45 anni / 30 dipendenti / N cantieri (TS-02)
- Global CTA in header, every page footer, mobile sticky bar (TS-03)
- Services overview on homepage + detailed /servizi page with multi-target segmentation (TS-04, TS-05, TS-06)
- Project portfolio grid with per-project detail pages and URL-driven category/location filter (TS-07, TS-08, TS-09)
- SOA + ISO certifications section with downloadable PDFs (TS-11)
- Contact page: form (RHF + Zod + Turnstile + Resend) + phone + email + PEC + address + static map (TS-12, TS-13)
- Privacy + Cookie policy pages with full Italian Garante-compliant Titolare details (TS-18)
- P.IVA, REA, capitale sociale, sede legale in footer -- Italian legal requirement (TS-29)
- LocalBusiness/GeneralContractor JSON-LD + sitemap.ts + per-page metadata (TS-20, TS-21, TS-22)

**Should have (4 priority differentiators for MVP):**
- DF-02: Committente filter on portfolio (privato/ente-pubblico/professionista) -- near-zero cost, high value for 3-target positioning
- DF-03: SOA categories human-readable table -- killer differentiator for enti pubblici, competitors do not do this
- DF-05: Dedicated Enti Pubblici section on /servizi -- addresses the weakest gap in competitor sites
- DF-07: Mezzi di proprieta showcase -- unique visual trust signal, proves forza strutturale claim

**Defer to v2+:**
- DF-01: Geolocated SVG map of all cantieri (high story value, high effort)
- DF-04: Downloadable company profile PDF (requires client designer)
- DF-06: Heritage timeline (add when copy is approved)
- DF-11: Metodo di lavoro process section (validate need with sales team first)
- Any CMS, multilingual support, blog, client portal

**Hard anti-features -- never build:**
- Live chat widget, cost calculator, video hero, animated number counters, parallax/scroll-jacked sections, testimonial carousel, Google Analytics 4

### Architecture Approach

Single Next.js app, all pages statically generated at build time, served from Vercel edge cache. Content lives in typed TypeScript modules under content/ (not MDX, not a CMS). The component hierarchy has four tiers: ui/ (zero business knowledge), sections/ (full-width RSC sections), business/ (domain-aware, knows content types), layout/ (global chrome). Only four Client Component islands exist in the entire site.

**Major components:**
1. app/contatti/actions.ts -- the only Server Action; runs Zod validation, Turnstile verification, honeypot check, then Resend send; Node runtime (not Edge)
2. content/ directory -- single source of truth for all content (site NAP, services, certifications, mezzi, team stats, legal data, projects); all components import from here
3. components/layout/json-ld.tsx -- RSC component emitting GeneralContractor JSON-LD; zero client hydration
4. sections/contact-form.tsx -- the only large client island; use client with RHF + Zod + Turnstile + useActionState
5. lib/seo/metadata.ts -- shared buildMetadata() helper used by generateMetadata in every page.tsx
6. content/site.ts -- canonical NAP (name, address, phone); all templates import from here to prevent NAP inconsistency

**RSC vs Client boundary:** use client is permitted only at the four identified leaf nodes. Any use client in components/sections/ is a code smell requiring explicit justification.

### Critical Pitfalls

1. **GA4 installation** (CRITICAL) -- Italian Garante has issued enforcement orders against GA4. Use @vercel/analytics only. Lock this in app/layout.tsx in Phase 1.
2. **Google Maps iframe on /contatti** (CRITICAL) -- Loads third-party cookies on first paint, triggers mandatory cookie banner. Use a static AVIF screenshot linking to maps.google.com instead.
3. **Contact form without GDPR Art. 13 notice + consent checkbox** (CRITICAL) -- The form collects personal data; requires a visible privacy statement and an unchecked consent checkbox bound to the Zod schema with server-side validation.
4. **Photography dependency identified too late** (HIGH) -- Phase 4 portfolio is content-blocked by real cantiere photography. Minimum: 10+ project shoots. Lead time: 2-4 weeks. Raise with client in Phase 1, not Phase 4.
5. **use client overuse bloating JS bundle** (HIGH) -- Section components must be RSC by default. Use the donut pattern: RSC shell wrapping a small Client island.
6. **NAP inconsistency between site and Google Business Profile** (HIGH) -- Use content/site.ts as the single NAP source, then align GBP to it before launch.
7. **Resend DNS misconfiguration causing silent email loss** (HIGH) -- SPF, DKIM, DMARC records must be verified before Phase 6 go-live. Start DNS coordination with the client registrar in Phase 1.

---

## Implications for Roadmap

The 7-phase roadmap from PROJECT.md is validated by research and maps directly to feature dependencies. The ordering is correct.

### Phase 1: Fondamenta

**Rationale:** All subsequent phases depend on design system, component boundaries, content model, SEO scaffolding, and legal/compliance infrastructure. Two CRITICAL pitfalls (GA4 lock-out, P.IVA in footer) and four HIGH pitfalls (NAP in content/site.ts, color contrast tokens, slug schema, SEO metadata helper) must be addressed here before any page content is built.

**Delivers:** Project scaffold with Next.js 16 + Tailwind v4 @theme brand tokens, four-tier component hierarchy stubs, content/site.ts with canonical NAP, content/legal.ts with all D.Lgs. 70/2003 fields, app/layout.tsx with @vercel/analytics and NO GA4, lib/seo/metadata.ts helper, Zod schemas (contact + project), json-ld.tsx scaffold, types/content.ts typed content model, SiteFooterLegal component, responsive layout foundation, WCAG AA contrast-validated brand tokens, 404 page.

**Avoids:** C-01 (no GA4), C-07 (legal footer from day one), H-03 (single NAP source), H-05 (use client boundary convention established), H-06 (slug regex in Zod), H-10 (SEO metadata scaffold), M-06 (contrast tokens validated before any component CSS), M-07 (no hardcoded content).

**Research flag:** Standard patterns. No phase research needed.

### Phase 2: Homepage Authority

**Rationale:** The homepage is the primary conversion surface and trust anchor. It must exist before Servizi and Progetti can be meaningfully linked. Mobile sticky CTA and click-to-call must ship here.

**Delivers:** Hero section with real cantiere photo + CTA (TS-01), numeric trust strip (TS-02), services overview tiles (TS-04), click-to-call in header (TS-14), service area statement (DF-15), mobile sticky CTA bar (Client island), final-CTA band component for reuse in subsequent phases.

**Hard prerequisite:** At least one real hero photo from the client. Use CSS placeholder (not stock) until it arrives -- this is a Phase 2 launch blocker.

**Avoids:** H-01 (no stock photos), H-04 (priority + AVIF on hero, LCP budget checked before phase closes), H-09 (SaaS trope checklist: no animated counters, no gradients).

**Research flag:** Standard patterns. No phase research needed.

### Phase 3: Servizi Multi-Target

**Rationale:** Services are the do-you-do-what-I-need decision page. The enti pubblici dedicated section (DF-05) is the highest-ROI differentiator on the entire site. Phase 3 also defines the service/project taxonomy used in Phase 4 filters.

**Delivers:** /servizi with anchored sections per service category (TS-05), multi-target panels (TS-06), Enti Pubblici section with SOA mention (DF-05), final-CTA band.

**Photography checkpoint:** By end of Phase 3, confirm with client that project photography is in progress with a delivery date before Phase 4.

**Research flag:** Standard patterns. No phase research needed.

### Phase 4: Portfolio e Case Studies

**Rationale:** Portfolio is the single most credibility-generating section. It is content-blocked -- cannot land meaningfully without real project photography. URL-driven RSC filters (no JS filter library) are the correct pattern.

**Delivers:** /progetti portfolio grid with committente badges (TS-07, DF-08), per-project detail pages via generateStaticParams (TS-08), URL-driven filters using searchParams (TS-09, DF-02), per-project OG images for WhatsApp sharing, 10-20 initial project entries in content/projects/.

**Hard prerequisites:** Real photography delivered and processed to AVIF. SOA PDFs available for cross-linking.

**Avoids:** H-01 (no stock photos), H-06 (ASCII kebab-case slugs enforced by Zod regex), H-07 (photography scheduled ahead of time), M-02 (canonical URL on filtered pages = /progetti), M-03 (per-project OG images), M-05 (alt text enforced via z.string().min(10)).

**Research flag:** Review Next.js App Router docs for searchParams with RSC and generateStaticParams before building the filter system.

### Phase 5: Corporate Credibility

**Rationale:** /chi-siamo closes the trust loop for institutional buyers. SOA/ISO PDFs and the human-readable SOA table (DF-03) are essential for enti pubblici and unobtainable from competitors.

**Delivers:** /chi-siamo with company history narrative (TS-10), certifications section with SOA/ISO cards and downloadable PDFs (TS-11), SOA categories human-readable table (DF-03), mezzi di proprieta image grid (DF-07), team dimension signal with group photo (DF-09).

**Hard prerequisites:** SOA attestazione PDF and ISO certificate PDF from client. Approved company history copy. Fleet photos.

**Research flag:** Standard patterns. No phase research needed.

### Phase 6: Contatti e Conversione

**Rationale:** The contact page is the conversion endpoint. The form must be built correctly once. DNS setup for Resend should have been initiated in Phase 1 -- it can take weeks if the client does not have direct DNS access.

**Delivers:** /contatti with multi-channel contact block (TS-12), contact form with RHF + Zod + Turnstile + honeypot + Resend (TS-13), GDPR Art. 13 inline privacy notice + unchecked consent checkbox with server-side validation, sopralluogo explainer (DF-10), opening hours (DF-14), mailto/tel links (TS-15).

**Hard prerequisites:** Resend domain verified in DNS (SPF, DKIM x2, DMARC all green). Owner email on the verified domain. Cloudflare Turnstile site key + secret key configured.

**Avoids:** C-02 (Turnstile not reCAPTCHA), C-03 (static map screenshot not Google Maps iframe), C-05 (consent checkbox server-validated in actions.ts), H-08 (Resend DNS verified and delivery tested before go-live), M-01 (server-side Zod parse before Resend call).

**Research flag:** Review Resend DNS setup and Cloudflare Turnstile server-side verification docs at phase start.

### Phase 7: SEO + Deploy + Launch

**Rationale:** SEO infrastructure was scaffolded in Phase 1 and enriched here now that all content exists. This phase is verification and launch hygiene, not new features. The no-banner decision must be explicitly documented.

**Delivers:** Per-page generateMetadata verified on all routes (TS-20), sitemap.ts + robots.ts finalized (TS-21), GeneralContractor JSON-LD enriched and validated with Google Rich Results Test (TS-22), per-project OG images (TS-23), /privacy + /cookie-policy with full Titolare details (TS-18), docs/gdpr.md documenting the no-banner decision (TS-19), Google Business Profile NAP audit, Lighthouse mobile 95+, Search Console + Bing Webmaster Tools setup.

**Avoids:** C-04 (no-banner decision documented), C-06 (privacy policy includes Garante complaint link + Titolare), H-02 (JSON-LD validated via Rich Results Test), H-03 (GBP NAP alignment), H-10 (all pages confirmed to export generateMetadata), M-02 (canonical URLs confirmed).

**Research flag:** Standard patterns. Built-in Next.js SEO conventions are fully documented.

### Phase Ordering Rationale

- Phase 1 before everything: compliance and architecture decisions made after content is built cost 10x more to fix. GA4 exclusion and legal footer must be structural from commit 1.
- Phase 2 before Phase 3: the CTA strip component authored in Phase 2 is reused in Phases 3-6; it must exist before the pages that need it.
- Phase 3 before Phase 4: services categorization defines the taxonomy that becomes the filter vocabulary in Phase 4 URL-driven filters.
- Phase 4 has the hardest content dependency (photography) and must be planned earliest, with the client briefed in Phase 1 -- even though it executes fourth in the build sequence.
- Phase 6 last before launch: the form requires external service setup (Resend DNS, Turnstile keys) with calendar delays that cannot be compressed.
- Phase 7 is verification, not feature development. It runs on a fully built site.

### Research Flags

Phases with standard, well-documented patterns -- skip /gsd-research-phase:
- **Phase 1:** Next.js 16 scaffold and Tailwind v4 @theme setup are in official docs
- **Phase 2:** Static hero/trust/CTA sections are simple RSC composition
- **Phase 3:** Services page is static content composition
- **Phase 5:** Static content sections with PDF downloads
- **Phase 7:** Next.js built-in SEO conventions (sitemap.ts, robots.ts, generateMetadata) are fully documented

Phases that benefit from targeted documentation review before implementation:
- **Phase 4:** Review Next.js App Router docs for searchParams with RSC and generateStaticParams before building the filter system
- **Phase 6:** Review Resend DNS setup and Cloudflare Turnstile server-side token verification docs at phase start

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Every technology choice verified against official docs. CLAUDE.md choices confirmed correct for 2026. |
| Features | HIGH | Competitor analysis of 5 Veneto construction sites + 2026 Italian market research. 30 table stakes + 16 differentiators documented with evidence. |
| Architecture | HIGH | Directly derived from Next.js 16 App Router official patterns. Content model is the simplest viable option for 10-20 TS project files. |
| Pitfalls | HIGH | Italian Garante compliance pitfalls backed by specific enforcement orders. Technical pitfalls are documented Next.js App Router anti-patterns. |

**Overall confidence: HIGH**

### Gaps to Address

- **Exact brand hex values:** CLAUDE.md names the palette (grigio scuro / panna / blu brand) without specifying hex codes. These must be defined and contrast-tested (WebAIM Contrast Checker, WCAG AA 4.5:1 for body text) before Phase 1 closes.
- **Client content readiness:** Multiple hard content dependencies exist (photography, SOA/ISO PDFs, approved company copy, final phone/PEC/address details). Create a content checklist for the client in Phase 1 kickoff -- not Phase 4.
- **Font pairing decision:** STACK.md recommends Inter + IBM Plex Serif but flags this as a design judgment call (MEDIUM confidence on the specific pairing). Decide before the hero section is built in Phase 2.
- **Resend sender domain access:** The production domain must be verified in Resend DNS settings. If DNS is held by a third-party vendor (common in Italy for older businesses), obtaining access may take weeks. Start this conversation in Phase 1.

---

## Sources

### Primary (HIGH confidence)
- [Next.js 16 release notes](https://nextjs.org/blog/next-16) -- framework version, App Router, Server Actions, Turbopack default
- [Next.js Forms guide](https://nextjs.org/docs/app/guides/forms) -- RHF + Zod + Server Actions canonical pattern
- [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld) -- schema-dts recommendation
- [Tailwind CSS v4 release post](https://tailwindcss.com/blog/tailwindcss-v4) -- CSS-first config, @theme, breaking changes from v3
- [Resend -- Send emails with Next.js](https://resend.com/docs/send-with-nextjs) -- Server Action integration
- [Vercel Analytics -- Privacy and Compliance](https://vercel.com/docs/analytics/privacy-policy) -- cookieless, no PII confirmation
- [Cloudflare Turnstile](https://www.cloudflare.com/application-services/products/turnstile/) -- invisible CAPTCHA, privacy posture
- [google/schema-dts](https://github.com/google/schema-dts) -- type-safe JSON-LD
- Italian Garante Order No. 224, June 9 2022 -- GA4 enforcement ruling
- [Italian Garante cookie guidelines (Didomi summary)](https://www.didomi.io/blog/italian-garante-new-guidelines) -- cookie banner requirements binding from 2022

### Secondary (MEDIUM confidence)
- Competitor analysis: Veneta Cantieri, Carron Costruzioni, Callegaro Costruzioni, Furlan Costruzioni, Cantieri Bortolato -- feature and pattern benchmarking
- DingoLab case study -- geolocated portfolio SEO recommendation for Italian edile sites
- Archimedia blog -- edile lead gen case study content confirmation
- [hCaptcha vs Cloudflare Turnstile 2026](https://www.websyro.com/blogs/hcaptcha-vs-cloudflare-turnstile-2026-comparison) -- CAPTCHA tradeoff analysis
- [Privacy-compliant analytics tools 2026](https://mitzu.io/post/best-privacy-compliant-analytics-tools-for-2026/) -- Vercel Analytics vs Plausible comparison

---

*Research completed: 2026-04-13*
*Ready for roadmap: yes*