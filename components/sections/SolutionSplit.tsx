import Link from "next/link";
import { Check, Stethoscope, Sparkles, type LucideIcon } from "lucide-react";

type Solution = {
  title: string;
  icon: LucideIcon;
  description: string;
  bullets: string[];
  href: string;
};

const solutions: Solution[] = [
  {
    title: "Surgical Practices",
    icon: Stethoscope,
    description:
      "Multi-procedure quotes with automatic facility and anesthesia fee calculations. Surgeon-specific pricing. Implant tracking. Quick Quote templates.",
    bullets: [
      "Automatic fee calculations",
      "Surgeon-specific pricing",
      "Implant tracking",
      "Quick Quote templates",
    ],
    href: "/surgical-practices/",
  },
  {
    title: "Medical Spas",
    icon: Sparkles,
    description:
      "Unit-based pricing for injectables and treatments. Membership tiers with automatic discounts. Treatment packages. Unlimited providers.",
    bullets: [
      "Unit-based pricing",
      "Membership tiers",
      "Treatment packages",
      "Unlimited providers",
    ],
    href: "/medical-spas/",
  },
];

export default function SolutionSplit() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <div
                key={solution.title}
                className="flex flex-col items-center rounded-2xl border border-border bg-white p-8 text-center"
              >
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-bg-accent">
                  <Icon className="h-14 w-14 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-poppins text-2xl font-semibold text-navy">
                  {solution.title}
                </h3>
                <p className="mt-3 max-w-md text-text-muted">
                  {solution.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {solution.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center justify-center gap-2 text-text"
                    >
                      <Check
                        className="h-5 w-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href={solution.href}
                  className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  Learn More
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
