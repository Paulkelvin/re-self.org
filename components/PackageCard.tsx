"use client";

import { useState } from "react";
import type { Package } from "@/lib/content";

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="8" cy="8" r="8" className="fill-forest/10" />
      <path
        d="M5 8.5l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-forest"
      />
    </svg>
  );
}

export function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageTitle: pkg.title,
          priceAmount: pkg.price,
          squareItemId: pkg.squareItemId,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Unable to start checkout. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const isHighlighted = pkg.highlighted;

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
        isHighlighted
          ? "border-forest bg-forest text-white shadow-2xl shadow-forest/25 scale-[1.02] z-10"
          : "border-line bg-white text-charcoal shadow-lg shadow-black/[0.04] hover:border-forest/30"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {isHighlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-forest shadow-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-forest animate-pulse" />
            Most Popular
          </span>
        </div>
      )}

      <div className={`p-8 pb-0 ${isHighlighted ? "pt-10" : ""}`}>
        <h3
          className={`text-lg font-semibold ${
            isHighlighted ? "text-white" : "text-forest"
          }`}
        >
          {pkg.title}
        </h3>
        <p
          className={`mt-1 text-sm ${
            isHighlighted ? "text-white/70" : "text-muted"
          }`}
        >
          {pkg.subtitle}
        </p>

        <div className="mt-6 flex items-baseline gap-1">
          <span
            className={`font-serif text-4xl font-bold tracking-tight ${
              isHighlighted ? "text-white" : "text-forest"
            }`}
          >
            {pkg.priceLabel}
          </span>
          {pkg.priceSuffix && (
            <span
              className={`text-sm ${
                isHighlighted ? "text-white/60" : "text-muted"
              }`}
            >
              {pkg.priceSuffix}
            </span>
          )}
        </div>
      </div>

      <div
        className={`mx-8 my-6 h-px ${
          isHighlighted ? "bg-white/20" : "bg-line"
        }`}
      />

      <div className="flex-1 px-8">
        <ul className="space-y-3">
          {pkg.features?.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5">
                <CheckIcon />
              </span>
              <span
                className={`text-sm leading-snug ${
                  isHighlighted ? "text-white/90" : "text-charcoal"
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-8 pt-6">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`flex w-full min-h-[48px] items-center justify-center rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait ${
            isHighlighted
              ? "bg-white text-forest shadow-lg hover:bg-warm-white hover:shadow-xl"
              : "bg-forest text-white shadow-md shadow-forest/20 hover:bg-forest-light hover:shadow-lg"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
              </svg>
              Processing…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              {pkg.ctaLabel || "Get Started"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
