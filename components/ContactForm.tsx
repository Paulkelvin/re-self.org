"use client";

import { useState } from "react";
import { Spinner } from "@/components/Spinner";

const initial = { fullName: "", email: "", organization: "", message: "", website: "" };

const inputCls =
  "w-full rounded-lg border border-line bg-warm-white px-4 py-3 text-sm text-charcoal placeholder-muted/40 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15";

const labelCls = "text-[0.7rem] font-semibold uppercase tracking-wider text-charcoal/70";

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

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json().catch(() => ({}));

    if (res.ok) {
      setStatus("success");
      setMessage("Message received. Sonya will be in touch shortly.");
      setForm(initial);
      return;
    }

    setStatus("error");
    setMessage(result.error ?? "Something went wrong. Please email info@re-self.org.");
  }

  return (
    <form
      onSubmit={submit}
      className="relative grid gap-4 rounded-2xl border border-line bg-white p-8 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="cf-name" className={labelCls}>Full Name</label>
          <input
            id="cf-name"
            name="fullName"
            value={form.fullName}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputCls}
            placeholder="Your name"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="cf-email" className={labelCls}>Email Address</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputCls}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="cf-org" className={labelCls}>
          Organization{" "}
          <span className="font-normal normal-case tracking-normal text-muted">(optional)</span>
        </label>
        <input
          id="cf-org"
          name="organization"
          value={form.organization}
          onChange={(e) => update(e.target.name, e.target.value)}
          className={inputCls}
          placeholder="Company or organization"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="cf-message" className={labelCls}>Message</label>
        <textarea
          id="cf-message"
          name="message"
          value={form.message}
          onChange={(e) => update(e.target.name, e.target.value)}
          required
          rows={5}
          className={`${inputCls} resize-y`}
          placeholder="Tell Sonya what you have in mind…"
        />
      </div>

      {/* Honeypot */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
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
        className="mt-1 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-forest px-7 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-light hover:shadow-md active:scale-[0.98] disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Spinner />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>

      {message && (
        <p
          className={`text-sm font-semibold ${
            status === "success" ? "text-forest" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
