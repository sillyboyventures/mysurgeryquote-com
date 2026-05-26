import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import FinalCta from "@/components/sections/FinalCta";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Pricing — Plans for Surgical Practices and Medical Spas",
  description:
    "Simple monthly pricing. No contracts, no setup fees, cancel anytime. Surgical plans from $100/mo. Med spa plans from $150/mo. Unlimited quotes and staff users on every plan.",
};

type Plan = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  popular?: boolean;
};

const surgicalPlans: Plan[] = [
  {
    name: "Solo",
    price: "$100",
    tagline: "For solo surgeons",
    features: [
      "1 surgeon",
      "Unlimited quotes",
      "Unlimited staff users",
      "Automatic facility & anesthesia fees",
      "Surgeon-specific pricing",
      "Implant tracking",
      "Branded PDFs & email delivery",
      "ModMed & DrChrono integration",
      "HIPAA compliant",
      "Price history & audit trail",
    ],
  },
  {
    name: "Practice",
    price: "$150",
    tagline: "For multi-surgeon practices",
    popular: true,
    features: [
      "2 surgeons included",
      "+$50/mo per additional surgeon",
      "Everything in Solo",
      "Commission tracking for PCCs",
      "Quick Quote templates",
      "Procedure & implant log reporting",
      "PCC productivity reports",
    ],
  },
  {
    name: "Multi-Location",
    price: "$350",
    tagline: "For practices with multiple offices",
    features: [
      "2 locations included",
      "+$150/mo per additional location",
      "+$40/mo per additional surgeon",
      "Everything in Practice",
      "Per-location branding on quotes",
      "Org-level dashboard & reporting",
      "Location-based user permissions",
      "Multi-location quote history",
    ],
  },
];

const medspaPlans: Plan[] = [
  {
    name: "Med Spa",
    price: "$150",
    tagline: "For single-location med spas",
    popular: true,
    features: [
      "1 location",
      "Unlimited providers",
      "Unlimited quotes",
      "Unlimited staff users",
      "Unit-based pricing (Botox, fillers)",
      "Membership tiers with auto-discounts",
      "Treatment series packages",
      "Product catalog",
      "Branded PDFs & email delivery",
      "ModMed, DrChrono & GoHighLevel integration",
      "HIPAA compliant",
    ],
  },
  {
    name: "Med Spa Multi-Location",
    price: "$300",
    tagline: "For multi-location med spas",
    features: [
      "2 locations included",
      "+$100/mo per additional location",
      "Unlimited providers per location",
      "Everything in Med Spa",
      "Per-location branding",
      "Org-level dashboard & reporting",
      "Cross-location quote history",
    ],
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-white p-8 ${
        plan.popular ? "border-2 border-primary shadow-xl" : "border border-border"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}
      <h3 className="font-poppins text-xl font-semibold text-navy">{plan.name}</h3>
      <p className="mt-1 text-sm text-text-muted">{plan.tagline}</p>
      <p className="mt-4 font-poppins text-4xl font-bold text-navy">
        {plan.price}
        <span className="text-base font-medium text-text-muted">/mo</span>
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-text">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/free-trial"
        className="mt-8 block rounded-lg bg-button-navy px-6 py-3 text-center font-medium text-white shadow-sm transition-opacity hover:opacity-90"
      >
        Start Free Trial
      </Link>
    </div>
  );
}

// ── Comparison table ────────────────────────────────────────────────
type Cell = boolean | string;
type CompRow = { label: string; values: Cell[] };
type CompGroup = { title: string; rows: CompRow[] };

const C = true;
const X: Cell = "—";

const comparison: CompGroup[] = [
  {
    title: "Plans & pricing",
    rows: [
      { label: "Monthly price", values: ["$100", "$150", "$350", "$150", "$300"] },
      { label: "Surgeons included", values: ["1", "2", "2", "N/A", "N/A"] },
      { label: "Additional surgeons", values: [X, "$50/mo", "$40/mo", X, X] },
      { label: "Locations included", values: ["1", "1", "2", "1", "2"] },
      { label: "Additional locations", values: [X, X, "$150/mo", X, "$100/mo"] },
      { label: "Providers (med spa)", values: [X, X, X, "Unlimited", "Unlimited"] },
    ],
  },
  {
    title: "Features",
    rows: [
      { label: "Unlimited quotes", values: [C, C, C, C, C] },
      { label: "Unlimited staff users", values: [C, C, C, C, C] },
      { label: "Automatic facility fees", values: [C, C, C, X, X] },
      { label: "Automatic anesthesia fees", values: [C, C, C, X, X] },
      { label: "Surgeon-specific pricing", values: [C, C, C, X, X] },
      { label: "Implant tracking", values: [C, C, C, X, X] },
      { label: "Quick Quote templates", values: [C, C, C, C, C] },
      { label: "Commission tracking", values: [X, C, C, C, C] },
      { label: "Procedure log reporting", values: [C, C, C, C, C] },
      { label: "Implant log reporting", values: [C, C, C, X, X] },
      { label: "Unit-based pricing", values: [X, X, X, C, C] },
      { label: "Membership tiers", values: [X, X, X, C, C] },
      { label: "Treatment series", values: [X, X, X, C, C] },
      { label: "Product catalog", values: [X, X, X, C, C] },
      { label: "Provider tiers", values: [X, X, X, C, C] },
      { label: "Per-location branding", values: [X, X, C, X, C] },
      { label: "Org-level dashboard", values: [X, X, C, X, C] },
    ],
  },
  {
    title: "Delivery & compliance",
    rows: [
      { label: "Branded PDFs", values: [C, C, C, C, C] },
      { label: "Email delivery", values: [C, C, C, C, C] },
      { label: "Quote history", values: [C, C, C, C, C] },
      { label: "Price history & audit trail", values: [C, C, C, C, C] },
      { label: "ModMed integration", values: [C, C, C, C, C] },
      { label: "DrChrono integration", values: [C, C, C, C, C] },
      { label: "GoHighLevel integration", values: [X, X, X, C, C] },
      { label: "HIPAA compliant", values: [C, C, C, C, C] },
      { label: "Role-based permissions", values: [C, C, C, C, C] },
    ],
  },
];

