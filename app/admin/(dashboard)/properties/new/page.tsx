import { PropertyForm } from "@/components/admin/property-form";
import { getAdminProperties } from "@/lib/properties";

import { createPropertyAction } from "@/app/admin/(dashboard)/actions";

function getNextReferenceSeed(referenceCodes: string[]) {
  const nextNumber =
    Math.max(
      100,
      ...referenceCodes.map((code) => Number(code.match(/(\d+)$/)?.[1] ?? 0)).filter(Number.isFinite),
    ) + 1;

  return String(nextNumber);
}

export default async function NewPropertyPage() {
  const properties = await getAdminProperties();
  const referenceSeed = getNextReferenceSeed(properties.map((property) => property.referenceCode));

  return (
    <section className="admin-card">
      <div className="section-heading compact">
        <p className="eyebrow">New Listing</p>
        <h2>Add a property to the live inventory.</h2>
        <p>
          Fill in the property basics, image URLs, and status. If the listing is set to available
          or reserved, it can appear on the public website automatically.
        </p>
      </div>

      <PropertyForm action={createPropertyAction} referenceSeed={referenceSeed} submitLabel="Create property" />
    </section>
  );
}

