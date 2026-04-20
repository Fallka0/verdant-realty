import Link from "next/link";
import { notFound } from "next/navigation";

import { PropertyForm } from "@/components/admin/property-form";
import { getAdminPropertyById } from "@/lib/properties";

import { deletePropertyAction, updatePropertyAction } from "@/app/admin/(dashboard)/actions";

type EditPropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params;
  const property = await getAdminPropertyById(id);

  if (!property) {
    notFound();
  }

  const updateAction = updatePropertyAction.bind(null, property.id, property.slug);
  const deleteAction = deletePropertyAction.bind(null, property.id, property.slug);

  return (
    <section className="admin-card">
      <div className="section-heading compact with-action">
        <div>
          <p className="eyebrow">Edit Listing</p>
          <h2>{property.title}</h2>
          <p>
            Update the public presentation, pricing, status, or gallery. Changes will flow through
            to the public site after save.
          </p>
        </div>
        <Link className="button button-secondary" href={`/properties/${property.slug}`}>
          View Public Page
        </Link>
      </div>

      <PropertyForm
        action={updateAction}
        property={property}
        referenceSeed={property.referenceCode.replace(/^VR-/, "")}
        submitLabel="Save changes"
      />

      <form className="delete-form" action={deleteAction}>
        <button className="button button-danger" type="submit">
          Delete property
        </button>
      </form>
    </section>
  );
}

