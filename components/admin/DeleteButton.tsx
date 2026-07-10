"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmDialog } from "./ConfirmDialog";

export function DeleteButtonClient({ id, itemLabel }: { id: string; itemLabel?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleDelete() {
    setShowConfirm(false);
    setLoading(true);
    const res = await fetch(`/api/admin/content?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Deleted");
      router.refresh();
    } else {
      toast.error("Delete failed. Please try again.");
    }
    setLoading(false);
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-40"
      >
        {loading ? "…" : "Delete"}
      </button>

      <ConfirmDialog
        open={showConfirm}
        title="Delete this item?"
        description={
          itemLabel
            ? `"${itemLabel}" will be permanently deleted and cannot be recovered.`
            : "This item will be permanently deleted and cannot be recovered."
        }
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
