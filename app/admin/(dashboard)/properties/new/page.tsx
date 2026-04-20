import { cookies } from "next/headers";

import { createPropertyAction } from "@/app/admin/(dashboard)/actions";
import { PropertyForm } from "@/components/admin/property-form";
import { adminCopy, resolveAdminLocale } from "@/lib/admin-copy";
import { getAdminProperties } from "@/lib/properties";

function getNextReferenceSeed(referenceCodes: string[]) {
  const nextNumber =
    Math.max(
      100,
      ...referenceCodes.map((code) => Number(code.match(/(\d+)$/)?.[1] ?? 0)).filter(Number.isFinite),
    ) + 1;

  return String(nextNumber);
}

export default async function NewPropertyPage() {
  const [properties, cookieStore] = await Promise.all([getAdminProperties(), cookies()]);
  const locale = resolveAdminLocale(cookieStore.get("verdant-locale")?.value);
  const copy = adminCopy[locale];
  const referenceSeed = getNextReferenceSeed(properties.map((property) => property.referenceCode));

  return (
    <section className="admin-card">
      <div className="section-heading compact">
        <p className="eyebrow">{copy.form.newEyebrow}</p>
        <h2>{copy.form.newTitle}</h2>
        <p>{copy.form.newBody}</p>
      </div>

      <PropertyForm
        action={createPropertyAction}
        copy={copy.form}
        localeLabels={{ statuses: copy.statusLabels, types: copy.typeLabels }}
        referenceSeed={referenceSeed}
        submitLabel={copy.form.actions.create}
        uploadCopy={copy.upload}
      />
    </section>
  );
}
