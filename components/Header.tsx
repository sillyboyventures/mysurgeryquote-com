"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, X } from "lucide-react";

type NavItem = { label: string; href: string; external?: boolean };

const solutions: NavItem[] = [
  { label: "Surgical Practices", href: "/surgical-practices/" },
  { label: "Medical Spas", href: "/medical-spas/" },
  { label: "Standalone Quote Software", href: "/standalone-surgery-quote-software/" },
  { label: "Integrations", href: "/integrations/" },
];

const resources: NavItem[] = [
  { label: "Help", href: "/help/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];

const comparisons: NavItem[] = [
  { label: "EMR Quoting Tools Compared", href: "/emr-quoting-tools-compared/" },
  { label: "ModMed vs. MySurgeryQuote", href: "/modmed-quoting-vs-mysurgeryquote/" },
  { label: "DrChrono vs. MySurgeryQuote", href: "/drchrono-quoting-vs-mysurgeryquote/" },
  { label: "Nextech vs. MySurgeryQuote", href: "/nextech-quoting-vs-mysurgeryquote/" },
];

const SIGN_IN_URL = "https://admin.mysurgeryquote.com/login";
const DEMO_URL = "https://demo.mysurgeryquote.com/demo";

function Dropdown({
  label,
  items,
  group,
}: {
  label: string;
  items: NavItem[];
  group?: { heading: string; items: NavItem[] };
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:text-white/80"
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      {/* Outer wrapper starts at top-full (no hover gap); pt-2 gives visual spacing */}
      <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="min-w-60 rounded-xl border border-border bg-white p-2 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-text transition-colors hover:bg-bg-accent hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          {group && (
            <>
              <div className="my-2 border-t border-border" />
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {group.heading}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-text transition-colors hover:bg-bg-accent hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-primary text-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" aria-label="MySurgeryQuote home" className="shrink-0">
          <Image
            src="/brand/logo-white.png"
            alt="MySurgeryQuote"
            width={220}
            height={37}
            quality={100}
            priority
            className="h-auto w-[220px]"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          <Dropdown label="Solutions" items={solutions} />
          <Link
            href="/features/"
            className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            Features
          </Link>
          <Link
            href="/pricing/"
            className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            Pricing
          </Link>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener nofollow"
            className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            Demos
          </a>
          <Dropdown
            label="Resources"
            items={resources}
            group={{ heading: "Comparisons", items: comparisons }}
          />
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={SIGN_IN_URL}
            rel="nofollow"
            className="text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            Sign In
          </a>
          <Link
            href="/free-trial/"
            className="rounded-lg bg-button-navy px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-md p-2 text-white lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-primary text-white lg:hidden">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <Image
              src="/brand/logo-white.png"
              alt="MySurgeryQuote"
              width={220}
              height={37}
              quality={100}
              className="h-auto w-[200px]"
            />
            <button
              type="button"
              onClick={closeMobile}
              className="rounded-md p-2 text-white"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-2 sm:px-6"
            aria-label="Mobile navigation"
          >
            <p className="px-2 pt-4 text-xs font-semibold uppercase tracking-wider text-white/70">
              Solutions
            </p>
            {solutions.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobile}
                className="rounded-md px-2 py-3 text-lg font-medium text-white"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/features/"
              onClick={closeMobile}
              className="rounded-md px-2 py-3 text-lg font-medium text-white"
            >
              Features
            </Link>
            <Link
              href="/pricing/"
              onClick={closeMobile}
              className="rounded-md px-2 py-3 text-lg font-medium text-white"
            >
              Pricing
            </Link>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener nofollow"
              onClick={closeMobile}
              className="rounded-md px-2 py-3 text-lg font-medium text-white"
            >
              Demos
            </a>

            <p className="px-2 pt-4 text-xs font-semibold uppercase tracking-wider text-white/70">
              Resources
            </p>
            {resources.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobile}
                className="rounded-md px-2 py-3 text-lg font-medium text-white"
              >
                {item.label}
              </Link>
            ))}

            <p className="px-2 pt-4 text-xs font-semibold uppercase tracking-wider text-white/70">
              Comparisons
            </p>
            {comparisons.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobile}
                className="rounded-md px-2 py-3 text-lg font-medium text-white"
              >
                {item.label}
              </Link>
            ))}

            <a
              href={SIGN_IN_URL}
              rel="nofollow"
              onClick={closeMobile}
              className="rounded-md px-2 py-3 text-lg font-medium text-white"
            >
              Sign In
            </a>
          </nav>

          <div className="border-t border-white/20 p-4 sm:p-6">
            <Link
              href="/free-trial/"
              onClick={closeMobile}
              className="block w-full rounded-lg bg-button-navy px-5 py-3 text-center font-medium text-white shadow-sm"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
