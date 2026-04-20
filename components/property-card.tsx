import Image from "next/image";
import Link from "next/link";

import {
  formatPrice,
  getPropertyStatusLabel,
  getPropertyTypeLabel,
} from "@/lib/property-shared";
import { type PropertyRecord } from "@/lib/property-shared";

type PropertyCardProps = {
  property: PropertyRecord;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="property-card">
      <div className="property-image-wrap">
        <Image
          className="property-image"
          src={property.mainImageUrl}
          alt={property.title}
          width={1200}
          height={800}
        />
        <div className="property-badges">
          <span className={`pill status-${property.status}`}>{getPropertyStatusLabel(property.status)}</span>
          <span className="pill pill-secondary">{getPropertyTypeLabel(property.type)}</span>
        </div>
      </div>

      <div className="property-card-body">
        <div className="property-card-topline">
          <span>{property.location}</span>
          <strong>{property.referenceCode}</strong>
        </div>
        <h3>{property.title}</h3>
        <p>{property.shortDescription}</p>
        <div className="property-meta">
          <span>{property.bedrooms} bed</span>
          <span>{property.bathrooms} bath</span>
          {property.interiorSqm ? <span>{property.interiorSqm} m²</span> : null}
        </div>

        <div className="property-card-footer">
          <strong className="price-tag">{formatPrice(property.priceEuro)}</strong>
          <Link className="button button-ghost" href={`/properties/${property.slug}`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
