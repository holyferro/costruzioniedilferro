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

  return (
    <div className="relative mt-8 overflow-hidden">
      {/* Card grid — always 2×2, determines component height */}
      <div
        className={`grid grid-cols-2 gap-3 transition-transform duration-[600ms] ease-in-out ${
          selected ? "-translate-x-[110%]" : "translate-x-0"
        }`}
      >
        {cards.map((card, i) => (
          <EqualCard key={card.title} card={card} bg={bg} onClick={() => setSelectedIndex(i)} />
        ))}
      </div>

      {/* Expanded panel — slides in from right, absolute so height never changes */}
      {/* Entire surface is tappable to close (same as the − button) */}
      <div
        role="button"
        tabIndex={selected ? 0 : -1}
        aria-label="Chiudi"
        onClick={() => setSelectedIndex(null)}
        onKeyDown={(e) => e.key === "Enter" && setSelectedIndex(null)}
        className={`absolute inset-0 cursor-pointer transition-transform duration-[600ms] ease-in-out ${
          selected ? "translate-x-0" : "translate-x-[110%]"
        }`}
      >
        <div className={`${bg} border-border h-full overflow-y-auto rounded-lg border px-6 py-5`}>
          {selected && (
            <>
              <div className="mb-4 flex items-start justify-between gap-4">
                <p className="text-ink font-serif text-[clamp(1.1rem,0.8rem+0.8vw,1.5rem)] leading-tight font-medium">
                  {selected.title}
                </p>
                <button
                  type="button"
                  aria-label="Chiudi"
                  onClick={() => setSelectedIndex(null)}
                  className="bg-ink/[0.07] text-ink hover:bg-ink/[0.12] flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <line
                      x1="2"
                      y1="7.5"
                      x2="13"
                      y2="7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="7.5"
                      y1="2"
                      x2="7.5"
                      y2="13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      style={{
                        transformOrigin: "7.5px 7.5px",
                        transform: "scaleY(0)",
                        transition: "transform 600ms ease-in-out",
                      }}
                    />
                  </svg>
                </button>
              </div>
              <p className="text-ink/75 text-sm leading-[1.65]">{selected.description}</p>
              {selected.features && selected.features.length > 0 && (
                <ul className="mt-4 space-y-1.5">
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
  );
}

function EqualCard({ card, bg, onClick }: { card: ServiceCard; bg: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${bg} border-border hover:border-ink/40 group focus-visible:outline-brand rounded-lg border p-5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 md:p-6`}
    >
      <p className="text-ink font-serif text-[clamp(0.9rem,0.6rem+0.6vw,1.1rem)] leading-snug font-medium">
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
