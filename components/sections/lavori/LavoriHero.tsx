import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function LavoriHero() {
  return (
    <section className="bg-panna text-ink pt-8 pb-0 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Realizzazioni</Eyebrow>
          <h1 className="text-ink mt-5 font-serif text-[clamp(2.25rem,1.5rem+3.2vw,4rem)] leading-[1.1] font-medium tracking-tight lg:text-4xl xl:text-[clamp(2.25rem,1.5rem+3.2vw,4rem)]">
            Quattro decenni di cantieri.{" "}
            <em className="text-brand font-serif italic">Ogni opera è una firma.</em>
          </h1>
          <p className="text-ink/70 mx-auto mt-4 max-w-[52ch] text-base leading-relaxed md:text-lg">
            Edifici residenziali, opere pubbliche, restauri, capannoni. Una selezione dei cantieri
            che raccontano il nostro metodo.
          </p>
        </div>

        <div className="mt-5 md:mt-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl md:aspect-auto md:h-[clamp(320px,48vh,600px)] lg:mx-auto lg:max-w-3xl xl:max-w-none">
            <Image
              src="/images/hero3.webp"
              alt="Cantiere Impresa Edile Edilferro — archivio lavori"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
