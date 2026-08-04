"use client";

import { useState } from "react";

export function CopyEventLink({ slug, path = "/speaking-events" }: { slug: string; path?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}${path}#${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op if clipboard access is unavailable
    }
  }

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[11px] font-semibold text-muted transition-colors duration-200 hover:border-forest/30 hover:text-forest"
      aria-label="Copy link to this event"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07l-1.42 1.41" />
        <path d="M14 11a5 5 0 00-7.07 0l-2.83 2.83a5 5 0 007.07 7.07l1.41-1.41" />
      </svg>
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
