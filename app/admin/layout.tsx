import type { Metadata } from "next";
import { Toaster } from "sonner";
import { AdminSidebar } from "@/components/admin/Sidebar";

export const metadata: Metadata = {
  title: { template: "%s | Re-Self Admin", default: "Re-Self Admin" },
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f7f4]">
      <AdminSidebar />
      <main className="pt-14 lg:ml-60 lg:pt-0 min-h-screen">
        {children}
      </main>
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}
