// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteContent } from "@/content/site";

// Plan 01-03 replaces the inline metadata object with a
// `defaultMetadata` import from `@/lib/seo/metadata`. For now we ship a
// minimal inline `Metadata` object so the build is green without lib/seo/metadata.ts.
export const metadata: Metadata = {
  title: {
    default: siteContent.brand.name,
    template: `%s — ${siteContent.brand.name}`,
  },
  description: siteContent.brand.tagline,
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${inter.variable} ${ibmPlexSerif.variable}`}>
      <body className="min-h-screen flex flex-col bg-panna text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
