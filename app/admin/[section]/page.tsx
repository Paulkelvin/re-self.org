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

export default async function SectionListPage({ params }: Props) {
  const { section } = await params;
  const def = schemas[section];

  if (!def) {
    return (
      <div className="p-8">
        <p className="text-[#5a6b6b]">Section &ldquo;{section}&rdquo; not found.</p>
      </div>
    );
  }

  if (def.singleton) {
    const docs = await listDocuments(def.type);
    const doc = docs[0];
    if (doc?._id) redirect(`/admin/${section}/${doc._id}`);
    return (
      <div className="p-8">
        <p className="mb-4 text-[#5a6b6b]">No settings document exists yet.</p>
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
    <div className="p-8 max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#4a5840]">{def.label}</h1>
          <p className="mt-0.5 text-sm text-[#5a6b6b]">
            {docs.length} item{docs.length !== 1 ? "s" : ""}
          </p>
        </div>
        {def.canCreate !== false && (
          <Link
            href={`/admin/${section}/new`}
            className="rounded-lg bg-[#4a5840] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3d4b35]"
          >
            + New
          </Link>
        )}
      </div>

      {docs.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-[#c4d4d0] py-16 text-center">
          <p className="text-[#8fa89f]">No {def.label.toLowerCase()} yet.</p>
          {def.canCreate !== false && (
            <Link
              href={`/admin/${section}/new`}
              className="mt-4 inline-block rounded-lg bg-[#4a5840] px-4 py-2 text-sm font-semibold text-white"
            >
              Create the first one
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
                className="flex items-center gap-4 rounded-xl border border-[#dde8dd] bg-white px-4 py-3 shadow-sm"
              >
                {thumbUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${thumbUrl}?w=80&h=80&fit=crop&auto=format`}
                    alt=""
                    className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#2a3535]">{title}</p>
                  {typeof doc.subtitle === "string" && (
                    <p className="truncate text-xs text-[#5a6b6b]">{doc.subtitle}</p>
                  )}
                </div>
                {doc.order !== undefined && (
                  <span className="tabular-nums text-xs text-[#8fa89f]">
                    #{doc.order as number}
                  </span>
                )}
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Link
                    href={`/admin/${section}/${id}`}
                    className="rounded-lg border border-[#c4d4d0] px-3 py-1.5 text-xs font-medium text-[#4a5840] transition hover:bg-[#f4f7f4]"
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
  );
}
