import Link from "next/link";

import { PublicHeader } from "@/components/public-header";
import { PropertyCard } from "@/components/property-card";
import { ReactBitsMasonry } from "@/components/react-bits-masonry";
import { formatPrice, type PropertyRecord } from "@/lib/property-shared";
import { areaNames, type PublicCopy, type PublicLocale } from "@/lib/public-copy";

type HomepageProps = {
  copy: PublicCopy;
  currentLocale: PublicLocale;
  featuredProperties: PropertyRecord[];
  latestProperties: PropertyRecord[];
};

const masonryHeights = [300, 420, 340, 390, 460, 320];

export function Homepage({ copy, currentLocale, featuredProperties, latestProperties }: HomepageProps) {
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
        <PublicHeader
          brandSubtitle={copy.brandSubtitle}
          currentLocale={currentLocale}
          languageLabel={copy.languageLabel}
          nav={copy.nav}
        />

        <div className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p className="hero-text">{copy.hero.text}</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/properties">
                {copy.buttons.browseProperties}
              </Link>
            </div>
          </div>

          <aside className="hero-side-card">
            <p className="eyebrow">{copy.propertyMeta.featuredSnapshot}</p>
            {featuredProperties[0] ? (
              <>
                <h2>{featuredProperties[0].title}</h2>
                <p>{featuredProperties[0].shortDescription}</p>
                <div className="hero-side-facts">
                  <span>{featuredProperties[0].location}</span>
                  <span>{formatPrice(featuredProperties[0].priceEuro)}</span>
                  <span>
                    {featuredProperties[0].bedrooms} {copy.propertyMeta.bedroomsShort} •{" "}
                    {featuredProperties[0].bathrooms} {copy.propertyMeta.bathroomsShort}
                  </span>
                </div>
                <Link className="button button-ghost" href={`/properties/${featuredProperties[0].slug}`}>
                  {copy.buttons.viewListing}
                </Link>
              </>
            ) : (
              <>
                <h2>{copy.coverage.title}</h2>
                <p>{copy.coverage.summary}</p>
              </>
            )}
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{copy.coverage.eyebrow}</p>
          <h2>{copy.coverage.title}</h2>
          <p>{copy.coverage.summary}</p>
        </div>

        <div className="stats-grid">
          <article className="stat-card">
            <strong>{latestProperties.length}</strong>
            <span>{copy.propertyMeta.homesOnline}</span>
          </article>
          <article className="stat-card">
            <strong>{featuredProperties.length}</strong>
            <span>{copy.propertyMeta.homesSelected}</span>
          </article>
          <article className="stat-card">
            <strong>{areaNames.length}</strong>
            <span>{copy.propertyMeta.homesSelectedLabel}</span>
          </article>
        </div>

        <div className="section-heading compact coverage-pills-heading">
          <p className="eyebrow">{copy.areasLabel}</p>
          <h3>{copy.areasTitle}</h3>
          <p>{copy.areasSummary}</p>
        </div>
        <div className="region-row">
          {areaNames.map((region) => (
            <span className="region-pill" key={region}>
              {region}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading with-action">
          <div>
            <p className="eyebrow">{copy.propertyMeta.featuredSnapshot}</p>
            <h2>{copy.propertyMeta.updatedListings}</h2>
          </div>
          <Link className="button button-secondary" href="/properties">
            {copy.buttons.seeAllProperties}
          </Link>
        </div>

        <div className="property-grid">
          {featuredProperties.map((property) => (
            <PropertyCard
              bathroomsLabel={copy.propertyMeta.bathroomsShort}
              bedroomsLabel={copy.propertyMeta.bedroomsShort}
              buttonLabel={copy.buttons.viewDetails}
              key={property.id}
              locale={currentLocale}
              property={property}
            />
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div className="market-panel">
          <p className="eyebrow">{copy.overview.eyebrow}</p>
          <h2>{copy.overview.title}</h2>
          <p>{copy.overview.body}</p>
        </div>

        <div className="advantage-grid">
          {copy.overview.items.map((item) => (
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
            <p className="eyebrow">{copy.masonry.eyebrow}</p>
            <h2>{copy.masonry.title}</h2>
          </div>
          <Link className="button button-ghost" href="/properties">
            {copy.buttons.openListings}
          </Link>
        </div>

        <div className="masonry-desktop">
          <ReactBitsMasonry items={masonryItems} />
        </div>

        <div className="masonry-mobile-fallback">
          <div className="property-grid">
            {latestProperties.map((property) => (
              <PropertyCard
                bathroomsLabel={copy.propertyMeta.bathroomsShort}
                bedroomsLabel={copy.propertyMeta.bedroomsShort}
                buttonLabel={copy.buttons.viewDetails}
                key={property.id}
                locale={currentLocale}
                property={property}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
