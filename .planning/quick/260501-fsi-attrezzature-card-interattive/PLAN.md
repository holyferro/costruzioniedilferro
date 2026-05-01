---
quick_id: 260501-fsi
slug: attrezzature-card-interattive
title: Card attrezzature cliccabili
status: complete
created: 2026-05-01
---

# Card attrezzature cliccabili

## Goal

Rendere le card dei mezzi in `AziendaAttrezzature` interattive: un click attiva la card in blu brand, la precedente torna scura, con default su "Miniescavatori".

## Tasks

- [x] TASK-1: Aggiungere `"use client"`, rimuovere `variante` dal tipo e dall'array `mezzi`, aggiungere `useState<string>` inizializzato a `"Miniescavatori"` in `AziendaAttrezzature`, passare `isActive={activeLabel === mezzo.label}` e `onClick={() => setActiveLabel(mezzo.label)}` a ogni `CardMezzo`.

- [x] TASK-2: Aggiornare `CardMezzo` per accettare `isActive: boolean` e `onClick: () => void` al posto di `variante`; trasformare il wrapper da `<div>` a `<button>` (con `type="button"`, `className` aggiornata per cursore e focus ring); derivare colori da `isActive`; cambiare tutti gli attributi `stroke` e `fill` hardcoded nelle SVG dell'icona da colori espliciti a `currentColor` e impostare `color` sul `<button>` in base a `isActive` (`rgba(248,245,238,0.9)` se attivo, `rgba(248,245,238,0.6)` se inattivo) in modo che `currentColor` si risolva correttamente.

- [x] TASK-3: Correggere gli SVG inline in `mezzi` (tutti i 6 oggetti dell'array) sostituendo ogni `stroke="#0A2A6B"`, `stroke="rgba(248,245,238,0.9)"`, `fill="#0A2A6B"` con `currentColor` — inclusa l'icona di "Miniescavatori" che era già in variante brand e quella del "basso impatto" nel footer della sezione (lasciarla separata con il suo colore esplicito, non fa parte delle card).

## Files to modify

- `components/sections/azienda/AziendaAttrezzature.tsx`: aggiunta `"use client"`, rimozione `variante` da tipo e dati, `useState` in `AziendaAttrezzature`, props `isActive`/`onClick` su `CardMezzo`, conversione SVG a `currentColor`.

## Implementation notes

`CardMezzo` dopo la modifica:

```tsx
function CardMezzo({
  numero,
  suffisso,
  label,
  sottotitolo,
  icona,
  isActive,
  onClick,
}: Omit<MezzoCard, "variante"> & { isActive: boolean; onClick: () => void }) {
  const bg = isActive ? "#0A2A6B" : "#111111";
  const iconColor = isActive ? "rgba(248,245,238,0.9)" : "rgba(248,245,238,0.6)";
  const labelColor = isActive ? "rgba(248,245,238,0.9)" : "rgba(248,245,238,0.8)";
  const subColor = isActive ? "rgba(248,245,238,0.55)" : "rgba(248,245,238,0.35)";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col gap-3 px-8 py-11 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      style={{ background: bg, color: iconColor }}
    >
      <span style={{ opacity: isActive ? 0.7 : 0.55 }}>{icona}</span>
      <span
        className="font-serif leading-none font-medium tracking-[-0.04em]"
        style={{ fontSize: "56px", color: "#fff" }}
      >
        {numero}
        {suffisso && <span style={{ fontSize: "32px" }}>{suffisso}</span>}
      </span>
      <span className="font-serif text-base italic" style={{ color: labelColor }}>
        {label}
      </span>
      <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: subColor }}>
        {sottotitolo}
      </span>
    </button>
  );
}
```

L'SVG di ogni icona nell'array `mezzi` avrà `stroke="currentColor"` (e `fill="currentColor"` dove applicabile) — il colore reale è controllato dal `color` del `<button>` padre.

## Validation

- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] Click su ogni card la porta in blu brand, la card precedente torna scura
- [ ] La card "Miniescavatori" è blu brand al caricamento iniziale
- [ ] I colori SVG seguono lo stato (non hardcoded)
- [ ] Focus ring visibile su tastiera (accessibilità)
