import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { schemas } from "@/lib/admin/schemas";
import { listDocuments, getImageUrl } from "@/lib/admin/sanityWrite";
import { SectionList } from "@/components/admin/SectionList";

export const revalidate = 0;

interface Props {
  params: Promise<{ section: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const def = schemas[section];
  return { title: def?.label ?? section };
}

function BackLink() {
  return (
    <Link
      href="/admin/dashboard"
      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8fa89f] transition hover:text-[#4a5840]"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
      Dashboard
    </Link>
  );
}

export default async function SectionListPage({ params }: Props) {
  const { section } = await params;
  const def = schemas[section];

  if (!def) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-[#5a6b6b]">Section &ldquo;{section}&rdquo; not found.</p>
        <Link href="/admin/dashboard" className="text-sm font-medium text-[#4a5840] underline underline-offset-2">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (def.singleton) {
    const docs = await listDocuments(def.type);
    const doc = docs[0];
    if (doc?._id) redirect(`/admin/${section}/${doc._id}`);
    return (
      <div className="p-8">
        <BackLink />
        <p className="mb-4 mt-6 text-[#5a6b6b]">No settings document exists yet.</p>
        <Link
          href={`/admin/${section}/new`}
          className="rounded-lg bg-[#4a5840] px-4 py-2 text-sm font-semibold text-white"
        >
          Create
        </Link>
      </div>
    );
  }

  const docs = await listDocuments(def.type);
  const imageField = def.fields.find((f) => f.type === "image")?.name;

  // Pre-compute thumb URLs server-side so the client component stays a pure list
  const thumbUrls: Record<string, string | null> = {};
  if (imageField) {
    for (const doc of docs as Record<string, unknown>[]) {
      const imgVal = doc[imageField] as Parameters<typeof getImageUrl>[0];
      thumbUrls[doc._id as string] = imgVal ? getImageUrl(imgVal) : null;
    }
  }

  return (
    <div className="pb-10">
      {/* Page header */}
      <div className="border-b border-[#dde8dd] bg-white px-6 py-5 lg:px-8">
        <BackLink />
        <div className="mt-4 flex items-end justify-between">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-[#2e3a2a]">{def.label}</h1>
            <p className="mt-0.5 text-sm text-[#5a6b6b]">
              {docs.length} item{docs.length !== 1 ? "s" : ""}
            </p>
          </div>
          {def.canCreate !== false && (
            <Link
              href={`/admin/${section}/new`}
              className="flex items-center gap-1.5 rounded-lg bg-[#4a5840] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3d4b35]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New
            </Link>
          )}
        </div>
      </div>

      {/* List */}
      <div className="px-6 pt-5 lg:px-8">
        <SectionList
          docs={docs as Record<string, unknown>[]}
          def={def}
          section={section}
          thumbUrls={thumbUrls}
        />
      </div>
    </div>
  );
}
