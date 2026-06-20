"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { SiteEvent } from "@/lib/content";

const typeColors: Record<string, string> = {
  Keynote: "bg-forest text-white",
  Panel: "bg-sage/30 text-forest",
  Workshop: "bg-gold/20 text-[#8a7038]",
  Retreat: "bg-[#d4e4d4] text-forest",
  Podcast: "bg-[#e8d5f0] text-[#5a3670]",
  Conference: "bg-[#d5e0e8] text-[#2a4a5a]",
};

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatEventTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

type FilterTab = "All" | "Upcoming" | "Past" | string;

export function EventList({ events }: { events: SiteEvent[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const now = new Date();
  const eventTypes = Array.from(new Set(events.map((e) => e.eventType)));

  const filtered = events.filter((event) => {
    const eventDate = new Date(event.date);
    if (activeFilter === "All") return true;
    if (activeFilter === "Upcoming") return eventDate >= now;
    if (activeFilter === "Past") return eventDate < now;
    return event.eventType === activeFilter;
  });

  const tabs: FilterTab[] = ["All", "Upcoming", "Past", ...eventTypes];

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeFilter === tab
                ? "bg-forest text-white shadow-sm"
                : "bg-forest/[0.04] text-forest/60 hover:bg-forest/[0.08] hover:text-forest"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Event rows */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-serif text-xl text-muted">No events found — check back soon.</p>
        </div>
      ) : (
        <div className="divide-y divide-line">
          {filtered.map((event) => {
            const isPast = new Date(event.date) < now;
            return (
              <div
                key={event.slug}
                className={`group flex flex-col gap-4 py-6 transition-colors duration-200 hover:bg-forest/[0.02] sm:flex-row sm:items-center sm:gap-6 ${
                  isPast ? "opacity-70 hover:opacity-100" : ""
                }`}
              >
                {/* Thumbnail */}
                <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-20">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        typeColors[event.eventType] ?? "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {event.eventType}
                    </span>
                    {event.isVirtual && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-muted/60">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
                        Virtual
                      </span>
                    )}
                  </div>

                  <h3 className="truncate font-serif text-base font-semibold text-charcoal transition-colors duration-200 group-hover:text-forest sm:text-lg">
                    {event.title}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted/70">
                    <span className="inline-flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                      {formatEventDate(event.date)}
                      {" "}at {formatEventTime(event.date)}
                    </span>
                    {event.location && (
                      <span className="inline-flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Speakers + Action */}
                <div className="flex items-center gap-4 sm:shrink-0">
                  {/* Speaker avatars */}
                  {event.speakers.length > 0 && (
                    <div className="flex items-center">
                      {event.speakers.slice(0, 3).map((speaker, i) => (
                        <div
                          key={speaker.name}
                          className={`relative h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm ${
                            i > 0 ? "-ml-2" : ""
                          }`}
                          title={`${speaker.name}${speaker.role ? ` — ${speaker.role}` : ""}`}
                        >
                          {speaker.image ? (
                            <Image
                              src={speaker.image}
                              alt={speaker.name}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-sage/30 text-[10px] font-bold text-forest">
                              {speaker.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </div>
                          )}
                        </div>
                      ))}
                      {event.speakers.length > 3 && (
                        <div className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-forest/10 text-[10px] font-bold text-forest">
                          +{event.speakers.length - 3}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action button */}
                  {!isPast && event.registrationUrl ? (
                    <Link
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-forest-light hover:shadow-md"
                    >
                      Register
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                    </Link>
                  ) : isPast ? (
                    <span className="inline-flex items-center rounded-full border border-line px-4 py-2 text-xs font-medium text-muted/50">
                      Past
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-forest/20 px-4 py-2 text-xs font-semibold text-forest">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
