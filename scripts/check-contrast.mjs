// scripts/check-contrast.mjs
// Assert WCAG 2.1 contrast ratios for the brand palette declared in CONTEXT.md D-01..D-06.
// Fails with exit code 1 if any "allowed" pair drops below 4.5, or if any "forbidden" pair
// climbs above 4.5 (which would invalidate D-06 and let the fill-only rule be broken).
// Run: `pnpm check:contrast`

import process from "node:process";

const INK = "#1A1A1A"; // D-01
const PANNA = "#F8F5EE"; // D-02
const BRAND = "#291572"; // D-03
const SURFACE = "#FFFFFF"; // neutral white card

const AA = 4.5; // WCAG 2.1 AA for normal text
const AAA = 7.0;

/**
 * WCAG relative luminance of a hex color.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function luminance(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  const [R, G, B] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Contrast ratio between two hex colors (1 → 21).
 */
function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [L1, L2] = la > lb ? [la, lb] : [lb, la];
  return (L1 + 0.05) / (L2 + 0.05);
}

const ALLOWED = [
  { label: "ink on panna (body + titles)", fg: INK, bg: PANNA, min: AA },
  {
    label:
      "brand on panna (CTA link style is FORBIDDEN — brand fill is the rule; but decorative icons OK)",
    fg: BRAND,
    bg: PANNA,
    min: AA,
  },
  { label: "panna on brand (CTA button fill — canonical)", fg: PANNA, bg: BRAND, min: AA },
  { label: "ink on surface (white card)", fg: INK, bg: SURFACE, min: AA },
];

const FORBIDDEN = [
  { label: "ink on brand (D-06 — near-luminance clash)", fg: INK, bg: BRAND },
  { label: "brand on ink (D-06 — near-luminance clash)", fg: BRAND, bg: INK },
];

let failed = false;

console.log("Brand palette contrast check (WCAG 2.1)\n");
console.log("ALLOWED combinations (must be ≥ 4.5):");

for (const pair of ALLOWED) {
  const r = ratio(pair.fg, pair.bg);
  const ok = r >= pair.min;
  const mark = ok ? "✓" : "✗";
  const grade = r >= AAA ? "AAA" : r >= AA ? "AA" : "FAIL";
  console.log(`  ${mark} ${pair.label}: ${r.toFixed(2)}:1  [${grade}]`);
  if (!ok) failed = true;
}

console.log("\nFORBIDDEN combinations (must be < 4.5 — proves D-06 near-luminance):");

for (const pair of FORBIDDEN) {
  const r = ratio(pair.fg, pair.bg);
  const ok = r < AA;
  const mark = ok ? "✓" : "✗";
  console.log(
    `  ${mark} ${pair.label}: ${r.toFixed(2)}:1  ${ok ? "(correctly unreadable as text)" : "(unexpectedly passes — D-06 premise invalid, re-check palette)"}`,
  );
  if (!ok) failed = true;
}

if (failed) {
  console.error("\n❌ Contrast check FAILED. Palette violates FND-02 / D-05 / D-06.\n");
  process.exit(1);
}

console.log("\n✓ All contrast checks passed.");
