import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { serverClient, urlFor } from "@/sanity/lib/client";
import { newsBySlugQuery, newsSlugsQuery } from "@/sanity/lib/queries";
import type { SanityNewsArticle } from "@/sanity/lib/types";
import { ArticleContent } from "@/components/news/ArticleContent";
import { HomepageCta } from "@/components/sections/HomepageCta";
import { defaultFinalCta } from "@/content/finalCta";
import { siteContent } from "@/content/site";

// The page of one article, for search engines and shared links. On the site, cards open the same
// content in the reader overlay (NewsReader); their href points here.

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

const getArticle = (slug: string) =>
  serverClient.fetch<SanityNewsArticle | null>(
    newsBySlugQuery,
    { slug },
    { next: { tags: ["news"] } },
  );

export async function generateStaticParams() {
  const slugs = await serverClient.fetch<string[]>(
    newsSlugsQuery,
    {},
    { next: { tags: ["news"] } },
  );
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  if (!article) return {};
  const title = article.titleItalic ? `${article.title} ${article.titleItalic}` : article.title;
  return buildMetadata({
    title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: "article",
      url: `/news/${article.slug}`,
      title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      images: [
        {
          url: urlFor(article.coverImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: article.coverImage.alt,
        },
      ],
    },
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [urlFor(article.coverImage).width(1600).url()],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: siteContent.brand.legalName },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ArticleContent article={article} imageSizes="100vw" />
      <div className="mx-auto max-w-[760px] px-8 pb-16">
        <Link
          href="/news"
          className="text-brand border-brand tracking-caps-tight inline-flex items-center gap-2 border-b pb-1.5 font-[family-name:var(--font-neue-montreal)] text-xs uppercase"
        >
          <span aria-hidden="true">←</span> Tutte le news
        </Link>
      </div>
      <HomepageCta
        {...defaultFinalCta}
        headline="Hai un progetto in mente?"
        body="Raccontaci quello che vuoi costruire. Valutiamo insieme fattibilità, tempistiche e approccio tecnico senza impegno."
      />
    </>
  );
}
