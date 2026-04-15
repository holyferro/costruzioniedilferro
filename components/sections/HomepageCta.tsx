// components/sections/HomepageCta.tsx
// RSC. CTA finale prima del footer.
// pb-24 md:pb-20 crea clearance per la sticky bar mobile (altezza ~72px).
import Link from "next/link";

type HomepageCtaProps = {
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export function HomepageCta({ headline, body, ctaLabel, ctaHref }: HomepageCtaProps) {
  return (
    <section className="bg-panna py-20 pb-24 md:pb-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-serif text-h2 text-ink">{headline}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink/70">{body}</p>
        <Link
          href={ctaHref}
          className="mt-10 inline-flex rounded-full bg-brand px-8 py-4 text-base font-medium text-panna transition-colors hover:bg-brand/90"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
