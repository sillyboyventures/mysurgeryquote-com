import Link from "next/link";
import Image from "next/image";
import { emrLogos } from "@/lib/emr";

export default function EmrBar() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm uppercase tracking-wider text-text-muted">
          Sends quotes directly to your EMR
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-12">
          {emrLogos.map((logo) => (
            <Link
              key={logo.name}
              href="/integrations"
              className="group relative flex w-32 items-center justify-center"
              aria-label={logo.name}
            >
              {logo.comingSoon && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-button-navy px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
                  Coming Soon
                </div>
              )}
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-12 w-full object-contain opacity-60 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
