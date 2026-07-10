import type { Metadata } from "next";
import Link from "next/link";
import { readClient } from "@/lib/admin/sanityWrite";
import { navGroups } from "@/lib/admin/schemas";

export const metadata: Metadata = { title: "Dashboard" };
export const revalidate = 0;

async function getCounts(): Promise<Record<string, number>> {
  const types = navGroups.flatMap((g) => g.items.map((i) => i.key));
  const results = await Promise.all(
    types.map((t) =>
      readClient
        .fetch<number>(`count(*[_type == $type])`, { type: t })
        .catch(() => 0)
    )
  );
  return Object.fromEntries(types.map((t, i) => [t, results[i]]));
}

export default async function DashboardPage() {
  const counts = await getCounts();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-[#4a5840]">Dashboard</h1>
        <p className="mt-1 text-sm text-[#5a6b6b]">
          {total} total content items across all sections
        </p>
      </div>

      {/* Section groups */}
      <div className="space-y-8">
        {navGroups.map((group) => (
          <div key={group.group}>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#8fa89f]">
              {group.group}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.items.map(({ key, label }) => (
                <Link
                  key={key}
                  href={`/admin/${key}`}
                  className="group flex flex-col gap-3 rounded-xl border border-[#dde8dd] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#5e6d52]/40 hover:shadow-md"
                >
                  <span className="text-sm font-semibold text-[#2e3a2a]">{label}</span>
                  <span className="font-serif text-2xl font-bold text-[#5e6d52] tabular-nums">
                    {counts[key] ?? 0}
                  </span>
                  <span className="mt-auto text-xs text-[#8fa89f] group-hover:text-[#5e6d52] transition-colors">
                    Manage →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
