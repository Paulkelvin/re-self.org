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

  // Load authors for article reference field
  let authorOptions: { _id: string; name: string }[] = [];
  if (def.fields.some((f) => f.type === "reference" && f.refType === "author")) {
    const authors = await listDocuments("author");
    authorOptions = (authors as { _id: string; name: string }[]).map((a) => ({
      _id: a._id,
      name: a.name,
    }));
  }

  // Normalize the initial data so form fields get the right shape
  const initialData: Record<string, unknown> = {};
  for (const field of def.fields) {
    const raw = (doc as Record<string, unknown>)[field.name];
    if (raw === undefined || raw === null) continue;

    if (field.type === "slug") {
      // Sanity stores slug as { _type: "slug", current: "..." }
      initialData[field.name] = (raw as { current?: string }).current ?? raw;
    } else if (field.type === "reference") {
      // Sanity stores reference as { _type: "reference", _ref: "..." }
      initialData[field.name] = (raw as { _ref?: string })._ref ?? raw;
    } else {
      initialData[field.name] = raw;
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-[#5a6b6b]">
        <Link href={`/admin/${section}`} className="hover:text-[#4a5840] transition">
          {def.label}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="truncate max-w-xs text-[#2a3535] font-medium">
          {(initialData[def.titleField] as string) ?? id}
        </span>
      </nav>

      <h1 className="font-serif text-2xl font-semibold text-[#4a5840] mb-8">
        Edit {def.label.replace(/s$/, "")}
      </h1>

      <div className="rounded-2xl border border-[#dde8dd] bg-white p-8 shadow-sm">
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
  );
}
