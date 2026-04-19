# Phase 3: Servizi — Pattern Map

**Mapped:** 2026-04-19
**Files analyzed:** 6 (4 new components + 1 new content module + 1 modified page)
**Analogs found:** 6 / 6

---

## File Classification

| New / Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `components/sections/ServicesHero.tsx` | component | request-response (static RSC) | `components/sections/Values.tsx` (panna bg, H1/H2 serif, Eyebrow) | role-match |
| `components/sections/TargetIndex.tsx` | component | request-response (static RSC) | `components/sections/ServiceOverview.tsx` (card-link pattern, bullet pills, arrow CTA) | exact |
| `components/sections/ServicesEditorialRow.tsx` | component | request-response (static RSC) | `components/sections/ServiceOverview.tsx` (ServiceRow sub-component, 2-col text+photo, alternating) | exact |
| `components/sections/HowWeWork.tsx` | component | request-response (static RSC) | `components/sections/Values.tsx` (numbered list, step grid, Eyebrow + H2 header, serif italic counter) | role-match |
| `content/services.ts` | content module | — | `content/homepage.ts` (HomepageContent type structure, ServiceItem type) | exact |
| `app/servizi/page.tsx` | route (RSC page) | request-response (static RSC) | `app/page.tsx` (import + spread props orchestrator pattern, buildMetadata) | exact |

---

## Pattern Assignments

### `components/sections/ServicesHero.tsx` (component, static RSC)

**Analog:** `components/sections/Values.tsx`

**Rationale:** Values is the only existing section on `bg-panna` with a centered single-column editorial header using the light-surface Eyebrow. The ServicesHero is a stripped-down version — no principles list, just the heading block expanded to full-page hero scale.

**Imports pattern** (`Values.tsx` lines 1–4):
```typescript
// No external image import — ServicesHero is text-only (no next/image needed)
import type { Principle } from "@/content/homepage";
// ServicesHero will import from content/services.ts instead
```

**Eyebrow pattern** (`Values.tsx` lines 62–68 — light surface version):
```tsx
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-ink/60 text-xs font-semibold tracking-[0.38em] uppercase">
      <span aria-hidden="true" className="bg-ink/40 mr-3 inline-block h-px w-8 align-middle" />
      {children}
    </p>
  );
}
```

**Section container + H2 heading pattern** (`Values.tsx` lines 24–34):
```tsx
<section className="bg-panna text-ink py-24 md:py-32">
  <div className="mx-auto max-w-6xl px-6 md:px-12">
    {/* ServicesHero: text-center + max-w-3xl mx-auto per UI-SPEC */}
    <div className="text-center max-w-3xl mx-auto">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-ink mt-5 max-w-[14ch] font-serif text-[clamp(2rem,1rem+2.6vw,3.4rem)] leading-[1.12] font-medium tracking-tight">
        {titleStart}
        <em className="text-brand font-serif italic">{titleAccent}</em>
        {titleEnd}
      </h2>
      <p className="text-ink/70 mt-7 max-w-[36ch] text-base leading-[1.65]">{body}</p>
    </div>
  </div>
</section>
```

**H1 scale override for hero** — ServicesHero uses H1 not H2. Apply clamp from UI-SPEC:
```tsx
// H1 hero: clamp(2.25rem, 1.5rem + 3.2vw, 4rem)
// Replace Values h2 clamp with:
className="text-ink mt-5 font-serif text-[clamp(2.25rem,1.5rem+3.2vw,4rem)] leading-[1.1] font-medium tracking-tight"
```

**Props shape to copy:**
```typescript
type ServicesHeroProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
};
```

---

### `components/sections/TargetIndex.tsx` (component, static RSC)

**Analog:** `components/sections/ServiceOverview.tsx`

**Rationale:** TargetIndex cards are the light-surface evolution of the ServiceOverview ServiceRow pattern. Same hover arrow translate, same bullet pills, same numbered eyebrow — but wrapped as fully-clickable `<Link>` cards in a 3-column grid instead of full-bleed rows.

