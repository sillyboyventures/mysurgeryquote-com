import fs from "node:fs/promises";
import path from "node:path";
import {
  TODAY,
  fetchJSON,
  htmlToMarkdown,
  decodeEntities,
  makeDescription,
  rewriteInlineImages,
  checkStale,
  frontmatter,
  sleep,
} from "./_migrate-common.mjs";

const OUT = "content/help";
await fs.mkdir(OUT, { recursive: true });

// 1. Category taxonomy: id -> name
const cats = await fetchJSON(
  "https://mysurgeryquote.com/wp-json/wp/v2/epkb_post_type_1_category?per_page=100",
);
const catMap = new Map();
for (const c of cats) catMap.set(c.id, decodeEntities(c.name));
console.log(`Categories: ${cats.map((c) => `${c.id}=${decodeEntities(c.name)}`).join(", ")}`);

// 2. All help articles (content included)
const articles = await fetchJSON(
  "https://mysurgeryquote.com/wp-json/wp/v2/epkb_post_type_1?per_page=100",
);

const failures = [];
const stale = [];
const catCounts = {};
let imgCount = 0;
let n = 0;

for (const a of articles) {
  try {
    const slug = a.slug;
    const title = decodeEntities(a.title?.rendered || slug);
    const catId = a.epkb_post_type_1_category?.[0];
    const category = (catId && catMap.get(catId)) || "General";
    catCounts[category] = (catCounts[category] || 0) + 1;

    const ri = await rewriteInlineImages(a.content?.rendered || "", slug, "help");
    imgCount += ri.count;
    failures.push(...ri.failures);

    const md = htmlToMarkdown(ri.html);
    const description = makeDescription(a.excerpt?.rendered, a.content?.rendered);
    const reasons = checkStale(md);
    const isStale = reasons.length > 0;
    if (isStale) stale.push({ slug, reasons });

    const body = isStale
      ? `> **Updated ${TODAY}** to reflect current pricing and feature behavior.\n\n${md}`
      : md;

    const fm = frontmatter({
      title,
      slug,
      date: `${a.date_gmt}Z`,
      modified: `${a.modified_gmt}Z`,
      description,
      featured_image: "",
      category,
      author: "MySurgeryQuote Team",
      reviewed_date: TODAY,
      stale_flag: isStale,
    });

    await fs.writeFile(path.join(OUT, `${slug}.mdx`), `${fm}\n${body}\n`);
    console.log(`OK  [${category}] ${slug}${isStale ? "  [STALE]" : ""}`);
    n++;
    await sleep(100);
  } catch (e) {
    failures.push(`help ${a.slug}: ${e.message}`);
    await fs.appendFile("scripts/migrate-failures.log", `HELP ${a.slug}: ${e.message}\n`);
  }
}

console.log(`\n=== HELP SUMMARY ===`);
console.log(`Migrated: ${n}/${articles.length}`);
console.log(`Images downloaded: ${imgCount}`);
console.log(`Categories:`, JSON.stringify(catCounts, null, 0));
console.log(`Stale flagged: ${stale.length}`);
stale.forEach((s) => console.log(`  STALE ${s.slug} :: ${s.reasons.join("; ")}`));
if (failures.length) {
  console.log(`Failures (${failures.length}):`);
  failures.forEach((f) => console.log("  " + f));
}
