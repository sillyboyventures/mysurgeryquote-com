import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Calculator,
  FileText,
  Users,
  Lock,
  History,
  ShieldCheck,
  CreditCard,
  Split,
} from "lucide-react";
import BrowserFrame from "@/components/BrowserFrame";
import WaveDivider from "@/components/WaveDivider";
import FinalCta from "@/components/sections/FinalCta";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.mysurgeryquote.com/surgical-practices/" },
  openGraph: { siteName: "MySurgeryQuote", type: "website", images: ["/og/surgical.png"] },
  twitter: { card: "summary_large_image", images: ["/og/surgical.png"] },
  title: "Surgery Quote Software for Cosmetic Surgeons",
  description:
    "Multi-procedure quotes with automatic facility and anesthesia fee calculations. Surgeon-specific pricing. Implant tracking. Quick Quote templates. Professional PDFs in under 2 minutes.",
};

const painPoints = [
  {
    icon: "/icons/icon-calculator.svg",
    title: "Manual Fee Calculations",
    body: "Still calculating facility and anesthesia fees by hand for every quote?",
  },
  {
    icon: "/icons/icon-spreadsheet.svg",
    title: "Spreadsheet Pricing",
    body: "Managing surgeon-specific pricing across multiple spreadsheets?",
  },
  {
    icon: "/icons/icon-handwritten.svg",
    title: "Unprofessional Quotes",
    body: "Handing patients handwritten estimates that don't reflect your practice?",
  },
];

type Block = {
  image: string;
  width: number;
  height: number;
  title: string;
  body: string;
  href: string;
  linkText?: string;
};

const featureBlocks: Block[] = [
  {
    image: "/screens/new-quote-wizard.png",
    width: 3200,
    height: 2400,
    title: "7-Step Quote Wizard",
    body: "A guided seven-step flow walks you from patient info through procedures, implants, fees, and delivery. Nothing gets missed, and a complete quote takes under two minutes.",
    href: "/features/#pdfs-email",
  },
  {
    image: "/screens/surgeons.png",
    width: 3200,
    height: 2400,
    title: "Surgeon-Specific Pricing",
    body: "Each surgeon gets their own price list and assigned procedures. Select the surgeon and pricing loads automatically. No spreadsheets, no manual overrides.",
    href: "/features/#surgeon-pricing",
  },
  {
    image: "/screens/implants.png",
    width: 3200,
    height: 2400,
    title: "Implants Built In",
    body: "Organize implants by brand and type and add them right on the quote. They stay attached to the patient record. No separate spreadsheet to reconcile against the OR pull list.",
    href: "/features/#implants",
  },
  {
    image: "/screens/quick-quotes.png",
    width: 3200,
    height: 2400,
    title: "Quick Quotes for Common Combinations",
    body: "Save common combinations like a Mommy Makeover as a template. One click loads procedures, implants, and fees, then customize from there.",
    href: "/features/#quick-quotes",
  },
  {
    image: "/screens/quote-history.png",
    width: 3200,
    height: 2400,
    title: "Full Quote History",
    body: "Every quote is searchable by patient, date, surgeon, or status. Edit old quotes with original pricing preserved, and resend by email in one click.",
    href: "/features/#quote-history",
  },
  {
    image: "/screens/surgeons.png",
    width: 3200,
    height: 2400,
    title: "Multiple Location Support",
    body: "Run all your locations under one organization with per-location branding. Switch locations from the top nav and see org-wide totals on one dashboard.",
    href: "/features/#multi-location",
  },
  {
    image: "/screens/modmed-ui.png",
    width: 1538,
    height: 781,
    title: "EMR Integration",
    body: "Send finished quote PDFs straight to the patient's chart in ModMed, DrChrono, GoHighLevel, or Nextech. One click from quote to chart.",
    href: "/modmed-quoting/",
    linkText: "Better quoting for ModMed practices",
  },
];

const capabilities = [
  { icon: Calculator, title: "Automatic Fee Calculations", body: "Facility and anesthesia fees compute from surgical time on every quote." },
  { icon: FileText, title: "PDF & Email Delivery", body: "Branded PDFs emailed to patients directly, with delivery logged." },
  { icon: Users, title: "Unlimited Staff Users", body: "Add your whole team (front desk, PCCs, surgeons) with no per-seat fees." },
  { icon: Lock, title: "Role-Based Permissions", body: "Admin, User, and Org Admin roles control who sees and edits what." },
  { icon: History, title: "Price History & Audit Trail", body: "Every price change and quote edit is logged by user and date." },
  { icon: ShieldCheck, title: "HIPAA Compliant", body: "Encryption at rest and in transit, session timeouts, and audit logging." },
  { icon: CreditCard, title: "Payment Status Tracking", body: "Mark deposit paid, surgery scheduled, and balance paid, with badges on every quote." },
  { icon: Split, title: "Insurance-Covered Split", body: "Flag procedures as billed to insurance so the patient total covers cosmetic only." },
];

