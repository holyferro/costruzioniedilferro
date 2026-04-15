# Phase 02: Homepage — Validation Architecture

## Test Framework

| Property           | Value                                             |
| ------------------ | ------------------------------------------------- |
| Framework          | Nessun framework di test installato in Phase 1    |
| Config file        | Nessuno                                           |
| Quick run command  | `pnpm check` (lint + typecheck + 3 check scripts) |
| Full suite command | `pnpm build`                                      |

## Phase Requirements → Test Map

| Req ID | Comportamento                     | Tipo               | Comando automatizzato                                            |
| ------ | --------------------------------- | ------------------ | ---------------------------------------------------------------- |
| HOM-01 | Hero visibile above fold 375px    | Visual/manual      | Ispezione visiva in browser + Lighthouse mobile                  |
| HOM-02 | Trust strip con almeno 3 metriche | TypeScript compile | `pnpm typecheck` — il tipo `TrustMetric[]` con almeno 4 elementi |
| HOM-03 | Sticky bar mobile durante scroll  | Visual/manual      | Ispezione su 375px viewport                                      |
| HOM-04 | `typedRoutes` riabilitato         | TypeScript compile | `pnpm typecheck`                                                 |
| HOM-05 | Area di servizio dichiarata       | Grep codebase      | `pnpm check:compliance` + review content                         |
| HOM-06 | Link ai servizi presenti          | TypeScript compile | `pnpm typecheck` (typedRoutes)                                   |
| HOM-07 | CTA finale presente               | Manual review      | Ispezione visiva                                                 |
| HOM-08 | check:compliance passa            | Automated          | `pnpm check:compliance`                                          |

## Sampling Rate

- **Per ogni task commit:** `pnpm lint && pnpm typecheck`
- **Per wave merge:** `pnpm check` (tutti e 5 gli script)
- **Phase gate:** `pnpm build` verde prima di chiudere Phase 2

## Gaps da colmare (Wave 0)

- [ ] `content/homepage.ts` — mancante, va creato
- [ ] `components/sections/*.tsx` — directory esiste ma vuota (`.gitkeep`)
- [ ] `components/ui/MobileStickyBar.tsx` — mancante
- [ ] Route stub per `/servizi`, `/progetti`, `/chi-siamo`, `/contatti`
