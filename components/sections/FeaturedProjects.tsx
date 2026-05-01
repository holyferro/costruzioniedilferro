"use client";

// components/sections/FeaturedProjects.tsx
// Client component: le card aprono il ProgettoModal identico all'archivio lavori.

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { FeaturedProject, ProjectTile } from "@/content/homepage";
import { ProgettoModal } from "@/components/sections/lavori/ProgettoModal";

type FeaturedProjectsProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  archiveLinkLabel: string;
  archiveLinkHref: string;
  feature: FeaturedProject;
  tiles: readonly ProjectTile[];
};

export function FeaturedProjects({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  archiveLinkLabel,
  archiveLinkHref,
  feature,
  tiles,
}: FeaturedProjectsProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <>
      <section className="bg-surface text-ink py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-8 md:mb-16">
            <div className="max-w-[34ch]">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="text-ink mt-5 max-w-[22ch] font-serif text-[clamp(2rem,1rem+2.4vw,3.1rem)] leading-[1.12] font-medium tracking-tight">
                {titleStart}
                <em className="text-brand font-serif italic">{titleAccent}</em>
                {titleEnd}
              </h2>
            </div>
            <Link
              href={archiveLinkHref as Route<string>}
              className="text-brand border-brand inline-flex items-center gap-2 border-b pb-1.5 font-[family-name:var(--font-neue-montreal)] text-xs tracking-[0.08em] uppercase"
            >
              {archiveLinkLabel} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
            <FeatureCard item={feature} onOpen={() => setActiveKey(feature.projectKey ?? null)} />
            <div className="grid gap-6 md:grid-rows-3">
              {tiles.map((t) => (
                <MiniProject
                  key={t.title}
                  item={t}
                  onOpen={() => setActiveKey(t.projectKey ?? null)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProgettoModal projectKey={activeKey} onClose={() => setActiveKey(null)} />
    </>
  );
}

function FeatureCard({ item, onOpen }: { item: FeaturedProject; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="group/feature relative block aspect-[4/5] cursor-pointer overflow-hidden bg-black text-white"
      role="button"
      tabIndex={0}
      aria-label={item.title}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
    >
      <Image
        src={item.imageSrc}
        alt={item.imageAlt}
        fill
        sizes="(min-width: 768px) 60vw, 100vw"
        className="object-cover transition-transform duration-[1000ms] ease-out group-hover/feature:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75"
      />
      <span className="border-panna/25 bg-panna/15 absolute top-5 left-5 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-md">
        {item.tag}
      </span>
      <span className="absolute top-5 right-5 font-serif text-base font-medium text-white/95 italic">
        {item.year}
      </span>
      <div className="absolute right-7 bottom-8 left-7">
        <h3 className="font-serif text-[clamp(1.6rem,0.6rem+1.6vw,2.25rem)] leading-[1.15] font-medium tracking-tight text-white">
          {item.title}
        </h3>
        <p className="mt-2.5 text-[13px] tracking-[0.18em] text-white/70 uppercase">{item.place}</p>
        <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-white/85">
          {item.description}
        </p>
        <span className="mt-6 inline-flex items-center gap-2.5 font-[family-name:var(--font-neue-montreal)] text-xs tracking-[0.1em] text-white uppercase">
          Scheda progetto
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover/feature:translate-x-1.5 group-hover/feature:-translate-y-1.5"
          >
            ↗
          </span>
        </span>
      </div>
    </div>
  );
}

function MiniProject({ item, onOpen }: { item: ProjectTile; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="group/mini relative block min-h-[220px] cursor-pointer overflow-hidden bg-black text-white"
      role="button"
      tabIndex={0}
      aria-label={item.title}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
    >
      <Image
        src={item.imageSrc}
        alt={item.imageAlt}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover/mini:scale-[1.05]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/70"
      />
      <div className="absolute top-4 right-4 left-4 flex items-start justify-between">
        <span className="border-panna/22 bg-panna/15 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-md">
          {item.tag}
        </span>
        <span className="font-serif text-sm text-white/95 italic">{item.year}</span>
      </div>
      <div className="absolute right-5 bottom-4 left-5">
        <h3 className="font-serif text-xl leading-snug font-medium tracking-tight text-white">
          {item.title}
        </h3>
        <p className="mt-1.5 text-[11px] tracking-[0.2em] text-white/70 uppercase">{item.place}</p>
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-ink/60 text-xs font-semibold tracking-[0.38em] uppercase">
      <span aria-hidden="true" className="bg-ink/40 mr-3 inline-block h-px w-8 align-middle" />
      {children}
    </p>
  );
}
