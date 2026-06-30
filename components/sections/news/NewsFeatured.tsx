import { Eyebrow } from "@/components/ui/Eyebrow";
import type { SanityNewsArticle } from "@/sanity/lib/types";
import { NewsFeaturedCard } from "./NewsFeaturedCard";

interface NewsFeaturedProps {
  article: SanityNewsArticle;
}

export function NewsFeatured({ article }: NewsFeaturedProps) {
  return (
    <section className="bg-white py-20 pb-[100px]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="mb-8 flex items-baseline justify-between">
          <div className="whitespace-nowrap">
            <Eyebrow>In evidenza</Eyebrow>
          </div>
          <span className="text-ink/60 font-serif text-base italic">
            L&apos;ultima dal cantiere
          </span>
        </div>
        <NewsFeaturedCard article={article} />
      </div>
    </section>
  );
}
