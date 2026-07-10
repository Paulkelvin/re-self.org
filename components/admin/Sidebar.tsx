"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { navGroups } from "@/lib/admin/schemas";

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <Image
          src="/reself-logo.png"
          alt="Re-Self"
          width={80}
          height={70}
          className="h-9 w-auto brightness-110"
        />
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-white/90">Re-Self</p>
          <p className="text-[10px] tracking-wider text-white/45">Admin</p>
        </div>
      </div>

      {/* Dashboard link */}
      <div className="px-3 pt-4">
        <Link
          href="/admin/dashboard"
          onClick={onNavigate}
          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            pathname === "/admin/dashboard"
              ? "bg-white/15 text-white"
              : "text-white/65 hover:bg-white/10 hover:text-white"
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
          </svg>
          Dashboard
        </Link>
      </div>

      {/* Content groups */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 pt-2">
        {navGroups.map((group) => (
          <div key={group.group} className="mb-4">
            <p className="px-3 pb-1.5 pt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">
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
                    className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all ${
                      active
                        ? "bg-[#5e6d52] font-medium text-white"
                        : "text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/55 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          {loggingOut ? "Signing out…" : "Sign Out"}
        </button>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Desktop sidebar (always visible lg+) ── */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 bg-[#2e3a2a] lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-[#dde8dd] bg-white px-4 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#c4d4d0] text-[#4a5840] transition hover:bg-[#f4f7f4]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <Image src="/reself-logo.png" alt="Re-Self Admin" width={70} height={60} className="h-7 w-auto" />
        <span className="text-xs font-semibold text-[#4a5840]">Admin</span>
      </header>

      {/* ── Mobile slide-in sidebar ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-[#2e3a2a] lg:hidden">
            <div className="flex h-14 items-center justify-end px-4 border-b border-white/10">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-white/60 hover:text-white transition"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="h-[calc(100%-56px)]">
              <SidebarContent onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </>
      )}
    </>
  );
}
