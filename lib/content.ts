import { groq } from "next-sanity";
import type { Image } from "sanity";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

// Source of truth is Sanity. Each getter returns the same shape the
// components already expect (image fields resolved to URL strings).

export interface Service {
  title: string;
  image: string;
  body: string;
}
export interface Topic {
  title: string;
  description: string;
}
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  org: string;
  image: string;
}
export interface Achievement {
  value: string;
  label: string;
}
export interface Faq {
  question: string;
  answer: string;
}
/** [value, label] — matches the existing homepage destructuring. */
export type Credential = [string, string];

export async function getServices(): Promise<Service[]> {
  const data = await client.fetch<{ title: string; image: Image; body: string }[]>(
    groq`*[_type == "service"] | order(order asc){ title, image, body }`,
  );
  return data.map((s) => ({
    title: s.title,
    body: s.body,
    image: urlForImage(s.image).width(1200).quality(85).url(),
  }));
}

export async function getTopics(): Promise<Topic[]> {
  return client.fetch<Topic[]>(
    groq`*[_type == "topic"] | order(order asc){ title, description }`,
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await client.fetch<
    { quote: string; name: string; role: string; org: string; image: Image | null }[]
  >(groq`*[_type == "testimonial"] | order(order asc){ quote, name, role, org, image }`);
  return data.map((t) => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
    org: t.org,
    image: t.image ? urlForImage(t.image).width(224).height(224).url() : "",
  }));
}

export async function getCredentials(): Promise<Credential[]> {
  const data = await client.fetch<{ value: string; label: string }[]>(
    groq`*[_type == "credential"] | order(order asc){ value, label }`,
  );
  return data.map((c) => [c.value, c.label] as Credential);
}

export async function getAchievements(): Promise<Achievement[]> {
  return client.fetch<Achievement[]>(
    groq`*[_type == "achievement"] | order(order asc){ value, label }`,
  );
}

export async function getFaq(): Promise<Faq[]> {
  return client.fetch<Faq[]>(
    groq`*[_type == "faq"] | order(order asc){ question, answer }`,
  );
}

export interface Package {
  title: string;
  subtitle: string;
  price: number;
  priceLabel: string;
  priceSuffix: string;
  features: string[];
  highlighted: boolean;
  ctaLabel: string;
  squareItemId: string;
}

export async function getPackages(): Promise<Package[]> {
  return client.fetch<Package[]>(
    groq`*[_type == "package"] | order(order asc){
      title, subtitle, price, priceLabel, priceSuffix,
      features, highlighted, ctaLabel, squareItemId
    }`,
  );
}

export interface EventSpeaker {
  name: string;
  role: string;
  organization: string;
  image: string;
}

export interface SiteEvent {
  title: string;
  slug: string;
  eventType: string;
  date: string;
  endDate: string | null;
  location: string;
  isVirtual: boolean;
  description: string;
  coverImage: string;
  registrationUrl: string | null;
  speakers: EventSpeaker[];
  featured: boolean;
}

export async function getEvents(): Promise<SiteEvent[]> {
  const data = await client.fetch<
    {
      title: string;
      slug: { current: string };
      eventType: string;
      date: string;
      endDate: string | null;
      location: string;
      isVirtual: boolean;
      description: string;
      coverImage: Image;
      registrationUrl: string | null;
      featured: boolean;
      speakers: { name: string; role: string; organization: string; image: Image | null }[] | null;
    }[]
  >(
    groq`*[_type == "event"] | order(date desc){
      title,
      "slug": slug.current,
      eventType,
      date,
      endDate,
      location,
      isVirtual,
      description,
      coverImage,
      registrationUrl,
      featured,
      speakers[]{ name, role, organization, image }
    }`,
  );
  return data.map((e) => ({
    title: e.title,
    slug: e.slug.current ?? e.slug,
    eventType: e.eventType,
    date: e.date,
    endDate: e.endDate,
    location: e.location ?? "",
    isVirtual: e.isVirtual ?? false,
    description: e.description,
    coverImage: urlForImage(e.coverImage).width(1200).quality(85).url(),
    registrationUrl: e.registrationUrl,
    featured: e.featured ?? false,
    speakers: (e.speakers ?? []).map((s) => ({
      name: s.name,
      role: s.role ?? "",
      organization: s.organization ?? "",
      image: s.image ? urlForImage(s.image).width(200).height(200).url() : "",
    })),
  }));
}
