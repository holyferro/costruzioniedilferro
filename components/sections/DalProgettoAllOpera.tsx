"use client";

// components/sections/DalProgettoAllOpera.tsx
// Client Component (scroll-driven). Sezione sticky a tutta larghezza: scorrendo, il render del
// progetto si sparge dall'alto sopra il disegno a linee con un bordo a inchiostro.
// Tecnica (come heronaiapp.com, senza GSAP): due <image> in un SVG; il render è mascherato da un
// path il cui bordo è deformato da rumore (feTurbulence pre-calcolato) + feDisplacementMap. Il path
// si aggiorna via ref in requestAnimationFrame, nessun re-render per frame.
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
/** Half linear, half smoothstep: the sweep starts and stops softly without long, almost-still tails. */
const ease = (t: number) => (t + smooth(t)) / 2;

/** Ease input at which the ink's lowest point (curve bulge + displacement) touches the image bottom. */
const INK_AT_UNSTICK = 0.78;
/** Ease input when the section sticks: the sweep has already started while it scrolled in. */
const INK_AT_STICK = 0.3;

/** Height of the ink edge: sweeps from above the top (p=0) to just past the bottom (p=1). */
const inkY = (p: number) => -80 + p * (H + 130);

/** Only a thin band along the edge is filtered: the filter's cost grows with the area it covers, and on
 * WebKit (all iOS browsers) it runs on the CPU every frame. The band's own top edge gets ragged too,
 * but by at most 35 (displacement scale / 2), so the solid area up to y-10 hides it. */
const inkBand = (y: number) =>
  `M0 ${y - 60} L${W} ${y - 60} L${W} ${y} Q${W / 2} ${y + 110} 0 ${y} Z`;
const inkSolid = (y: number) => String(Math.max(0, y));

// Noise for the ink edge, rendered once as an image and fed to the filter via <feImage>.
// A live <feTurbulence> is recomputed on every scroll frame in WebKit (all iOS browsers), on the
// CPU at device resolution: ~200ms frames. Same user-space box, so the edge still morphs as it moves.
const NOISE = { x: -200, y: -300, width: 1400, height: 1200 };
const NOISE_SRC = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${NOISE.x} ${NOISE.y} ${NOISE.width} ${NOISE.height}" width="${NOISE.width}" height="${NOISE.height}">` +
    `<filter id="n" filterUnits="userSpaceOnUse" x="${NOISE.x}" y="${NOISE.y}" width="${NOISE.width}" height="${NOISE.height}">` +
    `<feTurbulence type="fractalNoise" baseFrequency="0.045 0.055" numOctaves="4" seed="5"/></filter>` +
    `<rect x="${NOISE.x}" y="${NOISE.y}" width="${NOISE.width}" height="${NOISE.height}" filter="url(#n)"/></svg>`,
)}`;

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

/** Calls onProgress with how far the section's sticky track has been scrolled: 0 when it sticks, 1 when
 * it unsticks. Below 0 while it scrolls in, above 1 while it scrolls away. */
function useStickyProgress(el: RefObject<HTMLElement | null>, onProgress: (p: number) => void) {
  const cb = useRef(onProgress);
  useEffect(() => {
    cb.current = onProgress;
  });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cb.current(Infinity);
      return;
    }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const sticky = el.current?.firstElementChild;
      if (!el.current || !sticky) return;
      const r = el.current.getBoundingClientRect();
      const travel = r.height - sticky.getBoundingClientRect().height;
      const stickAt = parseFloat(getComputedStyle(sticky).top);
      cb.current(travel > 0 ? (stickAt - r.top) / travel : 0);
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
  const track = useRef<HTMLDivElement>(null);
  const mask = useRef<SVGPathElement>(null);
  const solid = useRef<SVGRectElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  useStickyProgress(track, (p) => {
    // The sweep starts while the section scrolls in, continues while it is stuck, and finishes while it
    // scrolls away: it unsticks (p=1) when the ink's lowest point reaches the image bottom.
    const ink = ease(clamp(INK_AT_STICK + p * (INK_AT_UNSTICK - INK_AT_STICK)));
    const y = inkY(ink);
    const d = inkBand(y);
    // Skip no-op writes (every frame before and after the sweep): each write re-runs the filter.
    if (mask.current?.getAttribute("d") !== d) {
      mask.current?.setAttribute("d", d);
      solid.current?.setAttribute("height", inkSolid(y));
    }
    if (bar.current) bar.current.style.transform = `scaleX(${ink})`;
    setDone(ink > 0.55);
  });

  return (
    <section aria-label={eyebrow} className="bg-panna pb-12 md:pb-20">
      {/* Track outside the bottom padding, so progress hits 1 exactly when the sticky child unsticks. */}
      <div ref={track} className="relative h-[140vh]">
        <div className="sticky top-[var(--header-height)] flex h-[calc(100svh-var(--header-height))] flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
            <div className="mb-6 flex items-end justify-between gap-6 md:mb-10">
              <div>
                <Eyebrow>{eyebrow}</Eyebrow>
                <h2 className="text-h2 mt-4 max-w-xl font-serif font-medium tracking-tight">
                  {title}
                </h2>
              </div>
              <p
                aria-hidden="true"
                className="tracking-caps hidden font-mono text-xs uppercase md:block"
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
                  <feImage href={NOISE_SRC} {...NOISE} preserveAspectRatio="none" result="noise" />
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
                  <rect
                    ref={solid}
                    x="0"
                    y="-10"
                    width={W}
                    height={inkSolid(inkY(0))}
                    fill="white"
                  />
                  <path ref={mask} d={inkBand(inkY(0))} fill="white" filter={`url(#ink${id})`} />
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
      </div>
    </section>
  );
}
