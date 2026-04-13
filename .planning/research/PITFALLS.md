# Pitfalls Research — Impresa Edile SRL Website

**Domain:** Institutional corporate website / lead-generation site — local Italian construction company, Mestre/Venezia/Veneto. Next.js 16 App Router, Tailwind v4, Vercel.
**Researched:** 2026-04-13
**Confidence:** HIGH

---

## TL;DR

There are four categories of failure that kill Italian construction company websites: GDPR violations that trigger Garante enforcement (documented fines up to €300k for dark patterns, up to €20M for cookie violations), trust failures caused by stock photography and generic copy, invisible SEO gaps that prevent the site from ranking locally, and lead-capture failures that turn form submissions into silence. Every pitfall below maps to a specific phase and carries a severity rating so the roadmap can allocate effort correctly.

---

## Critical Pitfalls (Severity: CRITICAL)

These cause legal liability, major rework, or zero-conversion outcomes if not addressed from the start.

---

### C-01: Google Analytics 4 Without Adequate Data Transfer Safeguards

**Severity:** CRITICAL

**What goes wrong:**
Developer installs GA4 "because everyone uses it." The Italian Garante issued Order No. 224 on June 9, 2022, ruling that Google Analytics (GA3) transfers personal data — including IP address, browser fingerprint, device info, OS, screen resolution, and visit timestamps — to US servers in violation of GDPR/Schrems II. The ruling explicitly extended concern to any Google Analytics version until adequate supplementary measures are in place. In practice, most Italian websites running GA4 without SCCs and a valid DPA are in a legally exposed position. The Garante actively enforces this, issuing warnings and directing sites to suspend use within 90 days.

**Why it happens:**
GA4 is the default analytics recommendation. Developers assume "GA4 is GDPR-compliant" without verifying the Italian Garante's specific position.

**How to avoid:**
Use Vercel Analytics (`@vercel/analytics`) exclusively. It is cookieless, aggregated, processes no PII, requires no DPA, and explicitly avoids all the scenarios the Garante flagged. No cookie banner is triggered. Zero configuration overhead. If the client insists on a third-party analytics dashboard, use Plausible (EU-hosted, €9/mo) instead. Document the decision in a `docs/gdpr.md` committed to the repo.

**Warning signs:**
Any reference to `gtag.js`, `analytics.js`, `_ga` cookie, or `googletagmanager.com` in the codebase or `<head>` output.

**Phase to address:** Phase 1 (Fondamenta) — lock this decision in `app/layout.tsx` before anything else is added.

---

### C-02: Google reCAPTCHA on the Contact Form

**Severity:** CRITICAL

**What goes wrong:**
Developer adds reCAPTCHA v2 or v3 to the "Richiedi un sopralluogo" form. reCAPTCHA sends behavioral signals and fingerprint data to Google's ad-targeting infrastructure. Under Italian Garante guidelines, this requires explicit cookie consent before the form is displayed. If the site has no cookie banner (the target state for this project), adding reCAPTCHA breaks that compliance posture. reCAPTCHA v3 is also frictionless to the user but invisible in its data collection — exactly the scenario Garante's dark-pattern rulings target.

**Why it happens:**
reCAPTCHA is the default tutorial recommendation for form spam protection. Developers copy from Stack Overflow examples without checking privacy implications.

**How to avoid:**
Use Cloudflare Turnstile via `@marsidev/react-turnstile`. Cloudflare explicitly states Turnstile data is never used for ad retargeting. For most Italian desktop and mobile users, Turnstile is entirely invisible (no challenge shown). Combine with a honeypot hidden field in the form for defense-in-depth. Server-side: verify the Turnstile token in the Server Action via `lib/turnstile.ts` before processing the form.

**Warning signs:**
`grecaptcha`, `recaptcha.net`, or `www.google.com/recaptcha` in any `<script>` tag or dependency.

**Phase to address:** Phase 6 (Contatti) — when the form is built, Turnstile is wired in from day one.

---

### C-03: Embedded Google Maps iframe on the Contact Page

**Severity:** CRITICAL

**What goes wrong:**
Developer embeds a `<iframe src="https://www.google.com/maps/embed?...">` on `/contatti` "because it looks professional." Google Maps embeds load `maps.googleapis.com` scripts and set third-party cookies on first paint — before any consent is given. This triggers mandatory cookie-banner requirements under Garante guidelines, breaking the no-banner posture for this project.

**Why it happens:**
It is the most obvious way to show a map location. Google Maps' embed code is one click away on maps.google.com.

**How to avoid:**
Replace with a static AVIF image of the map area (screenshot from Google Maps or OpenStreetMap, stripped of any identifying parameters). Make it a link: clicking opens `https://maps.google.com/maps?q=...` in a new tab. This requires zero JavaScript, zero cookies, zero Garante exposure. Alternatively use an OpenStreetMap static tile URL (`https://staticmap.openstreetmap.de/...`), which has no third-party cookie risk. A plain "Apri in Google Maps" button with a link icon achieves the same outcome with better performance.

**Warning signs:**
`maps.googleapis.com`, `maps.google.com/maps/embed`, or `google.com/maps` in any iframe `src` attribute.

**Phase to address:** Phase 6 (Contatti) — when the contact page is built.

---

### C-04: Cookie Banner Done Wrong (If One Is Eventually Added)

**Severity:** CRITICAL (if triggered; not triggered for the base stack)

**What goes wrong:**
If a third-party cookie is ever added (e.g., a future marketing pixel, a YouTube embed, a Calendly widget), a cookie banner becomes legally required. The Garante's 2021 guidelines (effective January 2022, still binding in 2026) require: (1) an X button that closes the banner without accepting anything; (2) accept-all and reject-all buttons of identical size, color weight, and prominence; (3) no pre-checked non-technical cookies; (4) no cookie wall; (5) no re-presenting the banner for at least 6 months after rejection. The Ediscom case (€300k fine, February 2023) set precedent that dark patterns are a standalone GDPR violation.

**Why it happens:**
A "scope creep" third-party is added post-launch without reassessing the compliance posture. The original developer has moved on. Banner libraries from 2020–2022 have pre-checked defaults that are now illegal.

**How to avoid:**
For this project, plan to NOT ship a cookie banner — the chosen stack (Vercel Analytics cookieless, Turnstile, `next/font` self-hosted, no GA4, no Google Maps iframe, no YouTube embeds, no reCAPTCHA) generates no cookies that require consent. Document this in `docs/gdpr.md`. Establish a rule: any future addition that introduces a non-technical cookie must go through a compliance check before it ships. If a banner is ever needed, use Cookiebot or a manually implemented solution — not a lazy npm package from 2019.

**Warning signs:**
Any new third-party `<script>` tag in `app/layout.tsx` that is not Vercel Analytics or Speed Insights. Any introduction of `document.cookie` or `localStorage` writes by external scripts.

**Phase to address:** Phase 7 (SEO/Launch) — pre-launch compliance audit. Document the "no banner" decision explicitly.

---

### C-05: Contact Form Without a Proper Privacy Notice and Consent Checkbox

