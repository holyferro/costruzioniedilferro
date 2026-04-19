"use client";

import { useState } from "react";
import type { ServiceCard } from "@/content/services";

type ServiceCardInteractiveProps = {
  cards: readonly ServiceCard[];
  surface: "panna" | "white";
};

export function ServiceCardInteractive({ cards, surface }: ServiceCardInteractiveProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const cardSurface = surface === "panna" ? "bg-white" : "bg-panna";
  const selected = cards[selectedIndex];
  const otherIndices = cards.map((_, i) => i).filter((i) => i !== selectedIndex);

  if (!selected) return null;

  return (
    <div className="mt-8 flex flex-col gap-3">
      {/* Expanded card — top */}
      <div className={`${cardSurface} border-border rounded-lg border px-6 py-6 transition-all duration-300`}>
        <p className="text-ink font-serif text-[clamp(1.25rem,0.8rem+1vw,1.65rem)] leading-tight font-medium">
          {selected.title}
        </p>
        <p className="text-ink/75 mt-3 text-base leading-[1.65]">{selected.description}</p>
        {selected.features && selected.features.length > 0 && (
          <ul className="mt-5 space-y-2">
            {selected.features.map((feature) => (
              <li key={feature} className="text-ink/80 flex items-start gap-2.5 text-sm leading-[1.55]">
                <span aria-hidden="true" className="text-brand font-serif mt-0.5 shrink-0 text-xs font-medium italic">—</span>
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Compact cards row — other 3 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {otherIndices.map((originalIndex) => {
          const card = cards[originalIndex];
          if (!card) return null;
          return (
            <button
              key={card.title}
              type="button"
              onClick={() => setSelectedIndex(originalIndex)}
              className={`${cardSurface} border-border hover:border-ink/40 group rounded-lg border px-4 py-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2`}
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
        })}
      </div>
    </div>
  );
}
