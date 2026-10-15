"use client";

// components/sections/DalProgettoAllOpera.tsx
// Client Component (scroll-driven). Sezione sticky a tutta larghezza: scorrendo, il render del
// progetto si sparge dall'alto sopra il disegno a linee con un bordo a inchiostro.
// Tecnica (come heronaiapp.com, senza GSAP): due <image> in un SVG; il render è mascherato da un
// path il cui bordo è deformato da feTurbulence + feDisplacementMap. Il path si aggiorna via ref in
// requestAnimationFrame, nessun re-render per frame.
// prefers-reduced-motion: mostra subito il render finale.
// Mobile (<md): ritaglio 4:3 centrato sull'angolo del portico, il 2:1 sarebbe troppo piccolo.

import { getImageProps } from "next/image";
import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

type DalProgettoAllOperaProps = {
  eyebrow: string;
  title: string;
  stageStart: string;
  stageEnd: string;
  drawingSrc: string;
  renderSrc: string;
  imageAlt: string;
};

// Both images: 2362×1160, rendered from the same Blender camera (pixel-aligned).
const IMG_W = 2362;
const IMG_H = 1160;
const W = 1000;
const H = (W * IMG_H) / IMG_W;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Mask shape: everything above a curved edge that sweeps from above the top (p=0) to past the bottom (p=1). */
function inkPath(p: number) {
  const y = -80 + p * (H + 220);
  return `M0 -10 L${W} -10 L${W} ${y} Q${W / 2} ${y + 110} 0 ${y} Z`;
}

// ponytail: one optimised src per image (SVG <image> has no srcset); split per breakpoint if mobile weight matters.
function optimisedSrc(src: string) {
  return getImageProps({
    src,
    alt: "",
    width: IMG_W,
    height: IMG_H,
    sizes: "(min-width: 1280px) 1100px, 100vw",
  }).props.src;
}

/** Calls onProgress(0..1) with how far the section's sticky track has been scrolled. */
function useStickyProgress(el: RefObject<HTMLElement | null>, onProgress: (p: number) => void) {
  const cb = useRef(onProgress);
  useEffect(() => {
    cb.current = onProgress;
  });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cb.current(1);
      return;
    }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const node = el.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      cb.current(clamp(travel > 0 ? -r.top / travel : 0));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [el]);
}

export function DalProgettoAllOpera({
  eyebrow,
  title,
  stageStart,
  stageEnd,
  drawingSrc,
  renderSrc,
  imageAlt,
}: DalProgettoAllOperaProps) {
  const track = useRef<HTMLElement>(null);
  const mask = useRef<SVGPathElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  useStickyProgress(track, (p) => {
    const ink = smooth(clamp((p - 0.12) / 0.7));
    mask.current?.setAttribute("d", inkPath(ink));
    if (bar.current) bar.current.style.transform = `scaleX(${ink})`;
    setDone(ink > 0.55);
  });

  return (
    <section ref={track} aria-label={eyebrow} className="bg-panna relative h-[260vh]">
      <div className="sticky top-[var(--header-height)] flex h-[calc(100svh-var(--header-height))] flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
          <div className="mb-6 flex items-end justify-between gap-6 md:mb-10">
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="text-h2 mt-4 max-w-xl font-semibold">{title}</h2>
            </div>
            <p
              aria-hidden="true"
              className="hidden font-mono text-xs tracking-[0.2em] uppercase md:block"
            >
              {done ? stageEnd : stageStart}
            </p>
          </div>

          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid slice"
            className="block aspect-[4/3] h-auto w-full md:aspect-[2362/1160]"
            role="img"
            aria-label={imageAlt}
          >
            <defs>
              <filter id={`ink${id}`} x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.045 0.055"
                  numOctaves="4"
                  seed="5"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="70"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
                <feGaussianBlur stdDeviation="1.4" result="blurred" />
                <feComponentTransfer in="blurred">
                  <feFuncA type="linear" slope="2.2" intercept="-0.6" />
                </feComponentTransfer>
              </filter>
              <mask id={`mask${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
                <path ref={mask} d={inkPath(0)} fill="white" filter={`url(#ink${id})`} />
              </mask>
            </defs>
            <image href={optimisedSrc(drawingSrc)} width={W} height={H} />
            <image href={optimisedSrc(renderSrc)} width={W} height={H} mask={`url(#mask${id})`} />
          </svg>

          <div aria-hidden="true" className="bg-border mt-6 h-px w-full">
            <div ref={bar} className="bg-ink h-px w-full origin-left scale-x-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
