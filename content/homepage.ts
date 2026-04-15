// content/homepage.ts
// Tutto il copy e i dati della homepage.
// Importato da app/page.tsx e passato come props alle sezioni.
// Nessun import esterno — puro TypeScript, no JSX, no React.

export type TrustMetric = {
  readonly value: string;
  readonly label: string;
};

export type ServiceCard = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly iconName: string; // nome icona Lucide — stringa, NON il componente
};

export type HomepageContent = {
  readonly hero: {
    readonly headline: string;
    readonly subheadline: string;
    readonly ctaLabel: string;
    readonly ctaHref: string;
    readonly imageSrc: string;
    readonly imageAlt: string;
  };
  readonly trustStrip: {
    readonly metrics: readonly TrustMetric[];
  };
  readonly services: {
    readonly sectionTitle: string;
    readonly sectionSubtitle: string;
    readonly cards: readonly ServiceCard[];
  };
  readonly serviceArea: {
    readonly sectionTitle: string;
    readonly body: string;
    readonly zones: readonly string[];
  };
  readonly finalCta: {
    readonly headline: string;
    readonly body: string;
    readonly ctaLabel: string;
    readonly ctaHref: string;
  };
};

export const homepageContent: HomepageContent = {
  hero: {
    headline: "Dal 1952 costruiamo valore, qualità e fiducia nel territorio.",
    subheadline:
      "General contractor per opere residenziali, industriali e di restauro nel Polesine e in tutto il Veneto. Certificati SOA e ISO 9001.",
    ctaLabel: "Richiedi un preventivo",
    ctaHref: "/contatti",
    imageSrc: "/images/cantieri/residenze-universitarie-rovigo/01.jpg",
    imageAlt: "Cantiere residenze universitarie Rovigo — Costruzioni Edilferro",
  },
  trustStrip: {
    metrics: [
      { value: "70+", label: "anni di esperienza" },
      { value: "450+", label: "cantieri completati" },
      { value: "35", label: "professionisti e maestranze" },
      { value: "3", label: "province servite" },
    ],
  },
  services: {
    sectionTitle: "Cosa realizziamo",
    sectionSubtitle:
      "Dal progetto alla consegna, un unico interlocutore per opere residenziali, industriali e di restauro.",
    cards: [
      {
        title: "Residenziale",
        description:
          "Nuove costruzioni, ristrutturazioni di pregio e soluzioni chiavi in mano per privati.",
        href: "/servizi#residenziale",
        iconName: "Building2",
      },
      {
        title: "Industriale e Commerciale",
        description: "Capannoni, strutture commerciali e manutenzioni programmate per aziende.",
        href: "/servizi#industriale",
        iconName: "Factory",
      },
      {
        title: "Restauri e Opere Pubbliche",
        description:
          "Recupero edilizio, restauro conservativo e appalti pubblici con attestazione SOA.",
        href: "/servizi#restauri",
        iconName: "Landmark",
      },
    ],
  },
  serviceArea: {
    sectionTitle: "Dove operiamo",
    body: "Costruzioni Edilferro opera principalmente nel Polesine e in tutto il Veneto, con cantieri attivi a Porto Viro, Rovigo e nei comuni limitrofi. Serviamo privati, enti pubblici e professionisti in un raggio esteso alle province di Ferrara e Padova per commesse di particolare dimensione.",
    zones: ["Porto Viro", "Rovigo", "Polesine", "Veneto", "Ferrara", "Padova"],
  },
  finalCta: {
    headline: "Affida il tuo progetto a un partner solido e qualificato.",
    body: "Dalla nuova costruzione al recupero di immobili complessi, Costruzioni Edilferro affianca privati, aziende ed enti con un approccio strutturato, trasparente e orientato al risultato.",
    ctaLabel: "Richiedi un preventivo",
    ctaHref: "/contatti",
  },
} as const;
