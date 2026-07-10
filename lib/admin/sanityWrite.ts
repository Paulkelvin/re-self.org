import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";
const token = process.env.SANITY_WRITE_TOKEN;

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

export const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export async function listDocuments(type: string) {
  const orderField = type === "event" ? "date desc" : "order asc, _createdAt asc";
  return readClient.fetch(`*[_type == $type] | order(${orderField})`, { type });
}

export async function getDocument(id: string) {
  return readClient.fetch(`*[_id == $id][0]`, { id });
}

export async function createDocument(type: string, data: Record<string, unknown>) {
  return writeClient.create({ _type: type, ...data });
}

export async function updateDocument(id: string, data: Record<string, unknown>) {
  const entries = Object.entries(data);
  const unsetKeys = entries.filter(([, v]) => v === null).map(([k]) => k);
  const setData = Object.fromEntries(entries.filter(([, v]) => v !== null));

  let patch = writeClient.patch(id);
  if (Object.keys(setData).length > 0) patch = patch.set(setData);
  if (unsetKeys.length > 0) patch = patch.unset(unsetKeys);
  return patch.commit();
}

export async function deleteDocument(id: string) {
  return writeClient.delete(id);
}

export async function uploadImageAsset(buffer: Buffer, filename: string, contentType: string) {
  return writeClient.assets.upload("image", buffer, { filename, contentType });
}

export function getImageUrl(asset: { _ref?: string; asset?: { _ref: string } } | null | undefined): string | null {
  if (!asset) return null;
  const ref = asset._ref ?? asset.asset?._ref;
  if (!ref) return null;
  // ref format: image-{id}-{dimensions}-{format}
  const [, id, dimensions, format] = ref.split("-");
  if (!id) return null;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
}
