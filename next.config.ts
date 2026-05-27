import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Match WordPress URLs exactly: every page is served at /path/ with a trailing
  // slash. Without this, every existing inbound link would 301 to a stripped
  // path and lose backlink equity at cutover.
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/index.php/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async headers() {
    const immutable = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];
    return [
      { source: "/:path*.png", headers: immutable },
      { source: "/:path*.svg", headers: immutable },
      { source: "/:path*.jpg", headers: immutable },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  // Pin the workspace root to this project. Without this, a stray lockfile in a
  // parent directory can make Next infer the wrong root.
  turbopack: {
    root: path.resolve(),
  },
  images: {
    // Our own SVG icons/logos live in /public and are trusted. Allow next/image
    // to serve them, sandboxed via a strict CSP for defense in depth.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
