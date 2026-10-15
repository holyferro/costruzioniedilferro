import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // typedRoutes abilita il type-checking dei <Link href>
  // route primaryNav: /servizi /realizzazioni /contatti
  typedRoutes: true,

  // Solo dev: Next 16 blocca le risorse di sviluppo (JS, HMR) richieste da un host diverso da
  // localhost, quindi aprendo il server dal telefono via IP del Mac la pagina non si idrata.
  // Ammette gli IPv4 di rete locale di questa macchina (letti all'avvio del server).
  allowedDevOrigins: Object.values(networkInterfaces())
    .flatMap((list) => list ?? [])
    .filter((i) => i.family === "IPv4" && !i.internal)
    .map((i) => i.address),

  async redirects() {
    return [
      {
        source: "/progetti",
        destination: "/realizzazioni",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  // No `eslint` block — `next lint` is removed in Next 16.
};

export default nextConfig;
