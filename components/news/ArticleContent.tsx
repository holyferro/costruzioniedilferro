import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";
import type { SanityNewsArticle } from "@/sanity/lib/types";
import { PortableTextRenderer } from "./PortableTextRenderer";

/** Hero and body of a news article: the same markup in the reader overlay and on /news/[slug]. */
export function ArticleContent({
  article,
  imageSizes,
}: {
  article: SanityNewsArticle;
  /** next/image `sizes` for the cover, which fills the hero width. */
  imageSizes: string;
}) {
  const coverUrl = article.coverImage ? urlFor(article.coverImage).width(1600).url() : "";

  return (
    <article>
      {/* Hero */}
      <section
        className="relative flex min-h-[540px] items-end overflow-hidden"
        style={{ background: "var(--color-night)" }}
      >
        {coverUrl && (
          <Image
            src={coverUrl}
            alt={article.coverImage.alt}
            fill
            quality={90}
            sizes={imageSizes}
            className="object-cover saturate-[0.92]"
            priority
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--color-night) 25%, transparent) 0%, color-mix(in oklab, var(--color-night) 40%, transparent) 50%, color-mix(in oklab, var(--color-night) 88%, transparent) 100%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[860px] px-8 pt-12 pb-14">
          <h1 className="m-0 max-w-[18ch] font-serif text-[clamp(2.25rem,1.4rem+2.8vw,4rem)] leading-[1.05] font-medium tracking-[-0.02em] [text-wrap:balance] text-white">
            {article.title}
            {article.titleItalic && (
              <>
                {" "}
                <em className="italic" style={{ color: "rgba(255,255,255,0.78)" }}>
                  {article.titleItalic}.
                </em>
              </>
            )}
          </h1>

          <p
            className="mt-6 max-w-[60ch] text-[18px] leading-[1.55]"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            {article.heroSubtitle}
          </p>

          {article.heroMeta.length > 0 && (
            <div
              className="mt-10 flex flex-wrap gap-y-4 border-t pt-6 md:flex-nowrap"
              style={{ borderColor: "rgba(255,255,255,0.18)" }}
            >
              {article.heroMeta.map((m) => (
                <div
                  key={m.label}
                  className="w-1/2 min-w-0 pr-4 md:w-auto md:flex-1 md:pr-8 md:last:pr-0"
                >
                  <p
                    className="tracking-caps m-0 mb-1.5 font-[family-name:var(--font-neue-montreal)] text-[11px] uppercase md:text-[11px]"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {m.label}
                  </p>
                  <p
                    className="m-0 font-serif text-[13px] leading-[1.3] font-medium md:text-[16px]"
                    style={{ color: "#fff" }}
                  >
                    {m.valore}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-[760px] px-8 py-14">
        <PortableTextRenderer value={article.body} />
      </div>
    </article>
  );
}
