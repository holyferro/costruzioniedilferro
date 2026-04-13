# CLAUDE — Impresa Edile SRL Website

## Project Context
Questo progetto implementa il sito web istituzionale di un’impresa edile locale storica.
La strategia di business, gli obiettivi, il tone of voice e la roadmap sono definiti in `.planning/PROJECT.md`.

## Stack
- TypeScript strict
- Next.js App Router
- Tailwind CSS
- Deployment su Vercel
- Versionamento GitHub

## Frontend Architecture
- usare React Server Components di default
- usare Client Components solo per interazioni reali
- layout condivisi in `app/layout.tsx`
- sezioni pagina in `components/sections`
- componenti UI riutilizzabili in `components/ui`
- componenti dominio business in `components/business`

## Design System Rules
- design professionale, sobrio e istituzionale
- forte uso di whitespace
- layout puliti e facili da scansionare
- gerarchia visiva forte tra titoli, trust signals e CTA
- immagini grandi e credibili
- mobile-first sempre
- evitare effetti vistosi o look startup/SaaS

## Brand Palette
- grigio scuro per titoli e struttura
- panna/off-white per sfondi
- blu brand per CTA e dettagli
- contrasto sempre alto per leggibilità

## Typography Rules
- font puliti, autorevoli, leggibili
- titoli forti ma non aggressivi
- body copy semplice e chiaro
- ottima leggibilità mobile

## CTA Rules
- CTA primaria globale: "Richiedi un sopralluogo"
- CTA sempre above the fold in Home
- CTA finale in ogni pagina importante
- su mobile CTA facilmente raggiungibili

## Assets Rules
- tutte le immagini statiche in `public/images`
- usare sempre `next/image`
- preferire foto reali di cantieri, team e mezzi
- alt text descrittivi
- evitare immagini stock poco credibili

## Performance Rules
- immagini ottimizzate
- evitare componenti pesanti
- limitare animazioni inutili
- attenzione a Lighthouse mobile
- mantenere ottima performance su Vercel

## Code Style
- prefer named exports
- evitare `any`
- componenti piccoli e leggibili
- massimo riuso dei componenti
- separare UI, contenuti e business logic
- evitare hardcoded ripetuti

## Deployment Workflow
- sviluppo locale con VS Code + Claude Code
- push frequenti su GitHub
- preview deploy automatiche su Vercel
- branch main per produzione
- ogni milestone GSD deve poter essere deployabile

## Commands
- dev: `pnpm dev`
- build: `pnpm build`
- lint: `pnpm lint`
- typecheck: `pnpm typecheck`

## Safety Rules
- non introdurre dipendenze senza reale necessità
- mantenere il progetto semplice e facilmente deployabile
- prima di chiudere modifiche importanti eseguire lint e typecheck
- non rompere la coerenza visuale tra le pagine
- preferire semplicità e chiarezza alla complessità

<!-- GSD:project-start source:PROJECT.md -->
## Project

