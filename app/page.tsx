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
      <section className="relative overflow-hidden bg-warm-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-48 -top-48 h-[680px] w-[680px] rounded-full bg-sage/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full bg-beige blur-3xl" />
          <div className="absolute right-1/3 top-1/2 h-[240px] w-[240px] rounded-full bg-forest/5 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-4 py-24 lg:py-36">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <FadeIn direction="up">
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-sage">
                Wellness Leader &bull; Speaker &bull; Corporate Wellness Consultant
              </p>
              <h1 className="font-serif text-5xl font-bold leading-[1.07] tracking-tight text-forest sm:text-6xl lg:text-[3.6rem]">
                Self-Care From Within.{" "}
                <span className="italic text-sage">Stronger Leaders.</span>{" "}
                Healthier Organizations.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                Sonya Harris empowers individuals and organizations through transformative
                workshops, leadership development, and wellness programs rooted in decades
                of service, resilience, and authentic care.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/book-sonya"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-forest px-8 text-sm font-semibold text-white shadow-lg shadow-forest/20 transition-all hover:-translate-y-px hover:bg-forest-light hover:shadow-xl hover:shadow-forest/25"
                >
                  Book Sonya
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-lg border border-charcoal/20 px-8 text-sm font-semibold text-charcoal transition-all hover:border-forest hover:text-forest"
                >
                  Explore Services &rarr;
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={160}>
              <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl border-2 border-sage/25" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-forest/15">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=880&q=85"
                    alt="Sonya Harris — Corporate Wellness Consultant and Keynote Speaker"
                    width={880}
                    height={1100}
                    priority
                    className="w-full object-cover"
                    style={{ aspectRatio: "4/5" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/25 to-transparent" />
                </div>
                <div className="absolute -bottom-5 -left-5 rounded-xl bg-white px-5 py-4 shadow-xl">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-sage">21+ Years</p>
                  <p className="text-sm font-bold text-charcoal">Service. Leadership. Impact.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY BAR ── */}
      <section className="bg-forest">
        <div className="mx-auto max-w-[1200px] px-4 py-14 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map(([value, label], i) => (
              <FadeIn key={label} direction="up" delay={i * 80}>
                <div className="text-center sm:text-left">
                  <p className="font-serif text-4xl font-bold text-white lg:text-5xl">{value}</p>
                  <p className="mt-2 text-sm leading-snug text-white/50">{label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="bg-beige py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <FadeIn direction="left">
              <div className="relative">
                <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl bg-sage/20" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85"
                    alt="Sonya Harris"
                    width={800}
                    height={960}
                    className="w-full object-cover"
                    style={{ aspectRatio: "5/6" }}
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={120}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">About Sonya</p>
              <h2 className="font-serif text-4xl font-bold leading-tight text-forest lg:text-5xl">
                Leadership Meets Wellness
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  Sonya Harris brings a rare combination of military discipline, federal
                  leadership experience, and deep wellness expertise to every engagement.
                  With 21 years of U.S. Air Force service and over a decade of federal
                  government leadership, Sonya has navigated high-stakes environments where
                  resilience and wellbeing are mission-critical.
                </p>
                <p>
                  Holding a Master of Education and certifications in leadership development
                  and wellness facilitation, Sonya translates complex human challenges into
                  actionable, sustainable change — bridging organizational performance and
                  human flourishing.
                </p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {achievements.map(({ value, label }) => (
                  <div
                    key={label}
                    className="group rounded-xl border border-beige-dark bg-white px-5 py-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sage/50 hover:shadow-md"
                  >
                    <p className="font-serif text-xl font-bold text-forest">{value}</p>
                    <p className="mt-1 text-xs font-medium text-muted">{label}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest transition-all hover:gap-3"
              >
                Read full story &rarr;
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CORE PHILOSOPHY ── */}
      <section className="bg-warm-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">Philosophy</p>
              <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">
                The Principles Behind Every Transformation
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                Icon: TargetIcon,
                title: "Discipline",
                body: "Developing consistent habits that support long-term personal and professional growth — drawing from military precision and human-centered design.",
              },
              {
                Icon: ShieldIcon,
                title: "Resilience",
                body: "Building the mental and emotional strength needed to thrive through challenges, transitions, and high-stakes demands without breaking.",
              },
              {
                Icon: LeafIcon,
                title: "Renewal",
                body: "Creating sustainable wellness practices and rhythms that support lasting success without sacrificing health, relationships, or humanity.",
              },
            ].map(({ Icon, title, body }, i) => (
              <FadeIn key={title} direction="up" delay={i * 100}>
                <div className="group h-full rounded-2xl border border-line bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-sage/40 hover:shadow-lg">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-beige text-forest transition-colors group-hover:bg-sage/20">
                    <Icon />
                  </div>
                  <h3 className="font-serif mb-3 text-xl font-bold text-forest">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </FadeIn>
            ))}
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
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-forest/10 transition-colors group-hover:bg-forest/5" />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-serif mb-3 text-xl font-bold text-forest">{service.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted">{service.body}</p>
                    <Link
                      href="/services"
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-forest transition-all hover:gap-2"
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
