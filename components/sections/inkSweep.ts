// Timing and geometry of the ink sweep in DalProgettoAllOpera. Pure: no React, no DOM, no runtime
// imports, so `node --test` can load it.

// Both images: 2362×1160, rendered from the same Blender camera (pixel-aligned).
export const IMG_W = 2362;
export const IMG_H = 1160;
export const W = 1000;
export const H = (W * IMG_H) / IMG_W;

/** Control-point offset of the ink curve: in the middle it dips BULGE / 2 below its edge y. */
const BULGE = 110;
/** Displacement map scale: the edge is pushed up to half this either way. */
export const DISPLACEMENT = 70;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
/** Half linear, half smoothstep: the sweep starts and stops softly without long, almost-still tails. */
const ease = (t: number) => (t + smooth(t)) / 2;
/** Inverse of `ease` on 0..1 (it is monotonic), by bisection. */
const easeInverse = (y: number) => {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (ease(mid) < y) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
};

/** Height of the ink edge: sweeps from above the top (ink=0) to just past the bottom (ink=1). */
export const inkY = (ink: number) => -80 + ink * (H + 130);

/** Lowest point of the ink curve (its middle), before displacement. */
export const inkLowest = (y: number) => y + BULGE / 2;

/** Only a thin band along the edge is filtered: the filter's cost grows with the area it covers, and on
 * WebKit (all iOS browsers) it runs on the CPU every frame. The band's own top edge gets ragged too,
 * but by at most DISPLACEMENT / 2, so the solid area up to y-10 hides it. */
export const inkBand = (y: number) =>
  `M0 ${y - 60} L${W} ${y - 60} L${W} ${y} Q${W / 2} ${y + BULGE} 0 ${y} Z`;
export const inkSolid = (y: number) => String(Math.max(0, y));

/** Sweep position (ease input) when the section sticks: the sweep has already started while it
 * scrolled in. */
const AT_STICK = 0.3;
/** Sweep position (ease input) when the section unsticks: the middle of the ink curve touches the image
 * bottom. Derived, so it follows any change to the geometry above. */
const AT_UNSTICK = easeInverse((H - BULGE / 2 + 80) / (H + 130));

/** How much of the sweep is done (0..1) at sticky progress p: 0 when the section sticks, 1 when it
 * unsticks, below 0 while it scrolls in, above 1 while it scrolls away. The sweep speed per scrolled
 * pixel is set by the track height in DalProgettoAllOpera. */
export const inkAt = (p: number) => ease(clamp(AT_STICK + p * (AT_UNSTICK - AT_STICK)));
