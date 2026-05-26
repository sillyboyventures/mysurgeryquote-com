import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="relative bg-primary pt-20 text-white">
      <div className="mx-auto max-w-3xl px-4 pb-32 text-center sm:px-6 lg:px-8">
        <h2 className="font-poppins text-4xl font-bold">
          Ready to Simplify Quoting?
        </h2>
        <p className="mt-4 text-lg text-white/80">
          Professional quotes in under 2 minutes. No contracts.
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
      </div>

      {/* Cloud-shape divider transitioning into the navy footer */}
      <svg
        className="-mb-px block h-[80px] w-full lg:h-[120px]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C120,20 240,100 360,60 C480,20 600,100 720,60 C840,20 960,100 1080,60 C1200,20 1320,100 1440,60 L1440,120 L0,120 Z"
          fill="#121B3A"
        />
      </svg>
    </section>
  );
}
