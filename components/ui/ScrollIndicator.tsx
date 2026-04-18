"use client";

import { useRef } from "react";

// easeInOutCubic: lento all'inizio, accelera al centro, rallenta alla fine
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Props = { targetId: string };

export function ScrollIndicator({ targetId }: Props) {
  const scrolling = useRef(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (scrolling.current) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    const headerHeight =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
        10,
      ) || 0;

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + startY - headerHeight;
    const distance = targetY - startY;
    const duration = 750;
    const startTime = performance.now();

    scrolling.current = true;

    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * ease(t));
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        scrolling.current = false;
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className="group text-panna/55 hover:text-panna/90 mt-8 flex items-center gap-2 transition-colors duration-[800ms] ease-in-out"
    >
      <span className="font-[family-name:var(--font-neue-montreal)] text-sm tracking-[0.14em] uppercase">
        Scopri di più
      </span>
      <span
        className="inline-block"
        style={{ animation: "scrollBounce 1.8s cubic-bezier(0.37, 0, 0.63, 1) infinite" }}
      >
        ↓
      </span>
    </a>
  );
}
