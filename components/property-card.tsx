import Image from "next/image";
import Link from "next/link";

import {
  getLocalizedListingModeLabel,
  type PublicLocale,
  getLocalizedRentPricePeriodLabel,
  getLocalizedPropertyStatusLabel,
  getLocalizedPropertyTypeLabel,
} from "@/lib/public-copy";
import {
  formatPrice,
  formatOptionalPrice,
  type PropertyRecord,
} from "@/lib/property-shared";

type PropertyCardProps = {
  bathroomsLabel: string;
  bedroomsLabel: string;
  buttonLabel: string;
  locale: PublicLocale;
  property: PropertyRecord;
};

export function PropertyCard({
  bathroomsLabel,
  bedroomsLabel,
  buttonLabel,
  locale,
  property,
}: PropertyCardProps) {
  return (
    <article className="property-card">
      <div className="property-image-wrap">
        <Image
          className="property-image"
          src={property.mainImageUrl}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="property-badges">
          <span className={`pill status-${property.status}`}>{getLocalizedPropertyStatusLabel(locale, property.status)}</span>
          <span className="pill pill-secondary">{getLocalizedListingModeLabel(locale, property.listingMode)}</span>
          <span className="pill pill-secondary">{getLocalizedPropertyTypeLabel(locale, property.type)}</span>
        </div>
      </div>

      <div className="property-card-body">
        <div className="property-card-topline">
          <span>{property.location}</span>
        </div>
        <h3>{property.title}</h3>
        <p>{property.shortDescription}</p>
        <div className="property-meta">
          <span>{property.bedrooms} {bedroomsLabel}</span>
          <span>{property.bathrooms} {bathroomsLabel}</span>
          {property.interiorSqm ? <span>{property.interiorSqm} m²</span> : null}
        </div>

        <div className="property-card-footer">
          <div className="price-stack">
            {(property.listingMode === "sale" || property.listingMode === "both") ? (
              <strong className="price-tag">{formatPrice(property.priceEuro)}</strong>
            ) : null}
            {(property.listingMode === "rent" || property.listingMode === "both") && property.rentPriceEuro ? (
              <span className="rent-price-tag">
                {formatOptionalPrice(property.rentPriceEuro)}{" "}
                {property.rentPricePeriod ? getLocalizedRentPricePeriodLabel(locale, property.rentPricePeriod) : ""}
              </span>
            ) : property.listingMode === "sale" ? (
              <span aria-hidden="true" className="rent-price-tag rent-price-tag-placeholder">
                &nbsp;
              </span>
            ) : null}
          </div>
          <Link className="button button-ghost" href={`/properties/${property.slug}`}>
            {buttonLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
