import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // typedRoutes abilita il type-checking dei <Link href>
  // route primaryNav: /servizi /realizzazioni /contatti
  typedRoutes: true,

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
