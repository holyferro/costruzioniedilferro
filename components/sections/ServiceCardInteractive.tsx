"use client";

import { useState } from "react";
import type { ServiceCard } from "@/content/services";

type Props = {
  cards: readonly ServiceCard[];
  surface: "panna" | "white";
};

export function ServiceCardInteractive({ cards, surface }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const bg = surface === "panna" ? "bg-white" : "bg-panna";
  const selected = selectedIndex !== null ? (cards[selectedIndex] ?? null) : null;
  const others =
    selectedIndex !== null
      ? cards.map((c, i) => ({ card: c, idx: i })).filter(({ idx }) => idx !== selectedIndex)
      : [];

  function toggle(i: number) {
    setSelectedIndex((prev) => (prev === i ? null : i));
  }

  return (
    <div className="mt-8 space-y-3">
      {/* ── Expanded panel — animates via grid-template-rows trick ── */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          selected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`${bg} border-border rounded-lg border px-6 py-6 transition-opacity duration-300 ${
              selected ? "opacity-100" : "opacity-0"
            }`}
          >
            {selected && (
              <>
                <p className="text-ink font-serif text-[clamp(1.25rem,0.8rem+1vw,1.65rem)] font-medium leading-tight">
                  {selected.title}
                </p>
                <p className="text-ink/75 mt-3 text-base leading-[1.65]">
                  {selected.description}
                </p>
                {selected.features && selected.features.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {selected.features.map((f) => (
                      <li
                        key={f}
                        className="text-ink/80 flex items-start gap-2.5 text-sm leading-[1.55]"
                      >
                        <span
                          aria-hidden="true"
                          className="text-brand mt-0.5 shrink-0 font-serif text-xs italic"
                        >
                          —
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Card grid ───────────────────────────────────────────────── */}
      <div
        className={`grid gap-3 transition-[grid-template-columns] duration-300 ${
          selected ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2"
        }`}
      >
        {selected === null
          ? /* Initial: 4 equal cards */
            cards.map((card, i) => (
              <EqualCard key={card.title} card={card} bg={bg} onClick={() => toggle(i)} />
            ))
          : /* Expanded: 3 compact cards */
            others.map(({ card, idx }) => (
              <CompactCard key={card.title} card={card} bg={bg} onClick={() => toggle(idx)} />
            ))}
      </div>
    </div>
  );
}

function EqualCard({
  card,
  bg,
  onClick,
}: {
  card: ServiceCard;
  bg: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${bg} border-border hover:border-ink/40 group rounded-lg border p-5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 md:p-6`}
    >
      <p className="text-ink font-serif text-[clamp(0.9rem,0.6rem+0.6vw,1.1rem)] font-medium leading-snug">
        {card.title}
      </p>
      <p className="text-ink/60 mt-2 line-clamp-2 text-sm leading-[1.5]">{card.description}</p>
      <span
        aria-hidden="true"
        className="text-brand mt-4 inline-block text-xs font-medium transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </button>
  );
}

function CompactCard({
  card,
  bg,
  onClick,
}: {
  card: ServiceCard;
  bg: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${bg} border-border hover:border-ink/40 group rounded-lg border px-4 py-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2`}
    >
      <p className="text-ink text-sm font-medium leading-snug">{card.title}</p>
      <span
        aria-hidden="true"
        className="text-brand mt-2 inline-block text-xs font-medium transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </button>
  );
}
