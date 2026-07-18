import { NextResponse } from "next/server";

// Legacy WordPress Echo Knowledge Base artifacts were served at the root with a
// ?post_type=epkb_post_type_1&p=<id> query string. They have no equivalent on
// the new site and no inbound value. Previously they 308-redirected to /help/,
// but a redirect to a live 200 page keeps them permanently parked in Google's
// "Page with redirect" bucket — a "Page with redirect" validation can only pass
// once a URL STOPS redirecting, so a 301/308 there never clears. Returning a
// hard 410 Gone tells Google the resource is permanently removed so it drops the
// URL from the index instead of endlessly re-validating a redirect.
//
// This lives in Proxy (not next.config `redirects`) because `redirects` can only
// emit 3xx. Proxy runs AFTER config redirects (see the Execution order in the
// Next.js proxy docs), so the config `?p=` rule is guarded with a `missing`
// condition to let these epkb requests fall through to here untouched.
export function proxy() {
  return new NextResponse("410 Gone", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

// Only run for the exact legacy KB shape: root path carrying
// ?post_type=epkb_post_type_1. The plain homepage (no such query) never matches.
export const config = {
  matcher: [
    {
      source: "/",
      has: [{ type: "query", key: "post_type", value: "epkb_post_type_1" }],
    },
  ],
};
