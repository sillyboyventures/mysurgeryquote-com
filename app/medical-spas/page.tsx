import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Award,
  Package,
  Users,
  FileText,
  Send,
  ShieldCheck,
} from "lucide-react";
import BrowserFrame from "@/components/BrowserFrame";
import WaveDivider from "@/components/WaveDivider";
import FinalCta from "@/components/sections/FinalCta";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Medical Spa Quote Software: Injectables & Treatment Pricing",
  description:
    "Quote software built for medical spas. Price injectables, lasers, body contouring, and skin treatments in under 2 minutes. Unlimited providers. HIPAA compliant. $150/mo.",
};

const painPoints = [
  {
    icon: "/icons/icon-calculator.svg",
    title: "Calculator App Pricing",
    body: "Still pricing Botox units on a calculator while the patient waits?",
  },
  {
    icon: "/icons/icon-spreadsheet.svg",
    title: "Spreadsheet Chaos",
    body: "Managing filler, laser, and package pricing across multiple spreadsheets?",
  },
  {
    icon: "/icons/icon-handwritten.svg",
    title: "Unprofessional Quotes",
    body: "Handing patients handwritten quotes that don't match your brand?",
  },
];

type Block = {
  image: string;
  width: number;
  height: number;
  title: string;
  body: string;
  eyebrow?: string;
  bullets?: string[];
  href?: string;
};

const featureBlocks: Block[] = [
  {
    image: "/screens/medspa-dashboard.png",
    width: 3200,
    height: 2400,
    title: "Streamlined Quoting",
    body: "Med spa mode strips out facility fees, anesthesia formulas, and implant selection. What's left is a fast, clean flow built for how med spas actually work.",
  },
  {
    image: "/screens/users.png",
    width: 3200,
    height: 2400,
    title: "Unlimited Providers",
    body: "Add every injector, laser tech, and front-desk staffer at no extra cost. We charge by location, not by provider, so your price stays predictable as your team grows.",
  },
  {
    image: "/screens/medspa-procedures.png",
    width: 3200,
    height: 2400,
    title: "Unit-Based Pricing",
    body: "Price Botox and Dysport by the unit, fillers by the syringe, and treatments by the session. Enter the quantity and the quote totals instantly.",
  },
  {
    image: "/screens/medspa-membership-tiers.png",
    width: 3200,
    height: 2400,
    title: "Membership Tiers & Auto-Discounts",
    body: "Create VIP tiers (Gold, Platinum, Diamond) with automatic percentage discounts. Select the tier and the discount applies across the entire quote.",
  },
  {
    image: "/screens/medspa-treatment-series.png",
    width: 3200,
    height: 2400,
    title: "Treatment Series",
    body: "Build packages like Buy 5 Get 1 Free for series treatments. Patients pre-pay for a series, the system tracks visits and remaining balance. Common for laser hair removal, chemical peel series, and microneedling courses.",
  },
  {
    image: "/screens/categories.png",
    width: 3200,
    height: 2400,
    title: "Product Catalog",
    body: "Keep your retail skincare and product line in the same catalog as your treatments. Add products to any quote alongside services for a complete patient estimate.",
  },
  {
    image: "/screens/medspa-quote-history.png",
    width: 3200,
    height: 2400,
    eyebrow: "Patient tracking",
    title: "Find any quote in seconds",
    body: "Every quote your med spa has ever created is searchable. Look up by patient name, provider, status, or PCC. Edit any quote with original pricing preserved. Resend the patient's quote PDF on demand, straight from the quote list.",
    bullets: [
      "Search by patient name, DOB, provider, or status",
      "Filter by PCC (patient care coordinator)",
      "Edit any quote with price preservation",
      "Resend email PDF directly from the quote row",
      "Per-quote audit trail (every edit logged with user and timestamp)",
    ],
    href: "/free-trial",
  },
  {
    image: "/screens/ghl-ui.png",
    width: 1897,
    height: 1046,
    title: "EMR Integration",
    body: "Attach quote PDFs to patient or CRM records in GoHighLevel, ModMed, or DrChrono. One click sends the quote where your team already works. Nextech coming soon.",
  },
];

const services = [
  { icon: "/icons/icon-syringe.svg", title: "Injectables" },
  { icon: "/icons/icon-laser.svg", title: "Laser Treatments" },
  { icon: "/icons/icon-body.svg", title: "Body Contouring" },
  { icon: "/icons/icon-face.svg", title: "Skin Treatments" },
  { icon: "/icons/icon-iv.svg", title: "Wellness" },
  { icon: "/icons/icon-products.svg", title: "Products" },
];

const everything = [
  { icon: Award, title: "Membership Tiers", body: "Bronze, Silver, Gold tiers with automatic percentage discounts on every service." },
  { icon: Package, title: "Treatment Series", body: "Buy 5 Get 1 Free style packages. Pre-paid sessions tracked automatically." },
  { icon: Users, title: "Unlimited Providers", body: "Every injector, laser tech, and front-desk staffer included. Priced by location." },
  { icon: FileText, title: "Branded PDFs", body: "Your logo, your colors, your name on every patient quote." },
  { icon: Send, title: "Send to EMR", body: "One-click send to ModMed, DrChrono, and GoHighLevel. Nextech coming soon." },
  { icon: ShieldCheck, title: "HIPAA Compliant", body: "Encrypted data, audit logging, automatic session timeouts." },
];

