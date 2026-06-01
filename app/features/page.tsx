import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import BrowserFrame from "@/components/BrowserFrame";
import WaveDivider from "@/components/WaveDivider";
import FinalCta from "@/components/sections/FinalCta";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.mysurgeryquote.com/features/" },
  openGraph: { siteName: "MySurgeryQuote", type: "website", images: ["/og/features.png"] },
  twitter: { card: "summary_large_image", images: ["/og/features.png"] },
  title: "Features: Surgeon Pricing, Commissions, Reporting",
  description:
    "Every feature MySurgeryQuote offers: multiple surgeon fee schedules, commission tracking, procedure log reporting, quick quotes, multi-location, and more. The quoting tool built for medical practices.",
};

type Feature = {
  id: string;
  nav: string;
  image: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
};

const features: Feature[] = [
  {
    id: "surgeon-pricing",
    nav: "Surgeon Pricing",
    image: "/screens/surgeons.png",
    eyebrow: "Pricing per surgeon",
    title: "Multiple surgeon fee schedules",
    body: "Every surgeon in your practice can have their own price list. Select the surgeon at the start of a quote, and prices auto-load. No spreadsheets, no manual overrides, no missed fees. Plus, each surgeon can have their own assigned procedures so junior partners only see what they're approved to quote.",
    bullets: [
      "Per-surgeon procedure pricing, independent of master price list",
      "Custom procedure assignments per surgeon",
      "Surgeon selector at the start of every quote",
      "Per-surgeon commission rate overrides",
      "Full audit trail of price changes by user and date",
    ],
  },
  {
    id: "price-adjustments",
    nav: "Price Adjustments",
    image: "/screens/procedures.png",
    eyebrow: "Price management",
    title: "Individual and global price adjustments",
    body: "Bump a single procedure's price by an exact amount, or apply a percentage across every procedure in your catalog in one click. Built-in tools for annual price increases. No CSV exports, no spreadsheet math, no forgotten line items.",
    bullets: [
      "Edit any procedure's price inline with one click",
      "Apply a global percentage increase across all procedures",
      "Price History tracks every change with user, date, and old/new values",
      "Banner alerts on old quotes when current pricing has changed",
      "CSV/Excel import for bulk updates and migrations",
    ],
  },
  {
    id: "facility-fees",
    nav: "Facility Fees",
    image: "/screens/fee-settings.png",
    eyebrow: "Facility math",
    title: "Multiple facility fee profiles",
    body: "Configure separate fee structures for every facility you operate: in-office OR, ambulatory surgery center, hospital. Each facility gets its own base fee, hourly rate, included hours, and maximum cap. Select the facility on the quote, and the math runs automatically based on total surgical time.",
    bullets: [
      "Unlimited facility profiles with independent fee structures",
      "Base fee + hourly rate after included hours + maximum cap",
      "Per-facility branding on quotes for multi-site practices",
      "Surgical time auto-calculates from procedures on the quote",
      "Formula shown transparently: base_fee + (min(surgery_time, max_cap) − included_hours) × hourly_rate",
    ],
  },
  {
    id: "anesthesia-fees",
    nav: "Anesthesia Fees",
    image: "/screens/fee-settings.png",
    eyebrow: "Anesthesia math",
    title: "Anesthesia fees on autopilot",
    body: "Same formula structure as facility fees but configured independently. Set your anesthesia base, hourly rate, included hours, and cap once. Every quote calculates the fee automatically based on surgical time. No more manually adding anesthesia onto every quote.",
    bullets: [
      "Independent anesthesia fee configuration per practice",
      "Auto-applies only to surgical procedures (not med spa items)",
      "Updates automatically if surgery time changes mid-quote",
      "Excluded automatically on med spa mixed quotes",
      "Same audit trail as facility fees",
    ],
  },
  {
    id: "quick-quotes",
    nav: "Quick Quotes",
    image: "/screens/quick-quotes.png",
    eyebrow: "Bundled procedures",
    title: "Quick Quote templates for bundled procedures",
    body: "Save your Mommy Makeover, Facelift Package, Daddy Do-Over, or any common combination as a Quick Quote template. One click to start a quote from a template: procedures, implants, additional fees all auto-load. Customize from there. A 10-minute quote build becomes 30 seconds.",
    bullets: [
      "Unlimited templates, practice-wide or per-surgeon",
      "One-click apply, then customize as needed",
      "Auto-loads procedures, implants, and additional fees",
      "Editable after applying: templates are starting points, not locks",
      "Patients see a clean professional PDF, not a stitched-together estimate",
    ],
  },
  {
    id: "commissions",
    nav: "Commissions",
    image: "/screens/commissions.png",
    eyebrow: "Commission tracking",
    title: "Commission tracking for patient care coordinators",
    body: "Track commissions for PCCs, schedulers, and reps without leaving the quoting tool. Set group rates (e.g. all PCCs at 5%) or individual rates. Vary rates by provider: 5% on Dr. Smith's cases, 3% on Dr. Jones's. Only invoiced quotes count toward commissions, so reps earn on closed business, not estimates.",
    bullets: [
      "Commission groups (e.g. all PCCs at one rate) or per-user rates",
      "Per-provider rate variation for split practices",
      "Only invoiced quotes credit commissions",
      "YTD, Same Period Last Year, and Full Year views",
      "Quick filters: Past Month, Current Month, Year to Date, Last 12 Months",
      "CSV export for payroll handoff",
    ],
  },
  {
    id: "reporting",
    nav: "Reporting",
    image: "/screens/reports.png",
    eyebrow: "Billed services",
    title: "Procedure and implant log reporting",
    body: "See every billed service across all surgeons and locations in one dashboard. Filter by date range or surgeon. Tabs for Summary, Billing Summary, Procedure Log, Implant Log, PCC Productivity, and Commissions, each exportable to CSV for accountants, year-end tax prep, or operational analysis.",
    bullets: [
      "Procedure Log: every billed procedure with date, surgeon, patient, fee",
      "Implant Log: every implant quoted with brand, type, patient, status",
      "PCC Productivity: quotes generated, conversion rate, commission earned per coordinator",
      "Billing Summary: revenue by category, surgeon, or facility",
      "Quick filters (Past Month, Current Month, YTD, Last 12 Months) plus custom date range",
      "One-click CSV export from any tab",
    ],
  },
  {
    id: "implants",
    nav: "Implants",
    image: "/screens/implants.png",
    eyebrow: "Implant tracking",
    title: "Implants live alongside procedures",
    body: "Organize implants by brand and type: Allergan Natrelle, Mentor, Sientra, or any vendor you use. Add them to quotes with pricing, model, and any patient-specific notes. Implants stay attached to the patient record. No more separate spreadsheet to reconcile against the OR pull list.",
    bullets: [
      "Brands and types nested by manufacturer",
      "Per-implant pricing with visible cost on quotes",
      "Quote-level implant log per patient",
      "Surgeon-specific implant preferences",
      "Practice-wide implant log for inventory and reorder planning",
    ],
  },
  {
    id: "multi-location",
    nav: "Multi-Location",
    image: "/screens/surgeons.png",
    eyebrow: "Multi-location",
    title: "Manage all your practice locations from one account",
    body: "Operate multiple practice locations under one organization. Surgeons can work across locations, each location gets its own branding on quotes, and the org-level dashboard shows totals across the entire group. Switch between locations from the top-right dropdown without re-logging in.",
    bullets: [
      "Per-location branding on PDF quotes",
      "Org-level dashboard with totals across all locations",
      "Surgeons can work at multiple locations",
      "Location switcher in the top nav for instant context change",
      "Org admins see everything, location admins see only their site",
    ],
  },
  {
    id: "quote-history",
    nav: "Quote History",
    image: "/screens/quote-history.png",
    eyebrow: "Quote history",
    title: "Find any quote in seconds",
    body: "Every quote your practice has ever created is searchable. Look up by patient name, date of birth, quote number, surgeon, status, or PCC. Edit old quotes. Original pricing is preserved so historical quotes match what the patient was originally shown. A banner appears when prices have changed, so you can apply current pricing if needed.",
    bullets: [
      "Search by patient name, DOB, quote number, surgeon, or PCC",
      "Filter by status (Draft, Sent, Invoiced) and date range",
      "Edit any quote with price preservation",
      "Resend Email straight from the quote row",
      "Per-quote audit trail showing every edit, by user and timestamp",
    ],
  },
  {
    id: "pdfs-email",
    nav: "PDFs & Email",
    image: "/screens/new-quote-wizard.png",
    eyebrow: "Delivery",
    title: "Branded PDFs, emailed directly to patients",
    body: "Generate a branded PDF with your practice logo, colors, name, and contact info. Email the quote to the patient directly from the system. No downloading, attaching, and forwarding. Every send is logged so you know when the patient was sent the quote, and you can resend on demand.",
    bullets: [
      "Your logo, your colors, your contact info on every quote",
      "Per-location branding for multi-site practices",
      "One-click email send to patient with subject and message",
      "Delivery logged on the quote: see when and to whom",
      "Patients can be sent quotes directly to their ModMed/DrChrono/GoHighLevel record (see Integrations)",
    ],
  },
  {
    id: "roles-permissions",
    nav: "Roles & Permissions",
    image: "/screens/users.png",
    eyebrow: "Team management",
    title: "Roles and permissions for your whole team",
    body: "Unlimited staff users on every plan. Add your front desk, PCCs, OR coordinators, and surgeons without per-seat fees. Three role types control who sees what: Admin (full access), User (creates and edits quotes), and Org Admin (multi-location oversight). HIPAA-compliant audit logging on every sensitive action.",
    bullets: [
      "Unlimited users on every plan, no per-seat fees",
      "Admin / User / Org Admin role tiers",
      "HIPAA-compliant audit logging",
      "Automatic session timeouts for compliance",
      "Per-user activity log for sensitive actions",
    ],
  },
];

