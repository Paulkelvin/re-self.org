"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/admin/sanityWrite";

interface ImageValue {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
}

interface Props {
  label: string;
  value: ImageValue | null | undefined;
  onChange: (val: ImageValue | null) => void;
  required?: boolean;
}

export function ImageField({ label, value, onChange, required }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const currentUrl = getImageUrl(value);

  const MAX_FILE_SIZE = 4 * 1024 * 1024; // Vercel serverless requests are capped around 4.5MB

  async function handleFile(file: File) {
    setError("");

    if (file.size > MAX_FILE_SIZE) {
      setError(
        `That image is ${(file.size / (1024 * 1024)).toFixed(1)}MB — please use one under 4MB (try compressing or resizing it first).`,
      );
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => null);

      if (res.ok && data) {
        onChange(data.assetRef as ImageValue);
      } else {
        setError(data?.error ?? "Upload failed — please try again.");
      }
    } catch {
      setError("Upload failed — check your connection and try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#4a5840]">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="relative cursor-pointer rounded-xl border-2 border-dashed border-[#c4d4d0] bg-[#f9fbf9] transition hover:border-[#5e6d52] hover:bg-[#f4f7f4] min-h-[140px] flex items-center justify-center overflow-hidden"
      >
        {currentUrl ? (
          <div className="group/img relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUrl + "?w=600&auto=format"}
              alt="Preview"
              className="w-full max-h-52 rounded-xl object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 transition group-hover/img:bg-black/40">
              <span className="text-sm font-semibold text-white opacity-0 transition group-hover/img:opacity-100">
                Click to replace
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-8 text-[#8fa89f]">
            {uploading ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                </svg>
                <span className="text-sm">Uploading…</span>
              </>
            ) : (
              <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-sm text-[#5a6b6b]">Click or drag to upload image</span>
                <span className="text-xs text-[#8fa89f]">JPG, PNG, WebP, GIF</span>
              </>
            )}
          </div>
        )}
      </div>

      {currentUrl && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onChange(null); }}
          className="mt-2 text-xs text-red-500 hover:text-red-700 transition"
        >
          Remove image
        </button>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
