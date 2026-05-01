import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

type CertCard = {
  logo: { src: string; alt: string };
  title: string;
  body: string;
};

const certs: CertCard[] = [
  {
    logo: { src: "/images/azienda/cert-cqop.png", alt: "CQOP SOA" },
    title: "SOA OG1 · OG2 · OG3 · OG11 — Classifica IV",
    body: "Qualificazione per appalti pubblici rilasciata da CQOP S.p.A., organismo vigilato da ANAC. Copre edifici civili, restauro conservativo e opere stradali fino a €5.165.000.",
  },
  {
    logo: { src: "/images/azienda/cert-accredia.png", alt: "Accredia · Kiwa Cermet ISO 9001" },
    title: "ISO 9001:2015 — Kiwa Cermet",
    body: "Sistema di gestione qualità certificato e sottoposto ad audit annuale. Copre tutti i processi aziendali dalla progettazione alla consegna. Accreditamento Accredia, riconoscimento europeo.",
  },
  {
    logo: { src: "/images/azienda/cert-cassa-edile.png", alt: "Cassa Edile Awards 2023" },
    title: "Cassa Edile Awards 2023",
    body: "Riconoscimento assegnato dalla Cassa Edile di Rovigo per regolarità contributiva, sicurezza sul lavoro e continuità occupazionale. Rinnovato ogni anno senza interruzioni dal 2018.",
  },
];

export function AziendaCertificazioni() {
  return (
    <section className="border-border border-t bg-white py-[100px]">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-10">
          <div>
            <Eyebrow>Certificazioni e qualifiche</Eyebrow>
            <h2 className="text-ink mt-5 max-w-[22ch] font-serif text-[clamp(1.75rem,0.6rem+2vw,2.625rem)] leading-[1.15] font-medium tracking-[-0.015em]">
              Qualificati da terzi. Verificabili da chiunque.
            </h2>
          </div>
          <Link
            href="/certificazioni"
            className="text-brand border-brand border-b pb-1.5 font-[family-name:var(--font-neue-montreal)] text-[13px] tracking-[0.08em] uppercase no-underline"
          >
            Tutte le certificazioni →
          </Link>
        </div>

        <div className="border-border grid grid-cols-1 gap-px bg-[var(--color-border)] md:grid-cols-3">
          {certs.map((cert) => (
            <div key={cert.title} className="flex flex-col gap-5 bg-white px-10 py-11">
              <div className="flex h-16 items-center">
                <Image
                  src={cert.logo.src}
                  alt={cert.logo.alt}
                  width={180}
                  height={64}
                  className="max-h-16 w-auto max-w-[180px] object-contain"
                />
              </div>
              <h3 className="text-ink font-serif text-[19px] leading-[1.3] font-medium tracking-[-0.01em]">
                {cert.title}
              </h3>
              <p className="text-ink/60 text-sm leading-[1.65]">{cert.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
