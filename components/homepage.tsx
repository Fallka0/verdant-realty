import Link from "next/link";

import { PropertyCard } from "@/components/property-card";
import { ReactBitsMasonry } from "@/components/react-bits-masonry";
import { formatPrice, type PropertyRecord } from "@/lib/property-shared";

type HomepageProps = {
  featuredProperties: PropertyRecord[];
  latestProperties: PropertyRecord[];
};

const regions = [
  "Torrevieja",
  "La Mata",
  "Orihuela Costa",
  "Guardamar del Segura",
];

const advantages = [
  {
    title: "Fresh inventory, not brochure filler",
    copy:
      "The website is built to showcase real homes currently available in and near Torrevieja, not just generic branding copy.",
  },
  {
    title: "A private panel your mother can actually use",
    copy:
      "The admin side is designed for day-to-day listing management: publish, update, mark reserved, and keep the site current without needing a developer.",
  },
  {
    title: "Ready for growth",
    copy:
      "This structure can expand into uploads, multilingual listing content, lead workflows, and agent notes without splitting into a second app.",
  },
];

const masonryHeights = [300, 420, 340, 390, 460, 320];

export function Homepage({ featuredProperties, latestProperties }: HomepageProps) {
  const masonryItems = latestProperties.map((property, index) => ({
    id: property.id,
    img: property.mainImageUrl,
    title: property.title,
    url: `/properties/${property.slug}`,
    height: masonryHeights[index % masonryHeights.length],
  }));

  return (
    <main className="site-shell">
      <section className="hero-shell">
        <header className="public-header">
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

        <div className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">Homes for sale in Torrevieja and nearby coastal areas</p>
            <h1>List, manage, and present available properties with real depth.</h1>
            <p className="hero-text">
              Verdant Realty is now positioned as a listings-first platform: featured homes on the
              public site, a clear inventory overview, and a private admin panel so your mother can
              keep everything current herself.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/properties">
                Browse Properties
              </Link>
              <Link className="button button-secondary" href="/admin">
                Open Admin Panel
              </Link>
            </div>
          </div>

          <aside className="hero-side-card">
            <p className="eyebrow">Featured Snapshot</p>
            {featuredProperties[0] ? (
              <>
                <h2>{featuredProperties[0].title}</h2>
                <p>{featuredProperties[0].shortDescription}</p>
                <div className="hero-side-facts">
                  <span>{featuredProperties[0].location}</span>
                  <span>{formatPrice(featuredProperties[0].priceEuro)}</span>
                  <span>
                    {featuredProperties[0].bedrooms} bed • {featuredProperties[0].bathrooms} bath
                  </span>
                </div>
                <Link className="button button-ghost" href={`/properties/${featuredProperties[0].slug}`}>
                  View Listing
                </Link>
              </>
            ) : (
              <>
                <h2>Admin-ready from day one</h2>
                <p>
                  As soon as listings are entered into Supabase, they can appear here automatically
                  as featured properties.
                </p>
              </>
            )}
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Coverage</p>
          <h2>The website is built around active inventory near Torrevieja.</h2>
          <p>
            Instead of centering the business around a generic personal brand page, the public
            experience now points visitors straight toward listings, areas, and available homes.
          </p>
        </div>

        <div className="stats-grid">
          <article className="stat-card">
            <strong>{latestProperties.length}</strong>
            <span>sample listings ready</span>
          </article>
          <article className="stat-card">
            <strong>{featuredProperties.length}</strong>
            <span>featured slots on the homepage</span>
          </article>
          <article className="stat-card">
            <strong>{regions.length}</strong>
            <span>core target areas nearby</span>
          </article>
        </div>

        <div className="region-row">
          {regions.map((region) => (
            <span className="region-pill" key={region}>
              {region}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading with-action">
          <div>
            <p className="eyebrow">Featured Properties</p>
            <h2>Homes that deserve the front row.</h2>
          </div>
          <Link className="button button-secondary" href="/properties">
            See All Properties
          </Link>
        </div>

        <div className="property-grid">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div className="market-panel">
          <p className="eyebrow">Why This Build Fits The Business</p>
          <h2>A property website and admin panel in one project.</h2>
          <p>
            Keeping the public site and admin together makes updates faster, reduces maintenance,
            and lets the listing data drive every page from a single source of truth.
          </p>
        </div>

        <div className="advantage-grid">
          {advantages.map((item) => (
            <article className="info-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading with-action">
          <div>
            <p className="eyebrow">Visual Browse</p>
            <h2>A masonry-style property wall with React Bits.</h2>
          </div>
          <Link className="button button-ghost" href="/properties">
            Open Full Listings
          </Link>
        </div>

        <div className="masonry-desktop">
          <ReactBitsMasonry items={masonryItems} />
        </div>

        <div className="masonry-mobile-fallback">
          <div className="property-grid">
            {latestProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
