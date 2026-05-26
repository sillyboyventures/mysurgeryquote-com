// One-off generator for the homepage Open Graph image.
// Renders an SVG (navy background, white wordmark, tagline) to a 1200x630 PNG.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#001D39"/>
  <text x="600" y="300" font-family="'Segoe UI', Arial, sans-serif" font-size="88"
        font-weight="700" fill="#FFFFFF" text-anchor="middle">MySurgeryQuote</text>
  <text x="600" y="384" font-family="'Segoe UI', Arial, sans-serif" font-size="42"
        font-weight="400" fill="#93C5FD" text-anchor="middle">Quotes in Under 2 Minutes</text>
</svg>`;

await mkdir("public/og", { recursive: true });
await sharp(Buffer.from(svg)).png().toFile("public/og/home.png");
console.log("Wrote public/og/home.png");
