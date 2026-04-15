// components/layout/Footer.tsx
// Server Component. Reads from content/site.ts + content/legal.ts + content/navigation.ts.
// D-16 — 4 columns desktop, stack mobile. D-17 — zero client JS.

import type { Route } from "next";
import Link from "next/link";
import { siteContent } from "@/content/site";
import { legalContent } from "@/content/legal";
import { primaryNav, footerNav } from "@/content/navigation";

export function Footer() {
  const legaleGroup = footerNav.find((g) => g.title === "Legale");

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Col 1 — Identity */}
          <div>
            <p className="font-serif text-lg text-ink">{siteContent.brand.name}</p>
            <p className="mt-3 text-sm text-ink/70">{legalContent.ragioneSociale}</p>
            <p className="mt-4 text-sm text-ink/70">
              Opera in {siteContent.serviceArea.join(", ")}.
            </p>
          </div>

          {/* Col 2 — Sections */}
          <nav aria-label="Sezioni del sito">
            <h2 className="text-sm font-medium uppercase tracking-widest text-ink/60">
              Sezioni
            </h2>
            <ul className="mt-4 space-y-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href as Route<string>} className="text-sm text-ink/80 hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — Contacts */}
          <div>
            <h2 className="text-sm font-medium uppercase tracking-widest text-ink/60">
              Contatti
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-ink/80">
              <li>
                <a href={`tel:${siteContent.contact.phone.tel}`} className="hover:text-ink">
                  {siteContent.contact.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteContent.contact.email}`} className="hover:text-ink">
                  {siteContent.contact.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteContent.contact.pec}`} className="hover:text-ink">
                  PEC: {siteContent.contact.pec}
                </a>
              </li>
              {siteContent.contact.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Legal + certifications (FND-06, D.Lgs. 70/2003 art. 7) */}
          <div>
            <h2 className="text-sm font-medium uppercase tracking-widest text-ink/60">
              Dati legali
            </h2>
            <ul className="mt-4 space-y-1 text-xs text-ink/70">
              <li>
                {legalContent.sedeLegale.street}, {legalContent.sedeLegale.zip}{" "}
                {legalContent.sedeLegale.city} ({legalContent.sedeLegale.province})
              </li>
              <li>P.IVA {legalContent.piva}</li>
              <li>C.F. {legalContent.codiceFiscale}</li>
              <li>
                REA {legalContent.rea.number} — {legalContent.rea.chamber}
              </li>
              <li>
                Capitale sociale {legalContent.capitaleSociale.declared}{" "}
                ({legalContent.capitaleSociale.paidUp})
              </li>
            </ul>
            <div className="mt-6 flex gap-2 text-xs text-ink/60">
              <span className="rounded border border-border px-2 py-1">SOA</span>
              <span className="rounded border border-border px-2 py-1">ISO</span>
              {/* Real badge images land in Phase 5 */}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-xs text-ink/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {legalContent.ragioneSociale}. Tutti i diritti riservati.
          </p>
          {legaleGroup ? (
            <nav className="flex gap-4" aria-label="Note legali">
              {legaleGroup.items.map((item) => (
                <Link key={item.href} href={item.href as Route<string>} className="hover:text-ink">
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
