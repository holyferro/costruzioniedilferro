"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-brand text-panna relative overflow-hidden py-[100px]">
      {/* Decorative serif glyph */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-5 font-serif text-[380px] leading-none font-medium italic"
        style={{ color: "rgba(248,245,238,0.06)" }}
      >
        N
      </span>

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="grid items-center gap-20 md:grid-cols-[1fr_1.1fr]">
          {/* Left */}
          <div>
            <Eyebrow dark>Aggiornamenti in posta</Eyebrow>
            <h2 className="text-panna mt-5 max-w-[20ch] font-serif text-[clamp(1.875rem,1rem+2vw,2.75rem)] leading-[1.15] font-medium tracking-[-0.015em]">
              Un&apos;email al mese, <em className="text-panna/70 italic">solo cose costruite.</em>
            </h2>
            <p className="text-panna/80 mt-5 max-w-[44ch] text-base leading-[1.65]">
              Selezione dei cantieri appena conclusi, aggiornamenti normativi utili a committenti e
              progettisti. Niente promozioni.
            </p>
          </div>

          {/* Right — form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubmitted(true);
            }}
            className="flex flex-col gap-4"
          >
            {!submitted ? (
              <>
                <div
                  className="flex gap-0 rounded-full p-1.5 backdrop-blur-sm"
                  style={{
                    background: "rgba(248,245,238,0.08)",
                    border: "1px solid rgba(248,245,238,0.2)",
                  }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Il tuo indirizzo email"
                    className="text-panna placeholder:text-panna/50 min-w-0 flex-1 bg-transparent px-5 py-3.5 text-[15px] outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-panna text-brand rounded-full px-6 py-3.5 font-[family-name:var(--font-neue-montreal)] text-[13px] font-medium tracking-[0.06em] uppercase transition-opacity hover:opacity-90"
                  >
                    Iscriviti
                  </button>
                </div>
                <p className="text-panna/60 text-xs tracking-[0.02em]">
                  Iscrivendoti accetti la nostra{" "}
                  <a href="/privacy" className="text-panna/85 underline underline-offset-[3px]">
                    privacy policy
                  </a>
                  . Puoi disiscriverti con un click in fondo a ogni email.
                </p>
              </>
            ) : (
              <div
                className="rounded-xl p-7"
                style={{
                  background: "rgba(248,245,238,0.1)",
                  border: "1px solid rgba(248,245,238,0.2)",
                }}
              >
                <p className="font-serif text-xl italic">
                  Grazie. Controlla la tua casella per confermare l&apos;iscrizione.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
