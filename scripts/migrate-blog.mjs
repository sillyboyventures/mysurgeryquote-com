import fs from "node:fs/promises";
import path from "node:path";
import {
  TODAY,
  fetchJSON,
  htmlToMarkdown,
  decodeEntities,
  makeDescription,
  downloadImage,
  rewriteInlineImages,
  checkStale,
  frontmatter,
} from "./_migrate-common.mjs";

const OUT = "content/blog";
const IMG = "public/blog";

await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(IMG, { recursive: true });

const posts = await fetchJSON(
  "https://mysurgeryquote.com/wp-json/wp/v2/posts?per_page=100&_embed",
);

const failures = [];
const stale = [];
let imgCount = 0;
let n = 0;

for (const p of posts) {
  try {
    const slug = p.slug;
    const title = decodeEntities(p.title?.rendered || slug);

    let featured = "";
    const media = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (media) {
      try {
        const { ext } = await downloadImage(media, IMG, slug);
        featured = `/blog/${slug}${ext}`;
        imgCount++;
      } catch (e) {
        failures.push(`featured ${slug}: ${e.message}`);
      }
    }

    const ri = await rewriteInlineImages(p.content?.rendered || "", slug, "blog");
    imgCount += ri.count;
    failures.push(...ri.failures);

    const md = htmlToMarkdown(ri.html);
    const description = makeDescription(p.excerpt?.rendered, p.content?.rendered);
    const reasons = checkStale(md);
    const isStale = reasons.length > 0;
    if (isStale) stale.push({ slug, reasons });

    const body = isStale
      ? `> **Updated ${TODAY}** to reflect current pricing and feature behavior.\n\n${md}`
      : md;

    const fm = frontmatter({
      title,
      slug,
      date: `${p.date_gmt}Z`,
      modified: `${p.modified_gmt}Z`,
      description,
      featured_image: featured,
      author: "MySurgeryQuote Team",
      reviewed_date: TODAY,
      stale_flag: isStale,
    });

    await fs.writeFile(path.join(OUT, `${slug}.mdx`), `${fm}\n${body}\n`);
    console.log(`OK  ${slug}${isStale ? "  [STALE]" : ""}`);
    n++;
  } catch (e) {
    failures.push(`post ${p.slug}: ${e.message}`);
    await fs.appendFile("scripts/migrate-failures.log", `BLOG ${p.slug}: ${e.message}\n`);
  }
}

console.log(`\n=== BLOG SUMMARY ===`);
console.log(`Migrated: ${n}/${posts.length}`);
console.log(`Images downloaded: ${imgCount}`);
console.log(`Stale flagged: ${stale.length}`);
stale.forEach((s) => console.log(`  STALE ${s.slug} :: ${s.reasons.join("; ")}`));
if (failures.length) {
  console.log(`Failures (${failures.length}):`);
  failures.forEach((f) => console.log("  " + f));
}
