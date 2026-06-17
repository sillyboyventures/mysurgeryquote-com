import type { MetadataRoute } from "next";
import { getAllPosts, getAllHelpArticles } from "@/lib/mdx";

const BASE = "https://www.mysurgeryquote.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/features/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/surgical-practices/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/standalone-surgery-quote-software/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/medical-spas/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/integrations/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/pricing/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/free-trial/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/blog/`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/help/`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/privacy-policy/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms-of-service/`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${BASE}/${p.slug}/`,
    lastModified: new Date(p.modified),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const help: MetadataRoute.Sitemap = getAllHelpArticles().map((a) => ({
    url: `${BASE}/help/${a.slug}/`,
    lastModified: new Date(a.reviewed_date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...posts, ...help];
}
