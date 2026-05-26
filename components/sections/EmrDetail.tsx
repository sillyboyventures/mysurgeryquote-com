import Link from "next/link";
import Image from "next/image";
import { emrLogos } from "@/lib/emr";

export default function EmrDetail() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-poppins text-4xl font-bold text-navy">
          Connects to Your EMR
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-text-muted">
          Send quote PDFs directly to patient charts or CRM contacts with one
          click.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {emrLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex flex-col rounded-2xl border border-border bg-white p-6"
            >
              <div className="relative flex h-12 items-center">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-8 w-auto"
                />
                {logo.comingSoon && (
                  <span className="ml-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="mt-4 flex-1 text-sm text-text-muted">
                {logo.detail}
              </p>
              <Link
                href="/integrations"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/integrations"
            className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary-dark"
          >
            See All Integrations
          </Link>
        </div>
      </div>
    </section>
  );
}
