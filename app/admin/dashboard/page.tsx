import type { Metadata } from "next";
import Link from "next/link";
import { readClient } from "@/lib/admin/sanityWrite";
import { navGroups, schemas } from "@/lib/admin/schemas";
import { NAV_ICONS } from "@/lib/admin/navIcons";

export const metadata: Metadata = { title: "Dashboard" };
export const revalidate = 0;

async function getCounts(): Promise<Record<string, number>> {
  const types = navGroups.flatMap((g) => g.items.map((i) => i.key));
  const results = await Promise.all(
    types.map((t) =>
      readClient.fetch<number>(`count(*[_type == $type])`, { type: t }).catch(() => 0)
    )
  );
  return Object.fromEntries(types.map((t, i) => [t, results[i]]));
}

interface RecentDoc {
  _id: string;
  _type: string;
  _updatedAt: string;
  title?: string;
  name?: string;
  value?: string;
  label?: string;
  question?: string;
}

async function getRecentDocs(): Promise<RecentDoc[]> {
  return readClient
    .fetch<RecentDoc[]>(
      `*[!(_type in ["sanity.imageAsset","sanity.fileAsset"])] | order(_updatedAt desc)[0...10] {
        _id, _type, _updatedAt, title, name, value, label, question
      }`
    )
    .catch(() => []);
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

function docTitle(doc: RecentDoc): string {
  return doc.title ?? doc.name ?? doc.value ?? doc.label ?? doc.question ?? "Untitled";
}

// Group colours — bar = Tailwind class, accent = hex for dot/badge
const GROUP_CONFIG: Record<string, { bar: string; accent: string; iconBg: string; iconFg: string }> = {
  Homepage:            { bar: "bg-[#4a5840]", accent: "#4a5840", iconBg: "bg-[#4a5840]/[0.1]",  iconFg: "text-[#4a5840]" },
  About:               { bar: "bg-[#3a5870]", accent: "#3a5870", iconBg: "bg-[#3a5870]/[0.1]",  iconFg: "text-[#3a5870]" },
  Services:            { bar: "bg-[#7a5020]", accent: "#7a5020", iconBg: "bg-[#7a5020]/[0.1]",  iconFg: "text-[#7a5020]" },
  Programs:            { bar: "bg-[#5a487a]", accent: "#5a487a", iconBg: "bg-[#5a487a]/[0.1]",  iconFg: "text-[#5a487a]" },
  "Speaking & Events": { bar: "bg-[#2a6b5a]", accent: "#2a6b5a", iconBg: "bg-[#2a6b5a]/[0.1]",  iconFg: "text-[#2a6b5a]" },
  Journal:             { bar: "bg-[#7a4848]", accent: "#7a4848", iconBg: "bg-[#7a4848]/[0.1]",  iconFg: "text-[#7a4848]" },
};

// Which group does a _type belong to?
function groupForType(type: string): string {
  for (const g of navGroups) {
    if (g.items.some((i) => i.key === type)) return g.group;
  }
  return "Homepage";
}

const highlights = [
  { key: "article",     label: "Articles",     subLabel: "Journal" },
  { key: "event",       label: "Events",       subLabel: "Speaking & Events" },
  { key: "package",     label: "Programs",     subLabel: "Programs" },
  { key: "testimonial", label: "Testimonials", subLabel: "Homepage" },
];

const quickCreate = [
  { key: "article",     label: "Article" },
  { key: "event",       label: "Event" },
  { key: "testimonial", label: "Testimonial" },
];

function NavIcon({ d, className = "" }: { d?: string; className?: string }) {
  if (!d) return null;
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}

export default async function DashboardPage() {
  const [counts, recentDocs] = await Promise.all([getCounts(), getRecentDocs()]);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#f2f4f0]">

      {/* ── Hero header ── */}
      <div className="relative overflow-hidden bg-[#1a2318] px-6 pb-8 pt-7 lg:px-8">
        {/* Ambient decoration */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 opacity-[0.045]"
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
        >
          <circle cx="200" cy="120" r="140" stroke="white" strokeWidth="1.5" />
          <circle cx="240" cy="180" r="90"  stroke="white" strokeWidth="1.5" />
          <circle cx="170" cy="220" r="55"  stroke="white" strokeWidth="1.5" />
        </svg>

        {/* Date */}
        <p className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">
          {today}
        </p>

        {/* Title row */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-[2rem] font-semibold leading-tight text-white">
              Content Studio
            </h1>
            <p className="mt-1 text-sm text-white/40">
              {total} item{total !== 1 ? "s" : ""} across {navGroups.length} sections
            </p>
          </div>
          {/* Quick-create */}
          <div className="flex flex-wrap items-center gap-2">
            {quickCreate.map(({ key, label }) => (
              <Link
                key={key}
                href={`/admin/${key}/new`}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-xs font-semibold text-white/70 transition hover:bg-white/15 hover:text-white"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Embedded stat tiles ── */}
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {highlights.map(({ key, label, subLabel }) => {
            const cfg = GROUP_CONFIG[subLabel] ?? GROUP_CONFIG["Homepage"];
            return (
              <Link
                key={key}
                href={`/admin/${key}`}
                className="group flex flex-col rounded-xl border border-white/[0.1] bg-white/[0.07] px-4 py-3.5 transition hover:border-white/20 hover:bg-white/[0.12]"
              >
                <div className="mb-2.5 flex items-center justify-between">
                  <NavIcon d={NAV_ICONS[key]} className="text-white/35 transition group-hover:text-white/55" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/25 transition group-hover:text-white/40">
                    {label}
                  </span>
                </div>
                <p className="font-serif text-[2.1rem] font-bold leading-none text-white tabular-nums">
                  {counts[key] ?? 0}
                </p>
                <p className="mt-2 text-[11px] text-white/30 transition group-hover:text-white/50">
                  View all →
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="p-5 lg:p-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_288px]">

          {/* ── Section groups ── */}
          <div className="space-y-8">
            {navGroups.map((group) => {
              const cfg = GROUP_CONFIG[group.group] ?? GROUP_CONFIG["Homepage"];
              const groupTotal = group.items.reduce((s, { key }) => s + (counts[key] ?? 0), 0);

              return (
                <div key={group.group}>
                  {/* Group header */}
                  <div className="mb-3.5 flex items-center gap-2.5">
                    <div className={`h-[3px] w-5 rounded-full ${cfg.bar}`} />
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5a6b6b]">
                      {group.group}
                    </h2>
                    <div className="h-px flex-1 bg-[#dde8dd]" />
                    <span className="text-[10px] tabular-nums text-[#9ab0a8]">
                      {groupTotal} item{groupTotal !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-3">
                    {group.items.map(({ key, label }) => {
                      const count = counts[key] ?? 0;
                      return (
                        <Link
                          key={key}
                          href={`/admin/${key}`}
                          className="group relative flex flex-col overflow-hidden rounded-xl border border-[#dde8dd] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c4d8c4] hover:shadow-md"
                        >
                          {/* Hover accent line */}
                          <div className={`absolute inset-x-0 top-0 h-[3px] ${cfg.bar} scale-x-0 transition-transform duration-200 group-hover:scale-x-100`} />

                          {/* Icon badge */}
                          <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${cfg.iconBg}`}>
                            <NavIcon d={NAV_ICONS[key]} className={cfg.iconFg} />
                          </div>

                          {/* Count */}
                          <span className={`font-serif text-[2.2rem] font-bold leading-none tabular-nums ${count === 0 ? "text-[#c4d4c4]" : "text-[#1a2318]"}`}>
                            {count}
                          </span>

                          {/* Label */}
                          <span className="mt-2 text-sm font-medium leading-snug text-[#4a5840]">
                            {label}
                          </span>

                          {/* CTA */}
                          <span className="mt-auto pt-3 text-[11px] text-[#9ab0a8] transition-colors group-hover:text-[#4a5840]">
                            {count === 0 ? "Create first →" : "Manage →"}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Recently Updated panel ── */}
          <div className="xl:sticky xl:top-6 xl:self-start">
            <div className="overflow-hidden rounded-2xl border border-[#dde8dd] bg-white shadow-sm">
              {/* Panel header */}
              <div className="flex items-center gap-2 border-b border-[#eef2ee] px-5 py-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#9ab0a8]">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a8f7a]">
                  Recently Updated
                </h2>
              </div>

              {recentDocs.length === 0 ? (
                <p className="px-5 py-8 text-sm text-[#a0b4a0]">No content yet.</p>
              ) : (
                <ul>
                  {recentDocs.map((doc, i) => {
                    const sectionKey = Object.keys(schemas).find(
                      (k) => schemas[k].type === doc._type
                    );
                    const sectionLabel = sectionKey ? schemas[sectionKey].label : doc._type;
                    const href = sectionKey ? `/admin/${sectionKey}/${doc._id}` : "#";
                    const group = groupForType(doc._type);
                    const cfg = GROUP_CONFIG[group] ?? GROUP_CONFIG["Homepage"];

                    return (
                      <li key={doc._id} className={i > 0 ? "border-t border-[#f2f5f2]" : ""}>
                        <Link
                          href={href}
                          className="group flex items-start gap-3 px-5 py-3 transition hover:bg-[#f8faf6]"
                        >
                          {/* Colour dot */}
                          <span
                            className="mt-[5px] flex-shrink-0 h-2 w-2 rounded-full"
                            style={{ backgroundColor: cfg.accent }}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-medium text-[#2a3535] group-hover:text-[#1a2318]">
                              {docTitle(doc)}
                            </p>
                            <div className="mt-0.5 flex items-center gap-1.5">
                              <span className="rounded bg-[#eef2ee] px-1.5 py-0.5 text-[10px] font-semibold text-[#6a8268]">
                                {sectionLabel}
                              </span>
                              <span className="text-[11px] tabular-nums text-[#a0b4a0]">
                                {formatRelative(doc._updatedAt)}
                              </span>
                            </div>
                          </div>
                          <svg className="mt-1 flex-shrink-0 text-[#c4d8c4] transition group-hover:text-[#4a5840]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Quick-navigate panel */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#dde8dd] bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-[#eef2ee] px-5 py-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#9ab0a8]">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a8f7a]">
                  Quick Create
                </h2>
              </div>
              <div className="divide-y divide-[#f2f5f2]">
                {quickCreate.map(({ key, label }) => {
                  const sectionKey = key;
                  const group = groupForType(sectionKey);
                  const cfg = GROUP_CONFIG[group] ?? GROUP_CONFIG["Homepage"];
                  return (
                    <Link
                      key={key}
                      href={`/admin/${key}/new`}
                      className="group flex items-center gap-3 px-5 py-3 transition hover:bg-[#f8faf6]"
                    >
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${cfg.iconBg}`}>
                        <NavIcon d={NAV_ICONS[key]} className={`${cfg.iconFg} opacity-80`} />
                      </div>
                      <span className="text-[13px] font-medium text-[#3a4a3a]">New {label}</span>
                      <svg className="ml-auto text-[#c4d8c4] transition group-hover:text-[#4a5840]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
