import type { Metadata } from "next";
import { Toaster } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: { template: "%s | Re-Self Admin", default: "Re-Self Admin" },
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f7f4]">
      <AdminShell>{children}</AdminShell>
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}
