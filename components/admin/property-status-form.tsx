import { updatePropertyStatusAction } from "@/app/admin/(dashboard)/actions";
import { type AdminCopy } from "@/lib/admin-copy";
import { propertyStatuses, type PropertyRecord } from "@/lib/property-shared";

type PropertyStatusFormProps = {
  copy: AdminCopy;
  property: PropertyRecord;
};

export function PropertyStatusForm({ copy, property }: PropertyStatusFormProps) {
  const action = updatePropertyStatusAction.bind(null, property.id, property.slug);

  return (
    <form action={action} className="admin-status-form">
      <select
        aria-label={copy.form.fields.status}
        className={`admin-status-select admin-status-${property.status}`}
        name="status"
        defaultValue={property.status}
      >
        {propertyStatuses.map((status) => (
          <option key={status} value={status}>
            {copy.statusLabels[status]}
          </option>
        ))}
      </select>
      <button className="button button-secondary" type="submit">
        {copy.form.actions.save}
      </button>
    </form>
  );
}