**Severity:** CRITICAL

**What goes wrong:**
The "Richiedi un sopralluogo" form collects name, email, phone number, and message text — unambiguously personal data under GDPR/Italian Garante. Processing this data requires: (a) a clear privacy notice at the point of collection ("I dati saranno trattati da [Titolare] per la gestione delle richieste di contatto ai sensi dell'art. 13 GDPR"); (b) an explicit, unchecked checkbox for consent when the legal basis is consent; or at minimum a link to the full privacy policy when the legal basis is legitimate interest. Missing either means the form is collecting data in violation of GDPR Art. 13 and Italian Garante enforcement posture.

**Why it happens:**
Developers build the form to spec (fields + submit) and treat the privacy notice as content the client will "add later." It never gets added. Or they add a vague "I agree to the terms" line that doesn't meet the GDPR transparency requirement.

**How to avoid:**
In Phase 6, the form component `components/sections/contact-form.tsx` must include: (1) a `<Checkbox>` field bound to the Zod schema with `required: true`, labeled "Ho letto e accetto l'informativa sulla privacy" with a link to `/privacy`; (2) a visible paragraph above the submit button citing the Titolare (company name + P.IVA + sede legale), the purpose ("gestione delle richieste di contatto"), and a link to the full `/privacy` page. The Server Action must validate that the consent field is `true` — not just the client-side form.

**Warning signs:**
A contact form that submits without a visible privacy statement or consent mechanism. A `privacy_consent` field absent from the Zod schema. Server Action that doesn't validate `privacy_consent === true`.

**Phase to address:** Phase 6 (Contatti) — non-negotiable day-one requirement of the form.

---

### C-06: Privacy Policy Missing Italian Titolare Details

**Severity:** CRITICAL

**What goes wrong:**
A privacy policy that says "Your data is processed in accordance with GDPR" with a generic template but omits the Italian-mandatory fields: Titolare del trattamento (full legal name, registered address, P.IVA), contact email for data subject rights (can be the same company email), and the right to lodge a complaint with the Garante (Autorità Garante della protezione dei dati personali, `garanteprivacy.it`). This renders the privacy policy legally ineffective and exposes the business to Garante enforcement.

**Why it happens:**
Privacy policy generators produce international templates that don't include Italian-specific mandatory fields. Developers copy from another site without verifying Italian requirements.

**How to avoid:**
In Phase 7, create the `/privacy` page with a template that explicitly includes: (1) Titolare del trattamento: [Ragione Sociale], [Sede Legale], P.IVA [numero]; (2) Contact for data subject rights: [email]; (3) Explicit mention of the right to complain to the Garante and a link to `garanteprivacy.it`; (4) Retention periods per data category; (5) Legal bases for each processing activity. Use a vetted Italian legal template (e.g., from iubenda or a GDPR-compliant Italian law firm) — do not write from scratch.

**Warning signs:**
Privacy page that doesn't mention "Garante" or "Autorità Garante". Missing "Titolare del trattamento" section. No contact email for data subject rights.

**Phase to address:** Phase 7 (SEO/Launch) — before any form goes live.

---

### C-07: Missing P.IVA, REA, Capitale Sociale, and Sede Legale in Footer

**Severity:** CRITICAL (legal compliance)

**What goes wrong:**
Italian law (art. 42, D.Lgs. 7/2007, which modified art. 7 of D.Lgs. 70/2003 on e-commerce) requires every commercial website representing an SRL to display in a clearly visible location: the company's denominazione sociale, sede legale, numero di iscrizione al Registro delle Imprese, numero REA, P.IVA, and capitale sociale (with the "i.v." — interamente versato — notation if fully paid). Omitting any of these is a compliance violation. Italian enti pubblici specifically check for these details before considering an impresa for any tender; their absence is an instant disqualification signal.

**Why it happens:**
Developers focus on UX and treat the footer as decorative. Legal details are deferred to "content" that the client will provide, and then they are never added.

**How to avoid:**
Create `content/legal.ts` in Phase 1 with all mandatory fields (ragione sociale, sede legale, P.IVA, REA, CCIAA, capitale sociale, n. iscrizione registro imprese). The `SiteFooterLegal` component (`components/business/site-footer-legal.tsx`) renders this data on every page. Make it a TypeScript type so missing fields cause a type error. The Footer component must never render without `legal.ts` being populated.

**Warning signs:**
Footer without P.IVA. Footer without REA. Footer without "Capitale Sociale: €X i.v." Missing "Sede Legale" address. Checking the rendered HTML of any page and finding no `P.IVA` text in the footer.

**Phase to address:** Phase 1 (Fondamenta) — footer layout must include this from the first commit.

---

## High Pitfalls (Severity: HIGH)

These cause significant trust loss, SEO failure, or conversion loss if not addressed.

---

### H-01: Generic Stock Photography Killing Credibility

**Severity:** HIGH

**What goes wrong:**
Developer populates hero sections, services sections, and the portfolio with stock photos of hard hats, blueprints, handshakes in front of buildings, or staged "construction workers" sourced from Unsplash or Getty. A 2023 Edelman consumer trust survey found that 71% of respondents immediately identified stock photography and 65% reported it negatively impacted brand credibility. In the construction sector specifically, where clients are evaluating physical competence and local presence, stock imagery signals "this company has no real projects to show." For enti pubblici, stock photos can disqualify a supplier from tender consideration before the first meeting.

**Why it happens:**
Real photography requires a photo shoot, takes time, and costs money. Stock photos fill the placeholder immediately. Development starts "with placeholders" and the placeholder never gets replaced.

**How to avoid:**
Treat real photography as a hard content prerequisite, not an afterthought. Raise this with the client at kickoff: "Phase 2 (Homepage) cannot ship meaningfully without at least one hero photo, one team/fleet photo, and 4–6 cantiere photos." Commission a local photographer if the client has nothing usable. Until real photos arrive, use colored placeholder boxes in the `next/image` placeholder, not stock photos. Never commit stock construction images to `public/images/`.

**Warning signs:**
Any image in `public/images/` sourced from Unsplash, Pexels, Getty, or Shutterstock. A hero image that shows workers whose faces are obscured by helmets in a way that looks staged. Images that do not show Mestre/Venezia geography or the company's actual equipment.

**Phase to address:** Phase 1 (Fondamenta) — flag the photography dependency. Phase 2 (Homepage) — hard requirement before launch of Phase 2 preview deploy.

---

### H-02: LocalBusiness / GeneralContractor JSON-LD Absent or Malformed

**Severity:** HIGH

**What goes wrong:**
The site launches without structured data, or with a generic `Organization` schema instead of the specific `GeneralContractor` type (which extends `HomeAndConstructionBusiness`, which extends `LocalBusiness`). Google uses JSON-LD structured data to populate the local Knowledge Panel, the local pack in Maps results, and increasingly to generate AI Overview answers about local businesses. A missing or malformed JSON-LD block means the company is invisible in the "impresa edile Mestre" local pack — which is the primary channel for privati and enti looking for a local contractor. A single unescaped quote or missing bracket silently breaks the entire block; the browser shows no error.

