import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllHelpArticles,
  getHelpArticleBySlug,
  renderMarkdown,
} from "@/lib/mdx";
import HelpFeedback from "@/components/HelpFeedback";

export const dynamicParams = false;

const PROD = "https://mysurgeryquote.com";

export function generateStaticParams() {
  return getAllHelpArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getHelpArticleBySlug(slug);
  if (!a) return {};
  return {
    title: { absolute: `${a.data.title} | MySurgeryQuote Help` },
    description: a.data.description,
    alternates: { canonical: `${PROD}/help/${slug}/` },
  };
}

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getHelpArticleBySlug(slug);
  if (!article) notFound();

  const { data, content } = article;
  const html = await renderMarkdown(content);
  const category = data.category || "General";
  const related = getAllHelpArticles().filter((a) => (a.category || "General") === category);

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: data.title,
    description: data.description,
    datePublished: data.date,
    dateModified: data.modified,
    author: { "@type": "Organization", name: "MySurgeryQuote" },
    publisher: {
      "@type": "Organization",
      name: "MySurgeryQuote",
      logo: {
        "@type": "ImageObject",
        url: "https://mysurgeryquote-com.vercel.app/brand/logo-white.png",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${PROD}/help/${slug}/` },
  };

  return (
    <section className="bg-white py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-6xl px-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-text-muted" aria-label="Breadcrumb">
          <Link href="/help" className="hover:text-primary">
            Help
          </Link>
          <span className="px-2" aria-hidden="true">
            /
          </span>
          <span>{category}</span>
          <span className="px-2" aria-hidden="true">
            /
          </span>
          <span className="text-text">{data.title}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Link
              href="/help"
              className="text-sm font-medium text-primary hover:text-primary-dark"
            >
              ← Back to Help center
            </Link>
            <p className="mt-6 font-poppins text-sm font-semibold uppercase tracking-wider text-text-muted">
              {category}
            </p>
            <ul className="mt-3 space-y-2">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/help/${a.slug}`}
                    className={`block text-sm transition-colors hover:text-primary ${
                      a.slug === slug
                        ? "font-semibold text-primary"
                        : "text-text-muted"
                    }`}
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content */}
          <div className="min-w-0">
            <h1 className="font-poppins text-3xl font-bold text-navy md:text-4xl">
              {data.title}
            </h1>
            <div
              className="prose prose-slate mt-8 max-w-none prose-headings:font-poppins prose-headings:text-navy prose-a:text-primary prose-headings:no-underline [&_h1_a]:text-navy [&_h1_a]:no-underline [&_h2_a]:text-navy [&_h2_a]:no-underline [&_h3_a]:text-navy [&_h3_a]:no-underline [&_h4_a]:text-navy [&_h4_a]:no-underline"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <div className="mt-12 border-t border-border pt-6">
              <HelpFeedback slug={slug} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
