import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import BrowserFrame from "@/components/BrowserFrame";
import WaveDivider from "@/components/WaveDivider";
import FinalCta from "@/components/sections/FinalCta";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.mysurgeryquote.com/modmed-quoting/" },
  openGraph: { siteName: "MySurgeryQuote", type: "website", images: ["/og/integrations.png"] },
  twitter: { card: "summary_large_image", images: ["/og/integrations.png"] },
  title: { absolute: "Better Quotes for ModMed Practices | MySurgeryQuote" },
  description:
    "On ModMed and fighting the quoting tool? MySurgeryQuote builds full surgical quotes — procedure time, facility and anesthesia fees, e-signature — and sends the signed quote straight into your ModMed chart. From $100/mo.",
};

type Block = {
  image: string;
  width: number;
  height: number;
  title: string;
  body: string;
};

const featureBlocks: Block[] = [
  {
    image: "/screens/fee-settings.png",
    width: 3200,
    height: 2400,
    title: "Facility and anesthesia fees, calculated automatically",
    body: "Set base rates and hourly charges once. Every quote does the math from total surgical time. Per-facility and per-location overrides.",
  },
  {
    image: "/screens/surgeons.png",
    width: 3200,
    height: 2400,
    title: "Surgeon-specific pricing",
    body: "Each surgeon can have custom pricing on any procedure without touching your master price list. Pick the surgeon, prices adjust.",
  },
  {
    image: "/screens/procedure-hours.png",
    width: 3200,
    height: 2400,
    title: "Procedure time drives the price",
    body: "Capture procedure hours on the quote; facility and anesthesia fees follow. Adjust time per quote when a case runs long.",
  },
  {
    image: "/screens/quote-lifecycle.png",
    width: 3200,
    height: 2400,
    title: "Patient e-signature",
    body: "Secure private link; patient reviews the full quote and signs. Edit a signed quote and the signature voids automatically.",
  },
  {
    image: "/screens/insurance-split.png",
    width: 3200,
    height: 2400,
    title: "Cosmetic and insurance on one quote",
    body: "Flag any procedure as billed to insurance; it shows on the quote and drops out of the patient's total.",
  },
  {
    image: "/screens/quick-quotes.png",
    width: 3200,
    height: 2400,
    title: "Quick Quote templates",
    body: "Save common combinations. One click to start. Thirty seconds instead of ten minutes.",
  },
];

