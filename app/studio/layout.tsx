// Naked layout — isolates Studio from the root layout's fonts, Header,
// Footer, Analytics and any global CSS variables.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edilferro CMS",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
