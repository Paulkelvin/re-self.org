import type { Metadata } from "next";
import Link from "next/link";
import { readClient } from "@/lib/admin/sanityWrite";
import { navGroups, schemas } from "@/lib/admin/schemas";

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
      `*[!(_type in ["sanity.imageAsset","sanity.fileAsset"])] | order(_updatedAt desc)[0...8] {
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
  return doc.title ?? doc.name ?? doc.value ?? doc.label ?? doc.question ?? doc._id;
}

const groupAccents: Record<string, { bar: string; text: string }> = {
  Homepage:            { bar: "bg-[#4a5840]", text: "text-[#4a5840]" },
  About:               { bar: "bg-[#3a5870]", text: "text-[#3a5870]" },
  Services:            { bar: "bg-[#7a5020]", text: "text-[#7a5020]" },
  Programs:            { bar: "bg-[#5a487a]", text: "text-[#5a487a]" },
  "Speaking & Events": { bar: "bg-[#2a6b5a]", text: "text-[#2a6b5a]" },
  Journal:             { bar: "bg-[#7a4848]", text: "text-[#7a4848]" },
};

const highlights = [
  { key: "article",     label: "Articles",     icon: "M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" },
  { key: "event",       label: "Events",       icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { key: "package",     label: "Programs",     icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" },
  { key: "testimonial", label: "Testimonials", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
];

const quickCreate = [
  { key: "article",     label: "+ Article" },
  { key: "event",       label: "+ Event" },
  { key: "testimonial", label: "+ Testimonial" },
];

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
    <div className="min-h-screen">
      {/* ── Header band ── */}
      <div className="bg-[#2e3a2a] px-6 py-8 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/35">
              {today}
            </p>
            <h1 className="font-serif text-3xl font-semibold text-white">Dashboard</h1>
            <p className="mt-1.5 text-sm text-white/50">
              {total} content item{total !== 1 ? "s" : ""} across {navGroups.length} sections
            </p>
          </div>
          {/* Quick Create */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {quickCreate.map(({ key, label }) => (
              <Link
                key={key}
                href={`/admin/${key}/new`}
                className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/20 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Highlight stat bar ── */}
      <div className="grid grid-cols-2 border-b border-[#dde8dd] sm:grid-cols-4">
        {highlights.map(({ key, label, icon }, i) => (
          <Link
            key={key}
            href={`/admin/${key}`}
            className={`group flex flex-col gap-1 bg-white px-6 py-5 transition hover:bg-[#f4f7f4] ${
              i < highlights.length - 1 ? "border-r border-[#dde8dd]" : ""
            }`}
          >
            <div className="mb-1 flex items-center gap-2 text-[#8fa89f]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={icon} />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
            </div>
            <p className="font-serif text-4xl font-bold text-[#2e3a2a] tabular-nums leading-none">
              {counts[key] ?? 0}
            </p>
            <p className="mt-1 text-xs text-[#8fa89f] transition-colors group-hover:text-[#5e6d52]">
              View all →
            </p>
          </Link>
        ))}
      </div>

      <div className="p-6 lg:p-8">
        <div className="grid gap-10 xl:grid-cols-[1fr_300px]">
          {/* ── Content sections ── */}
          <div className="space-y-10">
            {navGroups.map((group) => {
              const accent = groupAccents[group.group] ?? groupAccents["Homepage"];
              const groupTotal = group.items.reduce((sum, { key }) => sum + (counts[key] ?? 0), 0);

              return (
                <div key={group.group}>
                  {/* Section header */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`h-4 w-1 flex-shrink-0 rounded-full ${accent.bar}`} />
                    <h2 className={`text-[11px] font-bold uppercase tracking-[0.18em] ${accent.text}`}>
                      {group.group}
                    </h2>
                    <div className="h-px flex-1 bg-[#dde8dd]" />
                    <span className="text-[10px] text-[#8fa89f] tabular-nums">
                      {groupTotal} item{groupTotal !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3">
                    {group.items.map(({ key, label }) => (
                      <Link
                        key={key}
                        href={`/admin/${key}`}
                        className="group relative flex flex-col overflow-hidden rounded-xl border border-[#dde8dd] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#b0c4b0] hover:shadow-md"
                      >
                        <div
                          className={`absolute inset-x-0 top-0 h-0.5 ${accent.bar} opacity-0 transition-opacity group-hover:opacity-100`}
                        />
                        <span className="font-serif text-3xl font-bold leading-none text-[#2e3a2a] tabular-nums">
                          {counts[key] ?? 0}
                        </span>
                        <span className="mt-2.5 text-sm font-medium leading-snug text-[#4a5840]">
                          {label}
                        </span>
                        <span className="mt-auto pt-3 text-xs text-[#8fa89f] transition-colors group-hover:text-[#5e6d52]">
                          Manage →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Recently Updated panel ── */}
          <div className="xl:sticky xl:top-6 xl:self-start">
            <div className="rounded-2xl border border-[#dde8dd] bg-white shadow-sm">
              <div className="border-b border-[#dde8dd] px-5 py-4">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5a6b6b]">
                  Recently Updated
                </h2>
              </div>
              {recentDocs.length === 0 ? (
                <p className="px-5 py-6 text-sm text-[#8fa89f]">No content yet.</p>
              ) : (
                <ul className="divide-y divide-[#f0f4f0]">
                  {recentDocs.map((doc) => {
                    const sectionKey = Object.keys(schemas).find(
                      (k) => schemas[k].type === doc._type
                    );
                    const sectionLabel = sectionKey ? schemas[sectionKey].label : doc._type;
                    const href = sectionKey ? `/admin/${sectionKey}/${doc._id}` : "#";

                    return (
                      <li key={doc._id}>
                        <Link
                          href={href}
                          className="flex items-start gap-3 px-5 py-3.5 transition hover:bg-[#f8faf8]"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[#2e3a2a]">
                              {docTitle(doc)}
                            </p>
                            <div className="mt-0.5 flex items-center gap-2">
                              <span className="rounded bg-[#f0f4f0] px-1.5 py-0.5 text-[10px] font-semibold text-[#6a7d6a]">
                                {sectionLabel}
                              </span>
                              <span className="text-[11px] text-[#a0b4b0]">
                                {formatRelative(doc._updatedAt)}
                              </span>
                            </div>
                          </div>
                          <svg
                            className="mt-1 flex-shrink-0 text-[#c4d4d0]"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
