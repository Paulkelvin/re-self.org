"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Mode = "inquiry" | "booking";

const tabs: { id: Mode; label: string }[] = [
  { id: "inquiry", label: "General Inquiry" },
  { id: "booking", label: "Book a Session" },
];

const inputCls =
  "w-full rounded-none border-b border-neutral-300 bg-transparent px-0 py-2 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none";
const selectCls = `${inputCls} appearance-none pr-6`;
const labelCls = "mb-2 block text-[0.7rem] font-semibold uppercase tracking-wider text-neutral-500";
const pillBtn =
  "ml-auto mt-8 block rounded-full bg-forest px-8 py-3.5 text-xs font-medium tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60";

const inquiryInit = { fullName: "", email: "", message: "", website: "" };
const bookingInit = {
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  eventType: "",
  eventDate: "",
  eventLocation: "",
  details: "",
  website: "",
};

function formatUSPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

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

const panelMotion = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: "easeOut" as const },
};

export function ContactBooking() {
  const [mode, setMode] = useState<Mode>("inquiry");

  // Inquiry state
  const [inquiry, setInquiry] = useState(inquiryInit);

  // Booking state
  const [booking, setBooking] = useState(bookingInit);
  const [step, setStep] = useState<1 | 2>(1);

  // Shared status
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function switchMode(next: Mode) {
    if (next === mode) return;
    setMode(next);
    setStatus("idle");
    setFeedback("");
    setStep(1);
  }

  async function post(payload: Record<string, string>) {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json().catch(() => ({}));
    return { ok: res.ok, error: result.error as string | undefined };
  }

  // ── Inquiry submit ──
  async function submitInquiry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    const { ok, error } = await post({
      fullName: inquiry.fullName,
      email: inquiry.email,
      phone: "n/a",
      organization: "n/a",
      eventType: "General Inquiry",
      eventDate: "TBD",
      eventLocation: "TBD",
      audienceSize: "n/a",
      budgetRange: "Not sure yet",
      details: inquiry.message,
      website: inquiry.website,
    });
    if (ok) {
      setStatus("success");
      setFeedback("Message received. Sonya will be in touch shortly.");
      setInquiry(inquiryInit);
    } else {
      setStatus("error");
      setFeedback(error ?? "Something went wrong. Please email sdharrisla@gmail.com.");
    }
  }

  // ── Booking flow ──
  function bookingNext() {
    const missing = (["fullName", "email", "phone", "organization"] as const).find(
      (f) => !booking[f].trim(),
    );
    if (missing) {
      setFeedback("Please complete your contact details before continuing.");
      document.getElementById(`cb-${missing}`)?.focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
      setFeedback("Please enter a valid email address.");
      return;
    }
    setFeedback("");
    setStep(2);
  }

  async function submitBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    const { ok, error } = await post({
      ...booking,
      audienceSize: "n/a",
      budgetRange: "Not sure yet",
    });
    if (ok) {
      setStatus("success");
      setFeedback("Thank you. Your booking request has been received.");
      setBooking(bookingInit);
      setStep(1);
    } else {
      setStatus("error");
      setFeedback(error ?? "Something went wrong. Please email sdharrisla@gmail.com.");
    }
  }

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-neutral-200/60 bg-white p-8 shadow-sm transition-all duration-300 md:p-12">
      {/* Segmented tab controller */}
      <div className="mx-auto mb-12 flex w-full max-w-md items-center rounded-full bg-neutral-100 p-1.5">
        {tabs.map((t) => {
          const active = mode === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => switchMode(t.id)}
              className="relative flex-1 rounded-full py-2.5 text-sm"
            >
              {active && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors ${
                  active ? "font-medium text-neutral-900" : "font-light text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {mode === "inquiry" ? (
          <motion.form key="inquiry" {...panelMotion} onSubmit={submitInquiry}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <label htmlFor="cb-iname" className={labelCls}>Full Name</label>
                <input
                  id="cb-iname"
                  value={inquiry.fullName}
                  onChange={(e) => setInquiry((c) => ({ ...c, fullName: e.target.value }))}
                  required
                  className={inputCls}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="cb-iemail" className={labelCls}>Email Address</label>
                <input
                  id="cb-iemail"
                  type="email"
                  value={inquiry.email}
                  onChange={(e) => setInquiry((c) => ({ ...c, email: e.target.value }))}
                  required
                  className={inputCls}
                  placeholder="you@company.com"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="cb-imsg" className={labelCls}>Message / Subject</label>
                <textarea
                  id="cb-imsg"
                  value={inquiry.message}
                  onChange={(e) => setInquiry((c) => ({ ...c, message: e.target.value }))}
                  required
                  rows={4}
                  className={`${inputCls} resize-none`}
                  placeholder="Tell Sonya what you have in mind…"
                />
              </div>
            </div>

            {/* Honeypot */}
            <input
              className="absolute left-[-9999px]" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={inquiry.website}
              onChange={(e) => setInquiry((c) => ({ ...c, website: e.target.value }))}
            />

            <button type="submit" disabled={status === "loading"} className={pillBtn}>
              {status === "loading" ? "Sending…" : "Send Message →"}
            </button>
          </motion.form>
        ) : (
          <motion.form key="booking" {...panelMotion} onSubmit={submitBooking}>
            {/* Progress tracker */}
            <div className="relative mb-3 h-[2px] w-full bg-neutral-200">
              <div
                className="absolute inset-y-0 left-0 bg-forest transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>
            <p className="mb-8 text-[0.7rem] font-semibold uppercase tracking-wider text-neutral-500">
              {`0${step}`} / 02 — {step === 1 ? "Your details" : "Event details"}
            </p>

            {step === 1 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <label htmlFor="cb-fullName" className={labelCls}>Full Name</label>
                  <input id="cb-fullName" value={booking.fullName}
                    onChange={(e) => setBooking((c) => ({ ...c, fullName: e.target.value }))}
                    className={inputCls} placeholder="Jane Smith" />
                </div>
                <div>
                  <label htmlFor="cb-email" className={labelCls}>Email Address</label>
                  <input id="cb-email" type="email" value={booking.email}
                    onChange={(e) => setBooking((c) => ({ ...c, email: e.target.value }))}
                    className={inputCls} placeholder="jane@company.com" />
                </div>
                <div>
                  <label htmlFor="cb-phone" className={labelCls}>Phone Number</label>
                  <input id="cb-phone" inputMode="tel" value={booking.phone}
                    onChange={(e) => setBooking((c) => ({ ...c, phone: formatUSPhone(e.target.value) }))}
                    className={inputCls} placeholder="(555) 000-0000" />
                </div>
                <div>
                  <label htmlFor="cb-organization" className={labelCls}>Organization Name</label>
                  <input id="cb-organization" value={booking.organization}
                    onChange={(e) => setBooking((c) => ({ ...c, organization: e.target.value }))}
                    className={inputCls} placeholder="Company name" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <label htmlFor="cb-eventType" className={labelCls}>Event Type</label>
                  <div className="relative">
                    <select id="cb-eventType" value={booking.eventType}
                      onChange={(e) => setBooking((c) => ({ ...c, eventType: e.target.value }))}
                      required className={selectCls}>
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
                <div>
                  <label htmlFor="cb-eventDate" className={labelCls}>Event Date</label>
                  <input id="cb-eventDate" type="date" value={booking.eventDate}
                    onChange={(e) => setBooking((c) => ({ ...c, eventDate: e.target.value }))}
                    required className={inputCls} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="cb-eventLocation" className={labelCls}>Event Location</label>
                  <input id="cb-eventLocation" value={booking.eventLocation}
                    onChange={(e) => setBooking((c) => ({ ...c, eventLocation: e.target.value }))}
                    required className={inputCls} placeholder="City, Country or Virtual" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="cb-details" className={labelCls}>Additional Details</label>
                  <textarea id="cb-details" value={booking.details} rows={3}
                    onChange={(e) => setBooking((c) => ({ ...c, details: e.target.value }))}
                    required className={`${inputCls} resize-none`}
                    placeholder="Describe your event, audience, goals, and any relevant context…" />
                </div>
              </div>
            )}

            {/* Honeypot */}
            <input
              className="absolute left-[-9999px]" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={booking.website}
              onChange={(e) => setBooking((c) => ({ ...c, website: e.target.value }))}
            />

            {step === 1 ? (
              <button type="button" onClick={bookingNext} className={pillBtn}>
                Continue to Step 2 →
              </button>
            ) : (
              <div className="mt-8 flex items-center justify-between gap-4">
                <button type="button" onClick={() => { setStep(1); setFeedback(""); }}
                  className="text-xs font-medium uppercase tracking-wide text-neutral-500 transition-colors hover:text-neutral-900">
                  ← Back
                </button>
                <button type="submit" disabled={status === "loading"}
                  className="rounded-full bg-forest px-8 py-3.5 text-xs font-medium tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60">
                  {status === "loading" ? "Sending…" : "Request Booking →"}
                </button>
              </div>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      {feedback && (
        <p className={`mt-6 text-sm font-medium ${status === "success" ? "text-forest" : "text-red-600"}`}>
          {feedback}
        </p>
      )}
    </div>
  );
}
