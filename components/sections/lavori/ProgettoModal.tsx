"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* ---- Types ---- */
export type ProjectRow = [string, string];

export type Project = {
  imgs: string[];
  tag: string;
  year: string;
  title: string;
  place: string;
  desc: string;
  rows: ProjectRow[];
};

/* ---- Data ---- */
export const PROJECTS: Record<string, Project> = {
  "studentato-universitario": {
    imgs: [
      "/images/cantieri/studentato rovigo/2021-04-02_08-49-18_099.webp",
      "/images/cantieri/studentato rovigo/2021-04-02_08-46-36_360.webp",
      "/images/cantieri/studentato rovigo/WhatsApp Image 2020-10-21 at 17.47.42.webp",
    ],
    tag: "Residenziale",
    year: "2024",
    title: "Studentato Universitario",
    place: "Rovigo",
    desc: "Dispone di 100 posti letto, con alloggi temporanei da destinare agli studenti fuori sede, distribuiti in tre corpi di fabbrica ognuno di due piani. Gli edifici, di nuova costruzione e moderna progettazione, sono articolati in modo da creare tra loro aree verdi esterne vivibili.",
    rows: [
      ["Committente", "Privato (su autorizzazione)"],
      ["Posti letto", "100"],
      ["Corpi di fabbrica", "3 × 2 piani"],
      ["Classe energetica", "A"],
      ["Consegna", "2024"],
    ],
  },
  "residenze-le-corti": {
    imgs: [
      "/images/design/proj-corti.webp",
      "/images/design/img-residenziale.webp",
      "/images/cantieri/casa-passiva-porto-viro/03.webp",
    ],
    tag: "Residenziale",
    year: "2024",
    title: "Residenze Le Corti",
    place: "Rovigo (RO)",
    desc: "18 unità residenziali in classe energetica A, su lotto di 4.200 mq. Struttura in calcestruzzo armato con progettazione antisismica, cappotto termico in fibra di legno, domotica di serie in ogni appartamento. Cantiere consegnato con tre settimane di anticipo rispetto ai termini contrattuali.",
    rows: [
      ["Committente", "Privato (su autorizzazione)"],
      ["Importo lavori", "€ 3.200.000"],
      ["Durata cantiere", "18 mesi"],
      ["Classe energetica", "A · NZEB"],
      ["Consegna", "Anticipata — marzo 2024"],
    ],
  },
  "casa-passiva": {
    imgs: [
      "/images/design/proj-passiva.webp",
      "/images/cantieri/casa-passiva-porto-viro/03.webp",
      "/images/design/img-residenziale.webp",
    ],
    tag: "Residenziale",
    year: "2024",
    title: "Casa passiva privata",
    place: "Adria (RO)",
    desc: "Abitazione unifamiliare progettata secondo lo standard Passivhaus. Serramenti triple camera, VMC con recupero di calore, fotovoltaico da 9 kWp integrato in copertura. Consumo energetico annuo inferiore a 15 kWh/m².",
    rows: [
      ["Committente", "Privato"],
      ["Superficie utile", "210 m²"],
      ["Standard", "Passivhaus — Classe A+"],
      ["Impianto FV", "9 kWp"],
      ["Consegna", "Giugno 2024"],
    ],
  },
  "abbazia-villaregia": {
    imgs: [
      "/images/design/proj-villaregia.webp",
      "/images/design/img-pubblico.webp",
      "/images/design/proj-casa-cura.webp",
    ],
    tag: "Restauro",
    year: "2023",
    title: "Abbazia di Villaregia",
    place: "Porto Viro (RO)",
    desc: "Recupero conservativo di un complesso abbaziale del XVII secolo, sottoposto a vincolo della Soprintendenza. Intervento di consolidamento strutturale, risanamento murature in mattone a vista, ripristino coperture con coppi di recupero. Opera pubblica aggiudicata con procedura aperta.",
    rows: [
      ["Committente", "Comune di Porto Viro"],
      ["Importo lavori", "€ 1.480.000"],
      ["Categoria SOA", "OG2 — Restauro beni vincolati"],
      ["Durata cantiere", "14 mesi"],
      ["Consegna", "Novembre 2023"],
    ],
  },
  "stabilimento-produttivo": {
    imgs: [
      "/images/design/img-industriale.webp",
      "/images/cantieri/efficientamento-energetico/01.webp",
      "/images/design/proj-corti.webp",
    ],
    tag: "Industriale",
    year: "2023",
    title: "Stabilimento produttivo",
    place: "Polesine",
    desc: "Capannone industriale su area di 8.500 mq, struttura prefabbricata in c.a. con tamponamenti sandwich. Uffici direzionali integrati su due livelli, impianto fotovoltaico da 200 kWp in copertura. Cantiere attivo senza interruzione dell'attività produttiva preesistente.",
    rows: [
      ["Committente", "Azienda privata"],
      ["Superficie", "8.500 m²"],
      ["Struttura", "Prefabbricato c.a."],
      ["Impianto FV", "200 kWp"],
      ["Consegna", "Settembre 2023"],
    ],
  },
  "casa-di-cura": {
    imgs: [
      "/images/design/proj-casa-cura.webp",
      "/images/design/img-pubblico.webp",
      "/images/design/proj-villaregia.webp",
    ],
    tag: "Opere pubbliche",
    year: "2022",
    title: "Ampliamento casa di cura",
    place: "Rovigo",
    desc: "Ampliamento di struttura sanitaria accreditata con aggiunta di un nuovo corpo edilizio da 42 posti letto. Progettazione strutturale antisismica, impianti medicali, sistemi di compartimentazione antincendio certificati. Cantiere coordinato con l'attività clinica in essere.",
    rows: [
      ["Committente", "ASL Rovigo"],
      ["Importo lavori", "€ 2.750.000"],
      ["Nuovi posti letto", "42"],
      ["Categoria SOA", "OG1 classifica IV"],
      ["Consegna", "Maggio 2022"],
    ],
  },
  "restauro-palazzo": {
    imgs: [
      "/images/design/img-pubblico.webp",
      "/images/design/proj-villaregia.webp",
      "/images/design/proj-casa-cura.webp",
    ],
    tag: "Restauro",
    year: "2022",
    title: "Restauro palazzo storico",
    place: "Adria (RO)",
    desc: "Restauro e risanamento conservativo di palazzo ottocentesco nel centro storico di Adria. Consolidamento fondazioni, restauro facciate in intonaco a calce, sostituzione solai lignei, adeguamento sismico con inserimento di tiranti metallici. Supervisione Soprintendenza ai Beni Architettonici.",
    rows: [
      ["Committente", "Privato"],
      ["Importo lavori", "€ 890.000"],
      ["Vincolo", "Soprintendenza ABAP"],
      ["Tecnica", "Consolidamento + restauro"],
      ["Consegna", "Marzo 2022"],
    ],
  },
  efficientamento: {
    imgs: [
      "/images/cantieri/efficientamento-energetico/01.webp",
      "/images/design/img-residenziale.webp",
      "/images/cantieri/casa-passiva-porto-viro/03.webp",
    ],
    tag: "Efficientamento",
    year: "2024",
    title: "Riqualificazione condominio",
    place: "Rovigo",
    desc: "Intervento di efficientamento energetico su condominio anni '80 da 24 unità. Cappotto termico in EPS grafitato, sostituzione serramenti, rifacimento copertura con pannelli fotovoltaici condominiali da 36 kWp. Passaggio da classe G a classe B. Gestione iter Superbonus completa.",
    rows: [
      ["Committente", "Condominio privato"],
      ["Unità abitative", "24"],
      ["Risparmio energetico", "~68%"],
      ["Agevolazione", "Superbonus 110%"],
      ["Consegna", "Gennaio 2024"],
    ],
  },
  "villetta-bifamiliare": {
    imgs: [
      "/images/cantieri/casa-passiva-porto-viro/03.webp",
      "/images/design/proj-passiva.webp",
      "/images/design/img-residenziale.webp",
    ],
    tag: "Residenziale",
    year: "2023",
    title: "Villetta bifamiliare",
    place: "Porto Viro (RO)",
    desc: "Nuova costruzione bifamiliare in classe A su lotto privato. Struttura in muratura portante con cordoli in c.a., isolamento a cappotto, pompa di calore aria-acqua con underfloor heating, predisposizione per colonnina EV. Finiture personalizzate su capitolato con il committente.",
    rows: [
      ["Committente", "Privato"],
      ["Superficie utile", "2 × 165 m²"],
      ["Riscaldamento", "Pompa di calore + pavimento radiante"],
      ["Classe energetica", "A"],
      ["Consegna", "Ottobre 2023"],
    ],
  },
};

