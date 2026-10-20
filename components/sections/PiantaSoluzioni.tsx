"use client";

// components/sections/PiantaSoluzioni.tsx
// Client Component (interazione reale). La pianta di un cantiere Edilferro si costruisce una volta
// quando entra in vista (IntersectionObserver + rAF, stili scritti via ref: nessun re-render per
// frame); poi tre marcatori sulle soluzioni tecniche. Mouse: passando sopra a marcatore, voce
// dell'elenco o elemento evidenziato si apre una scheda con foto. Touch / tastiera: tap o Invio
// apre e chiude; Esc, tap fuori dalla scheda o la X (solo touch) chiudono.
// prefers-reduced-motion: pianta subito completa.

import Image from "next/image";
import { CloseButton } from "@/components/ui/CloseButton";
import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { closed, nextPopover, type PopoverEvent } from "./piantaPopover";
import type { FloorPlanMarker, HomepageContent } from "@/content/homepage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PLAN_VIEWBOX as VB, PiantaDisegno, clamp01, drawPlan } from "./PiantaDisegno";

type PiantaSoluzioniProps = HomepageContent["floorPlan"];

const BUILD_MS = 4200;
const CLOSE_DELAY_MS = 160; // lets the pointer travel from marker to card without closing it

const isMouse = (e: { pointerType: string }) => e.pointerType === "mouse";

/**
 * Plays the build once when `box` scrolls into view; changing `run` replays it.
 * Returns true once the plan is complete.
 */
function useBuildOnce(box: RefObject<HTMLElement | null>, apply: (p: number) => void, run: number) {
  const [doneRun, setDoneRun] = useState(-1);
  const applyRef = useRef(apply);
  useEffect(() => {
    applyRef.current = apply;
  });
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => {
        applyRef.current(1);
        setDoneRun(run);
      });
      return () => cancelAnimationFrame(raf);
    }
    applyRef.current(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const p = clamp01((now - t0) / BUILD_MS);
          applyRef.current(p);
          if (p < 1) raf = requestAnimationFrame(step);
          else setDoneRun(run);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [box, run]);
  return doneRun === run;
}

/**
 * The open floor-plan card (transitions in piantaPopover.ts) wired to pointer, click, Esc and taps
 * outside. Every trigger does nothing until `enabled`, so no card opens while the plan builds.
 */
