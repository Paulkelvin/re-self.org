import Link from "next/link";
import Image from "next/image";
import { credentials, services, testimonials, topics } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-pine-dark text-white">
        <div className="mx-auto max-w-[1160px] px-4 py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <p className="mb-5 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
                Wellness Consultant &bull; Keynote Speaker &bull; Facilitator
              </p>
              <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Helping high-performing teams{" "}
                <span className="text-sage">return to sustainable wellbeing.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
                Sonya partners with organizations to reduce burnout, strengthen
                resilience, and create practical wellness cultures people can
                actually maintain.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/book-sonya"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-coral px-7 text-sm font-extrabold text-white shadow-lg shadow-coral/20 transition-all hover:-translate-y-px hover:shadow-xl hover:shadow-coral/30"
                >
                  Book Sonya
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-lg border border-white/20 px-7 text-sm font-bold text-white/80 transition-all hover:border-white/40 hover:text-white"
                >
                  Explore Services &rarr;
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative hidden overflow-hidden rounded-2xl lg:block" style={{ minHeight: 520 }}>
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1100&q=82"
                alt="Sonya — professional wellness speaker"
                fill
                sizes="420px"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-dark/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/95 p-5 shadow-xl backdrop-blur-sm">
                <p className="text-sm font-extrabold leading-snug text-ink">
                  Keynotes, workshops, and retreats designed for real workplace pressure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1160px] px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="mb-3 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
                About Sonya
              </p>
              <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink lg:text-5xl">
                Corporate-ready wellness with a human center.
              </h2>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-muted lg:pt-3">
              <p>
                Sonya helps leaders and teams reconnect with the habits, language,
                and support systems that make wellbeing durable. Her work combines
                practical behavior design, reflective facilitation, and clear
                corporate outcomes.
              </p>
              <p>
                Every engagement is shaped for the audience in the room — from
                executive offsites and employee wellbeing weeks to organization-wide
                wellness programs.
              </p>
            </div>
          </div>

          {/* Credential stats */}
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {credentials.map(([value, label]) => (
              <div
                key={label}
                className="rounded-xl border-l-4 border-gold bg-white px-7 py-6 shadow-sm"
              >
                <strong className="block text-4xl font-extrabold leading-none text-pine">
                  {value}
                </strong>
                <span className="mt-2 block text-sm text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-[1160px] px-4">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
                Services
              </p>
              <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink lg:text-5xl">
                Formats for teams,
                <br />
                leaders, and whole orgs.
              </h2>
            </div>
            <Link
              href="/services"
              className="shrink-0 text-sm font-bold text-pine transition-colors hover:text-coral"
            >
              View all services &rarr;
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <article
                key={service.title}
                className="group rounded-xl border border-line bg-white p-8 transition-all hover:-translate-y-1 hover:border-sage/30 hover:shadow-xl"
              >
                <p className="mb-5 text-5xl font-extrabold leading-none text-line transition-colors group-hover:text-sage/25">
                  0{i + 1}
                </p>
                <h3 className="mb-3 text-lg font-extrabold leading-tight text-ink">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{service.body}</p>
                <Link
                  href="/book-sonya"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-coral transition-all hover:gap-2"
                >
                  Inquire <span>&rarr;</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking topics */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1160px] px-4">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            <div className="lg:pt-3">
              <p className="mb-3 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
                Featured Speaking Topics
              </p>
              <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink lg:text-5xl">
                Clear, memorable talks for modern workplace wellbeing.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Tailored for wellbeing weeks, leadership retreats, conferences,
                ERG events, and executive sessions.
              </p>
              <Link
                href="/speaking-events"
                className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-pine px-6 text-sm font-extrabold text-white transition-all hover:-translate-y-px hover:shadow-lg"
              >
                Book a Speaking Date
              </Link>
            </div>

            <ul className="grid gap-0">
              {topics.map((topic, i) => (
                <li key={topic} className="flex gap-5 border-b border-line py-5 last:border-0">
                  <span className="w-6 shrink-0 pt-0.5 text-xs font-extrabold text-coral/50">
                    0{i + 1}
                  </span>
                  <span className="text-base font-medium leading-snug text-ink">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-pine py-20 lg:py-28">
        <div className="mx-auto max-w-[1160px] px-4">
          <div className="mb-12">
            <p className="mb-3 text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
              Testimonials
            </p>
            <h2 className="text-4xl font-extrabold leading-none tracking-tight text-white lg:text-5xl">
              What clients say after
              <br />
              the room shifts.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote
                key={item.name}
                className="rounded-xl border border-white/10 bg-white/5 p-8"
              >
                <p className="mb-5 text-4xl font-extrabold leading-none text-white/20">&ldquo;</p>
                <p className="text-base leading-relaxed text-white/80">{item.quote}</p>
                <footer className="mt-6">
                  <cite className="text-[0.65rem] font-extrabold not-italic uppercase tracking-widest text-coral">
                    {item.name}
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-coral py-20">
        <div className="mx-auto max-w-[1160px] px-4">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-[0.68rem] font-extrabold uppercase tracking-widest text-white/60">
                Bring Sonya to your organization
              </p>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-4xl">
                Start with a focused booking request.
              </h2>
              <p className="mt-3 max-w-lg text-base text-white/75">
                Share the event details, audience, and goals. Sonya will respond
                with availability and next steps.
              </p>
            </div>
            <Link
              href="/book-sonya"
              className="inline-flex shrink-0 min-h-[52px] items-center justify-center rounded-lg bg-white px-8 text-sm font-extrabold text-coral shadow-xl transition-all hover:-translate-y-px hover:shadow-2xl"
            >
              Request Availability &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
