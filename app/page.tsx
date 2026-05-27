import Hero from "@/components/sections/Hero";
import EmrBar from "@/components/sections/EmrBar";
import KoehlerFeatures from "@/components/sections/KoehlerFeatures";
import SolutionSplit from "@/components/sections/SolutionSplit";
import Benefits from "@/components/sections/Benefits";
import Testimonials from "@/components/sections/Testimonials";
import EmrDetail from "@/components/sections/EmrDetail";
import PricingTeaser from "@/components/sections/PricingTeaser";
import FAQ from "@/components/sections/FAQ";
import FinalCta from "@/components/sections/FinalCta";
import type { Metadata } from "next";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.mysurgeryquote.com/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <EmrBar />
      <KoehlerFeatures />
      <SolutionSplit />
      <Benefits />
      <Testimonials />
      <EmrDetail />
      <PricingTeaser />
      <FAQ />
      <FinalCta />
    </>
  );
}
