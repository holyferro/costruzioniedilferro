"use client";

import { useState, useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { photoBadgeClass } from "@/components/ui/badge";
import { ProgettoModal } from "./ProgettoModal";
import { RealizzazioniEmptyState } from "./RealizzazioniEmptyState";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CATEGORIE } from "@/lib/realizzazioni/model";
import type { Realizzazione } from "@/lib/realizzazioni";

const FILTER_OPTIONS = [{ value: "all", label: "Tutti" }, ...CATEGORIE];
const DELAYS = [0, 80, 160] as const;

/* ---- Main component ---- */
export function ProgettiGrid({ realizzazioni }: { realizzazioni: readonly Realizzazione[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [displayFilter, setDisplayFilter] = useState<string>("all");
  const [active, setActive] = useState<Realizzazione | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = useCallback(
    (filter: string) => {
      if (filter === activeFilter || transitioning) return;
      setActiveFilter(filter);

      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) {
        setDisplayFilter(filter);
        return;
      }

      setTransitioning(true);

      inner.style.transition = "opacity 180ms ease";
      inner.style.opacity = "0";

      setTimeout(() => {
        const currentHeight = outer.offsetHeight;
        outer.style.transition = "none";
        outer.style.height = `${currentHeight}px`;
        flushSync(() => setDisplayFilter(filter));

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const newHeight = outer.scrollHeight;
            outer.style.transition = "height 700ms cubic-bezier(0.16,1,0.3,1)";
            outer.style.height = `${newHeight}px`;
            inner.style.transition = "opacity 300ms ease 120ms";
            inner.style.opacity = "1";
          });
        });

        setTimeout(() => {
          outer.style.height = "";
          outer.style.transition = "";
          inner.style.transition = "";
          setTransitioning(false);
        }, 900);
      }, 190);
    },
    [activeFilter, transitioning],
  );

  const visible = realizzazioni.filter(
    (r) => displayFilter === "all" || r.category === displayFilter,
  );
  const count = visible.length;

  return (
    <>
      <style>{`
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
            <div id="archivio-lavori" className="scroll-mt-20 xl:scroll-mt-28">
              <Eyebrow>Archivio lavori</Eyebrow>
              <h2
                className="text-ink text-h2 mt-[18px] font-serif font-medium tracking-tight"
                style={{ maxWidth: "22ch" }}
              >
                Cantieri recenti per categoria
              </h2>
            </div>
            <span className="font-serif text-[15px] text-black/60 italic">
              {count} {count === 1 ? "progetto" : "progetti"}
            </span>
          </div>

          <div className="mb-12 flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleFilterChange(opt.value)}
                className="tracking-caps cursor-pointer rounded-full border px-[18px] py-[9px] font-[family-name:var(--font-neue-montreal)] text-[12px] font-medium uppercase transition-colors"
                style={{
                  background: activeFilter === opt.value ? "var(--color-brand)" : "transparent",
                  color:
                    activeFilter === opt.value
                      ? "var(--color-panna)"
                      : "color-mix(in oklab, var(--color-ink) 70%, transparent)",
                  borderColor:
                    activeFilter === opt.value ? "var(--color-brand)" : "var(--color-border)",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {realizzazioni.length === 0 ? (
            <RealizzazioniEmptyState />
          ) : (
            <div ref={outerRef} className="overflow-hidden">
              <div
                ref={innerRef}
                className="grid grid-cols-1 gap-[2px] sm:grid-cols-2 lg:grid-cols-3"
              >
                {visible.map((p, i) => {
                  const cover = p.images[0]!;
                  const delay = DELAYS[i % DELAYS.length];
                  return (
                    <div
                      key={p.slug}
                      onClick={() => setActive(p)}
                      className="group relative cursor-pointer overflow-hidden bg-black transition-shadow duration-300 hover:shadow-[0_12px_48px_color-mix(in_oklab,var(--color-brand)_10%,transparent)]"
                      style={
                        p.wide
                          ? {
                              gridColumn: "span 2",
                              aspectRatio: "3/2",
                              animation: "cardFadeIn 380ms cubic-bezier(0.16,1,0.3,1) both",
                              animationDelay: `${delay}ms`,
                            }
                          : {
                              aspectRatio: "3/4",
                              animation: "cardFadeIn 380ms cubic-bezier(0.16,1,0.3,1) both",
                              animationDelay: `${delay}ms`,
                            }
                      }
                    >
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        className="object-cover transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                        sizes={
                          p.wide
                            ? "(max-width: 768px) 100vw, 66vw"
                            : "(max-width: 768px) 100vw, 33vw"
                        }
                        style={{ filter: "saturate(0.95) contrast(1.02)" }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.72))",
                        }}
                      />
                      <span className={photoBadgeClass("absolute top-[18px] left-[18px]")}>
                        {p.categoryLabel}
                      </span>
                      <span className="absolute top-[18px] right-[18px] font-serif text-[15px] font-medium text-white/95 italic">
                        {p.year}
                      </span>
                      <div className="absolute right-6 bottom-6 left-6 text-white">
                        <h3
                          className="font-serif leading-[1.2] font-medium tracking-[-0.01em] text-white"
                          style={{
                            fontSize: p.wide
                              ? "clamp(1.5rem, 0.6rem + 1.4vw, 2.125rem)"
                              : "1.25rem",
                          }}
                        >
                          {p.title}
                        </h3>
                        <p className="tracking-caps mt-2 text-[11px] text-white/70 uppercase">
                          {p.place}
                        </p>
                        <span
                          aria-hidden="true"
                          className="mt-4 inline-block text-[18px] transition-transform duration-[250ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[5px] group-hover:-translate-y-[5px]"
                        >
                          <ArrowUpRight aria-hidden className="size-[18px]" strokeWidth={1.5} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <ProgettoModal realizzazione={active} onClose={() => setActive(null)} />
    </>
  );
}
