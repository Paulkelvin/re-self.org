"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect password. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/reself-logo.png"
            alt="Re-Self"
            width={140}
            height={120}
            className="h-16 w-auto"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-black/[0.06] border border-[#dde8dd] p-8">
          <h1 className="font-serif text-2xl font-semibold text-[#4a5840] mb-1">
            Admin Login
          </h1>
          <p className="text-sm text-[#5a6b6b] mb-8">
            Sign in to manage your site content.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5840] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your admin password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-[#c4d4d0] bg-[#f9fbf9] px-4 py-3 text-sm text-[#2a3535] placeholder-[#9ab0aa] outline-none transition focus:border-[#5e6d52] focus:ring-2 focus:ring-[#5e6d52]/10"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-lg bg-[#4a5840] py-3 text-sm font-semibold text-white transition hover:bg-[#3d4b35] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#8fa89f]">
          Re-Self Admin — restricted access
        </p>
      </div>
    </div>
  );
}
