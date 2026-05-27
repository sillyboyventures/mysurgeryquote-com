import fs from "node:fs";
import path from "node:path";

const desc = {
  // Getting Started
  "welcome-to-mysurgeryquote": "New to MySurgeryQuote? Learn what the quoting platform does, how surgical and med spa modes differ, and where to start building your first patient quote.",
  "logging-in-and-navigation": "Log in to MySurgeryQuote and find your way around the dashboard, quote builder, reports, and admin settings. A quick orientation for new users.",
  "creating-your-first-quote": "Build your first patient quote in MySurgeryQuote step by step: pick the surgeon, add procedures, let fees calculate, and generate a branded PDF.",
  "managing-your-quotes": "View, search, edit, and track every quote from the dashboard. Filter by status, surgeon, or patient and follow each quote from draft to invoiced.",
  // Quote Builder
  "searching-filtering-quotes": "Find any quote fast in MySurgeryQuote. Search by patient name, DOB, quote number, surgeon, status, or PCC, and filter the list by date range.",
  "applying-discounts": "Apply discounts to a quote in MySurgeryQuote with reason codes like courtesy revision, implant warranty, or a custom reason for clean records.",
  "editing-duplicating-quotes": "Edit an existing quote or duplicate one as a starting point. Original pricing is preserved, and a banner flags quotes when current pricing has changed.",
  "quote-notes-documentation": "Add internal notes and documentation to a quote in MySurgeryQuote to keep your team aligned on patient details, approvals, and follow-up.",
  "quick-quotes-templates": "Save common procedure combinations as Quick Quote templates. Load a Mommy Makeover or any bundle in one click, then customize from there.",
  "adding-notes-to-procedures": "Attach notes to individual procedures on a quote, such as area, technique, or patient-specific detail, so the PDF reads clearly for the patient.",
  "multi-area-procedures": "Quote procedures priced per area, like liposuction or laser hair removal. Set the per-area price and quantity, and the total calculates automatically.",
  "quote-deletion-rules": "Understand when a quote can be deleted versus archived in MySurgeryQuote, and how invoiced quotes are protected to keep your reporting accurate.",
  "facility-selection-in-quotes": "Select which facility to use when creating a quote in MySurgeryQuote. Each facility applies its own fee structure and branding automatically.",
  // Admin Settings
  "practice-settings-overview": "A tour of MySurgeryQuote admin settings: procedures, surgeons, users, implants, fees, commissions, branding, and EMR integration in one place.",
  "managing-procedures": "Add, edit, and organize procedures in MySurgeryQuote. Set per-procedure fees, surgical time, categories, and notes. Includes upload from CSV/Excel.",
  "managing-surgeons": "Add surgeons and configure each one's price list, assigned procedures, and commission rates so the right pricing loads at the start of every quote.",
  "managing-users": "Add and manage staff users in MySurgeryQuote. Assign Admin, User, or Org Admin roles to control who can create, edit, and send quotes.",
  "managing-implants": "Organize implants by brand and type in MySurgeryQuote, set per-implant pricing, and make them available to add to quotes and the implant log.",
  "managing-additional-fees": "Set up additional fees, like garments or labs, in MySurgeryQuote so they can be added to quotes as line items with consistent pricing.",
  "understanding-price-history": "See how MySurgeryQuote tracks every price change with user, date, and old and new values, so historical quotes always reflect what the patient saw.",
  "uploading-procedures-fees": "Bulk-import your procedure list and fees into MySurgeryQuote from CSV or Excel. Our team helps with the initial migration during setup.",
  "fee-settings-calculations": "Learn how MySurgeryQuote calculates facility and anesthesia fees from base fee, hourly rate, included hours, and cap, based on total surgical time.",
  "global-fee-adjustments": "Apply a percentage increase across every procedure in one click, or adjust a single procedure, with built-in tools and no spreadsheet exports.",
  "surgeon-procedure-assignments": "Control which procedures each surgeon can quote in MySurgeryQuote, so junior partners only see and offer what they're approved for.",
  "danger-zone-pricing-tools": "Use the high-impact pricing tools in MySurgeryQuote carefully: bulk price changes and resets that affect your whole catalog. What to know first.",
  "emr-integration-modmed": "Connect MySurgeryQuote to ModMed to send quote PDFs to patient charts and push billing charges. Setup steps, credentials, and permissions explained.",
  "setting-up-commissions": "Configure commission tracking for PCCs and reps. Set group rates or individual rates, vary by provider, and run reports on closed quotes.",
  "managing-multiple-facilities": "Create separate facility profiles in MySurgeryQuote, each with its own base fee, hourly rate, included hours, cap, and branding for multi-site quoting.",
  // PDF & Email
  "generating-downloading-pdfs": "Generate a branded patient quote PDF in MySurgeryQuote with your logo, colors, and contact info, then download it to share however you like.",
  "emailing-quotes-to-patients": "Email a quote PDF to your patient directly from MySurgeryQuote. Every send is logged with date and recipient, and you can resend on demand.",
  // Multi-Practice
  "multi-practice-overview": "How MySurgeryQuote supports multiple practice locations under one organization, with per-location branding and an org-level view of every site.",
  "setting-up-a-new-practice": "Add a new practice location to your MySurgeryQuote organization, configure its branding and settings, and start quoting from it the same day.",
  "practice-branding-customization": "Customize each location's branding in MySurgeryQuote, logo, colors, and contact details, so every quote PDF matches the right practice.",
  "understanding-data-isolation": "Understand how MySurgeryQuote isolates data between locations in a multi-practice organization, and what org and location admins can each see.",
  "practice-administrator-guide": "A guide for organization administrators: manage locations, users, roles, and settings across your entire MySurgeryQuote organization from one account.",
  // Troubleshooting
  "common-issues-solutions": "Quick fixes for common MySurgeryQuote issues: login problems, missing buttons, pricing that looks off, and PDF or email delivery questions.",
  "getting-support": "How to get help with MySurgeryQuote. Reach the team through in-app support and the contact form, and what to include for the fastest response.",
  // Med Spa Features
  "med-spa-overview": "How MySurgeryQuote's med spa mode works: a streamlined flow for injectables, lasers, and skin treatments with unit pricing and unlimited providers.",
  "unit-based-pricing-for-injectables": "Price injectables by the unit, syringe, or vial in MySurgeryQuote. Enter the quantity, like 50 units of Botox, and the quote totals instantly.",
  "membership-tiers": "Create VIP membership tiers in MySurgeryQuote with automatic percentage discounts that apply across a med spa quote when you select the tier.",
  "provider-tiers-pricing-by-credential": "Set pricing by provider credential in MySurgeryQuote, so an MD and an RN can charge different rates for the same treatment automatically.",
  "adding-products-to-quotes": "Add retail skincare and products to a med spa quote in MySurgeryQuote alongside treatments for a complete, professional patient estimate.",
  "creating-a-med-spa-quote": "Build a med spa quote in MySurgeryQuote: pick the provider, add unit-priced treatments and packages, apply membership discounts, and send the PDF.",
  // Combined Practices
  "combined-practice-overview": "Run surgical and med spa quoting under one MySurgeryQuote account. How combined practices work and when to use each quote type.",
  "choosing-quote-type-surgical-vs-med-spa": "Choose between a surgical and a med spa quote in MySurgeryQuote. How each mode handles fees, and how mixed quotes apply surgical fees only.",
  "managing-surgeons-providers": "Manage both surgeons and med spa providers in a combined MySurgeryQuote practice, including pricing, assignments, and where each appears.",
  "adding-med-spa-to-your-surgical-account": "Add med spa quoting to an existing surgical MySurgeryQuote plan for $50/mo per location, with the same login and patient records.",
  // Reports
  "reports-overview": "An overview of MySurgeryQuote reporting: billing summary, procedure log, implant log, PCC productivity, and commissions, each filterable and CSV-exportable.",
  "procedure-log": "See every billed procedure across surgeons and locations in MySurgeryQuote. Filter by date, surgeon, or status, and export the log to CSV.",
  "implant-log": "Track every implant quoted in MySurgeryQuote by brand, type, and patient. Filter and export the implant log for inventory and reorder planning.",
  "pcc-productivity": "Measure patient care coordinator performance in MySurgeryQuote: quotes created, conversion rate, and revenue generated per coordinator.",
  "commission-reports": "Run commission reports in MySurgeryQuote by PCC or rep. See YTD, same period last year, and full year earnings on invoiced quotes, exportable to CSV.",
  // EMR Integrations
  "emr-integrations-overview": "How MySurgeryQuote connects to ModMed, DrChrono, and GoHighLevel to send quotes to charts and CRM records. All integrations included on every plan.",
  "how-to-connect-modmed-modernizing-medicine": "Step-by-step setup to connect ModMed to MySurgeryQuote, from requesting API access to entering credentials and sending your first quote to a chart.",
  "how-to-connect-drchrono": "Connect DrChrono to MySurgeryQuote with secure OAuth. Create the API app, enter credentials, authorize, and send quote PDFs to patient records.",
  "troubleshooting-emr-connection-issues": "Fix common EMR connection problems in MySurgeryQuote: blocked popups, failed authorization, expired tokens, and missing patient search results.",
  "how-to-send-quotes-to-your-emr": "Send a finished quote PDF from MySurgeryQuote to a patient's chart in one click, with built-in patient search and a logged record of every send.",
  "how-to-connect-gohighlevel": "Connect GoHighLevel to MySurgeryQuote with OAuth to send quote PDFs to contacts and create invoices. Setup steps and troubleshooting included.",
  "sending-quotes-invoices-to-gohighlevel": "Send quote PDFs and create invoices in GoHighLevel from MySurgeryQuote, and trigger follow-up automations when a quote or invoice is sent.",
};

let updated = 0;
const missing = [];
for (const [slug, d] of Object.entries(desc)) {
  const f = path.join("content/help", `${slug}.mdx`);
  if (!fs.existsSync(f)) {
    missing.push(slug);
    continue;
  }
  let s = fs.readFileSync(f, "utf8");
  if (!/^description: ".*"$/m.test(s)) {
    missing.push(`${slug} (no description line)`);
    continue;
  }
  s = s.replace(/^description: ".*"$/m, () => `description: ${JSON.stringify(d)}`);
  fs.writeFileSync(f, s);
  updated++;
}
console.log(`descriptions updated: ${updated} / ${Object.keys(desc).length}`);
if (missing.length) console.log("MISSING:", missing.join(", "));

// sanity: any help article whose description is still the auto-generated kind?
const all = fs.readdirSync("content/help").filter((f) => f.endsWith(".mdx"));
console.log(`total help files: ${all.length}`);
