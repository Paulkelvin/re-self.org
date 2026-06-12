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

const topicIcons = [
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2c0 6-4 9-4 14a4 4 0 008 0c0-5-4-8-4-14z" /><path d="M12 2c-3 5-1 8 2 11" /></svg>,
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 20l6-11 4 7 3-5 5 9" /></svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0118 7a7 7 0 010 14H4l7-1z" /><path d="M3 21l5-5" /></svg>,
  <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>,
  <svg key="5" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>,
];

export default function HomePage() {
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
            <FadeIn direction="up">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sage">
                Wellness Leader &bull; Speaker &bull; Corporate Wellness Consultant
              </p>
              <h1 className="font-serif text-4xl font-bold leading-[1.07] tracking-tight text-forest sm:text-5xl lg:text-[3.1rem]">
                Self-Care From Within.{" "}
                <span className="italic text-sage">Stronger Leaders.</span>{" "}
                Healthier Organizations.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
                Sonya Harris empowers individuals and organizations through transformative
                workshops, leadership development, and wellness programs rooted in decades
                of service, resilience, and authentic care.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/book-sonya"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-lg bg-forest px-7 text-sm font-semibold text-white shadow-lg shadow-forest/20 transition-all hover:-translate-y-px hover:bg-forest-light hover:shadow-xl hover:shadow-forest/25"
                >
                  Book Sonya
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-lg border border-charcoal/20 px-7 text-sm font-semibold text-charcoal transition-all hover:border-forest hover:text-forest"
                >
                  Explore Services &rarr;
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={160}>
              <div className="relative mx-auto max-w-[360px] lg:max-w-none">
                <div className="absolute -right-3 -top-3 bottom-3 left-3 rounded-2xl border-2 border-sage/25" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-forest/15 h-[clamp(280px,44vh,440px)]">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=880&q=85"
                    alt="Sonya Harris — Corporate Wellness Consultant and Keynote Speaker"
                    fill
                    priority
                    sizes="(max-width: 640px) 360px, (max-width: 1200px) 50vw, 560px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/25 to-transparent" />
                </div>
                <div className="absolute -bottom-4 -left-4 rounded-xl bg-white px-4 py-3 shadow-xl">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-wider text-sage">21+ Years</p>
                  <p className="text-sm font-bold text-charcoal">Service. Leadership. Impact.</p>
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
        <div className="relative mx-auto max-w-[1200px] px-4 py-14 lg:py-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 2L3 5v6c0 4 3 7 7 8 4-1 7-4 7-8V5L10 2z"/><path d="M7 10l2.5 2.5L13 8"/></svg>,
                value: credentials[0][0],
                label: credentials[0][1],
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 17h16M4 17V9M16 17V9M8 17v-4h4v4M4 9H2l8-6 8 6h-2M8 9h4"/></svg>,
                value: credentials[1][0],
                label: credentials[1][1],
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="16" height="11" rx="1"/><path d="M7 17l3-3 3 3M10 14v3"/></svg>,
                value: credentials[2][0],
                label: credentials[2][1],
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="8" cy="7" r="3"/><path d="M2 17c0-3 2.7-5 6-5s6 2 6 5"/><circle cx="14" cy="6" r="2"/><path d="M14 11c2 .5 4 2 4 4" strokeLinecap="round"/></svg>,
                value: credentials[3][0],
                label: credentials[3][1],
              },
            ].map(({ icon, value, label }, i) => (
              <FadeIn key={label} direction="up" delay={i * 80}>
                <div className="group flex flex-col gap-4 rounded-xl border border-white/10 bg-white/8 p-6 transition-colors hover:border-white/20 hover:bg-white/12">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage/20 text-sage">
                    {icon}
                  </div>
                  <div>
                    <p className="font-serif text-4xl font-bold text-white lg:text-5xl">{value}</p>
                    <p className="mt-1.5 text-sm leading-snug text-white/50">{label}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="bg-beige py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn direction="left">
              <div className="relative">
                <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl bg-sage/20" aria-hidden="true" />
                <div className="relative h-[340px] overflow-hidden rounded-2xl sm:h-[380px] lg:h-[420px]">
                  <Image
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85"
                    alt="Sonya Harris"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={120}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sage">About Sonya</p>
              <h2 className="font-serif text-3xl font-bold leading-tight text-forest lg:text-[2.3rem]">
                Leadership Meets Wellness
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Sonya Harris brings military discipline, federal leadership experience, and
                deep wellness expertise to every engagement. With 21 years of U.S. Air
                Force service and a decade of federal government leadership, she has navigated
                high-stakes environments where resilience and wellbeing are mission-critical.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-2.5">
                {achievements.map(({ value, label }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-beige-dark bg-white px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sage/50 hover:shadow-md"
                  >
                    <p className="font-serif text-lg font-bold text-forest">{value}</p>
                    <p className="mt-0.5 text-[0.7rem] font-medium text-muted">{label}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest transition-all hover:gap-3"
              >
                Read full story &rarr;
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CORE PHILOSOPHY ── */}
      <section className="bg-warm-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="mb-2 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <FadeIn direction="up">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sage">Philosophy</p>
              <h2 className="font-serif max-w-xl text-4xl font-bold text-forest lg:text-5xl">
                The Principles Behind Every Transformation
              </h2>
            </FadeIn>
            <FadeIn direction="up" delay={100}>
              <p className="max-w-xs text-sm leading-relaxed text-muted lg:text-right">
                Three commitments that shape every keynote, workshop, and program Sonya delivers.
              </p>
            </FadeIn>
          </div>

          <div className="mt-12 divide-y divide-line">
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
              <FadeIn key={title} direction="up" delay={i * 80}>
                <div className="group grid cursor-default grid-cols-[52px_1fr] gap-4 py-8 lg:grid-cols-[80px_1fr_320px] lg:items-center lg:gap-10 lg:py-10">
                  <span className="font-serif text-3xl font-bold text-line transition-colors duration-300 group-hover:text-sage lg:text-5xl">
                    {num}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-forest lg:text-3xl">{title}</h3>
                  <p className="col-start-2 text-sm leading-relaxed text-muted lg:col-start-auto">{body}</p>
                </div>
              </FadeIn>
            ))}
            <div />
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-beige py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">Services</p>
              <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">How We Serve</h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted">
                Tailored wellness solutions designed for individuals, teams, and organizations.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <FadeIn key={service.title} direction="up" delay={i * 100}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-beige-dark bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-forest/10 transition-colors group-hover:bg-forest/5" />
                  </div>
                  <div className="flex flex-col p-5">
                    <h3 className="font-serif mb-2 text-base font-bold text-forest">{service.title}</h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted">{service.body}</p>
                    <Link
                      href="/services"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest transition-all hover:gap-2"
                    >
                      Learn More &rarr;
                    </Link>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPEAKING TOPICS ── */}
      <section className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">Speaking</p>
              <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">
                Popular Speaking Topics
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, i) => (
              <FadeIn key={topic.title} direction="up" delay={(i % 3) * 80}>
                <div className="group rounded-xl border border-line bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-sage/40 hover:shadow-lg">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-beige text-forest transition-colors group-hover:bg-sage/20">
                    {topicIcons[i]}
                  </div>
                  <h3 className="font-serif mb-2 text-base font-bold text-charcoal">{topic.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{topic.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={200}>
            <div className="mt-10 text-center">
              <Link
                href="/speaking-events"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-forest px-7 text-sm font-semibold text-forest transition-all hover:bg-forest hover:text-white"
              >
                View All Speaking Topics
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-forest py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-center">
            <FadeIn direction="up">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">Testimonials</p>
              <h2 className="font-serif text-4xl font-bold text-white lg:text-5xl">
                What happens when the room shifts.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/50">
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
