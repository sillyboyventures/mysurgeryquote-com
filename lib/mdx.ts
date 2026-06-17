import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import { categoryRank, articleRank, CATEGORY_ORDER } from "@/lib/help-order";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "content", "blog");
const HELP_DIR = path.join(ROOT, "content", "help");

export type Doc = {
  title: string;
  slug: string;
  date: string;
  modified: string;
  description: string;
  featured_image?: string;
  alt?: string;
  category?: string;
  author: string;
  reviewed_date: string;
  stale_flag: boolean;
  /** When true on a Q&A-structured blog post, emit FAQPage JSON-LD built from its H2 sections. */
  faq?: boolean;
};

export type Faq = { question: string; answer: string };

function readAll(dir: string): Doc[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => matter(fs.readFileSync(path.join(dir, f), "utf8")).data as Doc);
}

function readOne(dir: string, slug: string): { data: Doc; content: string } | null {
  const file = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { data: data as Doc, content };
}

export function getAllPosts(): Doc[] {
  const now = Date.now();
  return readAll(BLOG_DIR)
    .filter((p) => new Date(p.date).getTime() <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  return readOne(BLOG_DIR, slug);
}

export function getAllHelpArticles(): Doc[] {
  return readAll(HELP_DIR).sort(
    (a, b) =>
      categoryRank(a.category) - categoryRank(b.category) ||
      articleRank(a.category, a.slug) - articleRank(b.category, b.slug) ||
      a.title.localeCompare(b.title),
  );
}

export function getHelpArticleBySlug(slug: string) {
  return readOne(HELP_DIR, slug);
}

export function getHelpCategories(): { category: string; articles: Doc[] }[] {
  const all = getAllHelpArticles();
  return CATEGORY_ORDER.map((category) => ({
    category,
    articles: all.filter((a) => (a.category || "General") === category),
  })).filter((g) => g.articles.length > 0);
}

/** Render a markdown string to sanitized-ish HTML (GFM, heading anchors). */
export async function renderMarkdown(md: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);
  return String(file);
}

/** A line that is only a thematic break (`* * *`, `---`, `___`). */
const THEMATIC_BREAK = /^(\*{3,}|-{3,}|_{3,})$/;

/**
 * Build FAQ pairs from a Q&A-structured post: each level-2 heading becomes a
 * question and the markdown beneath it (up to the next H2) becomes the answer,
 * rendered through the same pipeline as the visible page so the FAQPage JSON-LD
 * mirrors on-page content exactly. Returns [] if the post has no H2 sections.
 */
export async function extractFaqs(content: string): Promise<Faq[]> {
  const sections: { question: string; body: string[] }[] = [];
  let current: { question: string; body: string[] } | null = null;

  for (const line of content.split(/\r?\n/)) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      current = { question: h2[1].trim(), body: [] };
      sections.push(current);
      continue;
    }
    if (!current) continue; // intro text before the first H2 is not a Q&A pair
    if (THEMATIC_BREAK.test(line.replace(/\s+/g, ""))) continue; // drop `* * *` separators
    current.body.push(line);
  }

  const faqs: Faq[] = [];
  for (const section of sections) {
    const md = section.body.join("\n").trim();
    if (!md) continue;
    const answer = (await renderMarkdown(md)).trim();
    faqs.push({ question: section.question, answer });
  }
  return faqs;
}
