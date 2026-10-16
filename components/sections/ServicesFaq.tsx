import Link from "next/link";
import type { FaqItem } from "@/content/services";
import { ServicesFaqItems } from "@/components/sections/ServicesFaqItems";
import { Eyebrow } from "@/components/ui/Eyebrow";

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
          <h2 className="text-ink text-h2 mt-5 max-w-[14ch] font-serif font-medium tracking-tight">
            {titleStart}
            <em className="text-brand font-serif italic">{titleAccent}</em>
            {titleEnd}
          </h2>
        </div>

        <div>
          <ServicesFaqItems items={items} />
          <p className="text-ink/65 mt-8 text-sm leading-relaxed">
            Non hai trovato la risposta che cercavi?{" "}
            <Link
              href="/contatti"
              className="text-ink/70 hover:text-brand underline underline-offset-2 transition-colors duration-150"
            >
              Contattaci
            </Link>{" "}
            — siamo disponibili a chiarire ogni dubbio.
          </p>
        </div>
      </div>
    </section>
  );
}
