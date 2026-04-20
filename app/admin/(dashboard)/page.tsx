import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { adminCopy, resolveAdminLocale } from "@/lib/admin-copy";
import { formatPrice } from "@/lib/property-shared";
import { getAdminProperties } from "@/lib/properties";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const locale = resolveAdminLocale(cookieStore.get("verdant-locale")?.value);
  const copy = adminCopy[locale];
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
          <p className="eyebrow">{copy.dashboard.heroEyebrow}</p>
          <h2>{copy.dashboard.heroTitle(properties.length)}</h2>
          <p>{copy.dashboard.heroBody}</p>
        </div>
        <div className="admin-quick-actions">
          <Link className="button button-primary" href="/admin/properties/new">
            {copy.dashboard.actions.newListing}
          </Link>
          <Link className="button button-secondary" href="/properties">
            {copy.dashboard.actions.viewPublicSite}
          </Link>
        </div>
      </div>

      <div className="admin-stat-grid">
        <article className="admin-stat-card">
          <span>{copy.dashboard.stats.public}</span>
          <strong>{liveProperties.length}</strong>
          <p>{copy.dashboard.stats.publicBody}</p>
        </article>
        <article className="admin-stat-card">
          <span>{copy.dashboard.stats.featured}</span>
          <strong>{featuredProperties.length}</strong>
          <p>{copy.dashboard.stats.featuredBody}</p>
        </article>
        <article className="admin-stat-card">
          <span>{copy.dashboard.stats.drafts}</span>
          <strong>{draftProperties.length}</strong>
          <p>{copy.dashboard.stats.draftsBody}</p>
        </article>
      </div>

      <div className="admin-card admin-table-card">
        <div className="admin-card-header">
          <div>
            <p className="eyebrow">{copy.dashboard.listingsEyebrow}</p>
            <h2>{copy.dashboard.listingsTitle}</h2>
          </div>
        </div>

        {properties.length > 0 ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{copy.dashboard.table.listing}</th>
                  <th>{copy.dashboard.table.status}</th>
                  <th>{copy.dashboard.table.type}</th>
                  <th>{copy.dashboard.table.location}</th>
                  <th>{copy.dashboard.table.price}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td>
                      <div className="admin-listing-cell">
                        <div className="admin-listing-thumb">
                          <Image src={property.mainImageUrl} alt="" fill sizes="72px" />
                        </div>
                        <div className="admin-listing-title">
                          <strong>{property.title}</strong>
                          <span>
                            {property.referenceCode} / {property.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`admin-status-pill admin-status-${property.status}`}>
                        {copy.statusLabels[property.status]}
                      </span>
                    </td>
                    <td>{copy.typeLabels[property.type]}</td>
                    <td>{property.location}</td>
                    <td>
                      <strong>{formatPrice(property.priceEuro)}</strong>
                    </td>
                    <td>
                      <Link className="table-link" href={`/admin/properties/${property.id}`}>
                        {copy.form.editEyebrow}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-empty-state">
            <h3>{copy.dashboard.emptyTitle}</h3>
            <p>{copy.dashboard.emptyBody}</p>
            <Link className="button button-primary" href="/admin/properties/new">
              {copy.dashboard.actions.createFirst}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
