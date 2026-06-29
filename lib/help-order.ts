// Explicit help-center ordering to match the live WordPress site exactly.
export const CATEGORY_ORDER = [
  "Getting Started",
  "Quote Builder",
  "Admin Settings",
  "PDF & Email",
  "Multi-Practice",
  "Troubleshooting",
  "Med Spa Features",
  "Combined Practices (Surgery + Med Spa)",
  "Reports",
  "EMR Integrations",
];

export const ARTICLE_ORDER: Record<string, string[]> = {
  "Getting Started": [
    "welcome-to-mysurgeryquote",
    "logging-in-and-navigation",
    "creating-your-first-quote",
    "managing-your-quotes",
  ],
  "Quote Builder": [
    "searching-filtering-quotes",
    "applying-discounts",
    "editing-duplicating-quotes",
    "quote-notes-documentation",
    "quick-quotes-templates",
    "adding-notes-to-procedures",
    "multi-area-procedures",
    "quote-deletion-rules",
    "facility-selection-in-quotes",
  ],
  "Admin Settings": [
    "practice-settings-overview",
    "managing-procedures",
    "managing-surgeons",
    "managing-users",
    "managing-implants",
    "managing-additional-fees",
    "understanding-price-history",
    "uploading-procedures-fees",
    "fee-settings-calculations",
    "global-fee-adjustments",
    "surgeon-procedure-assignments",
    "danger-zone-pricing-tools",
    "emr-integration-modmed",
    "setting-up-commissions",
    "managing-multiple-facilities",
  ],
  "PDF & Email": ["generating-downloading-pdfs", "emailing-quotes-to-patients"],
  "Multi-Practice": [
    "multi-practice-overview",
    "setting-up-a-new-practice",
    "practice-branding-customization",
    "understanding-data-isolation",
    "practice-administrator-guide",
  ],
  "Troubleshooting": ["common-issues-solutions", "getting-support"],
  "Med Spa Features": [
    "med-spa-overview",
    "unit-based-pricing-for-injectables",
    "membership-tiers",
    "provider-tiers-pricing-by-credential",
    "adding-products-to-quotes",
    "creating-a-med-spa-quote",
  ],
  "Combined Practices (Surgery + Med Spa)": [
    "combined-practice-overview",
    "choosing-quote-type-surgical-vs-med-spa",
    "managing-surgeons-providers",
    "adding-med-spa-to-your-surgical-account",
  ],
  "Reports": [
    "reports-overview",
    "procedure-log",
    "implant-log",
    "pcc-productivity",
    "commission-reports",
  ],
  "EMR Integrations": [
    "emr-integrations-overview",
    "how-to-connect-modmed-modernizing-medicine",
    "how-to-connect-drchrono",
    "how-to-connect-nextech",
    "troubleshooting-emr-connection-issues",
    "how-to-send-quotes-to-your-emr",
    "how-to-connect-gohighlevel",
    "sending-quotes-invoices-to-gohighlevel",
  ],
};

const catIndex = new Map(CATEGORY_ORDER.map((c, i) => [c, i]));

export function categoryRank(category?: string): number {
  const i = catIndex.get(category || "General");
  return i === undefined ? CATEGORY_ORDER.length : i;
}

export function articleRank(category: string | undefined, slug: string): number {
  const arr = ARTICLE_ORDER[category || ""] || [];
  const i = arr.indexOf(slug);
  return i === -1 ? 999 : i;
}
