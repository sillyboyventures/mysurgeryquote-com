"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

type Article = {
  title: string;
  slug: string;
  description: string;
  category: string;
};

export default function HelpSearch({ articles }: { articles: Article[] }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("q");
    if (p) setQ(p);
  }, []);

  const query = q.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      query
        ? articles.filter((a) =>
            `${a.title} ${a.description} ${a.category}`
              .toLowerCase()
              .includes(query),
          )
        : articles,
    [query, articles],
  );

  const groups = useMemo(() => {
    const m = new Map<string, Article[]>();
    for (const a of filtered) {
      if (!m.has(a.category)) m.set(a.category, []);
      m.get(a.category)!.push(a);
    }
    return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the help center…"
          aria-label="Search help articles"
          className="w-full rounded-full border border-border py-3 pl-12 pr-4 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-text-muted">
          No articles match “{q}”.
        </p>
      ) : (
        <div className="mt-12 space-y-12">
          {groups.map(([category, items]) => (
            <div key={category}>
              <h2 className="font-poppins text-2xl font-bold text-navy">
                {category}
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/help/${a.slug}`}
                    className="flex flex-col rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-lg"
                  >
                    <h3 className="font-poppins font-semibold text-navy">
                      {a.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-text-muted">
                      {a.description.slice(0, 100)}
                      {a.description.length > 100 ? "…" : ""}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
