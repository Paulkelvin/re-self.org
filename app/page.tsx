import Link from "next/link";
import Image from "next/image";
import { BookingForm } from "@/components/BookingForm";
import { FadeIn } from "@/components/FadeIn";
import { FaqAccordion } from "@/components/FaqAccordion";
import { TestimonialSlider } from "@/components/TestimonialSlider";
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

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-warm-white lg:flex lg:h-[calc(100vh-76px)] lg:items-center">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-48 -top-40 h-[600px] w-[600px] rounded-full bg-sage/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-[440px] w-[440px] rounded-full bg-beige blur-3xl" />
        </div>

        <div className="relative w-full mx-auto max-w-[1200px] px-4 py-16 lg:py-0">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <FadeIn direction="up">
                <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted/70">
                  Wellness Leader &bull; Speaker &bull; Corporate Wellness Consultant
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={80}>
                <h1 className="font-serif text-4xl font-bold leading-[1.07] tracking-tight text-charcoal sm:text-5xl lg:text-[3.1rem]">
                  Self-Care From Within. Stronger Leaders.{" "}
                  <span className="text-forest">Healthier Organizations.</span>
                </h1>
              </FadeIn>
              <FadeIn direction="up" delay={160}>
                <p className="mt-5 max-w-[490px] text-base leading-relaxed text-muted">
                  Sonya Harris empowers individuals and organizations through transformative
                  workshops, leadership development, and wellness programs rooted in decades
                  of service, resilience, and authentic care.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={240}>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-sonya"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-xl bg-forest px-7 text-sm font-semibold text-white shadow-lg shadow-forest/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-light hover:shadow-xl hover:shadow-forest/30"
                  >
                    Book Sonya
                  </Link>
                  <Link
                    href="/services"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-muted transition-all duration-200 hover:text-forest"
                  >
                    Explore Services
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <path d="M2 7h10M8 3l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
                <div className="mt-5 inline-flex items-center gap-2.5">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-forest">21+ Years</span>
                  <span className="h-3 w-px bg-line" aria-hidden="true" />
                  <span className="text-[0.65rem] font-medium uppercase tracking-wider text-muted/70">Service · Leadership · Impact</span>
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="up" delay={200}>
              <div className="relative mx-auto max-w-[360px] lg:max-w-none">
                <div className="absolute -right-3 -top-3 bottom-3 left-3 rounded-2xl border-2 border-sage/25" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-forest/15 h-[clamp(280px,44vh,440px)]">
                  <Image
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=880&q=85"
                    alt="Sonya Harris — Corporate Wellness Consultant and Keynote Speaker"
                    fill
                    priority
                    sizes="(max-width: 640px) 360px, (max-width: 1200px) 50vw, 560px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY BAR ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-dark via-forest to-forest-light">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-sage/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/4 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-4 py-20 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {credentials.map(([value, label], i) => (
              <FadeIn key={label} direction="up" delay={i * 90}>
                <div className="relative px-4 py-6 text-center md:px-8">
                  {i >= 1 && (
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute left-0 top-1/2 h-20 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent ${
                        i % 2 !== 0 ? "block" : "hidden md:block"
                      }`}
                    />
                  )}
                  <p className="bg-gradient-to-b from-white to-sage-light/70 bg-clip-text font-serif text-5xl font-light leading-none tracking-tight text-transparent sm:text-6xl lg:text-[4.25rem]">
                    {value}
                  </p>
                  <p className="mx-auto mt-4 max-w-[15ch] text-[0.7rem] font-medium uppercase leading-relaxed tracking-[0.16em] text-white/55">
                    {label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="bg-beige py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid items-center gap-16 lg:grid-cols-[4fr_6fr] lg:gap-24">
            {/* Image — 40%, taller 3:4 portrait */}
            <FadeIn direction="left">
              <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:mx-0 lg:max-w-[400px]">
                <div
                  className="absolute -bottom-4 -left-4 h-full w-full rounded-[1.75rem] border border-sage/40 bg-sage/15"
                  aria-hidden="true"
                />
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] shadow-[0_30px_55px_-22px_rgba(47,79,79,0.45)]">
                  <Image
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=90"
                    alt="Sonya Harris"
                    fill
                    sizes="(max-width: 1024px) 340px, 400px"
                    className="object-cover object-[center_20%]"
                  />
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
                className="group lg:border-l lg:border-line/60 lg:pl-8 xl:pl-12"
              >
                <span className="font-serif block text-6xl font-bold leading-none text-forest/15 transition-colors duration-300 group-hover:text-sage/50 xl:text-7xl">
                  {num}
                </span>
                <h3 className="font-serif mt-4 text-2xl font-bold tracking-tight text-forest">
                  {title}
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

      {/* ── TESTIMONIALS ── */}
      <section className="flex flex-col justify-center bg-forest py-16 lg:h-screen lg:max-h-[750px] lg:overflow-hidden">
        <div className="mx-auto w-full max-w-[1200px] px-4">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-20">
            <FadeIn direction="up">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">Testimonials</p>
              <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-white lg:text-5xl">
                What happens when the room shifts.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70">
                Real results from organizations that invested in their people through
                Sonya&apos;s programs.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={120}>
              <TestimonialSlider testimonials={testimonials} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section className="bg-warm-white py-24 lg:py-32" id="book">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">Booking</p>
              <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">
                Bring Sonya to Your Organization
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted">
                Book a keynote, workshop, retreat, or corporate wellness experience.
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
            <div className="mx-auto max-w-[800px]">
              <BookingForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-beige py-24 lg:py-32">
        <div className="mx-auto max-w-[860px] px-4">
          <FadeIn direction="up">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">FAQ</p>
              <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">
                Frequently Asked Questions
              </h2>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
            <div className="rounded-2xl bg-white p-8 shadow-sm lg:p-10">
              <FaqAccordion items={faq} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80"
          alt="Mountain sunrise — wellness and leadership"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-forest/82" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-36 text-center lg:py-52">
          <FadeIn direction="up">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sage">
              Transform Your Organization
            </p>
            <h2 className="font-serif mx-auto max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-[3.2rem] lg:leading-[1.1]">
              Wellness Is Not A Luxury.{" "}
              <span className="italic text-sage">It&apos;s A Leadership Strategy.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              Let&apos;s create healthier individuals, stronger teams, and thriving organizations.
            </p>
            <Link
              href="/book-sonya"
              className="mt-10 inline-flex min-h-[56px] items-center justify-center rounded-lg bg-white px-10 text-sm font-bold text-forest shadow-xl transition-all hover:-translate-y-px hover:shadow-2xl"
            >
              Book Sonya Today
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