**Why it happens:**
JSON-LD is not visible in the browser UI. It's easy to deprioritize as "invisible SEO plumbing" and defer until launch, then forget. Developers also commonly use `Organization` because it appears in every tutorial, when `GeneralContractor` is the correct type for this business.

**How to avoid:**
Create `lib/seo/json-ld.ts` in Phase 1, typed via `schema-dts` for autocomplete and compile-time safety. Include: `@type: "GeneralContractor"` (not `LocalBusiness`), `name`, `address` (with `addressLocality: "Mestre"` and `addressRegion: "Venezia"`), `telephone`, `email`, `geo`, `openingHoursSpecification`, `areaServed` (array: Mestre, Venezia, Mogliano, Mirano, Marghera, Veneto), `foundingDate: "1981"`, `hasCredential` for SOA and ISO, `numberOfEmployees`. Render via `<script type="application/ld+json">` in `components/layout/json-ld.tsx` (RSC, no client hydration). Validate with Google Rich Results Test before Phase 7 launch.

**Warning signs:**
No `<script type="application/ld+json">` in page source. `@type: "Organization"` or `@type: "LocalBusiness"` instead of `"GeneralContractor"`. Missing `areaServed`. Missing `hasCredential`. JSON-LD with a syntax error (check with Rich Results Test tool).

**Phase to address:** Phase 1 (Fondamenta) — lay the typed scaffold. Phase 7 (SEO/Launch) — validate and enrich before deploy.

---

### H-03: NAP Inconsistency Between Site and Google Business Profile

**Severity:** HIGH

**What goes wrong:**
The site footer says "Via Roma, 15" but Google Business Profile says "Via Roma 15" (no comma). Or the phone is formatted as `041 123456` on the site and `+39 041 123456` on GBP. Or the company name is "Edilferro SRL" on the site and "Edilferro s.r.l." on GBP and "EDILFERRO" on the camera di commercio listing. Google uses NAP (Name, Address, Phone) consistency across all online sources to determine whether the business entity is reliable. Inconsistent NAP is one of the top local pack ranking suppressors. BrightLocal studies show consistent NAP businesses are 40% more likely to appear in local packs.

**Why it happens:**
The site is built in isolation. Nobody audits the Google Business Profile at the time of development. Italian business names often appear in multiple capitalizations across official records.

**How to avoid:**
In Phase 1, create `content/site.ts` as the single source of truth for NAP: company name (exact legal form), address (exact format matching camera di commercio records), phone (standardized as `+39 041 XXXXXX`), email, PEC. All templates — footer, JSON-LD, contact page, `sitemap.ts` metadata — must import from `content/site.ts`. Before Phase 7 launch, compare `content/site.ts` values against the Google Business Profile and update GBP to match exactly.

**Warning signs:**
Phone number formatted differently in footer vs. contact page. Company name capitalized differently in header vs. footer. No `content/site.ts` file — NAP values are hardcoded in multiple components.

**Phase to address:** Phase 1 (Fondamenta) — `content/site.ts` created with canonical NAP. Phase 7 (SEO/Launch) — GBP audit and alignment.

---

### H-04: Hero Image Tanking LCP and CLS

**Severity:** HIGH

**What goes wrong:**
The hero image — the largest contentful element on the page and the LCP candidate — loads without the `priority` prop, as a JPEG instead of AVIF, without explicit `sizes`, or without `width`/`height` (causing CLS as the image loads and shifts content). A 2MB JPEG hero on mobile will never pass Core Web Vitals LCP (target: ≤ 2.5s on mobile). Only ~48% of mobile sites pass all three Core Web Vitals. Lighthouse scores below 90 on mobile undermine trust with enti pubblici and reduce search ranking signal strength.

**Why it happens:**
The hero is built first as a visual prototype, `loading="lazy"` or no optimization attributes are forgotten, and the placeholder image is never replaced with an optimized AVIF. Developers test on fast desktop WiFi and don't notice the mobile performance regression.

**How to avoid:**
The hero `next/image` must have `priority` (not `loading="lazy"`), `sizes="100vw"`, explicit `width` and `height` matching the AVIF dimensions, and the source file must be AVIF (Squoosh or sharp at build time, targeting ≤ 150KB for mobile). Set a Lighthouse mobile budget: LCP < 2.5s, CLS < 0.1, INP < 200ms. Run `pnpm build && pnpm start && lighthouse http://localhost:3000 --only-categories=performance --form-factor=mobile` before closing Phase 2.

**Warning signs:**
Hero `<Image>` without `priority` prop. `loading="lazy"` on any above-the-fold image. Hero source file > 500KB. `width` and `height` absent from the Image component (causes CLS). JPEG hero in `public/images/hero/` with no AVIF conversion.

**Phase to address:** Phase 2 (Homepage) — hero image setup. Phase 7 (SEO/Launch) — final Lighthouse mobile audit.

---

### H-05: "use client" Overuse Bloating JS Bundle

**Severity:** HIGH

**What goes wrong:**
Developer marks large page sections as `"use client"` because one part of the section needs interactivity (e.g., a mobile dropdown), causing the entire component tree to ship as client JavaScript and skip server-side streaming. This is the #1 performance regression identified in Next.js App Router codebases in 2025. For a content-heavy institutional site, it can 2–3x the JS bundle and significantly degrade LCP and INP on mobile.

**Why it happens:**
React habits from the Pages Router carry over. `"use client"` feels "safe" when you're unsure. A section that starts as RSC gets an `onClick` handler added and the entire file gets `"use client"` at the top without extracting the interactive element.

**How to avoid:**
Follow the "donut" pattern: Server Component wraps the Client Component island, passing server-fetched data as props. The `"use client"` boundary sits at the smallest possible leaf: the mobile nav `<button>`, the sticky CTA `<button>`, the form island, the Sonner toast container. Section components in `components/sections/` should be RSC by default. Create a lint rule comment convention: any file with `"use client"` must have a comment explaining why. Periodically audit `next build` output for unexpected client bundles.

**Warning signs:**
`"use client"` at the top of any file in `components/sections/`. Section components that import `useState` or `useEffect` for reasons other than genuine interactivity. `next build` output showing page JS over 50KB for static pages.

**Phase to address:** Phase 1 (Fondamenta) — establish the component boundary convention. Every phase — enforce it in code review.

---

### H-06: Italian URL Slugs With Accents or Uppercase

**Severity:** HIGH

**What goes wrong:**
Project slugs like `Ristrutturazione-Edificio-Storico-Venezia` (uppercase), or `ristrutturazione-edificio-stòrico` (accented), or `Contatti` (capital first letter) cause: (1) duplicate content if Next.js generates both `/progetti/ristrutturazione` and `/progetti/Ristrutturazione`; (2) percent-encoding in URLs (`/progetti/ristrutturazione-edificio-st%C3%B2rico`) that breaks when pasted in plain text (WhatsApp, email), renders confusingly in browser address bars, and can cause routing issues under SSR (a documented Next.js issue with UTF-8 non-ASCII characters in route segments); (3) inconsistent JSON-LD `@id` and canonical URLs.

