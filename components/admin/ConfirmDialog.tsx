"use client";

import { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  destructive = false,
  onConfirm,
  onCancel,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      // Delay focus so the dialog is visible first
      requestAnimationFrame(() => cancelRef.current?.focus());
    } else {
      if (dialog.open) dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => { if (e.target === dialogRef.current) onCancel(); }}
      onClose={onCancel}
      className="w-full max-w-sm rounded-2xl border border-[#dde8dd] bg-white p-6 shadow-xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      {/* Warning icon */}
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full ${destructive ? "bg-red-50" : "bg-amber-50"}`}>
        <svg
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={destructive ? "#dc2626" : "#d97706"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>

      <h2 className="font-serif text-lg font-semibold text-[#2e3a2a]">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#5a6b6b]">{description}</p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          ref={cancelRef}
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-[#c4d4d0] px-4 py-2 text-sm font-medium text-[#4a5840] transition hover:bg-[#f4f7f4]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
            destructive
              ? "bg-red-600 hover:bg-red-700"
              : "bg-[#4a5840] hover:bg-[#3d4b35]"
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
