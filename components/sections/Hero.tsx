import Link from "next/link";
import Image from "next/image";
import { Zap, Calculator, Users } from "lucide-react";

const featurePillClass =
  "flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md";

export default function Hero() {
  return (
    <section
      className="relative"
      style={{
        background:
          "radial-gradient(ellipse at top right, #1FA9F7 0%, #0095F3 50%, #0078C7 100%)",
      }}
    >
      {/* Subtle dot-grid texture behind the content */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 pb-32 pt-16">
        {/* Eyebrow + headline */}
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/70 md:text-sm">
            Quoting Software for Surgical Practices &amp; Medical Spas
          </p>

          <h1 className="mx-auto max-w-5xl font-poppins text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            Professional Patient Quotes
            <br />
            in Under 2 Minutes
          </h1>
        </div>

        {/* Huge dashboard in a browser-chrome frame, dominating the page */}
        <div className="mx-auto mt-12 max-w-7xl px-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-blue-900/40">
            <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3">
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
              src="/screens/dashboard.png"
              alt="MySurgeryQuote dashboard with quote-by-doctor totals and recent quotes table"
              width={3200}
              height={2200}
              quality={100}
              priority
              sizes="(min-width: 1280px) 1232px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* Subhead + CTAs + feature pills */}
        <div className="mx-auto mt-12 max-w-5xl px-6 text-center">
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            Quoting software for surgical practices and medical spas. Accurate
            pricing, automatic calculations, branded PDFs.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/surgical-practices"
              className="rounded-lg bg-button-navy px-6 py-3 font-medium text-white shadow-lg transition-opacity hover:opacity-90"
            >
              Surgical Practices
            </Link>
            <Link
              href="/medical-spas"
              className="rounded-lg bg-button-navy px-6 py-3 font-medium text-white shadow-lg transition-opacity hover:opacity-90"
            >
              Medical Spas
            </Link>
          </div>
          <div className="mt-4">
            <a
              href="https://demo.mysurgeryquote.com/demo"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 font-medium text-white/90 transition-colors hover:text-white"
            >
              Try the Demo <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Three feature pills over the blue background */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className={featurePillClass}>
              <Zap className="h-4 w-4" aria-hidden="true" />
              Quick quotes in 30 seconds
            </span>
            <span className={featurePillClass}>
              <Calculator className="h-4 w-4" aria-hidden="true" />
              Auto facility &amp; anesthesia math
            </span>
            <span className={featurePillClass}>
              <Users className="h-4 w-4" aria-hidden="true" />
              Per-doctor fee schedules
            </span>
          </div>
        </div>
      </div>

      {/* Curved white wave divider transitioning into the next white section */}
      <svg
        className="-mb-px block h-[50px] w-full sm:h-[80px] lg:h-[100px]"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" fill="white" />
      </svg>
    </section>
  );
}
