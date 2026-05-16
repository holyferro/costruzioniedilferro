# Impresa Edile — sito istituzionale

Next.js 16 App Router + Tailwind v4 + TypeScript strict. Sito web istituzionale per un'impresa edile locale con sede a Mestre.

Comandi:

- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint 9 flat config
- `pnpm typecheck` — TypeScript strict check
- `pnpm check:compliance` — grep guard contro GA4/gtag/Google Maps iframe/reCAPTCHA
- `pnpm check:contrast` — WCAG 2.1 brand palette check
- `pnpm check:layout` — asserzione presenza Header/Footer/Analytics nel root layout

Vedi `.planning/` per roadmap, requirements, e stato del progetto.

## CMS (Sanity)

Il progetto usa [Sanity Studio v3](https://www.sanity.io) embedded nella route `/studio`.

### Setup iniziale (una tantum)

1. Crea un progetto su [sanity.io/manage](https://sanity.io/manage) con dataset `production`
2. Copia il **Project ID** e aggiungilo a `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=il_tuo_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. In sanity.io/manage → API → CORS Origins, aggiungi `http://localhost:3000` (per dev) e `https://costruzioniedilferro.com` (per prod)
4. Su Vercel: aggiungi `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` nelle Environment Variables del progetto

### Accesso allo Studio

- **Dev:** `pnpm dev` → apri [http://localhost:3000/studio](http://localhost:3000/studio)
- **Produzione:** [https://costruzioniedilferro.com/studio](https://costruzioniedilferro.com/studio)

Chi ha accesso allo Studio deve essere invitato al progetto Sanity via [sanity.io/manage](https://sanity.io/manage) → Members. L'autenticazione avviene tramite account Sanity — nessuna gestione credenziali nel codice.
