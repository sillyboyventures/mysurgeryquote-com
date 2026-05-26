import fs from "node:fs";
import path from "node:path";

const DASH = String.fromCharCode(0x2014);
const dirs = ["content/blog", "content/help", "components", "app"];

function walk(d) {
  let out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (/\.(mdx|tsx|ts)$/.test(e.name)) out.push(p);
  }
  return out;
}

let files = [];
for (const d of dirs) if (fs.existsSync(d)) files = files.concat(walk(d));

let total = 0;
for (const f of files) {
  const n = fs.readFileSync(f, "utf8").split(DASH).length - 1;
  if (n > 0) {
    console.log(`${n}\t${f}`);
    total += n;
  }
}
console.log(`TOTAL em-dashes remaining in source: ${total}`);