const plans = [
  {
    name: "Med Spa",
    price: "$150",
    suffix: "/mo",
    popular: true,
    features: [
      "1 location",
      "Unlimited providers & staff",
      "Unit-based & package pricing",
      "Membership tiers & treatment series",
      "Branded PDFs, email, HIPAA",
    ],
  },
  {
    name: "Med Spa Multi",
    price: "$300",
    suffix: "/mo",
    popular: false,
    features: [
      "2 locations included",
      "Everything in Med Spa",
      "Per-location branding",
      "Org-level dashboard & reporting",
      "Multi-location user roles",
    ],
  },
  {
    name: "Add to Surgical",
    price: "$50",
    suffix: "/location",
    popular: false,
    features: [
      "For existing surgical customers",
      "Adds med spa quoting to your plan",
      "Same login, same patient records",
      "Mixed surgical + med spa quotes",
      "Billed per location",
    ],
  },
];

const faqs = [
  {
    q: "How is med spa different from the surgical version?",
    a: "Med spa mode removes facility fee calculations, anesthesia formulas, and implant selection. It's a streamlined flow designed for injectables, lasers, and skin treatments.",
  },
  {
    q: "Why unlimited providers?",
    a: "Med spas have higher staff turnover than surgical practices. We charge by location, not by provider, so your cost stays predictable.",
  },
  {
    q: "Can I quote surgical and med spa services together?",
    a: "Yes. If you have both surgical and med spa enabled, you can create mixed quotes. Facility and anesthesia fees apply only to surgical items automatically.",
  },
  {
    q: "I already use MySurgeryQuote for surgery. How do I add med spa?",
    a: "Contact us to add med spa features for $50/mo per location. Same login, same patient records, same system.",
  },
  {
    q: "Do I need to set up pricing per provider?",
    a: "No. Med spa pricing is set at the practice level. All providers use the same price list.",
  },
  {
    q: "Is there a contract?",
    a: "No. Pay monthly, cancel anytime. No setup fees, no cancellation fees.",
  },
  {
    q: "Is it HIPAA compliant?",
    a: "Yes. Encrypted data, audit logging, automatic session timeouts. Built for healthcare from day one.",
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

export default function MedicalSpasPage() {
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
            For Medical Spas
          </p>
          <h1 className="mx-auto max-w-3xl font-poppins text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl">
            Quote software built for medical spas
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            Create professional patient quotes for injectables, lasers, body
            contouring, and skin treatments in under 2 minutes. Unlimited
            providers. One flat price.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="rounded-lg bg-button-navy px-6 py-3 font-medium text-white shadow-lg transition-opacity hover:opacity-90"
            >
              See Pricing
            </Link>
            <a
              href="https://demo.mysurgeryquote.com/demo"
              target="_blank"
              rel="noopener"
              className="rounded-lg border border-white px-6 py-3 font-medium text-white transition-colors hover:bg-white hover:text-primary"
            >
              Try Demo
            </a>
          </div>
          <div className="mx-auto mt-12 max-w-5xl">
            <BrowserFrame
              src="/screens/medspa-new-quote.png"
              alt="MySurgeryQuote med spa new-quote wizard"
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
                  {block.eyebrow && (
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                      {block.eyebrow}
                    </p>
                  )}
                  <h3 className="mt-2 font-poppins text-2xl font-bold text-navy">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-text-muted">
                    {block.body}
                  </p>
                  {block.bullets && (
                    <ul className="mt-6 space-y-3">
                      {block.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-text">
                          <Check
                            className="mt-1 h-5 w-5 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {block.href && (
                    <Link
                      href={block.href}
                      className="mt-6 inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
                    >
                      Start free trial <span aria-hidden="true">→</span>
                    </Link>
                  )}
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
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="flex flex-col items-center rounded-2xl border border-border bg-white p-6 text-center"
              >
                <Image
                  src={s.icon}
                  alt=""
                  aria-hidden="true"
                  width={80}
                  height={80}
                  className="h-14 w-14"
                />
                <h3 className="mt-3 font-poppins text-sm font-semibold text-navy">
                  {s.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Surgical upsell */}
      <section className="bg-white pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl bg-bg-accent p-8 text-center md:p-12">
            <h2 className="font-poppins text-2xl font-bold text-navy md:text-3xl">
              Already a Surgical Customer?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-muted">
              Add med spa features to your existing plan for just $50/mo per
              location. Same login. Same patient records. One system for your
              entire practice.
            </p>
            <Link
              href="/surgical-practices"
              className="mt-6 inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
            >
              Explore Surgical Practice features <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Everything you need */}
      <section className="bg-bg-blue-tint py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-poppins text-4xl font-bold text-navy">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {everything.map((e) => {
              const Icon = e.icon;
              return (
                <div
                  key={e.title}
                  className="rounded-2xl border border-border bg-white p-6"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-bg-accent text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-poppins text-lg font-semibold text-navy">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">{e.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Pricing teaser */}
      <section className="bg-bg-accent py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-poppins text-4xl font-bold text-navy">
            Pricing for medical spas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-text-muted">
            No contracts. Cancel anytime. Unlimited providers on every plan.
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
                    {plan.suffix}
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
              href="/pricing"
              className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary-dark"
            >
              See Full Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <FAQ items={faqs} className="bg-bg-alt py-24" />

      {/* 10. Final CTA */}
      <FinalCta />
    </>
  );
}
