import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, renderMarkdown } from "@/lib/mdx";

export const dynamicParams = false;

const PROD = "https://mysurgeryquote.com";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { data } = post;
  const canonical = `${PROD}/${slug}/`;
  return {
    title: { absolute: `${data.title} | MySurgeryQuote` },
    description: data.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: data.title,
      description: data.description,
      url: canonical,
      images: data.featured_image
        ? [{ url: data.featured_image, alt: data.alt || data.title }]
        : undefined,
      publishedTime: data.date,
      modifiedTime: data.modified,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: data.featured_image ? [data.featured_image] : undefined,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { data, content } = post;
  const html = await renderMarkdown(content);
  const canonical = `${PROD}/${slug}/`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    image: data.featured_image
      ? `${PROD}${data.featured_image}`
      : `${PROD}/og/home.png`,
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
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    description: data.description,
  };

  return (
    <article className="bg-white py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/blog"
          className="text-sm font-medium text-primary transition-colors hover:text-primary-dark"
        >
          ← Back to Blog
        </Link>

        <h1 className="mt-6 font-poppins text-4xl font-bold leading-tight text-navy md:text-5xl">
          {data.title}
        </h1>
        <p className="mt-4 text-sm text-text-muted">
          Published {formatDate(data.date)}
          {data.modified && data.modified.slice(0, 10) !== data.date.slice(0, 10)
            ? ` · Updated ${formatDate(data.modified)}`
            : ""}
        </p>

        {data.featured_image && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-border">
            <Image
              src={data.featured_image}
              alt={data.alt || data.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-slate mt-10 max-w-none prose-headings:font-poppins prose-headings:text-navy prose-a:text-primary prose-headings:no-underline [&_h1_a]:text-navy [&_h1_a]:no-underline [&_h2_a]:text-navy [&_h2_a]:no-underline [&_h3_a]:text-navy [&_h3_a]:no-underline [&_h4_a]:text-navy [&_h4_a]:no-underline"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-12 rounded-2xl bg-bg-accent p-8 text-center">
          <p className="font-poppins text-lg font-semibold text-navy">
            See it in action
          </p>
          <p className="mt-2 text-text-muted">
            Professional patient quotes in under 2 minutes.
          </p>
          <Link
            href="/free-trial"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </article>
  );
}
