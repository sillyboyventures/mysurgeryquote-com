import fs from "node:fs/promises";
import path from "node:path";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

export const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
export const TODAY = "2026-05-26";
export const SITE = "https://mysurgeryquote.com";

const td = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "*",
});
td.use(gfm);
td.remove(["script", "style", "noscript"]);

export function htmlToMarkdown(html) {
  let md = td.turndown(html || "");
  md = md.replace(/\n{3,}/g, "\n\n").trim();
  return md;
}

const ENT = {
  "&amp;": "&", "&#038;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
  "&#039;": "'", "&#8217;": "’", "&#8216;": "‘", "&#8220;": "“",
  "&#8221;": "”", "&#8211;": "–", "&#8212;": "—",
  "&#8230;": "…", "&nbsp;": " ", "&#160;": " ",
};
export function decodeEntities(s) {
  return (s || "").replace(/&[#a-zA-Z0-9]+;/g, (m) => ENT[m] ?? m);
}

export function stripHtml(html) {
  return decodeEntities((html || "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

export function makeDescription(excerptHtml, contentHtml) {
  let base = stripHtml(excerptHtml) || stripHtml(contentHtml);
  if (base.length > 157) base = base.slice(0, 157).replace(/\s+\S*$/, "") + "…";
  return base;
}

export async function fetchJSON(url) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
  return r.json();
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function downloadImage(url, destDir, baseName) {
  const clean = url.split("?")[0];
  let ext = path.extname(new URL(clean).pathname) || ".jpg";
  if (ext.length > 5) ext = ".jpg";
  await fs.mkdir(destDir, { recursive: true });
  const dest = path.join(destDir, baseName + ext);
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length === 0) throw new Error(`0 bytes ${url}`);
  await fs.writeFile(dest, buf);
  return { ext, bytes: buf.length };
}

// Download inline <img> from the WP site and rewrite src to a local path.
export async function rewriteInlineImages(html, slug, publicSubdir) {
  const imgRe = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const urls = new Set();
  let m;
  while ((m = imgRe.exec(html)) !== null) {
    if (/^https?:\/\//.test(m[1]) && /mysurgeryquote\.com/.test(m[1])) urls.add(m[1]);
  }
  let out = html;
  let count = 0;
  const failures = [];
  let i = 0;
  for (const url of urls) {
    i++;
    try {
      const { ext } = await downloadImage(
        url,
        path.join("public", publicSubdir, slug),
        `img-${i}`,
      );
      out = out.split(url).join(`/${publicSubdir}/${slug}/img-${i}${ext}`);
      count++;
      await sleep(150);
    } catch (e) {
      failures.push(`${slug} inline img ${url}: ${e.message}`);
    }
  }
  return { html: out, count, failures };
}

// Current pricing the live /pricing page advertises (monthly $ + add-ons).
const CURRENT_MONTHLY = new Set(["100", "150", "350", "300", "50", "40"]);

export function checkStale(text) {
  const reasons = [];
  // (Removed the "mentions Nextech without 'coming soon'" check — Nextech is now LIVE,
  //  so that rule is inverted: Nextech copy should NOT say "coming soon" anymore.)
  const priceRe = /\$(\d{2,4})\s*(?:\/\s*mo\b|\/\s*month\b|per month|a month|monthly)/gi;
  let m;
  while ((m = priceRe.exec(text)) !== null) {
    if (!CURRENT_MONTHLY.has(m[1])) reasons.push(`monthly price $${m[1]} not in current pricing`);
  }
  if (
    /(gohighlevel|highlevel)/i.test(text) &&
    /(med spa only|only.{0,20}med spa|med spa plan only|only available on med spa)/i.test(text)
  ) {
    reasons.push("GoHighLevel described as med-spa-only (now on every plan)");
  }
  return [...new Set(reasons)];
}

export function frontmatter(obj) {
  const lines = Object.entries(obj).map(([k, v]) =>
    typeof v === "boolean" ? `${k}: ${v}` : `${k}: ${JSON.stringify(v ?? "")}`,
  );
  return `---\n${lines.join("\n")}\n---\n`;
}