**Why it happens:**
Project titles are Italian (with accents). A naive `title.toLowerCase().replace(/ /g, "-")` conversion doesn't strip accents. Copy-pasting content as slugs without a normalization step.

**How to avoid:**
Use `slugify` (npm package, handles Italian diacritics: `é → e`, `à → a`, `ò → o`, `ù → u`) or implement a hand-rolled normalizer: `str.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-")`. Enforce this in the `Project` type by adding a Zod refinement in `lib/schema/project.ts`: `slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase ASCII kebab-case")`. Never auto-derive slugs from titles at runtime — define them explicitly in each `content/projects/*.ts` file.

**Warning signs:**
Any slug containing uppercase letters, accented characters, spaces, or underscores. `encodeURIComponent(slug) !== slug` evaluating to `true`. URLs like `/progetti/ristrutturazione-edificio-st%C3%B2rico` in the browser.

**Phase to address:** Phase 1 (Fondamenta) — Zod slug schema with regex constraint. Phase 4 (Progetti) — applied when project content is authored.

---

### H-07: Real Photography Dependency Identified Too Late

**Severity:** HIGH

**What goes wrong:**
Phase 4 (Progetti) arrives and the client has no usable photographs of their completed projects. Or they provide low-resolution WhatsApp photos taken on a phone in bad light. The portfolio page — the single most credibility-generating feature on the site — is forced to launch either with placeholders or poor imagery, undermining months of development work. Unlike code, photography has a minimum lead time of 2–4 weeks (scheduling, shooting, editing, delivery).

**Why it happens:**
Photography is "content" not "code," so it gets deferred. The client underestimates how much photography is needed (10+ projects × 4–8 photos each + hero shots + team/fleet = 80–150+ images). The conversation about photography never happens until the portfolio sprint starts.

**How to avoid:**
Raise the photography requirement explicitly in the first client meeting, before a line of code is written. Provide a specific brief: "We need at least 10 completed project shoots (exterior + interior or detail + context), 1 group team photo or fleet lineup photo, and 1 wide cantiere-in-progress shot for the hero." Set a photography deadline of Phase 3 (before Phase 4 begins). Create placeholder boxes using CSS `aspect-ratio` in the project grid — never use stock images as placeholders. Build Phase 4 to work with real content.

**Warning signs:**
Phase 3 starting without confirmed photography delivery date. Client saying "I'll send photos soon" during Phase 2. Images in `public/images/projects/` that are smaller than 1200px wide.

**Phase to address:** Phase 1 (Fondamenta) — client briefing. Phase 3 (Servizi) — photography delivery deadline checkpoint.

---

### H-08: Form Emails Silently Going to Spam (Resend DNS Misconfiguration)

**Severity:** HIGH

**What goes wrong:**
The contact form submits successfully, Resend returns a 200 OK, the lead gets a nice success toast — but the email never appears in the owner's inbox because SPF, DKIM, or DMARC records are missing or wrong on the domain's DNS. As of 2025, Microsoft Outlook has rolled out hard authentication requirements for all senders, and Gmail has been enforcing them since 2024. A form submission that silently disappears is the worst possible outcome for a lead-gen site. The client will blame the form for not working without realizing the lead emails are in spam.

**Why it happens:**
The developer sets up Resend and sends a test email from a `resend.dev` subdomain. It works. They move on. The production domain (`edilferro.it`) was never configured in Resend's domain settings. DNS records (SPF TXT, DKIM CNAME x2, DMARC TXT) were never added to the domain DNS at the registrar.

**How to avoid:**
In Phase 6: (1) Add the production domain to the Resend dashboard; (2) Add all Resend-required DNS records to `edilferro.it` DNS (Resend generates them explicitly — SPF, two DKIM CNAMEs, optionally DMARC); (3) Wait for DNS propagation (up to 24h) and verify all records show green in Resend's domain dashboard; (4) Send a test lead from the production form and verify delivery in the actual owner inbox. Add this as a Phase 6 acceptance criterion: "Test email received in owner inbox from production domain." Also set up the Resend auto-reply so the lead receives a confirmation — if the lead never gets a reply, they may re-submit or call to complain.

**Warning signs:**
Resend domain status showing "Unverified" or "Pending." SPF record for `edilferro.it` not including `include:amazonses.com` or Resend's designated relay. No DMARC `TXT` record at `_dmarc.edilferro.it`. Owner email is a `@gmail.com` address (this creates deliverability noise; push for a `@edilferro.it` address via the domain email provider).

**Phase to address:** Phase 6 (Contatti) — DNS setup is a blocking prerequisite for form go-live.

---

### H-09: SaaS/Startup Visual Tropes Destroying the Institutional Brand

**Severity:** HIGH

**What goes wrong:**
Animated number counters ("45+" counting up on scroll), gradient backgrounds, scroll-jacked parallax sections, glass-morphism cards, floating CTAs with glow effects, Framer Motion entrance animations on every section. These are startup/SaaS design patterns that signal "tech product" not "45-year local construction company." They actively undermine the "sobrio, istituzionale, non aggressivo" brief and may trigger a client rejection of the entire design in Phase 2. They also harm performance (JS bundles, layout jank) and accessibility (motion sensitivity).

**Why it happens:**
Developers borrow from recent portfolio sites, modern component library demos, or Dribbble shots. Tailwind v4 makes it easy to add gradients; the temptation is real. "Making it look modern" is confused with "making it look startup-y."

**How to avoid:**
Before writing any CSS, internalize the design system rules from CLAUDE.md: grigio scuro + panna + blu brand, whitespace-heavy, no animations beyond CSS `transition-*` on hover states. Perform a "SaaS trope checklist" review at the end of each phase: (1) No `@keyframes` that aren't requested by the user. (2) No gradients on hero or card backgrounds. (3) No animated counters — use static numbers in large type. (4) No floating elements with drop shadows on mobile. (5) No motion on scroll. If you feel tempted to add an effect, check if it would look out of place on the Veneta Cantieri or Carron Costruzioni site — if yes, skip it.

**Warning signs:**
Any `framer-motion` or `motion` import in `package.json`. `@keyframes` blocks beyond `tailwindcss` defaults in `globals.css`. `useInView` hooks in section components. Counter components that animate numbers. CSS `background: linear-gradient(...)` on hero or service card backgrounds.

**Phase to address:** Phase 1 (Fondamenta) — design tokens and base CSS do not include any animation. Every phase — enforced by the "SaaS trope checklist."

---

### H-10: Waiting Until Phase 7 to Think About SEO

**Severity:** HIGH

**What goes wrong:**
SEO is treated as "stuff you add at the end." Every page is built with hardcoded `<title>` tags or no title tags. No `generateMetadata` scaffolding. No canonical URLs. No `hreflang` (even for `it-IT`, the `hreflang="it"` self-referential tag signals the language to Google). No `sitemap.ts`. No `robots.ts`. At Phase 7, retrofitting all of this across all pages is expensive and error-prone. Worse, any preview deploy already indexed by Google during development may have wrong titles cached.

