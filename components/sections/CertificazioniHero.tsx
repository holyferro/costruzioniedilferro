// components/sections/CertificazioniHero.tsx
// RSC. Hero dark 2-col: titolo a sinistra, corpo + badge a destra. Pattern dal design file.

type CertificazioniHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  solidBadges: readonly string[];
  outlineBadges: readonly string[];
};

export function CertificazioniHero({
  eyebrow,
  title,
  body,
  solidBadges,
  outlineBadges,
}: CertificazioniHeroProps) {
  return (
    <section className="bg-ink text-panna relative overflow-hidden py-24 md:py-32">
      {/* Dot texture */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="cert-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="rgba(255,255,255,0.07)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cert-dots)" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          {/* Left — eyebrow + title */}
          <div>
            <p className="text-panna/60 text-xs font-semibold tracking-[0.38em] uppercase">
              <span
                aria-hidden="true"
                className="bg-panna/35 mr-3.5 inline-block h-px w-8 align-middle"
              />
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-[16ch] font-serif text-[clamp(2.4rem,1.2rem+3.2vw,4.4rem)] leading-[1.06] font-medium tracking-[-0.025em] text-white">
              {title}
            </h1>
          </div>

          {/* Right — body + badge chips */}
          <div>
            <p className="text-panna/82 text-[17px] leading-[1.7]">{body}</p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {solidBadges.map((b) => (
                <span
                  key={b}
                  className="bg-brand rounded px-3.5 py-2 font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold tracking-[0.14em] text-white uppercase"
                >
                  {b}
                </span>
              ))}
              {outlineBadges.map((b) => (
                <span
                  key={b}
                  className="border-panna/30 text-panna/70 rounded border px-3.5 py-2 font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold tracking-[0.14em] uppercase"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
