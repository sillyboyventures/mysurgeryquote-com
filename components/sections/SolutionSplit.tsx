import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

type Solution = {
  title: string;
  image: string;
  alt: string;
  description: string;
  bullets: string[];
  href: string;
};

const solutions: Solution[] = [
  {
    title: "Surgical Practices",
    image: "/screens/create-quote.png",
    alt: "Creating a surgical procedure quote",
    description:
      "Multi-procedure quotes with automatic facility and anesthesia fee calculations. Surgeon-specific pricing. Implant tracking. Quick Quote templates.",
    bullets: [
      "Automatic fee calculations",
      "Surgeon-specific pricing",
      "Implant tracking",
      "Quick Quote templates",
    ],
    href: "/surgical-practices",
  },
  {
    title: "Medical Spas",
    image: "/screens/medspa-quote.png",
    alt: "Creating a medical spa treatment quote",
    description:
      "Unit-based pricing for injectables and treatments. Membership tiers with automatic discounts. Treatment packages. Unlimited providers.",
    bullets: [
      "Unit-based pricing",
      "Membership tiers",
      "Treatment packages",
      "Unlimited providers",
    ],
    href: "/medical-spas",
  },
];

export default function SolutionSplit() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white"
            >
              <div className="relative aspect-video">
                <Image
                  src={solution.image}
                  alt={solution.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-poppins text-2xl font-semibold text-navy">
                  {solution.title}
                </h3>
                <p className="mt-3 text-text-muted">{solution.description}</p>
                <ul className="mt-6 space-y-3">
                  {solution.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-text">
                      <Check className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href={solution.href}
                  className="mt-8 inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
                >
                  Learn More <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
