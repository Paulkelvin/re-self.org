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

const inputCls =
  "w-full rounded-lg border border-line bg-warm-white px-4 py-3 text-sm text-charcoal placeholder-muted/40 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15";

const labelCls = "text-[0.7rem] font-semibold uppercase tracking-wider text-charcoal/70";

export function BookingForm() {
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

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await res.json().catch(() => ({}));

    if (res.ok) {
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
      className="relative grid gap-5 rounded-2xl border border-line bg-white p-8 shadow-sm lg:p-10"
    >
      <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-sage">
        Booking Request
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="bf-fullName" className={labelCls}>Full Name</label>
          <input
            id="bf-fullName"
            name="fullName"
            value={form.fullName}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputCls}
            placeholder="Jane Smith"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="bf-email" className={labelCls}>Email Address</label>
          <input
            id="bf-email"
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputCls}
            placeholder="jane@company.com"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="bf-phone" className={labelCls}>Phone Number</label>
          <input
            id="bf-phone"
            name="phone"
            value={form.phone}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputCls}
            placeholder="+1 555 000 0000"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="bf-organization" className={labelCls}>Organization</label>
          <input
            id="bf-organization"
            name="organization"
            value={form.organization}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputCls}
            placeholder="Company name"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="bf-eventType" className={labelCls}>Event Type</label>
          <select
            id="bf-eventType"
            name="eventType"
            value={form.eventType}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputCls}
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
          <label htmlFor="bf-eventDate" className={labelCls}>Event Date</label>
          <input
            id="bf-eventDate"
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputCls}
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="bf-eventLocation" className={labelCls}>Event Location</label>
          <input
            id="bf-eventLocation"
            name="eventLocation"
            value={form.eventLocation}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputCls}
            placeholder="City, Country or Virtual"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="bf-audienceSize" className={labelCls}>Estimated Audience Size</label>
          <input
            id="bf-audienceSize"
            name="audienceSize"
            value={form.audienceSize}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputCls}
            placeholder="e.g. 50–100"
          />
        </div>

        <div className="grid gap-1.5 sm:col-span-2">
          <label htmlFor="bf-budgetRange" className={labelCls}>Budget Range</label>
          <select
            id="bf-budgetRange"
            name="budgetRange"
            value={form.budgetRange}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            className={inputCls}
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
          <label htmlFor="bf-details" className={labelCls}>Additional Details</label>
          <textarea
            id="bf-details"
            name="details"
            value={form.details}
            onChange={(e) => update(e.target.name, e.target.value)}
            required
            rows={5}
            className={`${inputCls} resize-y`}
            placeholder="Describe your event, audience, goals, and any relevant context…"
          />
        </div>
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
        className="mt-1 inline-flex min-h-[52px] items-center justify-center rounded-lg bg-forest px-8 text-sm font-semibold text-white shadow-sm shadow-forest/20 transition-all hover:-translate-y-px hover:bg-forest-light hover:shadow-md disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Request Booking"}
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