const planCols = ["Solo", "Practice", "Multi-Loc", "Med Spa", "Med Spa Multi"];

function CompCell({ value }: { value: Cell }) {
  if (value === true)
    return (
      <span className="inline-flex justify-center">
        <Check className="h-5 w-5 text-primary" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </span>
    );
  if (value === "—")
    return <span className="text-text-muted" aria-label="Not included">—</span>;
  return <span className="text-sm text-text">{value}</span>;
}

const pricingFaqs = [
  {
    q: "Is there a contract?",
    a: "No. Pay monthly, cancel anytime. No setup fees, no cancellation fees, no contract.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Try MySurgeryQuote free for 30 days with full access — no features locked, no quote limits, no credit card required.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit cards. Payments are processed securely through Stripe.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrade or downgrade anytime. Changes take effect on your next billing cycle.",
  },
  {
    q: "What if I add a surgeon or location mid-month?",
    a: "You're charged a prorated amount for the rest of that billing period. No downtime — we add them the same day you request it.",
  },
  {
    q: "What's the difference between surgical and med spa plans?",
    a: "Surgical plans include facility/anesthesia fee calculations, surgeon-specific pricing, and implant tracking. Med spa plans include unlimited providers, membership tiers, treatment packages, and unit-based pricing. Med spa removes the surgical complexity you don't need.",
  },
  {
    q: "Can I have both surgical and med spa under one account?",
    a: "Yes. Add med spa quoting to any surgical plan for $50/mo per location. Same login, same patient records, one unified system.",
  },
  {
    q: "Are EMR integrations included?",
    a: "Yes. ModMed and DrChrono integrations are included on every plan at no extra cost. GoHighLevel is included on Med Spa plans. Nextech is coming soon.",
  },
  {
    q: "What if I need more than the included surgeons or locations?",
    a: "Additional surgeons are $50/mo each (or $40/mo on Multi-Location plans). Additional locations are $150/mo for surgical or $100/mo for med spa.",
  },
  {
    q: "How long does setup take?",
    a: "Most practices are live within one business day. We handle initial procedure list migration from CSV/Excel during setup at no extra charge.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        subhead="No contracts, no setup fees, cancel anytime. Unlimited quotes and staff users on every plan."
      />

      {/* Surgical plans */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-poppins text-4xl font-bold text-navy">
            Surgical practices
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-text-muted">
            Built for cosmetic and plastic surgery practices. ModMed and DrChrono
            integrations included.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {surgicalPlans.map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Med spa plans */}
      <section className="bg-bg-accent py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-poppins text-4xl font-bold text-navy">
            Medical spas
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-text-muted">
            Built for med spas, MedSpas, and aesthetic clinics. Unlimited providers
            on every plan.
          </p>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {medspaPlans.map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Hybrid callout */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl bg-bg-accent p-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Hybrid practice
            </p>
            <h3 className="mt-2 font-poppins text-2xl font-bold text-navy md:text-3xl">
              Running surgical and med spa under one roof?
            </h3>
            <p className="mt-4 text-text-muted">
              Add med spa quoting to any surgical plan for $50/mo per location. Same
              login. Same patient records. One unified system for your entire
              practice. Mixed quotes apply facility and anesthesia fees only to
              surgical items automatically.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
            >
              Contact Sales <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-poppins text-4xl font-bold text-navy">
            Compare plans
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-text-muted">
            Every plan includes unlimited quotes, unlimited staff users, and our
            standard integrations.
          </p>

          <div className="mt-12 overflow-x-auto md:overflow-x-visible">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="sticky top-16 z-10 bg-white">
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-poppins text-sm font-semibold text-navy">
                    Feature
                  </th>
                  {planCols.map((c) => (
                    <th
                      key={c}
                      className="px-3 py-3 text-center font-poppins text-sm font-semibold text-navy"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              {comparison.map((group) => (
                <tbody key={group.title}>
                  <tr className="bg-bg-alt">
                    <td
                      colSpan={6}
                      className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {group.title}
                    </td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label} className="border-b border-border">
                      <td className="py-3 pr-4 text-sm text-text">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="px-3 py-3 text-center">
                          <CompCell value={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ items={pricingFaqs} heading="Pricing questions" className="bg-bg-alt py-20" />

      {/* Final CTA */}
      <FinalCta
        heading="Ready to start your free trial?"
        subhead="Professional quotes in under 2 minutes. No credit card required."
        buttons={[
          { label: "Start Free Trial", href: "/free-trial", variant: "navy" },
          { label: "Talk to Sales", href: "/contact", variant: "outline" },
        ]}
      />
    </>
  );
}
