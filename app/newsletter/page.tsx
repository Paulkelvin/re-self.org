import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { NewsletterFeed } from "@/components/NewsletterFeed";
import { SubscribeForm } from "@/components/SubscribeForm";
import { getArticles, formatArticleDate } from "@/lib/newsletter";

export const metadata: Metadata = {
  title: "The Re-Self Journal",
  description:
    "Essays and field notes from Sonya Harris on wellness, resilient leadership, sustainable performance, and self-care — for the people who carry the weight of high-pressure work.",
};

export const revalidate = 60;

export default async function NewsletterPage() {
  const articles = await getArticles();
  // The featured article anchors the page; the feed shows the rest.
  const featuredArticle = articles.find((a) => a.featured) ?? articles[0];
  if (!featuredArticle) return null;
  const rest = articles.filter((a) => a.slug !== featuredArticle.slug);
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-warm-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-sage/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full bg-beige blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-4 py-20 lg:py-28">
          <FadeIn direction="up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-forest/90">
              The Re-Self Journal
            </p>
            <h1 className="font-serif max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-charcoal sm:text-5xl lg:text-[3.4rem]">
              Field notes on wellness, leadership, and{" "}
              <span className="text-forest">sustainable performance.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted lg:text-lg">
              Practical essays from Sonya Harris for leaders and teams who carry real
              pressure — drawn from 21+ years of service, federal leadership, and wellness
              facilitation. New issues land in your inbox, no fluff.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={120}>
            <div className="mt-9">
              <SubscribeForm variant="dark" />
              <p className="mt-3 text-xs text-muted/70">
                Join the list. Unsubscribe anytime — your inbox, your rules.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-warm-white pb-8 pt-10 lg:pt-0">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <Link
              href={`/newsletter/${featuredArticle.slug}`}
              className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-line/70 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
                <Image
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <span className="absolute left-5 top-5 rounded-full bg-forest px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  Latest Issue
                </span>
              </div>

              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="mb-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted/70">
                  <span className="font-semibold text-sage">{featuredArticle.category}</span>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
                  <time dateTime={featuredArticle.publishedAt}>
                    {formatArticleDate(featuredArticle.publishedAt)}
                  </time>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
                  <span>{featuredArticle.readingTime} min read</span>
                </div>

                <h2 className="font-serif text-2xl font-bold leading-tight tracking-tight text-charcoal transition-colors duration-200 group-hover:text-forest lg:text-[2.2rem]">
                  {featuredArticle.title}
                </h2>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
                  {featuredArticle.excerpt}
                </p>

                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                  Read the issue
                  <svg
                    width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </span>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Feed */}
      <section className="bg-warm-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-forest lg:text-3xl">
                All Articles
              </h2>
              <p className="mt-2 text-sm text-muted">
                Browse the archive by topic.
              </p>
            </div>
          </FadeIn>
          <NewsletterFeed articles={rest} categories={categories} />
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="bg-forest py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <FadeIn direction="up">
              <h2 className="font-serif text-3xl font-bold leading-tight text-white lg:text-4xl">
                Never miss an issue.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
                Get Sonya&apos;s essays on wellness and resilient leadership delivered as soon
                as they&apos;re published. Thoughtful, practical, and never more than you have
                time to read.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={100}>
              <SubscribeForm variant="light" className="lg:ml-auto" />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
