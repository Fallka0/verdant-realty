import { NextResponse } from "next/server";

import { getAdminAuthState } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

const imageBucketName = "property-images";
const videoBucketName = "property-videos";
const maxFileSizeBytes = 50 * 1024 * 1024;
const allowedImageMimeTypes = [
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
];
const allowedVideoMimeTypes = [
  "video/mp4",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-m4v",
];

function isSupportedUploadType(file: File) {
  return allowedImageMimeTypes.includes(file.type) || allowedVideoMimeTypes.includes(file.type);
}

function isVideoUpload(file: File) {
  return allowedVideoMimeTypes.includes(file.type);
}

function getExtensionFromName(fileName: string, contentType: string) {
  const fromName = fileName.split(".").pop()?.toLowerCase();

  if (fromName && /^[a-z0-9]+$/.test(fromName)) {
    return fromName;
  }

  return contentType.split("/").pop() ?? "bin";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureBucket(
  supabase: NonNullable<ReturnType<typeof createAdminClient>>,
  bucketName: string,
  allowedMimeTypes: string[],
) {
  const { data: bucket, error: bucketLookupError } = await supabase.storage.getBucket(bucketName);

  if (bucketLookupError) {
    throw new Error(bucketLookupError.message);
  }

  if (bucket) {
    return;
  }

  const { error: bucketCreateError } = await supabase.storage.createBucket(bucketName, {
    public: true,
    fileSizeLimit: maxFileSizeBytes,
    allowedMimeTypes,
  });

  if (bucketCreateError) {
    throw new Error(bucketCreateError.message);
  }
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

  const body = (await request.json().catch(() => null)) as
    | {
        contentType?: string;
        fileName?: string;
        title?: string;
      }
    | null;

  const contentType = String(body?.contentType ?? "").trim().toLowerCase();
  const fileName = String(body?.fileName ?? "").trim();
  const title = String(body?.title ?? "property").trim();

  if (!contentType || !fileName) {
    return NextResponse.json({ error: "Missing upload file details." }, { status: 400 });
  }

  const fileLike = {
    name: fileName,
    type: contentType,
  } as File;

  if (!isSupportedUploadType(fileLike)) {
    return NextResponse.json({ error: "Only image and video uploads are supported." }, { status: 400 });
  }

  const bucketName = isVideoUpload(fileLike) ? videoBucketName : imageBucketName;
  const allowedMimeTypes = isVideoUpload(fileLike) ? allowedVideoMimeTypes : allowedImageMimeTypes;

  try {
    await ensureBucket(supabase, bucketName, allowedMimeTypes);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not prepare upload storage." },
      { status: 500 },
    );
  }

  const extension = getExtensionFromName(fileName, contentType);
  const safeTitle = slugify(title) || "property";
  const storagePath = `${safeTitle}/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  const { data: signedUploadData, error: signedUploadError } = await supabase.storage
    .from(bucketName)
    .createSignedUploadUrl(storagePath);

  if (signedUploadError || !signedUploadData?.token) {
    return NextResponse.json({ error: signedUploadError?.message ?? "Could not create a signed upload URL." }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(storagePath);

  return NextResponse.json({
    bucketName,
    path: storagePath,
    token: signedUploadData.token,
    url: publicUrl,
  });
}
