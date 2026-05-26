import type { Metadata } from "next";
import { Headphones, Clock, Shield } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: { absolute: "Contact MySurgeryQuote" },
  description:
    "Get in touch with MySurgeryQuote. Sales, support, partnerships, and integrations. We usually reply within one business day.",
};

const infoCards = [
  {
    icon: Headphones,
    title: "Existing customers",
    body: "Already have an account? Log in at admin.mysurgeryquote.com and use the in-app Support link for fastest response.",
  },
  {
    icon: Clock,
    title: "Response time",
    body: "We usually reply within one business day. Support requests from existing customers are prioritized.",
  },
  {
    icon: Shield,
    title: "HIPAA & privacy",
    body: "Please don't send PHI through this form. For HIPAA-related inquiries, mention 'HIPAA' in your message and we'll send a secure channel.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        subhead="Sales, support, partnerships, integrations. We usually reply within one business day."
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
          {/* Form */}
          <ContactForm />

          {/* Info */}
          <div>
            <h3 className="font-poppins text-xl font-semibold text-navy">
              Other ways to reach us
            </h3>
            <div className="mt-6 space-y-4">
              {infoCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="flex gap-4 rounded-2xl border border-border bg-white p-6"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-accent text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h4 className="font-poppins font-semibold text-navy">
                        {card.title}
                      </h4>
                      <p className="mt-1 text-sm text-text-muted">{card.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
