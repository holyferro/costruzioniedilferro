import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo/metadata";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FooterReveal } from "@/components/layout/FooterReveal";

export const metadata: Metadata = defaultMetadata;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Content layer — sits ABOVE the fixed footer via z-10 */}
      <div className="bg-panna relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </div>

      {/* Spacer only needed on desktop where the footer is fixed-position */}
      <div
        aria-hidden="true"
        className="hidden md:block"
        style={{ height: "var(--footer-height, 340px)" }}
      />

      {/* Footer: fixed at z-0, revealed as content scrolls away */}
      <FooterReveal>
        <Footer />
      </FooterReveal>
    </>
  );
}
