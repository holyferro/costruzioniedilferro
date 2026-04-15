import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Typed routes — catches dead links at build time.
  typedRoutes: true,

  // No remote image patterns in Phase 1. Phase 4 may revisit.

  // No `eslint` block — `next lint` is removed in Next 16.
};

export default nextConfig;
