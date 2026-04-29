import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";

type TeamMember = {
  photo: { src: string; alt: string };
  role: string;
  name: string;
  bio: string;
};

const team: TeamMember[] = [
  {
    photo: { src: "/images/azienda/team-marco.jpg", alt: "Marco Moretti" },
    role: "Amministratore Delegato",
    name: "Marco Moretti",
    bio: "Ingegnere strutturista, in azienda dal 2004. Responsabile della direzione lavori e delle relazioni con i committenti pubblici. Ha firmato oltre 280 cantieri.",
  },
  {
    photo: { src: "/images/azienda/team-luca.jpg", alt: "Luca Moretti" },
    role: "Direttore Tecnico",
    name: "Luca Moretti",
    bio: "Geometra specializzato in efficienza energetica e certificazione NZEB. Gestisce l'ufficio tecnico interno e coordina i rapporti con le stazioni appaltanti SOA.",
  },
  {
    photo: { src: "/images/azienda/team-roberto.jpg", alt: "Roberto Fabbri" },
    role: "Responsabile di Produzione",
    name: "Roberto Fabbri",
    bio: "Ventiquattro anni in cantiere, capomastro dal 1998. Coordina le squadre operative e risponde direttamente della qualità di ogni fase esecutiva.",
  },
];

export function AziendaTeam() {
  return (
    <section className="bg-panna border-border border-t py-24 md:py-[120px]">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-18 grid items-start gap-10 md:mb-[72px] md:grid-cols-[1fr_1.6fr] md:gap-20">
          <div>
            <Eyebrow>Le persone</Eyebrow>
            <h2 className="text-ink mt-5 max-w-[14ch] font-serif text-[clamp(1.875rem,0.8rem+2.2vw,2.875rem)] leading-[1.15] font-medium tracking-[-0.018em]">
              Un&apos;azienda familiare con struttura professionale.
            </h2>
          </div>
          <p className="text-ink/70 max-w-[54ch] pt-1.5 text-[17px] leading-[1.7]">
            La direzione è affidata alla seconda generazione della famiglia Moretti. Intorno a loro:
            un ufficio tecnico interno, un responsabile di produzione con vent&apos;anni di cantieri
            alle spalle e una squadra che conosce il mestiere senza bisogno di supervisione
            continua.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {team.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>

        <p className="border-border text-ink/50 mt-12 max-w-[70ch] border-t pt-7 text-sm leading-[1.65]">
          Le immagini di profilo sono placeholder istituzionali — le fotografie ufficiali del team
          sono in fase di produzione. I curricula completi sono disponibili su richiesta per
          stazioni appaltanti e committenti privati.
        </p>
      </div>
    </section>
  );
}

function TeamCard({ photo, role, name, bio }: TeamMember) {
  return (
    <div className="flex flex-col">
      <div className="border-border aspect-[3/4] overflow-hidden bg-[var(--color-border)]">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={400}
          height={533}
          className="h-full w-full object-cover saturate-[0.85] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
        />
      </div>
      <div className="border-border mt-[18px] border-t pt-[22px]">
        <p className="text-brand mb-2 text-[10px] font-semibold tracking-[0.22em] uppercase">
          {role}
        </p>
        <h3 className="text-ink mb-2.5 font-serif text-[22px] leading-tight font-medium tracking-[-0.01em]">
          {name}
        </h3>
        <p className="text-ink/60 text-sm leading-[1.65]">{bio}</p>
      </div>
    </div>
  );
}
