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
    name: "Edilferro", // TODO cliente: conferma short name
    legalName: "Edilferro S.r.l.", // TODO cliente: ragione sociale completa
    tagline:
      "45 anni di esperienza edile a Mestre e in tutto il Veneto — nuove costruzioni, ristrutturazioni e opere pubbliche.",
    claim: "Costruiamo da 45 anni sul territorio veneto.",
  },
  contact: {
    phone: {
      display: "+39 041 000 0000", // TODO cliente: telefono centralino reale
      tel: "+390410000000",
    },
    email: "info@edilferro.it", // TODO cliente: email commerciale reale
    pec: "edilferro@pec.it", // TODO cliente: PEC reale
    hours: ["Lun–Ven 8:30–18:00", "Sab su appuntamento"], // TODO cliente: orari reali
  },
  address: {
    street: "Via [placeholder]", // TODO cliente: via + numero civico
    zip: "30170", // TODO cliente: CAP sede legale
    city: "Mestre",
    province: "VE",
    region: "Veneto",
    country: "IT",
    googleMapsUrl:
      "https://maps.app.goo.gl/placeholder", // TODO cliente: URL maps definitivo (deve essere maps.app.goo.gl o simile — NON un embed iframe)
  },
  serviceArea: ["Mestre", "Venezia", "Provincia di Venezia", "Veneto"],
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
