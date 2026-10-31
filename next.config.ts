import type { NextConfig } from "next";

/**
 * `GITHUB_PAGES=true npm run build` produces a fully static site in `out/`
 * for GitHub Pages. Static hosting can't run the POST booking endpoint, so
 * route handlers (`*.ts` under `app/`) are left out and the form runs in
 * demo mode. A normal build keeps the real `/api/appointment` endpoint.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/dental-studio" : "";

const nextConfig: NextConfig = {
  // Partial prerendering is unavailable in static export mode.
  cacheComponents: !isPages,
  partialPrefetching: !isPages,
  ...(isPages && {
    output: "export",
    basePath,
    trailingSlash: true,
    pageExtensions: ["tsx"],
  }),
  env: {
    NEXT_PUBLIC_STATIC_DEMO: isPages ? "true" : "",
  },
  images: {
    // Photography is served straight from Unsplash's image CDN, which resizes
    // and re-encodes on the fly. See src/lib/image-loader.ts.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    qualities: [70, 80],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
