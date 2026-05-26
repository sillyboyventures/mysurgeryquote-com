import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
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
