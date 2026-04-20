"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";
import {
  parsePropertyFormData,
  validatePropertyInput,
} from "@/lib/properties";

function getConfiguredAdminClient() {
  const supabase = createAdminClient();

  if (!supabase) {
    throw new Error("Supabase service role key is missing.");
  }

  return supabase;
}

function revalidatePropertyPaths(slug: string) {
  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath(`/properties/${slug}`);
  revalidatePath("/admin");
}

export async function createPropertyAction(formData: FormData) {
  await requireAdminUser();
  const supabase = getConfiguredAdminClient();
  const payload = parsePropertyFormData(formData);

  validatePropertyInput(payload);

  const { data, error } = await supabase.from("properties").insert(payload).select("id, slug").single();

  if (error || !data) {
    throw new Error(error?.message ?? "Property could not be created.");
  }

  revalidatePropertyPaths(data.slug);
  redirect("/admin");
}

export async function updatePropertyAction(propertyId: string, currentSlug: string, formData: FormData) {
  await requireAdminUser();
  const supabase = getConfiguredAdminClient();
  const payload = parsePropertyFormData(formData);

  validatePropertyInput(payload);

  const { data, error } = await supabase
    .from("properties")
    .update(payload)
    .eq("id", propertyId)
    .select("slug")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Property could not be updated.");
  }

  revalidatePropertyPaths(currentSlug);
  revalidatePropertyPaths(data.slug);
  redirect("/admin");
}

export async function deletePropertyAction(propertyId: string, slug: string) {
  await requireAdminUser();
  const supabase = getConfiguredAdminClient();

  const { error } = await supabase.from("properties").delete().eq("id", propertyId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePropertyPaths(slug);
  redirect("/admin");
}

