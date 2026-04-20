import { NextResponse } from "next/server";

import { sendInquiryEmail } from "@/lib/inquiry-email";
import { publicCopy, resolvePublicLocale } from "@/lib/public-copy";
import { consumeInquiryRateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/server";

type InquiryPayload = {
  email?: string;
  locale?: string;
  message?: string;
  name?: string;
  phone?: string;
  propertyId?: string;
  propertyTitle?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeInput(payload: InquiryPayload) {
  return {
    name: payload.name?.trim() ?? "",
    email: payload.email?.trim().toLowerCase() ?? "",
    locale: resolvePublicLocale(payload.locale),
    phone: payload.phone?.trim() ?? "",
    message: payload.message?.trim() ?? "",
    propertyId: payload.propertyId?.trim() ?? "",
    propertyTitle: payload.propertyTitle?.trim() ?? "",
  };
}

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ error: "Please send valid JSON." }, { status: 400 });
  }

  const inquiry = normalizeInput(payload);
  const copy = publicCopy[inquiry.locale];
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const rateLimit = consumeInquiryRateLimit(`${ip}:${inquiry.email || "anonymous"}`);

  if (!rateLimit.allowed) {
    const retryAfterSeconds = Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000));

    return NextResponse.json(
      { error: copy.inquiry.rateLimited },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      },
    );
  }

  if (!inquiry.name || !inquiry.email || !inquiry.message) {
    return NextResponse.json(
      { error: copy.inquiry.error },
      { status: 400 },
    );
  }

  if (!emailPattern.test(inquiry.email)) {
    return NextResponse.json({ error: copy.inquiry.error }, { status: 400 });
  }

  const supabase = createAdminClient();

  if (!supabase) {
    return NextResponse.json(
      {
        error: copy.inquiry.error,
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("inquiries").insert({
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone || null,
    message: inquiry.message,
    property_id: inquiry.propertyId || null,
    property_title: inquiry.propertyTitle || null,
  });

  if (error) {
    return NextResponse.json(
      { error: copy.inquiry.error },
      { status: 500 },
    );
  }

  const emailResult = await sendInquiryEmail({
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    locale: inquiry.locale,
    message: inquiry.message,
    propertyTitle: inquiry.propertyTitle,
  });

  if (!emailResult.ok) {
    return NextResponse.json(
      { error: copy.inquiry.error },
      { status: emailResult.reason === "missing-config" ? 503 : 500 },
    );
  }

  return NextResponse.json({
    message: copy.inquiry.success,
  });
}
