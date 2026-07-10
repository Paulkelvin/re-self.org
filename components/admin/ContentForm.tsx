"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { type SectionDef, type FieldDef } from "@/lib/admin/schemas";
import { ImageField } from "./ImageField";
import { RichTextField } from "./RichTextField";
import { ConfirmDialog } from "./ConfirmDialog";

interface Props {
  sectionDef: SectionDef;
  section: string;
  initialData?: Record<string, unknown>;
  docId?: string;
  isNew: boolean;
  authorOptions?: { _id: string; name: string }[];
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function inputCls(error = false) {
  return `w-full rounded-lg border ${
    error ? "border-red-400 bg-red-50/40" : "border-[#c4d4d0] bg-white"
  } px-3 py-2.5 text-sm text-[#2a3535] placeholder-[#9ab0aa] outline-none transition focus:border-[#5e6d52] focus:ring-2 focus:ring-[#5e6d52]/10`;
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#3d4b35]">
      <span className="block h-3 w-[2px] flex-shrink-0 rounded-full bg-[#4a5840]/55" aria-hidden="true" />
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
  );
}

export function ContentForm({
  sectionDef,
  section,
  initialData,
  docId,
  isNew,
  authorOptions,
}: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<Record<string, unknown>>(() => {
    if (isNew) {
      const defaults: Record<string, unknown> = {};
      for (const field of sectionDef.fields) {
        if (field.initialValue !== undefined) {
          defaults[field.name] = field.initialValue;
        }
      }
      return { ...defaults, ...(initialData ?? {}) };
    }
    return initialData ?? {};
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Baseline tracks what was last saved — isDirty = form !== baseline
  const [baseline, setBaseline] = useState<Record<string, unknown>>(initialData ?? {});
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  // Derive isDirty on every render
  const isDirty = (() => {
    if (isNew) {
      return Object.values(form).some(
        (v) =>
          v !== undefined &&
          v !== null &&
          v !== "" &&
          !(Array.isArray(v) && v.length === 0)
      );
    }
    return sectionDef.fields.some((f) => {
      const curr = form[f.name];
      const orig = (baseline as Record<string, unknown>)[f.name];
      return JSON.stringify(curr ?? null) !== JSON.stringify(orig ?? null);
    });
  })();

  // Protect against browser tab-close / hard-refresh when dirty
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  // Intercept in-app link clicks when dirty (capture phase)
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http")) return;
      e.preventDefault();
      e.stopPropagation();
      setPendingHref(href);
      setShowLeaveDialog(true);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [isDirty]);

  // ⌘S / Ctrl+S keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  function set(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    for (const field of sectionDef.fields) {
      if (field.required) {
        const val = form[field.name];
        if (val === undefined || val === null || val === "") {
          errs[field.name] = `${field.label} is required`;
        } else if (
          field.type === "array-strings" &&
          Array.isArray(val) &&
          val.length === 0
        ) {
          errs[field.name] = `Add at least one ${field.label}`;
        }
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function buildPayload() {
    const payload: Record<string, unknown> = {};
    for (const field of sectionDef.fields) {
      const val = form[field.name];
      if (val === undefined) continue;
      if (field.type === "slug") {
        payload[field.name] = { _type: "slug", current: val };
      } else if (field.type === "reference" && val) {
        payload[field.name] = { _type: "reference", _ref: val };
      } else {
        payload[field.name] = val;
      }
    }
    return payload;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    const payload = buildPayload();

    if (isNew) {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: sectionDef.type, data: payload }),
      });
      if (res.ok) {
        toast.success("Created successfully");
        router.push(`/admin/${section}`);
        router.refresh();
      } else {
        const d = await res.json().catch(() => ({}));
        toast.error(d.error ?? "Failed to create");
      }
    } else {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: docId, data: payload }),
      });
      if (res.ok) {
        toast.success("Saved");
        setBaseline(JSON.parse(JSON.stringify(form)));
        router.refresh();
      } else {
        const d = await res.json().catch(() => ({}));
        toast.error(d.error ?? "Failed to save");
      }
    }

    setSaving(false);
  }

  function handleCancel() {
    if (isDirty) {
      setPendingHref(`/admin/${section}`);
      setShowLeaveDialog(true);
    } else {
      router.push(`/admin/${section}`);
    }
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="space-y-7">
          {sectionDef.fields.map((field) => (
            <FieldRenderer
              key={field.name}
              field={field}
              value={form[field.name]}
              error={errors[field.name]}
              onChange={(val) => set(field.name, val)}
              allValues={form}
              setAll={set}
              authorOptions={authorOptions}
            />
          ))}
        </div>

        {hasErrors && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-xs font-semibold text-red-700">
              Please fix {Object.keys(errors).length} error
              {Object.keys(errors).length !== 1 ? "s" : ""} before saving.
            </p>
          </div>
        )}

        {/* Fixed save bar */}
        <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center gap-3 border-t border-[#dde8dd] bg-white/95 px-6 py-3 backdrop-blur-sm lg:left-60">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[#4a5840] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3d4b35] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <>
                <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                </svg>
                Saving…
              </>
            ) : isNew ? (
              "Create"
            ) : (
              "Save Changes"
            )}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-[#c4d4d0] px-5 py-2.5 text-sm font-medium text-[#4a5840] transition hover:bg-[#f4f7f4]"
          >
            Cancel
          </button>

          {isDirty && !saving && (
            <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-amber-600">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Unsaved changes
            </span>
          )}
        </div>
      </form>

      {/* Leave-page confirmation */}
      <ConfirmDialog
        open={showLeaveDialog}
        title="Leave without saving?"
        description="You have unsaved changes. If you leave now, they will be lost."
        confirmLabel="Leave"
        onConfirm={() => {
          setShowLeaveDialog(false);
          if (pendingHref) router.push(pendingHref);
        }}
        onCancel={() => {
          setShowLeaveDialog(false);
          setPendingHref(null);
        }}
      />
    </>
  );
}

