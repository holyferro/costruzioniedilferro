// components/sections/HowWeWork.tsx
// RSC. Sezione processo a 4 step orizzontali (Analisi → Progettazione → Realizzazione → Consegna).
// Icone Lucide per ogni step (D-09). Niente animazioni — solo grid statico (D-10).
// Surface bg-white per spezzare il ritmo panna delle sezioni editoriali adiacenti.

import { ClipboardList, Ruler, HardHat, CheckCircle2 } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { ProcessStep } from "@/content/services";
import { Eyebrow } from "@/components/ui/Eyebrow";

type HowWeWorkProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  steps: readonly ProcessStep[];
};

// Mapping fisso per i 4 step in ordine: Analisi, Progettazione, Realizzazione, Consegna.
// Posizione index → icon component.
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const STEP_ICONS = [
  ClipboardList, // 01 — Analisi
  Ruler, // 02 — Progettazione
  HardHat, // 03 — Realizzazione
  CheckCircle2, // 04 — Consegna
] as const satisfies readonly [IconComponent, IconComponent, IconComponent, IconComponent];

export function HowWeWork({ eyebrow, titleStart, titleAccent, titleEnd, steps }: HowWeWorkProps) {
  return (
    <section className="text-ink bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-14 max-w-[34ch] md:mb-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-ink mt-5 font-serif text-[clamp(2rem,1rem+2.6vw,3.4rem)] leading-[1.12] font-medium tracking-tight">
            {titleStart}
            <em className="text-brand font-serif italic">{titleAccent}</em>
            {titleEnd}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-12">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i as 0 | 1 | 2 | 3] ?? ClipboardList;
            return (
              <div
                key={step.n}
                className="md:border-border md:border-l md:pl-6 md:first:border-l-0 md:first:pl-0"
              >
                <span className="text-brand font-serif text-base font-medium italic">
                  — {step.n}
                </span>
                <Icon aria-hidden="true" className="text-ink mt-3 h-7 w-7" strokeWidth={1.5} />
                <h3 className="text-ink mt-4 font-serif text-xl leading-tight font-medium">
                  {step.title}
                </h3>
                <p className="text-ink/70 mt-2 text-base leading-[1.6]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
