import { NextResponse } from "next/server";

import { getAdminAuthState } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

const bucketName = "property-images";
const maxFileSizeBytes = 50 * 1024 * 1024;
const allowedMimeTypes = [
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-m4v",
];

function isSupportedUploadType(file: File) {
  return allowedMimeTypes.includes(file.type);
}

function getExtension(file: File) {
  const fromName = file.name.split(".").pop()?.toLowerCase();

  if (fromName && /^[a-z0-9]+$/.test(fromName)) {
    return fromName;
  }

  return file.type.split("/").pop() ?? "jpg";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  const authState = await getAdminAuthState();

  if (authState.status === "unauthenticated") {
    return NextResponse.json({ error: "You must be signed in to upload media." }, { status: 401 });
  }

  if (authState.status === "unauthorized") {
    return NextResponse.json({ error: "This account is not allowed to upload media." }, { status: 403 });
  }

  if (authState.status === "missing-config") {
    return NextResponse.json({ error: "Admin setup is incomplete." }, { status: 500 });
  }

  const supabase = createAdminClient();

  if (!supabase) {
    return NextResponse.json({ error: "Supabase service role key is missing." }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const title = String(formData.get("title") ?? "property").trim();

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No media file was provided." }, { status: 400 });
  }

  if (!isSupportedUploadType(file)) {
    return NextResponse.json({ error: "Only image and video uploads are supported." }, { status: 400 });
  }

  if (file.size > maxFileSizeBytes) {
    return NextResponse.json({ error: "Media files must be smaller than 50 MB." }, { status: 400 });
  }

  const { data: bucket } = await supabase.storage.getBucket(bucketName);
  const bucketConfig = {
    public: true,
    fileSizeLimit: maxFileSizeBytes,
    allowedMimeTypes,
  };

  if (!bucket) {
    const { error: bucketError } = await supabase.storage.createBucket(bucketName, bucketConfig);

    if (bucketError) {
      return NextResponse.json({ error: bucketError.message }, { status: 500 });
    }
  } else {
    const { error: bucketError } = await supabase.storage.updateBucket(bucketName, bucketConfig);

    if (bucketError) {
      return NextResponse.json({ error: bucketError.message }, { status: 500 });
    }
  }

  const extension = getExtension(file);
  const safeTitle = slugify(title) || "property";
  const fileName = `${safeTitle}/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage.from(bucketName).upload(fileName, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(fileName);

  return NextResponse.json({ url: publicUrl });
}
