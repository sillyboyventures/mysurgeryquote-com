import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog: Surgery and Med Spa Quoting Insights",
  description:
    "Guides and updates on surgery quote software, patient quoting, EMR integrations, and running a modern surgical practice or medical spa.",
  alternates: { canonical: "https://www.mysurgeryquote.com/blog/" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="The MySurgeryQuote blog"
        subhead="Guides and updates on patient quoting, EMR integrations, and running a modern practice."
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden bg-bg-accent">
                  {post.featured_image && (
                    <Image
                      src={post.featured_image}
                      alt={post.alt || post.title}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-text-muted">{formatDate(post.date)}</p>
                  <h2 className="mt-2 font-poppins text-lg font-semibold leading-snug text-navy">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-text-muted">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read more <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
