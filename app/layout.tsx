import "./globals.css";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ImageProtection } from "@/components/ui/ImageProtection";

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
      suppressHydrationWarning
    >
      <body className="bg-panna text-ink antialiased">
        {children}
        <ImageProtection />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
