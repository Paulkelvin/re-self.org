"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { navGroups } from "@/lib/admin/schemas";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <aside className="flex h-screen w-60 flex-col bg-[#2e3a2a] text-white fixed left-0 top-0 z-40 overflow-y-auto">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <Image
          src="/reself-logo.png"
          alt="Re-Self"
          width={80}
          height={70}
          className="h-9 w-auto brightness-110"
        />
        <div>
          <p className="text-xs font-bold tracking-wider text-white/90 uppercase">Re-Self</p>
          <p className="text-[10px] text-white/45 tracking-wider">Admin</p>
        </div>
      </div>

      {/* Dashboard link */}
      <div className="px-3 pt-4">
        <Link
          href="/admin/dashboard"
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
      <nav className="flex-1 px-3 pb-4 pt-2">
        {navGroups.map((group) => (
          <div key={group.group} className="mb-4">
            <p className="px-3 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">
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
                    className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all ${
                      active
                        ? "bg-[#5e6d52] text-white font-medium"
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
    </aside>
  );
}
