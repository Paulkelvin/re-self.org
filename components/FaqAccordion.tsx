"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-line">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-forest"
            aria-expanded={open === i}
          >
            <span className="text-base font-semibold text-charcoal">{item.question}</span>
            <span
              className={`shrink-0 text-forest transition-transform duration-300 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 4V16M4 10H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              open === i ? "max-h-96 pb-5" : "max-h-0"
            }`}
          >
            <p className="text-sm leading-relaxed text-muted">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
