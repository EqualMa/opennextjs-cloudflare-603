import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    const alias = ((config.resolve ??= {}).alias ??= {});
    alias["cloudflare/_shims/auto/runtime"] = path.resolve(
      __dirname,
      "./node_modules/cloudflare/_shims/auto/runtime.mjs"
    );

    return config;
  },
  turbopack: {
    resolveAlias: {
      "cloudflare/_shims/auto/runtime":
        "./node_modules/cloudflare/_shims/auto/runtime.mjs",
    },
  },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
