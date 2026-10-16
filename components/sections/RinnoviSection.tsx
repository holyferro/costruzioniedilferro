// components/sections/RinnoviSection.tsx
// RSC. Sezione "Il valore di una certificazione" — editoriale 2-col + timeline rinnovi.

import type { RenewalRow } from "@/content/certifications";
import { Eyebrow } from "@/components/ui/Eyebrow";

type RinnoviSectionProps = {
  eyebrow: string;
  title: string;
  body: string;
  rows: readonly RenewalRow[];
};

export function RinnoviSection({ eyebrow, title, body, rows }: RinnoviSectionProps) {
  return (
    <section className="border-border bg-panna border-t border-b py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Editoriale */}
          <div>
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <h2 className="text-ink text-h2 max-w-[18ch] font-serif font-medium tracking-tight">
              {title}
            </h2>
            <p className="text-ink/70 mt-6 max-w-[50ch] text-[17px] leading-[1.7]">{body}</p>
          </div>

          {/* Timeline rinnovi */}
          <div className="flex flex-col">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`border-border grid grid-cols-[80px_1fr] gap-5 border-t py-6 ${
                  i === rows.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="text-brand font-serif text-base font-medium italic">
                  {row.label}
                </span>
                <div>
                  <p className="text-ink mb-1 text-[15px] font-medium">{row.title}</p>
                  <p className="text-ink/65 text-[13px]">{row.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
