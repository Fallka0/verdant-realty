import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InquiryForm } from "@/components/inquiry-form";
import { formatPrice, getPropertyTypeLabel } from "@/lib/property-shared";
import { getPropertyBySlug } from "@/lib/properties";

export const dynamic = "force-dynamic";

type PropertyDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const gallery = [property.mainImageUrl, ...property.galleryUrls];

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

      <section className="property-detail-hero">
        <div className="section-heading">
          <p className="eyebrow">{property.location}</p>
          <h1>{property.title}</h1>
          <p>{property.description}</p>
        </div>
        <div className="detail-price-card">
          <strong>{formatPrice(property.priceEuro)}</strong>
          <span>{property.referenceCode}</span>
        </div>
      </section>

      <section className="detail-gallery">
        {gallery.map((imageUrl, index) => (
          <Image
            key={`${property.id}-${imageUrl}-${index}`}
            className={index === 0 ? "detail-main-image" : "detail-side-image"}
            src={imageUrl}
            alt={`${property.title} image ${index + 1}`}
            width={1400}
            height={900}
          />
        ))}
      </section>

      <section className="detail-grid">
        <div className="detail-main">
          <div className="fact-grid">
            <article className="fact-card">
              <span>Type</span>
              <strong>{getPropertyTypeLabel(property.type)}</strong>
            </article>
            <article className="fact-card">
              <span>Bedrooms</span>
              <strong>{property.bedrooms}</strong>
            </article>
            <article className="fact-card">
              <span>Bathrooms</span>
              <strong>{property.bathrooms}</strong>
            </article>
            {property.interiorSqm ? (
              <article className="fact-card">
                <span>Interior</span>
                <strong>{property.interiorSqm} m²</strong>
              </article>
            ) : null}
            {property.plotSqm ? (
              <article className="fact-card">
                <span>Plot</span>
                <strong>{property.plotSqm} m²</strong>
              </article>
            ) : null}
          </div>

          <article className="detail-copy-card">
            <p className="eyebrow">Listing Overview</p>
            <h2>Why buyers will pause on this one.</h2>
            <p>{property.shortDescription}</p>
            <p>{property.description}</p>
          </article>
        </div>

        <aside className="detail-sidebar">
          <div className="sticky-card">
            <p className="eyebrow">Request More Information</p>
            <h2>Schedule a viewing or ask for more detail.</h2>
            <InquiryForm
              property={{
                id: property.id,
                location: property.location,
                title: property.title,
              }}
            />
          </div>
        </aside>
      </section>
    </main>
  );
}
