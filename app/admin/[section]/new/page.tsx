import type { Metadata } from "next";
import Link from "next/link";
import { schemas } from "@/lib/admin/schemas";
import { listDocuments } from "@/lib/admin/sanityWrite";
import { ContentForm } from "@/components/admin/ContentForm";

export const revalidate = 0;

interface Props {
  params: Promise<{ section: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const def = schemas[section];
  return { title: `New ${def?.label ?? section}` };
}

export default async function NewDocumentPage({ params }: Props) {
  const { section } = await params;
  const def = schemas[section];

  if (!def) {
    return <div className="p-8 text-[#5a6b6b]">Section not found.</div>;
  }

  // Load authors for article reference field
  let authorOptions: { _id: string; name: string }[] = [];
  if (def.fields.some((f) => f.type === "reference" && f.refType === "author")) {
    const authors = await listDocuments("author");
    authorOptions = (authors as { _id: string; name: string }[]).map((a) => ({
      _id: a._id,
      name: a.name,
    }));
  }

  return (
    <div className="p-8 max-w-3xl">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-[#5a6b6b]">
        <Link href={`/admin/${section}`} className="hover:text-[#4a5840] transition">
          {def.label}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#2a3535] font-medium">New</span>
      </nav>

      <h1 className="font-serif text-2xl font-semibold text-[#4a5840] mb-8">
        New {def.label.replace(/s$/, "")}
      </h1>

      <div className="rounded-2xl border border-[#dde8dd] bg-white p-8 shadow-sm">
        <ContentForm
          sectionDef={def}
          section={section}
          isNew
          authorOptions={authorOptions}
        />
      </div>
    </div>
  );
}
