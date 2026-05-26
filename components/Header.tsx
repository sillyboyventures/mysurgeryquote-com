"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown, X } from "lucide-react";

type NavItem = { label: string; href: string; external?: boolean };

const solutions: NavItem[] = [
  { label: "Surgical Practices", href: "#" },
  { label: "Medical Spas", href: "#" },
  { label: "Integrations", href: "#" },
];

const resources: NavItem[] = [
  { label: "Help", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

const SIGN_IN_URL = "https://admin.mysurgeryquote.com/login";
const DEMO_URL = "https://demo.mysurgeryquote.com/demo";

function Dropdown({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-text transition-colors hover:text-primary"
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      {/* Outer wrapper starts at top-full (no hover gap); pt-2 gives visual spacing */}
      <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="min-w-52 rounded-xl border border-border bg-white p-2 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-bg-accent hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-white/95 shadow-sm backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-poppins text-xl font-bold text-navy"
          aria-label="MySurgeryQuote home"
        >
          MySurgeryQuote
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          <Dropdown label="Solutions" items={solutions} />
          <Link
            href="/features"
            className="rounded-md px-3 py-2 text-sm font-medium text-text transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="rounded-md px-3 py-2 text-sm font-medium text-text transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener"
            className="rounded-md px-3 py-2 text-sm font-medium text-text transition-colors hover:text-primary"
          >
            Demos
          </a>
          <Dropdown label="Resources" items={resources} />
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={SIGN_IN_URL}
            className="text-sm font-medium text-text transition-colors hover:text-primary"
          >
            Sign In
          </a>
          <Link
            href="/free-trial"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-dark"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-md p-2 text-navy lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <span className="font-poppins text-xl font-bold text-navy">
              MySurgeryQuote
            </span>
            <button
              type="button"
              onClick={closeMobile}
              className="rounded-md p-2 text-navy"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-2 sm:px-6"
            aria-label="Mobile navigation"
          >
            <p className="px-2 pt-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Solutions
            </p>
            {solutions.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobile}
                className="rounded-md px-2 py-3 text-lg font-medium text-text"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/features"
              onClick={closeMobile}
              className="rounded-md px-2 py-3 text-lg font-medium text-text"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              onClick={closeMobile}
              className="rounded-md px-2 py-3 text-lg font-medium text-text"
            >
              Pricing
            </Link>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener"
              onClick={closeMobile}
              className="rounded-md px-2 py-3 text-lg font-medium text-text"
            >
              Demos
            </a>

            <p className="px-2 pt-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Resources
            </p>
            {resources.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobile}
                className="rounded-md px-2 py-3 text-lg font-medium text-text"
              >
                {item.label}
              </Link>
            ))}

            <a
              href={SIGN_IN_URL}
              onClick={closeMobile}
              className="rounded-md px-2 py-3 text-lg font-medium text-text"
            >
              Sign In
            </a>
          </nav>

          <div className="border-t border-border p-4 sm:p-6">
            <Link
              href="/free-trial"
              onClick={closeMobile}
              className="block w-full rounded-lg bg-primary px-5 py-3 text-center font-medium text-white shadow-sm transition-colors hover:bg-primary-dark"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
