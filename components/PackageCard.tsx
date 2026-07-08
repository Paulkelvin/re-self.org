"use client";

import { useState } from "react";
import type { Package } from "@/lib/content";

function CheckIcon({ highlighted }: { highlighted: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle
        cx="8"
        cy="8"
        r="8"
        className={highlighted ? "fill-white/20" : "fill-forest/10"}
      />
      <path
        d="M5 8.5l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={highlighted ? "text-white" : "text-forest"}
      />
    </svg>
  );
}

interface Props {
  pkg: Package;
  index: number;
  compact?: boolean;
}

const paidCheckoutPackages = new Set([
  "Individual Self-Care Coaching",
  "Four-Week Self-Care Cohort",
]);

export function PackageCard({ pkg, index, compact = false }: Props) {
  const [loading, setLoading] = useState(false);
  const isHighlighted = pkg.highlighted;

  const visibleFeatures = compact
    ? (pkg.features ?? []).slice(0, 3)
    : (pkg.features ?? []);

  async function handleCheckout() {
    const params = new URLSearchParams({
      package: pkg.title,
    });

    if (!paidCheckoutPackages.has(pkg.title) || !pkg.price || pkg.price <= 0) {
      if (!pkg.price || pkg.price <= 0) {
        params.set("allowFree", "1");
      }
      window.location.href = `/book-sonya?${params.toString()}`;
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageTitle: pkg.title,
          priceAmount: pkg.price,
          squareItemId: pkg.squareItemId || "",
        }),
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

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
        isHighlighted
          ? "mt-6 border-amber-light/40 bg-forest-deep text-white shadow-2xl shadow-forest-deep/30 scale-[1.02] z-10 ring-1 ring-amber-light/20"
          : "border-line bg-white text-charcoal shadow-lg shadow-black/[0.04] hover:border-forest/30"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {isHighlighted && (
        <>
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-amber-light to-transparent"
          />
          <div className="absolute -top-4 left-1/2 z-30 -translate-x-1/2">
            <span className="inline-flex items-center whitespace-nowrap rounded-full bg-amber px-5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
              Most Popular
            </span>
          </div>
        </>
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
            isHighlighted ? "text-white/85" : "text-muted"
          }`}
        >
          {pkg.subtitle}
        </p>

        <div className="mt-6 flex items-baseline gap-1">
          <span
            className={`font-serif text-4xl font-bold tracking-tight ${
              isHighlighted ? "text-amber-light" : "text-forest"
            }`}
          >
            {pkg.priceLabel}
          </span>
          {pkg.priceSuffix && (
            <span
              className={`text-sm ${
                isHighlighted ? "text-white/70" : "text-muted"
              }`}
            >
              {pkg.priceSuffix}
            </span>
          )}
        </div>
      </div>

      <div
        className={`mx-8 my-6 h-px ${
          isHighlighted
            ? "bg-gradient-to-r from-transparent via-amber-light/30 to-transparent"
            : "bg-line"
        }`}
      />

      <div className="flex-1 px-8">
        <ul className="space-y-3">
          {visibleFeatures.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5">
                <CheckIcon highlighted={isHighlighted} />
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
          className={`relative flex w-full min-h-[48px] items-center justify-center rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait ${
            isHighlighted
              ? "bg-amber text-white hover:bg-amber-deep"
              : "bg-forest text-white shadow-md shadow-forest/20 hover:bg-forest-deep hover:shadow-lg"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-25"
                />
                <path
                  d="M4 12a8 8 0 018-8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="opacity-75"
                />
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
