// components/sections/ServiceAreaSection.tsx
// RSC. Su bg-ink: testo+lista zone a sinistra, mappa schematica SVG a destra.
// Mappa stilizzata (NON geografica reale, NON Google Maps): griglia di puntini +
// markers etichettati per le zone operative. Niente iframe, niente link a Google.

import type { Zone } from "@/content/homepage";

type ServiceAreaSectionProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  body: string;
  zones: readonly Zone[];
};

export function ServiceAreaSection({
  eyebrow,
  titleStart,
  titleAccent,
  body,
  zones,
}: ServiceAreaSectionProps) {
  return (
    <section className="bg-ink text-panna relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <div>
            <DarkEyebrow>{eyebrow}</DarkEyebrow>
            <h2 className="text-panna mt-5 max-w-[16ch] font-serif text-[clamp(2rem,1rem+2.6vw,3.4rem)] leading-[1.12] font-medium tracking-tight">
              {titleStart}
              <em className="text-panna/65 font-serif italic">{titleAccent}</em>
            </h2>
            <p className="text-panna/70 mt-6 max-w-[48ch] text-base leading-[1.65]">{body}</p>

            <div className="mt-10 grid grid-cols-[auto_1fr_auto] gap-x-6">
              {zones.map((z, i) => (
                <ZoneRow key={z.name} zone={z} last={i === zones.length - 1} />
              ))}
            </div>
          </div>

          <TerritoryMap zones={zones} />
        </div>
      </div>
    </section>
  );
}

function ZoneRow({ zone, last }: { zone: Zone; last: boolean }) {
  const cellBorder = `border-panna/12 border-t py-4 md:py-[18px] ${last ? "border-b" : ""}`;
  return (
    <>
      <div className={`${cellBorder} flex items-center gap-3.5`}>
        <span
          aria-hidden="true"
          className={`inline-block h-2 w-2 rounded-full ${
            zone.primary ? "bg-panna/85" : "border-panna/35 border bg-transparent"
          }`}
        />
        <span className="text-panna font-serif text-lg font-medium md:text-[22px]">
          {zone.name}
        </span>
      </div>
      <div className={`${cellBorder} flex items-center`}>
        <span className="text-panna/60 text-[11px] tracking-[0.12em] uppercase">{zone.role}</span>
      </div>
      <div className={`${cellBorder} flex items-center`}>
        <span className="text-panna/55 font-serif text-sm italic">{zone.km}</span>
      </div>
    </>
  );
}