**Imports pattern** (`ServiceOverview.tsx` lines 1–8):
```typescript
import Image from "next/image";  // not needed for TargetIndex (no image in card)
import Link from "next/link";
import type { Route } from "next";
import type { ServiceItem } from "@/content/homepage";
// TargetIndex will import its own type from content/services.ts
```

**Full-card Link wrapper pattern** (`ServiceOverview.tsx` lines 112–118 adapted — FeaturedProjects FeatureCard lines 66–70 is the closer reference for full-card clickability):
```tsx
// Full-card link (from FeaturedProjects.tsx lines 66–70, adapted for light surface):
<Link
  href={"/servizi#privati" as Route<string>}
  className="group block border border-border bg-surface p-8 md:p-10
             transition-colors duration-300 hover:border-ink/40
             focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4
             h-full"
>
```

**Numbered eyebrow row pattern** (`ServiceOverview.tsx` lines 78–82 — ServiceRow):
```tsx
<div className="mb-4 flex items-baseline gap-4">
  <span className="text-brand font-serif text-sm font-medium italic">— {item.n}</span>
  <span className="text-ink/60 text-[11px] font-semibold tracking-[0.22em] uppercase">
    {item.kicker}
  </span>
</div>
```

**Bullet pill list pattern** (`ServiceOverview.tsx` lines 88–97):
```tsx
<ul className="mt-7 flex flex-wrap gap-2">
  {item.tags.map((t) => (
    <li
      key={t}
      className="text-ink/85 border-ink/20 hover:border-brand/50 rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-300"
    >
      {t}
    </li>
  ))}
</ul>
```

**Arrow CTA with group-hover translate** (`ServiceOverview.tsx` lines 98–109):
```tsx
<span className="text-ink border-ink/35 hover:border-ink group/cta mt-9 inline-flex items-center gap-2.5 border-b pb-1.5 font-[family-name:var(--font-neue-montreal)] text-xs tracking-[0.08em] uppercase transition-colors">
  {item.ctaLabel}
  <span
    aria-hidden="true"
    className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1.5"
  >
    →
  </span>
</span>
```

**Note:** On the TargetIndex card the `group/cta` scope lives on the `<Link>` wrapper itself. Replace `group/cta` with `group` and `group-hover/cta:translate-x-1.5` with `group-hover:translate-x-1.5`.

**3-column grid wrapper:**
```tsx
<section className="bg-panna text-ink py-16 md:py-20">
  <div className="mx-auto max-w-6xl px-6 md:px-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-stretch">
      {/* cards */}
    </div>
  </div>
</section>
```

---

### `components/sections/ServicesEditorialRow.tsx` (component, static RSC)

**Analog:** `components/sections/ServiceOverview.tsx` — specifically the `ServiceRow` internal function (lines 62–138)

**Rationale:** This is the most direct copy. ServiceRow already implements 2-col text+photo alternating, anchor-ready `id` attribute, bullet pills, and image scale-on-hover. The only delta: (1) surface color switches from `bg-ink / text-panna` to `bg-panna / text-ink` or `bg-white / text-ink`; (2) a SOA badges slot is added for the Enti Pubblici variant; (3) an `id` prop is added for anchor navigation.

