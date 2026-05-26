import { Resend } from "resend";

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;

// Simple in-memory per-IP rate limiter. Adequate for a low-traffic marketing
// form; resets when the (Fluid Compute) instance recycles.
const hits = new Map<string, number[]>();

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Allow the request when there is no Origin header (server-to-server / curl /
 * tests) or when the Origin host is on the allowlist. Only browser cross-origin
 * abuse is blocked.
 */
export function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    return (
      host === "mysurgeryquote.com" ||
      host === "www.mysurgeryquote.com" ||
      host.endsWith(".vercel.app") ||
      host === "localhost" ||
      host === "127.0.0.1"
    );
  } catch {
    return false;
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function fieldsToHtml(fields: Record<string, string>): string {
  const rows = Object.entries(fields)
    .filter(([, v]) => v && v.trim() !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(
          k,
        )}</td><td style="padding:6px 12px">${escapeHtml(v).replace(/\n/g, "<br/>")}</td></tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows}</table>`;
}

export function fieldsToText(fields: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([, v]) => v && v.trim() !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

/**
 * Sends the form email via Resend. If the API key isn't configured yet, logs
 * and resolves successfully so the form works end-to-end before the key is set.
 */
export async function sendFormEmail(opts: {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
}): Promise<void> {
  const key = process.env.MSQ_RESEND_API_KEY;
  if (!key) {
    console.log(
      `[form-submit] MSQ_RESEND_API_KEY not set — skipping send. Subject: ${opts.subject}`,
    );
    return;
  }
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: "MySurgeryQuote Website <noreply@mysurgeryquote.com>",
    to: "support@mysurgeryquote.com",
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  });
  if (error) {
    // Throw so the route returns 500; details stay server-side.
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }
}
