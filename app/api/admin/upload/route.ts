import { NextResponse } from "next/server";
import { uploadImageAsset } from "@/lib/admin/sanityWrite";

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const asset = await uploadImageAsset(buffer, file.name, file.type);
    return NextResponse.json({
      _id: asset._id,
      url: asset.url,
      assetRef: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
