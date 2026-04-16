"use client";
// components/ui/RotatingWord.tsx
// Slot rotating text: slide-up exit → swap word → slide-up enter.
// Nessuna dipendenza esterna — CSS transitions puri via style prop.

import { useEffect, useState } from "react";

type Phase = "in" | "out" | "reset";

type Props = {
  words: readonly string[];
  intervalMs?: number;
};

export function RotatingWord({ words, intervalMs = 2500 }: Props) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("in");

  useEffect(() => {
    const tick = setInterval(() => {
      // 1. Exit: slide up + fade out
      setPhase("out");

      const swap = window.setTimeout(() => {
        // 2. Swap word instantly, position below (no transition)
        setIdx((i) => (i + 1) % words.length);
        setPhase("reset");

        // 3. One rAF later: animate up to rest position
        requestAnimationFrame(() => requestAnimationFrame(() => setPhase("in")));
      }, 380);

      return () => clearTimeout(swap);
    }, intervalMs);

    return () => clearInterval(tick);
  }, [words, intervalMs]);

  return (
    <span
      aria-live="polite"
      style={{
        display: "inline-block",
        willChange: "transform, opacity",
        transition:
          phase === "reset"
            ? "none"
            : "transform 0.42s cubic-bezier(0.16,1,0.3,1), opacity 0.38s ease",
        transform:
          phase === "out"
            ? "translateY(-10px)"
            : phase === "reset"
              ? "translateY(10px)"
              : "translateY(0)",
        opacity: phase === "in" ? 1 : 0,
      }}
    >
      {words[idx]}
    </span>
  );
}
