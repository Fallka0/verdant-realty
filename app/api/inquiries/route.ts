import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server";

type InquiryPayload = {
  email?: string;
  message?: string;
  name?: string;
  phone?: string;
  timeline?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeInput(payload: InquiryPayload) {
  return {
    name: payload.name?.trim() ?? "",
    email: payload.email?.trim().toLowerCase() ?? "",
    phone: payload.phone?.trim() ?? "",
    timeline: payload.timeline?.trim() ?? "",
    message: payload.message?.trim() ?? "",
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

  if (!inquiry.name || !inquiry.email || !inquiry.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(inquiry.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const supabase = createAdminClient();

  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Supabase is not configured yet. Add the project URL and service role key to enable inquiries.",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("inquiries").insert({
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone || null,
    timeline: inquiry.timeline || null,
    message: inquiry.message,
  });

  if (error) {
    return NextResponse.json(
      { error: "The inquiry could not be saved right now. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    message: "Thanks for reaching out. Verdant Realty will be in touch soon.",
  });
}

