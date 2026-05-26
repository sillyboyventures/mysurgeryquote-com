import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-bg-accent">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h1 className="font-poppins text-4xl font-bold leading-tight text-navy sm:text-5xl">
              Professional Patient Quotes in Under 2 Minutes
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text-muted">
              Quoting software for surgical practices and medical spas. Accurate
              pricing, automatic calculations, branded PDFs.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/free-trial"
                className="rounded-lg bg-primary px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary-dark"
              >
                Start Free Trial
              </Link>
              <a
                href="https://demo.mysurgeryquote.com/demo"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
              >
                Try the Demo <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <Image
              src="/screens/dashboard.png"
              alt="MySurgeryQuote dashboard showing a patient quote"
              width={847}
              height={478}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="w-full rounded-2xl shadow-xl ring-1 ring-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
