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
  const data = await client.fetch<Achievement[]>(
    groq`*[_type == "achievement"] | order(order asc){ value, label }`,
  );
  return data.map((a) => ({
    ...a,
    label: a.label === "Military Service" ? "US Air Force" : a.label,
  }));
}

export async function getFaq(): Promise<Faq[]> {
  return client.fetch<Faq[]>(
    groq`*[_type == "faq" && (category == "general" || !defined(category))] | order(order asc){ question, answer }`,
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

// ── New content types ──────────────────────────────────────────

export interface Philosophy {
  num: string;
  title: string;
  body: string;
}
export async function getPhilosophy(): Promise<Philosophy[]> {
  return client.fetch<Philosophy[]>(
    groq`*[_type == "philosophy"] | order(order asc){ num, title, body }`,
  );
}

export interface Timeline {
  period: string;
  title: string;
  description: string;
}
const timelineFixes: Record<string, string> = {
  "2001 – 2022": "1987 – 2010",
  "2020 – Present": "2022 – Present",
};
export async function getTimeline(): Promise<Timeline[]> {
  const data = await client.fetch<Timeline[]>(
    groq`*[_type == "timeline"] | order(order asc){ period, title, description }`,
  );
  return data.map((t) => ({ ...t, period: timelineFixes[t.period] ?? t.period }));
}

export interface Affirmation {
  title: string;
  affirmations: string[];
}
export async function getAffirmations(): Promise<Affirmation[]> {
  return client.fetch<Affirmation[]>(
    groq`*[_type == "affirmation"] | order(order asc){ title, affirmations }`,
  );
}

export interface Value {
  title: string;
  body: string;
}
export async function getValues(): Promise<Value[]> {
  return client.fetch<Value[]>(
    groq`*[_type == "value"] | order(order asc){ title, body }`,
  );
}

export interface ServiceAudience {
  title: string;
  body: string;
}
export async function getServiceAudiences(): Promise<ServiceAudience[]> {
  const data = await client.fetch<ServiceAudience[]>(
    groq`*[_type == "serviceAudience"] | order(order asc){ title, body }`,
  );
  const hasIndividuals = data.some((a) => a.title.toLowerCase().includes("individuals"));
  if (!hasIndividuals) {
    data.push({
      title: "Individuals & Groups",
      body: "Individuals seeking self-care tools to incorporate into their lives, women’s groups, church groups, and community organizations.",
    });
  }
  return data;
}

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
}
export async function getProcessSteps(context: "services" | "booking"): Promise<ProcessStep[]> {
  return client.fetch<ProcessStep[]>(
    groq`*[_type == "processStep" && context == $context] | order(order asc){ step, title, body }`,
    { context },
  );
}

export interface SpeakingFormat {
  name: string;
  duration: string;
  description: string;
}
export async function getSpeakingFormats(): Promise<SpeakingFormat[]> {
  return client.fetch<SpeakingFormat[]>(
    groq`*[_type == "speakingFormat"] | order(order asc){ name, duration, description }`,
  );
}

export interface SpeakingAudience {
  label: string;
}
export async function getSpeakingAudiences(): Promise<SpeakingAudience[]> {
  return client.fetch<SpeakingAudience[]>(
    groq`*[_type == "speakingAudience"] | order(order asc){ label }`,
  );
}

export interface Guarantee {
  title: string;
  body: string;
}
export async function getGuarantees(): Promise<Guarantee[]> {
  return client.fetch<Guarantee[]>(
    groq`*[_type == "guarantee"] | order(order asc){ title, body }`,
  );
}

export interface Stat {
  value: string;
  label: string;
}
export async function getStats(): Promise<Stat[]> {
  return client.fetch<Stat[]>(
    groq`*[_type == "stat"] | order(order asc){ value, label }`,
  );
}

export interface BookingReason {
  label: string;
}
export async function getBookingReasons(): Promise<BookingReason[]> {
  return client.fetch<BookingReason[]>(
    groq`*[_type == "bookingReason"] | order(order asc){ label }`,
  );
}

export async function getFaqByCategory(category: string): Promise<Faq[]> {
  return client.fetch<Faq[]>(
    groq`*[_type == "faq" && category == $category] | order(order asc){ question, answer }`,
    { category },
  );
}
