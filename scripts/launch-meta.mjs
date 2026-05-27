import fs from "node:fs";

const ANCHOR = "export const metadata: Metadata = {";

// canonical + (optional) per-section OG image inserted right after the metadata
// opening brace; plus optional title string replacements.
const cfg = {
  "app/features/page.tsx": { path: "/features/", og: "/og/features.png" },
  "app/surgical-practices/page.tsx": { path: "/surgical-practices/", og: "/og/surgical.png" },
  "app/medical-spas/page.tsx": {
    path: "/medical-spas/",
    og: "/og/medspa.png",
    titles: [["Injectables & Treatment Pricing", "Injectables and Treatment Pricing"]],
  },
  "app/integrations/page.tsx": { path: "/integrations/", og: "/og/integrations.png" },
  "app/pricing/page.tsx": { path: "/pricing/", og: "/og/pricing.png" },
  "app/contact/page.tsx": {
    path: "/contact/",
    titles: [['{ absolute: "Contact MySurgeryQuote" }', '{ absolute: "Contact MySurgeryQuote: Sales, Support, Partnerships, Integrations" }']],
  },
  "app/free-trial/page.tsx": {
    path: "/free-trial/",
    titles: [['{ absolute: "Start Your Free Trial | MySurgeryQuote" }', '{ absolute: "Free Trial: Try MySurgeryQuote for 30 Days, No Card Required | MySurgeryQuote" }']],
  },
  // blog/help already have canonicals (now www); only fix the & in titles.
  "app/blog/page.tsx": { titles: [["Blog: Surgery & Med Spa Quoting Insights", "Blog: Surgery and Med Spa Quoting Insights"]] },
  "app/help/page.tsx": { titles: [["Help Center: Guides & How-Tos", "Help Center: Guides and How-Tos"]] },
};

const BASE = "https://www.mysurgeryquote.com";
let warnings = 0;
for (const [file, c] of Object.entries(cfg)) {
  let s = fs.readFileSync(file, "utf8");
  if (c.path) {
    let block = `  alternates: { canonical: "${BASE}${c.path}" },\n`;
    if (c.og) {
      block += `  openGraph: { siteName: "MySurgeryQuote", type: "website", images: ["${c.og}"] },\n`;
      block += `  twitter: { card: "summary_large_image", images: ["${c.og}"] },\n`;
    }
    if (!s.includes(ANCHOR)) {
      console.warn(`WARN no metadata anchor in ${file}`);
      warnings++;
    } else {
      s = s.split(ANCHOR).join(`${ANCHOR}\n${block.replace(/\n$/, "")}`);
    }
  }
  for (const [from, to] of c.titles || []) {
    if (!s.includes(from)) {
      console.warn(`WARN title not found in ${file}: ${from.slice(0, 40)}`);
      warnings++;
    } else {
      s = s.split(from).join(to);
    }
  }
  fs.writeFileSync(file, s);
  console.log(`meta updated: ${file}`);
}
console.log(`done; warnings: ${warnings}`);
