import { cookies } from "next/headers";

import { notFound } from "next/navigation";

import { ImageCarousel } from "@/components/image-carousel";
import { InquiryForm } from "@/components/inquiry-form";
import { PublicHeader } from "@/components/public-header";
import {
  getLocalizedPropertyTypeLabel,
  publicCopy,
  resolvePublicLocale,
} from "@/lib/public-copy";
import { formatPrice } from "@/lib/property-shared";
import { getPropertyBySlug } from "@/lib/properties";

export const dynamic = "force-dynamic";

type PropertyDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const cookieStore = await cookies();
  const locale = resolvePublicLocale(cookieStore.get("verdant-locale")?.value);
  const copy = publicCopy[locale];
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const gallery = [property.mainImageUrl, ...property.galleryUrls];

  return (
    <main className="site-shell section-stack">
      <PublicHeader
        brandSubtitle={copy.brandSubtitle}
        compact
        currentLocale={locale}
        languageLabel={copy.languageLabel}
        nav={copy.nav}
      />

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

      <ImageCarousel copy={copy} images={gallery} title={property.title} />

      <section className="detail-grid">
        <div className="detail-main">
          <div className="fact-grid">
            <article className="fact-card">
              <span>{copy.detail.type}</span>
              <strong>{getLocalizedPropertyTypeLabel(locale, property.type)}</strong>
            </article>
            <article className="fact-card">
              <span>{copy.detail.bedrooms}</span>
              <strong>{property.bedrooms}</strong>
            </article>
            <article className="fact-card">
              <span>{copy.detail.bathrooms}</span>
              <strong>{property.bathrooms}</strong>
            </article>
            {property.interiorSqm ? (
              <article className="fact-card">
                <span>{copy.detail.interior}</span>
                <strong>{property.interiorSqm} m²</strong>
              </article>
            ) : null}
            {property.plotSqm ? (
              <article className="fact-card">
                <span>{copy.detail.plot}</span>
                <strong>{property.plotSqm} m²</strong>
              </article>
            ) : null}
          </div>

          <article className="detail-copy-card">
            <p className="eyebrow">{copy.detail.listingOverview}</p>
            <h2>{copy.detail.whyPause}</h2>
            <p>{property.shortDescription}</p>
            <p>{property.description}</p>
          </article>
        </div>

        <aside className="detail-sidebar">
          <div className="sticky-card">
            <p className="eyebrow">{copy.detail.requestInfo}</p>
            <h2>{copy.detail.requestTitle}</h2>
            <InquiryForm
              copy={copy}
              locale={locale}
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
