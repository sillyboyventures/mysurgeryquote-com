import Image from "next/image";
import { Check } from "lucide-react";

type FeatureRow = {
  image: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  body: string;
  bullets: string[];
};

// Screenshot intrinsic dimensions are kept true to avoid vertical distortion.
const rows: FeatureRow[] = [
  {
    image: "/screens/surgeon-list.png",
    width: 1893,
    height: 868,
    alt: "Per-surgeon fee schedule list",
    title: "Multiple Surgeon Fee Schedules",
    body: "Each surgeon gets their own price list. Select the surgeon at quote start, prices auto-load. No spreadsheets, no manual overrides, no mistakes.",
    bullets: [
      "Per-surgeon procedure pricing",
      "Custom procedure assignments",
      "Independent of master price list",
      "Per-surgeon commission rates",
    ],
  },
  {
    image: "/screens/create-quote.png",
    width: 1895,
    height: 884,
    alt: "Creating a quote with price adjustments",
    title: "Individual + Global Price Adjustments",
    body: "Bump one procedure 5%, or apply a 10% increase across every procedure in one click. Built-in tools — no CSV exports, no spreadsheet math.",
    bullets: [
      "Per-procedure edits",
      "Global percentage adjustments",
      "Price History audit trail",
      "Banner alerts on edited quotes",
    ],
  },
  {
    image: "/screens/multi-location.png",
    width: 1883,
    height: 879,
    alt: "Facility fee profile configuration",
    title: "Multiple Facility Fee Profiles",
    body: "Configure separate facilities — in-office OR, ASC, hospital. Each with its own base fee, hourly rate, included hours, and cap. Select facility on the quote, math runs automatically.",
    bullets: [
      "Multiple facility profiles",
      "Independent fee rules",
      "Automatic time-based math",
      "Per-facility branding",
    ],
  },
  {
    image: "/screens/quick-quotes.png",
    width: 1892,
    height: 866,
    alt: "Commission tracking for patient care coordinators",
    title: "Commission Tracking for PCCs",
    body: "Track commissions for patient care coordinators, schedulers, and reps. Group rates (all PCCs at 5%) or individual rates. Vary by provider. Only invoiced quotes count.",
    bullets: [
      "Commission groups",
      "Per-user rates",
      "Per-provider variation",
      "Invoice-triggered crediting",
      "CSV export",
    ],
  },
  {
    image: "/screens/quote-history.png",
    width: 1898,
    height: 883,
    alt: "Procedure and implant log reporting",
    title: "Procedure & Implant Log Reporting",
    body: "See every billed service across surgeons and locations. Filter by date range, surgeon, procedure, or status. Implant log tracks every implant quoted with serials and patient. Export to CSV.",
    bullets: [
      "Procedure log",
      "Implant log",
      "Multi-filter reporting",
      "CSV export",
      "Org-level view",
    ],
  },
  {
    image: "/screens/implants.png",
    width: 1430,
    height: 893,
    alt: "Quick Quote templates for bundled procedures",
    title: "Quick Quotes for Bundled Procedures",
    body: "Save your Mommy Makeover, Facelift Package, or any common combination as a Quick Quote template. One click to start a quote from a template, customize from there. 10 minutes becomes 30 seconds.",
    bullets: [
      "Unlimited templates",
      "Per-surgeon templates",
      "One-click apply",
      "Auto-load procedures, implants, fees",
    ],
  },
];

function BrowserFrame({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl shadow-blue-900/10">
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center font-mono text-xs text-gray-500">
          admin.mysurgeryquote.com
        </div>
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={95}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}

export default function KoehlerFeatures() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center font-poppins text-4xl font-bold text-navy">
          Built for how surgical practices actually run
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-text-muted">
          Real features for real medical practices — not generic quoting tools.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-6xl px-6">
        {rows.map((row, index) => {
          const reverse = index % 2 === 1;
          return (
            <div
              key={row.title}
              className="grid items-center gap-12 py-16 md:grid-cols-2"
            >
              <div className={reverse ? "md:order-2" : ""}>
                <BrowserFrame
                  src={row.image}
                  alt={row.alt}
                  width={row.width}
                  height={row.height}
                />
              </div>
              <div className={reverse ? "md:order-1" : ""}>
                <h3 className="font-poppins text-3xl font-bold text-navy">
                  {row.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-text-muted">
                  {row.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {row.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-text">
                      <Check
                        className="mt-1 h-5 w-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
