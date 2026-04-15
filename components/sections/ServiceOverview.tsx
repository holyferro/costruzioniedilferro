// components/sections/ServiceOverview.tsx
// RSC. Icone Lucide importate dinamicamente tramite iconName string dal content module.
import type { Route } from "next";
import Link from "next/link";
import { Building2, Factory, Landmark, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

// Mappa string → componente icona. Mantiene il content module TS puro (nessun import React).
const iconMap: Record<string, LucideIcon> = {
  Building2,
  Factory,
  Landmark,
};

type ServiceCard = {
  title: string;
  description: string;
  href: string;
  iconName: string;
};

type ServiceOverviewProps = {
  sectionTitle: string;
  sectionSubtitle: string;
  cards: readonly ServiceCard[];
};

export function ServiceOverview({ sectionTitle, sectionSubtitle, cards }: ServiceOverviewProps) {
  return (
    <section className="bg-panna py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-serif text-h2 text-ink">{sectionTitle}</h2>
          <p className="mt-4 text-lg text-ink/70">{sectionSubtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = iconMap[card.iconName] ?? Building2;
            return (
              <Link
                key={card.title}
                href={card.href as Route<string>}
                className={cn(
                  "group flex flex-col gap-4 rounded-xl border border-border bg-surface p-8",
                  "transition-colors hover:border-ink/30",
                )}
              >
                <Icon className="h-7 w-7 text-brand" aria-hidden="true" strokeWidth={1.5} />
                <h3 className="text-lg font-medium text-ink">{card.title}</h3>
                <p className="text-sm leading-relaxed text-ink/70">{card.description}</p>
                <span className="mt-auto text-sm font-medium text-brand">Scopri di più →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
