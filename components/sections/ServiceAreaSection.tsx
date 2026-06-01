// components/sections/ServiceAreaSection.tsx
// RSC. Su bg-ink.
// Layout per breakpoint:
//   mobile  (0–767px)  : stack verticale — intro, mappa, zone list 1-col
//   desktop (1024px+)  : riga 1 → intro | mappa (50/50); riga 2 → zone list 2-col full-width

import { MapPin } from "lucide-react";
import type { Zone } from "@/content/homepage";

const MAPS_STATIC_URL = `https://maps.googleapis.com/maps/api/staticmap?center=44.90,12.05&zoom=9&size=800x450&scale=2&markers=color:red%7C44.9167,12.1167&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_STATIC_KEY}`;
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
        {/* Riga 1: intro | mappa — 50/50 su desktop, stack su mobile */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-14">
          {/* ① Intro */}
          <div>
            <DarkEyebrow>{eyebrow}</DarkEyebrow>
            <h2 className="text-panna mt-5 max-w-[16ch] font-serif text-[clamp(2rem,1rem+2.6vw,3.4rem)] leading-[1.12] font-medium tracking-tight">
              {titleStart}
              <em className="text-panna/65 font-serif italic">{titleAccent}</em>
            </h2>
            <p className="text-panna/70 mt-4 max-w-[48ch] text-base leading-[1.65]">{body}</p>
          </div>

          {/* ② Mappa */}
          <div className="flex flex-col">
            <div className="border-panna/15 overflow-hidden rounded-sm border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MAPS_STATIC_URL}
                alt="Area di copertura Costruzioni Edilferro — Veneto"
                width={800}
                height={450}
                className="block h-auto w-full"
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
        </div>

        {/* Riga 2: lista province — 2 colonne full-width */}
        <div className="mt-10 lg:mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
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
    </section>
  );
}

type ZoneRowProps = {
  zone: Zone;
  isLast: boolean;
  isSecondToLast: boolean;
};

function ZoneRow({ zone, isLast, isSecondToLast }: ZoneRowProps) {
  const borderBottom = isLast ? "border-b" : isSecondToLast ? "md:border-b" : "";

  return (
    <div
      className={`border-panna/12 flex items-center justify-between gap-4 border-t py-3 lg:py-[13px] ${borderBottom}`}
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
