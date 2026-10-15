---
id: 20261015-sezione-dal-progetto-allopera
slug: sezione-dal-progetto-allopera
date: 2026-10-15
status: complete
commit: b7fa076
---

# Sezione home "Dal progetto all'opera"

## Risultato

Nuova sezione in homepage, subito dopo `TrustStrip`: sticky a tutta larghezza (260vh di scorrimento);
il render "a matita" del cortile porticato si sparge dall'alto sopra il disegno a linee con un bordo
a inchiostro. Promossa dalla variante A del prototipo (varianti B–E scartate).

## Modifiche applicate

| #   | Modifica                                                                                          | File                                          |
| --- | ------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| T1  | Blocco `fromDrawing` (copy, etichette stadio, src immagini, alt) nel tipo e nei dati              | `content/homepage.ts`                         |
| T2  | Sezione client: maschera SVG + `feTurbulence`/`feDisplacementMap`, path aggiornato via ref in rAF | `components/sections/DalProgettoAllOpera.tsx` |
| T3  | Asset spostati in `public/images/home/`, sezione montata dopo `TrustStrip`                        | `app/(site)/page.tsx`, `public/images/home/`  |
| T4  | Eliminati `InkReveal.prototype.tsx`, `PrototypeSwitcher.tsx`, `public/images/prototype-ink/`      | —                                             |

## Decisioni

- Nessuna dipendenza nuova (niente GSAP/Lenis): scroll → progresso con un listener passivo + rAF.
- `prefers-reduced-motion`: render finale subito visibile.
- Mobile (<md): SVG ritagliato 4:3 centrato sull'angolo del portico (`preserveAspectRatio="xMidYMid slice"`).
- Immagini via `getImageProps` di `next/image` (SVG `<image>` non supporta `srcset`: un solo src ottimizzato, segnato con `ponytail:`).

## Asset

Disegno e render generati da un modello 3D Blender ricostruito sul render notturno dell'architetto
(camera risolta dai punti di fuga → allineamento al pixel). Script e sorgenti, non versionati:
`.planning/reference/fx1-schizzo-render/` (`edificio.py`, `stylize.py`, `stadi.py`, `edificio.blend`).

## Verifica

- Browser desktop (800×600) e mobile (375×812): disegno → inchiostro → render, nessun errore console, nessuno scroll orizzontale.
- `pnpm typecheck`: ok. `pnpm lint`: ok (2 warning preesistenti). `check:compliance`, `check:contrast`: ok.
- `check:layout`: fallisce, preesistente e indipendente (cerca Header/Footer in `app/layout.tsx`, che stanno in `app/(site)/layout.tsx`).
- Fluidità dello scroll reale da verificare a mano (il pannello browser era nascosto, rAF in pausa).
