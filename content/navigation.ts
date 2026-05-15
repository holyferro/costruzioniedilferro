// content/navigation.ts
// Header + footer link structure. Single source of truth so both components stay in sync.

export type NavLink = {
  readonly href: string;
  readonly label: string;
};

export type NavGroup = {
  readonly title: string;
  readonly items: readonly NavLink[];
};

export const primaryNav: readonly NavLink[] = [
  { href: "/servizi", label: "Servizi" },
  { href: "/progetti", label: "Realizzazioni" },
  { href: "/certificazioni", label: "Certificazioni" },
  { href: "/azienda", label: "L'Azienda" },
  { href: "/news", label: "News" },
  { href: "/contatti", label: "Contattaci" },
];

export const primaryCta: NavLink = {
  href: "/contatti",
  label: "Richiedi un preventivo",
};

export const footerNav: readonly NavGroup[] = [
  {
    title: "Sezioni",
    items: primaryNav,
  },
  {
    title: "Legale",
    items: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/cookie-policy", label: "Cookie policy" },
    ],
  },
];