**Full ServiceRow source** (`ServiceOverview.tsx` lines 62–138):
```tsx
function ServiceRow({
  item,
  reverse,
  first,
}: {
  item: ServiceItem;
  reverse: boolean;
  first: boolean;
}) {
  return (
    <div
      className={`border-panna/15 grid items-center gap-10 border-b py-12 md:grid-cols-2 md:gap-16 md:py-14 ${
        first ? "border-t" : ""
      }`}
    >
      <div className={reverse ? "md:order-2" : "md:order-1"}>
        <div className="mb-4 flex items-baseline gap-4">
          <span className="text-panna/65 font-serif text-sm font-medium italic">— {item.n}</span>
          <span className="text-panna/60 text-[11px] font-semibold tracking-[0.22em] uppercase">
            {item.kicker}
          </span>
        </div>
        <h3 className="text-panna font-serif text-[clamp(1.75rem,0.8rem+2vw,2.6rem)] leading-[1.15] font-medium tracking-tight">
          {item.title}
        </h3>
        <p className="text-panna/75 mt-5 max-w-[52ch] text-base leading-[1.65]">{item.body}</p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <li key={t} className="text-panna/85 border-panna/20 rounded-full border px-3.5 py-1.5 text-xs">
              {t}
            </li>
          ))}
        </ul>
        <Link
          href={item.ctaHref as Route<string>}
          className="text-panna border-panna/35 hover:border-panna group/cta mt-9 inline-flex items-center gap-2.5 border-b pb-1.5 font-[family-name:var(--font-neue-montreal)] text-xs tracking-[0.08em] uppercase transition-colors"
        >
          {item.ctaLabel}
          <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1.5">→</span>
        </Link>
      </div>

      <Link
        href={item.ctaHref as Route<string>}
        aria-label={item.title}
        className={`group/img relative block aspect-[5/4] overflow-hidden bg-black ${reverse ? "md:order-1" : "md:order-2"}`}
      >
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.04]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        <span aria-hidden="true" className="absolute top-4 left-5 font-serif text-6xl leading-none font-medium tracking-tight text-white/85 [text-shadow:0_2px_20px_rgba(0,0,0,0.4)] md:text-7xl">
          {item.n}
        </span>
      </Link>
    </div>
  );
}
```

**Color token swap** for light surface (panna/white) — find-replace in the copy:

| Dark token (`bg-ink` surface) | Light token (`bg-panna` / `bg-white` surface) |
|---|---|
| `text-panna` | `text-ink` |
| `text-panna/65` | `text-brand` (for the `— 0N` italic serif number) |
| `text-panna/60` | `text-ink/60` |
| `text-panna/75` | `text-ink/80` |
| `text-panna/85` | `text-ink/85` |
| `border-panna/15` | `border-border` |
| `border-panna/20` | `border-ink/20 hover:border-brand/50` |
| `border-panna/35 hover:border-panna` | `border-ink/35 hover:border-ink` |

**Section wrapper with anchor id + alternating bg:**
```tsx
<section
  id={id}  // "privati" | "pubblico" | "professionisti"
  className={variant === "panna" ? "bg-panna text-ink py-20 md:py-28" : "bg-white text-ink py-20 md:py-28"}
>
  <div className="mx-auto max-w-6xl px-6 md:px-12">
    {/* ServiceRow content here */}
  </div>
</section>
```

**SOA badges slot** — added BELOW bullet list, ABOVE inline CTA, only when `soaBadges` prop is provided:
```tsx
{soaBadges && (
  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
    {soaBadges.map((badge) => (
      <div key={badge.code} className="bg-white border border-border rounded-lg px-5 py-4 md:px-6 md:py-5">
        <p className="text-brand text-xs font-semibold tracking-[0.22em] uppercase font-[family-name:var(--font-neue-montreal)]">
          {badge.code}
        </p>
        <p className="text-ink font-serif text-lg md:text-xl font-medium mt-1">
          {badge.name}
        </p>
        <p className="text-ink/70 text-sm leading-[1.55] mt-1">{badge.description}</p>
      </div>
    ))}
  </div>
)}
```

**Props shape:**
```typescript
type ServicesEditorialRowProps = {
  id: string;                       // anchor id — "privati" | "pubblico" | "professionisti"
  variant: "panna" | "white";       // alternating surface per D-18
  item: ServiceItem;                // reuses existing ServiceItem type from content/homepage.ts
  reverse: boolean;                 // photo side flip on alternate rows
  soaBadges?: readonly SoaBadge[];  // only for Enti Pubblici row
};
```

---

### `components/sections/HowWeWork.tsx` (component, static RSC)

**Analog:** `components/sections/Values.tsx`

**Rationale:** Values is the exact structural model — numbered serif italic markers, section header with Eyebrow + H2 on a light surface, clean list items on `bg-panna`. HowWeWork switches from a 2-col sticky layout to a flat 4-col horizontal grid and adds Lucide icons per D-09.