**Why it happens:**
"SEO is a Phase 7 task" becomes "SEO is never done properly." The code structure for metadata (shared `buildMetadata()` helper, `generateMetadata` in each page) needs to be established in Phase 1 to be applied correctly in Phases 2–6.

**How to avoid:**
In Phase 1, create `lib/seo/metadata.ts` with a `buildMetadata()` helper that takes page-specific parameters (title, description, OG image path, canonical path) and returns a `Metadata` object. Every `page.tsx` from Phase 2 onward exports `generateMetadata` using this helper. `app/sitemap.ts` and `app/robots.ts` are created in Phase 1 with placeholder content and updated progressively. The JSON-LD component is created in Phase 1. This way, SEO is structural, not retrofitted.

**Warning signs:**
Any `page.tsx` that does not export `generateMetadata`. Duplicate `<title>` tags across pages (e.g., every page showing the same homepage title). Missing `<link rel="canonical">` in rendered HTML. `sitemap.xml` returning a 404 on the preview deploy. `next build` output showing pages with no metadata.

**Phase to address:** Phase 1 (Fondamenta) — SEO infrastructure scaffolding. Every phase — each page must export `generateMetadata` before the phase is closed.

---

## Moderate Pitfalls (Severity: MEDIUM)

---

### M-01: Form Without Server-Side Validation

**Severity:** MEDIUM

**What goes wrong:**
The contact form validates client-side via Zod/RHF but the Server Action does not re-validate the incoming data. A technically savvy user (or an automated spammer) bypasses the browser form and posts directly to the Server Action endpoint with missing fields or injected data. Email template rendering crashes with a `TypeError: Cannot read property 'name' of undefined`.

**How to avoid:**
The Zod schema in `lib/schema/contact.ts` must be executed in the Server Action (`actions.ts`) via `contactFormSchema.safeParse(formData)` before any Resend call. If parse fails, return `{ ok: false, error: "Dati non validi" }`. Never trust formData to be well-formed.

**Warning signs:**
Server Action that calls `resend.emails.send(...)` before calling `schema.safeParse(...)`. Server Action that accesses `formData.name` directly without parsing. No `try/catch` around the Resend call.

**Phase to address:** Phase 6 (Contatti)

---

### M-02: Missing Canonical URLs on Filtered Portfolio Pages

**Severity:** MEDIUM

**What goes wrong:**
The `/progetti` page accepts filter `searchParams` (categoria, zona, committente). The URL `/progetti?categoria=ristrutturazione&zona=mestre` is a distinct URL from `/progetti`. Google may attempt to index multiple filter combinations as separate pages, creating duplicate content dilution. The filtered variations should canonicalize to `/progetti`.

**How to avoid:**
In `generateMetadata` for `app/progetti/page.tsx`, always return `alternates: { canonical: "/progetti" }` regardless of the active filters. This tells Google that all filter combinations are variations of the same canonical page. Apply the same pattern to any other pages that accept `searchParams`.

**Warning signs:**
Google Search Console showing dozens of `/progetti?...` URLs indexed as separate pages. No `<link rel="canonical">` in the `<head>` of `/progetti` when filters are active.

**Phase to address:** Phase 4 (Progetti)

---

### M-03: Open Graph Images Missing or Generic

**Severity:** MEDIUM

**What goes wrong:**
When a project detail URL is shared in a WhatsApp message between professionals (a primary referral channel for architects and engineers in Italy), the link preview shows a blank image or the default site logo. This is a missed high-impact touchpoint. For an impresa edile, a project cover photo in the WhatsApp preview is worth more than the URL alone.

**How to avoid:**
In Phase 4, each project detail page generates a per-project OG image: either use `app/progetti/[slug]/opengraph-image.tsx` (Next.js App Router convention) or pre-generate static OG images stored in `public/images/og/projects/{slug}.jpg`. Ensure the default `opengraph-image.jpg` in `app/` is a real brand-consistent image (not the Next.js default blue square).

**Warning signs:**
Sharing a project URL in WhatsApp and seeing a blank preview image. `<meta property="og:image">` in page source pointing to a placeholder or the generic default. Missing `opengraph-image.tsx` in project slug directory.

**Phase to address:** Phase 4 (Progetti)

---

### M-04: Google Fonts Loaded via `<link>` at Runtime

**Severity:** MEDIUM

**What goes wrong:**
Even a well-intentioned developer may write `<link href="https://fonts.googleapis.com/css2?family=Inter..." rel="stylesheet">` in `app/layout.tsx` instead of using `next/font/google`. This hits `fonts.googleapis.com` at runtime on every page load: (1) DNS resolution adds latency; (2) fonts.googleapis.com has been flagged by German courts (and Italian Garante-aligned posture) for transmitting IP addresses to Google servers without adequate consent; (3) FOUT occurs because the font isn't preloaded at build time.

**How to avoid:**
Use `next/font/google` exclusively. It downloads the font files at build time, self-hosts them as part of the Next.js deployment, and injects a preload hint — zero external requests, zero GDPR concern, zero FOUT.

**Warning signs:**
Any `fonts.googleapis.com` or `fonts.gstatic.com` request in the browser's Network tab. A `<link rel="stylesheet">` pointing to `googleapis.com` in the rendered HTML. FOUT visible when throttling to Slow 3G in DevTools.

**Phase to address:** Phase 1 (Fondamenta)

---

### M-05: Missing Alt Text on Project Gallery Images

**Severity:** MEDIUM

**What goes wrong:**
Gallery images are rendered with `alt=""` (empty, which is valid for decorative images) or without any `alt` attribute. For the project portfolio — the primary credibility section — every image is informational, not decorative. Screen readers skip images with empty alt text. Google uses alt text as an image ranking signal for image search and page understanding. For enti pubblici who may have accessibility auditors reviewing the site, missing alt on informational images fails WCAG 2.1 AA Success Criterion 1.1.1.

**How to avoid:**
The `ProjectImage` type in `types/content.ts` includes `alt: string` as a required field. The Zod schema in `lib/schema/project.ts` enforces `alt: z.string().min(10)` (minimum 10 characters to prevent `alt="image"` fillers). Each project file in `content/projects/` must supply descriptive Italian alt text per image: `"Restauro facciata palazzo storico in centro a Mestre, 2024 — Edilferro SRL"`. The `eslint-plugin-jsx-a11y` rule `jsx-a11y/alt-text` catches any `<Image>` without an `alt` attribute.

**Warning signs:**
Images in `components/sections/project-gallery.tsx` with `alt=""`. The `ProjectImage` type not requiring `alt`. `eslint-plugin-jsx-a11y` not installed. `npm run lint` not running `jsx-a11y` rules.

**Phase to address:** Phase 1 (Fondamenta) — type enforcement. Phase 4 (Progetti) — content authoring.

---

### M-06: Color Contrast Failures on Brand Palette

**Severity:** MEDIUM

