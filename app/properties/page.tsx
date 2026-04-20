import Link from "next/link";

import { PropertyFilters } from "@/components/property-filters";
import { getPublicProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const properties = await getPublicProperties();

  return (
    <main className="site-shell section-stack">
      <header className="public-header compact-header">
        <Link className="brand-link" href="/">
          <span className="brand-mark" />
          <span>
            <strong>Verdant Realty</strong>
            <small>Torrevieja Property Collection</small>
          </span>
        </Link>

        <nav className="primary-nav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/properties">Properties</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>

      <section className="section-heading">
        <p className="eyebrow">Property Listings</p>
        <h1>Available homes in Torrevieja and the surrounding coast.</h1>
        <p>
          Browse current inventory, filter by type or bedroom count, and open any property for more
          detail and direct inquiry.
        </p>
      </section>

      <PropertyFilters properties={properties} />
    </main>
  );
}
