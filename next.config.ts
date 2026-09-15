import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript is verified explicitly with `npm run typecheck`. This avoids a
  // Next 16 CLI parsing issue under the workspace's Node runtime.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
