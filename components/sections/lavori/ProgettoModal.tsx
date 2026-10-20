"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { photoBadgeClass } from "@/components/ui/badge";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CloseButton, iconButtonClass } from "@/components/ui/CloseButton";
import { buttonClass } from "@/components/ui/button";
import type { Realizzazione } from "@/lib/realizzazioni";

/* ---- Carousel hook ---- */
function useCarousel(count: number, active: boolean) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => setIdx(((i % count) + count) % count), [count]);
  const prev = useCallback(() => goTo(idx - 1), [idx, goTo]);
  const next = useCallback(() => goTo(idx + 1), [idx, goTo]);

  useEffect(() => {
    if (!active || count < 2 || paused) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % count);
    }, 5000);
    return () => clearInterval(id);
  }, [active, count, paused, idx]);

  return { idx, goTo, prev, next, setPaused, paused };
}

/* ---- Modal ---- */
export function ProgettoModal({
  realizzazione: project,
  onClose,
}: {
  realizzazione: Realizzazione | null;
  onClose: () => void;
}) {
  const images = project?.images ?? [];
  const { idx, goTo, prev, next, setPaused, paused } = useCarousel(images.length, !!project);

  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [project, onClose, prev, next]);

  useEffect(() => {
    if (!project) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [project]);

  // Reset carousel and paused state whenever a different project is opened
  useEffect(() => {
    goTo(0);
    setPaused(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.slug]);

  const isOpen = !!project;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-10"
      style={{
        background: isOpen
          ? "color-mix(in oklab, var(--color-night) 87%, transparent)"
          : "transparent",
        pointerEvents: isOpen ? "all" : "none",
        transition: "background 380ms ease",
        touchAction: isOpen ? "none" : "auto",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Scheda progetto"
    >
      <div
        className="bg-panna grid max-h-[90svh] w-full grid-cols-1 overflow-x-hidden overflow-y-auto md:h-[78vh] md:max-h-[78vh] md:grid-cols-[1.2fr_1fr] md:overflow-hidden"
        style={{
          maxWidth: 1200,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.93) translateY(24px)",
          transition:
            "opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Left — carousel */}
        <div
          className="relative flex h-[68vw] flex-col overflow-hidden bg-black md:h-auto md:min-h-0"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="pointer-events-none absolute inset-0 z-[4]"
            style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55))" }}
          />

          {project && (
            <span className={photoBadgeClass("absolute top-[22px] left-[22px] z-[6]")}>
              {project.categoryLabel}
            </span>
          )}

          {project && (
            <span className="absolute bottom-[82px] left-6 z-[6] font-serif text-[15px] text-white/85 italic">
              {project.year}
            </span>
          )}

          <CloseButton
            variant="glass"
            onClick={onClose}
            className="absolute top-[18px] right-[18px] z-10"
          />

          <div className="relative min-h-0 flex-1 overflow-hidden bg-black">
            {images.map(({ src, alt }, i) => (
              <div
                key={src}
                className="absolute inset-0"
                style={{
                  opacity: i === idx ? 1 : 0,
                  transform: i === idx ? "scale(1)" : "scale(1.04)",
                  transition:
                    "opacity 420ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)",
                  pointerEvents: i === idx ? "auto" : "none",
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  quality={100}
                  loading="eager"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            ))}

            <button
              onClick={prev}
              aria-label="Foto precedente"
              className={iconButtonClass(
                "glass",
                "absolute top-1/2 left-3.5 z-[5] -translate-y-1/2",
              )}
            >
              <ChevronLeft aria-hidden className="size-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              aria-label="Foto successiva"
              className={iconButtonClass(
                "glass",
                "absolute top-1/2 right-3.5 z-[5] -translate-y-1/2",
              )}
            >
              <ChevronRight aria-hidden className="size-5" strokeWidth={1.5} />
            </button>

            <style>{`
              @keyframes dotProgress {
                from { transform: scaleX(0); }
                to   { transform: scaleX(1); }
              }
            `}</style>
            <div className="absolute bottom-[80px] left-1/2 z-[5] flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Foto ${i + 1}`}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    width: i === idx ? 20 : 6,
                    height: 6,
                    borderRadius: 9999,
                    background: i === idx ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.4)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  {i === idx && images.length >= 2 && (
                    <span
                      key={idx}
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "#fff",
                        borderRadius: 9999,
                        transformOrigin: "left center",
                        animation: "dotProgress 5000ms linear forwards",
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex h-[72px] w-full flex-shrink-0 gap-[3px] bg-black">
            {images.map(({ src }, i) => (
              <button
                key={src}
                onClick={() => goTo(i)}
                className="relative min-w-0 flex-1 overflow-hidden border-2 transition-opacity"
                style={{
                  opacity: i === idx ? 1 : 0.5,
                  borderColor: i === idx ? "var(--color-brand)" : "transparent",
                }}
                aria-label={`Vai a foto ${i + 1}`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="120px" />
              </button>
            ))}
          </div>
        </div>

        {/* Right — content */}
        {project && (
          <div className="bg-panna flex flex-col overflow-y-auto px-5 py-8 pb-10 md:min-h-0 md:px-[52px] md:py-[52px] md:pb-12">
            <p className="text-brand tracking-caps-wide mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase">
              <span aria-hidden="true" className="bg-brand inline-block h-px w-6" />
              {project.categoryLabel}
            </p>
            <h2
              className="text-ink mb-3 font-serif leading-[1.15] font-medium tracking-[-0.015em]"
              style={{ fontSize: "clamp(1.625rem, 0.8rem + 1.8vw, 2.375rem)" }}
            >
              {project.title}
            </h2>
            <p className="text-ink/65 tracking-caps mb-8 text-xs uppercase">{project.place}</p>
            <p className="text-ink/70 mb-9 text-[15px] leading-[1.7]" style={{ maxWidth: "46ch" }}>
              {project.description}
            </p>

            <div>
              {project.rows.map(({ label, value }, i) => (
                <div
                  key={i}
                  className="border-border flex items-baseline justify-between border-t py-3"
                  style={
                    i === project.rows.length - 1
                      ? { borderBottom: "1px solid var(--color-border)" }
                      : {}
                  }
                >
                  <span className="text-ink/65 tracking-caps text-[11px] font-semibold uppercase">
                    {label}
                  </span>
                  <span className="text-ink text-right font-serif text-base">{value}</span>
                </div>
              ))}
            </div>

            <a href="/contatti#form" className={buttonClass({ className: "mt-9 self-start" })}>
              Richiedi un sopralluogo →
            </a>

            {project.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-ink/65 hover:text-ink font-[family-name:var(--font-neue-montreal)] text-[12px] tracking-[0.08em] underline underline-offset-4 transition-colors"
                  >
                    {link.label}
                    {link.external && (
                      <ArrowUpRight
                        aria-hidden
                        className="ml-1 inline size-3.5"
                        strokeWidth={1.5}
                      />
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
