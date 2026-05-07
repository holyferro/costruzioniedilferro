---
id: 20260507-fix-lavori-cards
slug: fix-lavori-cards
date: 2026-05-07
status: in-progress
---

# Fix: Selezione lavori / Archivio lavori — 5 issues

## Goal

Fix 5 bugs/inconsistencies in the project cards sections shared between homepage and /progetti page.

## Tasks

### T1 — Remove dead `href` field from types and data

- Remove `readonly href: string` from `ProjectTile` type in `content/homepage.ts`
- Remove all `href: "/progetti"` entries from the feature + tiles data objects
- Remove unused `href` from `FeaturedProject` type (inherited via intersection)
- Check `FeaturedProjects.tsx` does not reference `href` anywhere (already confirmed it doesn't)

### T2 — Fix inconsistent title for abbazia-villaregia

- In `content/homepage.ts` tile, title is "Comunità Missionaria di Villaregia"
- In `PROJECTS["abbazia-villaregia"]` title is "Abbazia di Villaregia"
- Decision: align homepage tile title to PROJECTS title → change tile title to "Abbazia di Villaregia"
- Also fix imageAlt in homepage tile to match

### T3 — Add studentato-universitario to ProgettiGrid CARDS[]

- Project exists in `PROJECTS{}` and is the homepage feature card
- Add it to `CARDS[]` in `ProgettiGrid.tsx` with correct cat="residenziale"
- Use the image from `PROJECTS["studentato-universitario"].imgs[0]`

### T4 — Deduplicate ProgettiGrid CARDS[] data from PROJECTS{}

- Currently `CARDS[]` duplicates: label (=title), year, place, img, imgAlt, cat
- `PROJECTS{}` already has: title, year, place, imgs[0], tag
- Refactor `CARDS[]` to only store: key, cat, wide?, delay? (the fields NOT in PROJECTS)
- Derive display data in the render from `PROJECTS[card.key]`: title, year, place, img=imgs[0], imgAlt from imageAlt or a generated string
- Note: `PROJECTS` does not have an `imgAlt` field → add `imgAlt` to the `Project` type and to each project entry, OR derive it as `${project.title}, ${project.place}`
- Simplest approach: derive imgAlt as `${project.title} — ${project.place}` (no schema change needed)

### T5 — Apply animation delay to cardFadeIn

- `CARDS[]` has a `delay` field (0, 80, 160 ms) but the animation style never uses it
- Fix: add `animationDelay: \`${card.delay ?? 0}ms\`` to the card's style object

## Files to modify

1. `content/homepage.ts` — T1, T2
2. `components/sections/lavori/ProgettiGrid.tsx` — T3, T4, T5
3. `components/sections/FeaturedProjects.tsx` — T1 (verify no href usage, no change needed)
4. `components/sections/lavori/ProgettoModal.tsx` — T4 (add imgAlt to Project type if needed)

## Commit message

fix(lavori): deduplica dati card, aggiunge studentato a griglia, allinea titoli e fix delay animazioni
