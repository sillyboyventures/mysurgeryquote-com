import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Match WordPress URLs exactly: every page is served at /path/ with a trailing
  // slash. Without this, every existing inbound link would 301 to a stripped
  // path and lose backlink equity at cutover.
  trailingSlash: true,
  async redirects() {
    // NOTE: `permanent: true` emits a 308 (not a literal 301). Next.js uses 308
    // so the request method is preserved; Google consolidates 308 identically to
    // 301 for indexing, so this is the correct "permanent" signal for SEO.
    return [
      // --- Apex (non-www) -> www, preserving the path. The host value is
      // anchored (^...$) so it matches ONLY the bare apex and never
      // www.mysurgeryquote.com — an unanchored value would substring-match the
      // www host and cause an infinite redirect loop. Vercel may already do this
      // at the domain layer; this is a belt-and-suspenders fallback. ---
      {
        source: "/:path*",
        has: [{ type: "host", value: "^mysurgeryquote\\.com$" }],
        destination: "https://www.mysurgeryquote.com/:path*",
        permanent: true,
      },

      // --- Legacy WordPress query-string permalinks (?p=123 / ?page_id=12). ---
      // Sent to /blog/ rather than / on purpose: Next.js passes the original
      // query string through to the destination, so redirecting "/?p=5" to "/"
      // would re-emit "/?p=5" and loop forever. Because the destination path
      // (/blog/) differs from the source path (/), the rule cannot re-match.
      {
        source: "/",
        has: [{ type: "query", key: "p" }],
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "page_id" }],
        destination: "/blog/",
        permanent: true,
      },

      // --- WordPress front controller. ---
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/index.php/:path*", destination: "/:path*", permanent: true },
      { source: "/xmlrpc.php", destination: "/", permanent: true },

      // --- WordPress system paths (no equivalent on the new site). ---
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/wp-json/:path*", destination: "/", permanent: true },
      { source: "/wp-includes/:path*", destination: "/", permanent: true },
      { source: "/wp-content/:path*", destination: "/", permanent: true },

      // --- RSS / comment feeds. ---
      { source: "/feed", destination: "/blog/", permanent: true },
      { source: "/comments/feed", destination: "/blog/", permanent: true },
      { source: "/:path*/feed", destination: "/blog/", permanent: true },

      // --- WordPress taxonomy archives. ---
      { source: "/category/:path*", destination: "/blog/", permanent: true },
      { source: "/tag/:path*", destination: "/blog/", permanent: true },
      { source: "/author/:path*", destination: "/blog/", permanent: true },

      // --- Date-based archives (/2025/, /2025/12/, /2025/12/13/). The first
      // segment must be exactly four digits, which no real slug uses. ---
      { source: "/:year(\\d{4})/:path*", destination: "/blog/", permanent: true },
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
