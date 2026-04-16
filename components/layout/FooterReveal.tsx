// components/layout/FooterReveal.tsx
// Client Component: positions footer fixed at z-0 and syncs its height to --footer-height CSS var.
// Used by layout.tsx to implement the "fixed behind content" reveal pattern.

"use client";

import { useEffect, useRef } from "react";

interface FooterRevealProps {
  children: React.ReactNode;
}

export function FooterReveal({ children }: FooterRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Measure immediately on mount to prevent spacer flash before ResizeObserver fires.
    document.documentElement.style.setProperty("--footer-height", el.offsetHeight + "px");

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize[0]?.blockSize ?? wrapperRef.current?.offsetHeight ?? 0;
        document.documentElement.style.setProperty("--footer-height", height + "px");
      }
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="fixed right-0 bottom-0 left-0 z-0" aria-hidden="false">
      {children}
    </div>
  );
}