**Section header pattern** (`Values.tsx` lines 24–34 — left-aligned header variant):
```tsx
<section className="bg-white text-ink py-20 md:py-28">
  <div className="mx-auto max-w-6xl px-6 md:px-12">
    <div className="mb-14 md:mb-20 max-w-[34ch]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-ink mt-5 font-serif text-[clamp(2rem,1rem+2.6vw,3.4rem)] leading-[1.12] font-medium tracking-tight">
        {titleStart}
        <em className="text-brand font-serif italic">{titleAccent}</em>
        {titleEnd}
      </h2>
    </div>
    {/* 4-col step grid below */}
  </div>
</section>
```

**Serif italic step counter** (`Values.tsx` lines 44–46):
```tsx
<span className="text-brand font-serif text-xl leading-none font-medium italic md:text-[22px]">
  — {p.n}
</span>
```

**Step item structure** — adapted from Values `<li>` pattern (lines 40–55) to 4-column flat grid:
```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
  {steps.map((step) => (
    <div key={step.n} className="border-l border-border pl-6 first:border-l-0 first:pl-0 md:border-l md:pl-6 md:first:border-l-0 md:first:pl-0">
      {/* Step number above icon */}
      <span className="text-brand font-serif text-base font-medium italic">— {step.n}</span>
      {/* Lucide icon — size=28 strokeWidth=1.5 text-ink (NOT text-brand) */}
      <StepIcon className="mt-3 h-7 w-7 text-ink" strokeWidth={1.5} />
      {/* H3 serif title */}
      <h3 className="text-ink mt-4 font-serif text-xl font-medium leading-tight">{step.title}</h3>
      {/* Inter description */}
      <p className="text-ink/70 mt-2 text-base leading-[1.6]">{step.description}</p>
    </div>
  ))}
</div>
```

**Lucide icon import pattern** (none yet in codebase — first usage of lucide-react in sections):
```typescript
import { ClipboardList, Ruler, HardHat, CheckCircle2 } from "lucide-react";
```

**Eyebrow function** (copy from `Values.tsx` lines 62–68 — light surface variant):
```tsx
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-ink/60 text-xs font-semibold tracking-[0.38em] uppercase">
      <span aria-hidden="true" className="bg-ink/40 mr-3 inline-block h-px w-8 align-middle" />
      {children}
    </p>
  );
}
```

**Props shape:**
```typescript
type Step = {
  readonly n: string;           // "01" | "02" | "03" | "04"
  readonly title: string;
  readonly description: string;
};

type HowWeWorkProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  steps: readonly Step[];
};
```

---

### `content/services.ts` (content module)

**Analog:** `content/homepage.ts`

**Rationale:** Identical structure — pure TypeScript, no imports, no JSX, no React. All types exported, all data exported as `as const`. Sections map 1-to-1 to the components that consume them.

**File header + module shape pattern** (`content/homepage.ts` lines 1–6 + 51–109):
```typescript
// content/services.ts
// Tutto il copy e i dati della pagina /servizi.
// Importato da app/servizi/page.tsx e passato come props alle sezioni.
// Nessun import esterno — puro TypeScript, no JSX, no React.

export type SoaBadge = {
  readonly code: string;        // "OG1" | "OG2" | "OG3"
  readonly name: string;        // "Edifici civili e industriali"
  readonly description: string; // 1-2 lines plain Italian
};

export type ServicesTarget = {
  readonly id: string;           // anchor id: "privati" | "pubblico" | "professionisti"
  readonly n: string;            // "01" | "02" | "03"
  readonly kicker: string;       // eyebrow label (matches homepage kicker for cross-page consistency)
  readonly title: string;
  readonly body: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly tags: readonly string[];
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly soaBadges?: readonly SoaBadge[]; // only for "pubblico"
};

export type ProcessStep = {
  readonly n: string;
  readonly title: string;
  readonly description: string;
};

export type ServicesContent = {
  readonly hero: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly subtitle: string;
  };
  readonly targetIndex: {
    readonly targets: readonly ServicesTarget[];
  };
  readonly howWeWork: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly steps: readonly ProcessStep[];
  };
  readonly finalCta: {
    readonly eyebrow: string;
    readonly headline: string;
    readonly body: string;
    readonly primaryCta: { readonly label: string; readonly href: string };
    readonly secondaryCta: { readonly label: string; readonly href: string };
  };
};

export const servicesContent: ServicesContent = { ... } as const;
```

