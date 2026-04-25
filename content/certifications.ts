// content/certifications.ts
// Dati per la pagina /certificazioni. Unica fonte di verità per copy e asset.

export type Certification = {
  id: string;
  category: "qualita" | "attestazione" | "affiliazione";
  name: string;
  issuer: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
  badgeLabel?: string; // etichetta colorata opzionale
};

export type SoaCategory = {
  code: string;
  description: string;
  classifica: string;
};

export const certificazioniContent = {
  hero: {
    eyebrow: "Qualità verificata",
    titleStart: "Certificazioni ",
    titleAccent: "e garanzie",
    titleEnd: " di qualità",
    subtitle:
      "Ogni nostro cantiere è coperto da certificazioni riconosciute a livello nazionale. Trasparenza e affidabilità documentate, non solo dichiarate.",
  },

  soa: {
    eyebrow: "Attestazione SOA",
    title: "Abilitati ai lavori pubblici",
    body: "L'attestazione SOA certifica la nostra idoneità a eseguire lavori pubblici per determinate categorie e classifiche. È il requisito indispensabile per partecipare agli appalti pubblici in Italia.",
    categories: [
      {
        code: "OG1",
        description: "Edifici civili e industriali",
        classifica: "IV",
      },
      {
        code: "OG2",
        description: "Restauro e manutenzione di beni immobili",
        classifica: "II",
      },
      {
        code: "OG3",
        description: "Strade, autostrade, ponti e viadotti",
        classifica: "II",
      },
    ] satisfies SoaCategory[],
  },

  certifications: [
    {
      id: "iso9001",
      category: "qualita",
      name: "ISO 9001:2015",
      issuer: "Kiwa Cermet — Accredia",
      description:
        "Sistema di gestione qualità certificato da Kiwa Cermet, ente accreditato Accredia. Garantisce processi standardizzati, controllo continuo e miglioramento sistematico su ogni commessa.",
      logoSrc: "/images/certifications/italia_Accredia-kiwa Cermet_blu 1.png",
      logoAlt: "Logo Kiwa Cermet Accredia — certificazione ISO 9001",
      badgeLabel: "ISO 9001",
    },
    {
      id: "cqop",
      category: "qualita",
      name: "CQOP",
      issuer: "Consorzio Qualità Opere Pubbliche",
      description:
        "Marchio di qualità riservato alle imprese che operano nel settore delle opere pubbliche con standard elevati di esecuzione e gestione del cantiere.",
      logoSrc: "/images/certifications/logo-cqop.png",
      logoAlt: "Logo CQOP — Consorzio Qualità Opere Pubbliche",
    },
    {
      id: "ance",
      category: "affiliazione",
      name: "ANCE Rovigo",
      issuer: "Associazione Nazionale Costruttori Edili",
      description:
        "Associati ad ANCE Rovigo, la principale organizzazione di categoria per le imprese edili. Accesso a formazione, aggiornamento normativo e rete professionale del settore.",
      logoSrc: "/images/certifications/ancerovigo 1.png",
      logoAlt: "Logo ANCE Rovigo",
    },
    {
      id: "castoro",
      category: "affiliazione",
      name: "Castoro",
      issuer: "Sistema di rating qualitativo",
      description:
        "Riconoscimento assegnato alle imprese edili che dimostrano continuità operativa, affidabilità finanziaria e qualità esecutiva nel tempo.",
      logoSrc: "/images/certifications/castoro 1.png",
      logoAlt: "Logo Castoro — rating imprese edili",
    },
    {
      id: "asp-energia",
      category: "affiliazione",
      name: "Socio Partner ASP Energia",
      issuer: "ASP Energia",
      description:
        "Partner certificato per interventi di efficienza energetica, installazione impianti e riqualificazione energetica degli edifici.",
      logoSrc: "/images/certifications/A.S.P.Energia certif. socio Partner 1.png",
      logoAlt: "Logo ASP Energia — socio partner",
    },
    {
      id: "cea",
      category: "affiliazione",
      name: "Bollino CEA 2023",
      issuer: "CEA",
      description:
        "Bollino di qualità assegnato per l'anno 2023, attestante il rispetto degli standard CEA per le imprese edili associate.",
      logoSrc: "/images/certifications/Bollino_CEA2023.png",
      logoAlt: "Bollino CEA 2023",
    },
  ] satisfies Certification[],

  finalCta: {
    eyebrow: "Lavoriamo insieme",
    headline: "Qualità certificata al tuo servizio",
    body: "Contattaci per un sopralluogo gratuito. Portiamo su ogni cantiere lo stesso rigore che le nostre certificazioni documentano.",
    primaryCta: { label: "Richiedi un sopralluogo", href: "/contatti" },
    secondaryCta: { label: "Scopri i servizi", href: "/servizi" },
  },
};
