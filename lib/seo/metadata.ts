import type { Metadata } from "next";
import { siteContent } from "@/content/site";

/**
 * Canonical metadataBase for the whole app.
 * Falls back to localhost during dev so Next doesn't throw on relative URLs
 * in openGraph.images (see: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase).
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const metadataBase = new URL(SITE_URL);

/**
 * Shared defaults — merged at layout level, overridden per-page via buildMetadata().
 */
export const defaultMetadata: Metadata = {
  metadataBase,
  title: {
    default: siteContent.brand.legalName,
    template: `%s — ${siteContent.brand.legalName}`,
  },
  description: siteContent.brand.tagline,
  applicationName: siteContent.brand.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/",
    siteName: siteContent.brand.name,
    title: siteContent.brand.name,
    description: siteContent.brand.tagline,
    // images: [{ url: "/og-default.jpg", width: 1200, height: 630 }], // added in Phase 7
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.brand.name,
    description: siteContent.brand.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Per-page metadata builder.
 * Pages call: `export const metadata = buildMetadata({ title: "Servizi", ... });`
 */
export function buildMetadata(overrides: Metadata = {}): Metadata {
  return {
    ...defaultMetadata,
    ...overrides,
    // Merge nested objects explicitly (Metadata uses shallow merge).
    openGraph: {
      ...defaultMetadata.openGraph,
      ...overrides.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...overrides.twitter,
    },
    alternates: {
      ...defaultMetadata.alternates,
      ...overrides.alternates,
    },
  };
}
