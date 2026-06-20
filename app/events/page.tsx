import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { BrandOrbit } from "@/components/BrandOrbit";
import { EventList } from "@/components/EventList";
import { getEvents } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past events featuring Sonya Harris — panels, workshops, retreats, podcasts, and keynote speaking engagements.",
};

function formatFeaturedDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function EventsPage() {
  const events = await getEvents();

  const now = new Date();
  const featuredEvent =
    events.find((e) => e.featured) ??
    events.find((e) => new Date(e.date) >= now) ??
    events[0];

  const rest = featuredEvent
    ? events.filter((e) => e.slug !== featuredEvent.slug)
    : events;

  return (
    <>
      {/* Hero */}
      <section className="grain-overlay relative isolate flex min-h-[52vh] flex-col justify-center overflow-hidden bg-[#16322c] px-6 py-24 text-white lg:px-16">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1c18]/95 via-[#0c1c18]/78 to-[#16322c]/35" />
          <div className="absolute inset-0 bg-[#0c1c18]/30" />
        </div>

        <BrandOrbit className="pointer-events-none absolute -right-28 -top-24 h-[34rem] w-[34rem] text-sage/15" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 left-2 select-none font-serif text-[9rem] font-bold leading-none text-white/[0.06] lg:text-[14rem]"
        >
          Events
        </span>

        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <FadeIn direction="up">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-sage/[0.10] px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-sage">
              Events
            </p>
            <h1 className="font-serif max-w-4xl text-3xl font-medium leading-[1.15] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:text-4xl lg:text-5xl">
              Where Sonya Shows Up.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Panels, workshops, retreats, and keynotes — browse upcoming appearances
              and explore past events.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured event */}
      {featuredEvent && (
        <section className="bg-ambient-warm pb-8 pt-10 lg:pt-0">
          <div className="mx-auto max-w-[1200px] px-4">
            <FadeIn direction="up">
              <div className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-line/70 bg-white shadow-lg shadow-forest/[0.06] ring-1 ring-forest/[0.03] transition-shadow duration-300 hover:shadow-xl lg:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[400px]">
                  <Image
                    src={featuredEvent.coverImage}
                    alt={featuredEvent.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-forest px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                    {new Date(featuredEvent.date) >= now ? "Next Up" : "Featured"}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted/70">
                    <span className="font-semibold text-sage">{featuredEvent.eventType}</span>
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
                    <time dateTime={featuredEvent.date}>
                      {formatFeaturedDate(featuredEvent.date)}
                    </time>
                    {featuredEvent.location && (
                      <>
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
                        <span>{featuredEvent.location}</span>
                      </>
                    )}
                  </div>

                  <h2 className="font-serif text-2xl font-bold leading-tight tracking-tight text-charcoal lg:text-[2rem]">
                    {featuredEvent.title}
                  </h2>
                  <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
                    {featuredEvent.description}
                  </p>

                  {/* Speakers */}
                  {featuredEvent.speakers.length > 0 && (
                    <div className="mt-6">
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted/50">
                        Speakers
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {featuredEvent.speakers.map((speaker) => (
                          <div key={speaker.name} className="flex items-center gap-2">
                            <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-sm">
                              {speaker.image ? (
                                <Image
                                  src={speaker.image}
                                  alt={speaker.name}
                                  fill
                                  sizes="36px"
                                  className="object-cover"
                                />
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

                  {/* CTA */}
                  <div className="mt-7">
                    {new Date(featuredEvent.date) >= now && featuredEvent.registrationUrl ? (
                      <Link
                        href={featuredEvent.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                      >
                        Register Now
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                      </Link>
                    ) : new Date(featuredEvent.date) >= now ? (
                      <span className="inline-flex items-center rounded-full border border-forest/20 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-forest">
                        Coming Soon
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* All events list */}
      <section className="relative overflow-hidden bg-ambient-warm py-16 lg:py-20">
        {/* Glass orb */}
        <div aria-hidden="true" className="pointer-events-none absolute right-[5%] top-20 h-14 w-14 rounded-full bg-sage/20 backdrop-blur-sm lg:h-20 lg:w-20" />
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-forest lg:text-3xl">
                All Events
              </h2>
              <div aria-hidden="true" className="mt-4 h-[3px] w-12 rounded-full bg-gold" />
              <p className="mt-3 text-sm text-muted">
                Filter by status or event type.
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={80}>
            <EventList events={rest} />
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="grain-overlay relative overflow-hidden bg-forest py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-6 top-8 h-16 w-16 rounded-full bg-white/[0.06] backdrop-blur-sm lg:h-24 lg:w-24" />
        <svg aria-hidden="true" className="pointer-events-none absolute -right-4 bottom-6 h-28 w-28 rotate-[20deg] text-white/[0.04] lg:right-8 lg:h-36 lg:w-36" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20 90 C30 70 40 50 50 30 C55 20 60 10 70 8" /><path d="M35 65 C28 60 22 52 18 45" /><path d="M42 50 C50 48 58 42 62 35" /><path d="M48 38 C42 32 38 25 36 18" /><path d="M55 25 C60 22 68 18 74 15" /></svg>
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <FadeIn direction="up">
              <h2 className="font-serif text-3xl font-bold text-white lg:text-4xl">
                Want Sonya at your next event?
              </h2>
              <p className="mt-3 max-w-xl text-base text-white/55">
                Share event details, format preference, and audience size. Sonya will
                confirm availability within 2 business days.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={100}>
              <Link
                href="/book-sonya"
                className="inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#1e3d38] shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Book Sonya &rarr;
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
