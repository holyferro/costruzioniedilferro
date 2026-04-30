import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // typedRoutes abilita il type-checking dei <Link href>
  // route primaryNav: /servizi /progetti /contatti
  typedRoutes: true,

  // No remote image patterns in Phase 1. Phase 4 may revisit.

  // No `eslint` block — `next lint` is removed in Next 16.
};

export default nextConfig;
