"use client";

import { useState } from "react";
import Link from "next/link";
import { DeleteButtonClient } from "./DeleteButton";
import type { SectionDef } from "@/lib/admin/schemas";

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

interface Props {
  docs: Record<string, unknown>[];
  def: SectionDef;
  section: string;
  thumbUrls: Record<string, string | null>;
}

export function SectionList({ docs, def, section, thumbUrls }: Props) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? docs.filter((d) =>
        String(d[def.titleField] ?? "")
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : docs;

  if (docs.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-[#c4d4d0] py-20 text-center">
        <svg
          className="mx-auto mb-3 h-8 w-8 text-[#b0c4c0]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
        </svg>
        <p className="font-medium text-[#5a6b6b]">No {def.label.toLowerCase()} yet</p>
        {def.canCreate !== false && (
          <Link
            href={`/admin/${section}/new`}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#4a5840] px-4 py-2 text-sm font-semibold text-white"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create first
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#a0b4b0]"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${def.label.toLowerCase()}…`}
          className="w-full rounded-xl border border-[#dde8dd] bg-white py-2.5 pl-9 pr-4 text-sm text-[#2e3a2a] placeholder:text-[#a0b4b0] focus:border-[#4a5840] focus:outline-none focus:ring-2 focus:ring-[#4a5840]/10 sm:max-w-xs"
        />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#c4d4d0] py-12 text-center">
          <p className="text-sm text-[#5a6b6b]">
            No results for &ldquo;{query}&rdquo;
          </p>
          <button
            onClick={() => setQuery("")}
            className="mt-2 text-xs font-medium text-[#4a5840] underline underline-offset-2"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((doc) => {
            const id = doc._id as string;
            const title = (doc[def.titleField] as string) ?? id;
            const thumbUrl = thumbUrls[id] ?? null;
            const updatedAt = doc._updatedAt as string | undefined;

            return (
              <div
                key={id}
                className="flex items-center gap-4 rounded-xl border border-[#dde8dd] bg-white px-4 py-3.5 shadow-sm transition hover:border-[#b0c4b0] hover:shadow-md"
              >
                {thumbUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${thumbUrl}?w=80&h=80&fit=crop&auto=format`}
                    alt=""
                    className="h-11 w-11 flex-shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#f0f4f0] text-[#a0b8b0]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#2a3535]">{title}</p>
                  <div className="mt-0.5 flex items-center gap-2">
                    {typeof doc.subtitle === "string" && (
                      <p className="truncate text-xs text-[#5a6b6b]">{doc.subtitle}</p>
                    )}
                    {updatedAt && (
                      <span className="flex-shrink-0 text-[11px] text-[#a0b4b0]">
                        {formatRelative(updatedAt)}
                      </span>
                    )}
                  </div>
                </div>

                {doc.order !== undefined && (
                  <span className="flex-shrink-0 rounded-md bg-[#f0f4f0] px-2 py-0.5 text-[10px] font-bold tabular-nums text-[#8fa89f]">
                    #{doc.order as number}
                  </span>
                )}

                <div className="flex flex-shrink-0 items-center gap-2">
                  <Link
                    href={`/admin/${section}/${id}`}
                    className="rounded-lg border border-[#c4d4d0] px-3 py-1.5 text-xs font-semibold text-[#4a5840] transition hover:border-[#4a5840] hover:bg-[#4a5840] hover:text-white"
                  >
                    Edit
                  </Link>
                  <DeleteButtonClient id={id} itemLabel={title} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
