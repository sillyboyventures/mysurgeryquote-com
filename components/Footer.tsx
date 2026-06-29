import Link from "next/link";
import Image from "next/image";

type FooterLink = { label: string; href: string; external?: boolean };

const solutions: FooterLink[] = [
  { label: "Surgical Practices", href: "/surgical-practices/" },
  { label: "Medical Spas", href: "/medical-spas/" },
  { label: "Standalone Quote Software", href: "/standalone-surgery-quote-software/" },
  { label: "Integrations", href: "/integrations/" },
  { label: "Features", href: "/features/" },
  { label: "Pricing", href: "/pricing/" },
];

const resources: FooterLink[] = [
  { label: "Help Center", href: "/help/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
  { label: "Demos", href: "https://demo.mysurgeryquote.com/demo", external: true },
];

const comparisons: FooterLink[] = [
  { label: "EMR Quoting Tools Compared", href: "/emr-quoting-tools-compared/" },
  { label: "ModMed vs. MySurgeryQuote", href: "/modmed-quoting-vs-mysurgeryquote/" },
  { label: "DrChrono vs. MySurgeryQuote", href: "/drchrono-quoting-vs-mysurgeryquote/" },
  { label: "Nextech vs. MySurgeryQuote", href: "/nextech-quoting-vs-mysurgeryquote/" },
];

const legal: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Service", href: "/terms-of-service/" },
  {
    label: "Client Login",
    href: "https://admin.mysurgeryquote.com/login",
    external: true,
  },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h3 className="font-poppins text-sm font-semibold uppercase tracking-wider text-white/90">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) =>
          link.external ? (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener nofollow"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ) : (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <Image
              src="/brand/logo-white.png"
              alt="MySurgeryQuote"
              width={200}
              height={33}
              quality={100}
              className="h-auto w-[200px]"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              The quoting tool built for medical practices. Accurate pricing,
              automatic calculations, professional quotes in minutes.
            </p>
          </div>

          <FooterColumn title="Solutions" links={solutions} />
          <FooterColumn title="Resources" links={resources} />
          <FooterColumn title="Comparisons" links={comparisons} />
          <FooterColumn title="Legal" links={legal} />
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm text-white/60">
            © 2026 MySurgeryQuote. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
