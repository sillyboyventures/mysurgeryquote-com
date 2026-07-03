const W = "https://www.mysurgeryquote.com";
const get = async (p) => (await fetch(W + p)).text();
const head = async (p) => (await fetch(W + p, { method: "HEAD" })).headers;
const DASH = String.fromCharCode(0x2014);
const m = (s, re) => (s.match(re) || [])[1];

console.log("===== FIX 1: canonicals =====");
for (const p of ["/", "/features/", "/surgical-practices/", "/medical-spas/", "/integrations/", "/pricing/", "/contact/", "/free-trial/", "/blog/", "/help/"]) {
  const c = m(await get(p), /<link rel="canonical" href="([^"]+)"/);
  const ok = c === `${W}${p}`;
  console.log(`${ok ? "PASS" : "FAIL"}  ${p} -> ${c}`);
}

console.log("\n===== FIX 1: sitemap =====");
const sm = await get("/sitemap.xml");
console.log("www <loc> count   :", (sm.match(/https:\/\/www\.mysurgeryquote\.com/g) || []).length);
console.log("non-www apex count:", (sm.match(/https:\/\/mysurgeryquote\.com\//g) || []).length, "(want 0)");

console.log("\n===== FIX 2: legal pages =====");
for (const p of ["/privacy-policy/", "/terms-of-service/"]) {
  const r = await fetch(W + p);
  console.log(`${r.status}  ${p}`);
}
const home = await get("/");
console.log('homepage href="#" count       :', (home.match(/href="#"/g) || []).length, "(want 0)");
console.log('homepage /privacy-policy/ link:', (home.match(/href="\/privacy-policy\/"/g) || []).length);
console.log('homepage /terms-of-service/   :', (home.match(/href="\/terms-of-service\/"/g) || []).length);

console.log("\n===== FIX 3: GHL stale URLs =====");
const ghl = await get("/new-gohighlevel-integration-send-quotes-invoices-estimates-directly-to-your-crm/");
console.log("'www.mysurgeryquote.com/demos' count:", (ghl.match(/www\.mysurgeryquote\.com\/demos/g) || []).length, "(want 0)");

console.log("\n===== FIX 4: title entities =====");
for (const p of ["/medical-spas/", "/blog/", "/help/", "/why-your-emr-quoting-tool-falls-short/"]) {
  const t = m(await get(p), /<title>(.*?)<\/title>/);
  const bad = /&amp;|&#x27;/.test(t);
  console.log(`${bad ? "FAIL" : "PASS"}  ${p} -> ${t}`);
}

console.log("\n===== FIX 5: llms.txt em-dashes =====");
const llms = await get("/llms.txt");
console.log("em-dash count:", (llms.match(new RegExp(DASH, "g")) || []).length, "(want 0)");

console.log("\n===== FIX 6: cache headers =====");
for (const p of ["/og/home.png", "/brand/logo-white.png", "/icons/icon-hipaa.svg"]) {
  console.log(`${p} -> ${(await head(p)).get("cache-control")}`);
}

console.log("\n===== FIX 7: per-section og:image =====");
for (const p of ["/features/", "/surgical-practices/", "/medical-spas/", "/integrations/", "/pricing/"]) {
  const og = m(await get(p), /<meta property="og:image" content="([^"]+)"/);
  console.log(`${p} -> ${og}`);
}

console.log("\n===== FIX 8: sample help descriptions =====");
for (const slug of ["managing-procedures", "setting-up-commissions", "facility-selection-in-quotes", "reports-overview", "membership-tiers"]) {
  const d = m(await get(`/help/${slug}/`), /<meta name="description" content="([^"]+)"/);
  console.log(`${slug}: ${d}`);
}

console.log("\n===== FIX 9: expanded titles =====");
console.log("contact   :", m(await get("/contact/"), /<title>(.*?)<\/title>/));
console.log("free-trial:", m(await get("/free-trial/"), /<title>(.*?)<\/title>/));

console.log("\n===== FIX 10: apex redirect status =====");
const apex = await fetch("https://mysurgeryquote.com/", { redirect: "manual" });
console.log(`apex status: ${apex.status} -> ${apex.headers.get("location")}`);

console.log("\n===== FIX 11: security headers (homepage) =====");
const h = await head("/");
for (const k of ["x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy"]) {
  console.log(`${k}: ${h.get(k)}`);
}
