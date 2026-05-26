const BASE = "https://mysurgeryquote-com.vercel.app";
const DASH = String.fromCharCode(0x2014);

const pages = [
  "/", "/features/", "/surgical-practices/", "/medical-spas/", "/integrations/",
  "/pricing/", "/contact/", "/free-trial/", "/blog/", "/help/",
  "/why-your-emr-quoting-tool-falls-short/", "/modmed-quoting-vs-mysurgeryquote/",
  "/drchrono-quoting-vs-mysurgeryquote/", "/hidden-cost-of-bad-surgery-quotes/",
  "/how-pccs-use-quoting-software/", "/emr-quoting-tools-compared/",
];

const get = async (p) => (await fetch(BASE + p)).text();

console.log("=== em-dash count per page (rendered HTML; ~2x via RSC payload) ===");
for (const p of pages) {
  const html = await get(p);
  const n = html.split(DASH).length - 1;
  console.log(`${String(n).padStart(4)}  ${p}`);
}

console.log("\n=== FIX 1 grep checks ===");
const pricing = await get("/pricing/");
console.log("pricing  'All EMR integrations included on every plan' :", pricing.split("All EMR integrations included on every plan").length - 1);
console.log("pricing  'ModMed and DrChrono integrations included'   :", pricing.split("ModMed and DrChrono integrations included").length - 1);
const ft = await get("/free-trial/");
console.log("free-trial 'All EMR integrations (ModMed, DrChrono, GoHighLevel)':", ft.split("All EMR integrations (ModMed, DrChrono, GoHighLevel)").length - 1);
console.log("free-trial 'ModMed &amp; DrChrono integration'                  :", ft.split("ModMed &amp; DrChrono integration").length - 1);
