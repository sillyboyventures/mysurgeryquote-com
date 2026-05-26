import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HelpSearch from "@/components/HelpSearch";
import { getAllHelpArticles } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Help Center — Guides & How-Tos",
  description:
    "Step-by-step guides for MySurgeryQuote: quotes, surgeon pricing, fee settings, EMR integrations, med spa features, reporting, and more.",
  alternates: { canonical: "https://mysurgeryquote.com/help/" },
};

export default function HelpPage() {
  const articles = getAllHelpArticles().map((a) => ({
    title: a.title,
    slug: a.slug,
    description: a.description,
    category: a.category || "General",
  }));

  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title="How can we help?"
        subhead="Step-by-step guides for quotes, pricing, fee settings, EMR integrations, and more."
      />
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <HelpSearch articles={articles} />
        </div>
      </section>
    </>
  );
}
