import { NextResponse } from "next/server";
import { readClient } from "@/lib/admin/sanityWrite";
import { schemas } from "@/lib/admin/schemas";

interface SearchDoc {
  _id: string;
  _type: string;
  title?: string;
  name?: string;
  value?: string;
  label?: string;
  question?: string;
  subtitle?: string;
  description?: string;
  excerpt?: string;
  quote?: string;
  role?: string;
  organization?: string;
  category?: string;
}

const TYPE_TO_SECTION = Object.fromEntries(
  Object.entries(schemas).map(([key, def]) => [def.type, { key, label: def.label }]),
);

function docTitle(doc: SearchDoc): string {
  return doc.title ?? doc.name ?? doc.value ?? doc.label ?? doc.question ?? "Untitled";
}

function haystack(doc: SearchDoc): string {
  return [
    doc.title, doc.name, doc.value, doc.label, doc.question,
    doc.subtitle, doc.description, doc.excerpt, doc.quote,
    doc.role, doc.organization, doc.category,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const docs = await readClient.fetch<SearchDoc[]>(
    `*[!(_type in ["sanity.imageAsset","sanity.fileAsset"])] {
      _id, _type, title, name, value, label, question,
      subtitle, description, excerpt, quote, role, organization, category
    }`,
  );

  const results = docs
    .filter((doc) => TYPE_TO_SECTION[doc._type] && haystack(doc).includes(q))
    .map((doc) => {
      const section = TYPE_TO_SECTION[doc._type];
      return {
        id: doc._id,
        title: docTitle(doc),
        subtitle: doc.subtitle ?? doc.role ?? doc.category ?? null,
        section: section.key,
        sectionLabel: section.label,
      };
    })
    .slice(0, 30);

  return NextResponse.json({ results });
}
