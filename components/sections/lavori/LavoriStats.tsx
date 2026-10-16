// RSC — Sezione numeri di cantiere (4 stat box)
import { FadeUp } from "@/components/ui/FadeUp";

const STATS = [
  {
    value: "96",
    unit: "%",
    label: "consegne puntuali",
    sub: "anno 2024",
    dark: false,
  },
  {
    value: "18",
    unit: "",
    label: "appalti pubblici",
    sub: "ultimi 3 anni",
    dark: false,
  },
  {
    value: "520",
    unit: "+",
    label: "cantieri completati",
    sub: "dal 1978",
    dark: false,
  },
  {
    value: "0",
    unit: "",
    label: "contenziosi aperti",
    sub: "bilancio 2024",
    dark: true,
  },
] as const;

export function LavoriStats() {
  return (
    <section className="border-border bg-panna border-t py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div
          className="grid grid-cols-2 gap-[2px] lg:grid-cols-4"
          style={{ background: "var(--color-border)" }}
        >
          {STATS.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 80}>
              <div
                className="h-full px-10 py-12"
                style={{
                  background: stat.dark ? "var(--color-brand)" : "var(--color-panna)",
                }}
              >
                <span
                  className="block font-serif leading-none font-medium tracking-[-0.03em]"
                  style={{
                    fontSize: 64,
                    color: stat.dark ? "#fff" : "var(--color-ink)",
                  }}
                >
                  {stat.value}
                  {stat.unit && (
                    <span style={{ fontSize: 36 }} aria-hidden="true">
                      {stat.unit}
                    </span>
                  )}
                  {stat.unit && <span className="sr-only">{stat.unit}</span>}
                </span>
                <p
                  className="mt-3 font-serif text-[19px] italic"
                  style={{
                    color: stat.dark
                      ? "color-mix(in oklab, var(--color-panna) 90%, transparent)"
                      : "var(--color-ink)",
                  }}
                >
                  {stat.label}
                </p>
                <p
                  className="tracking-caps-tight mt-2 text-[13px] uppercase"
                  style={{
                    color: stat.dark
                      ? "color-mix(in oklab, var(--color-panna) 55%, transparent)"
                      : "color-mix(in oklab, var(--color-ink) 65%, transparent)",
                  }}
                >
                  {stat.sub}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
