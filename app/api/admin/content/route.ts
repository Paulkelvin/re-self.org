import { NextResponse } from "next/server";
import {
  listDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
} from "@/lib/admin/sanityWrite";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type) {
    return NextResponse.json({ error: "type is required" }, { status: 400 });
  }

  try {
    if (id) {
      const doc = await getDocument(id);
      return NextResponse.json(doc);
    }
    const docs = await listDocuments(type);
    return NextResponse.json(docs);
  } catch (err) {
    console.error("Content GET error:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.type || !body?.data) {
    return NextResponse.json({ error: "type and data are required" }, { status: 400 });
  }

  try {
    const doc = await createDocument(body.type, body.data);
    return NextResponse.json(doc);
  } catch (err) {
    console.error("Content POST error:", err);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.id || !body?.data) {
    return NextResponse.json({ error: "id and data are required" }, { status: 400 });
  }

  try {
    const doc = await updateDocument(body.id, body.data);
    return NextResponse.json(doc);
  } catch (err) {
    console.error("Content PATCH error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  try {
    await deleteDocument(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Content DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
