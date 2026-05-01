"use client";

import { useState, useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { PROJECTS, ProgettoModal } from "./ProgettoModal";

/* ---- Types ---- */
type CardDef = {
  key: string;
  cat: string;
  wide?: boolean;
  delay?: number;
  label: string;
  year: string;
  place: string;
  img: string;
  imgAlt: string;
};

/* ---- Data ---- */
const CARDS: CardDef[] = [
  {
    key: "residenze-le-corti",
    cat: "residenziale",
    wide: true,
    label: "Residenze Le Corti",
    year: "2024",
    place: "Rovigo",
    img: "/images/design/proj-corti.webp",
    imgAlt: "Residenze Le Corti, Rovigo",
  },
  {
    key: "casa-passiva",
    cat: "residenziale",
    delay: 80,
    label: "Casa passiva privata",
    year: "2024",
    place: "Adria (RO)",
    img: "/images/design/proj-passiva.webp",
    imgAlt: "Casa passiva, Adria",
  },
  {
    key: "abbazia-villaregia",
    cat: "restauro",
    label: "Abbazia di Villaregia",
    year: "2023",
    place: "Porto Viro (RO)",
    img: "/images/design/proj-villaregia.webp",
    imgAlt: "Abbazia di Villaregia",
  },
  {
    key: "stabilimento-produttivo",
    cat: "industriale",
    delay: 80,
    label: "Stabilimento produttivo",
    year: "2023",
    place: "Polesine",
    img: "/images/design/img-industriale.webp",
    imgAlt: "Capannone industriale",
  },
  {
    key: "casa-di-cura",
    cat: "pubblico",
    wide: true,
    delay: 160,
    label: "Ampliamento casa di cura",
    year: "2022",
    place: "Rovigo",
    img: "/images/design/proj-casa-cura.webp",
    imgAlt: "Ampliamento casa di cura, Rovigo",
  },
  {
    key: "restauro-palazzo",
    cat: "restauro",
    label: "Restauro palazzo storico",
    year: "2022",
    place: "Adria (RO)",
    img: "/images/design/img-pubblico.webp",
    imgAlt: "Restauro palazzo storico, Adria",
  },
  {
    key: "efficientamento",
    cat: "efficientamento",
    delay: 80,
    label: "Riqualificazione condominio",
    year: "2024",
    place: "Rovigo",
    img: "/images/cantieri/efficientamento-energetico/01.webp",
    imgAlt: "Riqualificazione condominio",
  },
  {
    key: "villetta-bifamiliare",
    cat: "residenziale",
    delay: 160,
    label: "Villetta bifamiliare",
    year: "2023",
    place: "Porto Viro (RO)",
    img: "/images/cantieri/casa-passiva-porto-viro/03.webp",
    imgAlt: "Villetta bifamiliare",
  },
];

const FILTER_OPTIONS = [
  { value: "all", label: "Tutti" },
  { value: "residenziale", label: "Residenziale" },
  { value: "restauro", label: "Restauro" },
  { value: "pubblico", label: "Opere pubbliche" },
  { value: "industriale", label: "Industriale" },
  { value: "efficientamento", label: "Efficientamento" },
] as const;

/* ---- Main component ---- */
export function ProgettiGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [displayFilter, setDisplayFilter] = useState<string>("all");
  const [activeKey, setActiveKey] = useState<string | null>(null);
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

  const visibleCards = CARDS.filter((c) => displayFilter === "all" || c.cat === displayFilter);
  const count = visibleCards.length;

  return (
    <>
      <style>{`
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
      <section className="bg-surface py-[100px]">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="text-ink/60 flex items-center gap-3 text-xs font-semibold tracking-[0.38em] uppercase">
                <span
                  aria-hidden="true"
                  className="bg-ink/40 inline-block h-px w-8 flex-shrink-0"
                />
                Archivio lavori
              </p>
              <h2
                className="text-ink mt-[18px] font-serif leading-[1.18] font-medium tracking-[-0.015em]"
                style={{ fontSize: "clamp(1.75rem, 0.6rem + 2vw, 2.5rem)", maxWidth: "22ch" }}
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
                className="cursor-pointer rounded-full border px-[18px] py-[9px] font-[family-name:var(--font-neue-montreal)] text-[12px] font-medium tracking-[0.14em] uppercase transition-colors"
                style={{
                  background: activeFilter === opt.value ? "var(--color-brand)" : "transparent",
                  color: activeFilter === opt.value ? "var(--color-panna)" : "rgba(26,26,26,0.7)",
                  borderColor:
                    activeFilter === opt.value ? "var(--color-brand)" : "var(--color-border)",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div ref={outerRef} className="overflow-hidden">
            <div
              ref={innerRef}
              className="grid grid-cols-1 gap-[2px] sm:grid-cols-2 lg:grid-cols-3"
            >
              {CARDS.map((card) => {
                const hidden = displayFilter !== "all" && card.cat !== displayFilter;
                if (hidden) return null;
                return (
                  <div
                    key={card.key}
                    onClick={() => setActiveKey(card.key)}
                    className="group relative cursor-pointer overflow-hidden bg-black"
                    style={
                      card.wide
                        ? {
                            gridColumn: "span 2",
                            minHeight: 540,
                            animation: "cardFadeIn 380ms cubic-bezier(0.16,1,0.3,1) both",
                          }
                        : {
                            aspectRatio: "3/4",
                            animation: "cardFadeIn 380ms cubic-bezier(0.16,1,0.3,1) both",
                          }
                    }
                  >
                    <Image
                      src={card.img}
                      alt={card.imgAlt}
                      fill
                      className="object-cover transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      sizes={
                        card.wide
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
                    <span className="absolute top-[18px] left-[18px] rounded-full border border-white/22 bg-white/15 px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-[8px]">
                      {PROJECTS[card.key]?.tag}
                    </span>
                    <span className="absolute top-[18px] right-[18px] font-serif text-[15px] font-medium text-white/95 italic">
                      {card.year}
                    </span>
                    <div className="absolute right-6 bottom-6 left-6 text-white">
                      <h3
                        className="font-serif leading-[1.2] font-medium tracking-[-0.01em] text-white"
                        style={{
                          fontSize: card.wide
                            ? "clamp(1.5rem, 0.6rem + 1.4vw, 2.125rem)"
                            : "1.25rem",
                        }}
                      >
                        {card.label}
                      </h3>
                      <p className="mt-2 text-[11px] tracking-[0.2em] text-white/70 uppercase">
                        {card.place}
                      </p>
                      <span className="mt-4 inline-block text-[18px] transition-transform duration-[250ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[5px] group-hover:-translate-y-[5px]">
                        ↗
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <ProgettoModal projectKey={activeKey} onClose={() => setActiveKey(null)} />
    </>
  );
}
