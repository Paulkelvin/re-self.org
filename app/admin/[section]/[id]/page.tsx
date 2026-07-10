import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { schemas } from "@/lib/admin/schemas";
import { getDocument, listDocuments } from "@/lib/admin/sanityWrite";
import { ContentForm } from "@/components/admin/ContentForm";

export const revalidate = 0;

interface Props {
  params: Promise<{ section: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const def = schemas[section];
  return { title: `Edit ${def?.label ?? section}` };
}

export default async function EditDocumentPage({ params }: Props) {
  const { section, id } = await params;
  const def = schemas[section];

  if (!def) return notFound();

  const doc = await getDocument(id);
  if (!doc) return notFound();

  let authorOptions: { _id: string; name: string }[] = [];
  if (def.fields.some((f) => f.type === "reference" && f.refType === "author")) {
    const authors = await listDocuments("author");
    authorOptions = (authors as { _id: string; name: string }[]).map((a) => ({
      _id: a._id,
      name: a.name,
    }));
  }

  const initialData: Record<string, unknown> = {};
  for (const field of def.fields) {
    const raw = (doc as Record<string, unknown>)[field.name];
    if (raw === undefined || raw === null) continue;

    if (field.type === "slug") {
      initialData[field.name] = (raw as { current?: string }).current ?? raw;
    } else if (field.type === "reference") {
      initialData[field.name] = (raw as { _ref?: string })._ref ?? raw;
    } else {
      initialData[field.name] = raw;
    }
  }

  // Singletons don't have a meaningful title field — use the section label
  const docTitle = def.singleton
    ? def.label.replace(/s$/, "")
    : (initialData[def.titleField] as string) ?? "Untitled";

  const publicUrl =
    def.publicPath && initialData.slug
      ? `${def.publicPath}/${initialData.slug as string}`
      : null;

  return (
    <div className="pb-28">
      {/* Page header */}
      <div className="border-b border-[#dde8dd] bg-white px-6 py-5 lg:px-8">
        <Link
          href={`/admin/${section}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8fa89f] transition hover:text-[#4a5840]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          {def.label}
        </Link>
        <div className="mt-3">
          <span className="mb-1.5 inline-block rounded-full bg-[#4a5840]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#4a5840]">
            {def.label.replace(/s$/, "")}
          </span>
          <div className="mt-1 flex items-center gap-3">
          <h1 className="font-serif text-2xl font-semibold text-[#2e3a2a]">
            {docTitle}
          </h1>
          {publicUrl && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View on site"
              className="flex items-center gap-1 rounded-lg border border-[#c4d4d0] px-2.5 py-1.5 text-xs font-medium text-[#4a5840] transition hover:border-[#4a5840] hover:bg-[#4a5840] hover:text-white"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              View on site
            </a>
          )}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 pt-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-[#dde8dd] bg-white shadow-sm">
            <div className="h-[3px] bg-gradient-to-r from-[#4a5840] to-[#6b8560]" />
            <div className="p-6 lg:p-8">
              <ContentForm
                sectionDef={def}
                section={section}
                initialData={initialData}
                docId={id}
                isNew={false}
                authorOptions={authorOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
