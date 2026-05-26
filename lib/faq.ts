export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Is my patient data secure?",
    a: "Yes. All data is encrypted at rest and in transit. MySurgeryQuote is fully HIPAA compliant with audit logging, automatic session timeouts, and role-based access control.",
  },
  {
    q: "How long does setup take?",
    a: "Most practices are up and running within 24 hours. We handle the initial configuration for you.",
  },
  {
    q: "Is there a contract?",
    a: "No. Pay monthly, cancel anytime. No setup fees, no cancellation fees.",
  },
  {
    q: "Can I manage multiple locations?",
    a: "Yes. Multi-location plans let you manage all your practice locations from one account with per-location branding.",
  },
  {
    q: "Do you integrate with EMRs?",
    a: "Yes. We integrate with ModMed, DrChrono, and GoHighLevel today, with Nextech coming soon. Send quote PDFs directly to patient charts or CRM contacts with one click.",
  },
  {
    q: "Can each surgeon have their own price list?",
    a: "Yes. Each surgeon can have custom pricing for any procedure without affecting your master price list. Select the surgeon at the start of a quote and prices adjust automatically.",
  },
  {
    q: "Do you track commissions for patient care coordinators?",
    a: "Yes. Set commission rates for PCCs, schedulers, and reps, either as group rates or individual rates. Rates can vary by provider. Only invoiced quotes count toward commissions, and reports export to CSV.",
  },
  {
    q: "How are facility and anesthesia fees calculated?",
    a: "You set your base fee, hourly rate after included hours, and optional cap. The system calculates fees automatically based on total surgical time for all procedures on the quote. Different facilities can have different fee structures.",
  },
  {
    q: "Can I import my existing procedure list?",
    a: "Yes. We support CSV and Excel import for bulk procedure upload. Our team handles the initial migration during setup at no extra charge. You send the file, we load it.",
  },
  {
    q: "Can I quote surgical and med spa services on the same quote?",
    a: "Yes, if you have both surgical and med spa enabled. Mixed quotes apply facility and anesthesia fees only to the surgical items automatically. One PDF, one patient record.",
  },
  {
    q: "What's the difference between Solo, Practice, and Multi-Location plans?",
    a: "Solo is for single-surgeon practices ($100/mo, 1 surgeon). Practice is for multi-surgeon single-location practices ($150/mo, 2 surgeons included, +$50/mo per additional). Multi-Location is for practices with multiple offices ($350/mo, 2 locations, +$150/mo per additional).",
  },
  {
    q: "What happens if I add a surgeon or location mid-month?",
    a: "You're charged a prorated amount for the rest of that billing period. No downtime, no setup fees. We add them the same day you request it.",
  },
];
