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
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-10">
          {emrLogos.map((logo) => (
            <Link
              key={logo.name}
              href="/integrations"
              className="group relative inline-flex items-center"
              aria-label={logo.name}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-7 w-auto opacity-60 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
              />
              {logo.comingSoon && (
                <span className="absolute -right-3 -top-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
                  Coming Soon
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