**What goes wrong:**
The brand palette (grigio scuro / panna / blu brand) is defined by aesthetic judgment in Phase 1 without checking WCAG AA contrast ratios. A "panna" background that reads as warm off-white might produce a 3.8:1 ratio against medium-gray body text — below the 4.5:1 WCAG AA threshold. Blue brand CTAs on dark backgrounds may fail the 3:1 large-text threshold. These failures are invisible to the naked eye under good lighting but fail automated accessibility scanners and become embarrassing if an ente pubblico's technical office runs an accessibility audit.

**How to avoid:**
Define the exact hex values for the three brand colors before writing any CSS. Check every foreground/background combination via WebAIM Contrast Checker or `axe-core` before Phase 1 closes: body text on panna background (target ≥ 4.5:1), CTA button text on blu brand (target ≥ 4.5:1), large headings on panna (target ≥ 3:1), white text on grigio scuro (target ≥ 4.5:1). Document the passing values as Tailwind v4 `@theme` tokens so no ad-hoc color can accidentally be used outside the validated palette.

**Warning signs:**
Color tokens defined as "near black" / "near white" without explicit hex values or contrast testing. Any color variable that is not in the validated token set appearing in component CSS.

**Phase to address:** Phase 1 (Fondamenta) — before any component CSS is written.

---

### M-07: Hardcoded Content Spread Across Components

**Severity:** MEDIUM

**What goes wrong:**
Company name, phone number, address, services list, and certification details are written directly in JSX props and string literals across 15 different components. When the client changes the phone number, or the SOA attestazione is renewed with a new class, or a new service is added, the developer must hunt through the entire codebase to find every occurrence. This is guaranteed to cause inconsistencies.

**How to avoid:**
All content lives in `content/`. All structured data (NAP, services, certifications, mezzi, legal, team stats) is authored in typed TS modules and imported by components. The ARCHITECTURE.md convention (`content/site.ts` for NAP, `content/legal.ts` for legal data, `content/services.ts` for services, etc.) must be enforced from Phase 1. No string literal in a component may contain a phone number, address, or company name — always import from `content/`.

**Warning signs:**
`grep -r "041" app/ components/` returning phone numbers in component files. Company name hardcoded as a string literal in more than one place. `grep -r "P.IVA" components/` returning matches outside `components/business/site-footer-legal.tsx`.

**Phase to address:** Phase 1 (Fondamenta)

---

### M-08: Scope Creep into CMS, Multilingual, or Blog Before MVP Ships

**Severity:** MEDIUM

**What goes wrong:**
During Phase 3 or 4, the client asks: "Can we add a blog?" or "Can we also do the English version for international clients?" or "Can I edit the content myself without asking you?" These are legitimate long-term goals that each represent a 2–4 week scope addition. If entertained during MVP development, they delay launch, add complexity, and often produce a half-finished result (a blog with 2 posts, a bilingual site where only the Home page is translated, a CMS where only the portfolio is editable).

**How to avoid:**
The scope for Phase 1–7 is fixed: 5 pages, static content, no CMS, no multilingual, no blog. Document this in `CLAUDE.md` (already done). When the client raises a CMS request, respond: "Planned for Phase 8 — we can add Payload CMS after launch and validate the need." When they raise multilingual: "Listed in STACK.md as a post-launch variant with `next-intl`." These are not rejections — they are deferrals with a documented path. Every scope-creep conversation should result in a note in `.planning/POST_LAUNCH.md`, not a code change.

**Warning signs:**
A new package in `package.json` that is not in STACK.md. A new route in `app/` that is not in the 5-page MVP list. An `[locale]` segment appearing in the app router. `@next/mdx` or `content-collections` being added.

**Phase to address:** Every phase — project manager role.

---

## Minor Pitfalls (Severity: LOW)

---

### L-01: `next lint` Command Used (Removed in Next.js 16)

**Severity:** LOW

**What goes wrong:**
`package.json` scripts include `"lint": "next lint"`. In Next.js 16, the `next lint` subcommand was removed. Running it throws `Error: No such command: lint`. This breaks CI, `pnpm lint`, and the pre-commit hook silently (or noisily).

**How to avoid:**
In Phase 1, set `"lint": "eslint ."` using the flat ESLint 9 config (`eslint.config.mjs`). This is already in STACK.md but is easy to miss when copying boilerplate from older tutorials.

**Warning signs:**
`next lint` in any `package.json` script. A `pnpm lint` that fails with "No such command."

**Phase to address:** Phase 1 (Fondamenta)

---

### L-02: `.env.local` Committed to Git

**Severity:** LOW (but non-recoverable)

**What goes wrong:**
`RESEND_API_KEY`, `TURNSTILE_SECRET`, or `OWNER_EMAIL` gets committed to the repository. The API key becomes public on GitHub. Resend API keys allow sending unlimited emails from the domain — a spam liability and a billing risk.

**How to avoid:**
`.env.local` must be in `.gitignore` from Phase 1 commit zero. Create `.env.example` (checked into git) with placeholder values. Add a Phase 1 acceptance criterion: `git log -- .env.local` must be empty.

**Warning signs:**
`.env.local` not in `.gitignore`. `git status` showing `.env.local` as a tracked file. `git log --all -- .env.local` showing any commits.

**Phase to address:** Phase 1 (Fondamenta)

---

### L-03: 404 Page and Error Boundaries Not Styled to Match the Brand

**Severity:** LOW

**What goes wrong:**
`app/not-found.tsx` is left as the Next.js default (blue gradient, generic "404 — page not found" text). A user who misses a project URL or follows a broken link lands on an out-of-brand page. For enti pubblici accustomed to consistent institutional sites, this reads as "unfinished."

**How to avoid:**
Implement `app/not-found.tsx` in Phase 1 with the brand palette, the site header, a "Pagina non trovata" message, and a single CTA button linking to the homepage and to `/contatti`. No generic Next.js default.

**Phase to address:** Phase 1 (Fondamenta)

---

### L-04: `sitemap.ts` Not Including Project Detail Pages

**Severity:** LOW

**What goes wrong:**
The built-in `app/sitemap.ts` is created with static routes but not updated to include the dynamic `/progetti/[slug]` pages. Google cannot discover individual project pages through the sitemap and must rely on following links from the portfolio grid — slower indexation and potential missed pages.

**How to avoid:**
In Phase 4, update `app/sitemap.ts` to call `getAllProjects()` and append each `{ url: "/progetti/${project.slug}", lastModified: new Date(project.anno, 0) }` to the sitemap entries. Verify `https://edilferro.it/sitemap.xml` shows all project URLs after Phase 4 preview deploy.

