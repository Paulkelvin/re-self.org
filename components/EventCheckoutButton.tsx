"use client";

import { useState } from "react";
import type { SiteEvent } from "@/lib/content";
import { getCurrentEventPrice } from "@/lib/eventPricing";

const arrow = (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" />
  </svg>
);

export function EventCheckoutButton({
  event,
  variant = "compact",
}: {
  event: SiteEvent;
  variant?: "compact" | "large";
}) {
  const [loading, setLoading] = useState(false);
  const price = getCurrentEventPrice(event);

  if (!price) return null;

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageTitle: event.title, priceAmount: price }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.details || data.error || "Unable to start checkout. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const label = loading ? "Processing…" : "Register & Pay";

  if (variant === "large") {
    return (
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait"
      >
        {label}
        {!loading && arrow}
      </button>
    );
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-forest-light hover:shadow-md disabled:opacity-60 disabled:cursor-wait"
    >
      {label}
      {!loading && arrow}
    </button>
  );
}
