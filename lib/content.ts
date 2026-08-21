import { groq } from "next-sanity";
import type { Image } from "sanity";
import { sanityFetch } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

// Source of truth is Sanity. Each getter returns the same shape the
// components already expect (image fields resolved to URL strings).

export async function getHeroImage(): Promise<string> {
  const data = await sanityFetch<{ heroImage: Image | null } | null>(
    groq`*[_type == "siteSettings"][0]{ heroImage }`,
  );
  if (data?.heroImage) {
    return urlForImage(data.heroImage).width(2400).quality(85).url();
  }
  return "/sonya-harris-portrait.jpg";
}

export interface HeroContent {
  subtext: string;
}

const DEFAULT_HERO_CONTENT: HeroContent = {
  subtext:
    "We design and facilitate transformative self-care workshops and retreats, while also bringing our expertise to corporate panels and keynote speaking engagements.",
};

export async function getHeroContent(): Promise<HeroContent> {
  const data = await sanityFetch<{ heroSubtext: string | null } | null>(
    groq`*[_type == "siteSettings"][0]{ heroSubtext }`,
  );
  return {
    subtext: data?.heroSubtext || DEFAULT_HERO_CONTENT.subtext,
  };
}

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

export async function getServices(): Promise<Service[]> {
  const data = await sanityFetch<{ title: string; image: Image; body: string }[]>(
    groq`*[_type == "service"] | order(order asc){ title, image, body }`,
  );
  return data.map((s) => ({
    title: s.title,
    body: s.body,
    image: urlForImage(s.image).width(1200).quality(85).url(),
  }));
}

export async function getTopics(): Promise<Topic[]> {
  return sanityFetch<Topic[]>(
    groq`*[_type == "topic"] | order(order asc){ title, description }`,
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await sanityFetch<
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

export async function getAchievements(): Promise<Achievement[]> {
  return sanityFetch<Achievement[]>(
    groq`*[_type == "achievement"] | order(order asc){ value, label }`,
  );
}

export async function getFaq(): Promise<Faq[]> {
  return sanityFetch<Faq[]>(
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
  return sanityFetch<Package[]>(
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
  showSaveToCalendar: boolean;
  earlyBirdPrice: number | null;
  regularPrice: number | null;
  earlyBirdDeadline: string | null;
}

export async function getEvents(): Promise<SiteEvent[]> {
  const data = await sanityFetch<
    {
      title: string;
      slug: string;
      eventType: string;
      date: string;
      endDate: string | null;
      location: string;
      isVirtual: boolean;
      description: string;
      coverImage: Image;
      registrationUrl: string | null;
      featured: boolean;
      showSaveToCalendar: boolean;
      earlyBirdPrice: number | null;
      regularPrice: number | null;
      earlyBirdDeadline: string | null;
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
      showSaveToCalendar,
      earlyBirdPrice,
      regularPrice,
      earlyBirdDeadline,
      speakers[]{ name, role, organization, image }
    }`,
  );
  return data.map((e) => ({
    title: e.title,
    slug: e.slug,
    eventType: e.eventType,
    date: e.date,
    endDate: e.endDate,
    location: e.location ?? "",
    isVirtual: e.isVirtual ?? false,
    description: e.description,
    coverImage: urlForImage(e.coverImage).width(1200).quality(85).url(),
    registrationUrl: e.registrationUrl,
    featured: e.featured ?? false,
    showSaveToCalendar: e.showSaveToCalendar ?? false,
    earlyBirdPrice: e.earlyBirdPrice ?? null,
    regularPrice: e.regularPrice ?? null,
    earlyBirdDeadline: e.earlyBirdDeadline ?? null,
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
  return sanityFetch<Philosophy[]>(
    groq`*[_type == "philosophy"] | order(order asc){ num, title, body }`,
  );
}

export interface Timeline {
  period: string;
  title: string;
  description: string;
}
export async function getTimeline(): Promise<Timeline[]> {
  return sanityFetch<Timeline[]>(
    groq`*[_type == "timeline"] | order(order asc){ period, title, description }`,
  );
}

export interface Affirmation {
  title: string;
  affirmations: string[];
}
export async function getAffirmations(): Promise<Affirmation[]> {
  return sanityFetch<Affirmation[]>(
    groq`*[_type == "affirmation"] | order(order asc){ title, affirmations }`,
  );
}

export interface Value {
  title: string;
  body: string;
}
export async function getValues(): Promise<Value[]> {
  return sanityFetch<Value[]>(
    groq`*[_type == "value"] | order(order asc){ title, body }`,
  );
}

export interface ServiceAudience {
  title: string;
  body: string;
}
export async function getServiceAudiences(): Promise<ServiceAudience[]> {
  return sanityFetch<ServiceAudience[]>(
    groq`*[_type == "serviceAudience"] | order(order asc){ title, body }`,
  );
}

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
}
export async function getProcessSteps(context: "services" | "booking"): Promise<ProcessStep[]> {
  return sanityFetch<ProcessStep[]>(
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
  return sanityFetch<SpeakingFormat[]>(
    groq`*[_type == "speakingFormat"] | order(order asc){ name, duration, description }`,
  );
}

export interface SpeakingAudience {
  label: string;
}
export async function getSpeakingAudiences(): Promise<SpeakingAudience[]> {
  return sanityFetch<SpeakingAudience[]>(
    groq`*[_type == "speakingAudience"] | order(order asc){ label }`,
  );
}

export interface Guarantee {
  title: string;
  body: string;
}
export async function getGuarantees(): Promise<Guarantee[]> {
  return sanityFetch<Guarantee[]>(
    groq`*[_type == "guarantee"] | order(order asc){ title, body }`,
  );
}

export interface Stat {
  value: string;
  label: string;
}
export async function getStats(): Promise<Stat[]> {
  return sanityFetch<Stat[]>(
    groq`*[_type == "stat"] | order(order asc){ value, label }`,
  );
}

export interface BookingReason {
  label: string;
}
export async function getBookingReasons(): Promise<BookingReason[]> {
  return sanityFetch<BookingReason[]>(
    groq`*[_type == "bookingReason"] | order(order asc){ label }`,
  );
}

export async function getFaqByCategory(category: string): Promise<Faq[]> {
  return sanityFetch<Faq[]>(
    groq`*[_type == "faq" && category == $category] | order(order asc){ question, answer }`,
    { category },
  );
}
