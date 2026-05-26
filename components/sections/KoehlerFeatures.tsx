import Link from "next/link";
import {
  Users,
  TrendingUp,
  Building2,
  DollarSign,
  FileBarChart,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

const features: Feature[] = [
  {
    icon: Users,
    title: "Multiple Surgeon Fee Schedules",
    description:
      "Each surgeon gets their own price list. Select the surgeon, prices auto-load. No spreadsheets, no overrides.",
    href: "/features#surgeon-pricing",
  },
  {
    icon: TrendingUp,
    title: "Individual + Global Price Adjustments",
    description:
      "Bump one procedure 5%, or apply a 10% increase across every procedure in one click. Built-in tools, no CSV exports.",
    href: "/features#price-adjustments",
  },
  {
    icon: Building2,
    title: "Multiple Facility Fee Profiles",
    description:
      "Configure separate facilities — in-office OR, ASC, hospital. Each with its own base, hourly rate, and cap.",
    href: "/features#facility-fees",
  },
  {
    icon: DollarSign,
    title: "Commission Tracking for PCCs",
    description:
      "Track commissions for patient care coordinators. Group rates or individual rates. Vary by provider. Only invoiced quotes count.",
    href: "/features#commissions",
  },
  {
    icon: FileBarChart,
    title: "Procedure & Implant Log Reporting",
    description:
      "See every billed service across surgeons and locations. Filter by date, surgeon, status. Export to CSV.",
    href: "/features#reporting",
  },
  {
    icon: Zap,
    title: "Quick Quotes for Bundled Procedures",
    description:
      "Save your Mommy Makeover or any common combination as a template. One click to start, customize from there.",
    href: "/features#quick-quotes",
  },
];

export default function KoehlerFeatures() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-poppins text-4xl font-bold text-navy">
          Built for how surgical practices actually run
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-text-muted">
          Real features for real medical practices — not generic quoting tools.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-bg-accent text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-poppins text-lg font-semibold text-navy">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  {feature.description}
                </p>
                <Link
                  href={feature.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
