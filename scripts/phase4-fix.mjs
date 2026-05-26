import fs from "node:fs";
import path from "node:path";

// FIX 1: alt text per blog slug
const ALT = {
  "new-gohighlevel-integration-send-quotes-invoices-estimates-directly-to-your-crm":
    "MySurgeryQuote quote screen showing the GoHighLevel send dropdown with Send Quote PDF and Send to Billing",
  "how-to-compare-surgery-quotes-across-practices":
    "MySurgeryQuote quote history with multiple patient quotes filterable by surgeon, status, and PCC",
  "how-do-surgeons-create-patient-quotes":
    "MySurgeryQuote 7-step new quote wizard with patient information and surgeon picker",
  "how-much-does-surgery-quote-software-cost":
    "MySurgeryQuote dashboard showing $165,635 total quote value and Create New Quote button",
  "what-is-included-in-a-surgery-quote":
    "MySurgeryQuote quote breakdown showing surgeon fees, facility fee, anesthesia, implants, and additional fees totaling $12,625, sent to DrChrono",
  "what-is-surgery-quote-software":
    "MySurgeryQuote dashboard with Quotes by Doctor breakdown showing per-surgeon quote totals",
};

for (const [slug, alt] of Object.entries(ALT)) {
  const file = path.join("content/blog", `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  let fm = fmMatch[1];
  // Function replacements so `$` in alt text isn't treated as a backreference.
  if (/^alt:/m.test(fm))
    fm = fm.replace(/^alt:.*$/m, () => `alt: ${JSON.stringify(alt)}`);
  else
    fm = fm.replace(
      /^(featured_image:.*)$/m,
      (_m, g1) => `${g1}\nalt: ${JSON.stringify(alt)}`,
    );
  fs.writeFileSync(file, raw.replace(fmMatch[0], `---\n${fm}\n---\n`));
  console.log(`alt set: ${slug}`);
}

// FIX 3: reformat "Updated YYYY-MM-DD" -> "Updated Month D, YYYY" in all MDX bodies
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
let dateFixed = 0;
for (const dir of ["content/blog", "content/help"]) {
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".mdx"))) {
    const fp = path.join(dir, f);
    const before = fs.readFileSync(fp, "utf8");
    const after = before.replace(
      /Updated (\d{4})-(\d{2})-(\d{2})/g,
      (_, y, mo, d) => `Updated ${MONTHS[+mo - 1]} ${+d}, ${y}`,
    );
    if (after !== before) {
      fs.writeFileSync(fp, after);
      dateFixed++;
      console.log(`date reformatted: ${f}`);
    }
  }
}
console.log(`\nalt updated: ${Object.keys(ALT).length} posts; dates reformatted in ${dateFixed} files`);
