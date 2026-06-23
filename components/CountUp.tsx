"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  /** Full label, e.g. "21+", "100+", "21+ Years", or non-numeric like "Thousands". */
  value: string;
  className?: string;
  /** Count duration in ms. */
  duration?: number;
}

// Counts a leading integer from 0 up to its target when scrolled into view,
// preserving any suffix ("+", " Years"). Non-numeric values ("Thousands")
// render statically. Honors prefers-reduced-motion by snapping to the value.
export function CountUp({ value, className = "", duration = 1500 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const suffix = match ? match[2] : "";

  // Start with the full value so SSR / no-JS shows the real figure.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (target === null) return; // non-numeric — leave static
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => setDisplay(target.toLocaleString() + suffix));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          setDisplay(Math.round(eased * target).toLocaleString() + suffix);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
