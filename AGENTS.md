# Sito Costruzioni Edilferro

Sito istituzionale di un'impresa edile locale storica. Strategia, obiettivi e tone of voice: `.planning/PROJECT.md`.

## Dove sta cosa

- Testi e dati delle pagine: `content/*.ts`.
- News e realizzazioni: Sanity CMS. Schemi in `sanity/schemas`, query in `sanity/lib/queries.ts`, Studio su `/studio`, revalidate in `app/api/revalidate`.
- Sezioni di pagina in `components/sections`, UI riusabile in `components/ui`, componenti di dominio in `components/business`.
- Header e Footer si montano in `app/(site)/layout.tsx`; `app/layout.tsx` resta minimale perché serve anche `/studio`.
- Palette e token in `app/globals.css` (`@theme`).
- Immagini statiche in `public/images`, sempre via `next/image`.

## Design

- Sobrio e istituzionale, mobile-first, molto whitespace. Look da impresa storica, non da startup/SaaS.
- CTA primaria globale: "Richiedi un sopralluogo". In Home sta above the fold; ogni pagina importante chiude con una CTA.
- Foto reali di cantieri, team e mezzi, con alt text descrittivo.
- Animazioni solo CSS e leggere: il riferimento è Lighthouse mobile.
- Servizi di terzi rispettosi della privacy: Vercel Analytics, `next/font`, nessun embed esterno. `pnpm check:compliance` blocca i pattern vietati.

## Codice

- Named exports, niente `any`.
- Nuove dipendenze solo con reale necessità.

## Comandi

- `pnpm dev`, `pnpm build`.
- `pnpm check`: lint, typecheck, compliance, contrasto, layout. Gira in CI su ogni PR: lancialo prima di aprirla.
- Il pre-commit esegue solo eslint e prettier sui file staged.
- Preview nel browser integrato: configurazione `next-dev` in `.claude/launch.json`. La porta è automatica perché spesso `pnpm dev` dell'utente occupa già la 3000.
- Tocchi e bug solo iPhone: il browser integrato usa Chromium e manda i tap come click del mouse. Per tap veri e il motore di Safari usa `scripts/mobile.mjs` (WebKit con emulazione iPhone).
- Se la home dà 500 con "Configuration must contain `projectId`", nel worktree manca `.env.local`: copialo dalla cartella principale. I nuovi worktree lo ricevono da `.worktreeinclude`.

## Deploy

- Una modifica al sito è finita solo quando è su `main`: commit, push, PR verso `main` (`gh pr create`), check verdi, merge. Per aspettare i check usa `gh pr checks <n> --watch` con `run_in_background`.
- Da `main` il sito si aggiorna da solo in due posti: Vercel (produzione) e il macserver (`https://macserver.taild6ecf5.ts.net:8084`), che ogni 2 minuti ricostruisce il container se `origin/main` è cambiato (`scripts/macserver-deploy.sh`, log in `/opt/stacks/edilferro/deploy.log`, host SSH `macserver`). Il commit online sul macserver è in `/opt/stacks/edilferro/.deployed-sha`: confrontalo con `git rev-parse origin/main`.
- Il dominio `costruzioniedilferro.com` (il sito "vero") resta com'è: DNS su Aruba, domini Vercel e certificati si toccano solo come ultimo passo del progetto, su richiesta esplicita. Fino ad allora si verifica sul macserver e sui deploy Vercel (`*.vercel.app`).
