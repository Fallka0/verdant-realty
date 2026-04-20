"use client";

import { useState } from "react";

import { ImageUploadField } from "@/components/admin/image-upload-field";
import { propertyStatuses, propertyTypes, type PropertyRecord } from "@/lib/property-shared";

type PropertyFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  property?: PropertyRecord;
  referenceSeed: string;
  submitLabel: string;
};

function slugify(value: string) {
  return value
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

export function PropertyForm({ action, property, referenceSeed, submitLabel }: PropertyFormProps) {
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
          Reference Code
          <input
            name="referenceCode"
            type="text"
            value={referenceCode}
            onChange={(event) => {
              setReferenceEdited(true);
              setReferenceCode(event.target.value.toUpperCase());
            }}
            placeholder="Generated from title"
            required
          />
          <span className="field-note">Generated from the title. You can still edit it.</span>
        </label>

        <label>
          Title
          <input
            name="title"
            type="text"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            placeholder="Stylish villa near the salt lakes"
            required
          />
        </label>

        <label>
          Slug
          <input
            name="slug"
            type="text"
            value={slug}
            onChange={(event) => {
              setSlugEdited(true);
              setSlug(slugify(event.target.value));
            }}
            placeholder="Generated from title"
          />
          <span className="field-note">Used in the public page URL.</span>
        </label>

        <label>
          Location
          <input
            name="location"
            type="text"
            defaultValue={property?.location ?? ""}
            placeholder="Torrevieja"
            required
          />
        </label>

        <label>
          Price (EUR)
          <input
            name="priceEuro"
            type="number"
            min="0"
            defaultValue={property?.priceEuro ?? 0}
            required
          />
        </label>

        <label>
          Property Type
          <select name="type" defaultValue={property?.type ?? "apartment"}>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type[0].toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Status
          <select name="status" defaultValue={property?.status ?? "draft"}>
            {propertyStatuses.map((status) => (
              <option key={status} value={status}>
                {status[0].toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Bedrooms
          <input name="bedrooms" type="number" min="0" defaultValue={property?.bedrooms ?? 0} required />
        </label>

        <label>
          Bathrooms
          <input
            name="bathrooms"
            type="number"
            min="0"
            defaultValue={property?.bathrooms ?? 0}
            required
          />
        </label>

        <label>
          Interior m²
          <input
            name="interiorSqm"
            type="number"
            min="0"
            defaultValue={property?.interiorSqm ?? undefined}
          />
        </label>

        <label>
          Plot m²
          <input
            name="plotSqm"
            type="number"
            min="0"
            defaultValue={property?.plotSqm ?? undefined}
          />
        </label>

        <div className="full-span">
          <ImageUploadField
            defaultValue={property?.mainImageUrl ?? ""}
            label="Main Image"
            mode="single"
            name="mainImageUrl"
            required
            title={title}
          />
        </div>

        <label className="full-span">
          Short Description
          <textarea
            name="shortDescription"
            rows={3}
            defaultValue={property?.shortDescription ?? ""}
            placeholder="One concise paragraph used in cards and previews."
            required
          />
        </label>

        <label className="full-span">
          Full Description
          <textarea
            name="description"
            rows={7}
            defaultValue={property?.description ?? ""}
            placeholder="Full listing description for the property detail page."
            required
          />
        </label>

        <div className="full-span">
          <ImageUploadField
            defaultValue={property?.galleryUrls.join("\n") ?? ""}
            label="Gallery Images"
            mode="gallery"
            name="galleryUrls"
            title={title}
          />
        </div>
      </div>

      <label className="admin-checkbox">
        <input name="featured" type="checkbox" defaultChecked={property?.featured ?? false} />
        Feature this listing on the homepage
      </label>

      <div className="admin-actions">
        <button className="button button-primary" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
