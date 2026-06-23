import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { EventList } from "@/components/EventList";
import { getTopics, getEvents, getSpeakingFormats, getSpeakingAudiences } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Speaking & Events",
  description:
    "Book Sonya Harris for wellness keynotes, leadership panels, executive sessions, and corporate events. Tailored for organizations, government agencies, and conferences.",
};

const formatIcons = [
  <svg key="layers" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
  <svg key="people" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
  <svg key="book" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>,
];

const EVENT_TZ = "America/Chicago";

function formatFeaturedDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: EVENT_TZ,
  });
}

function formatFeaturedTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: EVENT_TZ,
  });
}

export default async function SpeakingEventsPage() {
  const [topics, events, formats, speakingAudiences] = await Promise.all([
    getTopics(),
    getEvents(),
    getSpeakingFormats(),
    getSpeakingAudiences(),
  ]);

  const now = new Date();
  const featuredEvent =
    events.find((e) => e.featured) ??
    events.find((e) => new Date(e.date) >= now) ??
    events[0];
  const restEvents = featuredEvent
    ? events.filter((e) => e.slug !== featuredEvent.slug)
    : events;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[72vh] flex flex-col justify-center overflow-hidden bg-[#0f3535] px-6 py-24 text-white lg:px-16">
        {/* Full-bleed background image + contrast overlays */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Left-weighted gradient keeps the headline on a dark field for contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1e1e]/95 via-[#0a1e1e]/78 to-[#0f3535]/35" />
          <div className="absolute inset-0 bg-[#0a1e1e]/25" />
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 left-2 select-none font-serif text-[9rem] font-bold leading-none text-white/[0.06] lg:text-[14rem]"
        >
          Speaking
        </span>

        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-sage/[0.10] border border-white/15 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-sage">
            Speaking &amp; Events
          </p>
          <h1 className="font-serif max-w-4xl text-3xl font-medium leading-[1.15] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:text-4xl lg:text-5xl">
            Wellness keynotes that meet ambitious teams where they are.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Sonya delivers grounded, corporate-ready talks that help audiences understand
            stress, reset patterns, and leave with practical next steps they can use immediately.
          </p>
          <div className="mt-10">
            <Link
              href="/book-sonya"
              className="inline-flex w-fit items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#134545] shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Book a Speaking Date
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="relative overflow-hidden bg-ambient-warm pb-8 pt-16 lg:pt-20">
          <div className="mx-auto max-w-[1200px] px-4">

            <FadeIn direction="up">
              <div className="mb-10">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-forest/90">
                  {new Date(featuredEvent.date) >= now ? "Next Up" : "Featured Event"}
                </p>
                <h2 className="font-serif text-4xl font-bold text-forest lg:text-5xl">
                  {new Date(featuredEvent.date) >= now ? "Don't miss this." : "Recent highlight."}
                </h2>
                <div aria-hidden="true" className="mt-4 h-[3px] w-12 rounded-full bg-gold" />
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={80}>
              <div className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-line/70 bg-white shadow-lg shadow-forest/[0.06] ring-1 ring-forest/[0.03] transition-shadow duration-300 hover:shadow-xl lg:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[320px]">
                  <Image
                    src={featuredEvent.coverImage}
                    alt={featuredEvent.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-forest px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                    {featuredEvent.eventType}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted/70">
                    <time dateTime={featuredEvent.date}>
                      {formatFeaturedDate(featuredEvent.date)} at {formatFeaturedTime(featuredEvent.date)}
                    </time>
                    {featuredEvent.location && (
                      <>
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
                        <span>{featuredEvent.location}</span>
                      </>
                    )}
                    {featuredEvent.isVirtual && (
                      <>
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
                        <span>Virtual</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-bold leading-tight tracking-tight text-charcoal lg:text-[2rem]">
                    {featuredEvent.title}
                  </h3>
                  <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
                    {featuredEvent.description}
                  </p>

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

                  {new Date(featuredEvent.date) >= now && featuredEvent.registrationUrl && (
                    <div className="mt-7">
                      <Link
                        href={featuredEvent.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                      >
                        Register Now
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* All Events */}
      {events.length > 0 && (
        <section className="relative overflow-hidden bg-ambient-warm py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-4">
            <FadeIn direction="up">
              <div className="mb-10">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/[0.12] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[#a07d3a]">
                  Events
                </p>
                <h2 className="font-serif text-2xl font-bold tracking-tight text-charcoal lg:text-3xl">
                  All Events
                </h2>
                <div aria-hidden="true" className="mt-4 h-[3px] w-12 rounded-full bg-gold" />
                <p className="mt-3 text-sm text-muted">
                  Browse upcoming and past appearances.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={80}>
              <EventList events={restEvents} />
            </FadeIn>
          </div>
        </section>
      )}

      {/* Signature Topics */}
      <section id="signature-topics" className="relative overflow-hidden bg-ambient-warm py-24 lg:py-32">
        <div className="pointer-events-none absolute -right-40 -top-20 h-[500px] w-[500px] rounded-full bg-sage/[0.06] blur-3xl" aria-hidden="true" />
        {/* Cross markers */}
        <span aria-hidden="true" className="pointer-events-none absolute left-[6%] top-20 select-none text-xl text-forest/[0.07]">+</span>
        <span aria-hidden="true" className="pointer-events-none absolute right-[15%] bottom-28 select-none text-lg text-sage/[0.10]">+</span>
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <FadeIn direction="up">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-forest/[0.04] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-forest/90">
                Signature Topics
              </p>
              <h2 className="font-serif text-4xl font-bold leading-tight text-forest lg:text-5xl">
                Talks that land in the room.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Each talk can be tailored for employee wellbeing weeks, leadership retreats,
                conferences, ERG events, and executive sessions.
              </p>
              <Link
                href="/book-sonya"
                className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-[#134545] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Book Sonya
              </Link>
            </FadeIn>

            <FadeIn direction="up" delay={120}>
              <ul className="space-y-8">
                {topics.map((topic, i) => (
                  <li
                    key={topic.title}
                    className="group flex cursor-pointer gap-5 border-b border-line pb-8 transition-colors duration-300 last:border-0 last:pb-0 hover:border-forest/40"
                  >
                    <span className="w-7 shrink-0 pt-0.5 font-mono text-xs tracking-widest text-neutral-400">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-base font-semibold leading-snug text-charcoal transition-colors duration-300 group-hover:text-forest">
                        {topic.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{topic.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="relative overflow-hidden bg-ambient-beige py-24 lg:py-32">
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-sage/[0.07] blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-14">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/[0.12] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[#a07d3a]">Formats</p>
              <h2 className="font-serif text-4xl font-bold text-charcoal lg:text-5xl">
                Three ways to bring Sonya to your audience.
              </h2>
              <div aria-hidden="true" className="mt-4 h-[3px] w-12 rounded-full bg-gold" />
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-3">
            {formats.map(({ name, duration, description }, i) => (
              <FadeIn key={name} direction="up" delay={i * 100}>
                <div className="group relative h-full overflow-hidden rounded-xl border border-neutral-200/50 bg-white pb-8 pt-0 shadow-md shadow-forest/[0.05] transition-all duration-300 hover:-translate-y-1 hover:border-forest/30 hover:shadow-xl hover:shadow-forest/[0.10]">
                  <div className="relative flex h-28 items-center justify-center bg-gradient-to-b from-sage/20 to-sage/5">
                    <span className="text-forest/60 transition-colors duration-300 group-hover:text-forest">
                      {formatIcons[i % formatIcons.length]}
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-3 top-3 font-serif text-6xl font-bold leading-none text-forest/[0.06]"
                    >
                      0{i + 1}
                    </span>
                  </div>

                  <div className="px-8 pt-6 md:px-10">
                    <span className="mb-4 inline-block rounded-full border border-forest/15 bg-forest/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-forest/60">
                      {duration}
                    </span>
                    <h3 className="font-serif mb-3 text-xl font-bold text-forest">{name}</h3>
                    <p className="text-sm leading-relaxed text-muted">{description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="relative overflow-hidden bg-ambient-warm py-14 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn direction="up">
            <div className="mb-8 text-center">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-charcoal/[0.06] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-charcoal/80">Audiences</p>
              <h2 className="font-serif text-3xl font-bold text-charcoal lg:text-4xl">
                Where Sonya speaks
              </h2>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
                {speakingAudiences.map((item, i) => (
                  <div
                    key={item.label}
                    className="group flex items-start gap-3 py-2"
                  >
                    <span className="mt-0.5 font-mono text-xs tracking-widest text-sage">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-snug text-charcoal transition-colors duration-300 group-hover:text-forest">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </>
  );
}
