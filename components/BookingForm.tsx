"use client";

import { useState } from "react";
import { Spinner } from "@/components/Spinner";

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
  "w-full rounded-none border-b border-neutral-300 bg-transparent px-0 py-3 text-sm text-neutral-800 placeholder-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none";

const selectCls = `${inputCls} appearance-none pr-6`;

const labelCls = "text-[0.7rem] font-semibold uppercase tracking-wider text-charcoal/70";

function SelectChevron() {
  return (
    <svg
      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400"
      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function formatUSPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const step1Fields = ["fullName", "email", "phone", "organization"] as const;

export function BookingForm() {
  const [form, setForm] = useState(initial);
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(name: string, value: string) {
    setForm((c) => ({ ...c, [name]: value }));
  }

  function handlePhone(value: string) {
    setForm((c) => ({ ...c, phone: formatUSPhone(value) }));
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
      <div className="relative mb-12 h-[2px] w-full bg-neutral-200">
        <div
          className="absolute inset-y-0 left-0 bg-neutral-900 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

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
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => handlePhone(e.target.value)}
                  className={inputCls}
                  placeholder="(555) 000-0000"
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
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-forest px-7 text-sm font-semibold text-white shadow-sm shadow-forest/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-light hover:shadow-md active:scale-[0.98]"
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
                <label htmlFor="bf-eventType" className={labelCls}>Engagement Type</label>
                <div className="relative">
                  <select
                    id="bf-eventType"
                    name="eventType"
                    value={form.eventType}
                    onChange={(e) => update(e.target.name, e.target.value)}
                    required
                    className={selectCls}
                  >
                    <option value="">Select one</option>
                    <optgroup label="Speaking &amp; Events">
                      <option>Keynote</option>
                      <option>Workshop or Seminar</option>
                      <option>Retreat Facilitation</option>
                      <option>Panel or Podcast</option>
                    </optgroup>
                    <optgroup label="Programs">
                      <option>Introductory Self-Care Workshop</option>
                      <option>Four-Week Self-Care Cohort</option>
                      <option>Individual Self-Care Coaching</option>
                      <option>Corporate Panel Discussion</option>
                    </optgroup>
                    <optgroup label="Other">
                      <option>Corporate Wellness Program</option>
                      <option>Custom Engagement</option>
                    </optgroup>
                  </select>
                  <SelectChevron />
                </div>
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="bf-eventDate" className={labelCls}>Preferred Date</label>
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
                <label htmlFor="bf-eventLocation" className={labelCls}>Location</label>
                <input
                  id="bf-eventLocation"
                  name="eventLocation"
                  value={form.eventLocation}
                  onChange={(e) => update(e.target.name, e.target.value)}
                  required
                  className={inputCls}
                  placeholder="City, State or Virtual"
                />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="bf-audienceSize" className={labelCls}>Audience Size</label>
                <input
                  id="bf-audienceSize"
                  name="audienceSize"
                  inputMode="numeric"
                  value={form.audienceSize}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    update("audienceSize", val);
                  }}
                  required
                  className={inputCls}
                  placeholder="e.g. 50"
                />
              </div>

              <div className="grid gap-1.5 col-span-2">
                <label htmlFor="bf-budgetRange" className={labelCls}>Budget Range</label>
                <div className="relative">
                  <select
                    id="bf-budgetRange"
                    name="budgetRange"
                    value={form.budgetRange}
                    onChange={(e) => update(e.target.name, e.target.value)}
                    required
                    className={selectCls}
                  >
                    <option value="">Select one</option>
                    <option>Under $500</option>
                    <option>$500 – $1,000</option>
                    <option>$1,000 – $5,000</option>
                    <option>$5,000 – $10,000</option>
                    <option>$10,000+</option>
                    <option>Not sure yet</option>
                  </select>
                  <SelectChevron />
                </div>
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
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-forest px-7 text-sm font-semibold text-white shadow-sm shadow-forest/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-light hover:shadow-md active:scale-[0.98] disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Spinner />
                    Sending…
                  </>
                ) : (
                  "Request Booking"
                )}
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
