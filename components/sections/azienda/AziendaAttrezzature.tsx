import { FadeUp } from "@/components/ui/FadeUp";

type MezzoCard = {
  numero: string;
  suffisso?: string;
  label: string;
  sottotitolo: string;
  variante?: "scuro" | "brand";
  icona: React.ReactNode;
};

const mezzi: MezzoCard[] = [
  {
    numero: "2",
    label: "Gru da cantiere",
    sottotitolo: "Sollevamento",
    icona: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <line x1="10" y1="28" x2="10" y2="6" stroke="#0A2A6B" strokeWidth="1.5" />
        <line x1="10" y1="6" x2="26" y2="6" stroke="#0A2A6B" strokeWidth="1.5" />
        <line
          x1="26"
          y1="6"
          x2="26"
          y2="14"
          stroke="#0A2A6B"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        <line x1="10" y1="10" x2="4" y2="20" stroke="#0A2A6B" strokeWidth="1.5" />
        <circle cx="26" cy="17" r="3" stroke="#0A2A6B" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    numero: "4",
    label: "Escavatori",
    sottotitolo: "Movimento terra",
    icona: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="2" y="18" width="20" height="8" rx="1" stroke="#0A2A6B" strokeWidth="1.5" />
        <circle cx="6" cy="26" r="3" stroke="#0A2A6B" strokeWidth="1.5" />
        <circle cx="18" cy="26" r="3" stroke="#0A2A6B" strokeWidth="1.5" />
        <polyline
          points="22,20 22,12 28,8 30,14"
          stroke="#0A2A6B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    numero: "3",
    label: "Miniescavatori",
    sottotitolo: "Centri storici · aree strette",
    variante: "brand",
    icona: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect
          x="4"
          y="20"
          width="14"
          height="6"
          rx="1"
          stroke="rgba(248,245,238,0.9)"
          strokeWidth="1.5"
        />
        <circle cx="7" cy="26" r="2.5" stroke="rgba(248,245,238,0.9)" strokeWidth="1.5" />
        <circle cx="15" cy="26" r="2.5" stroke="rgba(248,245,238,0.9)" strokeWidth="1.5" />
        <polyline
          points="18,22 20,14 26,10 28,16"
          stroke="rgba(248,245,238,0.9)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    numero: "3",
    label: "Muletti",
    sottotitolo: "Sollevamento materiali",
    icona: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="2" y="14" width="16" height="12" rx="1" stroke="#0A2A6B" strokeWidth="1.5" />
        <line x1="18" y1="20" x2="28" y2="20" stroke="#0A2A6B" strokeWidth="1.5" />
        <line x1="22" y1="8" x2="22" y2="20" stroke="#0A2A6B" strokeWidth="1.5" />
        <line x1="18" y1="8" x2="26" y2="8" stroke="#0A2A6B" strokeWidth="1.5" />
        <circle cx="6" cy="26" r="2.5" stroke="#0A2A6B" strokeWidth="1.5" />
        <circle cx="14" cy="26" r="2.5" stroke="#0A2A6B" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    numero: "6",
    label: "Autocarri",
    sottotitolo: "Trasporto e logistica",
    icona: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="2" y="14" width="18" height="10" rx="1" stroke="#0A2A6B" strokeWidth="1.5" />
        <polyline
          points="20,18 20,14 26,10 30,10 30,24 20,24"
          stroke="#0A2A6B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="7" cy="24" r="3" stroke="#0A2A6B" strokeWidth="1.5" />
        <circle cx="25" cy="24" r="3" stroke="#0A2A6B" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    numero: "12",
    suffisso: "+",
    label: "Macchine operative",
    sottotitolo: "Compressori · pompe · ecc.",
    icona: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="10" width="24" height="14" rx="2" stroke="#0A2A6B" strokeWidth="1.5" />
        <circle cx="10" cy="17" r="3" stroke="#0A2A6B" strokeWidth="1.5" />
        <line x1="16" y1="13" x2="16" y2="21" stroke="#0A2A6B" strokeWidth="1.5" />
        <line x1="20" y1="13" x2="20" y2="21" stroke="#0A2A6B" strokeWidth="1.5" />
        <line x1="4" y1="27" x2="28" y2="27" stroke="#0A2A6B" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export function AziendaAttrezzature() {
  return (
    <section
      className="relative overflow-hidden py-[120px]"
      style={{ background: "#1a1a1a", color: "#f8f5ee" }}
    >
      {/* texture di sfondo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dots-attrezzature"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1" fill="rgba(255,255,255,0.04)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-attrezzature)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
        {/* intestazione */}
        <div className="mb-20 grid items-end gap-10 md:grid-cols-[1fr_1.5fr] md:gap-20">
          <div>
            <p
              className="text-[10px] font-semibold tracking-[0.28em] uppercase"
              style={{ color: "rgba(248,245,238,0.4)" }}
            >
              Attrezzature
            </p>
            <h2
              className="mt-5 font-serif leading-[1.1] font-medium tracking-[-0.02em]"
              style={{
                fontSize: "clamp(2rem, 0.8rem + 2.4vw, 3.125rem)",
                color: "#fff",
                maxWidth: "18ch",
              }}
            >
              Mezzi avanzati, impatto ridotto.
            </h2>
          </div>
          <p
            className="text-[17px] leading-[1.75]"
            style={{ color: "rgba(248,245,238,0.7)", maxWidth: "56ch", paddingBottom: "4px" }}
          >
            Mezzi d&apos;opera costantemente aggiornati e tecnologicamente avanzati, attrezzatura
            meccanica a basso impatto ambientale e fonometrico — accanto a manodopera specializzata
            — rendono possibile l&apos;esecuzione di lavori all&apos;interno di aree urbane e centri
            storici come su aree libere.
          </p>
        </div>

        {/* griglia contatori mezzi */}
        <FadeUp>
          <div
            className="mb-px grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6"
            style={{ background: "rgba(248,245,238,0.08)" }}
          >
            {mezzi.map((mezzo) => (
              <CardMezzo key={mezzo.label} {...mezzo} />
            ))}
          </div>
        </FadeUp>

        {/* nota basso impatto */}
        <div
          className="flex flex-wrap items-center gap-10 px-10 py-8"
          style={{
            background: "rgba(248,245,238,0.04)",
            border: "1px solid rgba(248,245,238,0.08)",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
            style={{ opacity: 0.6 }}
          >
            <circle cx="12" cy="12" r="10" stroke="#0A2A6B" strokeWidth="1.5" />
            <path
              d="M8 14s1.5 2 4 2 4-2 4-2"
              stroke="#0A2A6B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="9" cy="10" r="1" fill="#0A2A6B" />
            <circle cx="15" cy="10" r="1" fill="#0A2A6B" />
          </svg>
          <p
            className="text-sm leading-[1.7]"
            style={{ color: "rgba(248,245,238,0.6)", maxWidth: "80ch" }}
          >
            Tutta la flotta è soggetta a manutenzione programmata e rispetta i limiti fonometrici
            previsti dal D.Lgs. 262/2002. I mezzi di nuova generazione adottano motori Stage V a
            basse emissioni, compatibili con le restrizioni delle Zone a Traffico Limitato nei
            centri storici.
          </p>
        </div>
      </div>
    </section>
  );
}

function CardMezzo({ numero, suffisso, label, sottotitolo, variante = "scuro", icona }: MezzoCard) {
  const bg = variante === "brand" ? "#0A2A6B" : "#111111";
  const labelColor = variante === "brand" ? "rgba(248,245,238,0.9)" : "rgba(248,245,238,0.8)";
  const subColor = variante === "brand" ? "rgba(248,245,238,0.55)" : "rgba(248,245,238,0.35)";
  const iconOpacity = variante === "brand" ? 0.7 : 0.55;

  return (
    <div className="flex flex-col gap-3 px-8 py-11" style={{ background: bg }}>
      <span style={{ opacity: iconOpacity }}>{icona}</span>
      <span
        className="font-serif leading-none font-medium tracking-[-0.04em]"
        style={{ fontSize: "56px", color: "#fff" }}
      >
        {numero}
        {suffisso && <span style={{ fontSize: "32px" }}>{suffisso}</span>}
      </span>
      <span className="font-serif text-base italic" style={{ color: labelColor }}>
        {label}
      </span>
      <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: subColor }}>
        {sottotitolo}
      </span>
    </div>
  );
}
