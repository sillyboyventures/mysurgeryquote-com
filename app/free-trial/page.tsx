import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import FreeTrialForm from "@/components/FreeTrialForm";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.mysurgeryquote.com/free-trial/" },
  title: { absolute: "Free Trial: Try MySurgeryQuote for 30 Days, No Card Required | MySurgeryQuote" },
  description:
    "Try MySurgeryQuote free for 30 days. Full access, no credit card required. We'll have your account ready within one business day.",
};

const included = [
  "Full access to all features",
  "Unlimited quotes",
  "Unlimited staff users",
  "Surgeon-specific pricing",
  "Automatic facility & anesthesia fees",
  "Implant tracking",
  "Branded PDFs & email delivery",
  "All EMR integrations (ModMed, DrChrono, GoHighLevel)",
  "Initial procedure list migration from your CSV/Excel",
  "Onboarding session with our team",
];

const trialFaqs = [
  {
    q: "Do I need a credit card to start the trial?",
    a: "No. The free trial is fully no-card. We'll only ask for payment if you decide to continue after 30 days.",
  },
  {
    q: "What's included in the trial?",
    a: "Full access to every feature on every plan. Unlimited quotes, unlimited staff users, all integrations. Nothing is locked.",
  },
  {
    q: "How long does setup take?",
    a: "Most practices are live within one business day. We handle initial procedure list migration from your CSV/Excel as part of setup.",
  },
  {
    q: "What happens after 30 days?",
    a: "You'll get a reminder email a few days before your trial ends. To continue, choose a plan and add a payment method. To stop, do nothing. Your account pauses automatically.",
  },
  {
    q: "Can I import my existing procedure list?",
    a: "Yes. Send us your CSV or Excel during setup and our team handles the import at no extra charge.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: trialFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FreeTrialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="Free Trial"
        title="Try MySurgeryQuote free for 30 days"
        subhead="Full access. No features locked. No quote limits. No credit card required."
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
          {/* Form */}
          <FreeTrialForm />

          {/* What's included */}
          <div>
            <h3 className="font-poppins text-xl font-semibold text-navy">
              Your 30-day trial includes
            </h3>
            <ul className="mt-6 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2 text-text">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg bg-bg-accent p-4 text-sm text-text-muted">
              No credit card required. We&apos;ll only ask for payment if you decide
              to continue after the 30-day trial.
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <FAQ items={trialFaqs} className="bg-bg-alt py-20" />
    </>
  );
}
