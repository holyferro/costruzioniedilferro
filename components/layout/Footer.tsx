// components/layout/Footer.tsx
// Server Component. Black background, white text.
// Layout: main 4-col grid + rotated phone strip on desktop.

import Image from "next/image";
import { siteContent } from "@/content/site";
import { legalContent } from "@/content/legal";
import { primaryNav, footerNav } from "@/content/navigation";
import { FooterLink } from "@/components/layout/FooterLink";

export function Footer() {
  const legaleGroup = footerNav.find((g) => g.title === "Legale");

  return (
    <footer className="border-brand border-t-2 bg-black text-white">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 lg:py-10">
        {/* Main area: content + rotated phone strip */}
        <div className="flex gap-8">
          {/* Content grid */}
          <div className="grid flex-1 grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
            {/* Col 1 — Identity */}
            <div>
              <div className="flex items-center gap-5">
                <Image
                  src="/images/portfolio/icon-edilferro-white.svg"
                  alt="Icona Costruzioni Edilferro"
                  width={32}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
                <p className="font-serif text-sm leading-tight font-medium">
                  Costruzioni
                  <br />
                  Edilferro S.r.l.
                </p>
              </div>
              <p className="mt-3 text-xs text-white/60">{legalContent.ragioneSociale}</p>
              <p className="mt-1 text-xs text-white/60">
                Opera in {siteContent.serviceArea.join(", ")}.
              </p>

              {/* Social links */}
              <div className="mt-3 flex items-center gap-4 lg:mt-5">
                <a
                  href="https://www.facebook.com/costruzioniedilferro.it/"
                  aria-label="Facebook"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2 — Sections */}
            <nav aria-label="Sezioni del sito">
              <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
                Sezioni
              </h2>
              <ul className="mt-2 space-y-1.5 lg:mt-3 lg:space-y-2">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <FooterLink
                      href={item.href}
                      label={item.label}
                      className="text-sm text-white/70"
                      iconSize={15}
                    />
                  </li>
                ))}
              </ul>
            </nav>

            {/* Col 3 — Contacts */}
            <div>
              <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
                Contatti
              </h2>
              <ul className="mt-2 space-y-1.5 text-xs text-white/70 lg:mt-3 lg:space-y-2 lg:text-sm">
                <li>
                  <a href={`tel:${siteContent.contact.phone.tel}`} className="hover:text-white">
                    {siteContent.contact.phone.display}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteContent.contact.email}`} className="hover:text-white">
                    {siteContent.contact.email}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteContent.contact.pec}`} className="hover:text-white">
                    PEC: {siteContent.contact.pec}
                  </a>
                </li>
                {siteContent.contact.hours.map((line) => (
                  <li key={line} className="text-white/50">
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Legal */}
            <div>
              <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
                Dati legali
              </h2>
              <ul className="mt-2 space-y-1 text-xs text-white/50 lg:mt-3">
                <li>
                  {legalContent.sedeLegale.street}, {legalContent.sedeLegale.zip}{" "}
                  {legalContent.sedeLegale.city} ({legalContent.sedeLegale.province})
                </li>
                <li>P.IVA {legalContent.piva}</li>
                <li>C.F. {legalContent.codiceFiscale}</li>
                <li>
                  REA {legalContent.rea.number} — {legalContent.rea.chamber}
                </li>
              </ul>
              <div className="mt-3 flex gap-2 text-xs lg:mt-4">
                <span className="bg-brand rounded px-2 py-1 font-semibold text-white">SOA</span>
                <span className="bg-brand rounded px-2 py-1 font-semibold text-white">ISO</span>
              </div>
            </div>
          </div>

          {/* Rotated phone strip — desktop only (lg+) */}
          <div className="hidden items-center justify-center border-l border-white/10 pr-0 pl-4 lg:flex">
            <a
              href={`tel:${siteContent.contact.phone.tel}`}
              aria-label={`Chiama ${siteContent.brand.name}`}
              className="text-2xl font-bold tracking-wider whitespace-nowrap text-white/80 transition-colors hover:text-white"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {siteContent.contact.phone.display}
            </a>
          </div>
        </div>

        {/* Mobile/tablet phone — shown below content below lg */}
        <div className="mt-4 flex justify-center border-t border-white/10 pt-4 lg:hidden">
          <a
            href={`tel:${siteContent.contact.phone.tel}`}
            className="text-xl font-bold tracking-wider text-white/80 hover:text-white"
          >
            {siteContent.contact.phone.display}
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 text-xs text-white/40 lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:pt-6">
          <p>
            © {new Date().getFullYear()} {legalContent.ragioneSociale}. Tutti i diritti riservati.
          </p>
          {legaleGroup ? (
            <nav className="flex gap-4" aria-label="Note legali">
              {legaleGroup.items.map((item) => (
                <FooterLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  className="text-white/40"
                  iconSize={13}
                />
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
