import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getAdminAuthState } from "@/lib/auth";
import { importPropertyFromUrl } from "@/lib/property-import";
import { generatePropertyTranslations } from "@/lib/property-translations";
import {
  buildPropertyContentFromRecord,
  createPropertyContentHash,
} from "@/lib/properties";
import { type PropertyRecord } from "@/lib/property-shared";
import { createAdminClient } from "@/lib/supabase/server";

type ImportRequestBody = {
  createDrafts?: boolean;
  url?: string;
  urls?: string[];
};

function extractUrls(body: ImportRequestBody | null) {
  const rawValues = [
    ...(Array.isArray(body?.urls) ? body.urls : []),
    body?.url ?? "",
  ];

  return rawValues
    .flatMap((value) => String(value).split(/[\s,]+/))
    .map((value) => value.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function createImportedDraft(input: {
  notes: string[];
  property: PropertyRecord;
  sourceUrl: string;
}) {
  const supabase = createAdminClient();

  if (!supabase) {
    throw new Error("Supabase service role key is missing.");
  }

  const sourceContent = buildPropertyContentFromRecord(input.property);
  const contentTranslations = await generatePropertyTranslations(sourceContent);
  const contentTranslationSourceHash = createPropertyContentHash(sourceContent);
  const referenceSuffix = slugify(input.property.referenceCode) || String(Date.now());
  const slug = `${input.property.slug}-${referenceSuffix}`;
  const internalNotes = [
    ...input.notes,
    `Imported from ${input.sourceUrl}`,
    input.property.internalNotes,
  ]
    .filter(Boolean)
    .join("\n");

  const { data, error } = await supabase
    .from("properties")
    .insert({
      availability_end: input.property.availabilityEnd,
      availability_start: input.property.availabilityStart,
      bathrooms: input.property.bathrooms,
      bedrooms: input.property.bedrooms,
      content_translations: contentTranslations,
      content_translation_source_hash: contentTranslationSourceHash,
      description: input.property.description,
      featured: false,
      features: input.property.features,
      gallery_urls: input.property.galleryUrls,
      interior_sqm: input.property.interiorSqm,
      internal_notes: internalNotes,
      listing_mode: input.property.listingMode,
      location: input.property.location,
      main_image_url: input.property.mainImageUrl,
      plot_sqm: input.property.plotSqm,
      price_eur: input.property.priceEuro,
      property_type: input.property.type,
      reference_code: input.property.referenceCode,
      rent_price_eur: input.property.rentPriceEuro,
      rent_price_period: input.property.rentPricePeriod,
      rental_periods: input.property.rentalPeriods,
      short_description: input.property.shortDescription,
      slug,
      status: "draft",
      title: input.property.title,
      updated_at: new Date().toISOString(),
    })
    .select("id, slug, title")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Imported draft could not be created.");
  }

  return data;
}

export async function POST(request: Request) {
  const authState = await getAdminAuthState();

  if (authState.status === "unauthenticated") {
    return NextResponse.json({ error: "You must be signed in to import a property." }, { status: 401 });
  }

  if (authState.status === "unauthorized") {
    return NextResponse.json({ error: "This account is not allowed to import properties." }, { status: 403 });
  }

  if (authState.status === "missing-config") {
    return NextResponse.json({ error: "Admin setup is incomplete." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as ImportRequestBody | null;
  const urls = extractUrls(body);

  if (urls.length === 0) {
    return NextResponse.json({ error: "Paste a public property link first." }, { status: 400 });
  }

  try {
    if (body?.createDrafts || urls.length > 1) {
      const results = [];
      const errors = [];

      for (const url of urls) {
        try {
          const imported = await importPropertyFromUrl(url);
          const draft = await createImportedDraft({
            notes: imported.notes,
            property: imported.property,
            sourceUrl: imported.resolvedUrl,
          });

          results.push({
            id: draft.id,
            slug: draft.slug,
            title: draft.title,
            url,
          });
        } catch (error) {
          errors.push({
            error: error instanceof Error ? error.message : "The property could not be imported from that link.",
            url,
          });
        }
      }

      if (results.length > 0) {
        revalidatePath("/admin");
      }

      return NextResponse.json({
        created: results,
        errors,
      });
    }

    const imported = await importPropertyFromUrl(urls[0]);

    return NextResponse.json(imported);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "The property could not be imported from that link.",
      },
      { status: 400 },
    );
  }
}
