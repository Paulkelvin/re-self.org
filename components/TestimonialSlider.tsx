"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  org: string;
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
    <div>
      <div className="relative min-h-[300px]">
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
            <p className="font-serif mb-6 text-6xl leading-none text-sage/30">&ldquo;</p>
            <p className="text-lg leading-relaxed text-white/80 sm:text-xl">{item.quote}</p>
            <div className="mt-7 flex gap-1">
              {Array.from({ length: 5 }).map((_, s) => (
                <svg
                  key={s}
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                  className="text-sage"
                  aria-hidden="true"
                >
                  <path d="M7 1l1.545 4.755H14l-4.045 2.94 1.545 4.755L7 10.51l-4.5 2.94 1.545-4.755L0 5.755h5.455z" />
                </svg>
              ))}
            </div>
            <footer className="mt-4">
              <cite className="not-italic">
                <span className="block text-sm font-bold text-white">{item.name}</span>
                <span className="mt-0.5 block text-xs text-sage/60">
                  {item.role}, {item.org}
                </span>
              </cite>
            </footer>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-sage" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
