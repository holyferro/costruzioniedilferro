import { Eyebrow } from "@/components/ui/Eyebrow";

export function NewsHero() {
  return (
    <section className="bg-panna border-border border-b py-[120px] pb-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="grid items-end gap-[80px] md:grid-cols-[1.4fr_1fr]">
          {/* Left */}
          <div>
            <Eyebrow>Aggiornamenti</Eyebrow>
            <h1 className="text-ink mt-6 font-serif text-[clamp(2.75rem,1.4rem+3.4vw,5rem)] leading-[1.06] font-medium tracking-[-0.02em]">
              News, cantieri
              <br />
              <em className="text-brand italic">e racconti</em>
              <br />
              dall&apos;impresa.
            </h1>
          </div>

          {/* Right */}
          <div className="pb-2">
            <p className="text-ink/70 max-w-[44ch] text-lg leading-[1.6]">
              Aggiornamenti dai cantieri, certificazioni, eventi e iniziative che raccontano il modo
              in cui costruiamo da quarantasei anni.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
