"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface Principle {
  title: string;
  affirmations: string[];
}

export function AffirmationsAccordion({ items }: { items: Principle[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="divide-y divide-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-all duration-300"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs tracking-widest text-sage">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-base font-semibold transition-colors duration-300 ${
                    isOpen ? "text-forest" : "text-charcoal group-hover:text-forest"
                  }`}
                >
                  {item.title}
                </span>
              </div>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-forest/10 text-forest transition-all duration-300 ${
                  isOpen ? "rotate-45 border-forest/20 bg-forest/[0.04]" : "group-hover:border-forest/20"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="mb-6 ml-10 space-y-2.5 border-l border-sage/30 pl-5">
                    {item.affirmations.map((line, j) => (
                      <li key={j} className="text-sm leading-relaxed text-muted">
                        {line}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
