import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { FadeIn } from "@/components/FadeIn";
import { SubscribeForm } from "@/components/SubscribeForm";
import { formatArticleDate, getArticle, getArticles } from "@/lib/newsletter";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: [{ url: article.coverImage }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = (await getArticles())
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <article className="bg-warm-white">
      {/* Header */}
      <header className="mx-auto max-w-[760px] px-4 pt-16 lg:pt-24">
        <Link
          href="/newsletter"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:text-forest"
        >
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path d="M12 7H2M6 3L2 7l4 4" />
          </svg>
          The Journal
        </Link>

        <FadeIn direction="up">
          <div className="mt-8 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted/70">
            <span className="font-semibold text-sage">{article.category}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
            <time dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt)}
            </time>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
            <span>{article.readingTime} min read</span>
          </div>

          <h1 className="font-serif mt-4 text-3xl font-bold leading-[1.12] tracking-tight text-charcoal sm:text-4xl lg:text-[2.9rem]">
            {article.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{article.excerpt}</p>

          <div className="mt-8 flex items-center gap-3 border-t border-line/70 pt-6">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-charcoal">{article.author.name}</p>
              <p className="text-xs text-muted">{article.author.role}</p>
            </div>
          </div>
        </FadeIn>
      </header>

      {/* Cover */}
      <div className="mx-auto mt-12 max-w-[1000px] px-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-sm">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-[680px] px-4 py-14 lg:py-20">
        <PortableText value={article.body} components={bodyComponents} />
      </div>

      {/* Related */}
      <section className="border-t border-line/70 bg-warm-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1000px] px-4">
          <h2 className="font-serif mb-8 text-2xl font-bold tracking-tight text-charcoal">
            Keep reading
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {related.map((a) => (
              <Link key={a.slug} href={`/newsletter/${a.slug}`} className="group flex flex-col">
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                  <Image
                    src={a.coverImage}
                    alt={a.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-sage">
                  {a.category}
                </span>
                <h3 className="font-serif mt-1.5 text-lg font-bold leading-snug text-charcoal transition-colors group-hover:text-forest">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="bg-forest py-16 lg:py-20">
        <div className="mx-auto max-w-[680px] px-4 text-center">
          <h2 className="font-serif text-2xl font-bold text-white lg:text-3xl">
            Enjoyed this issue?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
            Subscribe to get the next one in your inbox.
          </p>
          <div className="mt-7 flex justify-center">
            <SubscribeForm variant="light" />
          </div>
        </div>
      </section>
    </article>
  );
}

const bodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-[1.075rem] leading-[1.85] text-charcoal/85">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif mt-12 mb-4 text-2xl font-bold tracking-tight text-charcoal">
        {children}
      </h2>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-6 space-y-3">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 text-[1.05rem] leading-relaxed text-charcoal/85">
        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-charcoal">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  types: {
    quote: ({ value }) => {
      const q = value as { text: string; cite?: string };
      return (
        <blockquote className="my-10 border-l-2 border-sage pl-6">
          <p className="font-serif text-xl font-medium italic leading-relaxed text-forest">
            &ldquo;{q.text}&rdquo;
          </p>
          {q.cite && (
            <cite className="mt-3 block text-xs font-semibold uppercase not-italic tracking-wider text-muted">
              — {q.cite}
            </cite>
          )}
        </blockquote>
      );
    },
  },
};
