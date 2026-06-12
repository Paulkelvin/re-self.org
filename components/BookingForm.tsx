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
  "w-full rounded-lg border border-line bg-warm-white px-4 py-2.5 text-sm text-charcoal placeholder-muted/40 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15";

const labelCls = "text-[0.7rem] font-semibold uppercase tracking-wider text-charcoal/70";

// Fields that must be filled before advancing to step 2.
const step1Fields = ["fullName", "email", "phone", "organization"] as const;

export function BookingForm() {
  const [form, setForm] = useState(initial);
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(name: string, value: string) {
    setForm((c) => ({ ...c, [name]: value }));
  }

  function goNext() {
    const firstEmpty = step1Fields.find((f) => !form[f].trim());
    if (firstEmpty) {
      setMessage("Please complete your contact details before continuing.");
      document.getElementById(`bf-${firstEmpty}`)?.focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMessage("Please enter a valid email address.");
      document.getElementById("bf-email")?.focus();
      return;
    }
    setMessage("");
    setStep(2);
  }

  function goBack() {
    setMessage("");
    setStep(1);
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
      setStep(1);
      return;
    }

    setStatus("error");
    setMessage(result.error ?? "Something went wrong. Please email bookings@re-self.org.");
  }

  return (
    <form
      onSubmit={submit}
      className="relative overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-sm lg:p-9"
    >
      {/* Header + step tracker */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-sage">
            Booking Request
          </p>
          <p className="mt-1 text-sm font-medium text-charcoal/70">
            {step === 1 ? "Step 1 of 2 — Your details" : "Step 2 of 2 — Event details"}
          </p>
        </div>
        <span className="font-serif text-2xl font-bold text-line">
          0{step}
          <span className="text-base text-line/70">/02</span>
        </span>
      </div>

      {/* Thin progress track */}
      <div className="mb-7 h-[2px] w-full overflow-hidden rounded-full bg-line/60">
        <div
          className="h-full rounded-full bg-forest transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      {/* Slide viewport — both slides live in a 200%-wide track that slides horizontally,
          so the card boundary height stays stable across steps. */}
      <div className="overflow-hidden">
        <div
          className="flex w-[200%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: step === 1 ? "translateX(0)" : "translateX(-50%)" }}
        >
          {/* ── Slide 1: Primary Contacts ── */}
          <div className="w-1/2 pr-1" aria-hidden={step !== 1}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="bf-fullName" className={labelCls}>Full Name</label>
                <input
                  id="bf-fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={(e) => update(e.target.name, e.target.value)}
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
                  className={inputCls}
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={goNext}
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-forest px-7 text-sm font-semibold text-white shadow-sm shadow-forest/20 transition-all hover:-translate-y-px hover:bg-forest-light hover:shadow-md"
              >
                Continue
                <svg
                  width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Slide 2: Event Details ── */}
          <div className="w-1/2 pl-1" aria-hidden={step !== 2}>
            <div className="grid grid-cols-2 gap-4">
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
                <label htmlFor="bf-audienceSize" className={labelCls}>Audience Size</label>
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

              <div className="grid gap-1.5 col-span-2">
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

              <div className="grid gap-1.5 col-span-2">
                <label htmlFor="bf-details" className={labelCls}>Additional Details</label>
                <textarea
                  id="bf-details"
                  name="details"
                  value={form.details}
                  onChange={(e) => update(e.target.name, e.target.value)}
                  required
                  rows={3}
                  className={`${inputCls} resize-none`}
                  placeholder="Describe your event, audience, goals, and any relevant context…"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={goBack}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-forest"
              >
                <svg
                  width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                >
                  <path d="M12 7H2M6 3L2 7l4 4" />
                </svg>
                Back
              </button>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-forest px-7 text-sm font-semibold text-white shadow-sm shadow-forest/20 transition-all hover:-translate-y-px hover:bg-forest-light hover:shadow-md disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Request Booking"}
              </button>
            </div>
          </div>
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

      {message && (
        <p
          className={`mt-5 text-sm font-semibold ${
            status === "success" ? "text-forest" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