const faqs = [
  {
    q: "Can each surgeon have their own price list?",
    a: "Yes. Every surgeon in your practice can have an independent procedure price list. Select the surgeon at the start of a quote and the prices auto-load. Commission rates and procedure assignments can also vary per surgeon.",
  },
  {
    q: "How are facility and anesthesia fees calculated?",
    a: "You set a base fee, an hourly rate after included hours, and a maximum cap for each facility. The system uses the formula base_fee + (min(surgery_time, max_cap) - included_hours) × hourly_rate. Surgical time auto-calculates from the procedures on the quote.",
  },
  {
    q: "Do you track commissions for patient care coordinators?",
    a: "Yes. You can set group rates (all PCCs at 5%) or per-user rates, and vary rates by provider. Only invoiced quotes credit commissions. Reports cover YTD, Same Period Last Year, Full Year, and any custom date range.",
  },
  {
    q: "What does the procedure log report include?",
    a: "Every billed procedure across all surgeons and locations with date, surgeon, patient, fee, and status. Filter by date range or surgeon. Tabs cover Billing Summary, Procedure Log, Implant Log, PCC Productivity, and Commissions. Every tab exports to CSV.",
  },
  {
    q: "Can I manage multiple practice locations from one account?",
    a: "Yes. Run all your locations under one organization. Each location gets its own branding on quotes. Surgeons can work at multiple locations. The org-level dashboard shows totals across all sites, and you switch context from a dropdown in the top nav.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FeaturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* A. Page hero */}
      <section
        className="relative"
        style={{
          background:
            "radial-gradient(ellipse at top right, #1FA9F7 0%, #0095F3 50%, #0078C7 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h1 className="font-poppins text-4xl font-bold text-white md:text-5xl">
            Every feature, in one place
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            What MySurgeryQuote does, what it doesn&apos;t, and why surgeons use
            it instead of their EMR&apos;s quoting tool.
          </p>
        </div>
        <WaveDivider />
      </section>

      {/* B. Sticky anchor nav */}
      <nav className="sticky top-16 z-40 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {features.map((f) => (
            <a
              key={f.id}
              href={`#${f.id}`}
              className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-bg-accent hover:text-primary"
            >
              {f.nav}
            </a>
          ))}
        </div>
      </nav>

      {/* C. Twelve feature sections */}
      {features.map((feature, index) => {
        const reverse = index % 2 === 1;
        return (
          <section
            key={feature.id}
            id={feature.id}
            className="mx-auto max-w-6xl scroll-mt-36 px-6 py-20"
          >
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className={reverse ? "md:order-2" : ""}>
                <BrowserFrame src={feature.image} alt={feature.title} />
              </div>
              <div className={reverse ? "md:order-1" : ""}>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  {feature.eyebrow}
                </p>
                <h2 className="mt-2 font-poppins text-3xl font-bold text-navy">
                  {feature.title}
                </h2>
                <p className="mt-4 mb-6 text-lg leading-relaxed text-text-muted">
                  {feature.body}
                </p>
                <ul className="space-y-3">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-text">
                      <Check
                        className="mt-1 h-5 w-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/free-trial/"
                  className="mt-6 inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
                >
                  Start free trial <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* Visible FAQ: content matches the FAQPage JSON-LD above */}
      <FAQ items={faqs} className="bg-bg-alt py-24" />

      {/* D. Final CTA */}
      <FinalCta />
    </>
  );
}