**Phase to address:** Phase 4 (Progetti)

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|---|---|---|---|
| Hardcoding NAP in component JSX | Faster Phase 1 build | Cannot update one source of truth; inconsistency guaranteed | Never — `content/site.ts` is 5 minutes of work |
| Stock photos as permanent placeholder | Page looks filled | Client never pressures for real photos; credibility permanently compromised | Never — use colored placeholder divs instead |
| Skipping Zod validation in Server Action | Shorter action code | Crashes on malformed POST, no graceful error to user | Never — two lines of code prevent it |
| No `.env.example` file | One less file to maintain | New environment setup requires guessing required vars | Never — critical for maintainability |
| Deferring JSON-LD to Phase 7 | Focus on visible UI | SEO infrastructure is an afterthought, harder to retrofit per-page | Acceptable only if the Phase 1 scaffold (`lib/seo/json-ld.ts`) is created — defer populating, not creating |
| Keeping `next lint` in package.json | Familiar DX | Breaks CI in Next.js 16 silently | Never |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|---|---|---|
| **Resend** | Testing only with `@resend.dev` sandbox, never verifying the production domain DNS | Add production domain to Resend dashboard in Phase 6, verify all DNS records green before form goes live |
| **Cloudflare Turnstile** | Forgetting server-side token verification — only validating client-side | `lib/turnstile.ts` always calls `https://challenges.cloudflare.com/turnstile/v0/siteverify` in the Server Action before processing the form |
| **Vercel Analytics** | Adding `<Analytics />` inside a Client Component wrapper | `<Analytics />` must be in `app/layout.tsx` as an RSC — it does not need `"use client"` |
| **`next/font/google`** | Using the font variable name as a class but forgetting to pass it to the root `<html>` element | The font CSS variable must be applied to `<html className={fontVariable.variable}>` in `app/layout.tsx` |
| **`schema-dts`** | Using `@type: "LocalBusiness"` instead of the specific subtype | Use `@type: "GeneralContractor"` — it extends `HomeAndConstructionBusiness → LocalBusiness`, which is the correct hierarchy for Google's local index |
| **Tailwind v4** | Using `tailwind.config.js` as the primary token source | In v4, tokens live in `app/globals.css` under `@theme { }`. Using both creates two sources of truth that drift. |
| **Server Actions** | Marking the route segment as Edge Runtime while using `resend@4.x` | Resend SDK requires Node runtime. Do not set `export const runtime = "edge"` in `app/contatti/actions.ts`. |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|---|---|---|---|
| Hero JPEG instead of AVIF | LCP > 3s on mobile, Lighthouse score < 80 | Convert to AVIF at ≤ 150KB with `squoosh`, use `priority` | Any mobile device on 4G |
| Project gallery loading all images eagerly | Phase 4 portfolio page has INP > 500ms, page weight > 5MB | Use `loading="lazy"` on gallery images (not hero), implement `sizes` with viewport-relative values | Any page with > 8 project images |
| `"use client"` on section-level components | JS bundle > 100KB on static pages, LCP regression, no streaming | Keep `"use client"` only at leaf interactive components | Every page load |
| Turnstile script loaded globally in `app/layout.tsx` | Adds Turnstile JS weight on every page, not just `/contatti` | Load Turnstile only in `components/sections/contact-form.tsx` via `@marsidev/react-turnstile` (it lazy-loads the Cloudflare script) | Every page except `/contatti` |
| Project portfolio images with no `sizes` attribute | Browser downloads desktop-resolution images on mobile | Add `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"` to all project grid images | All mobile devices |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---|---|---|
| Server Action not re-validating form data | Malformed payloads crash the action or inject unexpected content | Always call `schema.safeParse()` as the first line of the Server Action |
| `RESEND_API_KEY` committed to git | Spam abuse, billing fraud, domain reputation damage | `.env.local` in `.gitignore` from commit zero |
| Turnstile token not verified server-side | Bot submissions bypass client-side Turnstile entirely | `lib/turnstile.ts` calls Cloudflare siteverify in every form submission |
| PDF files in `public/docs/` without considering content sensitivity | SOA attestazioni contain company data; downloadable by anyone | This is acceptable and intended for enti pubblici verification; do not gate behind auth |
| No rate limiting on the Server Action | Spam flood even with Turnstile (in edge cases) | Turnstile + honeypot is sufficient at this scale; optionally add Vercel Edge Config rate limiting in Phase 7 if form abuse is observed post-launch |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---|---|---|
| Primary CTA only in the header | Mobile users who scroll past the header lose the CTA; bounce rate increases | Mobile sticky bottom bar (`mobile-sticky-cta.tsx`) + final-section CTA band on every important page |
| Contact form with 12+ required fields | Italian professional clients abandon forms with excessive required fields | Maximum 8 fields; make Zona and Tipo richiedente optional selects, not required |
| Form success state not clearly communicated | User submits, sees nothing change, submits again, owner receives duplicate leads | Sonner toast ("Richiesta inviata! La contatteremo entro 24 ore.") + disable the submit button after first submission until server responds |
| No fallback contact if form fails | User can't reach the company if the Server Action is down | Phone and email always visible on the page alongside the form — never form-only |
| Tap targets smaller than 44px on mobile | Older users (common in construction B2B) fail to activate buttons | All interactive elements ≥ 44×44px CSS pixel; verify with Chrome DevTools mobile emulator |
| Service area not stated clearly | Veneto-area visitors unsure if the company serves their comune | Explicit "Operiamo su Mestre, Venezia, Marghera, Mirano, Mogliano, Veneto" line near the CTA on the homepage |

---

## "Looks Done But Isn't" Checklist

- [ ] **Contact form:** Verify the actual owner email account receives the lead notification. Don't assume — send a real test.
- [ ] **Privacy consent checkbox:** Verify the Server Action rejects submissions with `privacy_consent = false`. Test with Postman or curl.
- [ ] **Cookie posture:** Verify no `document.cookie` write or Set-Cookie header is generated for non-technical purposes on any page. Check with browser DevTools > Application > Cookies.
- [ ] **JSON-LD:** Paste the page source into Google Rich Results Test. Verify `GeneralContractor` type and no errors.
- [ ] **Sitemap:** Verify `https://edilferro.it/sitemap.xml` is reachable and includes all 5+ routes plus project slugs.
- [ ] **P.IVA footer:** Verify P.IVA, REA, sede legale, and capitale sociale are visible on every page in a browser session.
- [ ] **Lighthouse mobile:** Run Lighthouse against the production URL from an external server (not localhost) in mobile mode. Target: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms.
- [ ] **Alt text:** Run `axe-core` browser extension on every page and verify zero "image missing alternative text" violations.
- [ ] **Slug safety:** Verify no project slug contains accents, uppercase, or spaces. `curl -I https://edilferro.it/progetti/some-project` should return 200, not 404 or redirect loop.
- [ ] **NAP consistency:** Compare site footer, JSON-LD, and Google Business Profile for name/address/phone — must be character-for-character identical.
- [ ] **Resend DNS:** Check Resend domain dashboard — all DNS records must show green verification before form launch.
- [ ] **No `.env.local` in git:** `git log --all -- .env.local` must return empty.

---

## Pitfall-to-Phase Mapping

