"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "none";
}

// Brand entrance curve — a decelerating ease-out so content settles calmly
// into place. Shared by every scroll-reveal on the site for one consistent
// motion language. 500ms sits in the "smooth reveal" band (300–500ms).
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION = 0.5;
const DISTANCE = 28;

export function FadeIn({ children, className = "", delay = 0, direction = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  // When the user prefers reduced motion we skip transform/transition entirely
  // and just render the content in place (an instant, motionless reveal).
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => {
        setReduced(true);
        setVisible(true);
      });
      return;
    }

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
    );
    observer.observe(el);

    // iOS Safari settles its dynamic viewport height (URL bar collapsing)
    // shortly after load, which can leave IntersectionObserver's initial
    // read stale for content that's already on screen — it then stays
    // invisible until a scroll/resize nudges a recheck. Recheck directly
    // against the viewport as a fallback so nothing gets stuck blank.
    const recheckInView = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setVisible(true);
        observer.disconnect();
      }
    };
    window.addEventListener("resize", recheckInView);
    const timeoutId = window.setTimeout(recheckInView, 300);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", recheckInView);
      window.clearTimeout(timeoutId);
    };
  }, []);

  // Hardware-accelerated only: translate3d + opacity, never layout properties.
  const initial =
    direction === "up"
      ? `translate3d(0, ${DISTANCE}px, 0)`
      : direction === "left"
        ? `translate3d(-${DISTANCE}px, 0, 0)`
        : "none";

  const current = visible
    ? direction === "none"
      ? "none"
      : "translate3d(0, 0, 0)"
    : initial;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: reduced ? "none" : current,
        transition: reduced
          ? "none"
          : `opacity ${DURATION}s ${EASE} ${delay}ms, transform ${DURATION}s ${EASE} ${delay}ms`,
        // Promote to its own layer only while the reveal is pending, then release.
        willChange: !reduced && !visible ? "opacity, transform" : "auto",
      }}
    >
      {children}
    </div>
  );
}
