"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type SectionDef, type FieldDef } from "@/lib/admin/schemas";
import { ImageField } from "./ImageField";
import { RichTextField } from "./RichTextField";

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
  return `w-full rounded-lg border ${error ? "border-red-400" : "border-[#c4d4d0]"} bg-[#f9fbf9] px-3 py-2.5 text-sm text-[#2a3535] placeholder-[#9ab0aa] outline-none transition focus:border-[#5e6d52] focus:ring-2 focus:ring-[#5e6d52]/10`;
}

function labelCls() {
  return "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#4a5840]";
}

export function ContentForm({ sectionDef, section, initialData, docId, isNew, authorOptions }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Record<string, unknown>>(initialData ?? {});
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function set(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    for (const field of sectionDef.fields) {
      if (field.required) {
        const val = form[field.name];
        if (val === undefined || val === null || val === "") {
          errs[field.name] = `${field.label} is required`;
        } else if (field.type === "array-strings" && Array.isArray(val) && val.length === 0) {
          errs[field.name] = `Add at least one ${field.label}`;
        }
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setSaved(false);

    const payload = buildPayload();

    if (isNew) {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: sectionDef.type, data: payload }),
      });
      if (res.ok) {
        router.push(`/admin/${section}`);
        router.refresh();
      } else {
        const d = await res.json();
        alert(d.error ?? "Failed to save");
      }
    } else {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: docId, data: payload }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        router.refresh();
      } else {
        const d = await res.json();
        alert(d.error ?? "Failed to save");
      }
    }

    setSaving(false);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="flex items-center gap-3 border-t border-[#dde8dd] pt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#4a5840] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3d4b35] disabled:opacity-50"
        >
          {saving ? "Saving…" : isNew ? "Create" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push(`/admin/${section}`)}
          className="rounded-lg border border-[#c4d4d0] px-6 py-2.5 text-sm font-medium text-[#4a5840] transition hover:bg-[#f4f7f4]"
        >
          Cancel
        </button>
        {saved && (
          <span className="text-sm font-medium text-[#5e6d52]">✓ Saved</span>
        )}
      </div>
    </form>
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

function FieldRenderer({ field, value, error, onChange, allValues, setAll, authorOptions }: FieldProps) {
  const { name, label, type, required, options, placeholder, rows, objectFields, refType } = field;

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
      />
    );
  }

  if (type === "boolean") {
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={!!value}
          onClick={() => onChange(!value)}
          className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-[#5e6d52]" : "bg-[#c4d4d0]"}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5.5 left-0.5" : "left-0.5"}`}
          />
        </button>
        <label className="text-sm font-medium text-[#2a3535]">{label}</label>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        <label className={labelCls()}>
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
          className={inputCls(!!error)}
        >
          <option value="">Select…</option>
          {(options ?? []).map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "reference" && refType === "author") {
    return (
      <div>
        <label className={labelCls()}>
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
          className={inputCls(!!error)}
        >
          <option value="">Select author…</option>
          {(authorOptions ?? []).map((a) => (
            <option key={a._id} value={a._id}>{a.name}</option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "slug") {
    const currentSlug = typeof value === "object" && value !== null
      ? (value as { current?: string }).current ?? ""
      : (value as string) ?? "";
    return (
      <div>
        <label className={labelCls()}>
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={currentSlug}
            onChange={(e) => onChange(e.target.value)}
            placeholder="url-friendly-slug"
            className={inputCls(!!error) + " font-mono"}
          />
          <button
            type="button"
            onClick={() => {
              const titleField = field.autoFrom ?? "title";
              const titleVal = allValues[titleField] as string | undefined;
              if (titleVal) onChange(slugify(titleVal));
            }}
            className="whitespace-nowrap rounded-lg border border-[#c4d4d0] px-3 text-xs font-medium text-[#4a5840] transition hover:bg-[#f4f7f4]"
          >
            Auto-fill
          </button>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "text") {
    return (
      <div>
        <label className={labelCls()}>
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows ?? 4}
          className={inputCls(!!error) + " resize-y"}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "number") {
    return (
      <div>
        <label className={labelCls()}>
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <input
          type="number"
          value={(value as number) ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))}
          placeholder={placeholder}
          className={inputCls(!!error)}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "date") {
    return (
      <div>
        <label className={labelCls()}>
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <input
          type="date"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
          className={inputCls(!!error)}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "datetime") {
    const isoToLocal = (iso?: string) => {
      if (!iso) return "";
      return iso.slice(0, 16);
    };
    return (
      <div>
        <label className={labelCls()}>
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <input
          type="datetime-local"
          value={isoToLocal(value as string)}
          onChange={(e) => onChange(e.target.value ? new Date(e.target.value).toISOString() : undefined)}
          className={inputCls(!!error)}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === "url") {
    return (
      <div>
        <label className={labelCls()}>
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <input
          type="url"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
          placeholder={placeholder ?? "https://…"}
          className={inputCls(!!error)}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  // Default: string
  return (
    <div>
      <label className={labelCls()}>
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type="text"
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputCls(!!error)}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ── Array of strings ─────────────────────────────────────────────
function ArrayStringsField({ label, value, onChange, required, error }: {
  label: string; value: string[]; onChange: (v: unknown) => void; required?: boolean; error?: string;
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
      <label className={labelCls()}>
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
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
              className="rounded-lg border border-red-200 px-3 text-red-500 hover:bg-red-50 transition text-lg leading-none"
              aria-label="Remove"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={add}
          className="mt-1 rounded-lg border border-dashed border-[#5e6d52] px-4 py-2 text-sm font-medium text-[#5e6d52] transition hover:bg-[#f4f7f4]"
        >
          + Add item
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ── Array of objects (e.g. speakers) ────────────────────────────
function ArrayObjectsField({ label, value, onChange, objectFields }: {
  label: string;
  value: Record<string, unknown>[];
  onChange: (v: unknown) => void;
  objectFields: FieldDef[];
}) {
  function update(idx: number, field: string, val: unknown) {
    const next = value.map((item, i) => i === idx ? { ...item, [field]: val } : item);
    onChange(next);
  }
  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }
  function add() {
    onChange([...value, { _key: crypto.randomUUID() }]);
  }

  return (
    <div>
      <label className={labelCls()}>{label}</label>
      <div className="space-y-4">
        {value.map((item, idx) => (
          <div key={(item._key as string) ?? idx} className="rounded-xl border border-[#dde8dd] bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#4a5840] uppercase tracking-wider">
                #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-xs text-red-500 hover:text-red-700 transition"
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
                      <label className={labelCls()}>{f.label}</label>
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
          className="rounded-lg border border-dashed border-[#5e6d52] px-4 py-2 text-sm font-medium text-[#5e6d52] transition hover:bg-[#f4f7f4]"
        >
          + Add {label.replace(/s$/, "").toLowerCase()}
        </button>
      </div>
    </div>
  );
}