| Pitfall | Phase | Verification |
|---|---|---|
| C-07: Missing P.IVA/REA in footer | Phase 1 | Footer renders P.IVA on every page |
| C-01: GA4 without safeguards | Phase 1 | No `gtag` or GA4 in `app/layout.tsx` |
| H-02: JSON-LD absent/malformed (scaffold) | Phase 1 | `lib/seo/json-ld.ts` and `json-ld.tsx` exist with typed schema |
| H-03: NAP inconsistency (source of truth) | Phase 1 | `content/site.ts` created; all NAP references import from it |
| H-05: `use client` overuse | Phase 1 | Convention documented; section components are RSC |
| H-06: Italian slugs with accents | Phase 1 | Zod slug schema with `^[a-z0-9-]+$` regex |
| H-09: SaaS visual tropes | Phase 1 | Design tokens have no gradients, no `@keyframes` |
| H-10: SEO deferred to Phase 7 | Phase 1 | `buildMetadata()` helper and `sitemap.ts`/`robots.ts` scaffolded |
| M-04: Google Fonts via `<link>` | Phase 1 | `next/font/google` in `app/layout.tsx`, no googleapis.com in `<head>` |
| M-06: Color contrast failures | Phase 1 | All brand token combinations pass 4.5:1 via WebAIM check |
| M-07: Hardcoded content | Phase 1 | All content in `content/` modules, no strings in components |
| L-01: `next lint` in package.json | Phase 1 | `"lint": "eslint ."` in package.json |
| L-02: `.env.local` in git | Phase 1 | `.gitignore` covers `.env.local`; `.env.example` committed |
| L-03: Unstyled 404 page | Phase 1 | `app/not-found.tsx` matches brand |
| H-01: Stock photography | Phase 1 (flag) / Phase 2 (block) | Client photography brief delivered in Phase 1; Phase 2 preview uses real images |
| H-04: Hero image LCP/CLS | Phase 2 | Hero uses `priority`, AVIF ≤ 150KB, explicit `width`/`height` |
| H-09: SaaS tropes (per-phase check) | Phase 2+ | SaaS trope checklist passed for each phase |
| H-07: Photography dependency | Phase 3 checkpoint | Photography delivery confirmed before Phase 4 starts |
| M-02: Missing canonical on filtered pages | Phase 4 | `/progetti?...` has `canonical: "/progetti"` in metadata |
| M-03: Missing OG images for projects | Phase 4 | Each project slug has OG image; verified via WhatsApp link preview |
| L-04: Sitemap missing project slugs | Phase 4 | `sitemap.xml` includes all `/progetti/[slug]` entries |
| M-05: Missing alt text on project images | Phase 4 | Zod enforces `alt: z.string().min(10)` on all `ProjectImage` entries |
| C-05: Form without privacy notice/consent | Phase 6 | Form has consent checkbox; Server Action validates it |
| H-08: Resend DNS misconfiguration | Phase 6 | All DNS records green in Resend dashboard; test email received |
| C-02: reCAPTCHA (never add) | Phase 6 | Only Turnstile + honeypot on form |
| C-03: Google Maps iframe | Phase 6 | Static map image + link, no `maps.googleapis.com` in Network tab |
| M-01: No server-side form validation | Phase 6 | Server Action calls `safeParse()` before Resend |
| C-04: Cookie banner done wrong (if added) | Phase 7 | No non-technical cookies without a compliant banner |
| C-06: Privacy policy missing Titolare | Phase 7 | Privacy page includes Titolare, Garante link, retention periods |
| H-02: JSON-LD (enrich and validate) | Phase 7 | Rich Results Test returns no errors |
| H-03: NAP / GBP alignment | Phase 7 | GBP phone, address, name match `content/site.ts` exactly |
| H-04: Lighthouse mobile (final audit) | Phase 7 | Lighthouse mobile: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms |

---

## Sources

- Italian Garante Order No. 224 (June 9, 2022) — GA/Google Analytics ruling: [DLA Piper Privacy Matters](https://blogs.dlapiper.com/privacymatters/italy-the-garante-aligns-with-cnil-and-dsb-holding-that-the-use-of-google-analytics-leads-to-unlawful-transfer-of-personal-data/)
- Italian Garante cookie guidelines (2021, binding 2026): [Didomi](https://www.didomi.io/blog/italian-garante-new-guidelines), [CookieYes](https://www.cookieyes.com/blog/cookie-consent-requirements-in-italy/), [Clickport](https://clickport.io/blog/privacy-analytics-italy)
- Ediscom dark patterns case (€300k fine, Feb 2023): [Hunton Privacy Blog](https://www.huntonprivacyblog.com/2022/06/30/italian-garante-bans-google-analytics/)
- Italy GDPR double opt-in marketing consent (July 2025): [DLA Piper Privacy Matters](https://privacymatters.dlapiper.com/2025/07/italy-marketing-privacy-consent-is-double-opt-in-now-mandatory/)
- Next.js JSON-LD guide (schema-dts, GeneralContractor): [nextjs.org/docs/app/guides/json-ld](https://nextjs.org/docs/app/guides/json-ld)
- Core Web Vitals LCP/CLS/INP 2026: [RoastWeb](https://roastweb.com/blog/core-web-vitals-explained-2026), [Next.js CWV guide](https://eastondev.com/blog/en/posts/dev/20251219-nextjs-core-web-vitals/)
- Next.js App Router "use client" pitfalls: [Vercel blog](https://vercel.com/blog/common-mistakes-with-the-next-js-app-router-and-how-to-fix-them), [LogRocket](https://blog.logrocket.com/react-server-components-performance-mistakes)
- NAP consistency and local pack ranking: [BrightLocal](https://www.brightlocal.com/learn/what-is-nap/), [GMB Management USA](https://gmbmanagementusa.com/blogs/nap-consistency-local-seo/)
- Italian slug / UTF-8 issues in Next.js: [Next.js GitHub issue #10084](https://github.com/vercel/next.js/issues/10084)
- Real photography vs. stock conversion impact: [CXL/Marketing Experiments](https://cxl.com/blog/stock-photography-vs-real-photos-cant-use/), [Design Web Local](https://designweblocal.com/local-vs-stock-photography-the-data-behind-authentic-visual-content/)
- Resend email authentication and DNS setup: [Resend blog](https://resend.com/blog/email-authentication-a-developers-guide), [Mailtrap deliverability guide](https://mailtrap.io/blog/how-to-improve-email-deliverability/)
- Italian Stanca Law / AgID accessibility (WCAG 2.1 AA): [OpenAble](https://www.openable.it/en/legal-requirements/%F0%9F%87%AE%F0%9F%87%B9-agid/), [UsableNet](https://blog.usablenet.com/what-companies-need-to-know-about-italys-digital-accessibility-law)
- GDPR lead generation and form compliance: [Prospeo GDPR guide](https://prospeo.io/s/gdpr-lead-generation), [MakeForms](https://makeforms.io/blog/gdpr-compliant-lead-generation-guide)
- SOA certification requirements: [ESNA-SOA](https://esnasoa.it/en/), [Cqop FAQ](https://www.cqop.it/en/faq/)

---

*Pitfalls research for: institutional corporate website / lead generation — local Italian construction company (Mestre/Venezia/Veneto)*
*Researched: 2026-04-13*
*Overall confidence: HIGH*
