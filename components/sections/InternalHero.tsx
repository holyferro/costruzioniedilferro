import Image from "next/image";

type InternalHeroProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd?: string;
  subtitle: string;
  breadcrumbPage: string;
  imageSrc?: string;
  imageAlt?: string;
  badges?: string[];
};

export function InternalHero({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd = "",
  subtitle,
  breadcrumbPage,
  imageSrc,
  imageAlt = "Cantiere Edilferro",
  badges,
}: InternalHeroProps) {
  return (
    <section className="bg-panna text-ink">
      {/* ── MOBILE: immagine full-width in cima ─────────────────────── */}
      <div className="relative h-[35vh] w-full overflow-hidden md:hidden">
        {imageSrc ? (
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#7A746A]/30">
            <PlaceholderIcon size={40} />
          </div>
        )}
        <span className="absolute top-4 left-[26px] z-10 text-[10px] font-semibold tracking-[0.2em] text-white/80 uppercase">
          IMG · CANTIERE PRINCIPALE
        </span>
      </div>

      {/* ── MOBILE: blocco testo ─────────────────────────────────────── */}
      <div className="px-[26px] py-8 md:hidden">
        <HeroEyebrow text={eyebrow} />
        <h1 className="text-ink mt-4 font-serif text-[36px] leading-[1.06] font-medium tracking-[-0.02em]">
          {titleStart}
          <em className="text-brand italic">{titleAccent}</em>
          {titleEnd}
        </h1>
        <p className="mt-4 text-[15px] leading-[1.7] text-[#7A746A]">{subtitle}</p>
        {badges && badges.length > 0 && <BadgeRow badges={badges} className="mt-5" />}
        <HeroBreadcrumb page={breadcrumbPage} className="mt-6 min-h-[44px]" />
      </div>

      {/* ── DESKTOP: split 55/45 ────────────────────────────────────── */}
      <div className="hidden min-h-[58vh] items-stretch md:flex">
        {/* Sinistra — testo */}
        <div className="flex w-[55%] flex-col justify-between px-12 py-14 xl:px-20 xl:py-16">
          <div>
            <HeroEyebrow text={eyebrow} />
            <h1 className="text-ink mt-6 font-serif text-[clamp(2.75rem,1.4rem+3.4vw,5rem)] leading-[1.06] font-medium tracking-[-0.02em]">
              {titleStart}
              <em className="text-brand italic">{titleAccent}</em>
              {titleEnd}
            </h1>
            <p className="mt-5 max-w-[44ch] text-[15px] leading-[1.7] text-[#7A746A]">{subtitle}</p>
            {badges && badges.length > 0 && <BadgeRow badges={badges} className="mt-6" />}
          </div>
          <HeroBreadcrumb page={breadcrumbPage} className="pt-8" showScroll />
        </div>

        {/* Destra — immagine con clip geometrico */}
        <div className="relative flex flex-1 items-stretch">
          {/* Filo verticale viola */}
          <div className="bg-brand absolute inset-y-0 left-0 z-10 w-[3px]" />

          {/* Immagine con clip: taglia angolo basso-sinistra (88px h, 14% w) */}
          <div
            className="relative ml-[3px] flex-1 overflow-hidden"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 14% 100%, 0% calc(100% - 88px))",
            }}
          >
            {imageSrc ? (
              <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#7A746A]/30">
                <PlaceholderIcon size={48} />
              </div>
            )}
            <span className="absolute top-5 left-5 z-10 text-[10px] font-semibold tracking-[0.2em] text-white/80 uppercase">
              IMG · CANTIERE PRINCIPALE
            </span>
            <span className="absolute right-5 bottom-5 z-10 text-[11px] font-semibold tracking-[0.1em] text-white/60">
              01 / 24
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroEyebrow({ text }: { text: string }) {
  return (
    <p className="text-brand flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase">
      <span className="bg-brand h-px w-8" aria-hidden="true" />
      {text}
    </p>
  );
}

function HeroBreadcrumb({
  page,
  className = "",
  showScroll = false,
}: {
  page: string;
  className?: string;
  showScroll?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <p className="text-ink/50 text-[10px] font-semibold tracking-[0.22em] uppercase">
        Home <span className="mx-1.5 opacity-40">/</span> {page}
      </p>
      {showScroll && (
        <p className="text-ink/40 text-[10px] font-semibold tracking-[0.16em] uppercase">
          Scorri per esplorare →
        </p>
      )}
    </div>
  );
}

function BadgeRow({ badges, className = "" }: { badges: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map((badge, i) => (
        <span
          key={badge}
          className={
            i === 0
              ? "bg-brand rounded-[4px] px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] text-white uppercase"
              : "border-ink/20 text-ink/60 rounded-[4px] border px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase"
          }
        >
          {badge}
        </span>
      ))}
    </div>
  );
}

function PlaceholderIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="opacity-40"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
