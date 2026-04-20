import Link from "next/link";

import { formatPrice, getPropertyStatusLabel, getPropertyTypeLabel } from "@/lib/property-shared";
import { getAdminProperties } from "@/lib/properties";

export default async function AdminDashboardPage() {
  const properties = await getAdminProperties();

  return (
    <section className="admin-grid">
      <div className="admin-card">
        <div className="section-heading compact">
          <p className="eyebrow">Inventory Overview</p>
          <h2>{properties.length} properties in the system</h2>
          <p>
            Drafts stay private. Available and reserved listings can power the homepage and public
            property pages automatically.
          </p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Title</th>
                <th>Status</th>
                <th>Type</th>
                <th>Location</th>
                <th>Price</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.referenceCode}</td>
                  <td>{property.title}</td>
                  <td>{getPropertyStatusLabel(property.status)}</td>
                  <td>{getPropertyTypeLabel(property.type)}</td>
                  <td>{property.location}</td>
                  <td>{formatPrice(property.priceEuro)}</td>
                  <td>
                    <Link className="table-link" href={`/admin/properties/${property.id}`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
