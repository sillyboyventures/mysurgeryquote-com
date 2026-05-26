import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Clock, Users } from "lucide-react";

const pillClass =
  "absolute z-20 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-sm font-medium text-navy shadow-xl shadow-blue-900/20 backdrop-blur-sm";

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

      <div className="relative z-10 mx-auto grid min-h-[700px] max-w-[1440px] items-center gap-12 px-4 pb-28 pt-16 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
        {/* Left: copy + CTAs */}
        <div>
          <h1 className="max-w-2xl font-poppins text-5xl font-bold leading-[1.1] text-white md:text-6xl lg:text-7xl">
            Professional Patient Quotes
            <br />
            in Under 2 Minutes
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/90 md:text-xl">
            Quoting software for surgical practices and medical spas. Accurate
            pricing, automatic calculations, branded PDFs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
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
          <div className="mt-6">
            <a
              href="https://demo.mysurgeryquote.com/demo"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 font-medium text-white/90 transition-colors hover:text-white"
            >
              Try the Demo <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Right: laptop-framed dashboard with floating stat pills */}
        <div className="lg:justify-self-end">
          <div className="relative mx-auto mt-8 w-full max-w-[760px] lg:mt-0">
            {/* Floating stat pills */}
            <div className={`${pillClass} -top-4 left-2 lg:-left-4`}>
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              HIPAA Compliant
            </div>
            <div className={`${pillClass} -top-4 right-2 lg:-right-2`}>
              <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
              Under 2 Min
            </div>
            <div className={`${pillClass} -bottom-4 left-2 lg:-left-4`}>
              <Users className="h-4 w-4 text-primary" aria-hidden="true" />
              Unlimited Users
            </div>

            {/* Laptop frame */}
            <div className="rounded-t-xl border-2 border-[#E5E7EB] bg-white p-2 shadow-2xl">
              <Image
                src="/screens/dashboard.png"
                alt="MySurgeryQuote dashboard showing a patient quote"
                width={847}
                height={478}
                priority
                quality={95}
                sizes="(min-width: 1024px) 720px, 100vw"
                className="h-auto w-full rounded-md"
              />
            </div>
            {/* laptop base lip */}
            <div className="mx-[-12px] h-3 rounded-b-2xl bg-gray-200" />
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
