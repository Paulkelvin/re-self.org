"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { formatArticleDate, type Article } from "@/lib/newsletter";

interface Props {
  articles: Article[];
  categories: string[];
}

const ALL = "All";

export function NewsletterFeed({ articles, categories }: Props) {
  const [active, setActive] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCategory = active === ALL || a.category === active;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [active, query, articles]);

  const filters = [ALL, ...categories];

  return (
    <div>
      {/* Filter + search bar */}
      <div className="mb-10 flex flex-col gap-5 border-b border-line/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2.5">
          {filters.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-[0.97] ${
                  isActive
                    ? "border-forest bg-forest text-white shadow-sm"
                    : "border-line bg-transparent text-muted hover:border-forest/40 hover:text-forest"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-72">
          <svg
            aria-hidden="true"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted/60"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="min-h-[44px] w-full rounded-full border border-line bg-white pl-11 pr-4 text-sm text-charcoal outline-none transition-colors placeholder:text-muted/60 focus:border-forest"
          />
        </div>
      </div>

      {/* Grid — keyed by active category so switching filters re-runs the
          staggered reveal; typing in search filters in place (no re-animation). */}
      <div key={active} className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article, i) => (
          <FadeIn key={article.slug} direction="up" delay={(i % 3) * 90}>
            <ArticleCard article={article} />
          </FadeIn>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-muted">
          No articles match your search — try a different topic or keyword.
        </p>
      )}
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/newsletter/${article.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-warm-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-forest backdrop-blur-sm">
          {article.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted/70">
          <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
          <span>{article.readingTime} min read</span>
        </div>

        <h3 className="font-serif text-xl font-bold leading-snug tracking-tight text-charcoal transition-colors duration-200 group-hover:text-forest">
          {article.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest">
          Read article
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
