import fs from "node:fs";

const D = String.fromCharCode(0x2014);
const edits = {
  "lib/faq.ts": [
    [`and reps ${D} either as group rates`, "and reps, either as group rates"],
    [`at no extra charge ${D} you send the file`, "at no extra charge. You send the file"],
    [`no setup fees ${D} we add them`, "no setup fees. We add them"],
  ],
  "lib/emr.ts": [
    [`No downloading and re-uploading ${D} it's one click`, "No downloading and re-uploading. It's one click"],
  ],
  "lib/form-submit.ts": [
    [`MSQ_RESEND_API_KEY not set ${D} skipping send`, "MSQ_RESEND_API_KEY not set, skipping send"],
  ],
};

let warnings = 0;
for (const [file, pairs] of Object.entries(edits)) {
  let s = fs.readFileSync(file, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) {
      console.warn(`WARN no match in ${file}: ${from.slice(0, 50)}`);
      warnings++;
      continue;
    }
    s = s.split(from).join(to);
  }
  fs.writeFileSync(file, s);
}
console.log(`lib de-dash done; warnings: ${warnings}`);
