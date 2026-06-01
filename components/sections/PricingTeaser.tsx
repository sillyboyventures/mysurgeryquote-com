import Link from "next/link";
import { Check } from "lucide-react";

type Plan = {
  title: string;
  price: string;
  features: string[];
};

const plans: Plan[] = [
  {
    title: "Surgical Practices",
    price: "from $100/mo",
    features: [
      "Automatic fee calculations",
      "Surgeon-specific pricing",
      "Implant tracking",
      "Unlimited quotes",
    ],
  },
  {
    title: "Medical Spas",
    price: "from $150/mo",
    features: [
      "Unit-based pricing",
      "Membership tiers",
      "Treatment packages",
      "Unlimited providers",
    ],
  },
];

export default function PricingTeaser() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-poppins text-4xl font-bold text-navy">
          Simple and Transparent Pricing
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-text-muted">
          Plans for solo surgeons, multi-location practices, and medical spas.
          No contracts. Cancel anytime.
        </p>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="flex flex-col rounded-2xl border border-border bg-white p-8"
            >
              <h3 className="font-poppins text-xl font-semibold text-navy">
                {plan.title}
              </h3>
              <p className="mt-1 font-poppins text-2xl font-bold text-primary">
                {plan.price}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-text">
                    <Check className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing/"
                className="mt-8 inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
              >
                View Plans <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/pricing/"
            className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary-dark"
          >
            View Full Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
