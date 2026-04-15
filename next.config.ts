import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Typed routes — disabled in Phase 1 (routes /servizi, /progetti etc. don't exist yet).
  // Re-enable in Phase 2 once all nav routes are created.
  // typedRoutes: true,

  // No remote image patterns in Phase 1. Phase 4 may revisit.

  // No `eslint` block — `next lint` is removed in Next 16.
};

export default nextConfig;
