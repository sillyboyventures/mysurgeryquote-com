"use client";

import { useState } from "react";

export default function HelpFeedback({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);

  async function send(helpful: boolean) {
    try {
      await fetch("/api/help-feedback/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, helpful }),
      });
    } catch {
      /* non-blocking */
    }
    setDone(true);
  }

  if (done) {
    return (
      <p className="text-sm text-text-muted">Thanks for your feedback!</p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-text">Was this helpful?</span>
      <button
        type="button"
        onClick={() => send(true)}
        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => send(false)}
        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
      >
        No
      </button>
    </div>
  );
}
