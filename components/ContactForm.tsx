"use client";

import { useEffect, useState, type FormEvent } from "react";

const inputClass =
  "mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30";
const labelClass = "block text-sm font-medium text-text";

const INQUIRY_TYPES = ["Sales", "Support", "Partnership", "Integration", "Other"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [inquiryType, setInquiryType] = useState("Sales");
  const [message, setMessage] = useState("");

  // Pre-fill from ?subject= (e.g. /contact?subject=Nextech+Early+Access)
  useEffect(() => {
    const subject = new URLSearchParams(window.location.search).get("subject");
    if (!subject) return;
    setMessage(subject);
    if (/nextech|integration/i.test(subject)) setInquiryType("Integration");
    else setInquiryType("Other");
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("success");
      } else {
        setError(json.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-bg-accent p-8 text-center">
        <h2 className="font-poppins text-2xl font-bold text-navy">Thanks!</h2>
        <p className="mt-3 text-text-muted">
          We&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-poppins text-2xl font-bold text-navy">
        Send us a message
      </h2>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {/* Honeypot */}
        <input
          type="text"
          name="_botfield"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="practiceName" className={labelClass}>
            Practice Name
          </label>
          <input
            id="practiceName"
            name="practiceName"
            type="text"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-text-muted">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="inquiryType" className={labelClass}>
            Inquiry Type
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            required
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
            className={inputClass}
          >
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClass}
          />
        </div>

        {status === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary-dark disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
        </button>
      </form>
    </div>
  );
}
