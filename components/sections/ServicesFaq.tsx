import type { FaqItem } from "@/content/services";
import { ServicesFaqItems } from "@/components/sections/ServicesFaqItems";

type ServicesFaqProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  items: readonly FaqItem[];
};

export function ServicesFaq({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  items,
}: ServicesFaqProps) {
  return (
    <section className="bg-panna text-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.3fr] md:gap-20 md:px-12">
        <div className="md:sticky md:top-[calc(var(--header-height)+24px)] md:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-ink mt-5 max-w-[14ch] font-serif text-[clamp(2rem,1rem+2.6vw,3.4rem)] leading-[1.12] font-medium tracking-tight">
            {titleStart}
            <em className="text-brand font-serif italic">{titleAccent}</em>
            {titleEnd}
          </h2>
        </div>

        <ServicesFaqItems items={items} />
      </div>
    </section>
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
