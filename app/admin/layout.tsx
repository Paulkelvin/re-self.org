import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/Sidebar";

export const metadata: Metadata = {
  title: { template: "%s | Re-Self Admin", default: "Re-Self Admin" },
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f7f4]">
      <AdminSidebar />
      <main className="ml-60 min-h-screen">
        {children}
      </main>
    </div>
  );
}