function TerritoryMap({ zones }: { zones: readonly Zone[] }) {
  // Coordinate hand-placed su viewBox 500×500. Non geografiche — schematiche,
  // disposte per evocare Polesine dentro al Veneto.
  const pts: Record<string, { x: number; y: number; label: "left" | "right" }> = {
    "Porto Viro": { x: 278, y: 340, label: "right" },
    Rovigo: { x: 218, y: 320, label: "left" },
    Adria: { x: 256, y: 322, label: "right" },
    Chioggia: { x: 298, y: 286, label: "right" },
    Padova: { x: 235, y: 246, label: "left" },
    Ferrara: { x: 215, y: 382, label: "left" },
    Venezia: { x: 310, y: 234, label: "right" },
  };

  // Griglia "Veneto-ish" — poligono irregolare a forma di regione.
  const dots: Array<{ x: number; y: number }> = [];
  for (let x = 30; x < 480; x += 18) {
    for (let y = 30; y < 480; y += 18) {
      const inLand =
        y > 130 &&
        y < 430 &&
        x > 90 + (y - 250) * 0.1 &&
        x < 420 - Math.max(0, (y - 350) * 0.4) &&
        !(x > 340 && y > 350) &&
        !(x < 140 && y > 360);
      if (inLand) dots.push({ x, y });
    }
  }

  const portoViro = pts["Porto Viro"]!;

  return (
    <div className="relative aspect-square w-full">
      <svg viewBox="0 0 500 500" className="block h-full w-full" aria-hidden="true">
        <rect
          x="0.5"
          y="0.5"
          width="499"
          height="499"
          fill="none"
          stroke="rgba(248,245,238,0.08)"
        />

        <g transform="translate(440, 40)" opacity="0.55">
          <circle r="18" fill="none" stroke="rgba(248,245,238,0.25)" />
          <path d="M0,-14 L4,0 L0,14 L-4,0 Z" fill="rgba(248,245,238,0.5)" />
          <text
            y="-24"
            textAnchor="middle"
            fontSize="9"
            fill="rgba(248,245,238,0.6)"
            letterSpacing="0.2em"
          >
            N
          </text>
        </g>

        <text
          x="430"
          y="400"
          textAnchor="end"
          fontSize="10"
          fill="rgba(248,245,238,0.28)"
          fontStyle="italic"
          letterSpacing="0.2em"
        >
          Mar Adriatico
        </text>

        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="1" fill="rgba(248,245,238,0.18)" />
        ))}

        <g opacity="0.6">
          <circle
            cx={portoViro.x}
            cy={portoViro.y}
            r="40"
            fill="none"
            stroke="rgba(248,245,238,0.3)"
            strokeDasharray="2 4"
          />
          <circle
            cx={portoViro.x}
            cy={portoViro.y}
            r="90"
            fill="none"
            stroke="rgba(248,245,238,0.18)"
            strokeDasharray="2 4"
          />
          <circle
            cx={portoViro.x}
            cy={portoViro.y}
            r="140"
            fill="none"
            stroke="rgba(248,245,238,0.1)"
            strokeDasharray="2 4"
          />
        </g>

        {zones.map((z) => {
          const p = pts[z.name];
          if (!p) return null;
          const fill = z.primary ? "rgba(248,245,238,0.85)" : "transparent";
          const stroke = z.primary ? "transparent" : "rgba(248,245,238,0.55)";
          return (
            <g key={z.name}>
              {z.primary && <circle cx={p.x} cy={p.y} r="10" fill="rgba(248,245,238,0.18)" />}
              <circle
                cx={p.x}
                cy={p.y}
                r={z.primary ? 4.5 : 3}
                fill={fill}
                stroke={stroke}
                strokeWidth={z.primary ? 0 : 1.5}
              />
              <text
                x={p.x + (p.label === "right" ? 12 : -12)}
                y={p.y + 4}
                textAnchor={p.label === "right" ? "start" : "end"}
                fontSize={z.primary ? 13 : 11}
                fontWeight={z.primary ? 500 : 400}
                fontStyle={z.primary ? "normal" : "italic"}
                fill={z.primary ? "#fff" : "rgba(248,245,238,0.7)"}
                letterSpacing="-0.005em"
              >
                {z.name}
              </text>
            </g>
          );
        })}

        <g transform={`translate(${portoViro.x + 14}, ${portoViro.y + 20})`}>
          <text fontSize="9" fill="rgba(248,245,238,0.9)" fontWeight="600" letterSpacing="0.22em">
            SEDE
          </text>
        </g>

        <g transform="translate(40, 460)" opacity="0.55">
          <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(248,245,238,0.4)" strokeWidth="1" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(248,245,238,0.4)" />
          <line x1="60" y1="-3" x2="60" y2="3" stroke="rgba(248,245,238,0.4)" />
          <text
            x="30"
            y="16"
            textAnchor="middle"
            fontSize="9"
            fill="rgba(248,245,238,0.55)"
            letterSpacing="0.16em"
          >
            50 KM
          </text>
        </g>
      </svg>
    </div>
  );
}

function DarkEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-panna/55 text-xs font-semibold tracking-[0.38em] uppercase">
      <span aria-hidden="true" className="bg-panna/40 mr-3 inline-block h-px w-8 align-middle" />
      {children}
    </p>
  );
}
