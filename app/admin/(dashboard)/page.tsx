import Link from "next/link";
import Image from "next/image";

import { formatPrice, getPropertyStatusLabel, getPropertyTypeLabel } from "@/lib/property-shared";
import { getAdminProperties } from "@/lib/properties";

export default async function AdminDashboardPage() {
  const properties = await getAdminProperties();
  const liveProperties = properties.filter(
    (property) => property.status === "available" || property.status === "reserved",
  );
  const draftProperties = properties.filter((property) => property.status === "draft");
  const featuredProperties = properties.filter((property) => property.featured);

  return (
    <section className="admin-grid">
      <div className="admin-dashboard-hero">
        <div>
          <p className="eyebrow">Inventory Overview</p>
          <h2>{properties.length} properties in the system</h2>
          <p>
            Keep the public site fresh from one calmer workspace. Drafts stay private, while
            available and reserved homes can appear across the live property pages.
          </p>
        </div>
        <div className="admin-quick-actions">
          <Link className="button button-primary" href="/admin/properties/new">
            New listing
          </Link>
          <Link className="button button-secondary" href="/properties">
            View public site
          </Link>
        </div>
      </div>

      <div className="admin-stat-grid">
        <article className="admin-stat-card">
          <span>Public</span>
          <strong>{liveProperties.length}</strong>
          <p>Available or reserved listings.</p>
        </article>
        <article className="admin-stat-card">
          <span>Featured</span>
          <strong>{featuredProperties.length}</strong>
          <p>Eligible for homepage highlights.</p>
        </article>
        <article className="admin-stat-card">
          <span>Drafts</span>
          <strong>{draftProperties.length}</strong>
          <p>Private listings in progress.</p>
        </article>
      </div>

      <div className="admin-card admin-table-card">
        <div className="admin-card-header">
          <div>
            <p className="eyebrow">Listings</p>
            <h2>Manage inventory</h2>
          </div>
        </div>

        {properties.length > 0 ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Listing</th>
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
                    <td>
                      <div className="admin-listing-cell">
                        <div className="admin-listing-thumb">
                          <Image
                            src={property.mainImageUrl}
                            alt=""
                            fill
                            sizes="72px"
                          />
                        </div>
                        <div className="admin-listing-title">
                          <strong>{property.title}</strong>
                          <span>{property.referenceCode} / {property.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`admin-status-pill admin-status-${property.status}`}>
                        {getPropertyStatusLabel(property.status)}
                      </span>
                    </td>
                    <td>{getPropertyTypeLabel(property.type)}</td>
                    <td>{property.location}</td>
                    <td>
                      <strong>{formatPrice(property.priceEuro)}</strong>
                    </td>
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
        ) : (
          <div className="admin-empty-state">
            <h3>No listings yet</h3>
            <p>Create the first property, add images, and mark it available when it is ready for the public site.</p>
            <Link className="button button-primary" href="/admin/properties/new">
              Create first listing
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
