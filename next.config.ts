import type { NextConfig } from "next";
import path from "path";

const newAlias = {
  "cloudflare/_shims/auto/runtime": path.resolve(
    __dirname,
    "node_modules/cloudflare/_shims/auto/runtime.mjs"
  ),
};

const nextConfig: NextConfig = {
  webpack: (config) => {
    const alias = ((config.resolve ??= {}).alias ??= {});
    Object.assign(alias, newAlias);

    return config;
  },
  turbopack: { resolveAlias: newAlias },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
