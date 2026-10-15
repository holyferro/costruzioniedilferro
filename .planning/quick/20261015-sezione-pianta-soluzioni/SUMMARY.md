---
id: 20261015-sezione-pianta-soluzioni
slug: sezione-pianta-soluzioni
date: 2026-10-15
status: complete
commit: pending
---

# Sezione home "Dentro il progetto"

## Risultato

Nuova sezione in homepage, dopo `ServiceOverview`: la pianta reale di un cantiere residenziale a L
si costruisce una volta quando entra in vista (circa 4 s): i 26 pezzi di muro volano in posizione,
poi riempimento, finestre e scale, balconi, quote con zoom-out, e infine tre marcatori numerati
sulle soluzioni tecniche. Passando col mouse su marcatore, voce dell'elenco o elemento evidenziato
si apre una scheda con foto, testo e miniature; il click la fissa. Tap e tastiera aprono e chiudono,
Esc o tap fuori dalla sezione chiude. Promossa dalla variante C1 del prototipo (scartate A sticky
"Heron", B sticky con capitoli, C senza foto, C2 foto grande a lato).

## Modifiche applicate

| #   | Modifica                                                                                          | File                                                           |
| --- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| T1  | Geometria della pianta generata dall'SVG ZWCAD (muri a pezzi, aperture, scale, balconi)           | `content/piantaPontecchio.ts`, `split-pianta.py`               |
| T2  | Blocco `floorPlan` (copy, aiuti tap/hover, marcatori con area e foto) nel tipo e nei dati         | `content/homepage.ts`                                          |
| T3  | SVG statico + `drawPlan()`; sezione client con costruzione via IntersectionObserver + rAF         | `components/sections/PiantaDisegno.tsx`, `PiantaSoluzioni.tsx` |
| T4  | Foto segnaposto, sezione montata dopo `ServiceOverview`                                           | `public/images/home/pianta/`, `app/(site)/page.tsx`            |
| T5  | Eliminati `PiantaAnimata.prototype.tsx`, `PrototypeSwitcher.tsx`, `useStickyProgress.ts` estratto | —                                                              |

## Decisioni

- Niente sticky né scroll-scrub (scelta del cliente): costruzione temporizzata, una volta, con "Rivedi la costruzione".
- Nessuna dipendenza nuova. Lo stato di costruzione è scritto sul DOM via ref, nessun re-render per frame.
- `prefers-reduced-motion`: pianta subito completa.
- La pianta non ha arredi né quote nel CAD: il quarto passaggio sono i balconi; le quote sono calcolate
  dalla geometria assumendo scala 1:100 (20,90 × 33,00 m, ala 11,40, 9,90), arrotondate a 5 cm.
- Zone sensibili al passaggio del mouse allargate di 90 unità rispetto all'area evidenziata
  (la fascia del cappotto sarebbe un bersaglio di ~10 px).
- Su tap / tastiera la scheda viene portata in vista sotto l'header (`scrollIntoView` + `scroll-mt`).
- `useStickyProgress` era stato estratto per due sezioni sticky; con la variante non sticky è tornato
  dentro `DalProgettoAllOpera` (file invariato rispetto al commit b7fa076).

## Da completare prima del go-live

- Norme e descrizioni dei 3 marcatori: ancora segnaposto (`[Norma da confermare]`, "Testo segnaposto").
- Foto `riferimento-*`: segnaposto di terzi (schema del produttore fornito dal cliente; foto Wikimedia
  Commons CC BY-SA 4.0 con marchio visibile). Sostituire con foto di cantiere Edilferro.
- Quote: confermare la scala 1:100 con l'architetto.

## Verifica

- Browser desktop (1440×900) e mobile (375×812): costruzione completa, hover / click fissato / Esc,
  apertura da tastiera, scheda dentro lo schermo, nessuno scroll orizzontale. Tap reale non simulabile
  nel browser integrato (i click arrivano come mouse): percorso touch verificato via tastiera, stesso ramo.
- `pnpm typecheck`: ok. `pnpm lint`: ok (2 warning preesistenti). `check:compliance`, `check:contrast`: ok.
