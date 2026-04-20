"use client";

import { useState } from "react";

import { ImageUploadField } from "@/components/admin/image-upload-field";
import { type AdminCopy } from "@/lib/admin-copy";
import { propertyStatuses, propertyTypes, type PropertyRecord } from "@/lib/property-shared";

type PropertyFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  copy: AdminCopy["form"];
  localeLabels: {
    statuses: Record<string, string>;
    types: Record<string, string>;
  };
  property?: PropertyRecord;
  referenceSeed: string;
  submitLabel: string;
  uploadCopy: AdminCopy["upload"];
};

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createReferenceCode(title: string, seed: string) {
  const words = title
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/[^a-z0-9]/gi, ""))
    .filter(Boolean);
  const prefix = words
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return `VR-${prefix || "NEW"}-${seed}`;
}

export function PropertyForm({
  action,
  copy,
  localeLabels,
  property,
  referenceSeed,
  submitLabel,
  uploadCopy,
}: PropertyFormProps) {
  const [title, setTitle] = useState(property?.title ?? "");
  const [slug, setSlug] = useState(property?.slug ?? "");
  const [referenceCode, setReferenceCode] = useState(property?.referenceCode ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(property?.slug));
  const [referenceEdited, setReferenceEdited] = useState(Boolean(property?.referenceCode));

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugEdited) {
      setSlug(slugify(value));
    }

    if (!referenceEdited) {
      setReferenceCode(createReferenceCode(value, referenceSeed));
    }
  }

  return (
    <form className="property-form" action={action}>
      <div className="admin-fields">
        <label>
          {copy.fields.reference}
          <input
            name="referenceCode"
            type="text"
            value={referenceCode}
            onChange={(event) => {
              setReferenceEdited(true);
              setReferenceCode(event.target.value.toUpperCase());
            }}
            placeholder={copy.fields.reference}
            required
          />
          <span className="field-note">{copy.fieldNotes.reference}</span>
        </label>

        <label>
          {copy.fields.title}
          <input
            name="title"
            type="text"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            placeholder={copy.placeholders.title}
            required
          />
        </label>

        <label>
          {copy.fields.slug}
          <input
            name="slug"
            type="text"
            value={slug}
            onChange={(event) => {
              setSlugEdited(true);
              setSlug(slugify(event.target.value));
            }}
            placeholder={copy.fields.slug}
          />
          <span className="field-note">{copy.fieldNotes.slug}</span>
        </label>

        <label>
          {copy.fields.location}
          <input
            name="location"
            type="text"
            defaultValue={property?.location ?? ""}
            placeholder={copy.placeholders.location}
            required
          />
        </label>

        <label>
          {copy.fields.price}
          <input name="priceEuro" type="number" min="0" defaultValue={property?.priceEuro ?? 0} required />
        </label>

        <label>
          {copy.fields.type}
          <select name="type" defaultValue={property?.type ?? "apartment"}>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {localeLabels.types[type] ?? type}
              </option>
            ))}
          </select>
        </label>

        <label>
          {copy.fields.status}
          <select name="status" defaultValue={property?.status ?? "draft"}>
            {propertyStatuses.map((status) => (
              <option key={status} value={status}>
                {localeLabels.statuses[status] ?? status}
              </option>
            ))}
          </select>
        </label>

        <label>
          {copy.fields.bedrooms}
          <input name="bedrooms" type="number" min="0" defaultValue={property?.bedrooms ?? 0} required />
        </label>

        <label>
          {copy.fields.bathrooms}
          <input name="bathrooms" type="number" min="0" defaultValue={property?.bathrooms ?? 0} required />
        </label>

        <label>
          {copy.fields.interior}
          <input name="interiorSqm" type="number" min="0" defaultValue={property?.interiorSqm ?? undefined} />
        </label>

        <label>
          {copy.fields.plot}
          <input name="plotSqm" type="number" min="0" defaultValue={property?.plotSqm ?? undefined} />
        </label>

        <div className="full-span">
          <ImageUploadField
            defaultValue={property?.mainImageUrl ?? ""}
            label={copy.fields.mainImage}
            mode="single"
            name="mainImageUrl"
            placeholder={copy.placeholders.imageUrl}
            required
            title={title}
            uploadCopy={uploadCopy}
          />
          <span className="field-note">{copy.fieldNotes.mainImage}</span>
        </div>

        <label className="full-span">
          {copy.fields.shortDescription}
          <textarea
            name="shortDescription"
            rows={3}
            defaultValue={property?.shortDescription ?? ""}
            placeholder={copy.placeholders.shortDescription}
            required
          />
        </label>

        <label className="full-span">
          {copy.fields.description}
          <textarea
            name="description"
            rows={7}
            defaultValue={property?.description ?? ""}
            placeholder={copy.placeholders.description}
            required
          />
        </label>

        <div className="full-span">
          <ImageUploadField
            defaultValue={property?.galleryUrls.join("\n") ?? ""}
            label={copy.fields.galleryImages}
            mode="gallery"
            name="galleryUrls"
            placeholder={uploadCopy.galleryPlaceholder}
            title={title}
            uploadCopy={uploadCopy}
          />
          <span className="field-note">{copy.fieldNotes.galleryImages}</span>
        </div>
      </div>

      <label className="admin-checkbox">
        <input name="featured" type="checkbox" defaultChecked={property?.featured ?? false} />
        {copy.checkboxFeatured}
      </label>

      <div className="admin-actions">
        <button className="button button-primary" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
