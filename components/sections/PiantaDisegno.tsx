// components/sections/PiantaDisegno.tsx
// SVG della pianta di cantiere (geometria in content/piantaPontecchio.ts) per la sezione
// PiantaSoluzioni. Lo stato di costruzione 0..1 non passa da React: drawPlan() scrive gli stili
// direttamente sugli elementi marcati con data-wall / data-layer / data-zoom.

import type { MouseEvent, PointerEvent as ReactPointerEvent, RefObject } from "react";
import type { FloorPlanMarker } from "@/content/homepage";
import { piantaPontecchio as P } from "@/content/piantaPontecchio";

/** Drawing area in plan units: building + dimension lines around it. */
export const PLAN_VIEWBOX = { x: 140, y: 180, w: 3090, h: 4500 } as const;

const MM_PER_UNIT = 8.4667; // 1:100 at 300 dpi
const DIMS = [
  { o: "h", from: 428, to: 2897, at: 340, edge: 588 },
  { o: "v", from: 588, to: 4485, at: 3170, edge: 2897 },
  { o: "v", from: 588, to: 1934, at: 300, edge: 428 },
  { o: "h", from: 1727, to: 2897, at: 4610, edge: 4485 },
] as const;
const HIT_PAD = 90; // plan units: a façade band alone would be a ~10 px hover target on desktop

// Rounded to 5 cm: the CAD export is quantised to 1 unit (~8.5 mm), so 33,00 m would read 32,99.
const metres = (u: number) =>
  (Math.round((u * MM_PER_UNIT) / 50) / 20).toFixed(2).replace(".", ",");

// Deterministic scatter for the "walls fly in" stage.
const SCATTER = P.walls.map((_, i) => {
  const a = i * 2.39996;
  const r = 650 + ((i * 137) % 500);
  return [Math.cos(a) * r, Math.sin(a) * r, ((i * 53) % 50) - 25] as const;
});

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, start: number, len: number) => clamp01((p - start) / len);
const ease = (t: number) => 1 - (1 - t) ** 3;

/** Applies build progress p (0..1): walls fly in, fill, openings, balconies, dimensions + zoom-out. */
export function drawPlan(svg: SVGSVGElement, p: number) {
  svg.querySelectorAll<SVGPathElement>("[data-wall]").forEach((el, i) => {
    const t = ease(seg(p, 0.02 + i * 0.0085, 0.13));
    const [dx, dy, r] = SCATTER[i] ?? [0, 0, 0];
    el.style.transform = `translate(${dx * (1 - t)}px, ${dy * (1 - t)}px) rotate(${r * (1 - t)}deg)`;
    el.style.opacity = String(clamp01(t * 4));
    el.style.fillOpacity = String(seg(p, 0.36, 0.09));
  });
  const show = (name: string, v: number) => {
    const el = svg.querySelector<SVGGElement>(`[data-layer="${name}"]`);
    if (el) el.style.opacity = String(v);
  };
  show("openings", seg(p, 0.46, 0.1));
  show("outside", seg(p, 0.58, 0.08));
  show("dims", seg(p, 0.72, 0.08));
  const zoom = svg.querySelector<SVGGElement>("[data-zoom]");
  if (zoom) zoom.style.transform = `scale(${1 + 0.16 * (1 - ease(seg(p, 0.68, 0.14)))})`;
}

type PiantaDisegnoProps = {
  svgRef: RefObject<SVGSVGElement | null>;
  label: string;
  markers: readonly FloorPlanMarker[];
  active: number | null;
  /** Hover / tap targets on the highlighted elements; off until the plan is built. */
  interactive: boolean;
  onAreaEnter: (i: number, e: ReactPointerEvent) => void;
  onAreaLeave: (e: ReactPointerEvent) => void;
  onAreaClick: (i: number, e: MouseEvent) => void;
};

export function PiantaDisegno({
  svgRef,
  label,
  markers,
  active,
  interactive,
  onAreaEnter,
  onAreaLeave,
  onAreaClick,
}: PiantaDisegnoProps) {
  const vb = PLAN_VIEWBOX;
  return (
    <svg
      ref={svgRef}
      viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
      className="absolute inset-0 h-full w-full overflow-visible"
      role="img"
      aria-label={label}
    >
      <g data-zoom className="origin-center [transform-box:view-box]">
        <g className="fill-ink stroke-ink">
          {P.walls.map((d, i) => (
            <path
              key={i}
              d={d}
              data-wall
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              className="origin-center [transform-box:fill-box]"
              style={{ opacity: 0, fillOpacity: 0 }}
            />
          ))}
        </g>
        <g data-layer="openings" className="stroke-ink" fill="none" style={{ opacity: 0 }}>
          <path d={P.openings} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <path d={P.stairs} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        </g>
        <g data-layer="outside" className="stroke-ink/45" fill="none" style={{ opacity: 0 }}>
          <path d={P.outside} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        </g>
        <g data-layer="dims" style={{ opacity: 0 }}>
          {DIMS.map((d) => {
            const mid = (d.from + d.to) / 2;
            const h = d.o === "h";
            const line = h ? `M${d.from} ${d.at} H${d.to}` : `M${d.at} ${d.from} V${d.to}`;
            const ext = h
              ? `M${d.from} ${d.at - 25} V${d.edge} M${d.to} ${d.at - 25} V${d.edge}`
              : `M${d.at - 25} ${d.from} H${d.edge} M${d.at - 25} ${d.to} H${d.edge}`;
            const ticks = [d.from, d.to]
              .map((v) =>
                h ? `M${v - 22} ${d.at + 22} l44 -44` : `M${d.at - 22} ${v + 22} l44 -44`,
              )
              .join(" ");
            return (
              <g key={`${d.o}${d.at}`}>
                <path
                  d={ext}
                  className="stroke-ink/25"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={`${line} ${ticks}`}
                  className="stroke-ink/80"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x={h ? mid : d.at - 40}
                  y={h ? d.at - 40 : mid}
                  transform={h ? undefined : `rotate(-90 ${d.at - 40} ${mid})`}
                  textAnchor="middle"
                  className="fill-ink/80 font-mono"
                  fontSize={105}
                >
                  {metres(d.to - d.from)}
                </text>
              </g>
            );
          })}
        </g>
        {/* Highlight above the walls, so a façade band reads as tinted. */}
        {markers.map((m, i) => (
          <rect
            key={m.n}
            x={m.area.x}
            y={m.area.y}
            width={m.area.w}
            height={m.area.h}
            className="fill-brand/20 stroke-brand pointer-events-none transition-opacity duration-300"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            vectorEffect="non-scaling-stroke"
            opacity={interactive && active === i ? 1 : 0}
          />
        ))}
        {interactive &&
          markers.map((m, i) => (
            <rect
              key={m.n}
              x={m.area.x - HIT_PAD}
              y={m.area.y - HIT_PAD}
              width={m.area.w + 2 * HIT_PAD}
              height={m.area.h + 2 * HIT_PAD}
              fill="transparent"
              className="cursor-pointer"
              onPointerEnter={(e) => onAreaEnter(i, e)}
              onPointerLeave={onAreaLeave}
              onClick={(e) => onAreaClick(i, e)}
            />
          ))}
      </g>
    </svg>
  );
}
