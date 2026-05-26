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
    a: "Yes. Set commission rates for PCCs, schedulers, and reps — either as group rates or individual rates. Rates can vary by provider. Only invoiced quotes count toward commissions, and reports export to CSV.",
  },
];
