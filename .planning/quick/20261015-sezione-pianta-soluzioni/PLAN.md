---
id: 20261015-sezione-pianta-soluzioni
slug: sezione-pianta-soluzioni
title: Sezione home "Dentro il progetto" (pianta che si costruisce + soluzioni tecniche con foto)
status: complete
created: 2026-10-15
---

# Sezione home "Dentro il progetto"

## Goal

Promuovere a sezione definitiva della homepage la variante C1 del prototipo `PiantaAnimata.prototype.tsx`,
ispirata alla sezione `home-map` di heronaiapp.com: la pianta reale di un cantiere Edilferro
(`pianta pontecchio.svg`, export ZWCAD) si costruisce una volta quando entra in vista: i muri volano
in posizione, poi il riempimento, le aperture e le scale, i balconi, le quote con lo zoom-out e
infine tre marcatori numerati sulle soluzioni tecniche. Passando col mouse (tap su mobile) su un
marcatore, sulla voce dell'elenco o sull'elemento evidenziato si apre una scheda con foto, testo e
miniature. Niente sticky, niente nuove dipendenze.

## Tasks

- [x] TASK-1: Geometria della pianta in `content/piantaPontecchio.ts`, generata da `split-pianta.py` (muri a pezzi, aperture, scale, balconi; i contorni dei muri del CAD sono scartati).
- [x] TASK-2: Blocco `floorPlan` in `content/homepage.ts`: copy, testi di aiuto, marcatori con area evidenziata e foto.
- [x] TASK-3: `components/sections/PiantaSoluzioni.tsx` (client: costruzione con IntersectionObserver + rAF via ref, marcatori, scheda foto) e `components/sections/PiantaDisegno.tsx` (SVG statico della pianta).
- [x] TASK-4: Foto segnaposto in `public/images/home/pianta/`; montare la sezione dopo `ServiceOverview`.
- [x] TASK-5: Eliminare il prototipo (`PiantaAnimata.prototype.tsx`, `PrototypeSwitcher.tsx`, `public/images/prototype-pianta/`) e riportare `DalProgettoAllOpera` al suo hook interno.
- [x] TASK-6: Verifica nel browser (desktop + mobile 375px), `pnpm lint`, `pnpm typecheck`.

## Files to modify

- `content/piantaPontecchio.ts`: geometria generata.
- `content/homepage.ts`: tipo + dati `floorPlan`.
- `components/sections/PiantaSoluzioni.tsx`, `components/sections/PiantaDisegno.tsx`: nuova sezione.
- `app/(site)/page.tsx`: monta la sezione.
- `public/images/home/pianta/`: foto segnaposto.
