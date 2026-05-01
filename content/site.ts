// content/site.ts
// Canonical NAP + brand strings. Used by Header, Footer, JSON-LD (Phase 7), forms (Phase 6).

export type SiteBrand = {
  readonly name: string;
  readonly legalName: string;
  readonly tagline: string;
  readonly claim: string;
};

export type SiteContact = {
  readonly phone: {
    readonly display: string; // "+39 041 000 0000"
    readonly tel: string; // "+39041000 0000"
  };
  readonly email: string;
  readonly pec: string;
  readonly hours: readonly string[];
};

export type SiteAddress = {
  readonly street: string;
  readonly zip: string;
  readonly city: string;
  readonly province: string;
  readonly region: string;
  readonly country: string;
  readonly googleMapsUrl: string;
};

export type SiteServiceArea = readonly string[];

export type SiteContent = {
  readonly brand: SiteBrand;
  readonly contact: SiteContact;
  readonly address: SiteAddress;
  readonly serviceArea: SiteServiceArea;
};

export const siteContent: SiteContent = {
  brand: {
    name: "Edilferro",
    legalName: "Costruzioni Edilferro S.r.l.",
    tagline:
      "Dal 1981 costruiamo valore, qualità e fiducia nel territorio. General contractor per opere residenziali, industriali e di restauro nel Polesine e in tutto il Veneto.",
    claim: "Dal 1981 costruiamo valore, qualità e fiducia nel territorio.",
  },
  contact: {
    phone: {
      display: "0426 633 875",
      tel: "+390426633875",
    },
    email: "info@costruzioniedilferro.com",
    pec: "costruzioniedilferro@pec-neispa.com",
    hours: ["Lun–Ven 8:30 - 12:30 e 14:30 - 18:30", "Sab su appuntamento"],
  },
  address: {
    street: "Via dei Salici 7/9",
    zip: "45014",
    city: "Porto Viro",
    province: "RO",
    region: "Veneto",
    country: "IT",
    googleMapsUrl: "https://maps.app.goo.gl/KxQ6vAzyqzhsbh1c7",
  },
  serviceArea: ["Porto Viro", "Rovigo", "Polesine", "Veneto"],
};

// Strings for 404 and error pages (so components never hardcode Italian copy — CLAUDE.md rule).
export const notFoundContent = {
  title: "Pagina non trovata",
  body: "La pagina che stai cercando non esiste o è stata spostata. Puoi tornare alla home oppure contattarci direttamente.",
  ctaHomeLabel: "Torna alla home",
  ctaContactLabel: "Contattaci",
} as const;

export const errorContent = {
  title: "Qualcosa è andato storto",
  body: "Si è verificato un errore imprevisto. Puoi riprovare oppure tornare alla home. Se il problema persiste, contattaci.",
  ctaRetryLabel: "Riprova",
  ctaHomeLabel: "Torna alla home",
} as const;