const faqs = [
  {
    q: "Does MySurgeryQuote replace ModMed?",
    a: "No. It works alongside ModMed. You keep ModMed for charting, scheduling, and records; MySurgeryQuote handles cosmetic and surgical quoting and sends the finished quote back into the ModMed chart.",
  },
  {
    q: "Is the ModMed integration extra?",
    a: "No. Included on every plan at no additional cost.",
  },
  {
    q: "How does the quote get into ModMed?",
    a: "One click sends the quote PDF into the patient's chart. You can also push billing charges and search patients from inside MySurgeryQuote.",
  },
  {
    q: "Do I have to change how my practice works?",
    a: "No. Build quotes in MySurgeryQuote, send them to the patient and to ModMed. Nothing else about your ModMed setup changes.",
  },
  {
    q: "What does it cost?",
    a: "From $100/mo for surgical practices, $150/mo for medical spas. Unlimited quotes, no contracts, cancel anytime.",
  },
  {
    q: "Can patients sign the quote?",
    a: "Yes, through a secure private link. If the quote is edited after signing, the signature voids.",
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

export default function ModMedQuotingPage() {
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
            For ModMed Practices
          </p>
          <h1 className="mx-auto max-w-3xl font-poppins text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl">
            The quoting tool your ModMed practice actually wanted
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            You&apos;re already on ModMed. You don&apos;t have to replace it.
            MySurgeryQuote sits on top and does the cosmetic and surgical quoting
            ModMed&apos;s tool won&apos;t — then pushes the finished quote right
            into the patient&apos;s chart.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/free-trial/"
              className="rounded-lg bg-button-navy px-6 py-3 font-medium text-white shadow-lg transition-opacity hover:opacity-90"
            >
              Start free 30-day trial
            </Link>
            <a
              href="https://demo.mysurgeryquote.com/demo"
              target="_blank"
              rel="noopener nofollow"
              className="rounded-lg border border-white px-6 py-3 font-medium text-white transition-colors hover:bg-white hover:text-primary"
            >
              See a demo
            </a>
          </div>
          <p className="mt-6 text-sm text-white/70">
            ModMed integration included on every plan. No extra cost. No double
            entry.
          </p>
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

      {/* 2. You asked ModMed to fix the quoting tool */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-poppins text-3xl font-bold text-navy md:text-4xl">
            You asked ModMed to fix the quoting tool. They didn&apos;t.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-muted">
            ModMed&apos;s quoting tool lives buried in Practice Management. It
            does the basics and stops there. If your practice does cosmetic or
            self-pay work, you&apos;ve hit the ceiling — and asking ModMed to
            raise it goes nowhere. You don&apos;t need a new EMR. You need a
            quoting tool that keeps up with how your practice actually sells
            surgery. That&apos;s the whole reason MySurgeryQuote exists.
          </p>
        </div>
      </section>

      {/* 3. Feature grid */}
      <section className="bg-bg-blue-tint py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-poppins text-3xl font-bold text-navy md:text-4xl">
            What MySurgeryQuote does that ModMed&apos;s tool doesn&apos;t
          </h2>
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
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Your quote doesn't leave ModMed behind */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <BrowserFrame
                src="/screens/modmed-ui.png"
                alt="Send a MySurgeryQuote quote into the patient's ModMed chart"
                width={1538}
                height={781}
                url="admin.mysurgeryquote.com"
              />
            </div>
            <div>
              <h2 className="font-poppins text-3xl font-bold text-navy md:text-4xl">
                Your quote doesn&apos;t leave ModMed behind
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-text-muted">
                Build the quote in MySurgeryQuote. When it&apos;s ready, send the
                PDF straight into the patient&apos;s ModMed chart with one click.
                Push the billing charges. Search patients without leaving
                MySurgeryQuote. No downloading, no uploading, no double entry.
              </p>
              <Link
                href="/help/how-to-connect-modmed-modernizing-medicine/"
                className="mt-4 inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
              >
                How the ModMed connection works{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Nothing to rip out */}
      <section className="bg-bg-accent py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-poppins text-3xl font-bold text-navy md:text-4xl">
            Nothing to rip out
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-muted">
            Keep ModMed for charting, scheduling, records. MySurgeryQuote handles
            the quoting ModMed&apos;s tool falls short on and hands the finished
            quote back to ModMed. One connection, included on every plan at no
            extra cost. Set up in a day.
          </p>
        </div>
      </section>

      {/* 6. Pricing */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-poppins text-3xl font-bold text-navy md:text-4xl">
            From $100/mo
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-muted">
            From $100/mo for surgical practices, $150/mo for medical spas.
            Unlimited quotes on every plan. ModMed integration included. No setup
            fees, cancel anytime.
          </p>
          <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left">
            {[
              "Unlimited quotes on every plan",
              "ModMed integration included at no extra cost",
              "No setup fees",
              "Cancel anytime",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-text">
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href="/free-trial/"
              className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary-dark"
            >
              Start your free 30-day trial
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <FAQ items={faqs} className="bg-bg-alt py-24" />

      {/* 8. Final CTA */}
      <FinalCta
        heading="Keep ModMed. Fix the quoting."
        subhead="Start a free 30-day trial. Full access, no credit card, no features locked. Account ready within one business day."
        buttons={[
          { label: "Start free trial", href: "/free-trial/", variant: "navy" },
        ]}
      />
    </>
  );
}
