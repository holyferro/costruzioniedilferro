"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/services";

export function ServicesFaqItems({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <dl className="m-0 list-none p-0">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            className={`border-border border-t ${i === items.length - 1 ? "border-b" : ""}`}
          >
            <dt>
              <button
                type="button"
                onClick={() => toggle(i)}
                className={`focus-visible:outline-brand flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 md:py-7 ${
                  isOpen ? "text-brand" : "text-ink hover:text-brand"
                }`}
              >
                <span className="font-serif text-[clamp(1rem,0.6rem+0.8vw,1.25rem)] leading-snug font-medium">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-[600ms] ${
                    isOpen ? "bg-ink/[0.07] text-ink" : "text-ink"
                  }`}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <line
                      x1="2"
                      y1="7.5"
                      x2="13"
                      y2="7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="7.5"
                      y1="2"
                      x2="7.5"
                      y2="13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      style={{
                        transformOrigin: "7.5px 7.5px",
                        transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                        transition: "transform 1000ms ease-in-out",
                      }}
                    />
                  </svg>
                </span>
              </button>
            </dt>
            <dd
              className={`m-0 grid transition-[grid-template-rows] duration-[600ms] ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-ink/75 pb-6 text-base leading-[1.7] md:max-w-[62ch] md:pb-8">
                  {item.a}
                </p>
              </div>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
