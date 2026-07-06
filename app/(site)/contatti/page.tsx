// app/contatti/page.tsx
import { buildMetadata } from "@/lib/seo/metadata";
import { siteContent } from "@/content/site";
import { ContattiForm } from "@/components/sections/ContattiForm";
import { DecorativeRings } from "@/components/ui/DecorativeRings";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = buildMetadata({
  title: "Contattaci — Richiedi un sopralluogo",
  description:
    "Contatta Costruzioni Edilferro per un sopralluogo senza impegno. Operiamo a Porto Viro, Rovigo, Polesine e in tutto il Veneto dal 1981.",
  alternates: { canonical: "/contatti" },
});

const MAPS_QUERY_URL = "https://maps.google.com/?q=Via+dei+Salici+7,+Porto+Viro+RO";

export default function ContattiPage() {
  const { contact, address } = siteContent;

  return (
    <>
      {/* ── Hero: bg-brand + anelli, identico a HomepageCta ── */}
      <section className="bg-brand text-panna relative overflow-hidden px-6 pt-16 pb-16 md:px-12 md:pt-20 md:pb-20">
        <DecorativeRings side="right" />

        <div className="relative mx-auto max-w-6xl">
          <p className="text-panna/55 text-xs font-semibold tracking-[0.38em] uppercase">
            <span
              aria-hidden="true"
              className="bg-panna/40 mr-3 inline-block h-px w-8 align-middle"
            />
            Scriveteci
          </p>
          <h1 className="text-panna mt-5 font-serif text-[clamp(2.4rem,1.4rem+3.2vw,4.5rem)] leading-[1.05] font-medium tracking-tight">
            Parlaci del tuo progetto.
          </h1>
          <p className="text-panna/75 mt-5 max-w-[52ch] text-lg leading-relaxed">
            Risponderemo entro 24 ore lavorative. Per urgenze, chiamaci direttamente.
          </p>
        </div>
      </section>

      {/* ── Form + Mappa ── */}
      <section className="bg-panna px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
            {/* Form */}
            <div>
              <h2 className="text-ink mb-8 font-serif text-2xl font-medium">
                Richiedi un sopralluogo
              </h2>
              <ContattiForm />
            </div>

            {/* Mappa statica */}
            <div className="flex flex-col">
              <h2 className="text-ink mb-8 font-serif text-2xl font-medium">Dove siamo</h2>
              <div className="border-border flex h-full flex-1 flex-col overflow-hidden rounded-sm border bg-white">
                <div className="relative min-h-0 flex-1" style={{ minHeight: "280px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=Via+dei+Salici+7,+Porto+Viro,+RO,+Italy&zoom=15&size=800x450&scale=2&markers=color:red%7CVia+dei+Salici+7,+Porto+Viro,+RO,+Italy&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_STATIC_KEY}`}
                    alt="Mappa sede Costruzioni Edilferro - Via dei Salici 7, Porto Viro"
                    width={800}
                    height={450}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex shrink-0 flex-col items-center gap-3 px-6 py-5">
                  <div className="text-center">
                    <p className="text-ink font-serif text-base font-medium">Via dei Salici 7</p>
                    <p className="text-ink/70 mt-0.5 text-sm">45014 Porto Viro (RO) — Veneto</p>
                  </div>
                  <a
                    href={MAPS_QUERY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand text-panna inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-opacity hover:opacity-90"
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    Apri in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fascia informazioni aziendali ── */}
      <section className="bg-brand text-panna relative overflow-hidden px-6 py-14 md:px-12 md:py-16">
        <DecorativeRings side="left" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8 lg:gap-12">
            <InfoBlock icon={<MapPin className="h-4 w-4" />} label="Sede operativa">
              <a
                href={address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-panna/90 hover:text-panna font-serif text-base leading-snug transition-colors"
              >
                {address.street}
                <br />
                {address.zip} {address.city}
                <br />({address.province}) — {address.region}
              </a>
            </InfoBlock>

            <InfoBlock icon={<Phone className="h-4 w-4" />} label="Telefono">
              <a
                href={`tel:${contact.phone.tel}`}
                className="text-panna/90 hover:text-panna font-serif text-xl tracking-tight transition-colors"
              >
                {contact.phone.display}
              </a>
            </InfoBlock>

            <InfoBlock icon={<Mail className="h-4 w-4" />} label="Email">
              <a
                href={`mailto:${contact.email}`}
                className="text-panna/90 hover:text-panna font-serif text-base leading-snug break-all transition-colors"
              >
                {contact.email}
              </a>
              <p className="text-panna/45 mt-2 text-xs">
                PEC:{" "}
                <a
                  href={`mailto:${contact.pec}`}
                  className="hover:text-panna/70 break-all transition-colors"
                >
                  {contact.pec}
                </a>
              </p>
            </InfoBlock>

            <InfoBlock icon={<Clock className="h-4 w-4" />} label="Orari">
              <div className="font-serif text-base leading-relaxed">
                {contact.hours.map((h) => (
                  <span key={h} className="text-panna/90 block">
                    {h}
                  </span>
                ))}
              </div>
              <p className="text-panna/45 mt-3 text-xs leading-relaxed">
                Risposta entro 24 ore lavorative.
              </p>
            </InfoBlock>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoBlock({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-panna/45 mb-3 flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase">
        <span className="text-panna/60" aria-hidden="true">
          {icon}
        </span>
        {label}
      </p>
      {children}
    </div>
  );
}
