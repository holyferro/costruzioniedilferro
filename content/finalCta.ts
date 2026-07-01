// content/finalCta.ts
// Contenuto condiviso della sezione contatti (HomepageCta): eyebrow e i due CTA
// sono identici su tutte le pagine. Headline/body restano specifici per pagina.

export const defaultFinalCta = {
  eyebrow: "Lavoriamo insieme",
  primaryCta: { label: "Richiedi un sopralluogo", href: "/contatti" },
  secondaryCta: { label: "Guarda i nostri lavori", href: "/realizzazioni" },
} as const;
