"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  org: string;
  image: string;
}

export function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % testimonials.length),
      6500,
    );
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative">
      {/* Massive decorative quotation mark behind the canvas */}
      <span
        aria-hidden="true"
        className="font-serif pointer-events-none absolute -left-6 -top-12 select-none text-[12rem] leading-none text-white/5"
      >
        &ldquo;
      </span>

      <div className="relative min-h-[380px]">
        {testimonials.map((item, i) => (
          <div
            key={i}
            className="absolute inset-0 flex flex-col transition-all duration-700"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? "translateX(0)" : "translateX(32px)",
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            <p className="font-serif text-xl font-medium leading-relaxed text-white lg:text-2xl">
              {item.quote}
            </p>

            <div className="mb-6 mt-6 flex gap-1.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <svg
                  key={s}
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                  className="text-beige"
                  aria-hidden="true"
                >
                  <path d="M7 1l1.545 4.755H14l-4.045 2.94 1.545 4.755L7 10.51l-4.5 2.94 1.545-4.755L0 5.755h5.455z" />
                </svg>
              ))}
            </div>

            {/* Author profile — headshot resting above the credentials */}
            <footer className="mt-auto flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={224}
                height={224}
                className="h-24 w-24 rounded-full border-2 border-white/10 object-cover object-center shadow-xl lg:h-28 lg:w-28"
              />
              <cite className="not-italic">
                <span className="block text-base font-bold tracking-tight text-white">
                  {item.name}
                </span>
                <span className="mt-1 block text-xs uppercase tracking-[0.12em] text-white/70 lg:text-sm">
                  {item.role}, {item.org}
                </span>
              </cite>
            </footer>
          </div>
        ))}
      </div>

      {/* Pagination — sleek horizontal tracking bars, anchored below the card */}
      <div className="mt-8 flex items-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-[2px] transition-all duration-300 ${
              i === current ? "w-12 bg-white" : "w-8 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
