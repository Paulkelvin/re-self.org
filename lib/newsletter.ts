import { groq } from "next-sanity";
import type { Image, PortableTextBlock } from "sanity";
import { sanityFetch } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  /** ISO date string, e.g. "2026-05-28". */
  publishedAt: string;
  readingTime: number;
  author: Author;
  featured: boolean;
  /** Portable Text from Sanity (paragraphs, headings, lists, pull-quotes). */
  body: PortableTextBlock[];
}

interface RawArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: Image;
  publishedAt: string;
  readingTime: number;
  featured: boolean | null;
  author: { name: string; role: string; avatar: Image | null } | null;
  body: PortableTextBlock[];
}

const PROJECTION = groq`{
  "slug": slug.current,
  title,
  excerpt,
  category,
  coverImage,
  publishedAt,
  readingTime,
  featured,
  "author": author->{ name, role, avatar },
  body
}`;

function mapArticle(a: RawArticle): Article {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    coverImage: urlForImage(a.coverImage).width(1600).quality(80).url(),
    publishedAt: a.publishedAt,
    readingTime: a.readingTime,
    featured: Boolean(a.featured),
    author: {
      name: a.author?.name ?? "",
      role: a.author?.role ?? "",
      avatar: a.author?.avatar
        ? urlForImage(a.author.avatar).width(160).height(160).url()
        : "",
    },
    body: a.body ?? [],
  };
}

export async function getArticles(): Promise<Article[]> {
  const data = await sanityFetch<RawArticle[]>(
    groq`*[_type == "article"] | order(publishedAt desc)${PROJECTION}`,
  );
  return data.map(mapArticle);
}

export async function getArticle(slug: string): Promise<Article | null> {
  const a = await sanityFetch<RawArticle | null>(
    groq`*[_type == "article" && slug.current == $slug][0]${PROJECTION}`,
    { slug },
  );
  return a ? mapArticle(a) : null;
}

/** Human-readable date, e.g. "May 28, 2026". */
export function formatArticleDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
