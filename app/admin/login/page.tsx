"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f2f4f0] px-4">
      {/* Ambient background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="absolute -left-32 -top-32 h-[500px] w-[500px] opacity-[0.04]" viewBox="0 0 500 500">
          <circle cx="250" cy="250" r="250" fill="#4a5840" />
        </svg>
        <svg className="absolute -bottom-40 -right-40 h-[600px] w-[600px] opacity-[0.03]" viewBox="0 0 600 600">
          <circle cx="300" cy="300" r="300" fill="#4a5840" />
        </svg>
        <svg className="absolute left-1/2 top-1/4 h-[300px] w-[300px] -translate-x-1/2 opacity-[0.02]" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="150" fill="#4a5840" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo + brand */}
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/reself-logo.png"
            alt="Re-Self"
            width={140}
            height={120}
            className="h-16 w-auto"
            priority
          />
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4a5840]/40">
            Content Studio
          </p>
        </div>

        {/* Login card */}
        <div className="overflow-hidden rounded-2xl border border-[#dde8dd] bg-white shadow-xl shadow-black/[0.08]">
          <div className="h-[3px] bg-gradient-to-r from-[#4a5840] to-[#6b8560]" />
          <div className="px-8 py-10">
            <h1 className="font-serif text-2xl font-semibold text-[#2e3a2a]">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-[#5a6b6b]">
              Sign in to manage your site content.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#3d4b35]">
                  <span className="block h-3 w-[2px] flex-shrink-0 rounded-full bg-[#4a5840]/55" aria-hidden="true" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your admin password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-lg border border-[#c4d4d0] bg-white px-4 py-3 pr-11 text-sm text-[#2a3535] placeholder-[#9ab0aa] outline-none transition focus:border-[#5e6d52] focus:ring-2 focus:ring-[#5e6d52]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ab0aa] transition hover:text-[#4a5840]"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50/80 px-4 py-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-red-500" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4a5840] py-3 text-sm font-semibold text-white transition hover:bg-[#3d4b35] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="h-px w-12 bg-[#4a5840]/10" />
          <p className="text-[11px] tracking-wide text-[#8fa89f]">
            Re-Self Admin &mdash; restricted access
          </p>
        </div>
      </div>
    </div>
  );
}