const plans = [
  {
    name: "Solo",
    price: "$100",
    popular: false,
    features: [
      "1 surgeon",
      "Unlimited quotes & staff users",
      "Automatic facility & anesthesia fees",
      "Branded PDFs & email delivery",
      "HIPAA compliant",
    ],
  },
  {
    name: "Practice",
    price: "$150",
    popular: true,
    features: [
      "2 surgeons included (+$50/mo each)",
      "Everything in Solo",
      "Surgeon-specific pricing",
      "Commission tracking for PCCs",
      "Quick Quote templates",
    ],
  },
  {
    name: "Multi-Location",
    price: "$350",
    popular: false,
    features: [
      "2 locations included (+$150/mo each)",
      "Everything in Practice",
      "Per-location branding",
      "Org-level dashboard & reporting",
      "Multi-location user roles",
    ],
  },
];

const faqs = [
  {
    q: "How are facility and anesthesia fees calculated?",
    a: "You set your base fee, hourly rate after included hours, and optional cap. The system calculates fees automatically based on total surgical time for all procedures on the quote.",
  },
  {
    q: "Can different surgeons have different prices?",
    a: "Yes. Each surgeon can have custom pricing for any procedure. Select the surgeon and prices adjust automatically without affecting your master price list.",
  },
  {
    q: "Can I import my existing procedure list?",
    a: "Yes. We support CSV/Excel import for bulk procedure upload. We'll help you migrate during setup at no extra charge.",
  },
  {
    q: "What if I need to add more surgeons later?",
    a: "Contact us and we'll add surgeons at $50/month each (or $40/month for Multi-Location plans). No downtime.",
  },
  {
    q: "How do Quick Quote templates work?",
    a: "Save any combination of procedures, implants, and fees as a template. Start a new quote from a template with one click, then customize as needed.",
  },
  {
    q: "Is there a contract?",
    a: "No. Pay monthly, cancel anytime. No setup fees, no cancellation fees.",
  },
  {
    q: "Is patient data secure?",
    a: "Yes. All data is encrypted at rest and in transit. HIPAA compliant with audit logging, session timeouts, and role-based access control.",
  },
  {
    q: "Can I quote surgical and med spa services together?",
    a: "Yes. If you have both surgical and med spa enabled, you can create mixed quotes. Facility and anesthesia fees apply only to surgical items automatically.",
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

export default function SurgicalPracticesPage() {
  return (
    <>
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
            For Surgical Practices
          </p>
          <h1 className="mx-auto max-w-3xl font-poppins text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl">
            Surgery quote software that handles the math
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            Multi-procedure quotes with automatic facility and anesthesia fee
            calculations. Surgeon-specific pricing. Professional PDFs in under 2
            minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pricing/"
              className="rounded-lg bg-button-navy px-6 py-3 font-medium text-white shadow-lg transition-opacity hover:opacity-90"
            >
              See Pricing
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

      {/* 2. Sound familiar? */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-poppins text-4xl font-bold text-navy">
            Sound familiar?
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-white p-8 text-center"
              >
                <Image
                  src={p.icon}
                  alt=""
                  aria-hidden="true"
                  width={80}
                  height={80}
                  className="mx-auto h-16 w-16"
                />
                <h3 className="mt-4 font-poppins text-lg font-semibold text-navy">
                  {p.title}
                </h3>
                <p className="mt-2 text-text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Feature blocks */}
      <section className="bg-bg-blue-tint py-12">
        <div className="mx-auto max-w-6xl px-6">
          {featureBlocks.map((block, index) => {
            const reverse = index % 2 === 1;
            return (
              <div
                key={block.title}
                className="grid items-center gap-12 py-12 md:grid-cols-2"
              >
                <div className={reverse ? "md:order-2" : ""}>
                  <BrowserFrame
                    src={block.image}
                    alt={block.title}
                    width={block.width}
                    height={block.height}
                  />
                </div>
                <div className={reverse ? "md:order-1" : ""}>
                  <h3 className="font-poppins text-2xl font-bold text-navy">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-text-muted">
                    {block.body}
                  </p>
                  <Link
                    href={block.href}
                    className="mt-4 inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
                  >
                    {block.linkText ?? "Learn more on Features"}{" "}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. All your services, one system */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-poppins text-4xl font-bold text-navy">
            All your services. One system.
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

      {/* 5. Hybrid upsell */}
      <section className="bg-white pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl bg-bg-accent p-8 text-center md:p-12">
            <h2 className="font-poppins text-2xl font-bold text-navy md:text-3xl">
              Add Med Spa Quoting for $50/mo
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-muted">
              Many surgical practices offer injectables, lasers, and skin
              treatments. Add med spa quoting to your existing plan. Same login,
              same patient records.
            </p>
            <Link
              href="/medical-spas/"
              className="mt-6 inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
            >
              Explore Medical Spa features <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Pricing teaser */}
      <section className="bg-bg-accent py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-poppins text-4xl font-bold text-navy">
            Pricing for surgical practices
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-text-muted">
            No contracts. Cancel anytime. Unlimited quotes and staff users on
            every plan.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border bg-white p-8 ${
                  plan.popular ? "border-primary shadow-xl" : "border-border"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-poppins text-xl font-semibold text-navy">
                  {plan.name}
                </h3>
                <p className="mt-2 font-poppins text-3xl font-bold text-navy">
                  {plan.price}
                  <span className="text-base font-medium text-text-muted">
                    /mo
                  </span>
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-text">
                      <Check
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/pricing/"
              className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary-dark"
            >
              See Full Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <FAQ items={faqs} className="bg-bg-alt py-24" />

      {/* 9. Final CTA */}
      <FinalCta />
    </>
  );
}