**`as const` export pattern** (`content/homepage.ts` line 297):
```typescript
export const servicesContent: ServicesContent = {
  // ...
} as const;
```

**Kicker strings must match** `homepageContent.services.items` values (`content/homepage.ts` lines 159, 175, 187):
```typescript
// Canonical kicker strings — match these exactly:
kicker: "Privati"                  // item[0]
kicker: "Settore Pubblico"         // item[1]
kicker: "Aziende & Professionisti" // item[2]
```

---

### `app/servizi/page.tsx` (route, RSC page)

**Analog:** `app/page.tsx`

**Rationale:** Exact same orchestrator pattern — import buildMetadata, import content module, import section components, spread props. Zero business logic in the page file itself.

**Full orchestrator pattern** (`app/page.tsx` lines 1–33):
```typescript
// app/servizi/page.tsx
// Pagina Servizi — orchestratore RSC. Importa sezioni e passa dati dal content module.
// Nessun hardcoding: tutto il copy viene da content/services.ts.
import { buildMetadata } from "@/lib/seo/metadata";
import { servicesContent } from "@/content/services";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { TargetIndex } from "@/components/sections/TargetIndex";
import { ServicesEditorialRow } from "@/components/sections/ServicesEditorialRow";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { HomepageCta } from "@/components/sections/HomepageCta";

export const metadata = buildMetadata({
  title: "Servizi",
  description: "...",   // planner fills from content module
  alternates: { canonical: "/servizi" },
});

export default function ServiziPage() {
  return (
    <>
      <ServicesHero {...servicesContent.hero} />
      <TargetIndex targets={servicesContent.targetIndex.targets} />
      {servicesContent.targetIndex.targets.map((target, i) => (
        <ServicesEditorialRow
          key={target.id}
          id={target.id}
          item={target}
          variant={i % 2 === 0 ? "panna" : "white"}
          reverse={i % 2 === 1}
          soaBadges={target.soaBadges}
        />
      ))}
      <HowWeWork {...servicesContent.howWeWork} />
      <HomepageCta {...servicesContent.finalCta} />
    </>
  );
}
```

**buildMetadata signature** (`lib/seo/metadata.ts` lines 55–73):
```typescript
// Called with Metadata overrides — title uses template "%s — Costruzioni Edilferro"
export const metadata = buildMetadata({
  title: "Servizi",
  description: "Soluzioni edilizie per privati, enti pubblici e aziende. Attestazione SOA OG1-OG2-OG3. Porto Viro, Rovigo, Veneto.",
  alternates: { canonical: "/servizi" },
});
```

---

## Shared Patterns

### Eyebrow (light surface)
**Source:** `components/sections/Values.tsx` lines 62–68 and `components/sections/FeaturedProjects.tsx` lines 144–151
**Apply to:** `ServicesHero`, `HowWeWork`, `TargetIndex` section header (if added)
```tsx
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-ink/60 text-xs font-semibold tracking-[0.38em] uppercase">
      <span aria-hidden="true" className="bg-ink/40 mr-3 inline-block h-px w-8 align-middle" />
      {children}
    </p>
  );
}
```

### Eyebrow (dark surface — brand bg)
**Source:** `components/sections/HomepageCta.tsx` lines 123–130 and `components/sections/ServiceOverview.tsx` lines 141–148
**Apply to:** `HomepageCta` (reused as-is — do not modify)
```tsx
function DarkEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-panna/55 text-xs font-semibold tracking-[0.38em] uppercase">
      <span aria-hidden="true" className="bg-panna/40 mr-3 inline-block h-px w-8 align-middle" />
      {children}
    </p>
  );
}
```

