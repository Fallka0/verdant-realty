import { updatePropertyAvailabilityAction } from "@/app/admin/(dashboard)/actions";
import { type AdminCopy } from "@/lib/admin-copy";
import { type PropertyRecord } from "@/lib/property-shared";

type PropertyAvailabilityFormProps = {
  copy: AdminCopy["form"];
  property: PropertyRecord;
};

export function PropertyAvailabilityForm({ copy, property }: PropertyAvailabilityFormProps) {
  const action = updatePropertyAvailabilityAction.bind(null, property.id, property.slug);

  return (
    <form action={action} className="admin-availability-form">
      <label>
        <span>{copy.fields.availabilityStart}</span>
        <input name="availabilityStart" type="date" defaultValue={property.availabilityStart ?? ""} />
      </label>
      <label>
        <span>{copy.fields.availabilityEnd}</span>
        <input name="availabilityEnd" type="date" defaultValue={property.availabilityEnd ?? ""} />
      </label>
      <button className="button button-secondary" type="submit">
        {copy.actions.save}
      </button>
    </form>
  );
}
