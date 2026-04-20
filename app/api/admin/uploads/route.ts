import { NextResponse } from "next/server";

import { getAdminAuthState } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

const bucketName = "property-images";
const maxFileSizeBytes = 8 * 1024 * 1024;

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
    return NextResponse.json({ error: "You must be signed in to upload images." }, { status: 401 });
  }

  if (authState.status === "unauthorized") {
    return NextResponse.json({ error: "This account is not allowed to upload images." }, { status: 403 });
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
    return NextResponse.json({ error: "No image file was provided." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are supported." }, { status: 400 });
  }

  if (file.size > maxFileSizeBytes) {
    return NextResponse.json({ error: "Images must be smaller than 8 MB." }, { status: 400 });
  }

  const { data: bucket } = await supabase.storage.getBucket(bucketName);

  if (!bucket) {
    const { error: bucketError } = await supabase.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: maxFileSizeBytes,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    });

    if (bucketError) {
      return NextResponse.json({ error: bucketError.message }, { status: 500 });
    }
  } else if (!bucket.public) {
    const { error: bucketError } = await supabase.storage.updateBucket(bucketName, {
      public: true,
      fileSizeLimit: maxFileSizeBytes,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    });

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
