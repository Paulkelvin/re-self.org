"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { navGroups } from "@/lib/admin/schemas";
import { NAV_ICONS } from "@/lib/admin/navIcons";

function NavIcon({ d }: { d?: string }) {
  if (!d) return null;
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d={d} />
    </svg>
  );
}

function SidebarContent({ onNavigate, onOpenSearch }: { onNavigate?: () => void; onOpenSearch?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  const dashActive = pathname === "/admin/dashboard";

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-[18px]">
        <Image
          src="/reself-logo.png"
          alt="Re-Self"
          width={80}
          height={70}
          className="h-8 w-auto brightness-110"
        />
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-white">Re-Self</p>
          <p className="text-[10px] tracking-wider text-white/40">Content Studio</p>
        </div>
      </div>

      {/* Search trigger */}
      <div className="px-3 pt-4">
        <button
          type="button"
          onClick={() => { onOpenSearch?.(); onNavigate?.(); }}
          className="flex w-full items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/50 transition hover:bg-white/10 hover:text-white/80"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          Search content…
          <kbd className="ml-auto hidden rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold text-white/40 sm:block">
            &#8984;K
          </kbd>
        </button>
      </div>

      {/* Dashboard link */}
      <div className="px-3 pt-4">
        <Link
          href="/admin/dashboard"
          onClick={onNavigate}
          aria-current={dashActive ? "page" : undefined}
          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            dashActive
              ? "bg-white/15 text-white shadow-[inset_2px_0_0_rgba(255,255,255,0.4)]"
              : "text-white/55 hover:bg-white/8 hover:text-white/80"
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Dashboard
        </Link>
      </div>

      {/* Content groups */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 pt-2" aria-label="Content sections">
        {navGroups.map((group) => (
          <div key={group.group} className="mb-3">
            <p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/28">
              {group.group}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ key, label }) => {
                const href = `/admin/${key}`;
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={key}
                    href={href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-[7px] text-sm transition-all ${
                      active
                        ? "bg-white/14 font-medium text-white shadow-[inset_2px_0_0_rgba(255,255,255,0.35)]"
                        : "text-white/52 hover:bg-white/7 hover:text-white/75"
                    }`}
                  >
                    <NavIcon d={NAV_ICONS[key]} />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-white/10 p-3 space-y-0.5">
        <a
          href="https://re-self.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/45 transition hover:bg-white/8 hover:text-white/70"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0">
            <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
          </svg>
          View Site
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="ml-auto flex-shrink-0 opacity-50">
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/45 transition hover:bg-white/8 hover:text-white/70 disabled:opacity-40"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          {loggingOut ? "Signing out…" : "Sign Out"}
        </button>
      </div>
    </div>
  );
}

export function AdminSidebar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-[#1e2a1a] lg:flex">
        <SidebarContent onOpenSearch={onOpenSearch} />
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-[#dde8dd] bg-white px-4 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#c4d4d0] text-[#4a5840] transition hover:bg-[#f4f7f4]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <Image src="/reself-logo.png" alt="Re-Self Admin" width={70} height={60} className="h-7 w-auto flex-shrink-0" />
        <span className="truncate text-xs font-semibold text-[#4a5840]">Content Studio</span>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            aria-label="Search content"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#c4d4d0] text-[#4a5840] transition hover:bg-[#f4f7f4]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          <a
            href="https://re-self.org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View live site"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#c4d4d0] text-[#4a5840] transition hover:bg-[#f4f7f4]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
            </svg>
          </a>
        </div>
      </header>

      {/* ── Mobile backdrop ── */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/50 lg:hidden transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      {/* ── Mobile drawer ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1e2a1a] lg:hidden transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-white/10">
          <span className="text-xs font-semibold text-white/60">Menu</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="h-[calc(100%-56px)]">
          <SidebarContent onNavigate={() => setOpen(false)} onOpenSearch={onOpenSearch} />
        </div>
      </aside>
    </>
  );
}
