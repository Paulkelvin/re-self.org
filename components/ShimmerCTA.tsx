"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Sheen color: `light` for dark buttons, `dark` for light buttons. */
  tone?: "light" | "dark";
}

/**
 * Primary CTA with a single, subtle sheen that sweeps across once the first
 * time the button scrolls into view — a quiet focal cue toward the main
 * conversion action, never a loop. Fully inert under prefers-reduced-motion.
 */
export function ShimmerCTA({ href, children, className = "", tone = "light" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [shine, setShine] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShine(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Link ref={ref} href={href} className={`relative overflow-hidden ${className}`}>
      <span className="relative z-[1]">{children}</span>
      {shine && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${
            tone === "dark" ? "cta-sheen-dark" : "cta-sheen"
          }`}
        />
      )}
    </Link>
  );
}
