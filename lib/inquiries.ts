import { createAdminClient } from "@/lib/supabase/server";

export type InquiryRecord = {
  createdAt: string;
  email: string;
  id: string;
  message: string;
  name: string;
  phone: string | null;
  propertyId: string | null;
  propertyTitle: string | null;
  timeline: string | null;
};

type InquiryRow = {
  created_at: string | null;
  email: string | null;
  id: string;
  message: string | null;
  name: string | null;
  phone: string | null;
  property_id: string | null;
  property_title: string | null;
  timeline: string | null;
};

function normalizeInquiryRow(row: InquiryRow): InquiryRecord {
  return {
    createdAt: row.created_at ?? new Date(0).toISOString(),
    email: row.email ?? "",
    id: row.id,
    message: row.message ?? "",
    name: row.name ?? "",
    phone: row.phone,
    propertyId: row.property_id,
    propertyTitle: row.property_title,
    timeline: row.timeline,
  };
}

export async function getAdminInquiries(limit = 20): Promise<InquiryRecord[]> {
  const supabase = createAdminClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("inquiries")
    .select("id, name, email, phone, timeline, message, property_id, property_title, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return (data as InquiryRow[]).map(normalizeInquiryRow);
}
