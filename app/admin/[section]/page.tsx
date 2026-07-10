import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { schemas } from "@/lib/admin/schemas";
import { listDocuments, getImageUrl } from "@/lib/admin/sanityWrite";
import { DeleteButtonClient } from "@/components/admin/DeleteButton";

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
        {docs.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-[#c4d4d0] py-20 text-center">
            <svg className="mx-auto mb-3 h-8 w-8 text-[#b0c4c0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
            </svg>
            <p className="font-medium text-[#5a6b6b]">No {def.label.toLowerCase()} yet</p>
            {def.canCreate !== false && (
              <Link
                href={`/admin/${section}/new`}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#4a5840] px-4 py-2 text-sm font-semibold text-white"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create first
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {(docs as Record<string, unknown>[]).map((doc) => {
              const id = doc._id as string;
              const title = (doc[def.titleField] as string) ?? id;
              const imgVal = imageField
                ? (doc[imageField] as Parameters<typeof getImageUrl>[0])
                : null;
              const thumbUrl = imgVal ? getImageUrl(imgVal) : null;

              return (
                <div
                  key={id}
                  className="flex items-center gap-4 rounded-xl border border-[#dde8dd] bg-white px-4 py-3.5 shadow-sm transition hover:border-[#b0c4b0] hover:shadow-md"
                >
                  {thumbUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`${thumbUrl}?w=80&h=80&fit=crop&auto=format`}
                      alt=""
                      className="h-11 w-11 flex-shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#f0f4f0] text-[#a0b8b0]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#2a3535]">{title}</p>
                    {typeof doc.subtitle === "string" && (
                      <p className="truncate text-xs text-[#5a6b6b]">{doc.subtitle}</p>
                    )}
                  </div>

                  {doc.order !== undefined && (
                    <span className="flex-shrink-0 rounded-md bg-[#f0f4f0] px-2 py-0.5 text-[10px] font-bold tabular-nums text-[#8fa89f]">
                      #{doc.order as number}
                    </span>
                  )}

                  <div className="flex flex-shrink-0 items-center gap-2">
                    <Link
                      href={`/admin/${section}/${id}`}
                      className="rounded-lg border border-[#c4d4d0] px-3 py-1.5 text-xs font-semibold text-[#4a5840] transition hover:border-[#4a5840] hover:bg-[#4a5840] hover:text-white"
                    >
                      Edit
                    </Link>
                    <DeleteButtonClient id={id} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