**PROJECT — Sito Web Impresa Edile SRL**
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## TL;DR
## Lock-ins from CLAUDE.md — Validation
| User Choice | Verdict | Notes |
|---|---|---|
| TypeScript strict | VALIDATED | Standard for 2026 Next.js projects. Keep `strict: true`, add `noUncheckedIndexedAccess: true`. |
| Next.js App Router | VALIDATED | Next.js 16 (stable Nov 2025, current 16.2.3) makes Turbopack the default bundler, ships React 19.2 via Canary, and Next 16 removed `next lint` so ESLint must be configured directly. (HIGH) |
| Tailwind CSS | VALIDATED — but **use v4.2** | v4 is a complete rewrite with CSS-first config (`@theme`), 5x faster full builds, 100x faster incremental. No more `tailwind.config.js` unless you want one. shadcn/ui now defaults to v4. (HIGH) |
| Deployment su Vercel | VALIDATED | First-class for Next.js 16, zero-config ISR, edge functions, preview deploys, built-in analytics. |
| pnpm | VALIDATED | Disk-efficient, strict hoisting, plays well with Next.js 16 and Vercel. |
| RSC by default, Client Components solo per interazioni | VALIDATED | Matches Next.js 16 idioms. Perfect for a content-heavy institutional site. |
| next/image | VALIDATED | Automatic AVIF/WebP, responsive `srcset`, CLS-safe. Keep it. |
## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|---|---|---|---|
| **Next.js** | `16.2.x` | React framework, App Router, SSG/ISR, Server Actions, metadata API, sitemap/robots conventions | 2026 standard for content+forms sites. App Router gives RSC-by-default (tiny JS payloads — critical for Lighthouse mobile), Server Actions remove the need for a separate API layer for the contact form, built-in `sitemap.ts`/`robots.ts`/`generateMetadata` cover SEO without extra deps. (HIGH — Context7 + nextjs.org) |
| **React** | `19.2.x` | UI runtime | Shipped via Next.js 16 Canary channel. Stable `useActionState`, `useFormStatus`, and `<form action={serverAction}>` are exactly what the "Richiedi un sopralluogo" form needs. (HIGH) |
| **TypeScript** | `5.7.x+` | Type safety, strict mode | Non-negotiable in 2026. Required for type-safe forms (Zod → RHF → Server Action). (HIGH) |
| **Tailwind CSS** | `4.2.x` | Styling system, design tokens, utility classes | v4 lets us define the brand palette (grigio scuro / panna / blu brand) and typography scale directly in `globals.css` via `@theme`, keeping the design system colocated with the code. 100x faster incremental builds are a real DX win. (HIGH — tailwindcss.com) |
| **pnpm** | `10.x` | Package manager | User-locked. Faster installs, stricter dependency graph. (HIGH) |
### Supporting Libraries (production)
| Library | Version | Purpose | When/Why to Use |
|---|---|---|---|
| **react-hook-form** | `7.72.x` | Form state, uncontrolled inputs, minimal re-renders | The "Richiedi un sopralluogo" lead form is the single most important conversion surface on the site. RHF keeps the form client-light (one `"use client"` island) and plays natively with Zod resolvers. (HIGH — npm verified 2026-04) |
| **zod** | `3.25.x` (stay on v3) | Runtime schema validation, type inference | Drives both client-side validation (via `@hookform/resolvers/zod`) and Server Action validation (same schema, no duplication). **Recommendation: stay on Zod 3 for now.** Zod 4 is published under the `zod/v4` subpath and is stable, but the breaking changes (optional/default behavior, error message format, coerce input types) don't buy us anything for a simple contact form. Revisit at the end of Phase 7. (HIGH) |
| **@hookform/resolvers** | `3.10.x` | Glue between RHF and Zod | Standard pairing. (HIGH) |
| **resend** | `4.x` | Transactional email delivery (contact form → owner inbox + auto-reply to lead) | Developer-first email API, first-class Next.js docs, free tier covers 3k emails/month (way more than a local impresa edile will ever need), excellent deliverability, works inside Server Actions. **Requires a verified domain** (e.g. `edilferro.it`) — plan for DNS setup in Phase 6. (HIGH — resend.com/docs/send-with-nextjs) |
| **react-email** | `3.x` (optional) | Author transactional emails as React components | Lets us design the lead notification and the auto-reply in the same idiom as the rest of the site. Optional — a plain HTML template is also fine for MVP. (MEDIUM) |
| **@marsidev/react-turnstile** | `1.x` | Cloudflare Turnstile widget for React | Invisible/low-friction CAPTCHA. Chosen over hCaptcha and reCAPTCHA v3 because: (1) it is fully GDPR-safe and never used for ad retargeting — critical for Italy post-Garante; (2) most users pass with zero interaction (no visual puzzles breaking the institutional UX); (3) free, no per-request limits at this scale. Server-side verification happens in the Server Action. (HIGH) |
| **schema-dts** | `1.1.x` | TypeScript types for Schema.org JSON-LD | Lets us author the `LocalBusiness` / `GeneralContractor` JSON-LD block with full autocomplete and type checking, zero runtime cost. Maintained by Google. (HIGH — Next.js official JSON-LD guide recommends this pattern) |
| **lucide-react** | `0.4xx.x` | Icon system | 1,500+ icons, tree-shakeable (each icon ≈ 1KB), thin and geometric — aligns with the "sobrio, istituzionale, minimalista" brief. Preferred over Heroicons (only ~300 icons, not enough for a multi-section corporate site) and Phosphor (heavier default weight). (HIGH) |
| **clsx** | `2.1.x` | Conditional class merging | 200-byte helper. Required for readable conditional Tailwind classes. (HIGH) |
| **tailwind-merge** | `2.5.x` | Resolve Tailwind class conflicts | Pairs with `clsx` via a `cn()` helper — standard shadcn/ui pattern. Prevents subtle bugs where `className` overrides collide. (HIGH) |
| **sonner** | `1.7.x` | Toast notifications for form success/error feedback | Tiny, accessible, RSC-friendly, no hook plumbing. Replaces `react-hot-toast` (unmaintained API drift) and the old shadcn `<Toast />` (deprecated). Needed only on the contact page — one client island. (HIGH) |
### Supporting Libraries (dev-only)
| Library | Version | Purpose | Notes |
|---|---|---|---|
| **@vercel/analytics** | `1.4.x` | Privacy-first web analytics | Cookieless, aggregated, no PII — **GDPR-compliant without a cookie banner for analytics purposes**, which is exactly what the Italian Garante wants. One-liner `<Analytics />` in `app/layout.tsx`. (HIGH — vercel.com/docs/analytics/privacy-policy) |
| **@vercel/speed-insights** | `1.1.x` | Core Web Vitals monitoring | Same cookieless model. Lets us defend the "ottima performance Lighthouse mobile" rule over time. (HIGH) |
| **eslint** | `9.x` (flat config) | Linting | Next.js 16 **removed `next lint`**, so we configure ESLint directly. Flat config (`eslint.config.mjs`) is the 2026 default. (HIGH) |
| **eslint-config-next** | `16.x` | Next.js + React rules preset | Still published and maintained even after `next lint` removal. |
| **eslint-plugin-jsx-a11y** | `6.10.x` | Static a11y checks on JSX | Enforces `alt` text (directly addresses the user's "alt text descrittivi" rule), label associations, ARIA roles. Cheap insurance for WCAG AA. (HIGH) |
| **@typescript-eslint/*** | `8.x` | TS-aware lint rules | Keep type-aware rules in CI only to avoid slowing local dev. |
| **eslint-config-prettier** | `9.x` | Disable ESLint formatting rules | Must be last in the extends chain. |
| **prettier** | `3.4.x` | Code formatting | With `prettier-plugin-tailwindcss` to auto-sort Tailwind classes — crucial for diff hygiene across many section components. (HIGH) |
| **prettier-plugin-tailwindcss** | `0.6.x` | Class sorting | Official Tailwind plugin. |
| **husky** | `9.x` | Git hooks | `pre-commit` → `lint-staged`. |
| **lint-staged** | `15.x` | Run linters only on staged files | Keeps commits fast. |
### Development Tools
| Tool | Purpose | Notes |
|---|---|---|
| **VS Code + official Tailwind / ESLint / Prettier extensions** | Editor integration | User already uses VS Code per CLAUDE.md. |
| **Vercel Preview Deploys** | Per-PR staging | Already in workflow per CLAUDE.md. Lets the client review every phase without local setup. |
| **Google Rich Results Test** | Validate JSON-LD before launch | Manual check at end of Phase 7, not a dep. |
| **Google Search Console + Bing Webmaster Tools** | Submit sitemap, monitor indexation | Register the production domain before launch. |
| **PageSpeed Insights / Lighthouse CI (optional)** | Performance budget enforcement | Optional GH Action in Phase 7. |
## Installation
# Core — Next.js 16 scaffold (run once, bootstraps React 19, TS strict, Tailwind v4, App Router, pnpm)
# Forms + validation + email + spam protection
# UI helpers
# SEO / structured data
# Analytics (Vercel, privacy-first)
# Optional: transactional email templates as React components
# Dev tooling
# Initialize husky
## Alternatives Considered
| Category | Recommended | Alternative | Why NOT the alternative (for THIS project) |
|---|---|---|---|
| **CMS** | None — static MDX / TS content objects committed to git | Sanity / Contentful / Payload | A 5-page institutional site updated a few times a year does not justify a CMS. Cost: $0–$300+/month, vendor lock-in, another account for the client, another system to secure, draft-mode plumbing. The MVP pages (Home / Servizi / Progetti / Chi siamo / Contatti) are fundamentally static. **If** the client later wants to self-manage the `Progetti` gallery, revisit with **Payload CMS** (self-host on Vercel + Postgres, no per-seat fees, TS-native). Flag for PITFALLS.md. (HIGH confidence on this decision for MVP.) |
| **Form validation** | Zod 3 | Zod 4 (`zod/v4` subpath) | v4 is stable and 14x faster, but the perf gains are irrelevant for a contact form with ~8 fields, and the breaking changes in `.optional().default()`, error messages, and coerce types add migration risk for zero MVP benefit. Keep v3, upgrade later if we add more schemas. |
| **Form validation** | Zod | Valibot | Valibot is ~10x smaller, but Zod has dramatically better ecosystem integration (RHF resolver, tRPC, etc.) and the docs burden matters for a solo maintainer. |
| **Email** | Resend | SendGrid / Mailgun / Nodemailer + SMTP | Resend's DX and Next.js-first docs beat SendGrid handily at this scale. Nodemailer + SMTP is cheaper but requires maintaining SMTP credentials and dealing with deliverability/SPF/DKIM by hand. |
| **Spam protection** | Cloudflare Turnstile | hCaptcha | Turnstile is invisible for most users — preserving the institutional "serio ma non freddo" UX — while hCaptcha forces visual puzzles that hurt conversion. Turnstile also has better privacy posture (never used for ad retargeting). Only pick hCaptcha if traffic >1M/month and you want revenue share. |
| **Spam protection** | Cloudflare Turnstile | Google reCAPTCHA v3 | reCAPTCHA v3 leaks signals to Google for ad targeting, which complicates the Garante posture. Turnstile is the cleaner choice under Italian cookie rules. |
| **Spam protection** | Cloudflare Turnstile | Honeypot-only | Honeypots alone will not stop modern LLM-driven spam. Combine: use honeypot **and** Turnstile. |
| **Analytics** | Vercel Analytics + Speed Insights | Plausible | Plausible (€9/mo, EU-hosted) is a very defensible alternative if the client wants the analytics dashboard to live under a separate vendor or wants EU data residency for analytics specifically. Both are cookieless and both avoid the cookie banner trap. Vercel wins on zero-config / zero-cost for MVP; switch if the client asks. |
| **Analytics** | Vercel Analytics | Google Analytics 4 | Italian Garante has ruled against GA4 deployments that transfer data to the US without SCCs. Avoid. Hard no. |
| **Icons** | lucide-react | Heroicons | Heroicons is limited to ~300 icons — insufficient for a multi-section corporate site (certifications, tools, machinery, services, trust signals). |
| **Animations** | **none** — CSS transitions + Tailwind `transition-*` utilities only | Framer Motion / Motion | The brief explicitly says "evitare effetti vistosi o look startup/SaaS" and "limitare animazioni inutili". Shipping a 32KB animation library to enable subtle fade-ins would be a net negative. If a specific section eventually needs something richer, reach for **motion (ex–Framer Motion)** via `motion/react` (now ~4KB core + 2KB React binding). Do **not** add it preemptively. |
| **Toasts** | sonner | react-hot-toast | react-hot-toast API has drifted and the project is less actively maintained in 2026. Sonner is what shadcn/ui ships. |
| **Linter/Formatter** | ESLint 9 + Prettier | Biome | Biome is 10–25x faster and is a legitimate 2026 choice, but `eslint-plugin-react-hooks` and `eslint-config-next` still have better Next.js-specific rule coverage. For a one-developer institutional site, the ESLint+Prettier duo has zero meaningful DX cost and clearer documentation when something breaks. Revisit Biome at the end of Phase 7 if perf becomes annoying. |
| **Component library** | shadcn/ui (optional, copy-paste) | MUI / Chakra / Mantine | MUI/Chakra/Mantine ship a visual language that fights the "sobrio, istituzionale" brief — we'd spend as much time overriding their defaults as building from scratch. shadcn/ui is **not a dependency**, it copies primitives (Button, Input, Label, Dialog, Toast) into `components/ui/` — we retain full control and the primitives are already Tailwind-based. **Recommendation: start without it; reach for `pnpm dlx shadcn@latest add button input label textarea form dialog sonner` only when we hit the first form in Phase 6.** |
| **Fonts** | `next/font/google` — **Inter** for UI + **IBM Plex Serif** (or Source Serif 4) for display/hero titles | Single-font (Inter only) | A two-font pairing (neutral sans + institutional serif for hero/headings) better communicates "45 anni di storia" than a single UI sans. IBM Plex Serif specifically reads as "corporate-institutional" without looking corporate-cold. **Fallback alternative:** if the client wants a single family, use Inter alone with tight tracking on headings — still good, less distinctive. **Avoid** Manrope (too startup-tech) and Poppins (overused, too friendly). Self-hosted via `next/font` → zero external requests, zero FOUT, zero Google Fonts GDPR concern. |
## What NOT to Use
| Avoid | Why | Use Instead |
|---|---|---|
| **Google Analytics 4** | Italian Garante has ruled GA4 transfers problematic under GDPR without SCCs; it also requires a cookie banner. | Vercel Analytics (cookieless, no banner) or Plausible |
| **Google reCAPTCHA (any version)** | Privacy-unfriendly, leaks data to Google ads, forces friction or silent tracking | Cloudflare Turnstile |
| **Google Fonts via `<link>`** | Hits fonts.googleapis.com at runtime → GDPR concerns (Germany already has precedent; Italian Garante aligned posture) + FOUT + extra DNS | `next/font/google` — downloads at build, self-hosts |
| **`next lint` command** | Removed in Next.js 16 | Configure ESLint flat config directly and wire it to `pnpm lint` |
| **`next-sitemap` package** | Redundant since Next.js 13; adds a build step and an extra config file | Built-in `app/sitemap.ts` + `app/robots.ts` file conventions |
| **`tailwind.config.js`** (as the primary config) | v4 prefers CSS-first `@theme` directives in `globals.css`; keeping a JS config creates two sources of truth | Define tokens in `app/globals.css` with `@theme { --color-brand-... }` |
| **`tailwindcss-animate`** | Deprecated by the Tailwind team | `tw-animate-css` (what new shadcn installs use) — or skip entirely (see "Animations" alternative) |
| **Framer Motion / Motion preemptively** | 32KB / 6KB JS shipped to every client that visits a company homepage — violates "performance Lighthouse mobile" rule | CSS `@keyframes` + Tailwind `transition-*` / `animate-*` utilities |
| **Any headless CMS (for MVP)** | Cost, complexity, vendor lock-in for a 5-page site updated 6x/year | MDX files in `content/` or plain TS objects in `lib/content/` |
| **`any`** | Violates user's code style rule | `unknown` with a type guard, or a proper Zod schema |
| **Stock photo libraries** | Brief explicitly says "evitare immagini stock poco credibili" | Real jobsite / team / fleet photography; commission a local photographer if needed |
| **Client-side state libraries (Zustand / Redux / Jotai)** | No need on an institutional content site; adds bundle + complexity | RSC fetching + URL search params |
| **Tailwind CSS v3** | Superseded; v4 is 5x/100x faster and CSS-first | Tailwind v4.2 |
| **React Hot Toast** | API drift, less actively maintained | Sonner |
| **Node.js `nodemailer` + raw SMTP** (for MVP) | Deliverability headaches, SPF/DKIM setup, credentials management | Resend |
## Stack Patterns by Variant
- Add **Payload CMS** (self-host on Vercel + Postgres/Neon) in a future milestone
- Keep the rest of the site as static MDX
- Use Next.js on-demand revalidation (`revalidatePath('/progetti')`) triggered by a Payload webhook
- Use Next.js App Router's built-in `[locale]` segment pattern
- Add **next-intl** (2026 standard, good RSC support) for message catalogs
- Duplicate `sitemap.ts` to emit both locales with `alternates`
- Add `hreflang` tags via `generateMetadata`
- **Not needed for MVP** — per PROJECT.md targets (Italian private + public + Italian professionals), a single `it-IT` site is correct
- Audit third-party scripts (there should be none beyond Turnstile + Vercel Analytics)
- Move Turnstile script to `next/script` with `strategy="lazyOnload"` and render the widget only on the contact page
- Enable `experimental.optimizePackageImports` for `lucide-react`
- Verify all hero images use `priority` + AVIF
- Add a server-side fallback: verify honeypot + minimum form-fill time (> 3s) and accept submission even if Turnstile token validation fails, but flag the lead as `needs_review`
## Version Compatibility Notes
| Package A | Compatible With | Notes |
|---|---|---|
| `next@16.x` | `react@19.x`, `react-dom@19.x` | Bundled via Next's pinned canary React. Do not install a different React major. |
| `next@16.x` | `eslint-config-next@16.x` | Match majors. |
| `tailwindcss@4.x` | `@tailwindcss/postcss@4.x` | v4 uses a new PostCSS plugin; the v3 plugin will not work. Scaffold from `create-next-app@latest` to get this right automatically. |
| `react-hook-form@7.72+` | `@hookform/resolvers@3.10+`, `zod@3.25+` | Standard triplet. |
| `zod@3.x` | `schema-dts@1.x` | Independent. schema-dts is TS-types-only, no runtime. |
| `resend@4.x` | Node.js runtime in Server Actions | Do **not** mark the route as Edge Runtime unless you verify Resend's edge SDK covers your features. Node runtime is safer for MVP. |
| `sonner@1.7+` | React 19 | Confirmed compatible via shadcn/ui. |
| `@marsidev/react-turnstile@1.x` | React 19 | Confirmed. Alternative: Cloudflare's official `@cloudflare/turnstile` script embed. |
| `next/font` | No external deps at runtime | Downloads at build. Zero-cookie, zero-fetch at runtime. |
## Confidence Assessment
| Area | Confidence | Reason |
|---|---|---|
| Core framework (Next 16, React 19, TS, Tailwind 4, Vercel, pnpm) | **HIGH** | Directly verified against nextjs.org release notes, Tailwind blog, Next.js 16 upgrade guide. User had already locked these in; research confirmed they are current and correct for 2026. |
| Forms stack (RHF + Zod + Server Actions + Resend) | **HIGH** | This is the de-facto 2026 pattern — Next.js's own "Guides: Forms" page documents this exact combination. |
| Spam protection (Turnstile) | **HIGH** | Verified: invisible flow, GDPR-safe posture, works with Italian Garante rules, easy Next.js integration. |
| Analytics (Vercel Analytics, no cookie banner for analytics) | **HIGH** | Vercel's own privacy-policy docs explicitly state no PII and no cookies; aligns with Italian Garante's distinction between strictly-necessary vs. profiling analytics. |
| SEO / JSON-LD (`schema-dts`, built-in `sitemap.ts`/`robots.ts`) | **HIGH** | Next.js official docs recommend this exact approach; schema-dts is maintained by Google. |
| Dev tooling (ESLint 9 flat config, Prettier, Husky, lint-staged) | **HIGH** | Standard 2026 setup; the one gotcha — `next lint` removal in Next 16 — is correctly flagged. |
| Icon / toast / utility libs (lucide, clsx, tailwind-merge, sonner) | **HIGH** | All are current, all are widely adopted, versions checked against npm. |
| Fonts recommendation (Inter + IBM Plex Serif via `next/font`) | **MEDIUM** | HIGH confidence on the `next/font` mechanism. MEDIUM on the specific pairing — this is a design judgment call, not an objective "best practice." A single-Inter variant is equally defensible. Defer to the Phase 1 design system exploration. |
| "No CMS for MVP" decision | **HIGH** | Based on project scope (5 pages, 6x/year updates), cost-benefit is clearly against a CMS at this stage. |
| "No animation library for MVP" decision | **HIGH** | Brief explicitly discourages visual flashiness. Wait until a concrete need appears. |
## Cost Profile (MVP)
| Item | Cost | Notes |
|---|---|---|
| Vercel Hobby | **€0** | Fine for MVP traffic. Upgrade to Pro (€20/mo) only if the client needs a team seat, custom runtime limits, or password protection for previews. |
| Vercel Analytics + Speed Insights | **€0** | Free tier covers this project comfortably. |
| Resend | **€0** | 3k emails/month free. |
| Cloudflare Turnstile | **€0** | Unmetered. |
| Domain (`edilferro.it`) | ~**€10–20/yr** | Client responsibility. |
| Everything else | **€0** | Open source. |
| **Total MVP infra** | **~€15/yr** | Essentially free. |
## Sources
- [Next.js 16 release notes — nextjs.org/blog/next-16](https://nextjs.org/blog/next-16)
- [Next.js Upgrading to v16 guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js Forms guide (RHF + Zod + Server Actions)](https://nextjs.org/docs/app/guides/forms)
- [Next.js JSON-LD guide (recommends schema-dts)](https://nextjs.org/docs/app/guides/json-ld)
- [Next.js metadata files — sitemap.xml](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js metadata files — robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Next.js next/font docs](https://nextjs.org/docs/app/getting-started/fonts)
- [Tailwind CSS v4 release post](https://tailwindcss.com/blog/tailwindcss-v4)
- [shadcn/ui Tailwind v4 guide](https://ui.shadcn.com/docs/tailwind-v4)
- [Resend — Send emails with Next.js](https://resend.com/docs/send-with-nextjs)
- [Vercel Analytics — Privacy & Compliance](https://vercel.com/docs/analytics/privacy-policy)
- [Cloudflare Turnstile product page](https://www.cloudflare.com/application-services/products/turnstile/)
- [google/schema-dts on GitHub](https://github.com/google/schema-dts)
- [react-hook-form on npm (v7.72.1 verified 2026-04)](https://www.npmjs.com/package/react-hook-form)
- [Zod v4 release notes + migration guide](https://zod.dev/v4)
- [Italian Garante cookie guidelines — Didomi summary](https://www.didomi.io/blog/italian-garante-new-guidelines)
- [Cookie consent requirements in Italy — CookieYes](https://www.cookieyes.com/blog/cookie-consent-requirements-in-italy/)
- [Cookie consent & analytics in Italy (2026) — Clickport](https://clickport.io/blog/privacy-analytics-italy)
- [Headless CMS 2026: Sanity vs Contentful vs Payload — DigitalApplied](https://www.digitalapplied.com/blog/headless-cms-2026-sanity-contentful-payload-comparison)
- [hCaptcha vs Cloudflare Turnstile (2026) — Websyro](https://www.websyro.com/blogs/hcaptcha-vs-cloudflare-turnstile-2026-comparison)
- [Biome vs ESLint + Prettier (2026) — PkgPulse](https://www.pkgpulse.com/blog/biome-vs-eslint-prettier-linting-2026)
- [Framer Motion vs Motion One — motion.dev](https://motion.dev/blog/should-i-use-framer-motion-or-motion-one)
- [Best React animation libraries 2026 — LogRocket](https://blog.logrocket.com/best-react-animation-libraries/)
- [Privacy-compliant analytics tools 2026 — Mitzu](https://mitzu.io/post/best-privacy-compliant-analytics-tools-for-2026/)
- [Lucide vs Heroicons — AllSVGIcons](https://allsvgicons.com/compare/lucide-vs-heroicons/)
- [Sonner toast — shadcn integration](https://www.shadcn.io/ui/sonner)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
