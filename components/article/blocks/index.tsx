import Image from "next/image";
import type { ArticleBlock } from "@/lib/types/article";

/* ---- Lead ---- */
export function LeadBlock({ text }: { text: string }) {
  return (
    <p className="text-ink mt-0 mb-0 font-serif text-[26px] leading-[1.5] font-normal tracking-[-0.005em] [text-wrap:pretty] italic">
      {text}
    </p>
  );
}

/* ---- Paragraph ---- */
export function ParagraphBlock({ text, html }: { text: string; html?: true }) {
  if (html) {
    return (
      <p
        className="text-ink/80 [&_strong]:text-ink text-[17px] leading-[1.75] [&_strong]:font-semibold"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }
  return <p className="text-ink/80 text-[17px] leading-[1.75]">{text}</p>;
}

/* ---- Image ---- */
export function ImageBlock({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="m-0 my-9">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <Image
          src={src}
          alt={alt}
          fill
          quality={88}
          sizes="(min-width: 768px) 760px, 100vw"
          className="object-cover"
        />
      </div>
    </figure>
  );
}

/* ---- Pull Quote ---- */
export function QuoteBlock({ text }: { text: string }) {
  return (
    <blockquote className="border-brand text-ink my-9 border-l-2 py-2 pl-8 font-serif text-[22px] leading-[1.45] tracking-[-0.005em] italic">
      <span aria-hidden className="text-brand mb-1.5 block text-[32px] leading-none">
        &ldquo;
      </span>
      {text}
    </blockquote>
  );
}

/* ---- Section ---- */
export function SectionBlock({
  eyebrow,
  title,
  blocks,
}: {
  eyebrow: string;
  title: string;
  blocks: ArticleBlock[];
}) {
  return (
    <section className="border-border border-t py-12">
      <p className="text-brand m-0 font-[family-name:var(--font-neue-montreal)] text-[12px] font-semibold tracking-[0.28em] uppercase">
        {eyebrow}
      </p>
      <h2 className="text-ink mt-4 mb-7 max-w-[22ch] font-serif text-[clamp(1.5rem,0.6rem+1.4vw,2rem)] leading-[1.2] font-medium tracking-[-0.015em] [text-wrap:pretty]">
        {title}
      </h2>
      <div className="flex flex-col gap-[18px]">
        {blocks.map((b, i) => (
          <InlineBlockRenderer key={i} block={b} />
        ))}
      </div>
    </section>
  );
}

/* ---- Univ Badge ---- */
export function UnivBadgeBlock({
  title,
  text,
  logo,
}: {
  title: string;
  text: string;
  logo?: string;
}) {
  return (
    <div className="border-border bg-surface mt-9 flex items-start gap-5 border p-6">
      {logo ? (
        <div className="relative h-11 w-16 shrink-0">
          <Image src={logo} alt="" fill className="object-contain object-left" sizes="64px" />
        </div>
      ) : (
        <span className="bg-brand text-panna flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
          <GradCapIcon />
        </span>
      )}
      <div>
        <p className="text-ink m-0 font-serif text-[17px] leading-[1.3] font-medium">{title}</p>
        <p className="text-ink/70 m-0 mt-2 text-[14.5px] leading-[1.6]">{text}</p>
      </div>
    </div>
  );
}

/* ---- Advantages (full-bleed dark — rendered by parent) ---- */
export function AdvantagesBlock({
  eyebrow,
  title,
  titleItalic,
  items,
}: {
  eyebrow: string;
  title: string;
  titleItalic: string;
  items: { title: string; description: string }[];
}) {
  return (
    <section className="bg-ink text-panna my-8 py-24">
      <div className="mx-auto max-w-[920px] px-8">
        <p className="text-panna/55 m-0 font-[family-name:var(--font-neue-montreal)] text-[12px] font-semibold tracking-[0.32em] uppercase">
          <span aria-hidden className="bg-panna/40 mr-3 inline-block h-px w-7 align-middle" />
          {eyebrow}
        </p>
        <h2 className="mt-5 mb-12 max-w-[20ch] font-serif text-[clamp(1.875rem,1rem+2.2vw,2.75rem)] leading-[1.15] font-medium tracking-[-0.015em] text-white">
          {title} <em className="text-panna/70 italic">{titleItalic}</em>
        </h2>
        <div
          className="grid border-t border-l"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            borderColor: "rgba(255,255,255,0.14)",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-2.5 border-r border-b p-7"
              style={{ borderColor: "rgba(255,255,255,0.14)" }}
            >
              <span className="text-panna/55 font-serif text-[14px] font-medium italic">
                — {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="m-0 font-serif text-[19px] leading-[1.25] font-medium tracking-[-0.005em] text-white">
                {item.title}
              </h4>
              <p className="text-panna/70 m-0 text-[14px] leading-[1.6]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Partners ---- */
export function PartnersBlock({
  items,
}: {
  items: { name: string; role: string; description: string; logo?: string }[];
}) {
  return (
    <ol className="m-0 mt-8 list-none p-0">
      {items.map((item, i) => (
        <li
          key={i}
          className="border-border grid border-t py-6"
          style={{ gridTemplateColumns: "60px 1fr", gap: 24 }}
        >
          <span className="text-brand font-serif text-[18px] font-medium italic">
            — {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-4">
              {item.logo && (
                <div className="relative h-7 w-20 shrink-0">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    className="object-contain object-left"
                    sizes="80px"
                  />
                </div>
              )}
              <div className="flex flex-wrap items-baseline gap-3.5">
                <h4 className="text-ink m-0 font-serif text-[20px] font-medium tracking-[-0.01em]">
                  {item.name}
                </h4>
                <span className="text-ink/60 font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold tracking-[0.22em] uppercase">
                  {item.role}
                </span>
              </div>
            </div>
            <p className="text-ink/70 m-0 text-[15.5px] leading-[1.65]">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---- Specs Table ---- */
export function SpecsBlock({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="border-border bg-surface m-0 mt-9 border p-0">
      {rows.map(([k, v], i) => (
        <div
          key={k}
          className={`grid gap-6 px-[22px] py-4 ${i > 0 ? "border-border border-t" : ""}`}
          style={{ gridTemplateColumns: "40% 1fr" }}
        >
          <dt className="text-ink/60 self-center font-[family-name:var(--font-neue-montreal)] text-[12px] font-semibold tracking-[0.14em] uppercase">
            {k}
          </dt>
          <dd className="text-ink m-0 font-serif text-[16px] leading-[1.4]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---- CTA ---- */
export function CtaBlock({
  kicker,
  title,
  titleItalic,
  text,
  ctaLabel,
  ctaHref,
}: {
  kicker: string;
  title: string;
  titleItalic: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="py-8 pb-24">
      <div className="bg-brand text-panna relative overflow-hidden px-12 py-14">
        <span
          aria-hidden
          className="text-panna/[0.06] pointer-events-none absolute -top-8 -right-2.5 font-serif text-[280px] leading-none font-medium italic select-none"
        >
          H
        </span>
        <div className="relative">
          <p className="text-panna/60 m-0 font-[family-name:var(--font-neue-montreal)] text-[12px] font-semibold tracking-[0.32em] uppercase">
            {kicker}
          </p>
          <h3 className="mt-4 mb-3 max-w-[20ch] font-serif text-[clamp(1.625rem,0.8rem+1.6vw,2.25rem)] leading-[1.2] font-medium tracking-[-0.015em]">
            {title} <em className="text-panna/75 italic">{titleItalic}</em>
          </h3>
          <p className="text-panna/80 m-0 max-w-[48ch] text-[15px] leading-[1.6]">{text}</p>
          <a
            href={ctaHref}
            className="bg-panna text-brand mt-7 inline-flex items-center gap-3 rounded-full px-[26px] py-3.5 font-[family-name:var(--font-neue-montreal)] text-[13px] font-medium tracking-[0.06em] uppercase no-underline"
          >
            {ctaLabel}
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---- Inline renderer (for blocks inside sections) ---- */
export function InlineBlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock text={block.text} html={block.html} />;
    case "quote":
      return <QuoteBlock text={block.text} />;
    case "image":
      return <ImageBlock src={block.src} alt={block.alt} caption={block.caption} />;
    case "univ-badge":
      return <UnivBadgeBlock title={block.title} text={block.text} logo={block.logo} />;
    case "partners":
      return <PartnersBlock items={block.items} />;
    case "specs":
      return <SpecsBlock rows={block.rows} />;
    default:
      return null;
  }
}

/* ---- SVG icon ---- */
function GradCapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L2 9l10 6 10-6-10-6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17l10 6 10-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 13l10 6 10-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
