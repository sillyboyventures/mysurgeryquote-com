import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, Send, Search, FileCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.mysurgeryquote.com/integrations/" },
  openGraph: { siteName: "MySurgeryQuote", type: "website", images: ["/og/integrations.png"] },
  twitter: { card: "summary_large_image", images: ["/og/integrations.png"] },
  title: "EMR Integrations: ModMed, DrChrono, GoHighLevel, Nextech",
  description:
    "Send quotes directly to your EMR. ModMed, DrChrono, GoHighLevel, and Nextech integrations included on every plan. One click from quote to chart.",
};

type Integration = {
  name: string;
  logo: string;
  width: number;
  height: number;
  body: string;
  bullets: string[];
  status: "live" | "dev";
  comingSoon?: boolean;
  note?: string;
  cta: { label: string; href: string; button?: boolean };
};

const integrations: Integration[] = [
  {
    name: "ModMed",
    logo: "/logos/modmed.png",
    width: 200,
    height: 60,
    body: "Send finished quote PDFs straight to the patient's ModMed chart. No downloading, no re-uploading. One click from quote to chart.",
    bullets: [
      "One-click PDF send to patient chart",
      "Patient search built-in (no double entry)",
      "Push billing charges to ModMed",
      "Per-location EMR Location ID mapping",
      "Audit log of every send",
    ],
    status: "live",
    cta: { label: "Start Free Trial", href: "/free-trial/" },
  },
  {
    name: "DrChrono",
    logo: "/logos/drchrono.png",
    width: 200,
    height: 70,
    body: "Push quotes directly into DrChrono patient records. Every estimate stays attached to the chart where your team already works.",
    bullets: [
      "One-click PDF send to patient record",
      "Patient lookup in MySurgeryQuote",
      "Automatic chart attachment",
      "HIPAA-compliant via DrChrono OAuth",
      "Audit log",
    ],
    status: "live",
    cta: { label: "Start Free Trial", href: "/free-trial/" },
  },
  {
    name: "GoHighLevel",
    logo: "/logos/ghl.png",
    width: 1853,
    height: 420,
    body: "Attach quote PDFs to GoHighLevel contacts. Trigger follow-up workflows the moment a quote is sent: text, email, calendar booking.",
    bullets: [
      "One-click PDF send to contact",
      "Workflow trigger on quote sent",
      "Tag contacts by quote status",
      "Automation-ready",
      "Audit log",
    ],
    status: "live",
    cta: { label: "Start Free Trial", href: "/free-trial/" },
  },
  {
    name: "Nextech",
    logo: "/logos/nextech.svg",
    width: 167,
    height: 28,
    body: "Send finished quote PDFs straight to the patient's Nextech chart. No downloading, no re-uploading. One click from quote to chart.",
    bullets: [
      "One-click PDF send to patient chart",
      "Patient search built-in (no double entry)",
      "Audit log of every send",
      "HIPAA-compliant via Nextech SMART Backend Services (System) auth",
    ],
    status: "live",
    cta: { label: "Start Free Trial", href: "/free-trial/" },
  },
];

const benefits = [
  {
    icon: Send,
    title: "One-click delivery",
    body: "Hit Send. The quote PDF lands in the patient's chart in ModMed, DrChrono, or as a contact attachment in GoHighLevel. No downloading and re-uploading.",
  },
  {
    icon: Search,
    title: "Built-in patient search",
    body: "Look up patients from MySurgeryQuote. No copy/paste between systems. Patient pulls directly from your EMR's database.",
  },
  {
    icon: FileCheck,
    title: "Audit log on every send",
    body: "Every quote sent is logged with timestamp, user, and recipient. HIPAA-compliant. Searchable from the quote history.",
  },
];

function StatusBadge({ status }: { status: "live" | "dev" }) {
  const live = status === "live";
  return (
    <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-text-muted">
      <span
        className={`h-2 w-2 rounded-full ${live ? "bg-green-500" : "bg-yellow-400"}`}
        aria-hidden="true"
      />
      {live ? "Live" : "In Development"}
    </span>
  );
}

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="EMR integrations that just work"
        subhead="One-click send to ModMed, DrChrono, GoHighLevel, and Nextech. Included on every plan."
      />

      {/* 4 integration cards */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {integrations.map((it) => (
              <div
                key={it.name}
                className="relative flex flex-col rounded-2xl border border-border bg-white p-8"
              >
                {it.comingSoon && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-button-navy px-3 py-1 text-xs font-medium text-white">
                    Coming Soon
                  </div>
                )}
                <div className="flex h-12 items-center justify-center">
                  <Image
                    src={it.logo}
                    alt={it.name}
                    width={it.width}
                    height={it.height}
                    className="h-9 w-auto opacity-80 grayscale"
                  />
                </div>
                <div className="text-center">
                  <StatusBadge status={it.status} />
                </div>
                <h3 className="mt-4 text-center font-poppins text-xl font-semibold text-navy">
                  {it.name}
                </h3>
                <p className="mt-2 text-center text-sm text-text-muted">{it.body}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {it.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-text">
                      <Check
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                {it.note && (
                  <p className="mt-3 text-xs font-medium text-text-muted">{it.note}</p>
                )}
                <div className="mt-6">
                  {it.cta.button ? (
                    <Link
                      href={it.cta.href}
                      className="inline-block rounded-lg bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary-dark"
                    >
                      {it.cta.label}
                    </Link>
                  ) : (
                    <Link
                      href={it.cta.href}
                      className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
                    >
                      {it.cta.label} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-bg-accent py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center font-poppins text-4xl font-bold text-navy">
            What you get with EMR integration
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="text-center">
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-poppins text-lg font-semibold text-navy">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">{b.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing note */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl bg-bg-accent p-8 text-center">
            <h3 className="font-poppins text-2xl font-bold text-navy">
              Included on every plan
            </h3>
            <p className="mt-4 text-text-muted">
              Every EMR integration is included on every plan at no extra cost:
              ModMed, DrChrono, GoHighLevel, and Nextech.
            </p>
            <Link
              href="/pricing/"
              className="mt-6 inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
            >
              See pricing <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCta
        heading="Ready to send quotes where your team works?"
        subhead="Start a free 30-day trial. No credit card required."
        buttons={[
          { label: "Start Free Trial", href: "/free-trial/", variant: "navy" },
          { label: "Talk to Sales", href: "/contact/", variant: "outline" },
        ]}
      />
    </>
  );
}
