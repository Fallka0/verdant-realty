import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

import { deletePropertyAction, updatePropertyAction } from "@/app/admin/(dashboard)/actions";
import { PropertyForm } from "@/components/admin/property-form";
import { adminCopy, resolveAdminLocale } from "@/lib/admin-copy";
import { getAdminPropertyById } from "@/lib/properties";

type EditPropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const [{ id }, cookieStore] = await Promise.all([params, cookies()]);
  const locale = resolveAdminLocale(cookieStore.get("verdant-locale")?.value);
  const copy = adminCopy[locale];
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
          <p className="eyebrow">{copy.form.editEyebrow}</p>
          <h2>{property.title}</h2>
          <p>{copy.form.editBody}</p>
        </div>
        <Link className="button button-secondary" href={`/properties/${property.slug}`}>
          {copy.form.actions.viewPublicPage}
        </Link>
      </div>

      <PropertyForm
        action={updateAction}
        copy={copy.form}
        localeLabels={{ statuses: copy.statusLabels, types: copy.typeLabels }}
        property={property}
        referenceSeed={property.referenceCode.replace(/^VR-/, "")}
        submitLabel={copy.form.actions.save}
        uploadCopy={copy.upload}
      />

      <form className="delete-form" action={deleteAction}>
        <button className="button button-danger" type="submit">
          {copy.form.actions.delete}
        </button>
      </form>
    </section>
  );
}
