"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string | null;
  section: string;
  sectionLabel: string;
}

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      if (dialog.open) dialog.close();
      setQuery("");
      setResults([]);
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const handle = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        setResults(data.results ?? []);
        setActiveIndex(0);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => clearTimeout(handle);
  }, [query]);

  const goTo = useCallback(
    (result: SearchResult) => {
      onClose();
      router.push(`/admin/${result.section}/${result.id}`);
    },
    [onClose, router],
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = results[activeIndex];
      if (chosen) goTo(chosen);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => { if (e.target === dialogRef.current) onClose(); }}
      onClose={onClose}
      className="w-full max-w-lg rounded-2xl border border-[#dde8dd] bg-white p-0 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-[#eef2ee] px-4 py-3.5">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 text-[#8fa89f]">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search all content…"
          className="w-full text-sm text-[#2e3a2a] placeholder:text-[#a0b4b0] focus:outline-none"
        />
        <kbd className="hidden flex-shrink-0 rounded border border-[#dde8dd] bg-[#f4f7f4] px-1.5 py-0.5 text-[10px] font-semibold text-[#8fa89f] sm:block">
          Esc
        </kbd>
      </div>

      <div className="max-h-[60vh] overflow-y-auto">
        {loading && (
          <p className="px-5 py-8 text-center text-sm text-[#a0b4a0]">Searching…</p>
        )}

        {!loading && query.trim().length >= 2 && results.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-[#a0b4a0]">
            No results for &ldquo;{query}&rdquo;
          </p>
        )}

        {!loading && query.trim().length < 2 && (
          <p className="px-5 py-8 text-center text-sm text-[#a0b4a0]">
            Type at least 2 characters to search across every section.
          </p>
        )}

        {!loading && results.length > 0 && (
          <ul className="py-2">
            {results.map((r, i) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => goTo(r)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition ${
                    i === activeIndex ? "bg-[#f4f7f4]" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#2a3535]">{r.title}</p>
                    {r.subtitle && (
                      <p className="truncate text-xs text-[#8fa89f]">{r.subtitle}</p>
                    )}
                  </div>
                  <span className="flex-shrink-0 rounded-md bg-[#eef2ee] px-2 py-0.5 text-[10px] font-semibold text-[#6a8268]">
                    {r.sectionLabel}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  );
}
