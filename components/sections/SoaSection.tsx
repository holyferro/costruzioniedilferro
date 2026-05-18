// components/sections/SoaSection.tsx
// RSC. Feature card SOA/CQOP dentro sezione bg-panna. Design 2-col: info+stats | commitments.

import Image from "next/image";

type SoaStat = { label: string; value: string; sub?: string };
type SoaCommitment = { title: string; body: string };
type SoaCategory = { code: string; name: string; classifica: string };

type SoaSectionProps = {
  eyebrow: string;
  tag: string;
  title: string;
  body: string;
  stats: readonly SoaStat[];
  categories?: readonly SoaCategory[];
  commitments: readonly SoaCommitment[];
  anacLink?: string;
};

export function SoaSection({
  eyebrow,
  tag,
  title,
  body,
  stats,
  categories,
  commitments,
  anacLink,
}: SoaSectionProps) {
  return (
    <section className="bg-white pt-20 pb-20 md:pt-28 md:pb-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <p className="text-ink/60 mb-14 text-xs font-semibold tracking-[0.38em] uppercase">
          <span
            aria-hidden="true"
            className="bg-ink/35 mr-3.5 inline-block h-px w-8 align-middle"
          />
          {eyebrow}
        </p>

        {/* Brand-color feature card */}
        <div className="bg-brand grid items-start gap-12 px-8 py-12 md:px-14 md:py-16 lg:grid-cols-2 lg:gap-20">
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

            <span className="mb-5 inline-block rounded-full border border-white/30 px-3 py-1.5 font-[family-name:var(--font-neue-montreal)] text-[10px] font-semibold tracking-[0.22em] text-white/70 uppercase">
              {tag}
            </span>

            <h2 className="mt-1 max-w-[20ch] font-serif text-[clamp(1.6rem,0.6rem+2vw,2.6rem)] leading-[1.18] font-medium tracking-[-0.015em] text-white">
              {title}
            </h2>

            <p className="mt-5 max-w-[52ch] text-base leading-[1.7] whitespace-pre-line text-white/75">
              {body}
            </p>

            {/* Categories list */}
            {categories && categories.length > 0 && (
              <div className="mt-7 divide-y divide-white/10">
                {categories.map((cat) => (
                  <div key={cat.code} className="flex items-baseline justify-between gap-4 py-2.5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold tracking-[0.18em] text-white/90 uppercase">
                        {cat.code}
                      </span>
                      <span className="text-[13px] text-white/60">{cat.name}</span>
                    </div>
                    <span className="shrink-0 font-[family-name:var(--font-neue-montreal)] text-[11px] tracking-[0.08em] text-white/50">
                      {cat.classifica}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {anacLink && (
              <a
                href={anacLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-white/60 uppercase transition-opacity hover:opacity-70"
              >
                Verifica attestazione sul portale ANAC
                <svg
                  aria-hidden="true"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" x2="21" y1="14" y2="3" />
                </svg>
              </a>
            )}
          </div>

          {/* Right column — commitments + stat boxes */}
          <div>
            <p className="mb-6 text-[11px] tracking-[0.2em] text-white/50 uppercase">
              Cosa significa per il committente
            </p>
            <div className="flex flex-col">
              {commitments.map((c, i) => (
                <div
                  key={c.title}
                  className={`border-t border-white/12 py-6 ${i === commitments.length - 1 ? "border-b" : ""}`}
                >
                  <h3 className="mb-2.5 font-serif text-[18px] leading-[1.3] font-medium text-white">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-[1.65] text-white/70">{c.body}</p>
                </div>
              ))}
            </div>

            {/* Stat boxes */}
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3.5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-md border border-white/15 px-2.5 py-3 sm:px-5 sm:py-4"
                >
                  <p className="mb-1 text-[8px] leading-tight tracking-[0.06em] text-white/50 uppercase sm:text-[10px] sm:tracking-[0.2em]">
                    {s.label}
                  </p>
                  <p className="font-serif text-[11px] leading-snug font-medium whitespace-pre-line text-white sm:text-sm">
                    {s.value}
                  </p>
                  {s.sub && (
                    <p className="mt-0.5 text-[9px] leading-tight text-white/40 sm:text-[10px]">
                      {s.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
