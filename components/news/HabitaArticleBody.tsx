import Image from "next/image";
import { habitaArticle } from "@/content/articles/habita";
import {
  LeadBlock,
  ParagraphBlock,
  SectionBlock,
  AdvantagesBlock,
  CtaBlock,
  ImageBlock,
} from "@/components/article/blocks";
import type { ArticleBlock } from "@/lib/types/article";

export function HabitaArticleBody() {
  const article = habitaArticle;

  return (
    <article>
      {/* ── HERO ── */}
      <section
        className="relative flex min-h-[540px] items-end overflow-hidden"
        style={{ background: "#0a1830" }}
      >
        <Image
          src={article.cover}
          alt={article.coverAlt}
          fill
          quality={90}
          sizes="min(1100px, 96vw)"
          className="object-cover saturate-[0.92]"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,24,48,0.25) 0%, rgba(10,24,48,0.4) 50%, rgba(10,24,48,0.88) 100%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[860px] px-8 pt-12 pb-14">
          <span className="bg-panna text-brand mb-6 inline-flex items-center gap-2.5 rounded-full px-3.5 py-[7px] font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold tracking-[0.22em] uppercase">
            <span className="bg-brand inline-block h-1.5 w-1.5 rounded-full" />
            Progetto in evidenza
          </span>

          <h1 className="m-0 max-w-[16ch] font-serif text-[clamp(2.25rem,1.4rem+2.8vw,4rem)] leading-[1.05] font-medium tracking-[-0.02em] [text-wrap:balance] text-white">
            {article.title}{" "}
            <em className="italic" style={{ color: "rgba(255,255,255,0.78)" }}>
              {article.titleItalic}
            </em>{" "}
            nel Delta del Po.
          </h1>

          <p
            className="mt-6 max-w-[60ch] text-[18px] leading-[1.55]"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            {article.heroSubtitle}
          </p>

          <div
            className="mt-10 grid gap-5 border-t pt-6"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              borderColor: "rgba(255,255,255,0.18)",
            }}
          >
            {article.heroMeta.map((m) => (
              <div key={m.label}>
                <p
                  className="m-0 mb-1.5 font-[family-name:var(--font-neue-montreal)] text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {m.label}
                </p>
                <p
                  className="m-0 font-serif text-[16px] leading-[1.3] font-medium"
                  style={{ color: "#fff" }}
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BODY — narrow container + full-bleed blocks ── */}
      <ArticleBodyRenderer blocks={article.body} />
    </article>
  );
}

function ArticleBodyRenderer({ blocks }: { blocks: ArticleBlock[] }) {
  // Partition into groups: contained vs. full-bleed (advantages, cta)
  const groups: Array<{ fullBleed: boolean; items: ArticleBlock[] }> = [];

  for (const block of blocks) {
    const isFullBleed = block.type === "advantages" || block.type === "cta";
    const last = groups[groups.length - 1];
    if (last && last.fullBleed === isFullBleed) {
      last.items.push(block);
    } else {
      groups.push({ fullBleed: isFullBleed, items: [block] });
    }
  }

  return (
    <>
      {groups.map((group, gi) =>
        group.fullBleed ? (
          group.items.map((block, bi) => {
            if (block.type === "advantages") {
              return (
                <AdvantagesBlock
                  key={`${gi}-${bi}`}
                  eyebrow={block.eyebrow}
                  title={block.title}
                  titleItalic={block.titleItalic}
                  items={block.items}
                />
              );
            }
            if (block.type === "cta") {
              return (
                <div key={`${gi}-${bi}`} className="mx-auto max-w-[760px] px-8">
                  <CtaBlock
                    kicker={block.kicker}
                    title={block.title}
                    titleItalic={block.titleItalic}
                    text={block.text}
                    ctaLabel={block.ctaLabel}
                    ctaHref={block.ctaHref}
                  />
                </div>
              );
            }
            return null;
          })
        ) : (
          <div key={gi} className="mx-auto max-w-[760px] px-8">
            <div className="flex flex-col">
              {group.items.map((block, bi) => {
                if (block.type === "lead") {
                  return (
                    <section key={bi} className="py-[72px] pb-14">
                      <LeadBlock text={block.text} />
                    </section>
                  );
                }
                if (block.type === "paragraph") {
                  return (
                    <div key={bi} className="mt-8">
                      <ParagraphBlock text={block.text} html={block.html} />
                    </div>
                  );
                }
                if (block.type === "image") {
                  return (
                    <div key={bi} className="mt-8">
                      <ImageBlock src={block.src} alt={block.alt} caption={block.caption} />
                    </div>
                  );
                }
                if (block.type === "section") {
                  return (
                    <SectionBlock
                      key={bi}
                      eyebrow={block.eyebrow}
                      title={block.title}
                      blocks={block.blocks}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        ),
      )}
    </>
  );
}