/* ---- Carousel hook ---- */
export function useCarousel(imgs: string[]) {
  const [idx, setIdx] = useState(0);

  const goTo = useCallback(
    (i: number) => setIdx(((i % imgs.length) + imgs.length) % imgs.length),
    [imgs.length],
  );
  const prev = useCallback(() => goTo(idx - 1), [idx, goTo]);
  const next = useCallback(() => goTo(idx + 1), [idx, goTo]);

  return { idx, goTo, prev, next };
}

/* ---- Modal ---- */
export function ProgettoModal({
  projectKey,
  onClose,
}: {
  projectKey: string | null;
  onClose: () => void;
}) {
  const project = projectKey ? PROJECTS[projectKey] : null;
  const { idx, goTo, prev, next } = useCarousel(project?.imgs ?? []);

  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [project, onClose, prev, next]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const isOpen = !!project;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-10"
      style={{
        background: isOpen ? "rgba(10,14,26,0.87)" : "rgba(10,14,26,0)",
        pointerEvents: isOpen ? "all" : "none",
        transition: "background 380ms ease",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Scheda progetto"
    >
      <div
        className="bg-panna grid max-h-[90svh] w-full grid-cols-1 overflow-x-hidden overflow-y-auto md:h-[78vh] md:max-h-[78vh] md:grid-cols-[1.2fr_1fr] md:overflow-hidden"
        style={{
          maxWidth: 1200,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.93) translateY(24px)",
          transition:
            "opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Left — carousel */}
        <div className="relative flex h-[68vw] flex-col overflow-hidden bg-black md:h-auto md:min-h-0">
          <div
            className="pointer-events-none absolute inset-0 z-[4]"
            style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55))" }}
          />

          {project && (
            <span className="absolute top-[22px] left-[22px] z-[6] rounded-full border border-white/25 bg-white/18 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-[8px]">
              {project.tag}
            </span>
          )}

          {project && (
            <span className="absolute bottom-[82px] left-6 z-[6] font-serif text-[15px] text-white/85 italic">
              {project.year}
            </span>
          )}

          <button
            onClick={onClose}
            aria-label="Chiudi"
            className="absolute top-[18px] right-[18px] z-10 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/25 bg-white/15 text-[17px] text-white backdrop-blur-[6px] transition-colors hover:bg-white/30"
          >
            ✕
          </button>

          <div className="relative min-h-0 flex-1 overflow-hidden bg-black">
            {project?.imgs.map((src, i) => (
              <div
                key={src}
                className="absolute inset-0"
                style={{
                  opacity: i === idx ? 1 : 0,
                  transform: i === idx ? "scale(1)" : "scale(1.04)",
                  transition:
                    "opacity 420ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)",
                  pointerEvents: i === idx ? "auto" : "none",
                }}
              >
                <Image
                  src={src}
                  alt={`Foto ${i + 1}`}
                  fill
                  quality={92}
                  className="object-cover"
                  sizes="(min-width: 768px) 660px, 100vw"
                />
              </div>
            ))}

            <button
              onClick={prev}
              aria-label="Foto precedente"
              className="absolute top-1/2 left-3.5 z-[5] flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/16 text-base text-white backdrop-blur-[6px] transition-colors hover:bg-white/30"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Foto successiva"
              className="absolute top-1/2 right-3.5 z-[5] flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/16 text-base text-white backdrop-blur-[6px] transition-colors hover:bg-white/30"
            >
              ›
            </button>

            <div className="absolute bottom-[80px] left-1/2 z-[5] flex -translate-x-1/2 gap-1.5">
              {project?.imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Foto ${i + 1}`}
                  style={{
                    width: i === idx ? 20 : 6,
                    height: 6,
                    borderRadius: 9999,
                    background: i === idx ? "#fff" : "rgba(255,255,255,0.4)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "background 200ms, width 200ms",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex h-[72px] w-full flex-shrink-0 gap-[3px] bg-black">
            {project?.imgs.map((src, i) => (
              <button
                key={src}
                onClick={() => goTo(i)}
                className="relative min-w-0 flex-1 overflow-hidden border-2 transition-opacity"
                style={{
                  opacity: i === idx ? 1 : 0.5,
                  borderColor: i === idx ? "var(--color-brand)" : "transparent",
                }}
                aria-label={`Vai a foto ${i + 1}`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="120px" />
              </button>
            ))}
          </div>
        </div>

        {/* Right — content */}
        {project && (
          <div className="bg-panna flex flex-col overflow-y-auto px-5 py-8 pb-10 md:min-h-0 md:px-[52px] md:py-[52px] md:pb-12">
            <p className="text-brand mb-5 flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] uppercase">
              <span aria-hidden="true" className="bg-brand inline-block h-px w-6" />
              {project.tag}
            </p>
            <h2
              className="text-ink mb-3 font-serif leading-[1.15] font-medium tracking-[-0.015em]"
              style={{ fontSize: "clamp(1.625rem, 0.8rem + 1.8vw, 2.375rem)" }}
            >
              {project.title}
            </h2>
            <p className="text-ink/50 mb-8 text-xs tracking-[0.2em] uppercase">{project.place}</p>
            <p className="text-ink/70 mb-9 text-[15px] leading-[1.7]" style={{ maxWidth: "46ch" }}>
              {project.desc}
            </p>

            <div>
              {project.rows.map(([label, value], i) => (
                <div
                  key={i}
                  className="border-border flex items-baseline justify-between border-t py-3"
                  style={
                    i === project.rows.length - 1
                      ? { borderBottom: "1px solid var(--color-border)" }
                      : {}
                  }
                >
                  <span className="text-ink/50 text-[11px] font-semibold tracking-[0.18em] uppercase">
                    {label}
                  </span>
                  <span className="text-ink text-right font-serif text-base">{value}</span>
                </div>
              ))}
            </div>

            <a
              href="/contatti#form"
              className="bg-brand text-panna mt-9 inline-flex items-center gap-3 self-start rounded-full px-6 py-[15px] font-[family-name:var(--font-neue-montreal)] text-[13px] font-medium tracking-[0.06em] uppercase transition-colors hover:bg-[#1a1a6b]"
            >
              Richiedi un preventivo simile →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
