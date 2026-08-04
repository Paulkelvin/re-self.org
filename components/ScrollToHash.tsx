"use client";

import { useEffect } from "react";

export function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    let attempts = 0;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < 20) {
        attempts++;
        timer = setTimeout(tryScroll, 150);
      }
    };
    tryScroll();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return null;
}
