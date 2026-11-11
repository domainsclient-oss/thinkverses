import type { NextConfig } from "next";
import { articleSlug, legacyRedirects } from "./src/lib/locations";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Off: inlining put the full stylesheet (~126 KB) in a <style> tag AND twice more in the RSC payload,
    // so every page shipped ~380 KB of CSS in its HTML. An external, cached stylesheet is far lighter.
    inlineCss: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // 60 for large photographic heroes (Lighthouse flags q75 as under-compressed); 75 stays the default
    qualities: [60, 75],
  },
  async redirects() {
    return [
      ...legacyRedirects.map((r) => ({ ...r, permanent: true })),
      { source: `/${articleSlug}`, destination: `/articles/${articleSlug}`, permanent: true },
      { source: "/about-us", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/faq", destination: "/#faq", permanent: true },
      { source: "/case-studies/controlled-environment-agriculture", destination: "/case-studies", permanent: true },
    ];
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