### H2 serif heading with accent word
**Source:** `components/sections/Values.tsx` lines 28–32 (light surface, `text-brand` accent) and `components/sections/ServiceOverview.tsx` lines 37–40 (dark surface, `text-panna/65` accent)
**Apply to:** All Phase 3 section H2s that accept `titleStart / titleAccent / titleEnd`
```tsx
// Light surface version (panna / white bg):
<h2 className="text-ink mt-5 max-w-[18ch] font-serif text-[clamp(2rem,1rem+2.6vw,3.4rem)] leading-[1.12] font-medium tracking-tight">
  {titleStart}
  <em className="text-brand font-serif italic">{titleAccent}</em>
  {titleEnd}
</h2>
```

### Section container
**Source:** Every existing section in `components/sections/`
**Apply to:** All Phase 3 sections
```tsx
<div className="mx-auto max-w-6xl px-6 md:px-12">
```

### Arrow CTA link with animated translate
**Source:** `components/sections/ServiceOverview.tsx` lines 98–109
**Apply to:** `TargetIndex` card CTA, `ServicesEditorialRow` inline CTA
```tsx
<Link
  href={href as Route<string>}
  className="... group/cta mt-9 inline-flex items-center gap-2.5 border-b pb-1.5 font-[family-name:var(--font-neue-montreal)] text-xs tracking-[0.08em] uppercase transition-colors"
>
  {label}
  <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1.5">
    →
  </span>
</Link>
```

### next/image with fill + sizes
**Source:** `components/sections/ServiceOverview.tsx` lines 119–125
**Apply to:** `ServicesEditorialRow` photo column
```tsx
<Image
  src={item.imageSrc}
  alt={item.imageAlt}
  fill
  sizes="(min-width: 768px) 50vw, 100vw"
  className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.04]"
/>
```
Note: Do NOT add `priority` — editorial row images are below the fold per UI-SPEC Asset Contract.

### Serif italic numbered marker
**Source:** `components/sections/Values.tsx` lines 44–46 and `components/sections/ServiceOverview.tsx` lines 78–80
**Apply to:** `TargetIndex` card eyebrow, `ServicesEditorialRow` kicker row, `HowWeWork` step number
```tsx
// Light surface variant (text-brand):
<span className="text-brand font-serif text-base font-medium italic">— {n}</span>
// Dark surface variant (text-panna/65 — for reference, not used in Phase 3):
<span className="text-panna/65 font-serif text-sm font-medium italic">— {item.n}</span>
```

### Bullet pill tags
**Source:** `components/sections/ServiceOverview.tsx` lines 88–97
**Apply to:** `ServicesEditorialRow` tag list, `TargetIndex` card mini-list
```tsx
// Light surface version (swap panna tokens → ink tokens):
<li className="text-ink/85 border-ink/20 hover:border-brand/50 rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-300">
  {tag}
</li>
```

---

## No Analog Found

All 6 files have close analogs in the codebase. No file requires falling back to RESEARCH.md patterns only.

| File | Note |
|---|---|
| `components/sections/HowWeWork.tsx` | First use of `lucide-react` inside a `components/sections/` file. Import pattern is standard — `import { ClipboardList } from "lucide-react"`. No codebase analog for the import but the library is already installed (`package.json ^1.8.0`). |
| `content/services.ts` | `SoaBadge` is a new type not present in `content/homepage.ts`. Follows the same `readonly` convention as all other types in that file. |

---

## Metadata

**Analog search scope:** `components/sections/`, `components/ui/`, `content/`, `app/`, `lib/seo/`
**Files scanned:** ServiceOverview.tsx, HomepageCta.tsx, FeaturedProjects.tsx, Values.tsx, homepage.ts, app/page.tsx, app/servizi/page.tsx (stub), lib/seo/metadata.ts
**Pattern extraction date:** 2026-04-19
