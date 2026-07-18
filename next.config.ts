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
      // --- Apex (non-www) -> www, preserving the FULL path verbatim. ---
      // Uses a single `(.*)` capture rather than `/:path*`: the segment-array
      // form (`:path*`) drops the trailing slash when it recompiles the
      // destination, so "/surgical-practices/" was redirecting to
      // ".../surgical-practices" (no slash) which then 308s AGAIN under
      // trailingSlash:true — a two-hop chain that fails GSC validation. The
      // greedy `(.*)` keeps the trailing slash, so the apex hop is now a single
      // clean 308 straight to the canonical trailing-slash URL.
      //
      // Next.js wraps every `has` value in ^...$ automatically (see
      // prepare-destination.js), so the bare value below already matches ONLY
      // the apex host and never www.mysurgeryquote.com (no infinite loop). No
      // manual anchors needed. Vercel may also do this at the domain layer;
      // this is a belt-and-suspenders fallback.
      {
        source: "/:path(.*)",
        has: [{ type: "host", value: "mysurgeryquote\\.com" }],
        destination: "https://www.mysurgeryquote.com/:path",
        permanent: true,
      },

      // --- Legacy WordPress Echo Knowledge Base artifacts (?post_type=
      // epkb_post_type_1&p=<id>). These have no value and no equivalent page.
      // They used to 308 -> /help/, but a redirect to a live 200 page keeps them
      // parked forever in Google's "Page with redirect" bucket (that validation
      // only clears once a URL STOPS redirecting). They are now hard-410'd in
      // proxy.ts so Google drops them. `redirects` can't emit 410, and proxy runs
      // AFTER these config redirects, so the ?p= rule below is guarded with a
      // `missing` condition to let epkb requests fall through to the proxy. ---

      // --- Legacy WordPress query-string permalinks (?p=123 / ?page_id=12). ---
      // Sent to /blog/ rather than / on purpose: Next.js passes the original
      // query string through to the destination, so redirecting "/?p=5" to "/"
      // would re-emit "/?p=5" and loop forever. Because the destination path
      // (/blog/) differs from the source path (/), the rule cannot re-match. The
      // `missing` guard excludes the epkb KB artifacts above (which also carry a
      // `p` key) so they reach the 410 in proxy.ts instead of landing on /blog/.
      {
        source: "/",
        has: [{ type: "query", key: "p" }],
        missing: [{ type: "query", key: "post_type", value: "epkb_post_type_1" }],
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

      // --- Consolidated help-center stubs. Four near-empty Reports/Commissions
      // articles were merged into their parent pages to fix "Crawled - currently
      // not indexed" (thin content). Each old URL 308s to the surviving parent so
      // it never 404s and any accrued index equity passes through. Redirects are
      // checked before the filesystem, so these fire even though the [slug] route
      // uses dynamicParams:false and no longer generates these slugs. Destinations
      // carry the trailing slash to land on the canonical URL in a single hop
      // under trailingSlash:true. ---
      { source: "/help/procedure-log", destination: "/help/reports-overview/", permanent: true },
      { source: "/help/implant-log", destination: "/help/reports-overview/", permanent: true },
      { source: "/help/pcc-productivity", destination: "/help/reports-overview/", permanent: true },
      { source: "/help/commission-reports", destination: "/help/setting-up-commissions/", permanent: true },
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
