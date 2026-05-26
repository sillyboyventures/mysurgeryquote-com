import { Check } from "lucide-react";
import BrowserFrame from "@/components/BrowserFrame";

type FeatureRow = {
  image: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  body: string;
  bullets: string[];
};

// Intrinsic dimensions kept true to each capture to avoid distortion.
// (quick-quotes / quote-history / implants were re-captured at 3200x2400.)
const rows: FeatureRow[] = [
  {
    image: "/screens/homepage-surgeons.png",
    width: 3200,
    height: 2400,
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
    image: "/screens/homepage-create-quote.png",
    width: 3200,
    height: 2400,
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
    width: 3200,
    height: 2400,
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
    width: 3200,
    height: 2400,
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
    width: 3200,
    height: 2400,
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
