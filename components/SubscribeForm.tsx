"use client";

import { useState } from "react";

type Status = "idle" | "success";

interface Props {
  /** Visual variant — `light` for dark backgrounds, `dark` for light ones. */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Email capture for the journal. Currently client-only with an optimistic
 * success state; wire `onSubmit` to a real endpoint (or Sanity/ESP webhook)
 * when the backend is ready.
 */
export function SubscribeForm({ variant = "dark", className = "" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const light = variant === "light";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: POST to subscribe endpoint once available.
    setStatus("success");
    setEmail("");
  }

  if (status === "success") {
    return (
      <p
        className={`flex items-center gap-2 text-sm font-medium ${
          light ? "text-white" : "text-forest"
        } ${className}`}
        role="status"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        You&apos;re on the list — watch your inbox for the next issue.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full max-w-md flex-col gap-3 sm:flex-row ${className}`}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@organization.com"
        className={`min-h-[52px] flex-1 rounded-full border px-5 text-sm outline-none transition-colors ${
          light
            ? "border-white/25 bg-white/10 text-white placeholder:text-white/45 focus:border-white/60"
            : "border-line bg-white text-charcoal placeholder:text-muted/60 focus:border-forest"
        }`}
      />
      <button
        type="submit"
        className={`min-h-[52px] shrink-0 rounded-full px-7 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${
          light
            ? "bg-white text-forest shadow-md hover:bg-beige"
            : "bg-forest text-white shadow-md shadow-forest/25 hover:bg-forest-light"
        }`}
      >
        Subscribe
      </button>
    </form>
  );
}