// ── Individual field renderer ────────────────────────────────────
interface FieldProps {
  field: FieldDef;
  value: unknown;
  error?: string;
  onChange: (val: unknown) => void;
  allValues: Record<string, unknown>;
  setAll: (field: string, val: unknown) => void;
  authorOptions?: { _id: string; name: string }[];
}

function FieldRenderer({
  field,
  value,
  error,
  onChange,
  allValues,
  authorOptions,
}: FieldProps) {
  const { label, type, required, options, placeholder, rows, objectFields, objectType, refType, description } = field;

  const helpText = description ? (
    <p className="mt-1 text-xs text-[#8fa89f]">{description}</p>
  ) : null;

  if (type === "image") {
    return (
      <ImageField
        label={label}
        value={value as Parameters<typeof ImageField>[0]["value"]}
        onChange={onChange as (val: unknown) => void}
        required={required}
      />
    );
  }

  if (type === "portable-text") {
    return (
      <RichTextField
        label={label}
        value={value as unknown[]}
        onChange={onChange}
        required={required}
      />
    );
  }

  if (type === "array-strings") {
    return (
      <ArrayStringsField
        label={label}
        value={Array.isArray(value) ? (value as string[]) : []}
        onChange={onChange}
        required={required}
        error={error}
        description={description}
      />
    );
  }

  if (type === "array-objects" && objectFields) {
    return (
      <ArrayObjectsField
        label={label}
        value={Array.isArray(value) ? (value as Record<string, unknown>[]) : []}
        onChange={onChange}
        objectFields={objectFields}
        objectType={objectType}
      />
    );
  }

  if (type === "boolean") {
    return (
      <div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={!!value}
            onClick={() => onChange(!value)}
            className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
              value ? "bg-[#5e6d52]" : "bg-[#c4d4d0]"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                value ? "left-0.5 translate-x-5" : "left-0.5"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-[#2a3535]">{label}</span>
        </div>
        {helpText}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        <FieldLabel required={required}>{label}</FieldLabel>
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
          className={inputCls(!!error)}
        >
          <option value="">Select…</option>
          {(options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {helpText}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "reference" && refType === "author") {
    return (
      <div>
        <FieldLabel required={required}>{label}</FieldLabel>
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
          className={inputCls(!!error)}
        >
          <option value="">Select author…</option>
          {(authorOptions ?? []).map((a) => (
            <option key={a._id} value={a._id}>
              {a.name}
            </option>
          ))}
        </select>
        {helpText}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "slug") {
    const currentSlug =
      typeof value === "object" && value !== null
        ? (value as { current?: string }).current ?? ""
        : (value as string) ?? "";
    return (
      <div>
        <FieldLabel required={required}>{label}</FieldLabel>
        <div className="flex gap-2">
          <input
            type="text"
            value={currentSlug}
            onChange={(e) => onChange(e.target.value)}
            placeholder="url-friendly-slug"
            className={inputCls(!!error) + " font-mono text-xs"}
          />
          <button
            type="button"
            onClick={() => {
              const titleField = field.autoFrom ?? "title";
              const titleVal = allValues[titleField] as string | undefined;
              if (titleVal) onChange(slugify(titleVal));
            }}
            className="whitespace-nowrap rounded-lg border border-[#c4d4d0] px-3 text-xs font-semibold text-[#4a5840] transition hover:bg-[#f4f7f4]"
          >
            Auto-fill
          </button>
        </div>
        {helpText}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "text") {
    return (
      <div>
        <FieldLabel required={required}>{label}</FieldLabel>
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows ?? 4}
          className={inputCls(!!error) + " resize-y"}
        />
        {helpText}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "number") {
    return (
      <div>
        <FieldLabel required={required}>{label}</FieldLabel>
        <input
          type="number"
          inputMode="numeric"
          value={(value as number) ?? ""}
          onChange={(e) =>
            onChange(e.target.value === "" ? undefined : Number(e.target.value))
          }
          placeholder={placeholder}
          className={inputCls(!!error)}
        />
        {helpText}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "date") {
    return (
      <div>
        <FieldLabel required={required}>{label}</FieldLabel>
        <input
          type="date"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
          className={inputCls(!!error)}
        />
        {helpText}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "datetime") {
    const isoToLocal = (iso?: string) => (iso ? iso.slice(0, 16) : "");
    return (
      <div>
        <FieldLabel required={required}>{label}</FieldLabel>
        <input
          type="datetime-local"
          value={isoToLocal(value as string)}
          onChange={(e) =>
            onChange(e.target.value ? new Date(e.target.value).toISOString() : undefined)
          }
          className={inputCls(!!error)}
        />
        {helpText}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "url") {
    return (
      <div>
        <FieldLabel required={required}>{label}</FieldLabel>
        <input
          type="url"
          inputMode="url"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
          placeholder={placeholder ?? "https://…"}
          className={inputCls(!!error)}
        />
        {helpText}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  // Default: string
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        type="text"
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputCls(!!error)}
      />
      {helpText}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ── Array of strings ─────────────────────────────────────────────
function ArrayStringsField({
  label,
  value,
  onChange,
  required,
  error,
  description,
}: {
  label: string;
  value: string[];
  onChange: (v: unknown) => void;
  required?: boolean;
  error?: string;
  description?: string;
}) {
  function update(idx: number, val: string) {
    const next = [...value];
    next[idx] = val;
    onChange(next);
  }
  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }
  function add() {
    onChange([...value, ""]);
  }

  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="space-y-2">
        {value.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => update(idx, e.target.value)}
              className={inputCls()}
              placeholder={`Item ${idx + 1}`}
            />
            <button
              type="button"
              onClick={() => remove(idx)}
              aria-label="Remove"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-1.5 rounded-lg border border-dashed border-[#5e6d52] px-4 py-2 text-sm font-medium text-[#5e6d52] transition hover:bg-[#f4f7f4]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add item
        </button>
      </div>
      {description && <p className="mt-1 text-xs text-[#8fa89f]">{description}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ── Array of objects (e.g. speakers) ────────────────────────────
function ArrayObjectsField({
  label,
  value,
  onChange,
  objectFields,
  objectType,
}: {
  label: string;
  value: Record<string, unknown>[];
  onChange: (v: unknown) => void;
  objectFields: FieldDef[];
  objectType?: string;
}) {
  function update(idx: number, field: string, val: unknown) {
    const next = value.map((item, i) =>
      i === idx ? { ...item, [field]: val } : item
    );
    onChange(next);
  }
  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }
  function add() {
    const base: Record<string, unknown> = { _key: crypto.randomUUID() };
    if (objectType) base._type = objectType;
    onChange([...value, base]);
  }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="space-y-3">
        {value.map((item, idx) => (
          <div
            key={(item._key as string) ?? idx}
            className="rounded-xl border border-[#dde8dd] bg-[#f9fbf9] p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8fa89f]">
                #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-xs font-medium text-red-500 transition hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {objectFields.map((f) => (
                <div key={f.name} className={f.type === "image" ? "sm:col-span-2" : ""}>
                  {f.type === "image" ? (
                    <ImageField
                      label={f.label}
                      value={item[f.name] as Parameters<typeof ImageField>[0]["value"]}
                      onChange={(val) => update(idx, f.name, val)}
                    />
                  ) : (
                    <div>
                      <FieldLabel>{f.label}</FieldLabel>
                      <input
                        type="text"
                        value={(item[f.name] as string) ?? ""}
                        onChange={(e) => update(idx, f.name, e.target.value)}
                        placeholder={f.placeholder}
                        className={inputCls()}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-1.5 rounded-lg border border-dashed border-[#5e6d52] px-4 py-2 text-sm font-medium text-[#5e6d52] transition hover:bg-[#f4f7f4]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add {label.replace(/s$/, "").toLowerCase()}
        </button>
      </div>
    </div>
  );
}
