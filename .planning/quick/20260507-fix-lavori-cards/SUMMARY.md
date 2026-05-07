---
id: 20260507-fix-lavori-cards
slug: fix-lavori-cards
date: 2026-05-07
status: complete
commit: 50b2401
---

# Fix: Selezione lavori / Archivio lavori

## Risultato

Tutti e 5 i problemi risolti in un singolo commit.

## Modifiche applicate

| #   | Fix                                                                                      | File                  |
| --- | ---------------------------------------------------------------------------------------- | --------------------- |
| T1  | Rimosso campo `href` morto da tipo `ProjectTile` e da tutti gli oggetti data             | `content/homepage.ts` |
| T2  | Allineato titolo abbazia-villaregia: "Comunità Missionaria..." → "Abbazia di Villaregia" | `content/homepage.ts` |
| T3  | Aggiunto `studentato-universitario` a `ProgettiGrid` CARDS[]                             | `ProgettiGrid.tsx`    |
| T4  | `CardDef` ridotto a `{key, cat, wide?, delay?}` — dati display derivati da `PROJECTS{}`  | `ProgettiGrid.tsx`    |
| T5  | `animationDelay` ora applicato alle card (era definito ma ignorato)                      | `ProgettiGrid.tsx`    |

Typecheck: ok. Lint: ok.
