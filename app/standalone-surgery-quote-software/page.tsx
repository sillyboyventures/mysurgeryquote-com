import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Zap,
  Calculator,
  Users,
  FileText,
  History,
  PlugZap,
  ShieldCheck,
} from "lucide-react";
import BrowserFrame from "@/components/BrowserFrame";
import WaveDivider from "@/components/WaveDivider";
import FAQ from "@/components/sections/FAQ";
import FinalCta from "@/components/sections/FinalCta";

const PROD = "https://www.mysurgeryquote.com";
const CANONICAL = `${PROD}/standalone-surgery-quote-software/`;

export const metadata: Metadata = {
  alternates: { canonical: CANONICAL },
  openGraph: {
    siteName: "MySurgeryQuote",
    type: "website",
    images: ["/og/home.png"],
  },
  twitter: { card: "summary_large_image", images: ["/og/home.png"] },
  title: "Standalone Surgery Quote Software",
  description:
    "A purpose-built, standalone quoting tool that works alongside any EMR. Itemized patient quotes in under 2 minutes with surgeon-specific pricing, automatic facility and anesthesia fees, and branded PDFs. HIPAA compliant.",
};

// Honest capability claims, each drawn from existing product pages
// (/surgical-practices, /features, /integrations, /pricing).
const capabilities = [
  {
    icon: Zap,
    title: "Quotes in Under 2 Minutes",
    body: "A guided seven-step flow takes you from patient info through procedures, implants, and fees to a finished quote. No spreadsheet wrangling.",
  },
  {
    icon: Calculator,
    title: "Automatic Fee Calculations",
    body: "Facility and anesthesia fees compute from total surgical time on every quote, using the rates and caps you set.",
  },
  {
    icon: Users,
    title: "Surgeon-Specific Pricing",
    body: "Each surgeon gets their own price list. Select the surgeon and pricing loads automatically, without affecting your master list.",
  },
  {
    icon: FileText,
    title: "Branded PDFs & Email Delivery",
    body: "Generate professional, itemized PDFs in your practice branding and email them to patients directly, with delivery logged.",
  },
  {
    icon: History,
    title: "Quote History & Reporting",
    body: "Every quote is searchable by patient, date, surgeon, or status, with price history preserved and reports for procedures, implants, and commissions.",
  },
  {
    icon: ShieldCheck,
    title: "HIPAA Compliant",
    body: "Encryption at rest and in transit, automatic session timeouts, role-based access control, and audit logging.",
  },
];

const faqs = [
  {
    q: "What is standalone surgery quote software?",
    a: "Standalone surgery quote software is a dedicated tool focused only on building patient cost estimates, separate from your EMR or billing system. MySurgeryQuote is purpose-built for this one job, so quoting is faster and more itemized than a general EMR's built-in quoting feature.",
  },
  {
    q: "Does MySurgeryQuote replace my EMR?",
    a: "No. It is designed to work alongside your existing EMR, not replace it. You keep your EMR for charting, scheduling, and billing, and use MySurgeryQuote for fast, itemized patient quotes.",
  },
  {
    q: "Which EMRs does it work with?",
    a: "MySurgeryQuote integrates with ModMed, DrChrono, GoHighLevel, and Nextech. You can send finished quote PDFs directly to the patient's chart or CRM contact in one click. It also works on its own if you don't connect an EMR.",
  },
  {
    q: "Why use a standalone tool instead of my EMR's built-in quoting?",
    a: "EMR quoting features are typically built for single-line charge entry, not multi-procedure cosmetic estimates with surgeon fees, facility and anesthesia math, and implants. A purpose-built tool itemizes all of those automatically and produces a patient-ready PDF in under two minutes.",
  },
  {
    q: "Can each surgeon have their own pricing?",
    a: "Yes. Each surgeon can have custom pricing for any procedure. Select the surgeon at the start of a quote and prices adjust automatically without changing your master price list.",
  },
  {
    q: "Is there a contract?",
    a: "No. Pay monthly and cancel anytime. There are no setup fees and no cancellation fees.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${PROD}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Standalone Surgery Quote Software",
      item: CANONICAL,
    },
  ],
};

