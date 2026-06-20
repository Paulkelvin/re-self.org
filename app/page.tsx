import Link from "next/link";
import Image from "next/image";
import { BookingForm } from "@/components/BookingForm";
import { FadeIn } from "@/components/FadeIn";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ShimmerCTA } from "@/components/ShimmerCTA";
import { DecorImage } from "@/components/DecorImage";
import { BrandOrbit } from "@/components/BrandOrbit";
import { Gallery } from "@/components/Gallery";
import {
  getFaq,
  getServices,
  getTestimonials,
  getTopics,
  getAchievements,
  getPackages,
} from "@/lib/content";
import { getGalleryImages } from "@/lib/gallery";
import { PackageCard } from "@/components/PackageCard";

export const revalidate = 60;

const eyebrowCls =
  "mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-forest/60";

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
  const [services, topics, testimonials, achievements, faq, galleryImages, packages] =
    await Promise.all([
      getServices(),
      getTopics(),
      getTestimonials(),
      getAchievements(),
      getFaq(),
      getGalleryImages(),
      getPackages(),
    ]);

  const flagship =
    services.find((s) => s.title === "Corporate Wellness Programs") ?? services[0];
  const duet = services.filter((s) => s !== flagship);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative isolate min-h-[calc(100svh_-_80px)] overflow-hidden">
        <Image
          src="/sonya-harris.jpg"
          alt="Sonya Harris — Corporate Wellness Consultant and Keynote Speaker"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />

        <div className="relative z-10 flex min-h-[calc(100svh_-_80px)] items-center">
          <div className="mx-auto w-full max-w-[1400px] px-6 py-20 lg:px-12">
            <FadeIn direction="up">
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                Corporate Wellness &middot; Keynote Speaker
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={80}>
              <h1 className="max-w-3xl font-serif text-[1.85rem] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
                Stronger leaders.
                <br />
                <span className="text-white">Healthier organizations.</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] sm:text-lg">
                Sonya Harris helps teams build resilience and sustainable wellbeing —
                drawn from 21+ years of service and federal leadership.
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
        <BrandOrbit className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 text-forest/[0.10] lg:h-[26rem] lg:w-[26rem]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-sage/[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <p className={eyebrowCls}>
              About Sonya
            </p>
            <h2 className="font-serif text-[2rem] font-bold leading-[1.1] tracking-tight text-forest sm:text-[2.4rem] lg:text-[2.6rem]">
              Leadership Meets Wellness
            </h2>
            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted">
              Sonya Harris blends military discipline and federal leadership with deep
              wellness expertise to help executive teams navigate high-stakes environments
              where resilience is mission-critical.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
              {achievements.map(({ value, label }) => (
                <div
                  key={label}
                  className="group pt-3"
                >
                  <dt className="font-serif text-lg font-semibold text-forest">{value}</dt>
                  <dd className="mt-1 text-[0.68rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-muted transition-colors group-hover:text-forest">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest transition-all hover:gap-3"
            >
              Read full story &rarr;
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── CORE PHILOSOPHY ── */}
      <section className="relative flex items-center overflow-hidden bg-[#1e3d38] px-8 py-20 lg:h-screen lg:max-h-[850px] lg:px-16 lg:py-0">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-sage/[0.08] blur-3xl" />
        <div className="relative mx-auto w-full max-w-[1320px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8 xl:gap-12">
            <FadeIn direction="up">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-sage/[0.12] px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-sage">
                Philosophy
              </p>
              <h2 className="font-serif text-3xl font-bold leading-[1.12] tracking-tight text-white xl:text-[2.6rem]">
                The Principles Behind Every Transformation
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
                Three commitments that shape every keynote, workshop, and program Sonya delivers.
              </p>
            </FadeIn>

            {[
              {
                num: "01",
                title: "Discipline",
                body: "Consistent habits from military precision — building personal and professional practices that hold under pressure.",
              },
              {
                num: "02",
                title: "Resilience",
                body: "The mental and emotional strength to thrive through challenges, transitions, and high-stakes demands.",
              },
              {
                num: "03",
                title: "Renewal",
                body: "Sustainable wellness rhythms that support lasting success without sacrificing health or humanity.",
              },
            ].map(({ num, title, body }, i) => (
              <FadeIn
                key={title}
                direction="up"
                delay={(i + 1) * 100}
                className="group relative transition-all duration-500 rounded-r-xl lg:border-l lg:border-white/10 lg:pl-8 lg:hover:border-sage/30 lg:hover:bg-white/[0.04] xl:pl-12"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-4 right-2 select-none font-serif text-[8rem] font-bold leading-none text-white/[0.05] lg:text-[10rem]"
                >
                  {num}
                </span>
                <h3 className="font-serif relative mt-2 text-2xl font-bold tracking-tight text-white">
                  <span className="relative inline-block">
                    {title}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-sage transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </span>
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/55">{body}</p>
              </FadeIn>
            ))}
          </div>
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
              <h2 className="font-serif text-3xl font-bold text-forest lg:text-4xl">How We Serve</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted lg:text-base">
                Tailored wellness solutions designed for individuals, teams, and organizations.
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
                <div className="absolute inset-0 bg-forest/45 bg-blend-overlay transition-colors group-hover:bg-forest/55" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-forest-dark/15 to-transparent" />
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
                      <h3 className="font-serif text-base font-semibold leading-snug text-forest">
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
        <div className="relative mx-auto w-full max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <FadeIn direction="up" className="lg:col-span-4">
              <p className={eyebrowCls}>
                Speaking
              </p>
              <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-forest lg:text-[2.9rem]">
                Popular Speaking Topics
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                Keynotes and sessions shaped around the realities of high-performing,
                high-pressure teams.
              </p>
              <Link
                href="/speaking-events"
                className="group mt-8 inline-flex items-center gap-2 rounded-full border border-forest/30 px-6 py-3 text-sm font-semibold text-forest transition-all duration-200 hover:border-forest hover:bg-forest hover:text-white"
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
                    href="/speaking-events"
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
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 h-[350px] w-[350px] rounded-full bg-[#dfba86]/[0.06] blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-sage/[0.06] blur-3xl" />
        <FadeIn direction="up">
          <div className="mb-16 text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#dfba86]/[0.12] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#dfba86] justify-center">
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
                className="relative mt-10 w-[350px] flex-shrink-0 rounded-2xl bg-white/60 backdrop-blur-md px-6 pb-6 pt-12 text-center shadow-[0_8px_32px_rgba(47,79,79,0.08)] ring-1 ring-white/70"
              >
                <Image
                  src={t.image}
                  alt={t.name}
                  width={160}
                  height={160}
                  className="absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full border-4 border-white object-cover shadow-lg shadow-forest/[0.08]"
                />
                <span className="font-serif absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#dfba86]/25 shadow-sm shadow-[#dfba86]/15 text-sm text-[#dfba86]">
                  &ldquo;
                </span>
                <h3 className="text-lg font-semibold text-neutral-800">{t.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-neutral-500">
                  {t.role}
                </p>
                <p className="mt-4 line-clamp-3 px-2 text-sm text-neutral-600">{t.quote}</p>
                <div className="mt-4 flex justify-center gap-1 text-[#dfba86]">
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
                <h2 className="font-serif text-3xl font-bold text-forest lg:text-5xl">
                  Invest in your team&apos;s wellbeing.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
                  Choose the engagement level that fits your goals — from a
                  complimentary introduction to deep, ongoing coaching.
                </p>
              </div>
            </FadeIn>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pt-2 sm:grid-cols-2 lg:grid-cols-4">
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
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-forest transition-all hover:gap-3"
                >
                  View all programs &amp; details &rarr;
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── BOOKING ── */}
      <section
        className="relative flex flex-col justify-center overflow-hidden border-t border-b border-neutral-200/50 bg-ambient-booking py-24 lg:py-28"
        id="book"
      >
        <BrandOrbit reverse className="pointer-events-none absolute -left-32 -bottom-32 h-80 w-80 text-forest/[0.09] lg:h-[26rem] lg:w-[26rem]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-0 h-[350px] w-[350px] rounded-full bg-sage/[0.06] blur-3xl" />
        <div className="relative mx-auto w-full max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-10 text-center">
              <div className="mb-5 flex items-center justify-center">
                <p className={`${eyebrowCls} mb-0`}>
                  Booking
                </p>
              </div>

              <h2 className="font-serif text-[2rem] font-bold leading-[1.1] tracking-[-0.015em] text-forest sm:text-[2.5rem] lg:text-[3.1rem]">
                <span className="block">
                  Bring Sonya to
                </span>
                <span className="block">Your Organization</span>
              </h2>

              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed tracking-wide text-muted lg:text-base">
                Book a keynote, workshop, retreat, or corporate wellness experience.
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
            <div className="mx-auto max-w-[820px]">
              <BookingForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative overflow-hidden bg-ambient-beige py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-12 h-[350px] w-[350px] rounded-full bg-sage/[0.07] blur-3xl" />
        <div className="relative mx-auto max-w-[860px] px-4">
          <FadeIn direction="up">
            <div className="mb-12 text-center lg:mb-16">
              <div className="mb-6 flex items-center justify-center">
                <p className={`${eyebrowCls} mb-0`}>
                  FAQ
                </p>
              </div>

              <h2 className="font-serif text-[2rem] font-bold leading-[1.05] tracking-[-0.015em] text-forest sm:text-4xl lg:text-[2.9rem]">
                Frequently Asked Questions
              </h2>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
            <div className="relative">
              <div className="relative z-10 rounded-2xl bg-white p-8 shadow-lg shadow-forest/[0.06] ring-1 ring-forest/[0.03] lg:p-10">
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
