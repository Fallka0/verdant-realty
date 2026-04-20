import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

function getAdminEmails() {
  const raw = process.env.ADMIN_EMAILS;

  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export type AdminAuthState =
  | { status: "authorized"; user: { email: string; id: string } }
  | { status: "missing-config" }
  | { status: "unauthenticated" }
  | { status: "unauthorized"; email: string | null };

export async function getAdminAuthState(): Promise<AdminAuthState> {
  const supabase = await createServerSupabaseClient();
  const adminEmails = getAdminEmails();

  if (!supabase || adminEmails.length === 0) {
    return { status: "missing-config" };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "unauthenticated" };
  }

  const email = user.email?.toLowerCase() ?? null;

  if (!email || !adminEmails.includes(email)) {
    return { status: "unauthorized", email };
  }

  return {
    status: "authorized",
    user: {
      email,
      id: user.id,
    },
  };
}

export async function requireAdminUser() {
  const authState = await getAdminAuthState();

  if (authState.status === "authorized") {
    return authState.user;
  }

  if (authState.status === "unauthorized") {
    redirect("/admin/login?reason=unauthorized");
  }

  redirect("/admin/login");
}

