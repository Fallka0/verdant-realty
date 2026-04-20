"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminUser } from "@/lib/auth";
import { generatePropertyTranslations } from "@/lib/property-translations";
import { createAdminClient } from "@/lib/supabase/server";
import {
  buildPropertyContentFromInput,
  createPropertyContentHash,
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

  const sourceContent = buildPropertyContentFromInput(payload);
  const contentTranslations = await generatePropertyTranslations(sourceContent);
  const contentTranslationSourceHash = createPropertyContentHash(sourceContent);

  const { data, error } = await supabase
    .from("properties")
    .insert({
      ...payload,
      content_translations: contentTranslations,
      content_translation_source_hash: contentTranslationSourceHash,
    })
    .select("id, slug")
    .single();

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
  const sourceContent = buildPropertyContentFromInput(payload);
  const contentTranslationSourceHash = createPropertyContentHash(sourceContent);
  const { data: existingProperty, error: existingPropertyError } = await supabase
    .from("properties")
    .select("content_translation_source_hash, content_translations")
    .eq("id", propertyId)
    .single();

  if (existingPropertyError || !existingProperty) {
    throw new Error(existingPropertyError?.message ?? "Property could not be loaded for translation reuse.");
  }

  const shouldRegenerateTranslations =
    existingProperty.content_translation_source_hash !== contentTranslationSourceHash ||
    !existingProperty.content_translations;

  const contentTranslations = shouldRegenerateTranslations
    ? await generatePropertyTranslations(sourceContent)
    : existingProperty.content_translations;

  const { data, error } = await supabase
    .from("properties")
    .update({
      ...payload,
      content_translations: contentTranslations,
      content_translation_source_hash: contentTranslationSourceHash,
    })
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