// Note: the site-wide SoftwareApplication schema is emitted globally in
// app/layout.tsx, so it is not repeated here. This page adds BreadcrumbList
// and FAQPage only.

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function StandaloneSurgeryQuoteSoftwarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Hero */}
      <section
        className="relative"
        style={{
          background:
            "radial-gradient(ellipse at top right, #1FA9F7 0%, #0095F3 50%, #0078C7 100%)",
        }}
      >
        <div className="mx-auto max-w-5xl px-6 pb-24 pt-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70 md:text-sm">
            Standalone Quoting Tool
          </p>
          <h1 className="mx-auto max-w-3xl font-poppins text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl">
            Standalone surgery quote software that works alongside your EMR
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            A purpose-built tool for one job: fast, itemized patient quotes. Keep
            your EMR for charting and billing. Build professional quotes in under
            2 minutes and send them straight to the patient&apos;s chart.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/free-trial/"
              className="rounded-lg bg-button-navy px-6 py-3 font-medium text-white shadow-lg transition-opacity hover:opacity-90"
            >
              Start Free Trial
            </Link>
            <a
              href="https://demo.mysurgeryquote.com/demo"
              target="_blank"
              rel="noopener nofollow"
              className="rounded-lg border border-white px-6 py-3 font-medium text-white transition-colors hover:bg-white hover:text-primary"
            >
              Try Demo
            </a>
          </div>
          <div className="mx-auto mt-12 max-w-5xl">
            <BrowserFrame
              src="/screens/new-quote-wizard.png"
              alt="MySurgeryQuote new-quote wizard"
              priority
            />
          </div>
        </div>
        <WaveDivider />
      </section>

      {/* 2. A point tool, not a platform */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-poppins text-4xl font-bold text-navy">
            A point tool, not another platform to migrate to
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
            EMRs are built for charting, scheduling, and billing. Their quoting
            features are usually built for single-line charge entry, not for
            multi-procedure cosmetic estimates with surgeon fees, facility and
            anesthesia math, and implants. MySurgeryQuote does that one job well
            and stays out of the way of the system you already run.
          </p>
        </div>
      </section>

      {/* 3. Capabilities */}
      <section className="bg-bg-blue-tint py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-poppins text-4xl font-bold text-navy">
            What the standalone tool does
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="rounded-2xl border border-border bg-white p-6"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-bg-accent text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-poppins text-lg font-semibold text-navy">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Works alongside your EMR */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-bg-accent text-primary">
              <PlugZap className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-poppins text-3xl font-bold text-navy">
              Connects to the EMR you already use
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text-muted">
              Build the quote in MySurgeryQuote, then send the finished PDF
              straight to the patient&apos;s chart. Integrations are included on
              every plan.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "ModMed — one-click PDF send to the patient chart",
                "DrChrono — send quotes to the patient record",
                "GoHighLevel — send quotes and invoices to your CRM",
                "Nextech — send quotes to the patient chart",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-text"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/integrations/"
              className="mt-6 inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
            >
              See all integrations <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div>
            <BrowserFrame
              src="/screens/modmed-ui.png"
              alt="Sending a finished MySurgeryQuote PDF into a patient's EMR chart"
              width={1538}
              height={781}
            />
          </div>
        </div>
      </section>

      {/* 5. Compare further */}
      <section className="bg-bg-accent py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-poppins text-2xl font-bold text-navy md:text-3xl">
            See how it compares to EMR quoting
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">
            Read the honest, side-by-side breakdowns of EMR built-in quoting
            versus a dedicated tool.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/emr-quoting-tools-compared/"
              className="font-medium text-primary transition-colors hover:text-primary-dark"
            >
              EMR quoting tools compared <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/modmed-quoting-vs-mysurgeryquote/"
              className="font-medium text-primary transition-colors hover:text-primary-dark"
            >
              ModMed vs. MySurgeryQuote <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/drchrono-quoting-vs-mysurgeryquote/"
              className="font-medium text-primary transition-colors hover:text-primary-dark"
            >
              DrChrono vs. MySurgeryQuote <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <FAQ items={faqs} className="bg-bg-alt py-24" />

      {/* 7. Final CTA */}
      <FinalCta />
    </>
  );
}
