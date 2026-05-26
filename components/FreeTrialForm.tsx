"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30";
const labelClass = "block text-sm font-medium text-text";

export default function FreeTrialForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/free-trial", {
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
        <h3 className="font-poppins text-2xl font-bold text-navy">
          You&apos;re all set!
        </h3>
        <p className="mt-3 text-text-muted">
          Check your email for next steps. We&apos;ll have your account ready
          within one business day. In the meantime, you can explore the live demo
          at demo.mysurgeryquote.com.
        </p>
        <a
          href="https://demo.mysurgeryquote.com/demo"
          target="_blank"
          rel="noopener"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary-dark"
        >
          Open the Demo →
        </a>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-poppins text-2xl font-bold text-navy">
        Start your free trial
      </h2>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-text-muted">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
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
          <label htmlFor="practiceType" className={labelClass}>
            Practice Type
          </label>
          <select
            id="practiceType"
            name="practiceType"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select…
            </option>
            <option>Surgical</option>
            <option>Medical Spa</option>
            <option>Both</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="providers" className={labelClass}>
            Number of Surgeons or Providers
          </label>
          <select
            id="providers"
            name="providers"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select…
            </option>
            <option>1</option>
            <option>2-5</option>
            <option>6-10</option>
            <option>11+</option>
          </select>
        </div>
        <div>
          <label htmlFor="hearAbout" className={labelClass}>
            How did you hear about us?{" "}
            <span className="text-text-muted">(optional)</span>
          </label>
          <input id="hearAbout" name="hearAbout" type="text" className={inputClass} />
        </div>

        {status === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Start Free Trial"}
        </button>
        <p className="text-sm text-text-muted">
          We&apos;ll have your account ready within one business day.
        </p>
      </form>
    </div>
  );
}
