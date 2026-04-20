import { PropertyForm } from "@/components/admin/property-form";

import { createPropertyAction } from "@/app/admin/(dashboard)/actions";

export default function NewPropertyPage() {
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

      <PropertyForm action={createPropertyAction} submitLabel="Create property" />
    </section>
  );
}

