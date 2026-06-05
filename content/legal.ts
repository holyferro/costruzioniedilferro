// content/legal.ts
// D.Lgs. 70/2003 art. 7 compliance. Rendered in footer on every route.
// All fields ship with placeholders; substitute real values in a dedicated commit when client delivers (see D-18/D-19).

export type LegalContent = {
  readonly ragioneSociale: string;
  readonly piva: string;
  readonly codiceFiscale: string;
  readonly rea: {
    readonly number: string;
    readonly chamber: string;
  };
  readonly sedeLegale: {
    readonly street: string;
    readonly zip: string;
    readonly city: string;
    readonly province: string;
  };
  readonly sedeOperativa?: {
    readonly street: string;
    readonly zip: string;
    readonly city: string;
    readonly province: string;
  };
  readonly certifications: {
    readonly soa: {
      readonly categories: readonly string[];
      readonly expiration: string;
    };
    readonly iso: {
      readonly standard: string;
      readonly issuer: string;
      readonly expiration: string;
    };
  };
};

export const legalContent: LegalContent = {
  ragioneSociale: "Costruzioni Edilferro S.r.l.",
  piva: "00580810299",
  codiceFiscale: "00580810299",
  rea: {
    number: "RO-85037",
    chamber: "CCIAA Venezia Rovigo",
  },
  sedeLegale: {
    street: "Via dei Salici 7",
    zip: "45014",
    city: "Porto Viro",
    province: "RO",
  },
  certifications: {
    soa: {
      categories: ["OG1", "OG3"], // TODO cliente: categorie SOA reali
      expiration: "2027-06-30", // TODO cliente: data scadenza attestazione
    },
    iso: {
      standard: "ISO 9001:2015",
      issuer: "[Ente Certificatore]", // TODO cliente: ente certificatore
      expiration: "2027-06-30", // TODO cliente: scadenza certificato
    },
  },
};
