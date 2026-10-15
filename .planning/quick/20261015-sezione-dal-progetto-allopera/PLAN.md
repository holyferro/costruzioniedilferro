---
id: 20261015-sezione-dal-progetto-allopera
slug: sezione-dal-progetto-allopera
title: Sezione home "Dal progetto all'opera" (disegno → render con inchiostro)
status: complete
created: 2026-10-15
---

# Sezione home "Dal progetto all'opera"

## Goal

Promuovere a sezione definitiva della homepage la variante A del prototipo `InkReveal.prototype.tsx`:
sezione sticky a tutta larghezza in cui, scorrendo, il render "a matita" del cortile porticato
si sparge dall'alto sopra il disegno a linee con un bordo a inchiostro (maschera SVG +
`feTurbulence`/`feDisplacementMap`, come su heronaiapp.com). Nessuna nuova dipendenza.

Le due immagini sono generate da un modello 3D Blender ricostruito sul render notturno
dell'architetto (`05 notte_1_arena_def.jpg`), stessa camera → allineamento al pixel.
Sorgenti e script in `.planning/reference/fx1-schizzo-render/` (non versionati).

## Tasks

- [x] TASK-1: Aggiungere il blocco `fromDrawing` (eyebrow, titolo, etichette stadio, src immagini, alt) a `HomepageContent` e ai dati in `content/homepage.ts`.
- [x] TASK-2: Creare `components/sections/DalProgettoAllOpera.tsx` (client component, unico per lo scroll): sezione `h-[260vh]`, contenuto sticky sotto l'header, maschera aggiornata via ref in `requestAnimationFrame` (nessun re-render per frame), barra di avanzamento, etichetta Progetto → Realizzazione. `prefers-reduced-motion`: mostra subito il render finale. Immagini servite via `getImageProps` di `next/image`.
- [x] TASK-3: Spostare le immagini in `public/images/home/` con nomi descrittivi; montare la sezione dopo `TrustStrip` in `app/(site)/page.tsx`.
- [x] TASK-4: Eliminare `components/sections/InkReveal.prototype.tsx` e `public/images/prototype-ink/`.
- [x] TASK-5: Verifica nel browser (desktop + mobile 375px), `pnpm lint`, `pnpm typecheck`.

## Files to modify

- `content/homepage.ts`: tipo + dati `fromDrawing`.
- `components/sections/DalProgettoAllOpera.tsx`: nuova sezione.
- `app/(site)/page.tsx`: monta la sezione, rimuove il prototipo.
- `public/images/home/dal-progetto-disegno.webp`, `public/images/home/dal-progetto-render.webp`: asset.
