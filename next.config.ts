import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // typedRoutes abilita il type-checking dei <Link href> — riabilitato in Phase 2
  // ora che tutte le route primaryNav esistono: /servizi /progetti /chi-siamo /contatti
  experimental: {
    typedRoutes: true,
  },

  // No remote image patterns in Phase 1. Phase 4 may revisit.

  // No `eslint` block — `next lint` is removed in Next 16.
};

export default nextConfig;