function usePinnablePopover(enabled: boolean) {
  const [state, setState] = useState(closed);
  const closeTimer = useRef(0);
  const reveal = useRef(false); // opened by tap/keyboard: scroll the card fully into view
  // Pointer of the last press. A click's own pointerType can't tell: WebKit reports "mouse" for the
  // click that follows a tap, which pinned the card instead of toggling it.
  const lastPointer = useRef("");
  useEffect(() => {
    const onDown = (e: PointerEvent) => (lastPointer.current = e.pointerType);
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, []);

  const send = (e: PopoverEvent) => {
    clearTimeout(closeTimer.current);
    setState((s) => nextPopover(s, e));
  };
  const close = () => send({ type: "close" });
  const enter = (i: number, e: { pointerType: string }) =>
    enabled && isMouse(e) && send({ type: "hover", i });
  const leave = (e: { pointerType: string }) => {
    if (!isMouse(e)) return;
    clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(
      () => setState((s) => nextPopover(s, { type: "leaveTimeout" })),
      CLOSE_DELAY_MS,
    );
  };
  /** Mouse click pins the card; tap and keyboard (click with detail 0) toggle it. */
  const pick = (i: number, e: { detail: number }) => {
    if (!enabled) return;
    const mouse = e.detail > 0 && lastPointer.current === "mouse";
    reveal.current = !mouse;
    send({ type: "pick", i, mouse });
  };

  const active = state.active;
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setState(closed);
    // Triggers toggle on their own click; anything else outside the card closes it.
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.("[data-pianta-card],[data-pianta-trigger]")) {
        setState(closed);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [active]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return {
    active,
    close,
    enter,
    leave,
    pick,
    triggerProps: (i: number) => ({
      "data-pianta-trigger": true,
      "aria-expanded": active === i,
      onClick: (e: { detail: number }) => pick(i, e),
      onPointerEnter: (e: { pointerType: string }) => enter(i, e),
      onPointerLeave: leave,
    }),
    cardProps: (i: number) => ({
      "data-pianta-card": true,
      onPointerEnter: (e: { pointerType: string }) => enter(i, e),
      onPointerLeave: leave,
      ref: (el: HTMLElement | null) => {
        if (!el || !reveal.current) return;
        reveal.current = false;
        el.scrollIntoView({ block: "nearest", behavior: "smooth" });
      },
    }),
  };
}

const markerPos = (m: FloorPlanMarker) => {
  const fx = (m.x - VB.x) / VB.w;
  const fy = (m.y - VB.y) / VB.h;
  return {
    style: { left: `${fx * 100}%`, top: `${fy * 100}%` },
    // Card side: keep it inside the plan on a 375px screen.
    cardX: fx > 0.7 ? "right-0 -mr-3" : fx < 0.3 ? "-left-3" : "left-0 -translate-x-1/2",
    // Measured from the marker wrapper, which is as tall as the button (36px): above the marker the
    // card needs that height on top of the gap, or it covers the marker and a second tap misses it.
    cardY: fy > 0.55 ? "bottom-[calc(100%+1.75rem)]" : "top-7",
  };
};

export function PiantaSoluzioni({
  eyebrow,
  title,
  intro,
  planAlt,
  replayLabel,
  hintTouch,
  hintPointer,
  markers,
}: PiantaSoluzioniProps) {
  const box = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);
  const cardId = useId();

  const done = useBuildOnce(
    box,
    (p) => {
      if (svg.current) drawPlan(svg.current, p);
      const o = overlay.current;
      if (o) {
        const v = clamp01((p - 0.84) / 0.06);
        o.style.opacity = String(v);
        o.inert = v < 1;
      }
    },
    run,
  );

  const { active, close, enter, leave, pick, triggerProps, cardProps } = usePinnablePopover(done);

  return (
    <section aria-label={eyebrow} className="bg-panna py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-x-16 md:gap-y-0 lg:px-12">
        <div className="md:col-start-1 md:row-start-1 md:self-end">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-h2 mt-4 font-serif font-medium tracking-tight">{title}</h2>
          <p className="text-ink/70 mt-4 max-w-md">{intro}</p>
        </div>

        <div
          ref={box}
          className="[container-type:size] mx-auto aspect-[3090/4500] max-h-[80svh] w-full md:col-start-2 md:row-span-2 md:row-start-1 md:aspect-auto md:h-[min(80svh,46rem)] md:max-h-none md:self-center"
        >
          <div className="flex h-full items-center justify-center">
            {/* Plan box: fits the container at the drawing's aspect ratio (3090×4500). */}
            <div className="relative aspect-[3090/4500] w-[min(100cqw,calc(100cqh*0.6867))]">
              <PiantaDisegno
                svgRef={svg}
                label={planAlt}
                markers={markers}
                active={active}
                interactive={done}
                onAreaEnter={enter}
                onAreaLeave={leave}
                onAreaClick={pick}
              />
              <div ref={overlay} inert className="pointer-events-none absolute inset-0 opacity-0">
                {markers.map((m, i) => {
                  const pos = markerPos(m);
                  const isOpen = active === i;
                  return (
                    <div key={m.n} className="pointer-events-auto absolute" style={pos.style}>
                      <button
                        type="button"
                        {...triggerProps(i)}
                        aria-controls={isOpen ? `${cardId}-${i}` : undefined}
                        aria-label={`${m.n}: ${m.title}`}
                        className={`bg-brand focus-visible:outline-ink relative grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-mono text-xs font-semibold text-white shadow-md ring-4 transition-[box-shadow,transform] before:absolute before:-inset-1 before:rounded-full before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 ${isOpen ? "ring-brand/35 scale-110" : "ring-brand/15"}`}
                      >
                        {m.n}
                      </button>
                      {isOpen && (
                        <div
                          id={`${cardId}-${i}`}
                          {...cardProps(i)}
                          className={`absolute z-10 scroll-mt-[calc(var(--header-height)+1rem)] scroll-mb-4 ${pos.cardX} ${pos.cardY}`}
                        >
                          <PhotoCard key={m.n} marker={m} />
                          <CloseButton
                            variant="glass"
                            label="Chiudi scheda"
                            onClick={close}
                            className="absolute top-[18px] right-[18px] z-10 hidden pointer-coarse:grid"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-start-1 md:row-start-2 md:self-start">
          <ol className="divide-border border-border mt-8 divide-y border-y">
            {markers.map((m, i) => (
              <li key={m.n}>
                <button
                  type="button"
                  {...triggerProps(i)}
                  className="flex w-full items-center gap-4 py-4 text-left"
                >
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full font-mono text-xs font-semibold transition-colors ${active === i ? "bg-brand text-white" : "bg-ink/5 text-ink"}`}
                  >
                    {m.n}
                  </span>
                  <span className="font-semibold">{m.title}</span>
                </button>
              </li>
            ))}
          </ol>
          <p className="text-ink/65 mt-3 text-sm">
            <span className="md:hidden">{hintTouch}</span>
            <span className="hidden md:inline">{hintPointer}</span>
          </p>
          <button
            type="button"
            onClick={() => {
              close();
              setRun((r) => r + 1);
            }}
            className="text-ink/65 hover:text-ink tracking-caps mt-6 font-mono text-xs uppercase underline-offset-4 hover:underline"
          >
            ↻ {replayLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

function PhotoCard({ marker }: { marker: FloorPlanMarker }) {
  const [k, setK] = useState(0);
  const photo = marker.photos[k];
  return (
    <div className="border-border bg-surface w-64 max-w-[78vw] border shadow-xl sm:w-72">
      {photo && (
        <div className="bg-ink/5 relative aspect-[4/3]">
          <Image src={photo.src} alt={photo.alt} fill sizes="288px" className="object-cover" />
        </div>
      )}
      <div className="p-4">
        <p className="text-brand tracking-caps font-mono text-[11px] uppercase">{marker.norm}</p>
        <p className="mt-1 leading-snug font-semibold">{marker.title}</p>
        <p className="text-ink/70 mt-1 text-sm">{marker.body}</p>
        <div className="mt-3 flex items-end justify-between gap-3">
          {marker.photos.length > 1 && (
            <div className="flex gap-1.5">
              {marker.photos.map((ph, j) => (
                <button
                  key={ph.src}
                  type="button"
                  aria-label={`Foto ${j + 1} di ${marker.photos.length}`}
                  aria-pressed={j === k}
                  onPointerEnter={(e) => isMouse(e) && setK(j)}
                  onClick={() => setK(j)}
                  className={`relative h-9 w-12 overflow-hidden ring-offset-1 transition ${j === k ? "ring-brand ring-2" : "opacity-60 hover:opacity-100"}`}
                >
                  <Image src={ph.src} alt="" fill sizes="48px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
          {photo?.credit && (
            <p className="text-ink/65 text-right text-[11px] leading-tight">{photo.credit}</p>
          )}
        </div>
      </div>
    </div>
  );
}
