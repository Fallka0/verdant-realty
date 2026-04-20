import { propertyStatuses, propertyTypes, type PropertyRecord } from "@/lib/property-shared";

type PropertyFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  property?: PropertyRecord;
  submitLabel: string;
};

export function PropertyForm({ action, property, submitLabel }: PropertyFormProps) {
  return (
    <form className="property-form" action={action}>
      <div className="admin-fields">
        <label>
          Reference Code
          <input
            name="referenceCode"
            type="text"
            defaultValue={property?.referenceCode ?? ""}
            placeholder="VR-104"
            required
          />
        </label>

        <label>
          Title
          <input
            name="title"
            type="text"
            defaultValue={property?.title ?? ""}
            placeholder="Stylish villa near the salt lakes"
            required
          />
        </label>

        <label>
          Slug
          <input
            name="slug"
            type="text"
            defaultValue={property?.slug ?? ""}
            placeholder="stylish-villa-salt-lakes"
          />
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

        <label className="full-span">
          Main Image URL
          <input
            name="mainImageUrl"
            type="url"
            defaultValue={property?.mainImageUrl ?? ""}
            placeholder="https://..."
            required
          />
        </label>

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

        <label className="full-span">
          Gallery URLs
          <textarea
            name="galleryUrls"
            rows={6}
            defaultValue={property?.galleryUrls.join("\n") ?? ""}
            placeholder="One image URL per line."
          />
        </label>
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
