import fs from "node:fs";
import path from "node:path";

const NBSP = String.fromCharCode(0xa0); // non-breaking space
const SP = String.fromCharCode(0x20); // regular space

let nbspFixed = 0;
for (const dir of ["content/blog", "content/help"]) {
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".mdx"))) {
    const fp = path.join(dir, f);
    const before = fs.readFileSync(fp, "utf8");
    const after = before.split(NBSP).join(SP);
    if (after !== before) {
      fs.writeFileSync(fp, after);
      nbspFixed++;
    }
  }
}
console.log(`nbsp normalized in ${nbspFixed} files`);

// Remove leftover authoring scaffolding line in membership-tiers (after nbsp fix).
const mt = "content/help/membership-tiers.mdx";
let m = fs.readFileSync(mt, "utf8");
const before = m;
m = m.replace(/^\*\*Title:\*\* Treatment Series \(Packages\)\n/m, "");
m = m.replace(/\n{3,}/g, "\n\n");
if (m !== before) {
  fs.writeFileSync(mt, m);
  console.log("cleaned membership-tiers scaffolding");
} else {
  console.log("membership-tiers: no scaffolding match");
}
