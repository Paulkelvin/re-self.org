"use client";

import { useState } from "react";

const initial = {
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  eventType: "",
  eventDate: "",
  eventLocation: "",
  audienceSize: "",
  budgetRange: "",
  details: "",
  website: "",
};

const inputClass =
  "w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink placeholder-muted/50 transition-colors focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20";

const labelClass = "text-xs font-extrabold uppercase tracking-wider text-pine";

export function BookingForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(name: string, value: string) {
    setForm((c) => ({ ...c, [name]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok) {
      setStatus("success");
      setMessage(
        "Thank you. Your booking request has been received, and a confirmation email is on its way.",
      );
      setForm(initial);
      return;
    }

    setStatus("error");
    setMessage(result.error ?? "Something went wrong. Please email bookings@re-self.org.");
  }

  return (
    <form
      onSubmit={submit}
      className="relative grid gap-5 rounded-2xl border border-line bg-white p-8 shadow-sm"
    >
      <p className="text-[0.68rem] font-extrabold uppercase tracking-widest text-coral">
        Booking Request
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="fullName" className={labelClass}>Full Name</label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputClass}
            placeholder="Jane Smith"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="email" className={labelClass}>Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputClass}
            placeholder="jane@company.com"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="phone" className={labelClass}>Phone Number</label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputClass}
            placeholder="+1 555 000 0000"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="organization" className={labelClass}>Organization</label>
          <input
            id="organization"
            name="organization"
            value={form.organization}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputClass}
            placeholder="Company name"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="eventType" className={labelClass}>Event Type</label>
          <select
            id="eventType"
            name="eventType"
            value={form.eventType}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputClass}
          >
            <option value="">Select one</option>
            <option>Keynote</option>
            <option>Workshop or Seminar</option>
            <option>Corporate Wellness Program</option>
            <option>Retreat Facilitation</option>
            <option>Panel or Podcast</option>
          </select>
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="eventDate" className={labelClass}>Event Date</label>
          <input
            id="eventDate"
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="eventLocation" className={labelClass}>Event Location</label>
          <input
            id="eventLocation"
            name="eventLocation"
            value={form.eventLocation}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputClass}
            placeholder="City, Country or Virtual"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="audienceSize" className={labelClass}>Estimated Audience Size</label>
          <input
            id="audienceSize"
            name="audienceSize"
            value={form.audienceSize}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputClass}
            placeholder="e.g. 50–100"
          />
        </div>

        <div className="grid gap-1.5 sm:col-span-2">
          <label htmlFor="budgetRange" className={labelClass}>Budget Range</label>
          <select
            id="budgetRange"
            name="budgetRange"
            value={form.budgetRange}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputClass}
          >
            <option value="">Select one</option>
            <option>Under $5,000</option>
            <option>$5,000 – $10,000</option>
            <option>$10,000 – $20,000</option>
            <option>$20,000+</option>
            <option>Not sure yet</option>
          </select>
        </div>

        <div className="grid gap-1.5 sm:col-span-2">
          <label htmlFor="details" className={labelClass}>Additional Details</label>
          <textarea
            id="details"
            name="details"
            value={form.details}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            rows={5}
            className={`${inputClass} resize-y`}
            placeholder="Describe your event, audience, goals, and any other relevant context…"
          />
        </div>
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
        className="mt-1 inline-flex min-h-[52px] items-center justify-center rounded-lg bg-coral px-7 text-sm font-extrabold text-white shadow-sm shadow-coral/20 transition-all hover:-translate-y-px hover:shadow-md hover:shadow-coral/30 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Submit Booking Request"}
      </button>

      {message && (
        <p className={`text-sm font-bold ${status === "success" ? "text-green-700" : "text-red-700"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
