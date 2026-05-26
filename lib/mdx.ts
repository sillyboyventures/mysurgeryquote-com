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
  category?: string;
  author: string;
  reviewed_date: string;
  stale_flag: boolean;
};

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
      (a.category || "").localeCompare(b.category || "") ||
      a.title.localeCompare(b.title),
  );
}

export function getHelpArticleBySlug(slug: string) {
  return readOne(HELP_DIR, slug);
}

export function getHelpCategories(): { category: string; articles: Doc[] }[] {
  const byCat = new Map<string, Doc[]>();
  for (const a of getAllHelpArticles()) {
    const cat = a.category || "General";
    if (!byCat.has(cat)) byCat.set(cat, []);
    byCat.get(cat)!.push(a);
  }
  return [...byCat.entries()]
    .map(([category, articles]) => ({ category, articles }))
    .sort((a, b) => a.category.localeCompare(b.category));
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
