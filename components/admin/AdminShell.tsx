"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "./Sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <>
      <AdminSidebar />
      <main className="pt-14 lg:ml-60 lg:pt-0 min-h-screen">{children}</main>
    </>
  );
}
