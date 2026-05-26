import Image from "next/image";

type Benefit = {
  icon: string;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    icon: "/icons/icon-products.svg",
    title: "Unlimited Quote Generation",
    description:
      "Create as many patient quotes as you need. No caps, no limits, no extra fees.",
  },
  {
    icon: "/icons/stat-hipaa.svg",
    title: "100% HIPAA Compliant",
    description:
      "Patient data encrypted, automatic session timeouts, and full audit logging.",
  },
  {
    icon: "/icons/icon-branded-pdf.svg",
    title: "Custom Practice Branding",
    description:
      "Your logo, your colors, your practice name on every quote.",
  },
  {
    icon: "/icons/stat-fast.svg",
    title: "Under 2 Min Quote Generation",
    description:
      "Select services, apply discounts, generate PDF. What used to take 15 minutes now takes under 2.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-bg-blue-tint py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-border bg-white p-6 text-center"
            >
              <Image
                src={benefit.icon}
                alt=""
                aria-hidden="true"
                width={80}
                height={80}
                className="mx-auto h-16 w-16"
              />
              <h3 className="mt-4 font-poppins text-lg font-semibold text-navy">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
