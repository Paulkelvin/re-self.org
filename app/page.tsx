import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ShimmerCTA } from "@/components/ShimmerCTA";
import { DecorImage } from "@/components/DecorImage";
import { Gallery } from "@/components/Gallery";
import {
  getFaq,
  getServices,
  getTestimonials,
  getTopics,
  getAchievements,
  getPackages,
  getEvents,
  getHeroImage,
  getHeroContent,
} from "@/lib/content";
import { getGalleryImages } from "@/lib/gallery";
import { PackageCard } from "@/components/PackageCard";
import { EventCheckoutButton } from "@/components/EventCheckoutButton";
import { CopyEventLink } from "@/components/CopyEventLink";
import { ScrollToHash } from "@/components/ScrollToHash";

export const revalidate = 3600;

const eyebrowCls =
  "mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.12] px-4 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-forest";

const eyebrowGold =
  "mb-3 inline-flex items-center gap-2 rounded-full bg-gold/[0.18] px-4 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-amber";

const eyebrowCharcoal =
  "mb-3 inline-flex items-center gap-2 rounded-full bg-charcoal/[0.12] px-4 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-charcoal";

const statIcons = [
  <svg key="cal" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
  <svg key="users" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
  <svg key="star" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  <svg key="award" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>,
];

function TargetIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <circle cx="15" cy="15" r="13" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="15" cy="15" r="7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="15" cy="15" r="2.5" fill="currentColor" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path
        d="M15 3L5 7v8c0 5.8 4.4 10.5 10 12 5.6-1.5 10-6.2 10-12V7L15 3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M10 15l3.5 3.5L20 11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path
        d="M15 4C8 4 5 10 5 17c0 4.5 2 7.5 7 8.5l3-3M15 4c7 0 10 6 10 13 0 4.5-2 7.5-7 8.5l-3-3M15 4v22"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export default async function HomePage() {
  const [services, topics, testimonials, achievements, faq, galleryImages, packages, events, heroImage, heroContent] =
    await Promise.all([
      getServices(),
      getTopics(),
      getTestimonials(),
      getAchievements(),
      getFaq(),
      getGalleryImages(),
      getPackages(),
      getEvents(),
      getHeroImage(),
      getHeroContent(),
    ]);

  const flagship =
    services.find((s) => s.title === "Corporate Wellness Programs") ?? services[0];
  const duet = services.filter((s) => s !== flagship);

  return (
    <>
      <ScrollToHash />
      {/* ── HERO ── */}
      <section className="relative isolate min-h-[calc(100svh_-_80px)] overflow-hidden">
        <Image
          src={heroImage}
          alt="Conference keynote stage — Re-Self Wellness"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[92%_30%] sm:object-[75%_center] lg:object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/50 lg:bg-gradient-to-r lg:from-black/55 lg:via-black/28 lg:to-black/5" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30 lg:from-black/10 lg:to-black/18" />

        <div className="relative z-10 flex min-h-[calc(100svh_-_80px)] items-center">
          <div className="mx-auto w-full max-w-[1400px] px-6 py-20 lg:px-12">
            <FadeIn direction="up">
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                {heroContent.eyebrow}
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={80}>
              <h1 className="max-w-3xl whitespace-pre-line font-serif text-[1.85rem] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl">
                {heroContent.headline}
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] sm:text-lg">
                {heroContent.subtext}
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <ShimmerCTA
                  href="/book-sonya"
                  tone="dark"
                  className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-forest shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Book Sonya
                </ShimmerCTA>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors hover:text-white"
                >
                  Explore Services
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="relative overflow-hidden bg-ambient-beige py-20 lg:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-sage/[0.08] blur-3xl" />
        {/* Glass orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute right-[8%] top-16 h-16 w-16 rounded-full bg-sage/20 backdrop-blur-sm lg:h-20 lg:w-20" />
        <div className="relative mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <p className={eyebrowGold}>
              About Sonya
            </p>
            <h2 className="font-serif text-[2rem] font-bold leading-[1.1] tracking-tight text-charcoal sm:text-[2.4rem] lg:text-[2.6rem]">
              Leadership Meets Wellness
            </h2>
            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted">
              Sonya Harris, M.Ed., is a retired USAF veteran, HR professional, and self-care
              advocate. Re-Self is a thoughtfully developed wellness curriculum that helps
              individuals and organizations rediscover their inner strength — with workshops
              delivered across the U.S. and internationally.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
              {achievements.map(({ value, label }, i) => (
                <div
                  key={label}
                  className="group flex items-start gap-3 pt-3"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest/[0.06] text-forest/60 transition-colors duration-300 group-hover:bg-forest/[0.10] group-hover:text-forest">
                    {statIcons[i % statIcons.length]}
                  </span>
                  <div>
                    <dt className="font-serif text-lg font-semibold text-forest">{value}</dt>
                    <dd className="mt-0.5 text-[0.68rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-muted transition-colors group-hover:text-forest">
                      {label}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber transition-all hover:gap-3 hover:text-amber-deep"
            >
              Read full story &rarr;
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="relative flex flex-col justify-center overflow-hidden bg-ambient-beige py-16 xl:py-20 lg:h-screen lg:max-h-[850px]">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 left-1/4 h-[300px] w-[300px] rounded-full bg-sage/[0.07] blur-3xl" />
        <div className="relative mx-auto w-full max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-6 text-center">
              <p className={`${eyebrowCls} justify-center`}>
                Services
              </p>
              <h2 className="font-serif text-3xl font-bold text-charcoal lg:text-4xl">How We Serve</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted lg:text-base">
                Workshops, retreats, virtual self-care sessions, and practical tools — perfect
                for community groups, family trips, women ministries, youth groups, and more.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-6 lg:h-[420px] lg:grid-cols-5 xl:h-[460px] xl:gap-8">
            <FadeIn direction="up" className="lg:col-span-3 lg:h-full lg:min-h-0">
              <Link
                href="/services"
                className="group relative flex h-full min-h-[420px] overflow-hidden rounded-2xl shadow-lg shadow-forest/[0.12] transition-shadow hover:shadow-2xl hover:shadow-forest/[0.18] lg:min-h-0"
              >
                <Image
                  src={flagship.image}
                  alt={flagship.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-7 left-7 right-7 z-10">
                  <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sage-light">
                    Flagship Program
                  </p>
                  <h3 className="font-serif text-2xl font-bold leading-tight text-white lg:text-[2rem]">
                    {flagship.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
                    {flagship.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Explore Program
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

            <div className="grid gap-6 lg:col-span-2 lg:h-full lg:min-h-0 lg:grid-rows-2 lg:gap-4">
              {duet.map((service, i) => (
                <FadeIn key={service.title} direction="up" delay={(i + 1) * 120} className="lg:h-full lg:min-h-0">
                  <Link
                    href="/services"
                    className="group flex h-full min-h-0 items-center gap-4 overflow-hidden rounded-2xl border border-beige-dark/60 bg-white p-3 shadow-md shadow-forest/[0.06] transition-all hover:-translate-y-1 hover:border-sage/50 hover:shadow-xl hover:shadow-forest/[0.10]"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 self-stretch overflow-hidden rounded-xl lg:h-auto lg:w-28">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-base font-semibold leading-snug text-charcoal">
                        {service.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted lg:text-sm">
                        {service.body}
                      </p>
                      <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                        Learn More
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
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SPEAKING TOPICS ── */}
      <section className="relative flex items-center overflow-hidden bg-white px-4 py-20 lg:h-screen lg:max-h-[850px] lg:py-0">
        {/* Dot grid texture */}
        <div aria-hidden="true" className="dot-grid pointer-events-none absolute right-0 top-0 h-[60%] w-[40%] opacity-60" />
        <div className="relative mx-auto w-full max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <FadeIn direction="up" className="lg:col-span-4">
              <p className={eyebrowCharcoal}>
                Speaking
              </p>
              <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-charcoal lg:text-[2.9rem]">
                Popular Speaking Topics
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                Keynotes and sessions shaped around the realities of high-performing,
                high-pressure teams.
              </p>
              <Link
                href="/speaking-events#signature-topics"
                className="group mt-8 inline-flex items-center gap-2 rounded-full border border-amber/40 px-6 py-3 text-sm font-semibold text-amber transition-all duration-200 hover:border-amber hover:bg-amber hover:text-white"
              >
                View All Speaking Topics
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </Link>
            </FadeIn>

            <FadeIn direction="up" delay={120} className="lg:col-span-8">
              <div className="group/list flex flex-col">
                {topics.map((topic, i) => (
                  <Link
                    key={topic.title}
                    href="/speaking-events#signature-topics"
                    className="group/row divider-gradient flex items-baseline gap-5 py-5 transition-opacity duration-300 lg:gap-7 lg:py-[1.2rem] lg:group-hover/list:opacity-40 lg:hover:!opacity-100"
                  >
                    <span className="font-serif text-base font-semibold text-sage tabular-nums lg:text-lg">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-serif text-lg font-bold leading-snug tracking-tight text-charcoal transition-colors duration-200 group-hover/row:text-forest lg:text-xl">
                          {topic.title}
                        </h3>
                        <svg
                          width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                          className="shrink-0 -translate-x-2 text-forest opacity-0 transition-all duration-300 group-hover/row:translate-x-0 group-hover/row:opacity-100"
                        >
                          <path d="M2 7h10M8 3l4 4-4 4" />
                        </svg>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted transition-all duration-300 lg:line-clamp-1 lg:group-hover/row:line-clamp-none">
                        {topic.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <Gallery images={galleryImages} />

      {/* ── TESTIMONIALS ── */}
      <section className="relative flex flex-col justify-center overflow-hidden bg-ambient-warm py-16 lg:h-screen lg:max-h-[750px]">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 h-[350px] w-[350px] rounded-full bg-gold/[0.06] blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-sage/[0.06] blur-3xl" />
        {/* Botanical leaf */}
        <svg aria-hidden="true" className="pointer-events-none absolute left-6 top-10 h-24 w-24 -rotate-12 text-sage/[0.12] lg:left-12 lg:top-14 lg:h-32 lg:w-32" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1"><path d="M50 95 C50 95 20 70 15 40 C10 10 45 5 50 5 C55 5 90 10 85 40 C80 70 50 95 50 95Z" /><path d="M50 95 C50 95 50 5 50 5" /><path d="M50 30 C50 30 35 25 25 35" /><path d="M50 50 C50 50 65 42 75 48" /><path d="M50 70 C50 70 35 62 28 68" /></svg>
        <FadeIn direction="up">
          <div className="mb-16 text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/[0.18] px-4 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber justify-center">
              Testimonials
            </p>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-charcoal lg:text-5xl">
              Our Clients Review
            </h2>
          </div>
        </FadeIn>

        <div className="relative">
          <div className="flex w-max gap-6 animate-marquee">
            {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <article
                key={i}
                className="relative w-[350px] flex-shrink-0 rounded-2xl bg-white/60 backdrop-blur-md px-6 pb-6 pt-8 text-center shadow-[0_8px_32px_rgba(47,79,79,0.08)] ring-1 ring-white/70"
              >
                <span className="font-serif absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-amber-light/25 shadow-sm text-sm text-amber-light">
                  &ldquo;
                </span>
                <h3 className="text-lg font-semibold text-neutral-800">{t.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-neutral-500">
                  {t.role}
                </p>
                <p className="mt-4 line-clamp-3 px-2 text-sm text-neutral-600">{t.quote}</p>
                <div className="mt-4 flex justify-center gap-1 text-amber-light">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="15" height="15" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                      <path d="M7 1l1.545 4.755H14l-4.045 2.94 1.545 4.755L7 10.51l-4.5 2.94 1.545-4.755L0 5.755h5.455z" />
                    </svg>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS ── */}
      {(() => {
        const now = new Date();
        const upcoming = events.filter((e) => new Date(e.date) >= now);
        if (upcoming.length === 0) return null;

        const tz = "America/New_York";
        const fmtDate = (s: string) =>
          new Date(s).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: tz });
        const fmtTime = (s: string) =>
          new Date(s).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: tz });

        return (
          <section className="relative overflow-hidden bg-ambient-beige py-20 lg:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-sage/[0.06] blur-3xl" />
            <div className="relative mx-auto max-w-[1200px] px-4">

              <FadeIn direction="up">
                <div className="mb-10">
                  <p className={eyebrowGold}>Upcoming Events</p>
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-charcoal lg:text-4xl">
                    Catch Sonya live.
                  </h2>
                  <div aria-hidden="true" className="mt-4 h-[3px] w-12 rounded-full bg-gold" />
                </div>
              </FadeIn>

              <div className="space-y-8">
                {upcoming.slice(0, 3).map((event, i) => (
                  <FadeIn key={event.slug} direction="up" delay={i * 80}>
                    <div
                      id={event.slug}
                      className="group grid scroll-mt-28 grid-cols-1 overflow-hidden rounded-3xl border border-line/70 bg-white shadow-lg shadow-forest/[0.06] ring-1 ring-forest/[0.03] transition-shadow duration-300 hover:shadow-xl lg:grid-cols-2">
                      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[320px]">
                        <Image
                          src={event.coverImage}
                          alt={event.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-5 top-5 rounded-full bg-forest px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                          {event.eventType}
                        </span>
                      </div>

                      <div className="flex flex-col justify-center p-8 lg:p-12">
                        <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted/70">
                          <time dateTime={event.date}>
                            {fmtDate(event.date)} at {fmtTime(event.date)} EST
                          </time>
                          {event.location && (
                            <>
                              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
                              <span>{event.location}</span>
                            </>
                          )}
                          {event.isVirtual && (
                            <>
                              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
                              <span>Virtual</span>
                            </>
                          )}
                        </div>

                        <h3 className="font-serif text-2xl font-bold leading-tight tracking-tight text-charcoal lg:text-[2rem]">
                          {event.title}
                        </h3>
                        <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
                          {event.description}
                        </p>

                        {event.speakers.length > 0 && (
                          <div className="mt-6">
                            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted/50">
                              Speakers
                            </p>
                            <div className="flex flex-wrap gap-3">
                              {event.speakers.map((speaker) => (
                                <div key={speaker.name} className="flex items-center gap-2">
                                  <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-sm">
                                    {speaker.image ? (
                                      <Image src={speaker.image} alt={speaker.name} fill sizes="36px" className="object-cover" />
                                    ) : (
                                      <div className="flex h-full w-full items-center justify-center bg-sage/30 text-[10px] font-bold text-forest">
                                        {speaker.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-charcoal">{speaker.name}</p>
                                    {speaker.role && (
                                      <p className="text-[10px] text-muted/60">{speaker.role}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {event.earlyBirdPrice && event.regularPrice && event.earlyBirdDeadline && (() => {
                          const deadline = new Date(event.earlyBirdDeadline + "T23:59:59");
                          const isEarlyBird = now <= deadline;
                          const fmtPrice = (c: number) => `$${(c / 100).toFixed(0)}`;
                          const deadlineStr = deadline.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
                          return (
                            <div className="mt-6 rounded-xl border border-line bg-[#f7fafa] p-5">
                              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted/50">Investment</p>
                              <div className="flex items-baseline gap-2">
                                <span className={`font-serif text-2xl font-bold ${isEarlyBird ? "text-forest" : "text-charcoal"}`}>
                                  {isEarlyBird ? fmtPrice(event.earlyBirdPrice) : fmtPrice(event.regularPrice)}
                                </span>
                                {isEarlyBird && (
                                  <span className="text-xs font-semibold text-forest/70">Early Bird</span>
                                )}
                              </div>
                              {isEarlyBird ? (
                                <p className="mt-1 text-xs text-muted">
                                  {fmtPrice(event.regularPrice)} after {deadlineStr}
                                </p>
                              ) : (
                                <p className="mt-1 text-xs text-muted">
                                  <span className="line-through">{fmtPrice(event.earlyBirdPrice)}</span>
                                  {" "}early bird has ended
                                </p>
                              )}
                            </div>
                          );
                        })()}

                        <div className="mt-7 flex flex-wrap items-center gap-3">
                          {event.registrationUrl ? (
                            <a
                              href={event.registrationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                            >
                              Register Now
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                            </a>
                          ) : (
                            <EventCheckoutButton event={event} variant="large" />
                          )}
                          <CopyEventLink slug={event.slug} path="/" />
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <FadeIn direction="up" delay={160}>
                <div className="mt-8 text-center">
                  <Link
                    href="/speaking-events"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-amber transition-all hover:gap-3 hover:text-amber-deep"
                  >
                    View all events &rarr;
                  </Link>
                </div>
              </FadeIn>
            </div>
          </section>
        );
      })()}

      {/* ── PROGRAMS ── */}
      {packages.length > 0 && (
        <section className="relative overflow-hidden bg-ambient-warm py-20 lg:py-28">
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-sage/[0.06] blur-3xl" />
          <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
            <FadeIn direction="up">
              <div className="mb-16 text-center">
                <p className={`${eyebrowCls} justify-center`}>
                  Programs
                </p>
                <h2 className="font-serif text-3xl font-bold text-charcoal lg:text-5xl">
                  Invest in your team&apos;s wellbeing.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
                  Choose the engagement level that fits your goals — from a
                  complimentary introduction to deep, ongoing coaching.
                </p>
              </div>
            </FadeIn>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 pt-2 sm:grid-cols-2">
              {packages.map((pkg, i) => (
                <FadeIn key={pkg.title} direction="up" delay={i * 100}>
                  <PackageCard pkg={pkg} index={i} compact />
                </FadeIn>
              ))}
            </div>

            <FadeIn direction="up" delay={400}>
              <div className="mx-auto mt-10 max-w-2xl text-center">
                <Link
                  href="/packages"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-amber transition-all hover:gap-3 hover:text-amber-deep"
                >
                  View all programs &amp; details &rarr;
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}



      {/* ── FAQ ── */}
      <section className="relative overflow-hidden bg-ambient-beige pb-24 pt-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-12 h-[350px] w-[350px] rounded-full bg-sage/[0.07] blur-3xl" />
        {/* Decorative illustration — peeks in from left beside the heading on mobile */}
        <Image
          src="/images/faq-illustration.png"
          alt=""
          width={400}
          height={400}
          className="pointer-events-none absolute -left-28 top-28 z-0 w-[55%] max-w-[280px] object-contain opacity-50 lg:hidden"
        />
        <div className="relative z-10 mx-auto max-w-[860px] px-4">
          <FadeIn direction="up">
            <div className="mb-12 text-center lg:mb-16">
              <div className="mb-6 flex items-center justify-center">
                <p className={`${eyebrowCharcoal} mb-0`}>
                  FAQ
                </p>
              </div>

              <h2 className="font-serif text-[2rem] font-bold leading-[1.05] tracking-[-0.015em] text-charcoal sm:text-4xl lg:text-[2.9rem]">
                Frequently Asked Questions
              </h2>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
            <div className="relative">
              <div className="relative z-10 rounded-2xl bg-white/70 backdrop-blur-md p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] ring-1 ring-white/60 lg:p-10">
                <FaqAccordion items={faq} />
              </div>
              <DecorImage
                src="/faq-accent.png"
                className="absolute -top-16 -left-20 z-0 hidden h-48 w-48 -rotate-12 transform select-none opacity-40 mix-blend-multiply pointer-events-none md:block"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
