// components/sections/SoaSection.tsx
// RSC. Feature card scura SOA/CQOP dentro sezione bg-panna. Design 2-col: info+stats | commitments.

import Image from "next/image";

type SoaStat = { label: string; value: string };
type SoaCommitment = { title: string; body: string };

type SoaSectionProps = {
  eyebrow: string;
  tag: string;
  title: string;
  body: string;
  stats: readonly SoaStat[];
  commitments: readonly SoaCommitment[];
};

export function SoaSection({ eyebrow, tag, title, body, stats, commitments }: SoaSectionProps) {
  return (
    <section className="bg-panna pt-20 md:pt-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <p className="text-ink/60 mb-14 text-xs font-semibold tracking-[0.38em] uppercase">
          <span
            aria-hidden="true"
            className="bg-ink/35 mr-3.5 inline-block h-px w-8 align-middle"
          />
          {eyebrow}
        </p>

        {/* Dark feature card */}
        <div className="grid items-start gap-12 bg-[#0A1830] px-8 py-12 md:px-14 md:py-16 lg:grid-cols-2 lg:gap-20">
          {/* Left column */}
          <div>
            <div className="relative mb-10 h-16 w-52">
              <Image
                src="/images/certifications/logo-cqop.webp"
                alt="Logo CQOP S.p.A."
                fill
                className="object-contain object-left brightness-0 invert"
                sizes="208px"
              />
            </div>

            <span className="mb-5 inline-block rounded-full border border-[rgba(142,163,209,0.4)] px-3 py-1.5 font-[family-name:var(--font-neue-montreal)] text-[10px] font-semibold tracking-[0.22em] text-[rgba(142,163,209,1)] uppercase">
              {tag}
            </span>

            <h2 className="mt-1 max-w-[20ch] font-serif text-[clamp(1.6rem,0.6rem+2vw,2.6rem)] leading-[1.18] font-medium tracking-[-0.015em] text-white">
              {title}
            </h2>

            <p className="text-panna/78 mt-5 max-w-[52ch] text-base leading-[1.7]">{body}</p>

            {/* Stat boxes */}
            <div className="mt-8 flex flex-wrap gap-3.5">
              {stats.map((s) => (
                <div key={s.label} className="border-panna/15 rounded-md border px-5 py-4">
                  <p className="text-panna/55 mb-1.5 text-[10px] tracking-[0.2em] uppercase">
                    {s.label}
                  </p>
                  <p className="font-serif text-lg font-medium text-white">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — commitments */}
          <div>
            <p className="text-panna/50 mb-6 text-[11px] tracking-[0.2em] uppercase">
              Cosa significa per il committente
            </p>
            <div className="flex flex-col">
              {commitments.map((c, i) => (
                <div
                  key={c.title}
                  className={`border-panna/12 border-t py-6 ${i === commitments.length - 1 ? "border-b" : ""}`}
                >
                  <h3 className="mb-2.5 font-serif text-[18px] leading-[1.3] font-medium text-white">
                    {c.title}
                  </h3>
                  <p className="text-panna/70 text-sm leading-[1.65]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
