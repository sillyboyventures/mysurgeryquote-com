import fs from "node:fs";
import path from "node:path";

const APEX = "https://mysurgeryquote.com";
const WWW = "https://www.mysurgeryquote.com";
const VERCEL = "https://mysurgeryquote-com.vercel.app";
const DASH = String.fromCharCode(0x2014);

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
for (const d of ["app", "components", "lib", "content"]) if (fs.existsSync(d)) files = files.concat(walk(d));
files.push("public/llms.txt");

let changed = 0;
for (const f of files) {
  let s = fs.readFileSync(f, "utf8");
  const before = s;
  // FIX 1: apex + vercel preview -> www (apex first; APEX is a substring of WWW so
  // guard by replacing only "https://mysurgeryquote.com" which WWW does not contain).
  s = s.split(APEX).join(WWW);
  s = s.split(VERCEL).join(WWW);
  if (s !== before) changed++;
  fs.writeFileSync(f, s);
}
console.log(`URL migration applied to ${changed} files`);

// FIX 3: stale links in the GoHighLevel post
{
  const f = "content/blog/new-gohighlevel-integration-send-quotes-invoices-estimates-directly-to-your-crm.mdx";
  let s = fs.readFileSync(f, "utf8");
  s = s.split("(https://www.mysurgeryquote.com/demos)").join("(https://demo.mysurgeryquote.com/demo)");
  s = s.split("(https://www.mysurgeryquote.com/integrations)").join("(/integrations/)");
  fs.writeFileSync(f, s);
  console.log("FIX 3: GHL post links updated");
}

// FIX 5: em-dash in llms.txt
{
  const f = "public/llms.txt";
  let s = fs.readFileSync(f, "utf8");
  s = s
    .split(`All EMR integrations ${DASH} ModMed, DrChrono, GoHighLevel ${DASH} included on every plan.`)
    .join("All EMR integrations (ModMed, DrChrono, GoHighLevel) included on every plan.");
  fs.writeFileSync(f, s);
  const remaining = (s.match(new RegExp(DASH, "g")) || []).length;
  console.log(`FIX 5: llms.txt em-dashes remaining: ${remaining}`);
}
