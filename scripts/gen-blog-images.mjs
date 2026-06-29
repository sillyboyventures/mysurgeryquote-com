import sharp from "sharp";

const TARGET_W = 1600;
const TARGET_H = 900;
const RATIO = TARGET_W / TARGET_H;

const jobs = [
  ["public/screens/fee-settings.png", "public/blog/why-your-emr-quoting-tool-falls-short.png"],
  ["public/screens/modmed-ui.png", "public/blog/modmed-quoting-vs-mysurgeryquote.png"],
  ["public/screens/quote-history.png", "public/blog/drchrono-quoting-vs-mysurgeryquote.png"],
  ["public/screens/create-quote.png", "public/blog/nextech-quoting-vs-mysurgeryquote.png"],
  ["public/screens/dashboard.png", "public/blog/hidden-cost-of-bad-surgery-quotes.png"],
  ["public/screens/commissions.png", "public/blog/how-pccs-use-quoting-software.png"],
  ["public/screens/reports.png", "public/blog/emr-quoting-tools-compared.png"],
];

for (const [src, dest] of jobs) {
  const { width: w, height: h } = await sharp(src).metadata();
  let cw, ch, left, top;
  if (w / h >= RATIO) {
    // wider than 16:9 — crop width, center
    ch = h;
    cw = Math.round(h * RATIO);
    left = Math.round((w - cw) / 2);
    top = 0;
  } else {
    // taller than 16:9 — crop height from the top
    cw = w;
    ch = Math.round(w / RATIO);
    left = 0;
    top = 0;
  }
  await sharp(src)
    .extract({ left, top, width: cw, height: ch })
    .resize(TARGET_W, TARGET_H)
    .png()
    .toFile(dest);
  console.log(`${dest}  (from ${w}x${h}, crop ${cw}x${ch} @ ${left},${top})`);
}
console.log("done");
