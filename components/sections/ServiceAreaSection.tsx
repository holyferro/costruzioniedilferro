// components/sections/ServiceAreaSection.tsx
// RSC. Su bg-ink: testo+lista zone a sinistra, mappa Google Maps a destra.
// Layout per breakpoint:
//   mobile  (0–767px)  : stack verticale — intro, mappa, zone list 1-col
//   tablet  (768–1023px): stack verticale — intro, mappa centrata max-620px, zone list 2-col
//   desktop (1024px+)  : 2 colonne — [intro / zone-list] | [mappa row-span-2]

import { MapPin } from "lucide-react";
import type { Zone } from "@/content/homepage";

const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=45.0225155,12.2300243&output=embed&hl=it&z=17";
const MAPS_LINK_URL = "https://maps.app.goo.gl/KxQ6vAzyqzhsbh1c7";

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
    <section className="bg-ink text-panna relative overflow-x-clip py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/*
          Outer grid:
          - mobile/tablet: single column (items stack: intro → map → zones)
          - desktop lg+: 2 col, map spans both rows on the right
        */}
        <div className="grid gap-10 md:gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-x-16 lg:gap-y-10">
          {/* ① Intro — first on all sizes; left col row 1 on desktop */}
          <div>
            <DarkEyebrow>{eyebrow}</DarkEyebrow>
            <h2 className="text-panna mt-5 max-w-[16ch] font-serif text-[clamp(2rem,1rem+2.6vw,3.4rem)] leading-[1.12] font-medium tracking-tight">
              {titleStart}
              <em className="text-panna/65 font-serif italic">{titleAccent}</em>
            </h2>
            <p className="text-panna/70 mt-6 max-w-[48ch] text-base leading-[1.65]">{body}</p>
          </div>

          {/* ② Map — middle on tablet (centered, max-w-620px); right col rows 1-2 on desktop */}
          <div className="mx-auto flex w-full max-w-[620px] flex-col lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none">
            <div className="border-panna/15 flex-1 overflow-hidden rounded-sm border">
              <iframe
                src={MAPS_EMBED_URL}
                title="Sede Costruzioni Edilferro — Via dei Salici 7/9, Porto Viro (RO)"
                width="100%"
                height="100%"
                style={{ minHeight: "420px", border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={MAPS_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-panna/25 hover:bg-panna hover:text-ink text-panna mt-4 inline-flex items-center gap-2 self-start rounded-full border px-5 py-3 text-sm font-medium tracking-wide transition-colors"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Apri in Google Maps
            </a>
          </div>

          {/* ③ Zone list — bottom on tablet (2-col grid); left col row 2 on desktop */}
          <div className="lg:col-start-1 lg:row-start-2">
            <div className="grid md:grid-cols-2 md:gap-x-6 lg:block">
              {zones.map((z, i) => {
                const isLast = i === zones.length - 1;
                const isSecondToLast = i === zones.length - 2;
                return (
                  <ZoneRow key={z.name} zone={z} isLast={isLast} isSecondToLast={isSecondToLast} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type ZoneRowProps = {
  zone: Zone;
  isLast: boolean;
  isSecondToLast: boolean;
};

function ZoneRow({ zone, isLast, isSecondToLast }: ZoneRowProps) {
  const borderBottom = isLast ? "border-b" : isSecondToLast ? "md:border-b lg:border-b-0" : "";

  return (
    <div
      className={`border-panna/12 flex items-center justify-between gap-4 border-t py-4 lg:py-[18px] ${borderBottom}`}
    >
      {/* Left: dot + city name */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`inline-block h-2 w-2 shrink-0 rounded-full ${
            zone.primary ? "bg-panna/85" : "border-panna/35 border bg-transparent"
          }`}
        />
        <span className="text-panna font-serif text-base font-medium md:text-lg lg:text-[22px]">
          {zone.name}
        </span>
      </div>

      {/* Right: role + km */}
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <span className="text-panna/60 text-[10px] tracking-[0.12em] uppercase">{zone.role}</span>
        <span className="text-panna/55 font-serif text-sm italic">{zone.km}</span>
      </div>
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
