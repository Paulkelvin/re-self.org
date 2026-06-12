"use client";

import { useState } from "react";

const initial = { fullName: "", email: "", organization: "", message: "", website: "" };

export function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(name: string, value: string) {
    setForm((c) => ({ ...c, [name]: value }));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: "n/a",
      organization: form.organization || "n/a",
      eventType: "General Inquiry",
      eventDate: "TBD",
      eventLocation: "TBD",
      audienceSize: "n/a",
      budgetRange: "Not sure yet",
      details: form.message,
      website: form.website,
    };

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok) {
      setStatus("success");
      setMessage("Message received. Sonya will be in touch shortly.");
      setForm(initial);
      return;
    }

    setStatus("error");
    setMessage(result.error ?? "Something went wrong. Please email hello@re-self.org.");
  }

  return (
    <form onSubmit={submit} className="relative grid gap-4 rounded-xl border border-line bg-white p-8 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="cf-name" className="text-xs font-extrabold uppercase tracking-wider text-pine">
            Full Name
          </label>
          <input
            id="cf-name"
            name="fullName"
            value={form.fullName}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className="rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink placeholder-muted/50 transition-colors focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
            placeholder="Your name"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="cf-email" className="text-xs font-extrabold uppercase tracking-wider text-pine">
            Email Address
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className="rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink placeholder-muted/50 transition-colors focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="cf-org" className="text-xs font-extrabold uppercase tracking-wider text-pine">
          Organization <span className="font-normal normal-case tracking-normal text-muted">(optional)</span>
        </label>
        <input
          id="cf-org"
          name="organization"
          value={form.organization}
          onChange={(e) => update(e.target.name, e.target.value)}
          className="rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink placeholder-muted/50 transition-colors focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
          placeholder="Company or organization"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="cf-message" className="text-xs font-extrabold uppercase tracking-wider text-pine">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          value={form.message}
          onChange={(e) => update(e.target.name, e.target.value)}
          required
          rows={5}
          className="resize-y rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink placeholder-muted/50 transition-colors focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
          placeholder="Tell Sonya what you have in mind…"
        />
      </div>

      {/* Honeypot */}
      <div className="absolute left-[-10000px]" aria-hidden="true">
        <input
          name="website"
          value={form.website}
          tabIndex={-1}
          autoComplete="off"
          onChange={(e) => update(e.target.name, e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex min-h-[50px] items-center justify-center rounded-lg bg-pine px-6 text-sm font-extrabold text-white shadow-sm transition-all hover:-translate-y-px hover:bg-pine/90 hover:shadow-md disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      {message && (
        <p
          className={`text-sm font-bold ${
            status === "success" ? "text-green-700" : "text-red-700"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
