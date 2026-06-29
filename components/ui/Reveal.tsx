"use client";

// components/ui/Reveal.tsx
// Reveal-on-scroll wrapper. IntersectionObserver + CSS transition.
// Stesso idioma di CountUpNumber: osserva una volta, disconnect dopo il primo intersect.
// Rispetta prefers-reduced-motion (monta visibile, nessuna animazione).
// Anima solo opacity + transform (compositor-friendly, nessun reflow).

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type Direction = "up" | "down" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  /** Elemento renderizzato dal wrapper. Default "div". */
  as?: ElementType;
  /** Lato DA CUI l'elemento entra. Default "up" (sale dal basso). */
  direction?: Direction;
  /** Distanza di traslazione in px. Default 24. Passa 0 per un fade-only. */
  distance?: number;
  /** transition-delay in ms — guida le cascate (stagger). Default 0. */
  delay?: number;
  className?: string;
};

const EASE = "cubic-bezier(0.16,1,0.3,1)";
const DURATION = 700;
const QUERY = "(prefers-reduced-motion: reduce)";

function hiddenTransform(direction: Direction, distance: number): string {
  if (distance === 0) return "none";
  switch (direction) {
    case "up":
      return `translateY(${distance}px)`;
    case "down":
      return `translateY(-${distance}px)`;
    case "left":
      return `translateX(-${distance}px)`;
    case "right":
      return `translateX(${distance}px)`;
  }
}

// Sincronizza prefers-reduced-motion in React senza setState nell'effect.
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

export function Reveal({
  children,
  as,
  direction = "up",
  distance = 24,
  delay = 0,
  className = "",
}: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const shown = reduced || visible;
  const style: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : hiddenTransform(direction, distance),
    transition: reduced
      ? "none"
      : `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`,
    willChange: reduced ? undefined : "opacity, transform",
  };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
