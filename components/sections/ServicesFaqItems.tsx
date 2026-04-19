"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/services";

export function ServicesFaqItems({ items }: { items: readonly FaqItem[] }) {
  const [openSet, setOpenSet] = useState<ReadonlySet<number>>(new Set());

  function toggle(i: number) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <dl className="m-0 list-none p-0">
      {items.map((item, i) => {
        const isOpen = openSet.has(i);
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
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl leading-none font-light transition-colors duration-200 ${
                    isOpen ? "bg-ink/10 text-ink" : "text-ink"
                  }`}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </dt>
            <dd
              className={`m-0 grid transition-[grid-template-rows] duration-300 ease-in-out ${
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
