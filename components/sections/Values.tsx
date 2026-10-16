// components/sections/Values.tsx
// RSC. Quattro principi numerati in lista editoriale, titolo sticky a sinistra.

import type { Principle } from "@/content/homepage";
import { Eyebrow } from "@/components/ui/Eyebrow";

type ValuesProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  body: string;
  principles: readonly Principle[];
};

export function Values({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  body,
  principles,
}: ValuesProps) {
  return (
    <section className="bg-panna text-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.3fr] md:gap-20 md:px-12">
        <div className="md:sticky md:top-[calc(var(--header-height)+24px)] md:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-ink text-h2 mt-5 max-w-[14ch] font-serif font-medium tracking-tight">
            {titleStart}
            <em className="text-brand font-serif italic">{titleAccent}</em>
            {titleEnd}
          </h2>
          <p className="text-ink/70 mt-7 max-w-[36ch] text-base leading-[1.65]">{body}</p>
        </div>

        <ol className="m-0 list-none p-0">
          {principles.map((p, i) => (
            <li
              key={p.n}
              className={`border-border grid grid-cols-[60px_1fr] gap-6 border-t py-8 md:grid-cols-[80px_1fr] md:gap-8 md:py-10 ${
                i === principles.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="text-brand font-serif text-xl leading-none font-medium italic md:text-[22px]">
                — {p.n}
              </span>
              <div>
                <h3 className="text-ink max-w-[28ch] font-serif text-[clamp(1.3rem,0.6rem+1vw,1.65rem)] leading-[1.25] font-medium tracking-tight">
                  {p.title}
                </h3>
                <p className="text-ink/80 mt-3.5 max-w-[56ch] text-base leading-[1.65]">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
