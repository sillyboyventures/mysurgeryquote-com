import fs from "node:fs";

const DASH = String.fromCharCode(0x2014); // em-dash —

// Per-file [from, to] replacements. `from` strings include the em-dash; crafted
// for natural prose (period / comma / colon / parens by context).
const edits = {
  "app/contact/page.tsx": [
    [`integrations ${DASH} we usually reply`, "integrations. We usually reply"],
  ],
  "app/blog/page.tsx": [[`Blog ${DASH} Surgery`, "Blog: Surgery"]],
  "app/help/page.tsx": [[`Help Center ${DASH} Guides`, "Help Center: Guides"]],
  "app/api/contact/route.ts": [
    [`// Honeypot ${DASH} pretend success`, "// Honeypot: pretend success"],
  ],
  "app/integrations/page.tsx": [
    [`EMR Integrations ${DASH} ModMed`, "EMR Integrations: ModMed"],
    [`no re-uploading ${DASH} one click`, "no re-uploading. One click"],
    [`a quote is sent ${DASH} text, email`, "a quote is sent: text, email"],
    [`from MySurgeryQuote ${DASH} no copy/paste`, "from MySurgeryQuote. No copy/paste"],
    [`at no extra cost ${DASH}`, "at no extra cost:"],
  ],
  "app/medical-spas/page.tsx": [
    [`Quote Software ${DASH} Injectables`, "Quote Software: Injectables"],
    [
      `Create VIP tiers ${DASH} Gold, Platinum, Diamond ${DASH} with automatic`,
      "Create VIP tiers (Gold, Platinum, Diamond) with automatic",
    ],
  ],
  "app/free-trial/page.tsx": [
    [`Start Your Free Trial ${DASH} MySurgeryQuote`, "Start Your Free Trial | MySurgeryQuote"],
    [`do nothing ${DASH} your account pauses`, "do nothing. Your account pauses"],
    // FIX 1B
    ["ModMed & DrChrono integration", "All EMR integrations (ModMed, DrChrono, GoHighLevel)"],
  ],
  "app/pricing/page.tsx": [
    [`Pricing ${DASH} Plans for`, "Pricing: Plans for"],
    [`full access ${DASH} no features locked`, "full access. No features locked"],
    [`No downtime ${DASH} we add them`, "No downtime. We add them"],
    [
      `All EMR integrations ${DASH} ModMed, DrChrono, and GoHighLevel ${DASH} are included`,
      "All EMR integrations (ModMed, DrChrono, and GoHighLevel) are included",
    ],
    // FIX 1A
    [
      "Built for cosmetic and plastic surgery practices. ModMed and DrChrono integrations included.",
      "Built for cosmetic and plastic surgery practices. All EMR integrations included on every plan.",
    ],
  ],
  "app/surgical-practices/page.tsx": [
    [`loads automatically ${DASH} no spreadsheets`, "loads automatically. No spreadsheets"],
    [`patient record ${DASH} no separate spreadsheet`, "patient record. No separate spreadsheet"],
    [`implants, and fees ${DASH} then customize`, "implants, and fees, then customize"],
    [
      `Add your whole team ${DASH} front desk, PCCs, surgeons ${DASH} with no per-seat fees`,
      "Add your whole team (front desk, PCCs, surgeons) with no per-seat fees",
    ],
    [`existing plan ${DASH} same login`, "existing plan. Same login"],
  ],
  "app/features/page.tsx": [
    [`Features ${DASH} Surgeon Pricing`, "Features: Surgeon Pricing"],
    [`annual price increases ${DASH} no CSV exports`, "annual price increases. No CSV exports"],
    [`every facility you operate ${DASH} in-office OR`, "every facility you operate: in-office OR"],
    [`and cap once ${DASH} every quote calculates`, "and cap once. Every quote calculates"],
    [`from a template ${DASH} procedures, implants`, "from a template: procedures, implants"],
    [`Editable after applying ${DASH} templates`, "Editable after applying: templates"],
    [`Vary rates by provider ${DASH} 5%`, "Vary rates by provider: 5%"],
    [`and Commissions ${DASH} each exportable`, "and Commissions, each exportable"],
    [`by brand and type ${DASH} Allergan Natrelle`, "by brand and type: Allergan Natrelle"],
    [`Edit old quotes ${DASH} original pricing`, "Edit old quotes. Original pricing"],
    [`directly from the system ${DASH} no downloading`, "directly from the system. No downloading"],
    [`Delivery logged on the quote ${DASH} see when`, "Delivery logged on the quote: see when"],
    [`on every plan ${DASH} add your front desk`, "on every plan. Add your front desk"],
    [`Visible FAQ ${DASH} content matches`, "Visible FAQ: content matches"],
  ],
  "components/sections/KoehlerFeatures.tsx": [
    [`Built-in tools ${DASH} no CSV exports`, "Built-in tools. No CSV exports"],
    [`Configure separate facilities ${DASH} in-office OR`, "Configure separate facilities: in-office OR"],
    [`real medical practices ${DASH} not generic`, "real medical practices, not generic"],
  ],
  "content/help/applying-discounts.mdx": [
    [`**Courtesy-Revision** ${DASH} Use`, "**Courtesy-Revision**. Use"],
    [`**Implant Warranty** ${DASH} Use`, "**Implant Warranty**. Use"],
    [`**Custom Reason** ${DASH} Enter`, "**Custom Reason**. Enter"],
  ],
  "content/help/emr-integrations-overview.mdx": [
    [
      `All EMR integrations ${DASH} ModMed, DrChrono, and GoHighLevel ${DASH} are included`,
      "All EMR integrations (ModMed, DrChrono, and GoHighLevel) are included",
    ],
  ],
  "content/blog/drchrono-quoting-vs-mysurgeryquote.mdx": [
    [`single-line charge entry ${DASH} not for itemized`, "single-line charge entry, not for itemized"],
    [`and additional fees ${DASH} none of which`, "and additional fees, none of which"],
    [`You lose the breakdown ${DASH} and the breakdown`, "You lose the breakdown, and the breakdown"],
    [`quote in MySurgeryQuote ${DASH} surgeon fee, facility`, "quote in MySurgeryQuote: surgeon fee, facility"],
    [`is built in ${DASH} search your DrChrono`, "is built in. Search your DrChrono"],
    [`MySurgeryQuote quote history ${DASH} every quote`, "MySurgeryQuote quote history: every quote"],
    [`attached to the patient ${DASH} not a separate`, "attached to the patient, not a separate"],
    [`pricing starts at $100/mo ${DASH} see the`, "pricing starts at $100/mo. See the"],
  ],
  "content/blog/hidden-cost-of-bad-surgery-quotes.mdx": [
    [`Over a year, 180 hours ${DASH} most of it`, "Over a year, 180 hours, most of it"],
    [`30 hours a year ${DASH} roughly`, "30 hours a year, roughly"],
    [`and consult quality ${DASH} use your own`, "and consult quality. Use your own"],
    [`happens often enough ${DASH} call it 1 quote`, "happens often enough. Call it 1 quote"],
    [`We miscalculated ${DASH} the price is actually`, "We miscalculated. The price is actually"],
    [
      `Add up the three numbers ${DASH} labor saved, conversion gained, mistakes avoided ${DASH} and`,
      "Add up the three numbers (labor saved, conversion gained, mistakes avoided) and",
    ],
    [`(/free-trial/) ${DASH} no credit card required`, "(/free-trial/). No credit card required"],
  ],
  "content/blog/how-pccs-use-quoting-software.mdx": [
    [`anyone else in the building ${DASH} and EMR-built`, "anyone else in the building, and EMR-built"],
    [`**My Commissions view** ${DASH} YTD earnings`, "**My Commissions view:** YTD earnings"],
    [`**Status workflow** ${DASH} Draft`, "**Status workflow:** Draft"],
    [`The My Commissions view ${DASH} YTD, Same Period`, "The My Commissions view: YTD, Same Period"],
    [`runs high ${DASH} commonly 30% to 50%`, "runs high, commonly 30% to 50%"],
    [`(/free-trial/) ${DASH} pricing starts at`, "(/free-trial/). Pricing starts at"],
  ],
  "content/blog/modmed-quoting-vs-mysurgeryquote.mdx": [
    [`need more than that ${DASH} multiple procedures`, "need more than that: multiple procedures"],
    [`from the dropdown ${DASH} his pricing loads`, "from the dropdown. His pricing loads"],
    [`not your EMR ${DASH} the document the patient`, "not your EMR. The document the patient"],
    [`pricing starts at $100/mo ${DASH} see the`, "pricing starts at $100/mo. See the"],
  ],
  "content/blog/why-your-emr-quoting-tool-falls-short.mdx": [
    [`implants, and add-ons ${DASH} each calculated differently`, "implants, and add-ons, each calculated differently"],
    [`when the quote is invoiced ${DASH} group rates`, "when the quote is invoiced. Group rates"],
    [`your practice name ${DASH} not a medical-record`, "your practice name, not a medical-record"],
    [`flow into insurance claims ${DASH} not for itemized`, "flow into insurance claims, not for itemized"],
    [`fee calculation engine ${DASH} base fee`, "fee calculation engine: base fee"],
    [`handles the quote build ${DASH} surgeon pricing`, "handles the quote build: surgeon pricing"],
  ],
  "content/blog/new-gohighlevel-integration-send-quotes-invoices-estimates-directly-to-your-crm.mdx": [
    [`New: GoHighLevel Integration ${DASH} Send Quotes`, "New GoHighLevel Integration: Send Quotes"],
    [
      `uses GoHighLevel ${DASH} or a CRM built on it like AesthetixCRM ${DASH} you can now`,
      "uses GoHighLevel (or a CRM built on it like AesthetixCRM) you can now",
    ],
    [`from your quote line items ${DASH} no re-entering data`, "from your quote line items, no re-entering data"],
    [`**Automatic tagging** ${DASH} every time you send`, "**Automatic tagging:** every time you send"],
    [`at no extra cost ${DASH} just like our ModMed`, "at no extra cost, just like our ModMed"],
  ],
  // Prose first; remaining em-dashes (table cells + legend) become ✗ below.
  "content/blog/emr-quoting-tools-compared.mdx": [
    [`cosmetic practices ${DASH} and why most`, "cosmetic practices, and why most"],
    [`the honest comparison ${DASH} not a takedown`, "the honest comparison, not a takedown"],
    [`model cosmetic fees ${DASH} no per-surgeon pricing`, "model cosmetic fees. No per-surgeon pricing"],
    [`isn't to itself ${DASH} it sends to`, "isn't to itself. It sends to"],
    [`before making a decision ${DASH} and tell us`, "before making a decision, and tell us"],
    [`MySurgeryQuote reporting ${DASH} Procedure Log`, "MySurgeryQuote reporting: Procedure Log"],
    [`billing, and scheduling ${DASH} switching that`, "billing, and scheduling. Switching that"],
    [`handles the quote build ${DASH} surgeon pricing`, "handles the quote build: surgeon pricing"],
    [`DrChrono, and GoHighLevel ${DASH} no system replacement`, "DrChrono, and GoHighLevel. No system replacement"],
  ],
};

let warnings = 0;
for (const [file, pairs] of Object.entries(edits)) {
  let s = fs.readFileSync(file, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) {
      console.warn(`WARN no match in ${file}: ${from.slice(0, 50)}`);
      warnings++;
      continue;
    }
    s = s.split(from).join(to);
  }
  fs.writeFileSync(file, s);
}

// Blog comparison table: convert remaining em-dashes (cells + legend) to ✗.
{
  const f = "content/blog/emr-quoting-tools-compared.mdx";
  let s = fs.readFileSync(f, "utf8");
  const before = (s.match(new RegExp(DASH, "g")) || []).length;
  s = s.split(DASH).join(String.fromCharCode(0x2717)); // ✗
  fs.writeFileSync(f, s);
  console.log(`emr-quoting-tools-compared: converted ${before} remaining em-dashes to ✗ (table markers)`);
}

console.log(`done; warnings: ${warnings}`);
