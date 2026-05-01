import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

type CertCard = {
  logo: { src: string; alt: string };
  logo2?: { src: string; alt: string; className?: string };
  title: string;
  body: string;
};

const certs: CertCard[] = [
  {
    logo: { src: "/images/azienda/cert-cqop.png", alt: "CQOP SOA" },
    title: "SOA OG1 · OG2 · OG3 · OG11 — fino alla Classe VI",
    body: "Attestazione SOA rilasciata da CQOP S.p.A. (organismo vigilato da ANAC). OG1 Classe VI, OG2 Classe IV-bis, OG3 Classe III-bis, OG11 Classe III. Attestazione n. 74915/10/00, valida fino al 2028.",
  },
  {
    logo: {
      src: "/images/certifications/castoro 1.webp",
      alt: "Logo Castoro — rating imprese edili",
    },
    logo2: {
      src: "/images/certifications/italia_Accredia-kiwa Cermet_blu 1.webp",
      alt: "Logo Kiwa Cermet accreditato Accredia",
      className: "h-[130%] w-auto object-contain object-left",
    },
    title: "ISO 9001:2015 e ISO 14001:2015 — Kiwa Cermet",
    body: "Sistemi di gestione qualità e ambientale certificati da Kiwa Cermet, accreditato Accredia. Coprono tutte le attività di costruzione e ristrutturazione di edifici civili. Audit di sorveglianza annuale.",
  },
  {
    logo: { src: "/images/certifications/Bollino_CEA2023.webp", alt: "Cassa Edile Awards 2023" },
    title: "Cassa Edile Awards 2023",
    body: "Riconoscimento della Cassa Edile Interprovinciale del Veneto nelle categorie Top Player Impresa e Dream Team, per correttezza, affidabilità, sicurezza sul lavoro e continuità occupazionale.",
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
              <div className="flex h-16 items-center gap-4">
                <Image
                  src={cert.logo.src}
                  alt={cert.logo.alt}
                  width={180}
                  height={64}
                  className="max-h-16 w-auto max-w-[120px] object-contain"
                />
                {cert.logo2 && (
                  <Image
                    src={cert.logo2.src}
                    alt={cert.logo2.alt}
                    width={180}
                    height={64}
                    className={
                      cert.logo2.className ?? "max-h-16 w-auto max-w-[120px] object-contain"
                    }
                  />
                )}
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
