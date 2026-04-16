// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FooterReveal } from "@/components/layout/FooterReveal";
import { defaultMetadata } from "@/lib/seo/metadata";

// Shared metadata defaults live in lib/seo/metadata. Per-page metadata uses buildMetadata().
export const metadata: Metadata = defaultMetadata;

const neueMontreal = localFont({
  src: [
    { path: "../public/fonts/NeueMontreal-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/NeueMontreal-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/NeueMontreal-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${ibmPlexSerif.variable} ${neueMontreal.variable}`}
    >
      <body className="bg-panna text-ink antialiased">
        {/* Content layer — sits ABOVE the fixed footer via z-10 */}
        <div className="bg-panna relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          {/* Spacer: pushes content down by footer height so scrolling exposes it */}
          <div aria-hidden="true" style={{ height: "var(--footer-height, 340px)" }} />
        </div>

        {/* Footer: fixed at z-0, revealed as content scrolls away */}
        <FooterReveal>
          <Footer />
        </FooterReveal>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
