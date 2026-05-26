import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="bg-navy py-20 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-poppins text-4xl font-bold">
          Ready to Simplify Quoting?
        </h2>
        <p className="mt-4 text-lg text-white/80">
          Professional quotes in under 2 minutes. No contracts.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/free-trial"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary-dark"
          >
            Start Free Trial
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg border border-white px-6 py-3 font-medium text-white transition-colors hover:bg-white hover:text-navy"
          >
            See Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
