import { Star } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const GOOGLE_REVIEWS_URL = "[URL SCHEDA GOOGLE BUSINESS DA INSERIRE]";

type Review = {
  name: string;
  text: string;
};

const reviews: Review[] = [
  {
    name: "M.F.",
    text: "Ditta in piedi dal dopo alluvione, del 51 partita con carretti e cavalli ed arrivata al top tecnologico del 2020. Inpegnata nel civile, privato ed industriale.",
  },
  {
    name: "G.F.",
    text: "Impresa storica del nostro territorio in grado di gestire commesse di grossa entità. Ufficio tecnico e personale molto qualificato. Consigliata al 100%.",
  },
  {
    name: "B.G.",
    text: "Impresa di costruzioni affidabile e serissima. Disponibili e capiscono immediatamente le esigenze del cliente. Bravi",
  },
];

export function AziendaTestimonianze() {
  return (
    <section className="bg-panna border-border border-t py-24 md:py-[120px]">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Eyebrow>Parlano di noi</Eyebrow>
        <h2 className="text-ink mt-5 max-w-[16ch] font-serif text-[clamp(1.75rem,0.6rem+2vw,2.625rem)] leading-[1.15] font-medium tracking-[-0.015em]">
          Lo dicono i nostri clienti.
        </h2>
        <p className="text-ink/70 mt-5 text-[15px] leading-[1.7]">
          <strong className="text-ink font-semibold">5,0 ★</strong> su Google —{" "}
          <a
            href={GOOGLE_REVIEWS_URL}
            className="text-brand border-brand border-b pb-0.5 no-underline"
          >
            Leggi le recensioni su Google
          </a>
        </p>

        <div className="border-border mt-14 grid grid-cols-1 gap-px bg-[var(--color-border)] md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="hover:border-ink/40 relative flex flex-col gap-5 border border-transparent bg-white px-10 py-11 transition-colors duration-300"
            >
              <span className="text-ink/40 absolute top-6 right-8 text-[11px] font-semibold tracking-[0.1em] uppercase">
                Google
              </span>
              <div className="flex gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="fill-brand text-brand h-4 w-4" />
                ))}
              </div>
              <p className="text-ink font-serif text-[19px] leading-[1.4] font-medium tracking-[-0.01em]">
                {review.text}
              </p>
              <div className="mt-auto">
                <p className="text-ink text-sm font-semibold">{review.name}</p>
                <p className="text-ink/60 mt-0.5 text-sm">Recensione Google</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
