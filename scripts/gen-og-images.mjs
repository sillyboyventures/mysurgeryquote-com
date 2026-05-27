import sharp from "sharp";

const W = 1200, H = 630, R = W / H;

const jobs = [
  ["public/screens/dashboard.png", "public/og/features.png"],
  ["public/screens/new-quote-wizard.png", "public/og/surgical.png"],
  ["public/screens/medspa-dashboard.png", "public/og/medspa.png"],
  ["public/screens/modmed-ui.png", "public/og/integrations.png"],
  ["public/screens/dashboard.png", "public/og/pricing.png"],
];

for (const [src, dest] of jobs) {
  const { width: w, height: h } = await sharp(src).metadata();
  let cw, ch, left, top;
  if (w / h >= R) {
    ch = h;
    cw = Math.round(h * R);
    left = Math.round((w - cw) / 2);
    top = 0;
  } else {
    cw = w;
    ch = Math.round(w / R);
    left = 0;
    top = 0;
  }
  await sharp(src)
    .extract({ left, top, width: cw, height: ch })
    .resize(W, H)
    .png({ compressionLevel: 9 })
    .toFile(dest);
  console.log(`${dest} (from ${w}x${h})`);
}
console.log("done");
