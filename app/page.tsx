import Link from "next/link";
import Image from "next/image";
import { BookingForm } from "@/components/BookingForm";
import { FadeIn } from "@/components/FadeIn";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ShimmerCTA } from "@/components/ShimmerCTA";
import { DecorImage } from "@/components/DecorImage";
import { CountUp } from "@/components/CountUp";
import { BrandOrbit } from "@/components/BrandOrbit";
import { credentials, faq, services, testimonials, topics, achievements } from "@/lib/content";

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


export default function HomePage() {
  // Services split for the asymmetric feature grid:
  // flagship anchors the layout; the remaining two stack as a duet.
  const flagship =
    services.find((s) => s.title === "Corporate Wellness Programs") ?? services[0];
  const duet = services.filter((s) => s !== flagship);

  // Bento gallery — five "moments" in a deliberate asymmetric composition.
  // The first tile anchors the grid (2×2 on desktop); the rest fill around it.
  const gallery = [
    {
      src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      label: "Keynotes & Sessions",
      span: "col-span-2 aspect-[16/11] lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:h-full",
    },
    {
      src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
      label: "Team Workshops",
      span: "aspect-square lg:col-span-2 lg:aspect-auto lg:h-full",
    },
    {
      src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
      label: "Wellbeing Practice",
      span: "aspect-square lg:col-span-2 lg:aspect-auto lg:h-full",
    },
    {
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80",
      label: "Leadership Sessions",
      span: "aspect-square lg:col-span-2 lg:aspect-auto lg:h-full",
    },
    {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
      label: "Executive Retreats",
      span: "aspect-square lg:col-span-2 lg:aspect-auto lg:h-full",
    },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#FBF9F6]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:gap-10 lg:px-12 lg:py-10 lg:min-h-[calc(100svh_-_80px)]">
          {/* LEFT — narrative */}
          <div className="relative z-10 lg:pr-6">
            {/* Pill tags */}
            <FadeIn direction="up">
              <div className="mb-6 flex flex-wrap gap-2.5">
                {["Corporate Wellness", "Keynote Speaker"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-sage/15 px-4 py-1.5 text-xs font-semibold text-forest"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c5a880]" aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>

            {/* Headline */}
            <FadeIn direction="up" delay={80}>
              <h1 className="font-serif text-[2.5rem] font-light leading-[1.05] tracking-tight text-[#142E2A] sm:text-5xl lg:text-[3.1rem]">
                Stronger leaders.
                <br />
                <span className="text-forest">Healthier organizations.</span>
              </h1>
            </FadeIn>

            {/* Paragraph */}
            <FadeIn direction="up" delay={160}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[#7A8481] lg:text-lg">
                Sonya Harris helps teams build resilience and sustainable wellbeing —
                drawn from 21+ years of service and federal leadership.
              </p>
            </FadeIn>

            {/* Buttons */}
            <FadeIn direction="up" delay={240}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <ShimmerCTA
                  href="/book-sonya"
                  className="inline-flex items-center rounded-full bg-forest px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-forest/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-light"
                >
                  Book Sonya
                </ShimmerCTA>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-forest/80 transition-colors hover:text-forest"
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

          {/* RIGHT — image panel with overlapping glass cards */}
          <FadeIn direction="up" delay={200}>
            <div className="relative">
              {/* Soft tinted backdrop slab */}
              <div aria-hidden="true" className="absolute -inset-3 -z-10 rounded-[2.75rem] bg-sage/20 sm:-inset-4" />

              <div className="relative aspect-[5/6] w-full overflow-hidden rounded-[2.25rem] shadow-[0_30px_60px_-20px_rgba(47,79,79,0.35)] lg:aspect-auto lg:h-[clamp(380px,calc(100svh_-_230px),480px)]">
                <Image
                  src="/sonya-harris.jpg"
                  alt="Sonya Harris — Corporate Wellness Consultant and Keynote Speaker"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[center_20%]"
                />
                {/* Legibility wash for the overlay cards */}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-forest/10" />

                {/* Stat card — top right */}
                <div className="absolute right-4 top-4 w-[190px] rounded-2xl border border-white/25 bg-white/15 p-4 backdrop-blur-md">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-serif text-3xl font-semibold leading-none text-white">21+</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-white/85">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </div>
                  <p className="mt-1.5 text-[0.8rem] leading-snug text-white/90">
                    Years of service &amp; leadership
                  </p>
                </div>

                {/* Glass pills — bottom */}
                <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
                  {["Build Resilience", "Sustainable Wellbeing"].map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md"
                    >
                      <span className="text-[#dcc7a0]" aria-hidden="true">&#10022;</span>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CREDIBILITY BAR ── */}
      <section id="impact" className="relative overflow-hidden scroll-mt-24 bg-gradient-to-br from-forest-dark via-forest to-forest-light">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-sage/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/4 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-4 py-20 lg:py-24">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {credentials.map(([value, label], i) => {
              // Numeric stats can run large; word-stats (e.g. "Thousands") need a
              // smaller scale so they never clip against the narrow card width.
              const isNumber = /\d/.test(value);
              return (
              <FadeIn key={label} direction="up" delay={i * 90} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-7 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/10 md:px-6">
                  {/* Accent line — extends on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-0 h-[2px] w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-sage to-transparent transition-all duration-500 group-hover:w-24"
                  />
                  <p
                    className={`bg-gradient-to-b from-white to-sage-light/70 bg-clip-text font-serif font-light leading-none tracking-tight text-transparent transition-transform duration-500 group-hover:-translate-y-0.5 ${
                      isNumber
                        ? "text-5xl sm:text-6xl lg:text-[3.75rem]"
                        : "text-[1.85rem] sm:text-4xl lg:text-[2.6rem]"
                    }`}
                  >
                    <CountUp value={value} />
                  </p>
                  <p className="mx-auto mt-4 max-w-[16ch] text-[0.7rem] font-medium uppercase leading-relaxed tracking-[0.16em] text-white/55 transition-colors duration-300 group-hover:text-white/80">
                    {label}
                  </p>
                </div>
              </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="relative overflow-hidden bg-beige py-20 lg:py-28">
        <BrandOrbit className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 text-forest/[0.06] lg:h-[26rem] lg:w-[26rem]" />
        <div className="relative mx-auto max-w-[1200px] px-4">
          <div className="grid items-center gap-16 lg:grid-cols-[4fr_6fr] lg:gap-24">
            {/* Image — 40%, taller 3:4 portrait with floating metric cards */}
            <FadeIn direction="left">
              <div className="group/photo relative w-full sm:mx-auto sm:max-w-[360px] lg:mx-0 lg:max-w-[400px]">
                <div className="relative aspect-square overflow-hidden rounded-[1.75rem] shadow-[0_30px_55px_-22px_rgba(47,79,79,0.45)]">
                  <Image
                    src="/sonya-harris.jpg"
                    alt="Sonya Harris"
                    fill
                    sizes="(max-width: 1024px) 340px, 400px"
                    className="object-cover object-[center_20%] transition-transform duration-[1200ms] ease-out group-hover/photo:scale-[1.04]"
                  />
                </div>

                {/* Floating metric card — top left */}
                <div className="animate-float-card absolute -left-4 top-8 sm:-left-7">
                  <div className="flex items-center gap-2.5 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-[0_20px_45px_-18px_rgba(47,79,79,0.55)] ring-1 ring-black/5 backdrop-blur-md transition-transform duration-300 hover:scale-[1.04]">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest/10 text-forest" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3l7 3v5c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6l7-3z" />
                      </svg>
                    </span>
                    <div className="text-left">
                      <p className="font-serif text-base font-bold leading-none text-forest">
                        <CountUp value="21+ Years" />
                      </p>
                      <p className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-muted">
                        U.S. Air Force
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating metric card — bottom right */}
                <div className="animate-float-card-slow absolute -right-4 bottom-10 sm:-right-7">
                  <div className="flex items-center gap-2.5 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-[0_20px_45px_-18px_rgba(47,79,79,0.55)] ring-1 ring-black/5 backdrop-blur-md transition-transform duration-300 hover:scale-[1.04]">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c5a880]/15 text-[#b9985f]" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 17l5-5 4 4 8-8" />
                        <path d="M17 8h4v4" />
                      </svg>
                    </span>
                    <div className="text-left">
                      <p className="font-serif text-base font-bold leading-none text-forest">
                        <CountUp value="100+" />
                      </p>
                      <p className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-muted">
                        Programs Delivered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Text — 60% */}
            <FadeIn direction="up" delay={120}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
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

              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4">
                {achievements.map(({ value, label }) => (
                  <div
                    key={label}
                    className="group border-t border-beige-dark pt-3 transition-colors hover:border-sage"
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
        </div>
      </section>

      {/* ── CORE PHILOSOPHY ── */}
      <section className="flex items-center bg-warm-white px-8 py-20 lg:h-screen lg:max-h-[850px] lg:px-16 lg:py-0">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8 xl:gap-12">
            {/* Column 1 — title anchor (label + title + summary, tightly bound) */}
            <FadeIn direction="up">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                Philosophy
              </p>
              <h2 className="font-serif text-3xl font-bold leading-[1.12] tracking-tight text-forest xl:text-[2.6rem]">
                The Principles Behind Every Transformation
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                Three commitments that shape every keynote, workshop, and program Sonya delivers.
              </p>
            </FadeIn>

            {/* Columns 2–4 — one principle per column, divided by thin vertical lines */}
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
                className="group transition-colors duration-500 lg:border-l lg:border-line/60 lg:pl-8 lg:hover:border-sage/60 xl:pl-12"
              >
                <span className="font-serif block text-6xl font-bold leading-none text-forest/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-sage/50 xl:text-7xl">
                  {num}
                </span>
                <h3 className="font-serif mt-4 text-2xl font-bold tracking-tight text-forest">
                  <span className="relative inline-block">
                    {title}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-sage transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="flex flex-col justify-center bg-beige py-16 xl:py-20 lg:h-screen lg:max-h-[850px]">
        <div className="mx-auto w-full max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-6 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sage">Services</p>
              <h2 className="font-serif text-3xl font-bold text-forest lg:text-4xl">How We Serve</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted lg:text-base">
                Tailored wellness solutions designed for individuals, teams, and organizations.
              </p>
            </div>
          </FadeIn>

          {/* Asymmetric feature grid — flagship (3) + stacked duet (2) */}
          <div className="grid grid-cols-1 gap-6 lg:h-[420px] lg:grid-cols-5 xl:h-[460px] xl:gap-8">
            {/* Card A — Flagship: Corporate Wellness Programs */}
            <FadeIn direction="up" className="lg:col-span-3 lg:h-full lg:min-h-0">
              <Link
                href="/services"
                className="group relative flex h-full min-h-[420px] overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-xl lg:min-h-0"
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

            {/* Cards B & C — Stacked duet: Workshops + Retreats */}
            <div className="grid gap-6 lg:col-span-2 lg:h-full lg:min-h-0 lg:grid-rows-2 lg:gap-4">
              {duet.map((service, i) => (
                <FadeIn key={service.title} direction="up" delay={(i + 1) * 120} className="lg:h-full lg:min-h-0">
                  <Link
                    href="/services"
                    className="group flex h-full min-h-0 items-center gap-4 overflow-hidden rounded-2xl border border-beige-dark bg-warm-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sage/50 hover:shadow-lg"
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
      <section className="flex items-center bg-warm-white px-4 py-20 lg:h-screen lg:max-h-[850px] lg:py-0">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            {/* Left — anchor: tag, headline, CTA */}
            <FadeIn direction="up" className="lg:col-span-4">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
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

            {/* Right — interactive typographic list */}
            <FadeIn direction="up" delay={120} className="lg:col-span-8">
              <div className="group/list flex flex-col">
                {topics.map((topic, i) => (
                  <Link
                    key={topic.title}
                    href="/speaking-events"
                    className="group/row flex items-baseline gap-5 border-b border-line/60 py-4 transition-opacity duration-300 first:border-t lg:gap-7 lg:py-[1.1rem] lg:group-hover/list:opacity-40 lg:hover:!opacity-100"
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
      <section className="bg-beige py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-4 lg:px-8">
          <FadeIn direction="up">
            <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                  Gallery
                </p>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-forest sm:text-4xl lg:text-[2.8rem]">
                  Moments in the Room
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                Keynotes, workshops, and retreats — wellness and leadership in action
                across organizations nationwide.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6 lg:auto-rows-[15rem] xl:auto-rows-[17rem]">
            {gallery.map(({ src, label, span }, i) => (
              <FadeIn
                key={src}
                direction="up"
                delay={i * 80}
                className={`group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 ${span}`}
              >
                <Image
                  src={src}
                  alt={label}
                  fill
                  sizes={i === 0 ? "(max-width: 1024px) 100vw, 440px" : "(max-width: 1024px) 50vw, 440px"}
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                {/* Legibility wash — subtle at rest, deepens on hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-forest-dark/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95"
                />
                {/* Caption — always shown on mobile, reveals on hover at lg */}
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-4 lg:p-5">
                  <span
                    aria-hidden="true"
                    className="h-px w-5 shrink-0 bg-sage transition-all duration-300 group-hover:w-8"
                  />
                  <span className="text-sm font-semibold text-white transition-all duration-300 lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    {label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="flex flex-col justify-center overflow-hidden bg-warm-white py-16 lg:h-screen lg:max-h-[750px]">
        <FadeIn direction="up">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#dfba86]">
              Testimonials
            </p>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-charcoal lg:text-5xl">
              Our Clients Review
            </h2>
          </div>
        </FadeIn>

        {/* Infinite right-to-left marquee */}
        <div className="relative">
          <div className="flex w-max gap-6 animate-marquee">
            {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <article
                key={i}
                className="relative mt-10 w-[350px] flex-shrink-0 rounded-2xl bg-[#f7f3eb] px-6 pb-6 pt-12 text-center"
              >
                <Image
                  src={t.image}
                  alt={t.name}
                  width={160}
                  height={160}
                  className="absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full border-4 border-white object-cover shadow-md"
                />
                <span className="font-serif absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#dfba86]/20 text-sm text-[#dfba86]">
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

      {/* ── BOOKING ── */}
      <section
        className="relative flex flex-col justify-center overflow-hidden border-t border-b border-neutral-200/50 bg-[#FBFBFA] py-24 lg:py-28"
        id="book"
      >
        <BrandOrbit reverse className="pointer-events-none absolute -left-32 -bottom-32 h-80 w-80 text-forest/[0.05] lg:h-[26rem] lg:w-[26rem]" />
        <div className="relative mx-auto w-full max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-10 text-center">
              {/* Eyebrow — flanked hairlines + wide tracking for a masthead feel */}
              <div className="mb-5 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-sage/40" aria-hidden="true" />
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-sage">
                  Booking
                </p>
                <span className="h-px w-8 bg-sage/40" aria-hidden="true" />
              </div>

              {/* Headline — two balanced lines; "Sonya" set as an italic gold anchor */}
              <h2 className="font-serif text-[2rem] font-bold leading-[1.1] tracking-[-0.015em] text-forest sm:text-[2.5rem] lg:text-[3.1rem]">
                <span className="block">
                  Bring <span className="font-medium italic text-[#c5a880]">Sonya</span> to
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
      <section className="relative overflow-hidden bg-beige py-24 lg:py-32">
        <div className="mx-auto max-w-[860px] px-4">
          <FadeIn direction="up">
            <div className="mb-12 text-center lg:mb-16">
              {/* Eyebrow — flanked hairlines + extra-wide tracking to anchor the stack */}
              <div className="mb-6 flex items-center justify-center gap-3.5">
                <span className="h-px w-10 bg-forest/25" aria-hidden="true" />
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.42em] text-sage">
                  FAQ
                </p>
                <span className="h-px w-10 bg-forest/25" aria-hidden="true" />
              </div>

              {/* Headline — two balanced lines; "Questions" set as an italic gold accent */}
              <h2 className="font-serif font-bold leading-[1.05] tracking-[-0.015em] text-forest">
                <span className="block text-[2rem] sm:text-4xl lg:text-[2.9rem]">
                  Frequently Asked
                </span>
                <span className="mt-0.5 block text-[2.4rem] font-medium italic text-[#c5a880] sm:text-5xl lg:text-[3.4rem]">
                  Questions
                </span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
            <div className="relative">
              {/* White card sits above the accent graphic */}
              <div className="relative z-10 rounded-2xl bg-white p-8 shadow-sm lg:p-10">
                <FaqAccordion items={faq} />
              </div>
              {/* Decorative accent — peeks from the card's top-left corner, behind it */}
              <DecorImage
                src="/faq-accent.png"
                className="absolute -top-16 -left-20 z-0 hidden h-48 w-48 -rotate-12 transform select-none opacity-40 mix-blend-multiply pointer-events-none md:block"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80"
            alt="Mountain sunrise — wellness and leadership"
            fill
            sizes="100vw"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55" />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-36 text-center lg:py-52">
          <FadeIn direction="up">
            <p className="text-xs tracking-[0.2em] text-white/75 font-semibold mb-4 uppercase">
              Transform Your Organization
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-normal text-white max-w-4xl mx-auto leading-tight">
              Wellness Is Not A Luxury. It&apos;s A Leadership Strategy.
            </h2>
            <ShimmerCTA
              href="/book-sonya"
              tone="dark"
              className="mt-10 inline-flex min-h-[56px] items-center justify-center rounded-full bg-white px-10 text-sm font-bold text-forest shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.98]"
            >
              Book Sonya Today
            </ShimmerCTA>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
